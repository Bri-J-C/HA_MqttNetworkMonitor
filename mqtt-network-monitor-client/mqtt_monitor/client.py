"""Main MQTT Monitor client — orchestrates plugins, MQTT, and commands."""

import json
import logging
import signal
import sys
import threading
import time
from pathlib import Path

import paho.mqtt.client as mqtt

from mqtt_monitor.command_handler import CommandHandler
from mqtt_monitor.config import Config, ConfigLoader
from mqtt_monitor.config_handler import ConfigHandler
from mqtt_monitor.message import MessageBuilder
from mqtt_monitor.plugins.registry import PluginRegistry

logger = logging.getLogger(__name__)


class MQTTMonitorClient:
    def __init__(self, config: Config, config_dir: Path | None = None):
        self.config = config
        self._mqtt = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        self._message_builder = MessageBuilder(
            device_id=config.device.id,
            device_name=config.device.name,
            device_type=config.device.type,
            tags=config.device.tags,
            allowed_commands=config.allowed_commands,
        )
        self._command_handler = CommandHandler(config.allowed_commands)
        self._local_commands = set(config.allowed_commands)  # Commands from config.yaml, never removed by push
        self._plugins = []
        self._plugin_timers: dict[str, threading.Timer] = {}
        self._running = False

        _config_dir = config_dir if config_dir is not None else Path(".")
        self._config_handler = ConfigHandler(
            _config_dir,
            on_config_applied=self._apply_config_update,
        )

        registry = PluginRegistry()
        registry.load_builtins()
        self._plugins = registry.create_from_config(config.plugins)
        self._sync_active_plugins()

        self._mqtt.on_connect = self._on_connect
        self._mqtt.on_message = self._on_message

    def connect(self):
        if self.config.mqtt.username:
            self._mqtt.username_pw_set(
                self.config.mqtt.username,
                self.config.mqtt.password,
            )

        self._mqtt.will_set(
            self._message_builder.status_topic,
            payload="offline",
            retain=True,
        )

        self._mqtt.connect(self.config.mqtt.broker, self.config.mqtt.port)

    def _on_connect(self, client, userdata, flags, rc, *args):
        logger.info(f"Connected to MQTT broker (rc={rc})")

        client.publish(
            self._message_builder.status_topic,
            payload="online",
            retain=True,
        )

        client.subscribe(self._message_builder.command_topic)
        client.subscribe(self._message_builder.config_topic)

        self._start_collection()

    def _on_message(self, client, userdata, msg):
        if msg.topic == self._message_builder.command_topic:
            payload_str = msg.payload.decode()
            logger.info(f"Received command: {payload_str}")

            result = self._command_handler.handle(payload_str)
            response_json = json.dumps(result)

            client.publish(
                self._message_builder.command_response_topic,
                payload=response_json,
            )

        elif msg.topic == self._message_builder.config_topic:
            payload_str = msg.payload.decode()
            logger.info(f"Received config update: {payload_str}")

            result = self._config_handler.handle_config_message(payload_str)
            response_json = json.dumps(result)

            client.publish(
                self._message_builder.config_response_topic,
                payload=response_json,
            )

    def _sync_active_plugins(self):
        """Keep MessageBuilder's active_plugins and collection_interval in sync."""
        self._message_builder.active_plugins = [p.name for p in self._plugins]
        # Report the interval of the first plugin as the collection interval
        if self._plugins:
            self._message_builder.collection_interval = self._plugins[0].interval

    def _apply_config_update(self, remote_config: dict):
        """Apply remote config changes to running plugins."""
        if "interval" in remote_config:
            new_interval = remote_config["interval"]
            for plugin in self._plugins:
                plugin.interval = new_interval
                logger.info(f"Updated {plugin.name} interval to {new_interval}s")

        # Handle custom_command plugin — create, update, or remove sensors
        plugins_config = remote_config.get("plugins", {})
        cc_config = plugins_config.get("custom_command", {})
        cc_commands = cc_config.get("commands")  # None means not specified, {} means empty
        if cc_commands is not None:
            from mqtt_monitor.plugins.custom_command import CustomCommandPlugin
            existing = None
            for p in self._plugins:
                if p.name == "custom_command":
                    existing = p
                    break

            if existing:
                # Replace commands entirely — this handles removals
                existing.commands = dict(cc_commands)
                if "interval" in cc_config:
                    existing.interval = cc_config["interval"]
                logger.info(f"Set custom_command sensors: {list(cc_commands.keys()) if cc_commands else '(none)'}")
            elif cc_commands:
                new_plugin = CustomCommandPlugin({
                    "commands": cc_commands,
                    "interval": cc_config.get("interval", remote_config.get("interval", 30)),
                })
                self._plugins.append(new_plugin)
                if self._running:
                    self._schedule_plugin(new_plugin)
                logger.info(f"Created custom_command plugin with: {list(cc_commands.keys())}")

        if "commands" in remote_config:
            pushed_cmds = remote_config["commands"]
            # Remove commands that were previously pushed but are no longer in the list
            # Keep commands that came from the original config (self._local_commands)
            current = self._command_handler.get_commands()
            for name in list(current.keys()):
                if name not in pushed_cmds and name not in self._local_commands:
                    self._command_handler.remove_command(name)
                    logger.info(f"Removed remote command: {name}")
            # Add/update commands from the push
            for name, shell_cmd in pushed_cmds.items():
                self._command_handler.add_command(name, shell_cmd)
                logger.info(f"Added remote command: {name}")
            self._message_builder.allowed_commands = sorted(
                self._command_handler.allowed_commands
            )

        self._sync_active_plugins()
        self._message_builder._force_metadata = True

        # Reschedule all plugins immediately so changes take effect now
        if self._running:
            self._reschedule_all_plugins()

    def _reschedule_all_plugins(self):
        """Cancel all plugin timers and reschedule immediately."""
        for timer in self._plugin_timers.values():
            timer.cancel()
        self._plugin_timers.clear()
        for plugin in self._plugins:
            self._schedule_plugin(plugin)
        logger.info("Rescheduled all plugins after config update")

    def _collect_and_publish(self, plugin):
        try:
            attributes = plugin.collect()
            network = plugin.get_network_info()

            message = self._message_builder.build_attribute_message(
                plugin.name, attributes, network
            )
            topic = self._message_builder.topic_for_plugin(plugin.name)

            self._mqtt.publish(topic, message)
            logger.debug(f"Published {plugin.name}: {len(attributes)} attributes")
        except Exception as e:
            logger.error(f"Error collecting from {plugin.name}: {e}")

    def _schedule_plugin(self, plugin):
        if not self._running:
            return
        self._collect_and_publish(plugin)
        # Cancel existing timer for this plugin before creating a new one
        old_timer = self._plugin_timers.get(plugin.name)
        if old_timer:
            old_timer.cancel()
        timer = threading.Timer(plugin.interval, self._schedule_plugin, [plugin])
        timer.daemon = True
        timer.start()
        self._plugin_timers[plugin.name] = timer

    def _start_collection(self):
        self._running = True
        for plugin in self._plugins:
            self._schedule_plugin(plugin)

    def run(self):
        self.connect()
        self._running = True

        def shutdown(sig, frame):
            logger.info("Shutting down...")
            self._running = False
            for timer in self._plugin_timers.values():
                timer.cancel()
            self._plugin_timers.clear()
            self._mqtt.publish(
                self._message_builder.status_topic,
                payload="offline",
                retain=True,
            )
            self._mqtt.disconnect()
            sys.exit(0)

        signal.signal(signal.SIGINT, shutdown)
        signal.signal(signal.SIGTERM, shutdown)

        self._mqtt.loop_forever()

    def stop(self):
        self._running = False
        for timer in self._plugin_timers.values():
            timer.cancel()
        self._plugin_timers.clear()
        self._mqtt.disconnect()


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    config_path = Path("config.yaml")
    if len(sys.argv) > 1:
        config_path = Path(sys.argv[1])

    remote_path = config_path.parent / "config.remote.yaml"
    config = ConfigLoader.load_with_remote(config_path, remote_path)
    logger.info(f"Starting MQTT Monitor for device: {config.device.id}")

    client = MQTTMonitorClient(config, config_dir=config_path.parent)
    client.run()

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
from mqtt_monitor.message import MessageBuilder
from mqtt_monitor.plugins.registry import PluginRegistry

logger = logging.getLogger(__name__)


class MQTTMonitorClient:
    def __init__(self, config: Config):
        self.config = config
        self._mqtt = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        self._message_builder = MessageBuilder(
            device_id=config.device.id,
            device_name=config.device.name,
            device_type=config.device.type,
            tags=config.device.tags,
        )
        self._command_handler = CommandHandler(config.allowed_commands)
        self._plugins = []
        self._timers: list[threading.Timer] = []
        self._running = False

        registry = PluginRegistry()
        registry.load_builtins()
        self._plugins = registry.create_from_config(config.plugins)

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
        timer = threading.Timer(plugin.interval, self._schedule_plugin, [plugin])
        timer.daemon = True
        timer.start()
        self._timers.append(timer)

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
            for timer in self._timers:
                timer.cancel()
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
        for timer in self._timers:
            timer.cancel()
        self._mqtt.disconnect()


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    config_path = Path("config.yaml")
    if len(sys.argv) > 1:
        config_path = Path(sys.argv[1])

    config = ConfigLoader.load(config_path)
    logger.info(f"Starting MQTT Monitor for device: {config.device.id}")

    client = MQTTMonitorClient(config)
    client.run()

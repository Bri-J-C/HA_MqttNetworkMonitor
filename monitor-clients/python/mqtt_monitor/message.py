"""Message formatting for MQTT Network Monitor protocol."""

import json
import time

TOPIC_PREFIX = "network_monitor"


class MessageBuilder:
    def __init__(self, device_id: str, device_name: str, device_type: str, tags: list[str],
                 allowed_commands: list[str] | None = None, active_plugins: list[str] | None = None,
                 collection_interval: int | None = None):
        self.device_id = device_id
        self.device_name = device_name
        self.device_type = device_type
        self.tags = tags
        self.allowed_commands = allowed_commands if allowed_commands is not None else []
        self.active_plugins = active_plugins if active_plugins is not None else []
        self.collection_interval = collection_interval

    @property
    def status_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/status"

    @property
    def command_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/command"

    @property
    def command_response_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/command/response"

    @property
    def config_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/config"

    @property
    def config_response_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/config/response"

    def topic_for_plugin(self, plugin_name: str) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/{plugin_name}"

    def build_attribute_message(
        self,
        plugin_name: str,
        attributes: dict,
        network: dict | None,
    ) -> str:
        payload = {
            "device_id": self.device_id,
            "device_name": self.device_name,
            "device_type": self.device_type,
            "tags": self.tags,
            "timestamp": int(time.time()),
            "attributes": attributes,
        }
        if network is not None:
            payload["network"] = network
        return json.dumps(payload, separators=(',', ':'))

    def build_metadata_message(self) -> str:
        """Build a metadata-only message (sent on connect and config change)."""
        try:
            from mqtt_monitor.version import __version__
        except ImportError:
            __version__ = "unknown"
        return json.dumps({
            "device_id": self.device_id,
            "device_name": self.device_name,
            "device_type": self.device_type,
            "tags": self.tags,
            "timestamp": int(time.time()),
            "allowed_commands": self.allowed_commands,
            "active_plugins": self.active_plugins,
            "collection_interval": self.collection_interval,
            "client_version": __version__,
        }, separators=(',', ':'))

    def build_command_response(
        self, request_id: str, status: str, output: str
    ) -> str:
        return json.dumps({
            "request_id": request_id,
            "status": status,
            "output": output,
        }, separators=(',', ':'))

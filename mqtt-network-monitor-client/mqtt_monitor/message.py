"""Message formatting for MQTT Network Monitor protocol."""

import json
import time

TOPIC_PREFIX = "network_monitor"


class MessageBuilder:
    def __init__(self, device_id: str, device_name: str, device_type: str, tags: list[str]):
        self.device_id = device_id
        self.device_name = device_name
        self.device_type = device_type
        self.tags = tags

    @property
    def status_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/status"

    @property
    def command_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/command"

    @property
    def command_response_topic(self) -> str:
        return f"{TOPIC_PREFIX}/{self.device_id}/command/response"

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
        return json.dumps(payload)

    def build_command_response(
        self, request_id: str, status: str, output: str
    ) -> str:
        return json.dumps({
            "request_id": request_id,
            "status": status,
            "output": output,
        })

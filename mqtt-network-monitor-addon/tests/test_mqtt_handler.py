import json
import pytest
from unittest.mock import MagicMock
from server.mqtt_handler import MQTTHandler


@pytest.fixture
def mqtt_handler(registry):
    handler = MQTTHandler(registry, broker="localhost", port=1883)
    return handler


class TestMQTTPayloadSize:
    def test_rejects_oversized_payload(self, mqtt_handler):
        msg = MagicMock()
        msg.topic = "network_monitor/dev1/system_resources"
        msg.payload = b"x" * (64 * 1024 + 1)
        mqtt_handler._on_message(None, None, msg)
        dev = mqtt_handler._registry.get_device("dev1")
        assert dev is None

    def test_accepts_normal_payload(self, mqtt_handler):
        data = {
            "device_id": "dev1",
            "timestamp": "2026-01-01T00:00:00Z",
            "attributes": {"cpu": {"value": 50, "unit": "%"}},
        }
        msg = MagicMock()
        msg.topic = "network_monitor/dev1/system_resources"
        msg.payload = json.dumps(data).encode()
        mqtt_handler._on_message(None, None, msg)
        dev = mqtt_handler._registry.get_device("dev1")
        assert dev is not None

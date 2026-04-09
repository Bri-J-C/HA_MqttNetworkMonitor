import pytest
import tempfile
from pathlib import Path
from unittest.mock import MagicMock
from mqtt_monitor.config import Config, MQTTConfig, DeviceConfig


@pytest.fixture
def tmp_config_dir(tmp_path):
    return tmp_path


@pytest.fixture
def default_mqtt_config():
    return MQTTConfig(broker="localhost", port=1883)


@pytest.fixture
def default_device_config():
    return DeviceConfig(id="test-device", name="Test Device", type="unknown")


@pytest.fixture
def default_config(default_mqtt_config, default_device_config):
    return Config(
        mqtt=default_mqtt_config,
        device=default_device_config,
        plugins={},
        allowed_commands=[],
    )

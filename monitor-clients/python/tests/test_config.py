import pytest
import yaml
from pathlib import Path
from mqtt_monitor.config import Config, ConfigLoader, MQTTConfig, DeviceConfig


class TestConfigDefaults:
    def test_allow_remote_exec_defaults_false(self):
        """New Config instances should default to allow_remote_exec=False."""
        config = Config(
            mqtt=MQTTConfig(broker="localhost", port=1883),
            device=DeviceConfig(id="test", name="Test", type="linux"),
            plugins={},
            allowed_commands=[],
        )
        assert config.allow_remote_exec is False


class TestLoadWithRemote:
    def test_preserves_allow_remote_exec_false(self, tmp_path):
        """load_with_remote must preserve allow_remote_exec from original config."""
        # Write a base config with allow_remote_exec: false
        base_yaml = {
            "mqtt": {"broker": "localhost", "port": 1883},
            "device": {"id": "test", "name": "Test", "type": "linux"},
            "plugins": {},
            "allowed_commands": [],
            "allow_remote_exec": False,
        }
        config_path = tmp_path / "config.yaml"
        config_path.write_text(yaml.dump(base_yaml))

        # Write a remote config that changes interval
        remote_yaml = {"plugins": {"system_resources": {"interval": 30}}}
        remote_path = tmp_path / "config.remote.yaml"
        remote_path.write_text(yaml.dump(remote_yaml))

        # Load base config
        base_config = ConfigLoader.load(config_path)
        assert base_config.allow_remote_exec is False

        # Load with remote merge
        merged = ConfigLoader.load_with_remote(config_path, remote_path)
        assert merged.allow_remote_exec is False, \
            "allow_remote_exec should be preserved through remote merge"

    def test_preserves_allow_remote_exec_true(self, tmp_path):
        """If explicitly set to True, it should also be preserved."""
        base_yaml = {
            "mqtt": {"broker": "localhost", "port": 1883},
            "device": {"id": "test", "name": "Test", "type": "linux"},
            "plugins": {},
            "allowed_commands": [],
            "allow_remote_exec": True,
        }
        config_path = tmp_path / "config.yaml"
        config_path.write_text(yaml.dump(base_yaml))

        remote_yaml = {"plugins": {}}
        remote_path = tmp_path / "config.remote.yaml"
        remote_path.write_text(yaml.dump(remote_yaml))

        merged = ConfigLoader.load_with_remote(config_path, remote_path)
        assert merged.allow_remote_exec is True

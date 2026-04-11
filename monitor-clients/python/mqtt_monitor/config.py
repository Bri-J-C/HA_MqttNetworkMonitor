"""Configuration loader and validator for MQTT Network Monitor client."""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


class ConfigError(Exception):
    """Raised when configuration is invalid or cannot be loaded."""


@dataclass
class MQTTConfig:
    broker: str
    port: int = 1883
    username: str | None = None
    password: str | None = None
    tls: bool = False
    ca_cert: str | None = None


@dataclass
class DeviceConfig:
    id: str
    name: str
    type: str
    tags: list[str] = field(default_factory=list)


@dataclass
class Config:
    mqtt: MQTTConfig
    device: DeviceConfig
    plugins: dict[str, dict[str, Any]] = field(default_factory=dict)
    allowed_commands: list[str] = field(default_factory=list)
    allow_remote_exec: bool = False
    shared_secret: str | None = None


class ConfigLoader:
    @staticmethod
    def load(path: Path) -> Config:
        if not path.exists():
            raise ConfigError(f"Config file not found: {path}")

        try:
            raw = yaml.safe_load(path.read_text())
        except yaml.YAMLError as e:
            raise ConfigError(f"Failed to parse config: {e}")

        if not isinstance(raw, dict):
            raise ConfigError("Config must be a YAML mapping")

        if "mqtt" not in raw:
            raise ConfigError("Missing required section: mqtt")

        mqtt_raw = raw["mqtt"]
        if not isinstance(mqtt_raw, dict) or "broker" not in mqtt_raw:
            raise ConfigError("mqtt section must contain 'broker'")

        device_raw = raw.get("device", {})
        if not isinstance(device_raw, dict) or "id" not in device_raw:
            raise ConfigError("Missing required field: device.id")

        mqtt_config = MQTTConfig(
            broker=mqtt_raw["broker"],
            port=mqtt_raw.get("port", 1883),
            username=mqtt_raw.get("username"),
            password=mqtt_raw.get("password"),
            tls=mqtt_raw.get("tls", False),
            ca_cert=mqtt_raw.get("ca_cert"),
        )

        device_config = DeviceConfig(
            id=device_raw["id"],
            name=device_raw.get("name", device_raw["id"]),
            type=device_raw.get("type", "unknown"),
            tags=device_raw.get("tags", []),
        )

        return Config(
            mqtt=mqtt_config,
            device=device_config,
            plugins=raw.get("plugins", {}),
            allowed_commands=raw.get("allowed_commands", []),
            allow_remote_exec=raw.get("allow_remote_exec", False),
            shared_secret=raw.get("shared_secret"),
        )

    @staticmethod
    def load_with_remote(path: Path, remote_path: Path) -> Config:
        """Load config.yaml, then merge config.remote.yaml on top if it exists."""
        # Lazy import to avoid circular dependency
        from mqtt_monitor.config_handler import ConfigHandler

        config = ConfigLoader.load(path)

        if not remote_path.exists():
            return config

        try:
            remote = yaml.safe_load(remote_path.read_text()) or {}
        except yaml.YAMLError:
            return config

        raw_local = {"plugins": config.plugins}
        merged = ConfigHandler.merge_configs(raw_local, remote)

        return Config(
            mqtt=config.mqtt,
            device=config.device,
            plugins=merged.get("plugins", config.plugins),
            allowed_commands=config.allowed_commands,
            allow_remote_exec=config.allow_remote_exec,
            shared_secret=config.shared_secret,
        )

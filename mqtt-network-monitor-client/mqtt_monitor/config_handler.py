"""Handles remote config updates received via MQTT."""

import json
import logging
from pathlib import Path
from typing import Any, Callable

import yaml

logger = logging.getLogger(__name__)

REMOTE_CONFIG_FILE = "config.remote.yaml"


class ConfigHandler:
    def __init__(self, config_dir: Path, on_config_applied: Callable | None = None):
        self._config_dir = config_dir
        self._remote_config_path = config_dir / REMOTE_CONFIG_FILE
        self._on_config_applied = on_config_applied
        self._remote_config: dict[str, Any] = {}
        self._load_remote()

    def _load_remote(self):
        if self._remote_config_path.exists():
            try:
                self._remote_config = yaml.safe_load(
                    self._remote_config_path.read_text()
                ) or {}
            except Exception as e:
                logger.error(f"Failed to load remote config: {e}")

    def _save_remote(self):
        try:
            tmp_path = self._remote_config_path.with_suffix('.tmp')
            tmp_path.write_text(yaml.dump(self._remote_config, default_flow_style=False))
            tmp_path.replace(self._remote_config_path)
        except Exception as e:
            logger.error(f"Failed to save remote config: {e}")

    def handle_config_message(self, payload: str) -> dict:
        """Process incoming config update. Returns response dict."""
        try:
            data = json.loads(payload)
        except json.JSONDecodeError:
            return {"status": "rejected", "reason": "Invalid JSON"}

        if data.get("type") != "config_update":
            return {"status": "rejected", "reason": "Unknown config type"}

        try:
            self._apply(data)
            self._save_remote()
            return {
                "status": "applied",
                "active_config": self._remote_config,
            }
        except Exception as e:
            logger.error(f"Config apply failed: {e}")
            return {"status": "rejected", "reason": str(e)}

    def _apply(self, data: dict):
        # Full replacement of server config — skip the message envelope field
        self._remote_config = {
            k: v for k, v in data.items()
            if k != "type"  # Skip the "type": "config_update" field
        }
        if self._on_config_applied:
            self._on_config_applied(self._remote_config)

    def get_remote_config(self) -> dict:
        return dict(self._remote_config)

    @staticmethod
    def merge_configs(local: dict, remote: dict) -> dict:
        """Merge remote config on top of local. Remote values take priority."""
        merged = dict(local)

        if "interval" in remote:
            # Apply to all plugins
            if "plugins" in merged:
                for plugin_config in merged["plugins"].values():
                    if isinstance(plugin_config, dict):
                        plugin_config["interval"] = remote["interval"]

        if "plugins" in remote:
            if "plugins" not in merged:
                merged["plugins"] = {}
            for plugin_name, plugin_config in remote["plugins"].items():
                if plugin_name in merged["plugins"]:
                    # Deep merge plugin config
                    if isinstance(merged["plugins"][plugin_name], dict) and isinstance(plugin_config, dict):
                        merged["plugins"][plugin_name].update(plugin_config)
                    else:
                        merged["plugins"][plugin_name] = plugin_config
                else:
                    merged["plugins"][plugin_name] = plugin_config

        if "commands" in remote:
            # Remote commands are added to/override allowed_commands
            existing = set(merged.get("allowed_commands", []))
            existing.update(remote["commands"].keys())
            merged["allowed_commands"] = sorted(existing)
            merged["commands"] = dict(remote["commands"])

        return merged

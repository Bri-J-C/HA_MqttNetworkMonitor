"""Global settings manager — stores and retrieves global defaults."""

import copy
import logging
from typing import Any

from server.storage.store import Storage

logger = logging.getLogger(__name__)

SETTINGS_FILE = "settings.json"

DEFAULT_SETTINGS: dict[str, Any] = {
    "default_thresholds": {
        "cpu_usage": 90,
        "memory_usage": 90,
        "disk_usage": 95,
        "cpu_temp": 80,
    },
    "default_ha_exposure": "none",
    "ha_exposed_attributes": [],
    "device_cleanup_days": 0,
    "alert_cooldown_minutes": 30,
}


class SettingsManager:
    def __init__(self, storage: Storage):
        self._storage = storage
        self._settings: dict[str, Any] = {}
        self._load()

    def _load(self):
        data = self._storage.load(SETTINGS_FILE)
        if data and isinstance(data, dict):
            # Merge with defaults to ensure all keys exist
            self._settings = copy.deepcopy(DEFAULT_SETTINGS)
            self._deep_update(self._settings, data)
            # Migration: change default_ha_exposure from "all" to "none"
            if data.get("default_ha_exposure") == "all" and not data.get("_ha_exposure_migrated"):
                self._settings["default_ha_exposure"] = "none"
                self._settings["_ha_exposure_migrated"] = True
                self._save()
                logger.info("Migrated default_ha_exposure from 'all' to 'none'")
        else:
            self._settings = copy.deepcopy(DEFAULT_SETTINGS)
            self._settings["_ha_exposure_migrated"] = True
            # Persist defaults on first run
            self._save()

    def _deep_update(self, base: dict, update: dict) -> None:
        for key, value in update.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                self._deep_update(base[key], value)
            else:
                base[key] = value

    def _save(self):
        self._storage.save(SETTINGS_FILE, self._settings)

    def get_settings(self) -> dict[str, Any]:
        """Return a copy of the current global settings."""
        return dict(self._settings)

    def update_settings(self, data: dict[str, Any]) -> dict[str, Any]:
        """Apply *data* on top of current settings. Returns updated settings."""
        self._deep_update(self._settings, data)
        self._save()
        logger.debug(f"Global settings updated: {list(data.keys())}")
        return self.get_settings()

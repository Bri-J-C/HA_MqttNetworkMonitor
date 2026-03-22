"""Tracks all known devices, their current state, tags, and groups."""

import logging
import time
from typing import Any

from server.storage.store import Storage

logger = logging.getLogger(__name__)

DEVICES_FILE = "devices.json"
GROUPS_FILE = "groups.json"


class DeviceRegistry:
    def __init__(self, storage: Storage):
        self._storage = storage
        self._devices: dict[str, dict[str, Any]] = {}
        self._groups: dict[str, dict[str, Any]] = {}
        self._warning_thresholds: dict[str, float] = {
            "cpu_usage": 90.0,
            "memory_usage": 90.0,
            "disk_usage": 95.0,
            "cpu_temp": 80.0,
        }
        self._load()

    def _load(self):
        devices = self._storage.load(DEVICES_FILE)
        if devices:
            self._devices = devices
        groups = self._storage.load(GROUPS_FILE)
        if groups:
            self._groups = groups

    def _save_devices(self):
        self._storage.save(DEVICES_FILE, self._devices)

    def _save_groups(self):
        self._storage.save(GROUPS_FILE, self._groups)

    def update_device(self, device_id: str, payload: dict) -> None:
        is_new = device_id not in self._devices
        if is_new:
            self._devices[device_id] = {
                "device_id": device_id,
                "first_seen": time.time(),
                "status": "online",
                "server_tags": [],
                "groups": [],
                # New fields
                "group_policy": None,
                "ha_exposure_overrides": {},
                "threshold_overrides": {},
                "allowed_commands": [],
            }
            logger.info(f"New device discovered: {device_id}")

        device = self._devices[device_id]
        device["device_name"] = payload.get("device_name", device_id)
        device["device_type"] = payload.get("device_type", "unknown")
        device["tags"] = payload.get("tags", [])
        device["last_seen"] = time.time()
        device["attributes"] = payload.get("attributes", {})
        if payload.get("network"):
            device["network"] = payload["network"]
        if "allowed_commands" in payload:
            device["allowed_commands"] = payload["allowed_commands"]

        # Derive status
        device["status"] = self._derive_status(device)
        self._save_devices()

    def set_device_status(self, device_id: str, status: str) -> None:
        if device_id not in self._devices:
            self._devices[device_id] = {
                "device_id": device_id,
                "first_seen": time.time(),
                "server_tags": [],
                "groups": [],
                "attributes": {},
            }
        self._devices[device_id]["status"] = status
        self._devices[device_id]["last_seen"] = time.time()
        self._save_devices()

    def _derive_status(self, device: dict) -> str:
        if device.get("status") == "offline":
            return "offline"
        attrs = device.get("attributes", {})
        for attr_name, threshold in self._warning_thresholds.items():
            attr = attrs.get(attr_name, {})
            value = attr.get("value")
            if value is not None and isinstance(value, (int, float)) and value > threshold:
                return "warning"
        return "online"

    def get_device(self, device_id: str) -> dict | None:
        return self._devices.get(device_id)

    def get_all_devices(self) -> dict[str, dict]:
        return dict(self._devices)

    def get_groups(self) -> dict:
        return dict(self._groups)

    def create_group(self, group_id: str, name: str, device_ids: list[str] | None = None) -> dict:
        self._groups[group_id] = {
            "id": group_id,
            "name": name,
            "device_ids": device_ids or [],
            # Expanded group schema
            "thresholds": {},
            "ha_exposed_attributes": [],
            "custom_sensors": {},
        }
        self._save_groups()
        return self._groups[group_id]

    def add_server_tags(self, device_id: str, tags: list[str]) -> None:
        device = self._devices.get(device_id)
        if device:
            existing = set(device.get("server_tags", []))
            existing.update(tags)
            device["server_tags"] = sorted(existing)
            self._save_devices()

    def remove_server_tag(self, device_id: str, tag: str) -> None:
        device = self._devices.get(device_id)
        if device:
            tags = device.get("server_tags", [])
            device["server_tags"] = [t for t in tags if t != tag]
            self._save_devices()

    def set_server_tags(self, device_id: str, tags: list[str]) -> None:
        device = self._devices.get(device_id)
        if device:
            device["server_tags"] = sorted(set(tags))
            self._save_devices()

    def update_group(self, group_id: str, name: str | None = None,
                     device_ids: list[str] | None = None) -> dict | None:
        group = self._groups.get(group_id)
        if not group:
            return None
        if name is not None:
            group["name"] = name
        if device_ids is not None:
            group["device_ids"] = device_ids
        self._save_groups()
        return group

    def delete_group(self, group_id: str) -> bool:
        if group_id in self._groups:
            del self._groups[group_id]
            self._save_groups()
            return True
        return False

    def set_warning_thresholds(self, thresholds: dict[str, float]) -> None:
        self._warning_thresholds.update(thresholds)

    def set_device_settings(self, device_id: str, settings: dict) -> dict | None:
        """Update group_policy, ha_exposure_overrides, and/or threshold_overrides for a device."""
        device = self._devices.get(device_id)
        if not device:
            return None
        allowed_keys = {"group_policy", "ha_exposure_overrides", "threshold_overrides"}
        for key in allowed_keys:
            if key in settings:
                device[key] = settings[key]
        self._save_devices()
        return device

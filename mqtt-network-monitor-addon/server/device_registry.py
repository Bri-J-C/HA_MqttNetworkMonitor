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
        self._settings_resolver = None
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
                "server_commands": {},
            }
            logger.info(f"New device discovered: {device_id}")

        device = self._devices[device_id]
        device["device_name"] = payload.get("device_name", device_id)
        device["device_type"] = payload.get("device_type", "unknown")
        device["tags"] = payload.get("tags", [])
        device["last_seen"] = time.time()
        # Merge attributes instead of replacing — each plugin publishes its own subset
        incoming_attrs = payload.get("attributes", {})
        existing_attrs = device.get("attributes", {})
        existing_attrs.update(incoming_attrs)
        device["attributes"] = existing_attrs
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

    @staticmethod
    def _check_threshold(value, threshold) -> bool:
        """Check if a value exceeds a threshold. Supports operator format."""
        if isinstance(threshold, dict):
            op = threshold.get("op", ">")
            thresh_val = threshold.get("value")
        elif isinstance(threshold, (int, float)):
            op = ">"
            thresh_val = threshold
        else:
            return False
        if thresh_val is None:
            return False
        if op == ">": return value > thresh_val
        if op == "<": return value < thresh_val
        if op == ">=": return value >= thresh_val
        if op == "<=": return value <= thresh_val
        if op == "==": return value == thresh_val
        if op == "!=": return value != thresh_val
        return value > thresh_val

    def set_settings_resolver(self, resolver) -> None:
        """Set a callable (device) -> effective_settings used for threshold resolution."""
        self._settings_resolver = resolver

    def _derive_status(self, device: dict) -> str:
        if device.get("status") == "offline":
            return "offline"
        attrs = device.get("attributes", {})
        if self._settings_resolver is not None:
            try:
                effective = self._settings_resolver(device)
                thresholds = effective.get("thresholds", {})
            except Exception:
                thresholds = self._warning_thresholds
        else:
            thresholds = self._warning_thresholds
        for attr_name, threshold in thresholds.items():
            if threshold is None:
                continue
            attr = attrs.get(attr_name)
            if attr is None:
                continue
            # Support both {"value": x, "unit": y} and plain values
            if isinstance(attr, dict):
                value = attr.get("value")
            elif isinstance(attr, (int, float)):
                value = attr
            else:
                continue
            if value is not None and isinstance(value, (int, float)) and self._check_threshold(value, threshold):
                return "warning"
        return "online"

    def get_device(self, device_id: str) -> dict | None:
        return self._devices.get(device_id)

    def get_all_devices(self) -> dict[str, dict]:
        return dict(self._devices)

    def get_groups(self) -> dict:
        return dict(self._groups)

    def create_group(self, group_id: str, name: str, device_ids: list[str] | None = None) -> dict:
        members = device_ids or []
        self._groups[group_id] = {
            "id": group_id,
            "name": name,
            "device_ids": members,
            # Expanded group schema
            "thresholds": {},
            "ha_exposed_attributes": [],
            "custom_sensors": {},
            "custom_commands": {},
        }
        # Set group_policy on initial members
        devices_changed = False
        for did in members:
            device = self._devices.get(did)
            if device is not None:
                device["group_policy"] = group_id
                devices_changed = True
        if devices_changed:
            self._save_devices()
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
                     device_ids: list[str] | None = None,
                     custom_commands: dict | None = None,
                     custom_sensors: dict | None = None,
                     thresholds: dict | None = None) -> dict | None:
        group = self._groups.get(group_id)
        if not group:
            return None
        if name is not None:
            group["name"] = name
        if device_ids is not None:
            old_ids = set(group.get("device_ids") or [])
            new_ids = set(device_ids)
            # Devices added to this group: set their group_policy
            for did in new_ids - old_ids:
                device = self._devices.get(did)
                if device is not None:
                    device["group_policy"] = group_id
            # Devices removed from this group: clear group_policy if it pointed here
            for did in old_ids - new_ids:
                device = self._devices.get(did)
                if device is not None and device.get("group_policy") == group_id:
                    device["group_policy"] = None
            if old_ids != new_ids:
                self._save_devices()
            group["device_ids"] = device_ids
        if custom_commands is not None:
            group["custom_commands"] = custom_commands
        if custom_sensors is not None:
            group["custom_sensors"] = custom_sensors
        if thresholds is not None:
            group["thresholds"] = thresholds
        self._save_groups()
        return group

    def delete_group(self, group_id: str) -> bool:
        if group_id in self._groups:
            del self._groups[group_id]
            self._save_groups()
            return True
        return False

    def delete_attribute(self, device_id: str, attr_name: str) -> bool:
        device = self._devices.get(device_id)
        if not device:
            return False
        attrs = device.get("attributes", {})
        if attr_name in attrs:
            del attrs[attr_name]
            self._save_devices()
            return True
        return False

    def delete_device(self, device_id: str) -> bool:
        if device_id in self._devices:
            del self._devices[device_id]
            self._save_devices()
            return True
        return False

    def set_warning_thresholds(self, thresholds: dict[str, float]) -> None:
        self._warning_thresholds.update(thresholds)

    def set_device_settings(self, device_id: str, settings: dict) -> dict | None:
        """Update group_policy, ha_exposure_overrides, and/or threshold_overrides for a device."""
        device = self._devices.get(device_id)
        if not device:
            return None
        allowed_keys = {"group_policy", "ha_exposure_overrides", "threshold_overrides", "server_commands", "remote_config"}
        for key in allowed_keys:
            if key in settings:
                device[key] = settings[key]
        self._save_devices()
        return device

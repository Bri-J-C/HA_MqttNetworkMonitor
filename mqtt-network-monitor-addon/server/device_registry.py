"""Tracks all known devices, their current state, tags, and groups."""

import logging
import threading
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
        self._devices_dirty = False
        self._devices_save_timer = None
        self._devices_save_lock = threading.Lock()
        self._groups_dirty = False
        self._groups_save_timer = None
        self._groups_save_lock = threading.Lock()
        self._load()

    def _load(self):
        devices = self._storage.load(DEVICES_FILE)
        if devices:
            self._devices = devices
        groups = self._storage.load(GROUPS_FILE)
        if groups:
            self._groups = groups

    def _mark_devices_dirty(self):
        """Mark devices as needing save. Actual save happens within 5 seconds."""
        self._devices_dirty = True
        with self._devices_save_lock:
            if self._devices_save_timer is None:
                self._devices_save_timer = threading.Timer(5.0, self._flush_devices)
                self._devices_save_timer.daemon = True
                self._devices_save_timer.start()

    def _flush_devices(self):
        """Actually write devices to disk."""
        with self._devices_save_lock:
            self._devices_save_timer = None
            if self._devices_dirty:
                self._storage.save(DEVICES_FILE, self._devices)
                self._devices_dirty = False

    def _save_devices(self):
        """Debounced save — marks dirty and schedules a flush within 5 seconds."""
        self._mark_devices_dirty()

    def _mark_groups_dirty(self):
        """Mark groups as needing save. Actual save happens within 5 seconds."""
        self._groups_dirty = True
        with self._groups_save_lock:
            if self._groups_save_timer is None:
                self._groups_save_timer = threading.Timer(5.0, self._flush_groups)
                self._groups_save_timer.daemon = True
                self._groups_save_timer.start()

    def _flush_groups(self):
        """Actually write groups to disk."""
        with self._groups_save_lock:
            self._groups_save_timer = None
            if self._groups_dirty:
                self._storage.save(GROUPS_FILE, self._groups)
                self._groups_dirty = False

    def _save_groups(self):
        """Debounced save — marks dirty and schedules a flush within 5 seconds."""
        self._mark_groups_dirty()

    def flush(self):
        """Force immediate save of both devices and groups. Call on shutdown."""
        self._flush_devices()
        self._flush_groups()

    def update_device(self, device_id: str, payload: dict, plugin_name: str | None = None) -> None:
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
                "hidden_attributes": [],
                "hidden_commands": [],
            }
            logger.info(f"New device discovered: {device_id}")

        device = self._devices[device_id]
        device["device_name"] = payload.get("device_name", device_id)
        device["device_type"] = payload.get("device_type", "unknown")
        device["tags"] = payload.get("tags", [])
        device["last_seen"] = time.time()
        # Per-plugin attribute tracking: replace attributes from the publishing plugin,
        # keep attributes from other plugins. This ensures removed sensors disappear.
        incoming_attrs = payload.get("attributes", {})
        if plugin_name:
            # Track which plugin owns which attributes
            plugin_attrs = device.get("_plugin_attrs", {})
            # Remove old attributes that this plugin previously owned
            old_keys = plugin_attrs.get(plugin_name, [])
            existing_attrs = device.get("attributes", {})
            for key in old_keys:
                if key not in incoming_attrs:
                    existing_attrs.pop(key, None)
            # Add/update incoming attributes
            existing_attrs.update(incoming_attrs)
            device["attributes"] = existing_attrs
            # Update ownership tracking
            plugin_attrs[plugin_name] = list(incoming_attrs.keys())
            device["_plugin_attrs"] = plugin_attrs
        else:
            # No plugin name (legacy) — merge as before
            existing_attrs = device.get("attributes", {})
            existing_attrs.update(incoming_attrs)
            device["attributes"] = existing_attrs
        if payload.get("network"):
            device["network"] = payload["network"]
        if "allowed_commands" in payload:
            # Store only client-origin commands — filter out server-pushed ones
            server_cmds = set(device.get("server_commands", {}).keys())
            device["allowed_commands"] = [
                c for c in payload["allowed_commands"] if c not in server_cmds
            ]
        if "active_plugins" in payload:
            device["active_plugins"] = payload["active_plugins"]
        if "collection_interval" in payload:
            device["collection_interval"] = payload["collection_interval"]

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
                     thresholds: dict | None = None,
                     hidden_commands: list | None = None) -> dict | None:
        group = self._groups.get(group_id)
        if not group:
            return None
        if name is not None:
            group["name"] = name
        if device_ids is not None:
            old_ids = set(group.get("device_ids") or [])
            new_ids = set(device_ids)
            # Devices removed from this group: clear group_policy if it pointed here
            for did in old_ids - new_ids:
                device = self._devices.get(did)
                if device is not None and device.get("group_policy") == group_id:
                    device["group_policy"] = None
            # ALL current members should have group_policy set to this group
            for did in new_ids:
                device = self._devices.get(did)
                if device is not None:
                    device["group_policy"] = group_id
            self._save_devices()
            group["device_ids"] = device_ids
        if custom_commands is not None:
            group["custom_commands"] = custom_commands
        if custom_sensors is not None:
            group["custom_sensors"] = custom_sensors
        if thresholds is not None:
            group["thresholds"] = thresholds
        if hidden_commands is not None:
            group["hidden_commands"] = hidden_commands
        self._save_groups()
        return group

    def delete_group(self, group_id: str) -> bool:
        if group_id not in self._groups:
            return False
        # Clear group_policy from all member devices
        group = self._groups[group_id]
        for did in group.get("device_ids", []):
            device = self._devices.get(did)
            if device and device.get("group_policy") == group_id:
                device["group_policy"] = None
        self._save_devices()
        del self._groups[group_id]
        self._save_groups()
        return True

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
        if device_id not in self._devices:
            return False
        # Remove from all groups
        for group in self._groups.values():
            if device_id in group.get("device_ids", []):
                group["device_ids"].remove(device_id)
        self._save_groups()
        del self._devices[device_id]
        self._save_devices()
        return True

    def set_warning_thresholds(self, thresholds: dict[str, float]) -> None:
        self._warning_thresholds.update(thresholds)

    def add_command_response(self, device_id: str, response: dict) -> None:
        """Store a command response in the device's command_history (last 20 kept)."""
        device = self._devices.get(device_id)
        if device:
            if "command_history" not in device:
                device["command_history"] = []
            device["command_history"].append({
                **response,
                "received_at": time.time(),
            })
            # Keep only the last 20 responses
            device["command_history"] = device["command_history"][-20:]
            self._save_devices()

    def check_stale_devices(self, timeout_seconds: int = 300) -> None:
        """Mark devices as offline if they haven't been seen within timeout."""
        now = time.time()
        changed = False
        for device_id, device in self._devices.items():
            if device.get("status") == "online":
                last_seen = device.get("last_seen", 0)
                if now - last_seen > timeout_seconds:
                    device["status"] = "offline"
                    changed = True
                    logger.info(
                        f"Device {device_id} marked offline (heartbeat timeout)"
                    )
        if changed:
            self._save_devices()

    def set_device_settings(self, device_id: str, settings: dict) -> dict | None:
        """Update group_policy, ha_exposure_overrides, and/or threshold_overrides for a device."""
        device = self._devices.get(device_id)
        if not device:
            return None
        allowed_keys = {"group_policy", "ha_exposure_overrides", "threshold_overrides", "server_commands", "remote_config", "hidden_attributes", "hidden_commands", "card_attributes"}
        for key in allowed_keys:
            if key in settings:
                device[key] = settings[key]
        self._save_devices()
        return device

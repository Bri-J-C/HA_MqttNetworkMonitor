"""Tag registry — manages the set of known tags and their device counts."""

import logging
from typing import Any

from server.storage.store import Storage

logger = logging.getLogger(__name__)

TAG_REGISTRY_FILE = "tag_registry.json"


class TagRegistry:
    def __init__(self, storage: Storage):
        self._storage = storage
        self._tags: list[str] = []
        self._load()

    def _load(self):
        data = self._storage.load(TAG_REGISTRY_FILE)
        if data and isinstance(data, dict):
            self._tags = data.get("tags", [])

    def _save(self):
        self._storage.save(TAG_REGISTRY_FILE, {"tags": self._tags})

    def get_all_tags(self, devices: dict[str, Any] | None = None) -> list[dict]:
        """Return all tags with device counts.

        If *devices* is provided (mapping of device_id → device_record),
        device counts are calculated from the actual device data.
        """
        device_map = devices or {}
        result = []
        for tag in self._tags:
            count = self.get_tag_count(tag, device_map)
            result.append({"tag": tag, "device_count": count})
        return result

    def add_tag(self, tag: str) -> bool:
        """Add a tag. Returns True if added, False if already exists."""
        tag = tag.strip()
        if not tag:
            raise ValueError("Tag cannot be empty")
        if tag in self._tags:
            return False
        self._tags.append(tag)
        self._save()
        return True

    def rename_tag(self, old: str, new: str) -> bool:
        """Rename a tag. Returns True on success, False if old tag not found."""
        new = new.strip()
        if not new:
            raise ValueError("New tag name cannot be empty")
        if old not in self._tags:
            return False
        if new in self._tags:
            raise ValueError(f"Tag '{new}' already exists")
        idx = self._tags.index(old)
        self._tags[idx] = new
        self._save()
        return True

    def delete_tag(self, tag: str) -> bool:
        """Delete a tag. Returns True on success, False if not found."""
        if tag not in self._tags:
            return False
        self._tags.remove(tag)
        self._save()
        return True

    def get_tag_count(self, tag: str, devices: dict[str, Any] | None = None) -> int:
        """Count devices that use this tag (across client tags and server tags)."""
        if devices is None:
            return 0
        count = 0
        for device in devices.values():
            client_tags = device.get("tags", [])
            server_tags = device.get("server_tags", [])
            if tag in client_tags or tag in server_tags:
                count += 1
        return count

    def auto_populate(self, devices: dict[str, Any]) -> None:
        """Add any tags from device payloads that are not already registered."""
        changed = False
        for device in devices.values():
            for tag in device.get("tags", []) + device.get("server_tags", []):
                if tag and tag not in self._tags:
                    self._tags.append(tag)
                    changed = True
        if changed:
            self._save()

    def has_tag(self, tag: str) -> bool:
        return tag in self._tags

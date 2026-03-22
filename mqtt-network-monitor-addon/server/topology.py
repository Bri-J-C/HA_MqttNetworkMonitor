"""Topology auto-discovery and manual layout management."""

import logging
import uuid
from typing import Any

from server.device_registry import DeviceRegistry
from server.storage.store import Storage

logger = logging.getLogger(__name__)

LAYOUTS_FILE = "topology_layouts.json"


class TopologyEngine:
    def __init__(self, registry: DeviceRegistry, storage: Storage):
        self._registry = registry
        self._storage = storage
        self._layouts: dict[str, dict[str, Any]] = {}
        self._load()

    def _load(self):
        layouts = self._storage.load(LAYOUTS_FILE)
        if layouts:
            self._layouts = layouts

    def _save(self):
        self._storage.save(LAYOUTS_FILE, self._layouts)

    def auto_discover(self) -> dict:
        devices = self._registry.get_all_devices()
        nodes = []
        edges = []
        gateways: dict[str, list[str]] = {}

        for device_id, device in devices.items():
            nodes.append({
                "id": device_id,
                "name": device.get("device_name", device_id),
                "type": device.get("device_type", "unknown"),
                "status": device.get("status", "unknown"),
            })
            network = device.get("network", {})
            gateway = network.get("gateway")
            if gateway:
                gateways.setdefault(gateway, []).append(device_id)

        for gateway_ip, device_ids in gateways.items():
            gateway_node_id = f"gateway-{gateway_ip}"
            if not any(n["id"] == gateway_node_id for n in nodes):
                nodes.append({
                    "id": gateway_node_id,
                    "name": f"Gateway ({gateway_ip})",
                    "type": "gateway",
                    "status": "inferred",
                })
            for device_id in device_ids:
                edges.append({
                    "source": gateway_node_id,
                    "target": device_id,
                    "type": "auto",
                })

        return {"nodes": nodes, "edges": edges}

    def get_layouts(self) -> dict:
        return dict(self._layouts)

    def get_layout(self, layout_id: str) -> dict | None:
        return self._layouts.get(layout_id)

    def save_layout(self, layout: dict) -> dict:
        layout_id = layout.get("id") or str(uuid.uuid4())
        layout["id"] = layout_id
        self._layouts[layout_id] = layout
        self._save()
        return layout

    def delete_layout(self, layout_id: str) -> bool:
        if layout_id in self._layouts:
            del self._layouts[layout_id]
            self._save()
            return True
        return False

"""Entry point for the MQTT Network Monitor add-on."""

import asyncio
import logging
import os
import queue
import sys
import threading
import time
from pathlib import Path

import uvicorn

from server.api.routes import app, init_app
from server.api.websocket import ws_manager
from server.command_sender import CommandSender
from server.device_registry import DeviceRegistry
from server.ha_entities import HAEntityManager
from server.mqtt_handler import MQTTHandler
from server.settings_manager import SettingsManager
from server.settings_resolver import resolve_settings
from server.storage.store import Storage
from server.tag_registry import TagRegistry
from server.topology import TopologyEngine
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger(__name__)

_broadcast_queue: queue.Queue = queue.Queue()
_last_broadcast_hash: dict = {}


def _device_hash(device: dict) -> tuple:
    """Quick hash to detect changes."""
    attrs = device.get("attributes", {})
    return (device.get("status"), tuple(sorted(
        (k, v.get("value") if isinstance(v, dict) else v) for k, v in attrs.items()
    )))

# WebSocket endpoint
@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)


@app.on_event("startup")
async def start_broadcast_worker():
    async def worker():
        while True:
            try:
                msg = await asyncio.get_event_loop().run_in_executor(
                    None, _broadcast_queue.get, True, 0.5
                )
                await ws_manager.broadcast(msg)
            except queue.Empty:
                await asyncio.sleep(0.1)
    asyncio.create_task(worker())


def create_app():
    data_dir = Path(os.environ.get("DATA_DIR", "/data"))
    mqtt_broker = os.environ.get("MQTT_BROKER", "localhost")
    mqtt_port = int(os.environ.get("MQTT_PORT", "1883"))
    mqtt_user = os.environ.get("MQTT_USER")
    mqtt_pass = os.environ.get("MQTT_PASSWORD")

    storage = Storage(data_dir)
    registry = DeviceRegistry(storage)
    registry.migrate_config_fields()
    topology_engine = TopologyEngine(registry, storage)
    mqtt_handler = MQTTHandler(registry, mqtt_broker, mqtt_port, mqtt_user, mqtt_pass)
    ha_entities = HAEntityManager(mqtt_handler._client)
    command_sender = CommandSender(mqtt_handler)
    tag_reg = TagRegistry(storage)
    settings_mgr = SettingsManager(storage)

    # Wire up the settings resolver so _derive_status uses effective thresholds
    def get_effective_thresholds(device):
        global_settings = settings_mgr.get_settings()
        groups = registry.get_groups()
        return resolve_settings(device, groups, global_settings)

    registry.set_settings_resolver(get_effective_thresholds)

    # Auto-populate tag registry from any devices already in the registry
    tag_reg.auto_populate(registry.get_all_devices())

    def on_device_update(device_id: str):
        device = registry.get_device(device_id)
        if device:
            # Auto-populate tag registry from device tags
            tag_reg.auto_populate({device_id: device})

            # Resolve effective settings for HA entity exposure
            global_settings = settings_mgr.get_settings()
            groups = registry.get_groups()
            effective = resolve_settings(device, groups, global_settings)
            ha_exposure = effective.get("ha_exposure", "all")
            if ha_exposure == "all":
                exposed_attrs = None
            else:
                exposed_attrs = effective.get("ha_exposed_attributes")

            # Filter out hidden attributes before exposing to HA
            hidden = device.get("hidden_attributes", [])
            if hidden:
                filtered_device = dict(device)
                filtered_device["attributes"] = {
                    k: v for k, v in device.get("attributes", {}).items()
                    if k not in hidden
                }
                ha_entities.update_device_states(device_id, filtered_device, exposed_attrs)
            else:
                ha_entities.update_device_states(device_id, device, exposed_attrs)

            # Filter hidden attributes for broadcast too
            broadcast_device = dict(device)
            hidden = device.get("hidden_attributes", [])
            if hidden:
                broadcast_device["attributes"] = {
                    k: v for k, v in device.get("attributes", {}).items()
                    if k not in hidden
                }
            # Also filter hidden commands
            hidden_cmds = device.get("hidden_commands", [])
            if hidden_cmds:
                allowed = broadcast_device.get("allowed_commands", [])
                broadcast_device["allowed_commands"] = [c for c in allowed if c not in hidden_cmds]

            # Skip broadcast if nothing changed
            current_hash = _device_hash(broadcast_device)
            if _last_broadcast_hash.get(device_id) == current_hash:
                return
            _last_broadcast_hash[device_id] = current_hash

            _broadcast_queue.put({
                "type": "device_update",
                "device_id": device_id,
                "device": broadcast_device,
            })

    mqtt_handler.on_device_update(on_device_update)
    init_app(registry, topology_engine, command_sender, mqtt_handler, tag_reg, settings_mgr, ha_entities)
    mqtt_handler.connect()

    def _heartbeat_worker():
        while True:
            try:
                registry.check_stale_devices(timeout_seconds=300)
            except Exception as exc:
                logger.error(f"Heartbeat checker error: {exc}")
            time.sleep(60)

    heartbeat_thread = threading.Thread(target=_heartbeat_worker, daemon=True, name="heartbeat-checker")
    heartbeat_thread.start()

    return app


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    app = create_app()
    port = int(os.environ.get("PORT", "8100"))
    uvicorn.run(app, host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()

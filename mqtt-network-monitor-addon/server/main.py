"""Entry point for the MQTT Network Monitor add-on."""

import asyncio
import logging
import os
import queue
import sys
import threading
import time
from contextlib import asynccontextmanager
from pathlib import Path

import uvicorn
from fastapi import WebSocket, WebSocketDisconnect

import server.api.routes as _routes_module
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

logger = logging.getLogger(__name__)

_broadcast_queue: queue.Queue = queue.Queue()
_last_broadcast_hash: dict = {}
_broadcast_lock = threading.Lock()


def _device_hash(device: dict) -> tuple:
    """Quick hash to detect changes."""
    attrs = device.get("attributes", {})
    return (
        device.get("status"),
        tuple(sorted((k, v.get("value")) for k, v in attrs.items() if isinstance(v, dict))),
        tuple(sorted(device.get("hidden_attributes", []))),
        tuple(sorted(device.get("card_attributes", []))),
        tuple(sorted(device.get("attribute_transforms", {}).items())),
    )


@asynccontextmanager
async def lifespan(a):
    # Startup: launch broadcast worker
    async def worker():
        while True:
            try:
                msg = await asyncio.get_event_loop().run_in_executor(
                    None, _broadcast_queue.get, True, 0.5
                )
                await ws_manager.broadcast(msg)
            except queue.Empty:
                await asyncio.sleep(0.1)
    task = asyncio.create_task(worker())
    yield
    # Shutdown: flush registry
    task.cancel()
    from server.api import state
    if state.registry:
        state.registry.flush()

_routes_module._lifespan_ref = lifespan


# WebSocket endpoint
@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await ws_manager.disconnect(websocket)


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
    ha_entities = HAEntityManager(mqtt_handler.get_client())
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
            # Use effective hidden list (group + device merged)
            hidden = effective.get("hidden_attributes", [])
            if hidden:
                filtered_device = dict(device)
                filtered_device["attributes"] = {
                    k: v for k, v in device.get("attributes", {}).items()
                    if k not in hidden
                }
                ha_entities.update_device_states(device_id, filtered_device, exposed_attrs)
            else:
                ha_entities.update_device_states(device_id, device, exposed_attrs)

            # Broadcast device data with effective settings merged in.
            # This gives the frontend the resolved cascade (group + device)
            # for hidden_attributes, card_attributes, and attribute_transforms.
            broadcast_device = dict(device)
            broadcast_device["hidden_attributes"] = effective.get("hidden_attributes", [])
            broadcast_device["card_attributes"] = effective.get("card_attributes", device.get("card_attributes", []))
            broadcast_device["attribute_transforms"] = effective.get("attribute_transforms", {})

            # Skip broadcast if nothing changed
            current_hash = _device_hash(broadcast_device)
            with _broadcast_lock:
                if _last_broadcast_hash.get(device_id) == current_hash:
                    logger.debug(f"Broadcast skipped for {device_id} (unchanged)")
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

    # --- Alert cooldown state (in-memory) ---
    _alert_active: dict[str, float] = {}  # "device_id/attr_name" -> last_alert_time

    def _check_crit_alerts():
        """Fire HA notifications for crit threshold breaches."""
        settings = settings_mgr.get_settings()
        cooldown = settings.get("alert_cooldown_minutes", 30) * 60
        if cooldown <= 0:
            return
        now = time.time()
        devices = registry.get_all_devices()
        groups = registry.get_groups()

        for device_id, device in devices.items():
            if device.get("status") != "online":
                continue
            effective = resolve_settings(device, groups, settings)
            crit_thresholds = effective.get("crit_thresholds", {})
            attrs = device.get("attributes", {})

            for attr_name, threshold_val in crit_thresholds.items():
                if threshold_val is None:
                    continue
                attr_data = attrs.get(attr_name)
                if not attr_data:
                    continue
                value = attr_data.get("value")
                try:
                    value = float(value)
                except (TypeError, ValueError):
                    continue

                alert_key = f"{device_id}/{attr_name}"
                if DeviceRegistry._check_threshold(value, threshold_val):
                    last_alert = _alert_active.get(alert_key, 0)
                    if now - last_alert >= cooldown:
                        device_name = device.get("device_name", device_id)
                        _fire_ha_notification(
                            title=f"Critical: {device_name}",
                            message=f"{attr_name.replace('_', ' ').title()} at {value} (threshold: {threshold_val})",
                            notification_id=f"mqtt_monitor_{alert_key.replace('/', '_')}",
                        )
                        _alert_active[alert_key] = now
                else:
                    # Value back below threshold — clear alert state
                    _alert_active.pop(alert_key, None)

    def _fire_ha_notification(title: str, message: str, notification_id: str):
        """Call HA persistent_notification.create via the Supervisor API."""
        token = os.environ.get("SUPERVISOR_TOKEN")
        if not token:
            logger.debug("No SUPERVISOR_TOKEN, skipping HA notification")
            return
        try:
            import urllib.request
            import json as _json
            url = "http://supervisor/core/api/services/persistent_notification/create"
            data = _json.dumps({"title": title, "message": message, "notification_id": notification_id}).encode()
            req = urllib.request.Request(url, data=data, method="POST", headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            })
            urllib.request.urlopen(req, timeout=10)
            logger.info(f"HA notification sent: {title}")
        except Exception as exc:
            logger.warning(f"Failed to send HA notification: {exc}")

    def _cleanup_stale_devices():
        """Delete devices offline longer than the configured TTL."""
        settings = settings_mgr.get_settings()
        cleanup_days = settings.get("device_cleanup_days", 0)
        if cleanup_days <= 0:
            return
        now = time.time()
        cutoff = cleanup_days * 86400
        devices = registry.get_all_devices()
        to_delete = []
        for device_id, device in devices.items():
            if device.get("status") == "offline":
                last_seen = device.get("last_seen", 0)
                if last_seen > 0 and now - last_seen > cutoff:
                    to_delete.append(device_id)
        for device_id in to_delete:
            logger.info(f"Auto-cleanup: removing device {device_id} (offline > {cleanup_days} days)")
            ha_entities.remove_device_entities(device_id, devices[device_id])
            registry.delete_device(device_id)

    def _heartbeat_worker():
        while True:
            try:
                registry.check_stale_devices(timeout_seconds=300)
                _check_crit_alerts()
                _cleanup_stale_devices()
            except Exception as exc:
                logger.error(f"Heartbeat checker error: {exc}")
            time.sleep(60)

    heartbeat_thread = threading.Thread(target=_heartbeat_worker, daemon=True, name="heartbeat-checker")
    heartbeat_thread.start()

    # Serve frontend SPA via catch-all GET route instead of app.mount().
    # Starlette's StaticFiles mount at "/" intercepts WebSocket upgrade
    # requests and throws AssertionError. A GET route only matches HTTP.
    frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
    if frontend_dist.exists():
        from fastapi.responses import FileResponse

        @app.get("/{full_path:path}")
        async def serve_frontend(full_path: str):
            file_path = (frontend_dist / full_path).resolve()
            if full_path and file_path.is_relative_to(frontend_dist.resolve()) and file_path.is_file():
                return FileResponse(file_path)
            return FileResponse(frontend_dist / "index.html")

    return app


def main():
    log_level = os.environ.get("LOG_LEVEL", "info").upper()
    logging.basicConfig(
        level=getattr(logging, log_level, logging.INFO),
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    inner_app = create_app()

    # Wrap the ASGI app to suppress AssertionError from Starlette's
    # StaticFiles when HA ingress sends WebSocket probes to non-WS paths.
    # The error is harmless but floods the logs with tracebacks.
    async def app(scope, receive, send):
        try:
            await inner_app(scope, receive, send)
        except AssertionError as e:
            if scope.get("type") == "websocket":
                pass  # StaticFiles raises on WebSocket probes
            else:
                logger.error(f"Unexpected AssertionError: {e}", exc_info=True)
                raise

    # Only show HTTP access logs at DEBUG level
    access_log = log_level == "DEBUG"

    port = int(os.environ.get("PORT", "8100"))
    uvicorn.run(app, host="0.0.0.0", port=port, access_log=access_log)


if __name__ == "__main__":
    main()

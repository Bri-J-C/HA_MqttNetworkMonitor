"""Entry point for the MQTT Network Monitor add-on."""

import asyncio
import logging
import os
import sys
from pathlib import Path

import uvicorn

from server.api.routes import app, init_app
from server.api.websocket import ws_manager
from server.command_sender import CommandSender
from server.device_registry import DeviceRegistry
from server.ha_entities import HAEntityManager
from server.mqtt_handler import MQTTHandler
from server.storage.store import Storage
from server.topology import TopologyEngine
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger(__name__)

# WebSocket endpoint
@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)


def create_app():
    data_dir = Path(os.environ.get("DATA_DIR", "/data"))
    mqtt_broker = os.environ.get("MQTT_BROKER", "localhost")
    mqtt_port = int(os.environ.get("MQTT_PORT", "1883"))
    mqtt_user = os.environ.get("MQTT_USER")
    mqtt_pass = os.environ.get("MQTT_PASSWORD")

    storage = Storage(data_dir)
    registry = DeviceRegistry(storage)
    topology_engine = TopologyEngine(registry, storage)
    mqtt_handler = MQTTHandler(registry, mqtt_broker, mqtt_port, mqtt_user, mqtt_pass)
    ha_entities = HAEntityManager(mqtt_handler._client)
    command_sender = CommandSender(mqtt_handler)

    def on_device_update(device_id: str):
        device = registry.get_device(device_id)
        if device:
            ha_entities.update_device_states(device_id, device)
            loop = asyncio.new_event_loop()
            try:
                loop.run_until_complete(ws_manager.broadcast({
                    "type": "device_update",
                    "device_id": device_id,
                    "device": device,
                }))
            finally:
                loop.close()

    mqtt_handler.on_device_update(on_device_update)
    init_app(registry, topology_engine, command_sender, mqtt_handler)
    mqtt_handler.connect()

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

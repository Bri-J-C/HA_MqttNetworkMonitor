"""REST API endpoints for the MQTT Network Monitor add-on."""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from typing import Any

app = FastAPI(title="MQTT Network Monitor")

# These get set by main.py on startup
registry = None
topology = None
command_sender = None
mqtt_handler = None


def init_app(reg, topo, cmd_sender, mqtt_hdlr):
    global registry, topology, command_sender, mqtt_handler
    registry = reg
    topology = topo
    command_sender = cmd_sender
    mqtt_handler = mqtt_hdlr


@app.get("/api/devices")
def get_devices():
    return registry.get_all_devices()


@app.get("/api/devices/{device_id}")
def get_device(device_id: str):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@app.get("/api/topology")
def get_topology():
    return topology.auto_discover()


@app.get("/api/topology/layouts")
def get_layouts():
    return topology.get_layouts()


@app.post("/api/topology/layouts")
def save_layout(layout: dict[str, Any]):
    return topology.save_layout(layout)


@app.delete("/api/topology/layouts/{layout_id}")
def delete_layout(layout_id: str):
    if not topology.delete_layout(layout_id):
        raise HTTPException(status_code=404, detail="Layout not found")
    return {"status": "deleted"}


@app.post("/api/devices/{device_id}/command")
def send_command(device_id: str, body: dict[str, Any]):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    command = body.get("command")
    params = body.get("params", {})
    if not command:
        raise HTTPException(status_code=400, detail="Missing 'command' field")
    request_id = command_sender.send(device_id, command, params)
    return {"request_id": request_id, "status": "sent"}


@app.get("/api/groups")
def get_groups():
    return registry.get_groups()


@app.post("/api/groups")
def create_group(body: dict[str, Any]):
    group_id = body.get("id")
    name = body.get("name")
    device_ids = body.get("device_ids", [])
    if not group_id or not name:
        raise HTTPException(status_code=400, detail="Missing 'id' or 'name'")
    return registry.create_group(group_id, name, device_ids)

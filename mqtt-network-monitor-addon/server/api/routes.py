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
tag_registry = None
settings_manager = None
settings_resolver = None
ha_entity_manager = None


def init_app(reg, topo, cmd_sender, mqtt_hdlr, tag_reg=None, settings_mgr=None, ha_mgr=None):
    global registry, topology, command_sender, mqtt_handler
    global tag_registry, settings_manager, ha_entity_manager
    registry = reg
    topology = topo
    command_sender = cmd_sender
    mqtt_handler = mqtt_hdlr
    tag_registry = tag_reg
    settings_manager = settings_mgr
    ha_entity_manager = ha_mgr


# ── Devices ────────────────────────────────────────────────────────────────

@app.get("/api/devices")
def get_devices():
    return registry.get_all_devices()


@app.get("/api/devices/{device_id}")
def get_device(device_id: str):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@app.delete("/api/devices/{device_id}")
def delete_device(device_id: str):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    # Remove HA entities before deleting from registry
    if ha_entity_manager:
        ha_entity_manager.remove_device_entities(device_id, device)
    # Clear retained MQTT messages so device doesn't recreate on reconnect
    if mqtt_handler:
        mqtt_handler._client.publish(f"network_monitor/{device_id}/status", "", retain=True)
        mqtt_handler._client.publish(f"network_monitor/{device_id}/system_resources", "", retain=True)
        mqtt_handler._client.publish(f"network_monitor/{device_id}/network_info", "", retain=True)
        mqtt_handler._client.publish(f"network_monitor/{device_id}/custom_command", "", retain=True)
        mqtt_handler._client.publish(f"network_monitor/{device_id}/telemetry", "", retain=True)
        mqtt_handler._client.publish(f"network_monitor/{device_id}/system", "", retain=True)
    registry.delete_device(device_id)
    return {"status": "deleted"}


@app.delete("/api/devices")
def delete_all_devices():
    """Delete all devices from the registry and clean up HA entities."""
    all_devices = registry.get_all_devices()
    for device_id, device in list(all_devices.items()):
        if ha_entity_manager:
            ha_entity_manager.remove_device_entities(device_id, device)
        if mqtt_handler:
            for topic_suffix in ["status", "system_resources", "network_info", "custom_command", "telemetry", "system"]:
                mqtt_handler._client.publish(f"network_monitor/{device_id}/{topic_suffix}", "", retain=True)
        registry.delete_device(device_id)
    return {"status": "deleted", "count": len(all_devices)}


@app.get("/api/devices/{device_id}/effective-settings")
def get_effective_settings(device_id: str):
    from server.settings_resolver import resolve_settings
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    global_settings = settings_manager.get_settings() if settings_manager else {}
    groups = registry.get_groups()
    return resolve_settings(device, groups, global_settings)


@app.put("/api/devices/{device_id}/settings")
def update_device_settings(device_id: str, body: dict[str, Any]):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    result = registry.set_device_settings(device_id, body)
    if not result:
        raise HTTPException(status_code=404, detail="Device not found")
    return result


@app.post("/api/devices/{device_id}/push-config")
def push_device_config(device_id: str, body: dict[str, Any]):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    mqtt_handler.push_config(device_id, body)
    # Store the pushed config on the device record so the frontend can read it back
    registry.set_device_settings(device_id, {"remote_config": body})
    return {"status": "pushed", "device_id": device_id}


# ── Topology ───────────────────────────────────────────────────────────────

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


# ── Device commands ────────────────────────────────────────────────────────

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


# ── Groups ─────────────────────────────────────────────────────────────────

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


@app.put("/api/groups/{group_id}")
def update_group(group_id: str, body: dict[str, Any]):
    result = registry.update_group(
        group_id,
        name=body.get("name"),
        device_ids=body.get("device_ids"),
        custom_commands=body.get("custom_commands"),
        custom_sensors=body.get("custom_sensors"),
        thresholds=body.get("thresholds"),
    )
    if not result:
        raise HTTPException(status_code=404, detail="Group not found")
    return result


@app.delete("/api/groups/{group_id}")
def delete_group(group_id: str):
    if not registry.delete_group(group_id):
        raise HTTPException(status_code=404, detail="Group not found")
    return {"status": "deleted"}


@app.post("/api/groups/{group_id}/command")
def group_command(group_id: str, body: dict[str, Any]):
    groups = registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    command = body.get("command")
    params = body.get("params", {})
    if not command:
        raise HTTPException(status_code=400, detail="Missing 'command' field")
    results = []
    for device_id in group.get("device_ids", []):
        if registry.get_device(device_id):
            request_id = command_sender.send(device_id, command, params)
            results.append({"device_id": device_id, "request_id": request_id, "status": "sent"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}


@app.post("/api/groups/{group_id}/push-config")
def group_push_config(group_id: str, body: dict[str, Any]):
    groups = registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    results = []
    for device_id in group.get("device_ids", []):
        if registry.get_device(device_id):
            mqtt_handler.push_config(device_id, body)
            results.append({"device_id": device_id, "status": "pushed"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}


# ── Device tags ────────────────────────────────────────────────────────────

@app.post("/api/devices/{device_id}/tags")
def set_device_tags(device_id: str, body: dict[str, Any]):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    tags = body.get("tags", [])
    registry.set_server_tags(device_id, tags)
    return {"tags": registry.get_device(device_id).get("server_tags", [])}


@app.post("/api/devices/{device_id}/tags/add")
def add_device_tags(device_id: str, body: dict[str, Any]):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    tags = body.get("tags", [])
    registry.add_server_tags(device_id, tags)
    return {"tags": registry.get_device(device_id).get("server_tags", [])}


@app.delete("/api/devices/{device_id}/tags/{tag}")
def remove_device_tag(device_id: str, tag: str):
    device = registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    registry.remove_server_tag(device_id, tag)
    return {"tags": registry.get_device(device_id).get("server_tags", [])}


# ── Tag registry ───────────────────────────────────────────────────────────

@app.get("/api/tags")
def get_tags():
    devices = registry.get_all_devices() if registry else {}
    return tag_registry.get_all_tags(devices)


@app.post("/api/tags")
def create_tag(body: dict[str, Any]):
    tag = body.get("tag", "").strip()
    if not tag:
        raise HTTPException(status_code=400, detail="Missing 'tag' field")
    try:
        added = tag_registry.add_tag(tag)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if not added:
        raise HTTPException(status_code=409, detail="Tag already exists")
    return {"tag": tag}


@app.put("/api/tags/{tag}")
def rename_tag(tag: str, body: dict[str, Any]):
    new_name = body.get("new_name", "").strip()
    if not new_name:
        raise HTTPException(status_code=400, detail="Missing 'new_name' field")
    try:
        result = tag_registry.rename_tag(tag, new_name)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    if not result:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"tag": new_name}


@app.delete("/api/tags/{tag}")
def delete_tag(tag: str):
    result = tag_registry.delete_tag(tag)
    if not result:
        raise HTTPException(status_code=404, detail="Tag not found")
    return {"status": "deleted"}


# ── Global settings ────────────────────────────────────────────────────────

@app.get("/api/settings")
def get_settings():
    return settings_manager.get_settings()


@app.put("/api/settings")
def update_settings(body: dict[str, Any]):
    return settings_manager.update_settings(body)


# ── Serve frontend static files ────────────────────────────────────────────

frontend_dist = Path(__file__).parent.parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")

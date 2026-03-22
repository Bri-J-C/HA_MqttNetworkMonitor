"""Group-related REST API endpoints."""

from fastapi import APIRouter, HTTPException
from typing import Any
from server.api import state

router = APIRouter(prefix="/api/groups", tags=["groups"])


@router.get("")
def get_groups():
    return state.registry.get_groups()


@router.post("")
def create_group(body: dict[str, Any]):
    group_id = body.get("id")
    name = body.get("name")
    device_ids = body.get("device_ids", [])
    if not group_id or not name:
        raise HTTPException(status_code=400, detail="Missing 'id' or 'name'")
    return state.registry.create_group(group_id, name, device_ids)


@router.put("/{group_id}")
def update_group(group_id: str, body: dict[str, Any]):
    result = state.registry.update_group(
        group_id,
        name=body.get("name"),
        device_ids=body.get("device_ids"),
        custom_commands=body.get("custom_commands"),
        custom_sensors=body.get("custom_sensors"),
        thresholds=body.get("thresholds"),
        hidden_commands=body.get("hidden_commands"),
    )
    if not result:
        raise HTTPException(status_code=404, detail="Group not found")
    return result


@router.delete("/{group_id}")
def delete_group(group_id: str):
    if not state.registry.delete_group(group_id):
        raise HTTPException(status_code=404, detail="Group not found")
    return {"status": "deleted"}


@router.post("/{group_id}/command")
def group_command(group_id: str, body: dict[str, Any]):
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    command = body.get("command")
    params = body.get("params", {})
    if not command:
        raise HTTPException(status_code=400, detail="Missing 'command' field")
    results = []
    for device_id in group.get("device_ids", []):
        if state.registry.get_device(device_id):
            request_id = state.command_sender.send(device_id, command, params)
            results.append({"device_id": device_id, "request_id": request_id, "status": "sent"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}


@router.post("/{group_id}/push-config")
def group_push_config(group_id: str, body: dict[str, Any]):
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    results = []
    for device_id in group.get("device_ids", []):
        if state.registry.get_device(device_id):
            state.mqtt_handler.push_config(device_id, body)
            state.registry.set_device_settings(device_id, {"remote_config": body})
            results.append({"device_id": device_id, "status": "pushed"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}

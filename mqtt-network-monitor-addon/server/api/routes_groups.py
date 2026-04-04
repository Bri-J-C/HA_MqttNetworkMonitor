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


_ALLOWED_GROUP_FIELDS = {
    "name", "device_ids", "custom_commands", "custom_sensors",
    "thresholds", "crit_thresholds", "hidden_commands", "hidden_attributes",
    "card_attributes", "interval", "attribute_transforms",
}


@router.put("/{group_id}")
def update_group(group_id: str, body: dict[str, Any]):
    from server.config_assembler import assemble_and_push
    fields = {k: v for k, v in body.items() if k in _ALLOWED_GROUP_FIELDS}
    if not fields:
        raise HTTPException(status_code=400, detail="No valid fields provided")
    result = state.registry.update_group(group_id, fields)
    if not result:
        raise HTTPException(status_code=404, detail="Group not found")
    # Always push config to members after any group change
    for device_id in result.get("device_ids", []):
        if state.registry.get_device(device_id) and state.mqtt_handler:
            assemble_and_push(device_id, state.registry, state.mqtt_handler)
    return result


@router.delete("/{group_id}")
def delete_group(group_id: str):
    from server.config_assembler import assemble_and_push
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    member_ids = list(group.get("device_ids", []))
    if not state.registry.delete_group(group_id):
        raise HTTPException(status_code=404, detail="Group not found")
    # Re-push config to former members (now without group contributions)
    for device_id in member_ids:
        if state.registry.get_device(device_id) and state.mqtt_handler:
            assemble_and_push(device_id, state.registry, state.mqtt_handler)
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
def group_push_config(group_id: str, body: dict[str, Any] = None):
    from server.config_assembler import assemble_and_push
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    results = []
    for device_id in group.get("device_ids", []):
        device = state.registry.get_device(device_id)
        if device:
            assemble_and_push(device_id, state.registry, state.mqtt_handler)
            results.append({"device_id": device_id, "status": "pushed"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}


@router.post("/{group_id}/force-apply")
def force_apply_group(group_id: str):
    """Clear all device-level overrides for group members, enforcing group policy."""
    from server.config_assembler import assemble_and_push
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    clear_fields = {
        "threshold_overrides": {},
        "crit_threshold_overrides": {},
        "attribute_transforms": {},
        "card_attributes": [],
        "hidden_attributes": [],
        "ha_exposure_overrides": {},
    }

    results = []
    for device_id in group.get("device_ids", []):
        device = state.registry.get_device(device_id)
        if device:
            state.registry.set_device_settings(device_id, clear_fields)
            assemble_and_push(device_id, state.registry, state.mqtt_handler)
            results.append({"device_id": device_id, "status": "applied"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}

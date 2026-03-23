"""Group-related REST API endpoints."""

from fastapi import APIRouter, HTTPException
from typing import Any
from server.api import state

router = APIRouter(prefix="/api/groups", tags=["groups"])


def _format_threshold(val) -> str:
    """Format a threshold value for display."""
    if isinstance(val, dict):
        op = val.get("op", ">")
        v = val.get("value", "?")
        return f"{op} {v}"
    return f"> {val}"


def _build_conflicts(group: dict, devices: dict, candidate_device_id: str | None = None) -> list[dict]:
    """Compare group policy against member devices and return a list of conflict records."""
    device_ids = [candidate_device_id] if candidate_device_id else group.get("device_ids", [])
    group_commands = group.get("custom_commands") or {}
    group_sensors = group.get("custom_sensors") or {}
    group_thresholds = group.get("thresholds") or {}

    conflicts = []
    for device_id in device_ids:
        device = devices.get(device_id)
        if not device:
            continue
        device_name = device.get("device_name") or device_id

        # Commands: group vs device server_commands
        device_server_commands = device.get("server_commands") or {}
        for cmd_name, group_shell in group_commands.items():
            if cmd_name in device_server_commands:
                device_shell = device_server_commands[cmd_name]
                if device_shell != group_shell:
                    conflicts.append({
                        "device_id": device_id,
                        "device_name": device_name,
                        "type": "command",
                        "name": cmd_name,
                        "device_value": device_shell,
                        "group_value": group_shell,
                        "action": "Group command will replace device command",
                    })

        # Sensors: group vs device remote_config
        remote_config = device.get("remote_config") or {}
        plugins = remote_config.get("plugins") or {}
        custom_command_cfg = plugins.get("custom_command") or {}
        device_sensors = custom_command_cfg.get("commands") or {}
        for sensor_name, group_sensor in group_sensors.items():
            if sensor_name in device_sensors:
                device_sensor = device_sensors[sensor_name]
                device_cmd = device_sensor.get("command", "?") if isinstance(device_sensor, dict) else str(device_sensor)
                group_cmd = group_sensor.get("command", "?") if isinstance(group_sensor, dict) else str(group_sensor)
                if device_cmd != group_cmd:
                    conflicts.append({
                        "device_id": device_id,
                        "device_name": device_name,
                        "type": "sensor",
                        "name": sensor_name,
                        "device_value": device_cmd,
                        "group_value": group_cmd,
                        "action": "Group sensor will replace device sensor",
                    })

        # Thresholds: group vs device overrides
        device_thresholds = device.get("threshold_overrides") or {}
        for threshold_name, group_val in group_thresholds.items():
            if threshold_name in device_thresholds:
                device_val = device_thresholds[threshold_name]
                if device_val != group_val:
                    conflicts.append({
                        "device_id": device_id,
                        "device_name": device_name,
                        "type": "threshold",
                        "name": threshold_name,
                        "device_value": _format_threshold(device_val),
                        "group_value": _format_threshold(group_val),
                        "action": "Group threshold will take priority",
                    })

    return conflicts


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


@router.post("/{group_id}/check-conflicts")
def check_conflicts(group_id: str, body: dict[str, Any] = None):
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    body = body or {}
    candidate_device_id = body.get("new_device_id")
    devices = state.registry.get_all_devices()
    conflicts = _build_conflicts(group, devices, candidate_device_id)
    device_ids = [candidate_device_id] if candidate_device_id else group.get("device_ids", [])
    device_count = sum(1 for did in device_ids if devices.get(did))
    return {
        "conflicts": conflicts,
        "device_count": device_count,
        "conflict_count": len(conflicts),
    }


@router.post("/{group_id}/push-config")
def group_push_config(group_id: str, body: dict[str, Any]):
    groups = state.registry.get_groups()
    group = groups.get(group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    devices = state.registry.get_all_devices()
    # Resolve conflicts before deploying: group wins over device-specific settings
    conflicts = _build_conflicts(group, devices)
    results = []
    for device_id in group.get("device_ids", []):
        device = state.registry.get_device(device_id)
        if device:
            # Clean up conflicting device-specific settings so group policy wins cleanly
            device_conflicts = [c for c in conflicts if c["device_id"] == device_id]
            if device_conflicts:
                updated_server_commands = dict(device.get("server_commands") or {})
                updated_remote_config = dict(device.get("remote_config") or {})

                for conflict in device_conflicts:
                    if conflict["type"] == "command":
                        updated_server_commands.pop(conflict["name"], None)
                    elif conflict["type"] == "sensor":
                        # Remove conflicting sensor from device's remote_config
                        rc_plugins = dict((updated_remote_config.get("plugins") or {}))
                        rc_cc = dict((rc_plugins.get("custom_command") or {}))
                        rc_commands = dict((rc_cc.get("commands") or {}))
                        rc_commands.pop(conflict["name"], None)
                        rc_cc["commands"] = rc_commands
                        rc_plugins["custom_command"] = rc_cc
                        updated_remote_config["plugins"] = rc_plugins
                    # threshold conflicts: group wins via cascade, no cleanup needed

                state.registry.set_device_settings(device_id, {
                    "server_commands": updated_server_commands,
                    "remote_config": updated_remote_config,
                })

            state.mqtt_handler.push_config(device_id, body)
            state.registry.set_device_settings(device_id, {"remote_config": body})
            results.append({"device_id": device_id, "status": "pushed"})
        else:
            results.append({"device_id": device_id, "status": "device_not_found"})
    return {"results": results}

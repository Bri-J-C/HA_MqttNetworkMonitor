"""Device-related REST API endpoints."""

from fastapi import APIRouter, HTTPException, Query
from typing import Any
from server.api import state
from server.config_assembler import assemble_and_push

router = APIRouter(prefix="/api/devices", tags=["devices"])


@router.get("")
def get_devices(since: float = Query(default=0)):
    all_devices = state.registry.get_all_devices()
    if since > 0:
        return {did: d for did, d in all_devices.items() if d.get("last_seen", 0) > since}
    return all_devices


@router.get("/{device_id}")
def get_device(device_id: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.delete("")
def delete_all_devices():
    """Delete all devices from the registry and clean up HA entities."""
    all_devices = state.registry.get_all_devices()
    for device_id, device in list(all_devices.items()):
        if state.ha_entity_manager:
            state.ha_entity_manager.remove_device_entities(device_id, device)
        if state.mqtt_handler:
            for topic_suffix in ["status", "system_resources", "network_info", "custom_command", "telemetry", "system"]:
                state.mqtt_handler._client.publish(f"network_monitor/{device_id}/{topic_suffix}", "", retain=True)
        state.registry.delete_device(device_id)
    return {"status": "deleted", "count": len(all_devices)}


@router.delete("/{device_id}")
def delete_device(device_id: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    # Remove HA entities before deleting from registry
    if state.ha_entity_manager:
        state.ha_entity_manager.remove_device_entities(device_id, device)
    # Clear retained MQTT messages so device doesn't recreate on reconnect
    if state.mqtt_handler:
        for topic_suffix in ["status", "system_resources", "network_info", "custom_command", "telemetry", "system"]:
            state.mqtt_handler._client.publish(f"network_monitor/{device_id}/{topic_suffix}", "", retain=True)
    state.registry.delete_device(device_id)
    return {"status": "deleted"}


@router.delete("/{device_id}/attributes/{attr_name}")
def delete_attribute(device_id: str, attr_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    # Check if it's a custom_command sensor we can actually remove from the client
    remote_config = device.get("remote_config", {})
    cc = remote_config.get("plugins", {}).get("custom_command", {}).get("commands", {})
    is_custom = attr_name in cc

    # Check if any active plugin owns this attribute
    plugin_attrs = device.get("_plugin_attrs", {})
    has_plugin_owner = any(attr_name in attrs for attrs in plugin_attrs.values())

    if is_custom:
        # Remove from client config and push
        del cc[attr_name]
        if state.mqtt_handler:
            state.mqtt_handler.push_config(device_id, remote_config)
        state.registry.set_device_settings(device_id, {"remote_config": remote_config})
        state.registry.delete_attribute(device_id, attr_name)
        status = "deleted"
    elif has_plugin_owner:
        # Active plugin attribute — hide it (will reappear if we delete)
        hidden = device.get("hidden_attributes", [])
        if attr_name not in hidden:
            hidden.append(attr_name)
            state.registry.set_device_settings(device_id, {"hidden_attributes": hidden})
        status = "hidden"
    else:
        # Orphan attribute — no plugin owns it, just delete
        state.registry.delete_attribute(device_id, attr_name)
        status = "deleted"

    # Remove HA entity either way
    if state.ha_entity_manager:
        state.ha_entity_manager._remove_sensor(device_id, attr_name)
        state.ha_entity_manager._mqtt.publish(f"network_monitor/{device_id}/ha/{attr_name}", "", retain=True)

    # Also remove from card_attributes if pinned
    card_attrs = device.get("card_attributes", [])
    if attr_name in card_attrs:
        card_attrs.remove(attr_name)
        state.registry.set_device_settings(device_id, {"card_attributes": card_attrs})

    return {"status": status}


@router.post("/{device_id}/attributes/{attr_name}/unhide")
def unhide_attribute(device_id: str, attr_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    hidden = device.get("hidden_attributes", [])
    if attr_name in hidden:
        hidden.remove(attr_name)
        state.registry.set_device_settings(device_id, {"hidden_attributes": hidden})
    return {"status": "unhidden"}


@router.delete("/{device_id}/commands/{cmd_name}")
def hide_command(device_id: str, cmd_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    hidden = device.get("hidden_commands", [])
    if cmd_name not in hidden:
        hidden.append(cmd_name)
        state.registry.set_device_settings(device_id, {"hidden_commands": hidden})
    return {"status": "hidden"}


@router.post("/{device_id}/commands/{cmd_name}/unhide")
def unhide_command(device_id: str, cmd_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    hidden = device.get("hidden_commands", [])
    if cmd_name in hidden:
        hidden.remove(cmd_name)
        state.registry.set_device_settings(device_id, {"hidden_commands": hidden})
    return {"status": "unhidden"}


@router.get("/{device_id}/effective-settings")
def get_effective_settings(device_id: str):
    from server.settings_resolver import resolve_settings
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    global_settings = state.settings_manager.get_settings() if state.settings_manager else {}
    groups = state.registry.get_groups()
    return resolve_settings(device, groups, global_settings)


@router.put("/{device_id}/settings")
def update_device_settings(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    result = state.registry.set_device_settings(device_id, body)
    if not result:
        raise HTTPException(status_code=404, detail="Device not found")
    return result


@router.post("/{device_id}/server-commands")
def add_server_command(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    name = body.get("name")
    shell = body.get("shell")
    if not name or not shell:
        raise HTTPException(status_code=400, detail="Missing 'name' or 'shell'")
    cmds = dict(device.get("server_commands") or {})
    cmds[name] = shell
    state.registry.set_device_settings(device_id, {"server_commands": cmds})
    if state.mqtt_handler:
        assemble_and_push(device_id, state.registry, state.mqtt_handler)
    return state.registry.get_device(device_id)


@router.delete("/{device_id}/server-commands/{cmd_name}")
def remove_server_command(device_id: str, cmd_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    cmds = dict(device.get("server_commands") or {})
    cmds.pop(cmd_name, None)
    state.registry.set_device_settings(device_id, {"server_commands": cmds})
    if state.mqtt_handler:
        assemble_and_push(device_id, state.registry, state.mqtt_handler)
    if state.ha_entity_manager:
        state.ha_entity_manager._remove_sensor(device_id, cmd_name)
    return state.registry.get_device(device_id)


@router.post("/{device_id}/server-sensors")
def add_server_sensor(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    name = body.get("name")
    command = body.get("command")
    if not name or not command:
        raise HTTPException(status_code=400, detail="Missing 'name' or 'command'")
    sensor = {"command": command, "unit": body.get("unit", "")}
    if "interval" in body:
        sensor["interval"] = body["interval"]
    sensors = dict(device.get("server_sensors") or {})
    sensors[name] = sensor
    state.registry.set_device_settings(device_id, {"server_sensors": sensors})
    if state.mqtt_handler:
        assemble_and_push(device_id, state.registry, state.mqtt_handler)
    return state.registry.get_device(device_id)


@router.delete("/{device_id}/server-sensors/{sensor_name}")
def remove_server_sensor(device_id: str, sensor_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    sensors = dict(device.get("server_sensors") or {})
    sensors.pop(sensor_name, None)
    state.registry.set_device_settings(device_id, {"server_sensors": sensors})
    if state.mqtt_handler:
        assemble_and_push(device_id, state.registry, state.mqtt_handler)
    if state.ha_entity_manager:
        state.ha_entity_manager._remove_sensor(device_id, sensor_name)
    return state.registry.get_device(device_id)


@router.put("/{device_id}/config-interval")
def set_config_interval(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    interval = body.get("interval")
    if interval is None:
        raise HTTPException(status_code=400, detail="Missing 'interval'")
    state.registry.set_device_settings(device_id, {"config_interval": interval})
    if state.mqtt_handler:
        assemble_and_push(device_id, state.registry, state.mqtt_handler)
    return state.registry.get_device(device_id)


@router.post("/{device_id}/push-config")
def push_device_config(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    state.mqtt_handler.push_config(device_id, body)
    # Full replacement — no merge
    state.registry.set_device_settings(device_id, {"remote_config": body})
    return {"status": "pushed", "device_id": device_id}


@router.post("/{device_id}/command")
def send_command(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    command = body.get("command")
    params = body.get("params", {})
    if not command:
        raise HTTPException(status_code=400, detail="Missing 'command' field")
    request_id = state.command_sender.send(device_id, command, params)
    return {"request_id": request_id, "status": "sent"}


@router.post("/{device_id}/tags")
def set_device_tags(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    tags = body.get("tags", [])
    state.registry.set_server_tags(device_id, tags)
    return {"tags": state.registry.get_device(device_id).get("server_tags", [])}


@router.post("/{device_id}/tags/add")
def add_device_tags(device_id: str, body: dict[str, Any]):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    tags = body.get("tags", [])
    state.registry.add_server_tags(device_id, tags)
    return {"tags": state.registry.get_device(device_id).get("server_tags", [])}


@router.delete("/{device_id}/tags/{tag}")
def remove_device_tag(device_id: str, tag: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    state.registry.remove_server_tag(device_id, tag)
    return {"tags": state.registry.get_device(device_id).get("server_tags", [])}

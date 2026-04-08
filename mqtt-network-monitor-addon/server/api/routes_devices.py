"""Device-related REST API endpoints."""

import re
from fastapi import APIRouter, HTTPException, Query
from typing import Any
from server.api import state
from server.config_assembler import assemble_and_push

_DANGEROUS_PATTERNS = re.compile(
    r'`[^`]*`'          # backtick command substitution
    r'|\$\([^)]*\)'     # $() command substitution
    r'|\$\{[^}]*\}'     # ${} variable expansion
    r'|;\s*rm\s'         # rm after semicolon
    r'|&&\s*rm\s'        # rm after &&
    r'|\|\s*nc\s'        # piping to netcat
    r'|\|\s*curl\s'      # piping to curl
    r'|\|\s*wget\s'      # piping to wget
    r'|>\s*/etc/'        # writing to /etc
    r'|>\s*/dev/'        # writing to /dev
)


def _validate_shell_command(cmd: str) -> bool:
    """Returns True if command passes basic safety checks."""
    return not _DANGEROUS_PATTERNS.search(cmd)

router = APIRouter(prefix="/api/devices", tags=["devices"])


@router.get("")
def get_devices(since: float = Query(default=0)):
    all_devices = state.registry.get_all_devices()
    if since > 0:
        devices = {did: d for did, d in all_devices.items() if d.get("last_seen", 0) > since}
    else:
        devices = dict(all_devices)
    # Merge effective group settings so frontend sees resolved cascade
    if state.settings_manager:
        from server.settings_resolver import resolve_settings
        groups = state.registry.get_groups()
        global_settings = state.settings_manager.get_settings()
        for did, device in devices.items():
            if device.get("group_policy"):
                effective = resolve_settings(device, groups, global_settings)
                device["hidden_attributes"] = effective.get("hidden_attributes", [])
                device["card_attributes"] = effective.get("card_attributes", device.get("card_attributes", []))
                device["attribute_transforms"] = effective.get("attribute_transforms", {})
    return devices


@router.get("/{device_id}")
def get_device(device_id: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    # Merge effective group settings so frontend sees resolved cascade
    if device.get("group_policy") and state.settings_manager:
        from server.settings_resolver import resolve_settings
        groups = state.registry.get_groups()
        global_settings = state.settings_manager.get_settings()
        effective = resolve_settings(device, groups, global_settings)
        result = dict(device)
        result["hidden_attributes"] = effective.get("hidden_attributes", [])
        result["card_attributes"] = effective.get("card_attributes", device.get("card_attributes", []))
        result["attribute_transforms"] = effective.get("attribute_transforms", {})
        return result
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
                state.mqtt_handler.get_client().publish(f"network_monitor/{device_id}/{topic_suffix}", "", retain=True)
        state.registry.delete_device(device_id)
    from server.main import _last_broadcast_hash, _broadcast_lock
    with _broadcast_lock:
        _last_broadcast_hash.clear()
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
            state.mqtt_handler.get_client().publish(f"network_monitor/{device_id}/{topic_suffix}", "", retain=True)
    state.registry.delete_device(device_id)
    from server.main import _last_broadcast_hash, _broadcast_lock
    with _broadcast_lock:
        _last_broadcast_hash.pop(device_id, None)
    return {"status": "deleted"}


@router.delete("/{device_id}/attributes/{attr_name}")
def delete_attribute(device_id: str, attr_name: str):
    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    # Check if it's a server-defined sensor
    server_sensors = device.get("server_sensors") or {}
    is_server_sensor = attr_name in server_sensors

    # Check if it's a custom_command sensor in remote_config (legacy)
    remote_config = device.get("remote_config", {})
    cc = remote_config.get("plugins", {}).get("custom_command", {}).get("commands", {})
    is_custom = attr_name in cc

    # Check if any active plugin owns this attribute
    plugin_attrs = device.get("plugin_attrs", {})
    has_plugin_owner = any(attr_name in attrs for attrs in plugin_attrs.values())

    if is_server_sensor:
        # Remove from server_sensors and re-push via assembler
        sensors = dict(server_sensors)
        del sensors[attr_name]
        state.registry.set_device_settings(device_id, {"server_sensors": sensors})
        if state.mqtt_handler:
            assemble_and_push(device_id, state.registry, state.mqtt_handler)
        state.registry.delete_attribute(device_id, attr_name)
        status = "deleted"
    elif is_custom:
        # Legacy: remove from client config and push
        del cc[attr_name]
        if state.mqtt_handler:
            state.mqtt_handler.push_config(device_id, remote_config)
        state.registry.set_device_settings(device_id, {"remote_config": remote_config})
        state.registry.delete_attribute(device_id, attr_name)
        status = "deleted"
    elif has_plugin_owner:
        hidden = device.get("hidden_attributes", [])
        if attr_name not in hidden:
            hidden.append(attr_name)
            state.registry.set_device_settings(device_id, {"hidden_attributes": hidden})
        status = "hidden"
    else:
        state.registry.delete_attribute(device_id, attr_name)
        status = "deleted"

    # Remove HA entity either way
    if state.ha_entity_manager:
        state.ha_entity_manager.remove_sensor(device_id, attr_name)
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
    if not _validate_shell_command(shell):
        raise HTTPException(status_code=400, detail="Command contains potentially dangerous patterns")
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
        state.ha_entity_manager.remove_sensor(device_id, cmd_name)
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
    if not _validate_shell_command(command):
        raise HTTPException(status_code=400, detail="Sensor command contains potentially dangerous patterns")
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
        state.ha_entity_manager.remove_sensor(device_id, sensor_name)
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


@router.get("/{device_id}/history/{attr_name}")
def get_attribute_history(device_id: str, attr_name: str, hours: int = Query(default=24)):
    """Proxy HA history API for a device attribute."""
    import os
    import urllib.request
    import json as _json
    from datetime import datetime, timedelta, timezone

    device = state.registry.get_device(device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    token = os.environ.get("SUPERVISOR_TOKEN")
    if not token:
        raise HTTPException(status_code=503, detail="No Supervisor token available")

    # Clamp hours
    if hours not in (1, 6, 24, 168):
        hours = 24

    # Look up actual entity_id from HA states using our unique_id
    unique_id = f"network_monitor_{device_id}_{attr_name}"
    entity_id = _resolve_entity_id(token, unique_id, device_id, attr_name)
    if not entity_id:
        raise HTTPException(status_code=404, detail=f"HA entity not found for {unique_id}")

    start = (datetime.now(timezone.utc) - timedelta(hours=hours)).strftime("%Y-%m-%dT%H:%M:%SZ")
    url = f"http://supervisor/core/api/history/period/{start}?filter_entity_id={entity_id}&minimal_response&no_attributes"

    try:
        req = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = _json.loads(resp.read())
            # HA returns [[{state, last_changed, ...}, ...]] — array of arrays
            if data and isinstance(data, list) and len(data) > 0:
                return data[0]
            return []
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch history: {e}")


# Cache entity registry lookups (unique_id → entity_id)
_entity_id_cache: dict[str, str] = {}
_entity_cache_time: float = 0


def _resolve_entity_id(token: str, unique_id: str, device_id: str, attr_name: str) -> str | None:
    """Look up the actual HA entity_id by querying all states and matching
    by the state topic pattern or friendly name pattern we set during discovery.

    We set the MQTT state_topic to: network_monitor/{device_id}/ha/{attr_name}
    And the friendly name to: {device_name} {Attr Name Title}
    """
    import time
    import urllib.request
    import json as _json
    import logging

    logger = logging.getLogger(__name__)
    global _entity_id_cache, _entity_cache_time

    # Use cache if fresh (refresh every 5 min)
    now = time.time()
    if unique_id in _entity_id_cache and now - _entity_cache_time < 300:
        return _entity_id_cache[unique_id]

    try:
        url = "http://supervisor/core/api/states"
        req = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            states = _json.loads(resp.read())

        # Rebuild entire cache
        _entity_id_cache.clear()
        for s in states:
            eid = s.get("entity_id", "")
            attrs = s.get("attributes", {})
            # Match by friendly_name containing the attr pattern
            # or by entity_id containing our unique_id pattern (sanitized)
            fn = attrs.get("friendly_name", "")
            uid_sanitized = unique_id.replace("-", "_").lower()

            # Store all sensor entities for potential matching
            if eid.startswith("sensor."):
                # Try matching by the sanitized unique_id in the entity_id
                eid_clean = eid.replace("sensor.", "")
                if uid_sanitized == eid_clean:
                    _entity_id_cache[unique_id] = eid

        _entity_cache_time = now

        if unique_id in _entity_id_cache:
            return _entity_id_cache[unique_id]

        # Broader search: look for entity_id containing both device_id and attr_name
        device_clean = device_id.replace("-", "_").lower()
        attr_clean = attr_name.replace("-", "_").lower()
        for s in states:
            eid = s.get("entity_id", "")
            if eid.startswith("sensor.") and device_clean in eid and attr_clean in eid:
                _entity_id_cache[unique_id] = eid
                logger.info(f"Resolved entity: {unique_id} → {eid}")
                return eid

        logger.warning(f"Could not resolve entity for {unique_id}")
        return None
    except Exception as e:
        logger.error(f"Entity resolution failed: {e}")
        return None

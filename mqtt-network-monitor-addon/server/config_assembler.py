"""Config assembly — builds full config payload from device + group state and pushes to client."""

import logging

logger = logging.getLogger(__name__)

DEFAULT_INTERVAL = 30


def assemble_config(device_id: str, registry) -> dict:
    """Build the full config payload for a device from stored state.

    Merge order: device-level settings as base, group settings override on conflict.
    """
    device = registry.get_device(device_id)
    if not device:
        return {}

    groups = registry.get_groups()
    group_id = device.get("group_policy")
    group = groups.get(group_id) if group_id else None

    # When in a group, group is authoritative for commands and sensors.
    # Device-only commands/sensors are used when not in a group.
    if group:
        commands = dict(group.get("custom_commands") or {})
        sensors = dict(group.get("custom_sensors") or {})
    else:
        commands = dict(device.get("server_commands") or {})
        sensors = dict(device.get("server_sensors") or {})

    # Interval: group > device > default
    interval = None
    if group:
        interval = group.get("interval")
    if interval is None:
        interval = device.get("config_interval")
    if interval is None:
        interval = DEFAULT_INTERVAL

    return {
        "interval": interval,
        "plugins": {
            "custom_command": {
                "commands": sensors,
            },
        },
        "commands": commands,
    }


def assemble_and_push(device_id: str, registry, mqtt_handler) -> dict:
    """Assemble config, push to client via MQTT, and update device record."""
    config = assemble_config(device_id, registry)
    if not config:
        return {}

    # Read device state before updating remote_config, so we can identify
    # which allowed_commands entries came from the prior server push.
    device = registry.get_device(device_id)
    prev_remote_config = device.get("remote_config") or {}
    prev_server_cmd_keys = set((prev_remote_config.get("commands") or {}).keys())

    # Push to client
    mqtt_handler.push_config(device_id, config)

    # Store assembled config on device record and sync server_sensors
    pushed_sensors = config.get("plugins", {}).get("custom_command", {}).get("commands", {})

    # Remove attributes for sensors that were in the old config but not the new one
    prev_sensors = set((prev_remote_config.get("plugins", {})
                        .get("custom_command", {}).get("commands", {}).keys()))
    new_sensors = set(pushed_sensors.keys())
    removed_sensors = prev_sensors - new_sensors
    if removed_sensors:
        device_after = registry.get_device(device_id)
        if device_after:
            attrs = device_after.get("attributes", {})
            for sensor_name in removed_sensors:
                attrs.pop(sensor_name, None)
            registry.set_device_settings(device_id, {"attributes": attrs})

    registry.set_device_settings(device_id, {
        "remote_config": config,
        "server_sensors": pushed_sensors,
    })

    # Update allowed_commands immediately — combine server-assembled commands
    # with client's last-reported local commands.
    # Strip previously-pushed server command keys so removing a server command
    # also removes it from allowed_commands.
    server_cmd_keys = set(config.get("commands", {}).keys())
    client_local_cmds = [
        c for c in device.get("allowed_commands", [])
        if c not in server_cmd_keys and c not in prev_server_cmd_keys
    ]
    all_cmds = sorted(set(list(server_cmd_keys) + client_local_cmds))
    registry.set_device_settings(device_id, {"allowed_commands": all_cmds})

    logger.debug(f"Assembled config for {device_id}: interval={config.get('interval')}, "
                  f"commands={len(config.get('commands', {}))}, "
                  f"sensors={len((config.get('plugins', {}).get('custom_command', {}).get('commands', {})))}")
    return config

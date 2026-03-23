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

    # Commands: device base, group overwrites
    commands = dict(device.get("server_commands") or {})
    if group:
        commands.update(group.get("custom_commands") or {})

    # Sensors: device base, group overwrites
    sensors = dict(device.get("server_sensors") or {})
    if group:
        sensors.update(group.get("custom_sensors") or {})

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

    # Store assembled config on device record
    registry.set_device_settings(device_id, {"remote_config": config})

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

    logger.info(f"Assembled and pushed config to {device_id}")
    return config

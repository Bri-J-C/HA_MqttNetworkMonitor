# MQTT Network Monitor

## Overview

MQTT Network Monitor creates an interactive network map and device status dashboard in Home Assistant. Lightweight client agents run on your devices (Linux, Windows, Mac, ESP32), collect system metrics via a plugin architecture, and publish them over MQTT. The add-on aggregates this data, auto-discovers network topology, and exposes devices as HA entities.

## Setup

### 1. Install the Add-on

Add this repository to your Home Assistant add-on store, then install MQTT Network Monitor.

### 2. Configure MQTT

The add-on needs access to your MQTT broker. Set the MQTT host, port, username, and password in the add-on configuration. If using the Mosquitto add-on, set host to `core-mosquitto`.

### 3. Install Client Agents

Install the Python client on each device you want to monitor:

```bash
pip install mqtt-network-monitor
```

Create a `config.yaml`:

```yaml
mqtt:
  broker: YOUR_HA_IP
  port: 1883
  username: mqtt_user
  password: mqtt_password

device:
  id: my-device
  name: "My Device"
  type: linux
  tags: [office]

plugins:
  system_resources:
    interval: 30
    attributes: [cpu_usage, memory_usage, disk_usage, cpu_temp, uptime]
  network_info:
    interval: 60
    interfaces: [eth0]

allowed_commands:
  - reboot
  - shutdown
```

Run: `mqtt-monitor config.yaml`

### 4. Open the Web UI

Click "Open Web UI" on the add-on page, or find "Network Monitor" in the HA sidebar.

## Features

### Devices Page
- View all monitored devices with real-time status
- Filter by online/offline/warning status and tags
- Group view with collapsible sections and health summaries
- Click any device for full detail overlay

### Topology Page
- Interactive network map with auto-discovered topology
- Edit mode: drag devices, draw connections, add labels
- Save multiple layouts
- Set a default layout that loads automatically

### Settings Page
- **Tag Registry** — create and manage server-side tags
- **Group Policies** — set thresholds, commands, and sensors per group
- **Global Defaults** — default warning thresholds

### Remote Management
- Push custom sensors to devices (name + shell command)
- Push custom commands to devices
- Change collection intervals remotely
- All changes apply live without restarting the client

### Lovelace Cards
Two custom cards for your HA dashboards:
- **MQTT Device Status Card** — shows one device with attributes
- **MQTT Network Topology Card** — compact network overview

Cards auto-discover the add-on — just set `device_id` or `layout` in the card config.

## Troubleshooting

### Device not appearing
- Check that the client is running and connected to the MQTT broker
- Verify MQTT credentials match between client and add-on
- Check the add-on logs for connection errors

### Stale data
- Verify the client's collection interval is set appropriately
- Check the refresh interval dropdown on the Devices page

### Lovelace cards show "Device not found"
- Ensure the add-on is running
- Cards need the Supervisor API — they won't work outside of HA

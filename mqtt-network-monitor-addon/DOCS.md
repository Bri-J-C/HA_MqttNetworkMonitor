# MQTT Network Monitor

## Overview

MQTT Network Monitor creates an interactive network map and device status dashboard in Home Assistant. Lightweight client agents run on your devices (Linux, Windows, Mac, ESP32), collect system metrics via a plugin architecture, and publish them over MQTT. The add-on aggregates this data, auto-discovers network topology, and exposes devices as HA entities.

## Setup

### 1. Install the Add-on

Add this repository to your Home Assistant add-on store, then install MQTT Network Monitor.

### 2. Configure MQTT

The add-on needs access to your MQTT broker. Set the MQTT host, port, username, and password in the add-on configuration. If using the Mosquitto add-on, set host to `core-mosquitto`.

### 3. Install Client Agents

Two client implementations are available. See their individual READMEs for full setup details:

- Python (Linux, Windows, macOS): [`../monitor-clients/python/README.md`](../monitor-clients/python/README.md)
- ESP32 (firmware): [`../monitor-clients/esp32/README.md`](../monitor-clients/esp32/README.md)

**Python quick-start:**

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

**ESP32 quick-start:**

Flash the firmware and provision Wi-Fi and MQTT credentials via the serial console or the provisioning web page. The device will auto-register with the add-on on first connection. See the ESP32 README for build instructions and supported sensor definitions.

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
- **Group Policies** — per-group overrides for collection interval, warning thresholds, custom sensors pushed to group members, and custom commands pushed to group members
- **Global Defaults** — default warning thresholds

### Remote Management
- **Custom sensors** — each sensor is a name paired with a shell command; the client runs the command on the configured interval and publishes the output as a metric.
- **Custom commands** — commands are shell-command templates that can be triggered from the UI. The server pushes the command definition to the device; execution happens on the device when triggered.
- **Collection interval** — the polling interval for any sensor can be changed remotely without restarting the client.
- **Persistence** — remote changes are written to disk so they survive restarts. The Python client stores them in `config.remote.yaml` alongside the main config; the ESP32 client persists them in NVS (non-volatile storage).
- **ESP32 limitation** — ESP32 custom sensors are backed by compile-time function pointers registered in firmware. The server can adjust intervals and reassign which registered sensor runs on a given slot, but it cannot push entirely new sensor definitions (i.e. arbitrary shell commands) to an ESP32 device.
- All other changes apply live without restarting the client.

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

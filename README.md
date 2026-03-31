# MQTT Network Monitor

Plugin-based device monitoring for Home Assistant — collect system metrics from any device, visualize your network topology, and manage devices remotely, all over MQTT.

## What It Does

- **Monitor anything** — collect CPU, memory, disk, temperature, network, and custom shell-command metrics from Linux, Windows, macOS, and ESP32 devices using a plugin architecture
- **Network topology** — auto-discover device connections and view an interactive network map with drag-and-drop layout editing
- **Remote management** — push new sensors and commands to clients, change collection intervals, and send reboot/shutdown commands without touching the device
- **Device grouping** — organize devices by tags and groups, set per-group warning thresholds, and view health summaries per group
- **Multi-platform clients** — a full-featured Python client for desktop/server devices and a lightweight ESP32 client for embedded hardware
- **Home Assistant integration** — runs as an HA add-on with a built-in web UI, exposes devices as HA entities, and ships two custom Lovelace cards for dashboards

## Architecture

```
+------------------+        MQTT broker        +-----------------------------+
|  HA Add-on       | <-----------------------> |  Monitor Clients            |
|                  |                           |                             |
|  - Web UI        |   network_monitor/        |  Python (Linux/macOS/Win)   |
|  - REST API      |   {device_id}/status      |  ESP32 (embedded)           |
|  - Entity sync   |   {device_id}/{plugin}    |  Future (any MQTT device)   |
|  - Topology      |   {device_id}/command     |                             |
|  - Groups/Tags   |   {device_id}/config      |                             |
+------------------+                           +-----------------------------+
         |
         | Lovelace cards (JS)
         v
+------------------+
|  HA Dashboard    |
|  - Device card   |
|  - Topology card |
+------------------+
```

## Quick Start

**1. Install the add-on**

Add this repository to your Home Assistant add-on store and install MQTT Network Monitor. Configure your MQTT broker credentials (host, port, username, password) in the add-on settings, then start it.

**2. Install a client on each device you want to monitor**

Python client (Linux, macOS, Windows):

```bash
pip install mqtt-network-monitor

# Create config.yaml with your broker and device settings, then run:
mqtt-monitor config.yaml
```

ESP32 client — copy `monitor-clients/esp32/src/` into your PlatformIO project, set your Wi-Fi and MQTT credentials in `config.h`, and flash.

See [monitor-clients/python/README.md](monitor-clients/python/README.md) and [monitor-clients/esp32/README.md](monitor-clients/esp32/README.md) for full setup instructions.

**3. Open the dashboard**

Click "Open Web UI" on the add-on page in Home Assistant, or find "Network Monitor" in the HA sidebar. Devices appear automatically as clients connect.

## Monitor Clients

| Client | Platform | README |
|--------|----------|--------|
| Python | Linux, macOS, Windows | [monitor-clients/python/README.md](monitor-clients/python/README.md) |
| ESP32  | Embedded (ESP-IDF / Arduino) | [monitor-clients/esp32/README.md](monitor-clients/esp32/README.md) |

Any device that publishes the MQTT message format described below will appear in the dashboard automatically — no client library required.

## Add-on Features

See [mqtt-network-monitor-addon/DOCS.md](mqtt-network-monitor-addon/DOCS.md) for full documentation.

- **Devices page** — real-time status table with online/offline/warning filtering, tag filtering, and group view with health summaries
- **Topology page** — interactive network map; edit mode lets you drag devices, draw connections, add labels, and save named layouts
- **Settings / Groups** — tag registry, per-group warning thresholds and default commands, global defaults
- **Remote management** — push custom sensors (name + shell command), push custom commands, change collection intervals live without restarting clients
- **Lovelace cards** — MQTT Device Status Card (single device with attributes) and MQTT Network Topology Card (compact overview); see [lovelace-cards/README.md](lovelace-cards/README.md)

## MQTT Protocol

All topics use the prefix `network_monitor/{device_id}/`.

| Topic suffix | Direction | Purpose |
|---|---|---|
| `status` | client -> add-on | Full device status including all plugin data (retained) |
| `{plugin_name}` | client -> add-on | Per-plugin data published independently |
| `command` | add-on -> client | Send a command to the device |
| `command/response` | client -> add-on | Result of an executed command |
| `config` | add-on -> client | Push configuration changes (sensors, intervals) |
| `config/response` | client -> add-on | Acknowledgement of a config change |

### Message Format

Plugin data is published as JSON with this structure:

```json
{
  "device_id": "pi-garage",
  "timestamp": "2026-03-31T12:00:00Z",
  "attributes": {
    "cpu_usage": {
      "value": 14.2,
      "unit": "%"
    },
    "memory_usage": {
      "value": 42.1,
      "unit": "%"
    },
    "cpu_temp": {
      "value": 51.0,
      "unit": "C"
    }
  }
}
```

The `status` topic wraps all plugin data under a single payload. Each attribute object contains at minimum `value` and `unit`. Optional metadata fields include `warning_threshold`, `label` (display name override), and `icon`.

## Writing Plugins

Both clients have a plugin system that makes it straightforward to add new metric sources. Each plugin is a small module that collects data and returns it in the standard attribute format above. The add-on and Lovelace cards handle display automatically — no server-side changes needed.

- Python plugin guide: see the "Writing Plugins" section in [monitor-clients/python/README.md](monitor-clients/python/README.md)
- ESP32 plugin guide: see the "Writing Plugins" section in [monitor-clients/esp32/README.md](monitor-clients/esp32/README.md)

## Contributing

Bug reports and feature requests are welcome — open an issue on GitHub. Because the protocol is open, any device that publishes the MQTT message format above will appear in the dashboard without any changes to the add-on. Custom clients, new plugin modules, and alternative language implementations are all valid contributions.

## License

MIT

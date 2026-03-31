# MQTT Network Monitor -- Python Client

A plugin-based Python agent that collects system metrics, network information,
and custom sensor data from a device and publishes it to an MQTT broker. The
add-on server (or any MQTT subscriber) can then aggregate, display, and act on
this data. Remote management lets the server push configuration changes and
execute whitelisted commands on the device.

## Installation

Requires **Python 3.11+**.

```bash
# Clone the repository and enter the Python client directory
cd monitor-clients/python

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install in editable mode (includes paho-mqtt, psutil, PyYAML)
pip install -e .

# Copy the example config and edit it
cp config.example.yaml config.yaml
```

Optional: install `netifaces` for more reliable default-gateway detection in the
`network_info` plugin:

```bash
pip install netifaces
```

## Configuration

All settings live in `config.yaml`. The file has three top-level sections:
`mqtt`, `device`, and `plugins`, plus an `allowed_commands` list.

### Full reference

```yaml
mqtt:
  broker: 192.168.1.10        # MQTT broker hostname or IP
  port: 1883                   # MQTT broker port
  username: monitor            # (optional) MQTT username
  password: secret             # (optional) MQTT password

device:
  id: my-device                # Unique device ID (no spaces)
  name: "My Device"            # Human-readable display name
  type: raspberry_pi           # Device type (raspberry_pi, linux, windows, esp32, ...)
  tags: [home, servers]        # Tags for grouping and filtering

plugins:
  system_resources:
    interval: 30               # Collection interval in seconds (default: 30)
    attributes:                # List of attributes to collect (default: all)
      - cpu_usage
      - memory_usage
      - disk_usage
      - cpu_temp
      - uptime

  network_info:
    interval: 60               # Collection interval in seconds (default: 60)
    interfaces:                # Network interfaces to monitor
      - eth0
      - wlan0

  linux_system:
    interval: 300              # Collection interval in seconds (default: 300)
    attributes:                # List of attributes to collect (default: all)
      - pending_updates
      - security_updates
      - failed_services
      - running_services
      - logged_in_users
      - docker_running
      - docker_total
      - ufw_status
      - kernel_version
      - last_boot
      - open_ports
      - load_1m
      - load_5m
      - load_15m
      - swap_usage
    services:                  # Systemd services to monitor individually
      - nginx
      - mosquitto
      - docker

  custom_command:
    commands:
      my_metric:
        command: "echo 42"     # Shell command to run
        unit: ""               # Unit label for the value

allowed_commands:              # Commands the server may execute remotely
  - reboot
  - shutdown
  # - restart_service
```

## Plugins

Each plugin is a Python class that inherits from `BasePlugin`. It declares a
`name`, a `default_interval`, and a `collect()` method that returns a dict of
`{"attr_name": {"value": ..., "unit": "..."}}` entries.

All built-in plugins support an `interval` config key (seconds between
collections). The `system_resources` and `linux_system` plugins also accept an
`attributes` list to select which metrics to collect; omitting it collects all.

---

### system_resources

Collects core hardware metrics via `psutil`. Default interval: **30 seconds**.

| Attribute      | Type    | Unit | Description                                      |
|----------------|---------|------|--------------------------------------------------|
| `cpu_usage`    | float   | %    | Current CPU utilization percentage                |
| `memory_usage` | float   | %    | Virtual memory utilization percentage             |
| `disk_usage`   | float   | %    | Root (`/`) filesystem utilization percentage      |
| `cpu_temp`     | float   | C    | First available temperature sensor reading, or `null` |
| `uptime`       | string  |      | Human-readable uptime (e.g. `3d 4h 12m`)         |

---

### network_info

Collects per-interface addresses and byte counters, plus topology data for the
primary (first listed) interface. Default interval: **60 seconds**.

Requires at least one interface in the `interfaces` list. Optionally uses
`netifaces` for gateway detection; falls back to `ip route show default`.

For each interface listed, the following attributes are published (where
`{iface}` is the interface name, e.g. `eth0`):

| Attribute           | Type    | Unit  | Description                           |
|---------------------|---------|-------|---------------------------------------|
| `{iface}_ip`        | string  |       | IPv4 address                          |
| `{iface}_mac`       | string  |       | MAC / link-layer address              |
| `{iface}_tx_bytes`  | int     | bytes | Total bytes transmitted               |
| `{iface}_rx_bytes`  | int     | bytes | Total bytes received                  |

The plugin also caches topology information (IP, MAC, gateway, subnet, interface
name) from the primary interface for use by the server's topology discovery.

---

### linux_system

Collects Linux/Ubuntu-specific system health data via shell commands and
`/proc`. Default interval: **300 seconds** (5 minutes).

| Attribute           | Type    | Unit       | Description                                     |
|---------------------|---------|------------|-------------------------------------------------|
| `pending_updates`   | int     | packages   | Number of apt packages with available upgrades   |
| `security_updates`  | int     | packages   | Number of pending security updates               |
| `failed_services`   | int     | services   | Number of failed systemd services                |
| `running_services`  | int     | services   | Number of running systemd services               |
| `logged_in_users`   | int     | users      | Number of currently logged-in users              |
| `docker_running`    | int     | containers | Number of running Docker containers              |
| `docker_total`      | int     | containers | Total number of Docker containers                |
| `ufw_status`        | string  |            | Firewall status: `active`, `inactive`, or `not installed` |
| `kernel_version`    | string  |            | Linux kernel version (from `uname -r`)           |
| `last_boot`         | string  |            | Last boot date and time                          |
| `open_ports`        | int     | ports      | Number of listening TCP/UDP ports                |
| `load_1m`           | float   |            | 1-minute load average                            |
| `load_5m`           | float   |            | 5-minute load average                            |
| `load_15m`          | float   |            | 15-minute load average                           |
| `swap_usage`        | float   | %          | Swap utilization percentage                      |

#### Service monitoring

Add a `services` list to monitor individual systemd services. For each service
named in the list, the plugin publishes an extra attribute
`service_{name}` whose value is the output of `systemctl is-active {name}` --
typically `active`, `inactive`, or `failed`.

```yaml
plugins:
  linux_system:
    services:
      - nginx
      - mosquitto
      - docker
```

This produces attributes like `service_nginx: {"value": "active", "unit": ""}`.

---

### custom_command

Runs arbitrary shell commands and publishes their output as sensor values.
Default interval: **30 seconds**. Command timeout: **10 seconds**.

Output is auto-parsed: if stdout is a valid integer it becomes an `int`; if a
valid float it becomes a `float`; otherwise it stays a `string`. A non-zero exit
code produces a `null` value.

```yaml
plugins:
  custom_command:
    commands:
      gpu_temp:
        command: "nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader"
        unit: "C"
      pi_voltage:
        command: "vcgencmd measure_volts core | grep -oP '[\\d.]+'"
        unit: "V"
```

Each key under `commands` becomes the attribute name. Required fields:

| Field     | Required | Description                          |
|-----------|----------|--------------------------------------|
| `command` | yes      | Shell command string to execute      |
| `unit`    | no       | Unit label (default: empty string)   |

## Remote Management

The server can push configuration changes to clients over MQTT. The
`ConfigHandler` processes incoming config messages and persists remote overrides
in a file called `config.remote.yaml` alongside the main `config.yaml`.

### What can be changed remotely

- **Poll intervals** -- a top-level `interval` key applies to all plugins.
- **Plugin settings** -- per-plugin config under a `plugins` key is deep-merged
  with local config (remote values take priority).
- **Commands** -- a `commands` key adds new command templates and adds them to
  the allowed commands list.

### What cannot be changed remotely

- **MQTT broker connection** (`mqtt` section) -- requires a local restart.
- **Device identity** (`device` section) -- `id`, `name`, `type`, and `tags`
  are set locally only.
- **Removing allowed commands** -- remote config can add commands but not remove
  locally defined ones.

### Persistence

Remote config is saved atomically to `config.remote.yaml` (write to `.tmp`,
then rename). On startup the client loads this file and merges it on top of
the local `config.yaml`, so remote overrides survive restarts.

## Commands

The client can execute whitelisted commands sent by the server. Only commands
listed in `allowed_commands` are accepted; all others are rejected.

### Configuration

```yaml
allowed_commands:
  - reboot
  - shutdown
  - restart_service
```

### Built-in command templates

| Command            | Shell command              | Parameters     |
|--------------------|----------------------------|----------------|
| `reboot`           | `reboot`                   | none           |
| `shutdown`         | `shutdown -h now`          | none           |
| `restart_service`  | `systemctl restart {service}` | `service`   |

### Command protocol

The server sends a JSON payload to the device's command topic:

```json
{
  "request_id": "abc-123",
  "command": "restart_service",
  "params": {"service": "nginx"}
}
```

The client responds with:

```json
{
  "request_id": "abc-123",
  "status": "success",
  "output": ""
}
```

Possible `status` values: `success`, `error`, `rejected`.

### Security

- Commands not in `allowed_commands` are immediately rejected.
- All parameter values are escaped with `shlex.quote()` before interpolation
  into shell command templates, preventing shell injection.
- Command execution has a **30-second timeout**.
- The server can add commands remotely, but cannot remove locally defined ones.

## Writing Plugins

### The BasePlugin contract

Every plugin must subclass `BasePlugin` (from `mqtt_monitor.plugins.base`) and
provide:

1. **`name`** (class attribute, `str`) -- unique plugin identifier, used as the
   config key under `plugins:`.
2. **`default_interval`** (class attribute, `int`) -- default seconds between
   collections.
3. **`__init__(self, config: dict)`** -- must call `super().__init__(config)`.
   The base class sets `self.interval` from `config["interval"]` or
   `default_interval`.
4. **`collect(self) -> dict`** -- returns a dict mapping attribute names to
   `{"value": <any>, "unit": <str>}` dicts.
5. **`get_network_info(self) -> dict | None`** (optional) -- return network
   topology info if applicable; defaults to `None`.

### Step-by-step guide

1. Create a new file in `mqtt_monitor/plugins/`, e.g. `bluetooth_info.py`.
2. Subclass `BasePlugin` and implement `collect()`.
3. Register the plugin in `mqtt_monitor/plugins/__init__.py` or wherever your
   plugin loader discovers classes.

### Full example plugin

```python
"""Bluetooth info plugin -- reports nearby discoverable devices."""

import subprocess

from mqtt_monitor.plugins.base import BasePlugin


class BluetoothInfoPlugin(BasePlugin):
    name = "bluetooth_info"
    default_interval = 120  # every 2 minutes

    def __init__(self, config):
        super().__init__(config)
        self.adapter = config.get("adapter", "hci0")

    def collect(self) -> dict:
        count = self._count_nearby()
        return {
            "nearby_devices": {"value": count, "unit": "devices"},
            "adapter": {"value": self.adapter, "unit": ""},
        }

    def _count_nearby(self) -> int:
        try:
            proc = subprocess.run(
                ["hcitool", "-i", self.adapter, "scan", "--flush"],
                capture_output=True, text=True, timeout=15,
            )
            # Each discovered device is one non-header line
            lines = [l for l in proc.stdout.strip().splitlines()[1:] if l.strip()]
            return len(lines)
        except Exception:
            return 0
```

Then add it to your `config.yaml`:

```yaml
plugins:
  bluetooth_info:
    interval: 120
    adapter: hci0
```

### Quick alternative: custom_command

If you just need a shell command turned into a sensor, you do not need a full
plugin. Use `custom_command` instead:

```yaml
plugins:
  custom_command:
    commands:
      nearby_bt:
        command: "hcitool scan | tail -n +2 | wc -l"
        unit: "devices"
```

This is simpler but offers no custom logic, error handling, or multi-attribute
output.

## Running as a Service

Create a systemd unit file to run the monitor client on boot.

```ini
# /etc/systemd/system/mqtt-monitor.service
[Unit]
Description=MQTT Network Monitor Client
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/mqtt-monitor
ExecStart=/opt/mqtt-monitor/.venv/bin/mqtt-monitor
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Install and start:

```bash
sudo cp mqtt-monitor.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now mqtt-monitor

# Check status
sudo systemctl status mqtt-monitor
journalctl -u mqtt-monitor -f
```

Adjust `WorkingDirectory` and `ExecStart` to match your installation path. The
working directory must contain `config.yaml`. If you installed to a venv under a
different path, update the `ExecStart` path accordingly.

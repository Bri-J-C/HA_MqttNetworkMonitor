# Windows Monitor Client

Monitor your Windows PC from the MQTT Network Monitor addon.

## Install (Standalone .exe)

1. Download `mqtt-network-monitor.exe`
2. Right-click → **Run as administrator**
3. Run: `mqtt-network-monitor.exe install`

This will:
- Copy itself to `C:\Program Files\MQTTNetworkMonitor\`
- Create a default `config.yaml`
- Register as a Windows service (auto-start, auto-restart on failure)

4. Edit `C:\Program Files\MQTTNetworkMonitor\config.yaml` with your MQTT broker IP
5. Run: `mqtt-network-monitor.exe start`

The device appears in your MQTT Network Monitor dashboard immediately.

## Commands

All commands require Administrator privileges:

```
mqtt-network-monitor.exe install     Install service + copy to Program Files
mqtt-network-monitor.exe uninstall   Remove service
mqtt-network-monitor.exe start       Start the service
mqtt-network-monitor.exe stop        Stop the service
mqtt-network-monitor.exe status      Check service status
mqtt-network-monitor.exe run         Run in foreground (for debugging)
```

## Uninstall

```
mqtt-network-monitor.exe stop
mqtt-network-monitor.exe uninstall
```

Config and files remain at `C:\Program Files\MQTTNetworkMonitor\`. Delete the folder manually to remove completely.

## Building from Source

On a Windows machine with Python 3.10+:

```
pip install paho-mqtt psutil pyyaml pywin32 pyinstaller
python build_windows.py
```

Output: `dist/mqtt-network-monitor.exe`

## What It Monitors

| Plugin | Interval | Attributes |
|--------|----------|------------|
| system_resources | 30s | CPU, memory, disk usage, uptime, temp |
| windows_system | 5min | OS version, CPU model, RAM, GPU, processes, users |
| network_info | 60s | IP, MAC, gateway, WiFi SSID per interface |

## Remote Management

From the MQTT Network Monitor addon you can:
- Change collection interval
- Enable/disable specific attributes
- Send commands (shutdown, restart, etc.)
- View real-time system stats

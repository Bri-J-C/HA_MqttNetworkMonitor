"""Build script for Windows standalone executable.

Run this on a Windows machine with Python 3.10+ installed:
    pip install pyinstaller paho-mqtt psutil pyyaml
    python build_windows.py

Produces: dist/mqtt-network-monitor.exe
"""

import subprocess
import sys

def main():
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--name", "mqtt-network-monitor",
        "--hidden-import", "mqtt_monitor.plugins.system_resources",
        "--hidden-import", "mqtt_monitor.plugins.network_info",
        "--hidden-import", "mqtt_monitor.plugins.windows_system",
        "--hidden-import", "mqtt_monitor.plugins.custom_command",
        "--hidden-import", "mqtt_monitor.plugins.registry",
        "--hidden-import", "mqtt_monitor.config_handler",
        "--hidden-import", "mqtt_monitor.command_handler",
        "--hidden-import", "mqtt_monitor.message",
        "--hidden-import", "mqtt_monitor.windows_service",
        "--hidden-import", "mqtt_monitor.installer_gui",
        "--console",
        "mqtt_monitor/client.py",
    ]
    print(f"Running: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)
    print()
    print("Build complete! -> dist/mqtt-network-monitor.exe")
    print()
    print("Double-click the exe to install. That's it.")

if __name__ == "__main__":
    main()

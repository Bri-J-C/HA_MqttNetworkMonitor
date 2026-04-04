"""Build script for Windows standalone executable.

Run this on a Windows machine with Python 3.10+ installed:
    pip install pyinstaller paho-mqtt psutil pyyaml
    python build_windows.py

Produces: dist/mqtt-network-monitor.exe + dist/nssm.exe
"""

import subprocess
import sys
import shutil
from pathlib import Path

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
    print(f"Building exe...")
    subprocess.run(cmd, check=True)

    # Copy NSSM alongside the exe
    nssm_src = Path("nssm/nssm.exe")
    nssm_dst = Path("dist/nssm.exe")
    if nssm_src.exists():
        shutil.copy2(nssm_src, nssm_dst)
        print(f"Copied nssm.exe to dist/")
    else:
        print(f"WARNING: nssm/nssm.exe not found — service registration won't work")

    print()
    print("Build complete!")
    print("  dist/mqtt-network-monitor.exe")
    print("  dist/nssm.exe")
    print()
    print("Both files must be in the same folder. Double-click mqtt-network-monitor.exe to install.")

if __name__ == "__main__":
    main()

"""Windows service and installer for MQTT Network Monitor.

Usage (run as Administrator):
    mqtt-network-monitor.exe install     Install service + copy to Program Files
    mqtt-network-monitor.exe uninstall   Remove service + files
    mqtt-network-monitor.exe start       Start the service
    mqtt-network-monitor.exe stop        Stop the service
    mqtt-network-monitor.exe status      Check service status
    mqtt-network-monitor.exe run         Run in foreground (for debugging)

Without arguments: if installed as service, runs as service.
Otherwise runs in foreground.
"""

import os
import sys
import shutil
import subprocess
import ctypes
from pathlib import Path

SERVICE_NAME = "MQTTNetworkMonitor"
SERVICE_DISPLAY = "MQTT Network Monitor"
SERVICE_DESC = "Monitors this PC and reports to MQTT Network Monitor addon"
INSTALL_DIR = Path(os.environ.get("PROGRAMFILES", r"C:\Program Files")) / "MQTTNetworkMonitor"
CONFIG_NAME = "config.yaml"

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        return False

def get_exe_path():
    """Get path to the current executable (works for both .py and frozen .exe)."""
    if getattr(sys, 'frozen', False):
        return Path(sys.executable)
    return Path(__file__)

def run_sc(args, check=True):
    """Run sc.exe with arguments."""
    cmd = ["sc.exe"] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error: {result.stderr.strip() or result.stdout.strip()}")
    return result

def install():
    if not is_admin():
        print("Error: Installation requires Administrator privileges.")
        print("Right-click the exe and select 'Run as administrator'.")
        return False

    print(f"Installing to {INSTALL_DIR}...")

    # Create install directory
    INSTALL_DIR.mkdir(parents=True, exist_ok=True)

    # Copy executable
    exe_src = get_exe_path()
    exe_dst = INSTALL_DIR / exe_src.name
    if exe_src != exe_dst:
        shutil.copy2(exe_src, exe_dst)
        print(f"  Copied {exe_src.name} -> {exe_dst}")

    # Copy config if it exists alongside the exe, or create default
    config_src = exe_src.parent / CONFIG_NAME
    config_dst = INSTALL_DIR / CONFIG_NAME
    if config_src.exists() and not config_dst.exists():
        shutil.copy2(config_src, config_dst)
        print(f"  Copied {CONFIG_NAME}")
    elif not config_dst.exists():
        config_dst.write_text(_default_config())
        print(f"  Created default {CONFIG_NAME} — edit before starting!")

    # Register Windows service using sc.exe
    bin_path = f'"{exe_dst}" service'
    run_sc(["create", SERVICE_NAME,
            f"binPath={bin_path}",
            f"DisplayName={SERVICE_DISPLAY}",
            "start=auto"], check=False)

    run_sc(["description", SERVICE_NAME, SERVICE_DESC], check=False)

    # Set service to restart on failure (restart after 10s, up to 3 times)
    subprocess.run([
        "sc.exe", "failure", SERVICE_NAME,
        "reset=86400", "actions=restart/10000/restart/10000/restart/10000"
    ], capture_output=True)

    print(f"\nInstalled! Service: {SERVICE_NAME}")
    print(f"Config: {config_dst}")
    print(f"\nNext steps:")
    print(f"  1. Edit {config_dst} with your MQTT broker details")
    print(f"  2. Run: mqtt-network-monitor.exe start")
    return True

def uninstall():
    if not is_admin():
        print("Error: Uninstall requires Administrator privileges.")
        return False

    print("Stopping service...")
    run_sc(["stop", SERVICE_NAME], check=False)

    print("Removing service...")
    run_sc(["delete", SERVICE_NAME], check=False)

    # Don't delete install dir automatically — user's config is there
    print(f"\nService removed. Config and files remain at {INSTALL_DIR}")
    print(f"To remove completely: delete {INSTALL_DIR}")
    return True

def start():
    if not is_admin():
        print("Error: Starting the service requires Administrator privileges.")
        return False
    result = run_sc(["start", SERVICE_NAME])
    if result.returncode == 0:
        print("Service started.")
    return result.returncode == 0

def stop():
    if not is_admin():
        print("Error: Stopping the service requires Administrator privileges.")
        return False
    result = run_sc(["stop", SERVICE_NAME])
    if result.returncode == 0:
        print("Service stopped.")
    return result.returncode == 0

def status():
    result = run_sc(["query", SERVICE_NAME], check=False)
    if result.returncode != 0:
        print("Service not installed.")
    else:
        for line in result.stdout.strip().split('\n'):
            line = line.strip()
            if line.startswith("STATE"):
                print(line)
                return
        print(result.stdout.strip())

def run_as_service():
    """Entry point when running as a Windows service via sc.exe.

    Uses a simple approach: sc.exe calls us with 'service' arg.
    We signal SERVICE_RUNNING, run the monitor, and handle stop.
    """
    import servicemanager
    import win32serviceutil
    import win32service
    import win32event

    class MQTTMonitorService(win32serviceutil.ServiceFramework):
        _svc_name_ = SERVICE_NAME
        _svc_display_name_ = SERVICE_DISPLAY
        _svc_description_ = SERVICE_DESC

        def __init__(self, args):
            win32serviceutil.ServiceFramework.__init__(self, args)
            self.stop_event = win32event.CreateEvent(None, 0, 0, None)
            self.running = True

        def SvcStop(self):
            self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
            self.running = False
            win32event.SetEvent(self.stop_event)

        def SvcDoRun(self):
            from mqtt_monitor.client import MQTTMonitorClient
            from mqtt_monitor.config import ConfigLoader

            config_path = INSTALL_DIR / CONFIG_NAME
            remote_path = INSTALL_DIR / "config.remote.yaml"
            config = ConfigLoader.load_with_remote(config_path, remote_path)

            client = MQTTMonitorClient(config, config_dir=INSTALL_DIR)
            # Run in a thread so we can respond to stop
            import threading
            t = threading.Thread(target=client.run, daemon=True)
            t.start()

            # Wait for stop signal
            win32event.WaitForSingleObject(self.stop_event, win32event.INFINITE)

    servicemanager.Initialize()
    servicemanager.PrepareToHostSingle(MQTTMonitorService)
    servicemanager.StartServiceCtrlDispatcher()

def run_foreground():
    """Run the monitor in the foreground (for debugging or non-service use)."""
    from mqtt_monitor.client import main
    # If running from install dir, use that config
    if (INSTALL_DIR / CONFIG_NAME).exists() and not (Path.cwd() / CONFIG_NAME).exists():
        sys.argv = [sys.argv[0], str(INSTALL_DIR / CONFIG_NAME)]
    main()

def _default_config():
    return """# MQTT Network Monitor — Windows Client
# Edit this file with your MQTT broker details.

mqtt:
  broker: 192.168.1.10    # Your MQTT broker IP
  port: 1883
  # username: your_user
  # password: your_password

device:
  id: my-windows-pc
  name: "My Windows PC"
  type: windows
  tags: [desktop, windows]

plugins:
  system_resources:
    interval: 30
    attributes:
      - cpu_usage
      - memory_usage
      - disk_usage
      - uptime

  network_info:
    interval: 60
    interfaces:
      - Ethernet

  windows_system:
    interval: 300
    attributes:
      - os_version
      - cpu_model
      - installed_ram
      - process_count

allowed_commands:
  - shutdown /s /t 60
  - shutdown /r /t 60
  - shutdown /a
"""

def handle_cli():
    """Handle CLI commands. Returns True if handled, False to fall through to normal run."""
    if len(sys.argv) < 2:
        return False

    cmd = sys.argv[1].lower()

    if cmd == "install":
        install()
        return True
    elif cmd == "uninstall":
        uninstall()
        return True
    elif cmd == "start":
        start()
        return True
    elif cmd == "stop":
        stop()
        return True
    elif cmd == "status":
        status()
        return True
    elif cmd == "run":
        run_foreground()
        return True
    elif cmd == "service":
        run_as_service()
        return True

    return False

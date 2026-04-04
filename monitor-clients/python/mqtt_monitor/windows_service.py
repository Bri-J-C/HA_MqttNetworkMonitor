"""Windows service and installer for MQTT Network Monitor.

Double-click behavior:
  - Not installed yet → requests admin, installs to Program Files,
    creates default config, opens it in Notepad, starts service.
  - Already installed → restarts the service.

CLI commands (optional, for advanced users):
    mqtt-network-monitor.exe install     Install/reinstall
    mqtt-network-monitor.exe uninstall   Remove service + files
    mqtt-network-monitor.exe start       Start the service
    mqtt-network-monitor.exe stop        Stop the service
    mqtt-network-monitor.exe status      Check service status
    mqtt-network-monitor.exe run         Run in foreground (debugging)
    mqtt-network-monitor.exe service     (internal) Run as Windows service
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

def elevate_and_rerun(args=None):
    """Re-launch the current exe with admin privileges via UAC prompt."""
    if getattr(sys, 'frozen', False):
        exe = sys.executable
    else:
        exe = sys.executable
        # When running as .py, we need to re-run via python
        args = [sys.argv[0]] + (args or sys.argv[1:])
    params = ' '.join(args or sys.argv[1:])
    ctypes.windll.shell32.ShellExecuteW(None, "runas", exe, params, None, 1)
    sys.exit(0)

def get_exe_path():
    if getattr(sys, 'frozen', False):
        return Path(sys.executable)
    return Path(__file__)

def is_installed():
    """Check if the service is already registered."""
    result = subprocess.run(["sc.exe", "query", SERVICE_NAME],
                            capture_output=True, text=True)
    return result.returncode == 0

def is_running():
    result = subprocess.run(["sc.exe", "query", SERVICE_NAME],
                            capture_output=True, text=True)
    return "RUNNING" in result.stdout

def run_sc(args, check=True):
    cmd = ["sc.exe"] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"  Error: {result.stderr.strip() or result.stdout.strip()}")
    return result

def install():
    """Launch the GUI installer wizard."""
    if not is_admin():
        elevate_and_rerun(["install"])
        return
    from mqtt_monitor.installer_gui import main as installer_main
    installer_main()

def uninstall():
    if not is_admin():
        elevate_and_rerun(["uninstall"])
        return

    print("Uninstalling MQTT Network Monitor...")
    run_sc(["stop", SERVICE_NAME], check=False)
    run_sc(["delete", SERVICE_NAME], check=False)
    print(f"  Service removed.")
    print(f"  Files remain at {INSTALL_DIR} (delete manually if desired)")
    print()
    input("Press Enter to close...")

def start():
    if not is_admin():
        elevate_and_rerun(["start"])
        return
    result = run_sc(["start", SERVICE_NAME])
    if result.returncode == 0:
        print("Service started.")

def stop():
    if not is_admin():
        elevate_and_rerun(["stop"])
        return
    result = run_sc(["stop", SERVICE_NAME])
    if result.returncode == 0:
        print("Service stopped.")

def status():
    result = subprocess.run(["sc.exe", "query", SERVICE_NAME],
                            capture_output=True, text=True)
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
    """Entry point when running as a Windows service.

    sc.exe starts the exe with 'service' arg. We run the monitor directly
    in this process. The service manager handles stop via process termination.
    No pywin32 dependency needed — we use a simple long-running process approach.
    """
    import logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[logging.StreamHandler()],
    )
    logger = logging.getLogger("service")

    config_path = INSTALL_DIR / CONFIG_NAME
    if not config_path.exists():
        logger.error(f"Config not found: {config_path}")
        sys.exit(1)

    from mqtt_monitor.client import MQTTMonitorClient
    from mqtt_monitor.config import ConfigLoader

    remote_path = INSTALL_DIR / "config.remote.yaml"
    config = ConfigLoader.load_with_remote(config_path, remote_path)
    logger.info(f"Starting monitor service for device: {config.device.id}")

    client = MQTTMonitorClient(config, config_dir=INSTALL_DIR)
    client.run()

def run_foreground():
    """Run the monitor in the foreground (for debugging)."""
    from mqtt_monitor.client import main
    if (INSTALL_DIR / CONFIG_NAME).exists() and not (Path.cwd() / CONFIG_NAME).exists():
        sys.argv = [sys.argv[0], str(INSTALL_DIR / CONFIG_NAME)]
    main()

def auto_run():
    """Default double-click behavior: launch installer wizard or show status."""
    if not is_installed():
        # Launch the GUI installer wizard
        if not is_admin():
            elevate_and_rerun()
            return
        from mqtt_monitor.installer_gui import main as installer_main
        installer_main()
    elif not is_running():
        if not is_admin():
            elevate_and_rerun(["start"])
        else:
            start()
            input("Press Enter to close...")
    else:
        print("MQTT Network Monitor is already running.")
        print()
        print(f"Config: {INSTALL_DIR / CONFIG_NAME}")
        print(f"Status: Running")
        print()
        print("Options:")
        print("  mqtt-network-monitor.exe stop        Stop the service")
        print("  mqtt-network-monitor.exe uninstall   Remove the service")
        print("  mqtt-network-monitor.exe run         Run in foreground")
        print()
        input("Press Enter to close...")

def _default_config():
    return """# MQTT Network Monitor — Windows Client
# Edit this file with your MQTT broker details, then restart the service.

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
    """Handle CLI commands. Returns True if handled."""
    if len(sys.argv) < 2:
        # No arguments — auto-run (install or restart)
        auto_run()
        return True

    cmd = sys.argv[1].lower()
    handlers = {
        "install": install,
        "uninstall": uninstall,
        "start": start,
        "stop": stop,
        "status": status,
        "run": run_foreground,
        "service": run_as_service,
    }

    handler = handlers.get(cmd)
    if handler:
        handler()
        return True

    return False

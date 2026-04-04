"""Windows service and installer for MQTT Network Monitor.

Uses Windows Task Scheduler instead of sc.exe services — no service
protocol handshake needed, works reliably with PyInstaller frozen exes.

Double-click behavior:
  - Not installed yet → requests admin, launches install wizard.
  - Already installed → restarts the task.

CLI commands:
    mqtt-network-monitor.exe install     Launch install wizard
    mqtt-network-monitor.exe uninstall   Remove task + files
    mqtt-network-monitor.exe start       Start the task
    mqtt-network-monitor.exe stop        Stop the task
    mqtt-network-monitor.exe status      Check task status
    mqtt-network-monitor.exe run         Run in foreground (debugging)
    mqtt-network-monitor.exe service     (internal) Run the monitor process
"""

import os
import sys
import shutil
import subprocess
import ctypes
from pathlib import Path

TASK_NAME = "MQTTNetworkMonitor"
SERVICE_NAME = TASK_NAME  # Alias for compatibility with installer_gui imports
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
        args = [sys.argv[0]] + (args or sys.argv[1:])
    params = ' '.join(args or sys.argv[1:])
    ctypes.windll.shell32.ShellExecuteW(None, "runas", exe, params, None, 1)
    sys.exit(0)

def get_exe_path():
    if getattr(sys, 'frozen', False):
        return Path(sys.executable)
    return Path(__file__)

def is_installed():
    """Check if the scheduled task exists."""
    result = subprocess.run(
        ["schtasks.exe", "/Query", "/TN", TASK_NAME],
        capture_output=True, text=True
    )
    return result.returncode == 0

def is_running():
    """Check if the monitor process is running."""
    result = subprocess.run(
        ["tasklist.exe", "/FI", f"IMAGENAME eq mqtt-network-monitor.exe"],
        capture_output=True, text=True
    )
    return "mqtt-network-monitor.exe" in result.stdout

def run_sc(args, check=True):
    """Run schtasks.exe with arguments."""
    cmd = ["schtasks.exe"] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"  Error: {result.stderr.strip() or result.stdout.strip()}")
    return result

def register_task(exe_path):
    """Register a scheduled task that runs at startup and restarts on failure."""
    exe_path = str(exe_path)

    # Create XML task definition for more control than schtasks CLI
    xml = f"""<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>{SERVICE_DESC}</Description>
  </RegistrationInfo>
  <Triggers>
    <BootTrigger>
      <Enabled>true</Enabled>
      <Delay>PT30S</Delay>
    </BootTrigger>
  </Triggers>
  <Principals>
    <Principal>
      <UserId>S-1-5-18</UserId>
      <RunLevel>HighestAvailable</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>true</RunOnlyIfNetworkAvailable>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RestartOnFailure>
      <Interval>PT1M</Interval>
      <Count>999</Count>
    </RestartOnFailure>
    <ExecutionTimeLimit>PT0S</ExecutionTimeLimit>
  </Settings>
  <Actions>
    <Exec>
      <Command>{exe_path}</Command>
      <Arguments>service</Arguments>
      <WorkingDirectory>{str(INSTALL_DIR)}</WorkingDirectory>
    </Exec>
  </Actions>
</Task>"""

    # Write XML to temp file
    xml_path = INSTALL_DIR / "task.xml"
    xml_path.write_text(xml, encoding="utf-16")

    # Register the task
    result = subprocess.run(
        ["schtasks.exe", "/Create", "/TN", TASK_NAME, "/XML", str(xml_path), "/F"],
        capture_output=True, text=True
    )

    # Clean up XML
    try:
        xml_path.unlink()
    except Exception:
        pass

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

    # Stop the process
    subprocess.run(
        ["taskkill.exe", "/F", "/IM", "mqtt-network-monitor.exe"],
        capture_output=True
    )

    # Remove the scheduled task
    subprocess.run(
        ["schtasks.exe", "/Delete", "/TN", TASK_NAME, "/F"],
        capture_output=True
    )

    print(f"  Task removed.")
    print(f"  Files remain at {INSTALL_DIR} (delete manually if desired)")
    print()
    input("Press Enter to close...")

def start():
    if not is_admin():
        elevate_and_rerun(["start"])
        return
    result = subprocess.run(
        ["schtasks.exe", "/Run", "/TN", TASK_NAME],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("Monitor started.")
    else:
        print(f"Failed to start: {result.stderr.strip() or result.stdout.strip()}")

def stop():
    if not is_admin():
        elevate_and_rerun(["stop"])
        return
    subprocess.run(
        ["taskkill.exe", "/F", "/IM", "mqtt-network-monitor.exe"],
        capture_output=True
    )
    print("Monitor stopped.")

def status():
    if is_installed():
        running = is_running()
        print(f"Task: Registered")
        print(f"Status: {'Running' if running else 'Stopped'}")
        print(f"Config: {INSTALL_DIR / CONFIG_NAME}")
    else:
        print("Not installed.")

def run_as_service():
    """Entry point when running as a scheduled task."""
    import logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
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
    logger.info(f"Starting monitor for device: {config.device.id}")

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
        print("  mqtt-network-monitor.exe stop        Stop the monitor")
        print("  mqtt-network-monitor.exe uninstall   Remove the task")
        print("  mqtt-network-monitor.exe run         Run in foreground")
        print()
        input("Press Enter to close...")

def handle_cli():
    """Handle CLI commands. Returns True if handled."""
    if len(sys.argv) < 2:
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

"""Windows service management via NSSM (Non-Sucking Service Manager).

NSSM wraps our exe as a proper Windows service with full service protocol
support, automatic restart on failure, and standard Services panel integration.

Double-click: launches install wizard if not installed, shows status if running.
CLI commands: install, uninstall, start, stop, status, run, service
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
NSSM_NAME = "nssm.exe"


def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except Exception:
        return False


def elevate_and_rerun(args=None):
    """Re-launch with admin privileges via UAC prompt."""
    if getattr(sys, 'frozen', False):
        exe = sys.executable
        params = ' '.join(args or sys.argv[1:])
    else:
        exe = sys.executable
        script_args = [sys.argv[0]] + (args or sys.argv[1:])
        params = ' '.join(script_args)
    ctypes.windll.shell32.ShellExecuteW(None, "runas", exe, params, None, 1)
    sys.exit(0)


def get_exe_path():
    if getattr(sys, 'frozen', False):
        return Path(sys.executable)
    return Path(__file__)


def get_nssm_path():
    """Find nssm.exe — bundled in install dir or next to source."""
    locations = [
        INSTALL_DIR / NSSM_NAME,
        get_exe_path().parent / NSSM_NAME,
        get_exe_path().parent / "nssm" / NSSM_NAME,
    ]
    for p in locations:
        if p.exists():
            return p
    return None


def _nssm(args, check=True):
    """Run nssm.exe with arguments."""
    nssm = get_nssm_path()
    if not nssm:
        print(f"Error: nssm.exe not found")
        return subprocess.CompletedProcess(args=[], returncode=1, stdout="", stderr="nssm not found")
    cmd = [str(nssm)] + args
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        err = result.stderr.strip() or result.stdout.strip()
        if err:
            print(f"  {err}")
    return result


def is_installed():
    """Check if the service is registered."""
    nssm = get_nssm_path()
    if not nssm:
        # Fall back to sc.exe query
        result = subprocess.run(["sc.exe", "query", SERVICE_NAME],
                                capture_output=True, text=True)
        return result.returncode == 0
    result = _nssm(["status", SERVICE_NAME], check=False)
    # NSSM returns 0 for status query if service exists
    return "SERVICE_STOPPED" in result.stdout or "SERVICE_RUNNING" in result.stdout or "SERVICE_PAUSED" in result.stdout


def is_running():
    """Check if the service is running."""
    result = _nssm(["status", SERVICE_NAME], check=False)
    return "SERVICE_RUNNING" in result.stdout


def run_sc(args, check=True):
    """Compatibility alias — routes through nssm."""
    return _nssm(args, check)


def register_service(exe_path):
    """Register a Windows service via NSSM."""
    nssm = get_nssm_path()
    if not nssm:
        return subprocess.CompletedProcess(args=[], returncode=1, stdout="", stderr="nssm not found")

    nssm_str = str(nssm)
    exe_str = str(exe_path)

    # Install the service
    result = subprocess.run([nssm_str, "install", SERVICE_NAME, exe_str, "service"],
                            capture_output=True, text=True)
    if result.returncode != 0:
        return result

    # Configure service properties
    subprocess.run([nssm_str, "set", SERVICE_NAME, "DisplayName", SERVICE_DISPLAY],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "Description", SERVICE_DESC],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppDirectory", str(INSTALL_DIR)],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "Start", "SERVICE_AUTO_START"],
                   capture_output=True)

    # Restart on failure: restart after 10 seconds
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppExit", "Default", "Restart"],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppRestartDelay", "10000"],
                   capture_output=True)

    # Redirect stdout/stderr to log file
    log_path = str(INSTALL_DIR / "monitor.log")
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppStdout", log_path],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppStderr", log_path],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppStdoutCreationDisposition", "4"],
                   capture_output=True)
    subprocess.run([nssm_str, "set", SERVICE_NAME, "AppStderrCreationDisposition", "4"],
                   capture_output=True)

    return result


# Alias for installer_gui compatibility
register_task = register_service


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
    _nssm(["stop", SERVICE_NAME], check=False)
    _nssm(["remove", SERVICE_NAME, "confirm"], check=False)
    print(f"  Service removed.")
    print(f"  Files remain at {INSTALL_DIR} (delete manually if desired)")
    print()
    input("Press Enter to close...")


def start():
    if not is_admin():
        elevate_and_rerun(["start"])
        return
    result = _nssm(["start", SERVICE_NAME])
    if result.returncode == 0:
        print("Service started.")


def stop():
    if not is_admin():
        elevate_and_rerun(["stop"])
        return
    result = _nssm(["stop", SERVICE_NAME])
    if result.returncode == 0:
        print("Service stopped.")


def status():
    if not get_nssm_path():
        print("Not installed (nssm.exe not found).")
        return
    result = _nssm(["status", SERVICE_NAME], check=False)
    stdout = result.stdout.strip()
    if "SERVICE_RUNNING" in stdout:
        print(f"Status: Running")
    elif "SERVICE_STOPPED" in stdout:
        print(f"Status: Stopped")
    else:
        print(f"Not installed.")
        return
    print(f"Config: {INSTALL_DIR / CONFIG_NAME}")
    log = INSTALL_DIR / "monitor.log"
    if log.exists():
        print(f"Log: {log}")


def run_as_service():
    """Entry point when NSSM starts the exe with 'service' arg."""
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
    """Default double-click behavior."""
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
        print("MQTT Network Monitor is running.")
        print()
        print(f"Config: {INSTALL_DIR / CONFIG_NAME}")
        log = INSTALL_DIR / "monitor.log"
        if log.exists():
            print(f"Log: {log}")
        print()
        print("Commands:")
        print("  mqtt-network-monitor.exe stop        Stop")
        print("  mqtt-network-monitor.exe uninstall   Remove")
        print("  mqtt-network-monitor.exe run         Foreground mode")
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

"""Entry point for the headless monitor exe. No GUI, no installer.

On Windows, supports service commands:
    mqtt-network-monitor.exe install   — install as Windows service
    mqtt-network-monitor.exe start     — start the service
    mqtt-network-monitor.exe stop      — stop the service
    mqtt-network-monitor.exe remove    — uninstall the service
    mqtt-network-monitor.exe debug     — run as service in foreground (for debugging)

Without arguments:
    - If started by Windows SCM, runs as a service
    - Otherwise runs the monitor in foreground mode
"""
import logging
import sys
from pathlib import Path

SERVICE_COMMANDS = {'install', 'remove', 'start', 'stop', 'restart', 'update', 'debug'}


def main():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    # On Windows, handle service commands before anything else
    if sys.platform == "win32" and len(sys.argv) > 1 and sys.argv[1].lower() in SERVICE_COMMANDS:
        try:
            import win32serviceutil
            from mqtt_monitor.win_service import MQTTMonitorService
            win32serviceutil.HandleCommandLine(MQTTMonitorService)
            return
        except ImportError:
            logging.error("pywin32 not installed — cannot manage Windows service")
            sys.exit(1)

    # On Windows with no arguments, try starting as service (SCM startup)
    if sys.platform == "win32" and len(sys.argv) == 1:
        try:
            import servicemanager
            from mqtt_monitor.win_service import MQTTMonitorService
            servicemanager.PrepareToHostSingle(MQTTMonitorService)
            servicemanager.StartServiceCtrlDispatcher()
            return
        except Exception:
            pass  # Not started by SCM — fall through to foreground mode

    # Normal foreground mode
    from mqtt_monitor.config import ConfigLoader

    if len(sys.argv) > 1:
        config_path = Path(sys.argv[1])
    else:
        if getattr(sys, 'frozen', False):
            config_path = Path(sys.executable).parent / "config.yaml"
        else:
            config_path = Path("config.yaml")

    if not config_path.exists():
        logging.error(f"Config not found: {config_path}")
        sys.exit(1)

    remote_path = config_path.parent / "config.remote.yaml"
    config = ConfigLoader.load_with_remote(config_path, remote_path)
    logging.info(f"Starting monitor for device: {config.device.id}")

    from mqtt_monitor.client import MQTTMonitorClient
    client = MQTTMonitorClient(config, config_dir=config_path.parent)
    client.run()


if __name__ == "__main__":
    main()

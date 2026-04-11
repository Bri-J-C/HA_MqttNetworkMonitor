"""Windows service wrapper for MQTT Network Monitor.

Usage (from the built exe):
    mqtt-network-monitor.exe install
    mqtt-network-monitor.exe start
    mqtt-network-monitor.exe stop
    mqtt-network-monitor.exe remove

Or programmatically from the installer GUI.
"""

import os
import sys
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

# Only import win32 modules on Windows
if sys.platform == "win32":
    try:
        import win32serviceutil
        import win32service
        import win32event
        import win32api
        import servicemanager
        HAS_WIN32 = True
    except ImportError:
        HAS_WIN32 = False
else:
    HAS_WIN32 = False

SERVICE_NAME = "MQTTNetworkMonitor"
SERVICE_DISPLAY = "MQTT Network Monitor"
SERVICE_DESC = "Monitors this PC and reports to MQTT Network Monitor addon"


def _get_config_path():
    """Get config.yaml path — next to the exe when frozen, or CWD in dev."""
    if getattr(sys, 'frozen', False):
        return Path(sys.executable).parent / "config.yaml"
    return Path("config.yaml")


def _create_and_run_monitor(service_instance=None):
    """Create and run the monitor client (blocking). Called by the service.

    If service_instance is provided, stores the client reference on it
    so SvcStop can call client.stop().
    """
    from mqtt_monitor.config import ConfigLoader
    from mqtt_monitor.client import MQTTMonitorClient

    config_path = _get_config_path()
    if not config_path.exists():
        logger.error(f"Config not found: {config_path}")
        return

    # Set up file logging since we're a service (no console)
    from logging.handlers import RotatingFileHandler
    log_path = config_path.parent / "monitor.log"
    file_handler = RotatingFileHandler(
        str(log_path), maxBytes=5*1024*1024, backupCount=3, encoding="utf-8"
    )
    file_handler.setFormatter(logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
    ))
    logging.root.addHandler(file_handler)
    logging.root.setLevel(logging.INFO)

    remote_path = config_path.parent / "config.remote.yaml"
    config = ConfigLoader.load_with_remote(config_path, remote_path)
    logger.info(f"Starting monitor for device: {config.device.id}")

    try:
        client = MQTTMonitorClient(config, config_dir=config_path.parent)
        if service_instance is not None:
            service_instance._client = client
        client.run()
    except Exception as e:
        logger.error(f"Monitor crashed: {e}", exc_info=True)


if HAS_WIN32:
    class MQTTMonitorService(win32serviceutil.ServiceFramework):
        _svc_name_ = SERVICE_NAME
        _svc_display_name_ = SERVICE_DISPLAY
        _svc_description_ = SERVICE_DESC

        def __init__(self, args):
            win32serviceutil.ServiceFramework.__init__(self, args)
            self.stop_event = win32event.CreateEvent(None, 0, 0, None)
            self._client = None

        def SvcStop(self):
            self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
            # Signal the monitor client to stop
            if self._client:
                self._client.stop()
            win32api.SetEvent(self.stop_event)

        def SvcDoRun(self):
            servicemanager.LogMsg(
                servicemanager.EVENTLOG_INFORMATION_TYPE,
                servicemanager.PYS_SERVICE_STARTED,
                (self._svc_name_, '')
            )
            try:
                # Run monitor in a thread so SvcDoRun can wait on the stop event
                import threading
                monitor_thread = threading.Thread(
                    target=_create_and_run_monitor, args=(self,), daemon=True
                )
                monitor_thread.start()

                # Wait for stop signal
                win32event.WaitForSingleObject(self.stop_event, win32event.INFINITE)
            except Exception as e:
                servicemanager.LogErrorMsg(f"MQTT Monitor failed: {e}")

    def handle_command_line():
        """Handle install/remove/start/stop from command line."""
        if len(sys.argv) > 1 and sys.argv[1] in ('install', 'remove', 'start', 'stop', 'restart', 'update'):
            win32serviceutil.HandleCommandLine(MQTTMonitorService)
            return True
        return False

    def install_service():
        """Install the service programmatically."""
        exe_path = sys.executable if getattr(sys, 'frozen', False) else sys.argv[0]
        try:
            # Remove existing service if present
            try:
                win32serviceutil.StopService(SERVICE_NAME)
            except Exception:
                pass
            try:
                win32serviceutil.RemoveService(SERVICE_NAME)
            except Exception:
                pass

            import time
            time.sleep(1)

            # Install service
            win32serviceutil.InstallService(
                pythonClassString=None,
                serviceName=SERVICE_NAME,
                displayName=SERVICE_DISPLAY,
                description=SERVICE_DESC,
                startType=win32service.SERVICE_AUTO_START,
                exeName=exe_path,
            )

            # Configure restart on failure
            import subprocess
            subprocess.run(
                ['sc', 'failure', SERVICE_NAME, 'reset=', '3600',
                 'actions=', 'restart/10000/restart/30000/restart/60000'],
                capture_output=True
            )

            return True, "Service installed successfully"
        except Exception as e:
            return False, str(e)

    def start_service():
        """Start the service."""
        try:
            win32serviceutil.StartService(SERVICE_NAME)
            return True, "Service started"
        except Exception as e:
            return False, str(e)

    def stop_service():
        """Stop the service."""
        try:
            win32serviceutil.StopService(SERVICE_NAME)
            return True, "Service stopped"
        except Exception as e:
            return False, str(e)

    def remove_service():
        """Remove the service."""
        try:
            try:
                win32serviceutil.StopService(SERVICE_NAME)
            except Exception:
                pass
            import time
            time.sleep(1)
            win32serviceutil.RemoveService(SERVICE_NAME)
            return True, "Service removed"
        except Exception as e:
            return False, str(e)

else:
    # Non-Windows stubs
    def handle_command_line():
        return False

    def install_service():
        return False, "Windows services not available on this platform"

    def start_service():
        return False, "Windows services not available on this platform"

    def stop_service():
        return False, "Windows services not available on this platform"

    def remove_service():
        return False, "Windows services not available on this platform"

"""Linux/Ubuntu system plugin — apt updates, systemd services, firewall, kernel, load, swap."""

import subprocess

from mqtt_monitor.plugins.base import BasePlugin

COLLECTORS = {}

_load_avg_cache = {"values": (0.0, 0.0, 0.0), "time": 0}


def _read_load_avg():
    import time as _time
    now = _time.time()
    if now - _load_avg_cache["time"] > 1:  # Cache for 1 second
        try:
            with open("/proc/loadavg") as f:
                parts = f.read().split()
            _load_avg_cache["values"] = (float(parts[0]), float(parts[1]), float(parts[2]))
            _load_avg_cache["time"] = now
        except Exception:
            pass
    return _load_avg_cache["values"]


def collector(attr_name):
    def decorator(func):
        COLLECTORS[attr_name] = func
        return func
    return decorator


def _run(cmd, timeout=5):
    """Run a shell command safely, return stripped stdout or None."""
    try:
        proc = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=timeout
        )
        return proc.stdout.strip() if proc.returncode == 0 else None
    except Exception:
        return None


def _run_tolerant(cmd, timeout=5):
    """Run a shell command and return stripped stdout regardless of exit code."""
    try:
        proc = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=timeout
        )
        return proc.stdout.strip()
    except Exception:
        return None


def _run_int(cmd, timeout=5):
    """Run a command and return result as int, or 0 on failure."""
    val = _run(cmd, timeout)
    try:
        return int(val) if val is not None else 0
    except (ValueError, TypeError):
        return 0


@collector("pending_updates")
def _pending_updates():
    count = _run_int("apt list --upgradable 2>/dev/null | grep -c upgradable")
    return {"value": count, "unit": "packages"}


@collector("security_updates")
def _security_updates():
    count = _run_int("apt list --upgradable 2>/dev/null | grep -i security | wc -l")
    return {"value": count, "unit": "packages"}


@collector("failed_services")
def _failed_services():
    count = _run_int("systemctl --failed --no-legend --no-pager | wc -l")
    return {"value": count, "unit": "services"}


@collector("running_services")
def _running_services():
    count = _run_int(
        "systemctl list-units --type=service --state=running --no-legend --no-pager | wc -l"
    )
    return {"value": count, "unit": "services"}


@collector("logged_in_users")
def _logged_in_users():
    count = _run_int("who | wc -l")
    return {"value": count, "unit": "users"}


@collector("docker_running")
def _docker_running():
    count = _run_int("docker ps -q 2>/dev/null | wc -l")
    return {"value": count, "unit": "containers"}


@collector("docker_total")
def _docker_total():
    count = _run_int("docker ps -aq 2>/dev/null | wc -l")
    return {"value": count, "unit": "containers"}


@collector("ufw_status")
def _ufw_status():
    output = _run_tolerant("ufw status 2>/dev/null | head -1")
    if output is None or output == "":
        return {"value": "not installed", "unit": ""}
    lower = output.lower()
    if "inactive" in lower:
        return {"value": "inactive", "unit": ""}
    if "active" in lower:
        return {"value": "active", "unit": ""}
    return {"value": "not installed", "unit": ""}


@collector("kernel_version")
def _kernel_version():
    try:
        proc = subprocess.run(
            ["uname", "-r"], capture_output=True, text=True, timeout=5
        )
        value = proc.stdout.strip() if proc.returncode == 0 else None
        return {"value": value, "unit": ""}
    except Exception:
        return {"value": None, "unit": ""}


@collector("last_boot")
def _last_boot():
    val = _run("who -b | awk '{print $3, $4}'")
    return {"value": val, "unit": ""}


@collector("open_ports")
def _open_ports():
    count = _run_int("ss -tuln | grep LISTEN | wc -l")
    return {"value": count, "unit": "ports"}


@collector("load_1m")
def _load_1m():
    return {"value": _read_load_avg()[0], "unit": ""}


@collector("load_5m")
def _load_5m():
    return {"value": _read_load_avg()[1], "unit": ""}


@collector("load_15m")
def _load_15m():
    return {"value": _read_load_avg()[2], "unit": ""}


@collector("swap_usage")
def _swap_usage():
    try:
        total = used = free = 0
        with open("/proc/meminfo") as f:
            for line in f:
                if line.startswith("SwapTotal:"):
                    total = int(line.split()[1])
                elif line.startswith("SwapFree:"):
                    free = int(line.split()[1])
        if total == 0:
            return {"value": 0.0, "unit": "%"}
        used = total - free
        return {"value": round(used / total * 100, 1), "unit": "%"}
    except Exception:
        return {"value": None, "unit": "%"}


class LinuxSystemPlugin(BasePlugin):
    name = "linux_system"
    default_interval = 300  # 5 minutes

    def __init__(self, config):
        super().__init__(config)
        self.requested_attributes = config.get("attributes", list(COLLECTORS.keys()))
        self.monitored_services = config.get("services", [])

    def collect(self):
        result = {}
        for attr in self.requested_attributes:
            func = COLLECTORS.get(attr)
            if func:
                try:
                    result[attr] = func()
                except Exception:
                    result[attr] = {"value": None, "unit": ""}

        # Add monitored service statuses
        for service in self.monitored_services:
            result[f"service_{service}"] = self._check_service(service)

        return result

    @staticmethod
    def _check_service(service_name):
        """Check if a systemd service is active."""
        try:
            proc = subprocess.run(
                ["systemctl", "is-active", service_name],
                capture_output=True, text=True, timeout=5
            )
            status = proc.stdout.strip()
            return {"value": status, "unit": ""}
        except Exception:
            return {"value": "unknown", "unit": ""}

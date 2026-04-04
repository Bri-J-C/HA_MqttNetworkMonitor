"""Windows system plugin — OS info, GPU, services, firewall, disks, uptime."""

import datetime
import platform
import subprocess

import psutil

from mqtt_monitor.plugins.base import BasePlugin

COLLECTORS = {}


def collector(attr_name):
    def decorator(func):
        COLLECTORS[attr_name] = func
        return func
    return decorator


def _run(cmd, timeout=10):
    """Run a shell command safely, return stripped stdout or None."""
    try:
        proc = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=timeout
        )
        return proc.stdout.strip() if proc.returncode == 0 else None
    except Exception:
        return None


def _wmic(alias, field, timeout=10):
    """Query a single field via wmic (available on most Windows versions)."""
    output = _run(f"wmic {alias} get {field} /value", timeout=timeout)
    if output is None:
        return None
    for line in output.splitlines():
        if "=" in line:
            return line.split("=", 1)[1].strip()
    return None


@collector("os_version")
def _os_version():
    version = platform.platform()
    return {"value": version, "unit": ""}


@collector("os_build")
def _os_build():
    build = platform.version()
    return {"value": build, "unit": ""}


@collector("cpu_model")
def _cpu_model():
    # platform.processor() returns the CPU string on Windows
    model = platform.processor()
    if not model:
        model = _wmic("cpu", "Name")
    return {"value": model or "unknown", "unit": ""}


@collector("installed_ram")
def _installed_ram():
    mem = psutil.virtual_memory()
    gb = round(mem.total / (1024 ** 3), 1)
    return {"value": gb, "unit": "GB"}


@collector("gpu_info")
def _gpu_info():
    name = _wmic("path win32_videocontroller", "Name")
    return {"value": name or "unknown", "unit": ""}


@collector("disk_info")
def _disk_info():
    """Report usage for all fixed disk partitions."""
    parts = []
    for partition in psutil.disk_partitions(all=False):
        # Skip removable/network drives — only fixed disks
        if "fixed" not in partition.opts.lower() and "rw" not in partition.opts.lower():
            # On some Windows versions opts may differ; include if we can read usage
            pass
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            total_gb = round(usage.total / (1024 ** 3), 1)
            used_pct = usage.percent
            parts.append(f"{partition.device} {used_pct}% of {total_gb}GB")
        except (PermissionError, OSError):
            continue
    return {"value": "; ".join(parts) if parts else "unknown", "unit": ""}


@collector("process_count")
def _process_count():
    count = len(psutil.pids())
    return {"value": count, "unit": "processes"}


@collector("uptime")
def _uptime():
    import time
    return {"value": int(time.time() - psutil.boot_time()), "unit": "s"}


@collector("last_boot")
def _last_boot():
    boot = datetime.datetime.fromtimestamp(psutil.boot_time())
    return {"value": boot.strftime("%Y-%m-%d %H:%M:%S"), "unit": ""}


@collector("logged_in_users")
def _logged_in_users():
    users = psutil.users()
    return {"value": len(users), "unit": "users"}


@collector("network_adapters")
def _network_adapters():
    """List active network adapter names."""
    stats = psutil.net_if_stats()
    active = [name for name, st in stats.items() if st.isup]
    return {"value": ", ".join(active) if active else "none", "unit": ""}


@collector("firewall_status")
def _firewall_status():
    output = _run(
        'powershell -Command "'
        "Get-NetFirewallProfile | Select-Object -Property Name,Enabled "
        '| Format-Table -HideTableHeaders"',
        timeout=15,
    )
    if output is None:
        return {"value": "unknown", "unit": ""}
    # Parse lines like "Domain    True"
    profiles = []
    for line in output.splitlines():
        parts = line.split()
        if len(parts) >= 2:
            name, enabled = parts[0], parts[-1]
            profiles.append(f"{name}={'on' if enabled.lower() == 'true' else 'off'}")
    return {"value": ", ".join(profiles) if profiles else "unknown", "unit": ""}


@collector("windows_services_running")
def _windows_services_running():
    """Count of running Windows services via psutil (cross-platform safe)."""
    output = _run(
        'powershell -Command "(Get-Service | Where-Object {$_.Status -eq \'Running\'}).Count"',
        timeout=15,
    )
    if output is not None:
        try:
            return {"value": int(output), "unit": "services"}
        except ValueError:
            pass
    return {"value": None, "unit": "services"}


class WindowsSystemPlugin(BasePlugin):
    name = "windows_system"
    default_interval = 300  # 5 minutes

    # Attributes that never change at runtime — collected once and cached.
    # Also declared as static_attributes so the client skips publishing unchanged values.
    _STATIC_ATTRIBUTES = frozenset([
        "os_version", "os_build", "cpu_model", "installed_ram", "gpu_info",
    ])
    static_attributes = {"os_version", "os_build", "cpu_model", "installed_ram", "gpu_info"}

    def __init__(self, config):
        super().__init__(config)
        self.requested_attributes = config.get("attributes", list(COLLECTORS.keys()))
        self.monitored_services = config.get("services", [])
        self._static_cache: dict = {}

    def collect(self):
        result = {}
        for attr in self.requested_attributes:
            # Use cached value for static attributes after first collection.
            if attr in self._STATIC_ATTRIBUTES and attr in self._static_cache:
                result[attr] = self._static_cache[attr]
                continue

            func = COLLECTORS.get(attr)
            if func:
                try:
                    val = func()
                    # Cache static attributes on first successful collection.
                    if attr in self._STATIC_ATTRIBUTES:
                        self._static_cache[attr] = val
                    result[attr] = val
                except Exception:
                    result[attr] = {"value": None, "unit": ""}

        # Add monitored service statuses
        for service in self.monitored_services:
            result[f"service_{service}"] = self._check_service(service)

        return result

    @staticmethod
    def _check_service(service_name):
        """Check if a Windows service is running."""
        try:
            output = _run(
                f'powershell -Command "(Get-Service -Name \'{service_name}\').Status"',
                timeout=10,
            )
            if output:
                return {"value": output.strip().lower(), "unit": ""}
            return {"value": "unknown", "unit": ""}
        except Exception:
            return {"value": "unknown", "unit": ""}

"""Network info plugin — IP, MAC, gateway, subnet, interface stats."""

import logging
import platform
import socket
import subprocess

import psutil

from mqtt_monitor.plugins.base import BasePlugin

logger = logging.getLogger(__name__)

try:
    import netifaces
except ImportError:
    netifaces = None

# AF_PACKET is Linux-only; fallback for other platforms
AF_LINK = getattr(socket, "AF_PACKET", getattr(socket, "AF_LINK", -1))

IS_WINDOWS = platform.system() == "Windows"


class NetworkInfoPlugin(BasePlugin):
    name = "network_info"
    default_interval = 60

    def __init__(self, config):
        super().__init__(config)
        self.interfaces = config.get("interfaces", [])
        self._last_network_info: dict | None = None

    def collect(self) -> dict:
        addrs = psutil.net_if_addrs()
        io_counters = psutil.net_io_counters(pernic=True)

        interfaces = self.interfaces
        # If no interfaces configured, or none have a real IP,
        # auto-detect active interfaces.
        def _has_real_ip(iface):
            for a in addrs.get(iface, []):
                if a.family == socket.AF_INET and not a.address.startswith("169.254."):
                    return True
            return False

        configured_with_ip = [i for i in interfaces if i in addrs and _has_real_ip(i)]
        if not configured_with_ip:
            interfaces = self._detect_active_interfaces(addrs)
            if not interfaces:
                return {}
        else:
            interfaces = configured_with_ip

        result = {}

        primary_iface = interfaces[0]

        for iface in interfaces:
            iface_addrs = addrs.get(iface, [])
            ip = None
            mac = None
            netmask = None

            for addr in iface_addrs:
                if addr.family == socket.AF_INET:
                    ip = addr.address
                    netmask = addr.netmask
                elif addr.family == AF_LINK:
                    mac = addr.address

            if ip:
                result[f"{iface}_ip"] = {"value": ip, "unit": ""}
            if mac:
                result[f"{iface}_mac"] = {"value": mac, "unit": ""}

            counters = io_counters.get(iface)
            if counters:
                result[f"{iface}_tx_bytes"] = {"value": counters.bytes_sent, "unit": "bytes"}
                result[f"{iface}_rx_bytes"] = {"value": counters.bytes_recv, "unit": "bytes"}

        # Wi-Fi SSID detection (cross-platform)
        ssid = self._detect_ssid()
        if ssid:
            result["wifi_ssid"] = {"value": ssid, "unit": ""}

        # Cache network info from primary interface for topology.
        primary_addrs = addrs.get(primary_iface, [])
        ip = mac = netmask = None
        for addr in primary_addrs:
            if addr.family == socket.AF_INET:
                ip = addr.address
                netmask = getattr(addr, "netmask", None)
            elif addr.family == AF_LINK:
                mac = addr.address

        gateway = self._detect_gateway()

        if ip:
            self._last_network_info = {
                "ip": ip,
                "mac": mac or "",
                "gateway": gateway or "",
                "subnet": netmask or "",
                "interface": primary_iface,
            }

        return result

    @staticmethod
    def _detect_active_interfaces(addrs: dict) -> list[str]:
        """Return interface names that are up and have a real IPv4 address.

        Skips loopback and link-local (169.254.x.x) addresses.
        """
        stats = psutil.net_if_stats()
        active = []
        for name, addr_list in addrs.items():
            # Skip loopback
            if name.lower() in ("lo", "loopback pseudo-interface 1"):
                continue
            st = stats.get(name)
            if st and st.isup:
                has_real_ipv4 = any(
                    a.family == socket.AF_INET and not a.address.startswith("169.254.")
                    for a in addr_list
                )
                if has_real_ipv4:
                    active.append(name)
        return active

    def get_network_info(self) -> dict | None:
        return self._last_network_info

    @staticmethod
    def _detect_gateway() -> str | None:
        if netifaces is not None:
            try:
                gws = netifaces.gateways()
                default = gws.get("default", {})
                if socket.AF_INET in default:
                    return default[socket.AF_INET][0]
            except Exception:
                pass

        if IS_WINDOWS:
            try:
                output = subprocess.check_output(
                    ["powershell", "-Command",
                     "(Get-NetRoute -DestinationPrefix '0.0.0.0/0' "
                     "| Select-Object -First 1).NextHop"],
                    text=True,
                    timeout=10,
                )
                gw = output.strip()
                if gw:
                    return gw
            except Exception:
                pass
        else:
            try:
                output = subprocess.check_output(
                    ["ip", "route", "show", "default"],
                    text=True,
                    timeout=5,
                )
                parts = output.strip().split()
                if "via" in parts:
                    return parts[parts.index("via") + 1]
            except Exception:
                pass

        return None

    @staticmethod
    def _detect_ssid() -> str | None:
        """Detect the current Wi-Fi SSID, if connected."""
        if IS_WINDOWS:
            try:
                output = subprocess.check_output(
                    ["netsh", "wlan", "show", "interfaces"],
                    text=True,
                    timeout=10,
                )
                for line in output.splitlines():
                    line = line.strip()
                    if line.startswith("SSID") and "BSSID" not in line:
                        # Line format: "SSID : MyNetwork"
                        parts = line.split(":", 1)
                        if len(parts) == 2:
                            ssid = parts[1].strip()
                            if ssid:
                                return ssid
            except Exception:
                pass
        else:
            # Linux: try iwconfig
            try:
                output = subprocess.check_output(
                    ["iwconfig"],
                    text=True,
                    timeout=5,
                    stderr=subprocess.DEVNULL,
                )
                for line in output.splitlines():
                    if "ESSID:" in line:
                        essid = line.split('ESSID:"')[1].split('"')[0]
                        if essid:
                            return essid
            except Exception:
                pass
        return None

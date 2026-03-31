"""Network info plugin — IP, MAC, gateway, subnet, interface stats."""

import logging
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


class NetworkInfoPlugin(BasePlugin):
    name = "network_info"
    default_interval = 60

    def __init__(self, config):
        super().__init__(config)
        self.interfaces = config.get("interfaces", [])
        self._last_network_info: dict | None = None

    def collect(self) -> dict:
        if not self.interfaces:
            return {}

        result = {}
        addrs = psutil.net_if_addrs()
        io_counters = psutil.net_io_counters(pernic=True)

        primary_iface = self.interfaces[0]

        for iface in self.interfaces:
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

        # Cache network info from primary interface for topology
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

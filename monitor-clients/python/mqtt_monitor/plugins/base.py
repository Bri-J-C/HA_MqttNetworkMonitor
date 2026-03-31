"""Base class for all MQTT Network Monitor plugins."""

from abc import ABC, abstractmethod
from typing import Any


class BasePlugin(ABC):
    name: str
    default_interval: int
    send_once: bool = False  # Collect once on connect, not on interval

    def __init__(self, config: dict[str, Any]):
        self.config = config
        self.interval = config.get("interval", self.default_interval)

    @abstractmethod
    def collect(self) -> dict:
        """Collect attributes. Returns {"attr_name": {"value": x, "unit": "y"}}."""
        ...

    def get_network_info(self) -> dict | None:
        """Optional: return network info for topology discovery."""
        return None

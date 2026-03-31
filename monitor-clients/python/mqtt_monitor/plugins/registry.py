"""Plugin discovery and registration for MQTT Network Monitor."""

import logging
from typing import Any

from mqtt_monitor.plugins.base import BasePlugin

logger = logging.getLogger(__name__)


class PluginRegistry:
    def __init__(self):
        self._plugins: dict[str, type[BasePlugin]] = {}

    def register(self, name: str, plugin_class: type[BasePlugin]) -> None:
        self._plugins[name] = plugin_class

    def get(self, name: str) -> type[BasePlugin] | None:
        return self._plugins.get(name)

    def create_from_config(
        self, plugins_config: dict[str, dict[str, Any]]
    ) -> list[BasePlugin]:
        instances = []
        for name, config in plugins_config.items():
            plugin_class = self.get(name)
            if plugin_class is None:
                logger.warning(f"Unknown plugin: {name}, skipping")
                continue
            instances.append(plugin_class(config))
        return instances

    def load_builtins(self) -> None:
        from mqtt_monitor.plugins.system_resources import SystemResourcesPlugin
        from mqtt_monitor.plugins.network_info import NetworkInfoPlugin
        from mqtt_monitor.plugins.custom_command import CustomCommandPlugin
        from mqtt_monitor.plugins.linux_system import LinuxSystemPlugin

        self.register("system_resources", SystemResourcesPlugin)
        self.register("network_info", NetworkInfoPlugin)
        self.register("custom_command", CustomCommandPlugin)
        self.register("linux_system", LinuxSystemPlugin)

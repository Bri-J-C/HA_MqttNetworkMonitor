"""Plugin discovery and registration for MQTT Network Monitor."""

import logging
import platform
from typing import Any

from mqtt_monitor.plugins.base import BasePlugin

logger = logging.getLogger(__name__)

IS_WINDOWS = platform.system() == "Windows"


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
            # Auto-substitute the platform-appropriate system plugin if the
            # user's config references the other platform's plugin name.
            resolved_name = self._resolve_platform_alias(name)
            plugin_class = self.get(resolved_name)
            if plugin_class is None:
                logger.warning(f"Unknown plugin: {name}, skipping")
                continue
            instances.append(plugin_class(config))
        return instances

    @staticmethod
    def _resolve_platform_alias(name: str) -> str:
        """Map linux_system <-> windows_system based on current platform.

        This lets a config that says ``linux_system`` transparently load
        ``windows_system`` when running on Windows (and vice-versa), so users
        don't need separate config files just for the OS system plugin.
        """
        if IS_WINDOWS and name == "linux_system":
            logger.info(
                "Running on Windows — substituting windows_system for linux_system"
            )
            return "windows_system"
        if not IS_WINDOWS and name == "windows_system":
            logger.info(
                "Running on Linux — substituting linux_system for windows_system"
            )
            return "linux_system"
        return name

    def load_builtins(self) -> None:
        from mqtt_monitor.plugins.system_resources import SystemResourcesPlugin
        from mqtt_monitor.plugins.network_info import NetworkInfoPlugin
        from mqtt_monitor.plugins.custom_command import CustomCommandPlugin

        self.register("system_resources", SystemResourcesPlugin)
        self.register("network_info", NetworkInfoPlugin)
        self.register("custom_command", CustomCommandPlugin)

        if IS_WINDOWS:
            from mqtt_monitor.plugins.windows_system import WindowsSystemPlugin
            self.register("windows_system", WindowsSystemPlugin)
        else:
            from mqtt_monitor.plugins.linux_system import LinuxSystemPlugin
            self.register("linux_system", LinuxSystemPlugin)

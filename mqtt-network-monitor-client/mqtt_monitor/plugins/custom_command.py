"""Custom command plugin — run shell commands and report output."""

import logging
import subprocess

from mqtt_monitor.plugins.base import BasePlugin

logger = logging.getLogger(__name__)

COMMAND_TIMEOUT = 10


class CustomCommandPlugin(BasePlugin):
    name = "custom_command"
    default_interval = 30

    def __init__(self, config):
        super().__init__(config)
        self.commands = config.get("commands", {})

    def collect(self) -> dict:
        result = {}
        for attr_name, cmd_config in self.commands.items():
            command = cmd_config["command"]
            unit = cmd_config.get("unit", "")
            value = self._run_command(command)
            result[attr_name] = {"value": value, "unit": unit}
        return result

    @staticmethod
    def _run_command(command: str):
        try:
            proc = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                timeout=COMMAND_TIMEOUT,
            )
            if proc.returncode != 0:
                return None
            raw = proc.stdout.strip()
            return _try_numeric(raw)
        except (TimeoutError, subprocess.TimeoutExpired, OSError) as e:
            logger.warning(f"Command failed: {command}: {e}")
            return None


def _try_numeric(value: str):
    try:
        return int(value)
    except ValueError:
        try:
            return float(value)
        except ValueError:
            return value

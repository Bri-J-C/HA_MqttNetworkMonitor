"""Remote command handler — receives, validates, and executes whitelisted commands."""

import json
import logging
import subprocess

logger = logging.getLogger(__name__)

COMMAND_TIMEOUT = 30

DEFAULT_TEMPLATES = {
    "reboot": "reboot",
    "shutdown": "shutdown -h now",
    "restart_service": "systemctl restart {service}",
}


class CommandHandler:
    def __init__(self, allowed_commands: list[str]):
        self.allowed_commands = set(allowed_commands)
        self._templates = dict(DEFAULT_TEMPLATES)

    def add_command(self, name: str, shell_cmd: str):
        self._templates[name] = shell_cmd
        self.allowed_commands.add(name)

    def remove_command(self, name: str):
        self._templates.pop(name, None)
        self.allowed_commands.discard(name)

    def get_commands(self) -> dict:
        return dict(self._templates)

    def handle(self, payload: str) -> dict:
        try:
            data = json.loads(payload)
        except (json.JSONDecodeError, TypeError):
            logger.error(f"Invalid command payload: {payload}")
            return {"request_id": "", "status": "error", "output": "Invalid JSON"}

        request_id = data.get("request_id", "")
        command = data.get("command")
        params = data.get("params", {})

        if not command:
            return {
                "request_id": request_id,
                "status": "error",
                "output": "Missing 'command' field",
            }

        if command not in self.allowed_commands:
            logger.warning(f"Rejected command: {command}")
            return {
                "request_id": request_id,
                "status": "rejected",
                "output": f"Command '{command}' is not allowed",
            }

        return self._execute(command, params, request_id)

    def _execute(self, command: str, params: dict, request_id: str) -> dict:
        template = self._templates.get(command, command)
        try:
            shell_cmd = template.format(**params)
        except KeyError as e:
            return {
                "request_id": request_id,
                "status": "error",
                "output": f"Missing parameter: {e}",
            }

        try:
            proc = subprocess.run(
                shell_cmd,
                shell=True,
                capture_output=True,
                text=True,
                timeout=COMMAND_TIMEOUT,
            )
            if proc.returncode == 0:
                return {
                    "request_id": request_id,
                    "status": "success",
                    "output": proc.stdout.strip(),
                }
            else:
                return {
                    "request_id": request_id,
                    "status": "error",
                    "output": proc.stderr.strip() or proc.stdout.strip(),
                }
        except (subprocess.TimeoutExpired, OSError) as e:
            return {
                "request_id": request_id,
                "status": "error",
                "output": str(e),
            }

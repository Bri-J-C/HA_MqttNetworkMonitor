"""Remote command handler — receives, validates, and executes whitelisted commands."""

import json
import logging
import re
import shlex
import subprocess

logger = logging.getLogger(__name__)

COMMAND_TIMEOUT = 30

# Matches dangerous format string patterns that could leak internal state
_DANGEROUS_TEMPLATE_RE = re.compile(
    r'\{[0-9]'           # numbered args like {0}, {0.__class__}
    r'|\{\w+\.\w+'       # attribute access like {x.y}
    r'|\{\w+\[.*\]'      # item access like {x[0]}
    r'|\{\w+![sra]'      # conversion flags like {x!s}
    r'|\{\w+:'            # format specs like {x:>10}
)


def _validate_template(template: str):
    """Validate that a command template only uses simple {name} placeholders.

    Rejects patterns that could enable format string injection such as
    attribute access ({0.__class__}), item access ({x[0]}), conversion
    flags ({x!s}), and format specs ({x:>10}).
    """
    if _DANGEROUS_TEMPLATE_RE.search(template):
        raise ValueError(
            f"Invalid command template: contains dangerous format patterns"
        )


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
        _validate_template(shell_cmd)
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
        logger.warning(f"Executing remote command: {command} (template: {template})")
        safe_params = {k: shlex.quote(str(v)) for k, v in params.items()}
        try:
            shell_cmd = template.format(**safe_params)
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

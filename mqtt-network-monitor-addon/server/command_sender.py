"""Manages sending commands to devices and tracking responses."""

import asyncio
import logging
import time
from typing import Any

logger = logging.getLogger(__name__)

DEFAULT_TIMEOUT = 30


class CommandSender:
    def __init__(self, mqtt_handler, timeout: int = DEFAULT_TIMEOUT):
        self._mqtt = mqtt_handler
        self._timeout = timeout
        self._pending: dict[str, dict[str, Any]] = {}

    def send(self, device_id: str, command: str, params: dict | None = None) -> str:
        request_id = self._mqtt.send_command(device_id, command, params)
        self._pending[request_id] = {
            "device_id": device_id,
            "command": command,
            "sent_at": time.time(),
            "timestamp": time.time(),
            "status": "pending",
        }
        logger.debug(f"Command queued: {command} -> {device_id} (req: {request_id})")
        return request_id

    def handle_response(self, response: dict) -> None:
        request_id = response.get("request_id")
        if request_id and request_id in self._pending:
            self._pending[request_id].update({
                "status": response.get("status", "unknown"),
                "output": response.get("output", ""),
                "completed_at": time.time(),
            })
            logger.debug(f"Command response received: req={request_id}, "
                         f"status={response.get('status', 'unknown')}")

    def get_pending(self) -> dict:
        self._cleanup_timed_out()
        return dict(self._pending)

    def _cleanup_timed_out(self):
        now = time.time()
        for req_id, cmd in list(self._pending.items()):
            if cmd["status"] == "pending" and now - cmd["sent_at"] > self._timeout:
                cmd["status"] = "timed_out"
                logger.debug(f"Command timed out: {cmd['command']} -> {cmd['device_id']} "
                             f"(req: {req_id})")
        # Evict entries older than 5 minutes
        cutoff = time.time() - 300
        to_remove = [rid for rid, entry in self._pending.items()
                     if entry.get("timestamp", 0) < cutoff]
        for rid in to_remove:
            del self._pending[rid]

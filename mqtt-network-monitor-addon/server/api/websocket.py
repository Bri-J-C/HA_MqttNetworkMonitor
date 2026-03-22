"""WebSocket endpoint for real-time device updates."""

import asyncio
import json
import logging
from fastapi import WebSocket, WebSocketDisconnect
from typing import Any

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self._connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self._connections.append(websocket)
        logger.info(f"WebSocket client connected ({len(self._connections)} total)")

    def disconnect(self, websocket: WebSocket):
        self._connections.remove(websocket)
        logger.info(f"WebSocket client disconnected ({len(self._connections)} total)")

    async def broadcast(self, message: dict[str, Any]):
        data = json.dumps(message)
        disconnected = []
        for ws in self._connections:
            try:
                await ws.send_text(data)
            except Exception:
                disconnected.append(ws)
        for ws in disconnected:
            self._connections.remove(ws)

    @property
    def connection_count(self) -> int:
        return len(self._connections)


ws_manager = ConnectionManager()

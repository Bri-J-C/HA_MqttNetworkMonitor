"""Global settings REST API endpoints."""

from fastapi import APIRouter
from typing import Any
from server.api import state

router = APIRouter(prefix="/api/settings", tags=["settings"])


@router.get("")
def get_settings():
    return state.settings_manager.get_settings()


@router.put("")
def update_settings(body: dict[str, Any]):
    return state.settings_manager.update_settings(body)

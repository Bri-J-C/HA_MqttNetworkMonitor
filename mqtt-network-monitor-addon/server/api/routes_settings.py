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


@router.get("/export")
def export_settings():
    """Export all settings, groups, and layouts as a single JSON bundle."""
    return {
        "version": 1,
        "settings": state.settings_manager.get_settings(),
        "groups": state.registry.get_groups(),
        "layouts": state.topology.get_layouts(),
    }


@router.post("/import")
def import_settings(body: dict[str, Any]):
    """Import settings, groups, and layouts from an export bundle."""
    if "settings" in body:
        state.settings_manager.update_settings(body["settings"])
    if "groups" in body:
        for group_id, group_data in body["groups"].items():
            existing = state.registry.get_groups()
            if group_id not in existing:
                state.registry.create_group(
                    group_id,
                    group_data.get("name", group_id),
                    group_data.get("device_ids", []),
                )
            state.registry.update_group(group_id, group_data)
    if "layouts" in body:
        for layout_id, layout_data in body["layouts"].items():
            layout_data["id"] = layout_id
            state.topology.save_layout(layout_data)
    return {"status": "ok"}

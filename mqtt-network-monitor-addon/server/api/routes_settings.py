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
            if group_id in existing:
                state.registry.update_group(
                    group_id,
                    name=group_data.get("name"),
                    device_ids=group_data.get("device_ids"),
                    custom_commands=group_data.get("custom_commands"),
                    custom_sensors=group_data.get("custom_sensors"),
                    thresholds=group_data.get("thresholds"),
                    crit_thresholds=group_data.get("crit_thresholds"),
                    hidden_commands=group_data.get("hidden_commands"),
                    interval=group_data.get("interval"),
                    attribute_transforms=group_data.get("attribute_transforms"),
                )
            else:
                state.registry.create_group(
                    group_id,
                    group_data.get("name", group_id),
                    group_data.get("device_ids", []),
                )
                state.registry.update_group(
                    group_id,
                    custom_commands=group_data.get("custom_commands"),
                    custom_sensors=group_data.get("custom_sensors"),
                    thresholds=group_data.get("thresholds"),
                    crit_thresholds=group_data.get("crit_thresholds"),
                    hidden_commands=group_data.get("hidden_commands"),
                    interval=group_data.get("interval"),
                    attribute_transforms=group_data.get("attribute_transforms"),
                )
    if "layouts" in body:
        for layout_id, layout_data in body["layouts"].items():
            layout_data["id"] = layout_id
            state.topology.save_layout(layout_data)
    return {"status": "ok"}

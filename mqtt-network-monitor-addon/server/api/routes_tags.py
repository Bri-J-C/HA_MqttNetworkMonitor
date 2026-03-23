"""Tag registry REST API endpoints."""

from fastapi import APIRouter, HTTPException
from typing import Any
from server.api import state

router = APIRouter(prefix="/api/tags", tags=["tags"])


@router.get("")
def get_tags():
    devices = state.registry.get_all_devices() if state.registry else {}
    return state.tag_registry.get_all_tags(devices)


@router.post("")
def create_tag(body: dict[str, Any]):
    tag = body.get("tag", "").strip()
    if not tag:
        raise HTTPException(status_code=400, detail="Missing 'tag' field")
    try:
        added = state.tag_registry.add_tag(tag)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if not added:
        raise HTTPException(status_code=409, detail="Tag already exists")
    return {"tag": tag}


@router.put("/{tag}")
def rename_tag(tag: str, body: dict[str, Any]):
    new_name = body.get("new_name", "").strip()
    if not new_name:
        raise HTTPException(status_code=400, detail="Missing 'new_name' field")
    try:
        result = state.tag_registry.rename_tag(tag, new_name)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    if not result:
        raise HTTPException(status_code=404, detail="Tag not found")
    # Update the tag on all devices that have it
    for device_id, device in state.registry.get_all_devices().items():
        server_tags = device.get("server_tags", [])
        if tag in server_tags:
            updated = [new_name if t == tag else t for t in server_tags]
            state.registry.set_server_tags(device_id, updated)
    return {"tag": new_name}


@router.delete("/{tag}")
def delete_tag(tag: str):
    result = state.tag_registry.delete_tag(tag)
    if not result:
        raise HTTPException(status_code=404, detail="Tag not found")
    # Remove tag from all devices that have it
    for device_id, device in state.registry.get_all_devices().items():
        server_tags = device.get("server_tags", [])
        if tag in server_tags:
            server_tags = [t for t in server_tags if t != tag]
            state.registry.set_server_tags(device_id, server_tags)
    return {"status": "deleted"}

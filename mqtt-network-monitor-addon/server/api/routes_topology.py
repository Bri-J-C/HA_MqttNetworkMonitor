"""Topology REST API endpoints."""

from fastapi import APIRouter, HTTPException
from typing import Any
from server.api import state

router = APIRouter(prefix="/api/topology", tags=["topology"])


@router.get("")
def get_topology():
    return state.topology.auto_discover()


@router.get("/layouts")
def get_layouts():
    return state.topology.get_layouts()


@router.post("/layouts")
def save_layout(layout: dict[str, Any]):
    return state.topology.save_layout(layout)


@router.delete("/layouts/{layout_id}")
def delete_layout(layout_id: str):
    if not state.topology.delete_layout(layout_id):
        raise HTTPException(status_code=404, detail="Layout not found")
    return {"status": "deleted"}

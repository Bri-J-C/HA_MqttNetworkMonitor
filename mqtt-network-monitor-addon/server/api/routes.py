"""REST API entry point for the MQTT Network Monitor add-on.

Wires together sub-routers and exposes the FastAPI app instance plus
init_app() which main.py calls at startup to inject shared dependencies.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI

from server.api import state
from server.api.routes_devices import router as devices_router
from server.api.routes_groups import router as groups_router
from server.api.routes_tags import router as tags_router
from server.api.routes_topology import router as topology_router
from server.api.routes_settings import router as settings_router

# Lifespan is set by main.py before the server starts.
# This placeholder avoids the deprecation warning from FastAPI.
_lifespan_ref = None

@asynccontextmanager
async def _lifespan_wrapper(app):
    if _lifespan_ref:
        async with _lifespan_ref(app):
            yield
    else:
        yield

app = FastAPI(title="MQTT Network Monitor", lifespan=_lifespan_wrapper)

app.include_router(devices_router)
app.include_router(groups_router)
app.include_router(tags_router)
app.include_router(topology_router)
app.include_router(settings_router)


def init_app(reg, topo, cmd_sender, mqtt_hdlr, tag_reg=None, settings_mgr=None, ha_mgr=None):
    state.registry = reg
    state.topology = topo
    state.command_sender = cmd_sender
    state.mqtt_handler = mqtt_hdlr
    state.tag_registry = tag_reg
    state.settings_manager = settings_mgr
    state.ha_entity_manager = ha_mgr


# Re-export state globals so existing code can still do:
#   from server.api.routes import registry
def __getattr__(name):
    if name in ("registry", "topology", "command_sender", "mqtt_handler",
                "tag_registry", "settings_manager", "ha_entity_manager"):
        return getattr(state, name)
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


# Static files mount moved to main.py (must be registered after WebSocket route)

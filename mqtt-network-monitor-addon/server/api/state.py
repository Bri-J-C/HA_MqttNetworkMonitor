"""Shared application state for API route modules.

These globals are set once at startup via init_app() in routes.py and then
accessed by the individual route sub-modules.
"""

registry = None
topology = None
command_sender = None
mqtt_handler = None
tag_registry = None
settings_manager = None
ha_entity_manager = None

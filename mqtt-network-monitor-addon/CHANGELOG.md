# Changelog

## 0.1.0

### Added
- Initial release
- Python client agent with plugin architecture (system_resources, network_info, custom_command)
- ESP32 Arduino client library
- HA add-on backend with FastAPI REST API and WebSocket
- Interactive topology map editor with drag-and-drop, manual links, labels
- Device dashboard with status/tag filtering and group view
- Lovelace cards (device status + topology) with auto-discovery
- Tag registry for server-side device organization
- Group policies with cascading thresholds, HA exposure, commands, sensors
- Remote config push — update collection intervals, sensors, and commands via MQTT
- Per-attribute HA entity exposure toggles
- Threshold system with operators (>, <, >=, <=, ==, !=)
- Device detail overlay shared between Devices and Topology pages
- Hide/unhide attributes and commands
- Debounced disk saves for scalability
- Incremental API polling with ?since= parameter
- WebSocket delta broadcasts (skip unchanged devices)
- HA state publish deduplication
- AppArmor security profile

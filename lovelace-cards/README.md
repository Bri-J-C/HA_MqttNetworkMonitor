# MQTT Network Monitor — Lovelace Cards

Custom Lovelace cards for Home Assistant that display data from the MQTT Network Monitor add-on.

## Installation

### HACS (recommended)
1. Add this repository as a custom repository in HACS
2. Install "MQTT Network Monitor Cards"
3. Add the resource in your Lovelace config

### Manual
1. Copy `mqtt-network-monitor-cards.js` to `/config/www/`
2. Add the resource to your Lovelace config:
   ```yaml
   resources:
     - url: /local/mqtt-network-monitor-cards.js
       type: module
   ```

## Cards

### Device Status Card
Shows a single device with its current status and key attributes.

```yaml
type: custom:mqtt-device-status-card
device_id: pi-garage
server_url: http://homeassistant.local:8099  # Optional, defaults to same host
attributes:  # Optional, shows all if omitted
  - cpu_usage
  - memory_usage
  - cpu_temp
```

### Mini Topology Card
Shows a compact network topology overview.

```yaml
type: custom:mqtt-topology-card
title: Home Network
server_url: http://homeassistant.local:8099  # Optional
```

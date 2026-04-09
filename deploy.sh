#!/bin/bash
# Deploy MQTT Network Monitor add-on to Home Assistant
# Usage: ./deploy.sh

set -e

HA_HOST="${HA_HOST:-root@10.0.0.8}"
ADDON_PATH="${ADDON_PATH:-/addons/mqtt_network_monitor}"
ADDON_SLUG="${ADDON_SLUG:-local_mqtt_network_monitor}"
SRC_DIR="$(dirname "$0")/mqtt-network-monitor-addon"

echo "Deploying add-on to $HA_HOST:$ADDON_PATH..."

# Server code
scp -r "$SRC_DIR/server/" "$HA_HOST:$ADDON_PATH/"

# Frontend (copy contents, not the dir itself, to avoid nested dist/dist/)
ssh "$HA_HOST" "mkdir -p \"$ADDON_PATH/frontend/dist\""
scp "$SRC_DIR/frontend/dist/"* "$HA_HOST:$ADDON_PATH/frontend/dist/"

# Config and build files
scp "$SRC_DIR/config.yaml" "$SRC_DIR/run.sh" "$SRC_DIR/requirements.txt" \
    "$SRC_DIR/Dockerfile" "$SRC_DIR/build.yaml" \
    "$HA_HOST:$ADDON_PATH/"

# Translations
scp -r "$SRC_DIR/translations/" "$HA_HOST:$ADDON_PATH/"

# Optional files
[ -f "$SRC_DIR/apparmor.txt" ] && scp "$SRC_DIR/apparmor.txt" "$HA_HOST:$ADDON_PATH/"

# Lovelace cards
CARDS_DIR="$(dirname "$0")/lovelace-cards"
if [ -f "$CARDS_DIR/mqtt-network-monitor-cards.js" ]; then
    echo "Deploying Lovelace cards..."
    scp "$CARDS_DIR/mqtt-network-monitor-cards.js" "$HA_HOST:/config/www/mqtt-network-monitor-cards.js"
fi

# Clear Python cache
ssh "$HA_HOST" "find \"$ADDON_PATH\" -name '*.pyc' -delete 2>/dev/null; find \"$ADDON_PATH\" -name '__pycache__' -type d -exec rm -rf {} + 2>/dev/null" || true

echo "Rebuilding add-on..."
ssh "$HA_HOST" "ha apps rebuild \"$ADDON_SLUG\""

# If version changed, reload store and update so HA picks up schema changes
REMOTE_VER=$(ssh "$HA_HOST" "grep '^version:' \"$ADDON_PATH/config.yaml\" | head -1 | tr -d '\"' | awk '{print \$2}'")
INSTALLED_VER=$(ssh "$HA_HOST" "ha apps info \"$ADDON_SLUG\" --raw-json 2>/dev/null | python3 -c 'import sys,json;print(json.load(sys.stdin).get(\"data\",{}).get(\"version\",\"\"))' 2>/dev/null || echo ''")
if [ -n "$REMOTE_VER" ] && [ "$REMOTE_VER" != "$INSTALLED_VER" ]; then
    echo "Version changed ($INSTALLED_VER -> $REMOTE_VER), updating..."
    ssh "$HA_HOST" "ha store reload" 2>/dev/null
    sleep 3
    ssh "$HA_HOST" "ha apps update \"$ADDON_SLUG\"" 2>/dev/null || true
fi

sleep 5
echo "Logs:"
ssh "$HA_HOST" "ha apps logs \"$ADDON_SLUG\" --lines 15"

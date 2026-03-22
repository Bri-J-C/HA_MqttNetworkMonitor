#!/usr/bin/env bash
set -e

# Read options from HA add-on config
export MQTT_BROKER=$(bashio::config 'mqtt_host')
export MQTT_PORT=$(bashio::config 'mqtt_port')
export MQTT_USER=$(bashio::config 'mqtt_user')
export MQTT_PASSWORD=$(bashio::config 'mqtt_password')
export DATA_DIR="/data"
export PORT=8099

# If MQTT broker not set, try to use HA's Mosquitto
if [ -z "$MQTT_BROKER" ]; then
    if bashio::services.available "mqtt"; then
        export MQTT_BROKER=$(bashio::services "mqtt" "host")
        export MQTT_PORT=$(bashio::services "mqtt" "port")
        export MQTT_USER=$(bashio::services "mqtt" "username")
        export MQTT_PASSWORD=$(bashio::services "mqtt" "password")
    fi
fi

exec python3 -m server.main

#!/usr/bin/with-contenv bashio
set -e

export MQTT_BROKER=$(bashio::config 'mqtt_host')
export MQTT_PORT=$(bashio::config 'mqtt_port')
export MQTT_USER=$(bashio::config 'mqtt_user')
export MQTT_PASSWORD=$(bashio::config 'mqtt_password')
export DATA_DIR="/data"
export PORT=8100

bashio::log.info "Starting MQTT Network Monitor..."
bashio::log.info "MQTT Broker: ${MQTT_BROKER}:${MQTT_PORT}"

cd /app
exec python3 -u -m server.main

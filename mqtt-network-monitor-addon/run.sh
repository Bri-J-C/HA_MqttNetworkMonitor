#!/usr/bin/with-contenv bashio
set -e

export MQTT_BROKER=$(bashio::config 'mqtt_host')
export MQTT_PORT=$(bashio::config 'mqtt_port')
export MQTT_USER=$(bashio::config 'mqtt_user')
export MQTT_PASSWORD=$(bashio::config 'mqtt_password')
export LOG_LEVEL=$(bashio::config 'log_level')
MQTT_TLS=$(bashio::config 'mqtt_tls' 'false')
MQTT_CA_CERT=$(bashio::config 'mqtt_ca_cert' '')
export MQTT_TLS MQTT_CA_CERT
export DATA_DIR="/data"
export PORT=8100

bashio::log.info "Starting MQTT Network Monitor..."
bashio::log.info "MQTT Broker: ${MQTT_BROKER}:${MQTT_PORT}"

cd /app
exec python3 -u -m server.main

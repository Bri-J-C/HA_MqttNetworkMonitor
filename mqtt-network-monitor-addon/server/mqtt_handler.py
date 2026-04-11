"""MQTT subscriber — listens for device messages and updates registry."""

import json
import logging
import os
import ssl
import paho.mqtt.client as mqtt

from server.device_registry import DeviceRegistry

logger = logging.getLogger(__name__)

TOPIC_PREFIX = "network_monitor"
MAX_PAYLOAD_SIZE = 64 * 1024  # 64KB


class MQTTHandler:
    def __init__(self, registry: DeviceRegistry, broker: str, port: int = 1883,
                 username: str | None = None, password: str | None = None):
        self._registry = registry
        self._broker = broker
        self._port = port
        self._client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        self._on_device_update_callbacks = []
        self._on_command_response_callbacks = []

        if username:
            self._client.username_pw_set(username, password)

        if os.environ.get("MQTT_TLS", "false").lower() == "true":
            ca_cert = os.environ.get("MQTT_CA_CERT", "")
            if ca_cert:
                self._client.tls_set(ca_certs=ca_cert)
            else:
                self._client.tls_set()  # Uses system CA store

        self._client.on_connect = self._on_connect
        self._client.on_message = self._on_message

    def get_client(self):
        """Return the underlying MQTT client for direct publishing."""
        return self._client

    def on_device_update(self, callback):
        self._on_device_update_callbacks.append(callback)

    def on_command_response(self, callback):
        self._on_command_response_callbacks.append(callback)

    def connect(self):
        self._client.connect(self._broker, self._port)
        self._client.loop_start()
        logger.info(f"Connected to MQTT broker at {self._broker}:{self._port}")

    def disconnect(self):
        self._client.loop_stop()
        self._client.disconnect()

    def _sign_payload(self, data: dict, device_id: str) -> dict:
        """Add HMAC signature if a shared secret is configured for the device."""
        secret = self._get_device_secret(device_id)
        if not secret:
            return data
        import hmac as hmac_mod
        import hashlib
        payload_str = json.dumps(data, sort_keys=True, separators=(',', ':'))
        sig = hmac_mod.new(secret.encode(), payload_str.encode(), hashlib.sha256).hexdigest()
        data["_hmac"] = sig
        return data

    def _get_device_secret(self, device_id: str) -> str | None:
        """Get shared secret for a device. Checks device settings, then global."""
        device = self._registry.get_device(device_id)
        if device and device.get("shared_secret"):
            return device["shared_secret"]
        # Could also check global settings -- for now return None (no signing)
        return None

    def send_command(self, device_id: str, command: str, params: dict | None = None,
                     request_id: str | None = None) -> str:
        import uuid
        request_id = request_id or str(uuid.uuid4())
        data = {
            "command": command,
            "params": params or {},
            "request_id": request_id,
        }
        data = self._sign_payload(data, device_id)
        payload = json.dumps(data)
        topic = f"{TOPIC_PREFIX}/{device_id}/command"
        self._client.publish(topic, payload)
        logger.info(f"Sent command '{command}' to {device_id} (req: {request_id})")
        return request_id

    def push_config(self, device_id: str, config: dict) -> None:
        """Publish a config update to a device via MQTT."""
        data = {"type": "config_update", **config}
        data = self._sign_payload(data, device_id)
        payload = json.dumps(data)
        topic = f"{TOPIC_PREFIX}/{device_id}/config"
        self._client.publish(topic, payload)
        logger.info(f"Pushed config to {device_id}")

    def _on_connect(self, client, userdata, flags, rc, *args):
        logger.info(f"MQTT connected (rc={rc})")
        client.subscribe(f"{TOPIC_PREFIX}/+/+")
        client.subscribe(f"{TOPIC_PREFIX}/+/command/response")
        client.subscribe(f"{TOPIC_PREFIX}/+/config/response")

    def _on_message(self, client, userdata, msg):
        if len(msg.payload) > MAX_PAYLOAD_SIZE:
            logger.warning(f"Dropping oversized MQTT payload ({len(msg.payload)} bytes) from {msg.topic}")
            return
        topic_parts = msg.topic.split("/")
        if len(topic_parts) < 3:
            return

        device_id = topic_parts[1]
        # Validate device_id format
        if not device_id or len(device_id) > 64 or not all(
            c.isalnum() or c in '-_.' for c in device_id
        ):
            logger.warning(f"Invalid device_id in topic: {device_id}")
            return
        subtopic = "/".join(topic_parts[2:])

        if subtopic == "status":
            status = msg.payload.decode().strip().strip('"')
            if not status:
                return  # Empty payload (cleared retained message), skip
            logger.debug(f"Device {device_id} status: {status}")
            self._registry.set_device_status(device_id, status)
            self._notify_update(device_id)

        elif subtopic == "command/response":
            try:
                response = json.loads(msg.payload.decode())
                logger.info(f"Command response from {device_id}: status={response.get('status')}, output={response.get('output', '')[:100]}")
                self._registry.add_command_response(device_id, response)
                # Notify command sender so pending status updates
                for cb in self._on_command_response_callbacks:
                    cb(response)
            except json.JSONDecodeError:
                logger.warning(f"Invalid command response JSON from {device_id}")

        elif subtopic == "config/response":
            try:
                response = json.loads(msg.payload.decode())
                status = response.get("status", "unknown")
                logger.debug(f"Config response from {device_id}: status={status}")
            except json.JSONDecodeError:
                logger.warning(f"Invalid config response JSON from {device_id}")

        elif subtopic == "config":
            # Server's own config push echoed back — ignore
            return

        else:
            # Plugin data
            try:
                raw = msg.payload.decode().strip()
            except UnicodeDecodeError:
                logger.warning(f"Device {device_id}/{subtopic}: non-UTF-8 payload, skipping")
                return
            if not raw:
                return  # Empty payload (cleared retained message), skip
            try:
                payload = json.loads(raw)
                if not payload or not isinstance(payload, dict):
                    return  # Empty or invalid payload
                self._registry.update_device(device_id, payload, plugin_name=subtopic)
                self._notify_update(device_id)
                logger.debug(f"Updated device {device_id} from plugin {subtopic}")
            except json.JSONDecodeError:
                logger.warning(f"Invalid JSON from {device_id}/{subtopic}")

    def _notify_update(self, device_id: str):
        for callback in self._on_device_update_callbacks:
            try:
                callback(device_id)
            except Exception as e:
                logger.error(f"Callback error: {e}")

"""Creates and updates Home Assistant entities via MQTT discovery."""

import json
import logging

import paho.mqtt.client as mqtt

logger = logging.getLogger(__name__)

HA_DISCOVERY_PREFIX = "homeassistant"


class HAEntityManager:
    def __init__(self, mqtt_client: mqtt.Client):
        self._mqtt = mqtt_client
        self._registered_entities: set[str] = set()

    def register_device_entities(self, device_id: str, device: dict) -> None:
        attributes = device.get("attributes", {})
        device_name = device.get("device_name", device_id)
        device_type = device.get("device_type", "unknown")

        # Register availability sensor
        self._register_binary_sensor(
            device_id=device_id,
            attr_name="availability",
            device_name=device_name,
            device_type=device_type,
            config={
                "name": f"{device_name} Availability",
                "state_topic": f"network_monitor/{device_id}/status",
                "payload_on": "online",
                "payload_off": "offline",
                "device_class": "connectivity",
            },
        )

        # Register attribute sensors
        for attr_name, attr_data in attributes.items():
            unit = attr_data.get("unit", "")
            self._register_sensor(
                device_id=device_id,
                attr_name=attr_name,
                device_name=device_name,
                device_type=device_type,
                unit=unit,
            )

    def _register_sensor(self, device_id: str, attr_name: str,
                         device_name: str, device_type: str, unit: str) -> None:
        entity_key = f"{device_id}_{attr_name}"
        if entity_key in self._registered_entities:
            return

        unique_id = f"network_monitor_{device_id}_{attr_name}"
        config = {
            "name": f"{device_name} {attr_name.replace('_', ' ').title()}",
            "unique_id": unique_id,
            "state_topic": f"network_monitor/{device_id}/ha/{attr_name}",
            "unit_of_measurement": unit,
            "device": {
                "identifiers": [f"network_monitor_{device_id}"],
                "name": device_name,
                "model": device_type,
                "manufacturer": "MQTT Network Monitor",
            },
        }

        # Add device class for known types
        device_class = self._get_device_class(attr_name, unit)
        if device_class:
            config["device_class"] = device_class

        topic = f"{HA_DISCOVERY_PREFIX}/sensor/{unique_id}/config"
        self._mqtt.publish(topic, json.dumps(config), retain=True)
        self._registered_entities.add(entity_key)
        logger.info(f"Registered HA sensor: {unique_id}")

    def _register_binary_sensor(self, device_id: str, attr_name: str,
                                device_name: str, device_type: str,
                                config: dict) -> None:
        entity_key = f"{device_id}_{attr_name}"
        if entity_key in self._registered_entities:
            return

        unique_id = f"network_monitor_{device_id}_{attr_name}"
        config.update({
            "unique_id": unique_id,
            "device": {
                "identifiers": [f"network_monitor_{device_id}"],
                "name": device_name,
                "model": device_type,
                "manufacturer": "MQTT Network Monitor",
            },
        })

        topic = f"{HA_DISCOVERY_PREFIX}/binary_sensor/{unique_id}/config"
        self._mqtt.publish(topic, json.dumps(config), retain=True)
        self._registered_entities.add(entity_key)
        logger.info(f"Registered HA binary sensor: {unique_id}")

    def publish_attribute_state(self, device_id: str, attr_name: str, value) -> None:
        topic = f"network_monitor/{device_id}/ha/{attr_name}"
        self._mqtt.publish(topic, str(value) if value is not None else "unknown")

    def update_device_states(self, device_id: str, device: dict) -> None:
        self.register_device_entities(device_id, device)
        for attr_name, attr_data in device.get("attributes", {}).items():
            self.publish_attribute_state(device_id, attr_name, attr_data.get("value"))

    @staticmethod
    def _get_device_class(attr_name: str, unit: str) -> str | None:
        if "temp" in attr_name and "°C" in unit:
            return "temperature"
        if unit == "%":
            return None  # No specific device class for generic percentages
        if "power" in attr_name:
            return "power"
        return None

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
        self._last_published: dict[str, str] = {}  # "device_id/attr_name" -> last published value

    def register_device_entities(
        self,
        device_id: str,
        device: dict,
        exposed_attributes: list[str] | None = None,
    ) -> None:
        """Register HA entities for *device*.

        Args:
            device_id: Unique device identifier.
            device: Device record dict.
            exposed_attributes: If provided, only register sensors for these
                attribute names. Pass ``None`` to expose all attributes (legacy
                behaviour).
        """
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

        # Determine which attributes to expose
        if exposed_attributes is not None:
            expose_set: set[str] | None = set(exposed_attributes)
        else:
            expose_set = None  # None means expose all

        # Un-expose any previously registered attributes that are now excluded
        if expose_set is not None:
            for attr_name in list(attributes.keys()):
                entity_key = f"{device_id}_{attr_name}"
                if attr_name not in expose_set and entity_key in self._registered_entities:
                    self._remove_sensor(device_id, attr_name)

        # Register attribute sensors
        for attr_name, attr_data in attributes.items():
            if expose_set is not None and attr_name not in expose_set:
                continue
            unit = attr_data.get("unit", "")
            self._register_sensor(
                device_id=device_id,
                attr_name=attr_name,
                device_name=device_name,
                device_type=device_type,
                unit=unit,
            )

    def remove_device_entities(self, device_id: str, device: dict) -> None:
        """Remove ALL HA entities for a device (sensors + binary sensors)."""
        # Remove availability binary sensor
        unique_id = f"network_monitor_{device_id}_availability"
        topic = f"{HA_DISCOVERY_PREFIX}/binary_sensor/{unique_id}/config"
        self._mqtt.publish(topic, "", retain=True)
        self._registered_entities.discard(f"{device_id}_availability")
        logger.info(f"Removed HA binary sensor: {unique_id}")

        # Remove all attribute sensors
        for attr_name in device.get("attributes", {}):
            self._remove_sensor(device_id, attr_name)

        # Clear the status retained message
        self._mqtt.publish(f"network_monitor/{device_id}/status", "", retain=True)

        # Clear any HA state topics
        for attr_name in device.get("attributes", {}):
            self._mqtt.publish(f"network_monitor/{device_id}/ha/{attr_name}", "", retain=True)

    def _remove_sensor(self, device_id: str, attr_name: str) -> None:
        """Remove a sensor from HA by publishing an empty retained config."""
        entity_key = f"{device_id}_{attr_name}"
        unique_id = f"network_monitor_{device_id}_{attr_name}"
        topic = f"{HA_DISCOVERY_PREFIX}/sensor/{unique_id}/config"
        self._mqtt.publish(topic, "", retain=True)
        self._registered_entities.discard(entity_key)
        logger.info(f"Removed HA sensor: {unique_id}")

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
        key = f"{device_id}/{attr_name}"
        str_val = str(value) if value is not None else "unknown"
        if self._last_published.get(key) == str_val:
            return  # Value unchanged, skip
        topic = f"network_monitor/{device_id}/ha/{attr_name}"
        self._mqtt.publish(topic, str_val)
        self._last_published[key] = str_val

    def update_device_states(
        self,
        device_id: str,
        device: dict,
        exposed_attributes: list[str] | None = None,
    ) -> None:
        """Register entities and publish current state values.

        Args:
            device_id: Unique device identifier.
            device: Device record dict.
            exposed_attributes: If provided, only update state for these
                attribute names. Pass ``None`` to update all attributes.
        """
        self.register_device_entities(device_id, device, exposed_attributes)
        expose_set = set(exposed_attributes) if exposed_attributes is not None else None
        for attr_name, attr_data in device.get("attributes", {}).items():
            if expose_set is not None and attr_name not in expose_set:
                continue
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

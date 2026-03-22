"""System resources plugin — CPU, memory, disk, temperature, uptime."""

import time

import psutil

from mqtt_monitor.plugins.base import BasePlugin

COLLECTORS = {}


def collector(attr_name):
    def decorator(func):
        COLLECTORS[attr_name] = func
        return func
    return decorator


class SystemResourcesPlugin(BasePlugin):
    name = "system_resources"
    default_interval = 30

    def __init__(self, config):
        super().__init__(config)
        self.requested_attributes = config.get("attributes", list(COLLECTORS.keys()))

    def collect(self) -> dict:
        result = {}
        for attr in self.requested_attributes:
            func = COLLECTORS.get(attr)
            if func:
                result[attr] = func()
        return result

    @staticmethod
    @collector("cpu_usage")
    def _cpu_usage():
        return {"value": psutil.cpu_percent(interval=0), "unit": "%"}

    @staticmethod
    @collector("memory_usage")
    def _memory_usage():
        return {"value": psutil.virtual_memory().percent, "unit": "%"}

    @staticmethod
    @collector("disk_usage")
    def _disk_usage():
        return {"value": psutil.disk_usage("/").percent, "unit": "%"}

    @staticmethod
    @collector("uptime")
    def _uptime():
        return {"value": int(time.time() - psutil.boot_time()), "unit": "seconds"}

    @staticmethod
    @collector("cpu_temp")
    def _cpu_temp():
        try:
            temps = psutil.sensors_temperatures()
            for sensor_readings in temps.values():
                if sensor_readings:
                    return {"value": sensor_readings[0].current, "unit": "°C"}
            return {"value": None, "unit": "°C"}
        except (AttributeError, OSError):
            return {"value": None, "unit": "°C"}

#ifndef MQTT_MONITOR_CUSTOM_SENSOR_PLUGIN_H
#define MQTT_MONITOR_CUSTOM_SENSOR_PLUGIN_H

#include "BasePlugin.h"

#ifndef MAX_CUSTOM_SENSORS
#define MAX_CUSTOM_SENSORS 8
#endif

// ESP32 equivalent of the Python client's custom_command plugin.
// Register named sensors with getter functions instead of shell commands.
// Publishes to "network_monitor/{id}/custom_command" — same topic the add-on expects.
//
// Usage:
//   CustomSensorPlugin sensors(10);  // every 10 seconds
//   sensors.add("position", "%", []() -> float { return curtain_pct; });
//   sensors.addString("state", "", []() -> const char* { return "open"; });

class CustomSensorPlugin : public BasePlugin {
public:
    typedef float (*NumericFn)();
    typedef const char* (*StringFn)();

    CustomSensorPlugin(unsigned long intervalSec = 30) {
        _interval = intervalSec * 1000;
    }

    // Matches the Python client's topic so the add-on handles it identically
    const char* name() const override { return "custom_command"; }

    int count() const { return _count; }
    void clearSensors() { _count = 0; }

    void add(const char* sensorName, const char* unit, NumericFn fn) {
        if (_count >= MAX_CUSTOM_SENSORS) return;
        _sensors[_count++] = { sensorName, unit, fn, nullptr };
    }

    void addString(const char* sensorName, const char* unit, StringFn fn) {
        if (_count >= MAX_CUSTOM_SENSORS) return;
        _sensors[_count++] = { sensorName, unit, nullptr, fn };
    }

    int collect(char* buf, int maxLen) override {
        int n = 0;
        for (int i = 0; i < _count; i++) {
            if (i > 0 && n < maxLen - 1) buf[n++] = ',';
            Sensor& s = _sensors[i];
            if (s.numFn) {
                n += snprintf(buf + n, maxLen - n,
                    "\"%s\":{\"value\":%.2f,\"unit\":\"%s\"}",
                    s.name, s.numFn(), s.unit);
            } else if (s.strFn) {
                n += snprintf(buf + n, maxLen - n,
                    "\"%s\":{\"value\":\"%s\",\"unit\":\"%s\"}",
                    s.name, s.strFn(), s.unit);
            }
        }
        return n;
    }

private:
    struct Sensor {
        const char* name;
        const char* unit;
        NumericFn numFn;
        StringFn strFn;
    };
    Sensor _sensors[MAX_CUSTOM_SENSORS];
    int _count = 0;
};

#endif

#ifndef MQTT_MONITOR_BASE_PLUGIN_H
#define MQTT_MONITOR_BASE_PLUGIN_H

#include <Arduino.h>
#include <ArduinoJson.h>

class BasePlugin {
public:
    virtual ~BasePlugin() = default;
    virtual const char* name() const = 0;
    virtual void collect(JsonObject& attributes) = 0;
    virtual bool hasNetworkInfo() const { return false; }
    virtual void getNetworkInfo(JsonObject& network) {}

    void setInterval(unsigned long intervalMs) { _interval = intervalMs; }
    unsigned long getInterval() const { return _interval; }

    bool shouldCollect() {
        unsigned long now = millis();
        if (now - _lastCollect >= _interval) {
            _lastCollect = now;
            return true;
        }
        return false;
    }

protected:
    unsigned long _interval = 30000;
    unsigned long _lastCollect = 0;
};

#endif

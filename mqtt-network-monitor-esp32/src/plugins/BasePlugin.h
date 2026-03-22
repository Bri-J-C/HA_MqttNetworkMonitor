#ifndef MQTT_MONITOR_BASE_PLUGIN_H
#define MQTT_MONITOR_BASE_PLUGIN_H

#include <Arduino.h>

class BasePlugin {
public:
    virtual ~BasePlugin() = default;
    virtual const char* name() const = 0;

    // Write attribute JSON fragments to buf. Return bytes written.
    // Format: "\"attr_name\":{\"value\":X,\"unit\":\"Y\"},\"name2\":{...}"
    virtual int collect(char* buf, int maxLen) = 0;

    // Network info — write to buf, return bytes written.
    // Format: "\"ip\":\"1.2.3.4\",\"mac\":\"aa:bb:cc\",..."
    virtual bool hasNetworkInfo() const { return false; }
    virtual int getNetworkInfo(char* buf, int maxLen) { return 0; }

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

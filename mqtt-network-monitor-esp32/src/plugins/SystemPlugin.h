#ifndef MQTT_MONITOR_SYSTEM_PLUGIN_H
#define MQTT_MONITOR_SYSTEM_PLUGIN_H

#include "BasePlugin.h"
#include <esp_system.h>

class SystemPlugin : public BasePlugin {
public:
    SystemPlugin(unsigned long intervalSec = 30) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "system"; }

    int collect(char* buf, int maxLen) override {
        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"free_heap\":{\"value\":%u,\"unit\":\"bytes\"}",
            ESP.getFreeHeap());
        n += snprintf(buf + n, maxLen - n,
            ",\"uptime\":{\"value\":%lu,\"unit\":\"seconds\"}",
            (unsigned long)(millis() / 1000));
        #ifdef ESP32
        n += snprintf(buf + n, maxLen - n,
            ",\"chip_temp\":{\"value\":%.1f,\"unit\":\"\\u00b0C\"}",
            temperatureRead());
        #endif
        n += snprintf(buf + n, maxLen - n,
            ",\"min_free_heap\":{\"value\":%u,\"unit\":\"bytes\"}",
            ESP.getMinFreeHeap());
        return n;
    }
};

#endif

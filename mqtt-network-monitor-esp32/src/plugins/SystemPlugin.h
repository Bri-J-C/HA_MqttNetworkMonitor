#ifndef MQTT_MONITOR_SYSTEM_PLUGIN_H
#define MQTT_MONITOR_SYSTEM_PLUGIN_H

#include "BasePlugin.h"
#include <esp_system.h>

#ifdef ESP32
#include <esp_timer.h>
extern "C" {
  uint8_t temprature_sens_read();
}
#endif

class SystemPlugin : public BasePlugin {
public:
    SystemPlugin(unsigned long intervalSec = 30) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "system"; }

    void collect(JsonObject& attributes) override {
        // Free heap
        JsonObject heap = attributes["free_heap"].to<JsonObject>();
        heap["value"] = ESP.getFreeHeap();
        heap["unit"] = "bytes";

        // Uptime
        JsonObject uptime = attributes["uptime"].to<JsonObject>();
        uptime["value"] = (unsigned long)(millis() / 1000);
        uptime["unit"] = "seconds";

        // Chip temperature (ESP32 internal, approximate)
        #ifdef ESP32
        JsonObject temp = attributes["chip_temp"].to<JsonObject>();
        // Internal temp sensor (rough estimate)
        float t = temperatureRead();
        temp["value"] = t;
        temp["unit"] = "°C";
        #endif

        // Min free heap (since boot)
        JsonObject minHeap = attributes["min_free_heap"].to<JsonObject>();
        minHeap["value"] = ESP.getMinFreeHeap();
        minHeap["unit"] = "bytes";
    }
};

#endif

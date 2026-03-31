#ifndef MQTT_MONITOR_ESP32_HARDWARE_PLUGIN_H
#define MQTT_MONITOR_ESP32_HARDWARE_PLUGIN_H

#include "BasePlugin.h"
#include <esp_system.h>
#include <esp_chip_info.h>
#include <esp_flash.h>

// Static hardware info that never changes after boot.
// Uses sendOnce — publishes once on MQTT connect, then stays quiet.
class ESP32HardwarePlugin : public BasePlugin {
public:
    ESP32HardwarePlugin() {
        _sendOnce = true;
    }

    const char* name() const override { return "esp32_hardware"; }

    int collect(char* buf, int maxLen) override {
        esp_chip_info_t chip;
        esp_chip_info(&chip);

        uint32_t flash_size = 0;
        esp_flash_get_size(NULL, &flash_size);

        char sdk[24];
        strncpy(sdk, esp_get_idf_version(), sizeof(sdk) - 1);
        sdk[sizeof(sdk) - 1] = '\0';

        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"cpu_freq\":{\"value\":%u,\"unit\":\"MHz\"}", ESP.getCpuFreqMHz());
        n += snprintf(buf + n, maxLen - n,
            ",\"cpu_cores\":{\"value\":%d,\"unit\":\"\"}", chip.cores);
        n += snprintf(buf + n, maxLen - n,
            ",\"flash_size\":{\"value\":%u,\"unit\":\"bytes\"}", flash_size);
        n += snprintf(buf + n, maxLen - n,
            ",\"sketch_size\":{\"value\":%u,\"unit\":\"bytes\"}", ESP.getSketchSize());
        n += snprintf(buf + n, maxLen - n,
            ",\"sketch_free\":{\"value\":%u,\"unit\":\"bytes\"}", ESP.getFreeSketchSpace());
        n += snprintf(buf + n, maxLen - n,
            ",\"chip_revision\":{\"value\":%d,\"unit\":\"\"}", chip.revision);
        n += snprintf(buf + n, maxLen - n,
            ",\"sdk_version\":{\"value\":\"%s\",\"unit\":\"\"}", sdk);
        return n;
    }
};

#endif

#ifndef MQTT_MONITOR_ESP32_PLUGIN_H
#define MQTT_MONITOR_ESP32_PLUGIN_H

#include "BasePlugin.h"
#include <esp_system.h>
#include <esp_chip_info.h>
#include <esp_flash.h>
#include <esp_wifi.h>
#include <esp_timer.h>

class ESP32Plugin : public BasePlugin {
public:
    ESP32Plugin(unsigned long intervalSec = 60) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "esp32"; }

    int collect(char* buf, int maxLen) override {
        esp_chip_info_t chip;
        esp_chip_info(&chip);

        uint32_t flash_size = 0;
        esp_flash_get_size(NULL, &flash_size);

        // CPU frequency in MHz
        uint32_t cpu_freq = ESP.getCpuFreqMHz();

        // Sketch and filesystem sizes
        uint32_t sketch_size = ESP.getSketchSize();
        uint32_t sketch_free = ESP.getFreeSketchSpace();

        // Reset reason
        esp_reset_reason_t reason = esp_reset_reason();
        const char* reason_str;
        switch (reason) {
            case ESP_RST_POWERON:  reason_str = "power_on"; break;
            case ESP_RST_SW:       reason_str = "software"; break;
            case ESP_RST_PANIC:    reason_str = "panic"; break;
            case ESP_RST_INT_WDT:  reason_str = "int_wdt"; break;
            case ESP_RST_TASK_WDT: reason_str = "task_wdt"; break;
            case ESP_RST_WDT:      reason_str = "wdt"; break;
            case ESP_RST_BROWNOUT: reason_str = "brownout"; break;
            default:               reason_str = "unknown"; break;
        }

        // WiFi TX power
        int8_t tx_power;
        esp_wifi_get_max_tx_power(&tx_power);

        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"cpu_freq\":{\"value\":%u,\"unit\":\"MHz\"}", cpu_freq);
        n += snprintf(buf + n, maxLen - n,
            ",\"cpu_cores\":{\"value\":%d,\"unit\":\"\"}", chip.cores);
        n += snprintf(buf + n, maxLen - n,
            ",\"flash_size\":{\"value\":%u,\"unit\":\"bytes\"}", flash_size);
        n += snprintf(buf + n, maxLen - n,
            ",\"sketch_size\":{\"value\":%u,\"unit\":\"bytes\"}", sketch_size);
        n += snprintf(buf + n, maxLen - n,
            ",\"sketch_free\":{\"value\":%u,\"unit\":\"bytes\"}", sketch_free);
        n += snprintf(buf + n, maxLen - n,
            ",\"wifi_tx_power\":{\"value\":%.2f,\"unit\":\"dBm\"}", tx_power * 0.25f);
        n += snprintf(buf + n, maxLen - n,
            ",\"reset_reason\":{\"value\":\"%s\",\"unit\":\"\"}", reason_str);
        n += snprintf(buf + n, maxLen - n,
            ",\"chip_revision\":{\"value\":%d,\"unit\":\"\"}", chip.revision);
        n += snprintf(buf + n, maxLen - n,
            ",\"sdk_version\":{\"value\":\"%s\",\"unit\":\"\"}", esp_get_idf_version());
        return n;
    }
};

#endif

#ifndef MQTT_MONITOR_ESP32_PLUGIN_H
#define MQTT_MONITOR_ESP32_PLUGIN_H

#include "BasePlugin.h"
#include <esp_system.h>
#include <esp_wifi.h>

// Dynamic ESP32 metrics that can change at runtime.
class ESP32Plugin : public BasePlugin {
public:
    ESP32Plugin(unsigned long intervalSec = 60) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "esp32"; }

    int collect(char* buf, int maxLen) override {
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

        int8_t tx_power;
        esp_wifi_get_max_tx_power(&tx_power);

        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"wifi_tx_power\":{\"value\":%.2f,\"unit\":\"dBm\"}", tx_power * 0.25f);
        if (n >= maxLen) n = maxLen - 1;
        n += snprintf(buf + n, maxLen - n,
            ",\"reset_reason\":{\"value\":\"%s\",\"unit\":\"\"}", reason_str);
        if (n >= maxLen) n = maxLen - 1;
        return n;
    }
};

#endif

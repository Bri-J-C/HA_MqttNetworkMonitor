#ifndef MQTT_MONITOR_GPIO_PLUGIN_H
#define MQTT_MONITOR_GPIO_PLUGIN_H

#include "BasePlugin.h"
#include <vector>

struct PinConfig {
    uint8_t pin;
    bool analog;
    const char* label;
};

class GPIOPlugin : public BasePlugin {
public:
    GPIOPlugin(unsigned long intervalSec = 5) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "gpio"; }

    void addDigitalPin(uint8_t pin, const char* label = nullptr) {
        PinConfig cfg = { pin, false, label };
        _pins.push_back(cfg);
        pinMode(pin, INPUT);
    }

    void addAnalogPin(uint8_t pin, const char* label = nullptr) {
        PinConfig cfg = { pin, true, label };
        _pins.push_back(cfg);
    }

    void collect(JsonObject& attributes) override {
        for (const auto& cfg : _pins) {
            char key[32];
            if (cfg.label) {
                snprintf(key, sizeof(key), "%s", cfg.label);
            } else {
                snprintf(key, sizeof(key), "pin_%d", cfg.pin);
            }

            JsonObject attr = attributes[key].to<JsonObject>();
            if (cfg.analog) {
                attr["value"] = analogRead(cfg.pin);
                attr["unit"] = "raw";
            } else {
                attr["value"] = digitalRead(cfg.pin);
                attr["unit"] = "";
            }
        }
    }

private:
    std::vector<PinConfig> _pins;
};

#endif

#ifndef MQTT_MONITOR_GPIO_PLUGIN_H
#define MQTT_MONITOR_GPIO_PLUGIN_H

#include "BasePlugin.h"

#ifndef MAX_GPIO_PINS
#define MAX_GPIO_PINS 16
#endif

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
        if (_pinCount >= MAX_GPIO_PINS) return;
        PinConfig cfg = { pin, false, label };
        _pins[_pinCount++] = cfg;
        pinMode(pin, INPUT);
    }

    void addAnalogPin(uint8_t pin, const char* label = nullptr) {
        if (_pinCount >= MAX_GPIO_PINS) return;
        PinConfig cfg = { pin, true, label };
        _pins[_pinCount++] = cfg;
    }

    int collect(char* buf, int maxLen) override {
        int n = 0;
        for (int i = 0; i < _pinCount; i++) {
            if (i > 0 && n < maxLen - 1) buf[n++] = ',';
            char key[32];
            if (_pins[i].label) {
                snprintf(key, sizeof(key), "%s", _pins[i].label);
            } else {
                snprintf(key, sizeof(key), "pin_%d", _pins[i].pin);
            }
            if (_pins[i].analog) {
                n += snprintf(buf + n, maxLen - n,
                    "\"%s\":{\"value\":%d,\"unit\":\"raw\"}",
                    key, analogRead(_pins[i].pin));
            } else {
                n += snprintf(buf + n, maxLen - n,
                    "\"%s\":{\"value\":%d,\"unit\":\"\"}",
                    key, digitalRead(_pins[i].pin));
            }
        }
        return n;
    }

private:
    PinConfig _pins[MAX_GPIO_PINS];
    int _pinCount = 0;
};

#endif

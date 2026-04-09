#ifndef MQTT_MONITOR_WIFI_INFO_PLUGIN_H
#define MQTT_MONITOR_WIFI_INFO_PLUGIN_H

#include "BasePlugin.h"
#include <WiFi.h>

class WiFiInfoPlugin : public BasePlugin {
public:
    WiFiInfoPlugin(unsigned long intervalSec = 60) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "network_info"; }

    bool hasNetworkInfo() const override { return true; }

    int collect(char* buf, int maxLen) override {
        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"wifi_rssi\":{\"value\":%d,\"unit\":\"dBm\"}",
            WiFi.RSSI());
        if (n >= maxLen) n = maxLen - 1;
        n += snprintf(buf + n, maxLen - n,
            ",\"wifi_channel\":{\"value\":%d,\"unit\":\"\"}",
            WiFi.channel());
        if (n >= maxLen) n = maxLen - 1;
        n += snprintf(buf + n, maxLen - n,
            ",\"ip_address\":{\"value\":\"%s\",\"unit\":\"\"}",
            WiFi.localIP().toString().c_str());
        if (n >= maxLen) n = maxLen - 1;
        return n;
    }

    int getNetworkInfo(char* buf, int maxLen) override {
        return snprintf(buf, maxLen,
            "\"ip\":\"%s\",\"mac\":\"%s\",\"gateway\":\"%s\","
            "\"subnet\":\"%s\",\"interface\":\"wifi\"",
            WiFi.localIP().toString().c_str(),
            WiFi.macAddress().c_str(),
            WiFi.gatewayIP().toString().c_str(),
            WiFi.subnetMask().toString().c_str());
    }
};

#endif

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

    void collect(JsonObject& attributes) override {
        JsonObject rssi = attributes["wifi_rssi"].to<JsonObject>();
        rssi["value"] = WiFi.RSSI();
        rssi["unit"] = "dBm";

        JsonObject channel = attributes["wifi_channel"].to<JsonObject>();
        channel["value"] = WiFi.channel();
        channel["unit"] = "";

        JsonObject ip = attributes["ip_address"].to<JsonObject>();
        ip["value"] = WiFi.localIP().toString();
        ip["unit"] = "";
    }

    void getNetworkInfo(JsonObject& network) override {
        network["ip"] = WiFi.localIP().toString();
        network["mac"] = WiFi.macAddress();
        network["gateway"] = WiFi.gatewayIP().toString();
        network["subnet"] = WiFi.subnetMask().toString();
        network["interface"] = "wifi";
    }
};

#endif

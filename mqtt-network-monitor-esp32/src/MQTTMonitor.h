#ifndef MQTT_MONITOR_H
#define MQTT_MONITOR_H

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <vector>
#include "plugins/BasePlugin.h"

#define MQTT_MONITOR_MAX_PLUGINS 8
#define MQTT_MONITOR_TOPIC_PREFIX "network_monitor"
#define MQTT_MONITOR_JSON_SIZE 1024

class MQTTMonitor {
public:
    MQTTMonitor(const char* deviceId, const char* deviceName, const char* deviceType)
        : _deviceId(deviceId), _deviceName(deviceName), _deviceType(deviceType),
          _mqttClient(_wifiClient) {}

    void setBroker(const char* host, uint16_t port = 1883) {
        _brokerHost = host;
        _brokerPort = port;
    }

    void setCredentials(const char* username, const char* password) {
        _username = username;
        _password = password;
    }

    void addPlugin(BasePlugin* plugin) {
        if (_pluginCount < MQTT_MONITOR_MAX_PLUGINS) {
            _plugins[_pluginCount++] = plugin;
        }
    }

    void addTag(const char* tag) {
        if (_tagCount < 8) {
            _tags[_tagCount++] = tag;
        }
    }

    void begin() {
        _mqttClient.setServer(_brokerHost, _brokerPort);
        _mqttClient.setBufferSize(MQTT_MONITOR_JSON_SIZE);

        // Set LWT
        char statusTopic[128];
        snprintf(statusTopic, sizeof(statusTopic), "%s/%s/status",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
        _mqttClient.setCallback([this](char* topic, byte* payload, unsigned int length) {
            _handleMessage(topic, payload, length);
        });

        _connect();
    }

    void loop() {
        if (!_mqttClient.connected()) {
            _connect();
        }
        _mqttClient.loop();

        // Check each plugin
        for (int i = 0; i < _pluginCount; i++) {
            if (_plugins[i]->shouldCollect()) {
                _collectAndPublish(_plugins[i]);
            }
        }
    }

    // Allow setting allowed commands for remote execution
    void addAllowedCommand(const char* command) {
        if (_allowedCmdCount < 8) {
            _allowedCommands[_allowedCmdCount++] = command;
        }
    }

    void onCommand(void (*callback)(const char* command, JsonObject& params)) {
        _commandCallback = callback;
    }

private:
    const char* _deviceId;
    const char* _deviceName;
    const char* _deviceType;
    const char* _brokerHost = "localhost";
    uint16_t _brokerPort = 1883;
    const char* _username = nullptr;
    const char* _password = nullptr;

    WiFiClient _wifiClient;
    PubSubClient _mqttClient;

    BasePlugin* _plugins[MQTT_MONITOR_MAX_PLUGINS];
    int _pluginCount = 0;

    const char* _tags[8];
    int _tagCount = 0;

    const char* _allowedCommands[8];
    int _allowedCmdCount = 0;

    void (*_commandCallback)(const char* command, JsonObject& params) = nullptr;

    unsigned long _lastReconnect = 0;

    void _connect() {
        if (millis() - _lastReconnect < 5000) return;
        _lastReconnect = millis();

        char statusTopic[128];
        snprintf(statusTopic, sizeof(statusTopic), "%s/%s/status",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);

        char clientId[64];
        snprintf(clientId, sizeof(clientId), "mqtt-monitor-%s", _deviceId);

        if (_username) {
            _mqttClient.connect(clientId, _username, _password,
                               statusTopic, 0, true, "offline");
        } else {
            _mqttClient.connect(clientId, nullptr, nullptr,
                               statusTopic, 0, true, "offline");
        }

        if (_mqttClient.connected()) {
            Serial.printf("[MQTTMonitor] Connected to %s:%d\n", _brokerHost, _brokerPort);

            // Publish online
            _mqttClient.publish(statusTopic, "online", true);

            // Subscribe to commands
            char cmdTopic[128];
            snprintf(cmdTopic, sizeof(cmdTopic), "%s/%s/command",
                     MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
            _mqttClient.subscribe(cmdTopic);
        }
    }

    void _collectAndPublish(BasePlugin* plugin) {
        JsonDocument doc;

        doc["device_id"] = _deviceId;
        doc["device_name"] = _deviceName;
        doc["device_type"] = _deviceType;
        doc["timestamp"] = (unsigned long)(millis() / 1000); // Uptime-based

        JsonArray tags = doc["tags"].to<JsonArray>();
        for (int i = 0; i < _tagCount; i++) {
            tags.add(_tags[i]);
        }

        JsonObject attributes = doc["attributes"].to<JsonObject>();
        plugin->collect(attributes);

        if (plugin->hasNetworkInfo()) {
            JsonObject network = doc["network"].to<JsonObject>();
            plugin->getNetworkInfo(network);
        }

        char topic[128];
        snprintf(topic, sizeof(topic), "%s/%s/%s",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId, plugin->name());

        char buffer[MQTT_MONITOR_JSON_SIZE];
        serializeJson(doc, buffer, sizeof(buffer));
        _mqttClient.publish(topic, buffer);
    }

    void _handleMessage(char* topic, byte* payload, unsigned int length) {
        char msg[512];
        int copyLen = min((unsigned int)511, length);
        memcpy(msg, payload, copyLen);
        msg[copyLen] = '\0';

        JsonDocument doc;
        DeserializationError err = deserializeJson(doc, msg);
        if (err) return;

        const char* command = doc["command"];
        const char* requestId = doc["request_id"] | "";
        if (!command) return;

        // Check whitelist
        bool allowed = false;
        for (int i = 0; i < _allowedCmdCount; i++) {
            if (strcmp(command, _allowedCommands[i]) == 0) {
                allowed = true;
                break;
            }
        }

        char responseTopic[128];
        snprintf(responseTopic, sizeof(responseTopic), "%s/%s/command/response",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);

        JsonDocument respDoc;
        respDoc["request_id"] = requestId;

        if (!allowed) {
            respDoc["status"] = "rejected";
            respDoc["output"] = "Command not allowed";
        } else {
            if (_commandCallback) {
                JsonObject params = doc["params"].as<JsonObject>();
                _commandCallback(command, params);
                respDoc["status"] = "success";
                respDoc["output"] = "Command executed";
            } else {
                // Handle built-in commands
                if (strcmp(command, "reboot") == 0) {
                    respDoc["status"] = "success";
                    respDoc["output"] = "Rebooting...";
                    char respBuf[256];
                    serializeJson(respDoc, respBuf, sizeof(respBuf));
                    _mqttClient.publish(responseTopic, respBuf);
                    delay(100);
                    ESP.restart();
                    return;
                }
                respDoc["status"] = "error";
                respDoc["output"] = "No handler for command";
            }
        }

        char respBuf[256];
        serializeJson(respDoc, respBuf, sizeof(respBuf));
        _mqttClient.publish(responseTopic, respBuf);
    }
};

#endif

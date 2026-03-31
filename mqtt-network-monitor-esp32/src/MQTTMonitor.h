#ifndef MQTT_MONITOR_H
#define MQTT_MONITOR_H

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "plugins/BasePlugin.h"

// Compile-time size configuration.
// Override in your sketch BEFORE #include <MQTTMonitor.h>:
//   #define MQTT_MONITOR_BUF_SIZE 256   // for very constrained devices
#ifndef MQTT_MONITOR_BUF_SIZE
#define MQTT_MONITOR_BUF_SIZE 512
#endif

#ifndef MQTT_MONITOR_TOPIC_SIZE
#define MQTT_MONITOR_TOPIC_SIZE 128
#endif

#ifndef MQTT_MONITOR_MAX_PLUGINS
#define MQTT_MONITOR_MAX_PLUGINS 8
#endif

#define MQTT_MONITOR_TOPIC_PREFIX "network_monitor"

class MQTTMonitor {
public:
    // ---- Standalone mode: monitor manages its own MQTT connection ----
    MQTTMonitor(const char* deviceId, const char* deviceName, const char* deviceType)
        : _deviceId(deviceId), _deviceName(deviceName), _deviceType(deviceType),
          _ownClient(_wifiClient), _mqttClient(&_ownClient), _shared(false) {}

    // ---- Shared mode: piggyback on an existing PubSubClient ----
    // No broker config, no WiFi management, no command subscription.
    // Just publishes plugin data on the caller's connection.
    MQTTMonitor(const char* deviceId, const char* deviceName, const char* deviceType,
                PubSubClient& existingClient)
        : _deviceId(deviceId), _deviceName(deviceName), _deviceType(deviceType),
          _ownClient(_wifiClient), _mqttClient(&existingClient), _shared(true) {}

    void setBroker(const char* host, uint16_t port = 1883) {
        _brokerHost = host;
        _brokerPort = port;
    }

    void setCredentials(const char* username, const char* password) {
        _username = username;
        _password = password;
    }

    void addPlugin(BasePlugin* plugin) {
        if (_pluginCount >= MQTT_MONITOR_MAX_PLUGINS) return;
        for (int i = 0; i < _pluginCount; i++) {
            if (strcmp(_plugins[i]->name(), plugin->name()) == 0) {
                Serial.printf("[MQTTMonitor] WARNING: duplicate plugin name '%s' — skipping\n", plugin->name());
                return;
            }
        }
        _plugins[_pluginCount++] = plugin;
    }

    void addTag(const char* tag) {
        if (_tagCount < 8) {
            _tags[_tagCount++] = tag;
        }
    }

    void begin() {
        if (strlen(_deviceId) > 64) {
            Serial.println("[MQTTMonitor] ERROR: device_id too long (max 64 chars)");
            return;
        }
        if (_shared) {
            // Shared mode: nothing to set up — the host app owns the connection.
            // Publish initial online status if already connected.
            if (_mqttClient->connected()) {
                snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/status",
                         MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
                _mqttClient->publish(_topicBuf, "online", true);
            }
            Serial.printf("[MQTTMonitor] Shared mode (id=%s)\n", _deviceId);
            return;
        }
        _mqttClient->setServer(_brokerHost, _brokerPort);
        _mqttClient->setBufferSize(MQTT_MONITOR_BUF_SIZE);
        _mqttClient->setCallback([this](char* topic, byte* payload, unsigned int length) {
            _handleMessage(topic, payload, length);
        });
        _connect();
    }

    void loop() {
        if (_shared) {
            // Shared mode: just publish plugin data if client is connected.
            // The host app handles WiFi, MQTT connection, and client.loop().
            if (!_mqttClient->connected()) return;
            for (int i = 0; i < _pluginCount; i++) {
                if (_plugins[i]->shouldCollect()) {
                    _collectAndPublish(_plugins[i]);
                }
            }
            return;
        }

        // Standalone mode: manage our own connection.
        if (WiFi.status() != WL_CONNECTED) {
            Serial.println("[MQTTMonitor] WiFi disconnected, reconnecting...");
            WiFi.reconnect();
            delay(5000);
            return;
        }
        if (!_mqttClient->connected()) {
            _connect();
        }
        _mqttClient->loop();
        for (int i = 0; i < _pluginCount; i++) {
            if (_plugins[i]->shouldCollect()) {
                _collectAndPublish(_plugins[i]);
            }
        }
    }

    void addAllowedCommand(const char* command) {
        if (_allowedCmdCount < 8) {
            _allowedCommands[_allowedCmdCount++] = command;
        }
    }

    // Callback receives command string only (params parsing left to user if needed).
    void onCommand(void (*callback)(const char* command)) {
        _commandCallback = callback;
    }

private:
    const char* _deviceId;
    const char* _deviceName;
    const char* _deviceType;
    const char* _brokerHost = "localhost";
    uint16_t    _brokerPort = 1883;
    const char* _username = nullptr;
    const char* _password = nullptr;

    WiFiClient   _wifiClient;
    PubSubClient _ownClient;      // Used only in standalone mode
    PubSubClient* _mqttClient;    // Points to _ownClient or external client
    bool _shared;                 // true = using external client

    BasePlugin* _plugins[MQTT_MONITOR_MAX_PLUGINS];
    int _pluginCount = 0;

    const char* _tags[8];
    int _tagCount = 0;

    const char* _allowedCommands[8];
    int _allowedCmdCount = 0;

    void (*_commandCallback)(const char* command) = nullptr;

    unsigned long _lastReconnect = 0;
    int _reconnectFailures = 0;

    int _msgCount = 0;
    bool _forceMetadata = false;

    // Shared topic buffer — reused across all methods to avoid stack waste.
    char _topicBuf[MQTT_MONITOR_TOPIC_SIZE];

    // ---------------------------------------------------------------------------
    // Minimal JSON parser for incoming command messages.
    // Extracts "command" and "request_id" string values without ArduinoJson.
    // ---------------------------------------------------------------------------
    bool _parseCommand(const char* json, char* command, int cmdLen,
                       char* requestId, int ridLen) {
        const char* p = strstr(json, "\"command\":\"");
        if (!p) return false;
        p += 11; // skip past "command":"
        int i = 0;
        while (*p && *p != '"' && i < cmdLen - 1) command[i++] = *p++;
        command[i] = '\0';

        p = strstr(json, "\"request_id\":\"");
        if (p) {
            p += 14; // skip past "request_id":"
            i = 0;
            while (*p && *p != '"' && i < ridLen - 1) requestId[i++] = *p++;
            requestId[i] = '\0';
        } else {
            requestId[0] = '\0';
        }
        return true;
    }

    void _connect() {
        unsigned long backoff = 5000UL + (unsigned long)min(_reconnectFailures, 10) * 3000UL;
        if (millis() - _lastReconnect < backoff) return;
        _lastReconnect = millis();

        // Build status topic into shared buffer.
        snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/status",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);

        char clientId[80];
        snprintf(clientId, sizeof(clientId), "mqtt-monitor-%s", _deviceId);

        if (_username) {
            _mqttClient->connect(clientId, _username, _password,
                                _topicBuf, 0, true, "offline");
        } else {
            _mqttClient->connect(clientId, nullptr, nullptr,
                                _topicBuf, 0, true, "offline");
        }

        if (_mqttClient->connected()) {
            Serial.printf("[MQTTMonitor] Connected to %s:%d\n", _brokerHost, _brokerPort);
            _reconnectFailures = 0;

            _mqttClient->publish(_topicBuf, "online", true);

            snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/command",
                     MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
            _mqttClient->subscribe(_topicBuf);
        } else {
            _reconnectFailures++;
            Serial.printf("[MQTTMonitor] Connect failed (attempt %d), backoff %lums\n",
                          _reconnectFailures, backoff);
        }
    }

    void _collectAndPublish(BasePlugin* plugin) {
        char attrsBuf[384];
        plugin->collect(attrsBuf, sizeof(attrsBuf));

        char networkBuf[192];
        int networkLen = 0;
        if (plugin->hasNetworkInfo()) {
            networkLen = plugin->getNetworkInfo(networkBuf, sizeof(networkBuf));
        }

        // Build tags fragment: "tag1","tag2"
        char tagsBuf[128];
        int tn = 0;
        for (int i = 0; i < _tagCount; i++) {
            if (i > 0 && tn < (int)sizeof(tagsBuf) - 1) tagsBuf[tn++] = ',';
            tn += snprintf(tagsBuf + tn, sizeof(tagsBuf) - tn, "\"%s\"", _tags[i]);
        }
        tagsBuf[tn] = '\0';

        // Build full payload into shared MQTT buffer.
        char payload[MQTT_MONITOR_BUF_SIZE];
        int pn = snprintf(payload, sizeof(payload),
            "{\"device_id\":\"%s\",\"device_name\":\"%s\",\"device_type\":\"%s\","
            "\"timestamp\":%lu,\"tags\":[%s],\"attributes\":{%s}",
            _deviceId, _deviceName, _deviceType,
            (unsigned long)(millis() / 1000), tagsBuf, attrsBuf);

        // Include metadata every 10th message or when forced
        _msgCount++;
        if (_msgCount % 10 == 1 || _forceMetadata) {
            // allowed_commands
            pn += snprintf(payload + pn, sizeof(payload) - pn, ",\"allowed_commands\":[");
            for (int i = 0; i < _allowedCmdCount; i++) {
                if (i > 0) pn += snprintf(payload + pn, sizeof(payload) - pn, ",");
                pn += snprintf(payload + pn, sizeof(payload) - pn, "\"%s\"", _allowedCommands[i]);
            }
            pn += snprintf(payload + pn, sizeof(payload) - pn, "]");

            // active_plugins
            pn += snprintf(payload + pn, sizeof(payload) - pn, ",\"active_plugins\":[");
            for (int i = 0; i < _pluginCount; i++) {
                if (i > 0) pn += snprintf(payload + pn, sizeof(payload) - pn, ",");
                pn += snprintf(payload + pn, sizeof(payload) - pn, "\"%s\"", _plugins[i]->name());
            }
            pn += snprintf(payload + pn, sizeof(payload) - pn, "]");

            // collection_interval (first plugin's interval in seconds)
            if (_pluginCount > 0) {
                pn += snprintf(payload + pn, sizeof(payload) - pn,
                    ",\"collection_interval\":%lu",
                    _plugins[0]->getInterval() / 1000);
            }

            _forceMetadata = false;
        }

        if (networkLen > 0 && pn < (int)sizeof(payload) - 2) {
            pn += snprintf(payload + pn, sizeof(payload) - pn,
                           ",\"network\":{%s}", networkBuf);
        }

        if (pn < (int)sizeof(payload) - 1) {
            payload[pn++] = '}';
        }
        payload[pn] = '\0';

        snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/%s",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId, plugin->name());
        _mqttClient->publish(_topicBuf, payload);
    }

    void _handleMessage(char* topic, byte* payload, unsigned int length) {
        char msg[512];
        unsigned int copyLen = length < sizeof(msg) - 1 ? length : sizeof(msg) - 1;
        memcpy(msg, payload, copyLen);
        msg[copyLen] = '\0';

        char command[64];
        char requestId[64];
        if (!_parseCommand(msg, command, sizeof(command), requestId, sizeof(requestId))) return;

        // Check whitelist.
        bool allowed = false;
        for (int i = 0; i < _allowedCmdCount; i++) {
            if (strcmp(command, _allowedCommands[i]) == 0) {
                allowed = true;
                break;
            }
        }

        snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/command/response",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);

        char respBuf[192];
        if (!allowed) {
            snprintf(respBuf, sizeof(respBuf),
                "{\"request_id\":\"%s\",\"status\":\"rejected\","
                "\"output\":\"Command not allowed\"}",
                requestId);
            _mqttClient->publish(_topicBuf, respBuf);
            return;
        }

        if (_commandCallback) {
            _commandCallback(command);
            snprintf(respBuf, sizeof(respBuf),
                "{\"request_id\":\"%s\",\"status\":\"success\","
                "\"output\":\"Command executed\"}",
                requestId);
            _mqttClient->publish(_topicBuf, respBuf);
            return;
        }

        // Built-in commands.
        if (strcmp(command, "reboot") == 0) {
            snprintf(respBuf, sizeof(respBuf),
                "{\"request_id\":\"%s\",\"status\":\"success\","
                "\"output\":\"Rebooting...\"}",
                requestId);
            _mqttClient->publish(_topicBuf, respBuf);
            delay(100);
            ESP.restart();
            return;
        }

        snprintf(respBuf, sizeof(respBuf),
            "{\"request_id\":\"%s\",\"status\":\"error\","
            "\"output\":\"No handler for command\"}",
            requestId);
        _mqttClient->publish(_topicBuf, respBuf);
    }
};

#endif

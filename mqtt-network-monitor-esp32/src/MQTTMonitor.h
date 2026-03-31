#ifndef MQTT_MONITOR_H
#define MQTT_MONITOR_H

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "plugins/BasePlugin.h"
#include "JsonParser.h"

#ifdef ESP32
#include <Preferences.h>
#endif

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
                snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/command",
                         MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
                _mqttClient->subscribe(_topicBuf);
                snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/config",
                         MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
                _mqttClient->subscribe(_topicBuf);
            }
            Serial.printf("[MQTTMonitor] Shared mode (id=%s)\n", _deviceId);
            _loadPersistedConfig();
            return;
        }
        _mqttClient->setServer(_brokerHost, _brokerPort);
        _mqttClient->setBufferSize(MQTT_MONITOR_BUF_SIZE);
        _mqttClient->setCallback([this](char* topic, byte* payload, unsigned int length) {
            _handleMessage(topic, payload, length);
        });
        _loadPersistedConfig();
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
        if (_localCmdCount < 8) {
            _localCommands[_localCmdCount++] = command;
        }
    }

    // Callback receives command string only (params parsing left to user if needed).
    void onCommand(void (*callback)(const char* command)) {
        _commandCallback = callback;
    }

    void enablePersistence() {
        #ifdef ESP32
        _persistenceEnabled = true;
        #endif
    }

    // For shared mode: host app calls this from its MQTT callback to forward
    // messages on monitor topics. Handles both commands and config updates.
    // Returns true if the message was handled (topic matched a monitor topic).
    bool handleMessage(const char* topic, const byte* payload, unsigned int length) {
        char prefix[MQTT_MONITOR_TOPIC_SIZE];
        snprintf(prefix, sizeof(prefix), "%s/%s/", MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
        if (strncmp(topic, prefix, strlen(prefix)) != 0) return false;

        const char* subtopic = topic + strlen(prefix);

        if (strcmp(subtopic, "command") == 0) {
            _handleMessage((char*)topic, (byte*)payload, length);
            return true;
        }
        if (strcmp(subtopic, "config") == 0) {
            _handleConfig((byte*)payload, length);
            return true;
        }
        return false;
    }

    void getCommandTopic(char* buf, int bufLen) const {
        snprintf(buf, bufLen, "%s/%s/command", MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
    }

    void getConfigTopic(char* buf, int bufLen) const {
        snprintf(buf, bufLen, "%s/%s/config", MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
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

    const char* _localCommands[8];
    int _localCmdCount = 0;

    #ifdef ESP32
    bool _persistenceEnabled = false;
    #endif

    void _loadPersistedConfig() {
        #ifdef ESP32
        if (!_persistenceEnabled) return;
        Preferences prefs;
        if (!prefs.begin("mqtt_mon", true)) return;

        unsigned long interval = prefs.getULong("interval", 0);
        if (interval > 0) {
            for (int i = 0; i < _pluginCount; i++) {
                _plugins[i]->setInterval(interval);
            }
            Serial.printf("[MQTTMonitor] Loaded persisted interval: %lums\n", interval);
        }
        prefs.end();
        #endif
    }

    void _savePersistedConfig() {
        #ifdef ESP32
        if (!_persistenceEnabled) return;
        Preferences prefs;
        if (!prefs.begin("mqtt_mon", false)) return;

        if (_pluginCount > 0) {
            prefs.putULong("interval", _plugins[0]->getInterval());
        }
        prefs.end();
        Serial.println("[MQTTMonitor] Config persisted to NVS");
        #endif
    }

    // Shared topic buffer — reused across all methods to avoid stack waste.
    char _topicBuf[MQTT_MONITOR_TOPIC_SIZE];

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
            snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/config",
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

    void _handleConfig(byte* payload, unsigned int length) {
        char msg[512];
        unsigned int copyLen = length < sizeof(msg) - 1 ? length : sizeof(msg) - 1;
        memcpy(msg, payload, copyLen);
        msg[copyLen] = '\0';

        if (!JsonParser::hasStringValue(msg, "type", "config_update")) {
            _publishConfigResponse("rejected", "Unknown config type");
            return;
        }

        // Apply interval change
        int newInterval;
        if (JsonParser::getInt(msg, "interval", &newInterval)) {
            if (newInterval > 0) {
                for (int i = 0; i < _pluginCount; i++) {
                    _plugins[i]->setInterval((unsigned long)newInterval * 1000);
                }
                Serial.printf("[MQTTMonitor] Config: interval set to %ds\n", newInterval);
            }
        }

        // Apply command changes
        char cmdObj[256];
        if (JsonParser::getObjectStr(msg, "commands", cmdObj, sizeof(cmdObj))) {
            // Remove non-local commands not in the new push
            for (int i = _allowedCmdCount - 1; i >= 0; i--) {
                bool isLocal = false;
                for (int j = 0; j < _localCmdCount; j++) {
                    if (strcmp(_allowedCommands[i], _localCommands[j]) == 0) {
                        isLocal = true;
                        break;
                    }
                }
                if (!isLocal) {
                    char searchKey[80];
                    snprintf(searchKey, sizeof(searchKey), "\"%s\"", _allowedCommands[i]);
                    if (!strstr(cmdObj, searchKey)) {
                        for (int k = i; k < _allowedCmdCount - 1; k++) {
                            _allowedCommands[k] = _allowedCommands[k + 1];
                        }
                        _allowedCmdCount--;
                    }
                }
            }
        }

        _forceMetadata = true;
        _publishConfigResponse("applied", nullptr);
        _savePersistedConfig();
        Serial.println("[MQTTMonitor] Config update applied");
    }

    void _publishConfigResponse(const char* status, const char* reason) {
        char respBuf[256];
        if (reason) {
            snprintf(respBuf, sizeof(respBuf),
                "{\"status\":\"%s\",\"reason\":\"%s\"}", status, reason);
        } else {
            snprintf(respBuf, sizeof(respBuf),
                "{\"status\":\"%s\",\"active_config\":{\"interval\":%lu,\"plugins\":%d,\"commands\":%d}}",
                status,
                _pluginCount > 0 ? _plugins[0]->getInterval() / 1000 : 0UL,
                _pluginCount,
                _allowedCmdCount);
        }

        snprintf(_topicBuf, sizeof(_topicBuf), "%s/%s/config/response",
                 MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
        _mqttClient->publish(_topicBuf, respBuf);
    }

    void _handleMessage(char* topic, byte* payload, unsigned int length) {
        // Route config messages
        char prefix[MQTT_MONITOR_TOPIC_SIZE];
        snprintf(prefix, sizeof(prefix), "%s/%s/", MQTT_MONITOR_TOPIC_PREFIX, _deviceId);
        if (strncmp(topic, prefix, strlen(prefix)) == 0) {
            const char* subtopic = topic + strlen(prefix);
            if (strcmp(subtopic, "config") == 0) {
                _handleConfig(payload, length);
                return;
            }
        }

        char msg[512];
        unsigned int copyLen = length < sizeof(msg) - 1 ? length : sizeof(msg) - 1;
        memcpy(msg, payload, copyLen);
        msg[copyLen] = '\0';

        char command[64];
        char requestId[64];
        if (!JsonParser::getString(msg, "command", command, sizeof(command))) return;
        if (!JsonParser::getString(msg, "request_id", requestId, sizeof(requestId))) {
            requestId[0] = '\0';
        }

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

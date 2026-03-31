/**
 * MQTT Network Monitor — Shared Client Example
 *
 * Shows how to add network monitoring to an existing ESP32 project
 * that already manages its own WiFi connection and PubSubClient.
 *
 * In shared mode, MQTTMonitor piggybacks on your existing client:
 *   - No separate broker connection
 *   - No WiFi management
 *   - Call monitor.handleMessage() from your MQTT callback to forward
 *     messages on monitor topics (commands, config updates)
 *   - Subscribe to monitor command/config topics alongside your own
 *   - Call monitor.stop() before ESP.restart() for clean status reporting
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <MQTTMonitor.h>
#include <plugins/SystemPlugin.h>
#include <plugins/WiFiInfoPlugin.h>
#include <plugins/CustomSensorPlugin.h>

// --- Your existing WiFi credentials ---
const char* WIFI_SSID = "your-wifi-ssid";
const char* WIFI_PASS = "your-wifi-password";

// --- Your existing MQTT broker ---
const char* MQTT_HOST = "192.168.1.10";
const int   MQTT_PORT = 1883;
const char* MQTT_USER = nullptr;
const char* MQTT_PASS = nullptr;

// --- Your existing MQTT client ---
WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);

// --- Monitor: shared mode — pass your existing client ---
MQTTMonitor    monitor("esp-mydevice", "My Device", "esp32", mqttClient);
SystemPlugin   sysPlugin(30);    // Every 30 seconds
WiFiInfoPlugin wifiPlugin(60);   // Every 60 seconds
CustomSensorPlugin sensors(10);  // Every 10 seconds

// --- Example application state ---
static float appTemperature = 22.5f;
static const char* appMode   = "idle";

// Subscribe to all topics this application needs (called on connect/reconnect)
void subscribeAll() {
    // Your application topics
    mqttClient.subscribe("myapp/control");

    // Monitor command and config topics
    char cmdTopic[128];
    char cfgTopic[128];
    monitor.getCommandTopic(cmdTopic, sizeof(cmdTopic));
    monitor.getConfigTopic(cfgTopic, sizeof(cfgTopic));
    mqttClient.subscribe(cmdTopic);
    mqttClient.subscribe(cfgTopic);
}

// Your existing MQTT callback — forward monitor topics via handleMessage()
void mqttCallback(char* topic, byte* payload, unsigned int length) {
    // Let the monitor handle its own topics first
    if (monitor.handleMessage(topic, payload, length)) {
        return;
    }

    // Handle your application topics
    if (strcmp(topic, "myapp/control") == 0) {
        // Application-specific handling here
        Serial.printf("[App] Received on %s\n", topic);
    }
}

void connectMQTT() {
    while (!mqttClient.connected()) {
        Serial.print("[MQTT] Connecting...");
        bool ok = MQTT_USER
            ? mqttClient.connect("mydevice-client", MQTT_USER, MQTT_PASS)
            : mqttClient.connect("mydevice-client");
        if (ok) {
            Serial.println(" connected");
            subscribeAll();
            // Let monitor know it can publish initial online status
            monitor.begin();
        } else {
            Serial.printf(" failed (rc=%d), retry in 5s\n", mqttClient.state());
            delay(5000);
        }
    }
}

void setup() {
    Serial.begin(115200);
    Serial.println("\n[App] Starting...");

    // Your existing WiFi setup
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    Serial.print("[WiFi] Connecting");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.printf("\n[WiFi] Connected: %s\n", WiFi.localIP().toString().c_str());

    // Your existing MQTT setup
    mqttClient.setServer(MQTT_HOST, MQTT_PORT);
    mqttClient.setCallback(mqttCallback);

    // Register custom application sensors with the monitor
    sensors.add("temperature", "C", []() -> float { return appTemperature; });
    sensors.addString("mode", "", []() -> const char* { return appMode; });

    // Configure monitor plugins (no broker/WiFi config needed in shared mode)
    monitor.addPlugin(&sysPlugin);
    monitor.addPlugin(&wifiPlugin);
    monitor.addPlugin(&sensors);
    monitor.addAllowedCommand("reboot");

    // Connect and call monitor.begin() inside connectMQTT()
    connectMQTT();
}

void loop() {
    // Your existing reconnect logic
    if (!mqttClient.connected()) {
        connectMQTT();
    }

    // Your existing client loop — monitor relies on this
    mqttClient.loop();

    // Monitor publishes plugin data on the shared connection
    monitor.loop();

    // Your existing application logic here
}

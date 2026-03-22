/**
 * MQTT Network Monitor — Basic ESP32 Example
 *
 * Monitors system stats, WiFi info, and GPIO pins.
 * Publishes to MQTT broker for the Network Monitor add-on.
 *
 * Memory config (optional — set BEFORE #include <MQTTMonitor.h>):
 *   #define MQTT_MONITOR_BUF_SIZE 256   // cut to 256 for very tight devices
 *   #define MAX_GPIO_PINS 8             // fewer pins if you need the RAM back
 */

#include <WiFi.h>
#include <MQTTMonitor.h>
#include <plugins/SystemPlugin.h>
#include <plugins/WiFiInfoPlugin.h>
#include <plugins/GPIOPlugin.h>

// WiFi credentials
const char* WIFI_SSID = "your-wifi-ssid";
const char* WIFI_PASS = "your-wifi-password";

// MQTT broker (your Home Assistant IP)
const char* MQTT_HOST = "192.168.1.10";
const int   MQTT_PORT = 1883;
const char* MQTT_USER = nullptr;  // Set if using auth
const char* MQTT_PASS = nullptr;

// Create monitor and plugins
MQTTMonitor monitor("esp-garden", "Garden Sensor", "esp32");
SystemPlugin  sysPlugin(30);   // Every 30 seconds
WiFiInfoPlugin wifiPlugin(60); // Every 60 seconds
GPIOPlugin    gpioPlugin(5);   // Every 5 seconds

void setup() {
    Serial.begin(115200);
    Serial.println("\n[MQTTMonitor] Starting...");

    // Connect to WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    Serial.print("[WiFi] Connecting");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.printf("\n[WiFi] Connected: %s\n", WiFi.localIP().toString().c_str());

    // Configure GPIO plugin
    gpioPlugin.addDigitalPin(4, "door_sensor");
    gpioPlugin.addAnalogPin(34, "soil_moisture");

    // Configure monitor
    monitor.setBroker(MQTT_HOST, MQTT_PORT);
    if (MQTT_USER) {
        monitor.setCredentials(MQTT_USER, MQTT_PASS);
    }
    monitor.addPlugin(&sysPlugin);
    monitor.addPlugin(&wifiPlugin);
    monitor.addPlugin(&gpioPlugin);
    monitor.addTag("garden");
    monitor.addTag("iot");

    // Allow remote reboot
    monitor.addAllowedCommand("reboot");

    monitor.begin();
}

void loop() {
    monitor.loop();
}

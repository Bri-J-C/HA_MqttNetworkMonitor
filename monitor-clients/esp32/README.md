# MQTT Network Monitor -- ESP32 Client

A header-only, lightweight MQTT monitoring library for ESP32 devices. No ArduinoJson dependency -- all JSON is built with `snprintf` for minimal memory footprint.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Standalone vs Shared Mode](#standalone-vs-shared-mode)
- [Built-in Plugins](#built-in-plugins)
- [Remote Config](#remote-config)
- [Config Persistence](#config-persistence)
- [Commands](#commands)
- [Shared Mode Integration Guide](#shared-mode-integration-guide)
- [Writing Plugins](#writing-plugins)
- [Memory Configuration](#memory-configuration)
- [API Reference](#api-reference)

---

## Installation

### Arduino IDE

1. Download or clone this repository.
2. Copy the `monitor-clients/esp32/src/` folder into your Arduino libraries directory (e.g., `~/Arduino/libraries/MQTTMonitor/`).
3. Install the dependency **PubSubClient** (version ^2.8) via the Library Manager.
4. Include the library in your sketch: `#include <MQTTMonitor.h>`

### PlatformIO

Add the following to your `platformio.ini`:

```ini
lib_deps =
    knolleary/PubSubClient@^2.8
    ; Copy or symlink MQTTMonitor into your lib/ directory
```

Place the `src/` contents under `lib/MQTTMonitor/` in your project.

---

## Quick Start

A minimal standalone example that reports heap and uptime every 30 seconds:

```cpp
#include <WiFi.h>
#include <MQTTMonitor.h>
#include <plugins/SystemPlugin.h>

MQTTMonitor monitor("esp32-001", "Living Room ESP", "esp32");
SystemPlugin sysPlugin;

void setup() {
    Serial.begin(115200);
    WiFi.begin("MySSID", "MyPassword");
    while (WiFi.status() != WL_CONNECTED) delay(500);

    monitor.setBroker("192.168.1.100", 1883);
    monitor.addPlugin(&sysPlugin);
    monitor.begin();
}

void loop() {
    monitor.loop();
}
```

---

## Standalone vs Shared Mode

### When to Use Each

| Mode | Use Case |
|------|----------|
| **Standalone** | The monitor owns the MQTT connection. Best for dedicated sensor nodes. |
| **Shared** | Your sketch already has a `PubSubClient` for other purposes (e.g., home automation commands). The monitor piggybacks on your existing connection. |

### Standalone Constructor

The monitor manages WiFi reconnection, MQTT connection, and topic subscriptions internally.

```cpp
MQTTMonitor monitor("device-id", "Device Name", "esp32");

void setup() {
    WiFi.begin("SSID", "password");
    monitor.setBroker("192.168.1.100", 1883);
    monitor.setCredentials("user", "pass");  // optional
    monitor.addPlugin(&sysPlugin);
    monitor.begin();
}

void loop() {
    monitor.loop();
}
```

### Shared Constructor

You provide an existing `PubSubClient`. The monitor does not call `client.loop()`, does not manage WiFi, and does not set the MQTT callback. You are responsible for forwarding messages and managing the connection.

```cpp
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
MQTTMonitor monitor("device-id", "Device Name", "esp32", mqttClient);

void setup() {
    WiFi.begin("SSID", "password");
    mqttClient.setServer("192.168.1.100", 1883);
    mqttClient.setCallback(mqttCallback);
    monitor.addPlugin(&sysPlugin);
    monitor.begin();
}
```

See [Shared Mode Integration Guide](#shared-mode-integration-guide) for the full pattern.

---

## Built-in Plugins

### SystemPlugin

Reports core health metrics. Default interval: 30 seconds.

```cpp
#include <plugins/SystemPlugin.h>
SystemPlugin sysPlugin(30);  // interval in seconds
```

| Attribute | Type | Unit | Description |
|-----------|------|------|-------------|
| `free_heap` | uint32 | bytes | Current free heap memory |
| `uptime` | uint32 | seconds | Time since boot (`millis() / 1000`) |
| `chip_temp` | float | degrees C | Internal temperature sensor (ESP32 only) |
| `min_free_heap` | uint32 | bytes | Lowest free heap since boot |

### WiFiInfoPlugin

Reports wireless signal quality and provides network topology data. Default interval: 60 seconds.

```cpp
#include <plugins/WiFiInfoPlugin.h>
WiFiInfoPlugin wifiPlugin(60);  // interval in seconds
```

| Attribute | Type | Unit | Description |
|-----------|------|------|-------------|
| `wifi_rssi` | int | dBm | Received signal strength |
| `wifi_channel` | int | -- | Current WiFi channel |
| `ip_address` | string | -- | Device IP address |

This plugin also implements `hasNetworkInfo()`, which adds a `network` object to the MQTT payload containing `ip`, `mac`, `gateway`, `subnet`, and `interface` fields. This data is used by the add-on for network topology visualization.

### ESP32Plugin

Reports hardware and firmware details. Default interval: 60 seconds.

```cpp
#include <plugins/ESP32Plugin.h>
ESP32Plugin esp32Plugin(60);  // interval in seconds
```

| Attribute | Type | Unit | Description |
|-----------|------|------|-------------|
| `cpu_freq` | uint32 | MHz | CPU clock frequency |
| `cpu_cores` | int | -- | Number of CPU cores |
| `flash_size` | uint32 | bytes | Total flash size |
| `sketch_size` | uint32 | bytes | Compiled sketch size |
| `sketch_free` | uint32 | bytes | Free sketch space (OTA budget) |
| `wifi_tx_power` | float | dBm | Max WiFi transmit power |
| `reset_reason` | string | -- | Last reset reason (e.g., `power_on`, `software`, `panic`, `brownout`) |
| `chip_revision` | int | -- | Silicon revision number |
| `sdk_version` | string | -- | ESP-IDF version string |

### GPIOPlugin

Reads digital and analog pins. Default interval: 5 seconds.

```cpp
#include <plugins/GPIOPlugin.h>
GPIOPlugin gpioPlugin(5);  // interval in seconds

gpioPlugin.addDigitalPin(4, "door_sensor");   // labeled
gpioPlugin.addDigitalPin(5);                  // auto-named "pin_5"
gpioPlugin.addAnalogPin(34, "light_level");   // labeled analog
```

| Method | Description |
|--------|-------------|
| `addDigitalPin(pin, label)` | Add a digital input. `label` is optional; defaults to `pin_N`. |
| `addAnalogPin(pin, label)` | Add an analog input. `label` is optional; defaults to `pin_N`. |

Digital pins are configured as `INPUT` automatically. Analog pins are read with `analogRead()`. The attribute key is the label (or `pin_N` if no label is provided). Digital values report with an empty unit; analog values report with unit `raw`.

Maximum pins: controlled by `MAX_GPIO_PINS` (default 16).

### CustomSensorPlugin

Register arbitrary sensors using function pointers. Publishes on topic `custom_command` to match the Python client format. Default interval: 30 seconds.

```cpp
#include <plugins/CustomSensorPlugin.h>
CustomSensorPlugin sensors(10);  // every 10 seconds

sensors.add("temperature", "C", []() -> float {
    return bme.readTemperature();
});
sensors.add("humidity", "%", []() -> float {
    return bme.readHumidity();
});
sensors.addString("status", "", []() -> const char* {
    return heaterOn ? "heating" : "idle";
});
```

| Method | Signature | Description |
|--------|-----------|-------------|
| `add()` | `add(name, unit, NumericFn)` | Register a numeric sensor. `NumericFn` is `float (*)()`. |
| `addString()` | `addString(name, unit, StringFn)` | Register a string sensor. `StringFn` is `const char* (*)()`. |
| `count()` | `int count()` | Returns the number of registered sensors. |
| `clearSensors()` | `void clearSensors()` | Removes all registered sensors. |

Maximum sensors: controlled by `MAX_CUSTOM_SENSORS` (default 8).

---

## Remote Config

The add-on can push configuration updates to devices via the MQTT topic `network_monitor/{device_id}/config`. The device responds on `network_monitor/{device_id}/config/response`.

### What Can Be Changed Remotely

- **Collection interval** -- applies to all plugins uniformly.
- **Allowed commands** -- the add-on can add or remove server-managed commands. Locally registered commands (via `addAllowedCommand`) cannot be removed by remote config.

### What Cannot Be Changed Remotely

- Plugin list (which plugins are active).
- Broker connection settings.
- Device ID, name, or type.
- GPIO pin configuration.
- Custom sensor registrations.

### Platform Constraints

Remote config requires the device to be subscribed to `network_monitor/{device_id}/config`. In standalone mode, this subscription is automatic. In shared mode, you must subscribe manually and forward messages via `handleMessage()`.

Config update payloads must include `"type": "config_update"`. Other types are rejected.

---

## Config Persistence

Enable NVS-backed persistence so that remotely changed settings survive reboots:

```cpp
monitor.enablePersistence();
// Call before monitor.begin()
```

When enabled, the monitor uses the ESP32 NVS namespace `mqtt_mon` to store and restore the collection interval. On boot, `begin()` loads the persisted interval and applies it to all plugins.

Persistence is only available on ESP32 (uses the `Preferences` library). It is a no-op on other platforms.

---

## Commands

### Registering Commands

Use `addAllowedCommand()` to whitelist commands the device will accept, then provide a callback with `onCommand()`:

```cpp
monitor.addAllowedCommand("reboot");
monitor.addAllowedCommand("calibrate");

monitor.onCommand([](const char* command) {
    if (strcmp(command, "calibrate") == 0) {
        runCalibration();
    }
});
```

Commands are sent to `network_monitor/{device_id}/command` as JSON:

```json
{"command": "calibrate", "request_id": "abc-123"}
```

The device publishes a response to `network_monitor/{device_id}/command/response`:

```json
{"request_id": "abc-123", "status": "success", "output": "Command executed"}
```

Commands not in the allowed list receive a `rejected` response.

### Built-in Reboot Command

The `reboot` command is handled internally if no `onCommand` callback intercepts it. When `reboot` is in the allowed list and there is no user callback, the device publishes a success response and calls `ESP.restart()`.

If an `onCommand` callback is set, it receives all commands (including `reboot`), and the built-in handler is bypassed.

---

## Shared Mode Integration Guide

Step-by-step integration when your sketch already uses `PubSubClient`:

### 1. Construct with your existing client

```cpp
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);
MQTTMonitor monitor("my-device", "My Device", "esp32", mqttClient);
```

### 2. Forward MQTT messages to the monitor

In your MQTT callback, call `handleMessage()`. It returns `true` if the message was on a monitor topic, `false` otherwise:

```cpp
void mqttCallback(char* topic, byte* payload, unsigned int length) {
    if (monitor.handleMessage(topic, payload, length)) {
        return;  // handled by monitor
    }
    // ...your other message handling...
}
```

### 3. Subscribe to monitor topics

After connecting to the broker, subscribe to the command and config topics. Use the helper methods to get the correct topic strings:

```cpp
void connectMqtt() {
    mqttClient.connect("my-client-id");

    // Your own subscriptions
    mqttClient.subscribe("home/my-device/set");

    // Monitor subscriptions
    char topic[128];
    monitor.getCommandTopic(topic, sizeof(topic));
    mqttClient.subscribe(topic);
    monitor.getConfigTopic(topic, sizeof(topic));
    mqttClient.subscribe(topic);
}
```

### 4. Call begin() and loop()

```cpp
void setup() {
    // ...WiFi and MQTT setup...
    monitor.addPlugin(&sysPlugin);
    monitor.begin();
}

void loop() {
    mqttClient.loop();   // you manage the connection
    monitor.loop();      // monitor just publishes data
}
```

### 5. Call stop() before restart

If your sketch triggers `ESP.restart()`, call `monitor.stop()` first to publish the offline status:

```cpp
monitor.stop();    // publishes "offline" retained status
ESP.restart();
```

In shared mode, `stop()` publishes the offline status but does **not** disconnect the MQTT client (since you own it).

---

## Writing Plugins

### The BasePlugin Contract

Every plugin must extend `BasePlugin` and implement two methods:

| Method | Signature | Description |
|--------|-----------|-------------|
| `name()` | `const char* name() const` | Return a unique string identifier. Used as the MQTT subtopic. |
| `collect()` | `int collect(char* buf, int maxLen)` | Write JSON attribute fragments into `buf`. Return bytes written. |

The `collect()` method must write comma-separated JSON attribute fragments in this format:

```
"attr_name":{"value":X,"unit":"Y"},"attr2":{"value":Z,"unit":"W"}
```

Use `snprintf` for all formatting. Do **not** add a leading or trailing comma.

Optionally, override `hasNetworkInfo()` and `getNetworkInfo()` to contribute network topology data (see WiFiInfoPlugin for an example).

### Full Example: BME280 Sensor Plugin

```cpp
#include <plugins/BasePlugin.h>
#include <Adafruit_BME280.h>

class BME280Plugin : public BasePlugin {
public:
    BME280Plugin(Adafruit_BME280& sensor, unsigned long intervalSec = 30)
        : _sensor(sensor) {
        _interval = intervalSec * 1000;
    }

    const char* name() const override { return "bme280"; }

    int collect(char* buf, int maxLen) override {
        float temp = _sensor.readTemperature();
        float hum  = _sensor.readHumidity();
        float pres = _sensor.readPressure() / 100.0f;

        int n = 0;
        n += snprintf(buf + n, maxLen - n,
            "\"temperature\":{\"value\":%.1f,\"unit\":\"\\u00b0C\"}", temp);
        n += snprintf(buf + n, maxLen - n,
            ",\"humidity\":{\"value\":%.1f,\"unit\":\"%%\"}", hum);
        n += snprintf(buf + n, maxLen - n,
            ",\"pressure\":{\"value\":%.1f,\"unit\":\"hPa\"}", pres);
        return n;
    }

private:
    Adafruit_BME280& _sensor;
};
```

Usage:

```cpp
Adafruit_BME280 bme;
BME280Plugin bmePlugin(bme, 15);  // every 15 seconds

void setup() {
    bme.begin(0x76);
    monitor.addPlugin(&bmePlugin);
    monitor.begin();
}
```

### CustomSensorPlugin as a Quick Alternative

If you do not need a full plugin class, `CustomSensorPlugin` lets you register individual sensors with function pointers. This is ideal for one-off readings where creating a class would be overkill:

```cpp
CustomSensorPlugin sensors(10);
sensors.add("soil_moisture", "%", []() -> float {
    return analogRead(34) / 4095.0f * 100.0f;
});
monitor.addPlugin(&sensors);
```

---

## Memory Configuration

Override these `#define` values **before** including `MQTTMonitor.h` to tune memory usage:

```cpp
#define MQTT_MONITOR_BUF_SIZE 256  // smaller buffer for constrained devices
#include <MQTTMonitor.h>
```

| Define | Default | Description |
|--------|---------|-------------|
| `MQTT_MONITOR_BUF_SIZE` | 512 | Size of the MQTT publish payload buffer (bytes). Also sets the PubSubClient buffer size in standalone mode. |
| `MQTT_MONITOR_TOPIC_SIZE` | 128 | Size of the shared topic string buffer (bytes). |
| `MQTT_MONITOR_MAX_PLUGINS` | 8 | Maximum number of plugins that can be registered. |
| `MAX_GPIO_PINS` | 16 | Maximum number of GPIO pins in `GPIOPlugin`. |
| `MAX_CUSTOM_SENSORS` | 8 | Maximum number of sensors in `CustomSensorPlugin`. |

---

## API Reference

### MQTTMonitor

| Method | Signature | Mode | Description |
|--------|-----------|------|-------------|
| Constructor (standalone) | `MQTTMonitor(const char* deviceId, const char* deviceName, const char* deviceType)` | Standalone | Creates a monitor that owns its MQTT connection. |
| Constructor (shared) | `MQTTMonitor(const char* deviceId, const char* deviceName, const char* deviceType, PubSubClient& existingClient)` | Shared | Creates a monitor that uses an external MQTT client. |
| `setBroker()` | `void setBroker(const char* host, uint16_t port = 1883)` | Standalone | Set the MQTT broker host and port. |
| `setCredentials()` | `void setCredentials(const char* username, const char* password)` | Standalone | Set MQTT authentication credentials. |
| `addPlugin()` | `void addPlugin(BasePlugin* plugin)` | Both | Register a plugin. Rejects duplicates by name. Max `MQTT_MONITOR_MAX_PLUGINS`. |
| `addTag()` | `void addTag(const char* tag)` | Both | Add a tag string included in every published payload. Max 8 tags. |
| `begin()` | `void begin()` | Both | Initialize the monitor. Connects to the broker (standalone) or publishes online status (shared). Loads persisted config. Device ID must be 64 chars or fewer. |
| `loop()` | `void loop()` | Both | Call every iteration. Manages connection (standalone) and publishes plugin data when collection intervals elapse. |
| `addAllowedCommand()` | `void addAllowedCommand(const char* command)` | Both | Whitelist a command. Max 8 commands. Locally added commands survive remote config updates. |
| `onCommand()` | `void onCommand(void (*callback)(const char* command))` | Both | Set the command handler callback. Receives the command string. |
| `enablePersistence()` | `void enablePersistence()` | Both | Enable NVS persistence for config. ESP32 only. Call before `begin()`. |
| `handleMessage()` | `bool handleMessage(const char* topic, const byte* payload, unsigned int length)` | Shared | Forward an MQTT message to the monitor. Returns `true` if the topic matched a monitor topic. |
| `getCommandTopic()` | `void getCommandTopic(char* buf, int bufLen) const` | Both | Write the command topic string into `buf`. |
| `getConfigTopic()` | `void getConfigTopic(char* buf, int bufLen) const` | Both | Write the config topic string into `buf`. |
| `stop()` | `void stop()` | Both | Publish offline status. In standalone mode, also disconnects from the broker. Call before `ESP.restart()` or deep sleep. |

### BasePlugin

| Method | Signature | Description |
|--------|-----------|-------------|
| `name()` | `virtual const char* name() const = 0` | Return the plugin's unique name (used as MQTT subtopic). |
| `collect()` | `virtual int collect(char* buf, int maxLen) = 0` | Write JSON attribute fragments into `buf`. Return bytes written. |
| `hasNetworkInfo()` | `virtual bool hasNetworkInfo() const` | Return `true` if this plugin provides network topology data. Default: `false`. |
| `getNetworkInfo()` | `virtual int getNetworkInfo(char* buf, int maxLen)` | Write network info JSON fragments into `buf`. Return bytes written. Default: returns 0. |
| `setInterval()` | `void setInterval(unsigned long intervalMs)` | Set the collection interval in milliseconds. |
| `getInterval()` | `unsigned long getInterval() const` | Get the current collection interval in milliseconds. |
| `shouldCollect()` | `bool shouldCollect()` | Returns `true` and resets the timer when the interval has elapsed. Called internally by `MQTTMonitor::loop()`. |

### MQTT Topics

All topics use the prefix `network_monitor` (defined as `MQTT_MONITOR_TOPIC_PREFIX`).

| Topic | Direction | Description |
|-------|-----------|-------------|
| `network_monitor/{id}/status` | Device -> Broker | Retained `online`/`offline` status. LWT is set to `offline`. |
| `network_monitor/{id}/{plugin_name}` | Device -> Broker | Plugin data payload (JSON). |
| `network_monitor/{id}/command` | Broker -> Device | Incoming command requests (JSON with `command` and `request_id`). |
| `network_monitor/{id}/command/response` | Device -> Broker | Command execution result (JSON with `request_id`, `status`, `output`). |
| `network_monitor/{id}/config` | Broker -> Device | Remote configuration updates (JSON with `type: "config_update"`). |
| `network_monitor/{id}/config/response` | Device -> Broker | Config update acknowledgment with active config summary. |

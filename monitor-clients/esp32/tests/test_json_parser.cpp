#include <cstdio>
#include <cstring>
#include <cassert>

// Include the header-only library
#include "../src/JsonParser.h"

int tests_run = 0;
int tests_passed = 0;

#define TEST(name) void name(); \
    struct name##_reg { name##_reg() { tests_run++; printf("  %s... ", #name); name(); tests_passed++; printf("PASS\n"); } } name##_inst; \
    void name()

#define ASSERT_EQ(a, b) do { if ((a) != (b)) { printf("FAIL: %s != %s\n", #a, #b); assert(false); } } while(0)
#define ASSERT_STREQ(a, b) do { if (strcmp((a), (b)) != 0) { printf("FAIL: '%s' != '%s'\n", (a), (b)); assert(false); } } while(0)
#define ASSERT_TRUE(x) do { if (!(x)) { printf("FAIL: %s\n", #x); assert(false); } } while(0)
#define ASSERT_FALSE(x) do { if (x) { printf("FAIL: !(%s)\n", #x); assert(false); } } while(0)

// === getString Tests ===

TEST(test_find_simple_string) {
    const char* json = R"({"name":"hello","age":"25"})";
    char buf[64];
    bool found = JsonParser::getString(json, "name", buf, sizeof(buf));
    ASSERT_TRUE(found);
    ASSERT_STREQ(buf, "hello");
}

TEST(test_find_second_key) {
    const char* json = R"({"name":"hello","age":"25"})";
    char buf[64];
    bool found = JsonParser::getString(json, "age", buf, sizeof(buf));
    ASSERT_TRUE(found);
    ASSERT_STREQ(buf, "25");
}

TEST(test_key_not_found) {
    const char* json = R"({"name":"hello"})";
    char buf[64];
    bool found = JsonParser::getString(json, "missing", buf, sizeof(buf));
    ASSERT_FALSE(found);
}

TEST(test_no_substring_collision) {
    // "id" should NOT match "device_id"
    const char* json = R"({"device_id":"wrong","id":"correct"})";
    char buf[64];
    bool found = JsonParser::getString(json, "id", buf, sizeof(buf));
    ASSERT_TRUE(found);
    ASSERT_STREQ(buf, "correct");
}

TEST(test_no_substring_collision_suffix) {
    // "name" should NOT match "hostname"
    const char* json = R"({"hostname":"server1","name":"test"})";
    char buf[64];
    bool found = JsonParser::getString(json, "name", buf, sizeof(buf));
    ASSERT_TRUE(found);
    ASSERT_STREQ(buf, "test");
}

TEST(test_only_substring_key_returns_false) {
    // If only "device_id" exists, searching for "id" should fail
    const char* json = R"({"device_id":"foo"})";
    char buf[64];
    bool found = JsonParser::getString(json, "id", buf, sizeof(buf));
    ASSERT_FALSE(found);
}

// === getInt Tests ===

TEST(test_numeric_value) {
    const char* json = R"({"count":42,"name":"test"})";
    int val = 0;
    bool found = JsonParser::getInt(json, "count", &val);
    ASSERT_TRUE(found);
    ASSERT_EQ(val, 42);
}

TEST(test_negative_int) {
    const char* json = R"({"offset":-7})";
    int val = 0;
    bool found = JsonParser::getInt(json, "offset", &val);
    ASSERT_TRUE(found);
    ASSERT_EQ(val, -7);
}

TEST(test_int_key_not_found) {
    const char* json = R"({"count":42})";
    int val = 0;
    bool found = JsonParser::getInt(json, "missing", &val);
    ASSERT_FALSE(found);
}

// === Buffer safety tests ===

TEST(test_buffer_too_small) {
    const char* json = R"({"name":"a_very_long_value_that_exceeds_buffer"})";
    char buf[8];
    bool found = JsonParser::getString(json, "name", buf, sizeof(buf));
    ASSERT_TRUE(found);
    // Should be truncated, not overflow
    ASSERT_EQ(strlen(buf), 7u); // 8 - 1 for null terminator
}

TEST(test_snprintf_clamp) {
    char buf[16];
    int n = snprintf(buf, sizeof(buf), "this is a very long string that exceeds the buffer");
    // snprintf returns what WOULD have been written
    ASSERT_TRUE(n >= (int)sizeof(buf));
    // After clamping:
    if (n >= (int)sizeof(buf)) n = (int)sizeof(buf) - 1;
    ASSERT_EQ(n, 15);
    // Subsequent write should be safe
    int n2 = snprintf(buf + n, sizeof(buf) - n, "x");
    // Should write nothing (0 bytes available)
    ASSERT_TRUE(n2 >= 0);
}

// === Nested object tests ===

TEST(test_get_object_str) {
    const char* json = R"({"config":{"interval":30,"enabled":true},"name":"dev"})";
    char buf[128];
    bool found = JsonParser::getObjectStr(json, "config", buf, sizeof(buf));
    ASSERT_TRUE(found);
    ASSERT_STREQ(buf, R"({"interval":30,"enabled":true})");
}

TEST(test_has_string_value) {
    const char* json = R"({"type":"sensor","name":"temp"})";
    ASSERT_TRUE(JsonParser::hasStringValue(json, "type", "sensor"));
    ASSERT_FALSE(JsonParser::hasStringValue(json, "type", "actuator"));
}

// === Null / edge-case safety ===

TEST(test_null_json) {
    char buf[64];
    ASSERT_FALSE(JsonParser::getString(nullptr, "key", buf, sizeof(buf)));
    int val = 0;
    ASSERT_FALSE(JsonParser::getInt(nullptr, "key", &val));
}

TEST(test_null_key) {
    const char* json = R"({"a":"b"})";
    char buf[64];
    ASSERT_FALSE(JsonParser::getString(json, nullptr, buf, sizeof(buf)));
}

int main() {
    printf("Running ESP32 host-side tests:\n");
    // Tests are auto-registered via static constructors
    printf("\n%d/%d tests passed\n", tests_passed, tests_run);
    return tests_passed == tests_run ? 0 : 1;
}

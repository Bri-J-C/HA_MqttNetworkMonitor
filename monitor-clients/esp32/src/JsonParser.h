#ifndef MQTT_MONITOR_JSON_PARSER_H
#define MQTT_MONITOR_JSON_PARSER_H

// ---------------------------------------------------------------------------
// JsonParser — minimal, allocation-free JSON value extraction.
// Works on flat or single-nested JSON objects using C string scanning.
// No external dependencies beyond <cstring> and <cstdio>.
// ---------------------------------------------------------------------------

#include <cstring>
#include <cstdio>

namespace JsonParser {

// ---- Internal helpers (not part of public API) ----------------------------

namespace _detail {

// Build a search pattern like  "key":"  or  "key":  and return pointer to the
// character immediately after the colon (skipping optional whitespace).
// Returns nullptr when the key is not found.
inline const char* findValue(const char* json, const char* key) {
    if (!json || !key) return nullptr;

    char pattern[80];
    snprintf(pattern, sizeof(pattern), "\"%s\"", key);

    const char* p = json;
    while ((p = strstr(p, pattern)) != nullptr) {
        // Verify this is a full key, not a suffix of another key.
        // The char before the opening quote must be start-of-string, '{', ',', or whitespace.
        if (p != json) {
            char before = *(p - 1);
            if (before != '{' && before != ',' && before != ' ' && before != '\t' && before != '\n') {
                p += strlen(pattern);
                continue;
            }
        }
        p += strlen(pattern);
        // skip whitespace after closing quote of key
        while (*p == ' ' || *p == '\t' || *p == '\n' || *p == '\r') p++;
        if (*p == ':') {
            p++;
            // skip whitespace after colon
            while (*p == ' ' || *p == '\t' || *p == '\n' || *p == '\r') p++;
            return p;
        }
        // colon not found right after key — false match, keep scanning
    }
    return nullptr;
}

} // namespace _detail

// ---- Public API -----------------------------------------------------------

// Extract a string value for the given key into out[outLen].
// Handles escaped quotes (\") inside the value.
// Returns true on success.
inline bool getString(const char* json, const char* key, char* out, int outLen) {
    const char* p = _detail::findValue(json, key);
    if (!p || *p != '"') return false;
    p++; // skip opening quote

    int i = 0;
    while (*p && i < outLen - 1) {
        if (*p == '\\' && *(p + 1) == '"') {
            out[i++] = '"';
            p += 2;
            continue;
        }
        if (*p == '"') break; // unescaped closing quote
        out[i++] = *p++;
    }
    out[i] = '\0';
    return true;
}

// Extract an integer value for the given key.
// Returns true on success.
inline bool getInt(const char* json, const char* key, int* out) {
    const char* p = _detail::findValue(json, key);
    if (!p) return false;

    // Allow optional leading minus
    bool negative = false;
    if (*p == '-') { negative = true; p++; }

    if (*p < '0' || *p > '9') return false;

    int val = 0;
    while (*p >= '0' && *p <= '9') {
        val = val * 10 + (*p - '0');
        p++;
    }
    *out = negative ? -val : val;
    return true;
}

// Check whether key equals a specific string value.
inline bool hasStringValue(const char* json, const char* key, const char* value) {
    char buf[128];
    if (!getString(json, key, buf, sizeof(buf))) return false;
    return strcmp(buf, value) == 0;
}

// Return pointer to the opening '{' of a nested object value, or nullptr.
inline const char* getObject(const char* json, const char* key) {
    const char* p = _detail::findValue(json, key);
    if (!p || *p != '{') return nullptr;
    return p;
}

// Find the matching '}' for an object starting at *start (which must be '{').
// Correctly handles nested braces and quoted strings.
// Returns pointer to the closing '}', or nullptr on mismatch.
inline const char* findObjectEnd(const char* start) {
    if (!start || *start != '{') return nullptr;

    int depth = 0;
    const char* p = start;
    while (*p) {
        if (*p == '"') {
            // Skip entire quoted string, including escaped quotes.
            // Note: does not handle double-escaped backslashes (\\") — unlikely in practice.
            p++;
            while (*p && !(*p == '"' && *(p - 1) != '\\')) p++;
            if (*p) p++; // skip closing quote
            continue;
        }
        if (*p == '{') depth++;
        else if (*p == '}') { depth--; if (depth == 0) return p; }
        p++;
    }
    return nullptr;
}

// Extract a nested object (including braces) as a string into out[outLen].
// Returns true on success.
inline bool getObjectStr(const char* json, const char* key, char* out, int outLen) {
    const char* start = getObject(json, key);
    if (!start) return false;

    const char* end = findObjectEnd(start);
    if (!end) return false;

    int len = (int)(end - start + 1); // include both braces
    if (len >= outLen) len = outLen - 1;

    memcpy(out, start, len);
    out[len] = '\0';
    return true;
}

} // namespace JsonParser

#endif // MQTT_MONITOR_JSON_PARSER_H

# MQTT Network Monitor -- Codebase Remediation Design

**Date:** 2026-04-08
**Scope:** Full codebase review remediation -- 71 findings across 81 source files
**Approach:** Component-by-component with tests built alongside each phase
**Backward compatibility:** Not required -- clients will be reinstalled

---

## Phase Order

| Phase | Component | Estimated Findings | Test Strategy |
|-------|-----------|-------------------|---------------|
| 1 | Server Backend | 28 | pytest unit tests |
| 2 | Python Monitor Client | 18 | pytest unit tests |
| 3 | ESP32 Client | 8 | Host-side C++ test harness |
| 4 | Lovelace Cards | 8 | Unit tests for pure functions |
| 5 | Infrastructure | 9 | CI pipeline as deliverable |
| 6 | Frontend (Add-on UI) | ~20 | @open-wc/testing + @web/test-runner, use frontend-design skill |

---

## Phase 1: Server Backend

### Security Fixes

- **Auth middleware**: Validate requests come through HA Ingress (check `X-Ingress-Path` header). Block direct access when not in dev mode. Applied to all API routes.
- **Path traversal**: Add `file_path.resolve().is_relative_to(frontend_dist.resolve())` check in `main.py` static file handler.
- **Settings validation**: Allowlist keys in `update_settings()`. Add `allowed_commands` and `attributes` to the `allowed_keys` set in `set_device_settings()`.
- **Bound MQTT payloads**: Reject messages over a configurable size threshold (default 64KB) before `json.loads()`.
- **Command push validation**: Validate shell command content in `routes_devices.py` server-commands and server-sensors endpoints.

### Concurrency Fixes

- **DeviceRegistry lock coverage**: Acquire `_lock` in all mutating methods: `create_group`, `delete_group`, `delete_device`, `delete_attribute`, `add_server_tags`, `remove_server_tag`, `set_server_tags`, `add_command_response`.
- **Flush safety**: Snapshot `_devices` via `copy.deepcopy()` under lock before passing to `json.dumps()` in `_flush_devices`.
- **Getter safety**: Return `copy.deepcopy()` from `get_all_devices()`, `get_device()`, and `get_settings()` to prevent mutation-through-reference.
- **WebSocket safety**: Add `asyncio.Lock` around `_connections` list mutations and iteration in `websocket.py`.
- **MQTT callback offloading**: Queue device updates from paho-mqtt's network thread and process them in an async worker, preventing heavy work from stalling message processing.

### Data Integrity Fixes

- **Immediate config persistence**: Group edits, tag changes, and other user-initiated config modifications bypass the 5-second debounce and write immediately.
- **Fix broken import endpoint**: Correct the `update_group()` call signature in `routes_settings.py` to pass a single dict.
- **Fix `_check_crit_alerts`**: Respect threshold operators (not just `>=`).
- **Fix `_device_hash`**: Include `hidden_attributes`, `card_attributes`, and `attribute_transforms` so changes to these fields aren't silently dropped by dedup.
- **Fix `allowed_keys` gap**: Add `allowed_commands` and `attributes` to `set_device_settings` so config push actually persists.

### Code Quality

- **Replace `assert` with `if/raise ValueError`** in `storage/store.py`.
- **Narrow `AssertionError` catch**: Scope the catch in `main.py` to StaticFiles WebSocket assertions only, or log when it fires.
- **Clean up unused imports**: `asyncio` in `command_sender.py`, duplicate `Path` in `main.py`.
- **Clean up `_last_broadcast_hash`**: Evict entries when devices are deleted.
- **Unbounded `_pending` dict**: Add periodic eviction to `CommandSender` independent of `get_pending()` calls.
- **`_resolve_entity_id` cache**: Make the HA states fetch async to avoid blocking the FastAPI worker thread.

### Tests

pytest-based unit tests covering:
- `settings_resolver`: cascade resolution (global -> group -> device), edge cases
- `config_assembler`: assembly with various config combinations
- `device_registry`: thread safety under concurrent access (use threading), CRUD operations, threshold evaluation, status derivation
- `storage`: atomic writes, invalid filenames, corruption recovery
- Auth middleware: ingress header validation, rejection of direct access
- `command_sender`: pending eviction
- Import/export endpoint: round-trip integrity

---

## Phase 2: Python Monitor Client

### Security Fixes

- **Default `allow_remote_exec=False`** in `config.py` dataclass.
- **Fix `load_with_remote`**: Preserve `allow_remote_exec` flag through config merge.
- **Remove `shell=True`**: Use `subprocess.run()` with argument lists where possible. Where shell features are genuinely needed (pipes, redirects in user templates), document the risk.
- **Validate command templates**: Only allow `{word}` placeholders via regex. Reject Python format string injection patterns (`{0.__class__}`, `{x!s}`, etc.).
- **PowerShell injection**: Validate service names against `^[a-zA-Z0-9_.-]+$` before interpolation in `windows_system.py`.
- **Config file permissions**: Set `0600` on Linux after writing. Set restrictive ACL on Windows (SYSTEM + Administrators only).

### Reliability Fixes

- **Validate intervals**: Enforce minimum 5 seconds from remote config push. Clamp, don't reject.
- **Fix `on_connect`**: Check `rc == 0` before subscribing and starting collection. Log the failure reason for non-zero rc values.
- **Fix `_force_full_publish`**: Track per-plugin whether initial full publish has occurred. Clear only after all plugins have completed their first collection.
- **Fix `free` variable**: Initialize `free = 0` in `linux_system.py` swap calculation.
- **Fix `disk_info` filter**: Change `pass` to `continue` in `windows_system.py`.

### Code Quality

- **Extract shared utilities**: Move `collector()` decorator and `_run()` helper from `linux_system.py`, `windows_system.py`, `system_resources.py` into a common `plugins/utils.py` module.
- **Remove dead code**: `_has_real_ip()` in `network_info.py`.
- **Deduplicate static attributes**: Derive `static_attributes` from `_STATIC_ATTRIBUTES` in `windows_system.py`.
- **Fix mutable class default**: Change `static_attributes: set[str] = set()` to `frozenset()` in `base.py`, override properly in subclasses.

### Tests

pytest unit tests covering:
- `command_handler`: template validation (valid placeholders, rejection of injection patterns), parameter escaping, execution with `allow_remote_exec` on/off
- `config`: load, merge, preserve flags, type validation
- `config_handler`: remote config application, interval clamping
- Each plugin's `collect()` with mocked `subprocess`/`psutil` calls
- Interval validation logic
- Service name validation

---

## Phase 3: ESP32 Client

### Memory Safety Fixes

- **Clamp `snprintf` return values**: After every `snprintf` call in `MQTTMonitor.h`, `_publishMetadata`, and all plugin `collect()` methods, add:
  ```cpp
  if (pn >= (int)sizeof(buf)) pn = (int)sizeof(buf) - 1;
  ```
- **Move `payload` buffer to class member**: Reduces ~512 bytes of stack pressure per `_collectAndPublish` call. Keep `attrsBuf`/`networkBuf`/`tagsBuf` on stack (smaller, acceptable).

### Correctness Fixes

- **Fix JsonParser key matching**: After finding a `strstr` match, verify the character before the opening `"` is `{`, `,`, or whitespace (i.e., not part of another key name).
- **Minimum interval validation**: Enforce floor of 5000ms in `_handleConfigMessage`. Clamp silently.
- **Add `_begun` flag**: Prevent repeated `begin()` calls in shared mode from re-running `_loadPersistedConfig()`.
- **Skip `_wifiClient` allocation in shared mode**: Conditionally allocate only when not using an external client.

### Documentation

- **Document minimum stack size** requirement (recommend 16KB) in example sketches and README.

### Tests

Host-side C++ test harness (compile with g++ on dev machine, no Arduino dependency):
- Extract `JsonParser` logic into a standalone testable unit
- Test key lookup: exact match, substring non-match, missing key, nested objects
- Test `snprintf` clamping helper: truncation detection, boundary values
- Test interval validation: zero, negative, below minimum, valid values

---

## Phase 4: Lovelace Cards

### XSS Fixes

- **Escape `unit` field**: `${this._escHtml(unit)}` at line 394
- **Escape editor option values and names**: `value="${this._escHtml(d.id)}"` and `${this._escHtml(d.name)}` in all `<option>` and `<input>` templates
- **Escape card title**: `${this._escHtml(this._config.title || 'Network')}`
- **Escape all remaining innerHTML interpolations**: Audit every template literal for unescaped dynamic content

### Code Quality

- **Extract `_escHtml` to module-level utility function** instead of duplicating across both card classes
- **Extract `formatValue`** similarly if not already shared

### Reliability Fixes

- **Fix stale `hass` reference**: Store a reference to the card instance in the interval closure, re-read `this.hass` on each tick
- **Add `disconnectedCallback` to `MQTTDeviceStatusCard`**: Clean up the session refresh interval
- **Guard against double interval creation**: Check if interval already exists before creating a new one

### Performance

- **Targeted DOM updates**: Instead of replacing full `innerHTML` on every render, identify the portions that change (attribute values, status indicators) and update only those nodes. At minimum, skip re-render if data hasn't changed.

### Tests

Unit tests for extracted pure functions:
- `escHtml`: all HTML metacharacters (`<`, `>`, `"`, `'`, `&`), null/undefined input, nested escaping
- `formatValue`: number formatting, boolean display, null handling
- Attribute rendering: verify escaped output for malicious input strings

---

## Phase 5: Infrastructure

### Docker

- **Drop capabilities or run as non-root**: Use `su-exec` in `run.sh` to drop to a non-root user after bashio reads supervisor config
- **Add `.dockerignore`**: Exclude `.git`, `__pycache__`, `tests/`, `tools/`, `docs/`, `*.md`
- **Align architecture lists**: Either add `armhf`/`armv7`/`i386` to `config.yaml` or remove them from `build.yaml`

### Dependencies

- **Add MQTT TLS support**: Add optional `mqtt_tls`, `mqtt_ca_cert`, `mqtt_client_cert` fields to `config.yaml` schema. Wire through to paho-mqtt's `tls_set()` in both server and Python client.
- **Pin transitive dependencies**: Generate and commit `requirements-lock.txt` for reproducible Docker builds.

### Deployment

- **Parameterize `deploy.sh`**: Accept `HA_HOST` and `ADDON_PATH` as environment variables with current values as defaults.
- **Quote all variable expansions** in SSH command strings.
- **Replace `exec()` in `build_windows.py`**: Use `re.search(r'__version__\s*=\s*["\'](.+?)["\']', text).group(1)`.

### Testing Infrastructure

- **Migrate `test_group_policy.py` to pytest**: Convert custom `TestResult` class to standard pytest assertions.
- **CI pipeline**: GitHub Actions workflow that runs:
  - Server pytest suite
  - Client pytest suite
  - ESP32 host-side C++ tests
  - Frontend tests (once Phase 6 adds them)
  - Lovelace unit tests
  - Linting (ruff for Python, eslint for JS)

---

## Phase 6: Frontend (Add-on UI)

**This phase uses the `frontend-design` skill for a comprehensive UI/UX review before implementation.**

### Security

- **Sandbox custom transforms**: Replace `new Function()` with a safe expression evaluator. Either a small recursive-descent parser for arithmetic + string ops, or a vetted library. Must reject arbitrary JS execution.

### Reliability

- **Fix WebSocket disconnect loop**: Add `_shouldReconnect` flag, set to `false` in `disconnect()`, check in `onclose` before scheduling reconnect.
- **Fix device-detail race condition**: Track loading state, defer WS updates until initial `_loadDevice()` completes. Use timestamps to prevent stale fetch results overwriting newer WS data.
- **Add WebSocket heartbeat/ping**: Detect half-open connections and trigger reconnect.

### UX Improvements

- **Toast notification system**: Lightweight component for showing success/error feedback on API calls. Replace all silent `console.error` catch blocks with user-visible notifications.
- **Replace native dialogs**: Convert all remaining `prompt()` and `confirm()` calls (5 locations) to `themed-dialog`.
- **Add loading indicators**: For all async operations (save threshold, toggle exposure, add tag, etc.).
- **Keyboard navigation**: Add Enter/Space handlers on device cards.

### Architecture

- **Decompose `topology-view.js`** (~1500 lines):
  - Extract zoom/pan logic into a mixin or helper
  - Extract edge management into a separate module
  - Extract layout persistence into a service
- **Centralize group ID generation**: Extract to utility module. Ideally have server assign IDs to prevent collisions.
- **Fix module-level mutable state**: Move `_globalThresholdForm` and `_customTransformForm` into component instances.
- **Fix `device-card` render side effects**: Move `setAttribute` calls to `connectedCallback`/`updated()`.

### Performance

- **Memoize getters**: `_counts` and `_filteredDevices` in `dashboard-view.js`.
- **Replace `JSON.stringify` comparison**: Use shallow key comparison (status, attribute count, last_seen) for render suppression in `device-detail.js`.

### CSS

- **Extract shared styles**: Move duplicated section/table/form/button CSS into additional shared modules.
- **Consolidate design tokens**: Replace hardcoded hex colors with CSS variables from `shared.js`.

### Tests

`@open-wc/testing` + `@web/test-runner`:
- Safe expression evaluator: valid math, rejection of function calls, edge cases, error handling
- Toast notification component: show/dismiss/auto-expire
- WebSocket service: reconnect behavior, disconnect flag, heartbeat
- Group ID utility: generation, collision detection
- Key components: device-card keyboard interaction, dashboard filtering

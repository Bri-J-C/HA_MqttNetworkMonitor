import copy

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
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}, "mem": {"value": 70}}})
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


class TestDeviceRegistryIsolation:
    def test_get_all_devices_returns_deep_copy(self, registry):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50, "unit": "%"}}})
        devices = registry.get_all_devices()
        devices["dev1"]["attributes"]["cpu"]["value"] = 999
        original = registry.get_device("dev1")
        assert original["attributes"]["cpu"]["value"] == 50

    def test_get_device_returns_deep_copy(self, registry):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50, "unit": "%"}}})
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


class TestDeviceSettings:
    def test_set_device_settings_allowed_commands(self, registry):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.set_device_settings("dev1", {"allowed_commands": ["reboot", "status"]})
        dev = registry.get_device("dev1")
        assert dev["allowed_commands"] == ["reboot", "status"]

    def test_set_device_settings_attributes(self, registry):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.set_device_settings("dev1", {"attributes": {"cpu": {"value": 99}}})
        dev = registry.get_device("dev1")
        assert dev["attributes"] == {"cpu": {"value": 99}}

    def test_set_device_settings_rejects_unknown_keys(self, registry):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.set_device_settings("dev1", {"evil_key": "bad_value"})
        dev = registry.get_device("dev1")
        assert "evil_key" not in dev

    def test_group_create_persists_immediately(self, registry, storage):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        on_disk = storage.load("groups.json")
        assert "grp1" in on_disk

    def test_group_delete_persists_immediately(self, registry, storage):
        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.create_group("grp1", "Group 1", ["dev1"])
        registry.flush()
        registry.delete_group("grp1")
        on_disk = storage.load("groups.json")
        assert "grp1" not in on_disk

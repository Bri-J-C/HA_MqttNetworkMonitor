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

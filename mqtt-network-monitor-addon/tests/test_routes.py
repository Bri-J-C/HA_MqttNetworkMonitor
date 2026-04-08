import pytest
from unittest.mock import MagicMock
from server.api import state


@pytest.fixture(autouse=True)
def mock_state(registry, settings_manager):
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

        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})

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

    def test_import_without_groups(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        client = TestClient(app)
        payload = {
            "settings": {"default_thresholds": {"cpu_usage": 80}},
        }
        resp = client.post("/api/settings/import", json=payload)
        assert resp.status_code == 200

    def test_import_updates_existing_group(self, registry):
        from fastapi.testclient import TestClient
        from server.api.routes import app

        registry.update_device("dev1", {"attributes": {"cpu": {"value": 50}}})
        registry.create_group("grp1", "Old Name", ["dev1"])

        client = TestClient(app)
        payload = {
            "groups": {
                "grp1": {
                    "name": "New Name",
                    "device_ids": ["dev1"],
                    "thresholds": {"cpu_usage": 90},
                }
            },
        }
        resp = client.post("/api/settings/import", json=payload)
        assert resp.status_code == 200

        groups = registry.get_groups()
        assert groups["grp1"]["name"] == "New Name"

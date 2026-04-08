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

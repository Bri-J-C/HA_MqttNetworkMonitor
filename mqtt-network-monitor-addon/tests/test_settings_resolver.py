"""Unit tests for settings_resolver.resolve_settings cascade logic."""

import pytest
from server.settings_resolver import resolve_settings


# ── Fixtures ────────────────────────────────────────────────────────────────

@pytest.fixture
def global_settings():
    return {
        "default_thresholds": {"rssi": -80, "packet_loss": 10},
        "default_ha_exposure": "all",
        "ha_exposed_attributes": ["rssi", "ip"],
    }


@pytest.fixture
def groups():
    return {
        "wifi_group": {
            "thresholds": {"rssi": -70, "snr": 20},
            "crit_thresholds": {"rssi": -90},
            "ha_exposed_attributes": ["rssi", "ip", "snr"],
            "hidden_attributes": ["raw_payload"],
            "card_attributes": ["rssi", "ip"],
            "attribute_transforms": {"rssi": "abs"},
        },
        "wired_group": {
            "thresholds": {"packet_loss": 5},
        },
    }


# ── Test: global settings only (no group, no device overrides) ───────────────

def test_global_only(global_settings):
    device = {"device_id": "dev1"}
    result = resolve_settings(device, {}, global_settings)

    assert result["thresholds"] == {"rssi": -80, "packet_loss": 10}
    assert result["crit_thresholds"] == {}
    assert result["ha_exposure"] == "all"
    assert set(result["ha_exposed_attributes"]) == {"rssi", "ip"}
    assert result["ha_exposure_source"] == "global"
    assert result["group_policy"] is None
    assert result["threshold_sources"] == {"rssi": "global", "packet_loss": "global"}


def test_global_only_empty_globals():
    device = {"device_id": "dev1"}
    result = resolve_settings(device, {}, {})

    assert result["thresholds"] == {}
    assert result["ha_exposure"] == "all"
    assert result["ha_exposed_attributes"] == []
    assert result["ha_exposure_source"] == "global"


# ── Test: group overrides global ─────────────────────────────────────────────

def test_group_overrides_global(global_settings, groups):
    device = {"device_id": "dev2", "group_policy": "wifi_group"}
    result = resolve_settings(device, groups, global_settings)

    # rssi comes from group (wins over global); packet_loss stays from global
    assert result["thresholds"]["rssi"] == -70
    assert result["thresholds"]["packet_loss"] == 10
    # snr added by group
    assert result["thresholds"]["snr"] == 20

    assert result["threshold_sources"]["rssi"] == "group"
    assert result["threshold_sources"]["packet_loss"] == "global"
    assert result["threshold_sources"]["snr"] == "group"

    assert result["crit_thresholds"] == {"rssi": -90}

    # Group sets ha_exposed_attributes → triggers selective mode
    assert result["ha_exposure"] == "selective"
    assert set(result["ha_exposed_attributes"]) == {"rssi", "ip", "snr"}
    assert result["ha_exposure_source"] == "group"

    assert result["group_policy"] == "wifi_group"
    assert result["hidden_attributes"] == ["raw_payload"]
    assert result["card_attributes"] == ["rssi", "ip"]
    assert result["attribute_transforms"] == {"rssi": "abs"}


def test_group_without_ha_attributes_keeps_global_exposure(global_settings, groups):
    """A group that doesn't set ha_exposed_attributes leaves ha_exposure as 'all'."""
    device = {"device_id": "dev3", "group_policy": "wired_group"}
    result = resolve_settings(device, groups, global_settings)

    assert result["ha_exposure"] == "all"
    assert result["ha_exposure_source"] == "global"
    assert result["thresholds"]["packet_loss"] == 5   # group wins
    assert result["thresholds"]["rssi"] == -80        # global fallthrough


# ── Test: device overrides group ─────────────────────────────────────────────

def test_device_overrides_group(global_settings, groups):
    device = {
        "device_id": "dev4",
        "group_policy": "wifi_group",
        "threshold_overrides": {"rssi": -60, "custom": 99},
        "crit_threshold_overrides": {"rssi": -95},
        "ha_exposure_overrides": {"snr": False, "ping": True},
        "hidden_attributes": ["debug"],
        "card_attributes": ["rssi"],
        "attribute_transforms": {"rssi": "neg"},
    }
    result = resolve_settings(device, groups, global_settings)

    # Device threshold beats group which beat global
    assert result["thresholds"]["rssi"] == -60
    assert result["thresholds"]["custom"] == 99
    assert result["threshold_sources"]["rssi"] == "device"
    assert result["threshold_sources"]["custom"] == "device"

    # Device crit overrides group crit
    assert result["crit_thresholds"]["rssi"] == -95

    # ha_exposure_overrides: started from group list {rssi, ip, snr},
    # removed snr, added ping → {rssi, ip, ping}
    assert result["ha_exposure"] == "selective"
    assert set(result["ha_exposed_attributes"]) == {"rssi", "ip", "ping"}
    assert result["ha_exposure_source"] == "device"

    # hidden: group ["raw_payload"] + device ["debug"] merged
    assert set(result["hidden_attributes"]) == {"raw_payload", "debug"}

    # card_attributes: device fully overrides group
    assert result["card_attributes"] == ["rssi"]

    # transforms: device wins per-attribute
    assert result["attribute_transforms"]["rssi"] == "neg"


# ── Test: missing group falls through to global ───────────────────────────────

def test_missing_group_falls_through_to_global(global_settings, groups):
    device = {"device_id": "dev5", "group_policy": "nonexistent_group"}
    result = resolve_settings(device, groups, global_settings)

    # Group not found → behaves as global-only
    assert result["thresholds"] == {"rssi": -80, "packet_loss": 10}
    assert result["ha_exposure"] == "all"
    assert result["ha_exposure_source"] == "global"
    assert result["crit_thresholds"] == {}
    # group_policy field is still set to what the device declared
    assert result["group_policy"] == "nonexistent_group"


def test_none_group_policy_falls_through_to_global(global_settings, groups):
    device = {"device_id": "dev6", "group_policy": None}
    result = resolve_settings(device, groups, global_settings)

    assert result["thresholds"] == {"rssi": -80, "packet_loss": 10}
    assert result["ha_exposure"] == "all"
    assert result["group_policy"] is None


# ── Test: partial overrides ───────────────────────────────────────────────────

def test_partial_device_threshold_overrides(global_settings, groups):
    """Device overrides only one threshold; others come from group and global."""
    device = {
        "device_id": "dev7",
        "group_policy": "wifi_group",
        "threshold_overrides": {"snr": 30},   # only override snr
    }
    result = resolve_settings(device, groups, global_settings)

    assert result["thresholds"]["rssi"] == -70          # from group
    assert result["thresholds"]["packet_loss"] == 10    # from global
    assert result["thresholds"]["snr"] == 30            # device beats group's 20

    assert result["threshold_sources"]["rssi"] == "group"
    assert result["threshold_sources"]["packet_loss"] == "global"
    assert result["threshold_sources"]["snr"] == "device"


def test_partial_ha_exposure_overrides_adds_and_removes(global_settings, groups):
    """ha_exposure_overrides can add and remove attributes independently."""
    device = {
        "device_id": "dev8",
        "group_policy": "wifi_group",
        "ha_exposure_overrides": {"rssi": False},  # remove one from group list
    }
    result = resolve_settings(device, groups, global_settings)

    # Group gave {rssi, ip, snr}; device removed rssi
    assert "rssi" not in result["ha_exposed_attributes"]
    assert "ip" in result["ha_exposed_attributes"]
    assert "snr" in result["ha_exposed_attributes"]
    assert result["ha_exposure_source"] == "device"


def test_device_ha_override_on_all_exposure_switches_to_selective(global_settings):
    """When ha_exposure is 'all' and device applies overrides, mode becomes selective."""
    device = {
        "device_id": "dev9",
        "ha_exposure_overrides": {"debug_attr": False},
    }
    result = resolve_settings(device, {}, global_settings)

    assert result["ha_exposure"] == "selective"
    assert result["ha_exposure_source"] == "device"


def test_transforms_merge_group_and_device(global_settings, groups):
    """Device attribute_transforms merge on top of group transforms."""
    device = {
        "device_id": "dev10",
        "group_policy": "wifi_group",
        "attribute_transforms": {"snr": "log"},   # add a new key, leave rssi alone
    }
    result = resolve_settings(device, groups, global_settings)

    # Group set rssi→abs; device adds snr→log; rssi should still be abs
    assert result["attribute_transforms"]["rssi"] == "abs"
    assert result["attribute_transforms"]["snr"] == "log"

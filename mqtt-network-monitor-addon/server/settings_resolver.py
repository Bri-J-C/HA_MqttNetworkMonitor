"""Resolves effective settings for a device based on global → group → device order."""

from typing import Any


def resolve_settings(
    device: dict[str, Any],
    groups: dict[str, Any],
    global_settings: dict[str, Any],
) -> dict[str, Any]:
    """Return the effective thresholds and HA exposure settings for *device*.

    Resolution order (later values win):
      1. Global defaults
      2. Group policy (identified by device["group_policy"])
      3. Device-level overrides
    """
    # ── 1. Start from global defaults ──────────────────────────────────────
    effective_thresholds: dict[str, Any] = dict(
        global_settings.get("default_thresholds", {})
    )
    effective_ha_exposure: str = global_settings.get("default_ha_exposure", "all")
    effective_ha_attributes: list[str] = list(
        global_settings.get("ha_exposed_attributes", [])
    )

    effective_crit_thresholds: dict[str, Any] = {}

    # Track the source of each threshold for informational purposes
    threshold_sources: dict[str, str] = {k: "global" for k in effective_thresholds}
    ha_exposure_source: str = "global"

    # ── 2. Group policy ────────────────────────────────────────────────────
    group_policy_id: str | None = device.get("group_policy")
    if group_policy_id and group_policy_id in groups:
        group = groups[group_policy_id]

        group_thresholds = group.get("thresholds", {})
        for key, value in group_thresholds.items():
            effective_thresholds[key] = value
            threshold_sources[key] = "group"

        group_crit = group.get("crit_thresholds", {})
        for key, value in group_crit.items():
            effective_crit_thresholds[key] = value

        if "ha_exposed_attributes" in group:
            effective_ha_attributes = list(group["ha_exposed_attributes"])
            # When a group specifies explicit attribute list, treat as "selective"
            effective_ha_exposure = "selective"
            ha_exposure_source = "group"

    # ── 3. Device-level overrides ──────────────────────────────────────────
    device_threshold_overrides: dict[str, Any] = device.get("threshold_overrides", {})
    for key, value in device_threshold_overrides.items():
        effective_thresholds[key] = value
        threshold_sources[key] = "device"

    device_crit_overrides: dict[str, Any] = device.get("crit_threshold_overrides", {})
    for key, value in device_crit_overrides.items():
        effective_crit_thresholds[key] = value

    device_ha_overrides: dict[str, Any] = device.get("ha_exposure_overrides", {})
    if device_ha_overrides:
        # Device overrides are attribute-level booleans; merge on top of group list
        # Start from the effective attribute list and apply per-attribute overrides
        attr_set = set(effective_ha_attributes)
        for attr, exposed in device_ha_overrides.items():
            if exposed:
                attr_set.add(attr)
            else:
                attr_set.discard(attr)
        effective_ha_attributes = sorted(attr_set)
        ha_exposure_source = "device"
        if effective_ha_exposure == "all":
            # Device has started customising — move to selective mode
            effective_ha_exposure = "selective"

    # ── 4. Resolve display settings (hidden, pinned, transforms) ────────────
    # Group → device cascade (device wins)
    effective_hidden_attributes: list[str] = []
    effective_card_attributes: list[str] = []
    effective_transforms: dict[str, str] = {}

    if group_policy_id and group_policy_id in groups:
        group = groups[group_policy_id]
        effective_hidden_attributes = list(group.get("hidden_attributes") or [])
        effective_card_attributes = list(group.get("card_attributes") or [])
        effective_transforms = dict(group.get("attribute_transforms") or {})

    # Device-level overrides merge on top
    device_hidden = device.get("hidden_attributes") or []
    if device_hidden:
        effective_hidden_attributes = list(set(effective_hidden_attributes + device_hidden))

    device_card = device.get("card_attributes") or []
    if device_card:
        effective_card_attributes = device_card  # Device fully overrides group pinning

    device_transforms = device.get("attribute_transforms") or {}
    effective_transforms.update(device_transforms)  # Device wins per-attribute

    return {
        "thresholds": effective_thresholds,
        "crit_thresholds": effective_crit_thresholds,
        "threshold_sources": threshold_sources,
        "ha_exposure": effective_ha_exposure,
        "ha_exposed_attributes": effective_ha_attributes,
        "ha_exposure_source": ha_exposure_source,
        "group_policy": group_policy_id,
        "hidden_attributes": effective_hidden_attributes,
        "card_attributes": effective_card_attributes,
        "attribute_transforms": effective_transforms,
    }

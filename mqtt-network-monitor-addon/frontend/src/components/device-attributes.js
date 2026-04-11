import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { applyTransform, getAllTransforms } from '../utils/transforms.js';
import './attribute-chart.js';
import './attribute-popover.js';

/**
 * device-attributes — attributes grid with HA exposure toggles, threshold editing, hide/unhide.
 *
 * Properties:
 *   device            {Object}  — full device record
 *   effectiveSettings {Object}  — merged settings from group/global
 *   haOverrides       {Object}  — local HA-exposure overrides (name → bool)
 *   groups            {Object}  — groups map (id → group)
 *   cardAttributes    {Array}   — list of attribute names pinned to the device card
 *   attributeTransforms {Object} — map of attribute name → transform name
 *
 * Events fired:
 *   attribute-deleted     {name}          — user clicked delete on an attribute
 *   attribute-unhidden    {name}          — user clicked show on a hidden attribute
 *   ha-exposure-toggled   {name}          — user toggled HA-exposure toggle
 *   threshold-changed     {name, value, op} — user edited a warn threshold
 *   crit-threshold-changed {name, value, op} — user edited a crit threshold
 *   pin-attribute         {name, pinned}  — user toggled pin on an attribute
 *   transform-changed     {attr, transform} — user changed a value transform
 */
class DeviceAttributes extends LitElement {
  static properties = {
    device:            { type: Object },
    effectiveSettings: { type: Object },
    haOverrides:       { type: Object },
    groups:            { type: Object },
    cardAttributes:    { type: Array },
    attributeTransforms: { type: Object },
    groupTransforms: { type: Object },
    _showHidden:       { type: Boolean, state: true },
    _expandedChart:    { type: String, state: true },
    _openPopover:      { type: String, state: true },
  };

  static styles = [sharedStyles, css`
    :host { font-family: var(--font-display); }
    /* Attributes section */
    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px; align-items: start;
    }
    .attr-tile {
      background: #0d0d1f; border-radius: 8px; padding: 12px;
      position: relative; transition: opacity 0.2s;
      overflow: hidden;
    }
    .attr-tile.ok { border: 1px solid #04d65c; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-tile.critical { border: 1px solid #ef5350; }
    .attr-label {
      font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-pin {
      font-size: 10px; cursor: pointer; opacity: 0.3;
      transition: opacity 0.15s; line-height: 1; user-select: none;
    }
    .attr-pin:hover { opacity: 0.7; }
    .attr-pin.pinned { opacity: 1; }
    .attr-delete {
      position: absolute; top: 6px; right: 8px;
      font-size: 14px; color: #fff; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .val-row {
      display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px;
    }
    .attr-val {
      font-size: 18px; font-weight: 700; color: #00D4FF;
      font-family: var(--font-data); transition: color 0.2s;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      max-width: calc(100% - 24px);
    }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-val.critical-val { color: #ef5350; }
    .attr-unit { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 400; }
    .attr-cog {
      font-size: 14px; color: rgba(255,255,255,0.55); cursor: pointer;
      transition: color 0.2s; user-select: none;
    }
    .attr-cog:hover { color: #00D4FF; }
    .attr-cog.active { color: #00D4FF; }
    .popover-anchor { position: relative; }

    @media (max-width: 768px) {
      .attr-grid { grid-template-columns: 1fr; }
    }
  `];

  constructor() {
    super();
    this.device            = null;
    this.effectiveSettings = null;
    this.haOverrides       = {};
    this.groups            = {};
    this.cardAttributes    = [];
    this.attributeTransforms = {};
    this.groupTransforms = {};
    this._showHidden       = false;
    this._expandedChart    = null;
    this._openPopover      = null;
    this._onDocClick       = this._onDocClick.bind(this);
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  _isExposed(name) {
    if (this.haOverrides[name] !== undefined) return this.haOverrides[name];
    const es = this.effectiveSettings;
    if (es?.ha_exposure_overrides?.[name] !== undefined) return es.ha_exposure_overrides[name];
    // Check if ha_exposure mode is "all" — if not, default to unexposed
    if (es?.ha_exposure === "all") return true;
    if (es?.ha_exposed_attributes?.includes(name)) return true;
    return false;
  }

  _getThresholdForAttr(name) {
    const es = this.effectiveSettings;
    if (!es) return null;
    const raw = (es.thresholds || {})[name];
    if (raw == null) return null;

    // Extract numeric value — threshold can be {op, value} or plain number
    const numericVal = typeof raw === 'object' ? raw.value : raw;
    if (numericVal == null) return null;

    const deviceOverrides = this.device?.threshold_overrides || {};
    const groupId = this.device?.group_policy;
    const group = groupId ? this.groups[groupId] : null;
    let source = 'global';
    if (deviceOverrides[name] != null)                              source = 'device';
    else if (group?.thresholds?.[name] != null)                    source = 'Group Policy';

    return { value: numericVal, source };
  }

  _checkThreshold(currentVal, threshold) {
    if (!threshold || currentVal == null || typeof currentVal !== 'number') return false;
    const val = typeof threshold === 'object' ? threshold.value : threshold;
    const op  = typeof threshold === 'object' ? (threshold.op || '>') : '>';
    if (val == null) return false;
    switch (op) {
      case '>':  return currentVal > val;
      case '<':  return currentVal < val;
      case '>=': return currentVal >= val;
      case '<=': return currentVal <= val;
      case '==': return currentVal === val;
      case '!=': return currentVal !== val;
      default:   return currentVal > val;
    }
  }

  _getThresholdOp(name) {
    const overrides = this.device?.threshold_overrides || {};
    const local = overrides[name];
    if (local != null && typeof local === 'object') return local.op || '>';
    const es = this.effectiveSettings;
    if (!es) return '>';
    const t = (es.thresholds || {})[name];
    if (t != null && typeof t === 'object') return t.op || '>';
    return '>';
  }

  _getThresholdVal(name) {
    const overrides = this.device?.threshold_overrides || {};
    const local = overrides[name];
    if (local != null) return typeof local === 'object' ? local.value : local;
    const threshold = this._getThresholdForAttr(name);
    return threshold ? threshold.value : null;
  }

  // ── Crit threshold helpers ─────────────────────────────────────────────────

  _getCritThresholdOp(name) {
    const overrides = this.device?.crit_threshold_overrides || {};
    const local = overrides[name];
    if (local != null && typeof local === 'object') return local.op || '>';
    return '>';
  }

  _getCritThresholdVal(name) {
    const overrides = this.device?.crit_threshold_overrides || {};
    const local = overrides[name];
    if (local != null) return typeof local === 'object' ? local.value : local;
    return null;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  render() {
    if (!this.device) return html``;
    const allAttrs    = Object.entries(this.device.attributes || {}).sort(([a], [b]) => a.localeCompare(b));
    const hidden      = this.device.hidden_attributes || [];
    const visibleAttrs = allAttrs.filter(([name]) => !hidden.includes(name));
    const hiddenAttrs  = allAttrs.filter(([name]) =>  hidden.includes(name));

    if (allAttrs.length === 0) return html``;

    const groupId = this.device.group_policy;
    const groupName = groupId ? groupId.replace(/_/g, ' ') : '';

    return html`
      <div class="section">
        <div class="section-title">Attributes</div>
        ${groupId ? html`
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; padding:8px 12px; background:rgba(179,136,255,0.08); border:1px solid rgba(179,136,255,0.2); border-radius:6px; font-size:11px;">
            <span style="color:#b388ff; font-weight:600;">⚡ Group Policy Active</span>
            <span style="color:rgba(255,255,255,0.5);">Thresholds and settings inherited from</span>
            <span style="color:#b388ff; font-family:var(--font-data);">${groupName}</span>
          </div>
        ` : ''}
        <div class="attr-grid">
          ${visibleAttrs.map(([name, data]) => this._renderAttrTile(name, data))}
        </div>
        ${hiddenAttrs.length > 0 ? html`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #fff; margin-bottom: 6px; cursor: pointer;"
              @click=${() => this._showHidden = !this._showHidden}>
              ${this._showHidden ? '▾' : '▸'} ${hiddenAttrs.length} hidden attribute${hiddenAttrs.length !== 1 ? 's' : ''}
            </div>
            ${this._showHidden ? html`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${hiddenAttrs.map(([name]) => html`
                  <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${name.replace(/_/g, ' ')}
                    <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                      @click=${() => this._onUnhide(name)}>show</span>
                  </span>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderAttrTile(name, data) {
    const exposed           = this._isExposed(name);
    const threshold         = this._getThresholdForAttr(name);
    const currentVal        = data.value != null ? data.value : null;
    const thresholdOverrides = this.device?.threshold_overrides || {};
    const localThreshold    = thresholdOverrides[name];
    const effectiveThreshold = localThreshold != null ? localThreshold : (threshold ? threshold.value : null);
    const exceeded          = this._checkThreshold(currentVal, effectiveThreshold);
    const currentOp         = this._getThresholdOp(name);
    const currentThreshVal  = this._getThresholdVal(name);
    const isPinned          = (this.cardAttributes || []).includes(name);
    const transform         = (this.attributeTransforms || {})[name] || '';

    // Crit threshold
    const critOp           = this._getCritThresholdOp(name);
    const critThreshVal    = this._getCritThresholdVal(name);
    const critOverrides    = this.device?.crit_threshold_overrides || {};
    const critEffective    = critOverrides[name] != null ? critOverrides[name] : null;
    const critical         = this._checkThreshold(currentVal, critEffective);

    // Determine tile border class: critical > warning > ok (thresholds set but fine) > none
    const hasAnyThreshold = effectiveThreshold != null || critEffective != null;
    const tileClass = critical ? 'critical' : (exceeded ? 'exceeded' : (hasAnyThreshold ? 'ok' : ''));
    const valClass  = critical ? 'critical-val' : (exceeded ? 'exceeded-val' : '');

    const popoverOpen = this._openPopover === name;

    // Threshold source for popover
    const thresholdSource = threshold && threshold.source !== 'device' && localThreshold == null
      ? threshold.source : '';

    return html`
      <div class="attr-tile ${tileClass}">
        <span class="attr-label">${name.replace(/_/g, ' ')}
          <span class="attr-pin ${isPinned ? 'pinned' : ''}"
            title="${isPinned ? 'Unpin from card' : 'Pin to card'}"
            @click=${(e) => { e.stopPropagation(); this._togglePin(name); }}>&#x1F4CC;</span>
        </span>
        <span class="attr-delete" title="Remove attribute"
          @click=${() => this._onDelete(name)}>&times;</span>
        <div class="val-row">
          <div class="attr-val ${valClass}">
            ${this._formatValue(currentVal, data.unit, transform)}
          </div>
          <div class="popover-anchor">
            <span class="attr-cog ${popoverOpen ? 'active' : ''}"
              title="Settings"
              @click=${(e) => { e.stopPropagation(); this._togglePopover(name); }}>&#x2699;</span>
            ${popoverOpen ? html`
              <attribute-popover
                .attrName=${name}
                .warnOp=${currentOp}
                .warnValue=${currentThreshVal != null ? String(currentThreshVal) : ''}
                .critOp=${critOp}
                .critValue=${critThreshVal != null ? String(critThreshVal) : ''}
                .transform=${transform}
                .transforms=${getAllTransforms()}
                .haExposed=${exposed}
                .pinned=${isPinned}
                .thresholdSource=${thresholdSource}
                @view-history=${(e) => { e.stopPropagation(); this._expandedChart = name; this._openPopover = null; }}
                @close-popover=${() => { this._openPopover = null; }}
              ></attribute-popover>
            ` : ''}
          </div>
        </div>
        ${this._expandedChart === name ? html`
          <attribute-chart
            .deviceId=${this.device?.device_id || ''}
            .attrName=${name}
            @close=${() => { this._expandedChart = null; }}
          ></attribute-chart>
        ` : ''}
      </div>
    `;
  }

  // ── Popover management ─────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
  }

  _onDocClick() {
    if (this._openPopover) this._openPopover = null;
  }

  _togglePopover(name) {
    this._openPopover = this._openPopover === name ? null : name;
  }

  // ── Event dispatchers ──────────────────────────────────────────────────────

  _onDelete(name) {
    this.dispatchEvent(new CustomEvent('attribute-deleted', { detail: { name }, bubbles: true, composed: true }));
  }

  _onUnhide(name) {
    this.dispatchEvent(new CustomEvent('attribute-unhidden', { detail: { name }, bubbles: true, composed: true }));
  }

  _onToggleExposure(name) {
    this.dispatchEvent(new CustomEvent('ha-exposure-toggled', { detail: { name }, bubbles: true, composed: true }));
  }

  _onThresholdChange(name, value, op) {
    this.dispatchEvent(new CustomEvent('threshold-changed', { detail: { name, value, op }, bubbles: true, composed: true }));
  }

  _onCritThresholdChange(name, value, op) {
    this.dispatchEvent(new CustomEvent('crit-threshold-changed', { detail: { name, value, op }, bubbles: true, composed: true }));
  }

  _formatValue(value, unit, transform) {
    if (value == null) return '\u2014';
    if (transform) {
      const transformed = applyTransform(value, transform);
      // When a transform is active, it replaces both value and unit
      return transformed;
    }
    return html`${value}<span class="attr-unit">${unit || ''}</span>`;
  }

  _onTransformChange(attr, transform) {
    this.dispatchEvent(new CustomEvent('transform-changed', {
      detail: { attr, transform: transform || null },
      bubbles: true, composed: true,
    }));
  }

  _togglePin(name) {
    this.dispatchEvent(new CustomEvent('pin-attribute', {
      detail: { name, pinned: !(this.cardAttributes || []).includes(name) },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('device-attributes', DeviceAttributes);

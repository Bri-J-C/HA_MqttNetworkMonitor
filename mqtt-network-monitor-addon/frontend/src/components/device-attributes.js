import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { applyTransform, getAllTransforms } from '../utils/transforms.js';

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
  };

  static styles = [sharedStyles, css`
    /* Attributes + HA exposure */
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
      gap: 12px;
    }
    .attr-tile {
      background: #0d0d1f; border-radius: 8px; padding: 12px;
      position: relative; transition: opacity 0.2s;
    }
    /* dimmed class no longer reduces opacity — toggle is sufficient */
    .attr-tile-top {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px;
    }
    .attr-label {
      font-size: 10px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-delete {
      font-size: 14px; color: #fff; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .attr-val {
      font-size: 18px; font-weight: 700; margin-top: 4px; color: #00D4FF;
      transition: color 0.2s;
    }
    /* dimmed-val no longer changes color — toggle is sufficient */
    .attr-unit { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 400; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-tile.critical { border: 1px solid #ef5350; }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-val.critical-val { color: #ef5350; }
    .attr-thresholds {
      margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.05);
      display: flex; flex-direction: column; gap: 4px;
    }
    .attr-threshold-row {
      display: flex; align-items: center; gap: 4px;
    }
    .threshold-label {
      font-size: 11px; text-transform: uppercase;
      letter-spacing: 0.5px; width: 36px; flex-shrink: 0; font-weight: 600;
    }
    .threshold-label.warn { color: rgba(255,183,77,0.7); }
    .threshold-label.crit { color: rgba(239,83,80,0.7); }
    .threshold-op {
      background: #0d0d1f; border: none; border-radius: 3px;
      color: rgba(255,255,255,0.5); padding: 2px 4px; font-size: 11px; cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .threshold-op option { background: #0d0d1f; color: #fff; }
    .threshold-op:hover, .threshold-op:focus { outline: none; color: #00D4FF; }
    .threshold-inline {
      width: 44px; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5); padding: 2px 2px; font-size: 11px;
      text-align: center;
    }
    .threshold-inline:focus { outline: none; border-bottom-color: #00D4FF; color: #fff; }
    .threshold-inline::placeholder { color: rgba(255,255,255,0.15); }
    .threshold-source {
      font-size: 8px; color: rgba(255,255,255,0.2); margin-left: auto;
    }

    /* Transform select */
    .attr-transform {
      margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.05);
      display: flex; align-items: center; gap: 4px;
    }
    .transform-select {
      flex: 1; min-width: 0; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px; color: rgba(255,255,255,0.5); padding: 2px 4px;
      font-size: 10px; cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .transform-select option { background: #0d0d1f; color: #fff; }
    .transform-select:hover, .transform-select:focus { outline: none; border-color: #00D4FF; color: #fff; }
    .transform-label {
      font-size: 8px; color: rgba(255,255,255,0.3); text-transform: uppercase;
      letter-spacing: 0.3px; white-space: nowrap;
    }
    .transform-source {
      font-size: 8px; color: rgba(255,255,255,0.25); font-style: italic; white-space: nowrap;
    }

    /* Pin icon */
    .attr-pin {
      font-size: 10px; cursor: pointer; opacity: 0.3;
      transition: opacity 0.15s; line-height: 1; user-select: none;
    }
    .attr-pin:hover { opacity: 0.7; }
    .attr-pin.pinned { opacity: 1; }

    /* Toggle switch */
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 32px; height: 18px; border-radius: 9px; position: relative;
      transition: background 0.2s;
    }
    .toggle.on  { background: #00D4FF; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on  .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }

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
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  _isExposed(name) {
    if (this.haOverrides[name] !== undefined) return this.haOverrides[name];
    const es = this.effectiveSettings;
    if (es?.ha_exposure_overrides?.[name] !== undefined) return es.ha_exposure_overrides[name];
    return true;
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

    return html`
      <div class="section">
        <div class="section-title">Attributes</div>
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

    // Critical takes priority over warning for styling
    const tileClass = critical ? 'critical' : (exceeded ? 'exceeded' : '');
    const valClass  = critical ? 'critical-val' : (exceeded ? 'exceeded-val' : '');

    return html`
      <div class="attr-tile ${exposed ? '' : 'dimmed'} ${tileClass}">
        <div class="attr-tile-top">
          <span class="attr-label">${name.replace(/_/g, ' ')}
            <span class="attr-pin ${isPinned ? 'pinned' : ''}"
              title="${isPinned ? 'Unpin from card' : 'Pin to card'}"
              @click=${(e) => { e.stopPropagation(); this._togglePin(name); }}>&#x1F4CC;</span>
            <span class="attr-delete" title="Remove attribute"
              @click=${() => this._onDelete(name)}>&times;</span>
          </span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${exposed ? 'true' : 'false'}
            aria-label="Expose ${name.replace(/_/g, ' ')} to Home Assistant"
            tabindex="0"
            @click=${() => this._onToggleExposure(name)}
            @keydown=${(e) => (e.key === 'Enter' || e.key === ' ') && this._onToggleExposure(name)}>
            <div class="toggle ${exposed ? 'on' : 'off'}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>
        <div class="attr-val ${exposed ? '' : 'dimmed-val'} ${valClass}">
          ${this._formatValue(currentVal, data.unit, transform)}
        </div>
        <div class="attr-thresholds">
          <div class="attr-threshold-row">
            ${exceeded ? html`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>` : ''}
            <span class="threshold-label warn">warn</span>
            <select class="threshold-op"
              aria-label="Warning threshold operator for ${name.replace(/_/g, ' ')}"
              .value=${currentOp}
              @change=${(e) => this._onThresholdChange(name, currentThreshVal, e.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Warning threshold value for ${name.replace(/_/g, ' ')}"
              placeholder="\u2014"
              .value=${currentThreshVal != null ? String(currentThreshVal) : ''}
              @change=${(e) => this._onThresholdChange(name, e.target.value, currentOp)}>
            ${threshold && threshold.source !== 'device' && localThreshold == null ? html`
              <span class="threshold-source">${threshold.source}</span>
            ` : ''}
          </div>
          <div class="attr-threshold-row">
            ${critical ? html`<span style="color: #ef5350; font-size: 11px;">\u26A0</span>` : ''}
            <span class="threshold-label crit">crit</span>
            <select class="threshold-op"
              aria-label="Critical threshold operator for ${name.replace(/_/g, ' ')}"
              .value=${critOp}
              @change=${(e) => this._onCritThresholdChange(name, critThreshVal, e.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input class="threshold-inline" type="number"
              aria-label="Critical threshold value for ${name.replace(/_/g, ' ')}"
              placeholder="\u2014"
              .value=${critThreshVal != null ? String(critThreshVal) : ''}
              @change=${(e) => this._onCritThresholdChange(name, e.target.value, critOp)}>
          </div>
        </div>
        <div class="attr-transform">
          <div class="transform-label">Transform</div>
          <select class="transform-select"
            aria-label="Value transform for ${name.replace(/_/g, ' ')}"
            .value=${transform}
            @change=${(e) => this._onTransformChange(name, e.target.value)}>
            ${getAllTransforms().map(t => html`
              <option value=${t.value} ?selected=${t.value === transform}>${t.label}</option>
            `)}
          </select>
          ${(this.groupTransforms || {})[name] && !(this.device?.attribute_transforms || {})[name]
            ? html`<span class="transform-source">Group Policy</span>` : ''}
        </div>
      </div>
    `;
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

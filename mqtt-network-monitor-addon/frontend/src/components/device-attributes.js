import { LitElement, html, css } from 'lit';

/**
 * device-attributes — attributes grid with HA exposure toggles, threshold editing, hide/unhide.
 *
 * Properties:
 *   device            {Object}  — full device record
 *   effectiveSettings {Object}  — merged settings from group/global
 *   haOverrides       {Object}  — local HA-exposure overrides (name → bool)
 *   groups            {Object}  — groups map (id → group)
 *   cardAttributes    {Array}   — list of attribute names pinned to the device card
 *
 * Events fired:
 *   attribute-deleted     {name}          — user clicked delete on an attribute
 *   attribute-unhidden    {name}          — user clicked show on a hidden attribute
 *   ha-exposure-toggled   {name}          — user toggled HA-exposure toggle
 *   threshold-changed     {name, value, op} — user edited a threshold
 *   pin-attribute         {name, pinned}  — user toggled pin on an attribute
 */
class DeviceAttributes extends LitElement {
  static properties = {
    device:            { type: Object },
    effectiveSettings: { type: Object },
    haOverrides:       { type: Object },
    groups:            { type: Object },
    cardAttributes:    { type: Array },
    _showHidden:       { type: Boolean, state: true },
  };

  static styles = css`
    /* Attributes + HA exposure */
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .attr-tile {
      background: #1a1a2e; border-radius: 8px; padding: 12px;
      position: relative; transition: opacity 0.2s;
    }
    .attr-tile.dimmed { opacity: 0.45; }
    .attr-tile-top {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 6px;
    }
    .attr-label {
      font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px;
    }
    .attr-delete {
      font-size: 14px; color: #555; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }
    .attr-val {
      font-size: 22px; font-weight: 700; margin-top: 4px; color: #4fc3f7;
      transition: color 0.2s;
    }
    .attr-val.dimmed-val { color: #555; }
    .attr-unit { font-size: 12px; color: #888; font-weight: 400; }
    .attr-tile.exceeded { border: 1px solid #ffb74d; }
    .attr-val.exceeded-val { color: #ffb74d; }
    .attr-threshold-row {
      display: flex; align-items: center; gap: 4px; margin-top: 4px;
    }
    .threshold-op {
      background: transparent; border: 1px solid #3a3a5a; border-radius: 3px;
      color: #aaa; padding: 2px 2px; font-size: 10px; cursor: pointer;
      width: 36px; text-align: center;
    }
    .threshold-op:focus { outline: none; border-color: #4fc3f7; }
    .threshold-inline {
      width: 50px; background: transparent; border: 1px solid #3a3a5a;
      border-radius: 3px; color: #aaa; padding: 2px 4px; font-size: 10px;
      text-align: center;
    }
    .threshold-inline:focus { outline: none; border-color: #4fc3f7; color: #e0e0e0; }
    .threshold-inline::placeholder { color: #444; }

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
    .toggle.on  { background: #4fc3f7; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on  .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }
  `;

  constructor() {
    super();
    this.device            = null;
    this.effectiveSettings = null;
    this.haOverrides       = {};
    this.groups            = {};
    this.cardAttributes    = [];
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
    const val = (es.thresholds || {})[name];
    if (val == null) return null;

    const deviceOverrides = this.device?.threshold_overrides || {};
    const groupId = this.device?.group_policy;
    const group = groupId ? this.groups[groupId] : null;
    let source = 'global';
    if (deviceOverrides[name] != null)                              source = 'device';
    else if (group?.thresholds?.[name] != null)                    source = 'group';

    return { value: val, source };
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

  // ── Render ─────────────────────────────────────────────────────────────────

  render() {
    if (!this.device) return html``;
    const allAttrs    = Object.entries(this.device.attributes || {});
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
            <div style="font-size: 10px; color: #555; margin-bottom: 6px; cursor: pointer;"
              @click=${() => this._showHidden = !this._showHidden}>
              ${this._showHidden ? '▾' : '▸'} ${hiddenAttrs.length} hidden attribute${hiddenAttrs.length !== 1 ? 's' : ''}
            </div>
            ${this._showHidden ? html`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${hiddenAttrs.map(([name]) => html`
                  <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${name.replace(/_/g, ' ')}
                    <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
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

    return html`
      <div class="attr-tile ${exposed ? '' : 'dimmed'} ${exceeded ? 'exceeded' : ''}">
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
        <div class="attr-val ${exposed ? '' : 'dimmed-val'} ${exceeded ? 'exceeded-val' : ''}">
          ${currentVal != null ? currentVal : '\u2014'}
          <span class="attr-unit">${data.unit || ''}</span>
        </div>
        <div class="attr-threshold-row">
          ${exceeded ? html`<span style="color: #ffb74d; font-size: 11px;">\u26A0</span>` : ''}
          <span style="font-size: 9px; color: #666;">Warn</span>
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
            <span style="font-size: 8px; color: #555;">${threshold.source}</span>
          ` : ''}
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

  _togglePin(name) {
    this.dispatchEvent(new CustomEvent('pin-attribute', {
      detail: { name, pinned: !(this.cardAttributes || []).includes(name) },
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('device-attributes', DeviceAttributes);

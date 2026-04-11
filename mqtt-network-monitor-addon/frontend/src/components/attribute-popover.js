import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * attribute-popover — floating popover for per-attribute settings.
 *
 * The parent component controls visibility by conditionally rendering this element.
 *
 * Properties:
 *   attrName        {String}  — attribute name
 *   warnOp          {String}  — warning threshold operator ('>', '<', '>=', '<=')
 *   warnValue       {String}  — warning threshold value or ''
 *   critOp          {String}  — critical threshold operator
 *   critValue       {String}  — critical threshold value or ''
 *   transform       {String}  — current transform name
 *   transforms      {Array}   — [{value, label}, ...] available transforms
 *   haExposed       {Boolean} — whether attribute is exposed to HA
 *   pinned          {Boolean} — whether attribute is pinned to card
 *   thresholdSource {String}  — 'global', 'group', or 'device'
 *
 * Events fired:
 *   threshold-changed      {name, value, op}
 *   crit-threshold-changed {name, value, op}
 *   transform-changed      {attr, transform}
 *   ha-exposure-toggled    {name}
 *   pin-attribute          {name, pinned}
 *   view-history           {name}
 *   close-popover          (no detail)
 */
class AttributePopover extends LitElement {
  static properties = {
    attrName:        { type: String },
    warnOp:          { type: String },
    warnValue:       { type: String },
    critOp:          { type: String },
    critValue:       { type: String },
    transform:       { type: String },
    transforms:      { type: Array },
    haExposed:       { type: Boolean },
    pinned:          { type: Boolean },
    thresholdSource: { type: String },
  };

  static styles = [sharedStyles, css`
    :host {
      position: fixed;
      z-index: 600;
      font-family: var(--font-display);
    }
    .popover {
      width: 240px;
      max-width: 90vw;
      background: #161630;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
    }
    /* Arrow pointing up-right */
    .popover::before {
      content: '';
      position: absolute;
      top: -6px;
      right: 12px;
      width: 10px; height: 10px;
      background: #161630;
      border-left: 1px solid rgba(255,255,255,0.1);
      border-top: 1px solid rgba(255,255,255,0.1);
      transform: rotate(45deg);
    }

    .popover-title {
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .popover-close {
      font-size: 14px;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      line-height: 1;
    }
    .popover-close:hover { color: #fff; }

    .divider {
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 8px 0;
    }

    /* Threshold rows */
    .threshold-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 6px;
    }
    .threshold-row-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: 32px;
      flex-shrink: 0;
      font-weight: 600;
    }
    .threshold-row-label.warn { color: rgba(255,183,77,0.7); }
    .threshold-row-label.crit { color: rgba(239,83,80,0.7); }

    .threshold-op {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 3px;
      color: rgba(255,255,255,0.6);
      padding: 2px 4px;
      font-size: 11px;
      font-family: var(--font-data);
      cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .threshold-op option { background: #161630; color: #fff; }
    .threshold-op:hover, .threshold-op:focus { outline: none; color: #00D4FF; border-color: rgba(0,212,255,0.3); }

    .threshold-input {
      width: 52px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 3px;
      color: rgba(255,255,255,0.6);
      padding: 2px 4px;
      font-size: 11px;
      font-family: var(--font-data);
      text-align: center;
    }
    .threshold-input:focus { outline: none; border-color: rgba(0,212,255,0.3); color: #fff; }
    .threshold-input::placeholder { color: rgba(255,255,255,0.15); }

    .threshold-source {
      font-size: 8px;
      color: rgba(255,255,255,0.25);
      margin-left: auto;
      font-style: italic;
    }

    /* Transform */
    .field-label {
      font-size: 9px;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .transform-select {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 4px;
      color: rgba(255,255,255,0.6);
      padding: 4px 6px;
      font-size: 11px;
      font-family: var(--font-data);
      cursor: pointer;
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
    }
    .transform-select option { background: #161630; color: #fff; }
    .transform-select:hover, .transform-select:focus { outline: none; border-color: rgba(0,212,255,0.3); color: #fff; }

    /* Toggle rows */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 0;
    }
    .toggle-label {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
    }
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 28px; height: 16px; border-radius: 8px;
      position: relative; transition: background 0.2s;
    }
    .toggle.on-green  { background: #04d65c; }
    .toggle.on-cyan   { background: #00D4FF; }
    .toggle.off       { background: #444; }
    .toggle-knob {
      width: 12px; height: 12px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on-green .toggle-knob,
    .toggle.on-cyan  .toggle-knob { left: 14px; }
    .toggle.off .toggle-knob      { left: 2px; }

    /* View History link */
    .view-history {
      font-size: 11px;
      color: var(--accent);
      cursor: pointer;
      text-decoration: none;
    }
    .view-history:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      :host {
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        transform: none !important;
      }
      .popover {
        width: 100%;
        max-width: 100%;
        border-radius: 12px 12px 0 0;
        padding: 16px 20px;
        box-sizing: border-box;
      }
      .popover::before { display: none; }
    }
  `];

  constructor() {
    super();
    this.attrName        = '';
    this.warnOp          = '>';
    this.warnValue       = '';
    this.critOp          = '>';
    this.critValue       = '';
    this.transform       = '';
    this.transforms      = [];
    this.haExposed       = false;
    this.pinned          = false;
    this.thresholdSource = '';
  }

  connectedCallback() {
    super.connectedCallback();
    // Position relative to the cog icon that triggered this popover
    requestAnimationFrame(() => this._positionPopover());
  }

  _positionPopover() {
    // On mobile, the CSS handles positioning as a bottom sheet
    if (window.innerWidth <= 768) return;

    // Find the cog that opened us (our parent's .attr-cog)
    const anchor = this.parentElement;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    // Position below and to the right of the cog
    this.style.top = `${rect.bottom + 8}px`;
    this.style.left = `${Math.max(8, rect.left - 200)}px`;
    // Make sure it doesn't go off the right edge
    const popWidth = 240;
    if (rect.left - 200 + popWidth > window.innerWidth) {
      this.style.left = `${window.innerWidth - popWidth - 16}px`;
    }
    // Make sure it doesn't go off the bottom
    if (rect.bottom + 350 > window.innerHeight) {
      this.style.top = `${rect.top - 8}px`;
      this.style.transform = 'translateY(-100%)';
    }
  }

  render() {
    const displayName = this.attrName.replace(/_/g, ' ');

    return html`
      <div class="popover" @click=${(e) => e.stopPropagation()}>
        <div class="popover-title">
          <span>${displayName} Settings</span>
          <span class="popover-close" @click=${this._onClose}>&times;</span>
        </div>

        <!-- Warning threshold -->
        <div class="threshold-row">
          <span class="threshold-row-label warn">warn</span>
          <select class="threshold-op"
            aria-label="Warning threshold operator"
            .value=${this.warnOp || '>'}
            @change=${(e) => this._onWarnChanged(this.warnValue, e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
          <input class="threshold-input" type="number"
            aria-label="Warning threshold value"
            placeholder="\u2014"
            .value=${this.warnValue || ''}
            @change=${(e) => this._onWarnChanged(e.target.value, this.warnOp || '>')}>
          ${this.thresholdSource && this.thresholdSource !== 'device' ? html`
            <span class="threshold-source">${this.thresholdSource}</span>
          ` : ''}
        </div>

        <!-- Critical threshold -->
        <div class="threshold-row">
          <span class="threshold-row-label crit">crit</span>
          <select class="threshold-op"
            aria-label="Critical threshold operator"
            .value=${this.critOp || '>'}
            @change=${(e) => this._onCritChanged(this.critValue, e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
          <input class="threshold-input" type="number"
            aria-label="Critical threshold value"
            placeholder="\u2014"
            .value=${this.critValue || ''}
            @change=${(e) => this._onCritChanged(e.target.value, this.critOp || '>')}>
        </div>

        <div class="divider"></div>

        <!-- Transform -->
        <div class="field-label">Transform</div>
        <select class="transform-select"
          aria-label="Value transform"
          .value=${this.transform || ''}
          @change=${(e) => this._onTransformChanged(e.target.value)}>
          ${(this.transforms || []).map(t => html`
            <option value=${t.value} ?selected=${t.value === this.transform}>${t.label}</option>
          `)}
        </select>

        <div class="divider"></div>

        <!-- HA Exposure toggle -->
        <div class="toggle-row">
          <span class="toggle-label">HA Exposure</span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${this.haExposed ? 'true' : 'false'}
            aria-label="Expose to Home Assistant"
            tabindex="0"
            @click=${this._onToggleHA}
            @keydown=${(e) => (e.key === 'Enter' || e.key === ' ') && this._onToggleHA()}>
            <div class="toggle ${this.haExposed ? 'on-green' : 'off'}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>

        <!-- Pin to Card toggle -->
        <div class="toggle-row" style="margin-top: 6px;">
          <span class="toggle-label">Pin to Card</span>
          <span class="toggle-wrap"
            role="switch"
            aria-checked=${this.pinned ? 'true' : 'false'}
            aria-label="Pin attribute to card"
            tabindex="0"
            @click=${this._onTogglePin}
            @keydown=${(e) => (e.key === 'Enter' || e.key === ' ') && this._onTogglePin()}>
            <div class="toggle ${this.pinned ? 'on-cyan' : 'off'}">
              <div class="toggle-knob"></div>
            </div>
          </span>
        </div>

        ${this.haExposed ? html`
          <div class="divider"></div>
          <span class="view-history" @click=${this._onViewHistory}>View History</span>
        ` : ''}
      </div>
    `;
  }

  // ── Event dispatchers ──────────────────────────────────────────────────────

  _fire(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  _onWarnChanged(value, op) {
    this._fire('threshold-changed', { name: this.attrName, value, op });
  }

  _onCritChanged(value, op) {
    this._fire('crit-threshold-changed', { name: this.attrName, value, op });
  }

  _onTransformChanged(transform) {
    this._fire('transform-changed', { attr: this.attrName, transform: transform || null });
  }

  _onToggleHA() {
    this._fire('ha-exposure-toggled', { name: this.attrName });
  }

  _onTogglePin() {
    this._fire('pin-attribute', { name: this.attrName, pinned: !this.pinned });
  }

  _onViewHistory() {
    this._fire('view-history', { name: this.attrName });
  }

  _onClose() {
    this._fire('close-popover');
  }
}

customElements.define('attribute-popover', AttributePopover);

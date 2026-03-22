import { LitElement, html, css } from 'lit';

/**
 * device-config — agent configuration: collection interval, active plugins,
 * custom sensors table, push config.
 *
 * Properties:
 *   device         {Object}  — full device record
 *   configInterval {Number}  — current collection interval value
 *   customSensors  {Object}  — sensor map (name → {command, interval, unit})
 *   pushing        {Boolean} — true while a push request is in flight
 *   pushStatus     {String}  — status text after push
 *   lastPushed     {String}  — time string of last successful push
 *
 * Events fired:
 *   interval-changed   {value}                    — user edited interval input
 *   sensor-save        {key, sensor, oldKey}       — user saved add/edit sensor form
 *   sensor-remove      {key}                       — user removed a sensor
 *   push-config        {}                          — user clicked Push Config
 */
class DeviceConfig extends LitElement {
  static properties = {
    device:         { type: Object },
    configInterval: { type: Number },
    customSensors:  { type: Object },
    pushing:        { type: Boolean },
    pushStatus:     { type: String },
    lastPushed:     { type: String },
    _showAddSensor: { type: Boolean, state: true },
    _editSensorKey: { type: String,  state: true },
    _sensorForm:    { type: Object,  state: true },
  };

  static styles = css`
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    .config-row { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
    .config-label { font-size: 12px; color: #888; min-width: 120px; }
    .config-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 10px; font-size: 13px; width: 100px;
    }
    .config-input:focus { outline: none; border-color: #4fc3f7; }
    .plugins-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .plugin-badge {
      background: #1a1a2e; color: #888; padding: 3px 10px;
      border-radius: 4px; font-size: 11px;
    }

    /* Sensor table */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid #3a3a5a;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 7px 8px; border-bottom: 1px solid #2a2a4a;
      font-family: monospace;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #4fc3f7; }
    .sensor-btn.edit:hover  { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    /* Sensor form */
    .sensor-form {
      background: #1a1a2e; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr 80px 80px; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-grid input::placeholder { color: #555; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    /* cmd-btn (used for Add Sensor button) */
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }

    /* Push config */
    .push-row { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .push-btn {
      background: #2e7d32; border: none; color: #fff; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .push-btn:hover    { background: #388e3c; }
    .push-btn:disabled { opacity: 0.5; cursor: default; }
    .push-status        { font-size: 12px; color: #888; }
    .push-status.synced { color: #81c784; }
    .push-status.pending{ color: #ffb74d; }
  `;

  constructor() {
    super();
    this.device         = null;
    this.configInterval = 30;
    this.customSensors  = {};
    this.pushing        = false;
    this.pushStatus     = '';
    this.lastPushed     = '';
    this._showAddSensor = false;
    this._editSensorKey = null;
    this._sensorForm    = { name: '', command: '', interval: 30, unit: '' };
  }

  render() {
    if (!this.device) return html``;
    const rc      = this.device.remote_config || {};
    const plugins = this.device.active_plugins || (rc.plugins ? Object.keys(rc.plugins) : []);
    const sensors = this.customSensors;

    return html`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this.configInterval)}
            @input=${(e) => this._onIntervalChange(Number(e.target.value))}>
          <span style="font-size: 12px; color: #666; margin-left: 4px;">seconds</span>
        </div>

        ${plugins.length > 0 ? html`
          <div class="config-row">
            <span class="config-label">Active plugins</span>
            <div class="plugins-list">
              ${plugins.map(p => html`<span class="plugin-badge">${p}</span>`)}
            </div>
          </div>
        ` : ''}

        <div style="margin-bottom: 10px;">
          <div class="section-title" style="margin-bottom: 8px;">Custom Sensors</div>
          ${Object.keys(sensors).length > 0 ? html`
            <table class="sensor-table">
              <thead>
                <tr>
                  <th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(sensors).map(([key, s]) => html`
                  <tr>
                    <td>${key}</td>
                    <td>${s.command}</td>
                    <td>${s.interval}s</td>
                    <td>${s.unit || '—'}</td>
                    <td>
                      <div class="sensor-actions">
                        <button class="sensor-btn edit"   @click=${() => this._startEdit(key, s)}>Edit</button>
                        <button class="sensor-btn remove" @click=${() => this._onRemove(key)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          ` : html`<div style="font-size: 13px; color: #555; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor || this._editSensorKey ? this._renderSensorForm() : html`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAdd}>+ Add Sensor</button>
          `}
        </div>

        ${this.device.allowed_commands?.length > 0 ? html`
          <div class="config-row" style="margin-bottom: 0;">
            <span class="config-label" style="color: #666;">Allowed commands</span>
            <div style="font-size: 12px; color: #666;">${(this.device.allowed_commands || []).join(', ')}</div>
          </div>
        ` : ''}

        <div class="push-row">
          <button class="push-btn" ?disabled=${this.pushing} @click=${this._onPush}>
            ${this.pushing ? 'Pushing...' : 'Push Config'}
          </button>
          ${this.lastPushed ? html`
            <span class="push-status">Last pushed: ${this.lastPushed}</span>
          ` : ''}
          ${this.pushStatus ? html`
            <span class="push-status ${this.pushStatus === 'Config synced' ? 'synced' : 'pending'}">
              ${this.pushStatus}
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }

  _renderSensorForm() {
    const f = this._sensorForm;
    return html`
      <div class="sensor-form">
        <div class="sensor-form-grid">
          <input type="text" placeholder="Name (e.g. ping_gw)"
            .value=${f.name}
            @input=${(e) => this._sensorForm = { ...f, name: e.target.value }}>
          <input type="text" placeholder="Command (e.g. ping -c1 10.0.0.1)"
            .value=${f.command}
            @input=${(e) => this._sensorForm = { ...f, command: e.target.value }}>
          <input type="number" placeholder="60"
            .value=${String(f.interval)}
            @input=${(e) => this._sensorForm = { ...f, interval: Number(e.target.value) }}>
          <input type="text" placeholder="Unit"
            .value=${f.unit}
            @input=${(e) => this._sensorForm = { ...f, unit: e.target.value }}>
        </div>
        <div class="sensor-form-actions">
          <button class="form-btn save"   @click=${this._saveForm}>Save</button>
          <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
        </div>
      </div>
    `;
  }

  // ── Form helpers ───────────────────────────────────────────────────────────

  _startAdd() {
    this._showAddSensor = true;
    this._editSensorKey = null;
    this._sensorForm    = { name: '', command: '', interval: 30, unit: '' };
  }

  _startEdit(key, s) {
    this._editSensorKey = key;
    this._showAddSensor = false;
    this._sensorForm    = { name: key, command: s.command, interval: s.interval || 30, unit: s.unit || '' };
  }

  _saveForm() {
    const { name, command, interval, unit } = this._sensorForm;
    if (!name.trim() || !command.trim()) return;
    this.dispatchEvent(new CustomEvent('sensor-save', {
      detail: { key: name.trim(), sensor: { command, interval: interval || 30, unit }, oldKey: this._editSensorKey },
      bubbles: true, composed: true,
    }));
    this._cancelForm();
  }

  _cancelForm() {
    this._showAddSensor = false;
    this._editSensorKey = null;
    this._sensorForm    = { name: '', command: '', interval: 30, unit: '' };
  }

  // ── Event dispatchers ──────────────────────────────────────────────────────

  _onIntervalChange(value) {
    this.dispatchEvent(new CustomEvent('interval-changed', { detail: { value }, bubbles: true, composed: true }));
  }

  _onRemove(key) {
    this.dispatchEvent(new CustomEvent('sensor-remove', { detail: { key }, bubbles: true, composed: true }));
  }

  _onPush() {
    this.dispatchEvent(new CustomEvent('push-config', { bubbles: true, composed: true }));
  }
}

customElements.define('device-config', DeviceConfig);

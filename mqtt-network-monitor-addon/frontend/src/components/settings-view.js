import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { fetchSettings, updateSettings, exportSettings, importSettings } from '../services/api.js';
import { setCustomTransforms, safeEval } from '../utils/transforms.js';
import './tag-registry-settings.js';


// Global threshold add form (module-level ephemeral state)
const _globalThresholdForm = { attr: '', value: '' };
const _customTransformForm = { name: '', expression: '' };

class SettingsView extends LitElement {
  static properties = {
    _settings: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _savingSettings: { type: Boolean, state: true },
    _settingsSaved: { type: Boolean, state: true },
    _editingTransformIndex: { type: Number, state: true },
    _transformError: { type: String, state: true },
    _importStatus: { type: String, state: true },
  };

  static styles = [sharedStyles, css`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    h2 { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 16px; margin-top: 0; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }
    .settings-input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .settings-input:focus { outline: none; border-color: #00D4FF; }
    .save-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .save-btn:hover { background: #33DDFF; }
    .save-btn:disabled { opacity: 0.5; cursor: default; }
    .saved-msg { font-size: 12px; color: #04d65c; margin-left: 10px; }
    .small-input {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #00D4FF; }
    .small-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #33DDFF; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #fff; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .loading { padding: 40px; text-align: center; color: #fff; }

    @media (max-width: 768px) {
      :host { padding: 12px; }
    }
  `];

  constructor() {
    super();
    this._settings = null;
    this._loading = true;
    this._savingSettings = false;
    this._settingsSaved = false;
    this._transformError = '';
    this._editingTransformIndex = -1;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadSettings();
  }

  async _loadSettings() {
    this._loading = true;
    try {
      this._settings = await fetchSettings().catch(() => ({}));
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) return html`<div class="loading">Loading settings...</div>`;

    return html`
      <h2>Settings</h2>
      <tag-registry-settings></tag-registry-settings>
      ${this._renderCustomTransforms()}
      ${this._renderGlobalDefaults()}
      ${this._renderDeviceManagement()}
      ${this._renderExportImport()}
    `;
  }

  // ── Custom Transforms ─────────────────────────────────────────────────────

  _renderCustomTransforms() {
    const transforms = (this._settings || {}).custom_transforms || [];
    const form = _customTransformForm;

    return html`
      <div class="section">
        <div class="section-title">Custom Transforms</div>
        <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 12px;">
          Define JS expressions to transform attribute values. Use <code style="color: #00D4FF;">value</code> as the input variable.
        </div>

        ${transforms.map((t, i) => html`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 120px;">${t.name}</span>
            <code style="font-size: 11px; color: rgba(255,255,255,0.5); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.expression}</code>
            <button class="icon-btn" style="color: #00D4FF;"
              @click=${() => this._editCustomTransform(i)}>Edit</button>
            <button class="icon-btn delete"
              @click=${() => this._removeCustomTransform(i)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Name (e.g. C to F)"
            style="width: 150px;"
            .value=${form.name}
            @input=${(e) => { _customTransformForm.name = e.target.value; this.requestUpdate(); }}>
          <input class="small-input" type="text" placeholder="Expression (e.g. value * 1.8 + 32)"
            style="flex: 1; min-width: 200px;"
            .value=${form.expression}
            @input=${(e) => { _customTransformForm.expression = e.target.value; this.requestUpdate(); }}>
          <button class="small-btn" @click=${this._addCustomTransform.bind(this)}>${this._editingTransformIndex >= 0 ? 'Save' : 'Add'}</button>
          ${this._editingTransformIndex >= 0 ? html`<button class="small-btn" style="background: rgba(255,255,255,0.1); color: #fff;" @click=${() => this._cancelEditTransform()}>Cancel</button>` : ''}
        </div>

        ${this._transformError ? html`<div style="font-size: 11px; color: #ef5350; margin-top: 6px;">${this._transformError}</div>` : ''}
      </div>
    `;
  }

  _editCustomTransform(index) {
    const transforms = (this._settings || {}).custom_transforms || [];
    const t = transforms[index];
    if (!t) return;
    _customTransformForm.name = t.name;
    _customTransformForm.expression = t.expression;
    this._editingTransformIndex = index;
    this._transformError = '';
    this.requestUpdate();
  }

  _cancelEditTransform() {
    _customTransformForm.name = '';
    _customTransformForm.expression = '';
    this._editingTransformIndex = -1;
    this._transformError = '';
    this.requestUpdate();
  }

  _addCustomTransform() {
    const name = (_customTransformForm.name || '').trim();
    const expression = (_customTransformForm.expression || '').trim();
    this._transformError = '';

    if (!name || !expression) {
      this._transformError = 'Name and expression are required.';
      return;
    }

    // Validate expression
    try {
      safeEval(expression, 0);
    } catch (e) {
      this._transformError = `Invalid expression: ${e.message}`;
      return;
    }

    const s = this._settings || {};
    const existing = [...(s.custom_transforms || [])];

    if (this._editingTransformIndex >= 0) {
      // Editing existing transform — update in place, keep the same id
      existing[this._editingTransformIndex] = { ...existing[this._editingTransformIndex], name, expression };
      this._editingTransformIndex = -1;
    } else {
      // Adding new transform
      const id = 'custom:' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      if (existing.some(t => t.id === id)) {
        this._transformError = 'A transform with this name already exists.';
        return;
      }
      existing.push({ id, name, expression });
    }

    this._settings = { ...s, custom_transforms: existing };

    _customTransformForm.name = '';
    _customTransformForm.expression = '';
    this.requestUpdate();
    this._saveSettings();
  }

  _removeCustomTransform(index) {
    const s = this._settings || {};
    const transforms = [...(s.custom_transforms || [])];
    transforms.splice(index, 1);
    this._settings = { ...s, custom_transforms: transforms };
    this._saveSettings();
  }

  // ── Global Defaults ───────────────────────────────────────────────────────

  _renderGlobalDefaults() {
    const s = this._settings || {};
    const t = s.default_thresholds || {};
    const form = _globalThresholdForm;

    return html`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #fff; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(t).filter(k => t[k] != null).map(key => html`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.8); min-width: 140px;">${key}</span>
            <input class="settings-input" type="number" style="width: 90px;"
              .value=${String(t[key])}
              @input=${(e) => this._updateDefaultThreshold(key, e.target.value)}>
            <button class="icon-btn delete"
              @click=${() => this._removeDefaultThreshold(key)}>Remove</button>
          </div>
        `)}

        <div style="display: flex; gap: 6px; align-items: center; margin-top: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <input class="small-input" type="text" placeholder="Attribute name..."
            style="width: 150px;"
            .value=${form.attr}
            @input=${(e) => { _globalThresholdForm.attr = e.target.value; this.requestUpdate(); }}>
          <input class="small-input" type="number" placeholder="Value..."
            style="width: 90px;"
            .value=${form.value}
            @input=${(e) => { _globalThresholdForm.value = e.target.value; this.requestUpdate(); }}>
          <button class="small-btn" @click=${this._addDefaultThreshold.bind(this)}>Add threshold</button>
        </div>

        <div style="display: flex; align-items: center; margin-top: 12px; padding-bottom: 4px;">
          <button class="save-btn" ?disabled=${this._savingSettings}
            @click=${this._saveSettings}>
            ${this._savingSettings ? 'Saving...' : 'Save Defaults'}
          </button>
          ${this._settingsSaved ? html`<span class="saved-msg">Saved!</span>` : ''}
        </div>
      </div>
    `;
  }

  _updateDefaultThreshold(key, value) {
    const s = this._settings || {};
    this._settings = {
      ...s,
      default_thresholds: {
        ...(s.default_thresholds || {}),
        [key]: value === '' ? null : Number(value),
      },
    };
  }

  _removeDefaultThreshold(key) {
    const s = this._settings || {};
    const updated = { ...(s.default_thresholds || {}) };
    delete updated[key];
    this._settings = { ...s, default_thresholds: updated };
  }

  _addDefaultThreshold() {
    const attr = (_globalThresholdForm.attr || '').trim();
    const value = (_globalThresholdForm.value || '').trim();
    if (!attr || value === '') return;
    this._updateDefaultThreshold(attr, value);
    _globalThresholdForm.attr = '';
    _globalThresholdForm.value = '';
    this.requestUpdate();
  }

  // ── Device Management ──────────────────────────────────────────────────────

  _renderDeviceManagement() {
    const s = this._settings || {};
    const cleanupDays = s.device_cleanup_days ?? 0;
    const cooldownMinutes = s.alert_cooldown_minutes ?? 30;

    return html`
      <div class="section">
        <div class="section-title">Device Management</div>

        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Auto-Cleanup Offline Devices</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <select class="small-input" style="width: 140px;"
                .value=${String(cleanupDays)}
                @change=${(e) => {
                  this._settings = { ...this._settings, device_cleanup_days: Number(e.target.value) };
                  this._saveSettings();
                }}>
                <option value="0">Disabled</option>
                <option value="1">After 1 day</option>
                <option value="3">After 3 days</option>
                <option value="7">After 7 days</option>
                <option value="14">After 14 days</option>
                <option value="30">After 30 days</option>
              </select>
            </div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 4px;">
              Automatically remove devices that have been offline longer than this.
            </div>
          </div>

          <div style="flex: 1; min-width: 200px;">
            <div style="font-size: 11px; color: #fff; margin-bottom: 6px;">Alert Cooldown</div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <select class="small-input" style="width: 140px;"
                .value=${String(cooldownMinutes)}
                @change=${(e) => {
                  this._settings = { ...this._settings, alert_cooldown_minutes: Number(e.target.value) };
                  this._saveSettings();
                }}>
                <option value="0">Disabled</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="360">6 hours</option>
              </select>
            </div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.3); margin-top: 4px;">
              HA notification cooldown for critical threshold alerts.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Export / Import ────────────────────────────────────────────────────────

  _renderExportImport() {
    return html`
      <div class="section">
        <div class="section-title">Export / Import</div>
        <div style="font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 12px;">
          Export or import settings, group policies, and topology layouts as JSON.
        </div>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button class="save-btn" @click=${this._exportSettings}>Export</button>
          <button class="save-btn" style="background: rgba(255,255,255,0.1); color: #fff;"
            @click=${() => this.shadowRoot.querySelector('#import-file').click()}>Import</button>
          <input id="import-file" type="file" accept=".json" style="display: none;"
            @change=${this._importFile}>
          ${this._importStatus ? html`<span style="font-size: 12px; color: ${this._importStatus.startsWith('Error') ? '#ef5350' : '#04d65c'};">${this._importStatus}</span>` : ''}
        </div>
      </div>
    `;
  }

  async _exportSettings() {
    try {
      const data = await exportSettings();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mqtt-monitor-settings-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed:', e);
    }
  }

  async _importFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    this._importStatus = '';
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.version) {
        this._importStatus = 'Error: Invalid export file.';
        return;
      }
      await importSettings(data);
      this._importStatus = 'Imported successfully!';
      this._loadSettings();
      setTimeout(() => { this._importStatus = ''; }, 3000);
    } catch (e) {
      this._importStatus = `Error: ${e.message}`;
    }
    e.target.value = '';
  }

  async _saveSettings() {
    this._savingSettings = true;
    this._settingsSaved = false;
    try {
      await updateSettings(this._settings);
      setCustomTransforms(this._settings.custom_transforms || []);
      this._settingsSaved = true;
      setTimeout(() => { this._settingsSaved = false; }, 2000);
    } catch (e) {
      console.error('Failed to save settings:', e);
    } finally {
      this._savingSettings = false;
    }
  }
}

customElements.define('settings-view', SettingsView);

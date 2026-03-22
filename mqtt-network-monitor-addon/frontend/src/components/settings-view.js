import { LitElement, html, css } from 'lit';
import { fetchSettings, updateSettings } from '../services/api.js';
import './tag-registry-settings.js';
import './group-policy-settings.js';

// Global threshold add form (module-level ephemeral state)
const _globalThresholdForm = { attr: '', value: '' };

class SettingsView extends LitElement {
  static properties = {
    _settings: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _savingSettings: { type: Boolean, state: true },
    _settingsSaved: { type: Boolean, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    h2 { font-size: 20px; font-weight: 700; color: #e0e0e0; margin-bottom: 16px; margin-top: 0; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }
    .settings-input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .settings-input:focus { outline: none; border-color: #4fc3f7; }
    .save-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .save-btn:hover { background: #81d4fa; }
    .save-btn:disabled { opacity: 0.5; cursor: default; }
    .saved-msg { font-size: 12px; color: #81c784; margin-left: 10px; }
    .small-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px;
    }
    .small-input:focus { outline: none; border-color: #4fc3f7; }
    .small-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .small-btn:hover { background: #81d4fa; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    .loading { padding: 40px; text-align: center; color: #666; }
  `;

  constructor() {
    super();
    this._settings = null;
    this._loading = true;
    this._savingSettings = false;
    this._settingsSaved = false;
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
      <group-policy-settings></group-policy-settings>
      ${this._renderGlobalDefaults()}
    `;
  }

  // ── Global Defaults ───────────────────────────────────────────────────────

  _renderGlobalDefaults() {
    const s = this._settings || {};
    const t = s.default_thresholds || {};
    const form = _globalThresholdForm;

    return html`
      <div class="section">
        <div class="section-title">Global Defaults</div>

        <div style="font-size: 11px; color: #888; margin-bottom: 10px;">Default Warning Thresholds</div>

        ${Object.keys(t).filter(k => t[k] != null).map(key => html`
          <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 12px; color: #ccc; min-width: 140px;">${key}</span>
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

        <div style="display: flex; align-items: center;">
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

  async _saveSettings() {
    this._savingSettings = true;
    this._settingsSaved = false;
    try {
      await updateSettings(this._settings);
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

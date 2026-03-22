import { LitElement, html, css } from 'lit';
import {
  fetchDevice, deleteDevice, deleteAttribute, unhideAttribute, hideCommand, unhideCommand, sendCommand, addDeviceTags, removeDeviceTag,
  fetchGroups, createGroup, updateGroup,
  fetchEffectiveSettings, updateDeviceSettings, pushDeviceConfig,
} from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './tag-picker.js';

const DANGEROUS_COMMANDS = ['shutdown', 'halt', 'poweroff', 'destroy'];

function isDangerous(cmd) {
  const lower = cmd.toLowerCase();
  return DANGEROUS_COMMANDS.some(d => lower.includes(d));
}

class DeviceDetail extends LitElement {
  static properties = {
    deviceId: { type: String },
    device: { type: Object },
    commandResult: { type: String },
    _groups: { type: Object, state: true },
    _effectiveSettings: { type: Object, state: true },
    _haOverrides: { type: Object, state: true },
    _configInterval: { type: Number, state: true },
    _customSensors: { type: Object, state: true },
    _showAddSensor: { type: Boolean, state: true },
    _editSensorKey: { type: String, state: true },
    _sensorForm: { type: Object, state: true },
    _pushing: { type: Boolean, state: true },
    _pushStatus: { type: String, state: true },
    _lastPushed: { type: String, state: true },
    _localChanges: { type: Boolean, state: true },
    _showGroupDialog: { type: Boolean, state: true },
    _newGroupName: { type: String, state: true },
    _serverCommands: { type: Object, state: true },
    _newCommandName: { type: String, state: true },
    _newCommandShell: { type: String, state: true },
    _showHidden: { type: Boolean, state: true },
    _showHiddenCmds: { type: Boolean, state: true },
    _showAddCommand: { type: Boolean, state: true },
    _editingCommandName: { type: String, state: true },
    _editCommandForm: { type: Object, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    .close-btn {
      background: none; border: none; color: #666; cursor: pointer;
      font-size: 20px; padding: 4px 8px; line-height: 1; border-radius: 4px;
      transition: all 0.15s;
    }
    .close-btn:hover { color: #ccc; background: rgba(255,255,255,0.05); }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .header-left { display: flex; flex-direction: column; gap: 2px; }
    .title { font-size: 24px; font-weight: 700; }
    .device-type { font-size: 12px; color: #666; }
    .status-badge {
      padding: 4px 12px; border-radius: 12px; font-size: 13px;
    }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    /* Tags */
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 10px; }
    .tag {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; padding: 3px 10px; border-radius: 4px;
    }
    .tag.client { background: #1e3a5f; color: #4fc3f7; }
    .tag.server { background: #3a1e5f; color: #ce93d8; }
    .tag .remove { cursor: pointer; font-size: 13px; line-height: 1; opacity: 0.6; }
    .tag .remove:hover { opacity: 1; }
    .tag-hint { font-size: 10px; color: #555; margin-top: 8px; }

    /* Group policy */
    .group-policy-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .group-select {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 6px;
      color: #e0e0e0; padding: 6px 12px; font-size: 13px; min-width: 200px;
    }
    .group-select:focus { outline: none; border-color: #4fc3f7; }
    .group-threshold-summary {
      font-size: 11px; color: #666; display: flex; gap: 12px; flex-wrap: wrap;
      margin-top: 8px;
    }
    .group-hint { font-size: 10px; color: #555; margin-top: 8px; }

    /* Attributes + HA exposure */
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
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 4px; }
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
    .attr-ha-status {
      font-size: 10px; color: #555; margin-top: 4px;
    }
    .attr-ha-status.exposed { color: #4fc3f7; }
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

    /* Toggle switch */
    .toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .toggle {
      width: 32px; height: 18px; border-radius: 9px; position: relative;
      transition: background 0.2s;
    }
    .toggle.on { background: #4fc3f7; }
    .toggle.off { background: #444; }
    .toggle-knob {
      width: 14px; height: 14px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .toggle.on .toggle-knob { left: 16px; }
    .toggle.off .toggle-knob { left: 2px; }

    /* Thresholds */
    .threshold-list {
      display: flex; gap: 8px; flex-wrap: wrap; align-items: center;
    }
    .threshold-pill {
      display: flex; align-items: center; gap: 4px;
      background: #1a1a2e; border-radius: 6px; padding: 5px 10px;
      font-size: 12px;
    }
    .threshold-pill.exceeded {
      background: rgba(255,183,77,0.12); border: 1px solid rgba(255,183,77,0.3);
    }
    .threshold-attr { color: #888; }
    .threshold-val { color: #4fc3f7; font-weight: 600; }
    .threshold-pill.exceeded .threshold-val { color: #ffb74d; }
    .threshold-source {
      font-size: 10px; color: #555; margin-left: 2px;
    }

    /* Network */
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item { font-size: 13px; color: #aaa; }
    .net-label { color: #666; margin-right: 8px; }

    /* Commands */
    .commands { display: flex; gap: 8px; flex-wrap: wrap; }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 8px; padding: 8px 12px; background: #1a1a2e;
      border-radius: 4px; font-size: 12px; color: #aaa; font-family: monospace;
    }
    .no-commands { font-size: 13px; color: #666; font-style: italic; }

    /* Agent configuration */
    .config-row { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
    .config-label { font-size: 12px; color: #888; min-width: 120px; }
    .config-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 10px; font-size: 13px; width: 100px;
    }
    .config-input:focus { outline: none; border-color: #4fc3f7; }
    .plugins-list {
      display: flex; gap: 6px; flex-wrap: wrap;
    }
    .plugin-badge {
      background: #1a1a2e; color: #888; padding: 3px 10px;
      border-radius: 4px; font-size: 11px;
    }

    /* Custom sensors table */
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
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
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
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    /* Push config button */
    .push-row { display: flex; align-items: center; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
    .push-btn {
      background: #2e7d32; border: none; color: #fff; padding: 8px 20px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all 0.2s;
    }
    .push-btn:hover { background: #388e3c; }
    .push-btn:disabled { opacity: 0.5; cursor: default; }
    .push-status { font-size: 12px; color: #888; }
    .push-status.synced { color: #81c784; }
    .push-status.pending { color: #ffb74d; }

    /* Dialog overlay */
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 320px; border: 1px solid #3a3a5a;
    }
    .dialog h3 { color: #e0e0e0; margin-bottom: 12px; font-size: 16px; margin-top: 0; }
    .dialog-field { margin-bottom: 12px; }
    .dialog-field label { display: block; font-size: 11px; color: #888; margin-bottom: 4px; }
    .dialog-field input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 6px; color: #e0e0e0; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .dialog-field input:focus { outline: none; border-color: #4fc3f7; }
    .dialog-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .dialog-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .dialog-btn.cancel { background: #3a3a5a; color: #aaa; }
  `;

  constructor() {
    super();
    this.device = null;
    this.commandResult = '';
    this._groups = {};
    this._effectiveSettings = null;
    this._haOverrides = {};
    this._configInterval = 30;
    this._customSensors = {};
    this._showAddSensor = false;
    this._editSensorKey = null;
    this._sensorForm = { name: '', command: '', interval: 30, unit: '' };
    this._pushing = false;
    this._pushStatus = '';
    this._lastPushed = '';
    this._localChanges = false;
    this._showGroupDialog = false;
    this._newGroupName = '';
    this._serverCommands = {};
    this._newCommandName = '';
    this._newCommandShell = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevice();
    this._loadGroups();
    this._startPolling();
    this._wsUnsub = wsService.onMessage((data) => {
      if (data.type === 'device_update' && data.device_id === this.deviceId) {
        this._updateDeviceData(data.device);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._wsUnsub) this._wsUnsub();
    if (this._pollTimer) clearInterval(this._pollTimer);
  }

  _startPolling() {
    if (this._pollTimer) clearInterval(this._pollTimer);
    const interval = parseInt(localStorage.getItem('mqtt-monitor-refresh') || '5') * 1000;
    this._pollTimer = setInterval(() => this._refreshDevice(), interval);
  }

  async _refreshDevice() {
    try {
      const device = await fetchDevice(this.deviceId);
      this._updateDeviceData(device);
    } catch (e) {
      // ignore polling errors
    }
  }

  _updateDeviceData(device) {
    if (!device) return;
    // Update attributes and status without resetting user-edited fields
    const current = this.device || {};
    this.device = {
      ...current,
      ...device,
    };
  }

  async _loadDevice() {
    try {
      this.device = await fetchDevice(this.deviceId);
      // Seed local HA overrides from device
      this._haOverrides = { ...(this.device.ha_exposure_overrides || {}) };
      // Seed server-side commands (dict: name → shell_cmd)
      const sc = this.device.server_commands;
      this._serverCommands = (sc && !Array.isArray(sc)) ? { ...sc } : {};
      // Seed config state — prefer live collection_interval from device, fall back to remote_config
      this._configInterval = this.device.collection_interval || (this.device.remote_config?.interval) || 30;
      if (this.device.remote_config) {
        const cc = this.device.remote_config.plugins?.custom_command?.commands || {};
        this._customSensors = { ...cc };
      }
      // Load effective settings to know what the group policy provides
      try {
        this._effectiveSettings = await fetchEffectiveSettings(this.deviceId);
      } catch (_) {}
    } catch (e) {
      console.error('Failed to load device:', e);
    }
  }

  async _loadGroups() {
    try {
      this._groups = await fetchGroups();
    } catch (e) {
      console.error('Failed to load groups:', e);
    }
  }

  render() {
    if (!this.device) return html`<div style="padding: 40px; text-align: center; color: #888;">Loading...</div>`;
    const d = this.device;
    const statusColor = d.status === 'online' ? '#81c784' : d.status === 'offline' ? '#ef5350' : '#ffb74d';

    return html`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          <span class="title">${d.device_name || this.deviceId}</span>
          <span class="device-type">${d.device_type || ''}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="status-badge" style="background: ${statusColor}20; color: ${statusColor}">
            ${d.status}
          </span>
          <button class="cmd-btn danger" style="font-size: 11px; padding: 4px 10px;"
            @click=${this._deleteDevice}>Delete</button>
          <button class="close-btn" @click=${() => this.dispatchEvent(new CustomEvent('back'))}>&#10005;</button>
        </div>
      </div>

      <!-- 2. Tags -->
      ${this._renderTagsSection()}

      <!-- 3. Group Policy -->
      ${this._renderGroupPolicy()}

      <!-- 4. Attributes + HA Exposure + Thresholds -->
      ${this._renderAttributesSection()}

      <!-- 5. Network -->
      ${this._renderNetwork()}

      <!-- 6. Commands -->
      ${this._renderCommands()}

      <!-- 7. Agent Configuration -->
      ${this._renderAgentConfig()}

      ${this._showGroupDialog ? this._renderGroupDialog() : ''}
    `;
  }

  // ── Section 2: Tags ────────────────────────────────────────────────────────

  _renderTagsSection() {
    const clientTags = this.device.tags || [];
    const serverTags = this.device.server_tags || [];

    return html`
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${clientTags.map(t => html`<span class="tag client">${t}</span>`)}
          ${serverTags.map(t => html`
            <span class="tag server">
              ${t}
              <span class="remove" @click=${() => this._removeTag(t)}>&times;</span>
            </span>
          `)}
          <tag-picker
            .selectedTags=${serverTags}
            @tag-add=${(e) => this._addTag(e.detail.tag)}
            @tag-remove=${(e) => this._removeTag(e.detail.tag)}
          ></tag-picker>
        </div>
        <div class="tag-hint">
          Client tags (blue) come from the device config. Server tags (purple) are managed here.
        </div>
      </div>
    `;
  }

  // ── Section 3: Group Policy ────────────────────────────────────────────────

  _renderGroupPolicy() {
    const groups = Object.values(this._groups);
    const currentGroupId = this.device.group_policy || '';
    const currentGroup = currentGroupId ? this._groups[currentGroupId] : null;
    const groupThresholds = currentGroup?.thresholds || {};

    return html`
      <div class="section">
        <div class="section-title">Group Policy</div>
        <div class="group-policy-row">
          <select class="group-select"
            .value=${currentGroupId}
            @change=${this._onGroupPolicyChange}>
            <option value="">None — use global defaults</option>
            ${groups.map(g => html`
              <option value=${g.id} ?selected=${g.id === currentGroupId}>${g.name}</option>
            `)}
          </select>
          <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
            @click=${() => this._showGroupDialog = true}>New Group</button>
        </div>

        ${currentGroup && Object.keys(groupThresholds).length > 0 ? html`
          <div class="group-threshold-summary">
            ${Object.entries(groupThresholds).map(([k, v]) => html`
              <span><span style="color: #888;">${k.replace(/_/g, ' ')}:</span> ${v}</span>
            `)}
          </div>
        ` : ''}

        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
        </div>
      </div>
    `;
  }

  async _onGroupPolicyChange(e) {
    const groupId = e.target.value || null;
    try {
      await updateDeviceSettings(this.deviceId, { group_policy: groupId });
      await this._loadDevice();
    } catch (err) {
      console.error('Failed to update group policy:', err);
    }
  }

  // ── Section 4: Attributes + HA Exposure ───────────────────────────────────

  _renderAttributesSection() {
    const allAttrs = Object.entries(this.device.attributes || {});
    const hidden = this.device.hidden_attributes || [];
    const visibleAttrs = allAttrs.filter(([name]) => !hidden.includes(name));
    const hiddenAttrs = allAttrs.filter(([name]) => hidden.includes(name));

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
                      @click=${() => this._unhideAttribute(name)}>show</span>
                  </span>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  _isExposed(name) {
    // Device override takes priority, then group, then expose all by default
    if (this._haOverrides[name] !== undefined) return this._haOverrides[name];
    const es = this._effectiveSettings;
    if (es?.ha_exposure_overrides?.[name] !== undefined) return es.ha_exposure_overrides[name];
    // Default: exposed
    return true;
  }

  _fromGroup(name) {
    if (this._haOverrides[name] !== undefined) return false;
    const es = this._effectiveSettings;
    return es?.ha_exposure_overrides?.[name] !== undefined;
  }

  _getThresholdForAttr(name) {
    const es = this._effectiveSettings;
    if (!es) return null;
    const thresholds = es.thresholds || {};
    const val = thresholds[name];
    if (val == null) return null;

    // Determine source
    const deviceOverrides = this.device.threshold_overrides || {};
    const groupId = this.device.group_policy;
    const group = groupId ? this._groups[groupId] : null;
    let source = 'global';
    if (deviceOverrides[name] != null) source = 'device';
    else if (group && group.thresholds && group.thresholds[name] != null) source = 'group';

    return { value: val, source };
  }

  _checkThreshold(currentVal, threshold) {
    if (!threshold || currentVal == null || typeof currentVal !== 'number') return false;
    const val = typeof threshold === 'object' ? threshold.value : threshold;
    const op = typeof threshold === 'object' ? (threshold.op || '>') : '>';
    if (val == null) return false;
    switch (op) {
      case '>': return currentVal > val;
      case '<': return currentVal < val;
      case '>=': return currentVal >= val;
      case '<=': return currentVal <= val;
      case '==': return currentVal === val;
      case '!=': return currentVal !== val;
      default: return currentVal > val;
    }
  }

  _getThresholdOp(name) {
    const overrides = this.device.threshold_overrides || {};
    const local = overrides[name];
    if (local != null && typeof local === 'object') return local.op || '>';
    const es = this._effectiveSettings;
    if (!es) return '>';
    const t = (es.thresholds || {})[name];
    if (t != null && typeof t === 'object') return t.op || '>';
    return '>';
  }

  _getThresholdVal(name) {
    const overrides = this.device.threshold_overrides || {};
    const local = overrides[name];
    if (local != null) return typeof local === 'object' ? local.value : local;
    const threshold = this._getThresholdForAttr(name);
    return threshold ? threshold.value : null;
  }

  _renderAttrTile(name, data) {
    const exposed = this._isExposed(name);
    const threshold = this._getThresholdForAttr(name);
    const currentVal = data.value != null ? data.value : null;
    const thresholdOverrides = this.device.threshold_overrides || {};
    const localThreshold = thresholdOverrides[name];
    const effectiveThreshold = localThreshold != null ? localThreshold : (threshold ? threshold.value : null);
    const exceeded = this._checkThreshold(currentVal, effectiveThreshold);
    const currentOp = this._getThresholdOp(name);
    const currentThreshVal = this._getThresholdVal(name);

    return html`
      <div class="attr-tile ${exposed ? '' : 'dimmed'} ${exceeded ? 'exceeded' : ''}">
        <div class="attr-tile-top">
          <span class="attr-label">${name.replace(/_/g, ' ')}
            <span class="attr-delete" title="Remove attribute"
              @click=${() => this._deleteAttribute(name)}>&times;</span>
          </span>
          <span class="toggle-wrap" @click=${() => this._toggleHaExposure(name)}>
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
            .value=${currentOp}
            @change=${(e) => this._setThreshold(name, currentThreshVal, e.target.value)}>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
            <option value="==">==</option>
            <option value="!=">!=</option>
          </select>
          <input class="threshold-inline" type="number"
            placeholder="\u2014"
            .value=${currentThreshVal != null ? String(currentThreshVal) : ''}
            @change=${(e) => this._setThreshold(name, e.target.value, currentOp)}>
          ${threshold && threshold.source !== 'device' && localThreshold == null ? html`
            <span style="font-size: 8px; color: #555;">${threshold.source}</span>
          ` : ''}
        </div>
      </div>
    `;
  }

  async _deleteAttribute(name) {
    if (!confirm(`Hide attribute "${name}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`)) return;
    try {
      await deleteAttribute(this.deviceId, name);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to hide attribute:', e);
    }
  }

  async _unhideAttribute(name) {
    try {
      await unhideAttribute(this.deviceId, name);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to unhide attribute:', e);
    }
  }

  async _setThreshold(name, value, op) {
    const overrides = { ...(this.device.threshold_overrides || {}) };
    if (value === '' || value == null) {
      delete overrides[name];
    } else {
      overrides[name] = { op: op || '>', value: Number(value) };
    }
    try {
      await updateDeviceSettings(this.deviceId, { threshold_overrides: overrides });
      this.device = { ...this.device, threshold_overrides: overrides };
      this._effectiveSettings = await fetchEffectiveSettings(this.deviceId);
    } catch (e) {
      console.error('Failed to set threshold:', e);
    }
  }

  async _toggleHaExposure(name) {
    const current = this._isExposed(name);
    this._haOverrides = { ...this._haOverrides, [name]: !current };
    this._localChanges = true;
    try {
      await updateDeviceSettings(this.deviceId, { ha_exposure_overrides: this._haOverrides });
    } catch (e) {
      console.error('Failed to update HA exposure:', e);
    }
  }

  // ── Section 5: Network ────────────────────────────────────────────────────

  _renderNetwork() {
    const network = this.device.network || {};
    if (Object.keys(network).length === 0) return html``;

    return html`
      <div class="section">
        <div class="section-title">Network</div>
        <div class="network-grid">
          ${Object.entries(network).map(([key, val]) => html`
            <div class="net-item">
              <span class="net-label">${key}:</span>${val}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // ── Section 6: Commands ───────────────────────────────────────────────────

  _renderCommands() {
    const clientCommands = this.device.allowed_commands || [];
    const serverCmds = this._serverCommands || {};
    const serverCommandNames = Object.keys(serverCmds);
    const allCommandNames = [...new Set([...clientCommands, ...serverCommandNames])];
    const hidden = this.device.hidden_commands || [];
    const visibleCommands = allCommandNames.filter(c => !hidden.includes(c));
    const hiddenCommands = allCommandNames.filter(c => hidden.includes(c));

    return html`
      <div class="section">
        <div class="section-title">Commands</div>

        <!-- Run buttons -->
        ${visibleCommands.length > 0 ? html`
          <div class="commands" style="margin-bottom: 12px;">
            ${visibleCommands.map(cmd => html`
              <span style="display: inline-flex; align-items: center; gap: 0;">
                <button class="cmd-btn ${isDangerous(cmd) ? 'danger' : ''}"
                  @click=${() => this._sendCmd(cmd)}>
                  ${cmd}
                </button><span class="attr-delete" style="margin-left: -4px;" title="Hide command"
                  @click=${(e) => { e.stopPropagation(); this._hideCommand(cmd); }}>&times;</span>
              </span>
            `)}
          </div>
        ` : ''}
        ${this.commandResult ? html`<div class="cmd-result">${this.commandResult}</div>` : ''}

        <!-- Command table -->
        ${serverCommandNames.length > 0 ? html`
          <div style="margin-top: 8px; font-size: 11px; color: #555; margin-bottom: 6px;">Server-managed commands</div>
          <table class="sensor-table">
            <thead>
              <tr><th>Name</th><th>Shell Command</th><th></th></tr>
            </thead>
            <tbody>
              ${Object.entries(serverCmds).map(([name, shellCmd]) => html`
                <tr>
                  <td>${name}</td>
                  <td style="font-family: monospace; font-size: 11px;">${shellCmd}</td>
                  <td>
                    <div class="sensor-actions">
                      <button class="sensor-btn edit" @click=${() => this._editCommand(name, shellCmd)}>Edit</button>
                      <button class="sensor-btn remove" @click=${() => this._removeServerCommand(name)}>Remove</button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        ` : ''}

        <!-- Add/Edit form -->
        ${this._editingCommandName || this._showAddCommand ? html`
          <div class="sensor-form" style="margin-top: 8px;">
            <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr;">
              <input type="text" placeholder="Command name"
                .value=${this._editCommandForm?.name || ''}
                ?disabled=${!!this._editingCommandName}
                @input=${(e) => this._editCommandForm = { ...this._editCommandForm, name: e.target.value }}>
              <input type="text" placeholder="Shell command (e.g. systemctl restart nginx)"
                .value=${this._editCommandForm?.shell || ''}
                @input=${(e) => this._editCommandForm = { ...this._editCommandForm, shell: e.target.value }}
                @keydown=${(e) => e.key === 'Enter' && this._saveCommand()}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save" @click=${this._saveCommand}>${this._editingCommandName ? 'Update' : 'Add'}</button>
              <button class="form-btn cancel" @click=${this._cancelCommandForm}>Cancel</button>
            </div>
          </div>
        ` : html`
          <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px; margin-top: 8px;"
            @click=${this._startAddCommand}>+ Add Command</button>
        `}

        ${hiddenCommands.length > 0 ? html`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #555; margin-bottom: 6px; cursor: pointer;"
              @click=${() => this._showHiddenCmds = !this._showHiddenCmds}>
              ${this._showHiddenCmds ? '\u25BE' : '\u25B8'} ${hiddenCommands.length} hidden command${hiddenCommands.length !== 1 ? 's' : ''}
            </div>
            ${this._showHiddenCmds ? html`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${hiddenCommands.map(cmd => html`
                  <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${cmd}
                    <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
                      @click=${() => this._unhideCommand(cmd)}>show</span>
                  </span>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  async _hideCommand(cmd) {
    try {
      await hideCommand(this.deviceId, cmd);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to hide command:', e);
    }
  }

  async _unhideCommand(cmd) {
    try {
      await unhideCommand(this.deviceId, cmd);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to unhide command:', e);
    }
  }

  _startAddCommand() {
    this._showAddCommand = true;
    this._editingCommandName = null;
    this._editCommandForm = { name: '', shell: '' };
  }

  _editCommand(name, shellCmd) {
    this._editingCommandName = name;
    this._showAddCommand = false;
    this._editCommandForm = { name, shell: shellCmd };
  }

  _cancelCommandForm() {
    this._showAddCommand = false;
    this._editingCommandName = null;
    this._editCommandForm = null;
  }

  _saveCommand() {
    const form = this._editCommandForm;
    if (!form) return;
    const name = (form.name || '').trim();
    const shell = (form.shell || '').trim();
    if (!name || !shell) return;

    this._serverCommands = { ...this._serverCommands, [name]: shell };
    this._localChanges = true;
    updateDeviceSettings(this.deviceId, { server_commands: this._serverCommands });
    this._cancelCommandForm();
  }

  // ── Section 7: Agent Configuration ───────────────────────────────────────

  _renderAgentConfig() {
    const rc = this.device.remote_config || {};
    const plugins = this.device.active_plugins || (rc.plugins ? Object.keys(rc.plugins) : []);
    const sensors = this._customSensors;

    return html`
      <div class="section">
        <div class="section-title">Agent Configuration</div>

        <div class="config-row">
          <span class="config-label">Collection interval</span>
          <input class="config-input" type="number" min="5"
            .value=${String(this._configInterval)}
            @input=${(e) => { this._configInterval = Number(e.target.value); this._localChanges = true; }}>
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
                        <button class="sensor-btn edit" @click=${() => this._editSensor(key, s)}>Edit</button>
                        <button class="sensor-btn remove" @click=${() => this._removeSensor(key)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          ` : html`<div style="font-size: 13px; color: #555; margin-bottom: 10px;">No custom sensors</div>`}

          ${this._showAddSensor || this._editSensorKey ? this._renderSensorForm() : html`
            <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px;"
              @click=${this._startAddSensor}>+ Add Sensor</button>
          `}
        </div>

        ${this.device.allowed_commands && this.device.allowed_commands.length > 0 ? html`
          <div class="config-row" style="margin-bottom: 0;">
            <span class="config-label" style="color: #666;">Allowed commands</span>
            <div style="font-size: 12px; color: #666;">${(this.device.allowed_commands || []).join(', ')}</div>
          </div>
        ` : ''}

        <div class="push-row">
          <button class="push-btn" ?disabled=${this._pushing} @click=${this._pushConfig}>
            ${this._pushing ? 'Pushing...' : 'Push Config'}
          </button>
          ${this._lastPushed ? html`
            <span class="push-status">Last pushed: ${this._lastPushed}</span>
          ` : ''}
          ${this._pushStatus ? html`
            <span class="push-status ${this._pushStatus === 'Config synced' ? 'synced' : 'pending'}">
              ${this._pushStatus}
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
          <button class="form-btn save" @click=${this._saveSensor}>Save</button>
          <button class="form-btn cancel" @click=${this._cancelSensorForm}>Cancel</button>
        </div>
      </div>
    `;
  }

  _startAddSensor() {
    this._showAddSensor = true;
    this._editSensorKey = null;
    this._sensorForm = { name: '', command: '', interval: 30, unit: '' };
  }

  _editSensor(key, s) {
    this._editSensorKey = key;
    this._showAddSensor = false;
    this._sensorForm = { name: key, command: s.command, interval: s.interval || 30, unit: s.unit || '' };
  }

  _removeSensor(key) {
    const updated = { ...this._customSensors };
    delete updated[key];
    this._customSensors = updated;
    this._localChanges = true;
  }

  _saveSensor() {
    const { name, command, interval, unit } = this._sensorForm;
    if (!name.trim() || !command.trim()) return;

    const updated = { ...this._customSensors };
    // If editing and key changed, remove old
    if (this._editSensorKey && this._editSensorKey !== name) {
      delete updated[this._editSensorKey];
    }
    updated[name.trim()] = { command, interval: interval || 30, unit };
    this._customSensors = updated;
    this._localChanges = true;
    this._cancelSensorForm();
  }

  _cancelSensorForm() {
    this._showAddSensor = false;
    this._editSensorKey = null;
    this._sensorForm = { name: '', command: '', interval: 30, unit: '' };
  }

  async _pushConfig() {
    this._pushing = true;
    this._pushStatus = '';
    try {
      const config = {
        interval: this._configInterval,
        plugins: {
          custom_command: { commands: this._customSensors },
        },
        commands: this._serverCommands,
      };
      console.log('Pushing config:', config);
      const result = await pushDeviceConfig(this.deviceId, config);
      console.log('Push result:', result);
      if (result && result.detail) {
        this._pushStatus = `Push failed: ${result.detail}`;
      } else {
        this._lastPushed = new Date().toLocaleTimeString();
        this._localChanges = false;
        this._pushStatus = 'Config synced';
      }
    } catch (e) {
      console.error('Push config error:', e);
      this._pushStatus = `Push failed: ${e.message}`;
    } finally {
      this._pushing = false;
    }
  }

  // ── Dialog ────────────────────────────────────────────────────────────────

  _renderGroupDialog() {
    return html`
      <div class="overlay" @click=${() => this._showGroupDialog = false}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <h3>Create Group</h3>
          <div class="dialog-field">
            <label>Group Name</label>
            <input type="text" placeholder="e.g. Infrastructure, IoT Sensors"
              .value=${this._newGroupName}
              @input=${(e) => this._newGroupName = e.target.value}
              @keydown=${(e) => e.key === 'Enter' && this._createGroup()}>
          </div>
          <div class="dialog-buttons">
            <button class="dialog-btn cancel" @click=${() => this._showGroupDialog = false}>Cancel</button>
            <button class="dialog-btn save" @click=${this._createGroup}>Create</button>
          </div>
        </div>
      </div>
    `;
  }

  async _createGroup() {
    const name = this._newGroupName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    await createGroup(id, name, [this.deviceId]);
    this._newGroupName = '';
    this._showGroupDialog = false;
    await this._loadGroups();
    await this._loadDevice();
  }

  // ── Tag helpers ───────────────────────────────────────────────────────────

  async _addTag(tag) {
    if (!tag) return;
    await addDeviceTags(this.deviceId, [tag]);
    await this._loadDevice();
  }

  async _removeTag(tag) {
    await removeDeviceTag(this.deviceId, tag);
    await this._loadDevice();
  }

  // ── Command ───────────────────────────────────────────────────────────────


  _removeServerCommand(name) {
    const updated = { ...this._serverCommands };
    delete updated[name];
    this._serverCommands = updated;
    this._localChanges = true;
    updateDeviceSettings(this.deviceId, { server_commands: this._serverCommands });
  }

  async _deleteDevice() {
    if (!confirm(`Delete device "${this.device?.device_name || this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`)) return;
    try {
      await deleteDevice(this.deviceId);
      this.dispatchEvent(new CustomEvent('back'));
    } catch (e) {
      console.error('Failed to delete device:', e);
    }
  }

  async _sendCmd(command, params = {}) {
    try {
      this.commandResult = `Sending ${command}...`;
      const result = await sendCommand(this.deviceId, command, params);
      this.commandResult = `Command sent (request: ${result.request_id})`;
    } catch (e) {
      this.commandResult = `Error: ${e.message}`;
    }
  }
}

customElements.define('device-detail', DeviceDetail);

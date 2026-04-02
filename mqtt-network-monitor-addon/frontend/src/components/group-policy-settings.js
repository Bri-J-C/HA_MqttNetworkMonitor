import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { AVAILABLE_TRANSFORMS } from '../utils/transforms.js';
import {
  fetchGroups, createGroup, updateGroup, deleteGroup,
  sendGroupCommand, pushGroupConfig,
  fetchDevices, updateDeviceSettings,
} from '../services/api.js';

// Per-group ephemeral state for threshold add row
const _groupThresholdForms = {}; // groupId → { attr: '', value: '' }
function getGroupThresholdForm(groupId) {
  if (!_groupThresholdForms[groupId]) _groupThresholdForms[groupId] = { attr: '', value: '' };
  return _groupThresholdForms[groupId];
}

class GroupPolicySettings extends LitElement {
  static properties = {
    _groups: { type: Object, state: true },
    _devices: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _expandedGroup: { type: String, state: true },
    _newGroupName: { type: String, state: true },
    _editGroupName: { type: String, state: true },
    _editingGroupName: { type: String, state: true },
    _groupSaveStatus: { type: Object, state: true },
    _groupPushStatus: { type: Object, state: true },
    // Command editing state
    _editingGroupCmd: { type: Object, state: true },   // { groupId, name } or null
    _showAddGroupCmd: { type: Object, state: true },   // { groupId } or null
    _groupCmdForm: { type: Object, state: true },      // { name, shell }
    // Sensor editing state
    _editingGroupSensor: { type: Object, state: true }, // { groupId, name } or null
    _showAddGroupSensor: { type: Object, state: true }, // { groupId } or null
    _groupSensorForm: { type: Object, state: true },    // { name, command, interval, unit }
  };

  static styles = [sharedStyles, css`
    :host { display: block; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    /* Group policies */
    .group-list { display: flex; flex-direction: column; gap: 8px; }
    .group-header {
      display: flex; align-items: center; justify-content: space-between;
      background: #0d0d1f; border-radius: 6px; padding: 10px 14px;
      cursor: pointer; user-select: none;
    }
    .group-header:hover { background: rgba(255,255,255,0.06); }
    .group-header-left { display: flex; align-items: center; gap: 10px; }
    .group-header-name { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 600; }
    .group-member-count { font-size: 11px; color: #fff; }
    .chevron { font-size: 10px; color: #fff; transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }
    .group-body {
      background: #0d0d1f; border-radius: 0 0 6px 6px;
      padding: 14px; margin-top: -4px; border-top: 1px solid rgba(255,255,255,0.05);
    }
    .group-field { margin-bottom: 14px; }
    .group-field label {
      display: block; font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .members-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
    .member-pill {
      display: flex; align-items: center; gap: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF; padding: 3px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .member-pill .remove {
      cursor: pointer; color: #00D4FF; font-size: 13px; line-height: 1;
      opacity: 0.5; transition: all 0.15s;
    }
    .member-pill .remove:hover { color: #ef5350; opacity: 1; }
    .threshold-input {
      width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 4px; color: #fff; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #00D4FF; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; align-items: center; }
    .group-save-btn {
      background: #00D4FF; border: none; color: #0d0d1f; padding: 6px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .group-save-btn:hover { background: #33DDFF; }
    .group-delete-btn {
      background: rgba(239,83,80,0.1); border: none; color: #ef5350;
      padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .group-delete-btn:hover { background: rgba(239,83,80,0.2); }
    .group-status-saved { font-size: 12px; color: #04d65c; }
    .group-status-error { font-size: 12px; color: #ef5350; }
    .group-status-pushing { font-size: 12px; color: #00D4FF; }
    .group-status-pushed { font-size: 12px; color: #04d65c; }

    /* Toggle switch (command discovered) */
    .cmd-toggle-wrap { cursor: pointer; flex-shrink: 0; }
    .cmd-toggle {
      width: 28px; height: 16px; border-radius: 8px; position: relative;
      transition: background 0.2s;
    }
    .cmd-toggle.on { background: #7e57c2; }
    .cmd-toggle.off { background: #333; }
    .cmd-toggle-knob {
      width: 12px; height: 12px; border-radius: 50%; background: #fff;
      position: absolute; top: 2px; transition: left 0.2s;
    }
    .cmd-toggle.on .cmd-toggle-knob { left: 14px; }
    .cmd-toggle.off .cmd-toggle-knob { left: 2px; }

    /* Sensor / command tables */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #fff; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .sensor-table td {
      font-size: 12px; color: rgba(255,255,255,0.8); padding: 6px 8px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #00D4FF; }
    .sensor-btn.edit:hover { background: rgba(0,212,255,0.1); }
    .sensor-btn.remove { color: #fff; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-form { background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: #fff; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #00D4FF; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .form-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }

    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #fff; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

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
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

    .subsection-label {
      font-size: 11px; color: #fff; margin-bottom: 6px; margin-top: 8px;
    }
    .add-cmd-btn {
      background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
      margin-top: 4px; transition: all 0.15s;
    }
    .add-cmd-btn:hover { border-color: #00D4FF; color: #00D4FF; }

    @media (max-width: 768px) {
      .sensor-form-grid { grid-template-columns: 1fr; }
      .add-row { flex-direction: column; }
      .add-row input, .add-row select { width: 100%; box-sizing: border-box; }
    }
  `];

  constructor() {
    super();
    this._groups = {};
    this._devices = {};
    this._loading = true;
    this._expandedGroup = null;
    this._newGroupName = '';
    this._editGroupName = '';
    this._editingGroupName = null;
    this._groupSaveStatus = {};
    this._groupPushStatus = {};
    // Command editing
    this._editingGroupCmd = null;
    this._showAddGroupCmd = null;
    this._groupCmdForm = { name: '', shell: '' };
    // Sensor editing
    this._editingGroupSensor = null;
    this._showAddGroupSensor = null;
    this._groupSensorForm = { name: '', command: '', interval: '', unit: '' };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadAll();
  }

  async _loadAll() {
    this._loading = true;
    try {
      const [groups, devices] = await Promise.all([
        fetchGroups().catch(() => ({})),
        fetchDevices().catch(() => ({})),
      ]);
      this._groups = groups || {};
      this._devices = devices || {};
    } finally {
      this._loading = false;
    }
  }

  render() {
    const groups = Object.values(this._groups);
    return html`
      <div class="section">
        <div class="section-title">Group Policies</div>
        <div class="group-list">
          ${groups.map(g => this._renderGroup(g))}
        </div>
        <div class="add-row">
          <input class="small-input" type="text" placeholder="New group name..."
            .value=${this._newGroupName}
            @input=${(e) => this._newGroupName = e.target.value}
            @keydown=${(e) => e.key === 'Enter' && this._createGroup()}>
          <button class="small-btn" @click=${this._createGroup}>New Group</button>
        </div>
      </div>
    `;
  }

  _renderGroup(g) {
    const isExpanded = this._expandedGroup === g.id;
    const memberCount = (g.device_ids || []).length;

    return html`
      <div>
        <div class="group-header" @click=${() => this._toggleGroup(g.id)}>
          <div class="group-header-left">
            <span class="chevron ${isExpanded ? 'open' : ''}">&#9658;</span>
            <span class="group-header-name">${g.name}</span>
            <span class="group-member-count">${memberCount} member${memberCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        ${isExpanded ? html`
          <div class="group-body">
            <div class="group-field">
              <label>Name</label>
              <input class="threshold-input" type="text"
                .value=${this._editingGroupName === g.id ? this._editGroupName : (g.name || '')}
                @input=${(e) => { this._editingGroupName = g.id; this._editGroupName = e.target.value; }}>
            </div>

            <div class="group-field">
              <label>Members</label>
              <div class="members-row">
                ${(g.device_ids || []).map(did => {
                  const dev = this._devices[did];
                  return html`
                    <span class="member-pill">
                      ${dev ? (dev.device_name || did) : did}
                      <span class="remove" @click=${() => this._removeMember(g, did)}>&times;</span>
                    </span>
                  `;
                })}
                ${this._renderAddMemberDropdown(g)}
              </div>
            </div>

            <div class="group-field">
              <label>Collection Interval</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input class="threshold-input" type="number" min="1" step="1"
                  placeholder="Default (seconds)" style="max-width: 220px;"
                  .value=${g.interval != null ? String(g.interval) : ''}
                  @change=${(e) => this._setGroupInterval(g, e.target.value)}>
                ${g.interval != null ? html`
                  <button class="sensor-btn remove" style="white-space: nowrap;"
                    @click=${() => this._setGroupInterval(g, null)}>Clear</button>
                ` : ''}
              </div>
            </div>

            <div class="group-field">
              <label>Thresholds</label>
              ${this._renderGroupThresholds(g)}
            </div>

            <div class="group-field">
              <label>Custom Commands</label>
              ${this._renderGroupCustomCommands(g)}
            </div>

            <div class="group-field">
              <label>Custom Sensors</label>
              ${this._renderGroupCustomSensors(g)}
            </div>

            <div class="group-footer">
              <button class="group-delete-btn" @click=${() => this._deleteGroup(g)}>Delete Group</button>
              <div style="display: flex; gap: 8px; align-items: center; margin-left: auto;">
                ${this._groupPushStatus[g.id] === 'Deploying...' ? html`<span class="group-status-pushing">Deploying...</span>` : ''}
                ${this._groupPushStatus[g.id] === 'Deployed!' ? html`<span class="group-status-pushed">Deployed!</span>` : ''}
                ${(this._groupPushStatus[g.id] || '').startsWith('Error')
                  ? html`<span class="group-status-error">${this._groupPushStatus[g.id]}</span>` : ''}
                <button class="group-save-btn" style="background: #2e7d32;"
                  @click=${() => this._deployToDevices(g)}>Deploy to Devices</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Group Discovered Data Helper ──────────────────────────────────────────

  _getGroupDiscoveredData(g) {
    const memberIds = g.device_ids || [];
    const attributeSet = new Set();
    const commandMap = {}; // name → shellCmd or ''
    const sensors = {};

    for (const did of memberIds) {
      const dev = this._devices[did];
      if (!dev) continue;

      if (dev.attributes && typeof dev.attributes === 'object') {
        for (const key of Object.keys(dev.attributes)) {
          attributeSet.add(key);
        }
      }

      if (Array.isArray(dev.allowed_commands)) {
        for (const cmd of dev.allowed_commands) {
          if (!(cmd in commandMap)) commandMap[cmd] = '';
        }
      }
      // server_commands are server-managed and not included in discovered —
      // they would cause group-defined commands to show as "both" incorrectly

      const rc = dev.remote_config;
      if (rc && rc.plugins && rc.plugins.custom_command && rc.plugins.custom_command.commands) {
        for (const [name, sensor] of Object.entries(rc.plugins.custom_command.commands)) {
          if (!sensors[name]) sensors[name] = sensor;
        }
      }
    }

    return {
      attributes: Array.from(attributeSet).sort(),
      commands: commandMap,
      sensors,
    };
  }

  // ── Group Custom Commands ─────────────────────────────────────────────────

  _renderGroupCustomCommands(g) {
    const commands = g.custom_commands || {};
    // Only show group-defined commands — device commands are managed on the device detail page
    const cmdEntries = Object.entries(commands).sort(([a], [b]) => a.localeCompare(b));
    const hiddenCmds = g.hidden_commands || [];
    const visibleCmds = cmdEntries.filter(([n]) => !hiddenCmds.includes(n));
    const hiddenEntries = cmdEntries.filter(([n]) => hiddenCmds.includes(n));

    const isEditingCmd = this._editingGroupCmd && this._editingGroupCmd.groupId === g.id;
    const isAddingCmd = this._showAddGroupCmd && this._showAddGroupCmd.groupId === g.id;

    return html`
      ${visibleCmds.length > 0 ? html`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th></th></tr>
          </thead>
          <tbody>
            ${visibleCmds.map(([name, shellCmd]) => html`
              <tr>
                <td style="font-family: monospace;">${name}</td>
                <td style="font-family: monospace; font-size: 11px;">${shellCmd || '\u2014'}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${() => this._startEditGroupCmd(g.id, name, shellCmd)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${() => this._removeGroupCommand(g, name)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      ` : html`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No commands</div>
      `}

      ${hiddenEntries.length > 0 ? html`
        <div style="margin-top: 6px;">
          <div style="font-size: 10px; color: #fff; margin-bottom: 4px; cursor: pointer;"
            @click=${() => { g._showHiddenCmds = !g._showHiddenCmds; this.requestUpdate(); }}>
            ${g._showHiddenCmds ? '\u25BE' : '\u25B8'} ${hiddenEntries.length} hidden
          </div>
          ${g._showHiddenCmds ? html`
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${hiddenEntries.map(([name]) => html`
                <span style="font-size: 11px; background: #0d0d1f; color: #fff; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                  ${name}
                  <span style="cursor: pointer; color: #00D4FF; font-size: 10px;"
                    @click=${() => this._unhideGroupCommand(g, name)}>show</span>
                </span>
              `)}
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${(isEditingCmd || isAddingCmd) ? html`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr;">
            <input type="text" placeholder="Command name"
              .value=${this._groupCmdForm.name}
              ?disabled=${!!isEditingCmd}
              @input=${(e) => this._groupCmdForm = { ...this._groupCmdForm, name: e.target.value }}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupCmdForm.shell}
              @input=${(e) => this._groupCmdForm = { ...this._groupCmdForm, shell: e.target.value }}
              @keydown=${(e) => e.key === 'Enter' && this._saveGroupCmd(g)}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${() => this._saveGroupCmd(g)}>${isEditingCmd ? 'Update' : 'Add'}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupCmdForm}>Cancel</button>
          </div>
        </div>
      ` : html`
        <button class="add-cmd-btn" @click=${() => this._startAddGroupCmd(g.id)}>+ Add Command</button>
      `}
    `;
  }

  _startAddGroupCmd(groupId) {
    this._showAddGroupCmd = { groupId };
    this._editingGroupCmd = null;
    this._groupCmdForm = { name: '', shell: '' };
  }

  _startEditGroupCmd(groupId, name, shell) {
    this._editingGroupCmd = { groupId, name };
    this._showAddGroupCmd = null;
    this._groupCmdForm = { name, shell };
  }

  _cancelGroupCmdForm() {
    this._editingGroupCmd = null;
    this._showAddGroupCmd = null;
    this._groupCmdForm = { name: '', shell: '' };
  }

  async _saveGroupCmd(g) {
    const name = this._groupCmdForm?.name?.trim();
    const shell = this._groupCmdForm?.shell?.trim();
    if (!name || !shell) return;
    const latest = this._getLatestGroup(g);
    const updatedCmds = { ...(latest.custom_commands || {}), [name]: shell };
    await updateGroup(g.id, { custom_commands: updatedCmds });
    await this._loadAll();
    this._cancelGroupCmdForm();
  }

  async _removeGroupCommand(g, name) {
    const latest = this._getLatestGroup(g);
    const updated = { ...(latest.custom_commands || {}) };
    delete updated[name];
    try {
      await updateGroup(g.id, this._buildGroupPayload(latest, { custom_commands: updated }));
    } catch (e) {
      console.error('Failed to remove group command:', e);
    }
    await this._loadAll();
  }

  _getLatestGroup(g) {
    return this._groups[g.id] || g;
  }

  _buildGroupPayload(group, overrides = {}) {
    return {
      name: group.name,
      device_ids: group.device_ids || [],
      custom_commands: group.custom_commands || {},
      custom_sensors: group.custom_sensors || {},
      thresholds: group.thresholds || {},
      hidden_commands: group.hidden_commands || [],
      attribute_transforms: group.attribute_transforms || {},
      ...overrides,
    };
  }

  async _hideGroupCommand(g, name) {
    const latest = this._getLatestGroup(g);
    const hidden = [...(latest.hidden_commands || [])];
    if (!hidden.includes(name)) hidden.push(name);
    try {
      await updateGroup(g.id, this._buildGroupPayload(latest, { hidden_commands: hidden }));
    } catch (e) {
      console.error('Failed to hide group command:', e);
    }
    await this._loadAll();
  }

  async _unhideGroupCommand(g, name) {
    const latest = this._getLatestGroup(g);
    const hidden = (latest.hidden_commands || []).filter(c => c !== name);
    try {
      await updateGroup(g.id, this._buildGroupPayload(latest, { hidden_commands: hidden }));
    } catch (e) {
      console.error('Failed to unhide group command:', e);
    }
    await this._loadAll();
  }

  // ── Group Thresholds ──────────────────────────────────────────────────────

  _renderGroupThresholds(g) {
    const thresholds = g.thresholds || {};
    const critThresholds = g.crit_thresholds || {};
    const transforms = g.attribute_transforms || {};
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredAttrs = discovered.attributes;

    const extraKeys = Object.keys(thresholds).filter(
      k => thresholds[k] != null && !discoveredAttrs.includes(k)
    );
    const critExtraKeys = Object.keys(critThresholds).filter(
      k => critThresholds[k] != null && !discoveredAttrs.includes(k) && !extraKeys.includes(k)
    );
    const allAttrs = [...discoveredAttrs, ...extraKeys, ...critExtraKeys];

    if (allAttrs.length === 0) {
      return html`<div style="font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`;
    }

    return html`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px;">
        ${allAttrs.map(key => {
          const t = thresholds[key];
          const hasWarn = t != null;
          const warnOp = hasWarn && typeof t === 'object' ? (t.op || '>') : '>';
          const warnVal = hasWarn ? (typeof t === 'object' ? t.value : t) : null;

          const ct = critThresholds[key];
          const hasCrit = ct != null;
          const critOp = hasCrit && typeof ct === 'object' ? (ct.op || '>') : '>';
          const critVal = hasCrit ? (typeof ct === 'object' ? ct.value : ct) : null;

          return html`
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px;
              ${hasCrit ? 'border: 1px solid rgba(239,83,80,0.2);' : hasWarn ? 'border: 1px solid rgba(255,183,77,0.15);' : 'border: 1px solid transparent;'}">
              <div style="font-size: 12px; color: #fff; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.3px;">
                ${key.replace(/_/g, ' ')}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                <span style="font-size: 11px; color: rgba(255,183,77,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">warn</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${warnOp}
                  @change=${(e) => this._updateGroupThreshold(g.id, key, warnVal, e.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${warnVal != null ? String(warnVal) : ''}
                  @change=${(e) => this._updateGroupThreshold(g.id, key, e.target.value, warnOp)}>
                ${hasWarn ? html`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${() => this._removeGroupThreshold(g.id, key)}>&times;</span>
                ` : ''}
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 11px; color: rgba(239,83,80,0.7); text-transform: uppercase; letter-spacing: 0.5px; width: 34px; font-weight: 600;">crit</span>
                <select style="background: #0d0d1f; border: none; border-radius: 3px; color: rgba(255,255,255,0.6); padding: 2px; font-size: 11px; width: 38px; appearance: none; -webkit-appearance: none;"
                  .value=${critOp}
                  @change=${(e) => this._updateGroupCritThreshold(g.id, key, critVal, e.target.value)}>
                  <option value=">" style="background: #0d0d1f; color: #fff;">&gt;</option>
                  <option value="<" style="background: #0d0d1f; color: #fff;">&lt;</option>
                  <option value=">=" style="background: #0d0d1f; color: #fff;">&gt;=</option>
                  <option value="<=" style="background: #0d0d1f; color: #fff;">&lt;=</option>
                  <option value="==" style="background: #0d0d1f; color: #fff;">==</option>
                  <option value="!=" style="background: #0d0d1f; color: #fff;">!=</option>
                </select>
                <input type="number" placeholder="\u2014"
                  style="width: 55px; font-size: 11px; padding: 3px 4px; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 3px; color: rgba(255,255,255,0.7); text-align: center;"
                  .value=${critVal != null ? String(critVal) : ''}
                  @change=${(e) => this._updateGroupCritThreshold(g.id, key, e.target.value, critOp)}>
                ${hasCrit ? html`
                  <span style="font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer;" title="Clear"
                    @click=${() => this._removeGroupCritThreshold(g.id, key)}>&times;</span>
                ` : ''}
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.05);">
                <span style="font-size: 9px; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">Transform</span>
                <select style="flex: 1; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; color: rgba(255,255,255,0.5); padding: 2px 4px; font-size: 10px; cursor: pointer; appearance: none; -webkit-appearance: none;"
                  .value=${transforms[key] || ''}
                  @change=${(e) => this._updateGroupTransform(g.id, key, e.target.value)}>
                  ${AVAILABLE_TRANSFORMS.map(t => html`
                    <option value=${t.value} ?selected=${t.value === (transforms[key] || '')}
                      style="background: #0d0d1f; color: #fff;">${t.label}</option>
                  `)}
                </select>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _updateGroupThreshold(groupId, key, value, op = '>') {
    const group = this._groups[groupId];
    if (!group) return;
    const thresholds = { ...(group.thresholds || {}) };
    if (value === '' || value == null) {
      delete thresholds[key];
    } else {
      thresholds[key] = { op, value: Number(value) };
    }
    this._groups = {
      ...this._groups,
      [groupId]: { ...group, thresholds },
    };
  }

  _removeGroupThreshold(groupId, key) {
    const group = this._groups[groupId];
    if (!group) return;
    const updated = { ...(group.thresholds || {}) };
    delete updated[key];
    this._groups = {
      ...this._groups,
      [groupId]: { ...group, thresholds: updated },
    };
  }

  _updateGroupCritThreshold(groupId, key, value, op = '>') {
    const group = this._groups[groupId];
    if (!group) return;
    const crit_thresholds = { ...(group.crit_thresholds || {}) };
    if (value === '' || value == null) {
      delete crit_thresholds[key];
    } else {
      crit_thresholds[key] = { op, value: Number(value) };
    }
    this._groups = {
      ...this._groups,
      [groupId]: { ...group, crit_thresholds },
    };
  }

  _removeGroupCritThreshold(groupId, key) {
    const group = this._groups[groupId];
    if (!group) return;
    const updated = { ...(group.crit_thresholds || {}) };
    delete updated[key];
    this._groups = {
      ...this._groups,
      [groupId]: { ...group, crit_thresholds: updated },
    };
  }

  _updateGroupTransform(groupId, key, value) {
    const group = this._groups[groupId];
    if (!group) return;
    const updated = { ...(group.attribute_transforms || {}) };
    if (value) {
      updated[key] = value;
    } else {
      delete updated[key];
    }
    this._groups = {
      ...this._groups,
      [groupId]: { ...group, attribute_transforms: updated },
    };
  }

  // ── Group Custom Sensors ──────────────────────────────────────────────────

  _renderGroupCustomSensors(g) {
    const sensors = g.custom_sensors || {};

    const isEditingSensor = this._editingGroupSensor && this._editingGroupSensor.groupId === g.id;
    const isAddingSensor = this._showAddGroupSensor && this._showAddGroupSensor.groupId === g.id;

    return html`
      ${Object.keys(sensors).length > 0 ? html`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${Object.entries(sensors).map(([name, sensor]) => html`
              <tr>
                <td style="font-family: monospace;">${name}</td>
                <td style="font-family: monospace; font-size: 11px;">${sensor.command || '—'}</td>
                <td>${sensor.interval ? sensor.interval + 's' : '—'}</td>
                <td>${sensor.unit || '—'}</td>
                <td>
                  <div class="sensor-actions">
                    <button class="sensor-btn edit"
                      @click=${() => this._startEditGroupSensor(g.id, name, sensor)}>Edit</button>
                    <button class="sensor-btn remove"
                      @click=${() => this._removeGroupSensor(g, name)}>Remove</button>
                  </div>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      ` : html`
        <div style="font-size: 12px; color: #fff; margin-bottom: 8px;">No group sensors defined.</div>
      `}

      ${(isEditingSensor || isAddingSensor) ? html`
        <div class="sensor-form">
          <div class="sensor-form-grid" style="grid-template-columns: 1fr 2fr 80px 80px;">
            <input type="text" placeholder="Name"
              .value=${this._groupSensorForm.name}
              ?disabled=${!!isEditingSensor}
              @input=${(e) => this._groupSensorForm = { ...this._groupSensorForm, name: e.target.value }}>
            <input type="text" placeholder="Shell command"
              .value=${this._groupSensorForm.command}
              @input=${(e) => this._groupSensorForm = { ...this._groupSensorForm, command: e.target.value }}>
            <input type="number" placeholder="Interval (s)"
              .value=${this._groupSensorForm.interval}
              @input=${(e) => this._groupSensorForm = { ...this._groupSensorForm, interval: e.target.value }}>
            <input type="text" placeholder="Unit"
              .value=${this._groupSensorForm.unit}
              @input=${(e) => this._groupSensorForm = { ...this._groupSensorForm, unit: e.target.value }}>
          </div>
          <div class="sensor-form-actions">
            <button class="form-btn save" @click=${() => this._saveGroupSensor(g)}>${isEditingSensor ? 'Update' : 'Add'}</button>
            <button class="form-btn cancel" @click=${this._cancelGroupSensorForm}>Cancel</button>
          </div>
        </div>
      ` : html`
        <button class="add-cmd-btn" @click=${() => this._startAddGroupSensor(g.id)}>+ Add Sensor</button>
      `}
    `;
  }

  _startAddGroupSensor(groupId) {
    this._showAddGroupSensor = { groupId };
    this._editingGroupSensor = null;
    this._groupSensorForm = { name: '', command: '', interval: '', unit: '' };
  }

  _startEditGroupSensor(groupId, name, sensor) {
    this._editingGroupSensor = { groupId, name };
    this._showAddGroupSensor = null;
    this._groupSensorForm = {
      name,
      command: sensor.command || '',
      interval: sensor.interval != null ? String(sensor.interval) : '',
      unit: sensor.unit || '',
    };
  }

  _cancelGroupSensorForm() {
    this._editingGroupSensor = null;
    this._showAddGroupSensor = null;
    this._groupSensorForm = { name: '', command: '', interval: '', unit: '' };
  }

  async _saveGroupSensor(g) {
    const name = this._groupSensorForm?.name?.trim();
    const command = this._groupSensorForm?.command?.trim();
    if (!name || !command) return;
    const sensor = {
      command,
      unit: this._groupSensorForm?.unit || '',
      interval: parseInt(this._groupSensorForm?.interval) || undefined,
    };
    const latest = this._getLatestGroup(g);
    const updatedSensors = { ...(latest.custom_sensors || {}), [name]: sensor };
    await updateGroup(g.id, { custom_sensors: updatedSensors });
    await this._loadAll();
    this._cancelGroupSensorForm();
  }

  async _removeGroupSensor(g, name) {
    const latest = this._getLatestGroup(g);
    const updated = { ...(latest.custom_sensors || {}) };
    delete updated[name];
    try {
      await updateGroup(g.id, this._buildGroupPayload(latest, { custom_sensors: updated }));
    } catch (e) {
      console.error('Failed to remove group sensor:', e);
    }
    await this._loadAll();
  }

  // ── Group Member Management ───────────────────────────────────────────────

  _renderAddMemberDropdown(g) {
    const memberIds = g.device_ids || [];
    const available = Object.entries(this._devices).filter(([id]) => !memberIds.includes(id));
    if (available.length === 0) return html``;
    return html`
      <select class="small-input" style="padding: 3px 8px;"
        @change=${(e) => { if (e.target.value) { this._addMember(g, e.target.value); e.target.value = ''; } }}>
        <option value="">Add device...</option>
        ${available.map(([id, dev]) => html`
          <option value=${id}>${dev.device_name || id}</option>
        `)}
      </select>
    `;
  }

  _toggleGroup(id) {
    this._expandedGroup = this._expandedGroup === id ? null : id;
  }

  async _addMember(g, deviceId) {
    const deviceIds = [...(g.device_ids || []), deviceId];
    try {
      await updateGroup(g.id, { device_ids: deviceIds });
      await this._loadAll();
    } catch (e) {
      console.error('Failed to add member:', e);
    }
  }

  async _setGroupInterval(g, value) {
    const interval = value === null || value === '' ? null : parseInt(value, 10);
    if (value !== null && value !== '' && (isNaN(interval) || interval < 1)) return;
    try {
      await updateGroup(g.id, { interval });
      this._groups = {
        ...this._groups,
        [g.id]: { ...this._groups[g.id], interval },
      };
    } catch (e) {
      console.error('Failed to set group interval:', e);
    }
  }

  async _removeMember(g, deviceId) {
    const deviceIds = (g.device_ids || []).filter(id => id !== deviceId);
    try {
      await updateGroup(g.id, { device_ids: deviceIds });
      await this._loadAll();
    } catch (e) {
      console.error('Failed to remove member:', e);
    }
  }

  async _updateGroup(g) {
    const latest = this._groups[g.id] || g;
    const name = this._editingGroupName === g.id ? this._editGroupName.trim() : latest.name;
    const cleanThresholds = {};
    for (const [k, v] of Object.entries(latest.thresholds || {})) {
      if (v == null) continue;
      if (typeof v === 'object' && v.value != null) {
        cleanThresholds[k] = v;
      } else if (typeof v === 'number' && !isNaN(v)) {
        cleanThresholds[k] = v;
      }
    }
    const cleanCritThresholds = {};
    for (const [k, v] of Object.entries(latest.crit_thresholds || {})) {
      if (v == null) continue;
      if (typeof v === 'object' && v.value != null) {
        cleanCritThresholds[k] = v;
      } else if (typeof v === 'number' && !isNaN(v)) {
        cleanCritThresholds[k] = v;
      }
    }
    const savedName = name || latest.name;
    const payload = {
      name: savedName,
      device_ids: latest.device_ids || [],
      custom_commands: latest.custom_commands || {},
      custom_sensors: latest.custom_sensors || {},
      thresholds: cleanThresholds,
      crit_thresholds: cleanCritThresholds,
      hidden_commands: latest.hidden_commands || [],
      interval: latest.interval != null ? latest.interval : null,
      attribute_transforms: latest.attribute_transforms || {},
    };
    console.log('Saving group:', g.id, payload);
    try {
      await updateGroup(g.id, payload);
      this._groups = {
        ...this._groups,
        [g.id]: { ...latest, name: savedName, thresholds: cleanThresholds, crit_thresholds: cleanCritThresholds },
      };
      if (this._editingGroupName === g.id) this._editingGroupName = null;
      this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: 'saved' };
      setTimeout(() => {
        this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: '' };
      }, 2000);
    } catch (e) {
      console.error('Failed to update group:', e);
      this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: 'error' };
      setTimeout(() => {
        this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: '' };
      }, 2000);
    }
  }

  async _createGroup() {
    const name = this._newGroupName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    try {
      await createGroup(id, name, []);
      this._newGroupName = '';
      this._expandedGroup = id;
      await this._loadAll();
    } catch (e) {
      console.error('Failed to create group:', e);
    }
  }

  async _deleteGroup(g) {
    const memberCount = (g.device_ids || []).length;
    if (memberCount > 0) {
      if (!confirm(`Delete group "${g.name}"? It has ${memberCount} member(s).`)) return;
    }
    try {
      await deleteGroup(g.id);
      if (this._expandedGroup === g.id) this._expandedGroup = null;
      await this._loadAll();
    } catch (e) {
      console.error('Failed to delete group:', e);
    }
  }

  async _deployToDevices(g) {
    await this._updateGroup(g);
    await this._doDeploy(g);
  }

  async _doDeploy(g) {
    const latest = this._groups[g.id] || g;
    this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Deploying...' };
    try {
      const result = await pushGroupConfig(latest.id, {});
      console.log('Deploy result:', result);
      this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Deployed!' };
      setTimeout(() => {
        this._groupPushStatus = { ...this._groupPushStatus, [g.id]: '' };
      }, 3000);
      await this._loadAll();
    } catch (e) {
      console.error('Failed to deploy group config:', e);
      const msg = e && e.message ? `Error: ${e.message}` : 'Error';
      this._groupPushStatus = { ...this._groupPushStatus, [g.id]: msg };
      setTimeout(() => {
        this._groupPushStatus = { ...this._groupPushStatus, [g.id]: '' };
      }, 3000);
    }
  }
}

customElements.define('group-policy-settings', GroupPolicySettings);

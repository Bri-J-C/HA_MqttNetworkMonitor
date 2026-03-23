import { LitElement, html, css } from 'lit';
import {
  fetchGroups, createGroup, updateGroup, deleteGroup,
  sendGroupCommand, pushGroupConfig, checkGroupConflicts,
  fetchDevices, updateDeviceSettings,
} from '../services/api.js';
import './conflict-dialog.js';

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
    // Conflict dialog state
    _conflictDialogConflicts: { type: Array, state: true },
    _conflictDialogTitle: { type: String, state: true },
    _conflictDialogAction: { type: String, state: true },
    _conflictDialogPendingFn: { type: Object, state: true }, // Function to call on confirm
  };

  static styles = css`
    :host { display: block; }

    .section {
      background: #2a2a4a; border-radius: 8px; padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 16px; font-weight: 600;
    }

    /* Group policies */
    .group-list { display: flex; flex-direction: column; gap: 8px; }
    .group-header {
      display: flex; align-items: center; justify-content: space-between;
      background: #1a1a2e; border-radius: 6px; padding: 10px 14px;
      cursor: pointer; user-select: none;
    }
    .group-header:hover { background: #222244; }
    .group-header-left { display: flex; align-items: center; gap: 10px; }
    .group-header-name { font-size: 14px; color: #ccc; font-weight: 600; }
    .group-member-count { font-size: 11px; color: #666; }
    .chevron { font-size: 10px; color: #555; transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }
    .group-body {
      background: #1a1a2e; border-radius: 0 0 6px 6px;
      padding: 14px; margin-top: -4px; border-top: 1px solid #2a2a4a;
    }
    .group-field { margin-bottom: 14px; }
    .group-field label {
      display: block; font-size: 11px; color: #888; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 6px;
    }
    .members-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
    .member-pill {
      display: flex; align-items: center; gap: 4px;
      background: #2a2a4a; color: #ccc; padding: 3px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .member-pill .remove {
      cursor: pointer; color: #888; font-size: 13px; line-height: 1;
      transition: color 0.15s;
    }
    .member-pill .remove:hover { color: #ef5350; }
    .threshold-input {
      width: 100%; background: #2a2a4a; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #4fc3f7; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; align-items: center; }
    .group-save-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 6px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;
    }
    .group-save-btn:hover { background: #81d4fa; }
    .group-delete-btn {
      background: rgba(239,83,80,0.1); border: none; color: #ef5350;
      padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .group-delete-btn:hover { background: rgba(239,83,80,0.2); }
    .group-status-saved { font-size: 12px; color: #81c784; }
    .group-status-error { font-size: 12px; color: #ef5350; }
    .group-status-pushing { font-size: 12px; color: #4fc3f7; }
    .group-status-pushed { font-size: 12px; color: #81c784; }

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
      text-align: left; font-size: 10px; color: #666; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 6px 8px;
      border-bottom: 1px solid #2a2a4a;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 8px; border-radius: 4px;
    }
    .sensor-btn.edit { color: #4fc3f7; }
    .sensor-btn.edit:hover { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-form { background: #12122a; border-radius: 6px; padding: 10px; margin-top: 6px; }
    .sensor-form-grid { display: grid; gap: 6px; margin-bottom: 6px; }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 6px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn { border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .form-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }

    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

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
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

    .subsection-label {
      font-size: 11px; color: #555; margin-bottom: 6px; margin-top: 8px;
    }
    .add-cmd-btn {
      background: none; border: 1px solid #3a3a5a; color: #888;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;
      margin-top: 4px; transition: all 0.15s;
    }
    .add-cmd-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
  `;

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
    // Conflict dialog
    this._conflictDialogConflicts = [];
    this._conflictDialogTitle = '';
    this._conflictDialogAction = '';
    this._conflictDialogPendingFn = null;
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
      ${this._conflictDialogConflicts.length > 0 ? html`
        <conflict-dialog
          .conflicts=${this._conflictDialogConflicts}
          .title=${this._conflictDialogTitle}
          .action=${this._conflictDialogAction}
          @confirm=${this._onConflictConfirm}
          @cancel=${this._onConflictCancel}>
        </conflict-dialog>
      ` : ''}
    `;
  }

  _onConflictConfirm() {
    const fn = this._conflictDialogPendingFn;
    this._conflictDialogConflicts = [];
    this._conflictDialogPendingFn = null;
    if (fn) fn();
  }

  _onConflictCancel() {
    this._conflictDialogConflicts = [];
    this._conflictDialogPendingFn = null;
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
              <label>Warning Thresholds</label>
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
                  @click=${() => this._deployToDevices(g)}>Save &amp; Deploy</button>
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
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredCmds = discovered.commands;
    const allCmds = { ...discoveredCmds };
    for (const [name, shell] of Object.entries(commands)) {
      allCmds[name] = shell || allCmds[name] || '';
    }
    const hiddenCmds = g.hidden_commands || [];
    const visibleCmds = Object.entries(allCmds).filter(([n]) => !hiddenCmds.includes(n)).sort(([a], [b]) => a.localeCompare(b));
    const hiddenEntries = Object.entries(allCmds).filter(([n]) => hiddenCmds.includes(n));

    const isEditingCmd = this._editingGroupCmd && this._editingGroupCmd.groupId === g.id;
    const isAddingCmd = this._showAddGroupCmd && this._showAddGroupCmd.groupId === g.id;

    return html`
      ${visibleCmds.length > 0 ? html`
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Shell Command</th><th>Source</th><th></th></tr>
          </thead>
          <tbody>
            ${visibleCmds.map(([name, shellCmd]) => {
              const isGroupDefined = name in commands;
              const isDiscovered = name in discoveredCmds;
              const source = isGroupDefined && isDiscovered ? 'both' : isGroupDefined ? 'group' : 'device';
              return html`
                <tr>
                  <td style="font-family: monospace;">${name}</td>
                  <td style="font-family: monospace; font-size: 11px; color: ${isGroupDefined ? '#ccc' : '#888'};">${shellCmd || '\u2014'}</td>
                  <td style="font-size: 10px; color: #666;">${source}</td>
                  <td>
                    <div class="sensor-actions">
                      <button class="sensor-btn edit"
                        @click=${() => this._startEditGroupCmd(g.id, name, shellCmd)}>Edit</button>
                      <button class="sensor-btn remove"
                        @click=${() => this._removeGroupCommand(g, name)}>Remove</button>
                      <button class="sensor-btn remove" title="Hide"
                        @click=${() => this._hideGroupCommand(g, name)}>Hide</button>
                    </div>
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      ` : html`
        <div style="font-size: 12px; color: #555; margin-bottom: 8px;">No commands</div>
      `}

      ${hiddenEntries.length > 0 ? html`
        <div style="margin-top: 6px;">
          <div style="font-size: 10px; color: #555; margin-bottom: 4px; cursor: pointer;"
            @click=${() => { g._showHiddenCmds = !g._showHiddenCmds; this.requestUpdate(); }}>
            ${g._showHiddenCmds ? '\u25BE' : '\u25B8'} ${hiddenEntries.length} hidden
          </div>
          ${g._showHiddenCmds ? html`
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${hiddenEntries.map(([name]) => html`
                <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                  ${name}
                  <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
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

  _saveGroupCmd(g) {
    const name = (this._groupCmdForm.name || '').trim();
    const shell = (this._groupCmdForm.shell || '').trim();
    if (!name || !shell) return;
    this._groups = {
      ...this._groups,
      [g.id]: {
        ...g,
        custom_commands: { ...(g.custom_commands || {}), [name]: shell },
      },
    };
    this._cancelGroupCmdForm();
  }

  _removeGroupCommand(g, name) {
    const updated = { ...(g.custom_commands || {}) };
    delete updated[name];
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, custom_commands: updated },
    };
  }

  _hideGroupCommand(g, name) {
    const hidden = [...(g.hidden_commands || [])];
    if (!hidden.includes(name)) hidden.push(name);
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, hidden_commands: hidden },
    };
  }

  _unhideGroupCommand(g, name) {
    const hidden = (g.hidden_commands || []).filter(c => c !== name);
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, hidden_commands: hidden },
    };
  }

  // ── Group Thresholds ──────────────────────────────────────────────────────

  _renderGroupThresholds(g) {
    const thresholds = g.thresholds || {};
    const form = getGroupThresholdForm(g.id);
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredAttrs = discovered.attributes;

    const extraThresholdKeys = Object.keys(thresholds).filter(
      k => thresholds[k] != null && !discoveredAttrs.includes(k)
    );
    const allDisplayAttrs = [...discoveredAttrs, ...extraThresholdKeys];

    return html`
      ${allDisplayAttrs.length > 0 ? html`
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; margin-bottom: 8px;">
          ${allDisplayAttrs.map(key => {
            const val = thresholds[key];
            const isSet = val != null && val !== '';
            return html`
              <div style="display: flex; align-items: center; gap: 6px; background: #12122a; border-radius: 4px; padding: 5px 8px;">
                <span style="font-size: 11px; color: ${isSet ? '#ccc' : '#666'}; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=${key}>${key}</span>
                ${isSet ? html`<span style="font-size: 9px; color: #4fc3f7; margin-right: 2px;" title="Threshold active">●</span>` : ''}
                <input class="threshold-input" type="number" placeholder="—"
                  style="width: 80px; font-size: 12px; padding: 3px 6px; background: #2a2a4a; border-color: ${isSet ? '#4a4a7a' : '#2a2a5a'};"
                  .value=${isSet ? String(val) : ''}
                  @input=${(e) => this._updateGroupThreshold(g.id, key, e.target.value)}>
                ${isSet ? html`
                  <button class="icon-btn delete" style="padding: 2px 4px; font-size: 10px;"
                    @click=${() => this._removeGroupThreshold(g.id, key)} title="Clear threshold">&times;</button>
                ` : ''}
              </div>
            `;
          })}
        </div>
      ` : html`<div style="font-size: 12px; color: #555; margin-bottom: 6px;">No attributes discovered from member devices yet.</div>`}
      <div style="font-size: 11px; color: #555; margin-bottom: 4px; margin-top: 4px;">Add custom threshold</div>
      <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
        <input class="small-input" type="text" placeholder="Attribute name..."
          style="width: 150px;"
          .value=${form.attr}
          @input=${(e) => { getGroupThresholdForm(g.id).attr = e.target.value; this.requestUpdate(); }}>
        <input class="small-input" type="number" placeholder="Value..."
          style="width: 90px;"
          .value=${form.value}
          @input=${(e) => { getGroupThresholdForm(g.id).value = e.target.value; this.requestUpdate(); }}>
        <button class="small-btn" @click=${() => this._addGroupThreshold(g)}>Add threshold</button>
      </div>
    `;
  }

  _addGroupThreshold(g) {
    const form = getGroupThresholdForm(g.id);
    const attr = (form.attr || '').trim();
    const value = (form.value || '').trim();
    if (!attr || value === '') return;
    this._updateGroupThreshold(g.id, attr, value);
    form.attr = '';
    form.value = '';
    this.requestUpdate();
  }

  _updateGroupThreshold(groupId, key, value) {
    const group = this._groups[groupId];
    if (!group) return;
    this._groups = {
      ...this._groups,
      [groupId]: {
        ...group,
        thresholds: { ...(group.thresholds || {}), [key]: value === '' ? null : Number(value) },
      },
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

  // ── Group Custom Sensors ──────────────────────────────────────────────────

  _renderGroupCustomSensors(g) {
    const sensors = g.custom_sensors || {};
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredSensors = discovered.sensors;
    const discoveredNames = Object.keys(discoveredSensors).sort();

    const isEditingSensor = this._editingGroupSensor && this._editingGroupSensor.groupId === g.id;
    const isAddingSensor = this._showAddGroupSensor && this._showAddGroupSensor.groupId === g.id;

    return html`
      ${discoveredNames.length > 0 ? html`
        <div class="subsection-label">Discovered from devices</div>
        <table class="sensor-table">
          <thead>
            <tr><th>Name</th><th>Command</th><th>Interval</th><th>Unit</th><th></th></tr>
          </thead>
          <tbody>
            ${discoveredNames.map(name => {
              const s = discoveredSensors[name];
              return html`
                <tr>
                  <td style="font-family: monospace;">${name}</td>
                  <td style="font-family: monospace; font-size: 11px; color: #888;">${s.command || '—'}</td>
                  <td style="color: #888;">${s.interval ? s.interval + 's' : '—'}</td>
                  <td style="color: #888;">${s.unit || '—'}</td>
                  <td></td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      ` : ''}

      <div class="subsection-label" style="margin-top: 10px;">Group sensors</div>

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
        <div style="font-size: 12px; color: #555; margin-bottom: 8px;">No group sensors defined.</div>
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

  _saveGroupSensor(g) {
    const name = (this._groupSensorForm.name || '').trim();
    const command = (this._groupSensorForm.command || '').trim();
    if (!name || !command) return;
    this._groups = {
      ...this._groups,
      [g.id]: {
        ...g,
        custom_sensors: {
          ...(g.custom_sensors || {}),
          [name]: {
            command,
            interval: this._groupSensorForm.interval ? Number(this._groupSensorForm.interval) : undefined,
            unit: this._groupSensorForm.unit || undefined,
          },
        },
      },
    };
    this._cancelGroupSensorForm();
  }

  _removeGroupSensor(g, name) {
    const updated = { ...(g.custom_sensors || {}) };
    delete updated[name];
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, custom_sensors: updated },
    };
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
    // Check for conflicts before adding the device
    try {
      const result = await checkGroupConflicts(g.id, deviceId);
      if (result && result.conflict_count > 0) {
        const deviceName = (this._devices[deviceId] && this._devices[deviceId].device_name) || deviceId;
        this._conflictDialogTitle = `Adding "${deviceName}" to group "${g.name}"`;
        this._conflictDialogAction = 'Add Device';
        this._conflictDialogConflicts = result.conflicts;
        this._conflictDialogPendingFn = () => this._doAddMember(g, deviceId);
        return;
      }
    } catch (e) {
      console.error('Conflict check failed, proceeding anyway:', e);
    }
    await this._doAddMember(g, deviceId);
  }

  async _doAddMember(g, deviceId) {
    const deviceIds = [...(g.device_ids || []), deviceId];
    try {
      await updateGroup(g.id, { device_ids: deviceIds });
      await this._loadAll();
    } catch (e) {
      console.error('Failed to add member:', e);
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
      if (v != null && !isNaN(v)) cleanThresholds[k] = v;
    }
    const savedName = name || latest.name;
    const payload = {
      name: savedName,
      device_ids: latest.device_ids || [],
      custom_commands: latest.custom_commands || {},
      custom_sensors: latest.custom_sensors || {},
      thresholds: cleanThresholds,
      hidden_commands: latest.hidden_commands || [],
    };
    console.log('Saving group:', g.id, payload);
    try {
      await updateGroup(g.id, payload);
      this._groups = {
        ...this._groups,
        [g.id]: { ...g, name: savedName, thresholds: cleanThresholds },
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

    // Check for conflicts before deploying to all devices
    try {
      const result = await checkGroupConflicts(g.id);
      if (result && result.conflict_count > 0) {
        this._conflictDialogTitle = `Deploying group "${g.name}" to ${result.device_count} device${result.device_count !== 1 ? 's' : ''}`;
        this._conflictDialogAction = 'Deploy';
        this._conflictDialogConflicts = result.conflicts;
        this._conflictDialogPendingFn = () => this._doDeploy(g);
        return;
      }
    } catch (e) {
      console.error('Conflict check failed, proceeding anyway:', e);
    }
    await this._doDeploy(g);
  }

  async _doDeploy(g) {
    const latest = this._groups[g.id] || g;
    const config = {
      commands: latest.custom_commands || {},
      plugins: {
        custom_command: {
          commands: latest.custom_sensors || {},
        },
      },
    };
    const hiddenCmds = latest.hidden_commands || [];
    if (hiddenCmds.length > 0) {
      for (const did of (latest.device_ids || [])) {
        try {
          await updateDeviceSettings(did, { hidden_commands: hiddenCmds });
        } catch (e) { console.error(`Failed to set hidden_commands on ${did}:`, e); }
      }
    }

    console.log('Deploy to group:', g.id, 'config:', JSON.stringify(config));
    this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Deploying...' };
    try {
      const result = await pushGroupConfig(g.id, config);
      console.log('Deploy result:', result);
      this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Deployed!' };
      setTimeout(() => {
        this._groupPushStatus = { ...this._groupPushStatus, [g.id]: '' };
      }, 3000);
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

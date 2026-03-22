import { LitElement, html, css } from 'lit';
import {
  fetchTags, createTag, renameTag, deleteTag,
  fetchSettings, updateSettings,
  fetchGroups, createGroup, updateGroup, deleteGroup,
  sendGroupCommand, pushGroupConfig,
  fetchDevices,
} from '../services/api.js';

// Per-group ephemeral state for custom command editing
const _groupCmdForms = {}; // groupId → { name: '', shellCmd: '' }
function getGroupCmdForm(groupId) {
  if (!_groupCmdForms[groupId]) _groupCmdForms[groupId] = { name: '', shellCmd: '' };
  return _groupCmdForms[groupId];
}

// Per-group ephemeral state for custom sensor editing
const _groupSensorForms = {}; // groupId → { name: '', command: '', interval: '', unit: '' }
function getGroupSensorForm(groupId) {
  if (!_groupSensorForms[groupId]) _groupSensorForms[groupId] = { name: '', command: '', interval: '', unit: '' };
  return _groupSensorForms[groupId];
}

// Per-group ephemeral state for threshold add row
const _groupThresholdForms = {}; // groupId → { attr: '', value: '' }
function getGroupThresholdForm(groupId) {
  if (!_groupThresholdForms[groupId]) _groupThresholdForms[groupId] = { attr: '', value: '' };
  return _groupThresholdForms[groupId];
}

// Global threshold add form
const _globalThresholdForm = { attr: '', value: '' };

class SettingsView extends LitElement {
  static properties = {
    _tags: { type: Array, state: true },
    _settings: { type: Object, state: true },
    _groups: { type: Object, state: true },
    _devices: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _newTagName: { type: String, state: true },
    _renamingTag: { type: String, state: true },
    _renameValue: { type: String, state: true },
    _expandedGroup: { type: String, state: true },
    _newGroupName: { type: String, state: true },
    _editGroupName: { type: String, state: true },
    _editingGroupName: { type: String, state: true },
    _savingSettings: { type: Boolean, state: true },
    _settingsSaved: { type: Boolean, state: true },
    _groupSaveStatus: { type: Object, state: true },
    _groupPushStatus: { type: Object, state: true },
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

    /* Tag registry */
    .tag-list { display: flex; flex-direction: column; gap: 6px; }
    .tag-row {
      display: flex; align-items: center; justify-content: space-between;
      background: #1a1a2e; border-radius: 6px; padding: 8px 14px;
    }
    .tag-row-left { display: flex; align-items: center; gap: 10px; }
    .tag-name { font-size: 13px; color: #ccc; cursor: pointer; }
    .tag-name:hover { color: #4fc3f7; text-decoration: underline; }
    .tag-count { font-size: 11px; color: #666; }
    .tag-row-actions { display: flex; gap: 6px; }
    .icon-btn {
      background: none; border: none; cursor: pointer; font-size: 12px;
      padding: 2px 8px; border-radius: 4px; transition: all 0.15s;
    }
    .icon-btn.delete { color: #666; }
    .icon-btn.delete:hover { color: #ef5350; background: rgba(239,83,80,0.1); }
    .rename-row {
      display: flex; gap: 6px; align-items: center;
    }
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
    .small-btn.cancel { background: #3a3a5a; color: #aaa; }
    .small-btn.cancel:hover { background: #4a4a6a; }
    .add-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; }

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
    .threshold-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 8px;
    }
    .threshold-item label {
      font-size: 11px; color: #888; display: block; margin-bottom: 3px;
      text-transform: none; letter-spacing: 0;
    }
    .threshold-input {
      width: 100%; background: #2a2a4a; border: 1px solid #3a3a5a;
      border-radius: 4px; color: #e0e0e0; padding: 6px 10px;
      font-size: 13px; box-sizing: border-box;
    }
    .threshold-input:focus { outline: none; border-color: #4fc3f7; }
    .group-footer { display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end; }
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

    /* Global defaults */
    .settings-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px; margin-bottom: 16px;
    }
    .settings-field label {
      display: block; font-size: 11px; color: #888; margin-bottom: 4px;
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
    .group-status-saved { font-size: 12px; color: #81c784; margin-left: 8px; }
    .group-status-error { font-size: 12px; color: #ef5350; margin-left: 8px; }
    .group-status-pushing { font-size: 12px; color: #4fc3f7; margin-left: 8px; }
    .group-status-pushed { font-size: 12px; color: #81c784; margin-left: 8px; }

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

    .loading { padding: 40px; text-align: center; color: #666; }
  `;

  constructor() {
    super();
    this._tags = [];
    this._settings = null;
    this._groups = {};
    this._devices = {};
    this._loading = true;
    this._newTagName = '';
    this._renamingTag = null;
    this._renameValue = '';
    this._expandedGroup = null;
    this._newGroupName = '';
    this._editGroupName = '';
    this._editingGroupName = null;
    this._savingSettings = false;
    this._settingsSaved = false;
    this._groupSaveStatus = {};
    this._groupPushStatus = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadAll();
  }

  async _loadAll() {
    this._loading = true;
    try {
      const [tags, settings, groups, devices] = await Promise.all([
        fetchTags().catch(() => []),
        fetchSettings().catch(() => ({})),
        fetchGroups().catch(() => ({})),
        fetchDevices().catch(() => ({})),
      ]);
      this._tags = Array.isArray(tags)
        ? tags.map(t => (typeof t === 'string' ? { tag: t, count: 0 } : t)).sort((a, b) => a.tag.localeCompare(b.tag))
        : [];
      this._settings = settings;
      this._groups = groups || {};
      this._devices = devices || {};
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) return html`<div class="loading">Loading settings...</div>`;

    return html`
      <h2>Settings</h2>
      ${this._renderTagRegistry()}
      ${this._renderGroupPolicies()}
      ${this._renderGlobalDefaults()}
    `;
  }

  // ── Tag Registry ──────────────────────────────────────────────────────────

  _renderTagRegistry() {
    return html`
      <div class="section">
        <div class="section-title">Tag Registry</div>
        <div class="tag-list">
          ${this._tags.map(item => this._renderTagRow(item))}
        </div>
        <div class="add-row">
          <input class="small-input" type="text" placeholder="New tag name..."
            .value=${this._newTagName}
            @input=${(e) => this._newTagName = e.target.value}
            @keydown=${(e) => e.key === 'Enter' && this._createTag()}>
          <button class="small-btn" @click=${this._createTag}>New Tag</button>
        </div>
      </div>
    `;
  }

  _renderTagRow(item) {
    const isRenaming = this._renamingTag === item.tag;
    return html`
      <div class="tag-row">
        <div class="tag-row-left">
          ${isRenaming ? html`
            <div class="rename-row">
              <input class="small-input" type="text" .value=${this._renameValue}
                @input=${(e) => this._renameValue = e.target.value}
                @keydown=${(e) => { if (e.key === 'Enter') this._saveRename(item.tag); if (e.key === 'Escape') this._cancelRename(); }}>
              <button class="small-btn" @click=${() => this._saveRename(item.tag)}>Save</button>
              <button class="small-btn cancel" @click=${this._cancelRename}>Cancel</button>
            </div>
          ` : html`
            <span class="tag-name" @click=${() => this._startRename(item.tag)}>${item.tag}</span>
            <span class="tag-count">${item.count} device${item.count !== 1 ? 's' : ''}</span>
          `}
        </div>
        ${!isRenaming ? html`
          <div class="tag-row-actions">
            <button class="icon-btn delete" title="Delete tag"
              @click=${() => this._deleteTag(item.tag)}>Delete</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  _startRename(tag) {
    this._renamingTag = tag;
    this._renameValue = tag;
  }

  _cancelRename() {
    this._renamingTag = null;
    this._renameValue = '';
  }

  async _saveRename(oldTag) {
    const newName = this._renameValue.trim();
    if (!newName || newName === oldTag) { this._cancelRename(); return; }
    try {
      await renameTag(oldTag, newName);
      await this._loadAll();
    } catch (e) {
      console.error('Failed to rename tag:', e);
    }
    this._cancelRename();
  }

  async _createTag() {
    const name = this._newTagName.trim();
    if (!name) return;
    try {
      await createTag(name);
      this._newTagName = '';
      await this._loadAll();
    } catch (e) {
      console.error('Failed to create tag:', e);
    }
  }

  async _deleteTag(tag) {
    const item = this._tags.find(t => t.tag === tag);
    if (item && item.count > 0) {
      if (!confirm(`"${tag}" is used by ${item.count} device(s). Delete anyway?`)) return;
    }
    try {
      await deleteTag(tag);
      await this._loadAll();
    } catch (e) {
      console.error('Failed to delete tag:', e);
    }
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

      // Attributes
      if (dev.attributes && typeof dev.attributes === 'object') {
        for (const key of Object.keys(dev.attributes)) {
          attributeSet.add(key);
        }
      }

      // Allowed commands (no shell cmd known)
      if (Array.isArray(dev.allowed_commands)) {
        for (const cmd of dev.allowed_commands) {
          if (!(cmd in commandMap)) commandMap[cmd] = '';
        }
      }

      // Server commands (have shell cmd)
      if (dev.server_commands && typeof dev.server_commands === 'object') {
        for (const [cmd, shellCmd] of Object.entries(dev.server_commands)) {
          commandMap[cmd] = shellCmd || commandMap[cmd] || '';
        }
      }

      // Sensors from remote_config custom_command
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

  // ── Group Policies ────────────────────────────────────────────────────────

  _renderGroupPolicies() {
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
    const thresholds = g.thresholds || {};

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
              <button class="group-save-btn" @click=${() => this._saveGroup(g)}>Save</button>
              ${this._groupSaveStatus[g.id] === 'saved' ? html`<span class="group-status-saved">Saved!</span>` : ''}
              ${this._groupSaveStatus[g.id] === 'error' ? html`<span class="group-status-error">Error</span>` : ''}
              <button class="group-save-btn" style="background: #2e7d32;"
                @click=${() => this._pushGroupConfig(g)}>Push to Group</button>
              ${this._groupPushStatus[g.id] === 'Pushing...' ? html`<span class="group-status-pushing">Pushing...</span>` : ''}
              ${this._groupPushStatus[g.id] === 'Pushed!' ? html`<span class="group-status-pushed">Pushed!</span>` : ''}
              ${(this._groupPushStatus[g.id] || '').startsWith('Error') ? html`<span class="group-status-error">${this._groupPushStatus[g.id]}</span>` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderGroupCustomCommands(g) {
    const commands = g.custom_commands || {};
    const form = getGroupCmdForm(g.id);
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredCmds = discovered.commands; // { name: shellCmd }
    const discoveredNames = Object.keys(discoveredCmds);

    return html`
      ${discoveredNames.length > 0 ? html`
        <div style="font-size: 11px; color: #555; margin-bottom: 4px;">Discovered from devices</div>
        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
          ${discoveredNames.sort().map(name => {
            const shellCmd = discoveredCmds[name];
            const included = name in commands;
            return html`
              <div style="background: ${included ? '#2a1a4a' : '#1a1a2e'}; border: 1px solid ${included ? '#7e57c2' : '#2a2a4a'}; border-radius: 4px; padding: 4px 8px; display: flex; flex-direction: column; gap: 1px; max-width: 200px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 11px; color: ${included ? '#ce93d8' : '#888'}; font-weight: 600; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${name}</span>
                  <span class="cmd-toggle-wrap" @click=${() => this._toggleDiscoveredCommand(g, name, shellCmd, !included)}>
                    <div class="cmd-toggle ${included ? 'on' : 'off'}">
                      <div class="cmd-toggle-knob"></div>
                    </div>
                  </span>
                </div>
                ${shellCmd ? html`<span style="font-size: 9px; color: #7060a0; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title=${shellCmd}>${shellCmd}</span>` : ''}
              </div>
            `;
          })}
        </div>
      ` : ''}

      ${Object.keys(commands).filter(n => !discoveredNames.includes(n)).length > 0 ? html`
        <div style="font-size: 11px; color: #555; margin-bottom: 4px;">Custom commands</div>
        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
          ${Object.entries(commands).filter(([n]) => !discoveredNames.includes(n)).map(([name, shellCmd]) => html`
            <span title=${shellCmd} style="font-size: 10px; background: #3a1e5f; color: #ce93d8; padding: 4px 8px; border-radius: 3px; display: flex; flex-direction: column; gap: 1px; max-width: 200px;">
              <span style="display: flex; align-items: center; gap: 4px; font-weight: 600;">
                ${name}
                <span style="cursor: pointer; opacity: 0.6;"
                  @click=${() => this._removeGroupCommand(g, name)}>&times;</span>
              </span>
              <span style="font-size: 9px; color: #a070c0; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${shellCmd}</span>
            </span>
          `)}
        </div>
      ` : (discoveredNames.length === 0 && Object.keys(commands).length === 0 ? html`<div style="font-size: 12px; color: #555; margin-bottom: 6px;">No commands discovered yet.</div>` : '')}

      <div style="font-size: 11px; color: #555; margin-bottom: 4px; margin-top: 4px;">Add new command</div>
      <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
        <input class="small-input" type="text" placeholder="Command name..."
          style="width: 130px;"
          .value=${form.name}
          @input=${(e) => { getGroupCmdForm(g.id).name = e.target.value; this.requestUpdate(); }}>
        <input class="small-input" type="text" placeholder="Shell command..."
          style="width: 220px;"
          .value=${form.shellCmd}
          @input=${(e) => { getGroupCmdForm(g.id).shellCmd = e.target.value; this.requestUpdate(); }}>
        <button class="small-btn" @click=${() => this._addGroupCommand(g)}>Add</button>
      </div>
    `;
  }

  _toggleDiscoveredCommand(g, name, shellCmd, include) {
    const commands = { ...(g.custom_commands || {}) };
    if (include) {
      commands[name] = shellCmd || '';
    } else {
      delete commands[name];
    }
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, custom_commands: commands },
    };
  }

  _renderGroupThresholds(g) {
    const thresholds = g.thresholds || {};
    const form = getGroupThresholdForm(g.id);
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredAttrs = discovered.attributes;

    // Build a unified list: discovered attrs first, then any threshold attrs not in discovered
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

  _renderGroupCustomSensors(g) {
    const sensors = g.custom_sensors || {};
    const form = getGroupSensorForm(g.id);
    const discovered = this._getGroupDiscoveredData(g);
    const discoveredSensors = discovered.sensors;
    const discoveredNames = Object.keys(discoveredSensors);

    return html`
      ${discoveredNames.length > 0 ? html`
        <div style="font-size: 11px; color: #555; margin-bottom: 4px;">Discovered from devices</div>
        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px;">
          ${discoveredNames.sort().map(name => {
            const sensor = discoveredSensors[name];
            return html`
              <span style="font-size: 10px; background: #0e2a2a; color: #4db6ac; padding: 4px 8px; border-radius: 3px; display: flex; flex-direction: column; gap: 1px; max-width: 220px; border: 1px solid #1a3a3a;" title="Reported by member device">
                <span style="font-weight: 600;">${name}</span>
                ${sensor.command ? html`<span style="font-size: 9px; color: #40807a; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sensor.command}</span>` : ''}
                <span style="font-size: 9px; color: #406060;">${sensor.interval ? sensor.interval + 's' : ''} ${sensor.unit || ''}</span>
              </span>
            `;
          })}
        </div>
      ` : ''}

      ${Object.keys(sensors).length > 0 ? html`
        <div style="font-size: 11px; color: #555; margin-bottom: 4px;">Group sensors</div>
        <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
          ${Object.entries(sensors).map(([name, sensor]) => html`
            <span style="font-size: 10px; background: #1a3a3a; color: #80cbc4; padding: 4px 8px; border-radius: 3px; display: flex; flex-direction: column; gap: 1px; max-width: 220px;">
              <span style="display: flex; align-items: center; gap: 4px; font-weight: 600;">
                ${name}
                <span style="cursor: pointer; opacity: 0.6;"
                  @click=${() => this._removeGroupSensor(g, name)}>&times;</span>
              </span>
              <span style="font-size: 9px; color: #60a0a0; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sensor.command || ''}</span>
              <span style="font-size: 9px; color: #608080;">${sensor.interval ? sensor.interval + 's' : ''} ${sensor.unit || ''}</span>
            </span>
          `)}
        </div>
      ` : (discoveredNames.length === 0 ? html`<div style="font-size: 12px; color: #555; margin-bottom: 6px;">No custom sensors</div>` : '')}

      <div style="font-size: 11px; color: #555; margin-bottom: 4px; margin-top: 4px;">Add sensor</div>
      <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
        <input class="small-input" type="text" placeholder="Sensor name..."
          style="width: 110px;"
          .value=${form.name}
          @input=${(e) => { getGroupSensorForm(g.id).name = e.target.value; this.requestUpdate(); }}>
        <input class="small-input" type="text" placeholder="Shell command..."
          style="width: 200px;"
          .value=${form.command}
          @input=${(e) => { getGroupSensorForm(g.id).command = e.target.value; this.requestUpdate(); }}>
        <input class="small-input" type="number" placeholder="Interval (s)"
          style="width: 90px;"
          .value=${form.interval}
          @input=${(e) => { getGroupSensorForm(g.id).interval = e.target.value; this.requestUpdate(); }}>
        <input class="small-input" type="text" placeholder="Unit"
          style="width: 60px;"
          .value=${form.unit}
          @input=${(e) => { getGroupSensorForm(g.id).unit = e.target.value; this.requestUpdate(); }}>
        <button class="small-btn" @click=${() => this._addGroupSensor(g)}>Add</button>
      </div>
    `;
  }

  _addGroupSensor(g) {
    const form = getGroupSensorForm(g.id);
    const name = (form.name || '').trim();
    const command = (form.command || '').trim();
    if (!name || !command) return;
    this._groups = {
      ...this._groups,
      [g.id]: {
        ...g,
        custom_sensors: {
          ...(g.custom_sensors || {}),
          [name]: {
            command,
            interval: form.interval ? Number(form.interval) : undefined,
            unit: form.unit || undefined,
          },
        },
      },
    };
    form.name = '';
    form.command = '';
    form.interval = '';
    form.unit = '';
    this.requestUpdate();
  }

  _removeGroupSensor(g, name) {
    const updated = { ...(g.custom_sensors || {}) };
    delete updated[name];
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, custom_sensors: updated },
    };
  }

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

  async _addMember(g, deviceId) {
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

  async _saveGroup(g) {
    const name = this._editingGroupName === g.id ? this._editGroupName.trim() : g.name;
    // Filter out thresholds where value is null or NaN
    const cleanThresholds = {};
    for (const [k, v] of Object.entries(g.thresholds || {})) {
      if (v != null && !isNaN(v)) cleanThresholds[k] = v;
    }
    const savedName = name || g.name;
    try {
      await updateGroup(g.id, {
        name: savedName,
        device_ids: g.device_ids || [],
        custom_commands: g.custom_commands || {},
        custom_sensors: g.custom_sensors || {},
        thresholds: cleanThresholds,
      });
      // Update local state without full reload
      this._groups = {
        ...this._groups,
        [g.id]: { ...g, name: savedName, thresholds: cleanThresholds },
      };
      if (this._editingGroupName === g.id) this._editingGroupName = null;
      // Show "Saved!" feedback for 2 seconds
      this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: 'saved' };
      setTimeout(() => {
        this._groupSaveStatus = { ...this._groupSaveStatus, [g.id]: '' };
      }, 2000);
    } catch (e) {
      console.error('Failed to save group:', e);
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

  _addGroupCommand(g) {
    const form = getGroupCmdForm(g.id);
    const name = (form.name || '').trim();
    const shellCmd = (form.shellCmd || '').trim();
    if (!name || !shellCmd) return;
    this._groups = {
      ...this._groups,
      [g.id]: {
        ...g,
        custom_commands: { ...(g.custom_commands || {}), [name]: shellCmd },
      },
    };
    form.name = '';
    form.shellCmd = '';
    this.requestUpdate();
  }

  _removeGroupCommand(g, name) {
    const updated = { ...(g.custom_commands || {}) };
    delete updated[name];
    this._groups = {
      ...this._groups,
      [g.id]: { ...g, custom_commands: updated },
    };
  }

  async _pushGroupConfig(g) {
    // Auto-save first so server has latest data
    await this._saveGroup(g);

    const config = {
      commands: g.custom_commands || {},
      plugins: {
        custom_command: {
          commands: g.custom_sensors || {},
        },
      },
    };
    console.log('Push to group:', g.id, 'config:', JSON.stringify(config));
    this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Pushing...' };
    try {
      const result = await pushGroupConfig(g.id, config);
      console.log('Push result:', result);
      this._groupPushStatus = { ...this._groupPushStatus, [g.id]: 'Pushed!' };
      setTimeout(() => {
        this._groupPushStatus = { ...this._groupPushStatus, [g.id]: '' };
      }, 3000);
    } catch (e) {
      console.error('Failed to push group config:', e);
      const msg = e && e.message ? `Error: ${e.message}` : 'Error';
      this._groupPushStatus = { ...this._groupPushStatus, [g.id]: msg };
      setTimeout(() => {
        this._groupPushStatus = { ...this._groupPushStatus, [g.id]: '' };
      }, 3000);
    }
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

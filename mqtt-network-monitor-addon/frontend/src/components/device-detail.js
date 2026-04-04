import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import {
  fetchDevice, fetchDevices, deleteDevice, deleteAttribute, unhideAttribute, hideCommand, unhideCommand, sendCommand, addDeviceTags, removeDeviceTag,
  fetchGroups, createGroup, updateGroup, forceApplyGroup,
  fetchEffectiveSettings, updateDeviceSettings,
} from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './tag-picker.js';
import './device-attributes.js';
import './device-commands.js';
import './device-config.js';

class DeviceDetail extends LitElement {
  static properties = {
    deviceId:           { type: String },
    groupId:            { type: String },
    device:             { type: Object },
    commandResult:      { type: String },
    _groups:            { type: Object,  state: true },
    _effectiveSettings: { type: Object,  state: true },
    _haOverrides:       { type: Object,  state: true },
    _configInterval:    { type: Number,  state: true },
    _customSensors:     { type: Object,  state: true },
    _showGroupDialog:   { type: Boolean, state: true },
    _newGroupName:      { type: String,  state: true },
    _serverCommands:    { type: Object,  state: true },
  };

  static styles = [sharedStyles, css`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }

    .close-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 20px; padding: 4px 8px; line-height: 1; border-radius: 4px;
      transition: all 0.15s;
    }
    .close-btn:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.05); }

    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .header-left { display: flex; flex-direction: column; gap: 2px; }
    .title       { font-size: 24px; font-weight: 700; }
    .title[contenteditable] { cursor: text; border-bottom: 1px dashed rgba(255,255,255,0.3); }
    .title[contenteditable]:focus { outline: none; border-bottom-color: #00D4FF; }
    .device-type { font-size: 12px; color: #fff; }
    .status-badge { padding: 4px 12px; border-radius: 12px; font-size: 13px; }

    .section {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #238ecc; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    /* Tags */
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 10px; }
    .tag { display: flex; align-items: center; gap: 4px; font-size: 11px; padding: 3px 10px; border-radius: 4px; }
    .tag.client { background: rgba(0,212,255,0.15); color: #00D4FF; }
    .tag.server { background: rgba(99,102,241,0.15); color: #238ecc; }
    .tag .remove { cursor: pointer; font-size: 13px; line-height: 1; opacity: 0.6; }
    .tag .remove:hover { opacity: 1; }
    .tag-hint { font-size: 10px; color: #fff; margin-top: 8px; }

    /* Group policy */
    .group-policy-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .group-select {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
      color: #fff; padding: 6px 12px; font-size: 13px; min-width: 200px;
    }
    .group-select:focus { outline: none; border-color: #00D4FF; }
    .group-threshold-summary {
      font-size: 11px; color: #fff; display: flex; gap: 12px; flex-wrap: wrap;
      margin-top: 8px;
    }
    .group-hint { font-size: 10px; color: #fff; margin-top: 8px; }

    /* Network */
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item  { font-size: 13px; color: #fff; }
    .net-label { color: #fff; margin-right: 8px; }

    /* Shared cmd-btn used in header and group policy */
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover        { background: rgba(255,255,255,0.15); }
    .cmd-btn.danger       { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }

    /* Dialog overlay */
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .dialog {
      background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px;
      min-width: 320px; border: 1px solid rgba(255,255,255,0.1);
    }
    .dialog h3 { color: #fff; margin-bottom: 12px; font-size: 16px; margin-top: 0; }
    .dialog-field { margin-bottom: 12px; }
    .dialog-field label { display: block; font-size: 11px; color: #fff; margin-bottom: 4px; }
    .dialog-field input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px; color: #fff; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .dialog-field input:focus { outline: none; border-color: #00D4FF; }
    .dialog-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
    .dialog-btn { border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-size: 13px; }
    .dialog-btn.save   { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .dialog-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
  `];

  constructor() {
    super();
    this.device             = null;
    this.commandResult      = '';
    this._groups            = {};
    this._effectiveSettings = null;
    this._haOverrides       = {};
    this._configInterval    = 30;
    this._customSensors     = {};
    this._showGroupDialog   = false;
    this._newGroupName      = '';
    this._serverCommands    = {};
  }

  get _isGroupMode() { return !!this.groupId && !this.deviceId; }

  connectedCallback() {
    super.connectedCallback();
    this._loadGroups();
    if (this._isGroupMode) {
      this._loadGroupAggregate();
    } else {
      this._loadDevice();
    }
    this._wsUnsub = wsService.onMessage((data) => {
      if (data.type === 'device_update') {
        if (this._isGroupMode) {
          // Don't update values while editing — too distracting
          return;
        }
        if (data.device_id === this.deviceId) {
          this._updateDeviceData(data.device);
        }
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._wsUnsub) this._wsUnsub();
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
    // Only trigger re-render if data actually changed — prevents flickering
    const merged = { ...(this.device || {}), ...device };
    const oldJson = JSON.stringify(this.device);
    const newJson = JSON.stringify(merged);
    if (oldJson !== newJson) {
      this.device = merged;
    }
  }

  async _loadGroupAggregate() {
    try {
      const groups = await fetchGroups();
      this._groups = groups;
      const group = groups[this.groupId];
      if (!group) return;
      const allDevices = await fetchDevices();
      const memberIds = group.device_ids || [];
      const members = memberIds.map(id => allDevices[id]).filter(Boolean);

      // Build aggregate attributes: union of all member attributes
      const aggregatedAttrs = {};
      for (const member of members) {
        for (const [name, data] of Object.entries(member.attributes || {})) {
          if (!aggregatedAttrs[name]) {
            aggregatedAttrs[name] = { ...data };
          }
        }
      }

      // Build aggregate commands: union of all member commands
      const aggregatedCommands = new Set();
      for (const member of members) {
        for (const cmd of (member.allowed_commands || [])) {
          aggregatedCommands.add(cmd);
        }
      }

      // Build aggregate active_plugins: union of all member plugins
      const aggregatedPlugins = new Set();
      for (const member of members) {
        for (const p of (member.active_plugins || [])) {
          aggregatedPlugins.add(p);
        }
      }
      // Groups can always have custom commands pushed to members
      aggregatedPlugins.add('custom_command');

      // Create virtual device representing the group
      this.device = {
        device_name: group.name,
        device_type: `Group · ${memberIds.length} device${memberIds.length !== 1 ? 's' : ''}`,
        status: members.some(m => m.status === 'online') ? 'online' : 'offline',
        attributes: aggregatedAttrs,
        attribute_transforms: group.attribute_transforms || {},
        threshold_overrides: group.thresholds || {},
        crit_threshold_overrides: group.crit_thresholds || {},
        allowed_commands: [...aggregatedCommands],
        hidden_commands: group.hidden_commands || [],
        hidden_attributes: group.hidden_attributes || [],
        card_attributes: group.card_attributes || [],
        active_plugins: [...aggregatedPlugins],
        tags: [],
        server_tags: [],
        group_policy: this.groupId,
        _isGroupAggregate: true,
      };
      this._configInterval = group.interval ?? 30;
      this._serverCommands = {};
      this._customSensors = group.custom_sensors || {};
      this._haOverrides = {};
      this._effectiveSettings = null;
    } catch (e) {
      console.error('Failed to load group aggregate:', e);
    }
  }

  async _refreshGroupAggregate() {
    // Reload attribute data from member devices but preserve current group settings.
    try {
      const groups = await fetchGroups();
      const group = groups[this.groupId];
      if (!group) return;
      const allDevices = await fetchDevices();
      const members = (group.device_ids || []).map(id => allDevices[id]).filter(Boolean);

      const aggregatedAttrs = {};
      for (const member of members) {
        for (const [name, data] of Object.entries(member.attributes || {})) {
          if (!aggregatedAttrs[name]) {
            aggregatedAttrs[name] = { ...data };
          }
        }
      }

      // Update attributes only, preserve everything else from local state
      this.device = { ...this.device, attributes: aggregatedAttrs };
      this._groups = { ...this._groups, [this.groupId]: group };
      this._customSensors = group.custom_sensors || {};
      this.requestUpdate();
    } catch (e) {
      // Silently ignore refresh errors
    }
  }

  async _loadDevice() {
    try {
      this.device          = await fetchDevice(this.deviceId);
      this._haOverrides    = { ...(this.device.ha_exposure_overrides || {}) };
      const sc = this.device.server_commands;
      this._serverCommands = (sc && !Array.isArray(sc)) ? { ...sc } : {};
      this._configInterval = this.device.config_interval ?? this.device.collection_interval ?? (this.device.remote_config?.interval) ?? 30;
      const ss = this.device.server_sensors;
      this._customSensors = (ss && typeof ss === 'object') ? { ...ss } : {};
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

  // ── Render ─────────────────────────────────────────────────────────────────

  render() {
    if (!this.device) return html`<div style="padding: 40px; text-align: center; color: #fff;">Loading...</div>`;
    const d = this.device;
    const isGroup = this._isGroupMode;
    const statusColor = d.status === 'online' ? '#04d65c' : d.status === 'offline' ? '#ef5350' : '#ffb74d';

    return html`
      <!-- 1. Header -->
      <div class="header">
        <div class="header-left">
          ${isGroup
            ? html`<span class="title" contenteditable="true"
                @blur=${(e) => this._renameGroup(e.target.textContent.trim())}
                @keydown=${(e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } }}
                >${d.device_name || this.groupId}</span>`
            : html`<span class="title">${d.device_name || this.deviceId}</span>`
          }
          <span class="device-type">${d.device_type || ''}${d.client_version ? ` · v${d.client_version}` : ''}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          ${!isGroup ? html`
            <span class="status-badge" style="background: ${statusColor}20; color: ${statusColor}">
              ${d.status}
            </span>
            <button class="cmd-btn danger" style="font-size: 11px; padding: 4px 10px;"
              @click=${this._deleteDevice}>Delete</button>
          ` : html`
            <span style="font-size: 11px; color: rgba(255,255,255,0.4);">Group Policy Editor</span>
            <button class="cmd-btn" style="font-size: 10px; padding: 3px 8px; background: rgba(239,83,80,0.1); color: #ef5350; border: 1px solid rgba(239,83,80,0.2);"
              @click=${this._forceApplyGroup}>Force Apply</button>
          `}
          <button class="close-btn" @click=${() => this.dispatchEvent(new CustomEvent('back'))}>&#10005;</button>
        </div>
      </div>

      ${!isGroup ? html`
        <!-- 2. Tags -->
        ${this._renderTagsSection()}
        <!-- 3. Group Policy -->
        ${this._renderGroupPolicy()}
      ` : ''}

      <!-- 4. Attributes + HA Exposure + Thresholds -->
      <device-attributes
        .device=${this.device}
        .effectiveSettings=${this._effectiveSettings}
        .haOverrides=${this._haOverrides}
        .groups=${this._groups}
        .cardAttributes=${this.device?.card_attributes || []}
        .attributeTransforms=${this._effectiveTransforms()}
        .groupTransforms=${this._groupTransforms()}
        @attribute-deleted=${(e) => this._deleteAttribute(e.detail.name)}
        @attribute-unhidden=${(e) => this._unhideAttribute(e.detail.name)}
        @ha-exposure-toggled=${(e) => this._toggleHaExposure(e.detail.name)}
        @threshold-changed=${(e) => this._setThreshold(e.detail.name, e.detail.value, e.detail.op)}
        @crit-threshold-changed=${(e) => this._setCritThreshold(e.detail.name, e.detail.value, e.detail.op)}
        @pin-attribute=${(e) => this._toggleCardAttribute(e.detail)}
        @transform-changed=${(e) => this._setAttributeTransform(e.detail.attr, e.detail.transform)}
      ></device-attributes>

      ${!isGroup ? html`
        <!-- 5. Network -->
        ${this._renderNetwork()}
      ` : ''}

      <!-- 6. Commands -->
      <device-commands
        .device=${this.device}
        .serverCommands=${isGroup ? (this._groups?.[this.groupId]?.custom_commands || {}) : this._serverCommands}
        .commandResult=${this.commandResult}
        @command-send=${(e) => this._sendCmd(e.detail.command)}
        @command-hide=${(e) => this._hideCommand(e.detail.name)}
        @command-unhide=${(e) => this._unhideCommand(e.detail.name)}
        @server-command-save=${(e) => isGroup ? this._saveGroupCommand(e.detail) : this._saveServerCommand(e.detail)}
        @server-command-remove=${(e) => isGroup ? this._removeGroupCommand(e.detail.name) : this._removeServerCommand(e.detail.name)}
      ></device-commands>

      <!-- 7. Agent Configuration -->
      <device-config
        .device=${this.device}
        .configInterval=${this._configInterval}
        .customSensors=${this._customSensors}
        @interval-changed=${(e) => isGroup ? this._setGroupInterval(e.detail.value) : this._onIntervalChange(e.detail.value)}
        @sensor-save=${(e) => isGroup ? this._saveGroupSensor(e.detail) : this._saveSensor(e.detail)}
        @sensor-remove=${(e) => isGroup ? this._removeGroupSensor(e.detail.key) : this._removeSensor(e.detail.key)}
      ></device-config>

      ${this._showGroupDialog ? this._renderGroupDialog() : ''}
    `;
  }

  // ── Tags ───────────────────────────────────────────────────────────────────

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

  async _addTag(tag) {
    if (!tag) return;
    await addDeviceTags(this.deviceId, [tag]);
    await this._loadDevice();
  }

  async _removeTag(tag) {
    await removeDeviceTag(this.deviceId, tag);
    await this._loadDevice();
  }

  // ── Group Policy ───────────────────────────────────────────────────────────

  _renderGroupPolicy() {
    const groups          = Object.values(this._groups);
    const currentGroupId  = this.device.group_policy || '';
    const currentGroup    = currentGroupId ? this._groups[currentGroupId] : null;
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
        </div>


        <div class="group-hint">
          Group policy sets default thresholds and HA entity settings. Device-level overrides take priority.
          Manage groups in Settings.
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
            <button class="dialog-btn save"   @click=${this._createGroup}>Create</button>
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
    this._newGroupName    = '';
    this._showGroupDialog = false;
    await this._loadGroups();
    await this._loadDevice();
  }

  async _renameGroup(newName) {
    if (!newName || !this.groupId) return;
    const group = this._groups?.[this.groupId];
    if (!group || group.name === newName) return;
    try {
      await updateGroup(this.groupId, { ...group, name: newName });
      this._groups = { ...this._groups, [this.groupId]: { ...group, name: newName } };
      this.device = { ...this.device, device_name: newName };
    } catch (e) {
      console.error('Failed to rename group:', e);
    }
  }

  // ── Network ────────────────────────────────────────────────────────────────

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

  // ── Attributes event handlers ──────────────────────────────────────────────

  async _deleteAttribute(name) {
    if (this._isGroupMode) {
      const hidden = [...(this.device.hidden_attributes || [])];
      if (!hidden.includes(name)) hidden.push(name);
      this.device = { ...this.device, hidden_attributes: hidden };
      await this._saveGroupUpdate({ hidden_attributes: hidden });
      return;
    }
    if (!confirm(`Hide attribute "${name}"? Custom sensors will be removed from the client. Built-in attributes will be hidden.`)) return;
    try {
      await deleteAttribute(this.deviceId, name);
      const cardAttrs = this.device?.card_attributes || [];
      if (cardAttrs.includes(name)) {
        const updated = cardAttrs.filter(n => n !== name);
        await updateDeviceSettings(this.deviceId, { card_attributes: updated });
      }
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to hide attribute:', e);
    }
  }

  async _unhideAttribute(name) {
    if (this._isGroupMode) {
      const hidden = (this.device.hidden_attributes || []).filter(n => n !== name);
      this.device = { ...this.device, hidden_attributes: hidden };
      await this._saveGroupUpdate({ hidden_attributes: hidden });
      return;
    }
    try {
      await unhideAttribute(this.deviceId, name);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to unhide attribute:', e);
    }
  }

  async _toggleHaExposure(name) {
    if (this._isGroupMode) return; // HA exposure is per-device, not per-group
    const current = this._haOverrides[name] !== undefined
      ? this._haOverrides[name]
      : (this._effectiveSettings?.ha_exposure_overrides?.[name] !== undefined
          ? this._effectiveSettings.ha_exposure_overrides[name]
          : false);
    this._haOverrides  = { ...this._haOverrides, [name]: !current };
    try {
      await updateDeviceSettings(this.deviceId, { ha_exposure_overrides: this._haOverrides });
    } catch (e) {
      console.error('Failed to update HA exposure:', e);
    }
  }

  async _setThreshold(name, value, op) {
    if (this._isGroupMode) return this._setGroupThreshold(name, value, op);
    const overrides = { ...(this.device.threshold_overrides || {}) };
    if (value === '' || value == null) {
      delete overrides[name];
    } else {
      overrides[name] = { op: op || '>', value: Number(value) };
    }
    try {
      await updateDeviceSettings(this.deviceId, { threshold_overrides: overrides });
      this.device             = { ...this.device, threshold_overrides: overrides };
      this._effectiveSettings = await fetchEffectiveSettings(this.deviceId);
    } catch (e) {
      console.error('Failed to set threshold:', e);
    }
  }

  async _setCritThreshold(name, value, op) {
    if (this._isGroupMode) return this._setGroupCritThreshold(name, value, op);
    const overrides = { ...(this.device.crit_threshold_overrides || {}) };
    if (value === '' || value == null) {
      delete overrides[name];
    } else {
      overrides[name] = { op: op || '>', value: Number(value) };
    }
    try {
      await updateDeviceSettings(this.deviceId, { crit_threshold_overrides: overrides });
      this.device = { ...this.device, crit_threshold_overrides: overrides };
    } catch (e) {
      console.error('Failed to set crit threshold:', e);
    }
  }

  _effectiveTransforms() {
    if (this._isGroupMode) return this.device?.attribute_transforms || {};
    const groupId = this.device?.group_policy;
    const group = groupId ? this._groups[groupId] : null;
    const groupTransforms = group?.attribute_transforms || {};
    const deviceTransforms = this.device?.attribute_transforms || {};
    return { ...groupTransforms, ...deviceTransforms };
  }

  _groupTransforms() {
    if (this._isGroupMode) return {};
    const groupId = this.device?.group_policy;
    const group = groupId ? this._groups[groupId] : null;
    return group?.attribute_transforms || {};
  }

  async _setAttributeTransform(attr, transform) {
    if (this._isGroupMode) return this._setGroupTransform(attr, transform);
    const transforms = { ...(this.device?.attribute_transforms || {}) };
    if (transform) {
      transforms[attr] = transform;
    } else {
      delete transforms[attr];
    }
    try {
      await updateDeviceSettings(this.deviceId, { attribute_transforms: transforms });
      this.device = { ...this.device, attribute_transforms: transforms };
    } catch (e) {
      console.error('Failed to update attribute transform:', e);
    }
  }

  // ── Group mode save helpers ─────────────────────────────────────────────

  async _forceApplyGroup() {
    if (!confirm('This will clear all device-level overrides for every member and enforce the group policy. Devices can still be customized afterwards.\n\nContinue?')) return;
    try {
      await forceApplyGroup(this.groupId);
      // Reload to reflect changes
      await this._loadGroupAggregate();
    } catch (e) {
      console.error('Failed to force apply:', e);
    }
  }

  async _saveGroupUpdate(fields) {
    const group = this._groups?.[this.groupId];
    if (!group) return;
    try {
      const updated = { ...group, ...fields };
      await updateGroup(this.groupId, updated);
      this._groups = { ...this._groups, [this.groupId]: updated };
      // Update local virtual device — create a fully new object to trigger re-render
      const newDevice = Object.assign({}, this.device, fields);
      this.device = newDevice;
      this.requestUpdate();
    } catch (e) {
      console.error('Failed to update group:', e);
    }
  }

  async _setGroupThreshold(name, value, op) {
    const thresholds = { ...(this.device.threshold_overrides || {}) };
    if (value === '' || value == null) {
      delete thresholds[name];
    } else {
      thresholds[name] = { op: op || '>', value: Number(value) };
    }
    this.device = { ...this.device, threshold_overrides: thresholds };
    await this._saveGroupUpdate({ thresholds });
  }

  async _setGroupCritThreshold(name, value, op) {
    const crit_thresholds = { ...(this.device.crit_threshold_overrides || {}) };
    if (value === '' || value == null) {
      delete crit_thresholds[name];
    } else {
      crit_thresholds[name] = { op: op || '>', value: Number(value) };
    }
    this.device = { ...this.device, crit_threshold_overrides: crit_thresholds };
    await this._saveGroupUpdate({ crit_thresholds });
  }

  async _setGroupInterval(value) {
    this._configInterval = value;
    await this._saveGroupUpdate({ interval: value });
  }

  async _saveGroupCommand({ name, shell }) {
    const group = this._groups?.[this.groupId];
    const custom_commands = { ...(group?.custom_commands || {}), [name]: shell };
    await this._saveGroupUpdate({ custom_commands });
    this._groups = { ...this._groups, [this.groupId]: { ...group, custom_commands } };
    this.requestUpdate();
  }

  async _removeGroupCommand(name) {
    const group = this._groups?.[this.groupId];
    const custom_commands = { ...(group?.custom_commands || {}) };
    delete custom_commands[name];
    await this._saveGroupUpdate({ custom_commands });
    this._groups = { ...this._groups, [this.groupId]: { ...group, custom_commands } };
    this.requestUpdate();
  }

  async _saveGroupSensor({ key, sensor, oldKey }) {
    const custom_sensors = { ...this._customSensors };
    if (oldKey && oldKey !== key) {
      delete custom_sensors[oldKey];
    }
    custom_sensors[key] = sensor;
    this._customSensors = { ...custom_sensors };
    await this._saveGroupUpdate({ custom_sensors });
    this.requestUpdate();
    // Reload aggregate after delay to pick up new attribute from client
    setTimeout(() => this._refreshGroupAggregate(), 3000);
  }

  async _removeGroupSensor(key) {
    const custom_sensors = { ...this._customSensors };
    delete custom_sensors[key];
    this._customSensors = { ...custom_sensors };
    await this._saveGroupUpdate({ custom_sensors });
    this.requestUpdate();
    // Reload aggregate to remove the deleted attribute
    setTimeout(() => this._refreshGroupAggregate(), 1000);
  }

  async _setGroupTransform(attr, transform) {
    const attribute_transforms = { ...(this.device?.attribute_transforms || {}) };
    if (transform) {
      attribute_transforms[attr] = transform;
    } else {
      delete attribute_transforms[attr];
    }
    this.device = { ...this.device, attribute_transforms: attribute_transforms };
    await this._saveGroupUpdate({ attribute_transforms });
  }

  async _toggleCardAttribute({ name, pinned }) {
    const current = [...(this.device?.card_attributes || [])];
    let updated;
    if (pinned) {
      updated = [...current, name];
    } else {
      updated = current.filter(n => n !== name);
    }
    if (this._isGroupMode) {
      this.device = { ...this.device, card_attributes: updated };
      await this._saveGroupUpdate({ card_attributes: updated });
      return;
    }
    try {
      await updateDeviceSettings(this.deviceId, { card_attributes: updated });
      this.device = { ...this.device, card_attributes: updated };
    } catch (e) {
      console.error('Failed to update card attributes:', e);
    }
  }

  // ── Commands event handlers ────────────────────────────────────────────────

  async _sendCmd(command, params = {}) {
    if (this._isGroupMode) return;
    try {
      this.commandResult = `Sending ${command}...`;
      const result = await sendCommand(this.deviceId, command, params);
      const reqId = result.request_id;
      this.commandResult = `Sent ${command}... waiting for response`;
      // Poll for response in command_history (arrives via WebSocket or fetch)
      const startTime = Date.now();
      const poll = () => {
        const history = this.device?.command_history || [];
        const response = history.find(h => h.request_id === reqId);
        if (response) {
          this.commandResult = `${response.status}: ${response.output || '(no output)'}`;
          return;
        }
        if (Date.now() - startTime < 10000) {
          setTimeout(poll, 500);
        } else {
          this.commandResult = `Command sent (no response received)`;
        }
      };
      setTimeout(poll, 500);
    } catch (e) {
      this.commandResult = `Error: ${e.message}`;
    }
  }

  async _hideCommand(cmd) {
    if (this._isGroupMode) {
      const hidden = [...(this.device.hidden_commands || [])];
      if (!hidden.includes(cmd)) hidden.push(cmd);
      this.device = { ...this.device, hidden_commands: hidden };
      await this._saveGroupUpdate({ hidden_commands: hidden });
      return;
    }
    try {
      await hideCommand(this.deviceId, cmd);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to hide command:', e);
    }
  }

  async _unhideCommand(cmd) {
    if (this._isGroupMode) {
      const hidden = (this.device.hidden_commands || []).filter(c => c !== cmd);
      this.device = { ...this.device, hidden_commands: hidden };
      await this._saveGroupUpdate({ hidden_commands: hidden });
      return;
    }
    try {
      await unhideCommand(this.deviceId, cmd);
      await this._loadDevice();
    } catch (e) {
      console.error('Failed to unhide command:', e);
    }
  }

  async _saveServerCommand({ name, shell }) {
    const { addServerCommand } = await import('../services/api.js');
    await addServerCommand(this.deviceId, name, shell);
    await this._loadDevice();
  }

  async _removeServerCommand(name) {
    const { removeServerCommand } = await import('../services/api.js');
    await removeServerCommand(this.deviceId, name);
    await this._loadDevice();
  }

  // ── Config event handlers ──────────────────────────────────────────────────

  async _saveSensor({ key, sensor, oldKey }) {
    const { addServerSensor, removeServerSensor } = await import('../services/api.js');
    if (oldKey && oldKey !== key) {
      await removeServerSensor(this.deviceId, oldKey);
    }
    await addServerSensor(this.deviceId, key, sensor);
    await this._loadDevice();
  }

  async _removeSensor(key) {
    const { removeServerSensor } = await import('../services/api.js');
    await removeServerSensor(this.deviceId, key);
    await this._loadDevice();
  }

  async _onIntervalChange(value) {
    const { setDeviceInterval } = await import('../services/api.js');
    await setDeviceInterval(this.deviceId, value);
    await this._loadDevice();
  }

  // ── Device delete ──────────────────────────────────────────────────────────

  async _deleteDevice() {
    if (!confirm(`Delete device "${this.device?.device_name || this.deviceId}"? This removes it from the registry. It will reappear if the client agent is still running.`)) return;
    try {
      await deleteDevice(this.deviceId);
      this.dispatchEvent(new CustomEvent('back'));
    } catch (e) {
      console.error('Failed to delete device:', e);
    }
  }
}

customElements.define('device-detail', DeviceDetail);

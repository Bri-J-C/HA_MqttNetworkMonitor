import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { fetchDevices, fetchGroups, updateGroup, createGroup, deleteGroup } from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './device-card.js';
import './tag-picker.js';
import './themed-dialog.js';

class DashboardView extends LitElement {
  static properties = {
    devices: { type: Object },
    filter: { type: String },
    selectedTags: { type: Array },
    viewMode: { type: String },
    _groups: { type: Object, state: true },
    _collapsedGroups: { type: Object, state: true },
    _selectedUngrouped: { type: Array, state: true },
    _selectedGrouped: { type: Object, state: true },
  };

  static styles = [sharedStyles, css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }

    .filter-bar {
      display: flex; gap: 8px; align-items: center;
      margin-bottom: 12px; flex-wrap: wrap;
    }

    .status-filters {
      display: flex; gap: 6px;
    }
    .filter-btn {
      background: rgba(255,255,255,0.05); border: none; color: #fff; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }
    .filter-btn.active { background: #00D4FF; color: #0d0d1f; }

    .view-toggle {
      margin-left: auto; display: flex; gap: 4px;
      background: rgba(255,255,255,0.05); border-radius: 16px; padding: 3px;
    }
    .view-btn {
      background: none; border: none; color: #fff; padding: 4px 14px;
      border-radius: 13px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .view-btn.active { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .view-btn:not(.active):hover { color: rgba(255,255,255,0.8); }

    .active-tags {
      display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
      margin-bottom: 12px;
    }
    .active-tag {
      display: flex; align-items: center; gap: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF; padding: 4px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .active-tag .remove {
      cursor: pointer; font-size: 14px; line-height: 1;
      color: #00D4FF; opacity: 0.6; transition: opacity 0.15s;
    }
    .active-tag .remove:hover { opacity: 1; }
    .clear-all {
      background: none; border: none; color: #fff; font-size: 12px;
      cursor: pointer; padding: 4px 8px; transition: color 0.15s;
    }
    .clear-all:hover { color: #ef5350; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center; padding: 60px; color: #fff;
    }

    /* By Group view */
    .group-section { margin-bottom: 16px; }
    .group-section-header {
      display: flex; align-items: center; gap: 10px;
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 16px;
      cursor: pointer; user-select: none; margin-bottom: 8px;
      transition: background 0.15s;
    }
    .group-section-header:hover { background: rgba(255,255,255,0.08); }
    .group-chevron { font-size: 10px; color: #fff; transition: transform 0.2s; }
    .group-chevron.open { transform: rotate(90deg); }
    .group-section-name { font-size: 14px; font-weight: 600; color: #fff; }
    .group-health {
      margin-left: auto; font-size: 12px; color: #fff;
      display: flex; gap: 10px;
    }
    .health-dot { display: flex; align-items: center; gap: 4px; }
    .group-device-count { font-size: 11px; color: #fff; }
    .group-body { padding: 0; }
    .ungrouped-header {
      font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px; margin-top: 4px;
    }
    .edit-policy-btn {
      background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2);
      color: #00D4FF; padding: 3px 10px; border-radius: 4px;
      font-size: 11px; cursor: pointer; margin-left: 8px;
    }
    .edit-policy-btn:hover { background: rgba(0,212,255,0.2); }
    .select-toolbar {
      display: flex; gap: 8px; align-items: center; margin-bottom: 10px;
      background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.15);
      border-radius: 8px; padding: 8px 12px;
    }
    .select-toolbar span { font-size: 12px; color: rgba(255,255,255,0.7); }
    .select-toolbar button {
      background: #00D4FF; border: none; color: #0d0d1f;
      padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; font-weight: 600;
    }
    .select-toolbar select {
      background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;
    }
    device-card.selected {
      outline: 2px solid #00D4FF;
      outline-offset: -2px;
    }
    .select-hint { font-size: 10px; color: rgba(255,255,255,0.35); margin-bottom: 6px; }

    @media (max-width: 768px) {
      :host { padding: 12px; }
      .filter-bar { gap: 6px; }
      .grid { grid-template-columns: 1fr; }
    }
  `];

  constructor() {
    super();
    this.devices = {};
    this.filter = 'all';
    this.selectedTags = [];
    this.viewMode = 'all';
    this._groups = {};
    this._collapsedGroups = {};
    this._selectedUngrouped = [];
    this._selectedGrouped = {};
    this._wsUnsub = null;
    this._lastFetchTime = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevices();
    this._loadGroups();
    this._wsUnsub = wsService.onMessage((data) => {
      if (data.type === 'device_update') {
        this.devices = { ...this.devices, [data.device_id]: data.device };
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._wsUnsub) this._wsUnsub();
  }

  async _loadDevices() {
    try {
      const data = await fetchDevices(this._lastFetchTime);
      if (data && Object.keys(data).length > 0) {
        this.devices = { ...this.devices, ...data };
      } else if (this._lastFetchTime === 0) {
        // Initial load returned empty — still update so the view reflects it
        this.devices = data || {};
      }
      this._lastFetchTime = Date.now() / 1000;
    } catch (e) {
      console.error('Failed to load devices:', e);
    }
  }

  async _loadGroups() {
    try {
      this._groups = await fetchGroups();
    } catch (e) {
      console.error('Failed to load groups:', e);
    }
  }

  get _filteredDevices() {
    let entries = Object.entries(this.devices);
    if (this.filter !== 'all') {
      if (this.filter === 'warning') {
        entries = entries.filter(([, d]) => d.status === 'warning' || d.status === 'critical');
      } else {
        entries = entries.filter(([, d]) => d.status === this.filter);
      }
    }
    if (this.selectedTags.length > 0) {
      entries = entries.filter(([, d]) => {
        const deviceTags = [...(d.tags || []), ...(d.server_tags || [])];
        return this.selectedTags.some(t => deviceTags.includes(t));
      });
    }
    return entries;
  }

  get _counts() {
    const all = Object.values(this.devices);
    return {
      all: all.length,
      online: all.filter(d => d.status === 'online').length,
      offline: all.filter(d => d.status === 'offline').length,
      warning: all.filter(d => d.status === 'warning' || d.status === 'critical').length,
    };
  }

  _onTagAdd(e) {
    const tag = e.detail.tag;
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags = [...this.selectedTags, tag];
    }
  }

  _onTagRemove(e) {
    this.selectedTags = this.selectedTags.filter(t => t !== e.detail.tag);
  }

  render() {
    const counts = this._counts;

    return html`
      <div class="filter-bar">
        <div class="status-filters">
          <button class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
            @click=${() => this.filter = 'all'}>All (${counts.all})</button>
          <button class="filter-btn ${this.filter === 'online' ? 'active' : ''}"
            @click=${() => this.filter = 'online'}>Online (${counts.online})</button>
          <button class="filter-btn ${this.filter === 'offline' ? 'active' : ''}"
            @click=${() => this.filter = 'offline'}>Offline (${counts.offline})</button>
          <button class="filter-btn ${this.filter === 'warning' ? 'active' : ''}"
            @click=${() => this.filter = 'warning'}>Warning (${counts.warning})</button>
        </div>

        <tag-picker
          .selectedTags=${this.selectedTags}
          @tag-add=${this._onTagAdd}
          @tag-remove=${this._onTagRemove}
        ></tag-picker>

        <div class="view-toggle">
          <button class="view-btn ${this.viewMode === 'all' ? 'active' : ''}"
            @click=${() => this.viewMode = 'all'}>All</button>
          <button class="view-btn ${this.viewMode === 'group' ? 'active' : ''}"
            @click=${() => this.viewMode = 'group'}>Groups</button>
        </div>

      </div>

      ${this.selectedTags.length > 0 ? html`
        <div class="active-tags">
          ${this.selectedTags.map(tag => html`
            <span class="active-tag">
              #${tag}
              <span class="remove" @click=${() => this.selectedTags = this.selectedTags.filter(t => t !== tag)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${() => { this.selectedTags = []; this.filter = 'all'; }}>Clear all</button>
        </div>
      ` : ''}

      ${this.viewMode === 'group' ? this._renderByGroup() : this._renderAll()}
      <themed-dialog></themed-dialog>
    `;
  }

  _renderAll() {
    const filtered = this._filteredDevices;
    if (filtered.length === 0) {
      return html`<div class="empty">No devices found</div>`;
    }
    return html`
      <div class="grid">
        ${filtered.map(([id, device]) => html`
          <device-card
            .device=${device}
            .deviceId=${id}
            @click=${() => this._selectDevice(id)}
          ></device-card>
        `)}
      </div>
    `;
  }

  _renderByGroup() {
    const filtered = this._filteredDevices;
    const groups = Object.values(this._groups);

    // Build a map: groupId → filtered devices in that group
    const groupDevices = {};
    const groupedIds = new Set();

    groups.forEach(g => {
      const members = filtered.filter(([id]) => (g.device_ids || []).includes(id));
      groupDevices[g.id] = members;
      members.forEach(([id]) => groupedIds.add(id));
    });

    const ungrouped = filtered.filter(([id]) => !groupedIds.has(id));

    return html`
      ${groups.map(g => this._renderGroupSection(g, groupDevices[g.id] || []))}
      ${ungrouped.length > 0 ? html`
        <div class="group-section">
          <div class="ungrouped-header">Ungrouped (${ungrouped.length})</div>
          <div class="select-hint">Ctrl+click to select multiple</div>
          ${this._selectedUngrouped.length > 0 ? html`
            <div class="select-toolbar">
              <span>${this._selectedUngrouped.length} selected</span>
              <select id="group-assign-select">
                ${groups.map(g => html`<option value=${g.id}>${g.name}</option>`)}
              </select>
              <button @click=${this._addSelectedToGroup}>Add to Group</button>
              <button @click=${this._createNewGroupFromSelected}
                style="background: rgba(255,255,255,0.1); color: #fff;">New Group</button>
              <button style="background: rgba(255,255,255,0.1); color: #fff;"
                @click=${() => { this._selectedUngrouped = []; }}>Cancel</button>
            </div>
          ` : ''}
          <div class="grid">
            ${ungrouped.map(([id, device]) => html`
              <device-card .device=${device} .deviceId=${id}
                class="${this._selectedUngrouped.includes(id) ? 'selected' : ''}"
                @click=${(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this._toggleUngroupedSelection(id);
                  } else {
                    this._selectDevice(id);
                  }
                }}></device-card>
            `)}
          </div>
        </div>
      ` : ''}
      ${filtered.length === 0 ? html`<div class="empty">No devices found</div>` : ''}
    `;
  }

  _renderGroupSection(g, devices) {
    const isCollapsed = !!this._collapsedGroups[g.id];
    const allInGroup = Object.entries(this.devices)
      .filter(([id]) => (g.device_ids || []).includes(id))
      .map(([, d]) => d);

    const onlineCount = allInGroup.filter(d => d.status === 'online').length;
    const total = allInGroup.length;

    return html`
      <div class="group-section">
        <div class="group-section-header"
          @click=${() => this._toggleGroupCollapse(g.id)}>
          <span class="group-chevron ${isCollapsed ? '' : 'open'}">&#9658;</span>
          <span class="group-section-name">${g.name}</span>
          <span class="group-device-count">${devices.length} device${devices.length !== 1 ? 's' : ''}</span>
          <div class="group-health">
            <span class="health-dot" style="color: #04d65c">
              ${onlineCount}/${total} online
            </span>
          </div>
          <button class="edit-policy-btn" @click=${(e) => { e.stopPropagation(); this._editGroupPolicy(g.id); }}>Edit Policy</button>
          <button class="edit-policy-btn" style="background: rgba(239,83,80,0.1); border-color: rgba(239,83,80,0.2); color: #ef5350;"
            @click=${(e) => { e.stopPropagation(); this._deleteGroup(g.id, g.name); }}>Delete</button>
        </div>
        ${!isCollapsed ? html`
          <div class="group-body">
            ${(this._selectedGrouped[g.id]?.length > 0) ? html`
              <div class="select-toolbar">
                <span>${this._selectedGrouped[g.id].length} selected</span>
                <button @click=${() => this._removeSelectedFromGroup(g.id)}>Remove from Group</button>
                <button style="background: rgba(255,255,255,0.1); color: #fff;"
                  @click=${() => { this._selectedGrouped = {...this._selectedGrouped, [g.id]: []}; }}>Cancel</button>
              </div>
            ` : ''}
            ${devices.length === 0
              ? html`<div style="color: #fff; font-size: 13px; padding: 8px 4px;">No devices match current filters</div>`
              : html`
                <div class="grid">
                  ${devices.map(([id, device]) => html`
                    <device-card .device=${device} .deviceId=${id}
                      class="${(this._selectedGrouped[g.id] || []).includes(id) ? 'selected' : ''}"
                      @click=${(e) => {
                        if (e.ctrlKey || e.metaKey) {
                          e.preventDefault();
                          this._toggleGroupedSelection(g.id, id);
                        } else {
                          this._selectDevice(id);
                        }
                      }}></device-card>
                  `)}
                </div>
              `}
          </div>
        ` : ''}
      </div>
    `;
  }

  _toggleGroupCollapse(groupId) {
    this._collapsedGroups = {
      ...this._collapsedGroups,
      [groupId]: !this._collapsedGroups[groupId],
    };
  }

  _selectDevice(id) {
    this.dispatchEvent(new CustomEvent('device-select', {
      detail: { deviceId: id }, bubbles: true, composed: true,
    }));
  }

  _editGroupPolicy(groupId) {
    this.dispatchEvent(new CustomEvent('group-edit', {
      detail: { groupId }, bubbles: true, composed: true,
    }));
  }

  _toggleUngroupedSelection(id) {
    if (this._selectedUngrouped.includes(id)) {
      this._selectedUngrouped = this._selectedUngrouped.filter(d => d !== id);
    } else {
      this._selectedUngrouped = [...this._selectedUngrouped, id];
    }
  }

  async _createNewGroupFromSelected() {
    const dialog = this.shadowRoot.querySelector('themed-dialog');
    const name = await dialog.show({
      type: 'prompt',
      title: 'Create Group',
      message: 'Enter group name:',
      placeholder: 'e.g. Infrastructure, IoT Sensors',
      confirmLabel: 'Create',
    });
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    try {
      await createGroup(id, name, this._selectedUngrouped);
      this._selectedUngrouped = [];
      this._loadGroups();
    } catch (e) {
      console.error('Failed to create group:', e);
    }
  }

  async _deleteGroup(groupId, groupName) {
    const dialog = this.shadowRoot.querySelector('themed-dialog');
    const ok = await dialog.show({
      type: 'confirm',
      title: 'Delete Group',
      message: `Delete group "${groupName}"? Devices will be ungrouped.`,
      confirmLabel: 'Delete',
      confirmDanger: true,
    });
    if (!ok) return;
    try {
      await deleteGroup(groupId);
      this._loadGroups();
    } catch (e) {
      console.error('Failed to delete group:', e);
    }
  }

  _toggleGroupedSelection(groupId, deviceId) {
    const current = this._selectedGrouped[groupId] || [];
    const updated = current.includes(deviceId)
      ? current.filter(d => d !== deviceId)
      : [...current, deviceId];
    this._selectedGrouped = { ...this._selectedGrouped, [groupId]: updated };
  }

  async _removeSelectedFromGroup(groupId) {
    const group = this._groups[groupId];
    if (!group) return;
    const toRemove = this._selectedGrouped[groupId] || [];
    const newDeviceIds = (group.device_ids || []).filter(id => !toRemove.includes(id));
    try {
      await updateGroup(groupId, { ...group, device_ids: newDeviceIds });
      this._selectedGrouped = { ...this._selectedGrouped, [groupId]: [] };
      this._loadGroups();
    } catch (e) {
      console.error('Failed to remove devices from group:', e);
    }
  }

  async _addSelectedToGroup() {
    const select = this.shadowRoot.querySelector('#group-assign-select');
    if (!select) return;
    const groupId = select.value;
    const group = this._groups[groupId];
    if (!group) return;
    const newDeviceIds = [...new Set([...(group.device_ids || []), ...this._selectedUngrouped])];
    try {
      await updateGroup(groupId, { ...group, device_ids: newDeviceIds });
      this._selectedUngrouped = [];
      this._loadGroups();
    } catch (e) {
      console.error('Failed to add devices to group:', e);
    }
  }
}

customElements.define('dashboard-view', DashboardView);

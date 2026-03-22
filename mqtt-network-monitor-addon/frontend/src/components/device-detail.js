import { LitElement, html, css } from 'lit';
import { fetchDevice, sendCommand, addDeviceTags, removeDeviceTag, fetchGroups, createGroup, updateGroup, deleteGroup } from '../services/api.js';
import { wsService } from '../services/websocket.js';

class DeviceDetail extends LitElement {
  static properties = {
    deviceId: { type: String },
    device: { type: Object },
    commandResult: { type: String },
    _newTag: { type: String, state: true },
    _groups: { type: Object, state: true },
    _showGroupDialog: { type: Boolean, state: true },
    _newGroupName: { type: String, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1000px; margin: 0 auto; }
    .back {
      background: none; border: none; color: #4fc3f7; cursor: pointer;
      font-size: 14px; margin-bottom: 16px; padding: 0;
    }
    .back:hover { text-decoration: underline; }
    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px;
    }
    .title { font-size: 24px; font-weight: 700; }
    .status-badge {
      padding: 4px 12px; border-radius: 12px; font-size: 13px;
    }
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
    }
    .attr-item {
      background: #1a1a2e; border-radius: 6px; padding: 12px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; }
    .attr-val { font-size: 20px; font-weight: 700; color: #4fc3f7; margin-top: 4px; }
    .attr-unit { font-size: 12px; color: #888; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 8px;
    }
    .net-item { font-size: 13px; color: #aaa; }
    .net-label { color: #666; margin-right: 8px; }
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

    /* Tags */
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
    .tag {
      display: flex; align-items: center; gap: 4px;
      font-size: 11px; padding: 3px 10px; border-radius: 4px;
      background: #1e3a5f; color: #4fc3f7;
    }
    .tag.client { background: #1e3a5f; color: #4fc3f7; }
    .tag.server { background: #3a1e5f; color: #ce93d8; }
    .tag .remove {
      cursor: pointer; font-size: 13px; line-height: 1; opacity: 0.6;
    }
    .tag .remove:hover { opacity: 1; }
    .tag-add {
      display: flex; gap: 4px; align-items: center; margin-top: 8px;
    }
    .tag-input {
      background: #1a1a2e; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 4px 10px; font-size: 12px; width: 140px;
    }
    .tag-input:focus { outline: none; border-color: #4fc3f7; }
    .tag-input::placeholder { color: #555; }
    .add-btn {
      background: #4fc3f7; border: none; color: #1a1a2e; padding: 4px 12px;
      border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600;
    }
    .add-btn:hover { background: #81d4fa; }
    .tag-hint { font-size: 10px; color: #555; margin-top: 4px; }

    /* Groups */
    .group-list { display: flex; flex-direction: column; gap: 8px; }
    .group-item {
      display: flex; justify-content: space-between; align-items: center;
      background: #1a1a2e; border-radius: 6px; padding: 10px 14px;
    }
    .group-name { font-size: 13px; color: #ccc; }
    .group-actions { display: flex; gap: 6px; }
    .group-btn {
      background: none; border: none; color: #888; font-size: 11px;
      cursor: pointer; padding: 2px 6px;
    }
    .group-btn:hover { color: #ccc; }
    .group-btn.remove { color: #ef5350; }
    .group-add { display: flex; gap: 4px; align-items: center; margin-top: 8px; }

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
    .dialog h3 { color: #e0e0e0; margin-bottom: 12px; font-size: 16px; }
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
    this._newTag = '';
    this._groups = {};
    this._showGroupDialog = false;
    this._newGroupName = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevice();
    this._loadGroups();
    wsService.onMessage((data) => {
      if (data.type === 'device_update' && data.device_id === this.deviceId) {
        this.device = data.device;
      }
    });
  }

  async _loadDevice() {
    try {
      this.device = await fetchDevice(this.deviceId);
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
    if (!this.device) return html`<div>Loading...</div>`;
    const d = this.device;
    const statusColor = d.status === 'online' ? '#81c784' : d.status === 'offline' ? '#ef5350' : '#ffb74d';
    const attrs = Object.entries(d.attributes || {});
    const network = d.network || {};
    const clientTags = d.tags || [];
    const serverTags = d.server_tags || [];
    const deviceGroups = Object.values(this._groups).filter(g =>
      g.device_ids && g.device_ids.includes(this.deviceId)
    );

    return html`
      <button class="back" @click=${() => this.dispatchEvent(new CustomEvent('back'))}>
        Back
      </button>
      <div class="header">
        <span class="title">${d.device_name || this.deviceId}</span>
        <span class="status-badge" style="background: ${statusColor}20; color: ${statusColor}">
          ${d.status}
        </span>
      </div>

      <!-- Tags Section -->
      <div class="section">
        <div class="section-title">Tags</div>
        <div class="tags-row">
          ${clientTags.map(t => html`
            <span class="tag client">${t}</span>
          `)}
          ${serverTags.map(t => html`
            <span class="tag server">
              ${t}
              <span class="remove" @click=${() => this._removeTag(t)}>&times;</span>
            </span>
          `)}
        </div>
        <div class="tag-add">
          <input class="tag-input" type="text" placeholder="Add tag..."
            .value=${this._newTag}
            @input=${(e) => this._newTag = e.target.value}
            @keydown=${(e) => e.key === 'Enter' && this._addTag()}>
          <button class="add-btn" @click=${this._addTag}>Add</button>
        </div>
        <div class="tag-hint">
          Client tags (blue) come from the device config. Server tags (purple) are managed here.
        </div>
      </div>

      <!-- Groups Section -->
      <div class="section">
        <div class="section-title">Groups</div>
        ${deviceGroups.length > 0 ? html`
          <div class="group-list">
            ${deviceGroups.map(g => html`
              <div class="group-item">
                <span class="group-name">${g.name}</span>
                <div class="group-actions">
                  <button class="group-btn remove" @click=${() => this._removeFromGroup(g.id)}>Remove</button>
                </div>
              </div>
            `)}
          </div>
        ` : html`<div style="color: #666; font-size: 13px;">Not in any groups</div>`}
        <div class="group-add">
          ${this._renderGroupSelector(deviceGroups)}
          <button class="add-btn" @click=${() => this._showGroupDialog = true}>New Group</button>
        </div>
      </div>

      <!-- Attributes -->
      ${attrs.length > 0 ? html`
        <div class="section">
          <div class="section-title">Attributes</div>
          <div class="attr-grid">
            ${attrs.map(([name, data]) => html`
              <div class="attr-item">
                <div class="attr-label">${name.replace(/_/g, ' ')}</div>
                <div class="attr-val">
                  ${data.value != null ? data.value : '\u2014'}
                  <span class="attr-unit">${data.unit}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

      <!-- Network -->
      ${Object.keys(network).length > 0 ? html`
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
      ` : ''}

      <!-- Commands -->
      <div class="section">
        <div class="section-title">Commands</div>
        <div class="commands">
          <button class="cmd-btn" @click=${() => this._sendCmd('reboot')}>Reboot</button>
          <button class="cmd-btn danger" @click=${() => this._sendCmd('shutdown')}>Shutdown</button>
          <button class="cmd-btn" @click=${() => this._sendCmd('restart_service', { service: 'default' })}>Restart Service</button>
        </div>
        ${this.commandResult ? html`<div class="cmd-result">${this.commandResult}</div>` : ''}
      </div>

      ${this._showGroupDialog ? this._renderGroupDialog() : ''}
    `;
  }

  _renderGroupSelector(deviceGroups) {
    const availableGroups = Object.values(this._groups).filter(g =>
      !g.device_ids || !g.device_ids.includes(this.deviceId)
    );
    if (availableGroups.length === 0) return html``;

    return html`
      <select class="tag-input" style="width: auto;"
        @change=${(e) => { if (e.target.value) this._addToGroup(e.target.value); e.target.value = ''; }}>
        <option value="">Add to group...</option>
        ${availableGroups.map(g => html`
          <option value=${g.id}>${g.name}</option>
        `)}
      </select>
    `;
  }

  _renderGroupDialog() {
    return html`
      <div class="overlay" @click=${() => this._showGroupDialog = false}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <h3>Create Group</h3>
          <div class="dialog-field">
            <label>Group Name</label>
            <input type="text" placeholder="e.g., Infrastructure, IoT Sensors"
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

  async _addTag() {
    const tag = this._newTag.trim();
    if (!tag) return;
    await addDeviceTags(this.deviceId, [tag]);
    this._newTag = '';
    await this._loadDevice();
  }

  async _removeTag(tag) {
    await removeDeviceTag(this.deviceId, tag);
    await this._loadDevice();
  }

  async _addToGroup(groupId) {
    const group = this._groups[groupId];
    if (!group) return;
    const deviceIds = [...(group.device_ids || []), this.deviceId];
    await updateGroup(groupId, { device_ids: deviceIds });
    await this._loadGroups();
  }

  async _removeFromGroup(groupId) {
    const group = this._groups[groupId];
    if (!group) return;
    const deviceIds = (group.device_ids || []).filter(id => id !== this.deviceId);
    await updateGroup(groupId, { device_ids: deviceIds });
    await this._loadGroups();
  }

  async _createGroup() {
    const name = this._newGroupName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    await createGroup(id, name, [this.deviceId]);
    this._newGroupName = '';
    this._showGroupDialog = false;
    await this._loadGroups();
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

import { LitElement, html, css } from 'lit';
import { fetchDevice, sendCommand } from '../services/api.js';
import { wsService } from '../services/websocket.js';

class DeviceDetail extends LitElement {
  static properties = {
    deviceId: { type: String },
    device: { type: Object },
    commandResult: { type: String },
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
    .tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag {
      font-size: 11px; padding: 3px 10px; border-radius: 4px;
      background: #1e3a5f; color: #4fc3f7;
    }
    .tag.server { background: #3a1e5f; color: #ce93d8; }
  `;

  constructor() {
    super();
    this.device = null;
    this.commandResult = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevice();
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

  render() {
    if (!this.device) return html`<div>Loading...</div>`;
    const d = this.device;
    const statusColor = d.status === 'online' ? '#81c784' : d.status === 'offline' ? '#ef5350' : '#ffb74d';
    const attrs = Object.entries(d.attributes || {});
    const network = d.network || {};
    const tags = d.tags || [];
    const serverTags = d.server_tags || [];

    return html`
      <button class="back" @click=${() => this.dispatchEvent(new CustomEvent('back'))}>
        ← Back
      </button>
      <div class="header">
        <span class="title">${d.device_name || this.deviceId}</span>
        <span class="status-badge" style="background: ${statusColor}20; color: ${statusColor}">
          ${d.status}
        </span>
      </div>

      ${(tags.length > 0 || serverTags.length > 0) ? html`
        <div class="section">
          <div class="section-title">Tags</div>
          <div class="tags">
            ${tags.map(t => html`<span class="tag">${t}</span>`)}
            ${serverTags.map(t => html`<span class="tag server">${t}</span>`)}
          </div>
        </div>
      ` : ''}

      ${attrs.length > 0 ? html`
        <div class="section">
          <div class="section-title">Attributes</div>
          <div class="attr-grid">
            ${attrs.map(([name, data]) => html`
              <div class="attr-item">
                <div class="attr-label">${name.replace(/_/g, ' ')}</div>
                <div class="attr-val">
                  ${data.value != null ? data.value : '—'}
                  <span class="attr-unit">${data.unit}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : ''}

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

      <div class="section">
        <div class="section-title">Commands</div>
        <div class="commands">
          <button class="cmd-btn" @click=${() => this._sendCmd('reboot')}>Reboot</button>
          <button class="cmd-btn danger" @click=${() => this._sendCmd('shutdown')}>Shutdown</button>
          <button class="cmd-btn" @click=${() => this._sendCmd('restart_service', { service: 'default' })}>Restart Service</button>
        </div>
        ${this.commandResult ? html`<div class="cmd-result">${this.commandResult}</div>` : ''}
      </div>
    `;
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

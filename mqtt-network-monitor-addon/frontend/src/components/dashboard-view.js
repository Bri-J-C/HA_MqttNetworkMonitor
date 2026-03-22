import { LitElement, html, css } from 'lit';
import { fetchDevices } from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './device-card.js';

class DashboardView extends LitElement {
  static properties = {
    devices: { type: Object },
    filter: { type: String },
    tagFilter: { type: String },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .filters {
      display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
      align-items: center;
    }
    .filter-btn {
      background: #2a2a4a; border: none; color: #aaa; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: #3a3a5a; color: #ccc; }
    .filter-btn.active { background: #4fc3f7; color: #1a1a2e; }
    .filter-btn.tag { background: #1e3a5f; color: #4fc3f7; }
    .filter-btn.tag.active { background: #4fc3f7; color: #1a1a2e; }
    .separator { color: #444; margin: 0 4px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center; padding: 60px; color: #666;
    }
  `;

  constructor() {
    super();
    this.devices = {};
    this.filter = 'all';
    this.tagFilter = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevices();
    wsService.onMessage((data) => {
      if (data.type === 'device_update') {
        this.devices = { ...this.devices, [data.device_id]: data.device };
        this.requestUpdate();
      }
    });
  }

  async _loadDevices() {
    try {
      this.devices = await fetchDevices();
    } catch (e) {
      console.error('Failed to load devices:', e);
    }
  }

  get _filteredDevices() {
    let entries = Object.entries(this.devices);
    if (this.filter !== 'all') {
      entries = entries.filter(([, d]) => d.status === this.filter);
    }
    if (this.tagFilter) {
      entries = entries.filter(([, d]) => {
        const tags = [...(d.tags || []), ...(d.server_tags || [])];
        return tags.includes(this.tagFilter);
      });
    }
    return entries;
  }

  get _allTags() {
    const tags = new Set();
    Object.values(this.devices).forEach(d => {
      (d.tags || []).forEach(t => tags.add(t));
      (d.server_tags || []).forEach(t => tags.add(t));
    });
    return [...tags].sort();
  }

  get _counts() {
    const all = Object.values(this.devices);
    return {
      all: all.length,
      online: all.filter(d => d.status === 'online').length,
      offline: all.filter(d => d.status === 'offline').length,
      warning: all.filter(d => d.status === 'warning').length,
    };
  }

  render() {
    const filtered = this._filteredDevices;
    const counts = this._counts;
    const tags = this._allTags;

    return html`
      <div class="filters">
        <button class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
          @click=${() => this.filter = 'all'}>All (${counts.all})</button>
        <button class="filter-btn ${this.filter === 'online' ? 'active' : ''}"
          @click=${() => this.filter = 'online'}>Online (${counts.online})</button>
        <button class="filter-btn ${this.filter === 'offline' ? 'active' : ''}"
          @click=${() => this.filter = 'offline'}>Offline (${counts.offline})</button>
        <button class="filter-btn ${this.filter === 'warning' ? 'active' : ''}"
          @click=${() => this.filter = 'warning'}>Warning (${counts.warning})</button>
        ${tags.length > 0 ? html`
          <span class="separator">|</span>
          ${tags.map(tag => html`
            <button class="filter-btn tag ${this.tagFilter === tag ? 'active' : ''}"
              @click=${() => this.tagFilter = this.tagFilter === tag ? '' : tag}>#${tag}</button>
          `)}
        ` : ''}
      </div>
      ${filtered.length === 0
        ? html`<div class="empty">No devices found</div>`
        : html`
          <div class="grid">
            ${filtered.map(([id, device]) => html`
              <device-card
                .device=${device}
                .deviceId=${id}
                @click=${() => this._selectDevice(id)}
              ></device-card>
            `)}
          </div>
        `
      }
    `;
  }

  _selectDevice(id) {
    this.dispatchEvent(new CustomEvent('device-select', {
      detail: { deviceId: id }, bubbles: true, composed: true,
    }));
  }
}

customElements.define('dashboard-view', DashboardView);

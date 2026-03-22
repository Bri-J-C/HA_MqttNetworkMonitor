import { LitElement, html, css } from 'lit';
import { fetchDevices } from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './device-card.js';

class DashboardView extends LitElement {
  static properties = {
    devices: { type: Object },
    filter: { type: String },
    selectedTags: { type: Array },
    _tagDropdownOpen: { type: Boolean, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }

    .filter-bar {
      display: flex; gap: 8px; align-items: center;
      margin-bottom: 12px; flex-wrap: wrap;
    }

    .status-filters {
      display: flex; gap: 6px;
    }
    .filter-btn {
      background: #2a2a4a; border: none; color: #aaa; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .filter-btn:hover { background: #3a3a5a; color: #ccc; }
    .filter-btn.active { background: #4fc3f7; color: #1a1a2e; }

    .tag-selector {
      position: relative;
      margin-left: 8px;
    }
    .tag-trigger {
      background: #2a2a4a; border: 1px solid #3a3a5a; color: #aaa; padding: 6px 14px;
      border-radius: 16px; cursor: pointer; font-size: 13px; transition: all 0.2s;
      display: flex; align-items: center; gap: 6px;
    }
    .tag-trigger:hover { background: #3a3a5a; color: #ccc; border-color: #4a4a6a; }
    .tag-trigger.has-selected { border-color: #4fc3f7; color: #4fc3f7; }
    .tag-trigger .arrow { font-size: 10px; }

    .tag-dropdown {
      position: absolute; top: calc(100% + 4px); left: 0;
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 8px;
      min-width: 200px; max-height: 240px; overflow-y: auto;
      z-index: 100; box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .tag-dropdown-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px; cursor: pointer; font-size: 13px; color: #ccc;
      transition: background 0.15s;
    }
    .tag-dropdown-item:hover { background: #3a3a5a; }
    .tag-dropdown-item .checkbox {
      width: 16px; height: 16px; border: 1.5px solid #555; border-radius: 3px;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; color: #1a1a2e; transition: all 0.15s;
    }
    .tag-dropdown-item.checked .checkbox {
      background: #4fc3f7; border-color: #4fc3f7;
    }
    .tag-dropdown-empty {
      padding: 12px 14px; color: #666; font-size: 12px; text-align: center;
    }

    .active-tags {
      display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
      margin-bottom: 12px;
    }
    .active-tag {
      display: flex; align-items: center; gap: 4px;
      background: #1e3a5f; color: #4fc3f7; padding: 4px 10px;
      border-radius: 12px; font-size: 12px;
    }
    .active-tag .remove {
      cursor: pointer; font-size: 14px; line-height: 1;
      color: #4fc3f7; opacity: 0.6; transition: opacity 0.15s;
    }
    .active-tag .remove:hover { opacity: 1; }
    .clear-all {
      background: none; border: none; color: #888; font-size: 12px;
      cursor: pointer; padding: 4px 8px; transition: color 0.15s;
    }
    .clear-all:hover { color: #ef5350; }

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
    this.selectedTags = [];
    this._tagDropdownOpen = false;
    this._onDocClick = this._onDocClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadDevices();
    document.addEventListener('click', this._onDocClick);
    wsService.onMessage((data) => {
      if (data.type === 'device_update') {
        this.devices = { ...this.devices, [data.device_id]: data.device };
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
  }

  _onDocClick(e) {
    if (this._tagDropdownOpen) {
      const path = e.composedPath();
      const selector = this.shadowRoot?.querySelector('.tag-selector');
      if (selector && !path.includes(selector)) {
        this._tagDropdownOpen = false;
      }
    }
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
    if (this.selectedTags.length > 0) {
      entries = entries.filter(([, d]) => {
        const deviceTags = [...(d.tags || []), ...(d.server_tags || [])];
        return this.selectedTags.some(t => deviceTags.includes(t));
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

        <div class="tag-selector">
          <button class="tag-trigger ${this.selectedTags.length > 0 ? 'has-selected' : ''}"
            @click=${(e) => { e.stopPropagation(); this._tagDropdownOpen = !this._tagDropdownOpen; }}>
            Tags ${this.selectedTags.length > 0 ? `(${this.selectedTags.length})` : ''}
            <span class="arrow">${this._tagDropdownOpen ? '\u25B2' : '\u25BC'}</span>
          </button>
          ${this._tagDropdownOpen ? html`
            <div class="tag-dropdown">
              ${tags.length === 0
                ? html`<div class="tag-dropdown-empty">No tags found</div>`
                : tags.map(tag => html`
                  <div class="tag-dropdown-item ${this.selectedTags.includes(tag) ? 'checked' : ''}"
                    @click=${() => this._toggleTag(tag)}>
                    <span class="checkbox">${this.selectedTags.includes(tag) ? '\u2713' : ''}</span>
                    ${tag}
                  </div>
                `)
              }
            </div>
          ` : ''}
        </div>
      </div>

      ${this.selectedTags.length > 0 ? html`
        <div class="active-tags">
          ${this.selectedTags.map(tag => html`
            <span class="active-tag">
              #${tag}
              <span class="remove" @click=${() => this._removeTag(tag)}>&times;</span>
            </span>
          `)}
          <button class="clear-all" @click=${this._clearTags}>Clear all</button>
        </div>
      ` : ''}

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

  _toggleTag(tag) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags = [...this.selectedTags, tag];
    }
  }

  _removeTag(tag) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  _clearTags() {
    this.selectedTags = [];
    this.filter = 'all';
  }

  _selectDevice(id) {
    this.dispatchEvent(new CustomEvent('device-select', {
      detail: { deviceId: id }, bubbles: true, composed: true,
    }));
  }
}

customElements.define('dashboard-view', DashboardView);

import { LitElement, html, css } from 'lit';

const STATUS_COLORS = {
  online: '#04d65c',
  offline: '#ef5350',
  warning: '#ffb74d',
  unknown: '#666',
};

class DeviceCard extends LitElement {
  static properties = {
    device: { type: Object },
    deviceId: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid var(--status-color, #666);
    }
    :host(:hover) {
      background: rgba(255,255,255,0.08);
      transform: translateY(-1px);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    .status {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .type {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 8px;
    }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .attr {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
    }
    .attr-value { color: rgba(255,255,255,0.8); }
    .attr-value.warning { color: #ffb74d; }
    .tags {
      display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;
    }
    .tag {
      font-size: 9px; background: rgba(0,212,255,0.15); color: #00D4FF;
      padding: 1px 6px; border-radius: 3px;
    }
  `;

  render() {
    if (!this.device) return html``;
    const d = this.device;
    const color = STATUS_COLORS[d.status] || STATUS_COLORS.unknown;
    const allAttrs = Object.entries(d.attributes || {});
    const hidden = d.hidden_attributes || [];
    const pinned = d.card_attributes || [];
    let attrs;
    if (pinned.length > 0) {
      // Show pinned attributes in their pinned order
      attrs = pinned
        .map(name => allAttrs.find(([n]) => n === name))
        .filter(Boolean);
    } else {
      // Default: first 4 visible attributes
      attrs = allAttrs
        .filter(([name]) => !hidden.includes(name))
        .slice(0, 4);
    }
    const tags = [...(d.tags || []), ...(d.server_tags || [])];
    const displayName = d.device_name || this.deviceId;

    this.style.setProperty('--status-color', color);
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', `${displayName}, ${d.status || 'unknown'}`);

    return html`
      <div class="header">
        <span class="name">${displayName}</span>
        <span class="status" style="background: ${color}20; color: ${color}">
          ${d.status === 'online' ? '● ' : d.status === 'offline' ? '● ' : '⚠ '}${d.status}
        </span>
      </div>
      <div class="type">${d.device_type || 'unknown'}</div>
      ${attrs.length > 0 ? html`
        <div class="attrs">
          ${attrs.map(([name, data]) => html`
            <div class="attr">
              ${name.replace(/_/g, ' ')}: <span class="attr-value ${this._isWarning(name, data) ? 'warning' : ''}">${data.value}${data.unit}</span>
            </div>
          `)}
        </div>
      ` : ''}
      ${tags.length > 0 ? html`
        <div class="tags">
          ${tags.map(t => html`<span class="tag">${t}</span>`)}
        </div>
      ` : ''}
    `;
  }

  _isWarning(name, data) {
    const thresholds = { cpu_usage: 90, memory_usage: 90, disk_usage: 95, cpu_temp: 80 };
    return thresholds[name] && data.value > thresholds[name];
  }
}

customElements.define('device-card', DeviceCard);

import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { applyTransform } from '../utils/transforms.js';
import { getDeviceIcon, getDeviceColor, getTypeBadgeClass } from '../utils/device-icons.js';

const STATUS_COLORS = {
  online: '#04d65c',
  offline: '#ef5350',
  warning: '#ffb74d',
  critical: '#ef5350',
  unknown: '#666',
};

class DeviceCard extends LitElement {
  static properties = {
    device: { type: Object },
    deviceId: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
  }

  static styles = [sharedStyles, css`
    :host {
      display: block;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid var(--status-color, #666);
      font-family: var(--font-display);
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
    .name-row { display: flex; align-items: center; gap: 8px; }
    .type-icon { display: flex; align-items: center; }
    .type-badge {
      font-size: 9px; padding: 2px 7px; border-radius: 3px;
      text-transform: uppercase; letter-spacing: 0.04em; font-weight: 500;
      font-family: var(--font-data);
      display: inline-block; margin-bottom: 6px;
    }
    .type-badge.badge-linux { background: rgba(255,183,77,0.15); color: #ffb74d; }
    .type-badge.badge-windows { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-badge.badge-laptop { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-badge.badge-esp32 { background: rgba(4,214,92,0.15); color: #04d65c; }
    .type-badge.badge-server { background: rgba(179,136,255,0.15); color: #b388ff; }
    .type-badge.badge-generic { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }
    .attrs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .attr {
      font-size: 11px;
      color: #fff;
    }
    .attr-value { color: #00D4FF; font-weight: 500; font-family: var(--font-data); }
    .attr-value.warning { color: #ffb74d; }
    .tags {
      display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap; align-items: center;
    }
    .tag {
      font-size: 9px; color: rgba(0,212,255,0.45);
    }
    .tag-sep {
      font-size: 9px; color: rgba(255,255,255,0.1);
    }

    @media (max-width: 480px) {
      .attrs { grid-template-columns: 1fr; }
    }
  `];

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
    const transforms = d.attribute_transforms || {};
    const tags = [...(d.tags || []), ...(d.server_tags || [])];
    const displayName = d.device_name || this.deviceId;

    this.style.setProperty('--status-color', color);
    this.setAttribute('aria-label', `${displayName}, ${d.status || 'unknown'}`);

    return html`
      <div class="header">
        <div class="name-row">
          <span class="name">${displayName}</span>
          <span class="type-icon" style="color: ${getDeviceColor(d.device_type)}">${getDeviceIcon(d.device_type)}</span>
        </div>
        <span class="status" style="background: ${color}20; color: ${color}">
          ${d.status === 'online' ? '● ' : d.status === 'offline' ? '● ' : d.status === 'critical' ? '⚠ ' : '⚠ '}${d.status}
        </span>
      </div>
      <div class="type"><span class="type-badge ${getTypeBadgeClass(d.device_type)}">${d.device_type || 'unknown'}</span></div>
      ${attrs.length > 0 ? html`
        <div class="attrs">
          ${attrs.map(([name, data]) => {
            const transform = transforms[name];
            const displayVal = transform ? applyTransform(data.value, transform) : `${data.value}${data.unit || ''}`;
            return html`
              <div class="attr">
                ${name.replace(/_/g, ' ')}: <span class="attr-value ${this._isWarning(name, data) ? 'warning' : ''}">${displayVal}</span>
              </div>
            `;
          })}
        </div>
      ` : ''}
      ${tags.length > 0 ? html`
        <div class="tags">
          ${tags.map((t, i) => html`${i > 0 ? html`<span class="tag-sep">·</span>` : ''}<span class="tag">${t}</span>`)}
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

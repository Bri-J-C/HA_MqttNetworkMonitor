/**
 * MQTT Network Monitor — Lovelace Cards
 * Auto-discovers the add-on's ingress URL — no server_url config needed.
 */

const ADDON_SLUG = 'local_mqtt_network_monitor';
const STATUS_COLORS = {
  online: '#81c784',
  offline: '#ef5350',
  warning: '#ffb74d',
  unknown: '#666',
};

// ============================================
// Shared: Auto-discover add-on ingress URL
// Uses the same pattern as ha-addon-iframe-card:
// 1. Query supervisor/api for addon info → get ingress_url
// 2. Create ingress session → set cookie
// 3. Refresh session periodically
// ============================================

let _cachedIngressUrl = null;
let _discoveryPromise = null;
let _sessionRefreshInterval = null;

async function getIngressUrl(hass) {
  if (_cachedIngressUrl) return _cachedIngressUrl;
  if (_discoveryPromise) return _discoveryPromise;

  _discoveryPromise = (async () => {
    // Step 1: Get addon info via supervisor WebSocket API
    try {
      const resp = await hass.callWS({
        type: 'supervisor/api',
        endpoint: `/addons/${ADDON_SLUG}/info`,
        method: 'get',
      });
      const url = resp?.ingress_url || resp?.data?.ingress_url;
      if (url) {
        _cachedIngressUrl = url.replace(/\/+$/, '');
        console.info('MQTT Monitor: Discovered ingress URL:', _cachedIngressUrl);
      }
    } catch (e) {
      console.warn('MQTT Monitor: Supervisor API call failed:', e.message);
    }

    if (!_cachedIngressUrl) {
      console.error('MQTT Monitor: Could not discover add-on. Is it installed and running?');
      return null;
    }

    // Step 2: Create ingress session (sets cookie for browser access)
    await createIngressSession(hass);

    // Step 3: Refresh session every 60 seconds
    if (!_sessionRefreshInterval) {
      _sessionRefreshInterval = setInterval(() => createIngressSession(hass), 60000);
    }

    return _cachedIngressUrl;
  })();

  return _discoveryPromise;
}

async function createIngressSession(hass) {
  try {
    const resp = await hass.callWS({
      type: 'supervisor/api',
      endpoint: '/ingress/session',
      method: 'post',
    });
    const session = resp?.session || resp?.data?.session;
    if (session) {
      const secure = location.protocol === 'https:' ? ';Secure' : '';
      document.cookie = `ingress_session=${session};path=/api/hassio_ingress/;SameSite=Strict${secure}`;
    }
  } catch (e) {
    console.warn('MQTT Monitor: Failed to create ingress session:', e.message);
  }
}

async function addonFetch(hass, path, serverUrlOverride) {
  let baseUrl = serverUrlOverride || '';
  if (!baseUrl) {
    baseUrl = await getIngressUrl(hass);
  }
  if (!baseUrl) return null;

  try {
    // Ingress session cookie handles auth — no Authorization header needed
    const res = await fetch(baseUrl + path);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

// ============================================
// Device Status Card
// ============================================

class MQTTDeviceStatusCard extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    // Throttle renders to avoid hammering the API
    if (!this._lastRender || Date.now() - this._lastRender > 5000) {
      this._lastRender = Date.now();
      this._render();
    }
  }

  setConfig(config) {
    if (!config.device_id) {
      throw new Error('Please define a device_id');
    }
    this._config = config;
  }

  async _render() {
    const device = await addonFetch(
      this._hass,
      `/api/devices/${this._config.device_id}`,
      this._config.server_url
    );

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    if (!device) {
      this.shadowRoot.innerHTML = `
        <ha-card>
          <div style="padding: 16px; color: var(--secondary-text-color, #999);">
            Device "${this._config.device_id}" not found.
            ${!_cachedIngressUrl ? '<br><small>Add-on may not be running.</small>' : ''}
          </div>
        </ha-card>
      `;
      return;
    }

    const color = STATUS_COLORS[device.status] || STATUS_COLORS.unknown;
    const attrs = Object.entries(device.attributes || {});
    const displayAttrs = this._config.attributes
      ? attrs.filter(([name]) => this._config.attributes.includes(name))
      : attrs.slice(0, 6);

    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>
          .card-content { padding: 16px; }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          .name { font-size: 16px; font-weight: 600; color: var(--primary-text-color); }
          .status {
            padding: 3px 10px; border-radius: 10px; font-size: 12px;
            background: ${color}22; color: ${color};
          }
          .type { font-size: 11px; color: var(--secondary-text-color, #999); margin-bottom: 10px; }
          .attrs {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
            gap: 8px;
          }
          .attr {
            background: var(--card-background-color, rgba(0,0,0,0.1));
            border-radius: 6px; padding: 10px; text-align: center;
          }
          .attr-label {
            font-size: 10px; color: var(--secondary-text-color, #999);
            text-transform: uppercase;
          }
          .attr-value {
            font-size: 18px; font-weight: 700;
            color: var(--primary-color, #4fc3f7); margin-top: 4px;
          }
          .attr-unit { font-size: 11px; color: var(--secondary-text-color, #999); }
          .tags { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
          .tag {
            font-size: 9px; padding: 1px 6px; border-radius: 3px;
            background: var(--primary-color, #4fc3f7)22;
            color: var(--primary-color, #4fc3f7);
          }
        </style>
        <div class="card-content">
          <div class="header">
            <span class="name">${device.device_name || this._config.device_id}</span>
            <span class="status">${device.status}</span>
          </div>
          <div class="type">${device.device_type || ''}</div>
          ${(device.tags && device.tags.length) ? `
            <div class="tags">
              ${device.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          ` : ''}
          <div class="attrs">
            ${displayAttrs.map(([name, data]) => `
              <div class="attr">
                <div class="attr-label">${name.replace(/_/g, ' ')}</div>
                <div class="attr-value">
                  ${data.value != null ? data.value : '—'}
                  <span class="attr-unit">${data.unit || ''}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement('mqtt-device-status-editor');
  }

  static getStubConfig() {
    return { device_id: '' };
  }
}

// ============================================
// Mini Topology Card
// ============================================

class MQTTTopologyCard extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this._lastRender || Date.now() - this._lastRender > 10000) {
      this._lastRender = Date.now();
      this._render();
    }
  }

  setConfig(config) {
    this._config = config;
  }

  async _render() {
    const topo = await addonFetch(this._hass, '/api/topology', this._config.server_url);
    const layouts = await addonFetch(this._hass, '/api/topology/layouts', this._config.server_url);

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    if (!topo || !topo.nodes.length) {
      this.shadowRoot.innerHTML = `
        <ha-card>
          <div style="padding: 16px; color: var(--secondary-text-color, #999);">
            No devices found.
            ${!_cachedIngressUrl ? '<br><small>Add-on may not be running.</small>' : ''}
          </div>
        </ha-card>
      `;
      return;
    }

    // Find the selected layout (by config or default)
    let layout = null;
    if (layouts) {
      if (this._config.layout) {
        // Try by ID first, then by name
        layout = layouts[this._config.layout] ||
          Object.values(layouts).find(l => l.name === this._config.layout);
      }
      if (!layout) {
        // Fall back to the default layout
        layout = Object.values(layouts).find(l => l.isDefault);
      }
    }

    const nodes = topo.nodes;

    // Determine which edges to show
    const hideAutoEdges = layout?.hideAutoEdges || false;
    const autoEdges = hideAutoEdges ? [] : (topo.edges || []);
    const manualEdges = layout?.manualEdges || [];
    const allEdges = [...autoEdges, ...manualEdges];

    const counts = {
      online: nodes.filter(n => n.status === 'online').length,
      offline: nodes.filter(n => n.status === 'offline').length,
      warning: nodes.filter(n => n.status === 'warning').length,
    };

    // Use the same coordinate space as the editor (900x500)
    // SVG viewBox handles scaling to fit the card width
    const VB_W = 900;
    const VB_H = 500;
    const savedPositions = layout?.positions || {};
    const positions = { ...savedPositions };

    // Auto-position nodes that don't have saved positions
    const cols = Math.ceil(Math.sqrt(nodes.length));
    nodes.forEach((node, i) => {
      if (!positions[node.id]) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions[node.id] = {
          x: 100 + col * (700 / Math.max(cols, 1)),
          y: 80 + row * 100,
        };
      }
    });

    // Render edges (lines first, then labels on top)
    const edgeLinesSvg = allEdges.map(e => {
      const from = positions[e.source];
      const to = positions[e.target];
      if (!from || !to) return '';
      const isManual = e.type === 'manual' || e.sourceLabel || e.targetLabel || (!e.type);
      const color = isManual ? '#4fc3f7' : '#555';
      const dash = isManual ? 'none' : '4,2';
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" stroke-width="1.5" stroke-dasharray="${dash}"/>`;
    }).join('');

    // Render nodes
    const nodesSvg = nodes.map(n => {
      const pos = positions[n.id];
      if (!pos) return '';
      const color = STATUS_COLORS[n.status] || STATUS_COLORS.unknown;
      const isGateway = n.type === 'gateway';

      if (isGateway) {
        return `
          <circle cx="${pos.x}" cy="${pos.y}" r="22" fill="${color}22" stroke="${color}" stroke-width="1.5"/>
          <text x="${pos.x}" y="${pos.y + 4}" text-anchor="middle" fill="${color}" font-size="10">
            ${(n.name || n.id).substring(0, 12)}
          </text>
        `;
      }
      return `
        <rect x="${pos.x - 45}" y="${pos.y - 18}" width="90" height="36" rx="6"
          fill="#2a2a4a" stroke="${color}" stroke-width="1.5"/>
        <text x="${pos.x}" y="${pos.y - 3}" text-anchor="middle" fill="${color}" font-size="10">
          ${(n.name || n.id).substring(0, 12)}
        </text>
        <text x="${pos.x}" y="${pos.y + 10}" text-anchor="middle" fill="#666" font-size="8">${n.status}</text>
      `;
    }).join('');

    // Render edge labels on top of nodes
    const edgeLabelsSvg = allEdges.map(e => {
      const from = positions[e.source];
      const to = positions[e.target];
      if (!from || !to) return '';

      let svg = '';
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      let perpX = -uy, perpY = ux;
      if (perpY > 0) { perpX = -perpX; perpY = -perpY; }

      if (e.label) {
        const mx = (from.x + to.x) / 2 + perpX * 14;
        const my = (from.y + to.y) / 2 + perpY * 14;
        svg += `<rect x="${mx - e.label.length * 3 - 3}" y="${my - 9}" width="${e.label.length * 6 + 6}" height="13" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${mx}" y="${my}" text-anchor="middle" fill="#888" font-size="9">${e.label}</text>`;
      }
      if (e.sourceLabel) {
        const sx = from.x + ux * 55;
        const sy = from.y + uy * 55;
        svg += `<rect x="${sx - e.sourceLabel.length * 2.5 - 3}" y="${sy - 8}" width="${e.sourceLabel.length * 5 + 6}" height="12" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${sx}" y="${sy}" text-anchor="middle" fill="#4fc3f7" font-size="8">${e.sourceLabel}</text>`;
      }
      if (e.targetLabel) {
        const tx = to.x - ux * 55;
        const ty = to.y - uy * 55;
        svg += `<rect x="${tx - e.targetLabel.length * 2.5 - 3}" y="${ty - 8}" width="${e.targetLabel.length * 5 + 6}" height="12" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${tx}" y="${ty}" text-anchor="middle" fill="#4fc3f7" font-size="8">${e.targetLabel}</text>`;
      }
      return svg;
    }).join('');

    const layoutName = layout ? layout.name : 'Auto Discovery';
    const cardHeight = this._config.height || 300;

    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>
          .card-content { padding: 12px; }
          .header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 8px;
          }
          .title { font-size: 14px; font-weight: 600; color: var(--primary-text-color); }
          .subtitle { font-size: 10px; color: var(--secondary-text-color, #666); }
          .counts { font-size: 10px; color: var(--secondary-text-color, #999); }
          .count-online { color: ${STATUS_COLORS.online}; }
          .count-offline { color: ${STATUS_COLORS.offline}; }
          .count-warning { color: ${STATUS_COLORS.warning}; }
          .svg-container {
            background: #1a1a2e;
            border-radius: 8px;
            overflow: hidden;
          }
          svg { width: 100%; height: ${cardHeight}px; }
        </style>
        <div class="card-content">
          <div class="header">
            <div>
              <span class="title">${this._config.title || 'Network'}</span>
              <div class="subtitle">${layoutName}</div>
            </div>
            <span class="counts">
              <span class="count-online">${counts.online} online</span>
              · <span class="count-offline">${counts.offline} offline</span>
              ${counts.warning ? ` · <span class="count-warning">${counts.warning} warning</span>` : ''}
            </span>
          </div>
          <div class="svg-container">
            <svg viewBox="0 0 ${VB_W} ${VB_H}">
              ${edgeLinesSvg}
              ${nodesSvg}
              ${edgeLabelsSvg}
            </svg>
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    const h = this._config?.height || 300;
    return Math.ceil(h / 50) + 1;
  }

  static getConfigElement() {
    return document.createElement('mqtt-topology-editor');
  }

  static getStubConfig() {
    return { title: 'Network', layout: '' };
  }
}

// ============================================
// Card Editors
// ============================================

class MQTTDeviceStatusEditor extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (this._config && !this._devicesLoaded) {
      this._loadDevices();
    }
  }

  setConfig(config) {
    this._config = { ...config };
    this._devices = [];
    this._devicesLoaded = false;
    this._render();
  }

  async _loadDevices() {
    this._devicesLoaded = true;
    const data = await addonFetch(this._hass, '/api/devices');
    if (data) {
      this._devices = Object.entries(data).map(([id, d]) => ({
        id,
        name: d.device_name || id,
      }));
      this._render();
    }
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const currentId = this._config.device_id || '';

    this.shadowRoot.innerHTML = `
      <style>
        .form { padding: 16px; }
        .field { margin-bottom: 12px; }
        .field label { display: block; font-weight: 500; margin-bottom: 4px; font-size: 14px; }
        .field select, .field input {
          width: 100%; padding: 8px; border-radius: 4px;
          border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          font-size: 14px; box-sizing: border-box;
        }
        .hint { font-size: 11px; color: var(--secondary-text-color, #999); margin-top: 2px; }
      </style>
      <div class="form">
        <div class="field">
          <label>Device</label>
          ${this._devices.length > 0 ? `
            <select id="device-select">
              <option value="">Select a device...</option>
              ${this._devices.map(d =>
                `<option value="${d.id}" ${d.id === currentId ? 'selected' : ''}>${d.name} (${d.id})</option>`
              ).join('')}
            </select>
          ` : `
            <input id="device-input" type="text" value="${currentId}" placeholder="e.g., pi-garage">
            <div class="hint">Device ID from your client config</div>
          `}
        </div>
        <div class="field">
          <label>Attributes (optional)</label>
          <input id="attrs-input" type="text"
            value="${(this._config.attributes || []).join(', ')}"
            placeholder="Leave empty to show all. e.g., cpu_usage, memory_usage">
          <div class="hint">Comma-separated list of attributes to display</div>
        </div>
      </div>
    `;

    // Bind events
    const deviceSelect = this.shadowRoot.getElementById('device-select');
    const deviceInput = this.shadowRoot.getElementById('device-input');
    const attrsInput = this.shadowRoot.getElementById('attrs-input');

    if (deviceSelect) {
      deviceSelect.addEventListener('change', (e) => this._update('device_id', e.target.value));
    }
    if (deviceInput) {
      deviceInput.addEventListener('input', (e) => this._update('device_id', e.target.value));
    }
    if (attrsInput) {
      attrsInput.addEventListener('input', (e) => {
        const attrs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
        this._update('attributes', attrs.length ? attrs : undefined);
      });
    }
  }

  _update(key, value) {
    if (value === undefined) {
      delete this._config[key];
    } else {
      this._config[key] = value;
    }
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config } },
      bubbles: true, composed: true,
    }));
  }
}

class MQTTTopologyEditor extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (this._config && !this._layoutsLoaded) {
      this._loadLayouts();
    }
  }

  setConfig(config) {
    this._config = { ...config };
    this._layouts = [];
    this._layoutsLoaded = false;
    this._render();
  }

  async _loadLayouts() {
    this._layoutsLoaded = true;
    const data = await addonFetch(this._hass, '/api/topology/layouts');
    if (data) {
      this._layouts = Object.entries(data).map(([id, l]) => ({
        id,
        name: l.name || id,
        isDefault: l.isDefault || false,
      }));
      this._render();
    }
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const currentLayout = this._config.layout || '';

    this.shadowRoot.innerHTML = `
      <style>
        .form { padding: 16px; }
        .field { margin-bottom: 12px; }
        .field label { display: block; font-weight: 500; margin-bottom: 4px; font-size: 14px; }
        .field select, .field input {
          width: 100%; padding: 8px; border-radius: 4px;
          border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          font-size: 14px; box-sizing: border-box;
        }
        .hint { font-size: 11px; color: var(--secondary-text-color, #999); margin-top: 2px; }
      </style>
      <div class="form">
        <div class="field">
          <label>Title</label>
          <input id="title-input" type="text"
            value="${this._config.title || ''}"
            placeholder="e.g., Home Network">
        </div>
        <div class="field">
          <label>Height (px)</label>
          <input id="height-input" type="number"
            value="${this._config.height || 300}"
            min="150" max="800" step="50"
            placeholder="300">
          <div class="hint">Card height in pixels (default: 300)</div>
        </div>
        <div class="field">
          <label>Layout</label>
          ${this._layouts.length > 0 ? `
            <select id="layout-select">
              <option value="" ${!currentLayout ? 'selected' : ''}>Default (or auto-discovery)</option>
              ${this._layouts.map(l =>
                `<option value="${l.id}" ${l.id === currentLayout ? 'selected' : ''}>${l.name}${l.isDefault ? ' (default)' : ''}</option>`
              ).join('')}
            </select>
            <div class="hint">Layouts are created in the add-on's Topology editor</div>
          ` : `
            <input id="layout-input" type="text" value="${currentLayout}" placeholder="Layout ID (optional)">
            <div class="hint">Create layouts in the add-on's Topology editor</div>
          `}
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('title-input')
      .addEventListener('input', (e) => this._update('title', e.target.value));

    this.shadowRoot.getElementById('height-input')
      .addEventListener('input', (e) => this._update('height', parseInt(e.target.value) || 300));

    const layoutSelect = this.shadowRoot.getElementById('layout-select');
    const layoutInput = this.shadowRoot.getElementById('layout-input');
    if (layoutSelect) {
      layoutSelect.addEventListener('change', (e) => this._update('layout', e.target.value || undefined));
    }
    if (layoutInput) {
      layoutInput.addEventListener('input', (e) => this._update('layout', e.target.value || undefined));
    }
  }

  _update(key, value) {
    if (value === undefined || value === '') {
      delete this._config[key];
    } else {
      this._config[key] = value;
    }
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config } },
      bubbles: true, composed: true,
    }));
  }
}

// ============================================
// Register Cards
// ============================================

customElements.define('mqtt-device-status-card', MQTTDeviceStatusCard);
customElements.define('mqtt-topology-card', MQTTTopologyCard);
customElements.define('mqtt-device-status-editor', MQTTDeviceStatusEditor);
customElements.define('mqtt-topology-editor', MQTTTopologyEditor);

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: 'mqtt-device-status-card',
    name: 'MQTT Device Status',
    description: 'Shows status and attributes for a single MQTT-monitored device',
    preview: true,
  },
  {
    type: 'mqtt-topology-card',
    name: 'MQTT Network Topology',
    description: 'Shows a compact network topology overview',
    preview: true,
  }
);

console.info('%c MQTT Network Monitor Cards v0.1.0 ', 'background: #4fc3f7; color: #1a1a2e; font-weight: bold;');

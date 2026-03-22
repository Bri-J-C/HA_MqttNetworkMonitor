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
          ha-card { height: 100%; overflow: hidden; }
          .card-content { padding: 16px; height: 100%; box-sizing: border-box; overflow: hidden; }
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

  getGridOptions() {
    return {
      columns: 6,
      rows: 3,
      min_rows: 2,
      max_rows: 6,
      min_columns: 3,
    };
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

    // Get saved positions or auto-layout
    const savedPositions = layout?.positions || {};
    const positions = { ...savedPositions };
    const cols = Math.ceil(Math.sqrt(nodes.length));
    nodes.forEach((node, i) => {
      if (!positions[node.id]) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions[node.id] = {
          x: 80 + col * 160,
          y: 60 + row * 100,
        };
      }
    });

    // Calculate bounding box of all node positions, then build viewBox to fit
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pos of Object.values(positions)) {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }
    const pad = 50;
    const vbX = minX - pad;
    const vbY = minY - pad;
    const vbW = Math.max((maxX - minX) + pad * 2, 200);
    const vbH = Math.max((maxY - minY) + pad * 2, 150);

    // Fixed sizes — the SVG viewBox→card scaling handles readability
    const nodeW = 70;
    const nodeH = 28;
    const nodeR = 16;
    const fontSizeSm = 9;
    const fontSizeLabelSm = 8;
    const strokeW = 1.2;
    const labelDist = 42;
    const labelPerpOff = 12;

    // Render edge lines
    const edgeLinesSvg = allEdges.map(e => {
      const from = positions[e.source];
      const to = positions[e.target];
      if (!from || !to) return '';
      const isManual = e.type === 'manual' || e.sourceLabel || e.targetLabel || (!e.type);
      const color = isManual ? '#4fc3f7' : '#555';
      const dash = isManual ? 'none' : '4,2';
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${color}" stroke-width="${strokeW}" stroke-dasharray="${dash}"/>`;
    }).join('');

    // Render nodes
    const nodesSvg = nodes.map(n => {
      const pos = positions[n.id];
      if (!pos) return '';
      const color = STATUS_COLORS[n.status] || STATUS_COLORS.unknown;
      const isGateway = n.type === 'gateway';
      if (isGateway) {
        return `
          <circle cx="${pos.x}" cy="${pos.y}" r="${nodeR}" fill="${color}22" stroke="${color}" stroke-width="${strokeW}"/>
          <text x="${pos.x}" y="${pos.y + 3}" text-anchor="middle" fill="${color}" font-size="${fontSizeSm}">
            ${(n.name || n.id).substring(0, 12)}
          </text>
        `;
      }
      return `
        <rect x="${pos.x - nodeW/2}" y="${pos.y - nodeH/2}" width="${nodeW}" height="${nodeH}" rx="4"
          fill="#2a2a4a" stroke="${color}" stroke-width="${strokeW}"/>
        <text x="${pos.x}" y="${pos.y - 2}" text-anchor="middle" fill="${color}" font-size="${fontSizeSm}">
          ${(n.name || n.id).substring(0, 12)}
        </text>
        <text x="${pos.x}" y="${pos.y + 9}" text-anchor="middle" fill="#666" font-size="7">${n.status}</text>
      `;
    }).join('');

    // Render edge labels on top
    const edgeLabelsSvg = allEdges.map(e => {
      const from = positions[e.source];
      const to = positions[e.target];
      if (!from || !to) return '';
      if (!e.label && !e.sourceLabel && !e.targetLabel) return '';

      let svg = '';
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      let perpX = -uy, perpY = ux;
      if (perpY > 0) { perpX = -perpX; perpY = -perpY; }

      const bgH = fontSizeLabelSm + 3;

      if (e.label) {
        const mx = (from.x + to.x) / 2 + perpX * labelPerpOff;
        const my = (from.y + to.y) / 2 + perpY * labelPerpOff;
        const tw = e.label.length * fontSizeLabelSm * 0.55 + 6;
        svg += `<rect x="${mx - tw/2}" y="${my - bgH + 2}" width="${tw}" height="${bgH}" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${mx}" y="${my}" text-anchor="middle" fill="#888" font-size="${fontSizeLabelSm}">${e.label}</text>`;
      }
      if (e.sourceLabel) {
        const sx = from.x + ux * labelDist;
        const sy = from.y + uy * labelDist;
        const tw = e.sourceLabel.length * fontSizeLabelSm * 0.55 + 6;
        svg += `<rect x="${sx - tw/2}" y="${sy - bgH + 2}" width="${tw}" height="${bgH}" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${sx}" y="${sy}" text-anchor="middle" fill="#4fc3f7" font-size="${fontSizeLabelSm}">${e.sourceLabel}</text>`;
      }
      if (e.targetLabel) {
        const tx = to.x - ux * labelDist;
        const ty = to.y - uy * labelDist;
        const tw = e.targetLabel.length * fontSizeLabelSm * 0.55 + 6;
        svg += `<rect x="${tx - tw/2}" y="${ty - bgH + 2}" width="${tw}" height="${bgH}" rx="2" fill="#1a1a2e" opacity="0.9"/>`;
        svg += `<text x="${tx}" y="${ty}" text-anchor="middle" fill="#4fc3f7" font-size="${fontSizeLabelSm}">${e.targetLabel}</text>`;
      }
      return svg;
    }).join('');

    const layoutName = layout ? layout.name : 'Auto Discovery';

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
          ha-card { height: 100%; overflow: hidden; display: flex; flex-direction: column; }
          .card-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
          .svg-container {
            background: #1a1a2e;
            border-radius: 8px;
            overflow: hidden;
            flex: 1;
            min-height: 0;
          }
          svg { width: 100%; height: 100%; display: block; }
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
            <svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}">
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
    return 6;
  }

  getGridOptions() {
    return {
      columns: 12,
      rows: 8,
      min_rows: 2,
      max_rows: 8,
      min_columns: 6,
    };
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

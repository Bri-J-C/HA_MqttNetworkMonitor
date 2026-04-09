/**
 * MQTT Network Monitor — Lovelace Cards v2.0.0
 * Auto-discovers the add-on's ingress URL — no server_url config needed.
 *
 * Cards:
 *   - mqtt-device-status-card: Single device status, attributes, thresholds, tags
 *   - mqtt-topology-card: Mini network topology map
 */

const ADDON_SLUG = 'local_mqtt_network_monitor';
const CARD_VERSION = '2.0.0';

// ── Color scheme (matches the add-on dark theme) ─────────────────────────
const COLORS = {
  bg:          '#0a0a1a',
  cardBg:      'rgba(255,255,255,0.05)',
  tileBg:      'rgba(255,255,255,0.04)',
  text:        '#fff',
  textSec:     'rgba(255,255,255,0.5)',
  accent:      '#00D4FF',
  section:     '#238ecc',
  online:      '#04d65c',
  offline:     '#ef5350',
  warning:     '#ffb74d',
  critical:    '#ef5350',
  unknown:     '#666',
  tagBg:       'rgba(0,212,255,0.12)',
  tagText:     '#00D4FF',
};

const STATUS_COLORS = {
  online:  COLORS.online,
  offline: COLORS.offline,
  warning: COLORS.warning,
  unknown: COLORS.unknown,
};

// ── Device-type icons (SVG paths, 16x16 viewBox) ─────────────────────────
const DEVICE_ICONS = {
  linux: '<path d="M8 1C5.5 1 4 3 4 5c0 1.2.5 2.2 1.2 3C4 8.8 3 10 3 11.5c0 1.4.8 2.5 2 2.5h6c1.2 0 2-1.1 2-2.5 0-1.5-1-2.7-2.2-3.5C11.5 7.2 12 6.2 12 5c0-2-1.5-4-4-4zm-1.5 5a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zM6 9.5c0 0 .5 1 2 1s2-1 2-1" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
  windows: '<rect x="2" y="2" width="5.5" height="5.5" rx=".5" fill="currentColor"/><rect x="8.5" y="2" width="5.5" height="5.5" rx=".5" fill="currentColor"/><rect x="2" y="8.5" width="5.5" height="5.5" rx=".5" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx=".5" fill="currentColor"/>',
  raspberry_pi: '<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="currentColor"/><line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" stroke-width="1.2"/><line x1="2" y1="8" x2="5" y2="8" stroke="currentColor" stroke-width="1.2"/><line x1="11" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width="1.2"/>',
  esp32: '<rect x="3" y="4" width="10" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="5" y1="4" x2="5" y2="2" stroke="currentColor" stroke-width="1"/><line x1="8" y1="4" x2="8" y2="2" stroke="currentColor" stroke-width="1"/><line x1="11" y1="4" x2="11" y2="2" stroke="currentColor" stroke-width="1"/><line x1="5" y1="12" x2="5" y2="14" stroke="currentColor" stroke-width="1"/><line x1="8" y1="12" x2="8" y2="14" stroke="currentColor" stroke-width="1"/><line x1="11" y1="12" x2="11" y2="14" stroke="currentColor" stroke-width="1"/>',
  gateway: '<path d="M8 2L14 8L8 14L2 8Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="currentColor"/>',
  default: '<rect x="3" y="2" width="10" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" stroke-width="1" opacity=".5"/><line x1="5" y1="7.5" x2="11" y2="7.5" stroke="currentColor" stroke-width="1" opacity=".5"/><circle cx="8" cy="11" r="1" fill="currentColor"/>',
};

function deviceIcon(type) {
  return DEVICE_ICONS[type] || DEVICE_ICONS.default;
}

function escHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ── Attribute formatting helpers ─────────────────────────────────────────
function formatValue(value, unit) {
  if (value === null || value === undefined) return '\u2014';
  if (typeof value === 'number') {
    // Large byte values → human-readable
    if (unit === 'bytes' && value > 1024) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB'];
      let i = 0;
      let v = value;
      while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
      return v.toFixed(i > 1 ? 1 : 0) + ' ' + units[i];
    }
    // Round to 1 decimal for readability
    if (!Number.isInteger(value)) {
      return value.toFixed(1);
    }
  }
  return String(value);
}

function formatUnit(value, unit) {
  if (value === null || value === undefined) return '';
  if (unit === 'bytes') return ''; // already formatted by formatValue
  return unit || '';
}

function friendlyName(name) {
  return name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ── Value transform (matches frontend/src/utils/transforms.js) ──────────
function applyTransform(value, transform) {
  if (value == null || !transform) return value;
  if (transform === 'duration') {
    const secs = Number(value);
    if (isNaN(secs)) return value;
    const parts = [];
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (d) parts.push(d + 'd');
    if (h) parts.push(h + 'h');
    if (m) parts.push(m + 'm');
    if (!parts.length) parts.push(s + 's');
    return parts.join(' ');
  }
  if (transform === 'bytes') {
    const b = Number(value);
    if (isNaN(b)) return value;
    if (b >= 1e12) return (b / 1e12).toFixed(1) + ' TB';
    if (b >= 1e9) return (b / 1e9).toFixed(1) + ' GB';
    if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB';
    if (b >= 1e3) return (b / 1e3).toFixed(1) + ' KB';
    return b + ' B';
  }
  if (transform === 'percentage') {
    const n = Number(value);
    if (isNaN(n)) return value;
    return (n * 100).toFixed(1) + '%';
  }
  if (transform.startsWith('round:')) {
    const digits = parseInt(transform.split(':')[1]) || 0;
    const n = Number(value);
    if (isNaN(n)) return value;
    return n.toFixed(digits);
  }
  if (transform.startsWith('prefix:')) return transform.slice(7) + value;
  if (transform.startsWith('suffix:')) return value + transform.slice(7);
  return value;
}

// ── Threshold evaluation ─────────────────────────────────────────────────
function evalThreshold(value, threshold) {
  if (value === null || value === undefined || threshold === undefined || threshold === null) return false;
  if (typeof value !== 'number') return false;
  let op = '>';
  let tVal = threshold;
  if (typeof threshold === 'object' && threshold !== null) {
    op = threshold.op || '>';
    tVal = threshold.value;
  }
  if (tVal === null || tVal === undefined) return false;
  switch (op) {
    case '>':  return value > tVal;
    case '<':  return value < tVal;
    case '>=': return value >= tVal;
    case '<=': return value <= tVal;
    case '==': return value === tVal;
    case '!=': return value !== tVal;
    default:   return value > tVal;
  }
}

// ============================================
// Shared: Auto-discover add-on ingress URL
// ============================================

let _cachedIngressUrl = null;
let _discoveryPromise = null;
let _sessionRefreshInterval = null;
let _hassRef = null;

async function getIngressUrl(hass) {
  _hassRef = hass;
  if (_cachedIngressUrl) return _cachedIngressUrl;
  if (_discoveryPromise) return _discoveryPromise;

  _discoveryPromise = (async () => {
    try {
      const resp = await hass.callWS({
        type: 'supervisor/api',
        endpoint: `/addons/${ADDON_SLUG}/info`,
        method: 'get',
      });
      const url = resp?.ingress_url || resp?.data?.ingress_url;
      if (url) {
        _cachedIngressUrl = url.replace(/\/+$/, '');
      }
    } catch (e) {
      console.warn('MQTT Monitor Cards: Supervisor API call failed:', e.message);
    }

    if (!_cachedIngressUrl) {
      // Reset promise so we can retry on next hass update
      _discoveryPromise = null;
      return null;
    }

    await createIngressSession(hass);
    if (!_sessionRefreshInterval) {
      _sessionRefreshInterval = setInterval(() => {
        if (_hassRef) createIngressSession(_hassRef);
      }, 60000);
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
    console.warn('MQTT Monitor Cards: Failed to create ingress session:', e.message);
  }
}

async function addonFetch(hass, path, serverUrlOverride) {
  let baseUrl = serverUrlOverride || '';
  if (!baseUrl) {
    baseUrl = await getIngressUrl(hass);
  }
  if (!baseUrl) return null;

  try {
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
  constructor() {
    super();
    this._device = null;
    this._effectiveSettings = null;
    this._loading = true;
    this._error = null;
    this._fetchInFlight = false;
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    // Throttle API fetches — configurable via poll_interval (seconds), default 10
    const interval = (this._config.poll_interval || 10) * 1000;
    const now = Date.now();
    if (!this._lastFetch || now - this._lastFetch > interval) {
      this._lastFetch = now;
      this._fetchData();
    }
  }

  setConfig(config) {
    if (!config.device_id) {
      throw new Error('Please define a device_id');
    }
    this._config = config;
    this._device = null;
    this._loading = true;
    this._renderCard();
  }

  async _fetchData() {
    if (this._fetchInFlight) return;
    this._fetchInFlight = true;

    try {
      const [device, settings] = await Promise.all([
        addonFetch(this._hass, `/api/devices/${this._config.device_id}`, this._config.server_url),
        addonFetch(this._hass, `/api/devices/${this._config.device_id}/effective-settings`, this._config.server_url),
      ]);

      this._loading = false;
      this._device = device;
      this._effectiveSettings = settings;
      this._error = !device ? 'not_found' : null;
    } catch (e) {
      this._loading = false;
      this._error = 'fetch_error';
    }
    this._fetchInFlight = false;
    this._renderCard();
  }

  _renderCard() {
    const root = this.shadowRoot;

    // Loading state
    if (this._loading && !this._device) {
      root.innerHTML = `
        <ha-card>
          <style>${this._baseStyles()}</style>
          <div class="card-wrap">
            <div class="loading">
              <div class="loading-pulse"></div>
              <span>Connecting to add-on...</span>
            </div>
          </div>
        </ha-card>`;
      return;
    }

    // Error state
    if (!this._device) {
      const msg = !_cachedIngressUrl
        ? 'Add-on not reachable. Is it installed and running?'
        : `Device "${escHtml(this._config.device_id)}" not found.`;
      root.innerHTML = `
        <ha-card>
          <style>${this._baseStyles()}</style>
          <div class="card-wrap">
            <div class="error-state">
              <svg width="24" height="24" viewBox="0 0 16 16" style="color:${COLORS.textSec}">
                ${deviceIcon('default')}
              </svg>
              <span>${msg}</span>
            </div>
          </div>
        </ha-card>`;
      return;
    }

    const d = this._device;
    const color = STATUS_COLORS[d.status] || STATUS_COLORS.unknown;
    const thresholds = this._effectiveSettings?.thresholds || {};

    // Determine which attributes to show
    const allAttrs = Object.entries(d.attributes || {});
    const hidden = d.hidden_attributes || [];
    const configAttrs = this._config.attributes; // user-specified in card config
    const pinned = d.card_attributes || [];

    let displayAttrs;
    if (configAttrs && configAttrs.length > 0) {
      // Card config overrides everything
      displayAttrs = configAttrs
        .map(name => allAttrs.find(([n]) => n === name))
        .filter(Boolean);
    } else if (pinned.length > 0) {
      // Use server-side pinned attributes
      displayAttrs = pinned
        .map(name => allAttrs.find(([n]) => n === name))
        .filter(Boolean);
    } else {
      // Fallback: first 4 visible, non-string-heavy attributes
      displayAttrs = allAttrs
        .filter(([name]) => !hidden.includes(name))
        .slice(0, 4);
    }

    // Evaluate threshold status for border indicator
    let worstStatus = 'ok'; // ok, warn, crit
    for (const [name, data] of displayAttrs) {
      const th = thresholds[name];
      if (th && evalThreshold(data.value, th)) {
        worstStatus = 'warn';
      }
      // Check crit thresholds (device-level)
      const critTh = (d.crit_threshold_overrides || {})[name];
      if (critTh && evalThreshold(data.value, critTh)) {
        worstStatus = 'crit';
      }
    }

    // Merge tags
    const tags = [...new Set([...(d.tags || []), ...(d.server_tags || [])])];

    // Status icon
    const statusDot = d.status === 'online' ? '\u25CF' : d.status === 'offline' ? '\u25CF' : '\u26A0';

    root.innerHTML = `
      <ha-card>
        <style>${this._baseStyles()}${this._cardStyles()}</style>
        <div class="card-wrap" style="border-left: 3px solid ${color}">
          <div class="header">
            <span class="name">${escHtml(d.device_name || this._config.device_id)}</span>
            <span class="status-badge" style="background:${color}20;color:${color}">
              ${statusDot} ${escHtml(d.status || 'unknown')}
            </span>
          </div>
          <div class="type">${escHtml(d.device_type || 'unknown')}</div>
          ${displayAttrs.length > 0 ? `
            <div class="attrs">
              ${displayAttrs.map(([name, data]) => {
                const th = thresholds[name];
                const critTh = (d.crit_threshold_overrides || {})[name];
                const isCrit = critTh && evalThreshold(data.value, critTh);
                const isWarn = !isCrit && th && evalThreshold(data.value, th);
                const valClass = isCrit ? 'crit' : isWarn ? 'warning' : '';
                const attrTransforms = d.attribute_transforms || {};
                const transform = attrTransforms[name];
                const val = transform ? applyTransform(data.value, transform) : (data.value != null ? data.value : '\u2014');
                const unit = transform ? '' : (data.unit || '');
                return `
                  <div class="attr">
                    ${escHtml(name.replace(/_/g, ' '))}: <span class="attr-value ${valClass}">${escHtml(String(val))}${escHtml(unit)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
          ${tags.length > 0 ? `
            <div class="tags">
              ${tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </ha-card>
    `;

  }

  _relativeTime(ts) {
    const now = Date.now() / 1000;
    const diff = now - ts;
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  disconnectedCallback() {
    if (this._pollInterval) {
      clearInterval(this._pollInterval);
      this._pollInterval = null;
    }
  }

  _baseStyles() {
    return `
      ha-card {
        height: 100%;
        overflow: hidden;
        background: ${COLORS.cardBg} !important;
        border: none !important;
        border-radius: 12px !important;
      }
      .card-wrap {
        padding: 14px;
        height: 100%;
        box-sizing: border-box;
        border-radius: 8px;
      }
      .loading {
        display: flex; align-items: center; gap: 12px;
        color: ${COLORS.textSec}; font-size: 13px;
        padding: 20px 0;
      }
      .loading-pulse {
        width: 8px; height: 8px; border-radius: 50%;
        background: ${COLORS.accent};
        animation: pulse 1.5s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      .error-state {
        display: flex; align-items: center; gap: 12px;
        color: ${COLORS.textSec}; font-size: 13px;
        padding: 16px 0;
      }
    `;
  }

  _cardStyles() {
    return `
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }
      .name {
        font-size: 14px; font-weight: 600; color: #fff;
      }
      .status-badge {
        font-size: 11px; padding: 2px 8px; border-radius: 10px;
      }
      .type {
        font-size: 11px; color: rgba(255,255,255,0.5);
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
      .attr-value.crit { color: #ef5350; }
      .tags {
        display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;
      }
      .tag {
        font-size: 9px; background: rgba(0,212,255,0.15); color: #00D4FF;
        padding: 1px 6px; border-radius: 3px;
      }
    `;
  }

  getCardSize() {
    return 3;
  }

  getGridOptions() {
    return {
      columns: 7,
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
  constructor() {
    super();
    this._loading = true;
    // Zoom state — plain instance properties (not reactive) for gesture stability
    this._vbX = 0;
    this._vbY = 0;
    this._vbW = 600;
    this._vbH = 400;
    this._fitVbX = 0;
    this._fitVbY = 0;
    this._fitVbW = 600;
    this._fitVbH = 400;
    // Pinch gesture state
    this._pinchStartDist = 0;
    this._pinchStartVb = null;
    this._pinchCenterRatioX = 0.5;
    this._pinchCenterRatioY = 0.5;
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this._lastFetch || Date.now() - this._lastFetch > 15000) {
      this._lastFetch = Date.now();
      this._fetchAndRender();
    }
  }

  setConfig(config) {
    this._config = config;
    this._loading = true;
    this._renderLoading();
  }

  _renderLoading() {
    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>
          ha-card { background: ${COLORS.cardBg} !important; border: none !important; border-radius: 12px !important;
                    height: 100%; overflow: hidden; display: flex; flex-direction: column; }
          .loading { display: flex; align-items: center; justify-content: center; gap: 10px;
                     color: ${COLORS.textSec}; font-size: 13px; padding: 40px 16px; }
          .dot { width: 6px; height: 6px; border-radius: 50%; background: ${COLORS.accent};
                 animation: pulse 1.5s ease-in-out infinite; }
          @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
        </style>
        <div class="loading"><div class="dot"></div> Loading topology...</div>
      </ha-card>`;
  }

  async _fetchAndRender() {
    const [topo, layouts] = await Promise.all([
      addonFetch(this._hass, '/api/topology', this._config.server_url),
      addonFetch(this._hass, '/api/topology/layouts', this._config.server_url),
    ]);

    this._loading = false;

    if (!topo || !topo.nodes || !topo.nodes.length) {
      this.shadowRoot.innerHTML = `
        <ha-card>
          <style>
            ha-card { background: ${COLORS.cardBg} !important; border: none !important; border-radius: 12px !important; }
            .empty { padding: 24px 16px; color: ${COLORS.textSec}; font-size: 13px; text-align: center; }
          </style>
          <div class="empty">
            ${!_cachedIngressUrl ? 'Add-on not reachable.' : 'No devices discovered yet.'}
          </div>
        </ha-card>`;
      return;
    }

    // Find layout
    let layout = null;
    if (layouts) {
      if (this._config.layout) {
        layout = layouts[this._config.layout] ||
          Object.values(layouts).find(l => l.name === this._config.layout);
      }
      if (!layout) {
        layout = Object.values(layouts).find(l => l.isDefault);
      }
    }

    const nodes = topo.nodes;
    const hideAutoEdges = layout?.hideAutoEdges || false;
    const autoEdges = hideAutoEdges ? [] : (topo.edges || []);
    const manualEdges = layout?.manualEdges || [];
    const allEdges = [...autoEdges, ...manualEdges];

    const counts = {
      online: nodes.filter(n => n.status === 'online').length,
      offline: nodes.filter(n => n.status === 'offline').length,
      warning: nodes.filter(n => n.status === 'warning').length,
    };

    // Positions
    const savedPositions = layout?.positions || {};
    const positions = { ...savedPositions };
    const cols = Math.ceil(Math.sqrt(nodes.length));
    nodes.forEach((node, i) => {
      if (!positions[node.id]) {
        positions[node.id] = {
          x: 120 + (i % cols) * 200,
          y: 80 + Math.floor(i / cols) * 130,
        };
      }
    });

    // Bounding box
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pos of Object.values(positions)) {
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }
    // Scale everything relative to node count for best fit
    const nodeCount = nodes.length;
    const pad = 60;
    const contentW = Math.max((maxX - minX), 1);
    const contentH = Math.max((maxY - minY), 1);
    const vbX = minX - pad;
    const vbY = minY - pad;
    const vbW = contentW + pad * 2;
    const vbH = contentH + pad * 2;

    const nodeW = 110, nodeH = 40, nodeR = 24;
    const fontSz = 11, labelFontSz = 9, strokeW = 1.5;

    // Edge lines
    const edgesSvg = allEdges.map(e => {
      const from = positions[e.source], to = positions[e.target];
      if (!from || !to) return '';
      const isManual = e.type === 'manual' || e.sourceLabel || e.targetLabel || (!e.type);
      const col = isManual ? COLORS.accent : '#444';
      const dash = isManual ? 'none' : '4,3';
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="${strokeW}" stroke-dasharray="${dash}" opacity="0.6"/>`;
    }).join('');

    // Nodes
    const nodesSvg = nodes.map(n => {
      const pos = positions[n.id];
      if (!pos) return '';
      const col = STATUS_COLORS[n.status] || STATUS_COLORS.unknown;
      const label = escHtml((n.name || n.id).substring(0, 14));
      const statusLabel = escHtml(n.status);
      const isGw = n.type === 'gateway';

      if (isGw) {
        return `
          <g>
            <circle cx="${pos.x}" cy="${pos.y}" r="${nodeR}" fill="${col}15" stroke="${col}" stroke-width="${strokeW}"/>
            <text x="${pos.x}" y="${pos.y + 3}" text-anchor="middle" fill="${col}" font-size="${fontSz}" font-weight="600"
              font-family="-apple-system,BlinkMacSystemFont,sans-serif">${label}</text>
          </g>`;
      }
      return `
        <g>
          <rect x="${pos.x - nodeW/2}" y="${pos.y - nodeH/2}" width="${nodeW}" height="${nodeH}" rx="6"
            fill="#12122a" stroke="${col}" stroke-width="${strokeW}"/>
          <text x="${pos.x}" y="${pos.y - 1}" text-anchor="middle" fill="#fff" font-size="${fontSz}" font-weight="500"
            font-family="-apple-system,BlinkMacSystemFont,sans-serif">${label}</text>
          <text x="${pos.x}" y="${pos.y + 11}" text-anchor="middle" fill="${col}" font-size="7"
            font-family="-apple-system,BlinkMacSystemFont,sans-serif">${statusLabel}</text>
        </g>`;
    }).join('');

    // Edge labels
    const edgeLabelsSvg = allEdges.map(e => {
      const from = positions[e.source], to = positions[e.target];
      if (!from || !to) return '';
      if (!e.label && !e.sourceLabel && !e.targetLabel) return '';
      let svg = '';
      const dx = to.x - from.x, dy = to.y - from.y;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const ux = dx/len, uy = dy/len;
      let perpX = -uy, perpY = ux;
      if (perpY > 0) { perpX = -perpX; perpY = -perpY; }
      const bgH = labelFontSz + 4;
      const renderLabel = (x, y, text, color) => {
        const escaped = escHtml(text);
        const tw = text.length * labelFontSz * 0.55 + 8;
        return `<rect x="${x-tw/2}" y="${y-bgH+2}" width="${tw}" height="${bgH}" rx="3" fill="#0a0a1a" opacity="0.9"/>` +
               `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${labelFontSz}" font-family="-apple-system,sans-serif">${escaped}</text>`;
      };
      if (e.label) {
        svg += renderLabel((from.x+to.x)/2 + perpX*12, (from.y+to.y)/2 + perpY*12, e.label, '#888');
      }
      if (e.sourceLabel) {
        svg += renderLabel(from.x + ux*42, from.y + uy*42, e.sourceLabel, COLORS.accent);
      }
      if (e.targetLabel) {
        svg += renderLabel(to.x - ux*42, to.y - uy*42, e.targetLabel, COLORS.accent);
      }
      return svg;
    }).join('');

    const layoutName = layout ? layout.name : 'Auto Discovery';

    this.shadowRoot.innerHTML = `
      <ha-card>
        <style>
          ha-card {
            background: ${COLORS.cardBg} !important; border: none !important;
            border-radius: 12px !important;
            overflow: hidden;
          }
          .card-content { padding: 14px; }
          .header {
            display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 10px;
          }
          .title { font-size: 14px; font-weight: 600; color: ${COLORS.text}; }
          .subtitle { font-size: 10px; color: ${COLORS.textSec}; margin-top: 1px; }
          .counts { display: flex; gap: 10px; font-size: 11px; }
          .count { display: flex; align-items: center; gap: 4px; }
          .count-dot { width: 6px; height: 6px; border-radius: 50%; }
          .svg-container {
            position: relative;
            background: #0d0d20; border-radius: 10px; overflow: hidden;
            padding: 8px;
          }
          svg { width: 100%; height: auto; display: block; }
          .zoom-controls {
            position: absolute; bottom: 8px; right: 8px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .zoom-btn {
            width: 28px; height: 28px; border-radius: 6px;
            background: rgba(26,26,46,0.9); border: 1px solid rgba(255,255,255,0.1);
            color: #fff; font-size: 14px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
          }
          .zoom-btn:hover { background: rgba(255,255,255,0.08); }
        </style>
        <div class="card-content">
          <div class="header">
            <div>
              <div class="title">${escHtml(this._config.title || 'Network')}</div>
              <div class="subtitle">${escHtml(layoutName)}</div>
            </div>
            <div class="counts">
              <span class="count">
                <span class="count-dot" style="background:${COLORS.online}"></span>
                <span style="color:${COLORS.online}">${counts.online}</span>
              </span>
              <span class="count">
                <span class="count-dot" style="background:${COLORS.offline}"></span>
                <span style="color:${COLORS.offline}">${counts.offline}</span>
              </span>
              ${counts.warning ? `
                <span class="count">
                  <span class="count-dot" style="background:${COLORS.warning}"></span>
                  <span style="color:${COLORS.warning}">${counts.warning}</span>
                </span>
              ` : ''}
            </div>
          </div>
          <div class="svg-container">
            <svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              ${edgesSvg}
              ${nodesSvg}
              ${edgeLabelsSvg}
            </svg>
            <div class="zoom-controls">
              <button class="zoom-btn" data-zoom="in" title="Zoom in">+</button>
              <button class="zoom-btn" data-zoom="out" title="Zoom out">\u2212</button>
              <button class="zoom-btn" data-zoom="fit" title="Fit all">\u229B</button>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    // Store fit viewBox and current viewBox
    this._fitVbX = vbX;
    this._fitVbY = vbY;
    this._fitVbW = vbW;
    this._fitVbH = vbH;
    // Preserve zoom across re-renders only if user has zoomed
    if (!this._userHasZoomed) {
      this._vbX = vbX;
      this._vbY = vbY;
      this._vbW = vbW;
      this._vbH = vbH;
    } else {
      // Apply current zoom to the new SVG
      this._applyViewBox();
    }

    this._bindZoomEvents();
  }

  // ── Zoom helpers ────────────────────────────────────────────────────────

  _applyViewBox() {
    const svg = this.shadowRoot.querySelector('svg');
    if (svg) {
      svg.setAttribute('viewBox', `${this._vbX} ${this._vbY} ${this._vbW} ${this._vbH}`);
    }
  }

  _zoomBy(factor, centerRatioX = 0.5, centerRatioY = 0.5) {
    const newW = this._vbW * factor;
    const newH = this._vbH * factor;
    // Adjust origin to keep the point at centerRatio stationary
    this._vbX += (this._vbW - newW) * centerRatioX;
    this._vbY += (this._vbH - newH) * centerRatioY;
    this._vbW = newW;
    this._vbH = newH;
    this._userHasZoomed = true;
    this._applyViewBox();
  }

  _fitAll() {
    this._vbX = this._fitVbX;
    this._vbY = this._fitVbY;
    this._vbW = this._fitVbW;
    this._vbH = this._fitVbH;
    this._userHasZoomed = false;
    this._applyViewBox();
  }

  _bindZoomEvents() {
    const root = this.shadowRoot;
    const container = root.querySelector('.svg-container');
    const svg = root.querySelector('svg');
    if (!container || !svg) return;

    // Button clicks
    root.querySelectorAll('.zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = btn.dataset.zoom;
        if (action === 'in') this._zoomBy(0.8);
        else if (action === 'out') this._zoomBy(1.25);
        else if (action === 'fit') this._fitAll();
      });
    });

    // Ctrl+scroll zoom (desktop)
    container.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const ratioX = (e.clientX - rect.left) / rect.width;
      const ratioY = (e.clientY - rect.top) / rect.height;
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      this._zoomBy(factor, ratioX, ratioY);
    }, { passive: false });

    // Pinch-to-zoom (touch)
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const t0 = e.touches[0], t1 = e.touches[1];
        this._pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        this._pinchStartVb = { x: this._vbX, y: this._vbY, w: this._vbW, h: this._vbH };
        // Store center ratios using getBoundingClientRect
        const rect = container.getBoundingClientRect();
        const cx = (t0.clientX + t1.clientX) / 2;
        const cy = (t0.clientY + t1.clientY) / 2;
        this._pinchCenterRatioX = (cx - rect.left) / rect.width;
        this._pinchCenterRatioY = (cy - rect.top) / rect.height;
      }
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && this._pinchStartVb) {
        e.preventDefault();
        const t0 = e.touches[0], t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (this._pinchStartDist === 0) return;
        const scale = this._pinchStartDist / dist; // pinch in = zoom out
        const sv = this._pinchStartVb;
        const newW = sv.w * scale;
        const newH = sv.h * scale;
        this._vbX = sv.x + (sv.w - newW) * this._pinchCenterRatioX;
        this._vbY = sv.y + (sv.h - newH) * this._pinchCenterRatioY;
        this._vbW = newW;
        this._vbH = newH;
        this._userHasZoomed = true;
        this._applyViewBox();
      }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        this._pinchStartVb = null;
      }
    });
  }

  disconnectedCallback() {
    if (_sessionRefreshInterval) {
      clearInterval(_sessionRefreshInterval);
      _sessionRefreshInterval = null;
    }
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return {
      columns: 12,
      rows: 8,
      min_rows: 2,
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

const EDITOR_STYLES = `
  .form { padding: 16px; }
  .field { margin-bottom: 16px; }
  .field label {
    display: block; font-weight: 500; margin-bottom: 6px; font-size: 14px;
    color: var(--primary-text-color, ${COLORS.text});
  }
  .field select, .field input {
    width: 100%; padding: 10px 12px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    background: var(--card-background-color, ${COLORS.tileBg});
    color: var(--primary-text-color, ${COLORS.text});
    font-size: 14px; box-sizing: border-box;
    outline: none; transition: border-color 0.2s;
  }
  .field select:focus, .field input:focus {
    border-color: ${COLORS.accent};
  }
  .hint { font-size: 11px; color: var(--secondary-text-color, ${COLORS.textSec}); margin-top: 4px; }
  .section-title {
    font-size: 11px; color: ${COLORS.section}; text-transform: uppercase;
    letter-spacing: 1px; margin: 16px 0 8px 0; font-weight: 600;
  }
  .device-preview {
    display: flex; align-items: center; gap: 8px; padding: 8px 12px;
    background: rgba(0,212,255,0.06); border-radius: 8px; margin-top: 8px;
    font-size: 12px; color: ${COLORS.accent};
  }
  .attr-chips {
    display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
  }
  .attr-chip {
    font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.1);
    background: var(--card-background-color, ${COLORS.tileBg});
    color: var(--primary-text-color, ${COLORS.text});
    transition: all 0.15s;
  }
  .attr-chip.selected {
    background: ${COLORS.accent}20;
    border-color: ${COLORS.accent};
    color: ${COLORS.accent};
  }
  .attr-chip:hover { border-color: ${COLORS.accent}80; }
`;


class MQTTDeviceStatusEditor extends HTMLElement {
  constructor() {
    super();
    this._devices = [];
    this._selectedDeviceAttrs = [];
    this._devicesLoaded = false;
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && !this._devicesLoaded) {
      this._loadDevices();
    }
  }

  setConfig(config) {
    this._config = { ...config };
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
        type: d.device_type || 'unknown',
        status: d.status || 'unknown',
        attributes: Object.keys(d.attributes || {}),
        card_attributes: d.card_attributes || [],
        hidden_attributes: d.hidden_attributes || [],
      }));

      // Load selected device's available attributes
      if (this._config.device_id) {
        const dev = this._devices.find(d => d.id === this._config.device_id);
        if (dev) {
          this._selectedDeviceAttrs = dev.attributes.filter(
            a => !dev.hidden_attributes.includes(a)
          );
        }
      }
      this._render();
    }
  }

  _render() {
    const root = this.shadowRoot;
    const currentId = this._config.device_id || '';
    const currentAttrs = this._config.attributes || [];
    const selectedDevice = this._devices.find(d => d.id === currentId);

    root.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="form">
        <div class="field">
          <label>Device</label>
          ${this._devices.length > 0 ? `
            <select id="device-select">
              <option value="">Select a device...</option>
              ${this._devices.map(d => {
                const statusIcon = d.status === 'online' ? '\u25CF' : '\u25CB';
                return `<option value="${escHtml(d.id)}" ${d.id === currentId ? 'selected' : ''}>${statusIcon} ${escHtml(d.name)} (${escHtml(d.id)})</option>`;
              }).join('')}
            </select>
          ` : `
            <input id="device-input" type="text" value="${escHtml(currentId)}" placeholder="e.g., pi-garage">
            <div class="hint">Device ID from your client config. Devices will appear once the add-on connects.</div>
          `}
          ${selectedDevice ? `
            <div class="device-preview">
              <svg width="14" height="14" viewBox="0 0 16 16">${deviceIcon(selectedDevice.type)}</svg>
              ${escHtml(selectedDevice.name)} &middot; ${escHtml(selectedDevice.type)} &middot;
              <span style="color:${STATUS_COLORS[selectedDevice.status] || COLORS.unknown}">${escHtml(selectedDevice.status)}</span>
            </div>
          ` : ''}
        </div>

        <div class="field">
          <label>Attributes to display</label>
          <input id="attrs-input" type="text"
            value="${escHtml(currentAttrs.join(', '))}"
            placeholder="Leave empty for pinned/default attributes">
          <div class="hint">Comma-separated. Empty = use device's pinned attributes or first 4.</div>
          ${this._selectedDeviceAttrs.length > 0 ? `
            <div class="section-title">Available attributes (click to toggle)</div>
            <div class="attr-chips">
              ${this._selectedDeviceAttrs.map(a => `
                <span class="attr-chip ${currentAttrs.includes(a) ? 'selected' : ''}" data-attr="${escHtml(a)}">
                  ${escHtml(friendlyName(a))}
                </span>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="field">
          <label>Poll interval (seconds)</label>
          <input id="poll-input" type="number" min="5" max="300"
            value="${escHtml(this._config.poll_interval || 10)}"
            placeholder="10">
          <div class="hint">How often to refresh data from the add-on (default: 10s)</div>
        </div>
      </div>
    `;

    // Bind events
    const deviceSelect = root.getElementById('device-select');
    const deviceInput = root.getElementById('device-input');
    const attrsInput = root.getElementById('attrs-input');

    if (deviceSelect) {
      deviceSelect.addEventListener('change', (e) => {
        this._update('device_id', e.target.value);
        // Update available attrs
        const dev = this._devices.find(d => d.id === e.target.value);
        this._selectedDeviceAttrs = dev
          ? dev.attributes.filter(a => !dev.hidden_attributes.includes(a))
          : [];
        this._render();
      });
    }
    if (deviceInput) {
      deviceInput.addEventListener('change', (e) => this._update('device_id', e.target.value));
    }
    if (attrsInput) {
      attrsInput.addEventListener('change', (e) => {
        const attrs = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
        this._update('attributes', attrs.length ? attrs : undefined);
      });
    }

    const pollInput = root.getElementById('poll-input');
    if (pollInput) {
      pollInput.addEventListener('change', (e) => {
        const val = parseInt(e.target.value);
        this._update('poll_interval', val && val >= 5 ? val : undefined);
      });
    }

    // Attribute chip clicks
    root.querySelectorAll('.attr-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const attr = chip.dataset.attr;
        let attrs = [...(this._config.attributes || [])];
        const idx = attrs.indexOf(attr);
        if (idx >= 0) {
          attrs.splice(idx, 1);
        } else {
          attrs.push(attr);
        }
        this._config.attributes = attrs.length ? attrs : undefined;
        this._update('attributes', this._config.attributes);
        this._render();
      });
    });
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
  constructor() {
    super();
    this._layouts = [];
    this._layoutsLoaded = false;
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && !this._layoutsLoaded) {
      this._loadLayouts();
    }
  }

  setConfig(config) {
    this._config = { ...config };
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
    const root = this.shadowRoot;
    const currentLayout = this._config.layout || '';

    root.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="form">
        <div class="field">
          <label>Card Title</label>
          <input id="title-input" type="text"
            value="${escHtml(this._config.title || '')}"
            placeholder="e.g., Home Network">
        </div>
        <div class="field">
          <label>Topology Layout</label>
          ${this._layouts.length > 0 ? `
            <select id="layout-select">
              <option value="" ${!currentLayout ? 'selected' : ''}>Default (auto-discovery)</option>
              ${this._layouts.map(l =>
                `<option value="${escHtml(l.id)}" ${l.id === currentLayout ? 'selected' : ''}>${escHtml(l.name)}${l.isDefault ? ' (default)' : ''}</option>`
              ).join('')}
            </select>
            <div class="hint">Layouts are created in the add-on's Topology page</div>
          ` : `
            <input id="layout-input" type="text" value="${escHtml(currentLayout)}" placeholder="Layout ID (optional)">
            <div class="hint">Create and arrange layouts in the add-on's Topology page</div>
          `}
        </div>
      </div>
    `;

    root.getElementById('title-input')
      .addEventListener('change', (e) => this._update('title', e.target.value));

    const layoutSelect = root.getElementById('layout-select');
    const layoutInput = root.getElementById('layout-input');
    if (layoutSelect) {
      layoutSelect.addEventListener('change', (e) => this._update('layout', e.target.value || undefined));
    }
    if (layoutInput) {
      layoutInput.addEventListener('change', (e) => this._update('layout', e.target.value || undefined));
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
    description: 'Device status card with live attributes, threshold indicators, and tags',
    preview: true,
    documentationURL: 'https://github.com/user/mqtt-network-monitor',
  },
  {
    type: 'mqtt-topology-card',
    name: 'MQTT Network Topology',
    description: 'Compact interactive network topology overview',
    preview: true,
    documentationURL: 'https://github.com/user/mqtt-network-monitor',
  }
);

console.info(
  `%c MQTT Network Monitor Cards v${CARD_VERSION} `,
  'background: #00D4FF; color: #0a0a1a; font-weight: bold; border-radius: 4px;'
);

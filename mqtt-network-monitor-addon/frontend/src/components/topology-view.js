import { LitElement, html, svg, css } from 'lit';
import { fetchTopology, fetchLayouts, saveLayout, deleteLayout, fetchDevice, sendCommand } from '../services/api.js';
import { wsService } from '../services/websocket.js';

const STATUS_COLORS = {
  online: '#81c784',
  offline: '#ef5350',
  warning: '#ffb74d',
  inferred: '#4fc3f7',
  unknown: '#666',
};

class TopologyView extends LitElement {
  static properties = {
    topology: { type: Object },
    layouts: { type: Object },
    selectedLayout: { type: String },
    editMode: { type: Boolean },
    linkMode: { type: Boolean },
    selectedNode: { type: String },
    nodePositions: { type: Object },
    manualEdges: { type: Array },
    _dragging: { type: String, state: true },
    _linkSource: { type: String, state: true },
    _error: { type: String, state: true },
    _loading: { type: Boolean, state: true },
    _selectedEdge: { type: Number, state: true },
    _selectedDeviceData: { type: Object, state: true },
    _commandResult: { type: String, state: true },
    _dirty: { type: Boolean, state: true },
    _showSaveDialog: { type: Boolean, state: true },
    _showLabelDialog: { type: Boolean, state: true },
    _labelEdgeIndex: { type: Number, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: #2a2a4a; padding: 8px 14px; border-radius: 8px;
      margin-bottom: 12px; flex-wrap: wrap; gap: 8px;
    }
    .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .toolbar-right { display: flex; gap: 8px; font-size: 11px; }
    select {
      background: #3a3a5a; color: #ccc; border: 1px solid #555;
      border-radius: 4px; padding: 4px 8px; font-size: 12px;
    }
    .tool-btn {
      background: none; border: none; color: #aaa; cursor: pointer;
      font-size: 12px; padding: 4px 10px; border-radius: 4px; transition: all 0.2s;
    }
    .tool-btn:hover { background: rgba(255,255,255,0.05); color: #ccc; }
    .tool-btn.active { color: #4fc3f7; background: rgba(79,195,247,0.1); }
    .tool-btn.link-mode { color: #ffb74d; }
    .tool-btn.link-mode.active { color: #1a1a2e; background: #ffb74d; }
    .tool-btn.danger { color: #ef5350; }
    .tool-btn.danger:hover { background: rgba(239,83,80,0.1); }
    .tool-btn.save { color: #81c784; }
    .tool-btn.save:hover { background: rgba(129,199,132,0.15); color: #a5d6a7; }
    .status-dot { font-size: 11px; }
    .separator { color: #444; }
    .canvas-container {
      background: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a4a;
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: 500px; display: block; }
    .detail-panel {
      background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .detail-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .detail-name { font-size: 16px; font-weight: 600; }
    .link-hint {
      background: #3a2a1a; border: 1px solid #ffb74d; border-radius: 6px;
      padding: 8px 14px; margin-bottom: 12px; font-size: 12px; color: #ffb74d;
    }
    .edge-panel {
      background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .edge-panel-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .edge-label-input {
      background: #3a3a5a; border: 1px solid #555; border-radius: 4px;
      color: #ccc; padding: 4px 8px; font-size: 12px; width: 200px;
    }
    .edge-list {
      margin-top: 8px;
    }
    .edge-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 0; border-bottom: 1px solid #3a3a5a; font-size: 12px; color: #aaa;
    }
    .edge-item:last-child { border-bottom: none; }
    .device-panel {
      background: #2a2a4a; border-radius: 8px; padding: 16px; margin-top: 12px;
    }
    .device-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .device-title { font-size: 18px; font-weight: 700; }
    .device-type { font-size: 12px; color: #666; }
    .device-status-badge {
      padding: 3px 10px; border-radius: 10px; font-size: 12px;
    }
    .device-section {
      margin-top: 14px;
    }
    .device-section-title {
      font-size: 11px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    .attr-item {
      background: #1a1a2e; border-radius: 6px; padding: 10px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #666; text-transform: uppercase; }
    .attr-val { font-size: 18px; font-weight: 700; color: #4fc3f7; margin-top: 2px; }
    .attr-unit { font-size: 11px; color: #888; }
    .attr-val.warning { color: #ffb74d; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 6px;
    }
    .net-item { font-size: 12px; color: #aaa; }
    .net-label { color: #666; }
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag-badge {
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: #1e3a5f; color: #4fc3f7;
    }
    .tag-badge.server { background: #3a1e5f; color: #ce93d8; }
    .commands-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 6px 14px;
      border-radius: 5px; cursor: pointer; font-size: 12px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 6px; padding: 6px 10px; background: #1a1a2e;
      border-radius: 4px; font-size: 11px; color: #aaa; font-family: monospace;
    }
    .close-btn {
      background: none; border: none; color: #666; cursor: pointer;
      font-size: 18px; padding: 0 4px; line-height: 1;
    }
    .close-btn:hover { color: #ccc; }
    .save-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .save-dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 320px; max-width: 400px; border: 1px solid #3a3a5a;
    }
    .save-dialog h3 { color: #e0e0e0; margin-bottom: 8px; font-size: 16px; }
    .save-dialog p { color: #888; font-size: 13px; margin-bottom: 20px; }
    .save-dialog-buttons {
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-size: 13px; transition: all 0.2s;
    }
    .dialog-btn.save { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .dialog-btn.save:hover { background: #81d4fa; }
    .dialog-btn.discard { background: #3a3a5a; color: #ef5350; }
    .dialog-btn.discard:hover { background: #4a3a3a; }
    .dialog-btn.cancel { background: #3a3a5a; color: #aaa; }
    .dialog-btn.cancel:hover { background: #4a4a6a; }
    .dirty-indicator {
      font-size: 11px; color: #ffb74d; margin-left: 4px;
    }
    .label-dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 360px; max-width: 440px; border: 1px solid #3a3a5a;
    }
    .label-dialog h3 { color: #e0e0e0; margin-bottom: 4px; font-size: 16px; }
    .label-dialog .subtitle { color: #666; font-size: 12px; margin-bottom: 16px; }
    .label-field { margin-bottom: 14px; }
    .label-field label {
      display: block; font-size: 11px; color: #888; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 4px;
    }
    .label-field input {
      width: 100%; background: #1a1a2e; border: 1px solid #3a3a5a;
      border-radius: 6px; color: #e0e0e0; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .label-field input:focus {
      outline: none; border-color: #4fc3f7;
    }
    .label-field .hint {
      font-size: 10px; color: #555; margin-top: 3px;
    }
  `;

  constructor() {
    super();
    this.topology = { nodes: [], edges: [] };
    this.layouts = {};
    this.selectedLayout = '';
    this.editMode = false;
    this.linkMode = false;
    this.selectedNode = null;
    this.nodePositions = {};
    this.manualEdges = [];
    this._dragging = null;
    this._dragOffset = { x: 0, y: 0 };
    this._linkSource = null;
    this._error = '';
    this._loading = true;
    this._selectedEdge = -1;
    this._selectedDeviceData = null;
    this._commandResult = '';
    this._dirty = false;
    this._showSaveDialog = false;
    this._showLabelDialog = false;
    this._labelEdgeIndex = -1;
    this._savedPositions = null;
    this._savedManualEdges = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTopology();
    this._loadLayouts();
    wsService.onMessage((data) => {
      this._loadTopology();
      // Update selected device data in real-time
      if (data.type === 'device_update' && data.device_id === this.selectedNode && data.device) {
        this._selectedDeviceData = data.device;
      }
    });
  }

  async _loadTopology() {
    try {
      this._loading = true;
      this._error = '';
      const data = await fetchTopology();
      this.topology = data;
      this._autoLayout();
      this._loading = false;
    } catch (e) {
      console.error('Failed to load topology:', e);
      this._error = `Failed to load: ${e.message}`;
      this._loading = false;
    }
  }

  async _loadLayouts() {
    try {
      this.layouts = await fetchLayouts();
    } catch (e) {
      console.error('Failed to load layouts:', e);
    }
  }

  _autoLayout() {
    const nodes = this.topology.nodes;
    if (!nodes.length) return;

    const saved = this.selectedLayout && this.layouts[this.selectedLayout]
      ? this.layouts[this.selectedLayout].positions || {}
      : {};

    const positions = { ...saved };
    const width = 800;
    const cols = Math.ceil(Math.sqrt(nodes.length));

    nodes.forEach((node, i) => {
      if (!positions[node.id]) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions[node.id] = {
          x: 100 + col * (width / (cols + 1)),
          y: 80 + row * 100,
        };
      }
    });

    this.nodePositions = positions;

    // Load manual edges from selected layout
    if (this.selectedLayout && this.layouts[this.selectedLayout]) {
      this.manualEdges = this.layouts[this.selectedLayout].manualEdges || [];
    }
  }

  get _allEdges() {
    const auto = this.topology.edges || [];
    const manual = this.manualEdges.map(e => ({ ...e, type: 'manual' }));
    return [...auto, ...manual];
  }

  _getNodeName(id) {
    const node = this.topology.nodes.find(n => n.id === id);
    return node ? (node.name || id) : id;
  }

  render() {
    if (this._loading && !this.topology.nodes.length) {
      return html`<div style="padding: 40px; text-align: center; color: #888;">Loading topology...</div>`;
    }
    if (this._error) {
      return html`<div style="padding: 40px; text-align: center; color: #ef5350;">${this._error}</div>`;
    }
    const nodes = this.topology.nodes;
    const allEdges = this._allEdges;
    const counts = {
      online: nodes.filter(n => n.status === 'online').length,
      offline: nodes.filter(n => n.status === 'offline').length,
      warning: nodes.filter(n => n.status === 'warning').length,
    };

    return html`
      <div class="toolbar">
        <div class="toolbar-left">
          <select @change=${this._onLayoutChange}>
            <option value="">Auto Layout</option>
            ${Object.entries(this.layouts).map(([id, l]) => html`
              <option value=${id} ?selected=${this.selectedLayout === id}>${l.name}</option>
            `)}
          </select>
          <button class="tool-btn ${this.editMode ? 'active' : ''}"
            @click=${this._toggleEditMode}>
            ${this.editMode ? 'Done Editing' : 'Edit Mode'}
          </button>
          ${this.editMode ? html`
            <span class="separator">|</span>
            <button class="tool-btn link-mode ${this.linkMode ? 'active' : ''}"
              @click=${this._toggleLinkMode}>
              ${this.linkMode ? 'Cancel Link' : 'Add Link'}
            </button>
            <button class="tool-btn save" @click=${this._saveCurrentLayout}>Save Layout</button>
            ${this._dirty ? html`<span class="dirty-indicator">unsaved changes</span>` : ''}
          ` : ''}
          <button class="tool-btn" @click=${() => { this.nodePositions = {}; this._autoLayout(); }}>
            Auto Layout
          </button>
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #81c784">${counts.online} online</span>
          <span class="status-dot" style="color: #ef5350">${counts.offline} offline</span>
          <span class="status-dot" style="color: #ffb74d">${counts.warning} warning</span>
        </div>
      </div>

      ${this.linkMode ? html`
        <div class="link-hint">
          ${this._linkSource
            ? `Click a second device to link it to "${this._getNodeName(this._linkSource)}"`
            : 'Click a device to start a link'}
        </div>
      ` : ''}

      <div class="canvas-container">
        <svg viewBox="0 0 900 500"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}>
          ${allEdges.map((edge, i) => this._renderEdge(edge, i))}
          ${this._renderLinkPreview()}
          ${nodes.map(node => this._renderNode(node))}
        </svg>
      </div>

      ${this.selectedNode && !this.linkMode ? this._renderDetailPanel() : ''}
      ${this.editMode && this.manualEdges.length > 0 ? this._renderManualEdgesList() : ''}
      ${this._showSaveDialog ? this._renderSaveDialog() : ''}
      ${this._showLabelDialog ? this._renderLabelDialog() : ''}
    `;
  }

  _renderNode(node) {
    const pos = this.nodePositions[node.id] || { x: 100, y: 100 };
    const color = STATUS_COLORS[node.status] || STATUS_COLORS.unknown;
    const isSelected = this.selectedNode === node.id;
    const isLinkSource = this._linkSource === node.id;
    const isGateway = node.type === 'gateway';

    const strokeWidth = isSelected || isLinkSource ? 2.5 : 1.5;
    const strokeDash = isSelected ? '4,2' : isLinkSource ? '2,2' : 'none';
    const glowColor = isLinkSource ? '#ffb74d' : color;

    if (isGateway) {
      return svg`
        <g transform="translate(${pos.x}, ${pos.y})"
          @click=${(e) => this._onNodeClick(e, node.id)}
          @mousedown=${(e) => this.editMode && !this.linkMode && this._onMouseDown(e, node.id)}
          style="cursor:pointer">
          <circle r="22" fill="${glowColor}22" stroke="${glowColor}" stroke-width="${strokeWidth}"
            stroke-dasharray="${strokeDash}"/>
          <text text-anchor="middle" dy="4" fill="${glowColor}" font-size="10">${node.name.substring(0, 12)}</text>
        </g>
      `;
    }

    return svg`
      <g transform="translate(${pos.x}, ${pos.y})"
        @click=${(e) => this._onNodeClick(e, node.id)}
        @mousedown=${(e) => this.editMode && !this.linkMode && this._onMouseDown(e, node.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#2a2a4a" stroke="${glowColor}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash}"/>
        <text text-anchor="middle" dy="-3" fill="${glowColor}" font-size="10">
          ${(node.name || node.id).substring(0, 12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${node.status}</text>
      </g>
    `;
  }

  _renderEdge(edge, index) {
    const from = this.nodePositions[edge.source];
    const to = this.nodePositions[edge.target];
    if (!from || !to) return svg``;

    const isManual = edge.type === 'manual';
    const isSelected = isManual && this._selectedEdge === index - (this.topology.edges?.length || 0);
    const strokeColor = isManual ? '#4fc3f7' : '#555';
    const strokeWidth = isSelected ? 2.5 : 1.5;
    const dash = isManual ? 'none' : '4,2';

    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    // Position source/target labels offset from the endpoints toward the midpoint
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const offsetDist = 35;
    const perpX = -dy / len * 10;
    const perpY = dx / len * 10;

    const srcLabelX = from.x + (dx / len) * offsetDist + perpX;
    const srcLabelY = from.y + (dy / len) * offsetDist + perpY;
    const tgtLabelX = to.x - (dx / len) * offsetDist + perpX;
    const tgtLabelY = to.y - (dy / len) * offsetDist + perpY;

    return svg`
      <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"
        stroke="${strokeColor}" stroke-width="${strokeWidth}"
        stroke-dasharray="${dash}"
        @click=${isManual && this.editMode ? () => this._selectEdge(index - (this.topology.edges?.length || 0)) : null}
        style="${isManual && this.editMode ? 'cursor:pointer' : ''}"/>
      ${edge.label ? svg`
        <text x="${midX + perpX}" y="${midY + perpY}" text-anchor="middle"
          fill="#888" font-size="9">${edge.label}</text>
      ` : svg``}
      ${edge.sourceLabel ? svg`
        <text x="${srcLabelX}" y="${srcLabelY}" text-anchor="middle"
          fill="#4fc3f7" font-size="8">${edge.sourceLabel}</text>
      ` : svg``}
      ${edge.targetLabel ? svg`
        <text x="${tgtLabelX}" y="${tgtLabelY}" text-anchor="middle"
          fill="#4fc3f7" font-size="8">${edge.targetLabel}</text>
      ` : svg``}
    `;
  }

  _renderLinkPreview() {
    if (!this._linkSource || !this._mousePos) return svg``;
    const from = this.nodePositions[this._linkSource];
    if (!from) return svg``;

    return svg`
      <line x1="${from.x}" y1="${from.y}" x2="${this._mousePos.x}" y2="${this._mousePos.y}"
        stroke="#ffb74d" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.6"/>
    `;
  }

  _renderDetailPanel() {
    const node = this.topology.nodes.find(n => n.id === this.selectedNode);
    if (!node) return html``;

    const d = this._selectedDeviceData;
    const color = STATUS_COLORS[node.status] || STATUS_COLORS.unknown;

    // Still loading device data
    if (!d) {
      return html`
        <div class="device-panel">
          <div style="color: #888; font-size: 13px;">Loading device data...</div>
        </div>
      `;
    }

    const attrs = Object.entries(d.attributes || {});
    const network = d.network || {};
    const tags = d.tags || [];
    const serverTags = d.server_tags || [];
    const WARNING_THRESHOLDS = { cpu_usage: 90, memory_usage: 90, disk_usage: 95, cpu_temp: 80 };

    return html`
      <div class="device-panel">
        <div class="device-header">
          <div>
            <span class="device-title" style="color: ${color}">
              ${d.device_name || this.selectedNode}
            </span>
            <span class="device-type">${d.device_type || node.type}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="device-status-badge" style="background: ${color}20; color: ${color}">
              ${d.status || node.status}
            </span>
            <button class="close-btn" @click=${() => { this.selectedNode = null; this._selectedDeviceData = null; }}>&times;</button>
          </div>
        </div>

        ${(tags.length > 0 || serverTags.length > 0) ? html`
          <div style="margin-bottom: 12px;">
            <div class="tags-row">
              ${tags.map(t => html`<span class="tag-badge">${t}</span>`)}
              ${serverTags.map(t => html`<span class="tag-badge server">${t}</span>`)}
            </div>
          </div>
        ` : ''}

        ${attrs.length > 0 ? html`
          <div class="device-section">
            <div class="device-section-title">Attributes</div>
            <div class="attr-grid">
              ${attrs.map(([name, data]) => {
                const threshold = WARNING_THRESHOLDS[name];
                const isWarn = threshold && typeof data.value === 'number' && data.value > threshold;
                return html`
                  <div class="attr-item">
                    <div class="attr-label">${name.replace(/_/g, ' ')}</div>
                    <div class="attr-val ${isWarn ? 'warning' : ''}">
                      ${data.value != null ? data.value : '—'}
                      <span class="attr-unit">${data.unit || ''}</span>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        ` : ''}

        ${Object.keys(network).length > 0 ? html`
          <div class="device-section">
            <div class="device-section-title">Network</div>
            <div class="network-grid">
              ${Object.entries(network).map(([key, val]) => html`
                <div class="net-item">
                  <span class="net-label">${key}: </span>${val}
                </div>
              `)}
            </div>
          </div>
        ` : ''}

        <div class="device-section">
          <div class="device-section-title">Commands</div>
          <div class="commands-row">
            <button class="cmd-btn" @click=${() => this._sendCmd('reboot')}>Reboot</button>
            <button class="cmd-btn danger" @click=${() => this._sendCmd('shutdown')}>Shutdown</button>
          </div>
          ${this._commandResult ? html`<div class="cmd-result">${this._commandResult}</div>` : ''}
        </div>
      </div>
    `;
  }

  _renderManualEdgesList() {
    return html`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: #ccc; font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((edge, i) => html`
            <div class="edge-item">
              <span>
                ${this._getNodeName(edge.source)}
                ${edge.sourceLabel ? html`<span style="color: #4fc3f7; font-size: 10px;"> [${edge.sourceLabel}]</span>` : ''}
                <span style="color: #666;"> &#8594; </span>
                ${edge.label ? html`<span style="color: #888; font-size: 10px;">(${edge.label})</span><span style="color: #666;"> &#8594; </span>` : ''}
                ${edge.targetLabel ? html`<span style="color: #4fc3f7; font-size: 10px;">[${edge.targetLabel}] </span>` : ''}
                ${this._getNodeName(edge.target)}
              </span>
              <span style="display: flex; gap: 4px;">
                <button class="tool-btn" @click=${() => this._labelEdge(i)}>Label</button>
                <button class="tool-btn danger" @click=${() => this._removeEdge(i)}>Remove</button>
              </span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _renderSaveDialog() {
    return html`
      <div class="save-overlay" @click=${this._cancelDialog}>
        <div class="save-dialog" @click=${(e) => e.stopPropagation()}>
          <h3>Unsaved Changes</h3>
          <p>You have unsaved changes to the layout. What would you like to do?</p>
          <div class="save-dialog-buttons">
            <button class="dialog-btn cancel" @click=${this._cancelDialog}>Keep Editing</button>
            <button class="dialog-btn discard" @click=${this._discardAndExit}>Discard</button>
            <button class="dialog-btn save" @click=${this._saveAndExit}>Save</button>
          </div>
        </div>
      </div>
    `;
  }

  _renderLabelDialog() {
    const edge = this.manualEdges[this._labelEdgeIndex];
    if (!edge) return html``;

    const sourceName = this._getNodeName(edge.source);
    const targetName = this._getNodeName(edge.target);

    return html`
      <div class="save-overlay" @click=${this._cancelLabelDialog}>
        <div class="label-dialog" @click=${(e) => e.stopPropagation()}>
          <h3>Link Labels</h3>
          <div class="subtitle">${sourceName} &#8594; ${targetName}</div>

          <div class="label-field">
            <label>Source Interface (${sourceName})</label>
            <input id="source-label" type="text"
              .value=${edge.sourceLabel || ''}
              placeholder="e.g., eth0, port 24, WAN"
              @keydown=${(e) => e.key === 'Enter' && this._saveLabelDialog()}>
            <div class="hint">Shown near the source device</div>
          </div>

          <div class="label-field">
            <label>Link Description</label>
            <input id="link-label" type="text"
              .value=${edge.label || ''}
              placeholder="e.g., 1Gbps, WiFi, VLAN 10"
              @keydown=${(e) => e.key === 'Enter' && this._saveLabelDialog()}>
            <div class="hint">Shown in the middle of the link</div>
          </div>

          <div class="label-field">
            <label>Target Interface (${targetName})</label>
            <input id="target-label" type="text"
              .value=${edge.targetLabel || ''}
              placeholder="e.g., eth1, port 1, LAN"
              @keydown=${(e) => e.key === 'Enter' && this._saveLabelDialog()}>
            <div class="hint">Shown near the target device</div>
          </div>

          <div class="save-dialog-buttons">
            <button class="dialog-btn cancel" @click=${this._cancelLabelDialog}>Cancel</button>
            <button class="dialog-btn save" @click=${this._saveLabelDialog}>Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  // --- Interaction handlers ---

  _onNodeClick(e, nodeId) {
    e.stopPropagation();
    if (this.linkMode) {
      this._handleLinkClick(nodeId);
    } else {
      this._selectNode(nodeId);
    }
  }

  _handleLinkClick(nodeId) {
    if (!this._linkSource) {
      this._linkSource = nodeId;
    } else if (this._linkSource === nodeId) {
      // Clicked same node, cancel
      this._linkSource = null;
    } else {
      // Create the link
      const exists = this.manualEdges.some(
        e => (e.source === this._linkSource && e.target === nodeId) ||
             (e.source === nodeId && e.target === this._linkSource)
      );
      if (!exists) {
        this.manualEdges = [...this.manualEdges, {
          source: this._linkSource,
          target: nodeId,
          sourceLabel: '',
          label: '',
          targetLabel: '',
        }];
        this._markDirty();
        // Open label dialog for the new link
        this._labelEdgeIndex = this.manualEdges.length - 1;
        this._showLabelDialog = true;
      }
      this._linkSource = null;
    }
  }

  _toggleEditMode() {
    if (this.editMode && this._dirty) {
      // Trying to exit edit mode with unsaved changes
      this._showSaveDialog = true;
      return;
    }
    this._enterOrExitEdit();
  }

  _enterOrExitEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // Snapshot current state so we can detect changes
      this._savedPositions = JSON.stringify(this.nodePositions);
      this._savedManualEdges = JSON.stringify(this.manualEdges);
      this._dirty = false;
    } else {
      this.linkMode = false;
      this._linkSource = null;
      this._selectedEdge = -1;
      this._dirty = false;
    }
  }

  _markDirty() {
    if (!this.editMode) return;
    this._dirty = true;
  }

  async _saveAndExit() {
    this._showSaveDialog = false;
    await this._saveCurrentLayout();
    this._dirty = false;
    this._enterOrExitEdit();
  }

  _discardAndExit() {
    this._showSaveDialog = false;
    // Restore to saved state
    if (this._savedPositions) {
      this.nodePositions = JSON.parse(this._savedPositions);
    }
    if (this._savedManualEdges) {
      this.manualEdges = JSON.parse(this._savedManualEdges);
    }
    this._dirty = false;
    this._enterOrExitEdit();
  }

  _cancelDialog() {
    this._showSaveDialog = false;
  }

  _toggleLinkMode() {
    this.linkMode = !this.linkMode;
    this._linkSource = null;
    if (this.linkMode) {
      this.selectedNode = null;
    }
  }

  async _selectNode(id) {
    if (this.selectedNode === id) {
      this.selectedNode = null;
      this._selectedDeviceData = null;
      this._commandResult = '';
      return;
    }
    this.selectedNode = id;
    this._selectedDeviceData = null;
    this._commandResult = '';
    try {
      this._selectedDeviceData = await fetchDevice(id);
    } catch (e) {
      // Might be a gateway node with no device data
      this._selectedDeviceData = { status: 'inferred', attributes: {}, tags: [] };
    }
  }

  async _sendCmd(command) {
    if (!this.selectedNode) return;
    try {
      this._commandResult = `Sending ${command}...`;
      const result = await sendCommand(this.selectedNode, command);
      this._commandResult = `Sent (request: ${result.request_id})`;
    } catch (e) {
      this._commandResult = `Error: ${e.message}`;
    }
  }

  _selectEdge(manualIndex) {
    this._selectedEdge = this._selectedEdge === manualIndex ? -1 : manualIndex;
  }

  _labelEdge(index) {
    this._labelEdgeIndex = index;
    this._showLabelDialog = true;
  }

  _saveLabelDialog() {
    const dialog = this.shadowRoot.querySelector('.label-dialog');
    const sourceLabel = dialog.querySelector('#source-label').value;
    const linkLabel = dialog.querySelector('#link-label').value;
    const targetLabel = dialog.querySelector('#target-label').value;

    const updated = [...this.manualEdges];
    updated[this._labelEdgeIndex] = {
      ...updated[this._labelEdgeIndex],
      sourceLabel,
      label: linkLabel,
      targetLabel,
    };
    this.manualEdges = updated;
    this._markDirty();
    this._showLabelDialog = false;
    this._labelEdgeIndex = -1;
  }

  _cancelLabelDialog() {
    this._showLabelDialog = false;
    this._labelEdgeIndex = -1;
  }

  _removeEdge(index) {
    this.manualEdges = this.manualEdges.filter((_, i) => i !== index);
    this._selectedEdge = -1;
    this._markDirty();
  }

  // --- Drag handlers ---

  _onMouseDown(e, nodeId) {
    this._dragging = nodeId;
    const svgEl = this.shadowRoot.querySelector('svg');
    const pt = svgEl.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    const pos = this.nodePositions[nodeId] || { x: 0, y: 0 };
    this._dragOffset = { x: svgP.x - pos.x, y: svgP.y - pos.y };
    e.preventDefault();
  }

  _onMouseMove(e) {
    const svgEl = this.shadowRoot.querySelector('svg');
    const pt = svgEl.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svgEl.getScreenCTM().inverse());

    // Track mouse for link preview
    if (this.linkMode && this._linkSource) {
      this._mousePos = { x: svgP.x, y: svgP.y };
      this.requestUpdate();
    }

    if (!this._dragging) return;
    this.nodePositions = {
      ...this.nodePositions,
      [this._dragging]: {
        x: svgP.x - this._dragOffset.x,
        y: svgP.y - this._dragOffset.y,
      },
    };
  }

  _onMouseUp() {
    if (this._dragging) {
      this._markDirty();
    }
    this._dragging = null;
  }

  // --- Layout management ---

  _onLayoutChange(e) {
    this.selectedLayout = e.target.value;
    if (this.selectedLayout && this.layouts[this.selectedLayout]) {
      this.nodePositions = this.layouts[this.selectedLayout].positions || {};
      this.manualEdges = this.layouts[this.selectedLayout].manualEdges || [];
    } else {
      this.nodePositions = {};
      this.manualEdges = [];
      this._autoLayout();
    }
  }

  async _saveCurrentLayout() {
    const existingName = this.selectedLayout && this.layouts[this.selectedLayout]
      ? this.layouts[this.selectedLayout].name : '';
    const name = prompt('Layout name:', existingName);
    if (!name) return;
    const saved = await saveLayout({
      id: this.selectedLayout || undefined,
      name,
      positions: this.nodePositions,
      manualEdges: this.manualEdges,
    });
    this.selectedLayout = saved.id;
    await this._loadLayouts();
    this._dirty = false;
    this._savedPositions = JSON.stringify(this.nodePositions);
    this._savedManualEdges = JSON.stringify(this.manualEdges);
  }
}

customElements.define('topology-view', TopologyView);

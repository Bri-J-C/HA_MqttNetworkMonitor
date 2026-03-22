import { LitElement, html, svg, css } from 'lit';
import { fetchTopology, fetchLayouts, saveLayout, deleteLayout } from '../services/api.js';
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
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTopology();
    this._loadLayouts();
    wsService.onMessage(() => this._loadTopology());
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
            <button class="tool-btn" @click=${this._saveCurrentLayout}>Save Layout</button>
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

    return svg`
      <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"
        stroke="${strokeColor}" stroke-width="${strokeWidth}"
        stroke-dasharray="${dash}"
        @click=${isManual && this.editMode ? () => this._selectEdge(index - (this.topology.edges?.length || 0)) : null}
        style="${isManual && this.editMode ? 'cursor:pointer' : ''}"/>
      ${edge.label ? svg`
        <text x="${midX}" y="${midY - 6}" text-anchor="middle"
          fill="#888" font-size="9">${edge.label}</text>
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

    return html`
      <div class="detail-panel">
        <div class="detail-header">
          <span class="detail-name" style="color: ${STATUS_COLORS[node.status] || '#ccc'}">
            ${node.name}
          </span>
          <span style="color: #666; font-size: 12px;">${node.type} | ${node.status}</span>
        </div>
        <button class="tool-btn" style="margin-top: 4px;"
          @click=${() => this._viewDevice(node.id)}>View Details</button>
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
                <span style="color: #4fc3f7;"> &#8594; </span>
                ${this._getNodeName(edge.target)}
                ${edge.label ? html`<span style="color: #888;"> (${edge.label})</span>` : ''}
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
          label: '',
        }];
      }
      this._linkSource = null;
    }
  }

  _toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.linkMode = false;
      this._linkSource = null;
      this._selectedEdge = -1;
    }
  }

  _toggleLinkMode() {
    this.linkMode = !this.linkMode;
    this._linkSource = null;
    if (this.linkMode) {
      this.selectedNode = null;
    }
  }

  _selectNode(id) {
    this.selectedNode = this.selectedNode === id ? null : id;
  }

  _selectEdge(manualIndex) {
    this._selectedEdge = this._selectedEdge === manualIndex ? -1 : manualIndex;
  }

  _labelEdge(index) {
    const current = this.manualEdges[index]?.label || '';
    const label = prompt('Link label (e.g., "1Gbps", "WiFi", "VLAN 10"):', current);
    if (label === null) return; // cancelled
    const updated = [...this.manualEdges];
    updated[index] = { ...updated[index], label };
    this.manualEdges = updated;
  }

  _removeEdge(index) {
    this.manualEdges = this.manualEdges.filter((_, i) => i !== index);
    this._selectedEdge = -1;
  }

  _viewDevice(id) {
    this.dispatchEvent(new CustomEvent('device-select', {
      detail: { deviceId: id }, bubbles: true, composed: true,
    }));
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
  }
}

customElements.define('topology-view', TopologyView);

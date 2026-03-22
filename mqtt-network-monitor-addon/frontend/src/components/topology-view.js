import { LitElement, html, css } from 'lit';
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
    selectedNode: { type: String },
    nodePositions: { type: Object },
    _dragging: { type: String, state: true },
  };

  static styles = css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: #2a2a4a; padding: 8px 14px; border-radius: 8px;
      margin-bottom: 12px;
    }
    .toolbar-left { display: flex; gap: 10px; align-items: center; }
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
    .status-dot { font-size: 11px; }
    .canvas-container {
      background: #1a1a2e; border-radius: 8px; border: 1px solid #2a2a4a;
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: 500px; }
    .node { cursor: pointer; }
    .node:hover rect, .node:hover circle { filter: brightness(1.3); }
    .node.selected rect, .node.selected circle { stroke-width: 2.5; stroke-dasharray: 4,2; }
    .detail-panel {
      background: #2a2a4a; border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .detail-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .detail-name { font-size: 16px; font-weight: 600; }
    .detail-attrs {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    .detail-attr {
      text-align: center;
    }
    .detail-attr-label { font-size: 10px; color: #666; }
    .detail-attr-val { font-size: 16px; font-weight: 600; color: #ccc; }
  `;

  constructor() {
    super();
    this.topology = { nodes: [], edges: [] };
    this.layouts = {};
    this.selectedLayout = '';
    this.editMode = false;
    this.selectedNode = null;
    this.nodePositions = {};
    this._dragging = null;
    this._dragOffset = { x: 0, y: 0 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTopology();
    this._loadLayouts();
    wsService.onMessage(() => this._loadTopology());
  }

  async _loadTopology() {
    try {
      this.topology = await fetchTopology();
      this._autoLayout();
    } catch (e) {
      console.error('Failed to load topology:', e);
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

    // Only set positions for nodes that don't have saved positions
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
  }

  render() {
    const nodes = this.topology.nodes;
    const edges = this.topology.edges;
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
            @click=${() => this.editMode = !this.editMode}>
            ${this.editMode ? '✓ Done Editing' : '✎ Edit Mode'}
          </button>
          ${this.editMode ? html`
            <button class="tool-btn" @click=${this._saveCurrentLayout}>Save Layout</button>
          ` : ''}
          <button class="tool-btn" @click=${() => { this.nodePositions = {}; this._autoLayout(); }}>
            Auto Layout
          </button>
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #81c784">● ${counts.online} online</span>
          <span class="status-dot" style="color: #ef5350">● ${counts.offline} offline</span>
          <span class="status-dot" style="color: #ffb74d">● ${counts.warning} warning</span>
        </div>
      </div>

      <div class="canvas-container">
        <svg viewBox="0 0 900 500"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}>
          ${edges.map(edge => this._renderEdge(edge))}
          ${nodes.map(node => this._renderNode(node))}
        </svg>
      </div>

      ${this.selectedNode ? this._renderDetailPanel() : ''}
    `;
  }

  _renderNode(node) {
    const pos = this.nodePositions[node.id] || { x: 100, y: 100 };
    const color = STATUS_COLORS[node.status] || STATUS_COLORS.unknown;
    const isSelected = this.selectedNode === node.id;
    const isGateway = node.type === 'gateway';

    if (isGateway) {
      return html`
        <g class="node ${isSelected ? 'selected' : ''}"
          transform="translate(${pos.x}, ${pos.y})"
          @click=${() => this._selectNode(node.id)}
          @mousedown=${(e) => this.editMode && this._onMouseDown(e, node.id)}>
          <circle r="20" fill="${color}22" stroke="${color}" stroke-width="1.5"/>
          <text text-anchor="middle" dy="4" fill="${color}" font-size="10">${node.name.substring(0, 8)}</text>
        </g>
      `;
    }

    return html`
      <g class="node ${isSelected ? 'selected' : ''}"
        transform="translate(${pos.x}, ${pos.y})"
        @click=${() => this._selectNode(node.id)}
        @mousedown=${(e) => this.editMode && this._onMouseDown(e, node.id)}>
        <rect x="-40" y="-16" width="80" height="32" rx="6"
          fill="#2a2a4a" stroke="${color}" stroke-width="1.5"/>
        <text text-anchor="middle" dy="-2" fill="${color}" font-size="10">
          ${(node.name || node.id).substring(0, 10)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${node.status}</text>
      </g>
    `;
  }

  _renderEdge(edge) {
    const from = this.nodePositions[edge.source];
    const to = this.nodePositions[edge.target];
    if (!from || !to) return '';

    return html`
      <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"
        stroke="#555" stroke-width="1.5"
        stroke-dasharray=${edge.type === 'auto' ? '4,2' : 'none'}/>
    `;
  }

  _renderDetailPanel() {
    const node = this.topology.nodes.find(n => n.id === this.selectedNode);
    if (!node) return '';

    return html`
      <div class="detail-panel">
        <div class="detail-header">
          <span class="detail-name" style="color: ${STATUS_COLORS[node.status] || '#ccc'}">
            ${node.name}
          </span>
          <span style="color: #666; font-size: 12px;">${node.type}</span>
        </div>
        <button class="tool-btn" style="margin-top: 4px;"
          @click=${() => this._viewDevice(node.id)}>View Details →</button>
      </div>
    `;
  }

  _selectNode(id) {
    this.selectedNode = this.selectedNode === id ? null : id;
  }

  _viewDevice(id) {
    this.dispatchEvent(new CustomEvent('device-select', {
      detail: { deviceId: id }, bubbles: true, composed: true,
    }));
  }

  _onMouseDown(e, nodeId) {
    this._dragging = nodeId;
    const svg = this.shadowRoot.querySelector('svg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    const pos = this.nodePositions[nodeId] || { x: 0, y: 0 };
    this._dragOffset = { x: svgP.x - pos.x, y: svgP.y - pos.y };
    e.preventDefault();
  }

  _onMouseMove(e) {
    if (!this._dragging) return;
    const svg = this.shadowRoot.querySelector('svg');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
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

  _onLayoutChange(e) {
    this.selectedLayout = e.target.value;
    if (this.selectedLayout && this.layouts[this.selectedLayout]) {
      this.nodePositions = this.layouts[this.selectedLayout].positions || {};
    } else {
      this.nodePositions = {};
      this._autoLayout();
    }
  }

  async _saveCurrentLayout() {
    const name = prompt('Layout name:');
    if (!name) return;
    await saveLayout({
      id: this.selectedLayout || undefined,
      name,
      positions: this.nodePositions,
    });
    await this._loadLayouts();
  }
}

customElements.define('topology-view', TopologyView);

import { LitElement, html, svg, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { fetchTopology, fetchLayouts, saveLayout, deleteLayout } from '../services/api.js';
import { wsService } from '../services/websocket.js';
import './device-detail.js';
import './themed-dialog.js';

const STATUS_COLORS = {
  online: '#04d65c',
  offline: '#ef5350',
  warning: '#ffb74d',
  inferred: '#00D4FF',
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
    _selectedDeviceData: { type: Object, state: true },  // kept for compatibility
    _dirty: { type: Boolean, state: true },
    _layoutDropdownOpen: { type: Boolean, state: true },
    _showLabelDialog: { type: Boolean, state: true },
    _labelEdgeIndex: { type: Number, state: true },
    hideAutoEdges: { type: Boolean },
    _viewBox: { type: Object, state: true },
  };

  static styles = [sharedStyles, css`
    :host { display: block; padding: 20px; max-width: 1400px; margin: 0 auto; }
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px;
      margin-bottom: 8px; flex-wrap: wrap; gap: 8px;
    }
    .toolbar-secondary {
      margin-bottom: 12px; justify-content: flex-start;
    }
    .toolbar-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .toolbar-right { display: flex; gap: 8px; font-size: 11px; }

    /* Custom layout dropdown */
    .layout-dropdown { position: relative; }
    .layout-trigger {
      background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 5px 28px 5px 10px; font-size: 12px;
      cursor: pointer; white-space: nowrap; position: relative; min-width: 120px;
      text-align: left; transition: border-color var(--transition);
    }
    .layout-trigger:hover { border-color: var(--border-hover); }
    .layout-trigger::after {
      content: ''; position: absolute; right: 10px; top: 50%;
      border: 4px solid transparent; border-top-color: var(--text-secondary);
      transform: translateY(-25%);
    }
    .layout-trigger.open::after {
      border-top-color: transparent; border-bottom-color: var(--text-secondary);
      transform: translateY(-75%);
    }
    .layout-menu {
      position: absolute; top: calc(100% + 4px); left: 0; min-width: 200px;
      background: var(--bg-surface); border: 1px solid var(--border);
      border-radius: var(--radius-md); box-shadow: var(--shadow-dropdown);
      z-index: 100; overflow: hidden;
    }
    .layout-option {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 12px; font-size: 12px; color: var(--text-primary);
      cursor: pointer; transition: background var(--transition);
    }
    .layout-option:hover { background: var(--bg-hover); }
    .layout-option.selected { color: var(--accent); }
    .layout-divider {
      height: 1px; background: var(--border); margin: 4px 0;
    }
    .default-badge {
      font-size: 9px; padding: 1px 5px; border-radius: var(--radius-sm);
      background: var(--accent-bg); color: var(--accent); margin-left: auto;
    }
    .layout-option.new-layout { color: var(--accent); }

    .tool-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 12px; padding: 4px 10px; border-radius: 4px; transition: all 0.2s;
    }
    .tool-btn:hover { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }
    .tool-btn.active { color: #00D4FF; background: rgba(0,212,255,0.1); }
    .tool-btn.link-mode { color: #ffb74d; }
    .tool-btn.link-mode.active { color: #0d0d1f; background: #ffb74d; }
    .tool-btn.danger { color: #ef5350; }
    .tool-btn.danger:hover { background: rgba(239,83,80,0.1); }
    .tool-btn.save { color: #04d65c; }
    .tool-btn.save:hover { background: rgba(129,199,132,0.15); color: #a5d6a7; }
    .tool-btn.done {
      color: var(--bg-card); background: var(--success); font-weight: 600;
      border-radius: var(--radius-sm); padding: 5px 14px;
    }
    .tool-btn.done:hover { background: #05e868; }
    .tool-btn.discard {
      color: var(--text-dim); background: none;
    }
    .tool-btn.discard:hover { color: var(--danger); background: var(--danger-bg); }
    .status-dot { font-size: 11px; }
    .separator { color: #666; }
    .canvas-container {
      background: #0d0d1f; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
      position: relative; overflow: hidden;
    }
    svg { width: 100%; height: 500px; display: block; touch-action: none; }
    .zoom-controls {
      position: absolute; bottom: 12px; right: 12px;
      display: flex; flex-direction: column; gap: 4px; z-index: 10;
    }
    .zoom-btn {
      width: 32px; height: 32px; border-radius: var(--radius-md, 8px);
      background: var(--bg-surface, #1a1a2e); border: 1px solid var(--border, rgba(255,255,255,0.1));
      color: var(--text-primary, #fff); font-size: 16px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .zoom-btn:hover { background: var(--bg-hover, rgba(255,255,255,0.08)); border-color: var(--border-hover, rgba(255,255,255,0.2)); }
    .zoom-btn.fit { font-size: 14px; }
    .detail-panel {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;
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
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;
    }
    .edge-panel-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .edge-label-input {
      background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
      color: rgba(255,255,255,0.8); padding: 4px 8px; font-size: 12px; width: 200px;
    }
    .edge-list {
      margin-top: 8px;
    }
    .edge-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #fff;
    }
    .edge-item:last-child { border-bottom: none; }
    .device-panel {
      background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; margin-top: 12px;
    }
    .device-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .device-title { font-size: 18px; font-weight: 700; }
    .device-type { font-size: 12px; color: #fff; }
    .device-status-badge {
      padding: 3px 10px; border-radius: 10px; font-size: 12px;
    }
    .device-section {
      margin-top: 14px;
    }
    .device-section-title {
      font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 8px;
    }
    .attr-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 8px;
    }
    .attr-item {
      background: #0d0d1f; border-radius: 6px; padding: 10px; text-align: center;
    }
    .attr-label { font-size: 10px; color: #fff; text-transform: uppercase; }
    .attr-val { font-size: 18px; font-weight: 700; color: #00D4FF; margin-top: 2px; }
    .attr-unit { font-size: 11px; color: #fff; }
    .attr-val.warning { color: #ffb74d; }
    .network-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 6px;
    }
    .net-item { font-size: 12px; color: #fff; }
    .net-label { color: #fff; }
    .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
    .tag-badge {
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: rgba(0,212,255,0.15); color: #00D4FF;
    }
    .tag-badge.server { background: rgba(99,102,241,0.15); color: #6366F1; }
    .commands-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .cmd-btn {
      background: rgba(255,255,255,0.1); border: none; color: rgba(255,255,255,0.8); padding: 6px 14px;
      border-radius: 5px; cursor: pointer; font-size: 12px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: rgba(255,255,255,0.15); }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 6px; padding: 6px 10px; background: #0d0d1f;
      border-radius: 4px; font-size: 11px; color: #fff; font-family: monospace;
    }
    .close-btn {
      background: none; border: none; color: #fff; cursor: pointer;
      font-size: 18px; padding: 0 4px; line-height: 1;
    }
    .close-btn:hover { color: rgba(255,255,255,0.8); }
    .save-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    }
    .save-dialog-buttons {
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .dialog-btn {
      border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer;
      font-size: 13px; transition: all 0.2s;
    }
    .dialog-btn.save { background: #00D4FF; color: #0d0d1f; font-weight: 600; }
    .dialog-btn.save:hover { background: #33DDFF; }
    .dialog-btn.cancel { background: rgba(255,255,255,0.1); color: #fff; }
    .dialog-btn.cancel:hover { background: rgba(255,255,255,0.15); }
    .dirty-indicator {
      font-size: 11px; color: #ffb74d; margin-left: 4px;
    }
    .label-dialog {
      background: var(--bg-surface, #1a1a2e); border-radius: 12px; padding: 24px;
      min-width: 360px; max-width: 440px; border: 1px solid var(--border-hover, rgba(255,255,255,0.2));
      box-shadow: var(--shadow-modal, 0 20px 60px rgba(0,0,0,0.5));
    }
    .label-dialog h3 { color: #fff; margin-bottom: 4px; font-size: 16px; }
    .label-dialog .subtitle { color: #fff; font-size: 12px; margin-bottom: 16px; }
    .label-field { margin-bottom: 14px; }
    .label-field label {
      display: block; font-size: 11px; color: #fff; text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 4px;
    }
    .label-field input {
      width: 100%; background: #0d0d1f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px; color: #fff; padding: 8px 12px; font-size: 13px;
      box-sizing: border-box;
    }
    .label-field input:focus {
      outline: none; border-color: #00D4FF;
    }
    .label-field .hint {
      font-size: 10px; color: #fff; margin-top: 3px;
    }
    @media (max-width: 768px) {
      .toolbar { flex-direction: column; align-items: stretch; }
      .toolbar-left { flex-wrap: wrap; }
      .toolbar-right { justify-content: center; }
      .separator { display: none; }
      .layout-trigger { width: 100%; box-sizing: border-box; }
      svg { height: 60vh; }
    }
  `];

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
    this._layoutDropdownOpen = false;
    this._showLabelDialog = false;
    this._labelEdgeIndex = -1;
    this._savedPositions = null;
    this._savedManualEdges = null;
    this.hideAutoEdges = false;
    this._viewBox = { x: 0, y: 0, width: 900, height: 500 };
    // Non-reactive touch state (these must NOT trigger re-renders, which would
    // invalidate getScreenCTM() between touchmove frames and cause jumps).
    this._isPanning = false;
    this._panStart = null;
    this._pinchActive = false;
    // d3-zoom style: store SVG-space anchor points for both fingers at pinch
    // start.  On each move we compute the new scale + translation that maps
    // these anchors to the current screen positions, giving a single stable
    // viewBox update per frame with no accumulated drift.
    this._pinchAnchor0 = null; // SVG-space position of finger 0 at last frame
    this._pinchAnchor1 = null; // SVG-space position of finger 1 at last frame
    this._pinchPrevDist = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTopology();
    this._loadLayouts();
    // Poll to update node statuses (not positions) every refresh interval
    const pollInterval = parseInt(localStorage.getItem('mqtt-monitor-refresh') || '5') * 1000;
    this._pollTimer = setInterval(() => {
      this._refreshNodeStatuses();
    }, pollInterval);
    this._wsUnsub = wsService.onMessage((data) => {
      if (data.type === 'device_update') {
        this._refreshNodeStatuses();
      }
    });
    this._onDocClick = (e) => {
      if (this._layoutDropdownOpen) {
        const dropdown = this.shadowRoot?.querySelector('.layout-dropdown');
        if (dropdown && !e.composedPath().includes(dropdown)) {
          this._layoutDropdownOpen = false;
        }
      }
    };
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._wsUnsub) this._wsUnsub();
    if (this._pollTimer) clearInterval(this._pollTimer);
    if (this._onDocClick) document.removeEventListener('click', this._onDocClick);
  }

  async _refreshNodeStatuses() {
    try {
      const data = await fetchTopology();
      if (!data || !data.nodes) return;
      // Only update node statuses, don't reset positions or edges
      const statusMap = {};
      for (const node of data.nodes) {
        statusMap[node.id] = node.status;
      }
      // Update statuses on existing topology nodes
      if (this.topology && this.topology.nodes) {
        let changed = false;
        const updatedNodes = this.topology.nodes.map(n => {
          if (statusMap[n.id] && statusMap[n.id] !== n.status) {
            changed = true;
            return { ...n, status: statusMap[n.id] };
          }
          return n;
        });
        // Add any new nodes that weren't there before
        for (const node of data.nodes) {
          if (!this.topology.nodes.find(n => n.id === node.id)) {
            updatedNodes.push(node);
            changed = true;
          }
        }
        if (changed) {
          this.topology = { ...this.topology, nodes: updatedNodes };
        }
      }
    } catch (e) { /* ignore polling errors */ }
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
      // On first load, auto-select the default layout
      if (!this._layoutsLoaded) {
        this._layoutsLoaded = true;
        const defaultEntry = Object.entries(this.layouts).find(([, l]) => l.isDefault);
        if (defaultEntry) {
          this.selectedLayout = defaultEntry[0];
          this.nodePositions = defaultEntry[1].positions || {};
          this.manualEdges = defaultEntry[1].manualEdges || [];
          this.hideAutoEdges = defaultEntry[1].hideAutoEdges || false;
        }
      }
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
    const auto = this.hideAutoEdges ? [] : (this.topology.edges || []);
    const manual = this.manualEdges.map(e => ({ ...e, type: 'manual' }));
    return [...auto, ...manual];
  }

  _getNodeName(id) {
    const node = this.topology.nodes.find(n => n.id === id);
    return node ? (node.name || id) : id;
  }

  render() {
    if (this._loading && !this.topology.nodes.length) {
      return html`<div style="padding: 40px; text-align: center; color: #fff;">Loading topology...</div>`;
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
          ${this._renderLayoutDropdown()}
          ${this.editMode ? html`
            <span class="separator">|</span>
            <button class="tool-btn done" @click=${this._doneEditing}>Done Editing</button>
            <button class="tool-btn discard" @click=${this._discardAndExit}>Discard</button>
            <span class="separator">|</span>
            <button class="tool-btn link-mode ${this.linkMode ? 'active' : ''}"
              @click=${this._toggleLinkMode}>
              ${this.linkMode ? 'Cancel Link' : '+ Link'}
            </button>
            <button class="tool-btn ${this.hideAutoEdges ? 'active' : ''}"
              @click=${() => { this.hideAutoEdges = !this.hideAutoEdges; this._markDirty(); }}>
              ${this.hideAutoEdges ? 'Show Auto Links' : 'Auto Links'}
            </button>
            ${this._dirty ? html`<span class="dirty-indicator">unsaved changes</span>` : ''}
          ` : html`
            <button class="tool-btn" @click=${this._enterEditMode}>Edit Mode</button>
          `}
        </div>
        <div class="toolbar-right">
          <span class="status-dot" style="color: #04d65c">${counts.online} online</span>
          <span class="status-dot" style="color: #ef5350">${counts.offline} offline</span>
          <span class="status-dot" style="color: #ffb74d">${counts.warning} warning</span>
        </div>
      </div>
      ${this.editMode ? html`
        <div class="toolbar toolbar-secondary">
          <div class="toolbar-left">
            <button class="tool-btn save" @click=${this._saveAsLayout}>Save As</button>
            ${this.selectedLayout ? html`
              <span class="separator">|</span>
              <button class="tool-btn" @click=${this._setAsDefault}>
                ${this.layouts[this.selectedLayout]?.isDefault ? 'Default' : 'Set Default'}
              </button>
              <button class="tool-btn danger" @click=${this._deleteCurrentLayout}>Delete</button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${this.linkMode ? html`
        <div class="link-hint">
          ${this._linkSource
            ? `Click a second device to link it to "${this._getNodeName(this._linkSource)}"`
            : 'Click a device to start a link'}
        </div>
      ` : ''}

      <div class="canvas-container">
        <svg viewBox="${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}"
          @mousemove=${this._onMouseMove}
          @mouseup=${this._onMouseUp}
          @mouseleave=${this._onMouseUp}
          @wheel=${this._onWheel}
          @touchstart=${this._onTouchStart}
          @touchmove=${this._onTouchMove}
          @touchend=${this._onTouchEnd}>
          ${allEdges.map((edge, i) => this._renderEdgeLine(edge, i))}
          ${this._renderLinkPreview()}
          ${nodes.map(node => this._renderNode(node))}
          ${allEdges.map((edge, i) => this._renderEdgeLabels(edge, i))}
        </svg>
        <div class="zoom-controls">
          <button class="zoom-btn" @click=${this._zoomIn} title="Zoom in">+</button>
          <button class="zoom-btn" @click=${this._zoomOut} title="Zoom out">\u2212</button>
          <button class="zoom-btn fit" @click=${this._fitAll} title="Fit all">\u229E</button>
        </div>
      </div>

      ${this.selectedNode && !this.linkMode ? this._renderDetailPanel() : ''}
      ${this.editMode && this.manualEdges.length > 0 ? this._renderManualEdgesList() : ''}
      ${this._showLabelDialog ? this._renderLabelDialog() : ''}
      <themed-dialog></themed-dialog>
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
          @touchstart=${(e) => this.editMode && !this.linkMode && this._onTouchNodeStart(e, node.id)}
          style="cursor:pointer">
          <circle r="22" fill="#1a1a2e" stroke="${glowColor}" stroke-width="${strokeWidth}"
            stroke-dasharray="${strokeDash}"/>
          <text text-anchor="middle" dy="4" fill="${glowColor}" font-size="10">${node.name.substring(0, 12)}</text>
        </g>
      `;
    }

    return svg`
      <g transform="translate(${pos.x}, ${pos.y})"
        @click=${(e) => this._onNodeClick(e, node.id)}
        @mousedown=${(e) => this.editMode && !this.linkMode && this._onMouseDown(e, node.id)}
        @touchstart=${(e) => this.editMode && !this.linkMode && this._onTouchNodeStart(e, node.id)}
        style="cursor:pointer">
        <rect x="-45" y="-18" width="90" height="36" rx="6"
          fill="#1a1a2e" stroke="${glowColor}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash}"/>
        <text text-anchor="middle" dy="-3" fill="${glowColor}" font-size="10">
          ${(node.name || node.id).substring(0, 12)}
        </text>
        <text text-anchor="middle" dy="10" fill="#666" font-size="8">${node.status}</text>
      </g>
    `;
  }

  _edgeGeometry(edge) {
    const from = this.nodePositions[edge.source];
    const to = this.nodePositions[edge.target];
    if (!from || !to) return null;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    // Perpendicular — prefer above the line
    let perpX = -uy;
    let perpY = ux;
    if (perpY > 0) { perpX = -perpX; perpY = -perpY; }

    // Source label: placed along the line, outside the node box (half-width=45, half-height=18)
    // Find the edge of the box in the direction of the line
    const boxExitDist = this._boxExitDistance(ux, uy);
    const labelGap = 8; // gap between box edge and label

    const srcDist = boxExitDist + labelGap;
    const tgtDist = boxExitDist + labelGap;

    return { from, to, ux, uy, perpX, perpY, len, srcDist, tgtDist };
  }

  _boxExitDistance(ux, uy) {
    // Node box is 90x36 (half: 45x18). Find where a ray from center
    // in direction (ux,uy) exits the box.
    const hw = 48; // slightly larger than half-width for padding
    const hh = 22; // slightly larger than half-height for padding
    if (Math.abs(ux) < 0.001) return hh;
    if (Math.abs(uy) < 0.001) return hw;
    const tx = hw / Math.abs(ux);
    const ty = hh / Math.abs(uy);
    return Math.min(tx, ty);
  }

  _renderEdgeLine(edge, index) {
    const geo = this._edgeGeometry(edge);
    if (!geo) return svg``;

    const isManual = edge.type === 'manual';
    const isSelected = isManual && this._selectedEdge === index - (this.topology.edges?.length || 0);
    const strokeColor = isManual ? '#00D4FF' : '#555';
    const strokeWidth = isSelected ? 2.5 : 1.5;
    const dash = isManual ? 'none' : '4,2';

    return svg`
      <line x1="${geo.from.x}" y1="${geo.from.y}" x2="${geo.to.x}" y2="${geo.to.y}"
        stroke="${strokeColor}" stroke-width="${strokeWidth}"
        stroke-dasharray="${dash}"
        @click=${isManual && this.editMode ? () => this._selectEdge(index - (this.topology.edges?.length || 0)) : null}
        style="${isManual && this.editMode ? 'cursor:pointer' : ''}"/>
    `;
  }

  _renderEdgeLabels(edge, index) {
    if (!edge.label && !edge.sourceLabel && !edge.targetLabel) return svg``;

    const geo = this._edgeGeometry(edge);
    if (!geo) return svg``;

    const { from, to, ux, uy, perpX, perpY, srcDist, tgtDist } = geo;

    // Source label — outside source node box
    const srcX = from.x + ux * srcDist;
    const srcY = from.y + uy * srcDist;

    // Target label — outside target node box
    const tgtX = to.x - ux * tgtDist;
    const tgtY = to.y - uy * tgtDist;

    // Mid label — middle of line, offset perpendicular
    const midX = (from.x + to.x) / 2 + perpX * 14;
    const midY = (from.y + to.y) / 2 + perpY * 14;

    return svg`
      ${edge.label ? svg`
        <rect x="${midX - edge.label.length * 3 - 3}" y="${midY - 9}"
          width="${edge.label.length * 6 + 6}" height="13" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${midX}" y="${midY}" text-anchor="middle"
          fill="#888" font-size="9" style="pointer-events:none">${edge.label}</text>
      ` : svg``}
      ${edge.sourceLabel ? svg`
        <rect x="${srcX - edge.sourceLabel.length * 2.5 - 3}" y="${srcY - 8}"
          width="${edge.sourceLabel.length * 5 + 6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${srcX}" y="${srcY}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${edge.sourceLabel}</text>
      ` : svg``}
      ${edge.targetLabel ? svg`
        <rect x="${tgtX - edge.targetLabel.length * 2.5 - 3}" y="${tgtY - 8}"
          width="${edge.targetLabel.length * 5 + 6}" height="12" rx="2" fill="#0d0d1f" opacity="0.9"/>
        <text x="${tgtX}" y="${tgtY}" text-anchor="middle"
          fill="#00D4FF" font-size="8" style="pointer-events:none">${edge.targetLabel}</text>
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
    if (!this.selectedNode) return html``;
    // Check it's not a gateway node (no real device data)
    const node = this.topology.nodes.find(n => n.id === this.selectedNode);
    if (!node || node.type === 'gateway') {
      return html`
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600; color: #00D4FF;">${node ? node.name : this.selectedNode}</span>
            <button class="tool-btn" @click=${() => { this.selectedNode = null; }}>✕</button>
          </div>
          <div style="color: #fff; font-size: 12px; margin-top: 4px;">${node ? node.type : 'unknown'}</div>
        </div>
      `;
    }

    return html`
      <device-detail
        .deviceId=${this.selectedNode}
        @back=${() => { this.selectedNode = null; this._selectedDeviceData = null; }}
      ></device-detail>
    `;
  }

  _renderManualEdgesList() {
    return html`
      <div class="edge-panel">
        <div class="edge-panel-header">
          <span style="font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 600;">Manual Links</span>
        </div>
        <div class="edge-list">
          ${this.manualEdges.map((edge, i) => html`
            <div class="edge-item">
              <span>
                ${this._getNodeName(edge.source)}
                ${edge.sourceLabel ? html`<span style="color: #00D4FF; font-size: 10px;"> [${edge.sourceLabel}]</span>` : ''}
                <span style="color: #fff;"> &#8594; </span>
                ${edge.label ? html`<span style="color: #fff; font-size: 10px;">(${edge.label})</span><span style="color: #fff;"> &#8594; </span>` : ''}
                ${edge.targetLabel ? html`<span style="color: #00D4FF; font-size: 10px;">[${edge.targetLabel}] </span>` : ''}
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

  _renderLayoutDropdown() {
    const currentName = this.selectedLayout && this.layouts[this.selectedLayout]
      ? this.layouts[this.selectedLayout].name : 'Auto Discovery';
    return html`
      <div class="layout-dropdown">
        <button class="layout-trigger ${this._layoutDropdownOpen ? 'open' : ''}"
          @click=${(e) => { e.stopPropagation(); this._layoutDropdownOpen = !this._layoutDropdownOpen; }}>
          ${currentName}
        </button>
        ${this._layoutDropdownOpen ? html`
          <div class="layout-menu">
            <div class="layout-option ${!this.selectedLayout ? 'selected' : ''}"
              @click=${() => this._selectLayout('')}>Auto Discovery</div>
            ${Object.entries(this.layouts).map(([id, l]) => html`
              <div class="layout-option ${this.selectedLayout === id ? 'selected' : ''}"
                @click=${() => this._selectLayout(id)}>
                ${l.name}
                ${l.isDefault ? html`<span class="default-badge">default</span>` : ''}
              </div>
            `)}
            <div class="layout-divider"></div>
            <div class="layout-option new-layout" @click=${this._createNewLayout}>+ New Layout</div>
          </div>
        ` : ''}
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

  _enterEditMode() {
    this.editMode = true;
    this._savedPositions = JSON.stringify(this.nodePositions);
    this._savedManualEdges = JSON.stringify(this.manualEdges);
    this._dirty = false;
  }

  _exitEditMode() {
    this.editMode = false;
    this.linkMode = false;
    this._linkSource = null;
    this._selectedEdge = -1;
    this._dirty = false;
  }

  _markDirty() {
    if (!this.editMode) return;
    this._dirty = true;
  }

  async _doneEditing() {
    if (this.selectedLayout) {
      // Existing layout — save silently
      await this._saveToCurrentLayout();
      this._exitEditMode();
    } else {
      // Auto Discovery (no layout) — prompt for name
      const dialog = this.shadowRoot.querySelector('themed-dialog');
      const name = await dialog.show({
        type: 'prompt',
        title: 'Save Layout',
        message: 'Enter a name for this layout:',
        placeholder: 'My Layout',
      });
      if (!name) return; // user cancelled, stay in edit mode
      await this._saveNewLayout(name);
      this._exitEditMode();
    }
  }

  _discardAndExit() {
    if (this._savedPositions) {
      this.nodePositions = JSON.parse(this._savedPositions);
    }
    if (this._savedManualEdges) {
      this.manualEdges = JSON.parse(this._savedManualEdges);
    }
    this._exitEditMode();
  }

  async _saveAsLayout() {
    const dialog = this.shadowRoot.querySelector('themed-dialog');
    const name = await dialog.show({
      type: 'prompt',
      title: 'Save As New Layout',
      message: 'Enter a name for the new layout:',
      placeholder: 'Layout copy',
    });
    if (!name) return;
    await this._saveNewLayout(name);
  }

  async _saveToCurrentLayout() {
    if (!this.selectedLayout || !this.layouts[this.selectedLayout]) return;
    const current = this.layouts[this.selectedLayout];
    await saveLayout({
      id: this.selectedLayout,
      name: current.name,
      positions: this.nodePositions,
      manualEdges: this.manualEdges,
      hideAutoEdges: this.hideAutoEdges,
      isDefault: current.isDefault || false,
    });
    await this._loadLayouts();
    this._dirty = false;
    this._savedPositions = JSON.stringify(this.nodePositions);
    this._savedManualEdges = JSON.stringify(this.manualEdges);
  }

  async _saveNewLayout(name) {
    const saved = await saveLayout({
      name,
      positions: this.nodePositions,
      manualEdges: this.manualEdges,
      hideAutoEdges: this.hideAutoEdges,
      isDefault: false,
    });
    this.selectedLayout = saved.id;
    await this._loadLayouts();
    this._dirty = false;
    this._savedPositions = JSON.stringify(this.nodePositions);
    this._savedManualEdges = JSON.stringify(this.manualEdges);
  }

  _selectLayout(id) {
    this._layoutDropdownOpen = false;
    this.selectedLayout = id;
    if (id && this.layouts[id]) {
      const layout = this.layouts[id];
      this.nodePositions = layout.positions || {};
      this.manualEdges = layout.manualEdges || [];
      this.hideAutoEdges = layout.hideAutoEdges || false;
    } else {
      this.nodePositions = {};
      this.manualEdges = [];
      this.hideAutoEdges = false;
      this._autoLayout();
    }
  }

  _createNewLayout() {
    this._layoutDropdownOpen = false;
    this.selectedLayout = '';
    this.nodePositions = {};
    this.manualEdges = [];
    this.hideAutoEdges = false;
    this._autoLayout();
    this._enterEditMode();
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

  // --- Zoom/Pan handlers ---

  _onWheel(e) {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.1 : 0.9;
    this._zoomAt(e.clientX, e.clientY, factor);
  }

  _zoomAt(clientX, clientY, factor) {
    const svgEl = this.shadowRoot.querySelector('svg');
    if (!svgEl) return;
    const pt = svgEl.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const svgP = pt.matrixTransform(svgEl.getScreenCTM().inverse());

    const vb = { ...this._viewBox };
    const newWidth = Math.max(300, Math.min(2700, vb.width * factor));
    const newHeight = Math.max(167, Math.min(1500, vb.height * factor));
    const scaleX = newWidth / vb.width;
    const scaleY = newHeight / vb.height;

    vb.x = svgP.x - (svgP.x - vb.x) * scaleX;
    vb.y = svgP.y - (svgP.y - vb.y) * scaleY;
    vb.width = newWidth;
    vb.height = newHeight;
    this._viewBox = vb;
  }

  _zoomIn() {
    const rect = this.shadowRoot.querySelector('svg')?.getBoundingClientRect();
    if (rect) this._zoomAt(rect.left + rect.width/2, rect.top + rect.height/2, 0.8);
  }

  _zoomOut() {
    const rect = this.shadowRoot.querySelector('svg')?.getBoundingClientRect();
    if (rect) this._zoomAt(rect.left + rect.width/2, rect.top + rect.height/2, 1.25);
  }

  _fitAll() {
    const positions = Object.values(this.nodePositions);
    if (!positions.length) return;
    const xs = positions.map(p => p.x);
    const ys = positions.map(p => p.y);
    const pad = 80;
    this._viewBox = {
      x: Math.min(...xs) - pad,
      y: Math.min(...ys) - pad,
      width: Math.max(...xs) - Math.min(...xs) + pad * 2,
      height: Math.max(...ys) - Math.min(...ys) + pad * 2,
    };
  }

  // --- Touch handlers ---
  //
  // Pinch-to-zoom strategy (d3-zoom / anvaka-panzoom hybrid):
  //
  // The classic bug: you convert the pinch midpoint to SVG coords via
  // getScreenCTM().inverse(), compute a new viewBox, but the *next* frame's
  // getScreenCTM() has already changed because Lit re-rendered the viewBox
  // attribute.  If the focal-point SVG coord drifts even slightly between
  // frames, the view jumps.
  //
  // The fix has two parts:
  //
  // 1. ANCHOR POINTS (d3-zoom approach): On pinch start, record where each
  //    finger lands in SVG-space.  On each move, we know where those same
  //    SVG points *should* appear on screen (under the user's fingers).
  //    We solve for the viewBox that satisfies that constraint.  This is
  //    immune to CTM drift because we never re-query the CTM to find the
  //    focal point — we already know it in SVG-space.
  //
  // 2. PER-FRAME RE-ANCHORING: After applying each frame's viewBox, we
  //    update the anchor points to the *current* SVG positions of the
  //    fingers (using the just-written viewBox's CTM).  This prevents
  //    floating-point drift from accumulating across many frames.
  //    Critically, we read the CTM *synchronously* before Lit's async
  //    render can change the DOM — since we set this._viewBox (which is
  //    reactive), we must re-anchor from the current state, not the
  //    post-render state.
  //
  // The math:
  //   Given SVG anchor midpoint (ax, ay), old viewBox vb, and desired
  //   uniform scale factor s (prevDist / curDist):
  //     newWidth  = clamp(vb.width * s)
  //     newHeight = clamp(vb.height * s)
  //     actualS   = newWidth / vb.width          (after clamping)
  //     newVB.x   = ax - (ax - vb.x) * actualS
  //     newVB.y   = ay - (ay - vb.y) * actualS
  //
  //   Then to handle pinch-pan (midpoint translation):
  //     Convert the new client midpoint to SVG-space in the *new* viewBox
  //     and shift so the anchor midpoint lands under the fingers.

  _clientToSvg(clientX, clientY) {
    const svgEl = this.shadowRoot.querySelector('svg');
    if (!svgEl) return null;
    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svgEl.getScreenCTM().inverse());
  }

  _onTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this._pinchPrevDist = Math.sqrt(dx * dx + dy * dy);
      this._pinchActive = true;

      // Record SVG-space anchor points for both fingers
      this._pinchAnchor0 = this._clientToSvg(e.touches[0].clientX, e.touches[0].clientY);
      this._pinchAnchor1 = this._clientToSvg(e.touches[1].clientX, e.touches[1].clientY);

      // Cancel any single-finger pan that was in progress
      this._isPanning = false;
      this._panStart = null;
      return;
    }
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      this._isPanning = true;
      this._panStart = { x: touch.clientX, y: touch.clientY, vbX: this._viewBox.x, vbY: this._viewBox.y };
    }
  }

  _onTouchMove(e) {
    // --- Pinch-to-zoom + pinch-pan (two fingers) ---
    if (e.touches.length === 2 && this._pinchActive) {
      e.preventDefault();

      if (!this._pinchAnchor0 || !this._pinchAnchor1) return;

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (!this._pinchPrevDist || dist === 0) { this._pinchPrevDist = dist; return; }

      // --- Step 1: Zoom around the SVG-space anchor midpoint ---
      // Incremental scale factor (>1 = zoom out / wider viewBox, <1 = zoom in)
      const rawFactor = this._pinchPrevDist / dist;

      // SVG-space anchor midpoint (stable — not re-derived from CTM)
      const ax = (this._pinchAnchor0.x + this._pinchAnchor1.x) / 2;
      const ay = (this._pinchAnchor0.y + this._pinchAnchor1.y) / 2;

      const vb = this._viewBox;
      // Use uniform scale to avoid aspect-ratio skew from independent clamping
      const newWidth  = Math.max(300, Math.min(2700, vb.width  * rawFactor));
      const actualFactor = newWidth / vb.width;       // after clamping
      const newHeight = Math.max(167, Math.min(1500, vb.height * actualFactor));

      // Zoom-at-point: anchor stays fixed in SVG-space
      let newX = ax - (ax - vb.x) * actualFactor;
      let newY = ay - (ay - vb.y) * (newHeight / vb.height);

      // --- Step 2: Pinch-pan (midpoint translation) ---
      // The anchor midpoint should appear under the current screen midpoint.
      // Compute where the anchor midpoint currently maps to in the NEW viewBox,
      // then shift the viewBox so it lands under the fingers.
      //
      // In the new viewBox coordinate system, a screen point (cx, cy) maps to:
      //   svgX = newX + (cx - svgRect.left) * (newWidth / svgRect.width)
      //   svgY = newY + (cy - svgRect.top)  * (newHeight / svgRect.height)
      //
      // We want (ax, ay) to be at screen midpoint (midCX, midCY):
      //   ax = newX + (midCX - rect.left) * (newWidth / rect.width)
      // Solving for newX:
      //   newX = ax - (midCX - rect.left) * (newWidth / rect.width)
      const svgEl = this.shadowRoot.querySelector('svg');
      if (svgEl) {
        const rect = svgEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const midCX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midCY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          newX = ax - (midCX - rect.left) * (newWidth / rect.width);
          newY = ay - (midCY - rect.top) * (newHeight / rect.height);
        }
      }

      this._viewBox = { x: newX, y: newY, width: newWidth, height: newHeight };

      // --- Step 3: Re-anchor for next frame ---
      // Update anchors to current finger positions in the NEW viewBox's
      // coordinate system.  We use getBoundingClientRect arithmetic instead
      // of getScreenCTM to avoid any async-render staleness.
      if (svgEl) {
        const rect = svgEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const toSvgX = (cx) => newX + (cx - rect.left) * (newWidth / rect.width);
          const toSvgY = (cy) => newY + (cy - rect.top) * (newHeight / rect.height);
          this._pinchAnchor0 = {
            x: toSvgX(e.touches[0].clientX),
            y: toSvgY(e.touches[0].clientY),
          };
          this._pinchAnchor1 = {
            x: toSvgX(e.touches[1].clientX),
            y: toSvgY(e.touches[1].clientY),
          };
        }
      }

      this._pinchPrevDist = dist;
      return;
    }

    // --- Node drag (single finger on a node) ---
    if (e.touches.length === 1 && this._dragging) {
      e.preventDefault();
      const touch = e.touches[0];
      const svgP = this._clientToSvg(touch.clientX, touch.clientY);
      if (!svgP) return;
      this.nodePositions = {
        ...this.nodePositions,
        [this._dragging]: { x: svgP.x - this._dragOffset.x, y: svgP.y - this._dragOffset.y },
      };
      return;
    }

    // --- Pan (single finger on background) ---
    if (e.touches.length === 1 && this._isPanning && this._panStart) {
      const touch = e.touches[0];
      const svgEl = this.shadowRoot.querySelector('svg');
      if (!svgEl) return;
      const ctm = svgEl.getScreenCTM();
      const dx = (touch.clientX - this._panStart.x) / ctm.a;
      const dy = (touch.clientY - this._panStart.y) / ctm.d;
      this._viewBox = { ...this._viewBox, x: this._panStart.vbX - dx, y: this._panStart.vbY - dy };
    }
  }

  _onTouchEnd(e) {
    if (e.touches.length < 2) {
      this._pinchActive = false;
      this._pinchPrevDist = 0;
      this._pinchAnchor0 = null;
      this._pinchAnchor1 = null;
      // If one finger remains after a pinch, re-anchor pan to avoid a jump
      if (e.touches.length === 1 && !this._dragging) {
        const touch = e.touches[0];
        this._isPanning = true;
        this._panStart = { x: touch.clientX, y: touch.clientY, vbX: this._viewBox.x, vbY: this._viewBox.y };
      }
    }
    if (e.touches.length === 0) {
      if (this._dragging) this._markDirty();
      this._dragging = null;
      this._isPanning = false;
      this._panStart = null;
    }
  }

  _onTouchNodeStart(e, nodeId) {
    if (e.touches.length !== 1) return;
    e.stopPropagation();
    this._isPanning = false;
    const touch = e.touches[0];
    const svgP = this._clientToSvg(touch.clientX, touch.clientY);
    if (!svgP) return;
    const pos = this.nodePositions[nodeId] || { x: 0, y: 0 };
    this._dragOffset = { x: svgP.x - pos.x, y: svgP.y - pos.y };
    this._dragging = nodeId;
  }

  _onMouseUp() {
    if (this._dragging) {
      this._markDirty();
    }
    this._dragging = null;
  }

  // --- Layout management ---

  /* _onLayoutChange and _saveCurrentLayout removed — replaced by _selectLayout, _doneEditing, _saveAsLayout */

  async _setAsDefault() {
    if (!this.selectedLayout) return;

    // Clear default from all layouts, set on current
    for (const [id, layout] of Object.entries(this.layouts)) {
      if (layout.isDefault) {
        layout.isDefault = false;
        await saveLayout(layout);
      }
    }

    const current = this.layouts[this.selectedLayout];
    if (current) {
      current.isDefault = true;
      await saveLayout(current);
    }

    await this._loadLayouts();
    // Prevent loadLayouts from re-selecting default since we already have it selected
    this._layoutsLoaded = true;
  }

  async _deleteCurrentLayout() {
    if (!this.selectedLayout) return;
    const name = this.layouts[this.selectedLayout]?.name || this.selectedLayout;
    const dialog = this.shadowRoot.querySelector('themed-dialog');
    const confirmed = await dialog.show({
      type: 'confirm',
      title: 'Delete Layout',
      message: `Delete "${name}"? This cannot be undone.`,
      confirmLabel: 'Delete',
      confirmDanger: true,
    });
    if (!confirmed) return;

    await deleteLayout(this.selectedLayout);
    this.selectedLayout = '';
    this.nodePositions = {};
    this.manualEdges = [];
    this.hideAutoEdges = false;
    this._dirty = false;
    await this._loadLayouts();
    this._autoLayout();
  }
}

customElements.define('topology-view', TopologyView);

import { LitElement, html, css } from 'lit';

/**
 * Reusable conflict dialog for group deployment / device-add flows.
 *
 * Usage:
 *   <conflict-dialog
 *     .conflicts=${[...]}
 *     title="Adding device to group"
 *     action="Add Device"
 *     @confirm=${() => proceed()}
 *     @cancel=${() => abort()}>
 *   </conflict-dialog>
 *
 * If conflicts is empty, the dialog does not render (caller should just proceed).
 */
class ConflictDialog extends LitElement {
  static properties = {
    conflicts: { type: Array },
    title: { type: String },
    action: { type: String },
  };

  static styles = css`
    :host { display: contents; }

    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.65); display: flex; align-items: center;
      justify-content: center; z-index: 1100;
    }

    .dialog {
      background: #2a2a4a; border-radius: 12px; padding: 24px;
      min-width: 560px; max-width: 760px; width: 90vw;
      border: 1px solid #3a3a5a; display: flex; flex-direction: column; gap: 16px;
    }

    .dialog-header {
      display: flex; align-items: flex-start; gap: 10px;
    }
    .warning-icon {
      font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 1px;
    }
    .header-text { flex: 1; }
    .dialog-title {
      font-size: 16px; font-weight: 600; color: #e0e0e0; margin-bottom: 4px;
    }
    .dialog-subtitle {
      font-size: 13px; color: #888;
    }

    .conflict-table {
      width: 100%; border-collapse: collapse;
      font-size: 12px;
    }
    .conflict-table th {
      text-align: left; font-size: 10px; color: #666; padding: 6px 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
      border-bottom: 1px solid #3a3a5a;
    }
    .conflict-table td {
      color: #ccc; padding: 6px 8px;
      border-bottom: 1px solid #222240;
      vertical-align: top;
    }
    .conflict-table tr:last-child td { border-bottom: none; }
    .conflict-table td.mono { font-family: monospace; font-size: 11px; }
    .type-badge {
      display: inline-block; padding: 1px 6px; border-radius: 3px;
      font-size: 10px; font-weight: 600; text-transform: uppercase;
    }
    .type-command { background: rgba(79,195,247,0.15); color: #4fc3f7; }
    .type-sensor  { background: rgba(129,196,132,0.15); color: #81c784; }
    .type-threshold { background: rgba(255,183,77,0.15); color: #ffb74d; }

    .action-text { font-size: 11px; color: #666; font-style: italic; }

    .scroll-area {
      max-height: 320px; overflow-y: auto;
      border: 1px solid #3a3a5a; border-radius: 6px;
    }

    .dialog-footer {
      display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;
    }
    .btn {
      border: none; padding: 8px 18px; border-radius: 6px;
      cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .btn-cancel { background: #3a3a5a; color: #aaa; }
    .btn-cancel:hover { background: #4a4a6a; }
    .btn-proceed { background: #ef5350; color: #fff; font-weight: 600; }
    .btn-proceed:hover { background: #f06666; }
  `;

  constructor() {
    super();
    this.conflicts = [];
    this.title = 'Conflicts detected';
    this.action = 'Proceed';
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
  }

  _typeClass(type) {
    if (type === 'command') return 'type-command';
    if (type === 'sensor') return 'type-sensor';
    return 'type-threshold';
  }

  render() {
    if (!this.conflicts || this.conflicts.length === 0) return html``;

    const count = this.conflicts.length;
    const deviceCount = new Set(this.conflicts.map(c => c.device_id)).size;

    return html`
      <div class="overlay" @click=${this._handleCancel}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <div class="dialog-header">
            <div class="warning-icon">&#9888;&#65039;</div>
            <div class="header-text">
              <div class="dialog-title">${this.title}</div>
              <div class="dialog-subtitle">
                ${count} conflict${count !== 1 ? 's' : ''} found across
                ${deviceCount} device${deviceCount !== 1 ? 's' : ''}.
                Proceeding will overwrite device-specific settings with the group values.
              </div>
            </div>
          </div>

          <div class="scroll-area">
            <table class="conflict-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Current (device)</th>
                  <th>Will become (group)</th>
                </tr>
              </thead>
              <tbody>
                ${this.conflicts.map(c => html`
                  <tr>
                    <td>${c.device_name || c.device_id}</td>
                    <td>
                      <span class="type-badge ${this._typeClass(c.type)}">${c.type}</span>
                    </td>
                    <td class="mono">${c.name}</td>
                    <td class="mono">${c.device_value}</td>
                    <td class="mono">${c.group_value}</td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>

          <div class="dialog-footer">
            <button class="btn btn-cancel" @click=${this._handleCancel}>Cancel</button>
            <button class="btn btn-proceed" @click=${this._handleConfirm}>
              ${this.action} Anyway
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('conflict-dialog', ConflictDialog);

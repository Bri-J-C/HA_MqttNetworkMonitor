import { LitElement, html, css } from 'lit';

const DANGEROUS_COMMANDS = ['shutdown', 'halt', 'poweroff', 'destroy'];

function isDangerous(cmd) {
  const lower = cmd.toLowerCase();
  return DANGEROUS_COMMANDS.some(d => lower.includes(d));
}

/**
 * device-commands — command buttons, server command table, add/edit/remove, hide/unhide.
 *
 * Properties:
 *   device         {Object} — full device record
 *   serverCommands {Object} — server-managed commands (name → shell_cmd)
 *   commandResult  {String} — result text shown below buttons
 *
 * Events fired:
 *   command-send           {command}           — user clicked a command button
 *   command-hide           {name}              — user hid a command
 *   command-unhide         {name}              — user un-hid a command
 *   server-command-save    {name, shell}       — user saved add/edit form
 *   server-command-remove  {name}              — user removed a server command
 */
class DeviceCommands extends LitElement {
  static properties = {
    device:             { type: Object },
    serverCommands:     { type: Object },
    commandResult:      { type: String },
    _showHiddenCmds:    { type: Boolean, state: true },
    _showAddCommand:    { type: Boolean, state: true },
    _editingCommandName:{ type: String,  state: true },
    _editCommandForm:   { type: Object,  state: true },
  };

  static styles = css`
    .section {
      background: #2a2a4a; border-radius: 8px; padding: 16px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 12px; color: #666; text-transform: uppercase;
      letter-spacing: 1px; margin-bottom: 12px; font-weight: 600;
    }

    .commands { display: flex; gap: 8px; flex-wrap: wrap; }
    .cmd-btn {
      background: #3a3a5a; border: none; color: #ccc; padding: 8px 16px;
      border-radius: 6px; cursor: pointer; font-size: 13px; transition: all 0.2s;
    }
    .cmd-btn:hover { background: #4a4a6a; }
    .cmd-btn.danger { background: #5a2a2a; color: #ef5350; }
    .cmd-btn.danger:hover { background: #6a3a3a; }
    .cmd-result {
      margin-top: 8px; padding: 8px 12px; background: #1a1a2e;
      border-radius: 4px; font-size: 12px; color: #aaa; font-family: monospace;
    }

    .attr-delete {
      font-size: 14px; color: #555; cursor: pointer; line-height: 1;
    }
    .attr-delete:hover { color: #ef5350; }

    /* Sensor / command table */
    .sensor-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
    .sensor-table th {
      text-align: left; font-size: 10px; color: #666; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid #3a3a5a;
    }
    .sensor-table td {
      font-size: 12px; color: #ccc; padding: 7px 8px; border-bottom: 1px solid #2a2a4a;
      font-family: monospace;
    }
    .sensor-table tr:last-child td { border-bottom: none; }
    .sensor-actions { display: flex; gap: 4px; }
    .sensor-btn {
      background: none; border: none; cursor: pointer; font-size: 11px;
      padding: 2px 6px; border-radius: 3px; transition: all 0.15s;
    }
    .sensor-btn.edit   { color: #4fc3f7; }
    .sensor-btn.edit:hover  { background: rgba(79,195,247,0.1); }
    .sensor-btn.remove { color: #666; }
    .sensor-btn.remove:hover { color: #ef5350; background: rgba(239,83,80,0.1); }

    /* Add/edit form */
    .sensor-form {
      background: #1a1a2e; border-radius: 6px; padding: 14px; margin-bottom: 12px;
    }
    .sensor-form-grid {
      display: grid; grid-template-columns: 1fr 2fr; gap: 8px; margin-bottom: 10px;
    }
    .sensor-form-grid input {
      background: #2a2a4a; border: 1px solid #3a3a5a; border-radius: 4px;
      color: #e0e0e0; padding: 5px 8px; font-size: 12px;
    }
    .sensor-form-grid input:focus { outline: none; border-color: #4fc3f7; }
    .sensor-form-grid input::placeholder { color: #555; }
    .sensor-form-actions { display: flex; gap: 6px; }
    .form-btn {
      border: none; padding: 5px 14px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .form-btn.save   { background: #4fc3f7; color: #1a1a2e; font-weight: 600; }
    .form-btn.cancel { background: #3a3a5a; color: #aaa; }
  `;

  constructor() {
    super();
    this.device              = null;
    this.serverCommands      = {};
    this.commandResult       = '';
    this._showHiddenCmds     = false;
    this._showAddCommand     = false;
    this._editingCommandName = null;
    this._editCommandForm    = null;
  }

  render() {
    if (!this.device) return html``;
    const clientCommands   = this.device.allowed_commands || [];
    const serverCmds       = this.serverCommands || {};
    const serverCommandNames = Object.keys(serverCmds);
    const allCommandNames  = [...new Set([...clientCommands, ...serverCommandNames])];
    const hidden           = this.device.hidden_commands || [];
    const visibleCommands  = allCommandNames.filter(c => !hidden.includes(c));
    const hiddenCommands   = allCommandNames.filter(c =>  hidden.includes(c));

    return html`
      <div class="section">
        <div class="section-title">Commands</div>

        <!-- Run buttons -->
        ${visibleCommands.length > 0 ? html`
          <div class="commands" style="margin-bottom: 12px;">
            ${visibleCommands.map(cmd => html`
              <span style="display: inline-flex; align-items: center; gap: 0;">
                <button class="cmd-btn ${isDangerous(cmd) ? 'danger' : ''}"
                  @click=${() => this._onSend(cmd)}>
                  ${cmd}
                </button><span class="attr-delete" style="margin-left: -4px;" title="Hide command"
                  @click=${(e) => { e.stopPropagation(); this._onHide(cmd); }}>&times;</span>
              </span>
            `)}
          </div>
        ` : ''}
        ${this.commandResult ? html`<div class="cmd-result">${this.commandResult}</div>` : ''}

        <!-- Server command table -->
        ${serverCommandNames.length > 0 ? html`
          <div style="margin-top: 8px; font-size: 11px; color: #555; margin-bottom: 6px;">Server-managed commands</div>
          <table class="sensor-table">
            <thead>
              <tr><th>Name</th><th>Shell Command</th><th></th></tr>
            </thead>
            <tbody>
              ${Object.entries(serverCmds).map(([name, shellCmd]) => html`
                <tr>
                  <td>${name}</td>
                  <td style="font-family: monospace; font-size: 11px;">${shellCmd}</td>
                  <td>
                    <div class="sensor-actions">
                      <button class="sensor-btn edit"   @click=${() => this._startEdit(name, shellCmd)}>Edit</button>
                      <button class="sensor-btn remove" @click=${() => this._onRemove(name)}>Remove</button>
                    </div>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        ` : ''}

        <!-- Add/Edit form -->
        ${this._editingCommandName || this._showAddCommand ? html`
          <div class="sensor-form" style="margin-top: 8px;">
            <div class="sensor-form-grid">
              <input type="text" placeholder="Command name"
                .value=${this._editCommandForm?.name || ''}
                ?disabled=${!!this._editingCommandName}
                @input=${(e) => this._editCommandForm = { ...this._editCommandForm, name: e.target.value }}>
              <input type="text" placeholder="Shell command (e.g. systemctl restart nginx)"
                .value=${this._editCommandForm?.shell || ''}
                @input=${(e) => this._editCommandForm = { ...this._editCommandForm, shell: e.target.value }}
                @keydown=${(e) => e.key === 'Enter' && this._saveForm()}>
            </div>
            <div class="sensor-form-actions">
              <button class="form-btn save"   @click=${this._saveForm}>${this._editingCommandName ? 'Update' : 'Add'}</button>
              <button class="form-btn cancel" @click=${this._cancelForm}>Cancel</button>
            </div>
          </div>
        ` : html`
          <button class="cmd-btn" style="font-size: 12px; padding: 5px 12px; margin-top: 8px;"
            @click=${this._startAdd}>+ Add Command</button>
        `}

        <!-- Hidden commands -->
        ${hiddenCommands.length > 0 ? html`
          <div style="margin-top: 12px;">
            <div style="font-size: 10px; color: #555; margin-bottom: 6px; cursor: pointer;"
              @click=${() => this._showHiddenCmds = !this._showHiddenCmds}>
              ${this._showHiddenCmds ? '▾' : '▸'} ${hiddenCommands.length} hidden command${hiddenCommands.length !== 1 ? 's' : ''}
            </div>
            ${this._showHiddenCmds ? html`
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${hiddenCommands.map(cmd => html`
                  <span style="font-size: 11px; background: #1a1a2e; color: #555; padding: 3px 10px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
                    ${cmd}
                    <span style="cursor: pointer; color: #4fc3f7; font-size: 10px;"
                      @click=${() => this._onUnhide(cmd)}>show</span>
                  </span>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Form helpers ───────────────────────────────────────────────────────────

  _startAdd() {
    this._showAddCommand     = true;
    this._editingCommandName = null;
    this._editCommandForm    = { name: '', shell: '' };
  }

  _startEdit(name, shellCmd) {
    this._editingCommandName = name;
    this._showAddCommand     = false;
    this._editCommandForm    = { name, shell: shellCmd };
  }

  _saveForm() {
    const form  = this._editCommandForm;
    if (!form) return;
    const name  = (form.name  || '').trim();
    const shell = (form.shell || '').trim();
    if (!name || !shell) return;
    this.dispatchEvent(new CustomEvent('server-command-save', {
      detail: { name, shell, editing: this._editingCommandName },
      bubbles: true, composed: true,
    }));
    this._cancelForm();
  }

  _cancelForm() {
    this._showAddCommand     = false;
    this._editingCommandName = null;
    this._editCommandForm    = null;
  }

  // ── Event dispatchers ──────────────────────────────────────────────────────

  _onSend(command) {
    this.dispatchEvent(new CustomEvent('command-send', { detail: { command }, bubbles: true, composed: true }));
  }

  _onHide(name) {
    this.dispatchEvent(new CustomEvent('command-hide', { detail: { name }, bubbles: true, composed: true }));
  }

  _onUnhide(name) {
    this.dispatchEvent(new CustomEvent('command-unhide', { detail: { name }, bubbles: true, composed: true }));
  }

  _onRemove(name) {
    this.dispatchEvent(new CustomEvent('server-command-remove', { detail: { name }, bubbles: true, composed: true }));
  }
}

customElements.define('device-commands', DeviceCommands);

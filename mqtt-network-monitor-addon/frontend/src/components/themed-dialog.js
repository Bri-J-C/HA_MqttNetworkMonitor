import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * Reusable themed dialog replacing native prompt() and confirm().
 *
 * Usage:
 *   const dialog = document.querySelector('themed-dialog');
 *
 *   // Confirm mode — returns true/false
 *   const ok = await dialog.show({
 *     type: 'confirm',
 *     title: 'Delete device?',
 *     message: 'This cannot be undone.',
 *     confirmLabel: 'Delete',
 *     confirmDanger: true,
 *   });
 *
 *   // Prompt mode — returns string or null
 *   const name = await dialog.show({
 *     type: 'prompt',
 *     title: 'Rename device',
 *     message: 'Enter a new name:',
 *     placeholder: 'Device name',
 *     defaultValue: 'sensor-01',
 *   });
 */
class ThemedDialog extends LitElement {
  static properties = {
    _open: { type: Boolean, state: true },
    _type: { type: String, state: true },
    _title: { type: String, state: true },
    _message: { type: String, state: true },
    _placeholder: { type: String, state: true },
    _confirmLabel: { type: String, state: true },
    _confirmDanger: { type: Boolean, state: true },
    _inputValue: { type: String, state: true },
  };

  static styles = [sharedStyles, css`
    :host { display: contents; }

    .overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1200;
      animation: fadeIn var(--transition) ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-modal);
      padding: 24px;
      min-width: 360px;
      max-width: 480px;
      width: 90vw;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: slideUp var(--transition) ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dialog-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .dialog-message {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .dialog-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md, 8px);
      background: var(--bg-input);
      color: var(--text-primary);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color var(--transition);
      box-sizing: border-box;
    }

    .dialog-input:focus {
      border-color: var(--accent);
    }

    .dialog-input::placeholder {
      color: var(--text-dim, rgba(255,255,255,0.4));
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 4px;
    }

    .btn {
      border: none;
      padding: 9px 20px;
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      font-size: 13px;
      font-family: inherit;
      transition: background var(--transition), opacity var(--transition);
    }

    .btn-cancel {
      background: var(--bg-hover);
      color: var(--text-secondary);
    }

    .btn-cancel:hover {
      background: var(--bg-subtle);
      color: var(--text-primary);
    }

    .btn-confirm {
      background: var(--accent);
      color: #0a0a1a;
      font-weight: 600;
    }

    .btn-confirm:hover {
      opacity: 0.85;
    }

    .btn-confirm.danger {
      background: var(--danger);
      color: #fff;
    }

    @media (max-width: 480px) {
      .dialog {
        min-width: unset;
        width: calc(100vw - 32px);
        max-width: none;
      }

      .dialog-footer {
        flex-direction: column;
      }

      .dialog-footer .btn {
        width: 100%;
        text-align: center;
      }
    }
  `];

  constructor() {
    super();
    this._open = false;
    this._type = 'confirm';
    this._title = '';
    this._message = '';
    this._placeholder = '';
    this._confirmLabel = '';
    this._confirmDanger = false;
    this._inputValue = '';
    this._resolve = null;
  }

  /**
   * Show the dialog and return a promise.
   * @param {Object} opts
   * @param {'confirm'|'prompt'} opts.type
   * @param {string} opts.title
   * @param {string} [opts.message]
   * @param {string} [opts.placeholder] - prompt mode only
   * @param {string} [opts.defaultValue] - prompt mode only
   * @param {string} [opts.confirmLabel] - label for confirm/submit button
   * @param {boolean} [opts.confirmDanger] - red danger style for confirm button
   * @returns {Promise<boolean|string|null>}
   */
  show({ type = 'confirm', title = '', message = '', placeholder = '', defaultValue = '', confirmLabel = '', confirmDanger = false } = {}) {
    this._type = type;
    this._title = title;
    this._message = message;
    this._placeholder = placeholder;
    this._confirmLabel = confirmLabel || (type === 'prompt' ? 'Submit' : 'Confirm');
    this._confirmDanger = confirmDanger;
    this._inputValue = defaultValue;
    this._open = true;

    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  _cancel() {
    this._open = false;
    if (this._resolve) {
      this._resolve(this._type === 'prompt' ? null : false);
      this._resolve = null;
    }
  }

  _confirm() {
    this._open = false;
    if (this._resolve) {
      this._resolve(this._type === 'prompt' ? this._inputValue : true);
      this._resolve = null;
    }
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._confirm();
    }
  }

  _onInput(e) {
    this._inputValue = e.target.value;
  }

  updated(changed) {
    if (changed.has('_open') && this._open && this._type === 'prompt') {
      this.updateComplete.then(() => {
        const input = this.renderRoot.querySelector('.dialog-input');
        if (input) input.focus();
      });
    }
  }

  render() {
    if (!this._open) return html``;

    const btnClass = this._confirmDanger ? 'btn btn-confirm danger' : 'btn btn-confirm';

    return html`
      <div class="overlay" @click=${this._cancel}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <h3 class="dialog-title">${this._title}</h3>
          ${this._message ? html`<p class="dialog-message">${this._message}</p>` : ''}
          ${this._type === 'prompt' ? html`
            <input
              class="dialog-input"
              type="text"
              .value=${this._inputValue}
              placeholder=${this._placeholder}
              @input=${this._onInput}
              @keydown=${this._onKeyDown}
            />
          ` : ''}
          <div class="dialog-footer">
            <button class="btn btn-cancel" @click=${this._cancel}>Cancel</button>
            <button class=${btnClass} @click=${this._confirm}>${this._confirmLabel}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('themed-dialog', ThemedDialog);

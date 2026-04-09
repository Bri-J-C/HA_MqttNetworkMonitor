import { LitElement, html, css } from 'lit';

class ToastNotification extends LitElement {
  static properties = {
    _toasts: { type: Array, state: true },
  };

  static styles = css`
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      min-width: 280px;
      max-width: 420px;
      background: #1a1a2e;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      color: #fff;
      font-family: inherit;
      font-size: 13px;
      line-height: 1.4;
      animation: slide-in 0.25s ease forwards;
    }

    .toast.dismiss {
      animation: slide-out 0.2s ease forwards;
    }

    .toast.error {
      border-left: 3px solid #ef5350;
    }

    .toast.success {
      border-left: 3px solid #04d65c;
    }

    .toast.info {
      border-left: 3px solid #00D4FF;
    }

    .icon {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
    }

    .error .icon {
      background: rgba(239,83,80,0.15);
      color: #ef5350;
    }

    .success .icon {
      background: rgba(4,214,92,0.15);
      color: #04d65c;
    }

    .info .icon {
      background: rgba(0,212,255,0.1);
      color: #00D4FF;
    }

    .message {
      flex: 1;
      word-break: break-word;
    }

    .close {
      flex-shrink: 0;
      background: none;
      border: none;
      color: rgba(255,255,255,0.4);
      cursor: pointer;
      padding: 2px;
      font-size: 16px;
      line-height: 1;
    }

    .close:hover {
      color: rgba(255,255,255,0.8);
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;

  constructor() {
    super();
    this._toasts = [];
  }

  show(message, type = 'info') {
    const id = Date.now() + Math.random();
    this._toasts = [...this._toasts, { id, message, type }];
    setTimeout(() => this._dismiss(id), 4000);
  }

  _dismiss(id) {
    // Trigger dismiss animation, then remove
    const el = this.shadowRoot?.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('dismiss');
      el.addEventListener('animationend', () => {
        this._toasts = this._toasts.filter(t => t.id !== id);
      }, { once: true });
    } else {
      this._toasts = this._toasts.filter(t => t.id !== id);
    }
  }

  _iconFor(type) {
    switch (type) {
      case 'error': return '\u2715';
      case 'success': return '\u2713';
      default: return 'i';
    }
  }

  render() {
    return html`
      ${this._toasts.map(t => html`
        <div class="toast ${t.type}" data-id="${t.id}">
          <span class="icon">${this._iconFor(t.type)}</span>
          <span class="message">${t.message}</span>
          <button class="close" @click=${() => this._dismiss(t.id)}>\u2715</button>
        </div>
      `)}
    `;
  }
}

customElements.define('toast-notification', ToastNotification);

export const toast = {
  _el: null,
  _getEl() {
    if (!this._el) {
      this._el = document.querySelector('toast-notification');
      if (!this._el) {
        this._el = document.createElement('toast-notification');
        document.body.appendChild(this._el);
      }
    }
    return this._el;
  },
  success(msg) { this._getEl().show(msg, 'success'); },
  error(msg) { this._getEl().show(msg, 'error'); },
  info(msg) { this._getEl().show(msg, 'info'); },
};

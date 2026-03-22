import { LitElement, html, css } from 'lit';

class NavBar extends LitElement {
  static properties = {
    currentView: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      background: #16213e;
      border-bottom: 1px solid #2a2a4a;
    }
    nav {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 56px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .logo {
      font-size: 18px;
      font-weight: 700;
      color: #4fc3f7;
      margin-right: 32px;
    }
    .nav-links {
      display: flex;
      gap: 4px;
    }
    button {
      background: none;
      border: none;
      color: #888;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    button:hover {
      color: #ccc;
      background: rgba(255,255,255,0.05);
    }
    button.active {
      color: #4fc3f7;
      background: rgba(79,195,247,0.1);
    }
    .version {
      font-size: 10px;
      color: #444;
      margin-left: auto;
    }
  `;

  render() {
    return html`
      <nav>
        <span class="logo">Network Monitor</span>
        <div class="nav-links">
          <button
            class=${this.currentView === 'dashboard' ? 'active' : ''}
            @click=${() => this._navigate('dashboard')}
          >Devices</button>
          <button
            class=${this.currentView === 'topology' ? 'active' : ''}
            @click=${() => this._navigate('topology')}
          >Topology</button>
          <button
            class=${this.currentView === 'settings' ? 'active' : ''}
            @click=${() => this._navigate('settings')}
          >Settings</button>
        </div>
        <span class="version">v0.1.0 build ${BUILD_TIME}</span>
      </nav>
    `;
  }

  _navigate(view) {
    this.dispatchEvent(new CustomEvent('view-change', { detail: { view } }));
  }
}

customElements.define('nav-bar', NavBar);

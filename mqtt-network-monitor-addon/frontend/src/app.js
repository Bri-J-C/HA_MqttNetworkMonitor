import { LitElement, html, css } from 'lit';
import { wsService } from './services/websocket.js';
import './components/nav-bar.js';
import './components/topology-view.js';
import './components/dashboard-view.js';
import './components/device-detail.js';
import './components/settings-view.js';

class NetworkMonitorApp extends LitElement {
  static properties = {
    currentView: { type: String },
    selectedDevice: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #1a1a2e;
    }
    .overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 500;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      overflow-y: auto;
    }
    .overlay-content {
      background: #1a1a2e;
      border-radius: 12px;
      border: 1px solid #2a2a4a;
      width: 100%;
      max-width: 1000px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
  `;

  constructor() {
    super();
    this.currentView = 'dashboard';
    this.selectedDevice = null;
  }

  connectedCallback() {
    super.connectedCallback();
    wsService.connect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    wsService.disconnect();
  }

  render() {
    return html`
      <nav-bar
        .currentView=${this.currentView}
        @view-change=${this._onViewChange}
      ></nav-bar>
      ${this._renderView()}
      ${this.selectedDevice ? this._renderOverlay() : ''}
    `;
  }

  _renderView() {
    switch (this.currentView) {
      case 'topology':
        return html`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;
      case 'settings':
        return html`<settings-view></settings-view>`;
      case 'dashboard':
      default:
        return html`<dashboard-view @device-select=${this._onDeviceSelect}></dashboard-view>`;
    }
  }

  _renderOverlay() {
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="overlay-content" @click=${(e) => e.stopPropagation()}>
          <device-detail
            .deviceId=${this.selectedDevice}
            @back=${() => this.selectedDevice = null}
          ></device-detail>
        </div>
      </div>
    `;
  }

  _onOverlayClick() {
    this.selectedDevice = null;
  }

  _onViewChange(e) {
    this.currentView = e.detail.view;
    this.selectedDevice = null;
  }

  _onDeviceSelect(e) {
    this.selectedDevice = e.detail.deviceId;
  }
}

customElements.define('network-monitor-app', NetworkMonitorApp);

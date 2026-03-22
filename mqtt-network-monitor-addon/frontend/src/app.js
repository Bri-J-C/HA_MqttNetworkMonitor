import { LitElement, html, css } from 'lit';
import { wsService } from './services/websocket.js';
import './components/nav-bar.js';
import './components/topology-view.js';
import './components/dashboard-view.js';
import './components/device-detail.js';

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
    `;
  }

  _renderView() {
    if (this.selectedDevice) {
      return html`
        <device-detail
          .deviceId=${this.selectedDevice}
          @back=${() => this.selectedDevice = null}
        ></device-detail>
      `;
    }
    switch (this.currentView) {
      case 'topology':
        return html`<topology-view @device-select=${this._onDeviceSelect}></topology-view>`;
      case 'dashboard':
      default:
        return html`<dashboard-view @device-select=${this._onDeviceSelect}></dashboard-view>`;
    }
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

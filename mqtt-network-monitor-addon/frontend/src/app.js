import { LitElement, html, css } from 'lit';
import { sharedStyles } from './styles/shared.js';
import { wsService } from './services/websocket.js';
import { setCustomTransforms } from './utils/transforms.js';
import { fetchSettings } from './services/api.js';
import './components/nav-bar.js';
import './components/topology-view.js';
import './components/dashboard-view.js';
import './components/device-detail.js';
import './components/settings-view.js';
import './components/toast-notification.js';

class NetworkMonitorApp extends LitElement {
  static properties = {
    currentView: { type: String },
    selectedDevice: { type: String },
    selectedGroup: { type: String },
  };

  static styles = [sharedStyles, css`
    :host {
      display: block;
      min-height: 100vh;
      background: #0a0a1a;
    }
    @media (max-width: 768px) {
      :host { padding-bottom: 64px; }
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
      background: #0d0d1f;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.05);
      width: 100%;
      max-width: 1000px;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
  `];

  constructor() {
    super();
    this.currentView = 'dashboard';
    this.selectedDevice = null;
    this.selectedGroup = null;
  }

  connectedCallback() {
    super.connectedCallback();
    wsService.connect();
    fetchSettings().then(s => {
      if (s?.custom_transforms) setCustomTransforms(s.custom_transforms);
    }).catch(() => {});
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
      ${this.selectedDevice || this.selectedGroup ? this._renderOverlay() : ''}
      <toast-notification></toast-notification>
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
        return html`<dashboard-view @device-select=${this._onDeviceSelect} @group-edit=${this._onGroupEdit}></dashboard-view>`;
    }
  }

  _renderOverlay() {
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="overlay-content" @click=${(e) => e.stopPropagation()}>
          ${this.selectedGroup
            ? html`<device-detail
                .groupId=${this.selectedGroup}
                @back=${() => this.selectedGroup = null}
              ></device-detail>`
            : html`<device-detail
                .deviceId=${this.selectedDevice}
                @back=${() => this.selectedDevice = null}
              ></device-detail>`
          }
        </div>
      </div>
    `;
  }

  _onOverlayClick() {
    this.selectedDevice = null;
    this.selectedGroup = null;
  }

  _onViewChange(e) {
    this.currentView = e.detail.view;
    this.selectedDevice = null;
    this.selectedGroup = null;
  }

  _onDeviceSelect(e) {
    this.selectedDevice = e.detail.deviceId;
  }

  _onGroupEdit(e) {
    this.selectedGroup = e.detail.groupId;
  }
}

customElements.define('network-monitor-app', NetworkMonitorApp);

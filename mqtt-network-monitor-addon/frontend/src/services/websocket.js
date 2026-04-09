export class WebSocketService {
  constructor() {
    this._ws = null;
    this._listeners = [];
    this._reconnectDelay = 1000;
    this._reconnectAttempts = 0;
    this._maxReconnectAttempts = 50;
    this._shouldReconnect = true;
  }

  connect() {
    this._shouldReconnect = true;
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const match = location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);
    const basePath = match ? match[1] : '';
    const url = `${protocol}//${location.host}${basePath}/api/ws`;
    this._ws = new WebSocket(url);

    this._ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this._listeners.forEach(fn => fn(data));
      } catch (e) {
        console.error('WebSocket parse error:', e);
      }
    };

    this._ws.onclose = () => {
      if (!this._shouldReconnect) return;
      if (this._reconnectAttempts >= this._maxReconnectAttempts) {
        console.error('WebSocket: max reconnect attempts reached');
        return;
      }
      this._reconnectAttempts++;
      setTimeout(() => this.connect(), this._reconnectDelay);
      this._reconnectDelay = Math.min(this._reconnectDelay * 2, 30000);
    };

    this._ws.onopen = () => {
      this._reconnectDelay = 1000;
      this._reconnectAttempts = 0;
    };
  }

  onMessage(callback) {
    this._listeners.push(callback);
    // Return unsubscribe function
    return () => {
      this._listeners = this._listeners.filter(fn => fn !== callback);
    };
  }

  disconnect() {
    this._shouldReconnect = false;
    if (this._ws) this._ws.close();
  }
}

export const wsService = new WebSocketService();

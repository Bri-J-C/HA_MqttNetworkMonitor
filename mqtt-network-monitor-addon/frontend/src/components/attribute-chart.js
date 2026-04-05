import { LitElement, html, css } from 'lit';
import uPlot from 'uplot';

class AttributeChart extends LitElement {
  static properties = {
    deviceId: { type: String },
    attrName: { type: String },
    hours: { type: Number, state: true },
    _loading: { type: Boolean, state: true },
    _error: { type: String, state: true },
  };

  static styles = css`
    :host { display: block; margin-top: 8px; }
    .chart-container {
      background: rgba(0,0,0,0.2);
      border-radius: 6px;
      padding: 8px;
    }
    .time-range {
      display: flex; gap: 4px; margin-bottom: 6px;
    }
    .range-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.5);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      cursor: pointer;
    }
    .range-btn:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
    .range-btn.active { background: rgba(0,212,255,0.15); color: #00D4FF; border-color: rgba(0,212,255,0.3); }
    .chart-wrap { width: 100%; height: 120px; position: relative; }
    .loading, .error, .no-data {
      display: flex; align-items: center; justify-content: center;
      height: 120px; font-size: 11px; color: rgba(255,255,255,0.4);
    }
    .error { color: #ef5350; }
  `;

  constructor() {
    super();
    this.hours = 24;
    this._loading = false;
    this._error = '';
    this._chart = null;
    this._data = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  async _fetchData() {
    this._loading = true;
    this._error = '';
    try {
      const { fetchAttributeHistory } = await import('../services/api.js');
      const data = await fetchAttributeHistory(this.deviceId, this.attrName, this.hours);
      this._data = data;
      this._loading = false;
      await this.updateComplete;
      this._renderChart();
    } catch (e) {
      this._error = e.message || 'Failed to load history';
      this._loading = false;
    }
  }

  _renderChart() {
    if (!this._data || this._data.length === 0) return;

    const container = this.shadowRoot.querySelector('.chart-wrap');
    if (!container) return;

    // Destroy old chart
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
    container.innerHTML = '';

    // Parse HA history data into uPlot format
    const timestamps = [];
    const values = [];
    for (const point of this._data) {
      const ts = new Date(point.last_changed).getTime() / 1000;
      const val = parseFloat(point.state);
      if (!isNaN(val)) {
        timestamps.push(ts);
        values.push(val);
      }
    }

    if (timestamps.length === 0) return;

    const width = container.clientWidth || 300;
    const opts = {
      width,
      height: 120,
      cursor: { show: true },
      select: { show: false },
      legend: { show: false },
      axes: [
        {
          stroke: 'rgba(255,255,255,0.2)',
          grid: { stroke: 'rgba(255,255,255,0.05)', width: 1 },
          ticks: { stroke: 'rgba(255,255,255,0.1)', width: 1 },
          font: '9px Segoe UI, sans-serif',
          values: (u, vals) => vals.map(v => {
            const d = new Date(v * 1000);
            return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
          }),
        },
        {
          stroke: 'rgba(255,255,255,0.2)',
          grid: { stroke: 'rgba(255,255,255,0.05)', width: 1 },
          ticks: { stroke: 'rgba(255,255,255,0.1)', width: 1 },
          font: '9px Segoe UI, sans-serif',
          size: 40,
        },
      ],
      series: [
        {},
        {
          stroke: '#00D4FF',
          width: 1.5,
          fill: 'rgba(0,212,255,0.08)',
        },
      ],
    };

    this._chart = new uPlot(opts, [timestamps, values], container);
  }

  _setHours(h) {
    this.hours = h;
    this._fetchData();
  }

  render() {
    return html`
      <div class="chart-container">
        <div class="time-range">
          ${[1, 6, 24, 168].map(h => html`
            <button class="range-btn ${this.hours === h ? 'active' : ''}"
              @click=${() => this._setHours(h)}>
              ${h <= 24 ? `${h}h` : '7d'}
            </button>
          `)}
        </div>
        ${this._loading ? html`<div class="loading">Loading...</div>`
          : this._error ? html`<div class="error">${this._error}</div>`
          : (!this._data || this._data.length === 0) && !this._loading ? html`<div class="no-data">No history data</div>`
          : html`<div class="chart-wrap"></div>`
        }
      </div>
    `;
  }
}

customElements.define('attribute-chart', AttributeChart);

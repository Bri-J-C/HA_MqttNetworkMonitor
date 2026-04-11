import { html } from 'lit';

const ICONS = {
  linux: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  windows: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .08V5.98L20 3zm-10 9.04l10 .12V21l-10-1.91v-5.05zM3 13l6 .09v6.72l-6-1.01V13z"/></svg>`,
  laptop: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`,
  esp32: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
  server: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>`,
  generic: (size) => html`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`,
};

const COLORS = {
  linux:   '#ffb74d',
  windows: '#4fc3f7',
  laptop:  '#4fc3f7',
  esp32:   '#04d65c',
  server:  '#b388ff',
  generic: 'rgba(255,255,255,0.4)',
};

const BADGES = {
  linux:   'LNX',
  windows: 'WIN',
  laptop:  'WIN',
  esp32:   'ESP',
  server:  'SRV',
  generic: '',
};

const BADGE_CLASSES = {
  linux:   'badge-linux',
  windows: 'badge-windows',
  laptop:  'badge-windows',
  esp32:   'badge-esp32',
  server:  'badge-server',
  generic: 'badge-generic',
};

/**
 * Maps a device_type string to a canonical icon key.
 * @param {string} deviceType
 * @returns {string} icon key
 */
export function resolveIconKey(deviceType) {
  const t = (deviceType || '').toLowerCase();
  if (t.includes('linux') || t === 'raspberry_pi') return 'linux';
  if (t.includes('windows')) return 'windows';
  if (t.includes('laptop')) return 'laptop';
  if (t.includes('esp') || t.includes('intercom')) return 'esp32';
  if (t.includes('server') || t.includes('nas')) return 'server';
  return 'generic';
}

/**
 * Returns a 16px SVG Lit html template for dashboard cards.
 * @param {string} deviceType
 * @returns {import('lit').TemplateResult}
 */
export function getDeviceIcon(deviceType) {
  const key = resolveIconKey(deviceType);
  return ICONS[key](16);
}

/**
 * Returns a 24px SVG Lit html template for topology nodes.
 * @param {string} deviceType
 * @returns {import('lit').TemplateResult}
 */
export function getDeviceIconLarge(deviceType) {
  const key = resolveIconKey(deviceType);
  return ICONS[key](24);
}

/**
 * Returns the hex color for the given device type.
 * @param {string} deviceType
 * @returns {string}
 */
export function getDeviceColor(deviceType) {
  return COLORS[resolveIconKey(deviceType)];
}

/**
 * Returns abbreviated badge text (e.g. LNX, WIN, ESP).
 * @param {string} deviceType
 * @returns {string}
 */
export function getDeviceBadge(deviceType) {
  return BADGES[resolveIconKey(deviceType)];
}

/**
 * Returns the CSS class name for the type badge.
 * @param {string} deviceType
 * @returns {string}
 */
export function getTypeBadgeClass(deviceType) {
  return BADGE_CLASSES[resolveIconKey(deviceType)];
}

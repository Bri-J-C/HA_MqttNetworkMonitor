# Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement configurable fonts (Outfit + JetBrains Mono default), device type icons with colored badges, compact attribute cards with cog popover, group policy badges, and topology fixes.

**Architecture:** All changes are frontend-only (Lit web components) except device icon storage (server-side JSON). Font preferences and icon mappings are stored in settings via the existing settings API. The attribute card redesign replaces inline threshold/transform/toggle controls with a popover component.

**Tech Stack:** Lit 3.x, CSS custom properties, Google Fonts, SVG icons, existing FastAPI settings API

---

## File Map

### New Files
- `frontend/src/components/attribute-popover.js` — Cog popover component for attribute settings
- `frontend/src/utils/device-icons.js` — Default icon SVGs and type-to-icon mapping logic

### Modified Files
- `frontend/dist/index.html` — Add Google Fonts `<link>`
- `frontend/src/styles/shared.js` — Add `--font-display` and `--font-data` CSS variables
- `frontend/src/app.js` — Load font preferences from settings, apply as CSS vars
- `frontend/src/components/device-card.js` — Add type icon next to name, type badge, use font vars
- `frontend/src/components/device-attributes.js` — Replace inline controls with compact card + cog popover
- `frontend/src/components/topology-view.js` — Add icons to nodes, user-select: none, wire device-select event
- `frontend/src/components/settings-view.js` — Add Theme section (font dropdowns), Device Icons section

---

### Task 1: Add Google Fonts and CSS Variables

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/dist/index.html`
- Modify: `mqtt-network-monitor-addon/frontend/src/styles/shared.js`

- [ ] **Step 1: Add Google Fonts link to index.html**

In `dist/index.html`, add before the `<style>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add font CSS variables to shared.js**

In `mqtt-network-monitor-addon/frontend/src/styles/shared.js`, add to the `:host` block after `--transition`:

```css
    --font-display: 'Outfit', sans-serif;
    --font-data: 'JetBrains Mono', monospace;
```

- [ ] **Step 3: Apply font-family to body in index.html**

In `dist/index.html`, update the `body` style rule to use the display font:

```css
body { margin: 0; background: #0a0a1a; font-family: var(--font-display, 'Outfit', sans-serif); }
```

- [ ] **Step 4: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`
Expected: Bundle builds without errors.

- [ ] **Step 5: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/dist/index.html mqtt-network-monitor-addon/frontend/src/styles/shared.js
git commit -m "feat: add configurable font CSS variables with Outfit + JetBrains Mono defaults"
```

---

### Task 2: Create Device Icons Utility

**Files:**
- Create: `mqtt-network-monitor-addon/frontend/src/utils/device-icons.js`

- [ ] **Step 1: Create the icon mapping module**

```javascript
import { svg } from 'lit';

// Default SVG icons per device type
const ICON_SVGS = {
  linux: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  windows: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .08V5.98L20 3zm-10 9.04l10 .12V21l-10-1.91v-5.05zM3 13l6 .09v6.72l-6-1.01V13z"/></svg>`,
  laptop: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>`,
  esp32: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
  server: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>`,
  generic: svg`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`,
};

// Large icons for topology nodes (24px)
const ICON_SVGS_LARGE = Object.fromEntries(
  Object.entries(ICON_SVGS).map(([k, v]) => [
    k,
    svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${v.values[0].values[0]}</svg>`,
  ])
);

const TYPE_COLORS = {
  linux: '#ffb74d',
  windows: '#4fc3f7',
  laptop: '#4fc3f7',
  esp32: '#04d65c',
  ha_intercom: '#04d65c',
  server: '#b388ff',
  generic: 'rgba(255,255,255,0.4)',
};

const TYPE_BADGES = {
  linux: 'LNX',
  windows: 'WIN',
  laptop: 'WIN',
  esp32: 'ESP',
  ha_intercom: 'ESP',
  server: 'SRV',
  generic: '',
};

/**
 * Resolve a device_type string to its icon key.
 * Handles subtypes like "ha_intercom" -> esp32 icon.
 */
export function resolveIconKey(deviceType) {
  if (!deviceType) return 'generic';
  const t = deviceType.toLowerCase();
  if (t.includes('linux') || t === 'raspberry_pi') return 'linux';
  if (t.includes('windows')) return 'windows';
  if (t.includes('esp') || t.includes('intercom')) return 'esp32';
  if (t.includes('server') || t.includes('nas')) return 'server';
  return 'generic';
}

export function getDeviceIcon(deviceType, large = false) {
  const key = resolveIconKey(deviceType);
  return large ? (ICON_SVGS_LARGE[key] || ICON_SVGS_LARGE.generic) : (ICON_SVGS[key] || ICON_SVGS.generic);
}

export function getDeviceColor(deviceType) {
  const key = resolveIconKey(deviceType);
  return TYPE_COLORS[key] || TYPE_COLORS.generic;
}

export function getDeviceBadge(deviceType) {
  const key = resolveIconKey(deviceType);
  return TYPE_BADGES[key] || '';
}

export function getTypeBadgeClass(deviceType) {
  const key = resolveIconKey(deviceType);
  if (key === 'linux') return 'linux';
  if (key === 'windows' || key === 'laptop') return 'windows';
  if (key === 'esp32') return 'esp';
  if (key === 'server') return 'server';
  return 'generic';
}
```

- [ ] **Step 2: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/utils/device-icons.js
git commit -m "feat: add device icon utility with default SVG icons and type mapping"
```

---

### Task 3: Update Device Cards with Icons and Type Badges

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/src/components/device-card.js`

- [ ] **Step 1: Read device-card.js**

Read the full file to understand the current render method and CSS.

- [ ] **Step 2: Add icon import and update render**

Add import at top:
```javascript
import { getDeviceIcon, getDeviceColor, getTypeBadgeClass } from '../utils/device-icons.js';
```

Update the CSS to add font variables, type badge styles, and icon styling:
- Add `font-family: var(--font-display);` to `:host`
- Add `.attr-value { font-family: var(--font-data); }` for monospace data values
- Add type badge CSS (same as mockup: colored background pill)
- Add `.type-icon { color: var(--type-color); }` for icon coloring
- Add `.name-row { display: flex; align-items: center; gap: 8px; }`

Update the render method:
- Wrap name + icon in a `.name-row` flex container
- Add icon after name: `<span class="type-icon" style="color: ${typeColor}">${getDeviceIcon(d.device_type)}</span>`
- Replace plain text device type with badge: `<span class="type-badge ${badgeClass}">${d.device_type || 'unknown'}</span>`

- [ ] **Step 3: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 4: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/device-card.js
git commit -m "feat: add device type icons and colored badges to device cards"
```

---

### Task 4: Create Attribute Popover Component

**Files:**
- Create: `mqtt-network-monitor-addon/frontend/src/components/attribute-popover.js`

- [ ] **Step 1: Create the popover component**

Create a Lit component that renders a floating popover with:
- Title (attribute name + "Settings")
- Warning threshold: operator `<select>` + value `<input>`
- Critical threshold: operator `<select>` + value `<input>`
- Divider
- Transform: `<select>` dropdown with available transforms
- Divider
- HA Exposure toggle (green `#04d65c`, not cyan)
- Pin to Card toggle
- Divider
- "View History" link

The component accepts properties:
- `attrName` — attribute name
- `warnOp`, `warnValue` — current warning threshold
- `critOp`, `critValue` — current critical threshold
- `transform` — current transform name
- `transforms` — list of available transforms
- `haExposed` — boolean
- `pinned` — boolean
- `thresholdSource` — "global" / "group" / "device"

Events fired:
- `threshold-changed` — `{ name, value, op, level: 'warn'|'crit' }`
- `transform-changed` — `{ attr, transform }`
- `ha-exposure-toggled` — `{ name }`
- `pin-toggled` — `{ name, pinned }`
- `view-history` — `{ name }`
- `close` — popover close requested

CSS: Position absolute, opens down-right, arrow top-left, dark background `#161630`, border `rgba(255,255,255,0.1)`, shadow, 240px wide.

The popover should close when clicking outside. Use a `click` listener on `document` that checks if the click target is inside the popover.

- [ ] **Step 2: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 3: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/attribute-popover.js
git commit -m "feat: add attribute settings popover component"
```

---

### Task 5: Redesign Attribute Tiles

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/src/components/device-attributes.js`

This is the largest task — replacing the inline threshold/transform/toggle controls with the compact card + cog popover.

- [ ] **Step 1: Read device-attributes.js thoroughly**

Read the full file. Understand:
- `_renderAttrTile` method (lines 296-420)
- How thresholds are currently rendered inline (lines 345-388)
- How the transform dropdown works (lines 390-402)
- How the HA toggle works (lines 330-340)
- How events are dispatched (threshold-changed, transform-changed, etc.)
- How the history chart expand works (lines 403-417)

- [ ] **Step 2: Import the popover component**

Add at top of device-attributes.js:
```javascript
import './attribute-popover.js';
```

- [ ] **Step 3: Add popover state tracking**

Add a reactive property for which attribute's popover is open:
```javascript
_openPopover: { type: String, state: true },  // attribute name or null
```

- [ ] **Step 4: Update the CSS**

Replace the threshold/transform/toggle CSS with compact tile styles:
- Remove `.attr-thresholds`, `.attr-threshold-row`, `.threshold-inline`, `.threshold-label`, `.threshold-op`, `.threshold-source` CSS
- Remove `.attr-transform`, `.transform-select`, `.transform-label`, `.transform-source` CSS
- Remove `.toggle-wrap`, `.toggle`, `.toggle-knob` CSS
- Add `.attr-tile.ok { border: 1px solid #04d65c; }` (new — green border for healthy)
- Keep existing `.attr-tile.exceeded { border: 1px solid #ffb74d; }` and `.attr-tile.critical { border: 1px solid #ef5350; }`
- Add `.val-row { display: flex; justify-content: space-between; align-items: baseline; }`
- Add `.attr-cog` styles (color: rgba(255,255,255,0.55), hover: #00D4FF)
- Add `.attr-val { font-family: var(--font-data); }` for monospace values
- Move pin to right of label: `.attr-label { display: flex; align-items: center; gap: 4px; }`
- Position delete (×) absolute top-right
- Add `.popover-anchor { position: relative; }`

- [ ] **Step 5: Rewrite _renderAttrTile**

Replace the method to render the compact card:

```javascript
_renderAttrTile(name, data, isExposed, thresholds, critThresholds, source, critSource) {
  const transform = this.attributeTransforms?.[name] || this.groupTransforms?.[name] || '';
  const displayVal = transform ? applyTransform(data.value, transform) : data.value;
  const unit = transform ? '' : (data.unit || '');
  const warnThresh = thresholds?.[name];
  const critThresh = critThresholds?.[name];
  const hasThresholds = warnThresh != null || critThresh != null;
  const isPinned = (this.cardAttributes || []).includes(name);

  // Determine border status
  let tileClass = 'attr-tile';
  if (/* critical check */) tileClass += ' critical';
  else if (/* warning check */) tileClass += ' exceeded';
  else if (hasThresholds) tileClass += ' ok';

  return html`
    <div class="${tileClass}">
      <span class="attr-delete" @click=${() => this._onDelete(name)}>×</span>
      <div class="attr-label">
        ${name.replace(/_/g, ' ')}
        ${isPinned ? html`<span class="attr-pin pinned">📌</span>` : ''}
      </div>
      <div class="val-row">
        <div class="attr-val ${exceededClass}">${displayVal}<span class="attr-unit">${unit}</span></div>
        <div class="popover-anchor">
          <span class="attr-cog" @click=${() => this._togglePopover(name)}>⚙</span>
          ${this._openPopover === name ? html`
            <attribute-popover
              .attrName=${name}
              .warnOp=${/* extract op */}
              .warnValue=${/* extract value */}
              .critOp=${/* extract op */}
              .critValue=${/* extract value */}
              .transform=${transform}
              .transforms=${getAllTransforms()}
              .haExposed=${isExposed}
              .pinned=${isPinned}
              @threshold-changed=${this._onThresholdChanged}
              @transform-changed=${this._onTransformChanged}
              @ha-exposure-toggled=${this._onHaToggled}
              @pin-toggled=${this._onPinToggled}
              @view-history=${this._onViewHistory}
              @close=${() => this._openPopover = null}
            ></attribute-popover>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
```

**IMPORTANT:** Read the actual existing method carefully. The threshold check logic, event dispatching, and data structure must match what's already there. The above is a structural template — adapt the actual threshold comparison and event names from the existing code.

- [ ] **Step 6: Add popover toggle and close-on-outside-click**

```javascript
_togglePopover(name) {
  this._openPopover = this._openPopover === name ? null : name;
}

connectedCallback() {
  super.connectedCallback();
  this._closePopoverBound = (e) => {
    if (this._openPopover && !e.composedPath().some(el => el.tagName === 'ATTRIBUTE-POPOVER' || el.classList?.contains('attr-cog'))) {
      this._openPopover = null;
    }
  };
  document.addEventListener('click', this._closePopoverBound);
}

disconnectedCallback() {
  super.disconnectedCallback();
  document.removeEventListener('click', this._closePopoverBound);
}
```

- [ ] **Step 7: Wire up popover events to existing handlers**

Map popover events to the existing event dispatch pattern already in device-attributes.js. The parent component (device-detail.js) already listens for these events — the popover just needs to fire the same ones.

- [ ] **Step 8: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 9: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/device-attributes.js
git commit -m "feat: redesign attribute tiles with compact layout and cog popover"
```

---

### Task 6: Update Topology View — Icons, User-Select, Device Click

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/src/components/topology-view.js`

- [ ] **Step 1: Read the _renderNode method and node click handling**

Read `topology-view.js` focusing on:
- `_renderNode` (lines 570-610)
- `_onNodeClick` method
- How the `device-select` event is dispatched (if at all)

- [ ] **Step 2: Add user-select: none to node CSS**

In the static styles, find the node-related CSS and add:
```css
.node text, .node-label, .node rect, .gateway text {
  user-select: none;
  -webkit-user-select: none;
}
```

- [ ] **Step 3: Add device icon and type badge to nodes**

Import the icon utility:
```javascript
import { getDeviceIcon, getDeviceColor, getDeviceBadge, getTypeBadgeClass } from '../utils/device-icons.js';
```

In `_renderNode`, add the icon SVG inside the node and a corner type badge. The topology uses SVG, so the icon needs to be embedded as SVG `<foreignObject>` or as SVG paths directly.

- [ ] **Step 4: Wire device-select event on node click**

If `_onNodeClick` doesn't already dispatch `device-select`, update it to:
```javascript
this.dispatchEvent(new CustomEvent('device-select', {
  detail: { deviceId: nodeId },
  bubbles: true, composed: true,
}));
```

This should only fire when NOT in edit mode. In edit mode, clicks start drag operations.

- [ ] **Step 5: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 6: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/topology-view.js
git commit -m "feat: add icons to topology nodes, fix text selection, wire device click"
```

---

### Task 7: Add Font and Icon Settings to Settings Page

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/src/components/settings-view.js`
- Modify: `mqtt-network-monitor-addon/frontend/src/app.js`

- [ ] **Step 1: Add Theme section to settings-view.js**

Read settings-view.js first. Add a new "Theme" section before the existing sections in the render method:

```javascript
_renderThemeSection() {
  const fontOptions = [
    { value: "'Outfit', sans-serif", label: 'Outfit' },
    { value: "'IBM Plex Sans', sans-serif", label: 'IBM Plex Sans' },
    { value: "'DM Sans', sans-serif", label: 'DM Sans' },
    { value: "'Nunito Sans', sans-serif", label: 'Nunito Sans' },
    { value: 'system-ui, sans-serif', label: 'System Default' },
  ];
  const monoOptions = [
    { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
    { value: "'IBM Plex Mono', monospace", label: 'IBM Plex Mono' },
    { value: "'Fira Code', monospace", label: 'Fira Code' },
    { value: "'Source Code Pro', monospace", label: 'Source Code Pro' },
    { value: 'monospace', label: 'System Default' },
  ];

  return html`
    <div class="section">
      <div class="section-title">Theme</div>
      <div class="setting-row">
        <label>Display Font</label>
        <select @change=${(e) => this._updateFont('display_font', e.target.value)}>
          ${fontOptions.map(f => html`<option value="${f.value}" ?selected=${this._settings?.display_font === f.value}>${f.label}</option>`)}
        </select>
      </div>
      <div class="setting-row">
        <label>Data Font</label>
        <select @change=${(e) => this._updateFont('data_font', e.target.value)}>
          ${monoOptions.map(f => html`<option value="${f.value}" ?selected=${this._settings?.data_font === f.value}>${f.label}</option>`)}
        </select>
      </div>
    </div>
  `;
}
```

- [ ] **Step 2: Add _updateFont method**

```javascript
async _updateFont(key, value) {
  await updateSettings({ [key]: value });
  // Apply immediately to the page
  const root = document.querySelector('network-monitor-app');
  if (key === 'display_font') root?.style.setProperty('--font-display', value);
  if (key === 'data_font') root?.style.setProperty('--font-data', value);
}
```

- [ ] **Step 3: Update app.js to load font settings on startup**

In `app.js`, in the `connectedCallback` where settings are loaded, add font application:

```javascript
fetchSettings().then(s => {
  if (s?.custom_transforms) setCustomTransforms(s.custom_transforms);
  if (s?.display_font) this.style.setProperty('--font-display', s.display_font);
  if (s?.data_font) this.style.setProperty('--font-data', s.data_font);
}).catch(() => {});
```

- [ ] **Step 4: Add `display_font` and `data_font` to the server's ALLOWED_SETTINGS_KEYS**

In `mqtt-network-monitor-addon/server/settings_manager.py`, add to `ALLOWED_SETTINGS_KEYS`:
```python
"display_font", "data_font",
```

- [ ] **Step 5: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 6: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/settings-view.js mqtt-network-monitor-addon/frontend/src/app.js mqtt-network-monitor-addon/server/settings_manager.py
git commit -m "feat: add configurable font selection in settings"
```

---

### Task 8: Add Group Policy Badge to Device Cards

**Files:**
- Modify: `mqtt-network-monitor-addon/frontend/src/components/device-card.js`

- [ ] **Step 1: Add group policy badge CSS**

Add to the static styles in device-card.js:

```css
.group-badge {
  font-size: 9px;
  padding: 2px 7px;
  border-radius: 3px;
  background: rgba(179,136,255,0.12);
  color: #b388ff;
  font-family: var(--font-data);
  letter-spacing: 0.04em;
}
```

- [ ] **Step 2: Render the badge when device has group_policy**

In the render method, after the type badge, add:

```javascript
${d.group_policy ? html`<span class="group-badge">${this._getGroupName(d.group_policy)}</span>` : ''}
```

Add a helper method:
```javascript
_getGroupName(groupId) {
  // The device card receives the group_policy ID. Display it formatted.
  return groupId.replace(/_/g, ' ');
}
```

- [ ] **Step 3: Build and verify**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`

- [ ] **Step 4: Commit**

```bash
git add mqtt-network-monitor-addon/frontend/src/components/device-card.js
git commit -m "feat: add group policy badge to device cards"
```

---

### Task 9: Build, Deploy, and Verify

**Files:**
- All modified frontend files

- [ ] **Step 1: Full frontend build**

Run: `cd mqtt-network-monitor-addon/frontend && npx rollup -c`
Expected: Bundle builds successfully.

- [ ] **Step 2: Deploy to HA**

Run: `./deploy.sh`

- [ ] **Step 3: Verify in browser**

Navigate to the add-on UI and check:
- Fonts are Outfit (labels) + JetBrains Mono (values)
- Device cards show type icons and colored badges
- Attribute tiles are compact with cog popover
- Topology nodes have icons and non-selectable text
- Clicking topology node opens device detail overlay
- Settings page has Theme section with font dropdowns
- Group policy badge appears on grouped devices

- [ ] **Step 4: Commit any fixes**

```bash
git add -A mqtt-network-monitor-addon/
git commit -m "chore: frontend redesign complete — fonts, icons, compact attribute cards"
```

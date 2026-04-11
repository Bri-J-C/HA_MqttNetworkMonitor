# Frontend Redesign: Fonts, Icons, and Attribute Cards

**Date:** 2026-04-10
**Scope:** Dashboard device cards, device detail attribute tiles, topology nodes, configurable fonts and icons

---

## 1. Configurable Font Pairing

**Default:** Outfit (display/labels/nav) + JetBrains Mono (data values/numbers/monospace)

**Where fonts apply:**
- **Outfit**: Nav bar, device names, section titles, labels, buttons, tags
- **JetBrains Mono**: Attribute values (percentages, IPs, durations), status badges, type badges, threshold values, code-like content

**Configuration:**
- Stored in global settings (`settings_manager`) as `{ display_font, data_font }`
- Settings page gets a "Theme" section with two dropdowns
- Pre-loaded options (loaded via Google Fonts in the HTML shell):
  - Display: Outfit, IBM Plex Sans, DM Sans, Nunito Sans, system default
  - Data: JetBrains Mono, IBM Plex Mono, Fira Code, Source Code Pro, system default
- Applied via CSS variables `--font-display` and `--font-data` on `:host`

**Implementation:**
- Add `<link>` for Google Fonts in `index.html` (all options pre-loaded for instant switching)
- Add `--font-display` and `--font-data` CSS variables to `shared.js`
- Update all components to use `var(--font-display)` and `var(--font-data)` instead of bare font-family or system defaults
- Settings API endpoint stores/retrieves font choices
- App.js reads settings on load and sets CSS variables on the root element

---

## 2. Device Type Icons

**Dashboard cards:**
- Small SVG icon (16px) appears to the right of the device name in the header row
- Device type shown below as a colored badge pill (not plain text)
- Color per type: amber for linux, blue for windows, green for esp32, gray for unknown

**Topology nodes:**
- Larger SVG icon (24px) inside the node, above the name
- Corner badge with abbreviated type (LNX, WIN, ESP)
- Same color scheme as dashboard
- `user-select: none` on all node text (existing bug fix)

**Default icon mapping:**
| Device Type | Icon | Color | Badge |
|-------------|------|-------|-------|
| linux | Globe/earth SVG | #ffb74d (amber) | LNX |
| windows | Windows logo SVG | #4fc3f7 (blue) | WIN |
| windows (laptop subtype) | Laptop SVG | #4fc3f7 (blue) | WIN |
| esp32 / ha_intercom | Bolt SVG | #04d65c (green) | ESP |
| unknown / other | Generic device SVG | rgba(255,255,255,0.4) | — |

**Configuration:**
- Stored server-side in `/data/device_icons.json`
- Settings page gets a "Device Icons" section
- Each device type entry: `{ type, icon_svg, color, badge_text }`
- Users can change the SVG (paste SVG markup or upload file), color, and badge text per type
- Custom SVGs stored in `/data/icons/` directory
- API endpoints: `GET/PUT /api/settings/device-icons`

**Topology node text fix:**
- Add `user-select: none` to all topology node elements (fixes the text-highlighting bug)

**Topology device click:**
- Clicking a device node in topology fires `device-select` event (same as dashboard cards)
- Opens the device detail overlay (already wired in app.js, just needs the event connected)

---

## 3. Attribute Card Redesign

**Card structure (collapsed — default state):**
```
┌─────────────────────────────┐
│ LABEL NAME         📌    ×  │  ← top row: label, pin (right of label), delete (top-right corner)
│ 31.5%                  ⚙   │  ← value row: value (left), cog (bottom-right)
└─────────────────────────────┘
```

**Border behavior:**
- `1px solid #04d65c` — thresholds set, value OK (bright green, same as device card status)
- `1px solid #ffb74d` — warning threshold crossed
- `1px solid #ef5350` — critical threshold crossed
- No colored border — no thresholds configured

**Value color:**
- `#00D4FF` (cyan) — normal
- `#ffb74d` (amber) — warning
- `#ef5350` (red) — critical

**Cog popover (opens down and to the right on click):**
```
┌──────────────────────────┐
│ CPU USAGE Settings       │  ← title
│                          │
│ Warning     [>] [85  ]   │  ← operator dropdown + value input
│ Critical    [>] [95  ]   │  ← operator dropdown + value input
│ ─────────────────────── │
│ Transform   [None     ▾] │  ← dropdown of available transforms
│ ─────────────────────── │
│ HA Exposure       [●──]  │  ← toggle (green, not cyan)
│ Pin to Card       [──●]  │  ← toggle
│ ─────────────────────── │
│       View History       │  ← link, opens chart
└──────────────────────────┘
```

- Arrow/caret points up-left toward the cog
- Clicking outside or another cog closes it
- Changes save immediately (same as current inline behavior)
- HA toggle uses green (`#04d65c`) not cyan to avoid competing with values

**What moves INTO the cog popover (removed from card surface):**
- Warning threshold operator + value inputs
- Critical threshold operator + value inputs
- Transform dropdown
- HA exposure toggle
- Pin to card toggle (currently the 📌 icon — stays on card surface as visual indicator, but toggle is in popover)
- History link
- Threshold source indicator (global/group/device)

**What stays on the card surface:**
- Attribute label (uppercase)
- Pin indicator (📌 emoji, visual only — right of label)
- Delete button (× in top-right corner)
- Value with unit
- Cog icon (bottom-right of value row)
- Border color (reflects threshold status)

**TODO (future):** Group policy badge — visual tag on cards controlled by group policy. Purple color TBD.

---

## 4. Settings Page Changes

**Removed from settings page:**
- Per-attribute threshold editing (moved to cog popover on each attribute)
- Per-attribute transform editing (moved to cog popover)
- Per-attribute HA exposure toggles (moved to cog popover)

**Added to settings page:**
- "Theme" section with font dropdowns (display + data font)
- "Device Icons" section with type-to-icon mapping editor

**Remains on settings page:**
- Tag registry
- Custom transforms definitions (creating new transform expressions)
- Global default thresholds
- Group policy management
- Import/export

---

## Technical Notes

- Fonts loaded via Google Fonts `<link>` in `index.html` — all options pre-loaded so switching is instant
- Font preference stored in settings, applied as CSS variables on `:host` of the app shell
- Device icons stored server-side in `/data/device_icons.json` with a default set
- Custom SVG upload via API, stored in `/data/icons/`
- Popover component can be reused across attribute tiles (single instance, repositioned)
- Topology `user-select: none` applied to `.node` elements in topology-view.js CSS

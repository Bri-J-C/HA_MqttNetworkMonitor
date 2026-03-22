// Detect ingress base path: when served via HA ingress, the URL looks like
// /api/hassio_ingress/TOKEN/ — we need to prefix all API calls with that path
function getBase() {
  const match = location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);
  return match ? match[1] : '';
}
const BASE = getBase();

export async function fetchDevices() {
  const res = await fetch(`${BASE}/api/devices`);
  return res.json();
}

export async function fetchDevice(id) {
  const res = await fetch(`${BASE}/api/devices/${id}`);
  return res.json();
}

export async function fetchTopology() {
  const res = await fetch(`${BASE}/api/topology`);
  return res.json();
}

export async function fetchLayouts() {
  const res = await fetch(`${BASE}/api/topology/layouts`);
  return res.json();
}

export async function saveLayout(layout) {
  const res = await fetch(`${BASE}/api/topology/layouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(layout),
  });
  return res.json();
}

export async function deleteLayout(id) {
  await fetch(`${BASE}/api/topology/layouts/${id}`, { method: 'DELETE' });
}

export async function sendCommand(deviceId, command, params = {}) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
  return res.json();
}

export async function fetchGroups() {
  const res = await fetch(`${BASE}/api/groups`);
  return res.json();
}

export async function createGroup(id, name, deviceIds = []) {
  const res = await fetch(`${BASE}/api/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, device_ids: deviceIds }),
  });
  return res.json();
}

export async function updateGroup(groupId, { name, device_ids }) {
  const res = await fetch(`${BASE}/api/groups/${groupId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, device_ids }),
  });
  return res.json();
}

export async function deleteGroup(groupId) {
  await fetch(`${BASE}/api/groups/${groupId}`, { method: 'DELETE' });
}

export async function setDeviceTags(deviceId, tags) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
  return res.json();
}

export async function addDeviceTags(deviceId, tags) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/tags/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
  return res.json();
}

export async function removeDeviceTag(deviceId, tag) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/tags/${tag}`, {
    method: 'DELETE',
  });
  return res.json();
}

// Tags
export async function fetchTags() {
  const res = await fetch(`${BASE}/api/tags`);
  return res.json();
}

export async function createTag(tag) {
  const res = await fetch(`${BASE}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag }),
  });
  return res.json();
}

export async function renameTag(oldTag, newName) {
  const res = await fetch(`${BASE}/api/tags/${encodeURIComponent(oldTag)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  });
  return res.json();
}

export async function deleteTag(tag) {
  await fetch(`${BASE}/api/tags/${encodeURIComponent(tag)}`, { method: 'DELETE' });
}

// Settings
export async function fetchSettings() {
  const res = await fetch(`${BASE}/api/settings`);
  return res.json();
}

export async function updateSettings(data) {
  const res = await fetch(`${BASE}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Device settings
export async function fetchEffectiveSettings(deviceId) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/effective-settings`);
  return res.json();
}

export async function updateDeviceSettings(deviceId, settings) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  return res.json();
}

export async function pushDeviceConfig(deviceId, config) {
  const res = await fetch(`${BASE}/api/devices/${deviceId}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  return res.json();
}

// Group operations
export async function sendGroupCommand(groupId, command, params = {}) {
  const res = await fetch(`${BASE}/api/groups/${groupId}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
  return res.json();
}

export async function pushGroupConfig(groupId, config) {
  const res = await fetch(`${BASE}/api/groups/${groupId}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  return res.json();
}

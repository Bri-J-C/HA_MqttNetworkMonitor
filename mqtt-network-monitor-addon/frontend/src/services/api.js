// Detect ingress base path: when served via HA ingress, the URL looks like
// /api/hassio_ingress/TOKEN/ — we need to prefix all API calls with that path
function getBase() {
  const match = location.pathname.match(/^(\/api\/hassio_ingress\/[^/]+)/);
  return match ? match[1] : '';
}
const BASE = getBase();

async function apiCall(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${text}`);
  }
  // Some endpoints return empty (DELETE), handle gracefully
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return null;
}

export async function fetchDevices(since = 0) {
  const url = since > 0 ? `${BASE}/api/devices?since=${since}` : `${BASE}/api/devices`;
  return apiCall(url);
}

export async function fetchDevice(id) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(id)}`);
}

export async function deleteDevice(id) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function deleteAttribute(deviceId, attrName) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/attributes/${encodeURIComponent(attrName)}`, { method: 'DELETE' });
}

export async function unhideAttribute(deviceId, attrName) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/attributes/${encodeURIComponent(attrName)}/unhide`, { method: 'POST' });
}

export async function hideCommand(deviceId, cmdName) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/commands/${encodeURIComponent(cmdName)}`, { method: 'DELETE' });
}

export async function unhideCommand(deviceId, cmdName) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/commands/${encodeURIComponent(cmdName)}/unhide`, { method: 'POST' });
}

export async function fetchTopology() {
  return apiCall(`${BASE}/api/topology`);
}

export async function fetchLayouts() {
  return apiCall(`${BASE}/api/topology/layouts`);
}

export async function saveLayout(layout) {
  return apiCall(`${BASE}/api/topology/layouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(layout),
  });
}

export async function deleteLayout(id) {
  return apiCall(`${BASE}/api/topology/layouts/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function sendCommand(deviceId, command, params = {}) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
}

export async function fetchGroups() {
  return apiCall(`${BASE}/api/groups`);
}

export async function createGroup(id, name, deviceIds = []) {
  return apiCall(`${BASE}/api/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, device_ids: deviceIds }),
  });
}

export async function updateGroup(groupId, data) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteGroup(groupId) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}`, { method: 'DELETE' });
}

export async function setDeviceTags(deviceId, tags) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
}

export async function addDeviceTags(deviceId, tags) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
}

export async function removeDeviceTag(deviceId, tag) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags/${encodeURIComponent(tag)}`, {
    method: 'DELETE',
  });
}

// Tags
export async function fetchTags() {
  return apiCall(`${BASE}/api/tags`);
}

export async function createTag(tag) {
  return apiCall(`${BASE}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag }),
  });
}

export async function renameTag(oldTag, newName) {
  return apiCall(`${BASE}/api/tags/${encodeURIComponent(oldTag)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ new_name: newName }),
  });
}

export async function deleteTag(tag) {
  return apiCall(`${BASE}/api/tags/${encodeURIComponent(tag)}`, { method: 'DELETE' });
}

// Settings
export async function fetchSettings() {
  return apiCall(`${BASE}/api/settings`);
}

export async function updateSettings(data) {
  return apiCall(`${BASE}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function exportSettings() {
  return apiCall(`${BASE}/api/settings/export`);
}

export async function importSettings(data) {
  return apiCall(`${BASE}/api/settings/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// Device settings
export async function fetchEffectiveSettings(deviceId) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/effective-settings`);
}

export async function updateDeviceSettings(deviceId, settings) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
}

export async function pushDeviceConfig(deviceId, config) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
}

// Group operations
export async function sendGroupCommand(groupId, command, params = {}) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
}

export async function pushGroupConfig(groupId, config) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
}

export async function forceApplyGroup(groupId) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/force-apply`, {
    method: 'POST',
  });
}

export async function checkGroupConflicts(groupId, newDeviceId = null) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/check-conflicts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDeviceId ? { new_device_id: newDeviceId } : {}),
  });
}

// Device server commands
export async function addServerCommand(deviceId, name, shell) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-commands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, shell }),
  });
}

export async function removeServerCommand(deviceId, name) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-commands/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}

// Device server sensors
export async function addServerSensor(deviceId, name, sensor) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-sensors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ...sensor }),
  });
}

export async function removeServerSensor(deviceId, name) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-sensors/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
}

// Device config interval
export async function setDeviceInterval(deviceId, interval) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/config-interval`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interval }),
  });
}

export async function fetchAttributeHistory(deviceId, attrName, hours = 24) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/history/${encodeURIComponent(attrName)}?hours=${hours}`);
}

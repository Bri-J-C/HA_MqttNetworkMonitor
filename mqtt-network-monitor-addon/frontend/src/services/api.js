import { toast } from '../components/toast-notification.js';

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

/** Wrap a mutating API call with toast error feedback. */
function withToast(label, fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      toast.error(`${label}: ${err.message}`);
      throw err;
    }
  };
}

export async function fetchDevices(since = 0) {
  const url = since > 0 ? `${BASE}/api/devices?since=${since}` : `${BASE}/api/devices`;
  return apiCall(url);
}

export async function fetchDevice(id) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(id)}`);
}

export const deleteDevice = withToast('Delete device failed', async (id) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(id)}`, { method: 'DELETE' });
});

export const deleteAttribute = withToast('Delete attribute failed', async (deviceId, attrName) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/attributes/${encodeURIComponent(attrName)}`, { method: 'DELETE' });
});

export const unhideAttribute = withToast('Unhide attribute failed', async (deviceId, attrName) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/attributes/${encodeURIComponent(attrName)}/unhide`, { method: 'POST' });
});

export const hideCommand = withToast('Hide command failed', async (deviceId, cmdName) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/commands/${encodeURIComponent(cmdName)}`, { method: 'DELETE' });
});

export const unhideCommand = withToast('Unhide command failed', async (deviceId, cmdName) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/commands/${encodeURIComponent(cmdName)}/unhide`, { method: 'POST' });
});

export async function fetchTopology() {
  return apiCall(`${BASE}/api/topology`);
}

export async function fetchLayouts() {
  return apiCall(`${BASE}/api/topology/layouts`);
}

export const saveLayout = withToast('Save layout failed', async (layout) => {
  return apiCall(`${BASE}/api/topology/layouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(layout),
  });
});

export const deleteLayout = withToast('Delete layout failed', async (id) => {
  return apiCall(`${BASE}/api/topology/layouts/${encodeURIComponent(id)}`, { method: 'DELETE' });
});

export const sendCommand = withToast('Send command failed', async (deviceId, command, params = {}) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
});

export async function fetchGroups() {
  return apiCall(`${BASE}/api/groups`);
}

export const createGroup = withToast('Create group failed', async (id, name, deviceIds = []) => {
  return apiCall(`${BASE}/api/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, device_ids: deviceIds }),
  });
});

export const updateGroup = withToast('Update group failed', async (groupId, data) => {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
});

export const deleteGroup = withToast('Delete group failed', async (groupId) => {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}`, { method: 'DELETE' });
});

export const setDeviceTags = withToast('Set device tags failed', async (deviceId, tags) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
});

export const addDeviceTags = withToast('Add device tags failed', async (deviceId, tags) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  });
});

export const removeDeviceTag = withToast('Remove tag failed', async (deviceId, tag) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/tags/${encodeURIComponent(tag)}`, {
    method: 'DELETE',
  });
});

// Tags
export async function fetchTags() {
  return apiCall(`${BASE}/api/tags`);
}

export const createTag = withToast('Create tag failed', async (tag) => {
  return apiCall(`${BASE}/api/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag }),
  });
});

export const renameTag = withToast('Rename tag failed', async (oldTag, newName) => {
  return apiCall(`${BASE}/api/tags/${encodeURIComponent(oldTag)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ new_name: newName }),
  });
});

export const deleteTag = withToast('Delete tag failed', async (tag) => {
  return apiCall(`${BASE}/api/tags/${encodeURIComponent(tag)}`, { method: 'DELETE' });
});

// Settings
export async function fetchSettings() {
  return apiCall(`${BASE}/api/settings`);
}

export const updateSettings = withToast('Save settings failed', async (data) => {
  return apiCall(`${BASE}/api/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
});

export async function exportSettings() {
  return apiCall(`${BASE}/api/settings/export`);
}

export const importSettings = withToast('Import settings failed', async (data) => {
  return apiCall(`${BASE}/api/settings/import`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
});

// Device settings
export async function fetchEffectiveSettings(deviceId) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/effective-settings`);
}

export const updateDeviceSettings = withToast('Save device settings failed', async (deviceId, settings) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
});

export const pushDeviceConfig = withToast('Push config failed', async (deviceId, config) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
});

// Group operations
export const sendGroupCommand = withToast('Send group command failed', async (groupId, command, params = {}) => {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, params }),
  });
});

export const pushGroupConfig = withToast('Push group config failed', async (groupId, config) => {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/push-config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
});

export const forceApplyGroup = withToast('Force apply group failed', async (groupId) => {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/force-apply`, {
    method: 'POST',
  });
});

export async function checkGroupConflicts(groupId, newDeviceId = null) {
  return apiCall(`${BASE}/api/groups/${encodeURIComponent(groupId)}/check-conflicts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDeviceId ? { new_device_id: newDeviceId } : {}),
  });
}

// Device server commands
export const addServerCommand = withToast('Add server command failed', async (deviceId, name, shell) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-commands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, shell }),
  });
});

export const removeServerCommand = withToast('Remove server command failed', async (deviceId, name) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-commands/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
});

// Device server sensors
export const addServerSensor = withToast('Add server sensor failed', async (deviceId, name, sensor) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-sensors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, ...sensor }),
  });
});

export const removeServerSensor = withToast('Remove server sensor failed', async (deviceId, name) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/server-sensors/${encodeURIComponent(name)}`, {
    method: 'DELETE',
  });
});

// Device config interval
export const setDeviceInterval = withToast('Set device interval failed', async (deviceId, interval) => {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/config-interval`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interval }),
  });
});

export async function fetchAttributeHistory(deviceId, attrName, hours = 24) {
  return apiCall(`${BASE}/api/devices/${encodeURIComponent(deviceId)}/history/${encodeURIComponent(attrName)}?hours=${hours}`);
}

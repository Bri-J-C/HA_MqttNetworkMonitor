const BASE = '';

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

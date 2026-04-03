export function applyTransform(value, transform) {
  if (value == null || !transform) return value;

  if (transform === 'duration') {
    const secs = Number(value);
    if (isNaN(secs)) return value;
    const parts = [];
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (d) parts.push(`${d}d`);
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    if (!parts.length) parts.push(`${s}s`);
    return parts.join(' ');
  }

  if (transform === 'bytes') {
    const b = Number(value);
    if (isNaN(b)) return value;
    if (b >= 1e12) return (b / 1e12).toFixed(1) + ' TB';
    if (b >= 1e9) return (b / 1e9).toFixed(1) + ' GB';
    if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB';
    if (b >= 1e3) return (b / 1e3).toFixed(1) + ' KB';
    return b + ' B';
  }

  if (transform === 'percentage') {
    const n = Number(value);
    if (isNaN(n)) return value;
    return (n * 100).toFixed(1) + '%';
  }

  if (transform.startsWith('round:')) {
    const digits = parseInt(transform.split(':')[1]) || 0;
    const n = Number(value);
    if (isNaN(n)) return value;
    return n.toFixed(digits);
  }

  if (transform.startsWith('prefix:')) {
    return transform.slice(7) + value;
  }

  if (transform.startsWith('suffix:')) {
    return value + transform.slice(7);
  }

  if (transform.startsWith('custom:')) {
    const ct = _customTransforms.find(t => t.id === transform);
    if (ct) {
      try {
        return new Function('value', 'return (' + ct.expression + ')')(value);
      } catch {
        return value;
      }
    }
  }

  return value;
}

let _customTransforms = [];

export function setCustomTransforms(transforms) {
  _customTransforms = Array.isArray(transforms) ? transforms : [];
}

export function getCustomTransforms() {
  return _customTransforms;
}

export function getAllTransforms() {
  const custom = _customTransforms.map(t => ({
    value: t.id,
    label: t.name,
  }));
  return [...AVAILABLE_TRANSFORMS, ...custom];
}

export const AVAILABLE_TRANSFORMS = [
  { value: '', label: 'None' },
  { value: 'duration', label: 'Duration (seconds \u2192 2d 5h)' },
  { value: 'bytes', label: 'Bytes (\u2192 KB/MB/GB)' },
  { value: 'percentage', label: 'Percentage (0-1 \u2192 %)' },
  { value: 'round:0', label: 'Round (0 decimals)' },
  { value: 'round:1', label: 'Round (1 decimal)' },
  { value: 'round:2', label: 'Round (2 decimals)' },
];

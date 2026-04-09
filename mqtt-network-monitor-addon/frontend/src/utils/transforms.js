/**
 * Safe expression evaluator -- only allows math operations on `value`.
 * Supports: +, -, *, /, %, >, <, >=, <=, ==, !=, ternary, parens,
 * Math.round/floor/ceil/abs/min/max/pow, .toFixed(n), number/string literals.
 */
export function safeEval(expression, value) {
  const tokens = tokenize(expression);
  let pos = 0;

  function peek() { return tokens[pos]; }
  function consume(expected) {
    const t = tokens[pos++];
    if (expected && t !== expected) throw new Error(`Expected ${expected}, got ${t}`);
    return t;
  }

  function parseTernary() {
    let result = parseComparison();
    if (peek() === '?') {
      consume('?');
      const trueVal = parseTernary();
      consume(':');
      const falseVal = parseTernary();
      return result ? trueVal : falseVal;
    }
    return result;
  }

  function parseComparison() {
    let left = parseAddSub();
    const op = peek();
    if (['>', '<', '>=', '<=', '==', '!='].includes(op)) {
      consume();
      const right = parseAddSub();
      switch (op) {
        case '>': return left > right;
        case '<': return left < right;
        case '>=': return left >= right;
        case '<=': return left <= right;
        case '==': return left == right;
        case '!=': return left != right;
      }
    }
    return left;
  }

  function parseAddSub() {
    let left = parseMulDiv();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseMulDiv();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  function parseMulDiv() {
    let left = parseUnary();
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = consume();
      const right = parseUnary();
      if (op === '*') left = left * right;
      else if (op === '/') left = right !== 0 ? left / right : 0;
      else left = left % right;
    }
    return left;
  }

  function parseUnary() {
    if (peek() === '-') { consume(); return -parsePostfix(); }
    if (peek() === '+') { consume(); return +parsePostfix(); }
    return parsePostfix();
  }

  function parsePostfix() {
    let val = parsePrimary();
    while (peek() === '.') {
      consume('.');
      const method = consume();
      if (method === 'toFixed') {
        consume('(');
        const digits = parseTernary();
        consume(')');
        val = Number(val).toFixed(digits);
      } else {
        throw new Error(`Unknown method: ${method}`);
      }
    }
    return val;
  }

  function parsePrimary() {
    const t = peek();
    if (t === '(') {
      consume('(');
      const val = parseTernary();
      consume(')');
      return val;
    }
    if (t === 'value') { consume(); return value; }
    if (t === 'Math') {
      consume();
      consume('.');
      const fn = consume();
      const allowed = { round: Math.round, floor: Math.floor, ceil: Math.ceil,
                        abs: Math.abs, min: Math.min, max: Math.max, pow: Math.pow };
      if (!allowed[fn]) throw new Error(`Unknown Math function: ${fn}`);
      consume('(');
      const args = [parseTernary()];
      while (peek() === ',') { consume(); args.push(parseTernary()); }
      consume(')');
      return allowed[fn](...args);
    }
    // String literal
    if (typeof t === 'string' && (t.startsWith("'") || t.startsWith('"'))) {
      consume();
      return t.slice(1, -1);
    }
    // Number literal
    const num = Number(t);
    if (!isNaN(num) && t !== undefined) { consume(); return num; }
    throw new Error(`Unexpected token: ${t}`);
  }

  function tokenize(expr) {
    const re = /\s*(>=|<=|==|!=|[+\-*/%().,?:><]|Math|value|toFixed|\d+\.?\d*|'[^']*'|"[^"]*"|[a-zA-Z_]\w*)\s*/g;
    const result = [];
    let m;
    while ((m = re.exec(expr)) !== null) {
      result.push(m[1]);
    }
    return result;
  }

  const result = parseTernary();
  if (pos < tokens.length) throw new Error(`Unexpected token: ${tokens[pos]}`);
  return result;
}

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
        return safeEval(ct.expression, value);
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

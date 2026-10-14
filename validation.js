/* ═══════════ FORM VALIDATION HELPERS ═══════════ */
const Validators = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim()),
  phone: (v) => /^01\d{9}$/.test((v || '').trim()),
  password: (v) => (v || '').length >= 6,
  amount: (v) => !isNaN(v) && parseInt(v) > 0,
  trxId: (v) => (v || '').trim().length >= 4,
  url: (v) => {
    try { const u = new URL(v); return ['http:', 'https:', 'data:'].includes(u.protocol); }
    catch { return false; }
  }
};

function validateForm(fields) {
  for (const [key, { value, rules, label }] of Object.entries(fields)) {
    for (const rule of rules) {
      if (!rule.test(value)) {
        return { ok: false, field: key, message: rule.msg || `${label} is invalid` };
      }
    }
  }
  return { ok: true };
}
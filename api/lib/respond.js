// Shared API response helpers — structured JSON errors + rate-limit headers
// Error shape: { ok:false, error, code, message, hint, status, docs }

export const RATE_LIMIT = 120; // requests
export const RATE_WINDOW = 60; // seconds

export function apiHeaders(res, methods) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  const resetEpoch = Math.ceil(Date.now() / 1000) + RATE_WINDOW;
  res.setHeader('RateLimit-Policy', `${RATE_LIMIT};w=${RATE_WINDOW}`);
  res.setHeader('RateLimit', `limit=${RATE_LIMIT}, remaining=${RATE_LIMIT - 1}, reset=${RATE_WINDOW}`);
  res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT));
  res.setHeader('X-RateLimit-Remaining', String(RATE_LIMIT - 1));
  res.setHeader('X-RateLimit-Reset', String(resetEpoch));
}

export function sendError(res, status, code, message, hint) {
  if (status === 429) res.setHeader('Retry-After', String(RATE_WINDOW));
  return res.status(status).json({
    ok: false,
    error: message,
    code,
    message,
    hint: hint || 'See https://sikogami.vercel.app/docs for API usage.',
    status,
    docs: 'https://sikogami.vercel.app/docs'
  });
}

export function sendOk(res, data, status = 200) {
  return res.status(status).json({ ok: true, ...data });
}

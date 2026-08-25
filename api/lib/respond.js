// Shared API response helpers — structured JSON errors + rate-limit headers
// Error shape: { ok:false, error, code, message, hint, status, docs }

export const RATE_LIMIT = 120; // requests
export const RATE_WINDOW = 60; // seconds

export function apiHeaders(res, methods, req) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Mcp-Session-Id');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  const resetEpoch = Math.ceil(Date.now() / 1000) + RATE_WINDOW;
  res.setHeader('RateLimit-Policy', `${RATE_LIMIT};w=${RATE_WINDOW}`);
  res.setHeader('RateLimit', `limit=${RATE_LIMIT}, remaining=${RATE_LIMIT - 1}, reset=${RATE_WINDOW}`);
  res.setHeader('X-RateLimit-Limit', String(RATE_LIMIT));
  res.setHeader('X-RateLimit-Remaining', String(RATE_LIMIT - 1));
  res.setHeader('X-RateLimit-Reset', String(resetEpoch));
  // Versioning / deprecation policy (RFC 8594 Sunset, draft Deprecation)
  res.setHeader('API-Version', 'v1');
  res.setHeader('Sunset', 'Sat, 01 Mar 2027 00:00:00 GMT');
  res.setHeader('Link', '<https://sikogami.vercel.app/CHANGELOG.md>; rel="sunset"; type="text/html"');
  // Mark legacy /api/* (non-v1) as deprecated, canonical /api/v1/* as not deprecated
  // Note: Vercel rewrites /api/v1/:path* -> /api/:path*, so check both x-rewrite and url
  try {
    const url = req ? new URL(req.url, 'https://sikogami.vercel.app') : null;
    const path = url ? url.pathname : '';
    const isLegacy = path.startsWith('/api/') && !path.startsWith('/api/v1/') && path !== '/api' && path !== '/api/';
    res.setHeader('Deprecation', isLegacy ? 'true' : 'false');
    if (isLegacy) res.setHeader('Warning', '299 - "Deprecated, use /api/v1"');
  } catch {}
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

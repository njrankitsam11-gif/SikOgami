import { apiHeaders, sendError } from './lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'GET, POST, OPTIONS', req);
  if (req.method === 'OPTIONS') return res.status(200).end();
  return sendError(
    res,
    404,
    'ROUTE_NOT_FOUND',
    `Unknown API route ${req.url || ''}`,
    'Available endpoints: POST /api/auth/signup, POST /api/auth/login, POST /api/auth/forgot, POST /api/verify, GET/POST /api/progress, GET/POST /api/mcp. Versioned aliases: /api/v1/*. See /openapi.json.'
  );
}

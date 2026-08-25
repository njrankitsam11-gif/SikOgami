import { getSql, ensureUsersTable, ensureProgressTable } from './lib/db.js';
import { apiHeaders, sendError, sendOk } from './lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  // Markdown negotiation: if agent asks for markdown, return markdown variant
  const accept = req.headers.accept || '';
  const wantsMarkdown = accept.includes('text/markdown');
  if (wantsMarkdown && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send(`# SikOgami API\n\nEndpoint: ${req.url}\nSee /openapi.json for JSON usage.`);
  }

  const sql = getSql();
  if (!sql) return sendOk(res, { fallback: true, progress: [] });

  try {
    await ensureUsersTable();
    await ensureProgressTable();

    if (req.method === 'GET') {
      const email = String(req.query.email || '').trim().toLowerCase();
      if (!email) return sendError(res, 400, 'MISSING_EMAIL', 'email required', 'Add ?email=user@example.com to the request URL.');
      const users = await sql`SELECT id FROM sikogami_users WHERE email=${email}`;
      if (!users.length) return sendOk(res, { progress: [] });
      const rows = await sql`SELECT level_id FROM sikogami_progress WHERE user_id=${users[0].id} ORDER BY level_id`;
      return sendOk(res, { progress: rows.map(r=>r.level_id) });
    }

    if (req.method === 'POST') {
      const { email, levelId, progress } = req.body || {};
      const normEmail = String(email||'').trim().toLowerCase();
      if (!normEmail) return sendError(res, 400, 'MISSING_EMAIL', 'email required', 'Include email in the JSON body.');

      const users = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
      if (!users.length) return sendError(res, 404, 'USER_NOT_FOUND', 'User not found', 'Sign up first via POST /api/auth/signup.');
      const userId = users[0].id;

      // bulk sync: if progress array provided, replace
      if (Array.isArray(progress)) {
        // delete then insert all (simple sync)
        await sql`DELETE FROM sikogami_progress WHERE user_id=${userId}`;
        for (const lid of progress) {
          if (Number.isInteger(lid) && lid>=1 && lid<=30) {
            await sql`INSERT INTO sikogami_progress (user_id, level_id) VALUES (${userId}, ${lid}) ON CONFLICT DO NOTHING`;
          }
        }
        return sendOk(res, { progress });
      }

      // single level complete
      if (levelId) {
        const lid = parseInt(levelId);
        if (!Number.isInteger(lid) || lid<1 || lid>30) return sendError(res, 400, 'INVALID_LEVEL', 'invalid levelId', 'levelId must be an integer between 1 and 30.');
        await sql`INSERT INTO sikogami_progress (user_id, level_id) VALUES (${userId}, ${lid}) ON CONFLICT DO NOTHING`;
        const rows = await sql`SELECT level_id FROM sikogami_progress WHERE user_id=${userId} ORDER BY level_id`;
        return sendOk(res, { progress: rows.map(r=>r.level_id) });
      }

      return sendError(res, 400, 'MISSING_PAYLOAD', 'levelId or progress array required', 'Send {email, levelId} for one level or {email, progress:[1,2,3]} for bulk sync.');
    }

    return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed', 'Use GET to read progress or POST to sync progress.');
  } catch (e) {
    console.error('progress', e);
    return sendError(res, 500, 'INTERNAL_ERROR', e.message, 'Retry in a few seconds; if it persists contact hello@sikogami.vercel.app.');
  }
}

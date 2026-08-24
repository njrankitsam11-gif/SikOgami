import { getSql, ensureUsersTable, ensureProgressTable } from './lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  // Markdown negotiation: if agent asks for markdown, return markdown variant
  const accept = req.headers.accept || '';
  const wantsMarkdown = accept.includes('text/markdown');
  if (wantsMarkdown && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send(`# SikOgami API\n\nEndpoint: ${req.url}\nSee /openapi.json for JSON usage.`);
  }

  const sql = getSql();
  if (!sql) return res.status(200).json({ ok: true, fallback: true, progress: [] });

  try {
    await ensureUsersTable();
    await ensureProgressTable();

    if (req.method === 'GET') {
      const email = String(req.query.email || '').trim().toLowerCase();
      if (!email) return res.status(400).json({ error: 'email required' });
      const users = await sql`SELECT id FROM sikogami_users WHERE email=${email}`;
      if (!users.length) return res.status(200).json({ ok: true, progress: [] });
      const rows = await sql`SELECT level_id FROM sikogami_progress WHERE user_id=${users[0].id} ORDER BY level_id`;
      return res.status(200).json({ ok: true, progress: rows.map(r=>r.level_id) });
    }

    if (req.method === 'POST') {
      const { email, levelId, progress } = req.body || {};
      const normEmail = String(email||'').trim().toLowerCase();
      if (!normEmail) return res.status(400).json({ error: 'email required' });

      const users = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
      if (!users.length) return res.status(404).json({ error: 'User not found' });
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
        return res.status(200).json({ ok: true, progress });
      }

      // single level complete
      if (levelId) {
        const lid = parseInt(levelId);
        if (!Number.isInteger(lid) || lid<1 || lid>30) return res.status(400).json({ error: 'invalid levelId' });
        await sql`INSERT INTO sikogami_progress (user_id, level_id) VALUES (${userId}, ${lid}) ON CONFLICT DO NOTHING`;
        const rows = await sql`SELECT level_id FROM sikogami_progress WHERE user_id=${userId} ORDER BY level_id`;
        return res.status(200).json({ ok: true, progress: rows.map(r=>r.level_id) });
      }

      return res.status(400).json({ error: 'levelId or progress array required' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error('progress', e);
    return res.status(500).json({ error: e.message });
  }
}

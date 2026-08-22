import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    if (password.length < 4) return res.status(400).json({ error: 'Password too short' });

    const normEmail = String(email).trim().toLowerCase();
    const isAdminEmail = normEmail === 'admin@sikogami.com';

    const sql = getSql();
    // No DB -> fallback handled by frontend, but tell client to use local
    if (!sql) {
      return res.status(200).json({ ok: true, fallback: true, user: { name, email: normEmail, isAdmin: isAdminEmail } });
    }

    await ensureUsersTable();
    const existing = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
    if (existing.length) return res.status(409).json({ error: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const rows = await sql`
      INSERT INTO sikogami_users (name, email, password_hash, is_admin)
      VALUES (${name}, ${normEmail}, ${hash}, ${isAdminEmail})
      RETURNING id, name, email, is_admin as "isAdmin"
    `;
    const user = rows[0];
    return res.status(200).json({ ok: true, user });
  } catch (e) {
    console.error('signup', e);
    return res.status(500).json({ error: e.message });
  }
}

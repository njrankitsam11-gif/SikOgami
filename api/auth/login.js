import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    const normEmail = String(email).trim().toLowerCase();

    const sql = getSql();
    if (!sql) {
      // fallback - let frontend use localStorage, but we still fake admin check
      const isAdmin = normEmail === 'admin@sikogami.com' && password === 'admin123';
      if (isAdmin) return res.status(200).json({ ok: true, fallback: true, user: { name: 'Admin', email: normEmail, isAdmin: true } });
      return res.status(200).json({ ok: true, fallback: true });
    }

    await ensureUsersTable();
    const rows = await sql`SELECT id, name, email, password_hash, is_admin as "isAdmin" FROM sikogami_users WHERE email=${normEmail}`;
    if (!rows.length) return res.status(401).json({ error: 'Wrong email or password' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Wrong email or password' });

    // don't leak hash
    delete user.password_hash;
    return res.status(200).json({ ok: true, user });
  } catch (e) {
    console.error('login', e);
    return res.status(500).json({ error: e.message });
  }
}

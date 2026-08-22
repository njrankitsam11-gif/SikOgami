import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { email, newPassword } = req.body || {};
    if (!email || !newPassword) return res.status(400).json({ error: 'Missing fields' });
    if (newPassword.length < 4) return res.status(400).json({ error: 'Password too short' });
    const normEmail = String(email).trim().toLowerCase();

    const sql = getSql();
    if (!sql) {
      return res.status(200).json({ ok: true, fallback: true, message: 'Local mode — will update after Neon is linked' });
    }

    await ensureUsersTable();
    const rows = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
    if (!rows.length) return res.status(404).json({ error: 'No account with that email' });

    const hash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE sikogami_users SET password_hash=${hash} WHERE email=${normEmail}`;
    return res.status(200).json({ ok: true, message: 'Password reset' });
  } catch (e) {
    console.error('forgot', e);
    return res.status(500).json({ error: e.message });
  }
}

import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';
import { apiHeaders, sendError, sendOk } from '../lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'POST only', 'Send a POST request with JSON body {email, newPassword}.');

  try {
    const { email, newPassword } = req.body || {};
    if (!email || !newPassword) return sendError(res, 400, 'MISSING_FIELDS', 'Missing fields', 'Provide email and newPassword in the JSON body.');
    if (newPassword.length < 4) return sendError(res, 400, 'PASSWORD_TOO_SHORT', 'Password too short', 'Use a password with at least 4 characters.');
    const normEmail = String(email).trim().toLowerCase();

    const sql = getSql();
    if (!sql) {
      return sendOk(res, { fallback: true, message: 'Local mode — will update after Neon is linked' });
    }

    await ensureUsersTable();
    const rows = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
    if (!rows.length) return sendError(res, 404, 'USER_NOT_FOUND', 'No account with that email', 'Sign up first via POST /api/auth/signup.');

    const hash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE sikogami_users SET password_hash=${hash} WHERE email=${normEmail}`;
    return sendOk(res, { message: 'Password reset' });
  } catch (e) {
    console.error('forgot', e);
    return sendError(res, 500, 'INTERNAL_ERROR', e.message, 'Retry in a few seconds; if it persists contact hello@sikogami.vercel.app.');
  }
}

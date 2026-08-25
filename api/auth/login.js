import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';
import { apiHeaders, sendError, sendOk } from '../lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'POST, OPTIONS', req);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'POST only', 'Send a POST request with JSON body {email, password}.');

  try {
    const { email, password } = req.body || {};
    if (!email || !password) return sendError(res, 400, 'MISSING_FIELDS', 'Missing fields', 'Provide email and password in the JSON body.');
    const normEmail = String(email).trim().toLowerCase();

    const sql = getSql();
    if (!sql) {
      // fallback - let frontend use localStorage, but we still fake admin check
      const isAdmin = normEmail === 'admin@sikogami.com' && password === 'admin123';
      if (isAdmin) return sendOk(res, { fallback: true, user: { name: 'Admin', email: normEmail, isAdmin: true } });
      return sendOk(res, { fallback: true });
    }

    await ensureUsersTable();
    const rows = await sql`SELECT id, name, email, password_hash, is_admin as "isAdmin" FROM sikogami_users WHERE email=${normEmail}`;
    if (!rows.length) return sendError(res, 401, 'INVALID_CREDENTIALS', 'Wrong email or password', 'Check the email/password, sign up via /api/auth/signup, or reset via /api/auth/forgot.');
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return sendError(res, 401, 'INVALID_CREDENTIALS', 'Wrong email or password', 'Check the email/password, sign up via /api/auth/signup, or reset via /api/auth/forgot.');

    // don't leak hash
    delete user.password_hash;
    return sendOk(res, { user });
  } catch (e) {
    console.error('login', e);
    return sendError(res, 500, 'INTERNAL_ERROR', e.message, 'Retry in a few seconds; if it persists contact hello@sikogami.vercel.app.');
  }
}

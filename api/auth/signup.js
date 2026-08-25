import bcrypt from 'bcryptjs';
import { getSql, ensureUsersTable } from '../lib/db.js';
import { apiHeaders, sendError, sendOk } from '../lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'POST, OPTIONS', req);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'POST only', 'Send a POST request with JSON body {name, email, password}.');

  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return sendError(res, 400, 'MISSING_FIELDS', 'Missing fields', 'Provide name, email and password in the JSON body.');
    if (password.length < 4) return sendError(res, 400, 'PASSWORD_TOO_SHORT', 'Password too short', 'Use a password with at least 4 characters.');

    const normEmail = String(email).trim().toLowerCase();
    const isAdminEmail = normEmail === 'admin@sikogami.com';

    const sql = getSql();
    // No DB -> fallback handled by frontend, but tell client to use local
    if (!sql) {
      return sendOk(res, { fallback: true, user: { name, email: normEmail, isAdmin: isAdminEmail } });
    }

    await ensureUsersTable();
    const existing = await sql`SELECT id FROM sikogami_users WHERE email=${normEmail}`;
    if (existing.length) return sendError(res, 409, 'EMAIL_EXISTS', 'Email already exists', 'Log in instead via POST /api/auth/login, or reset via /api/auth/forgot.');

    const hash = await bcrypt.hash(password, 10);
    const rows = await sql`
      INSERT INTO sikogami_users (name, email, password_hash, is_admin)
      VALUES (${name}, ${normEmail}, ${hash}, ${isAdminEmail})
      RETURNING id, name, email, is_admin as "isAdmin"
    `;
    const user = rows[0];
    return sendOk(res, { user });
  } catch (e) {
    console.error('signup', e);
    return sendError(res, 500, 'INTERNAL_ERROR', e.message, 'Retry in a few seconds; if it persists contact hello@sikogami.vercel.app.');
  }
}

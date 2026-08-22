import { neon } from '@neondatabase/serverless';

let sql = null;
export function getSql() {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url) return null;
  if (!sql) sql = neon(url);
  return sql;
}

export async function ensureUsersTable() {
  const s = getSql();
  if (!s) return false;
  await s`
    CREATE TABLE IF NOT EXISTS sikogami_users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  // ensure admin
  const bcrypt = await import('bcryptjs');
  const adminHash = await bcrypt.hash('admin123', 10);
  await s`
    INSERT INTO sikogami_users (name, email, password_hash, is_admin)
    VALUES ('Admin', 'admin@sikogami.com', ${adminHash}, true)
    ON CONFLICT (email) DO NOTHING
  `;
  return true;
}

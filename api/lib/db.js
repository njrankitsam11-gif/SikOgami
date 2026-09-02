import { neon } from '@neondatabase/serverless';

let sql = null;
export function getSql() {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url) return null;
  if (!sql) sql = neon(url);
  return sql;
}

// Memoized per warm Lambda instance — these tables/indexes/seed only ever need
// to be created once; re-checking on every request wastes a network round-trip
// per call against the HTTP-based Neon driver (see SPEC.md §13 Debt).
let usersTableEnsured = false;
export async function ensureUsersTable() {
  if (usersTableEnsured) return true;
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
  usersTableEnsured = true;
  return true;
}

let progressTableEnsured = false;
export async function ensureProgressTable() {
  if (progressTableEnsured) return true;
  const s = getSql();
  if (!s) return false;
  await s`
    CREATE TABLE IF NOT EXISTS sikogami_progress (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES sikogami_users(id) ON DELETE CASCADE,
      level_id INT NOT NULL,
      completed_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, level_id)
    )
  `;
  await s`CREATE INDEX IF NOT EXISTS idx_progress_user ON sikogami_progress(user_id)`;
  progressTableEnsured = true;
  return true;
}

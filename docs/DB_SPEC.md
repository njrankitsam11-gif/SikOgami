# DB_SPEC.md — Neon Postgres
> Sub-spec of `SPEC.md` §8. Update when any table changes.
> Project: `sikogami` AWS US East 2 Ohio, pooled, branch `production`

## Connection
URL: `DATABASE_URL` (pooled `postgresql://<redacted — set via Vercel env var, never commit credentials>`)
Fallback: `NEON_DATABASE_URL`
Driver: `@neondatabase/serverless` `neon(url)` lazy singleton `getSql()`

## Tables
```sql
sikogami_users (
  id SERIAL PK,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL, -- lowercased at app layer
  password_hash TEXT NOT NULL, -- bcryptjs 10
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)
-- seed: ('Admin','admin@sikogami.com',hash('admin123'),true) ON CONFLICT DO NOTHING

sikogami_progress (
  id SERIAL PK,
  user_id INT REFERENCES sikogami_users(id) ON DELETE CASCADE,
  level_id INT NOT NULL CHECK (1..30),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, level_id)
)
CREATE INDEX idx_progress_user ON sikogami_progress(user_id);
```
Created via `ensureUsersTable()` + `ensureProgressTable()`, idempotent, but now memoized per warm Lambda instance (module-level flag) — only actually hits Neon on the first call after a cold start, not on every request (`api/lib/db.js`).

## Client Sync
`localStorage sikogami_progress int[]` ↔ Neon bulk `POST {email, progress}` merge `Set` union sorted, prefers larger. `syncSingleLevel` for one.

## Performance
- **Indexing:** every query in `api/*.js` filters on `sikogami_users.email` (implicit unique index) or `sikogami_progress.user_id` (covered by `idx_progress_user` + the leading column of `UNIQUE(user_id, level_id)`) — current schema already covers every read/write path, nothing missing for existing query patterns. Note `idx_progress_user(user_id)` is now redundant with the composite unique index (same leading column); harmless, just extra write overhead, safe to drop opportunistically.
- **Round-trips, not indexes, are the real cost here:** `@neondatabase/serverless`'s `neon()` is the HTTP-based driver — every `sql\`...\`` call is its own network round-trip, no pooled connection reuse within a request. Two fixes landed for this:
  1. `ensureUsersTable()`/`ensureProgressTable()` memoized (see Tables above) — was re-running `CREATE TABLE IF NOT EXISTS` + admin-seed on every request.
  2. `api/progress.js` bulk sync batches the insert into one `INSERT ... SELECT unnest($ids::int[]) ON CONFLICT DO NOTHING` instead of one `INSERT` per level in a loop.

## Migrations
If schema changes: add new `ensure*Table` migration in `api/lib/db.js`, bump SPEC version, log in Changelog, redeploy `vercel --prod`.

## Env
Vercel Prod: `DATABASE_URL` Sensitive. No env in repo. **Never paste the actual connection string into these docs** — an earlier session did this (§ incident logged in `SPEC.md` §14 Changelog) and it sat exposed on the public site and in public git history for ~11 days. Reference the env var name only.

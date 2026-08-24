# DB_SPEC.md — Neon Postgres
> Sub-spec of `SPEC.md` §8. Update when any table changes.
> Project: `sikogami` AWS US East 2 Ohio, pooled, branch `production`

## Connection
URL: `DATABASE_URL` (pooled `postgresql://neondb_owner:npg_x6fuNG0RqrhM@ep-silent-hill-ayo5xgn2-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`)
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
Created via `ensureUsersTable()` + `ensureProgressTable()` idempotent on every auth/progress call.

## Client Sync
`localStorage sikogami_progress int[]` ↔ Neon bulk `POST {email, progress}` merge `Set` union sorted, prefers larger. `syncSingleLevel` for one.

## Migrations
If schema changes: add new `ensure*Table` migration in `api/lib/db.js`, bump SPEC version, log in Changelog, redeploy `vercel --prod`.

## Env
Vercel Prod: `DATABASE_URL` Sensitive. No env in repo.

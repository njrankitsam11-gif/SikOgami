# SikOgami — SPEC.md (Agent Source of Truth)
> **Read this first every session. Update after each module/feature.**
> Location: `/Users/sam/Desktop/SikOgami/SPEC.md`
> Last Updated: 2026-09-02 | Version: 2.3.2 | Deployment: https://sikogami.vercel.app

## 0. Agent Instructions
- **At session start:** Read `SPEC.md` + `docs/API_SPEC.md` + `docs/DB_SPEC.md` before any code. (Claude Code sessions: `CLAUDE.md` auto-loads and points here — if it's missing, read this file manually first.)
- **After each module/feature:** Update relevant section in SPEC.md, bump Version, add entry to `## 14. Changelog`, mirror any changed doc/page into `public/` (see §13 Debt), and commit. Do NOT skip.
- **Spec is source of truth:** If code diverges from spec, fix code OR update spec with reason.
- **Do not delete spec files** — they persist context across sessions.

---

## 1. Project Overview
**SikOgami — Fold. Breathe. Level Up.** Zen gamified origami: fold real paper → scan with phone (Gemini Vision) → unlock next level. Relaxing, no timers, no fail penalty. Monetized via curated paper packs (Toyo, Oddy, Daler-Rowney) affiliate 8-12% + collaboration + own Shopify later.
- **Tagline:** `Fold. Breathe. Level Up.`
- **Vibe:** Monument Valley + Apple + Muji paper texture, sage/sand/cream/sick red palette, Framer-Motion-like folding animations.
- **Target:** Stressed 18-35, parents/kids, mindfulness, hobbyists.

## 2. Architecture (SPA + Serverless + Agentic Surface)
```
index.html (SPA shell, Tailwind CDN)
  -> style.css (paper-grid, scan-line, breathe, dark overrides)
  -> app.js (LEVELS data, auth, progress sync, render, scan, zen)
  -> api/* (Vercel Serverless Functions, type: module)
     -> api/lib/db.js (Neon helper)
     -> api/lib/respond.js (CORS/rate-limit headers, structured errors)
     -> api/auth/signup.js, login.js, forgot.js
     -> api/verify.js (Gemini Vision)
     -> api/progress.js (Neon + fallback)
     -> api/mcp.js (MCP server — GET manifest + JSON-RPC 2.0 POST, see §18)
     -> api/index.js, api/[...path].js (JSON 404 catch-alls for unknown /api routes)
  -> middleware.js (Vercel Edge/Node middleware — markdown content negotiation, Vary header)
  -> public/*.md, public/*.html, public/docs/*, public/openapi.json, public/llms.txt,
     public/sitemap.xml, public/robots.txt (agentic/SEO discoverability surface, see §17)
```
- **No build step.** Static hosting via Vercel, APIs as `api/*.js` serverless. Output: `vercel.json` `functions.verify/progress.maxDuration=10`, `functions.mcp.maxDuration=5`.
- **State:** `localStorage` primary + Neon Postgres source of truth when logged in. Merge via `Set` union.
- **File duplication quirk:** `index.html`/`app.js`/`style.css`/`SPEC.md`/`AGENT_GUIDE.md`/`docs/*` are duplicated verbatim under `public/`. Both trees must be edited together — see §13 Debt.

## 3. Tech Stack
- **Frontend:** Vanilla JS (no framework), Tailwind CDN, Google Fonts (Bricolage Grotesque, Instrument Serif, Space Mono), `paper-texture` SVG turbulence, `paper-grid` CSS.
- **Backend:** Node 22, `@neondatabase/serverless@1.1.0`, `bcryptjs@3.0.3`, native `fetch` to Gemini.
- **DB:** Neon Postgres `sikogami` (AWS US East 2 Ohio, pooled connection, `DATABASE_URL`). Fallback `NEON_DATABASE_URL`. If no URL → mock/local mode.
- **AI:** Gemini 1.5 Flash `generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY`, temp 0.4.
- **Hosting:** Vercel `njrankitsam11-7734s-projects/sikogami` (org `team_7ELib4M21slH5ZUg6Hew90EM`), alias `sikogami.vercel.app`. Local dev: `python3 -m http.server 8000`.
- **Vercel Env:** `DATABASE_URL` (pooled Neon), `GEMINI_API_KEY` (aistudio.google.com, optional — mock if absent).

## 4. File Map (Absolute)
- `/Users/sam/Desktop/SikOgami/CLAUDE.md` (Claude Code session bootstrap, points here)
- `/Users/sam/Desktop/SikOgami/index.html` (559 lines SPA shell)
- `/Users/sam/Desktop/SikOgami/app.js` (1220 lines core logic)
- `/Users/sam/Desktop/SikOgami/style.css` (84 lines)
- `/Users/sam/Desktop/SikOgami/middleware.js` (markdown content negotiation, Vary header, 404 fallback)
- `/Users/sam/Desktop/SikOgami/api/lib/db.js` (49 lines — Neon connection + table migrations)
- `/Users/sam/Desktop/SikOgami/api/lib/respond.js` (48 lines — CORS/rate-limit headers, structured errors)
- `/Users/sam/Desktop/SikOgami/api/auth/signup.js` (40 lines)
- `/Users/sam/Desktop/SikOgami/api/auth/login.js` (37 lines)
- `/Users/sam/Desktop/SikOgami/api/auth/forgot.js` (32 lines)
- `/Users/sam/Desktop/SikOgami/api/verify.js` (150 lines)
- `/Users/sam/Desktop/SikOgami/api/progress.js` (69 lines)
- `/Users/sam/Desktop/SikOgami/api/mcp.js` (149 lines — MCP server, GET manifest + JSON-RPC POST)
- `/Users/sam/Desktop/SikOgami/api/mcp/route.js` (13 lines — legacy minimal handler, superseded by api/mcp.js)
- `/Users/sam/Desktop/SikOgami/api/index.js`, `api/[...path].js` (JSON 404 catch-alls for unknown `/api/*`)
- `/Users/sam/Desktop/SikOgami/package.json` (deps)
- `/Users/sam/Desktop/SikOgami/vercel.json` (rewrites, headers, function config)
- `/Users/sam/Desktop/SikOgami/CHANGELOG.md` (public-facing version history, also at `/CHANGELOG.md` in prod)
- `/Users/sam/Desktop/SikOgami/SPEC.md` (this file) + `AGENT_GUIDE.md` + `docs/*`
- `/Users/sam/Desktop/SikOgami/public/*` — **byte-identical mirror** of the above root files that Vercel serves statically + agents fetch directly (`llms.txt` links `/SPEC.md`, `/docs/*.md`). Keep both trees in sync on every edit.

## 5. Levels (30, Deepened 8-10 micro-steps SVG, Source of Truth `app.js:2` LEVELS)
**Structure:** `{id 1-30, world, title UPPER, subtitle, emoji, color hex, sheets 1-12, diff "DIFF • min • N PAPER", unlocks, paperTip, steps: [{title, desc, emoji, visual}] 4-8 steps}`
- **W1 THE CALM SHORE (1-6, 1 PAPER, BEGINNER):** 1 Boat 8 steps (perfect see app.js:5-16) → 2 Cup 5 → 3 Tulip 4 → 4 Whale 4 → 5 Dog Face 4 → 6 Heart 4
- **W2 THE QUIET FOREST (7-12, 1 PAPER, EASY/MEDIUM):** 7 Butterfly → 8 Fox Face → 9 Jumping Frog → 10 Crane (bird base, 12min) → 11 Fish → 12 Penguin
- **W3 THE BLOOM RIVER (13-18, 2 PAPERS):** 13 Tulip+Stem (pink+green) → 14 Boat+Sail (blue+white) → 15 Butterfly Garden (pair) → 16 Fox Family (15cm+7.5cm) → 17 Frog Pond → 18 Crane Couple
- **W4 THE SHADOW TEMPLE (19-24, MODULAR 2-6):** 19 Cube 6 Sonobe → 20 Ninja Star 2 → 21 5-Petal Star 5 → 22 Kusudama 5 → 23 Samurai Helmet+sword 2 → 24 Boat Fleet 3
- **W5 THE MASTER'S PEAK (25-30, MASTER/LEGEND):** 25 Dragon 1 (35cm, 30min) → 26 Peacock 2 (fan tail) → 27 Elephant 1 → 28 Armor 3 → 29 Lotus Garden 7 (6+pond) → 30 Castle 12 (60min, walls/towers/gates/crown)
- **Sheets progression:** Core monetization hook — early 1, mid 2, modular 5-6, final 12 (curated box).
- **Unlock:** `isUnlocked(id)` = `isAdmin() || id===1 || progress.includes(id-1)`. Admin bypass via `isAdmin()` (`email==="admin@sikogami.com"` or `is_admin` DB flag).
- **PaperTip:** Emphasizes single vs multi per level.

## 6. Deployment
- **Vercel Project:** `prj_HSyIuYrOnkWhE57H6PzSzQ7cPQSX`, org `team_7ELib4M21slH5ZUg6Hew90EM`, name `sikogami`
- **URLs:** Prod alias `https://sikogami.vercel.app`, preview `https://sikogami-<hash>-njrankitsam11-7734s-projects.vercel.app`, inspector `vercel.com/njrankitsam11-7734s-projects/sikogami/...`
- **Neon Project:** `sikogami` (Admin org `njrankitsam11@gmail.com` Free), region `AWS US East 2 (Ohio)`, branch `production` Default, compute `.25 -> 2 CU`, storage/history 5GB. Connection string pooled `postgresql://<redacted — set via Vercel env var, never commit credentials>` → `DATABASE_URL` Sensitive Prod.
- **Deploy:** `vercel --prod --yes` (no build). Restore cache. Each feature commit → redeploy. Env add: `printf "URL" | vercel env add DATABASE_URL production`.

## 7. Environment Variables
- `DATABASE_URL` (pooled Neon, required for real auth/progress) — fallback `NEON_DATABASE_URL`.
- `GEMINI_API_KEY` (optional, aistudio.google.com) — if absent, `api/verify.js` mock mode `88+rand` always pass, `mode:"mock"`; if present, Gemini 1.5 Flash with prompt (generous 75 threshold).
- Client `localStorage`: `sikogami_users` (array), `sikogami_currentUser` (obj), `sikogami_progress` (int[]), `sikogami_theme` (dark/light).

## 8. Data Models (Neon)
```sql
CREATE TABLE sikogami_users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL, -- lowercased
  password_hash TEXT NOT NULL, -- bcrypt 10
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- seed: Admin admin@sikogami.com / admin123 (hash) ON CONFLICT DO NOTHING

CREATE TABLE sikogami_progress (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES sikogami_users(id) ON DELETE CASCADE,
  level_id INT NOT NULL CHECK (1..30),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);
CREATE INDEX idx_progress_user ON sikogami_progress(user_id);
```
Client mirror: `sikogami_progress` sorted int[]; `is_admin` drives admin unlock.

## 9. API Contracts
> Full detail incl. curl examples: `docs/API_SPEC.md`. Canonical base is `/api/v1/*` (URL path versioning); legacy `/api/*` paths are kept as aliases (see §17).

| Method | Path | Req | Success (200) | Errors |
|---|---|---|---|---|
| POST | /api/v1/auth/signup | {name, email, password min4} | {ok:true, user:{id,name,email,isAdmin}} or {ok:true,fallback:true,user} | 400 missing/short, 409 exists, 500 |
| POST | /api/v1/auth/login | {email,password} | {ok:true,user} or fallback | 400, 401 wrong, 500 |
| POST | /api/v1/auth/forgot | {email,newPassword min4} | {ok:true,message} or fallback | 400,404 no account,500 |
| POST | /api/v1/verify | {image:dataURL/base64, levelId 1-30, levelTitle} | {pass,bool, score 0-99, feedback str, mode:"gemini"/"mock"/"fallback", expected str} always 200 (fallback pass on error) | 400 no image,405 |
| GET | /api/v1/progress?email=... | query email | {ok:true,progress:int[]} or fallback | 400,500 |
| POST | /api/v1/progress | {email, levelId? 1-30, progress? int[]} | {ok:true,progress:int[]} bulk replaces or single insert | 400,404 user not found,500 |
| GET | /api/mcp (or /.well-known/mcp) | — | MCP manifest JSON: `{name,version,transport,tools,capabilities,...}` | — |
| POST | /api/mcp | JSON-RPC 2.0 `{jsonrpc,id,method,params}` — `initialize`, `tools/list`, `tools/call`, `ping` | JSON-RPC result (or SSE if `Accept: text/event-stream`) | -32601 unknown method/tool |
| any | unmatched /api/* | — | — | 404 `{ok:false,code:"ROUTE_NOT_FOUND",...}` JSON (never HTML), via `api/index.js` + `api/[...path].js` |
- CORS `*` `POST,GET,OPTIONS` `Content-Type, Accept, Authorization, Mcp-Session-Id`. `api/lib/db.js` `getSql()` lazy `neon(url)`, `ensureUsersTable()/ensureProgressTable()` idempotent.
- Dependencies: `@neondatabase/serverless` `neon`, `bcryptjs`, `fetch` to Gemini `temperature 0.4 maxTokens 300`, prompt: zen sensei generous 75 pass, any paper valid.
- Every response (success or error) carries `RateLimit-Policy`, `RateLimit`, `X-RateLimit-Limit/Remaining/Reset`, `API-Version: v1`, `Sunset`, `Deprecation` headers via `api/lib/respond.js:apiHeaders()`. Every 4xx/5xx returns structured JSON `{ok:false,error,code,message,hint,status,docs}` via `sendError()`.

## 10. Frontend Modules (app.js, 1220 lines)
- **State:** `gardenOpen=false, gardenFilter='all', TOTAL=30, currentLevel/currentStep, progress[], lastScanBase64`
- **Auth:** `getUsers/setUsers`, `getCurrentUser/setCurrentUser`, `isAdmin`, `ensureDefaultAdmin`, `renderAuthArea` (avatar+ADMIN badge or LOGIN), `openAuth/closeAuth/switchAuth`, `showErr`, `handleSignup/handleLogin/handleForgot` (try Neon fetch then fallback local), `handleLogout`, merge Neon progress via `loadProgressFromNeon` (Set union, prefers larger, toast).
- **Progress Sync:** `saveProgress` → localStorage + `syncProgressToNeon` POST bulk, `setSyncStatus` (`◍ Syncing...` sage, `☁️ Neon synced • n/30` green, `○ Offline` grey, `⚠︎ failed` sick), `loadProgressFromNeon` GET merge, `syncSingleLevel`.
- **Levels:** `renderLevels` grouped by `world` sticky header `● 1 PAPER`, alternating `lg:mr-auto` vs `lg:ml-auto`, `level-card` locked opacity, status `✓ COMPLETED` green / `● UNLOCKED` sick / `🔒 LOCKED`, `sheetBadge` sage 1 vs sand multi, btn `VIEW AGAIN/FOLD NOW/LOCKED`, dot centered green/sick, onclick `openModal`.
- **Garden:** `toggleGarden` hidden/summary `▼ EXPAND/▲ COLLAPSE`, `setGardenFilter` pills active `bg-paper text-ink` vs transparent, `renderGarden` stats `statCollected/Worlds/Papers`, filtered `list` by all/collected/locked/single/multi, horizontal `flex snap-x` cards `w-118px`, `COLLECTED` sage `✓ IN GARDEN` vs `LOCKED`/`UNLOCKED` + `TAP TO FOLD →`.
- **Modal:** `openModal` sets badge/title/world/tip/total/sheetLabel, `renderStep` emoji/visual/title/desc, dots `w-6 h-1.5`, `nextStep/prevStep`, paper reco, scanRight `scanIdle` dashed dropzone `input capture environment handleScan` + `mockScanSuccess`, `scanChecking` spinner, `scanPreview` + `scanResult`.
- **Scan:** `handleScan` FileReader base64 → `startRealScan` fetch `/api/verify`, `mockScanSuccess` sample unsplash, `showScanResultAI` green pass `score% MATCH` + `modeBadge` + `CLAIM LEVEL UP` vs sick fail + `RETRY` + `PASS ANYWAY` zen override 75, `resetScan`, `completeLevel` push sorted `saveProgress+renderLevels` toast `Level n unlocked` or `YOU ARE MASTER`, `confetti` 18 emoji fall.
- **Theme/Zen:** `toggleTheme` `dark` class + `sikogami_theme`, `updateThemeIcon` 🌙/☀️; Zen `toggleZen` header `zenTimer 00:00` `zenSession` + `zenSoundBtn`, center 300-360px `paper-grid` `breathingPaper` + `breathText` + `breathCount`, controls `zenPlayBtn` `toggleZenPlay` pause/resume, `zenReset`, `select zenPattern` `4-6/4-4/4-7-8` `zenChangePattern`, quote rotator 5 quotes every 4 cycles, `getZenTimings` in/out/hold, `startBreathing` interval `total*1000/2` toggles `breathIn` scale, `startZenTimer` 1s `mm:ss`, `toggleZenSound` mock.
- **Lifecycle:** `DOMContentLoaded` → `updateProgressUI/renderLevels/renderGarden/updateThemeIcon/renderAuthArea` + if user `loadProgressFromNeon` + hero rotate `sin(Date/800)*3deg` + drag drop bind + Escape closes modals/zen.

## 11. UI Sections (index.html)
- **Nav 64px fixed:** `折` + `SikOgami.` + `BETA` badge, `themeBtn 🌙`, `zenBtn ○ ZEN MODE`, `MY GARDEN 0/30`, `authArea`.
- **Hero:** Pill `NO STRESS`, H1 `FOLD. BREATHE. LEVEL_UP. SICK!`, CTA `START AT LEVEL 1`, `TRY ZEN`, avatars + `2,847 folders`.
- **Floating Card:** `SIKOGAMI SCANNER v1.0` `heroOrigami ⛵` `DETECTED 98% MATCH` `scan-line` `BUTTERFLY → UNLOCKED`.
- **Marquee:** `FOLD REAL PAPER ◆ SCAN WITH MOBILE ◆ LEVEL UP ◆ FEEL RELAXED ◆ REPEAT` 20s loop.
- **How It Works:** 3 cards 1/2/3.
- **Levels Map:** Header `30 LEVELS • 5 WORLDS`, `progressText/progressBar`, `levelsContainer`.
- **Garden:** `bg-ink text-paper` dropdown button `border-dashed` `▼ EXPAND` → collapsible stats + 5 filter pills + horizontal grid + empty + scroll hint.
- **Store:** `MONETIZE`, 3 cards `Calm Pack Pastels ₹399`, `Washi Master ₹649`, `Toolkit ₹299` + `toast`, collab footer.
- **Fold Modal z-100:** Header badge/title/sheetLabel/world, left steps `stepNum/stepTotal/stepHint/stepDots/stepEmoji/stepVisual/stepTitle/stepDesc/prev/next + paperTip`, right scan `scanIdle/scanChecking/scanPreview`.
- **Auth Modal z-110:** Header `SIKOGAMI ACCESS`, tabs `LOGIN/SIGN UP/FORGOT`, forms with `admin@sikogami.com/admin123` hint.
- **Toast** bottom + **Zen Overlay z-90** `zen-bg` top bar + center breathing + controls + quote.

## 12. Styling (style.css)
- `.paper-texture` turbulence 0.9 opacity 0.04, `.paper-grid` ink 0.04 20px, `.scan-line` red 2px `scan 2.5s`, `.marquee` 20s, `.level-card` hover `-4px rotate 0.4deg` shadow, `.breathing` 4s scale 1→1.18, scrollbars thumb ink track sand, `#gardenGrid` thin red 6px.
- **Dark:** `html.dark` `color-scheme dark`, `body #0A0A0A text #FDFBF7`, `.bg-paper→#0A0A0A`, `.bg-white→#1A1A1A`, `.bg-cream→#1E1E1E`, `.bg-sand→#242424`, `.text-ink→#FDFBF7`, `.border-ink→#333`, `nav rgba`, `.paper-texture 0.06`, `.paper-grid white 0.05`, `.level-card #1A1A1A`, `#garden #0A0A0A border #222` + text overrides `text-paper/*` light, `border-paper` etc, `footer`, scrollbars, `#garden` scrollbar, `.zen-bg` light `#FDFBF7` vs `html.dark .zen-bg #0A0A0A` + inner inversions ensures Zen text visible both modes.

## 13. Current State & Roadmap
- **Done (v1.0.0-2.1.0):** 30 levels perfect L1 shape-accurate multi-step (single→multi papers), dark/light, AI scan mock+Gemini, auth (Neon + fallback admin unlock), progress sync Neon (bulk/single merge), garden dropdown+scroll+filters+stats+sync badge, zen immersive 4-6/4-4/4-7-8 + timer/quotes/sound mock, store affiliate, colored paper per level + shape-accurate morph, Vercel + Neon linked.
- **Done (v2.2.0-2.3.1, agentic/AI-discoverability hardening):** `/api/v1` URL versioning w/ legacy aliases, structured JSON errors on every 4xx/5xx, JSON (never HTML) 404 catch-all for unknown API routes, rate-limit headers on every response, typed OpenAPI 3.0 spec w/ Error model, MCP server (`api/mcp.js`) with JSON-RPC 2.0 handshake (`initialize`/`tools/list`/`tools/call`/`ping`) + SSE support, `llms.txt`/`sitemap.xml`/`robots.txt`/`docs/` pages, markdown content negotiation via `middleware.js`, `/docs` linked from homepage footer. See §17-18.
- **Pending:** Real Shopify store, video per step, QR sync desktop→phone, brand collab, analytics, JWT session, email verification, progress per-world completion badges, admin panel to unlock user, sound audio files, per-client (not just headers) rate limiting.
- **Debt:**
  - **[RESOLVED — was CRITICAL] Leaked DB credential:** `SPEC.md` §6 and `docs/DB_SPEC.md` embedded the full plaintext Neon `DATABASE_URL` (including password) from `a5897a8` (2026-08-22) until this fix (2026-09-02) — ~11 days. It was live on the public internet via `public/SPEC.md`/`public/docs/DB_SPEC.md` (this repo has no auth wall) *and* in this GitHub repo's public commit history (repo visibility: public). Redacted from all four files in v2.3.2. **The credential must still be rotated in the Neon console and `DATABASE_URL` updated in Vercel** — redacting the current file does not undo the exposure or purge git history; only rotation neutralizes it. Lesson: never paste a live connection string/secret into any doc, even one that looks internal-only — this repo mirrors everything to `public/` and serves it unauthenticated.
  - `progress` local global not per-user until login merge is explicit; `api/verify` fallback always pass may be too generous.
  - Rate-limit headers are advisory only — `api/lib/respond.js:apiHeaders()` always reports `remaining=limit-1`; no actual request counter/store enforces the 120/60s policy yet.
  - **`public/` mirror:** `index.html`, `app.js`, `style.css`, `SPEC.md`, `AGENT_GUIDE.md`, `docs/*` are duplicated byte-for-byte under `public/` with no build step or symlink to keep them in sync — every edit to a root copy must be manually repeated in `public/`. A past session shipped a doc change without doing this and needed a follow-up fix commit (`f5c9afc`). Prefer collapsing this to a real build step or symlinks if it causes another miss.
  - `public/openapi.json` `info.version` still reads `2.1.0` though `CHANGELOG.md`/this file are past that — cosmetic drift, fix opportunistically.
  - `api/mcp/route.js` is a superseded stub (Next.js-route-handler-style GET/POST) left over from an earlier MCP attempt; `api/mcp.js` (Vercel Node function style) is the live implementation wired in `vercel.json`. Safe to delete once confirmed unused by any deploy path.

## 14. Changelog (Update After Each Feature)
- **2026-09-02 v2.3.2:** **Security:** redacted the plaintext Neon `DATABASE_URL` (had been committed + publicly served for ~11 days, see §13 Debt) from `SPEC.md` and `docs/DB_SPEC.md` (+ `public/` mirrors) — rotation still required by the project owner. **Performance:** `ensureUsersTable()`/`ensureProgressTable()` memoized per warm instance instead of re-running on every request (`api/lib/db.js`); `api/progress.js` bulk sync batched into one `INSERT ... unnest()` instead of one `INSERT` per level. Indexing audited — no missing indexes for current query patterns (both tables' every WHERE-clause column already indexed); noted `idx_progress_user` as a now-redundant duplicate of the composite unique index (optional cleanup).
- **2026-08-25 v2.3.1:** Fixed `api/index.js` returning HTML 404 for bare `/api` (catch-all missed the base path — `1e72372`); removed stale static `/.well-known/mcp` files so the `vercel.json` rewrite to `/api/mcp` actually serves the live Streamable HTTP handler + detailed GET manifest (`1fe3886`).
- **2026-08-25 v2.3.0 "99→100":** MCP server hardened — Streamable HTTP handshake (`initialize`/`notifications/initialized`/`tools/list`/`tools/call`/`ping` over JSON-RPC 2.0, SSE when `Accept: text/event-stream`) at `/.well-known/mcp` → `/api/mcp`; `Sunset`/`Deprecation`/`API-Version`/`Link rel="sunset"` headers on all `/api/*` + `/api/v1/*`; OpenAPI descriptions/tags on all 9 operations; HTML `<link rel="alternate">` for openapi + llms.txt (`c430a35`).
- **2026-08-25 v2.2.0:** Agentic API hardening — `/api/v1/*` canonical URL versioning (legacy `/api/*` aliases kept), structured JSON errors `{ok:false,error,code,message,hint,status,docs}` on every 4xx/5xx, JSON 404 catch-all for unknown `/api/*` routes (`api/index.js`, `api/[...path].js`), rate-limit headers on all responses, typed OpenAPI 3.0 response schemas + Error model, `/docs` linked from homepage footer (`27b4ab6`, synced to `public/` in `f5c9afc`).
- **2026-08-24 (pre-2.2.0):** Agentic readiness pass — `llms.txt`, `sitemap.xml`, `robots.txt`, `openapi.json`, JSON-LD, trust pages (`/about`, `/contact`, `/privacy`, `/faq`), `/docs` index, `og-image.png`, markdown content negotiation via `middleware.js` (404 for unknown paths, not 200), agentic test suite `tests/agentic.test.js` (`8a97102` … `242eea8`, `a1399ec`, `6fe5316`).
- **2026-08-24 v1.9.0-2.1.0:** Deepened + refined SVG paper crafting for all 30 levels — shape-accurate morph to final object per level, ghost hint, morph progress bar, colored paper per level with dark-stroke adapt (`e2e83d5` … `1b120e7`).
- **2026-08-25 (post-2.1.0):** Re-refined World 1 (1-6) and World 2 (7-12) step sequences to be true shape-accurate against reference folds — boat 12 steps, butterfly/frog 10, crane 12, fish/penguin 8 (`a08a96c`, `5ad2604`, `3e7feb7`).
- **2026-08-22 v1.0.0:** Initial deploy 6 levels + Gemini mock + Vercel `sikogami.vercel.app` (`sikogami-r01r185nm`).
- **2026-08-22 v1.1.0:** Expanded to 30 levels 5 worlds single→multi, perfect 8-step L1, dark/light toggle via `sikogami_theme`.
- **2026-08-22 v1.2.0:** Auth LOGIN/SIGNUP/FORGOT modals, localStorage + admin `admin@sikogami.com/admin123` unlock all.
- **2026-08-22 v1.3.0:** Neon Postgres `sikogami` US East 2 pooled `DATABASE_URL` linked, `api/lib/db.js` + `api/auth/*` + fallback.
- **2026-08-22 v1.4.0:** Progress sync `sikogami_progress` table + `api/progress.js` GET/POST bulk/single + frontend merge + badge.
- **2026-08-22 v1.5.0:** Garden compact dropdown `▼ EXPAND` + horizontal snap `flex` + stats + filters + sync badge dark fix.
- **2026-08-22 v1.6.0:** Garden glow-up filters `all/collected/locked/single/multi` + stats `statCollected/Worlds/Papers` + 118px cards.
- **2026-08-22 v1.7.0:** Garden dropdown indicator obvious `▼ EXPAND` pill + dashed border + rotating chevron.
- **2026-08-22 v2.1.0:** Colored paper per level — SVG uses level color (#FFB3C1 pink tulip, #7DD3C8 whale, etc) + dark-stroke adapt, morph ghost (dpl 2vgrgytfi)
- **2026-08-22 v2.0.0:** Refined morph — shape-accurate SVG (rectangle/diamond/boat hull/whale/dog/heart + 10 finals), level-specific sequences, ghost final hint, morph progress bar (dpl 374rgq708)
- **2026-08-22 v1.9.0:** Deepened paper crafting — SVG dotted valley/mountain system, 8-10 micro-steps per level (L1 10), CraftPlayer with stepSvg + svgHint, auto-expander for 4→8 (`dpl_5a1ixU75`)
- **2026-08-22 v1.8.0:** Zen immersive `zen-bg` light/dark fix, timer `00:00`, pattern `4-6/4-4/4-7-8`, play/pause, quotes, sound mock.

## 15. How to Update Spec After Each Module
1. Edit `SPEC.md` relevant section (e.g., Levels, API, DB, Frontend) + bump `Last Updated` + `Version`.
2. Append row to `## 14. Changelog` with date, version, features, deployment hash.
3. If API changed, update `docs/API_SPEC.md` (if exists) or section 9. If MCP/llms.txt/openapi/sitemap changed, update §17-18.
4. If DB changed, update section 8 + `docs/DB_SPEC.md`.
5. Copy every changed file into its `public/` mirror (`cp SPEC.md public/SPEC.md`, `cp docs/*.md public/docs/`, etc — see §13 Debt).
6. Commit: `git add SPEC.md AGENT_GUIDE.md docs/* public/ && git commit -m "docs: update spec vX.Y.Z — <feature>" && git push` (or Vercel auto).

## 16. Quick Start for New Session (Agent)
```bash
cat SPEC.md | head -n 50  # overview + agent instructions
cat docs/API_SPEC.md  # if exists
git log --oneline -10  # anything since "Last Updated" above?
vercel --prod --yes  # deploy
# test
curl -s https://sikogami.vercel.app/api/v1/progress?email=admin@sikogami.com
curl -s https://sikogami.vercel.app/api/mcp  # MCP manifest
```

## 17. Agentic / AI-Discoverability Surface
> Purpose: make SikOgami's content and API legible to AI agents/crawlers, not just human browsers. Update this section (and mirror into `public/`) whenever a file below changes.

| File | Role |
|---|---|
| `middleware.js` | Vercel middleware (matcher excludes `api/`, `_next/`, `_static/`, `favicon.ico`). If `Accept: text/markdown`, serves the markdown variant of `/`, `/about`, `/contact`, `/privacy`, `/faq`, `/docs` (falls back to a markdown 404 for unknown paths); otherwise passes through and ensures `Vary: Accept, Accept-Encoding` is set on every response. |
| `public/llms.txt` | llms.txt convention — project summary, when-to-use, sitemap, API base/auth/endpoints, rate-limit/versioning policy, levels list, FAQ/changelog/docs pointers. Served with `Content-Type: text/markdown`. |
| `public/sitemap.xml`, `public/robots.txt` | Standard crawler discovery; `robots.txt` explicitly allows `/llms.txt`, `/sitemap.xml`, `/openapi.json`, `/.well-known/mcp`. |
| `public/openapi.json` | OpenAPI 3.0, typed request/response schemas + shared `Error` component, absolute server URL, descriptions/tags on all operations incl. `/api/v1/mcp` and `/.well-known/mcp`. Served with explicit JSON `Content-Type` (see `vercel.json` headers). |
| `public/{about,contact,privacy,faq,404}.md` + matching `.html` | Human HTML page + markdown twin for every trust/info page, content-negotiated by `middleware.js`. |
| `public/docs/index.html` + `public/docs/*_SPEC.md` | `/docs` — public mirror of this spec system for agents/devs (linked from homepage footer). |
| `CHANGELOG.md` (root + `public/`) | Human-readable version history; referenced by the `Link rel="sunset"` response header on every API call. |
| `tests/agentic.test.js` | Regression suite asserting the above (404 shape, markdown negotiation, JSON-LD, sitemap/robots/openapi validity). Run before shipping changes to any file in this table. |

Versioning/deprecation policy actually enforced by `vercel.json` headers + `api/lib/respond.js`: canonical `/api/v1/*`, legacy `/api/*` kept as an alias and marked `Deprecation: true` (vs `false` for `/api/v1/*`) via `apiHeaders()`'s path check; breaking changes ship as `/api/v2/*`; `Sunset: Sat, 01 Mar 2027`.

## 18. MCP Server (`api/mcp.js`)
- **Manifest:** `GET /api/mcp` (also reachable at `/.well-known/mcp` and `/.well-known/mcp.json` via `vercel.json` rewrites) → `{name, version, description, transport:{type:"streamable-http",url}, tools, provider, capabilities, serverInfo}`.
- **Transport:** Streamable HTTP. `POST /api/mcp` with JSON-RPC 2.0 body `{jsonrpc:"2.0", id, method, params}`. Responds JSON by default, or `text/event-stream` (single `data:` frame) if the request's `Accept` header includes it.
- **Methods:** `initialize` (returns `protocolVersion`, `capabilities`, `serverInfo`, `instructions`), `notifications/initialized`/`initialized` (202 ack, no body), `tools/list`/`list_tools`, `tools/call`/`call_tool`, `ping`. Unknown method → JSON-RPC error `-32601`.
- **Tools** (`TOOL_DEFS`, mirrored in `public/openapi.json`):
  - `listLevels` — no args, returns all 30 `LEVELS` (id/title/world/sheets/emoji — a trimmed duplicate of `app.js` `LEVELS`, kept in sync manually).
  - `getProgress` — `{email}` → currently stubbed to always return `{progress:[]}`; **does not query Neon yet** (see Debt-worthy TODO — real implementation should call the same logic as `GET /api/progress`).
  - `verifyOrigami` — `{image, levelId, levelTitle}` → currently just returns a hint to call `POST /api/verify` directly rather than performing verification inline.
- **Legacy compat:** non-JSON-RPC POST bodies (`{tool:"listLevels"}` etc.) still handled for older clients; otherwise echoes the body + tool list.
- **Superseded file:** `api/mcp/route.js` is an earlier Next.js-route-handler-style stub, not wired into `vercel.json` — don't edit it expecting effect; extend `api/mcp.js` instead. Candidate for deletion (see §13 Debt).

---

*End of SPEC.md — keep this the single source of truth.*

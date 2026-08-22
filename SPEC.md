# SikOgami — SPEC.md (Agent Source of Truth)
> **Read this first every session. Update after each module/feature.**
> Location: `/Users/sam/Desktop/SikOgami/SPEC.md`
> Last Updated: 2026-08-22 | Version: 1.0.0 | Deployment: https://sikogami.vercel.app

## 0. Agent Instructions
- **At session start:** Read `SPEC.md` + `docs/API_SPEC.md` + `docs/DB_SPEC.md` before any code.
- **After each module/feature:** Update relevant section in SPEC.md, bump Version, add entry to `## 12. Changelog`, and commit. Do NOT skip.
- **Spec is source of truth:** If code diverges from spec, fix code OR update spec with reason.
- **Do not delete spec files** — they persist context across sessions.

---

## 1. Project Overview
**SikOgami — Fold. Breathe. Level Up.** Zen gamified origami: fold real paper → scan with phone (Gemini Vision) → unlock next level. Relaxing, no timers, no fail penalty. Monetized via curated paper packs (Toyo, Oddy, Daler-Rowney) affiliate 8-12% + collaboration + own Shopify later.
- **Tagline:** `Fold. Breathe. Level Up.`
- **Vibe:** Monument Valley + Apple + Muji paper texture, sage/sand/cream/sick red palette, Framer-Motion-like folding animations.
- **Target:** Stressed 18-35, parents/kids, mindfulness, hobbyists.

## 2. Architecture (SPA + Serverless)
```
index.html (SPA shell, Tailwind CDN) 
  -> style.css (paper-grid, scan-line, breathe, dark overrides)
  -> app.js (LEVELS data, auth, progress sync, render, scan, zen)
  -> api/* (Vercel Serverless Functions, type: module)
     -> api/lib/db.js (Neon helper)
     -> api/auth/signup.js, login.js, forgot.js
     -> api/verify.js (Gemini Vision)
     -> api/progress.js (Neon + fallback)
```
- **No build step.** Static hosting via Vercel, APIs as `api/*.js` serverless. Output: `vercel.json` `functions.verify.maxDuration=10`.
- **State:** `localStorage` primary + Neon Postgres source of truth when logged in. Merge via `Set` union.

## 3. Tech Stack
- **Frontend:** Vanilla JS (no framework), Tailwind CDN, Google Fonts (Bricolage Grotesque, Instrument Serif, Space Mono), `paper-texture` SVG turbulence, `paper-grid` CSS.
- **Backend:** Node 22, `@neondatabase/serverless@1.1.0`, `bcryptjs@3.0.3`, native `fetch` to Gemini.
- **DB:** Neon Postgres `sikogami` (AWS US East 2 Ohio, pooled connection, `DATABASE_URL`). Fallback `NEON_DATABASE_URL`. If no URL → mock/local mode.
- **AI:** Gemini 1.5 Flash `generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY`, temp 0.4.
- **Hosting:** Vercel `njrankitsam11-7734s-projects/sikogami` (org `team_7ELib4M21slH5ZUg6Hew90EM`), alias `sikogami.vercel.app`. Local dev: `python3 -m http.server 8000`.
- **Vercel Env:** `DATABASE_URL` (pooled Neon), `GEMINI_API_KEY` (aistudio.google.com, optional — mock if absent).

## 4. File Map (Absolute)
- `/Users/sam/Desktop/SikOgami/index.html` (510 lines SPA shell)
- `/Users/sam/Desktop/SikOgami/app.js` (1032+ lines core logic)
- `/Users/sam/Desktop/SikOgami/style.css` (84 lines)
- `/Users/sam/Desktop/SikOgami/api/lib/db.js` (49 lines)
- `/Users/sam/Desktop/SikOgami/api/auth/signup.js` (41 lines)
- `/Users/sam/Desktop/SikOgami/api/auth/login.js` (38 lines)
- `/Users/sam/Desktop/SikOgami/api/auth/forgot.js` (33 lines)
- `/Users/sam/Desktop/SikOgami/api/verify.js` (145 lines)
- `/Users/sam/Desktop/SikOgami/api/progress.js` (63 lines)
- `/Users/sam/Desktop/SikOgami/package.json` (deps)
- `/Users/sam/Desktop/SikOgami/vercel.json`
- `/Users/sam/Desktop/SikOgami/SPEC.md` (this file) + `docs/*`

## 5. Levels (30, Source of Truth `app.js:2` LEVELS)
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
- **Neon Project:** `sikogami` (Admin org `njrankitsam11@gmail.com` Free), region `AWS US East 2 (Ohio)`, branch `production` Default, compute `.25 -> 2 CU`, storage/history 5GB. Connection string pooled `postgresql://neondb_owner:npg_x6fuNG0RqrhM@ep-silent-hill-ayo5xgn2-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` → `DATABASE_URL` Sensitive Prod.
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
| Method | Path | Req | Success (200) | Errors |
|---|---|---|---|---|
| POST | /api/auth/signup | {name, email, password min4} | {ok:true, user:{id,name,email,isAdmin}} or {ok:true,fallback:true,user} | 400 missing/short, 409 exists, 500 |
| POST | /api/auth/login | {email,password} | {ok:true,user} or fallback | 400, 401 wrong, 500 |
| POST | /api/auth/forgot | {email,newPassword min4} | {ok:true,message} or fallback | 400,404 no account,500 |
| POST | /api/verify | {image:dataURL/base64, levelId 1-30, levelTitle} | {pass,bool, score 0-99, feedback str, mode:"gemini"/"mock"/"fallback", expected str} always 200 (fallback pass on error) | 400 no image,405 |
| GET | /api/progress?email=... | query email | {ok:true,progress:int[]} or fallback | 400,500 |
| POST | /api/progress | {email, levelId? 1-30, progress? int[]} | {ok:true,progress:int[]} bulk replaces or single insert | 400,404 user not found,500 |
- CORS `*` `POST,GET,OPTIONS` `Content-Type`. `api/lib/db.js` `getSql()` lazy `neon(url)`, `ensureUsersTable()/ensureProgressTable()` idempotent.
- Dependencies: `@neondatabase/serverless` `neon`, `bcryptjs`, `fetch` to Gemini `temperature 0.4 maxTokens 300`, prompt: zen sensei generous 75 pass, any paper valid.

## 10. Frontend Modules (app.js)
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
- **Done (v1.0.0):** 30 levels perfect L1 8 steps single→multi, dark/light, AI scan mock+Gemini, auth (Neon + fallback admin unlock), progress sync Neon (bulk/single merge), garden dropdown+scroll+filters+stats+sync badge, zen immersive 4-6/4-4/4-7-8 + timer/quotes/sound mock, store affiliate, Vercel + Neon linked, all deployments aliased `sikogami.vercel.app`.
- **Pending:** Real Shopify store, video per step, QR sync desktop→phone, brand collab, analytics, rate limit, JWT session, email verification, progress per-world completion badges, admin panel to unlock user, sound audio files.
- **Debt:** `progress` local global not per-user until login merge is explicit; `api/verify` fallback always pass may be too generous; no rate limit.

## 14. Changelog (Update After Each Feature)
- **2026-08-22 v1.0.0:** Initial deploy 6 levels + Gemini mock + Vercel `sikogami.vercel.app` (`sikogami-r01r185nm`).
- **2026-08-22 v1.1.0:** Expanded to 30 levels 5 worlds single→multi, perfect 8-step L1, dark/light toggle via `sikogami_theme`.
- **2026-08-22 v1.2.0:** Auth LOGIN/SIGNUP/FORGOT modals, localStorage + admin `admin@sikogami.com/admin123` unlock all.
- **2026-08-22 v1.3.0:** Neon Postgres `sikogami` US East 2 pooled `DATABASE_URL` linked, `api/lib/db.js` + `api/auth/*` + fallback.
- **2026-08-22 v1.4.0:** Progress sync `sikogami_progress` table + `api/progress.js` GET/POST bulk/single + frontend merge + badge.
- **2026-08-22 v1.5.0:** Garden compact dropdown `▼ EXPAND` + horizontal snap `flex` + stats + filters + sync badge dark fix.
- **2026-08-22 v1.6.0:** Garden glow-up filters `all/collected/locked/single/multi` + stats `statCollected/Worlds/Papers` + 118px cards.
- **2026-08-22 v1.7.0:** Garden dropdown indicator obvious `▼ EXPAND` pill + dashed border + rotating chevron.
- **2026-08-22 v1.8.0:** Zen immersive `zen-bg` light/dark fix, timer `00:00`, pattern `4-6/4-4/4-7-8`, play/pause, quotes, sound mock.

## 15. How to Update Spec After Each Module
1. Edit `SPEC.md` relevant section (e.g., Levels, API, DB, Frontend) + bump `Last Updated` + `Version`.
2. Append row to `## 14. Changelog` with date, version, features, deployment hash.
3. If API changed, update `docs/API_SPEC.md` (if exists) or section 9.
4. If DB changed, update section 8 + `docs/DB_SPEC.md`.
5. Commit: `git add SPEC.md docs/* && git commit -m "docs: update spec vX.Y.Z — <feature>" && git push` (or Vercel auto).

## 16. Quick Start for New Session (Agent)
```bash
cat SPEC.md | head -n 50  # overview + agent instructions
cat docs/API_SPEC.md  # if exists
vercel --prod --yes  # deploy
# test
curl -s https://sikogami.vercel.app/api/progress?email=admin@sikogami.com
```

---

*End of SPEC.md — keep this the single source of truth.*

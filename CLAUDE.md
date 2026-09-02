# SikOgami — Claude Code Memory

> This file auto-loads every session. Full detail lives in `SPEC.md` — read it before writing any code.

## Mandatory session start
1. Read `SPEC.md` in full (source of truth — architecture, levels, API, DB, changelog).
2. Skim `docs/API_SPEC.md`, `docs/DB_SPEC.md`, `docs/FRONTEND_SPEC.md` if the task touches those areas.
3. Run `git log --oneline -10` to see what's landed since `SPEC.md`'s `Last Updated` date.

## Mandatory after each module/feature
1. Update the relevant `SPEC.md` section, bump **Version** + **Last Updated**, append a `## 14. Changelog` row.
2. Update `docs/API_SPEC.md` (API change), `docs/DB_SPEC.md` (schema change), or `docs/FRONTEND_SPEC.md` (UI change) as needed.
3. **Mirror every doc file into `public/`** — `public/SPEC.md`, `public/AGENT_GUIDE.md`, `public/docs/*.md`, `public/index.html` etc. must stay byte-identical to their root counterparts (`llms.txt` and agents fetch the `public/` copies directly; see Debt note in `SPEC.md` §13). A past session shipped a doc update without this and had to hotfix it (`f5c9afc`) — don't repeat that.
4. Never leave `SPEC.md` stale — the next session (or the next context-compaction in this one) treats it as ground truth.

## 30-second orientation
- **What it is:** Zen gamified origami PWA — fold paper, scan with phone (Gemini Vision), unlock next of 30 levels across 5 worlds.
- **Stack:** No-build static SPA (`index.html` + `app.js` + `style.css`, Tailwind CDN) + Vercel serverless `api/*.js` + Neon Postgres, with a public-facing agentic/SEO surface (`llms.txt`, `sitemap.xml`, `openapi.json`, MCP server at `api/mcp.js`, markdown content-negotiation via `middleware.js`).
- **Deploy:** `vercel --prod --yes`, prod alias `https://sikogami.vercel.app`. No build step — don't add one without discussing it first.
- **Known quirk:** root files (`index.html`, `app.js`, `style.css`, `SPEC.md`, `AGENT_GUIDE.md`, `docs/*`) are duplicated under `public/` and must be kept in sync manually (see step 3 above and `SPEC.md` §13 Debt).

Full architecture, levels data, API contracts, DB schema, and roadmap: **`SPEC.md`**.

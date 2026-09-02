# AGENT_GUIDE.md — How to Maintain Spec Across Sessions
> For any AI agent (Claude Code, Muse Spark, OpenCode, etc). Read SPEC.md first, then this.
> Claude Code sessions specifically: `/CLAUDE.md` auto-loads at session start and points back to `SPEC.md` — this file is the detailed procedure it references.

## Start of Session
1. Read `/Users/sam/Desktop/SikOgami/SPEC.md` fully (especially §0, §2, §8-9, §13, §17-18).
2. Skim `docs/API_SPEC.md`, `docs/DB_SPEC.md`, `docs/FRONTEND_SPEC.md` if touching those areas.
3. Check `git log --oneline -10` and `vercel ls` for recent deploys.
4. Verify env: `vercel env ls` shows DATABASE_URL, GEMINI_API_KEY.

## During Work
- Code is in `index.html`/`app.js`/`style.css`/`api/*` — keep Tailwind CDN, no build.
- Levels data is source of truth — sheets progression drives monetization.
- APIs fallback to local/mock if no env — don't break fallback.
- Dark mode uses `html.dark` class, not `media` — keep `.zen-bg` and `#garden` overrides.
- `public/` duplicates `index.html`, `app.js`, `style.css`, `SPEC.md`, `AGENT_GUIDE.md`, `docs/*` byte-for-byte (no build step ties them together). If you edit a root copy of any of these, edit the `public/` copy too in the same session — see SPEC.md §13 Debt for the incident this caused before.

## End of Session (Mandatory)
1. Update `SPEC.md` § relevant + §14 Changelog + bump `Last Updated` + `Version` (e.g., 2.3.0 → 2.3.1).
2. If API changed → update `docs/API_SPEC.md`; if DB → `docs/DB_SPEC.md`; if UI → `docs/FRONTEND_SPEC.md`; if the MCP/llms.txt/openapi/sitemap agentic surface changed → `SPEC.md` §17-18.
3. Copy every changed spec/doc/page into its `public/` counterpart (see During Work above).
4. Commit: `git add SPEC.md AGENT_GUIDE.md docs/* public/ && git commit -m "docs: update spec vX.Y.Z — <feature>" && git push` (or vercel deploy).
5. Never leave spec stale — next agent (or this same session after context compaction) will be lost.

## Example Update After Feature
Feature: "Add admin panel"
- Edit `SPEC.md` §10-11 (frontend), §9 (API if new endpoint), §8 (DB if new table), §12 add row `2026-08-23 v1.9.0: admin panel ... (deployment hash)`, bump header `Version: 1.9.0`.
- Edit `docs/FRONTEND_SPEC.md` nav section, `docs/API_SPEC.md` new POST /api/admin/unlock.
- Commit.

Keep it tight, factual, no fluff.

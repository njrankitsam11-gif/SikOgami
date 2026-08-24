# AGENT_GUIDE.md — How to Maintain Spec Across Sessions
> For AI agent (Muse Spark / OpenCode). Read SPEC.md first, then this.

## Start of Session
1. Read `/Users/sam/Desktop/SikOgami/SPEC.md` fully (especially §0, §2, §8-9).
2. Skim `docs/API_SPEC.md`, `docs/DB_SPEC.md`, `docs/FRONTEND_SPEC.md` if touching those areas.
3. Check `git log --oneline -10` and `vercel ls` for recent deploys.
4. Verify env: `vercel env ls` shows DATABASE_URL, GEMINI_API_KEY.

## During Work
- Code is in `index.html`/`app.js`/`style.css`/`api/*` — keep Tailwind CDN, no build.
- Levels data is source of truth — sheets progression drives monetization.
- APIs fallback to local/mock if no env — don't break fallback.
- Dark mode uses `html.dark` class, not `media` — keep `.zen-bg` and `#garden` overrides.

## End of Session (Mandatory)
1. Update `SPEC.md` § relevant + §12 Changelog + bump `Last Updated` + `Version` (e.g., 1.8.0 → 1.9.0).
2. If API changed → update `docs/API_SPEC.md`; if DB → `docs/DB_SPEC.md`; if UI → `docs/FRONTEND_SPEC.md`.
3. Commit: `git add SPEC.md docs/* && git commit -m "docs: update spec vX.Y.Z — <feature>" && git push` (or vercel deploy).
4. Never leave spec stale — next agent will be lost.

## Example Update After Feature
Feature: "Add admin panel"
- Edit `SPEC.md` §10-11 (frontend), §9 (API if new endpoint), §8 (DB if new table), §12 add row `2026-08-23 v1.9.0: admin panel ... (deployment hash)`, bump header `Version: 1.9.0`.
- Edit `docs/FRONTEND_SPEC.md` nav section, `docs/API_SPEC.md` new POST /api/admin/unlock.
- Commit.

Keep it tight, factual, no fluff.

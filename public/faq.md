# FAQ — SikOgami

**Last updated:** 2026-08-24

## 1. How does scan verification work?
Fold real paper following the 8-12 micro-step SVG (red valley, blue mountain, turn-over). Tap SCAN TO LEVEL UP, upload a phone photo. Frontend sends base64 to `POST /api/verify {image, levelId, levelTitle}`. With `GEMINI_API_KEY` set, Gemini 1.5 Flash returns `{pass, score 0-99, feedback}` generous at 75; without key, mock mode returns 88+ and always passes.

## 2. What paper do I need? Can I use newspaper?
Any paper works — even newspaper — but good paper folds better. Level tips say exact: e.g., Tulip needs one 15×15cm pink Kami. World 3 onward needs 2 papers up to World 5 Castle 12 papers. Curated packs: Toyo Kami Pastels 60 sheets ₹399, Oddy Washi 30 sheets ₹649, code `SIK15`.

## 3. How does admin unlock work?
Login with `admin@sikogami.com` / `admin123` (seeded in Neon `sikogami_users.is_admin`). `isUnlocked()` returns true for all 30 if `isAdmin()`. Normal users unlock linearly.

## 4. How does progress sync across devices?
On login, `loadProgressFromNeon()` GETs `/api/progress?email=` and merges via Set union. On each `saveProgress()` it POSTs bulk. Offline, localStorage is source.

## 5. Is Zen Mode different in dark mode?
Yes — `zen-bg` inverts light/dark, with 4-6 Calm, 4-4 Balanced, 4-7-8 Deep patterns, timer, play/pause.

More: [Home](/) • [About](/about) • [Contact](/contact) • [Privacy](/privacy) • [llms.txt](/llms.txt) • [openapi.json](/openapi.json)

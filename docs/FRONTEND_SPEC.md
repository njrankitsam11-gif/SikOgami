# FRONTEND_SPEC.md — SPA
> Sub-spec of `SPEC.md` §10-11. Update when `index.html`/`app.js`/`style.css` changes.

## index.html (510 lines)
- Head: Tailwind CDN + config colors (paper #FDFBF7, ink #0A0A0A, sick #FF3B30, sage #A8D5BA) + fonts, theme init before paint `sikogami_theme` dark toggle.
- Nav 64px: logo 折, themeBtn, zenBtn, MY GARDEN 0/30, authArea.
- Hero, Marquee, HowItWorks 3 cards, Levels Map (#levelsContainer + sticky world headers), Garden (collapsible dropdown + stats + 5 filter pills + horizontal snap grid), Store 3 cards, Footer, Fold Modal (steps left + scan right), Auth Modal 3 tabs, Toast, Zen Overlay (zen-bg timer/pattern/play/quote).
- No build, script app.js at bottom.

## app.js (1032 lines)
- LEVELS 30 objects (id,world,title,emoji,color,sheets,diff,unlocks,paperTip,steps 4-8). W1 1-6 single, W2 7-12 single, W3 13-18 2 papers, W4 19-24 modular, W5 25-30 master 12 max.
- State: gardenOpen, gardenFilter all|collected|locked|single|multi, TOTAL 30, progress[], etc.
- Auth helpers + Neon sync (saveProgress, syncProgressToNeon POST bulk, loadProgressFromNeon GET merge, setSyncStatus badge).
- Levels: renderLevels grouped sticky, alternating side, status, sheetBadge, dot.
- Garden: toggleGarden, setGardenFilter, renderGarden stats (collected/worlds/papers) + filtered 118px cards.
- Modal/steps/scan: FileReader base64 → POST /api/verify → showScanResultAI + confetti + completeLevel.
- Theme/zen lifecycle + drag drop + hero rotate.

## style.css (84 lines)
- paper-texture SVG turbulence, paper-grid 20px, scan-line 2.5s, marquee 20s, level-card hover -4px, breathing 4s, scrollbars.
- Dark: html.dark overrides bg-paper/white/cream/sand → dark, text-ink → light, nav, level-card, #garden #0A0A0A + text overrides, zen-bg light vs html.dark #0A0A0A.
- #gardenGrid thin red scrollbar, .zen-bg light/dark inversion.

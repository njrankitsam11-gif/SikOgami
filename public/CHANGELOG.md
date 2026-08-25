# CHANGELOG — SikOgami

## 2.3.0 — 2026-08-25 — 99→100 hardening: MCP handshake, Sunset, OpenAPI descriptions
- MCP: Streamable HTTP handshake at /.well-known/mcp (JSON-RPC initialize/tools/list/call, SSE) — vercel.json rewrites /.well-known/mcp → /api/mcp
- Versioning: Sunset Sat, 01 Mar 2027 + Deprecation + Link rel="sunset" + API-Version v1 on all /api/* responses
- OpenAPI: description + tags on all 9 operations, absolute https://sikogami.vercel.app/openapi.json, components.headers Sunset/Deprecation
- HTML: Link rel="alternate" for openapi (application/vnd.oai.openapi+json) and llms.txt

## 2.2.0 — 2026-08-25 — Agentic API hardening
- URL path versioning: canonical /api/v1/* (legacy /api/* kept as aliases)
- Structured JSON errors on every 4xx/5xx: {ok:false, error, code, message, hint, status, docs}
- JSON 404 catch-all for unknown /api/* routes (no more HTML error pages)
- Rate-limit headers on all API responses (RateLimit-Policy, RateLimit, X-RateLimit-*, Retry-After on 429)
- OpenAPI 3.0 spec now has typed response schemas + Error model for every operation
- Docs (/docs) linked from homepage footer

## 2.1.0 — 2026-08-24 — Colored paper per level
- SVG uses level color (#FFB3C1 tulip pink etc) + dark-stroke adapt

## 2.0.0 — 2026-08-24 — Refined morph
- Shape-accurate SVG (rectangle/diamond/boat hull etc), level-specific sequences, ghost hint, morph bar

## 1.9.0 — 2026-08-24 — Deepened paper crafting
- SVG dotted valley/mountain, 8-10 micro-steps per level

## 1.8.0 — 2026-08-24 — Zen immersive
- zen-bg light/dark fix, timer, patterns

## 1.7.0 — 2026-08-24 — Garden dropdown indicator

## 1.6.0 — 2026-08-24 — Garden glow-up filters

See /SPEC.md for full log.

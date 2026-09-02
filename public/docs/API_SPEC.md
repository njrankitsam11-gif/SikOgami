# API_SPEC.md — SikOgami Serverless API
> Sub-spec of `SPEC.md` §9. Update when any `api/*.js` changes.
> Base: `https://sikogami.vercel.app`
> Machine-readable spec: `/openapi.json` (typed response schemas + Error model)

## Versioning
- Canonical base: `/api/v1/*` (URL path versioning). Legacy `/api/*` paths remain as aliases.
- Breaking changes ship as a new path version (`/api/v2/*`).
- Deprecations are announced in `/CHANGELOG.md` and signalled with `Sunset`/`Deprecation` response headers at least 90 days before removal.

## Errors
Every 4xx/5xx response returns structured JSON:
`{ok:false, error, code, message, hint, status, docs}`
- `code` is machine-readable (e.g. `MISSING_FIELDS`, `INVALID_CREDENTIALS`, `EMAIL_EXISTS`, `USER_NOT_FOUND`, `INVALID_LEVEL`, `ROUTE_NOT_FOUND`, `METHOD_NOT_ALLOWED`, `INTERNAL_ERROR`).
- `hint` tells the caller how to fix the request.
- Unknown `/api/*` routes return a JSON 404 (`ROUTE_NOT_FOUND`), never HTML.

## Rate limits
120 requests / 60 seconds per client. Every API response carries:
`RateLimit-Policy`, `RateLimit`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
429 responses include `Retry-After`.

## Auth
### POST /api/auth/signup
Req: {name, email, password}
DB: INSERT RETURNING id,name,email,is_admin
Success: 200 {ok:true, user} or {ok:true,fallback:true,user}
Errors: 400, 409 exists, 500
Fallback: if no DATABASE_URL → localStorage mock
File: `api/auth/signup.js:1`

### POST /api/auth/login
Req: {email,password}
Success: 200 {ok:true,user} (hash removed) or fallback admin check
Errors: 401 wrong, 400, 500
File: `api/auth/login.js:1`

### POST /api/auth/forgot
Req: {email,newPassword}
Success: 200 {ok:true,message}
DB: UPDATE password_hash
Fallback: local array update
Errors: 404 no account
File: `api/auth/forgot.js:1`

## Verify
### POST /api/verify
Req: {image:dataURL, levelId 1-30, levelTitle}
Logic: expectedMap 1-30 → prompt zen generous 75 threshold → Gemini 1.5 Flash `temperature 0.4`
No key → mock 88+rand pass
Fail → fallback pass 85/82 always 200
Resp: {pass,bool, score, feedback, mode:"gemini"|"mock"|"fallback", expected}
Env: GEMINI_API_KEY
File: `api/verify.js:1`

## Progress
### GET /api/progress?email=...
Resp: {ok:true,progress:int[]} or fallback []
### POST /api/progress
Body: {email, levelId} single insert OR {email, progress:int[]} bulk replace (DELETE+INSERT)
Resp: {ok:true,progress:int[]}
DB: sikogami_progress FK user_id
Fallback: {ok:true,fallback:true,progress:[]}
File: `api/progress.js:1`

## MCP
### GET /api/mcp (aliases: /.well-known/mcp, /.well-known/mcp.json)
Resp: MCP manifest `{name, version, description, transport:{type:"streamable-http",url}, tools, provider, capabilities, serverInfo}`
File: `api/mcp.js:49`

### POST /api/mcp
JSON-RPC 2.0 over Streamable HTTP. Body: `{jsonrpc:"2.0", id, method, params}`.
Response is JSON, or `text/event-stream` (one `data: {...}` frame) if request `Accept` includes `text/event-stream`.

| method | params | result |
|---|---|---|
| `initialize` | `{protocolVersion?}` | `{protocolVersion, capabilities, serverInfo, instructions}` |
| `notifications/initialized` / `initialized` | — | 202, no body (ack only) |
| `tools/list` / `list_tools` | — | `{tools: TOOL_DEFS}` |
| `tools/call` / `call_tool` | `{name, arguments}` | tool-specific `{content, structuredContent}` or JSON-RPC error `-32601` if unknown |
| `ping` | — | `{}` |

Tools (`TOOL_DEFS`):
- `listLevels` — no input → `{levels:[...30 LEVELS...], count:30}`. Level objects mirror `app.js` `LEVELS` (id, title, world, sheets, emoji) but are hand-duplicated in `api/mcp.js` — keep in sync when levels change.
- `getProgress` — `{email}` → **stub**, always returns `{progress:[]}`. Does not query Neon; a real implementation should reuse `api/progress.js`'s query.
- `verifyOrigami` — `{image, levelId, levelTitle}` → returns a hint to call `POST /api/verify` directly; does not perform verification inline.

Non-JSON-RPC legacy bodies (`{tool:"listLevels"}`, `{method:"listLevels"}`, etc.) are still accepted for backward compat; any other body gets `{ok:true, echo:body, tools:[...]}`.

Note: `api/mcp/route.js` is an earlier Next.js-route-handler-style stub **not** wired into `vercel.json` — it has no effect on the deployed API. `api/mcp.js` is the live implementation.
File: `api/mcp.js:1`

## Lib
`api/lib/db.js:1` getSql() neon(DATABASE_URL), ensureUsersTable(), ensureProgressTable() + admin seed bcrypt10
`api/lib/respond.js:1` apiHeaders() CORS+Vary+RateLimit+versioning headers (adds `Deprecation: true` on legacy `/api/*` vs `false` on `/api/v1/*`, `Sunset`/`Link rel="sunset"`), sendError() structured JSON errors, sendOk()
`api/index.js:1`, `api/[...path].js:1` catch-alls → JSON 404 ROUTE_NOT_FOUND for unknown /api/* routes (index.js handles the bare `/api` base path that the `[...path]` catch-all misses)

## Testing
curl -s -X POST https://sikogami.vercel.app/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"admin@sikogami.com","password":"admin123"}'
curl -s "https://sikogami.vercel.app/api/v1/progress?email=admin@sikogami.com"
curl -s https://sikogami.vercel.app/api/mcp
curl -s -X POST https://sikogami.vercel.app/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

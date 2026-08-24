# API_SPEC.md — SikOgami Serverless API
> Sub-spec of `SPEC.md` §9. Update when any `api/*.js` changes.
> Base: `https://sikogami.vercel.app`

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

## Lib
`api/lib/db.js:1` getSql() neon(DATABASE_URL), ensureUsersTable(), ensureProgressTable() + admin seed bcrypt10

## Testing
curl -s -X POST https://sikogami.vercel.app/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@sikogami.com","password":"admin123"}'
curl -s "https://sikogami.vercel.app/api/progress?email=admin@sikogami.com"

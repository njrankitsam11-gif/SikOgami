// Is Agentic verification tests — run with: node tests/agentic.test.js
// Uses live deployment https://sikogami.vercel.app
const BASE = 'https://sikogami.vercel.app';

async function check(name, fn) {
  try { await fn(); console.log(`✓ ${name}`); return true; }
  catch (e) { console.log(`✗ ${name}: ${e.message}`); return false; }
}

async function run() {
  let passed=0, total=0;
  const assert = (cond, msg) => { if(!cond) throw new Error(msg); };

  total++; if (await check('404 returns 404 with markdown body', async()=>{
    const res = await fetch(`${BASE}/not-exist-${Date.now()}`, {headers:{Accept:'text/markdown'}});
    assert(res.status===404, `status ${res.status} != 404`);
    assert(res.headers.get('vary')?.includes('Accept'), 'Vary missing Accept');
    const body = await res.text();
    assert(body.includes('llms.txt'), 'body missing llms.txt');
    assert(body.includes('sitemap.xml'), 'body missing sitemap');
  })) passed++;

  total++; if (await check('Markdown negotiation homepage', async()=>{
    const res = await fetch(`${BASE}/`, {headers:{Accept:'text/markdown'}});
    assert(res.headers.get('content-type')?.includes('text/markdown'), `content-type ${res.headers.get('content-type')}`);
    assert(res.headers.get('vary')?.includes('Accept'), 'Vary missing');
    const body = await res.text();
    assert(body.startsWith('# SikOgami'), 'not markdown');
  })) passed++;

  total++; if (await check('Vary header on HTML', async()=>{
    const res = await fetch(`${BASE}/`);
    assert(res.headers.get('vary')?.includes('Accept'), `Vary ${res.headers.get('vary')}`);
  })) passed++;

  total++; if (await check('llms.txt exists with when-to-use', async()=>{
    const res = await fetch(`${BASE}/llms.txt`);
    assert(res.status===200, 'llms 404');
    const t = await res.text();
    assert(t.includes('When to use SikOgami'), 'missing when-to-use');
    assert(t.includes('/openapi.json'), 'missing openapi');
  })) passed++;

  total++; if (await check('sitemap.xml valid', async()=>{
    const res = await fetch(`${BASE}/sitemap.xml`);
    assert(res.status===200, 'sitemap 404');
    const t = await res.text();
    assert(t.includes('<urlset'), 'not xml');
    assert(t.includes('<lastmod>2026-08-24</lastmod>'), 'missing lastmod');
  })) passed++;

  total++; if (await check('robots.txt', async()=>{
    const t = await (await fetch(`${BASE}/robots.txt`)).text();
    assert(t.includes('Sitemap: https://sikogami.vercel.app/sitemap.xml'), 'missing sitemap');
    assert(t.includes('Allow: /llms.txt'), 'missing llms');
  })) passed++;

  total++; if (await check('openapi.json', async()=>{
    const j = await (await fetch(`${BASE}/openapi.json`)).json();
    assert(j.openapi?.startsWith('3.'), 'not openapi');
    assert(j.info.title.includes('SikOgami'), 'title missing SikOgami');
  })) passed++;

  total++; if (await check('Metadata completeness', async()=>{
    const html = await (await fetch(`${BASE}/`)).text();
    assert(html.includes('rel="canonical"'), 'missing canonical');
    assert(html.includes('html lang="en"'), 'missing lang');
    assert(html.includes('property="og:image"'), 'missing og:image');
    assert(html.includes('property="og:type"'), 'missing og:type');
  })) passed++;

  total++; if (await check('JSON-LD Organization', async()=>{
    const html = await (await fetch(`${BASE}/`)).text();
    assert(html.includes('SoftwareApplication'), 'missing SoftwareApplication');
    assert(html.includes('Organization'), 'missing Organization');
    assert(html.includes('contactPoint'), 'missing contactPoint');
    assert(html.includes('PostalAddress'), 'missing address');
  })) passed++;

  total++; if (await check('Trust pages >500 chars', async()=>{
    for(const p of ['/about','/contact','/privacy']){
      const html = await (await fetch(`${BASE}${p}`)).text();
      assert(html.length > 500, `${p} too short ${html.length}`);
      const res = await fetch(`${BASE}${p}`);
      assert(res.status===200, `${p} 404`);
    }
  })) passed++;

  total++; if (await check('MCP manifest', async()=>{
    const j = await (await fetch(`${BASE}/.well-known/mcp`)).json();
    assert(j.transport.type === 'streamable-http', 'not streamable-http');
    const j2 = await (await fetch(`${BASE}/api/mcp`)).json();
    assert(j2.name.includes('SikOgami'), 'mcp name missing');
  })) passed++;

  total++; if (await check('og-image exists', async()=>{
    const res = await fetch(`${BASE}/og-image.png`);
    assert(res.status===200, 'og-image 404');
    assert(res.headers.get('content-type')?.includes('image') || res.headers.get('content-disposition')?.includes('og-image'), 'not image');
  })) passed++;

  console.log(`\n${passed}/${total} checks passed`);
  process.exit(passed===total?0:1);
}
run();

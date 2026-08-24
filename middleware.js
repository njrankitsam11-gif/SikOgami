export default async function middleware(request) {
  const url = new URL(request.url);
  const accept = request.headers.get('accept') || '';
  const isMarkdown = accept.includes('text/markdown');

  // For markdown requests, serve llms.txt or page-specific md
  if (isMarkdown) {
    // Map known paths to markdown
    let mdPath = null;
    if (url.pathname === '/' || url.pathname === '/index.html') mdPath = '/llms.txt';
    else if (url.pathname === '/about' || url.pathname === '/about.html') mdPath = '/about.md';
    else if (url.pathname === '/contact' || url.pathname === '/contact.html') mdPath = '/contact.md';
    else if (url.pathname === '/privacy' || url.pathname === '/privacy.html') mdPath = '/privacy.md';
    else if (url.pathname === '/llms.txt') mdPath = '/llms.txt';
    else if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt' || url.pathname === '/openapi.json' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.well-known/')) mdPath = null;

    if (mdPath) {
      try {
        const mdUrl = new URL(mdPath, url.origin);
        const mdRes = await fetch(mdUrl);
        if (mdRes.ok) {
          const body = await mdRes.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Vary': 'Accept, Accept-Encoding',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch (e) {}
    }

    // Fallback: return 404 markdown for unknown paths
    const isKnownAsset = url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/about' || url.pathname === '/about.html' || url.pathname === '/contact' || url.pathname === '/contact.html' || url.pathname === '/privacy' || url.pathname === '/privacy.html' || url.pathname === '/llms.txt' || url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt' || url.pathname === '/openapi.json' || url.pathname === '/og-image.png' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/.well-known/') || url.pathname === '/style.css' || url.pathname === '/app.js';
    if (!isKnownAsset) {
      const body = `# 404 — SikOgami\n\nThat path \`${url.pathname}\` does not exist. Try:\n\n- [Home](/) — SikOgami 30 levels\n- [About](/about)\n- [Contact](/contact)\n- [Privacy](/privacy)\n- [llms.txt](/llms.txt)\n- [sitemap.xml](/sitemap.xml)\n- [openapi.json](/openapi.json)\n- API: POST /api/auth/signup, /api/auth/login, /api/auth/forgot, POST /api/verify, GET/POST /api/progress\n`;
      return new Response(body, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept, Accept-Encoding',
        },
      });
    }
  }

  // For non-markdown or markdown fallback, continue and add Vary
  const res = await fetch(request);
  const newHeaders = new Headers(res.headers);
  // Ensure Vary includes Accept
  const vary = newHeaders.get('Vary');
  if (!vary) newHeaders.set('Vary', 'Accept, Accept-Encoding');
  else if (!vary.includes('Accept')) newHeaders.set('Vary', vary + ', Accept, Accept-Encoding');
  return new Response(res.body, {
    status: res.status,
    headers: newHeaders,
  });
}

export const config = {
  matcher: ['/((?!api/|_next/|_static/|favicon.ico).*)'],
};

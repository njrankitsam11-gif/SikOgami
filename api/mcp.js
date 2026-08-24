export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Accept, Accept-Encoding');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') {
    return res.status(200).json({
      name: "SikOgami MCP",
      version: "2.1.0",
      transport: { type: "streamable-http", url: "https://sikogami.vercel.app/api/mcp" },
      tools: ["verifyOrigami","getProgress","listLevels"]
    });
  }
  if (req.method === 'POST') {
    const body = req.body || {};
    return res.status(200).json({ ok: true, echo: body, tools: ["verifyOrigami","getProgress","listLevels"] });
  }
  return res.status(405).json({ error: "Method not allowed" });
}

export async function GET() {
  return new Response(JSON.stringify({
    name: "SikOgami MCP",
    version: "2.1.0",
    transport: { type: "streamable-http", url: "https://sikogami.vercel.app/api/mcp" },
    tools: ["verifyOrigami","getProgress","listLevels"]
  }), { headers: { "Content-Type": "application/json", "Vary": "Accept, Accept-Encoding" } });
}
export async function POST(req) {
  const body = await req.json().catch(()=>({}));
  // minimal echo for handshake
  return new Response(JSON.stringify({ ok: true, echo: body }), { headers: { "Content-Type": "application/json", "Vary": "Accept, Accept-Encoding" } });
}

import { apiHeaders, sendError } from './lib/respond.js';

const LEVELS = [
  {id:1,title:"PAPER BOAT",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"⛵"},
  {id:2,title:"PAPER CUP",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"🥤"},
  {id:3,title:"TULIP BLOOM",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"🌷"},
  {id:4,title:"GENTLE WHALE",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"🐋"},
  {id:5,title:"DOG FACE",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"🐶"},
  {id:6,title:"HEART",world:"WORLD 1 • THE CALM SHORE",sheets:1,emoji:"❤️"},
  {id:7,title:"BUTTERFLY",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🦋"},
  {id:8,title:"FOX FACE",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🦊"},
  {id:9,title:"JUMPING FROG",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🐸"},
  {id:10,title:"CRANE",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🕊️"},
  {id:11,title:"FISH",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🐟"},
  {id:12,title:"PENGUIN",world:"WORLD 2 • THE QUIET FOREST",sheets:1,emoji:"🐧"},
  {id:13,title:"TULIP WITH STEM",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"🌷"},
  {id:14,title:"BOAT WITH SAIL",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"⛵"},
  {id:15,title:"BUTTERFLY GARDEN",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"🦋"},
  {id:16,title:"FOX FAMILY",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"🦊"},
  {id:17,title:"FROG POND",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"🐸"},
  {id:18,title:"CRANE COUPLE",world:"WORLD 3 • THE BLOOM RIVER",sheets:2,emoji:"🕊️"},
  {id:19,title:"MODULAR CUBE",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:6,emoji:"🧊"},
  {id:20,title:"NINJA STAR",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:2,emoji:"⭐"},
  {id:21,title:"5-PETAL STAR",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:5,emoji:"🌟"},
  {id:22,title:"KUSUDAMA FLOWER",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:5,emoji:"🌸"},
  {id:23,title:"SAMURAI HELMET",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:2,emoji:"⛩️"},
  {id:24,title:"BOAT FLEET",world:"WORLD 4 • THE SHADOW TEMPLE",sheets:3,emoji:"⛵"},
  {id:25,title:"DRAGON",world:"WORLD 5 • THE MASTER'S PEAK",sheets:1,emoji:"🐉"},
  {id:26,title:"PEACOCK",world:"WORLD 5 • THE MASTER'S PEAK",sheets:2,emoji:"🦚"},
  {id:27,title:"ELEPHANT",world:"WORLD 5 • THE MASTER'S PEAK",sheets:1,emoji:"🐘"},
  {id:28,title:"SAMURAI ARMOR",world:"WORLD 5 • THE MASTER'S PEAK",sheets:3,emoji:"🛡️"},
  {id:29,title:"LOTUS GARDEN",world:"WORLD 5 • THE MASTER'S PEAK",sheets:7,emoji:"🪷"},
  {id:30,title:"SIKOGAMI CASTLE",world:"WORLD 5 • THE MASTER'S PEAK",sheets:12,emoji:"🏯"}
];

const TOOL_DEFS = [
  { name:"verifyOrigami", description:"Verify an origami photo via Gemini Vision for a given level", inputSchema:{ type:"object", properties:{ image:{type:"string",description:"base64 data URL"}, levelId:{type:"integer",minimum:1,maximum:30}, levelTitle:{type:"string"} }, required:["image","levelId"] } },
  { name:"getProgress", description:"Get completed level ids for a user by email", inputSchema:{ type:"object", properties:{ email:{type:"string",format:"email"} }, required:["email"] } },
  { name:"listLevels", description:"List all 30 SikOgami levels with world, sheets and emoji", inputSchema:{ type:"object", properties:{} } },
];

function jsonRpcResult(id, result) {
  return { jsonrpc:"2.0", id, result };
}
function jsonRpcError(id, code, message) {
  return { jsonrpc:"2.0", id, error:{ code, message } };
}

export default async function handler(req, res) {
  apiHeaders(res, 'GET, POST, OPTIONS', req);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "SikOgami MCP",
      version: "2.1.0",
      description: "SikOgami Model Context Protocol server — tools for origami verification and progress. Use Streamable HTTP transport.",
      transport: { type: "streamable-http", url: "https://sikogami.vercel.app/api/mcp" },
      tools: TOOL_DEFS,
      provider: { name:"SikOgami", url:"https://sikogami.vercel.app" },
      capabilities: { tools: {} },
      serverInfo: { name:"SikOgami MCP", version:"2.1.0" }
    });
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const accept = req.headers.accept || "";

    // JSON-RPC 2.0 handling for MCP Streamable HTTP
    if (body.jsonrpc === "2.0" && typeof body.method === "string") {
      const id = body.id;
      const method = body.method;

      // initialize handshake
      if (method === "initialize") {
        const result = {
          protocolVersion: body.params?.protocolVersion || "2024-11-05",
          capabilities: { tools: { listChanged:false }, resources:{}, prompts:{} },
          serverInfo: { name:"SikOgami MCP", version:"2.1.0" },
          instructions: "SikOgami MCP — verify origami photos, sync progress, list levels. Tools: verifyOrigami, getProgress, listLevels."
        };
        // Support both JSON and SSE (if Accept includes text/event-stream, wrap as SSE)
        if (accept.includes("text/event-stream")) {
          res.setHeader("Content-Type", "text/event-stream");
          res.setHeader("Cache-Control", "no-cache");
          const payload = `data: ${JSON.stringify(jsonRpcResult(id, result))}\n\n`;
          return res.status(200).send(payload);
        }
        return res.status(200).json(jsonRpcResult(id, result));
      }

      // notifications/initialized — no response required, but ack with 202
      if (method === "notifications/initialized" || method === "initialized") {
        return res.status(202).end();
      }

      // tools/list
      if (method === "tools/list" || method === "list_tools") {
        const result = { tools: TOOL_DEFS };
        if (accept.includes("text/event-stream")) {
          res.setHeader("Content-Type", "text/event-stream");
          return res.status(200).send(`data: ${JSON.stringify(jsonRpcResult(id, result))}\n\n`);
        }
        return res.status(200).json(jsonRpcResult(id, result));
      }

      // tools/call
      if (method === "tools/call" || method === "call_tool") {
        const toolName = body.params?.name || body.params?.tool;
        const args = body.params?.arguments || body.params?.args || {};
        if (toolName === "listLevels") {
          const result = { content: [{ type:"text", text: JSON.stringify({ levels: LEVELS, count: 30 }) }], structuredContent: { levels: LEVELS, count: 30 } };
          if (accept.includes("text/event-stream")) {
            res.setHeader("Content-Type", "text/event-stream");
            return res.status(200).send(`data: ${JSON.stringify(jsonRpcResult(id, result))}\n\n`);
          }
          return res.status(200).json(jsonRpcResult(id, result));
        }
        if (toolName === "getProgress") {
          // For demo, return empty progress; real would query DB
          const result = { content: [{ type:"text", text: JSON.stringify({ progress: [] }) }], structuredContent: { progress: [] } };
          return res.status(200).json(jsonRpcResult(id, result));
        }
        if (toolName === "verifyOrigami") {
          const result = { content: [{ type:"text", text: "Use POST /api/verify with image and levelId for verification" }], structuredContent: { hint: "Use /api/verify" } };
          return res.status(200).json(jsonRpcResult(id, result));
        }
        return res.status(200).json(jsonRpcError(id, -32601, `Unknown tool ${toolName}`));
      }

      // ping
      if (method === "ping") {
        return res.status(200).json(jsonRpcResult(id, {}));
      }

      return res.status(200).json(jsonRpcError(id, -32601, `Method not found: ${method}`));
    }

    // Legacy non-JSON-RPC handling — keep backward compat for old clients and is-agentic fallback
    if (body.tool === 'listLevels' || body.method === 'listLevels' || body.name === 'listLevels' || body.params?.name === 'listLevels') {
      return res.status(200).json({ ok: true, levels: LEVELS, count: 30 });
    }
    // Generic echo for other legacy calls
    return res.status(200).json({ ok: true, echo: body, tools: TOOL_DEFS.map(t=>t.name) });
  }

  return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed', 'Use GET for the MCP manifest or POST to call a tool (listLevels, verifyOrigami, getProgress).');
}

import { apiHeaders, sendError } from './lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'GET, POST, OPTIONS');
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
    // Handle listLevels tool — return full 30 levels for completeness check
    if (body.tool === 'listLevels' || body.method === 'listLevels' || body.name === 'listLevels') {
      const levels = [
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
      return res.status(200).json({ ok: true, levels, count: 30 });
    }
    return res.status(200).json({ ok: true, echo: body, tools: ["verifyOrigami","getProgress","listLevels"] });
  }
  return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed', 'Use GET for the MCP manifest or POST to call a tool (listLevels, verifyOrigami, getProgress).');
}

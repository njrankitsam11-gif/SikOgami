// SikOgami AI Verify - Gemini Vision
// POST { image: "data:image/jpeg;base64,...", levelId: 1, levelTitle: "PAPER BOAT" }
// Requires env GEMINI_API_KEY (get from aistudio.google.com)
// Fallback: mock mode if no key -> always passes with 88% for demo
import { apiHeaders, sendError } from './lib/respond.js';

export default async function handler(req, res) {
  apiHeaders(res, 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  // Markdown negotiation: if agent asks for markdown, return markdown variant
  const accept = req.headers.accept || '';
  const wantsMarkdown = accept.includes('text/markdown');
  if (wantsMarkdown && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.status(200).send(`# SikOgami API\n\nEndpoint: ${req.url}\nSee /openapi.json for JSON usage.`);
  }
  if (req.method !== 'POST') return sendError(res, 405, 'METHOD_NOT_ALLOWED', 'POST only', 'Send a POST request with JSON body {image, levelId, levelTitle}.');

  try {
    const { image, levelId, levelTitle } = req.body;
    if (!image) return sendError(res, 400, 'MISSING_IMAGE', 'No image provided', 'Include image as a data:image/jpeg;base64,... string plus levelId (1-30).');

    const apiKey = process.env.GEMINI_API_KEY;
    const target = levelTitle || `LEVEL ${levelId}`;
    const expectedMap = {
      1: "a paper boat / origami boat (single sheet, 8 precise folds, hull open)",
      2: "a paper cup / origami cup",
      3: "an origami tulip bloom (single sheet)",
      4: "an origami whale",
      5: "an origami dog face",
      6: "an origami heart",
      7: "an origami butterfly",
      8: "an origami fox face",
      9: "an origami jumping frog",
      10: "an origami crane bird",
      11: "an origami fish",
      12: "an origami penguin",
      13: "an origami tulip with stem (2 papers: flower + stem)",
      14: "an origami boat with sail (2 papers)",
      15: "two origami butterflies / butterfly garden (2 papers)",
      16: "two origami fox faces / fox family (2 papers, parent + kit)",
      17: "two origami frogs / frog pond (2 papers)",
      18: "two origami cranes / crane couple (2 papers)",
      19: "an origami modular cube (6 sheets)",
      20: "an origami ninja star shuriken (2 papers)",
      21: "an origami 5-point star (5 papers)",
      22: "an origami kusudama flower ball (5 papers)",
      23: "origami samurai helmet + sword (2 papers)",
      24: "three origami boats / boat fleet (3 papers)",
      25: "an origami dragon (single sheet master)",
      26: "an origami peacock with fan tail (2 papers)",
      27: "an origami elephant",
      28: "origami samurai armor with helmet and sword (3 papers)",
      29: "an origami lotus garden with 6 lotus on pond (7 papers)",
      30: "an origami castle / sikogami castle modular (12 papers)"
    };
    const expected = expectedMap[levelId] || target;

    // If no API key -> MOCK MODE (still delightful, keeps site working)
    if (!apiKey) {
      console.log('[SikOgami] No GEMINI_API_KEY — mock mode');
      // Simulate a bit of randomness but mostly pass (zen philosophy)
      const mockScore = 88 + Math.floor(Math.random() * 9);
      return res.status(200).json({
        pass: true,
        score: mockScore,
        mode: 'mock',
        feedback: `Mock mode (no API key yet). Detected ${expected} — beautiful creases! Add GEMINI_API_KEY in Vercel env to enable real AI.`,
        expected
      });
    }

    // Extract base64
    const base64 = image.includes(',') ? image.split(',')[1] : image;
    const mimeType = image.includes('data:') ? image.split(';')[0].split(':')[1] : 'image/jpeg';

    const prompt = `You are SikOgami's zen origami sensei. Look at this photo. The user is trying to fold: "${expected}" (Level ${levelId}: ${target}).

Task: Is this image an origami/paper craft that matches "${expected}"?
- Be generous and encouraging (zen vibe). If it resembles the target even roughly, PASS.
- Score 0-100: <55 = clearly wrong object, 55-74 = close but not quite, 75-100 = correct origami.
- Consider ANY paper works: white, color, newspaper, rough folds — all valid. Low light/angle is okay.
- Do NOT be strict about perfection. Effort = success in SikOgami.

Return ONLY valid JSON: {"pass": boolean, "score": number, "feedback": "1 sentence warm encouraging feedback mentioning what you see"}
Example pass: {"pass": true, "score": 92, "feedback": "Lovely boat! Your hull creases are clean and it sits so proudly — ready to sail."}
Example fail: {"pass": false, "score": 42, "feedback": "I see a crumpled paper but not quite a boat yet — try sharper center folds and open the hull gently."}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: base64 } }
              ]
            }
          ],
          generationConfig: { temperature: 0.4, maxOutputTokens: 300 }
        })
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini error', data);
      return res.status(200).json({
        pass: true,
        score: 85,
        mode: 'fallback',
        feedback: `AI busy, but we trust your fold! Showing fallback pass for ${expected}.`,
        error: data
      });
    }

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in Gemini response: ' + text);
    let parsed = JSON.parse(jsonMatch[0]);

    // Enforce pass logic: 75+ = pass
    if (typeof parsed.score !== 'number') parsed.score = 80;
    if (typeof parsed.pass !== 'boolean') parsed.pass = parsed.score >= 75;
    // Zen override: if score 60-74, still pass but encourage (keep relaxing)
    // Uncomment to be extra zen: if (parsed.score >= 62) parsed.pass = true;

    return res.status(200).json({
      pass: parsed.pass,
      score: Math.min(99, Math.max(0, Math.round(parsed.score))),
      feedback: parsed.feedback || `Nice work on your ${expected}!`,
      mode: 'gemini',
      expected
    });

  } catch (e) {
    console.error('Verify error', e);
    return res.status(200).json({
      pass: true,
      score: 82,
      mode: 'error-fallback',
      feedback: `We couldn't reach the AI sensei, but your fold shines anyway! (error: ${e.message.slice(0,80)})`,
    });
  }
}

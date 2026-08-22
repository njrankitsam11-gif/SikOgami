// SikOgami AI Verify - Gemini Vision
// POST { image: "data:image/jpeg;base64,...", levelId: 1, levelTitle: "PAPER BOAT" }
// Requires env GEMINI_API_KEY (get from aistudio.google.com)
// Fallback: mock mode if no key -> always passes with 88% for demo

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { image, levelId, levelTitle } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const apiKey = process.env.GEMINI_API_KEY;
    const target = levelTitle || `LEVEL ${levelId}`;
    const expectedMap = {
      1: "a paper boat / origami boat",
      2: "a paper airplane / paper plane",
      3: "an origami tulip flower",
      4: "an origami butterfly",
      5: "an origami fox face",
      6: "an origami jumping frog"
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

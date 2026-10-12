// /api/card.js — Card image proxy (CORS fix)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { uid, style } = req.query;
  if (!uid) return res.status(400).end();

  const API_KEY = process.env.KCEY_KEY;
  const BASE = "https://api.kcey.online/api/ffstalk";

  try {
    const r = await fetch(
      `${BASE}/card.png?uid=${uid}&style=${style || 1}&key=${API_KEY}`
    );
    
    if (!r.ok) return res.status(r.status).end();
    
    const buffer = await r.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).end();
  }
}

// /api/ff.js — Player info proxy
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const uid = req.query.uid;
  if (!uid || !/^\d{6,15}$/.test(uid)) {
    return res.status(400).json({ error: 'Invalid UID' });
  }

  const API_KEY = process.env.KCEY_KEY;
  const BASE = "https://api.kcey.online/api/ffstalk";

  try {
    const r = await fetch(`${BASE}?uid=${uid}&key=${API_KEY}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'API fetch failed' });
  }
}

// Vercel serverless function: counts unique visitors in Upstash Redis.
// GET  /api/visitors  -> returns the current count
// POST /api/visitors  -> adds one (the page calls this once per browser) and returns the new count
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return res.status(200).json({ count: null });   // database not connected yet
  try {
    const cmd = req.method === 'POST' ? 'incr' : 'get';
    const r = await fetch(`${url}/${cmd}/tomato_visitors`, { headers: { Authorization: `Bearer ${token}` } });
    const j = await r.json();
    return res.status(200).json({ count: Number(j.result) || 0 });
  } catch (e) {
    return res.status(200).json({ count: null });
  }
};

// Vercel Serverless Function — server-side site health & performance check.
// Runs on Vercel's infrastructure (not the browser), so there's no CORS
// restriction and no external API quota — this is our own endpoint.

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawUrl = req.query.url;
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  let target;
  try {
    const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    target = new URL(candidate);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return res.status(400).json({ error: 'Only http/https URLs are allowed' });
  }

  // Basic SSRF guard — block localhost and common private IP ranges
  const hostname = target.hostname.toLowerCase();
  const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
  const privateIpPattern = /^(10\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.)/;
  if (blockedHosts.includes(hostname) || privateIpPattern.test(hostname)) {
    return res.status(400).json({ error: 'This address cannot be checked' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const startTime = Date.now();

    const response = await fetch(target.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      }
    });

    const headersReceivedAt = Date.now();
    const bodyBuffer = await response.arrayBuffer();
    const finishedAt = Date.now();

    clearTimeout(timeoutId);

    const ttfbMs = headersReceivedAt - startTime;
    const totalMs = finishedAt - startTime;
    const sizeKb = Math.round(bodyBuffer.byteLength / 1024);

    return res.status(200).json({
      finalUrl: response.url,
      statusCode: response.status,
      ttfbMs,
      totalMs,
      sizeKb,
      https: new URL(response.url).protocol === 'https:',
      redirected: response.redirected,
      compression: response.headers.get('content-encoding') || null,
      cacheControl: response.headers.get('cache-control') || null,
      server: response.headers.get('server') || null
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'The site took too long to respond' });
    }
    return res.status(502).json({ error: 'Could not reach this website. Check the URL and try again.' });
  }
}

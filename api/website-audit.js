// Vercel Serverless Function — real website audit. Fetches the target page
// server-side and inspects the actual HTML/headers. No fabricated data,
// no hash-based fake scoring.

const METADATA_HOST = '169.254.169.254';

function isBlockedHost(hostname) {
  const h = hostname.toLowerCase();
  const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '::1', METADATA_HOST];
  const privateIpPattern = /^(10\.|172\.(1[6-9]|2\d|3[0-1])\.|192\.168\.|169\.254\.)/;
  return blocked.includes(h) || privateIpPattern.test(h);
}

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

  if (isBlockedHost(target.hostname)) {
    return res.status(400).json({ error: 'This address cannot be checked' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

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
    const ttfbMs = Date.now() - startTime;
    const html = await response.text();
    const totalMs = Date.now() - startTime;
    clearTimeout(timeoutId);

    const finalUrl = response.url;
    const sizeKb = Math.round(new TextEncoder().encode(html).length / 1024);

    // Lightweight, real HTML inspection via regex — no external DOM library dependency.
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const titleText = titleMatch ? titleMatch[1].trim() : '';

    const descMatch =
      html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const descText = descMatch ? descMatch[1].trim() : '';

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
    const canonicalHref = canonicalMatch ? canonicalMatch[1].trim() : '';

    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    const robotsContent = robotsMatch ? robotsMatch[1].toLowerCase() : '';
    const blocksIndexing = robotsContent.includes('noindex');

    const viewportPresent = /<meta[^>]+name=["']viewport["']/i.test(html);
    const hasLang = /<html[^>]+lang=["'][^"']+["']/i.test(html);

    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;

    const imgTags = html.match(/<img\b[^>]*>/gi) || [];
    const imgsMissingAlt = imgTags.filter((tag) => !/alt\s*=\s*["'][^"']*["']/i.test(tag)).length;

    const jsonLdCount = (html.match(/<script[^>]+type=["']application\/ld\+json["']/gi) || []).length;

    const ogTitlePresent = /<meta[^>]+property=["']og:title["']/i.test(html);
    const ogDescPresent = /<meta[^>]+property=["']og:description["']/i.test(html);

    const https = new URL(finalUrl).protocol === 'https:';
    const hsts = !!response.headers.get('strict-transport-security');
    const csp = !!response.headers.get('content-security-policy');
    const compression = response.headers.get('content-encoding') || null;
    const cacheControl = response.headers.get('cache-control') || null;

    return res.status(200).json({
      finalUrl,
      statusCode: response.status,
      ttfbMs,
      totalMs,
      sizeKb,
      https,
      hsts,
      csp,
      compression,
      cacheControl,
      titleText,
      titleLength: titleText.length,
      descText,
      descLength: descText.length,
      canonicalHref,
      canonicalMatchesFinalUrl: canonicalHref
        ? canonicalHref.replace(/\/$/, '') === finalUrl.replace(/\/$/, '')
        : false,
      blocksIndexing,
      viewportPresent,
      hasLang,
      h1Count,
      imgsTotal: imgTags.length,
      imgsMissingAlt,
      jsonLdCount,
      ogTitlePresent,
      ogDescPresent
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'The site took too long to respond' });
    }
    return res.status(502).json({ error: 'Could not reach this website. Check the URL and try again.' });
  }
}

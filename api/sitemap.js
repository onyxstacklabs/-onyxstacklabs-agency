import { generateSitemap } from '../generate-sitemap.js';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // Generate the XML sitemap string
    const xml = await generateSitemap();

    // Set correct Headers for Search Engines
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    // Cache for 12 hours on Vercel Edge, revalidate after that
    res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate');

    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return res.status(500).send('Error generating sitemap');
  }
}

const REQUEST_TIMEOUT_MS = 15000;

export const RUN_AUDIT_STAGES = [
  'Validating target URL domain & protocol...',
  'Fetching the live page from your server...',
  'Analyzing HTML metadata, OpenGraph & Twitter Cards...',
  'Inspecting JSON-LD, Microdata & Structured Schemas...',
  'Measuring response time & payload size...',
  'Evaluating accessibility markup...',
  'Checking AI Search readiness (GEO & AEO signals)...',
  'Compiling final diagnostic scores & recommendations...'
];

function scoreFromChecks(checks) {
  const total = checks.length;
  const earned = checks.reduce((sum, c) => {
    if (c.status === 'pass') return sum + 1;
    if (c.status === 'warn') return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((earned / total) * 100);
}

function buildRecommendations(checks, templates) {
  return checks
    .filter((c) => c.status !== 'pass')
    .map((c) => templates[c.name])
    .filter(Boolean);
}

export const executeAudit = async (targetUrl, onStageUpdate) => {
  let stageIndex = 0;
  onStageUpdate(0, RUN_AUDIT_STAGES[0]);

  // Paces the existing stage UI while the single real network request runs —
  // this only controls loading-message timing, it never fabricates results.
  const stageTimer = setInterval(() => {
    if (stageIndex < RUN_AUDIT_STAGES.length - 2) {
      stageIndex += 1;
      onStageUpdate(stageIndex, RUN_AUDIT_STAGES[stageIndex]);
    }
  }, 650);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let data;
  try {
    const res = await fetch(`/api/website-audit?url=${encodeURIComponent(targetUrl)}`, {
      signal: controller.signal
    });
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Could not analyze this site.');
    }
  } finally {
    clearInterval(stageTimer);
    clearTimeout(timeoutId);
  }

  onStageUpdate(RUN_AUDIT_STAGES.length - 1, RUN_AUDIT_STAGES[RUN_AUDIT_STAGES.length - 1]);

  const seoChecks = [
    {
      name: 'Title Tag',
      status: data.titleLength >= 10 && data.titleLength <= 60 ? 'pass' : data.titleLength > 0 ? 'warn' : 'fail',
      detail: data.titleLength > 0 ? `Title tag found (${data.titleLength} characters).` : 'No <title> tag was found on the page.'
    },
    {
      name: 'Meta Description',
      status: data.descLength >= 50 && data.descLength <= 160 ? 'pass' : data.descLength > 0 ? 'warn' : 'fail',
      detail: data.descLength > 0 ? `Meta description found (${data.descLength} characters).` : 'No meta description tag was found.'
    },
    {
      name: 'Canonical Tag',
      status: data.canonicalMatchesFinalUrl ? 'pass' : data.canonicalHref ? 'warn' : 'fail',
      detail: data.canonicalHref ? `Canonical tag found: ${data.canonicalHref}` : 'No canonical link tag was found.'
    },
    {
      name: 'Indexability',
      status: data.blocksIndexing ? 'fail' : 'pass',
      detail: data.blocksIndexing ? 'A "noindex" directive was found in the robots meta tag.' : 'No indexing-blocking robots directive was found.'
    }
  ];

  const perfChecks = [
    {
      name: 'Time to First Byte',
      status: data.ttfbMs < 400 ? 'pass' : data.ttfbMs < 900 ? 'warn' : 'fail',
      detail: `Server responded in ${data.ttfbMs}ms.`
    },
    {
      name: 'Total Load Time',
      status: data.totalMs < 1000 ? 'pass' : data.totalMs < 2500 ? 'warn' : 'fail',
      detail: `Full page transfer completed in ${data.totalMs}ms.`
    },
    {
      name: 'Page Weight',
      status: data.sizeKb < 500 ? 'pass' : data.sizeKb < 1500 ? 'warn' : 'fail',
      detail: `HTML document size is ${data.sizeKb} KB.`
    },
    {
      name: 'Compression',
      status: data.compression ? 'pass' : 'warn',
      detail: data.compression ? `Response is compressed with ${data.compression.toUpperCase()}.` : 'No content-encoding (compression) header was detected.'
    }
  ];

  const aiChecks = [
    {
      name: 'JSON-LD Schema Markup',
      status: data.jsonLdCount > 0 ? 'pass' : 'warn',
      detail: data.jsonLdCount > 0 ? `${data.jsonLdCount} JSON-LD structured data block(s) found.` : 'No JSON-LD structured data was found.'
    },
    {
      name: 'OpenGraph Title',
      status: data.ogTitlePresent ? 'pass' : 'warn',
      detail: data.ogTitlePresent ? 'og:title tag found.' : 'No og:title tag was found.'
    },
    {
      name: 'OpenGraph Description',
      status: data.ogDescPresent ? 'pass' : 'warn',
      detail: data.ogDescPresent ? 'og:description tag found.' : 'No og:description tag was found.'
    }
  ];

  const altRatio = data.imgsTotal > 0 ? (data.imgsTotal - data.imgsMissingAlt) / data.imgsTotal : 1;
  const accessChecks = [
    {
      name: 'HTML Lang Attribute',
      status: data.hasLang ? 'pass' : 'fail',
      detail: data.hasLang ? 'The <html> tag declares a language attribute.' : 'The <html> tag is missing a lang attribute.'
    },
    {
      name: 'Image Alt Text',
      status: altRatio === 1 ? 'pass' : altRatio >= 0.7 ? 'warn' : 'fail',
      detail: data.imgsTotal > 0 ? `${data.imgsTotal - data.imgsMissingAlt} of ${data.imgsTotal} images have alt text.` : 'No images were found on the page.'
    },
    {
      name: 'Viewport Meta Tag',
      status: data.viewportPresent ? 'pass' : 'fail',
      detail: data.viewportPresent ? 'Viewport meta tag found for responsive rendering.' : 'No viewport meta tag was found.'
    },
    {
      name: 'Heading Structure',
      status: data.h1Count === 1 ? 'pass' : data.h1Count > 1 ? 'warn' : 'fail',
      detail: `Page contains ${data.h1Count} <h1> tag(s).`
    }
  ];

  const secChecks = [
    {
      name: 'HTTPS Enforcement',
      status: data.https ? 'pass' : 'fail',
      detail: data.https ? 'Site is served over a secure HTTPS connection.' : 'Site is not served over HTTPS.'
    },
    {
      name: 'HSTS Header',
      status: data.hsts ? 'pass' : 'warn',
      detail: data.hsts ? 'Strict-Transport-Security header is present.' : 'Strict-Transport-Security header was not found.'
    },
    {
      name: 'Content Security Policy',
      status: data.csp ? 'pass' : 'warn',
      detail: data.csp ? 'Content-Security-Policy header is present.' : 'Content-Security-Policy header was not found.'
    }
  ];

  const seoScore = scoreFromChecks(seoChecks);
  const perfScore = scoreFromChecks(perfChecks);
  const aiScore = scoreFromChecks(aiChecks);
  const accessScore = scoreFromChecks(accessChecks);
  const secScore = scoreFromChecks(secChecks);
  const overall = Math.round((seoScore + perfScore + aiScore + accessScore + secScore) / 5);

  const seoTemplates = {
    'Title Tag': { priority: 'High', issue: 'Title Tag Needs Attention', solution: 'Add a unique, descriptive <title> tag between 10 and 60 characters.', impact: 'Improves click-through rate and search relevance signals.' },
    'Meta Description': { priority: 'High', issue: 'Meta Description Needs Attention', solution: 'Add a meta description between 50 and 160 characters summarizing the page.', impact: 'Improves how the page appears in search result snippets.' },
    'Canonical Tag': { priority: 'Medium', issue: 'Canonical Tag Issue', solution: "Add a self-referencing canonical link tag matching the page's final URL.", impact: 'Prevents duplicate-content confusion for search engines.' },
    'Indexability': { priority: 'High', issue: 'Page Blocked From Indexing', solution: 'Remove the "noindex" directive from the robots meta tag if this page should appear in search results.', impact: 'Allows the page to be found in search results at all.' }
  };
  const perfTemplates = {
    'Time to First Byte': { priority: 'Medium', issue: 'Slow Server Response', solution: 'Investigate server/hosting response time, caching, or CDN configuration.', impact: 'Faster TTFB improves perceived load speed and Core Web Vitals.' },
    'Total Load Time': { priority: 'Medium', issue: 'Slow Total Load Time', solution: 'Reduce page weight and unnecessary render-blocking resources.', impact: 'Faster load times improve user experience and rankings.' },
    'Page Weight': { priority: 'Low', issue: 'Large Page Size', solution: 'Compress images and remove unused code from the page.', impact: 'Smaller pages load faster, especially on mobile connections.' },
    'Compression': { priority: 'Low', issue: 'No Compression Detected', solution: 'Enable gzip or Brotli compression on the server.', impact: 'Reduces transfer size and speeds up page delivery.' }
  };
  const aiTemplates = {
    'JSON-LD Schema Markup': { priority: 'High', issue: 'Missing Structured Data', solution: 'Add JSON-LD structured data (e.g. Organization, WebPage, FAQPage) to the page.', impact: 'Increases citation likelihood in AI-generated search answers.' },
    'OpenGraph Title': { priority: 'Medium', issue: 'Missing OpenGraph Title', solution: 'Add an og:title meta tag.', impact: 'Improves how the page is represented when shared or cited.' },
    'OpenGraph Description': { priority: 'Medium', issue: 'Missing OpenGraph Description', solution: 'Add an og:description meta tag.', impact: 'Gives AI search tools clearer context for citation summaries.' }
  };
  const accessTemplates = {
    'HTML Lang Attribute': { priority: 'Medium', issue: 'Missing Language Declaration', solution: 'Add a lang attribute to the <html> tag (e.g. lang="en").', impact: 'Helps screen readers and search engines identify page language.' },
    'Image Alt Text': { priority: 'Medium', issue: 'Images Missing Alt Text', solution: 'Add descriptive alt attributes to all meaningful images.', impact: 'Improves accessibility for screen reader users and image SEO.' },
    'Viewport Meta Tag': { priority: 'High', issue: 'Missing Viewport Tag', solution: 'Add a responsive viewport meta tag.', impact: 'Ensures proper rendering and usability on mobile devices.' },
    'Heading Structure': { priority: 'Low', issue: 'Heading Structure Issue', solution: 'Use exactly one <h1> per page and nest headings properly.', impact: 'Improves document structure clarity for assistive tech and search engines.' }
  };
  const secTemplates = {
    'HTTPS Enforcement': { priority: 'High', issue: 'Site Not Served Over HTTPS', solution: 'Install an SSL certificate and enforce HTTPS site-wide.', impact: 'Protects user data and is a confirmed search ranking factor.' },
    'HSTS Header': { priority: 'Low', issue: 'HSTS Header Missing', solution: 'Enable Strict-Transport-Security in HTTP response headers.', impact: 'Prevents protocol downgrade attacks and cookie hijacking.' },
    'Content Security Policy': { priority: 'Low', issue: 'CSP Header Missing', solution: 'Add a Content-Security-Policy header appropriate for the site.', impact: 'Reduces risk of cross-site scripting (XSS) attacks.' }
  };

  return {
    url: data.finalUrl,
    timestamp: new Date().toISOString(),
    overallScore: overall,
    categories: {
      seo: {
        title: 'Search Engine Optimization',
        score: seoScore,
        status: seoScore >= 80 ? 'Good' : 'Needs Attention',
        description: 'Evaluates indexing suitability, metadata quality, headings hierarchy, and canonical setup.',
        checks: seoChecks,
        recommendations: buildRecommendations(seoChecks, seoTemplates)
      },
      performance: {
        title: 'Performance',
        score: perfScore,
        status: perfScore >= 80 ? 'Good' : 'Needs Attention',
        description: 'Measures real server response time, page weight, and compression for this page load.',
        checks: perfChecks,
        recommendations: buildRecommendations(perfChecks, perfTemplates)
      },
      aiReadiness: {
        title: 'AI Search Readiness (AEO & GEO)',
        score: aiScore,
        status: aiScore >= 80 ? 'Optimized' : 'Action Required',
        description: 'Assesses structured data and metadata completeness for Generative AI search engines.',
        checks: aiChecks,
        recommendations: buildRecommendations(aiChecks, aiTemplates)
      },
      accessibility: {
        title: 'Accessibility',
        score: accessScore,
        status: accessScore >= 80 ? 'Compliant' : 'Needs Review',
        description: 'Checks language declaration, image alt text, viewport configuration, and heading structure.',
        checks: accessChecks,
        recommendations: buildRecommendations(accessChecks, accessTemplates)
      },
      security: {
        title: 'Security',
        score: secScore,
        status: secScore >= 80 ? 'Secure' : 'Warning',
        description: 'Validates HTTPS enforcement and key security response headers.',
        checks: secChecks,
        recommendations: buildRecommendations(secChecks, secTemplates)
      }
    }
  };
};

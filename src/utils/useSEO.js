// src/utils/useSEO.js
// Per-page SEO controller. Every page component calls useSEO() once with
// its own unique title, description, and (optionally) FAQ content, so
// each route gets accurate <title>, meta description, canonical URL,
// Open Graph/Twitter tags, and FAQPage schema — instead of the whole
// site sharing one global (and previously wrong) set of values.
import { useEffect } from 'react';

const CANONICAL_DOMAIN = 'https://onyxstacklabs.com';

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonicalLink(href) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setPageJsonLd(data) {
  const scriptId = 'page-specific-jsonld';
  let script = document.getElementById(scriptId);
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

// Converts a simple [{ q, a }] array (the shape already used across the
// site's page components) into valid schema.org FAQPage structured data.
export function buildFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

/**
 * @param {Object} params
 * @param {string} params.title - Full <title>, e.g. "Pricing | OnyxStack Labs"
 * @param {string} params.description - Meta description, ideally 120-160 chars
 * @param {string} params.path - Route path starting with "/", e.g. "/pricing"
 * @param {Object|null} [params.faqSchema] - Result of buildFaqSchema(), or null
 * @param {boolean} [params.noIndex] - Set true for pages that should never
 *   appear in search results (e.g. /thank-you). Defaults to false.
 */
export function useSEO({ title, description, path, faqSchema = null, noIndex = false }) {
  useEffect(() => {
    if (!title || !description || !path) return;

    document.title = title;
    setMetaByName('description', description);
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);

    const canonicalUrl = path === '/' ? `${CANONICAL_DOMAIN}/` : `${CANONICAL_DOMAIN}${path}`;
    setCanonicalLink(canonicalUrl);
    setMetaByProperty('og:url', canonicalUrl);

    setMetaByName(
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    setPageJsonLd(faqSchema);

    // Clean up this page's FAQ schema and robots override when the user
    // navigates away, so it never lingers and gets misattributed to the
    // next page they visit (robots resets to the global "index, follow"
    // default from index.html for any page that doesn't call useSEO).
    return () => {
      setPageJsonLd(null);
      setMetaByName('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    };
  }, [title, description, path, faqSchema, noIndex]);
}

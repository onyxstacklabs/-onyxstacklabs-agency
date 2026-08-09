// src/utils/useSEO.js
// Per-page SEO controller. Handles accurate <title>, meta description, 
// canonical URL, Open Graph/Twitter tags, and FAQPage schema per route.
import { useEffect, useMemo } from 'react';

const CANONICAL_DOMAIN = 'https://onyxstacklabs.com';

/**
 * Normalizes any incoming route path to ensure strict canonical format.
 * Examples:
 *   "pricing/"             -> "/pricing"
 *   "/blog?ref=product"    -> "/blog"
 *   "about"                -> "/about"
 *   "/"                    -> "/"
 */
function normalizeCanonicalPath(rawPath) {
  if (!rawPath) return '/';
  
  // Strip query parameters and hash fragments
  let cleanPath = rawPath.split('?')[0].split('#')[0].trim();
  
  // Ensure leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Remove trailing slash for non-root routes
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  return cleanPath;
}

function setMetaByName(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
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
  script.textContent = typeof data === 'string' ? data : JSON.stringify(data);
}

// Converts a simple [{ q, a }] array into valid schema.org FAQPage structured data.
export function buildFaqSchema(faqs) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;
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
 * @param {string} [params.robots] - Indexing directive, default "index, follow"
 */
export function useSEO({ title, description, path, faqSchema = null, robots = 'index, follow' }) {
  // Memoize serialized FAQ schema to prevent object reference re-render loops
  const serializedFaqSchema = useMemo(() => {
    return faqSchema ? JSON.stringify(faqSchema) : null;
  }, [faqSchema]);

  useEffect(() => {
    if (!title || !description || !path) return;

    // Document Title & Meta Description
    document.title = title;
    setMetaByName('description', description);
    setMetaByName('robots', robots);

    // OpenGraph Tags
    setMetaByProperty('og:title', title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:type', 'website');

    // Twitter Tags
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title);
    setMetaByName('twitter:description', description);

    // Strict Canonical URL Normalization
    const cleanPath = normalizeCanonicalPath(path);
    const canonicalUrl = cleanPath === '/' ? `${CANONICAL_DOMAIN}/` : `${CANONICAL_DOMAIN}${cleanPath}`;
    
    setCanonicalLink(canonicalUrl);
    setMetaByProperty('og:url', canonicalUrl);

    // Structured Data (JSON-LD)
    if (serializedFaqSchema) {
      setPageJsonLd(JSON.parse(serializedFaqSchema));
    } else {
      setPageJsonLd(null);
    }

    // Cleanup schema on route transition
    return () => setPageJsonLd(null);
  }, [title, description, path, serializedFaqSchema, robots]);
}

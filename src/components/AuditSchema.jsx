import React, { useEffect } from 'react';

export const AuditSchema = () => {
  useEffect(() => {
    // Dynamic Meta Title & Description
    document.title = "Free AI Website Audit Tool | SEO, Performance & GEO Health | OnyxStack Labs";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Audit your website's SEO, Core Web Vitals, accessibility, security, and AI search engine readiness (GEO/AEO) in seconds. Enterprise-grade analysis by OnyxStack Labs.");

    // Schema Injection
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.onyxstacklabs.com/tools/ai-website-audit#webpage",
          "url": "https://www.onyxstacklabs.com/tools/ai-website-audit",
          "name": "AI Website Audit Tool | Free Technical SEO, Performance & GEO Inspector",
          "description": "Comprehensive enterprise website audit tool for analyzing SEO, Core Web Vitals, accessibility, security, and Generative Engine Optimization (GEO/AEO) readiness.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://www.onyxstacklabs.com/#website",
            "name": "OnyxStack Labs",
            "url": "https://www.onyxstacklabs.com"
          }
        },
        {
          "@type": "SoftwareApplication",
          "name": "OnyxStack AI Website Audit Tool",
          "operatingSystem": "All",
          "applicationCategory": "DeveloperApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1280"
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ai-audit-schema';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('ai-audit-schema');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
};

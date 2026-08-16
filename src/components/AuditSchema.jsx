import React, { useEffect } from 'react';

export const AuditSchema = () => {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://onyxstacklabs.com/tools/ai-website-audit#webpage",
          "url": "https://onyxstacklabs.com/tools/ai-website-audit",
          "name": "AI Website Audit Tool | Free Technical SEO, Performance & GEO Inspector",
          "description": "Comprehensive enterprise website audit tool for analyzing SEO, Core Web Vitals, accessibility, security, and Generative Engine Optimization (GEO/AEO) readiness.",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://onyxstacklabs.com/#website",
            "name": "OnyxStack Labs",
            "url": "https://onyxstacklabs.com"
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

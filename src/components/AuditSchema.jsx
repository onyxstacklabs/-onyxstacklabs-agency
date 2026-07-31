import React from 'react';
import { Helmet } from 'react-helmet-async';

export const AuditSchema = () => {
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.onyxstacklabs.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://www.onyxstacklabs.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Website Audit",
            "item": "https://www.onyxstacklabs.com/tools/ai-website-audit"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an AI Website Audit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An AI Website Audit evaluates standard technical SEO, performance, accessibility, and modern AI Readiness (GEO/AEO) to ensure LLM crawlers like ChatGPT, Claude, and Perplexity can extract and cite your content effectively."
            }
          },
          {
            "@type": "Question",
            "name": "What is Generative Engine Optimization (GEO)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GEO is the process of optimizing website structure, schema markup, and content authoritative density so that generative AI search engines cite your site as a primary knowledge source."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <title>Free AI Website Audit Tool | SEO, Performance & GEO Health | OnyxStack Labs</title>
      <meta name="description" content="Audit your website's SEO, Core Web Vitals, accessibility, security, and AI search engine readiness (GEO/AEO) in seconds. Enterprise-grade analysis by OnyxStack Labs." />
      <link rel="canonical" href="https://www.onyxstacklabs.com/tools/ai-website-audit" />
      
      {/* OpenGraph */}
      <meta property="og:title" content="AI Website Audit Tool | OnyxStack Labs" />
      <meta property="og:description" content="Instant technical SEO, performance, and Generative Engine Optimization audit." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.onyxstacklabs.com/tools/ai-website-audit" />
      <meta property="og:image" content="https://www.onyxstacklabs.com/og-ai-audit.png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AI Website Audit Tool | OnyxStack Labs" />
      <meta name="twitter:description" content="Instant technical SEO, performance, and Generative Engine Optimization audit." />
      <meta name="twitter:image" content="https://www.onyxstacklabs.com/og-ai-audit.png" />
      
      {/* Schema Injection */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};

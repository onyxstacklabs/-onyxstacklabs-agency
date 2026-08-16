// Central registry for all interactive tools.
// Add a new tool here, then create its page in src/pages/tools/
// and register the route in App.jsx — the hub page updates automatically.

import { Calculator, Gauge, ClipboardCheck, Bot, Sparkles, Scale, SearchCheck } from 'lucide-react';

export const toolsConfig = [
  {
    slug: 'ai-website-audit',
    name: 'AI Website Audit Tool',
    tagline: "Audit your website's SEO, performance, accessibility, AI readiness and technical health in seconds.",
    icon: SearchCheck,
    status: 'live'
  },
  {
    slug: 'build-vs-buy-calculator',
    name: 'Build vs Buy Calculator',
    tagline: 'Compare custom software costs against SaaS subscriptions to see which saves you more over time.',
    icon: Scale,
    status: 'live'
  },
  {
    slug: 'ai-readiness-quiz',
    name: 'AI Readiness Score',
    tagline: 'Answer 8 quick questions to see how ready your business is for AI automation.',
    icon: Sparkles,
    status: 'live'
  },
  {
    slug: 'ai-cost-calculator',
    name: 'AI Chatbot Cost Calculator',
    tagline: 'Estimate the monthly cost of running an AI chatbot or LLM assistant for your business.',
    icon: Bot,
    status: 'live'
  },
  {
    slug: 'roi-calculator',
    name: 'AI Automation ROI Calculator',
    tagline: 'See how many hours and how much budget automation could save your team every year.',
    icon: Calculator,
    status: 'live'
  },
  {
    slug: 'speed-checker',
    name: 'Website Speed Checker',
    tagline: 'Instant response time, HTTPS, compression, and caching check for any website.',
    icon: Gauge,
    status: 'live'
  },
  {
    slug: 'project-estimator',
    name: 'Software Project Cost Estimator',
    tagline: 'Select your features and get a rough budget and timeline range instantly.',
    icon: ClipboardCheck,
    status: 'live'
  }
];

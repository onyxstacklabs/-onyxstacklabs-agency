// Central registry for all interactive tools.
// Add a new tool here, then create its page in src/pages/tools/
// and register the route in App.jsx — the hub page updates automatically.

import { Calculator, Gauge, ClipboardCheck } from 'lucide-react';

export const toolsConfig = [
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
    status: 'coming-soon'
  }
];

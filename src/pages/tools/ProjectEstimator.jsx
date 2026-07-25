import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

// Rough, directional estimates only — real scoping always needs a call.
// Values are in USD and represent typical small-to-mid agency ranges.
const PLATFORMS = [
  { id: 'web', label: 'Web Application', min: 2500, max: 6000, weeksMin: 3, weeksMax: 6 },
  { id: 'mobile', label: 'Mobile App (Android)', min: 3500, max: 8000, weeksMin: 4, weeksMax: 8 },
  { id: 'both', label: 'Web + Mobile', min: 5500, max: 12000, weeksMin: 6, weeksMax: 10 }
];

const FEATURES = [
  { id: 'auth', label: 'User Accounts & Authentication', min: 400, max: 900, weeks: 1 },
  { id: 'admin', label: 'Admin Dashboard', min: 800, max: 1800, weeks: 1.5 },
  { id: 'payments', label: 'Payment Integration', min: 600, max: 1500, weeks: 1 },
  { id: 'ai', label: 'AI / Automation Features', min: 1200, max: 3500, weeks: 2 },
  { id: 'notifications', label: 'Real-Time Notifications', min: 500, max: 1200, weeks: 1 },
  { id: 'api', label: 'Third-Party API Integrations', min: 600, max: 1600, weeks: 1.5 },
  { id: 'multilang', label: 'Multi-Language Support', min: 400, max: 1000, weeks: 1 },
  { id: 'analytics', label: 'Advanced Analytics & Reporting', min: 700, max: 1700, weeks: 1.5 }
];

function formatUsd(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

export default function ProjectEstimator({ currentPath, navigateToNode }) {
  const [platformId, setPlatformId] = useState('web');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const platform = PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0];
    const activeFeatures = FEATURES.filter((f) => selectedFeatures.includes(f.id));

    const costMin = platform.min + activeFeatures.reduce((sum, f) => sum + f.min, 0);
    const costMax = platform.max + activeFeatures.reduce((sum, f) => sum + f.max, 0);
    const weeksMin = platform.weeksMin + activeFeatures.reduce((sum, f) => sum + f.weeks, 0);
    const weeksMax = platform.weeksMax + activeFeatures.reduce((sum, f) => sum + f.weeks * 1.4, 0);

    return {
      costMin,
      costMax,
      weeksMin: Math.round(weeksMin),
      weeksMax: Math.round(weeksMax)
    };
  }, [platformId, selectedFeatures]);

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="Software Project Cost Estimator"
      tagline="Pick your platform and features to get a rough budget and timeline range in seconds."
    >
      <div className="space-y-8">

        {/* PLATFORM SELECTION */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Platform
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLATFORMS.map((platform) => {
              const isActive = platformId === platform.id;
              return (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => setPlatformId(platform.id)}
                  aria-pressed={isActive}
                  className={`text-left p-4 rounded-xl border text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-[#06B6D4]/50 bg-[#06B6D4]/10 text-[#06B6D4]'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  {platform.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURE CHECKLIST */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
            Features Needed
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((feature) => {
              const isChecked = selectedFeatures.includes(feature.id);
              return (
                <label
                  key={feature.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    isChecked
                      ? 'border-[#06B6D4]/40 bg-[#06B6D4]/5'
                      : 'border-neutral-800 bg-neutral-900/30 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleFeature(feature.id)}
                    className="w-4 h-4 accent-[#06B6D4] shrink-0"
                  />
                  <span className="text-xs text-neutral-200">{feature.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* RESULTS */}
        <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Estimated Budget</div>
            <div className="text-xl font-bold text-white">
              {formatUsd(estimate.costMin)} – {formatUsd(estimate.costMax)}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Estimated Timeline</div>
            <div className="text-xl font-bold text-white">
              {estimate.weeksMin} – {estimate.weeksMax} weeks
            </div>
          </div>
        </div>

        <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
          This is a directional estimate, not a quote. Final pricing depends on exact requirements, integrations, and design complexity.
        </p>

      </div>
    </ToolLayout>
  );
}

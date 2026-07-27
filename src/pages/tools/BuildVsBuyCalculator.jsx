import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ToolLayout from '../../components/ToolLayout';

// Industry-standard benchmark: custom software typically costs 15-20%
// of its original build price per year in maintenance and support.
// 18% is used here as a defensible, commonly cited midpoint.
const ANNUAL_MAINTENANCE_RATE = 0.18;

const YEAR_OPTIONS = [1, 2, 3, 5];

function formatUsd(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

// Finds the year (to one decimal place, capped at 20) at which cumulative
// custom-software cost drops below cumulative SaaS cost. Solved numerically
// rather than algebraically so it stays correct even in edge cases (e.g.
// zero SaaS cost) without divide-by-zero risk.
function findBreakEvenYear(monthlySaasCost, users, buildCost) {
  const saasCostPerYear = monthlySaasCost * users * 12;
  if (saasCostPerYear <= 0) return null;

  for (let y = 0.5; y <= 20; y += 0.5) {
    const saasTotal = saasCostPerYear * y;
    const customTotal = buildCost + buildCost * ANNUAL_MAINTENANCE_RATE * y;
    if (customTotal <= saasTotal) {
      return y;
    }
  }
  return null;
}

export default function BuildVsBuyCalculator({ currentPath, navigateToNode }) {
  const [monthlySaasCost, setMonthlySaasCost] = useState(50);
  const [users, setUsers] = useState(10);
  const [years, setYears] = useState(3);
  const [buildCost, setBuildCost] = useState(5000);

  // Strips leading zeros and handles empty input cleanly so fields never
  // show values like "050" — same fix applied across the other tools.
  const handleNumberChange = (setter) => (e) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, '');
    setter(raw === '' ? 0 : Number(raw));
  };

  const results = useMemo(() => {
    const saasTotal = monthlySaasCost * users * 12 * years;
    const customTotal = buildCost + buildCost * ANNUAL_MAINTENANCE_RATE * years;
    const savings = saasTotal - customTotal;
    const breakEvenYear = findBreakEvenYear(monthlySaasCost, users, buildCost);

    return {
      saasTotal,
      customTotal,
      savings,
      breakEvenYear,
      customWins: savings > 0
    };
  }, [monthlySaasCost, users, years, buildCost]);

  const shareText = results.customWins
    ? `Over ${years} year${years > 1 ? 's' : ''}, building custom software would save me ${formatUsd(Math.abs(results.savings))} vs SaaS. See your numbers:`
    : `SaaS still comes out ${formatUsd(Math.abs(results.savings))} cheaper than custom software for my timeline. Check yours:`;

  const inputClass =
    "w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4] transition-colors";
  const labelClass =
    "block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2";

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="Build vs Buy Calculator"
      tagline="Compare custom software costs against SaaS subscriptions to see which saves you more over time."
      shareText={shareText}
    >
      <div className="space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>SaaS cost per user / month ($)</label>
            <input
              type="number"
              min="0"
              value={monthlySaasCost === 0 ? '' : monthlySaasCost}
              onFocus={(e) => e.target.select()}
              onChange={handleNumberChange(setMonthlySaasCost)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Number of users</label>
            <input
              type="number"
              min="0"
              value={users === 0 ? '' : users}
              onFocus={(e) => e.target.select()}
              onChange={handleNumberChange(setUsers)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Estimated custom build cost ($, one-time)</label>
          <input
            type="number"
            min="0"
            value={buildCost === 0 ? '' : buildCost}
            onFocus={(e) => e.target.select()}
            onChange={handleNumberChange(setBuildCost)}
            placeholder="0"
            className={inputClass}
          />
          <p className="text-[11px] text-neutral-500 mt-2">
            Not sure? Try our{' '}
            <Link to="/tools/project-estimator" className="text-[#06B6D4] hover:underline">
              Software Project Cost Estimator
            </Link>
            .
          </p>
        </div>

        <div>
          <label className={labelClass}>Time horizon</label>
          <div className="grid grid-cols-4 gap-3">
            {YEAR_OPTIONS.map((yearOption) => {
              const isActive = years === yearOption;
              return (
                <button
                  key={yearOption}
                  type="button"
                  onClick={() => setYears(yearOption)}
                  aria-pressed={isActive}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    isActive
                      ? 'border-[#06B6D4]/50 bg-[#06B6D4]/10 text-[#06B6D4]'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  {yearOption}y
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <div className={`p-6 rounded-2xl border text-center ${
            results.customWins
              ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
              : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
          }`}>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-2">
              {results.customWins ? 'Custom Software Saves You' : 'SaaS Remains Cheaper By'}
            </div>
            <div className="text-3xl font-bold">{formatUsd(Math.abs(results.savings))}</div>
            <div className="text-xs mt-2 opacity-80">over {years} year{years > 1 ? 's' : ''}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Total SaaS Cost</div>
              <div className="text-lg font-bold text-white">{formatUsd(results.saasTotal)}</div>
            </div>
            <div className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Total Custom Cost</div>
              <div className="text-lg font-bold text-white">{formatUsd(results.customTotal)}</div>
              <div className="text-[10px] text-neutral-500 mt-1">incl. {Math.round(ANNUAL_MAINTENANCE_RATE * 100)}%/yr maintenance</div>
            </div>
          </div>

          {results.breakEvenYear && (
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/20 text-center">
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Break-even point: custom software becomes cheaper than SaaS after approximately{' '}
                <span className="text-[#06B6D4] font-semibold">{results.breakEvenYear} years</span>.
              </p>
            </div>
          )}
        </div>

        <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
          This is a directional estimate using an {Math.round(ANNUAL_MAINTENANCE_RATE * 100)}% annual maintenance assumption for custom software. Actual costs vary by complexity, provider, and support needs.
        </p>

      </div>
    </ToolLayout>
  );
}

import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

export default function ROICalculator({ currentPath, navigateToNode }) {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(15);
  const [automationPercent, setAutomationPercent] = useState(70);

  const results = useMemo(() => {
    const weeklyHoursSaved = (hoursPerWeek * automationPercent) / 100;
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualCostSaved = annualHoursSaved * hourlyRate;
    return {
      weeklyHoursSaved: weeklyHoursSaved.toFixed(1),
      annualHoursSaved: Math.round(annualHoursSaved),
      annualCostSaved: Math.round(annualCostSaved)
    };
  }, [hoursPerWeek, hourlyRate, automationPercent]);

  // Strips leading zeros and handles empty input cleanly so fields never show "020"
  const handleNumberChange = (setter) => (e) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, '');
    setter(raw === '' ? 0 : Number(raw));
  };

  const inputClass =
    "w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4] transition-colors";
  const labelClass =
    "block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2";

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="AI Automation ROI Calculator"
      tagline="Estimate how many hours and how much budget you could save by automating a manual task."
    >
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Hours spent on this task per week</label>
          <input
            type="number"
            min="0"
            value={hoursPerWeek === 0 ? '' : hoursPerWeek}
            onFocus={(e) => e.target.select()}
            onChange={handleNumberChange(setHoursPerWeek)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Cost per hour (USD)</label>
          <input
            type="number"
            min="0"
            value={hourlyRate === 0 ? '' : hourlyRate}
            onFocus={(e) => e.target.select()}
            onChange={handleNumberChange(setHourlyRate)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Estimated automation coverage (%)</label>
          <input
            type="range"
            min="10"
            max="95"
            value={automationPercent}
            onChange={(e) => setAutomationPercent(Number(e.target.value))}
            className="w-full accent-[#06B6D4]"
          />
          <div className="text-right text-[#06B6D4] font-mono text-sm mt-1">{automationPercent}%</div>
        </div>

        <div className="pt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Hours Saved / Year</div>
            <div className="text-2xl font-bold text-white">{results.annualHoursSaved}</div>
          </div>
          <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Cost Saved / Year</div>
            <div className="text-2xl font-bold text-white">${results.annualCostSaved.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

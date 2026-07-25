import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

// Uses Google's official PageSpeed Insights API — the same engine behind
// Lighthouse. No API key required for light usage; for production-scale
// traffic, add a free key from Google Cloud Console and read it via
// import.meta.env.VITE_PAGESPEED_API_KEY (kept optional so the tool still
// works out of the box).
const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY || '';
const REQUEST_TIMEOUT_MS = 25000;

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function isLikelyValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

function scoreColor(score) {
  if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  return 'text-red-400 border-red-500/30 bg-red-500/10';
}

export default function SpeedChecker({ currentPath, navigateToNode }) {
  const [urlInput, setUrlInput] = useState('');
  const [strategy, setStrategy] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const runCheck = async () => {
    setError('');
    setResult(null);

    const targetUrl = normalizeUrl(urlInput);
    if (!targetUrl || !isLikelyValidUrl(targetUrl)) {
      setError('Enter a valid website address, e.g. example.com');
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const params = new URLSearchParams({
        url: targetUrl,
        strategy,
        category: 'performance'
      });
      if (API_KEY) params.set('key', API_KEY);

      const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
        signal: controller.signal
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many checks right now — please try again in a minute.');
        }
        throw new Error('Could not analyze this site. Double-check the URL and try again.');
      }

      const data = await res.json();
      const lighthouse = data?.lighthouseResult;
      if (!lighthouse) {
        throw new Error('No performance data returned for this site.');
      }

      const audits = lighthouse.audits;
      setResult({
        finalUrl: lighthouse.finalUrl,
        performanceScore: Math.round((lighthouse.categories?.performance?.score || 0) * 100),
        lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
        cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
        tbt: audits['total-blocking-time']?.displayValue || 'N/A',
        fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
        speedIndex: audits['speed-index']?.displayValue || 'N/A'
      });
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The check took too long and timed out. Please try again.');
      } else {
        setError(err.message || 'Something went wrong while analyzing this site.');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) runCheck();
  };

  const metricCards = result
    ? [
        { label: 'Largest Contentful Paint', value: result.lcp },
        { label: 'First Contentful Paint', value: result.fcp },
        { label: 'Total Blocking Time', value: result.tbt },
        { label: 'Cumulative Layout Shift', value: result.cls },
        { label: 'Speed Index', value: result.speedIndex }
      ]
    : [];

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="Website Speed Checker"
      tagline="Get a real Core Web Vitals report for any website, powered by Google PageSpeed Insights."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Website URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="example.com"
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4] transition-colors"
              aria-label="Website URL to analyze"
            />
            <button
              onClick={runCheck}
              disabled={loading}
              className="shrink-0 bg-[#06B6D4] text-black px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing…' : 'Check Speed'}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4">
            {['mobile', 'desktop'].map((mode) => (
              <button
                key={mode}
                onClick={() => setStrategy(mode)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${
                  strategy === mode
                    ? 'bg-[#06B6D4]/10 border-[#06B6D4]/40 text-[#06B6D4]'
                    : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="p-8 rounded-xl border border-neutral-800 bg-neutral-900/50 text-center">
            <div className="inline-block w-6 h-6 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin mb-3" aria-hidden="true" />
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">Running a live audit — this can take up to 20 seconds</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 pt-2">
            <div className={`p-6 rounded-2xl border text-center ${scoreColor(result.performanceScore)}`}>
              <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-2">Performance Score</div>
              <div className="text-5xl font-bold">{result.performanceScore}</div>
              <div className="text-[11px] mt-2 opacity-70 break-all">{result.finalUrl}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metricCards.map((m) => (
                <div key={m.label} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5 leading-tight">{m.label}</div>
                  <div className="text-sm font-bold text-white">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

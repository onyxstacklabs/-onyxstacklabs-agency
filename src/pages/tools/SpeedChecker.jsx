import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';

const REQUEST_TIMEOUT_MS = 12000;

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isLikelyValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

function speedGrade(totalMs) {
  if (totalMs < 600) return { label: 'Fast', className: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
  if (totalMs < 1500) return { label: 'Moderate', className: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
  return { label: 'Slow', className: 'text-red-400 border-red-500/30 bg-red-500/10' };
}

export default function SpeedChecker({ currentPath, navigateToNode }) {
  const [urlInput, setUrlInput] = useState('');
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
      const res = await fetch(`/api/speed-check?url=${encodeURIComponent(targetUrl)}`, {
        signal: controller.signal
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Could not analyze this site.');
      }

      setResult(data);
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

  const grade = result ? speedGrade(result.totalMs) : null;

  const metricCards = result
    ? [
        { label: 'Time to First Byte', value: `${result.ttfbMs} ms` },
        { label: 'Total Load Time', value: `${result.totalMs} ms` },
        { label: 'Page Size', value: `${result.sizeKb} KB` },
        { label: 'HTTPS', value: result.https ? 'Secure' : 'Not Secure' },
        { label: 'Compression', value: result.compression ? result.compression.toUpperCase() : 'None Detected' },
        { label: 'Caching Headers', value: result.cacheControl ? 'Present' : 'Not Set' }
      ]
    : [];

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="Website Speed Checker"
      tagline="Instant server-side health check for any website — response time, HTTPS, compression, and caching. No signup needed."
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
              {loading ? 'Checking…' : 'Check Speed'}
            </button>
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
            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">Fetching and measuring the page</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 pt-2">
            <div className={`p-6 rounded-2xl border text-center ${grade.className}`}>
              <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-2">Overall Speed</div>
              <div className="text-4xl font-bold">{grade.label}</div>
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

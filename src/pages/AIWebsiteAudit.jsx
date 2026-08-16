import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuditSchema } from '../components/AuditSchema';
import { AuditScoreRing } from '../components/AuditScoreRing';
import { AuditExportModal } from '../components/AuditExportModal';
import { executeAudit } from '../components/auditEngine';
import { trackEvent } from '../utils/analytics';
import { useSEO } from '../utils/useSEO';

export function AIWebsiteAuditPage({ currentPath, navigateToNode }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageMessage, setStageMessage] = useState('');
  const [report, setReport] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = "AI Website Audit Tool";
  const tagline = "Audit your website's SEO, performance, accessibility, AI readiness and technical health in seconds.";

  useSEO({
    title: `${title} | Free Tool by OnyxStack Labs`,
    description: tagline,
    path: currentPath,
  });

  const shareText = report
    ? `My website scored ${report.overallScore}/100 on OnyxStack Labs' AI Website Audit. Check yours:`
    : `${title} — ${tagline}`;

  const handleShare = async () => {
    const shareUrl = window.location.href;

    trackEvent('tool_share', { tool: title, method: navigator.share ? 'native' : 'clipboard' });

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch {
        // User cancelled sheet
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore
    }
  };

  const validateUrl = (input) => {
    try {
      const formatted = input.startsWith('http') ? input : `https://${input}`;
      const parsed = new URL(formatted);
      return parsed.href;
    } catch {
      return null;
    }
  };

  const handleStartAudit = async (e) => {
    e.preventDefault();
    setError('');

    const validUrl = validateUrl(url);
    if (!validUrl) {
      setError('Please enter a valid URL (e.g., example.com or https://example.com)');
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      const result = await executeAudit(validUrl, (index, message) => {
        setStageIndex(index);
        setStageMessage(message);
      });
      setReport(result);
    } catch (err) {
      setError('Failed to analyze the target website. Please ensure it is publicly accessible.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">
      <AuditSchema />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10">
        <section className="max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-10 text-center">
          <button
            onClick={() => navigateToNode('/tools')}
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#06B6D4] transition-colors mb-8 cursor-pointer"
          >
            ← All Tools
          </button>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
            {title}
          </h1>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed mb-6">
            {tagline}
          </p>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold border border-neutral-800 text-neutral-300 hover:border-[#06B6D4]/50 hover:text-[#06B6D4] transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a4 4 0 100-2.684m0 2.684a4 4 0 000 2.684m0-2.684l6.632-3.316m0 0a4 4 0 105.368-5.368 4 4 0 00-5.368 5.368zm0 8a4 4 0 105.368 5.368 4 4 0 00-5.368-5.368z" />
            </svg>
            {copied ? 'Link Copied!' : 'Share This Tool'}
          </button>
        </section>

        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-16">
          <div className="p-6 md:p-10 rounded-2xl border border-neutral-800 bg-neutral-950/50 space-y-8">
            
            <form onSubmit={handleStartAudit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter domain or URL (e.g., onyxstacklabs.com)"
                  className="w-full h-[56px] px-5 bg-[#050505] border border-white/[0.08] rounded-xl text-white placeholder-[#71717A] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all text-sm md:text-base font-sans"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-[#EF4444] text-xs font-mono px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full h-[56px] bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-black font-bold text-xs uppercase tracking-widest font-mono rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-[#06B6D4]/20 flex items-center justify-center cursor-pointer"
              >
                {isLoading ? 'Running Technical Diagnostics...' : 'Analyze Website'}
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">⚡ Fast Execution</span>
              <span className="flex items-center gap-1.5">🔒 100% Secure</span>
              <span className="flex items-center gap-1.5">💳 No Signup Required</span>
            </div>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#050505] border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl"
                >
                  <div className="w-10 h-10 border-2 border-[#06B6D4]/20 border-t-[#06B6D4] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium text-sm mb-2">{stageMessage}</p>
                  <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden mt-3 border border-neutral-800">
                    <motion.div 
                      className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB] h-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((stageIndex + 1) / 8) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {report && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 pt-4"
              >
                <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Audit Results For</span>
                    <h2 className="text-lg md:text-xl font-bold text-white font-mono break-all">{report.url}</h2>
                    <p className="text-[11px] text-neutral-500">Completed on {new Date(report.timestamp).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <AuditScoreRing score={report.overallScore} size={120} />
                    <button
                      type="button"
                      onClick={() => setIsExportOpen(true)}
                      className="py-2.5 px-4 bg-transparent border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-black font-semibold rounded-xl transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      📥 Export Report
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(report.categories).map(([key, cat]) => (
                    <div
                      key={key}
                      className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white">{cat.title}</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">{cat.description}</p>
                        </div>
                        <span className={`text-xl font-bold font-mono ${
                          cat.score >= 80 ? 'text-[#22C55E]' : cat.score >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                        }`}>
                          {cat.score}
                        </span>
                      </div>

                      <div className="w-full bg-[#050505] h-1.5 rounded-full overflow-hidden border border-neutral-800">
                        <div 
                          className="h-full transition-all duration-500 rounded-full"
                          style={{
                            width: `${cat.score}%`,
                            backgroundColor: cat.score >= 80 ? '#22C55E' : cat.score >= 60 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {cat.checks.map((check, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs">
                            <span className="mt-0.5">
                              {check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌'}
                            </span>
                            <div>
                              <p className="text-white font-medium">{check.name}</p>
                              <p className="text-[11px] text-neutral-400">{check.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {cat.recommendations.length > 0 && (
                        <div className="pt-3 border-t border-neutral-800">
                          <h4 className="text-[10px] font-mono font-semibold uppercase text-neutral-400 tracking-wider mb-2">Action Required</h4>
                          {cat.recommendations.map((rec, rIdx) => (
                            <div key={rIdx} className="bg-[#050505] p-3 rounded-xl border border-neutral-800 space-y-1.5 mb-2 last:mb-0">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-xs font-medium">{rec.issue}</span>
                                <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                  rec.priority === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30' : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                                }`}>
                                  {rec.priority} Priority
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400"><strong className="text-white">Fix:</strong> {rec.solution}</p>
                              <p className="text-[11px] text-[#06B6D4]"><strong className="text-white">Impact:</strong> {rec.impact}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <AuditExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        auditData={report} 
      />
    </div>
  );
}

export default AIWebsiteAuditPage;

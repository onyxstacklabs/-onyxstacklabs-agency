import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuditSchema } from '../components/AuditSchema';
import { AuditScoreRing } from '../components/AuditScoreRing';
import { AuditExportModal } from '../components/AuditExportModal';
import { executeAudit } from '../components/auditEngine';

export const AIWebsiteAuditPage = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageMessage, setStageMessage] = useState('');
  const [report, setReport] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

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
    <div className="min-h-screen bg-[#05070B] text-slate-100 font-sans selection:bg-[#00D4FF]/30">
      <AuditSchema />

      <main className="max-w-[1280px] mx-auto px-5 lg:px-8 py-16 lg:py-24">
        
        {/* HERO SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#00D4FF] text-xs font-semibold uppercase tracking-widest mb-6">
            ✨ Enterprise AI & Technical Engine
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            AI Website Audit Tool
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            Audit your website's SEO, performance, accessibility, AI readiness and technical health in seconds.
          </p>
        </motion.section>

        {/* INPUT FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-[#0F172A] border border-white/[0.08] rounded-[20px] p-6 lg:p-8 shadow-2xl backdrop-blur-xl mb-12"
        >
          <form onSubmit={handleStartAudit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter domain or URL (e.g., onyxstacklabs.com)"
                className="w-full py-4 px-5 bg-[#05070B] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all text-base"
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-[#EF4444] text-sm font-medium px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#00D4FF] to-[#2563EB] hover:opacity-95 text-slate-950 font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-cyan-500/10"
            >
              {isLoading ? 'Running Technical Diagnostics...' : 'Analyze Website'}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-white/[0.08] text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">⚡ Fast Execution</span>
            <span className="flex items-center gap-1.5">🔒 100% Secure</span>
            <span className="flex items-center gap-1.5">💳 No Signup Required</span>
          </div>
        </motion.div>

        {/* LOADING ANIMATION WORKFLOW */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto bg-[#0F172A] border border-white/[0.08] rounded-[20px] p-8 text-center my-12 shadow-2xl"
            >
              <div className="w-12 h-12 border-4 border-[#00D4FF]/20 border-t-[#00D4FF] rounded-full animate-spin mx-auto mb-6" />
              <p className="text-white font-semibold text-lg mb-2">{stageMessage}</p>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-4">
                <motion.div 
                  className="bg-gradient-to-r from-[#00D4FF] to-[#2563EB] h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((stageIndex + 1) / 8) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AUDIT REPORT DISPLAY */}
        {report && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* REPORT HEADER SUMMARY */}
            <div className="bg-[#0F172A] border border-white/[0.08] rounded-[20px] p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Audit Results For</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-mono break-all">{report.url}</h2>
                <p className="text-sm text-slate-400">Completed on {new Date(report.timestamp).toLocaleString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <AuditScoreRing score={report.overallScore} />
                
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-white/10 transition-all text-sm flex items-center gap-2"
                >
                  📥 Export / Share Report
                </button>
              </div>
            </div>

            {/* CATEGORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(report.categories).map(([key, cat]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0F172A] border border-white/[0.08] rounded-[20px] p-8 space-y-6 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{cat.description}</p>
                    </div>
                    <span className={`text-2xl font-bold ${
                      cat.score >= 80 ? 'text-[#22C55E]' : cat.score >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                    }`}>
                      {cat.score}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${cat.score}%`,
                        backgroundColor: cat.score >= 80 ? '#22C55E' : cat.score >= 60 ? '#F59E0B' : '#EF4444'
                      }}
                    />
                  </div>

                  {/* Checks List */}
                  <div className="space-y-3 pt-2">
                    {cat.checks.map((check, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5">
                          {check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌'}
                        </span>
                        <div>
                          <p className="text-white font-medium">{check.name}</p>
                          <p className="text-xs text-slate-400">{check.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {cat.recommendations.length > 0 && (
                    <div className="pt-4 border-t border-white/[0.08]">
                      <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Action Required</h4>
                      {cat.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="bg-[#05070B] p-4 rounded-xl border border-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-semibold">{rec.issue}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              rec.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {rec.priority} Priority
                            </span>
                          </div>
                          <p className="text-xs text-slate-400"><strong className="text-slate-300">Fix:</strong> {rec.solution}</p>
                          <p className="text-xs text-[#00D4FF]"><strong className="text-slate-300">Impact:</strong> {rec.impact}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CALL TO ACTION CONVERSION BLOCK */}
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-[#00D4FF]/30 rounded-[20px] p-8 lg:p-12 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                Need Help Fixing These Issues?
              </h3>
              <p className="text-slate-300 max-w-xl mx-auto text-base">
                Our enterprise software and SEO engineering team can optimize your Core Web Vitals, fix architectural flaws, and implement GEO schemas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href="/contact"
                  className="w-full sm:w-auto py-4 px-8 bg-[#00D4FF] hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                >
                  Book Free Technical Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <AuditExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        auditData={report} 
      />
    </div>
  );
};

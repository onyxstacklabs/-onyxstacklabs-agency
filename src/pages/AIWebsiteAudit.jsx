import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolLayout from '../components/ToolLayout';
import { AuditSchema } from '../components/AuditSchema';
import { AuditScoreRing } from '../components/AuditScoreRing';
import { AuditExportModal } from '../components/AuditExportModal';
import { executeAudit } from '../components/auditEngine';

export const AIWebsiteAuditPage = ({ currentPath, navigateToNode }) => {
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
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="AI Website Audit Tool"
      tagline="Audit your website's SEO, performance, accessibility, AI readiness and technical health in seconds."
      shareText="I just audited my website using the OnyxStack Labs AI Website Audit Tool!"
    >
      <AuditSchema />

      <div className="space-y-8">
        {/* INPUT FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0F172A]/65 backdrop-blur-md border border-white/[0.08] rounded-[20px] p-6 md:p-8 shadow-2xl hover:border-[#06B6D4]/40 transition-all duration-300"
        >
          <form onSubmit={handleStartAudit} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter domain or URL (e.g., onyxstacklabs.com)"
                className="w-full h-[56px] px-5 bg-[#050505] border border-white/[0.08] rounded-xl text-white placeholder-[#71717A] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] transition-all text-base"
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-[#EF4444] text-sm font-medium px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full h-[56px] bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-black font-bold text-base rounded-xl transition-all duration-250 transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#06B6D4]/20 flex items-center justify-center cursor-pointer"
            >
              {isLoading ? 'Running Technical Diagnostics...' : 'Analyze Website'}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-white/[0.08] text-xs text-[#A1A1AA] font-medium">
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
              className="bg-[#0F172A]/65 backdrop-blur-md border border-white/[0.08] rounded-[20px] p-8 text-center my-8 shadow-2xl"
            >
              <div className="w-12 h-12 border-4 border-[#06B6D4]/20 border-t-[#06B6D4] rounded-full animate-spin mx-auto mb-6" />
              <p className="text-white font-semibold text-lg mb-2">{stageMessage}</p>
              <div className="w-full bg-[#050505] rounded-full h-2 overflow-hidden mt-4 border border-white/[0.08]">
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

        {/* AUDIT REPORT DISPLAY */}
        {report && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 pt-4"
          >
            {/* REPORT HEADER SUMMARY */}
            <div className="bg-[#0F172A]/65 backdrop-blur-md border border-white/[0.08] rounded-[20px] p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 hover:border-[#06B6D4]/30 transition-all duration-300">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">Audit Results For</span>
                <h2 className="text-xl md:text-2xl font-bold text-white font-mono break-all">{report.url}</h2>
                <p className="text-xs text-[#71717A]">Completed on {new Date(report.timestamp).toLocaleString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <AuditScoreRing score={report.overallScore} size={150} />
                
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="py-3 px-5 bg-transparent border border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-black font-semibold rounded-xl transition-all duration-250 text-sm flex items-center gap-2 cursor-pointer"
                >
                  📥 Export / Share Report
                </button>
              </div>
            </div>

            {/* CATEGORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(report.categories).map(([key, cat]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0F172A]/65 backdrop-blur-md border border-white/[0.08] hover:border-[#06B6D4]/40 rounded-[20px] p-8 space-y-6 shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                      <p className="text-xs text-[#A1A1AA] mt-1">{cat.description}</p>
                    </div>
                    <span className={`text-2xl font-bold ${
                      cat.score >= 80 ? 'text-[#22C55E]' : cat.score >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                    }`}>
                      {cat.score}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-white/[0.08]">
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
                          <p className="text-xs text-[#A1A1AA]">{check.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {cat.recommendations.length > 0 && (
                    <div className="pt-4 border-t border-white/[0.08]">
                      <h4 className="text-xs font-semibold uppercase text-[#A1A1AA] tracking-wider mb-3">Action Required</h4>
                      {cat.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="bg-[#050505] p-4 rounded-xl border border-white/[0.08] space-y-2 mb-3 last:mb-0">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-semibold">{rec.issue}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              rec.priority === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30' : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                            }`}>
                              {rec.priority} Priority
                            </span>
                          </div>
                          <p className="text-xs text-[#A1A1AA]"><strong className="text-white">Fix:</strong> {rec.solution}</p>
                          <p className="text-xs text-[#06B6D4]"><strong className="text-white">Impact:</strong> {rec.impact}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AuditExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        auditData={report} 
      />
    </ToolLayout>
  );
};

export default AIWebsiteAuditPage;

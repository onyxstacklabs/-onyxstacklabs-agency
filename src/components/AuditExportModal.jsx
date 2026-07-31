import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuditExportModal = ({ isOpen, onClose, auditData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !auditData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[20px] p-8 shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold text-white mb-2">Export & Share Report</h3>
          <p className="text-slate-400 text-sm mb-6">
            Share these technical metrics with your team or save them for project tracking.
          </p>

          <div className="space-y-4">
            <button
              onClick={handlePrint}
              className="w-full py-3.5 px-5 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            >
              📄 Print / Save as PDF
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-3.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200 flex items-center justify-center gap-3"
            >
              {copied ? '✓ Link Copied to Clipboard' : '🔗 Copy Shareable Link'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500">
              Audit for <span className="text-slate-300 font-mono">{auditData.url}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

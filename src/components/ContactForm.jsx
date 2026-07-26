// components/ContactForm.jsx
import React from 'react';

export default function ContactForm({ 
  formData, 
  setFormData, 
  submissionState, 
  setSubmissionState, 
  errors, 
  handleLeadFormTransmission, 
  siteConfig 
}) {
  return (
    <section id="contact" className="relative z-10 py-28 px-6 overflow-hidden" aria-labelledby="contact-title">
      {/* Premium Top Transition Splitter */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800/80 to-transparent" />
      
      {/* Ambient background glow matching enterprise style */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-950/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto bg-gradient-to-b from-[#0F172A]/95 to-[#05070B]/95 border border-[#1E293B] hover:border-slate-700/50 rounded-3xl p-6 md:p-10 space-y-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_50px_-12px_rgba(6,182,212,0.05)] backdrop-blur-xl transition-all duration-500">
        
        {/* Decorative corner accents for a premium technical look */}
        <div className="absolute top-0 left-8 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />
        <div className="absolute bottom-0 right-8 w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-[#1E293B] text-[9px] text-[#06B6D4] font-mono uppercase tracking-widest mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            Active Channel
          </div>
          <h2 id="contact-title" className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Let's Build Your Next Project
          </h2>
          <p className="text-xs text-slate-400 font-normal max-w-md mx-auto leading-relaxed tracking-wide">
            Drop your custom application parameters directly into our active design consultation funnel pipeline.
          </p>
        </div>

        {submissionState === 'SUCCESS' ? (
          <div className="bg-slate-900/10 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-5 animate-fade-in backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-950/30 border border-emerald-500/40 text-[#00e676] flex items-center justify-center mx-auto text-xl shadow-[0_0_20px_rgba(0,230,118,0.15)] animate-bounce">
              ✓
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#00e676] font-mono uppercase tracking-widest">Project Request Cached</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your project specifications have been successfully transmitted. Our engineering partners will reach out within 24 hours.
              </p>
            </div>
            <button 
              onClick={() => setSubmissionState('IDLE')}
              className="text-[10px] text-[#06B6D4] hover:text-cyan-300 font-mono uppercase tracking-widest pt-2 font-bold focus:outline-none focus:underline transition-colors"
            >
              Submit An Additional System Node
            </button>
          </div>
        ) : (
          <form onSubmit={handleLeadFormTransmission} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">Company Name</label>
              <input 
                type="text" 
                id="companyName"
                disabled={submissionState === 'SUBMITTING'}
                placeholder={siteConfig?.agencyName || "OnyxStack Labs"} 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className={`w-full bg-[#05070B] border ${
                  errors.companyName 
                    ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
                    : 'border-[#1E293B] hover:border-slate-700/80 focus:border-[#06B6D4] focus:ring-[#06B6D4]/15'
                } focus:ring-4 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50`}
              />
              {errors.companyName && <p className="text-red-400 text-[10px] font-mono mt-1">{errors.companyName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  disabled={submissionState === 'SUBMITTING'}
                  placeholder="onyxstacklabs@gmail.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full bg-[#05070B] border ${
                    errors.email 
                      ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
                      : 'border-[#1E293B] hover:border-slate-700/80 focus:border-[#06B6D4] focus:ring-[#06B6D4]/15'
                  } focus:ring-4 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50`}
                />
                {errors.email && <p className="text-red-400 text-[10px] font-mono mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  disabled={submissionState === 'SUBMITTING'}
                  placeholder="+92 344 5800630" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full bg-[#05070B] border ${
                    errors.phone 
                      ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
                      : 'border-[#1E293B] hover:border-slate-700/80 focus:border-[#06B6D4] focus:ring-[#06B6D4]/15'
                  } focus:ring-4 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50`}
                />
                {errors.phone && <p className="text-red-400 text-[10px] font-mono mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="details" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">Project Scope & Details</label>
              <textarea 
                id="details"
                rows="4"
                disabled={submissionState === 'SUBMITTING'}
                placeholder="Describe your customized system goals, required AI features, or workflow challenges..." 
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className={`w-full bg-[#05070B] border ${
                  errors.details 
                    ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500' 
                    : 'border-[#1E293B] hover:border-slate-700/80 focus:border-[#06B6D4] focus:ring-[#06B6D4]/15'
                } focus:ring-4 rounded-xl py-3 px-4 text-xs text-white placeholder-slate-700 outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] resize-none disabled:opacity-50`}
              />
              {errors.details && <p className="text-red-400 text-[10px] font-mono mt-1">{errors.details}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="budget" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block">Estimated Budget Allocation</label>
              <div className="relative">
                <select 
                  id="budget"
                  disabled={submissionState === 'SUBMITTING'}
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-[#05070B] border border-[#1E293B] hover:border-slate-700/80 focus:border-[#06B6D4] rounded-xl py-3 px-4 text-xs text-white outline-none cursor-pointer appearance-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 disabled:opacity-50"
                >
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $2,000</option>
                  <option>$2,000 - $3,000</option>
                  <option>$3,000 - $4,000</option>
                  <option>$4,000 - $5,000</option>
                  <option>$5,000 - $6,000</option>
                  <option>$6,000 - $7,000</option>
                  <option>$7,000 - $8,000</option>
                  <option>$8,000 - $9,000</option>
                  <option>$9,000 - $10,000</option>
                  <option>$10,000+</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={submissionState === 'SUBMITTING'}
              className="w-full bg-[#06B6D4] hover:bg-cyan-400 disabled:bg-cyan-950 disabled:text-cyan-700 text-black font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-[0_4px_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-black"
            >
              {submissionState === 'SUBMITTING' ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-black" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-mono tracking-wider">Verifying Transmission...</span>
                </>
              ) : (
                "Start Project"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

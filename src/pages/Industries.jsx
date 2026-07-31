import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SELECTION CORNER FRAMER VARIANT COEFFICIENTS
const fxFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const fxStaggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const fxTabPanelVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.99, y: -5, transition: { duration: 0.2, ease: 'easeIn' } }
};

export default function Industries({ currentPath, navigateToNode }) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  // Reset scroll position on mounting phase
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section 2 Data: Deep Sector Integration Matrix
  const industryCatalog = [
    {
      title: "Education",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      overview: "Scalable digital ecosystems engineered to support multi-campus orchestration, remote synchronous learning arrays, and highly protected institutional records management.",
      solutions: ["Institutional ERP Systems", "LMS Environments", "Automated Assessment Engines"],
      benefits: "Enhanced student data isolation, minimized administrative latency by 45%, and optimized faculty asset allocation loops."
    },
    {
      title: "Healthcare",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      overview: "Interoperable, mission-critical environments prioritizing absolute database protection, secure telemetry ingestion, and sub-second multi-facility scheduling loops.",
      solutions: ["Secure EHR Interfaces", "Telehealth Streaming Modules", "Clinical Resource Schedulers"],
      benefits: "Guaranteed structural compliance with medical record privacy patterns, minimized triage processing times, and robust auditing logs."
    },
    {
      title: "Retail & E-commerce",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      overview: "High-throughput commerce gateways built to handle intensive seasonal load spikes, distributed product graphs, and personalized checkout experiences.",
      solutions: ["Omnichannel Commerce Engines", "Live Inventory Sync Mesh", "Predictive Demand Calculators"],
      benefits: "Sub-second product catalog search speeds, minimized cart drop rates, and real-time localized distribution tracking."
    },
    {
      title: "Manufacturing",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      overview: "Industrial-grade hardware monitoring software and resource management tooling providing complete structural transparency into production lines and raw material supply links.",
      solutions: ["Predictive Maintenance Consoles", "Shop-Floor Asset Monitors", "Quality Assurance Analytics Tools"],
      benefits: "Mitigated unexpected manufacturing line downtime, automated resource alerts, and lowered physical component rejection rates."
    },
    {
      title: "Logistics & Transportation",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      overview: "Real-time fleet coordinates routing, high-concurrency storage node processing, and supply network mapping tailored for modern delivery setups.",
      solutions: ["Multi-Modal Route Optimization Platforms", "Warehouse Topology Planners", "Last-Mile Delivery Interfaces"],
      benefits: "Minimized fuel and route overhead by up to 22%, unified tracking layers, and automated verification handoffs."
    },
    {
      title: "Finance & Banking",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      overview: "Stateless, zero-fault accounting fabrics built with strict database locking controls, thorough encryption matrices, and instantaneous ledger calculations.",
      solutions: ["Corporate Ledger Engines", "Algorithmic Risk Management Dashboards", "RegTech Compliance Checkpoints"],
      benefits: "Guaranteed transactional integrity, immediate cross-node settlement tracking, and impenetrable data audit logs."
    },
    {
      title: "Real Estate",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      overview: "Dynamic asset evaluation pipelines, digital tenant portal systems, and unified investment property portfolios designed for commercial property groups.",
      solutions: ["Commercial Portfolio Visualizers", "Smart Lease Lifecycle Evaluators", "Asset Yield Modelling Engines"],
      benefits: "Accelerated property onboarding flows, transparent tenant lease logs, and clear visual projections for asset yields."
    },
    {
      title: "Hospitality",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      overview: "High-volume structural reservation networks designed to seamlessly balance occupancy adjustments, staff shift logs, and real-time vendor updates.",
      solutions: ["Central Reservation Systems (CRS)", "Dynamic Pricing Modulators", "Guest Engagement Applications"],
      benefits: "Eliminated overlapping booking anomalies entirely, heightened non-peak yield margins, and unified service profiles."
    },
    {
      title: "Startups",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      overview: "Highly malleable component ecosystems engineered for rapid feature expansion, iterative testing loops, and instantaneous cloud platform scaling.",
      solutions: ["MVP Architecture Engineering", "Serverless API Blueprints", "Event-Driven Customer Analytics Tracking"],
      benefits: "Drastically lowered engineering time-to-market metrics, minimal hosting overhead, and modular code ready for upcoming funding rounds."
    },
    {
      title: "Government & Public Sector",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      overview: "Highly reliable, multi-tenant digital utilities designed for maximal browser compatibility, screen-reader accessibility requirements, and high-security air-gapped deployments.",
      solutions: ["Citizen Portal Utilities", "Protected Public Document Registries", "Inter-Department Data Hubs"],
      benefits: "Strict alignment with public sector availability baselines, absolute security fencing, and cross-browser accessibility compliance."
    }
  ];

  // Section 3 Data: The Core Value Array
  const premiumValuePillars = [
    { title: "Defensive Security", desc: "We implement strict parameter boundaries, sanitization pipelines, and fine-grained authentication patterns to insulate operational records from threat actors." },
    { title: "Elastic Scalability", desc: "Building exclusively with stateless micro-architectures enables applications to spin up instances dynamically in response to severe traffic load spikes." },
    { title: "High-Velocity Performance", desc: "By using lean initial code compilation bundles, tree-shaking dead elements, and using client-side memory caching, layouts achieve perfect performance scores." },
    { title: "Cognitive AI Automation", desc: "Integrating Gemini cognitive services lets you offload intense text summarization, data extraction, and routing patterns into automatic loops." },
    { title: "Systemized UI/UX Design", desc: "We deploy standardized Figma-to-code design systems, ensuring pixel-perfect interface uniformity, scannable hierarchies, and clean user flows." },
    { title: "Long-Term Engineering Support", desc: "Our teams ship projects with clean automated testing routines and full technical documentation for straightforward internal transitions." }
  ];

  // Section 5 Data: Project Delivery Milestones
  const deliveryWorkflowPhases = [
    { id: "01", phaseName: "Discovery & System Mapping", summary: "We isolate existing software infrastructure blockages, map target transaction volumes, and compile strict schema parameters before designing wireframes." },
    { id: "02", phaseName: "Atomic Component Engineering", desc: "Interfaces are broken down into self-contained, isolated React components styled with utility frameworks to guarantee rapid visual consistency." },
    { id: "03", phaseName: "Cognitive & Data Orchestration", desc: "Connecting backend state machines, structuring indexing mechanisms across secure data clusters, and injecting machine learning models." },
    { id: "04", phaseName: "Continuous Edge Deployment", desc: "Passing systems through automated testing runners before distributing compiled modules to secure serverless edge configurations." }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* BACKGROUND GRAPHICS: MATCHES PREMIUM ENTERPRISE V2 DESIGN SYSTEM */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 opacity-70 border-b border-neutral-900/40" />
      <div className="absolute top-[800px] left-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute top-[1500px] right-0 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-0 w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[150px] pointer-events-none" />

      {/* BODY CONTENT WRAPPER */}
      <main className="relative z-10 orchestration-industries-scope" id="main-content">
        
        {/* SECTION 1: HERO CONTAINER PANEL */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-20 sm:pt-48 sm:pb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fxFadeUp}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Enterprise Domain Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] font-sans">
              Custom Frameworks Engineered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-cyan-400">
                For Strategic Verticals
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10 font-sans tracking-wide">
              We translate severe operational compliance vectors and complex transaction matrices into pixel-perfect, secure software engines. Explore our multi-tenant specialized blueprints.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="bg-white hover:bg-cyan-400 text-black px-7 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transform hover:-translate-y-0.5"
              >
                Initiate Core Audit
              </button>
              <button
                onClick={() => {
                  document.getElementById('verticals-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-neutral-800 hover:border-cyan-500/40 bg-neutral-950/40 hover:bg-neutral-900/60 text-neutral-300 px-7 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-200 backdrop-blur-sm"
              >
                Browse Sector Matrix
              </button>
            </div>
          </motion.div>
        </header>

        {/* SECTION 2: INDUSTRIES WE SERVE INTERACTIVE PRESENTATION GRID */}
        <section id="verticals-grid" className="max-w-7xl mx-auto px-6 md:px-12 py-16 scroll-mt-24">
          <div className="border-b border-neutral-900 pb-4 mb-12 flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 tracking-[0.2em]">// Sector Matrix Selectors</h2>
            <span className="text-xs font-mono text-neutral-600 hidden sm:inline">Active Nodes: {industryCatalog.length}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT ROW: TRIGGER COLUMN */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fxStaggerContainer}
              className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" 
              role="tablist" 
              aria-label="Industry Sectors"
            >
              {industryCatalog.map((ind, iIdx) => (
                <motion.button
                  variants={fxFadeUp}
                  key={iIdx}
                  role="tab"
                  id={`tab-${iIdx}`}
                  aria-selected={selectedIndustry === iIdx}
                  aria-controls={`panel-${iIdx}`}
                  onClick={() => setSelectedIndustry(iIdx)}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  className={`w-full text-left p-4.5 rounded-xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden backdrop-blur-sm ${
                    selectedIndustry === iIdx 
                      ? 'bg-gradient-to-r from-neutral-950 to-neutral-900/50 border-cyan-500/40 text-cyan-400 shadow-[0_4px_25px_rgba(6,182,212,0.05),inset_0_0_15px_rgba(6,182,212,0.03)]' 
                      : 'bg-neutral-950/30 border-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-800 hover:bg-neutral-900/20'
                  }`}
                >
                  {selectedIndustry === iIdx && (
                    <motion.div 
                      layoutId="activeGlowPill"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 to-blue-500" 
                    />
                  )}
                  
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                    selectedIndustry === iIdx 
                      ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                      : 'bg-neutral-900/60 text-neutral-500 group-hover:text-neutral-300 group-hover:bg-neutral-800/60'
                  }`}>
                    {ind.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-wide font-sans">{ind.title}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* RIGHT ROW: SELECTED DISPLAY CORE PANEL */}
            <div className="lg:col-span-8 min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndustry}
                  id={`panel-${selectedIndustry}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${selectedIndustry}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fxTabPanelVariant}
                  className="p-8 sm:p-12 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900/30 min-h-[520px] flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)] group"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04),transparent_65%)] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_60%)] pointer-events-none rounded-full" />
                  
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        {industryCatalog[selectedIndustry].icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">Operational Target Matrix</span>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-0.5">{industryCatalog[selectedIndustry].title}</h3>
                      </div>
                    </div>

                    <div className="space-y-8 font-sans">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-cyan-500/80 mb-3 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-cyan-400" />
                          Architecture Scope Overview
                        </h4>
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed tracking-wide">{industryCatalog[selectedIndustry].overview}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 mb-4 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-neutral-600" />
                          Engineered System Blueprints
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {industryCatalog[selectedIndustry].solutions.map((sol, sIdx) => (
                            <span key={sIdx} className="px-3.5 py-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-cyan-500/30 hover:text-white transition-all duration-200 shadow-sm">
                              {sol}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-neutral-900/80">
                    <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 mb-3">Quantifiable Enterprise Benefits</h4>
                    <div className="bg-gradient-to-r from-cyan-950/20 to-neutral-900/10 p-4.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm shadow-[inset_0_1px_10px_rgba(6,182,212,0.02)]">
                      <p className="text-neutral-400 italic text-xs sm:text-sm font-sans leading-relaxed">
                        "{industryCatalog[selectedIndustry].benefits}"
                      </p>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* SECTION 3: WHY BUSINESSES CHOOSE ONYXSTACK LABS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxFadeUp}
            className="max-w-3xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Operational Metrics</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Engineered for Systemic Core Stability</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxStaggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {premiumValuePillars.map((pillar, pIdx) => (
              <motion.div 
                key={pIdx} 
                variants={fxFadeUp}
                whileHover={{ y: -4, borderStandard: "1px solid rgba(6,182,212,0.3)" }}
                className="p-7 rounded-xl border border-neutral-900/80 bg-gradient-to-b from-neutral-950 to-neutral-950/40 hover:border-neutral-800 transition-all duration-300 group shadow-md"
              >
                <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 mb-5 rounded-full group-hover:w-16 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                <h3 className="text-base font-bold text-white mb-2.5 font-sans tracking-wide group-hover:text-cyan-400 transition-colors">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 4: TECHNOLOGIES ACROSS INDUSTRIES DATA MATRIX */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/[0.01] blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Technology Matrix</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5 font-sans leading-tight">Adaptive Framework Networks</h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide">
                We design clean micro-architectures custom mapped to high-volume computational nodes. Our setups strike a rigorous equilibrium between stateless performance loops and fault-tolerant encryption rules.
              </p>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fxStaggerContainer}
              className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {[
                { name: "React Frontend Core", role: "Interface Orchestration" },
                { name: "Node.js Platform", role: "High-Throughput IO Hubs" },
                { name: "MongoDB Infrastructure", role: "Dynamic Object Matrices" },
                { name: "Firebase Cloud Fabrics", role: "Stateless Cloud Storage" },
                { name: "Gemini AI Frameworks", role: "Cognitive Inference Engines" },
                { name: "Vite Compilation Layers", role: "Optimized Asset Bundling" }
              ].map((techElement, teIdx) => (
                <motion.div 
                  key={teIdx} 
                  variants={fxFadeUp}
                  whileHover={{ borderStandard: "1px solid rgba(6,182,212,0.2)", scale: 1.02 }}
                  className="p-4.5 rounded-xl border border-neutral-900 bg-neutral-950/70 shadow-sm hover:bg-neutral-900/40 transition-all duration-200"
                >
                  <h4 className="text-xs font-bold text-neutral-200 mb-1 font-mono">{techElement.name}</h4>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans font-medium">{techElement.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: ENTERPRISE DEVELOPMENT PROCESS FLOW */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxFadeUp}
            className="max-w-3xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Lifecycle Blueprint</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Scientific Delivery Parameters</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxStaggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {deliveryWorkflowPhases.map((phase, phIdx) => (
              <motion.div 
                key={phIdx} 
                variants={fxFadeUp}
                className="p-6.5 rounded-xl border border-neutral-900/80 bg-gradient-to-b from-neutral-950 to-[#060606] relative group hover:border-neutral-800 transition-all duration-300 shadow-md"
              >
                <div className="absolute top-5 right-5 text-xs font-mono font-bold text-neutral-800 group-hover:text-cyan-500/40 transition-colors duration-300">
                  // {phase.id}
                </div>
                <h3 className="text-sm font-bold text-white mb-3 font-sans tracking-wide mt-2 group-hover:text-cyan-400 transition-colors duration-300">{phase.phaseName}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide">{phase.summary || phase.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 6: FIXED CLOSING CALL TO ACTION BLOCK */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-28 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fxFadeUp}
            className="p-8 sm:p-16 rounded-3xl border border-neutral-800/80 bg-gradient-to-tr from-neutral-950 via-neutral-950 to-neutral-900/20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110" />
            
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans leading-tight">
                Accelerate Your Core Domain Infrastructure Architecture
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide max-w-2xl">
                Connect with our system engineers to lay down clean schema parameters, verify scalability boundaries, and draft a high-fidelity system roadmap tailored exclusively for your specialized business needs.
              </p>
            </div>

            <div className="flex-shrink-0 z-10 w-full sm:w-auto">
              <button
                onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="w-full sm:w-auto text-center bg-white hover:bg-cyan-400 text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transform hover:-translate-y-0.5"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </section>

      </main>

    </div>
  );
}

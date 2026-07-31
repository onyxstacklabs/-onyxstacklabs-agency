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

export default function Projects({ currentPath, navigateToNode }) {
  const [activeCase, setActiveCase] = useState(0);

  // Synchronize layout scroll threshold on initialization phase
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section 2 Data: Comprehensive Corporate Case Studies Catalog Matrix
  const caseStudies = [
    {
      name: "OnyxStack School",
      type: "EdTech & Institutional ERP Architecture",
      status: "Live Production Deployment",
      overview: "An enterprise-grade cloud environment designed to consolidate multi-campus operations, secure highly vulnerable student databases, and manage automated grading metrics.",
      problem: "The institution relied on legacy, disconnected software systems that suffered from frequent database synchronization failures, slow manual report building, and serious security risks regarding student data privacy.",
      solution: "We deployed a decoupled React application backed by a distributed database cluster. This architecture isolated administrative workflows from public portals and added end-to-end encryption to sensitive student records.",
      features: [
        "Automated multi-campus operational metrics dashboard",
        "Role-based secure access tokens for staff and students",
        "Sub-second ledger synchronization loops for student data"
      ],
      stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      benefits: "Reduced administrative operational processing latency by 64% and completely eliminated localized database downtime records across all target campus networks.",
      accent: "from-cyan-500/20 to-blue-600/5",
      metric: "64% Latency Reduction"
    },
    {
      name: "OnyxStack Tailors",
      type: "B2B Supply Chain & Custom Commerce Core",
      status: "Live Production Deployment",
      overview: "A specialized inventory mapping and ordering application built to handle complex custom sizing calculations, materials availability tracking, and automated logistical alerts.",
      problem: "Manual transcription errors in custom fit measurements led to a 14% material waste rate, compounded by poor visibility into textile supplier timelines.",
      solution: "We built an interactive, single-page ordering system that validates spatial measurement data directly in the browser before routing supply line triggers straight to manufacturing centers.",
      features: [
        "Interactive multidimensional sizing input engine",
        "Live component inventory monitoring and low-stock triggers",
        "Automated fulfillment scheduling engine with client alert updates"
      ],
      stack: ["React", "Firebase", "Express.js", "Vite"],
      benefits: "Lowered production material waste margins below 2% within ninety days and cut fulfillment turnaround cycles by an average of four business days.",
      accent: "from-purple-500/20 to-indigo-600/5",
      metric: "<2% Material Waste"
    },
    {
      name: "OnyxStack GatePass",
      type: "High-Security Identity Verification Network",
      status: "Live Production Deployment",
      overview: "A localized verification system designed to manage facility foot traffic through real-time cryptographic tokens, biometric system calls, and automated alert logs.",
      problem: "Legacy identity tracking relied on easily duplicated badge structures, creating severe security audit gaps in restricted infrastructure zones.",
      solution: "We engineered a low-latency web architecture running on isolated edge environments, utilizing signed time-based tokens and secure database logging to handle identity validation.",
      features: [
        "Time-locked dynamic cryptographic credential checks",
        "Hardware-interfaced biometric checkpoint ingestion hooks",
        "Real-time access pattern auditing and automated anomaly logs"
      ],
      stack: ["React", "Node.js", "MongoDB", "Git"],
      benefits: "Achieved immediate identity verification response times (~180ms) and established perfect compliance tracking for enterprise data center security audits.",
      accent: "from-emerald-500/20 to-teal-600/5",
      metric: "~180ms Auth Speed"
    },
    {
      name: "OnyxStack Lottery",
      type: "Verifiable Randomization & Reward Tracking Ledger",
      status: "Active System Optimization Phase",
      overview: "A highly resilient reward distribution environment leveraging advanced mathematical algorithms to guarantee non-bias event outcomes and safe balance ledger updates.",
      problem: "Existing random drawing frameworks lacked visible transparency, resulting in growing user skepticism regarding system fairness and audit compliance.",
      solution: "We integrated public, cryptographically verifiable random number generation processes with a high-throughput transaction ledger built on stateless cloud microservices.",
      features: [
        "Publicly auditable cryptographic event sequencing blocks",
        "Safe financial ledger architecture with zero concurrent write conflicts",
        "High-density concurrent participant sorting pipelines"
      ],
      stack: ["React", "Firebase", "Vercel", "Tailwind CSS"],
      benefits: "Restored user platform retention metrics by providing fully transparent drawing data, while lowering database processing costs during peak traffic waves.",
      accent: "from-amber-500/20 to-orange-600/5",
      metric: "100% Audit Transparency"
    },
    {
      name: "OnyxStack Cricket",
      type: "Real-Time Telemetry Analytics Console",
      status: "Live Production Deployment",
      overview: "A high-performance sports tracking interface processing sub-second game metrics, machine learning match projections, and high-volume fan interactions concurrently.",
      problem: "Existing data providers experienced up to 5-second delays when pushing live event metrics, causing massive lag drops for active mobile web views.",
      solution: "We set up an optimized WebSocket telemetry server layered with a React virtualized list framework to render millions of data packets without slowing down UI thread performance.",
      features: [
        "Sub-second data payload distribution layer via open WebSockets",
        "Predictive outcome modeling components fueled by Gemini AI instances",
        "High-performance dashboard rendering capable of 60 FPS updates"
      ],
      stack: ["React", "Gemini AI", "Node.js", "Vite"],
      benefits: "Increased fan platform interaction averages by 140% due to instantaneous updates, providing zero lag during high-concurrency match events.",
      accent: "from-rose-500/20 to-red-600/5",
      metric: "140% Engagement Gain"
    }
  ];

  // Section 3 Data: Methodology Phases
  const methodologies = [
    { step: "Phase 01", title: "Technical Architecture Discovery", desc: "We audit underlying legacy databases, map internal API dependencies, and establish concrete performance benchmarks before writing a single line of code." },
    { step: "Phase 02", title: "Isolated Component Prototyping", desc: "Constructing atomic UI components within sandboxed testing setups ensures high code reuse, predictable state behavior, and reliable responsiveness." },
    { step: "Phase 03", title: "Deterministic Security Auditing", desc: "Running data inputs through thorough validation filters, setting up strict cross-origin access tokens, and verifying cloud security boundaries." },
    { step: "Phase 04", title: "Automated Edge Orchestration", desc: "Deploying code through continuous delivery systems onto distributed serverless edge nodes to keep global content delivery times as low as possible." }
  ];

  // Section 4 Data: Key Operational Results
  const globalImpactMetrics = [
    { value: "4.8x", label: "Average Infrastructure Velocity Increase" },
    { value: "Zero", label: "Critical Cross-Site Scripting Injection Exploits Recorded" },
    { value: "32%", label: "Average Monthly Cloud Operations Capital Saved" },
    { value: "100%", label: "Complete Codebase Ownership Handover Execution" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* BRAND AMBIENT DIGITAL GRAPHICS MATRICES */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 opacity-70 border-b border-neutral-900/40" />
      <div className="absolute top-[1000px] right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[500px] left-0 w-[600px] h-[600px] bg-blue-600/[0.02] blur-[160px] pointer-events-none" />

      {/* COMPONENT BODY LAYER FRAME */}
      <main className="relative z-10 distribution-case-studies-scope" id="main-content">
        
        {/* SECTION 1: HERO DISPLAY CONTAINER */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-20 sm:pt-48 sm:pb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fxFadeUp}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Engineering Analytics Logs
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] font-sans">
              Enterprise Software Case Studies: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-cyan-400">
                Proven Technical Architecture
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10 font-sans tracking-wide">
              Review detailed technical breakdowns of our production systems, architectural methodologies, and specific operational solutions engineered for scaling platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="bg-white hover:bg-cyan-400 text-black px-7 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transform hover:-translate-y-0.5"
              >
                Initiate Project Intake
              </button>
              <button
                onClick={() => {
                  document.getElementById('case-studies-matrix')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-neutral-800 hover:border-cyan-500/40 bg-neutral-950/40 hover:bg-neutral-900/60 text-neutral-300 px-7 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-200 backdrop-blur-sm"
              >
                Explore Active Logs
              </button>
            </div>
          </motion.div>
        </header>

        {/* SECTION 2: EXTENSIVE CORPORATE CASE STUDIES CAPABILITIES CONTAINER */}
        <section id="case-studies-matrix" className="max-w-7xl mx-auto px-6 md:px-12 py-16 scroll-mt-24">
          
          {/* TAB ARCHITECTURE ELEMENT TRIGGER LIST */}
          <div className="border-b border-neutral-900 pb-4 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 tracking-[0.2em]">// Featured Engineering Deployments</h2>
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project Case Studies">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  role="tab"
                  id={`project-tab-${idx}`}
                  aria-selected={activeCase === idx}
                  aria-controls={`project-panel-${idx}`}
                  onClick={() => setActiveCase(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all duration-200 relative ${
                    activeCase === idx 
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold' 
                      : 'border border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {cs.name}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE CONTENT SHEET LAYER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* CORE TECHNICAL SPEC CARD */}
            <div className="lg:col-span-8 min-h-[580px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase}
                  id={`project-panel-${activeCase}`}
                  role="tabpanel"
                  aria-labelledby={`project-tab-${activeCase}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fxTabPanelVariant}
                  className="p-8 sm:p-12 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900/30 min-h-[580px] flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)] group"
                >
                  <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${caseStudies[activeCase].accent} blur-[100px] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110`} />
                  
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-900/80 pb-6 mb-8 relative z-10">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">{caseStudies[activeCase].type}</span>
                        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1 font-sans">{caseStudies[activeCase].name}</h3>
                      </div>
                      <div className="px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[10px] font-mono uppercase tracking-widest text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                        {caseStudies[activeCase].status}
                      </div>
                    </div>

                    <div className="space-y-8 text-sm sm:text-base leading-relaxed text-neutral-400 font-sans">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-cyan-500/80 mb-2.5 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-cyan-400" />
                          Project Overview
                        </h4>
                        <p className="text-neutral-300 leading-relaxed tracking-wide">{caseStudies[activeCase].overview}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-900">
                          <h5 className="text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">// Legacy Bottleneck</h5>
                          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{caseStudies[activeCase].problem}</p>
                        </div>
                        <div className="p-5 rounded-xl bg-cyan-950/10 border border-cyan-500/10">
                          <h5 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">// Engineered Solution</h5>
                          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{caseStudies[activeCase].solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 mb-3 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-neutral-600" />
                          Key Architectural Features
                        </h4>
                        <ul className="space-y-2.5">
                          {caseStudies[activeCase].features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-400">
                              <span className="text-cyan-400 font-mono select-none mt-0.5">0{fIdx + 1}.</span>
                              <span className="tracking-wide">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-neutral-900/80">
                    <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 mb-3">Quantifiable Enterprise Benefits</h4>
                    <div className="bg-gradient-to-r from-cyan-950/20 to-neutral-900/10 p-4.5 rounded-xl border border-cyan-500/10 backdrop-blur-sm shadow-[inset_0_1px_10px_rgba(6,182,212,0.02)]">
                      <p className="text-neutral-300 italic text-xs sm:text-sm font-sans leading-relaxed">
                        "{caseStudies[activeCase].benefits}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SIDE PANEL META METRICS METADATA LAYER */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* PRIMARY PROJECT METRIC HIGHLIGHT */}
              <div className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/[0.01] blur-md rounded-full pointer-events-none" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">Primary Node Outcome</span>
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white mb-1">
                  {caseStudies[activeCase].metric}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80">Verified Production Benchmarking Log</div>
              </div>

              {/* STACK LIST CONTAINER */}
              <div className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-sm">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 tracking-wider">Allocated Stack Matrix</h3>
                <div className="flex flex-wrap gap-2.5">
                  {caseStudies[activeCase].stack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 shadow-sm hover:border-neutral-700 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION MODULE */}
              <div className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/20 backdrop-blur-sm space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 tracking-wider">System Validation Protocol</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans tracking-wide">
                  Evaluate client-facing user interfaces and secure automated state response mechanisms configured for this operational stack.
                </p>
                <button
                  onClick={() => alert(`Initializing deployment mirror configuration sandbox routing for ${caseStudies[activeCase].name}...`)}
                  className="w-full text-center py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/40 hover:bg-cyan-500 hover:text-black text-neutral-300 text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none shadow-sm"
                >
                  Launch Live Preview
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: SYSTEM DESIGN DEVELOPMENT METHODOLOGY PROTOCOLS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxFadeUp}
            className="max-w-3xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Workflow Orchestration</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Our Technical Project Implementation Pipeline</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxStaggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {methodologies.map((meth, mIdx) => (
              <motion.div 
                key={mIdx} 
                variants={fxFadeUp}
                className="p-6.5 rounded-xl border border-neutral-900/80 bg-gradient-to-b from-neutral-950 to-[#060606] relative group hover:border-neutral-800 transition-all duration-300 shadow-md"
              >
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest block mb-4 transition-colors duration-300 group-hover:text-cyan-400/70">{meth.step}</span>
                <h3 className="text-sm font-bold text-white mb-2.5 font-sans tracking-wide mt-2">{meth.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide">{meth.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 4: GLOBAL METRICS MATRIX AND SYSTEM RESULTS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxFadeUp}
            className="max-w-3xl mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Cumulative Velocity</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Compounding Performance Metrics Across Ecosystems</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxStaggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {globalImpactMetrics.map((gim, gIdx) => (
              <motion.div 
                key={gIdx} 
                variants={fxFadeUp}
                className="p-6 sm:p-8 rounded-xl border border-neutral-900/60 bg-neutral-950/20 text-center sm:text-left backdrop-blur-sm shadow-sm hover:border-neutral-800 transition-colors"
              >
                <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tight text-white mb-2 bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                  {gim.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500 leading-relaxed tracking-wide">
                  {gim.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 5: MASTER ALLOCATED CORE TECHNOLOGIES ARRAY */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.01] blur-[140px] pointer-events-none" />
          
          <div className="max-w-3xl mb-12 relative z-10">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 tracking-[0.2em]">// Integrated Infrastructure</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Core Platforms Powering Client Application Ecosystems</h2>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fxStaggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10"
          >
            {["React Frontend", "Node.js Platform", "MongoDB Core", "Firebase Clusters", "Gemini Inference API"].map((coreTech, ctIdx) => (
              <motion.div 
                key={ctIdx} 
                variants={fxFadeUp}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/80 hover:bg-neutral-900/40 transition-all duration-200 shadow-sm"
              >
                <h4 className="text-sm font-bold text-neutral-200 font-sans tracking-wide mb-1">{coreTech}</h4>
                <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">Verified Node Asset</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 6: COMPREHENSIVE CALL TO ACTION CONSOLE TUNNEL */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-28 border-t border-neutral-900/50">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fxFadeUp}
            className="p-8 sm:p-16 rounded-3xl border border-neutral-800/80 bg-gradient-to-tr from-neutral-950 via-neutral-950 to-neutral-900/20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110" />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans leading-tight">
                Ready to Engineer Your Own Performance Case Study?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide max-w-2xl">
                Bring your unique scaling challenges into our system framework. Connect with our principal engineering architects to deploy robust software solutions optimized precisely for your operational targets.
              </p>
            </div>
            
            <div className="relative z-10 flex-shrink-0 w-full sm:w-auto">
              <button 
                onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="w-full sm:w-auto text-center bg-white hover:bg-cyan-400 text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest font-mono transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Establish Pipeline Connection
              </button>
            </div>
          </motion.div>
        </section>

      </main>

    </div>
  );
}

import React, { useEffect, useState } from 'react';

// LIVE DATA CORE & FIREBASE CONFIG IMPORTS
import { db } from '../config/firebase'; // Aapka existing firebase setup
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Careers({ currentPath, navigateToNode }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDept, setSelectedDept] = useState("All");
  
  // Custom Modal Pipeline State Matrix
  const [activeApplicationModal, setActiveApplicationModal] = useState(null);
  const [modalStep, setModalStep] = useState(1); // 1: Handshake, 2: Form Input, 3: Processing, 4: Success
  
  // Form States Matrix - Synchronized precisely with OnyxAdmin Hub expectations
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', portfolio: '', experience: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleModalClose = () => {
    setActiveApplicationModal(null);
    setModalStep(1);
    setFormData({ name: '', email: '', phone: '', portfolio: '', experience: '' });
  };

  // DISCORD PIPELINE NOTIFICATION DISPATCHER
  const dispatchDiscordNotification = async (payload) => {
    const DISCORD_WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE";
    
    const embedData = {
      username: "OnyxStack Recruitment Bot",
      avatar_url: "https://onyxstacklabs.com/logo.png",
      embeds: [{
        title: "🚨 New Enterprise Talent Acquired!",
        color: 43232, // Cyan hex matrix
        fields: [
          { name: "Target Position / Role", value: `\`${payload.role}\``, inline: true },
          { name: "Candidate Name", value: payload.name, inline: true },
          { name: "Contact Phone", value: payload.phone || "Not Provided", inline: true },
          { name: "Email Address", value: payload.email, inline: false },
          { name: "Portfolio Node", value: payload.portfolio, inline: false },
          { name: "Core Stack / Experience", value: `\`\`\`${payload.experience}\`\`\`` }
        ],
        footer: { text: "OnyxStack Labs Control Tower Pipeline" },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embedData)
      });
    } catch (err) {
      console.error("Discord link anomaly triggered:", err);
    }
  };

  // CORE DATA TRANSMISSION ROUTINE
  const handleIntakeSubmission = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.portfolio || !formData.phone) return;

    setModalStep(3); // Processing telemetry status
    
    // Upgraded Payload: Status anchor attached to align perfectly with the Admin Sub-Tabs Routing Logic
    const applicationPayload = {
      role: activeApplicationModal,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      portfolio: formData.portfolio,
      experience: formData.experience || "Not Specified",
      status: "pending", // <--- Synchronizes with OnyxAdmin 'pending' query filter node
      submittedAt: serverTimestamp() // Explicit mapping hook for orderBy query
    };

    try {
      // 1. Database Persistence Execution targeting the live recruitment_pipeline collection cluster
      await addDoc(collection(db, "recruitment_pipeline"), applicationPayload);
      
      // 2. Discord Cluster Notification Trigger
      await dispatchDiscordNotification(applicationPayload);
      
      setModalStep(4); // Success routing complete

      // Hybrid flow: show the existing "Transmission Relayed" success screen
      // briefly, then close the modal and move the user to the Thank You page.
      setTimeout(() => {
        handleModalClose();
        navigateToNode('/thank-you');
      }, 1800);
    } catch (error) {
      console.error("Critical database pipeline rupture:", error);
      setModalStep(2); // Fallback to form loop on exception
    }
  };

  // Static Data Structural Matrices
  const cultureVectors = [
    { title: "Pure Innovation", desc: "We actively reject rigid copy-paste code patterns. Our team continuously develops greenfield serverless systems and custom telemetry dashboards." },
    { title: "Vertical Growth Loops", desc: "Clear engineering advancement paths designed to elevate mid-tier developers to senior platform architects based on structural performance metrics." },
    { title: "Sovereign Work Formats", desc: "Asynchronously balanced operating framework. Work from any location globally, assuming clear container milestone obligations are maintained." },
    { title: "Continuous Technical Buffers", desc: "Quarterly institutional learning tracks covering state-of-the-art developments in generative AI, edge execution layers, and safe database isolation." },
    { title: "High-Density Global Scope", desc: "Build critical digital infrastructure models for prominent cross-border logistics systems, educational networks, and corporate enterprise clients." },
    { title: "Decoupled Collaboration", desc: "Zero pointless daily standup rituals. Communication runs on clean document specs, precise code logs, and automated repository trackers." }
  ];

  const openPositions = [
    { id: "job-01", title: "Frontend React Developer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Senior (4+ Years)", location: "Global", mode: "Remote", desc: "Architect scalable B2B dashboards, design atomized layout tokens, and continuously balance sub-second view paint speeds across complex data structures." },
    { id: "job-02", title: "Backend Node.js Engineer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Mid-to-Senior", location: "Global", mode: "Remote", desc: "Deploy highly concurrent Node/Express APIs, model nested Mongo schemas, and implement multi-tenant validation boundaries to handle extreme traffic shocks safely." },
    { id: "job-03", title: "Full Stack MERN Developer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Senior (5+ Years)", location: "Global", mode: "Remote", desc: "Bridge modular React client interfaces with secure distributed microservices. Own features end-to-end, managing deployment state loops across cloud environments." },
    { id: "job-04", title: "UI/UX Designer", dept: "Design", type: "Contract-to-FTE", experience: "Senior (5+ Years)", location: "Global", mode: "Remote", desc: "Draft sophisticated user flows and pixel-perfect dark theme design structures using systemic component patterns easily translated into utility CSS tokens." },
    { id: "job-05", title: "AI Engineer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Expert Level", location: "Global", mode: "Remote", desc: "Integrate stateless LLM inference engines, embed secure prompt vectors into active application codebeds, and minimize browser data transit lag." },
    { id: "job-06", title: "Flutter Developer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Senior (3+ Years)", location: "Global", mode: "Remote", desc: "Compile optimized cross-platform native engines. Maintain continuous 60 FPS performance states while processing high-concurrency background sync pipelines." },
    { id: "job-07", title: "DevOps Engineer", dept: "Engineering", type: "Full-Time (Remote)", experience: "Senior", location: "Global", mode: "Remote", desc: "Configure automated multi-region serverless deployment architecture, edge isolation networks, and secure repository integration matrices for total up-time." }
  ];

  const hiringProcess = [
    { phase: "01. Digital Application", info: "Submit your technical portfolio link, active GitHub profile overview, or structural resume breakdown for pipeline evaluation." },
    { phase: "02. Profile Architecture Review", info: "Our lead engineers screen your repository patterns to look for atomic clean coding habits and smart layout separation loops." },
    { phase: "03. Technical Interview", info: "A deep dive into structural application design, system state paradigms, runtime performance optimization, and memory isolation vectors." },
    { phase: "04. Final Interview", info: "A structured session with our engineering leaders to verify communication synergy, global remote alignment, and cross-functional product ownership." },
    { phase: "05. Institutional Offer", info: "Receive a transparent, comprehensive compensation blueprint detailing your base salary packages, equity points, and growth tracks." },
    { phase: "06. Environment Onboarding", info: "Access localized sandbox servers, read production architecture runbooks, and deploy initial code nodes within week one." }
  ];

  const corporateBenefits = [
    { category: "Hardware & Terminal Allowances", benefit: "Receive a premium workstation stipend every 2 years to procure the high-speed chips and displays your work demands." },
    { category: "Universal Health Infrastructure", benefit: "Global medical and dental insurance subsidies mapped safely to support your local region's private care networks." },
    { category: "Asynchronous PTO Ecosystem", benefit: "28 days of baseline annual paid time off alongside regional calendar breaks, backed by a strict 'no notification check' code." },
    { category: "Learning Resource Endowments", benefit: "$1,500 annual personal development budget for software licenses, advanced certifications, and technical text access." }
  ];

  const careerFaqs = [
    { q: "Can I apply if my current geographical timezone sits outside of standard operational boundaries?", a: "Yes. OnyxStack Labs operates with an asynchronous workflow matrix. As long as you maintain core alignment intersections with your technical pod for code reviews and document updates, you control your clock variables completely." },
    { q: "What programming style conventions does your technical organization look for in coding tests?", a: "We highly prioritize declarative state formatting, defensive boundary conditions against edge exceptions, isolated atomic components, and readable commit annotations. We favor long-term maintainability over over-engineered micro-optimizations." },
    { q: "How fast do applications advance through the enterprise screening pipeline?", a: "Our typical review-to-offer trajectory completes in under 14 business days. We understand top technical talent moves rapidly through market options, so we keep evaluation channels direct and responsive." }
  ];

  const filteredJobs = selectedDept === "All" ? openPositions : openPositions.filter(j => j.dept === selectedDept);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">
      
      {/* BRAND BG ELEMENTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none z-0" />

      <div className="relative z-10 enterprise-recruitment-view-scope">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 sm:pt-40 sm:pb-24 text-center sm:text-left relative">
          <div className="max-w-4xl mx-auto sm:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono uppercase tracking-widest mb-6">
              Global Operations Pipeline // Open Cadres
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Write Code That Defies Technical Debt. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-cyan-200 to-blue-500">
                Build Institutional Systems.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mb-8">
              We connect expert engineers and meticulous interface designers to replace brittle templates with resilient, high-speed customized platforms.
            </p>
            <button
              onClick={() => document.getElementById('open-positions-frame')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-[#06B6D4] text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300"
            >
              Join Our Team // Review Positions
            </button>
          </div>
        </section>

        {/* ACTIVE JOB BOARD */}
        <section id="open-positions-frame" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900/60 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Live Registries</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Active Enterprise Openings</h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-900">
              {["All", "Engineering", "Design"].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${selectedDept === d ? 'bg-neutral-900 border border-[#06B6D4]/20 text-[#06B6D4] font-bold' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl border border-neutral-900/80 bg-gradient-to-b from-neutral-950 to-neutral-950/40 flex flex-col justify-between group min-h-[360px] transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-850 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">{job.dept}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{job.experience}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#06B6D4] mb-1">{job.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-4">{job.desc}</p>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => { setActiveApplicationModal(job.title); setModalStep(1); }}
                    className="w-full py-3 rounded-xl bg-neutral-900 text-neutral-300 border border-neutral-850 group-hover:bg-[#06B6D4] group-hover:text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Initialize Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* TERMINAL ADAPTIVE MODAL INTERACTION SYSTEM */}
      {activeApplicationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={handleModalClose} />
          
          <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl z-10 font-mono">
            
            {/* Header matrix */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[9px] uppercase tracking-widest mb-1">
                  SYS.API://TERMINAL_CONNECTED
                </span>
                <h3 className="text-base font-bold text-white font-sans">
                  {modalStep === 4 ? "Transmission Finalized" : "Recruitment Node"}
                </h3>
              </div>
              <button onClick={handleModalClose} className="text-neutral-500 hover:text-neutral-300 text-xs">[ESC]</button>
            </div>

            {/* STEP 1: INITIAL HANDSHAKE FLOW */}
            {modalStep === 1 && (
              <div className="space-y-4">
                <div className="bg-[#050505] border border-neutral-900 rounded-xl p-4 text-xs space-y-2 text-neutral-400">
                  <p><span className="text-[#06B6D4]">&gt;</span> Pipeline Initialization Sequence Active...</p>
                  <p><span className="text-[#06B6D4]">&gt;</span> Target Node: <span className="text-white font-bold">{activeApplicationModal}</span></p>
                  <p className="text-emerald-400 font-bold">✓ Secure Data Tunnel Ready for Telemetry Injection.</p>
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={handleModalClose} className="px-4 py-2 border border-neutral-850 rounded-lg text-xs text-neutral-500 hover:text-white">Cancel</button>
                  <button onClick={() => setModalStep(2)} className="px-5 py-2 bg-white text-black font-bold rounded-lg text-xs hover:bg-[#06B6D4]">PROCEED TO INTAKE</button>
                </div>
              </div>
            )}

            {/* STEP 2: INLINE FORM INPUT INTERACTION */}
            {modalStep === 2 && (
              <form onSubmit={handleIntakeSubmission} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1 uppercase tracking-wider">Candidate Operator Name*</label>
                    <input 
                      type="text" required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1 uppercase tracking-wider">Secure Transmission Email*</label>
                    <input 
                      type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                      placeholder="operator@network.com"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1 uppercase tracking-wider">Contact Phone Number* (WhatsApp Macro Trigger)</label>
                    <input 
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                      placeholder="e.g. +923001234567"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1 uppercase tracking-wider">GitHub / Portfolio Link*</label>
                    <input 
                      type="url" required
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 block mb-1 uppercase tracking-wider">Core Technical Vectors / Stack Summary</label>
                    <textarea 
                      rows="2"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full bg-[#050505] border border-neutral-900 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4] resize-none"
                      placeholder="React, Next.js, Node, Tailwinds..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setModalStep(1)} className="px-4 py-2 text-xs text-neutral-500 hover:text-white">Back</button>
                  <button type="submit" className="px-5 py-2 bg-[#06B6D4] text-black font-bold rounded-lg text-xs uppercase tracking-wider">Submit Profile</button>
                </div>
              </form>
            )}

            {/* STEP 3: TRANSACTIONAL WAITING MATRIX */}
            {modalStep === 3 && (
              <div className="py-6 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-neutral-400 animate-pulse">Syncing payload cluster data to cloud & dispatching core logs...</p>
              </div>
            )}

            {/* STEP 4: INTUITIVE PIPELINE SUCCESS */}
            {modalStep === 4 && (
              <div className="space-y-4">
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                  <span className="text-emerald-400 text-lg">✓</span>
                  <h4 className="text-white font-bold font-sans text-sm mt-1">Transmission Relayed</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    Your profile matrix has bypassed architectural debt queues. Review logs initiated.
                  </p>
                </div>
                <button onClick={handleModalClose} className="w-full py-2 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 rounded-xl text-xs text-neutral-300 font-bold">
                  Disconnect Terminal Channel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

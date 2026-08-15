import React, { useEffect } from 'react';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { useSEO } from '../utils/useSEO';

export default function CookiesPolicy({ currentPath, navigateToNode }) {

  // Unique per-page SEO — title, description, and canonical for /cookies-policy.
  useSEO({
    title: 'Cookies Policy | OnyxStack Labs',
    description: 'Learn how OnyxStack Labs uses cookies to improve your browsing experience while protecting your privacy.',
    path: '/cookies-policy'
  });

  // Set explicit subview window focus on mounting phase
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section 3 Data: Categorized System Cookies Matrix
  const cookieCategories = [
    {
      title: "Essential Cookies",
      purpose: "System Stability & Session Management",
      desc: "These cookies are strictly required to operate our secure infrastructure nodes. They enable core security features, user authentication state preservation, and structural layout memory. Without these, our platform cannot process incoming traffic loops safely.",
      status: "Always Active",
      icon: (
        <svg className="w-5 h-5 text-[#06B6D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Performance Cookies",
      purpose: "Telemetry & Payload Tuning",
      desc: "These files securely monitor data transfer speeds, serverless function response times, and component load thresholds. They provide our infrastructure team with real-time feedback to optimize layout rendering pipelines and minimize loading latency.",
      status: "Optimization Only",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Preference Cookies",
      purpose: "Interface Localization State",
      desc: "These assets allow our framework to remember your custom choices, such as selected layout filters, navigation history pathways, and local time zones. They help us adjust interface layouts to match your work style on repeat sessions.",
      status: "User Toggled",
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Analytics Cookies",
      purpose: "Future Audience Metrics",
      desc: "Planned for future integration, these tracking cookies will securely map anonymous user behavior, entry channels, and overall platform engagement. They will help us guide feature roadmaps and evaluate the success of updates.",
      status: "Staged / Disabled",
      icon: (
        <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-neutral-200 font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT INFRASTRUCTURE NODE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-blue-600/[0.025] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[400px] right-0 w-[550px] h-[550px] bg-[#06B6D4]/[0.02] blur-[180px] pointer-events-none" />

      {/* MAIN TARGET MATRIX CONTROLLER */}
      <div className="relative z-10 distribution-container-layer">
        
        {/* SECTION 1: HERO CONTAINER */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-16 sm:pt-44 sm:pb-24 dynamic-fade-in">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono uppercase tracking-widest mb-6 animate-pulse">
              Compliance Ledger // Core Transparency
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
              Cookies & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-cyan-400 to-blue-500">
                Data Privacy Policy
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mb-8 font-sans">
              At OnyxStack Labs, we believe transparency is the foundation of digital trust. This policy provides a comprehensive, straightforward look into how our platform utilizes browser cookies and local data structures to safeguard and optimize your interaction.
            </p>
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest bg-slate-900/50 inline-block px-3 py-1.5 rounded-md border border-slate-800">
              Last Updated: July 19, 2026
            </div>
          </div>
        </header>

        {/* SECTION 2: WHAT ARE COOKIES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-slate-800/60 dynamic-slide-up" aria-labelledby="cookies-definition-title">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Storage Definitions</p>
              <h2 id="cookies-definition-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Understanding Local State Files</h2>
            </div>
            <div className="lg:col-span-8 text-neutral-400 space-y-6 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Cookies are compact, secure text files stored on your computer or mobile hardware whenever you visit modern digital environments. They serve as an isolated local memory system, allowing modern application engines to retain configurations, recognize active user states, and secure your session parameters against unauthorized interruptions.
              </p>
              <p>
                OnyxStack Labs operates with a strict minimization mindset. We consciously bypass intrusive advertising networks and third-party behavioral trackers. Our system architecture uses local storage keys strictly to maintain rapid interface load velocities, process layouts cleanly, and deliver an enterprise-grade experience across our global cloud cluster.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: COOKIES WE USE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-slate-800/60 dynamic-slide-up" aria-labelledby="cookies-matrix-title">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Allocation Matrix</p>
            <h2 id="cookies-matrix-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">How We Deploy Local Storage Keys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieCategories.map((cookie, idx) => (
              <article key={idx} className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm relative group hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 group-hover:border-slate-700 transition-colors">
                      {cookie.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                        {cookie.purpose}
                      </span>
                      <h3 className="text-base font-bold text-white font-sans">{cookie.title}</h3>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                    idx === 0 
                      ? 'bg-cyan-950/40 border-cyan-800/50 text-[#06B6D4]' 
                      : idx === 3 
                        ? 'bg-slate-900 border-slate-800 text-neutral-500' 
                        : 'bg-slate-950 border-slate-800 text-neutral-400'
                  }`}>
                    {cookie.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{cookie.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 4: THIRD-PARTY SERVICES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-slate-800/60 dynamic-slide-up" aria-labelledby="vendors-title">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Architecture Nodes</p>
              <h2 id="vendors-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Vendor Processing & Infrastructure Integrations</h2>
            </div>
            <div className="lg:col-span-8 text-neutral-400 space-y-6 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                To provide safe web access, we deploy our application modules across external enterprise infrastructure systems. These trusted third-party providers may save independent data values to your browser to manage their own cloud pipelines and edge networks:
              </p>
              <ul className="space-y-4 pt-2" role="list">
                <li className="flex gap-4 p-5 rounded-xl border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/30 transition-all">
                  <span className="text-[#06B6D4] font-mono text-sm font-bold pt-0.5" aria-hidden="true">01 //</span>
                  <div>
                    <strong className="text-neutral-200 block font-semibold mb-1">Firebase Platform Node</strong>
                    <span className="text-xs sm:text-sm text-neutral-400">Maintains active backend synchronization vectors and protects database records against automated threat vectors.</span>
                  </div>
                </li>
                <li className="flex gap-4 p-5 rounded-xl border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/30 transition-all">
                  <span className="text-[#06B6D4] font-mono text-sm font-bold pt-0.5" aria-hidden="true">02 //</span>
                  <div>
                    <strong className="text-neutral-200 block font-semibold mb-1">Vercel Deployment Network</strong>
                    <span className="text-xs sm:text-sm text-neutral-400">Saves optimization markers to direct global user traffic to the closest serverless CDN data cluster, keeping response speeds fast.</span>
                  </div>
                </li>
                <li className="flex gap-4 p-5 rounded-xl border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/30 transition-all">
                  <span className="text-neutral-500 font-mono text-sm font-bold pt-0.5" aria-hidden="true">03 //</span>
                  <div>
                    <strong className="text-neutral-300 block font-semibold mb-1">Google Analytics Layer (Staged Future Use)</strong>
                    <span className="text-xs sm:text-sm text-neutral-500">Planned for upcoming deployments to review overall platform use. It will handle all telemetry data strictly under fully anonymized parameters.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: MANAGING COOKIES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-slate-800/60 dynamic-slide-up" aria-labelledby="controls-title">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// User Management</p>
              <h2 id="controls-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Controlling Storage Permissions</h2>
            </div>
            <div className="lg:col-span-8 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                You have the absolute right to manage or entirely disable cookie storage files through your individual browser configuration panel (such as Google Chrome, Apple Safari, or Mozilla Firefox). You can easily wipe your browser cache history to remove active local storage structures at any time. Please note that adjusting these switches might disable essential layout features, which could cause display friction or performance delays within our secure interface nodes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: POLICY UPDATES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-slate-800/60 dynamic-slide-up" aria-labelledby="revisions-title">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-24">
              <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Dynamic Revision</p>
              <h2 id="revisions-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Maintenance & Framework Iterations</h2>
            </div>
            <div className="lg:col-span-8 text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                OnyxStack Labs reviews this data policy periodically to align with evolving international data standards and updates to our cloud configuration architecture. Any adjustments will be committed to this row address instantly with an updated system timestamp tracker displayed clearly at the top of the section. We encourage users to check this page occasionally to stay fully informed about our data practices.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 sm:py-28 border-t border-slate-800/60 dynamic-slide-up">
          <div className="p-8 sm:p-14 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-black/40">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.02] blur-[120px] pointer-events-none rounded-full" />
            
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 font-sans">
                Questions Regarding Privacy Configurations?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                If you require technical clarification regarding our storage rules or need to request complete telemetry logs, connect directly with our compliance officer.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" aria-hidden="true"></span>
                Support Node: <a href="mailto:onyxstacklabs@gmail.com" className="text-[#06B6D4] hover:text-cyan-300 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-[#06B6D4]">onyxstacklabs@gmail.com</a>
              </div>
            </div>

            <div className="flex-shrink-0 relative z-10 w-full sm:w-auto">
              <button
                onClick={() => navigateToNode('/contact')}
                aria-label="Navigate to contact node for support"
                className="w-full sm:w-auto bg-neutral-100 hover:bg-[#06B6D4] hover:text-black text-slate-950 px-8 py-4 rounded-xl text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] whitespace-nowrap active:translate-y-0"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

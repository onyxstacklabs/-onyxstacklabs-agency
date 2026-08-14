import React, { useEffect, useState } from 'react';
import { useSEO } from '../utils/useSEO';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  // Unique per-page SEO — title, description, and canonical for /privacy-policy.
  useSEO({
    title: 'Privacy Policy | OnyxStack Labs',
    description: 'How OnyxStack Labs collects, protects, and processes user and client data across our web applications and consulting services.',
    path: '/privacy-policy'
  });

  // Synchronize layout scroll vector on component activation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Structural Navigation Register for Compliance Indexing
  const legalSections = [
    { id: "introduction", label: "1.0 Introduction Matrix" },
    { id: "collection", label: "2.0 Data Ingress Vector" },
    { id: "processing", label: "3.0 System Telemetry Usage" },
    { id: "cookies", label: "4.0 Analytics Tracker Array" },
    { id: "thirdparty", label: "5.0 Downstream Data Nodes" },
    { id: "security", label: "6.0 Encryption Shielding" },
    { id: "rights", label: "7.0 Sovereign User Rights" },
    { id: "updates", label: "8.0 Policy Cycle Iterations" },
    { id: "contact", label: "9.0 Legal Contact Point" }
  ];

  const handleScrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Structural offset for sticky navigation header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">
      
      {/* BRAND AMBIENT STRUCTURAL MASK GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.04),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/[0.01] blur-[150px] pointer-events-none" />

      {/* CORE FRAMEWORK BODY CONTENT STREAM */}
      <div className="relative z-10 privacy-compliance-registry">
        
        {/* SECTION 1: HERO CONTROL PANEL HEADER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-neutral-900/60">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono uppercase tracking-widest mb-6">
              Security Protocol // Last Revised: July 13, 2026
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
              Global Privacy Policy & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-500">
                Data Protection Governance
              </span>
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed font-sans">
              This system document establishes the structural parameters governing how OnyxStack Labs collects, isolates, and protects sensitive user analytics and corporate telemetry data points across international operational borders.
            </p>
          </div>
        </section>

        {/* DOUBLE-COLUMN COMPLIANCE FRAMEWORK ASSEMBLY */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT BOUNDARY: STICKY CONTEXTUAL JUMP-INDEX DESKTOP INDEXER */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-2 border-l border-neutral-900 pl-4">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block mb-4">Registry Indices</span>
            {legalSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollToSection(sec.id)}
                className={`block text-left text-xs font-mono tracking-wide py-1.5 transition-colors w-full focus:outline-none ${activeSection === sec.id ? 'text-[#06B6D4] font-bold border-l-2 border-[#06B6D4] -ml-[18px] pl-[16px]' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {sec.label}
              </button>
            ))}
          </aside>

          {/* RIGHT BOUNDARY: ASYMMETRIC LEGAL SPECIFICATIONS BODY */}
          <div className="lg:col-span-9 max-w-3xl space-y-16 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
            
            {/* SECTION 2: INTRODUCTION MATRIX */}
            <article id="introduction" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">1.0</span> Introduction Matrix
              </h2>
              <p>
                OnyxStack Labs (“Company,” “we,” “us,” or “our”) constructs top-tier web applications and secure enterprise integrations. This Privacy Policy details the exact framework rules defining our collection, protection, and operational treatment of structural data assets when you interface with our web applications, landing nodes, corporate tools, and consulting registries.
              </p>
              <p>
                By utilizing our engineering services, you authorize data transaction pipelines to execute exactly as parameterized within this compliance layout. We process all personal metrics strictly aligned with global infrastructure mandates, including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
              </p>
            </article>

            {/* SECTION 3: INFORMATION WE COLLECT */}
            <article id="collection" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">2.0</span> Data Ingress Vector
              </h2>
              <p>
                We capture specific network parameters to ensure high-performance service provisioning. These are grouped directly into two baseline functional categories:
              </p>
              <ul className="space-y-3 pl-5 list-disc text-neutral-400 text-sm">
                <li>
                  <strong className="text-neutral-200">Voluntary Telemetry Input Data:</strong> Information explicitly dispatched via our secure form portals, such as corporate identity keys, official operational names, contact emails, target project parameters, and developer brief variables.
                </li>
                <li>
                  <strong className="text-neutral-200">Automated Network Analytics:</strong> Raw telemetry aggregated directly via browser interaction points. This covers your dynamic Internet Protocol (IP) address variables, server communication logs, hardware device specifications, browser orientation keys, and session navigation times.
                </li>
              </ul>
            </article>

            {/* SECTION 4: HOW WE USE INFORMATION */}
            <article id="processing" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">3.0</span> System Telemetry Usage
              </h2>
              <p>
                OnyxStack Labs deploys your collected metrics exclusively across verified optimization runbooks. We do not engage in consumer demographic trade networks or monetize access to corporate databases. Data assets are utilized to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-2">// Infrastructure Maintenance</h4>
                  <p className="text-xs text-neutral-400">Powering secure authentication handshakes, hosting custom applications, and optimizing edge loading rates.</p>
                </div>
                <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider mb-2">// SLA & Discovery Loops</h4>
                  <p className="text-xs text-neutral-400">Processing custom scoping calculations, generating B2B proposals, and responding to system support calls.</p>
                </div>
              </div>
            </article>

            {/* SECTION 5: COOKIES & ANALYTICS */}
            <article id="cookies" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">4.0</span> Analytics Tracker Array
              </h2>
              <p>
                Our server configurations employ secure alphanumeric localized identifiers, known as cookies, alongside cryptographic device tokens to preserve UI preferences, record dark mode states, and analyze global user flow speed.
              </p>
              <blockquote>
                <p className="p-4 rounded-xl bg-neutral-950 border-l-2 border-[#06B6D4] text-xs text-neutral-400 font-mono">
                  // Systems Note: Users can adjust local browser states to intercept cookies entirely. However, disabling these scripts may destabilize premium interaction features across our web apps.
                </p>
              </blockquote>
            </article>

            {/* SECTION 6: THIRD-PARTY SERVICES */}
            <article id="thirdparty" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">5.0</span> Downstream Data Nodes
              </h2>
              <p>
                To provide high-integrity hosting architectures, our backend connects with selected enterprise sub-processors. These external data nodes include:
              </p>
              <div className="p-5 rounded-xl border border-neutral-900 bg-gradient-to-b from-neutral-950 to-transparent space-y-3 text-xs">
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="font-mono text-[#06B6D4]">Firebase Identity & DB Solutions</span>
                  <span className="text-neutral-400">User state preservation and secure form ingestion logs.</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="font-mono text-[#06B6D4]">Discord Webhook APIs</span>
                  <span className="text-neutral-400">Instant internal notification channels for high-priority lead telemetry routing.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[#06B6D4]">Vercel / AWS Hosting Infrastructure</span>
                  <span className="text-neutral-400">Global content delivery network (CDN) routing and edge caching layers.</span>
                </div>
              </div>
            </article>

            {/* SECTION 7: DATA SECURITY */}
            <article id="security" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">6.0</span> Encryption Shielding
              </h2>
              <p>
                We use strict security measures to protect your data. All database mutations run behind solid <strong>Transport Layer Security (TLS 1.3)</strong> wrappers. Persistent corporate records are encrypted at rest using industry-standard <strong>AES-256 blocks</strong>.
              </p>
              <p>
                Access to operational databases is restricted to core engineering personnel under multi-factor authentication (MFA) protocols and monitored via comprehensive audit logs to stop unauthorized data manipulation.
              </p>
            </article>

            {/* SECTION 8: USER RIGHTS */}
            <article id="rights" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">7.0</span> Sovereign User Rights
              </h2>
              <p>
                Regardless of geographical jurisdiction, we grant comprehensive user controls over personal data profiles. You maintain the right to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-neutral-400">
                <div className="p-3 border border-neutral-900 rounded-lg">
                  <span className="text-white block font-bold mb-1">[01] Request Purge</span>
                  Complete deletion of all associated operational history records.
                </div>
                <div className="p-3 border border-neutral-900 rounded-lg">
                  <span className="text-white block font-bold mb-1">[02] Export Schema</span>
                  Receive a machine-readable JSON format package of your database parameters.
                </div>
                <div className="p-3 border border-neutral-900 rounded-lg">
                  <span className="text-white block font-bold mb-1">[03] Halt Audits</span>
                  Opt-out from advanced analytical tracking sequences at any moment.
                </div>
              </div>
            </article>

            {/* SECTION 9: POLICY UPDATES */}
            <article id="updates" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">8.0</span> Policy Cycle Iterations
              </h2>
              <p>
                OnyxStack Labs reserves the right to modify these privacy parameters to adapt to changing legal frameworks, security standards, and infrastructure upgrades. 
              </p>
              <p>
                When modifications occur, we adjust the deployment version revision date located at the header of this view. Major policy changes will be highlighted via notices on our application dashboard index nodes.
              </p>
            </article>

            {/* SECTION 10: CONTACT INFORMATION */}
            <article id="contact" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">9.0</span> Legal Contact Point
              </h2>
              <p>
                If you have questions about this policy, or want to submit an data deletion request, please contact our data protection officer directly at:
              </p>
              <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/60 font-mono text-xs space-y-1.5 max-w-md">
                <div className="text-white font-bold">OnyxStack Labs LLC</div>
                <div className="text-neutral-400">Attn: Legal Compliance & Privacy Node</div>
                <div className="text-neutral-400">Corporate Email: <a href="mailto:onyxstacklabs@gmail.com" className="text-[#06B6D4] hover:underline">onyxstacklabs@gmail.com</a></div>
                <div className="text-neutral-400">Website: <a href="https://onyxstacklabs.com" className="text-[#06B6D4] hover:underline">onyxstacklabs.com</a></div>
              </div>
            </article>

          </div>

        </section>

      </div>

    </div>
  );
}

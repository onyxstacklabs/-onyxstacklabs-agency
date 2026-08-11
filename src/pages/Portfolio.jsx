import React, { useEffect } from 'react';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { useSEO } from '../utils/useSEO';

export default function Portfolio({ currentPath, navigateToNode }) {
  
  // Unique per-page SEO — title, description, and canonical for /portfolio.
  useSEO({
    title: 'Portfolio | Custom Software Case Studies - OnyxStack Labs',
    description: 'Explore OnyxStack Labs\' engineered deployments — EdTech ERPs, B2B commerce platforms, security access systems, and real-time analytics dashboards.',
    path: '/portfolio'
  });

  // Align view frame state on render lifecycle
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section 2 Data: Premium System Portfolio Inventory Matrix
  const projectsList = [
    {
      name: "OnyxStack School",
      category: "EdTech & Institutional ERP",
      desc: "A comprehensive learning management environment engineered to process cross-campus resource allocations, secure student data isolation layers, and real-time grading modules.",
      stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      status: "Live Deployment",
      isLive: true
    },
    {
      name: "OnyxStack Tailors",
      category: "B2B Supply Chain & Custom Commerce",
      desc: "A custom order tracking and configuration platform handling intricate measurements matrices, active inventory supply pipelines, and internal logistical scheduling.",
      stack: ["React", "Firebase", "Express.js", "Vite"],
      status: "Live Deployment",
      isLive: true
    },
    {
      name: "OnyxStack GatePass",
      category: "Enterprise Security Access System",
      desc: "A high-security visitor verification system running biometric token structures, cryptographically signed logging records, and real-time perimeter alert protocols.",
      stack: ["React", "Node.js", "MongoDB", "Git"],
      status: "Live Deployment",
      isLive: true
    },
    {
      name: "OnyxStack Lottery",
      category: "Decentralized Randomization Platform",
      desc: "A highly resilient reward tracking environment built around zero-bias distribution algorithms, verifiable system event audit schemas, and secure user balances.",
      stack: ["React", "Firebase", "Vercel", "Tailwind CSS"],
      status: "Under Active Optimization",
      isLive: false
    },
    {
      name: "OnyxStack Cricket",
      category: "Real-Time Telemetry Analytics Dashboard",
      desc: "A fast data tracking system processing sub-second sports engine statistics, match state calculation vectors, and interactive fan view models simultaneously.",
      stack: ["React", "Gemini AI", "Node.js", "Vite"],
      status: "Live Deployment",
      isLive: true
    }
  ];

  // Section 3 Data: Delivery Method Protocols
  const engineeringProcess = [
    { phase: "System Evaluation", text: "We analyze database requirements and benchmark runtime bottlenecks before writing any code." },
    { phase: "Architecture Mapping", text: "Designing clean data processing loops, component structures, and secure cloud system perimeters." },
    { phase: "Production Sprints", text: "Writing highly optimized, reusable components under strict version control rules." },
    { phase: "Continuous Validation", text: "Executing thorough automated test scripts to ensure reliable cross-device performance." }
  ];

  // Section 4 Data: Primary Framework Ecosystem
  const platformTech = [
    { framework: "React Engine", design: "Interface Blueprint" },
    { framework: "Node.js Platform", design: "High-Throughput Runtime" },
    { framework: "Firebase Ecosystem", design: "Decoupled Serverless" },
    { framework: "Gemini AI Systems", design: "Cognitive Automations" },
    { framework: "MongoDB Core", design: "Distributed Data Stores" },
    { framework: "Tailwind Pipeline", design: "Atomic Visual System" }
  ];

  // Section 5 Data: Core Commercial Value Delivery
  const stakeholderBenefits = [
    { target: "System Redundancy", detail: "Multi-region fallback architectures designed to keep runtime environments live and protected against data disruption loops." },
    { target: "Development Velocity", detail: "By leveraging pre-tested atomic component libraries, we move safely from product concepts to cloud deployment." },
    { target: "Low Capital Friction", detail: "Serverless edge configurations optimize resource consumption, reducing overall cloud operational overhead." }
  ];

  // Section 6 Data: Production Statistics Dashboard Matrix
  const coreMetrics = [
    { value: "100%", description: "Codebase Handover Guarantee" },
    { value: "Sub-Sec", description: "Target Global Content Delivery" },
    { value: "Zero", description: "Critical Security Breaches Record" },
    { value: "24/7/365", description: "Infrastructure Operational Monitoring" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth relative overflow-hidden">
      
      {/* BRAND SPACE BACKGROUND GRADIENT CONFIGURATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute top-[1500px] right-0 w-[550px] h-[550px] bg-[#2563EB]/[0.01] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-0 w-[650px] h-[650px] bg-[#06B6D4]/[0.015] blur-[220px] pointer-events-none" />

      {/* COMPONENT BODY MATRIX CONTAINER */}
      <div className="relative z-10 distribution-portfolio-scope">
        
        {/* SECTION 1: HERO DISPLAY */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono uppercase tracking-widest mb-6">
              Production Registry
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Engineered Deployments, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-cyan-300 to-blue-500">
                Verifiable Commercial Scaling
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10 font-sans">
              An inventory of high-performance custom web architectures, cloud applications, and tailor-fit database environments designed and deployed by OnyxStack Labs.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#registry" 
                onClick={(e) => { e.preventDefault(); document.getElementById('production-registry')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-neutral-100 hover:bg-[#06B6D4] text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Inspect Deployments
              </a>
              <a 
                href="#contact-link" 
                onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="border border-neutral-800 hover:border-neutral-700 bg-neutral-900/20 text-neutral-300 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Launch Consult Call
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURED PROJECTS GRID CONTAINER */}
        <section id="production-registry" className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60 scroll-mt-24">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Case Index</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Validated Systems Architecture and Custom Built Modules</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsList.map((project, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between relative group">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#06B6D4] mb-1">{project.category}</p>
                      <h3 className="text-xl font-bold text-white tracking-wide font-sans">{project.name}</h3>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full border text-[9px] font-mono uppercase tracking-widest ${project.isLive ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/5 border-amber-500/20 text-amber-400'}`}>
                      {project.status}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-8">{project.desc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-md bg-neutral-900/60 border border-neutral-800/80 text-[10px] font-mono text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-900/60">
                    <button 
                      onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                      className="w-full text-center py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/10 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-200"
                    >
                      View Architecture
                    </button>
                    <button 
                      onClick={() => alert(`Redirecting to public sandboxed environment for: ${project.name}`)}
                      className="w-full text-center py-2.5 rounded-lg bg-neutral-900 hover:bg-[#06B6D4] text-neutral-400 hover:text-black text-xs font-mono uppercase tracking-wider transition-all duration-300"
                    >
                      Live Sandbox
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DEVELOPMENT METHOD TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Delivery Logic</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">The Precision Process Behind Our Engineering Success</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringProcess.map((proc, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-neutral-900 bg-gradient-to-b from-neutral-950 to-[#050505] relative">
                <span className="absolute top-4 right-4 text-xs font-mono text-neutral-700">0{idx + 1}</span>
                <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-3 pt-4">{proc.phase}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{proc.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PLATFORM TECH SUMMARY MATRICES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Ecosystem Array</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Primary Software Components Under Active Configuration</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {platformTech.map((tech, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-neutral-900/50 bg-neutral-950/80 text-left">
                <h4 className="text-xs font-bold text-white font-sans tracking-wide mb-1">{tech.framework}</h4>
                <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">{tech.design}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: CLIENT PARTNERSHIP BENEFITS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Structural Outcomes</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Commercial Returns On Institutional Quality Coding</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakeholderBenefits.map((benefit, idx) => (
              <div key={idx} className="relative group">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mb-4 shadow-[0_0_8px_#06B6D4]" />
                <h3 className="text-base font-bold text-white mb-2 font-sans tracking-wide">{benefit.target}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: RUNTIME STATISTICS SUMMARY FRAME */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-neutral-950/30 p-8 rounded-2xl border border-neutral-900/80">
            {coreMetrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6.5: RELATED RESOURCES CROSS-LINKING */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Explore Further</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">Related resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateToNode('/services'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 font-sans group-hover:text-[#06B6D4] transition-colors duration-300">Our Services</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">See the capabilities behind these deployments, explained in technical detail.</p>
            </a>
            <a
              href="/projects"
              onClick={(e) => { e.preventDefault(); navigateToNode('/projects'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 font-sans group-hover:text-[#06B6D4] transition-colors duration-300">In-Depth Case Studies</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">Read the full problem, solution, and measurable outcome for each system.</p>
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateToNode('/contact'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 font-sans group-hover:text-[#06B6D4] transition-colors duration-300">Start Your Project</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">Bring your own deployment idea to our engineering team.</p>
            </a>
          </div>
        </section>

        {/* SECTION 7: FINAL CALL TO ACTION INTERFACE CONSOLE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 border-t border-neutral-900/60">
          <div className="p-8 sm:p-16 rounded-3xl border border-neutral-900 bg-gradient-to-r from-neutral-950 via-neutral-950 to-neutral-900/40 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.03),transparent_45%)] pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Ready to Deploy Your Technical Solution?
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Bring your platform concepts into our active pipeline. Connect directly with our enterprise consultants to scale your product ecosystem securely.
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0">
              <a 
                href="#contact-gateway" 
                onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="inline-block bg-white hover:bg-[#06B6D4] text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] whitespace-nowrap"
              >
                Launch Pipeline Intake
              </a>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

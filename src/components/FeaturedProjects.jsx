import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowUpRight, 
  X, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Database, 
  CheckCircle2, 
  LineChart, 
  Users, 
  QrCode, 
  Lock, 
  Terminal, 
  Workflow, 
  Sparkles, 
  Activity, 
  FileSpreadsheet, 
  Wallet,
  Maximize2
} from 'lucide-react';

// Corrected relative path integrations for Vite/Vercel production build
import tailorsDashboard from "../assets/images/portfolio/portfolio-tailors-dashboard.webp";
import schoolDashboard from "../assets/images/portfolio/portfolio-school-dashboard.webp";
import gatepassDashboard from "../assets/images/portfolio/portfolio-gatepass-dashboard.webp";
import lotteryDashboard from "../assets/images/portfolio/portfolio-lottery-dashboard.webp";
import cricketDashboard from "../assets/images/portfolio/portfolio-cricket-dashboard.webp";
import mudraDashboard from "../assets/images/portfolio/portfolio-loan-authentication.webp";

import tailorsSupporting from "../assets/images/portfolio/portfolio-tailors-supporting.webp";
import schoolSupporting from "../assets/images/portfolio/portfolio-school-supporting.webp";
import gatepassSupporting from "../assets/images/portfolio/portfolio-gatepass-supporting.webp";
import lotterySupporting from "../assets/images/portfolio/portfolio-lottery-supporting.webp";
import cricketSupporting from "../assets/images/portfolio/portfolio-cricket-supporting.webp";
import mudraSupporting from "../assets/images/portfolio/portfolio-loan-supporting.webp";

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  const corporateProjects = [
    {
      name: "OnyxStack Tailors",
      desc: "Next-generation software module utilizing artificial intelligence models to parse handwritten data streams into relational database layers.",
      tags: ["AI", "Gemini", "React", "Node.js", "Tailwind CSS"],
      status: "Live",
      liveUrl: "https://onyxstack-tailors.vercel.app", 
      icon: Sparkles,
      image: tailorsDashboard,
      imageAlt: "OnyxStack Tailors AI dashboard showing automated conversion of handwritten measurements into digital customer profiles",
      caseStudy: {
        overview: "A specialized AI-powered business optimization system engineered to transform manual, handwritten fashion measurements and order streams into structured digital database layers with zero clerical intervention.",
        businessProblem: "Traditional bespoke tailoring operations heavily rely on manual ledger books and physical tags. Handwritten notes cause critical overheads, measurement tracking errors, and extreme loss of searchable historical customer data records.",
        solution: "Deployed a customized multi-modal processing module that ingests images of handwritten paper chits, isolates numeric values via domain-trained intelligence models, and auto-populates localized CRM dashboards.",
        aiFeatures: [
          "Handwriting OCR parsing via multi-modal AI prompt engineering.",
          "Automatic tokenization of custom tailoring terminology (e.g., length, chest, shoulder, cuffs).",
          "Anomalous measurement detection flag using historical variance profiles."
        ],
        customerManagement: "Centralized client profiling featuring historical metric analytics, custom preference tracking variables, and multi-tier interaction logs.",
        measurements: "Dynamic configuration layout mapping complex geometric body structural vectors. Supports historical record revision comparison grids.",
        orders: "Real-time task state workflow handling order booking, inventory materials allocation, tailors routing matrices, and deadline alerts.",
        architecture: "React functional client application layer communicating over a secured TLS gateway with a decoupled Node.js computing core backed by real-time NoSQL document nodes.",
        businessBenefits: "Reduces processing time from 12 minutes down to 4 seconds per intake slip. Reclaims 99.8% of manual typographical discrepancies and improves retention rates by offering programmatic digital metrics tracking.",
        deployment: "Containerized deployment orchestrations managing horizontal auto-scaling nodes behind optimized server reverse-proxies.",
        scalability: "Engineered with localized context payload batch processing pipelines capable of executing up to 10,000 asynchronous concurrent image structural extractions.",
        futureRoadmap: "Integrating fully immersive camera-based body scanning technology using standard WebRTC video stream processing matrix layers."
      }
    },
    {
      name: "OnyxStack School ERP",
      desc: "A multi-tenant institutional framework managing enterprise logistics, automated fee structures, and administrative records in real time.",
      tags: ["React", "Firebase", "ERP", "Tailwind CSS", "Security"],
      status: "Live",
      liveUrl: "https://onyxstack-school.vercel.app",
      icon: Layers,
      image: schoolDashboard,
      imageAlt: "OnyxStack School ERP dashboard showing student records, attendance tracking, and fee management overview",
      caseStudy: {
        erp: "A high-performance cloud enterprise resource planning ecosystem engineered exclusively for multi-campus institutional logistics management.",
        students: "Complete academic lifecycle node from intake tracking, custom transcript compilation matrices, to active demographic databases.",
        attendance: "Automated real-time attendance validation engine utilizing localized hardware integrations and biometric tracking flags.",
        teachers: "Comprehensive payload profiles monitoring payroll algorithms, resource scheduling, substitution routing matrix grids, and performance monitoring indices.",
        fees: "Automated billing infrastructure layer processing multi-tiered fee templates, fine distribution systems, and real-time digital bank statement reconciliation hooks.",
        reports: "Granular administrative report builder mapping institutional health metrics through exportable spreadsheet layouts and modern visualization nodes.",
        realtimeDatabase: "Asynchronous distributed pub-sub subscription framework allowing multi-tenant dashboard instances to update within microsecond windows under heavy client strain.",
        security: "Enforced structural granular Row-Level Security (RLS) policies layered beneath 256-bit data encryption at rest and advanced token-based route authorization protocols."
      }
    },
    {
      name: "GatePass Security",
      desc: "Dual-camera infrastructure deployment integrating automated QR-code access verification pipelines with minimal platform latency.",
      tags: ["React", "QR System", "Firebase", "Security"],
      status: "Live",
      liveUrl: "https://onyxstack-gatepass.vercel.app",
      icon: QrCode,
      image: gatepassDashboard,
      imageAlt: "OnyxStack GatePass security dashboard showing QR code visitor verification and access logs",
      caseStudy: {
        visitorManagement: "An uncompromised, mission-critical authentication checkpoint engine designed to regulate real-time high-throughput commercial facility traffic.",
        qrVerification: "Instant decryption pipeline extracting custom temporal cryptography keys embedded inside vector QR matrix arrays with sub-50ms verification intervals.",
        authentication: "Multi-factor cryptographic identity matching enforcing unique multi-step user tokens and hardware-bound terminal authorization keys.",
        logs: "Immutable stream storage recording all terminal ingress and egress operations with deep chronological meta-tag profiles.",
        realtimeSecurity: "Asynchronous push framework routing automated operational security warnings and emergency lockdown overrides across active system components instantly."
      }
    },
    {
      name: "Lottery Platform",
      desc: "High-throughput deterministic allocation platform handling real-time heavy user request interactions seamlessly under pressure.",
      tags: ["Realtime Database", "React", "Cloud Architecture"],
      status: "Live",
      liveUrl: "https://onyxstack-lottery.vercel.app",
      icon: Cpu,
      image: lotteryDashboard,
      imageAlt: "OnyxStack Lottery platform dashboard showing real-time participant entries and draw results",
      caseStudy: {
        realtimeDatabase: "State-synchronized cluster engine optimized to capture, validate, and index hundreds of thousands of entries per second with zero locking overhead.",
        winnerEngine: "Fully verified deterministic randomization mechanics processing participant pools securely using audited linear cryptographic seed distribution algorithms.",
        cloudArchitecture: "Highly resilient serverless micro-routing mesh designed with container pools that distribute incoming dynamic packet payloads across geo-redundant data silos.",
        scalability: "Proven architectural scalability thresholds managing massive spike events effortlessly, maintaining complete UI frame-rate integrity and transaction processing pipelines."
      }
    },
    {
      name: "Cricket Scoring",
      desc: "An ultra-responsive scoring topology built to process live microsecond statistics layout updates and bracket calculations.",
      tags: ["React", "Live Score", "Analytics", "AI Integration"],
      status: "Live",
      liveUrl: "https://onyxstack-cricket.vercel.app",
      icon: Activity,
      image: cricketDashboard,
      imageAlt: "OnyxStack Cricket live scoring dashboard showing ball-by-ball match statistics and analytics",
      caseStudy: {
        realtimeScores: "Sub-millisecond data synchronization pathways updating running player counts, historical vector data tables, and running point metric logs simultaneously.",
        statistics: "Complex analytic framework running instantaneous calculations on dynamic performance variations, historical tracking matrices, and continuous run-rate curves.",
        analytics: "Advanced predictive statistical models analyzing live match conditions to forecast outcome metrics, structural shifting trends, and player trajectory paths.",
        futureAiIntegration: "Developing customized deep-learning model hooks to evaluate contextual live stream data feeds, optimizing predictive run estimations in real time."
      }
    },
    {
      name: "Mudra Platform",
      desc: "High-fidelity modern dashboard simulator monitoring enterprise transactional ledgers and automated analytical frameworks.",
      tags: ["Finance", "Dashboard", "Security", "Analytics"],
      status: "Coming Soon",
      liveUrl: null,
      icon: Wallet,
      image: mudraDashboard,
      imageAlt: "OnyxStack Mudra finance dashboard showing secure transaction ledger and account balances",
      caseStudy: {
        financeDashboard: "An elegant, premium banking-grade operations dashboard visualizer built with multi-layered layout arrays tracking dynamic monetary capital allocations.",
        reporting: "Automated continuous synthesis systems compiling raw operational ledger files into clean, fully accessible performance reporting records.",
        transactions: "High-fidelity immutable data models structured to track ledger history records with absolute mathematical precision across multiple currency systems.",
        security: "Advanced hardware-based cryptographic access schemas coupled with deep application-level firewalls to safeguard highly sensitive data streams.",
        analytics: "Predictive asset velocity tracing tools providing automated algorithmic risk profiling matrices and asset optimization parameters."
      }
    }
  ];

  const openModal = (project, index) => {
    triggerRef.current = document.getElementById(`project-trigger-${index}`);
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setActiveProject(null);
    document.body.style.overflow = '';
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, closeModal]);

  useEffect(() => {
    if (activeProject && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [activeProject]);

  return (
    <section 
      className="relative w-full py-20 lg:py-24 bg-[#050505] overflow-hidden select-none font-sans"
      aria-labelledby="featured-heading"
    >
      {/* 
        =======================================================================
        PREMIUM TRANSITION / SECTION LINKAGE AREA (APPLE/VERCEL LEVEL UI)
        =======================================================================
      */}
      {/* Absolute Thin Glowing Divider Rule */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 via-[#06B6D4]/40 via-neutral-800 to-transparent z-20" aria-hidden="true" />
      
      {/* Linear Level Interactive Radial Cyan Glow Over the Top Border Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[120px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.07)_0%,transparent_60%)] pointer-events-none z-20" aria-hidden="true" />
      
      {/* Soft Floating Soft Blur Spheres Behind Section Entry Path */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} aria-hidden="true" />
      <div className="absolute top-12 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[#2563EB]/4 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} aria-hidden="true" />

      {/* Ultra-low Opacity Micro Engineering Grid Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" aria-hidden="true" />
      {/* ======================================================================= */}

      {/* Premium Ambient Micro-Glow Canvas */}
      <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.06)_0%,transparent_70%)] pointer-events-none mix-blend-screen" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/12 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] pointer-events-none mix-blend-screen" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header Content Node */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 max-w-3xl mx-auto">
          
          {/* Accent Upper Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800/60 text-[10px] font-semibold tracking-widest text-[#06B6D4] uppercase backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" aria-hidden="true" />
            Enterprise Portfolio
          </div>

          {/* Primary Text Anchor */}
          <h2 
            id="featured-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Engineered to Solve{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-neutral-200">
              Critical Business Challenges
            </span>
          </h2>

          {/* Descriptive Content Paragraph */}
          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl">
            OnyxStack Labs architectures scalable digital ecosystems, bespoke intelligence integrations, 
            multi-tenant infrastructure frameworks, and mission-critical software systems.
          </p>
        </div>

        {/* 6-Column Responsive Project Grid Network with Structured Height Optimization */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full auto-rows-stretch"
          role="region"
          aria-label="Enterprise software product portfolio grid"
        >
          {corporateProjects.map((project, idx) => {
            const isLive = project.status === "Live";
            const ProjectIcon = project.icon;
            
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-neutral-950/40 border border-neutral-900/60 backdrop-blur-xl transition-all duration-300 ease-out outline-none hover:-translate-y-1.5 hover:bg-neutral-900/10 hover:border-[#06B6D4]/30 hover:shadow-[0_20px_50px_rgba(6,182,212,0.08)] cursor-default"
              >
                {/* Internal Radial Glow Highlight Layer */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.02),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Upper Module: Context Information & Display Assets */}
                <div className="flex flex-col flex-1">
                  
                  {/* Metadata Header Block */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-neutral-400 group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/20 transition-all duration-300">
                        <ProjectIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-neutral-100 group-hover:text-white transition-colors duration-200">
                        {project.name}
                      </h3>
                    </div>

                    {/* Operational Status Badge */}
                    <span 
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        isLive 
                          ? 'bg-[#06B6D4]/5 text-[#06B6D4] border border-[#06B6D4]/20 shadow-[0_0_12px_rgba(6,182,212,0.12)]' 
                          : 'bg-neutral-900/60 text-neutral-500 border border-neutral-800/40'
                      }`}
                    >
                      {isLive && <span className="w-1 h-1 rounded-full bg-[#06B6D4] mr-1.5 animate-ping" />}
                      {project.status}
                    </span>
                  </div>

                  {/* Premium Framing Component Image Wrapper to prevent Layout Shifts */}
                  <div className="relative w-full aspect-[16/10] mb-4 rounded-xl bg-neutral-950 border border-neutral-900/80 overflow-hidden shadow-inner flex items-center justify-center group-hover:border-neutral-800/50 transition-colors duration-300">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_14px] z-10 pointer-events-none" />
                    
                    {/* Continuous Gradient Edge Scrim Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/10 z-10 pointer-events-none" />
                    
                    <img 
                      src={project.image} 
                      alt={project.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 ease-out"
                    />
                    
                    <div className="absolute bottom-2.5 right-3 text-[8px] text-neutral-600 tracking-widest font-mono uppercase z-20">
                      SYS_PRV_ENV // 1.0.0
                    </div>
                  </div>

                  {/* Operational Capabilities Description Paragraph */}
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-5 group-hover:text-neutral-300 transition-colors duration-200 line-clamp-3">
                    {project.desc}
                  </p>
                </div>

                {/* Lower Module: Technology Matrix & Trigger Invocations */}
                <div className="mt-auto">
                  {/* Tech Stack Badges Track */}
                  <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Integrated technology parameters">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[9px] font-semibold tracking-wide px-2 py-0.5 bg-neutral-900/40 text-neutral-400 rounded border border-neutral-800/40 group-hover:border-neutral-800 group-hover:text-neutral-300 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Implementation Details Switch */}
                  <button 
                    id={`project-trigger-${idx}`}
                    type="button"
                    onClick={() => openModal(project, idx)}
                    className="w-full py-2 px-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 text-xs font-semibold text-neutral-300 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#06B6D4] hover:to-[#2563EB] hover:text-black hover:border-transparent hover:shadow-[0_4px_20px_rgba(6,182,212,0.15)] focus:outline-none focus:ring-1 focus:ring-[#06B6D4]/40"
                    aria-label={`Open production specification dashboard and deep structural analytics overview documentation for ${project.name}`}
                  >
                    View Details
                  </button>
                </div>

                {/* Peripheral Border Gradient Accent Frame */}
                <div 
                  className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#06B6D4]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xs z-[-1]" 
                  aria-hidden="true" 
                />
              </div>
            );
          })}
        </div>

        {/* Closing Conversion Block Linkage */}
        <div className="relative mt-20 max-w-3xl mx-auto">
          <div
            className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#06B6D4]/10 via-[#2563EB]/10 to-[#06B6D4]/10 blur-2xl opacity-60 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950/60 backdrop-blur-md px-6 sm:px-10 py-10 sm:py-12 text-center overflow-hidden">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_65%)] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-4">
              <p className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Seeking an optimized production software integration?
              </p>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                Let's execute your project via{' '}
                <span className="text-neutral-300 font-bold tracking-normal normal-case">
                  enterprise-tier standards.
                </span>
              </p>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-black text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:-translate-y-0.5"
                >
                  Start Your Project
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Premium Glassmorphism Case Study Modal System */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl transition-all duration-300 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="relative w-full max-w-4xl h-[85vh] md:h-[80vh] bg-neutral-950/95 border border-neutral-800/80 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Ambient Top Linear Rule Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent pointer-events-none" />

            {/* Sticky Header Node Header Panel */}
            <div className="p-5 border-b border-neutral-900/80 flex items-center justify-between bg-neutral-950/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-900/80 text-[#06B6D4] border border-neutral-800/60">
                  {React.createElement(activeProject.icon, { className: "w-4 h-4" })}
                </div>
                <div>
                  <h3 id="modal-heading" className="text-base font-bold tracking-tight text-white">
                    {activeProject.name}
                  </h3>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono font-bold">Architectural Specifications</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Target Destination External Linking Logic */}
                {activeProject.status === "Live" ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06B6D4] text-black text-xs font-bold hover:bg-[#2563EB] hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200"
                    aria-label={`Open active production instance for ${activeProject.name} inside a separate secure web interface application container`}
                  >
                    Visit Live Demo
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800/80 text-neutral-600 text-xs font-semibold cursor-not-allowed"
                    aria-label="Production build environment preview context offline for coming soon tracking items"
                  >
                    Coming Soon
                  </button>
                )}

                {/* Dismiss Trigger */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-200 focus:outline-none"
                  aria-label="Dismiss architectural document container"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Architectural Specifications Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-gradient-to-b from-neutral-950 to-[#020202] custom-scrollbar">
              
              {/* Tech Stack Horizontal Track */}
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase font-mono flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#06B6D4]" /> Core Integrated Stack Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 text-xs rounded bg-neutral-900/40 text-neutral-300 border border-neutral-800/60 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Structural Grid Mapping Content Properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Render Configuration Parameters for Tailors Project */}
                {activeProject.caseStudy.overview && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 backdrop-blur-sm space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-2.5 rounded-full bg-[#06B6D4]" /> Project Overview
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.overview}</p>
                  </div>
                )}

                {activeProject.caseStudy.businessProblem && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-2.5 rounded-full bg-[#2563EB]/70" /> Business Problem
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.businessProblem}</p>
                  </div>
                )}

                {activeProject.caseStudy.solution && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-2.5 rounded-full bg-[#06B6D4]" /> Engineered Solution
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.solution}</p>
                  </div>
                )}

                {activeProject.caseStudy.aiFeatures && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-3 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-2.5 rounded-full bg-[#06B6D4]" /> Core Intelligent Machine Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {activeProject.caseStudy.aiFeatures.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeProject.caseStudy.customerManagement && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#06B6D4]" /> Client Logistical Profiles
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.customerManagement}</p>
                  </div>
                )}

                {activeProject.caseStudy.measurements && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5 text-[#06B6D4]" /> Geometric Vector Calculations
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.measurements}</p>
                  </div>
                )}

                {activeProject.caseStudy.orders && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Workflow className="w-3.5 h-3.5 text-[#06B6D4]" /> Task Orchestration Grid
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.orders}</p>
                  </div>
                )}

                {activeProject.caseStudy.architecture && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-[#06B6D4]" /> Cloud Infrastructure Layer
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.architecture}</p>
                  </div>
                )}

                {activeProject.caseStudy.businessBenefits && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <LineChart className="w-3.5 h-3.5 text-[#06B6D4]" /> Core Business Return Matrix
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.businessBenefits}</p>
                  </div>
                )}

                {activeProject.caseStudy.deployment && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#06B6D4]" /> Runtime Node Provisioning
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.deployment}</p>
                  </div>
                )}

                {activeProject.caseStudy.scalability && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" /> Dynamic Load Scalability
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.scalability}</p>
                  </div>
                )}

                {activeProject.caseStudy.futureRoadmap && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" /> Engineering Target Horizons
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.futureRoadmap}</p>
                  </div>
                )}

                {/* Render Configuration Parameters for School ERP Project */}
                {activeProject.caseStudy.erp && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#06B6D4]" /> Infrastructure System Framework
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.erp}</p>
                  </div>
                )}

                {activeProject.caseStudy.students && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#06B6D4]" /> Student Information Pipelines
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.students}</p>
                  </div>
                )}

                {activeProject.caseStudy.attendance && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#06B6D4]" /> Real-time Biometric Ingestion
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.attendance}</p>
                  </div>
                )}

                {activeProject.caseStudy.teachers && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" /> Administrative Resource Routing
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.teachers}</p>
                  </div>
                )}

                {activeProject.caseStudy.fees && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-[#06B6D4]" /> Transactional Ledger Modules
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.fees}</p>
                  </div>
                )}

                {activeProject.caseStudy.reports && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#06B6D4]" /> Analytical Synthesis Engines
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.reports}</p>
                  </div>
                )}

                {activeProject.caseStudy.realtimeDatabase && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-[#06B6D4]" /> High-Concurrency Store Nodes
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.realtimeDatabase}</p>
                  </div>
                )}

                {activeProject.caseStudy.security && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" /> Security Access Controls
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.security}</p>
                  </div>
                )}

                {/* Render Configuration Parameters for GatePass Security */}
                {activeProject.caseStudy.visitorManagement && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2 md:col-span-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#06B6D4]" /> Facility Traffic Supervision
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.visitorManagement}</p>
                  </div>
                )}

                {activeProject.caseStudy.qrVerification && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <QrCode className="w-3.5 h-3.5 text-[#06B6D4]" /> Matrix Cryptographic Scanning
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.qrVerification}</p>
                  </div>
                )}

                {activeProject.caseStudy.authentication && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-[#06B6D4]" /> Identity Matrix Terminals
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.authentication}</p>
                  </div>
                )}

                {activeProject.caseStudy.logs && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-neutral-400" /> Chronological Event Registries
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.logs}</p>
                  </div>
                )}

                {activeProject.caseStudy.realtimeSecurity && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" /> Perimeter Failure Overrides
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.realtimeSecurity}</p>
                  </div>
                )}

                {/* Render Configuration Parameters for Lottery Platform */}
                {activeProject.caseStudy.winnerEngine && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" /> Deterministic Seed Selectors
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.winnerEngine}</p>
                  </div>
                )}

                {activeProject.caseStudy.cloudArchitecture && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#06B6D4]" /> Geo-Redundant Cluster Routing
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.cloudArchitecture}</p>
                  </div>
                )}

                {/* Render Configuration Parameters for Cricket Scoring */}
                {activeProject.caseStudy.realtimeScores && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#06B6D4]" /> Microsecond Frame Synchronization
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.realtimeScores}</p>
                  </div>
                )}

                {activeProject.caseStudy.statistics && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#06B6D4]" /> Dynamic Progression Layouts
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.statistics}</p>
                  </div>
                )}

                {activeProject.caseStudy.analytics && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <LineChart className="w-3.5 h-3.5 text-[#06B6D4]" /> Continuous Outcome Processing
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.analytics}</p>
                  </div>
                )}

                {activeProject.caseStudy.futureAiIntegration && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" /> Intended Deep Intelligence Modules
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.futureAiIntegration}</p>
                  </div>
                )}

                {/* Render Configuration Parameters for Mudra Platform */}
                {activeProject.caseStudy.financeDashboard && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-[#06B6D4]" /> Premium Ledger Simulators
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.financeDashboard}</p>
                  </div>
                )}

                {activeProject.caseStudy.reporting && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#06B6D4]" /> Automated Continuous Synthesis
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.reporting}</p>
                  </div>
                )}

                {activeProject.caseStudy.transactions && (
                  <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-900/60 space-y-2">
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#06B6D4]" /> Immutable Currency Matrices
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{activeProject.caseStudy.transactions}</p>
                  </div>
                )}

              </div>
            </div>

            {/* Sticky Footer Layout Node */}
            <div className="p-4 border-t border-neutral-900 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
              <span>SECURE DATA CORE ENVIRONMENT // ACC_OK</span>
              <span>ONYXSTACK LABS PROPRIETARY SYSTEM</span>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS Modifiers for Custom System Animation Modules */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #030303;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #262626;
        }
      `}</style>
    </section>
  );
}

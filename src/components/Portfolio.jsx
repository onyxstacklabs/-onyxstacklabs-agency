import React, { useState, useEffect, useRef, useCallback } from 'react';

// LOCKED PORTFOLIO ASSET IMPORTS
import tailorsDashboard from '../assets/images/portfolio/portfolio-tailors-dashboard.webp';
import tailorsSupporting from '../assets/images/portfolio/portfolio-tailors-supporting.webp';
import schoolDashboard from '../assets/images/portfolio/portfolio-school-dashboard.webp';
import schoolSupporting from '../assets/images/portfolio/portfolio-school-supporting.webp';
import gatepassDashboard from '../assets/images/portfolio/portfolio-gatepass-dashboard.webp';
import gatepassSupporting from '../assets/images/portfolio/portfolio-gatepass-supporting.webp';
import lotteryDashboard from '../assets/images/portfolio/portfolio-lottery-dashboard.webp';
import lotterySupporting from '../assets/images/portfolio/portfolio-lottery-supporting.webp';
import cricketDashboard from '../assets/images/portfolio/portfolio-cricket-dashboard.webp';
import cricketSupporting from '../assets/images/portfolio/portfolio-cricket-supporting.webp';
import mudraDashboard from '../assets/images/portfolio/portfolio-loan-authentication.webp';
import mudraSupporting from '../assets/images/portfolio/portfolio-loan-supporting.webp';

// Premium Production Ecosystem Data Layer
const ECOSYSTEM_PROJECTS = [
  {
    id: 'tailors',
    name: 'OnyxStack Tailors',
    tagline: 'AI-Assisted Measurement Scanning',
    description: 'Advanced production-grade automation layer leveraging machine learning frameworks to extract handwritten dimensions and images into deterministic structured relational databases.',
    tech: ['React', 'Firebase', 'Gemini API', 'Tailwind'],
    liveUrl: 'https://onyxstack-tailors.vercel.app/',
    githubUrl: 'https://onyxstack-tailors.vercel.app/',
    dashboardImage: tailorsDashboard,
    dashboardAlt: 'OnyxStack Tailors AI dashboard showing automated conversion of handwritten measurements into digital customer profiles',
    supportingImage: tailorsSupporting,
    supportingAlt: 'OnyxStack Tailors order tracking interface displaying customer measurement history and order status',
    keyFeatures: [
      'Gemini AI-powered handwriting and image recognition engine',
      'Automated conversion of raw measurements into structured data',
      'Seamless Firebase-backed data synchronization'
    ],
    businessValue: 'Eliminates manual data entry and reduces measurement errors, accelerating order turnaround for tailoring businesses.'
  },
  {
    id: 'mudra',
    name: 'OnyxStack Mudra',
    tagline: 'Secure Transaction Portal Core',
    description: 'High-fidelity micro-services financial ledger system featuring cryptographic balance validation, real-time client transaction streaming, and integrated multi-tenant accounting telemetry.',
    tech: ['React', 'Firebase Store', 'Tailwind UI'],
    liveUrl: 'https://onyxstack-mudra.vercel.app/',
    githubUrl: 'https://onyxstack-mudra.vercel.app/',
    dashboardImage: mudraDashboard,
    dashboardAlt: 'OnyxStack Mudra finance dashboard showing secure transaction ledger and account balances',
    supportingImage: mudraSupporting,
    supportingAlt: 'OnyxStack Mudra interface displaying multi-tenant financial reporting and transaction history',
    keyFeatures: [
      'Real-time transaction streaming and balance validation',
      'Multi-tenant accounting and reporting dashboard',
      'Secure cryptographic ledger integrity checks'
    ],
    businessValue: 'Provides businesses with a secure, transparent financial control center that scales across multiple client accounts.'
  },
  {
    id: 'school',
    name: 'OnyxStack School',
    tagline: 'Enterprise ERP Management Module',
    description: 'Comprehensive educational resource architecture governing complex asynchronous operations, live student tracking indices, and high-performance administrative state controls.',
    tech: ['React', 'Cloud Firestore', 'Vite Engine'],
    liveUrl: 'https://onyxstack-school.vercel.app/',
    githubUrl: 'https://onyxstack-school.vercel.app/',
    dashboardImage: schoolDashboard,
    dashboardAlt: 'OnyxStack School ERP dashboard showing student records, attendance tracking, and fee management overview',
    supportingImage: schoolSupporting,
    supportingAlt: 'OnyxStack School ERP interface displaying real-time attendance and administrative reporting tools',
    keyFeatures: [
      'Real-time student tracking and academic records management',
      'Centralized administrative control dashboard',
      'Scalable multi-tenant educational architecture'
    ],
    businessValue: 'Streamlines day-to-day academic administration, replacing fragmented manual processes with a unified digital system.'
  },
  {
    id: 'gatepass',
    name: 'OnyxStack GatePass',
    tagline: 'QR Security Scanning Network',
    description: 'Low-latency dual-camera access control system processing rapid edge hardware validations, encrypted verification matrices, and continuous background security snapshots.',
    tech: ['React', 'Firebase Auth', 'Hardware API'],
    liveUrl: 'https://onyxstack-gatepass.vercel.app/',
    githubUrl: 'https://onyxstack-gatepass.vercel.app/',
    dashboardImage: gatepassDashboard,
    dashboardAlt: 'OnyxStack GatePass security dashboard showing QR code visitor verification and access logs',
    supportingImage: gatepassSupporting,
    supportingAlt: 'OnyxStack GatePass interface displaying dual-camera visitor authentication and entry history',
    keyFeatures: [
      'Dual-camera live visitor authentication',
      'Encrypted QR-based access verification',
      'Continuous background security logging'
    ],
    businessValue: 'Strengthens on-site security while giving facility managers a fast, auditable visitor verification process.'
  },
  {
    id: 'lottery',
    name: 'OnyxStack Lottery',
    tagline: 'Live Engagement Matrix',
    description: 'Ultra-performant, mathematically verified pseudo-random indexing core and data visualizer optimized for high-velocity real-time participant concurrency workloads.',
    tech: ['React', 'Tailwind CSS', 'Vite Engine'],
    liveUrl: 'https://onyxstack-lottery.vercel.app/',
    githubUrl: 'https://onyxstack-lottery.vercel.app/',
    dashboardImage: lotteryDashboard,
    dashboardAlt: 'OnyxStack Lottery platform dashboard showing real-time participant entries and draw results',
    supportingImage: lotterySupporting,
    supportingAlt: 'OnyxStack Lottery interface displaying live engagement analytics and winner selection results',
    keyFeatures: [
      'Mathematically verified random selection engine',
      'Real-time participant engagement visualizer',
      'Optimized for high-concurrency live events'
    ],
    businessValue: 'Powers transparent, high-trust live draws that can handle large audiences without performance degradation.'
  },
  {
    id: 'cricket',
    name: 'OnyxStack Cricket',
    tagline: 'Real-Time Scoring Infrastructure',
    description: 'Microsecond synchronized event broker system serving ball-by-ball performance pipelines, dynamic client viewport rendering, and multi-bracket analytics layouts.',
    tech: ['React', 'Tailwind UI', 'State Engine'],
    liveUrl: 'https://onyxstack-cricket.vercel.app/',
    githubUrl: 'https://onyxstack-cricket.vercel.app/',
    dashboardImage: cricketDashboard,
    dashboardAlt: 'OnyxStack Cricket live scoring dashboard showing ball-by-ball match statistics and analytics',
    supportingImage: cricketSupporting,
    supportingAlt: 'OnyxStack Cricket interface displaying tournament bracket standings and player performance charts',
    keyFeatures: [
      'Ball-by-ball live scoring updates',
      'Dynamic tournament bracket analytics',
      'Low-latency real-time data synchronization'
    ],
    businessValue: 'Delivers a broadcast-quality live scoring experience that keeps fans and organizers engaged throughout a tournament.'
  }
];

// Lightweight IntersectionObserver hook — GPU optimized
function useRevealOnScroll() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function RevealCard({ children }) {
  const [ref, isVisible] = useRevealOnScroll();
  return (
    <div
      ref={ref}
      style={{ willChange: 'transform, opacity' }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

function ProjectImage({ src, alt, onOpen, priority = false }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src, alt)}
      aria-label={`Open full-size image: ${alt}`}
      className="group/img relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      <img
        src={src}
        alt={alt}
        width="1200"
        height="750"
        loading={priority ? "eager" : "lazy"}
        fetchpriority={priority ? "high" : "auto"}
        decoding="async"
        className="w-full h-full object-cover aspect-[16/10] transform transition-transform duration-300 ease-out group-hover/img:scale-[1.03] group-hover/img:-translate-y-[5px]"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
    </button>
  );
}

function ProjectLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050505]/90 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image preview"
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-[#06B6D4]/50 hover:bg-neutral-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] rounded-2xl border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.7)] object-contain animate-[lightboxScaleIn_0.25s_ease-out]"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightboxScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function ActionButton({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono font-bold text-[11px] uppercase tracking-widest text-center transition-all duration-300 ease-out backdrop-blur-sm bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-black border border-transparent hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export default function Portfolio() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const pushedHistoryRef = useRef(false);

  const openLightbox = useCallback((src, alt) => {
    setLightboxImage({ src, alt });
    window.history.pushState({ portfolioLightbox: true }, '');
    pushedHistoryRef.current = true;
  }, []);

  const closeLightbox = useCallback(() => {
    if (pushedHistoryRef.current) {
      pushedHistoryRef.current = false;
      window.history.back();
    } else {
      setLightboxImage(null);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setLightboxImage(null);
      pushedHistoryRef.current = false;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative z-10 py-28 px-6 max-w-7xl mx-auto space-y-20"
      aria-labelledby="portfolio-title"
    >
      {/* Ambient background accents */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-[#06B6D4]/[0.04] blur-[160px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/[0.04] blur-[180px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Header Matrix Section */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-8">
        <div className="space-y-3">
          <h2 id="portfolio-title" className="text-xs font-mono font-bold uppercase tracking-widest text-[#06B6D4]">
            Selected Product Deployments
          </h2>
          <p className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">
            Live Production Ecosystem
          </p>
        </div>
        <div className="inline-block bg-neutral-900/30 backdrop-blur-sm border border-neutral-800 px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-widest text-neutral-400">
          Active Verified Instances
        </div>
      </div>

      {/* Enterprise Case Study Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
        {ECOSYSTEM_PROJECTS.map((project, projectIdx) => {
          const isFirstCard = projectIdx === 0;
          return (
            <RevealCard key={project.id}>
              <article className="group/card relative bg-[#0A0A0A]/50 backdrop-blur-md border border-neutral-900 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 transition-all duration-300 ease-out hover:border-[#06B6D4]/25 hover:shadow-[0_20px_45px_rgba(0,0,0,0.65),0_0_25px_rgba(6,182,212,0.06)]">

                {/* Live Operational Badge */}
                <span className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 bg-emerald-950/40 border border-emerald-500/20 text-[#00e676] text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse"></span>
                  LIVE
                </span>

                {/* Title Block */}
                <div className="space-y-1 pr-16">
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover/card:text-[#06B6D4]">
                    {project.name}
                  </h3>
                  <p className="text-[9px] font-mono font-bold text-[#06B6D4] tracking-widest uppercase">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Dashboard Image — only the very first card's primary dashboard image gets eager/high-priority loading */}
                <ProjectImage
                  src={project.dashboardImage}
                  alt={project.dashboardAlt}
                  onOpen={openLightbox}
                  priority={isFirstCard}
                />

                {/* Supporting Image — always lazy-loaded regardless of card position, since this section is below-the-fold on Home */}
                <ProjectImage
                  src={project.supportingImage}
                  alt={project.supportingAlt}
                  onOpen={openLightbox}
                />

                {/* Action Button */}
                <ActionButton
                  href={project.liveUrl}
                  label="View Live Demo"
                  icon={
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  }
                />

                {/* Technology Stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-900/60">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-900/60 text-neutral-400 border border-neutral-800/40 font-mono text-[9px] px-2 py-0.5 rounded transition-all duration-300 group-hover/card:border-neutral-700 group-hover/card:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-400 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#06B6D4] flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Value */}
                <div className="rounded-xl bg-neutral-900/40 border border-neutral-800/60 p-4">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#06B6D4] mb-2">
                    Business Value
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {project.businessValue}
                  </p>
                </div>

              </article>
            </RevealCard>
          );
        })}
      </div>

      <ProjectLightbox image={lightboxImage} onClose={closeLightbox} />
    </section>
  );
}

import React from 'react';

/**
 * Clients Component
 * Enterprise trust section for OnyxStack Labs — aligned with the modern
 * high-performance cyan/blue dark mode design language.
 * Icons are optimized inline SVGs — zero external dependency overhead.
 */

// Lightweight inline SVG icon set (highly optimized and modernized)
const IconCode = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconLayers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconSparkles = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

const IconCloud = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9h-1.26A8 8 0 1 0 4 15.25" />
    <path d="M8 19h9.5" />
  </svg>
);

const IconSmartphone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const IconGlobe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconArrowUpRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// Icons for the "Why Work With Us" value-prop cards (no fabricated metrics)
const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const IconTag = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.82z" />
    <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

const IconZap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconMessageCircle = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Tech Stack Minimal SVGs mapping
const techStackDetails = [
  {
    name: 'React',
    icon: (props) => (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Firebase',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 3.5L19 7l-2 13.5L12 22l-5-1.5L5 3.5z" />
        <path d="M12 10l-4 4.5h8L12 10z" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" />
        <path d="M12 22V12" />
        <path d="M3.5 7L12 12" />
        <path d="M20.5 7L12 12" />
      </svg>
    )
  },
  {
    name: 'MongoDB',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2c0 0-4 4.5-4 9.5C8 16 10 18 12 22c2-4 4-6 4-10.5C16 6.5 12 2 12 2z" />
        <path d="M12 2v20" />
      </svg>
    )
  },
  {
    name: 'Gemini AI',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
      </svg>
    )
  },
  {
    name: 'Vercel',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 22 20 2 20" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 16c-3 0-5.5-1.5-7-4 1.5-2.5 4-4 7-4s5.5 1.5 7 4c-1.5 2.5-4 4-7 4z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    )
  },
  {
    name: 'Git',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <line x1="6" y1="9" x2="6" y2="18" />
        <line x1="9" y1="12" x2="15" y2="18" />
      </svg>
    )
  }
];

export default function Clients() {
  const trustCards = [
    {
      icon: IconCode,
      title: 'Custom Software',
      desc: 'Bespoke applications built around how your team actually works, not a generic template.'
    },
    {
      icon: IconLayers,
      title: 'ERP Systems',
      desc: 'Unified systems that connect operations, inventory, and finance into one reliable source of truth.'
    },
    {
      icon: IconSparkles,
      title: 'AI Automation',
      desc: 'Practical AI woven into existing workflows to cut manual work, not bolted on for the sake of it.'
    },
    {
      icon: IconCloud,
      title: 'Cloud Solutions',
      desc: 'Infrastructure that scales with demand and stays stable under real production traffic.'
    },
    {
      icon: IconSmartphone,
      title: 'Mobile Apps',
      desc: 'Native-feeling iOS and Android experiences backed by a single, well-structured codebase.'
    },
    {
      icon: IconGlobe,
      title: 'Enterprise Websites',
      desc: 'Fast, accessible, conversion-ready websites built to represent large organizations well.'
    }
  ];

  // Value-driven differentiators — no fabricated metrics, just what we
  // actually offer and can honestly stand behind.
  const whyUs = [
    {
      icon: IconUser,
      label: 'DIRECT ACCESS',
      desc: 'You work directly with the engineers building your project — no account managers in between.'
    },
    {
      icon: IconTag,
      label: 'FIXED-SCOPE PRICING',
      desc: 'Clear budget ranges upfront, so there are no surprise costs once development starts.'
    },
    {
      icon: IconZap,
      label: 'MODERN STACK',
      desc: 'Built on React, Firebase, and current AI tooling — nothing outdated bolted together.'
    },
    {
      icon: IconMessageCircle,
      label: 'ALWAYS REACHABLE',
      desc: 'A real person responds to every inquiry — no chatbot loops or ticket queues.'
    }
  ];

  return (
    <section
      className="relative w-full py-24 lg:py-36 bg-[#050505] overflow-hidden"
      aria-labelledby="clients-heading"
    >
      {/* Premium Ambient Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#06B6D4]/[0.03] blur-[150px] rounded-full pointer-events-none select-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/[0.03] blur-[170px] rounded-full pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20 max-w-3xl mx-auto">
          {/* Premium Glass Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#06B6D4] backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.05)] hover:border-[#06B6D4]/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-colors duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06B6D4]"></span>
            </span>
            Built for Growing Teams
          </div>

          <h2
            id="clients-heading"
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white"
          >
            Software Built for Businesses{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#2563EB]">
              Building for the Future
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl font-light">
            OnyxStack Labs designs and ships scalable software, custom automation, and resilient cloud
            infrastructure for startups, established SMEs, and enterprise teams alike.
          </p>
        </div>

        {/* TRUST CARDS GRID */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-24"
          role="list"
          aria-label="Services OnyxStack Labs delivers"
        >
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                role="listitem"
                tabIndex={0}
                className="group relative flex flex-col p-8 rounded-2xl bg-[#090909] border border-white/[0.08] transition-[transform,border-color,box-shadow] duration-300 ease-out outline-none hover:-translate-y-1.5 hover:border-[#06B6D4]/35 hover:shadow-[0_12px_40px_-12px_rgba(6,182,212,0.12)] focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:border-[#06B6D4]/50 motion-reduce:hover:translate-y-0"
              >
                {/* Micro Top Accent Bar */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#06B6D4]/50 transition-colors duration-500"
                  aria-hidden="true"
                />

                {/* Cyber Glow Accent */}
                <div
                  className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#06B6D4] mb-6 transition-[background-color,border-color,box-shadow] duration-300 group-hover:bg-[#06B6D4]/10 group-hover:border-[#06B6D4]/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-1.5">
                    {card.title}
                    <IconArrowUpRight
                      className="w-4 h-4 text-neutral-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WHY WORK WITH US — VALUE-PROP CARDS (no fabricated stats) */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-24"
          role="group"
          aria-label="Why work with OnyxStack Labs"
        >
          {whyUs.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#090909] border border-white/[0.06] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:border-[#06B6D4]/35 hover:shadow-[0_12px_40px_-12px_rgba(6,182,212,0.12)]"
              >
                {/* Subtle Inner Gradient Finish */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" 
                  aria-hidden="true" 
                />
                
                {/* Dynamic Cyber Glow Spotlight */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.02),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                  aria-hidden="true" 
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 transition-colors duration-300 group-hover:text-[#06B6D4]">
                      {item.label}
                    </span>
                    <div className="text-neutral-500 transition-colors duration-300 group-hover:text-[#06B6D4] group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-neutral-300 leading-relaxed font-light group-hover:text-neutral-200 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TECH STACK STRIP REDESIGNED AS ENTERPRISE BADGES */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
            Built With Tools We Trust
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-3.5 max-w-4xl"
            role="list"
            aria-label="Technologies used by OnyxStack Labs"
          >
            {techStackDetails.map((tech, index) => {
              const TechIcon = tech.icon;
              return (
                <div
                  key={index}
                  role="listitem"
                  tabIndex={0}
                  className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-400 bg-[#090909] border border-white/[0.06] backdrop-blur-md transition-[color,border-color,box-shadow,transform] duration-300 outline-none hover:text-white hover:border-[#06B6D4]/35 hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus-visible:ring-2 focus-visible:ring-[#06B6D4] cursor-default"
                >
                  <TechIcon className="w-4 h-4 text-neutral-500 transition-colors duration-300 group-hover:text-[#06B6D4] group-hover:drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                  <span className="tracking-wide">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

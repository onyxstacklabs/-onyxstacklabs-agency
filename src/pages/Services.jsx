import React, { useEffect, useState } from 'react';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { useSEO, buildFaqSchema } from '../utils/useSEO';

// PREMIUM IMAGE ASSETS — EXACT PATHS, DO NOT RENAME
import heroBanner from "../assets/images/hero-banner.webp";
import serviceAiAutomation from "../assets/images/service-ai-automation.webp";
import serviceCloudSolutions from "../assets/images/service-cloud-solutions.webp";
import serviceCyberSecurity from "../assets/images/service-cyber-security.webp";
import serviceEnterpriseSoftware from "../assets/images/service-enterprise-software.webp";
import serviceMobileAppDevelopment from "../assets/images/service-mobile-app-development.webp";
import serviceWebDevelopment from "../assets/images/service-web-development.webp";

export default function Services({ currentPath, navigateToNode }) {
  const [openFaq, setOpenFaq] = useState(null);

  // Focus layout scope on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section 2 Data: Premium Featured Services Showcase (exactly 6, image mapping is FINAL)
  const featuredServices = [
    {
      label: "Bespoke Engineering",
      title: "Custom Software Development",
      desc: "Bespoke software engineered around your exact operational logic, not a generic template. We design systems that automate the mechanics of your business and hold up under real production load.",
      features: [
        "Architecture mapped to your workflows",
        "Modular codebases built for longevity",
        "Direct engineering ownership, no handoffs"
      ],
      image: serviceEnterpriseSoftware,
      alt: "Custom enterprise software development"
    },
    {
      label: "Web Platforms",
      title: "Modern Web Applications",
      desc: "Responsive, high-performance web products built on resilient security architecture. Every interaction is tuned for speed, clarity, and a frictionless client-side experience.",
      features: [
        "Sub-second load and interaction times",
        "Hardened authentication and data layers",
        "Pixel-precise responsive interfaces"
      ],
      image: serviceWebDevelopment,
      alt: "Modern web application development"
    },
    {
      label: "Intelligent Systems",
      title: "AI Solutions & Integrations",
      desc: "Practical artificial intelligence embedded directly into your operations. We deploy models and automated pipelines that remove manual overhead and surface decisions faster.",
      features: [
        "Custom AI and NLP integrations",
        "Automated internal workflow pipelines",
        "Real-time data-driven decisioning"
      ],
      image: serviceAiAutomation,
      alt: "AI automation and intelligent workflow systems"
    },
    {
      label: "Infrastructure",
      title: "Cloud Scale Deployment",
      desc: "Stable, edge-optimized infrastructure with continuous delivery baked in. Your platform scales with demand instead of buckling under it.",
      features: [
        "Automated CI/CD release pipelines",
        "High-availability cloud architecture",
        "Real-time infrastructure monitoring"
      ],
      image: serviceCloudSolutions,
      alt: "Cloud scale deployment infrastructure"
    },
    {
      label: "Security Engineering",
      title: "Cyber Security",
      desc: "Security treated as architecture, not an afterthought. We audit, harden, and continuously monitor your systems against the vulnerabilities that matter most.",
      features: [
        "Full-stack vulnerability audits",
        "Encrypted data and access layers",
        "Ongoing threat monitoring cycles"
      ],
      image: serviceCyberSecurity,
      alt: "Cyber security hardening and monitoring"
    },
    {
      label: "Mobile Engineering",
      title: "Mobile App Development",
      desc: "Native-grade mobile products built for fluid performance across devices. From first interaction to checkout, every screen is engineered for retention.",
      features: [
        "Cross-platform performance parity",
        "Offline-first data architecture",
        "App-store ready deployment pipelines"
      ],
      image: serviceMobileAppDevelopment,
      alt: "Mobile app development on multiple devices"
    }
  ];

  // Section 3 Data: Premium Enterprise Service Catalog Matrix
  const servicesList = [
    { title: "Custom Software Development", desc: "We design and engineer bespoke software solutions tailored to solve specific operational challenges, automate business mechanics, and support long-term commercial goals." },
    { title: "Modern Web Applications", desc: "Building responsive web development products that combine exceptional client-side performance with resilient security architectures to provide flawless user experiences." },
    { title: "MERN Stack Development", desc: "High-performance applications built from the ground up using MongoDB, Express.js, React, and Node.js for robust, end-to-end JavaScript product environments." },
    { title: "React Development", desc: "Crafting highly modular, dynamic, and lightning-fast user interfaces optimized for fluid user interaction, strict state management, and clear component rendering." },
    { title: "Firebase Development", desc: "Leveraging reliable cloud applications with secure backend service architectures, including real-time databases, user authentication loops, and serverless data tracking." },
    { title: "AI Solutions & Integrations", desc: "Deploying practical artificial intelligence tools, natural language processing models, and intelligent automated features directly into your core business workflows." },
    { title: "Business Automation", desc: "Eliminating manual overhead and human friction by creating integrated background scripts, automated tasks, and intelligent system synchronization." },
    { title: "Enterprise Software & Admin Dashboards", desc: "Designing secure, feature-rich admin dashboards, heavy data-management panels, and internal reporting consoles with strict user authorization layers." },
    { title: "ERP Systems", desc: "Building comprehensive enterprise resource planning platforms that centralize company logistics, resource schedules, accounting data, and team operations." },
    { title: "API Development & Integration", desc: "Engineering fast, fully documented RESTful and GraphQL API layers designed for high-concurrency payload deliveries and smooth third-party software connections." },
    { title: "Cloud Scale Deployment", desc: "Deploying stable software frameworks to optimized edge networks and cloud infrastructure with fully automated continuous integration monitoring." },
    { title: "Performance Optimization", desc: "Auditing existing software assets to significantly improve rendering speeds, clean up bloated data queries, and achieve near-zero visual lag." },
    { title: "Ongoing Maintenance & Support", desc: "Providing active software lifecycle support, regular technical security updates, structural code adjustments, and routine version upgrades." }
  ];

  // Inline SVG icon set matched one-to-one with servicesList order.
  // These 13 cards remain icon-only — they are never converted into image cards.
  const serviceIcons = [
    // Custom Software Development
    <path key="i1" strokeLinecap="round" strokeLinejoin="round" d="M9 18l-6-6 6-6M15 6l6 6-6 6" />,
    // Modern Web Applications
    <g key="i2">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
      <circle cx="6" cy="7" r="0.5" fill="currentColor" stroke="none" />
    </g>,
    // MERN Stack Development
    <g key="i3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8-4 8 4-8 4-8-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l8 4 8-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l8 4 8-4" />
    </g>,
    // React Development
    <g key="i4">
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </g>,
    // Firebase Development
    <path key="i5" strokeLinecap="round" strokeLinejoin="round" d="M7 20l3.2-15.6 2.1 4.4 1.6-2.6L18 20a10 10 0 01-11-0z" />,
    // AI Solutions & Integrations
    <g key="i6">
      <rect x="7" y="7" width="10" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2" />
    </g>,
    // Business Automation
    <g key="i7">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </g>,
    // Enterprise Software & Admin Dashboards
    <g key="i8">
      <rect x="3" y="3" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="3" width="8" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="10" width="8" height="11" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="13" width="8" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </g>,
    // ERP Systems
    <g key="i9">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V9l8-5 8 5v12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6M9 12h.01M15 12h.01M12 9h.01" />
    </g>,
    // API Development & Integration
    <g key="i10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v4M15 3v4M9 17v4M15 17v4" />
      <rect x="6" y="7" width="12" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>,
    // Cloud Scale Deployment
    <path key="i11" strokeLinecap="round" strokeLinejoin="round" d="M7 18a4.5 4.5 0 01-.6-8.96A5.5 5.5 0 0117 8.5a4 4 0 01-.5 7.98H7z" />,
    // Performance Optimization
    <path key="i12" strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
    // Ongoing Maintenance & Support
    <path key="i13" strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.8 2.8-2-2 2.8-2.8z" />
  ];

  // Section 4 Data: Engineering Differentiators
  const advantages = [
    { title: "Proven Software Craftsmanship", desc: "Our engineers focus on writing clean, accessible, and standards-compliant source code that minimizes tech debt and simplifies future engineering growth." },
    { title: "Scalable Applications Layout", desc: "We build stateless code architectures and modular technical frameworks capable of processing volatile traffic growth and business expansions gracefully." },
    { title: "Rigorous Production Testing", desc: "Every functional component goes through thorough diagnostic audits and data validation tests to completely eliminate security vulnerabilities before launch." },
    { title: "Polished UI/UX Systems", desc: "We deliver modern, visually stunning interfaces utilizing intuitive spatial hierarchies and utility layouts optimized to boost user retention." },
    { title: "Agile Project Iterations", desc: "Our development methodologies rely on transparent iterations and structured release targets to get premium digital products to market ahead of schedule." },
    { title: "Long-Term Engineering Alliances", desc: "We partner with your team far past initial deployment, offering continuous code optimization updates, database scaling, and immediate technical backing." }
  ];

  const advantageIcons = [
    <path key="a1" strokeLinecap="round" strokeLinejoin="round" d="M9 18l-6-6 6-6M15 6l6 6-6 6" />,
    <g key="a2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4M3 17a4 4 0 014-4M12 21v-8M12 13a4 4 0 014-4M21 21v-2M21 19a4 4 0 014-4" transform="translate(-1 0)" />
    </g>,
    <g key="a3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>,
    <g key="a4">
      <rect x="3" y="4" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 18v3" />
    </g>,
    <path key="a5" strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
    <g key="a6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M13 7a4 4 0 11-8 0 4 4 0 018 0zM21 7a4 4 0 11-4-4" />
    </g>
  ];

  // Section 5 Data: Core Engineering Technologies
  const techStack = [
    { name: "React", type: "Interface Engine", border: "hover:border-cyan-500/30" },
    { name: "Node.js", type: "Backend Runtime", border: "hover:border-emerald-500/30" },
    { name: "Express.js", type: "API Framework", border: "hover:border-neutral-500/30" },
    { name: "MongoDB", type: "Document Database", border: "hover:border-green-500/30" },
    { name: "Firebase", type: "Cloud Architecture", border: "hover:border-amber-500/30" },
    { name: "Tailwind CSS", type: "Design Utilities", border: "hover:border-sky-400/30" },
    { name: "Vite", type: "Compilation Pipeline", border: "hover:border-purple-500/30" },
    { name: "Gemini AI", type: "Cognitive Processing", border: "hover:border-blue-500/30" },
    { name: "Git", type: "Version Control", border: "hover:border-orange-500/30" },
    { name: "Vercel", type: "Edge Optimization", border: "hover:border-neutral-200/30" }
  ];

  // Section 6 Data: System Delivery Sequence Map
  const pipelineSteps = [
    { number: "01", phase: "Discovery", scope: "We review your explicit project objectives, outline baseline technical parameters, and discover existing operational friction points." },
    { number: "02", phase: "Planning", scope: "Our team writes detailed product feature maps, specifies core data schemas, and schedules clear product release milestones." },
    { number: "03", phase: "UI/UX Architecture", scope: "We transform feature requirements into intuitive, premium design flows built to maximize user conversion and clear scannability." },
    { number: "04", phase: "Development", scope: "Using clean MERN stack and React patterns, our engineers craft modular components and secure serverless backend logic." },
    { number: "05", phase: "System Testing", scope: "We run thorough manual code reviews and rigorous performance benchmarks to guarantee zero cross-browser rendering bugs." },
    { number: "06", phase: "Cloud Deployment", scope: "Your software goes live seamlessly onto high-availability cloud hosting platforms with integrated performance monitoring." },
    { number: "07", phase: "Maintenance Support", scope: "We provide scheduled security patches, optimize real-time database queries, and implement new features as your platform scales." }
  ];

  // Section 7 Data: Enterprise Corporate FAQ Catalog
  const faqs = [
    { q: "How long does a custom software development project usually take?", a: "Most custom web applications and business automation tools transition from initial discovery to live cloud deployment within 6 to 12 weeks. Large-scale setups like extensive ERP systems or multi-tenant software are scheduled in iterative phases to maintain continuous development transparency." },
    { q: "Do we retain absolute ownership over our software assets and code repositories?", a: "Yes, completely. Once milestone allocations are successfully completed, all source code assets, database frameworks, cloud deployment parameters, and architectural documentation are fully transferred over to your organization." },
    { q: "How does your team guarantee long-term web performance and system security?", a: "We apply modern web development standards at every step. This involves implementing isolated data layers, strict cross-origin token access rules, robust password hashing, and continuous dependency updates to prevent software stability issues." },
    { q: "Can you modernize or scale our existing web software without breaking it?", a: "Yes. We frequently build modern web applications and custom admin dashboards designed to sit cleanly over legacy data setups, allowing companies to improve internal tools without causing any operational downtime." },
    { q: "What types of AI solutions can you integrate into our business platforms?", a: "We build tailored AI integrations, semantic search tools, and semantic reporting modules using advanced technology like Gemini AI. These are built to process internal data streams, automate service requests, and optimize resource logistics." },
    { q: "What kind of support is available after our product launch?", a: "We offer comprehensive maintenance plans that cover regular frontend performance optimization, software security auditing, dependency upgrades, and immediate feature scaling to ensure long-term value." }
  ];

  // Unique per-page SEO — title, description, canonical, and FAQ schema
  // built from this page's own real faqs array above.
  useSEO({
    title: 'Custom Software Development Services | OnyxStack Labs',
    description: 'Custom software, modern web apps, AI integrations, cloud deployment, cybersecurity, and mobile app development — engineered end-to-end by OnyxStack Labs.',
    path: '/services',
    faqSchema: buildFaqSchema(faqs)
  });

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth relative overflow-hidden">

      {/* MOTION + SIGNATURE STYLE ENGINE (CSS ONLY, NO LIBRARIES) */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sheenSweep {
          0% { transform: translateX(-120%) skewX(-15deg); opacity: 0; }
          15% { opacity: 0.5; }
          60% { opacity: 0; }
          100% { transform: translateX(220%) skewX(-15deg); opacity: 0; }
        }
        .fade-up {
          animation: fadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-fade {
          animation: heroFade 900ms ease both;
        }
        .float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .sheen::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 40%, rgba(6,182,212,0.16) 50%, transparent 60%);
          transform: translateX(-120%) skewX(-15deg);
          pointer-events: none;
        }
        .group:hover .sheen::after {
          animation: sheenSweep 1.1s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, .float-slow, .hero-fade { animation: none !important; opacity: 1 !important; transform: none !important; }
          .group:hover .sheen::after { animation: none !important; }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* VISUAL BACKGROUND GRADIENT SYSTEM */}
      <div className="absolute top-[900px] left-0 w-[500px] h-[500px] bg-[#2563EB]/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[600px] right-0 w-[600px] h-[600px] bg-[#06B6D4]/[0.02] blur-[200px] pointer-events-none" />
      {/* Subtle structural grid + mesh layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '3px 3px'
        }}
      />

      {/* SYSTEM CONTROLLER CONTAINER */}
      <div className="relative z-10">

        {/* SECTION 1: HERO CONTAINER — FULL-WIDTH PREMIUM BACKGROUND HERO */}
        <section className="relative w-full min-h-[560px] sm:min-h-[640px] flex items-center overflow-hidden hero-fade">
          <div className="absolute inset-0 z-0">
            <img
              src={heroBanner}
              alt="OnyxStack Labs enterprise software development showcase"
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#050505]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_60%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 sm:py-40 w-full">
            <div className="max-w-4xl fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-sm">
                Our Capabilities
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Custom Software Development <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-cyan-200 to-blue-500">
                  Tailored for Business Growth
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10 font-sans">
                OnyxStack Labs is a modern software development company that crafts secure web applications, smart AI solutions, and performant cloud tools. We match intentional, low-friction visual layout design with robust MERN stack architecture to convert product strategies into reliable business outcomes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact-redirect"
                  onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                  className="bg-neutral-100 hover:bg-[#06B6D4] text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Work With Us
                </a>
                <a
                  href="#services-catalog"
                  onClick={(e) => { e.preventDefault(); document.getElementById('services-catalog')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900/30 backdrop-blur-sm text-neutral-200 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PREMIUM FEATURED SERVICES SHOWCASE — 6 LARGE IMAGE CARDS */}
        <section aria-labelledby="featured-services-heading" className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Premium Featured Services</p>
            <h2 id="featured-services-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Six flagship capabilities, engineered end-to-end</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredServices.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-950/60 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-1 hover:border-[#06B6D4]/30 hover:shadow-[0_25px_70px_-10px_rgba(6,182,212,0.25)] fade-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="sheen relative w-full h-[240px] sm:h-[280px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-[#06B6D4]/30 text-[#06B6D4] text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm">
                    {item.label}
                  </div>
                  <div className="absolute -bottom-6 right-6 w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-[#06B6D4]/25 flex items-center justify-center text-[#06B6D4] shadow-[0_0_25px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
                    </svg>
                  </div>
                </div>

                <div className="p-6 pt-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#06B6D4] transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-5">{item.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {item.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact-redirect"
                    onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                    className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-[#06B6D4] text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Discuss This Service
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SERVICES CAPABILITIES GRID — ICON-ONLY, NEVER IMAGE CARDS */}
        <section id="services-catalog" className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60 scroll-mt-24">
          <div className="max-w-3xl mb-16 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Service Matrix</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Full-scale digital products built with professional clarity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm overflow-hidden hover:border-[#06B6D4]/30 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between shadow-none hover:shadow-[0_20px_45px_-20px_rgba(6,182,212,0.35)]"
              >
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/0 to-transparent group-hover:via-[#06B6D4]/60 transition-all duration-500" />
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#06B6D4]/0 group-hover:bg-[#06B6D4]/[0.06] rounded-full blur-3xl transition-all duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/15 flex items-center justify-center text-[#06B6D4] mb-5 backdrop-blur-sm group-hover:border-[#06B6D4]/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:rotate-3 transition-all duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
                      {serviceIcons[idx]}
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 font-sans tracking-wide group-hover:text-[#06B6D4] transition-colors duration-300">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{service.desc}</p>
                </div>
                <div className="relative z-10 pt-6 border-t border-neutral-900/60 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 group-hover:text-[#06B6D4] transition-colors duration-300">SERVICE.NODE // READY</span>
                  <span className="text-[#06B6D4] text-sm transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WHY OUR SERVICES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Engineering Benchmarks</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Our standards for shipping production-grade code</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, idx) => (
              <div key={idx} className="group relative p-6 rounded-xl border border-neutral-900/60 bg-gradient-to-b from-neutral-950 to-[#050505] hover:border-neutral-700/60 transition-all duration-500 hover:-translate-y-0.5">
                <div className="absolute top-0 left-6 w-10 h-[1px] bg-gradient-to-r from-[#06B6D4] to-transparent" />
                <div className="w-9 h-9 rounded-lg bg-[#06B6D4]/5 border border-[#06B6D4]/15 flex items-center justify-center text-[#06B6D4] mb-4 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] transition-all duration-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
                    {advantageIcons[idx]}
                  </svg>
                </div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-3">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: TECHNOLOGIES DISPLAY ARRAY */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-12 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Our Toolkit</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Vetted frameworks used to craft modern web applications</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className={`group p-5 rounded-xl border border-neutral-900 bg-neutral-950/70 backdrop-blur-sm cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.4)] ${tech.border}`}>
                <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 mb-1">{tech.type}</p>
                <h4 className="text-sm font-bold text-white font-sans">{tech.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: DEVELOPMENT WORKFLOW PIPELINE (PREMIUM TIMELINE) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Delivery Lifecycle</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">A transparent approach to software development</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {pipelineSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="relative z-10 w-10 h-10 rounded-full border border-neutral-800 bg-[#0a0a0a] flex items-center justify-center text-xs font-mono font-bold text-neutral-500 mb-5 group-hover:border-[#06B6D4]/50 group-hover:text-[#06B6D4] group-hover:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-500">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-sans group-hover:text-[#06B6D4] transition-colors duration-300">{step.phase}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{step.scope}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ ACCORDION ENGINE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-12 fade-up">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Frequently asked development questions</h2>
          </div>
          <div className="max-w-4xl space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded-xl bg-neutral-950/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#06B6D4]/30 shadow-[0_10px_40px_-20px_rgba(6,182,212,0.4)]' : 'border-neutral-900 hover:border-neutral-800'}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-white hover:bg-neutral-900/30 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#06B6D4]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-medium font-sans">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 transition-all duration-300 ${isOpen ? 'rotate-45 border-[#06B6D4]/40 text-[#06B6D4]' : ''}`} aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 border-t border-neutral-900/50' : 'max-h-0'}`}>
                    <div className="p-6 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 8: FINAL SYSTEM CALL TO ACTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 border-t border-neutral-900/60">
          <div className="p-8 sm:p-16 rounded-3xl border border-neutral-800/60 bg-gradient-to-r from-neutral-950 via-neutral-950 to-neutral-900/40 backdrop-blur-sm relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-[0_30px_80px_-30px_rgba(6,182,212,0.15)]">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.06),transparent_45%)] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#06B6D4]/[0.05] rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Let's discuss your custom software requirements
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Get in touch with our development team today to map out your feature scope, address operational challenges, and schedule a discovery call.
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0">
              <a
                href="#contact-endpoint"
                onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="inline-block bg-white hover:bg-[#06B6D4] text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

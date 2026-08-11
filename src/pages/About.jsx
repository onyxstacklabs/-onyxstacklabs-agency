import React, { useEffect } from 'react';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { useSEO } from '../utils/useSEO';

// ASSETS IMPORTS
import heroImage from '../assets/images/about/about-hero-enterprise-workspace.webp';
import companyStoryImage from '../assets/images/about/about-company-story.webp';
import missionVisionImage from '../assets/images/about/about-mission-vision.webp';
import coreValuesImage from '../assets/images/about/about-core-values.webp';
import technologyStackImage from '../assets/images/about/about-technology-stack.webp';
import finalCtaImage from '../assets/images/about/about-final-cta.webp';

export default function About({ currentPath, navigateToNode }) {

  // Unique per-page SEO — title, description, and canonical for /about.
  // Title shortened to stay well under Google's ~60-char display limit
  // while remaining specific and meaningful to this page's context.
  useSEO({
    title: 'About OnyxStack Labs | Software Engineering Agency',
    description: 'Learn about OnyxStack Labs, a premier software engineering agency specializing in custom React development, MERN stack solutions, and enterprise AI integrations.',
    path: '/about'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    { title: "Integrity", desc: "We believe in honest partnerships. From transparent communication to reliable timelines, we deliver on our promises without hidden surprises." },
    { title: "Craftsmanship", desc: "We write clean, well-documented code designed to last. Shortcuts create technical debt, so we focus on building stable foundations from day one." },
    { title: "User-Centric Design", desc: "Software should be a pleasure to use. We combine powerful engineering with intuitive user experiences that simplify complex operational workflows." },
    { title: "Continuous Innovation", desc: "The digital landscape evolves rapidly. We constantly refine our technical workflows and adopt proven technologies to keep your business ahead." },
    { title: "Reliability", desc: "Your software is the backbone of your operations. We design resilient, secure cloud applications that ensure maximum uptime and data integrity." },
    { title: "Shared Success", desc: "We don't just build software and walk away. We invest deeply in your goals, working closely with your team to drive real business growth." }
  ];

  const differentiators = [
    { title: "Professional Development", desc: "Our team writes clean, modular, production-ready code that complies with the highest industry standards, ensuring seamless handoffs." },
    { title: "Scalable Architecture", desc: "We design robust systems engineered to handle growing traffic, high transactional volumes, and future business expansions smoothly." },
    { title: "Transparent Communication", desc: "Stay informed at every step. We provide regular updates and direct lines of communication to eliminate friction and build true alignment." },
    { title: "Modern UI/UX Engineering", desc: "We build fast, responsive, and beautiful interfaces tailored for maximum conversion, accessibility, and high user retention." },
    { title: "Practical AI Integration", desc: "Automate manual tasks and unlock internal data insights with intelligent, tailor-made artificial intelligence features integrated directly into your workflows." },
    { title: "Long-Term Partnerships", desc: "We support your platform long after launch with dedicated systems optimization, proactive monitoring, and iterative feature development." }
  ];

  const stackItems = [
    { name: "React", category: "Frontend Engine", glow: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]" },
    { name: "Vite", category: "Build Systems", glow: "group-hover:border-blue-500/40 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.15)]" },
    { name: "Firebase", category: "Cloud Platform", glow: "group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]" },
    { name: "Tailwind CSS", category: "Design Layer", glow: "group-hover:border-sky-400/40 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]" },
    { name: "Node.js", category: "Runtime Environment", glow: "group-hover:border-blue-400/40 group-hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]" },
    { name: "Express.js", category: "API Framework", glow: "group-hover:border-neutral-400/40 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]" },
    { name: "MongoDB", category: "Database Layer", glow: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]" },
    { name: "Gemini AI", category: "Intelligence Matrix", glow: "group-hover:border-blue-500/40 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]" },
    { name: "Git", category: "Version Infrastructure", glow: "group-hover:border-blue-400/40 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.15)]" },
    { name: "Vercel", category: "Edge Deployment", glow: "group-hover:border-neutral-100/40 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]" }
  ];

  const workflows = [
    { step: "01", label: "Discovery", desc: "We begin by understanding your business goals, target audience, and functional requirements to define a precise project scope." },
    { step: "02", label: "Planning", desc: "Our team maps out the technical architecture, choose the best data models, and schedules clear milestones for the development cycle." },
    { step: "03", label: "Design", desc: "We design high-fidelity visual layouts, building highly intuitive user journeys that put focus on readability and smooth interactivity." },
    { step: "04", label: "Development", desc: "Our engineers build your solution using modern engineering principles, writing clean, modular code designed for long-term reliability." },
    { step: "05", label: "Testing", desc: "We run rigorous automated and manual diagnostic tests to ensure your software is completely secure, performant, and bug-free." },
    { step: "06", label: "Deployment", desc: "Your application is securely launched to high-availability cloud platforms using modern continuous integration tools for zero downtime." },
    { step: "07", label: "Support", desc: "Post-launch, we continuously monitor performance, implement user feedback, and scale the application infrastructure to support your growth." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth relative overflow-hidden">

      {/* BACKGROUND AMBIENT INFRASTRUCTURE NODE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.14),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[1200px] left-0 w-[500px] h-[500px] bg-[#06B6D4]/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute top-[2200px] right-0 w-[600px] h-[600px] bg-[#2563EB]/[0.03] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[1000px] left-0 w-[700px] h-[700px] bg-[#06B6D4]/[0.02] blur-[220px] pointer-events-none" />

      {/* GRID MESH OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* MAIN TARGET MATRIX CONTROLLER */}
      <div className="relative z-10 distribution-container-layer">

        {/* SECTION 1: HERO CONTAINER */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24 sm:pt-48 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">

            {/* LEFT CONTENT CONTAINER */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex self-start items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] text-[11px] font-mono uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                Our Agency Profile
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] group">
                Engineering reliable software <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-cyan-300 to-blue-500 transition-all duration-300 group-hover:text-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                  built to scale with your business
                </span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10 font-sans">
                OnyxStack Labs is an agile software development company specializing in custom software, high-performance web development, smart AI solutions, and cloud applications. We build digital products that combine intentional design with robust production engineering to help businesses automate operations and scale with confidence.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <a
                  href="#contact-initiate"
                  onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                  className="relative overflow-hidden bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#06B6D4] hover:text-black hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
                >
                  Get In Touch
                </a>
                <a
                  href="#narrative"
                  onClick={(e) => { e.preventDefault(); document.getElementById('company-narrative')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="border border-neutral-800 bg-neutral-900/40 text-neutral-300 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5 hover:text-white hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
                >
                  Our Story
                </a>
              </div>

              {/* Stack & Capability Highlights */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-neutral-400 font-mono uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="text-[#06B6D4]">✓</span> Production-Grade Code
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#06B6D4]">✓</span> Scalable Architecture
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#06B6D4]">✓</span> End-To-End Support
                </div>
              </div>
            </div>

            {/* HERO IMAGE CONTAINER */}
            <div className="lg:col-span-5 w-full flex justify-center items-center">
              <div className="relative group w-full max-w-[560px] lg:max-w-none">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-blue-600 opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 pointer-events-none" />
                <div className="relative w-full rounded-2xl border border-neutral-800 bg-neutral-950 p-2 overflow-hidden shadow-3xl backdrop-blur-md">
                  <div className="w-full overflow-hidden rounded-xl bg-neutral-900/50 flex items-center justify-center">
                    <img
                      src={heroImage}
                      alt="OnyxStack Labs enterprise software engineering workspace and team setup"
                      className="w-full h-auto max-h-[480px] object-contain mx-auto transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-500" />
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* SECTION 2: COMPANY STORY */}
        <section id="company-narrative" className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* COMPANY STORY IMAGE */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="relative group w-full max-w-[480px] lg:max-w-none mx-auto">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#06B6D4] to-blue-600 opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 pointer-events-none" />
                <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950 p-2 overflow-hidden shadow-3xl backdrop-blur-md">
                  <div className="w-full overflow-hidden rounded-xl bg-neutral-900/30 flex items-center justify-center">
                    <img
                      src={companyStoryImage}
                      alt="The OnyxStack Labs story and agency foundation"
                      className="w-full h-auto max-h-[380px] object-contain mx-auto transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-500" />
                </div>
              </div>
            </div>

            {/* COMPANY STORY CONTENT */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4 group">
                <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Who We Are</p>
                <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white font-sans transition-all duration-300 group-hover:text-cyan-400">The story behind OnyxStack Labs</h2>
              </div>
              <div className="md:col-span-8 text-neutral-400 space-y-6 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  OnyxStack Labs was founded to bridge the gap between fast product delivery and durable product engineering. We realized that many fast-growing brands struggle with brittle technical systems because their developers relied on short-term fixes over scalable software architectures.
                </p>
                <p>
                  We built our agency to give businesses a better alternative: high-quality software craftsmanship that aligns perfectly with real commercial business objectives. Whether we are building custom React development solutions, refining business automation tools, or assembling full MERN stack solutions, we deliver systems that run smoothly from launch day and scale effortlessly as your needs grow.
                </p>
                <p>
                  Today, we act as an extended engineering team for forward-thinking companies. We work closely with scaling startups and mid-market organizations to replace operational bottlenecks with elegant, intuitive, and secure platforms.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: MISSION & VISION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* CARDS CONTAINER */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* MISSION CARD */}
              <div className="p-8 sm:p-10 rounded-2xl border border-neutral-900 bg-gradient-to-br from-neutral-950 to-neutral-900/20 relative group transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.06)] hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-8 font-mono text-sm font-bold transition-all duration-300 group-hover:bg-[#06B6D4]/20 group-hover:border-[#06B6D4]/40">M</div>
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-cyan-400">Our Mission</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    To equip growing organizations with high-quality custom software that simplifies everyday operational tasks, fosters sustainable innovation, and builds tangible, long-term commercial value.
                  </p>
                </div>
              </div>

              {/* VISION CARD */}
              <div className="p-8 sm:p-10 rounded-2xl border border-neutral-900 bg-gradient-to-br from-neutral-950 to-neutral-900/20 relative group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.06)] hover:-translate-y-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 font-mono text-sm font-bold transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-500/40">V</div>
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-blue-400">Our Vision</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    To be the world's most trusted software development partner, recognized for creating scalable, resilient digital products that set the standard for modern interface design and reliable web performance.
                  </p>
                </div>
              </div>

            </div>

            {/* MISSION VISION IMAGE */}
            <div className="lg:col-span-5 w-full">
              <div className="relative group w-full max-w-[480px] lg:max-w-none mx-auto">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600 to-[#06B6D4] opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 pointer-events-none" />
                <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950 p-2 overflow-hidden shadow-3xl backdrop-blur-md">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-neutral-900/30 flex items-center justify-center">
                    <img
                      src={missionVisionImage}
                      alt="OnyxStack Labs mission and vision roadmap"
                      className="w-full h-auto max-h-[380px] object-contain mx-auto transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-500" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: CORE VALUES */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* VALUE LIST */}
            <div className="lg:col-span-8">
              <div className="max-w-3xl mb-12 group">
                <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// What We Stand For</p>
                <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">The principles that guide our everyday decisions</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {coreValues.map((val, idx) => (
                  <div key={idx} className="p-8 rounded-xl border border-neutral-900 bg-neutral-950/40 relative group transition-all duration-300 hover:border-neutral-800 hover:shadow-[0_0_25px_rgba(6,182,212,0.05)] hover:-translate-y-0.5">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-cyan-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-3 transition-colors duration-300 group-hover:text-cyan-400">
                        <span className="text-[#06B6D4] font-bold">//</span> {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CORE VALUES SUPPORTING IMAGE */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="relative group w-full max-w-[480px] lg:max-w-none mx-auto">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-blue-600 opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 pointer-events-none" />
                <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950 p-2 overflow-hidden shadow-3xl backdrop-blur-md">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-neutral-900/30 flex items-center justify-center">
                    <img
                      src={coreValuesImage}
                      alt="OnyxStack Labs core engineering values"
                      className="w-full h-auto max-h-[460px] object-contain mx-auto transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-500" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: WHY CHOOSE ONYXSTACK LABS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16 group">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// The Agency Difference</p>
            <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">Why businesses choose us over other developers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-neutral-900/40 bg-gradient-to-b from-neutral-950 to-[#050505] relative group transition-all duration-300 hover:border-[#06B6D4]/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)] hover:-translate-y-1">
                <div className="absolute top-0 left-8 w-8 h-[2px] bg-gradient-to-r from-[#06B6D4] to-transparent group-hover:w-20 transition-all duration-500" />
                <h3 className="text-lg font-bold text-white mb-4 font-sans transition-colors duration-300 group-hover:text-[#06B6D4]">{diff.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{diff.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: TECHNOLOGIES RUNTIME ENVIRONMENT */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* GRID CONTENT */}
            <div className="lg:col-span-8">
              <div className="max-w-3xl mb-12 group">
                <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Our Core Toolkit</p>
                <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">Proven modern frameworks for reliable digital platforms</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {stackItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-xl border border-neutral-900 bg-neutral-950/80 text-left transition-all duration-300 cursor-default hover:bg-neutral-900/30 hover:border-neutral-800"
                  >
                    <div className={`transition-all duration-300 ${item.glow} rounded-xl`}>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 transition-colors duration-300 group-hover:text-neutral-400">{item.category}</p>
                      <h4 className="text-sm font-bold text-white tracking-wide font-sans transition-colors duration-300 group-hover:text-[#06B6D4]">{item.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNOLOGY STACK IMAGE */}
            <div className="lg:col-span-4">
              <div className="relative group w-full max-w-[480px] lg:max-w-none mx-auto">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600 to-[#06B6D4] opacity-20 blur-xl group-hover:opacity-40 transition-all duration-700" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 pointer-events-none" />
                <div className="relative rounded-2xl border border-neutral-900 bg-neutral-950 p-2 overflow-hidden shadow-3xl backdrop-blur-md">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-neutral-900/30 flex items-center justify-center">
                    <img
                      src={technologyStackImage}
                      alt="OnyxStack Labs modern technology stack ecosystem"
                      className="w-full h-auto max-h-[460px] object-contain mx-auto transform transition-transform duration-1000 ease-out group-hover:scale-[1.025] group-hover:-translate-y-1"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-500" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 7: DEVELOPMENT PROCESS MAP */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-16 group">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// How We Work</p>
            <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">Our clean, predictable software development lifecycle</h2>
          </div>

          {/* TIMELINE FLEXIBILITY WORKFLOW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
            {workflows.map((flow, idx) => (
              <div key={idx} className="relative group transition-all duration-300 hover:-translate-y-1 p-6 rounded-2xl border border-neutral-950 bg-neutral-950/20 hover:bg-neutral-900/10 hover:border-neutral-900/60">
                <div className="text-4xl font-black font-mono text-neutral-800 mb-4 tracking-tighter transition-all duration-500 group-hover:text-[#06B6D4] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  {flow.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-sans transition-colors duration-300 group-hover:text-cyan-300">{flow.label}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{flow.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7.5: RELATED RESOURCES CROSS-LINKING */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="max-w-3xl mb-12 group">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3">// Explore Further</p>
            <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">Related resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateToNode('/services'); }}
              className="group/link p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 hover:border-[#06B6D4]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover/link:text-[#06B6D4] transition-colors duration-300">What We Build</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Explore the specific services our engineering team delivers.</p>
            </a>
            <a
              href="/careers"
              onClick={(e) => { e.preventDefault(); navigateToNode('/careers'); }}
              className="group/link p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 hover:border-[#06B6D4]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover/link:text-[#06B6D4] transition-colors duration-300">Join Our Team</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">See open roles and what it's like to build here full-time.</p>
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateToNode('/contact'); }}
              className="group/link p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 hover:border-[#06B6D4]/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover/link:text-[#06B6D4] transition-colors duration-300">Start a Conversation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Tell our team about your project and get a scoping call.</p>
            </a>
          </div>
        </section>

        {/* SECTION 8: FINAL SYSTEM CONSOLE CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/60">
          <div className="relative p-10 sm:p-20 rounded-3xl border border-neutral-900 bg-neutral-950 overflow-hidden text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[360px] group">

            {/* FIXED BACKGROUND SUPPORTING IMAGE */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
              <img
                src={finalCtaImage}
                alt="OnyxStack Labs engineering contact section background"
                className="w-full h-full object-cover opacity-20 mix-blend-luminosity transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.08),transparent_60%)] group-hover:opacity-90 transition-opacity duration-700" />
            </div>

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-mono uppercase tracking-widest mb-6">
                Let's Build Something Great
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-5 transition-all duration-300 group-hover:text-shadow-[0_0_30px_rgba(6,182,212,0.25)] leading-[1.15]">
                Let's turn your product ideas into real, functional code
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-2xl">
                Tell us about your project requirements. Our engineering team is ready to map out your digital solution and help build your next modern web applications.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <a
                href="#contact-terminal"
                onClick={(e) => { e.preventDefault(); navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="inline-block bg-white text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#06B6D4] hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
              >
                Talk to our Team
              </a>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

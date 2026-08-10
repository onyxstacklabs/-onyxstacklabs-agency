import React, { useState, useEffect } from 'react';
import { useSEO, buildFaqSchema } from '../utils/useSEO';

export default function Pricing({ currentPath, navigateToNode }) {
  const [activeFaq, setActiveFaq] = useState(null);

  // Synchronize scroll on initial mount phase
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Section 2 Data: Strategic Engagement Framework Tiers
  const pricingTiers = [
    {
      name: "MVP Starter",
      tagline: "Accelerated Proof-of-Concept",
      investment: "Custom Scoping",
      desc: "Engineered specifically for startups and emerging ventures needing to establish early product validation with high structural performance parameters.",
      features: [
        "Dedicated UI/UX Design Prototypes",
        "Interactive Component Architecture",
        "Serverless Node Provisioning",
        "Automated Unit Testing",
        "Full Git Ownership Handover"
      ],
      cta: "Initiate Validation",
      popular: false,
      accent: "border-neutral-800 hover:border-cyan-900/50"
    },
    {
      name: "Core Business",
      tagline: "Optimized Custom Platforms",
      investment: "Tailored Growth",
      desc: "Designed for expanding organizations looking to completely decommission costly off-the-shelf software bottlenecks for bespoke cloud ecosystems.",
      features: [
        "Advanced Multi-Tenant Architecture",
        "Interactive Real-Time Telemetry",
        "High-Concurrency Database Layer",
        "Cognitive LLM/AI Processing",
        "30 Days Deployment Monitoring"
      ],
      cta: "Schedule Blueprint",
      popular: true,
      accent: "border-[#06B6D4]/40 shadow-[0_0_40px_rgba(6,182,212,0.08)] bg-gradient-to-b from-[#06B6D4]/5 to-transparent"
    },
    {
      name: "Enterprise Architecture",
      tagline: "Mission-Critical Systems",
      investment: "Bespoke Contracts",
      desc: "Constructed for high-density corporate environments requiring strict horizontal scaling parameters and multi-facility compliance structures.",
      features: [
        "Air-Gapped Private Cloud",
        "Multi-Tier Cryptographic Identity",
        "Zero-Downtime Multi-Region",
        "Legacy Systems & API Bridging",
        "SLA-Backed Dedicated Support"
      ],
      cta: "Establish Channels",
      popular: false,
      accent: "border-neutral-800 hover:border-purple-900/50"
    }
  ];

  const featureTable = [
    { feature: "Cloud Architecture", starter: "Standard", core: "Advanced", enterprise: "Private/Hybrid" },
    { feature: "AI Integration", starter: "Basic", core: "Advanced", enterprise: "Custom Models" },
    { feature: "Support SLA", starter: "Email", core: "Priority", enterprise: "Dedicated" },
    { feature: "Scalability", starter: "Regional", core: "Global", enterprise: "Multi-Region" },
  ];

  const baselineInclusions = [
    { phase: "Discovery", info: "We draft end-to-end data schema configurations and system-dependency graphs." },
    { phase: "UI/UX Design", info: "Producing scalable B2B mockups that follow a clean, accessible component pattern." },
    { phase: "Development", info: "Writing isolated React architectures optimized for rapid initial paint intervals." },
    { phase: "Rigorous Testing", info: "Exposing variables to strict automated integration tests and regression cycles." },
    { phase: "Edge Deployment", info: "Distributing application bundles globally onto robust serverless content delivery systems." },
    { phase: "Documentation", info: "Compiling exhaustive architectural runbooks for simple internal engineering transitions." }
  ];

  const faqCatalog = [
    {
      q: "Why does OnyxStack Labs operate on a custom scoping model?",
      a: "Bespoke corporate technology products carry unique architecture rules. Fixed flat rates incentivize structural shortcuts. Custom scoping ensures you pay strictly for the targeted computation frameworks your operation requires."
    },
    {
      q: "What variables influence the final project investment?",
      a: "Primary variables include total data ingestion points, third-party API dependencies, real-time sync frequencies, security tier specifications, and interactive dashboard scope."
    },
    {
      q: "Do we retain absolute legal ownership of the code?",
      a: "Yes. Upon deployment contract execution, 100% of the repository intellectual property rights translate directly to your entity under secure ownership terms."
    },
    {
      q: "How does your system isolate internal data records?",
      a: "We insulate applications using strict parameter sanitization, role-based JWT validation nodes, and isolated backend server partitions to enforce absolute containment zones."
    }
  ];

  const triggerConsultation = () => {
    navigateToNode('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Unique per-page SEO — title, description, canonical, and FAQ schema
  // built from this page's own real faqCatalog above.
  useSEO({
    title: 'Pricing & Engagement Models | OnyxStack Labs',
    description: 'Transparent custom software pricing — MVP Starter, Core Business, and Enterprise Architecture tiers. Get a tailored scoping blueprint for your project.',
    path: '/pricing',
    faqSchema: buildFaqSchema(faqCatalog)
  });

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">
      
      {/* AMBIENT RADIAL GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10 execution-pricing-scope">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-mono uppercase tracking-widest mb-6">
            Enterprise Engagement Models
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] px-2">
            Transparent Value. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-500">
              Infinite Scale.
            </span>
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-6 px-2">
            We author high-performance software tailored to your operational requirements. Review our engagement frameworks and request a customized scoping blueprint.
          </p>
        </section>

        {/* PRICING CARDS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, tIdx) => (
              <div 
                key={tIdx} 
                className={`group p-6 md:p-8 rounded-2xl border bg-neutral-950/50 flex flex-col justify-between relative transition-all duration-500 hover:-translate-y-2 ${tier.accent}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#06B6D4] text-black text-[10px] font-mono font-bold uppercase tracking-widest shadow-lg shadow-[#06B6D4]/20 whitespace-nowrap">
                    Recommended
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-6">{tier.tagline}</p>
                  <div className="text-2xl font-bold text-white mb-6 border-b border-neutral-800 pb-6">{tier.investment}</div>
                  <p className="text-sm text-neutral-400 mb-8 leading-relaxed">{tier.desc}</p>
                  <div className="space-y-4 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs text-neutral-300">
                        <svg className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={triggerConsultation}
                  className={`w-full py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 ${tier.popular ? 'bg-[#06B6D4] text-black hover:bg-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON TABLE - MOBILE OPTIMIZED FIXED */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Feature Matrix</h2>
          <div className="overflow-x-auto rounded-xl border border-neutral-900 bg-neutral-950/20 scrollbar-thin scrollbar-thumb-neutral-800">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="text-neutral-500 text-[10px] font-mono uppercase border-b border-neutral-800 bg-neutral-950/40">
                  <th className="p-4 pl-6">Feature</th>
                  <th className="p-4">Starter</th>
                  <th className="p-4 text-[#06B6D4]">Core</th>
                  <th className="p-4 pr-6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-300">
                {featureTable.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-900/50 hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4 pl-6 font-bold text-white whitespace-nowrap">{row.feature}</td>
                    <td className="p-4 whitespace-nowrap">{row.starter}</td>
                    <td className="p-4 text-[#06B6D4] font-semibold whitespace-nowrap">{row.core}</td>
                    <td className="p-4 pr-6 whitespace-nowrap">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PROTOCOL SUITE */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Production Protocol Suite</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {baselineInclusions.map((inc, iIdx) => (
              <div key={iIdx} className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/50 hover:border-neutral-700 transition-colors">
                <span className="text-[#06B6D4] font-mono text-xs block mb-2">0{iIdx + 1}.</span>
                <h3 className="font-bold text-white mb-2">{inc.phase}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{inc.info}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-neutral-900">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Frequently Asked Queries</h2>
          <div className="space-y-4">
            {faqCatalog.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-900 bg-neutral-950/40 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between font-bold text-neutral-200 text-sm md:text-base gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#06B6D4] shrink-0 font-mono text-xl">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-neutral-400 leading-relaxed border-t border-neutral-900/50 pt-4 bg-neutral-950/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RELATED RESOURCES CROSS-LINKING */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-900">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Related resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateToNode('/services'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/50 hover:border-[#06B6D4]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors duration-300">Explore Our Services</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">See exactly what's included in each engagement tier, in technical detail.</p>
            </a>
            <a
              href="/tools/roi-calculator"
              onClick={(e) => { e.preventDefault(); navigateToNode('/tools/roi-calculator'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/50 hover:border-[#06B6D4]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors duration-300">Calculate Your ROI</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Free tool to estimate the return on investing in custom software.</p>
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateToNode('/contact'); }}
              className="group p-6 rounded-2xl border border-neutral-900 bg-neutral-950/50 hover:border-[#06B6D4]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors duration-300">Talk to an Architect</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">Get a scoping blueprint tailored specifically to your project.</p>
            </a>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="p-8 md:p-12 rounded-3xl border border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-950 text-center relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Engineer Your Future?</h2>
               <p className="text-sm md:text-base text-neutral-400 mb-8 max-w-xl mx-auto px-2">Connect directly with our lead solution engineers to map out your feature goals, data models, and deployment timelines.</p>
               <button
                  onClick={triggerConsultation}
                  className="bg-white hover:bg-[#06B6D4] text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full sm:w-auto"
                >
                  Establish Connection
                </button>
             </div>
          </div>
        </section>

      </div>

    </div>
  );
}

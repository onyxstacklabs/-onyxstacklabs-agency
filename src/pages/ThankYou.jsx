import React, { useEffect } from 'react';
import { useSEO } from '../utils/useSEO';

export default function ThankYou({ currentPath, navigateToNode }) {

  // Unique per-page SEO for /thank-you — noIndex: true because this page
  // is only reachable after a form submission, has thin/duplicate content,
  // and shouldn't compete for crawl budget or appear in search results.
  useSEO({
    title: 'Thank You | OnyxStack Labs',
    description: 'Thank you for contacting OnyxStack Labs. Your inquiry has been received successfully. Our team will contact you shortly.',
    path: '/thank-you',
    noIndex: true
  });

  // Explicit subview scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section: Operational Roadmap
  const nextSteps = [
    {
      title: "Request Received",
      desc: "Our architectural engineering team has successfully ingested your project data."
    },
    {
      title: "Technical Review",
      desc: "Senior specialists screen your scope to ensure technical feasibility and optimal architecture."
    },
    {
      title: "Consultation",
      desc: "We coordinate a high-fidelity sync session to deep-dive into your operational parameters."
    },
    {
      title: "Launch Phase",
      desc: "We deliver a comprehensive roadmap and move into agile development cycles."
    }
  ];

  // Section: Enterprise Values
  const whyUs = [
    { title: "Enterprise Architecture", desc: "Scalable systems built for high-throughput global environments." },
    { title: "Modern UI/UX", desc: "Premium interfaces designed for intuitive user experiences." },
    { title: "Fast Delivery", desc: "Optimized pipelines ensuring sub-second deployment cycles." }
  ];

  // Section: Metrics
  const metrics = [
    { label: "Projects Delivered", value: "150+" },
    { label: "Global Clients", value: "85+" },
    { label: "Systems Scaled", value: "200+" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth relative overflow-hidden">
      
      {/* VISUAL BACKGROUND AMBIENT INFRASTRUCTURE NODE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1200px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-blue-600/[0.02] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-[#06B6D4]/[0.015] blur-[180px] pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* SECTION 1: PREMIUM HERO */}
        <section className="flex flex-col items-center text-center pt-20 pb-16">
          <div className="mb-8 relative group">
            <div className="absolute inset-0 rounded-full bg-[#06B6D4]/20 blur-2xl transition-all duration-500" />
            <div className="w-20 h-20 rounded-full bg-neutral-900 border border-[#06B6D4]/30 flex items-center justify-center relative z-10 text-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-white mb-6">
            Inquiry Received.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10">
            Thank you for trusting OnyxStack Labs. Our team is currently reviewing your project requirements and will reach out shortly to discuss your next steps.
          </p>
        </section>

        {/* SECTION 2: CONFIRMATION CARD */}
        <section className="mb-20">
          <div className="max-w-2xl mx-auto p-8 rounded-3xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent pointer-events-none" />
            <div className="relative z-10 space-y-6 text-center">
              <h2 className="text-xl font-bold text-white">Estimated Response Time</h2>
              <div className="text-4xl font-mono font-bold text-[#06B6D4]">24 - 48 Hours</div>
              <p className="text-neutral-400 text-sm">
                Our team operates Monday through Friday. If your request is urgent, please feel free to reach out via email directly.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT HAPPENS NEXT */}
        <section className="py-20 border-t border-neutral-900">
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mb-3 text-center">// Operational Map</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">The Path Forward</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nextSteps.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl border border-neutral-900 bg-neutral-950/50 group hover:border-[#06B6D4]/30 transition-all duration-300">
                <div className="text-[#06B6D4] font-mono text-sm mb-4">0{idx + 1}</div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WHY CHOOSE US */}
        <section className="py-20 border-t border-neutral-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whyUs.map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-neutral-900/20 border border-neutral-800 hover:border-neutral-700 transition-all">
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: TRUST METRICS */}
        <section className="py-20 border-t border-neutral-900">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            {metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{m.value}</div>
                <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: FINAL CTA */}
        <section className="py-20 border-t border-neutral-900 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Ready to explore more?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigateToNode && navigateToNode('/portfolio')}
              className="bg-white hover:bg-neutral-200 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              View Portfolio
            </button>
            <button 
              onClick={() => navigateToNode && navigateToNode('/')}
              className="bg-neutral-900 border border-neutral-700 hover:border-[#06B6D4] text-white px-8 py-4 rounded-full font-bold transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

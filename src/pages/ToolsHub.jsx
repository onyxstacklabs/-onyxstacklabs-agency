import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchCheck } from 'lucide-react';
import { toolsConfig as rawToolsConfig } from '../config/toolsConfig';
import { useSEO } from '../utils/useSEO';

export default function ToolsHub({ currentPath, navigateToNode }) {

  // Unique per-page SEO — title, description, and canonical for /tools.
  useSEO({
    title: 'Free Tools | ROI, Cost & Project Estimators - OnyxStack Labs',
    description: 'Free, no-signup tools to estimate software costs, calculate ROI, check site speed, and plan your next build — built by OnyxStack Labs.',
    path: '/tools'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerConsultation = () => {
    navigateToNode('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Ensure AI Website Audit Tool is always present in grid list
  const hasAuditTool = rawToolsConfig.some((t) => t.slug === 'ai-website-audit');
  const toolsConfig = hasAuditTool
    ? rawToolsConfig
    : [
        ...rawToolsConfig,
        {
          slug: 'ai-website-audit',
          name: 'AI Website Audit Tool',
          tagline: "Audit your website's SEO, performance, accessibility, AI readiness and technical health.",
          status: 'live',
          icon: SearchCheck,
        },
      ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">

      {/* AMBIENT RADIAL GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10">

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-mono uppercase tracking-widest mb-6">
            Free Tools
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] px-2">
            Tools Built To <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-500">
              Save You Time.
            </span>
          </h1>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed px-2">
            Free, no-signup utilities to help you estimate costs, measure performance, and plan your next build.
          </p>
        </section>

        {/* TOOLS GRID */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsConfig.map((tool) => {
              const Icon = tool.icon;
              const isLive = tool.status === 'live';

              const cardBody = (
                <>
                  <div className="w-11 h-11 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#06B6D4]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">{tool.tagline}</p>
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isLive ? 'text-[#06B6D4]' : 'text-neutral-600'}`}>
                    {isLive ? 'Open Tool →' : 'Coming Soon'}
                  </span>
                </>
              );

              return isLive ? (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className="group p-6 md:p-8 rounded-2xl border border-neutral-800 bg-neutral-950/50 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-[#06B6D4]/50"
                >
                  {cardBody}
                </Link>
              ) : (
                <div
                  key={tool.slug}
                  className="p-6 md:p-8 rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/20 flex flex-col opacity-60 cursor-not-allowed"
                >
                  {cardBody}
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="p-8 md:p-12 rounded-3xl border border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-950 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Something More Custom?</h2>
              <p className="text-sm md:text-base text-neutral-400 mb-8 max-w-xl mx-auto px-2">
                These tools give you a quick estimate. For a real plan tailored to your business, talk to our team directly.
              </p>
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

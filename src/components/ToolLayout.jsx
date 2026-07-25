import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ToolLayout({ currentPath, navigateToNode, title, tagline, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Sets a unique <title> and meta description per tool, and restores the
  // site-wide defaults on unmount so navigating to a non-tool page doesn't
  // carry a stale tool title with it.
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription ? metaDescription.getAttribute('content') : null;

    document.title = `${title} | Free Tool by OnyxStack Labs`;
    if (metaDescription) {
      metaDescription.setAttribute('content', tagline);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute('content', previousDescription);
      }
    };
  }, [title, tagline]);

  const triggerConsultation = () => {
    navigateToNode('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[750px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none z-0" />

      <Navbar
        currentPath={currentPath}
        activeSection=""
        navigateToNode={navigateToNode}
        siteConfig={siteConfig}
      />

      <div className="relative z-10">

        <section className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-10 text-center">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#06B6D4] transition-colors mb-8"
          >
            ← All Tools
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.15]">
            {title}
          </h1>
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            {tagline}
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-16">
          <div className="p-6 md:p-10 rounded-2xl border border-neutral-800 bg-neutral-950/50">
            {children}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-12 pb-16">
          <div className="p-8 md:p-10 rounded-3xl border border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-950 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Want a solution built specifically for you?</h2>
            <p className="text-sm text-neutral-400 mb-6 max-w-lg mx-auto">
              This is a quick estimate. Let's talk about what a custom build would actually look like for your business.
            </p>
            <button
              onClick={triggerConsultation}
              className="bg-white hover:bg-[#06B6D4] text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full sm:w-auto"
            >
              Establish Connection
            </button>
          </div>
        </section>

      </div>

      <Footer siteConfig={siteConfig} />
    </div>
  );
}

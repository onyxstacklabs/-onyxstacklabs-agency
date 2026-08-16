import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import Navbar from './Navbar';
import Footer from './Footer';
import { trackEvent } from '../utils/analytics';
import { useSEO } from '../utils/useSEO';

export default function ToolLayout({ currentPath, navigateToNode, title, tagline, shareText, faqSchema, children }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  useSEO({
    title: `${title} | Free Tool by OnyxStack Labs`,
    description: tagline,
    path: currentPath,
    faqSchema: faqSchema || null,
  });

  // Shares the tool (and its live result, if the tool passed one via
  // shareText) using the native share sheet on supported devices, falling
  // back to copying a link + message to the clipboard everywhere else.
  // This is the mechanism that lets a visitor's result travel to their
  // friends/network, driving referral traffic and backlinks to the site.
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const text = shareText || `${title} — ${tagline}`;

    trackEvent('tool_share', { tool: title, method: navigator.share ? 'native' : 'clipboard' });

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // User cancelled the share sheet — no action needed.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable — silently ignore rather than break the UI.
    }
  };

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
          <p className="text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed mb-6">
            {tagline}
          </p>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold border border-neutral-800 text-neutral-300 hover:border-[#06B6D4]/50 hover:text-[#06B6D4] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a4 4 0 100-2.684m0 2.684a4 4 0 000 2.684m0-2.684l6.632-3.316m0 0a4 4 0 105.368-5.368 4 4 0 00-5.368 5.368zm0 8a4 4 0 105.368 5.368 4 4 0 00-5.368-5.368z" />
            </svg>
            {copied ? 'Link Copied!' : 'Share This Tool'}
          </button>
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

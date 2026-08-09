// Footer.jsx
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// ANALYTICS: tracks outbound engagement (email, phone, WhatsApp, social, featured badges)
import { trackEvent } from '../utils/analytics';

// STATIC LINK MATRIX FOR OPTIMAL INTERNAL LINK EQUITY (GSC INDEXING ENGINE)
const QUICK_LINKS = [
  { label: 'Home', target: '/' },
  { label: 'Services Hub', target: '/services' },
  { label: 'Portfolio Showcase', target: '/portfolio' },
  { label: 'About Agency', target: '/about' },
  { label: 'Contact Us', target: '/contact' }
];

const SERVICES_LINKS = [
  { label: 'Web & App Development', target: '/services#web-dev' },
  { label: 'AI Automation & Bots', target: '/services#ai-automation' },
  { label: 'Cloud Infrastructure & DevOps', target: '/services#devops' },
  { label: 'UI/UX & Product Design', target: '/services#ui-ux' },
  { label: 'Custom Enterprise Software', target: '/services#enterprise' }
];

const RESOURCE_LINKS = [
  { label: 'Client Projects', target: '/projects' },
  { label: 'Industry Solutions', target: '/industries' },
  { label: 'Transparent Pricing', target: '/pricing' },
  { label: 'Career Opportunities', target: '/careers' },
  { label: 'Insights & Tech Blog', target: '/blog' }
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', target: '/privacy-policy' },
  { label: 'Terms & Conditions', target: '/terms-conditions' },
  { label: 'Cookies Policy', target: '/cookies-policy' }
];

// Complete Social Media Nodes Ecosystem Matrix
const SOCIAL_NODES = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/923445800630',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    url: 'https://github.com/onyxstacklabs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/onyxstacklabs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/OnyxStackLabs',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@onyxstacklabs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/onyxstacklabs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/onyxstacklabs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
];

// Third-party recognition / featured-on badges
const FEATURED_BADGES = [
  {
    name: 'Product Hunt',
    href: 'https://www.producthunt.com/products/onyxstack-labs',
    src: 'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1198402&theme=light',
    alt: 'OnyxStack Labs - Building Smarter Solutions with AI & Custom Software | Product Hunt',
    width: 250,
    height: 54
  },
  {
    name: 'LaunchBuff',
    href: 'https://launchbuff.com',
    src: 'https://launchbuff.com/badge-featured-dark.svg',
    alt: 'Featured on LaunchBuff',
    width: 256,
    height: 80,
    title: 'Featured on LaunchBuff'
  }
];

function Footer({ siteConfig }) {
  const email = siteConfig?.contactEmail || 'info@onyxstacklabs.com';
  const website = siteConfig?.website || 'www.onyxstacklabs.com';
  const phone = siteConfig?.contactPhone || '+92 344 5800630';

  // Shared ultra-premium glassmorphism card matrix system
  const cardStyle = "p-6 rounded-2xl border border-[#1E2433] bg-[#090D16]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 ease-out hover:border-[#06B6D4]/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15),inset_0_1px_1px_rgba(6,182,212,0.2)] hover:-translate-y-1 active:scale-[0.99] active:border-cyan-400 active:shadow-[0_0_35px_rgba(34,211,238,0.3)] flex flex-col justify-between";

  return (
    <footer
      className="relative border-t border-[#161B26] bg-[#04060A] pt-20 pb-12 px-6 md:px-12 z-10 overflow-hidden text-slate-200 antialiased font-sans select-none"
      aria-label="Site Footer"
    >
      {/* High-fidelity architectural blueprint background grid lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0c_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E293B]/60 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Corporate luxury ambient radial flares */}
      <div
        className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] blur-[110px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-16 items-stretch">

          {/* BRAND TOWER CARD */}
          <div className={`${cardStyle} sm:col-span-2 lg:col-span-4`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shadow-[0_0_14px_#06B6D4]" aria-hidden="true" />
                <span className="text-sm font-black tracking-[0.2em] text-white uppercase font-mono">
                  {siteConfig?.agencyName || 'OnyxStack Labs'}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-[0.25em] font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                  Enterprise Node
                </p>
                <p className="text-[13px] text-slate-400 leading-relaxed font-light">
                  Engineering high-end modular web applications, optimized cloud infrastructure, and bespoke AI automations.
                </p>
              </div>
            </div>

            {/* Quick Contact Micro-Block */}
            <div className="pt-6 border-t border-[#1E2433] space-y-2">
              <a
                href={`mailto:${email}`}
                onClick={() => trackEvent('email_click', { link_location: 'footer', email_address: email })}
                className="text-[12px] text-slate-300 hover:text-[#06B6D4] font-mono block truncate transition-colors"
              >
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                onClick={() => trackEvent('phone_click', { link_location: 'footer' })}
                className="text-[12px] text-slate-300 hover:text-[#06B6D4] font-mono block transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className={`${cardStyle} lg:col-span-2`} aria-label="Navigation">
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono font-bold border-b border-[#1E2433] pb-2">
                Navigation
              </h3>
              <ul className="space-y-3.5 text-[13px] text-slate-400">
                {QUICK_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.target}
                      className="inline-block hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out font-medium hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* SERVICES LINK MATRIX */}
          <nav className={`${cardStyle} lg:col-span-2`} aria-label="Services">
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono font-bold border-b border-[#1E2433] pb-2">
                Services
              </h3>
              <ul className="space-y-3.5 text-[13px] text-slate-400">
                {SERVICES_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.target}
                      className="inline-block hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out font-medium hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* SYSTEM RESOURCES MATRIX */}
          <nav className={`${cardStyle} lg:col-span-2`} aria-label="Resources">
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono font-bold border-b border-[#1E2433] pb-2">
                Resources
              </h3>
              <ul className="space-y-3.5 text-[13px] text-slate-400">
                {RESOURCE_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.target}
                      className="inline-block hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out font-medium hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* LEGAL POLICY NODES */}
          <nav className={`${cardStyle} lg:col-span-2`} aria-label="Legal">
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-mono font-bold border-b border-[#1E2433] pb-2">
                Legal
              </h3>
              <ul className="space-y-3.5 text-[13px] text-slate-400">
                {LEGAL_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.target}
                      className="inline-block hover:text-white hover:translate-x-1.5 transition-all duration-300 ease-out font-medium hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

        </div>

        {/* FEATURED ON / THIRD-PARTY RECOGNITION STRIP */}
        <div className="border-t border-[#161B26] pt-10 pb-2 flex flex-col items-center gap-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono font-bold">
            Featured On
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {FEATURED_BADGES.map((badge) => (
              <a
                key={badge.name}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                title={badge.title || badge.name}
                onClick={() => trackEvent('outbound_click', { link_location: 'footer_badge', destination: badge.name })}
                className="opacity-90 hover:opacity-100 transition-opacity duration-300 ease-out"
              >
                <img
                  src={badge.src}
                  alt={badge.alt}
                  width={badge.width}
                  height={badge.height}
                  style={{ width: `${badge.width}px`, height: `${badge.height}px` }}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM UTILITY MATRIX ENGINE WITH SOCIAL ICONS */}
        <div className="border-t border-[#161B26] mt-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5" aria-label="Social Media Nodes">
            {SOCIAL_NODES.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { link_location: 'footer', platform: social.name })}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[#1E2433] bg-[#090D16]/80 text-slate-400 hover:text-[#06B6D4] hover:border-[#06B6D4]/50 hover:scale-[1.08] hover:shadow-[0_0_18px_rgba(6,182,212,0.25)] active:scale-95 transition-all duration-300 ease-out"
                aria-label={`Official ${social.name} Link`}
              >
                {social.icon}
              </a>
            ))}
          </nav>
          
          <div className="text-xs text-slate-500 tracking-wider text-center md:text-right font-mono font-medium">
            © 2026 OnyxStack Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);

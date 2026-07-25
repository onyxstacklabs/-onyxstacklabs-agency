import React, { useEffect, useState } from 'react';

export default function Navbar({ currentPath, activeSection, navigateToNode, siteConfig }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile drawer automatically on viewport changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle elevation once the page has scrolled, for a premium sticky feel
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Handles dynamic state synchronization for in-page anchors vs absolute page jumps
  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target.startsWith('#')) {
      const elementId = target.substring(1);

      if (currentPath === '/') {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Safe programmatic deferred routing anchor evaluation
        navigateToNode('/');
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 250);
      }
    } else {
      navigateToNode(target);
    }
  };

  const navLinks = [
    { label: "Home", target: "/", type: "absolute", sectionKey: null },
    { label: "Services", target: "#services", type: "anchor", sectionKey: "services" },
    { label: "Portfolio", target: "#portfolio", type: "anchor", sectionKey: "portfolio" },
    { label: "Tools", target: "/tools", type: "absolute", sectionKey: null },
    { label: "About", target: "/about", type: "absolute", sectionKey: null },
    { label: "Contact", target: "/contact", type: "absolute", sectionKey: null }
  ];

  const isLinkActive = (link) =>
    link.type === 'anchor'
      ? activeSection === link.sectionKey && currentPath === '/'
      : currentPath === link.target;

  return (
    <nav
      className={`sticky top-0 z-50 px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0A0E17]/80 border-b border-[#1E2430] shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'py-5 bg-[#0A0E17]/40 border-b border-transparent backdrop-blur-md'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* BRAND IDENTITY LINK NODE */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] rounded-md p-1 z-50"
          aria-label={`${siteConfig?.agencyName || 'OnyxStack Labs'} Homepage`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] shadow-[0_0_12px_rgba(198,161,91,0.6)] group-hover:scale-110 transition-transform duration-300" />
          <span className="text-base font-semibold tracking-wide text-white">
            OnyxStack<span className="text-[#C6A15B] font-medium">Labs</span>
          </span>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-9 text-[13px] font-medium text-[#9BA1AF]">
          {navLinks.map((link, idx) => {
            const isActive = isLinkActive(link);
            return (
              <a
                key={idx}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`relative py-1 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white ${
                  isActive ? 'text-white' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#C6A15B] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>

        {/* ACTIONS AND INTERACTION INDICATORS */}
        <div className="flex items-center gap-4">
          <div
            className="hidden lg:flex items-center gap-2 bg-[#11151F]/60 border border-[#1E2430] px-3 py-1.5 rounded-full"
            aria-label="Availability status"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FB89A] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7FB89A]" />
            </span>
            <span className="text-[11px] tracking-wide text-[#9BA1AF]">Open for new partnerships</span>
          </div>

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            className={`hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E17] ${
              currentPath === '/contact'
                ? 'bg-[#C6A15B] text-[#0A0E17] shadow-[0_0_16px_rgba(198,161,91,0.35)]'
                : 'bg-[#ECE8DE] text-[#0A0E17] hover:bg-[#C6A15B] hover:shadow-[0_0_16px_rgba(198,161,91,0.3)]'
            }`}
          >
            Start Project
          </a>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg border border-[#1E2430] bg-[#11151F]/60 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] z-50"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`block w-4 h-0.5 bg-current rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-current rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN NAVIGATION PANEL */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
          mobileMenuOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0A0E17]/95 backdrop-blur-xl border-b border-[#1E2430] px-6 py-6 flex flex-col gap-1 shadow-2xl shadow-black/40">
          {navLinks.map((link, idx) => {
            const isActive = isLinkActive(link);
            return (
              <a
                key={idx}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className={`text-sm font-medium py-3.5 border-b border-[#1E2430]/60 transition-colors ${
                  isActive ? 'text-[#C6A15B]' : 'text-[#C7CAD4] hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold tracking-wide bg-[#ECE8DE] text-[#0A0E17] hover:bg-[#C6A15B] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
          >
            Start Project
          </a>

          <div className="flex items-center gap-2 pt-5" aria-label="Availability status">
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FB89A] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7FB89A]" />
            </span>
            <span className="text-[11px] tracking-wide text-[#6F7688]">Open for new partnerships</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

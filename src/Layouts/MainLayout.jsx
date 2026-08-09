import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';
import { trackEvent } from '../utils/analytics';

function WhatsAppButton() {
  const phoneNumber = siteConfig?.whatsappNumber || '923445800630';
  const prefilledMessage = encodeURIComponent(
    "Hi OnyxStack Labs, I'd like to discuss a project."
  );

  const handleClick = () => {
    trackEvent('whatsapp_click', { link_location: 'floating_button' });
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${prefilledMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:scale-110 hover:shadow-[0_10px_30px_rgba(37,211,102,0.5)] active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 text-white"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15h-.003a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.24.25-.41.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.3-.23.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
      </svg>
    </a>
  );
}

export default function MainLayout({ currentPath, activeSection, navigateToNode }) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-x-hidden antialiased selection:bg-[#06B6D4]/30 selection:text-white">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#06B6D4] focus:text-black focus:font-semibold focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" aria-hidden="true" />

      {/* Global Navbar */}
      <Navbar
        currentPath={currentPath}
        activeSection={activeSection}
        navigateToNode={navigateToNode}
        siteConfig={siteConfig}
      />

      {/* Main Content Area with Accessibility Anchor */}
      <main id="main-content" tabIndex={-1} className="flex-grow w-full relative z-10 focus:outline-none">
        <Outlet context={{ currentPath, activeSection, navigateToNode }} />
      </main>

      {/* Global Footer with full navigation state */}
      <Footer 
        siteConfig={siteConfig} 
        currentPath={currentPath} 
        navigateToNode={navigateToNode} 
      />

      <WhatsAppButton />
    </div>
  );
}

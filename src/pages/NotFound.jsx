import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';

/**
 * NotFound
 * Premium, enterprise-grade 404 error experience engineered with fluid ambient meshes,
 * micro-interactions, complete keyboard navigation accessibility, and clean SEO handling.
 */
export default function NotFound({ currentPath, navigateToNode }) {
  let navigate;
  let location;
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (e) {
    // Fallback if component is rendered outside standard React Router provider
    navigate = null;
    location = null;
  }

  const resolvedPath = currentPath || (location ? location.pathname : '/404');

  const handleNavigation = (path) => {
    if (navigateToNode) {
      navigateToNode(path);
    } else if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  useSEO({
    title: '404 Page Not Found | OnyxStack Labs',
    description: "The page you're looking for doesn't exist or may have been moved. Return to OnyxStack Labs' homepage to keep exploring.",
    path: resolvedPath,
    noIndex: true,
  });

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden z-10 select-none">
      
      {/* Background Vector Ambient Glow Matrix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#00f2fe]/10 to-[#00e676]/5 blur-[120px] rounded-full pointer-events-none opacity-60 mix-blend-screen" aria-hidden="true" />
      
      {/* Visual Identity Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_80%)] pointer-events-none" aria-hidden="true" />

      <div className="max-w-2xl w-full flex flex-col items-center relative z-20 space-y-8 animate-fade-in">
        
        {/* Error Code Identity Block */}
        <div className="relative group">
          <h1 className="text-[9rem] sm:text-[12rem] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-700/40 select-none">
            404
          </h1>
          {/* Cyber Scanline Structural Line Decoupler */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent shadow-[0_0_12px_#00f2fe]" aria-hidden="true" />
        </div>

        {/* Messaging Hierarchy */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase sm:tracking-widest">
            System Node Disconnected
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Action Vector Layout Node */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
          
          {/* Primary Directive: Return to Home Node */}
          <button
            onClick={() => handleNavigation('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-semibold text-sm rounded-lg shadow-[0_4px_20px_rgba(0,242,254,0.15)] hover:shadow-[0_4px_25px_rgba(0,242,254,0.3)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f2fe] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Return to core home dashboard application interface"
          >
            Return to Home
          </button>

          {/* Secondary Directive: Communication Ingress Tunnel */}
          <button
            onClick={() => handleNavigation('/contact')}
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80 text-white font-medium text-sm rounded-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Contact support engineering matrix pipeline"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

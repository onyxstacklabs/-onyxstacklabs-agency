// src/App.jsx
import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// LAYOUT SYSTEM IMPORT 
import MainLayout from './Layouts/MainLayout.jsx';

// ANALYTICS: fires a GA4 pageview on every client-side route change,
// since this SPA never triggers a native browser page load after the
// first visit.
import { trackPageView } from './utils/analytics';

// DIRECT HOME IMPORT (Is se 1-second ka Lazy Loading Splash Screen delay zero ho jayega)
import Home from './pages/Home';

// LAZY LOADED SECONDARY PAGES (In ki waja se initial landing delay nahi aayega)
const OnyxAdmin = lazy(() => import('./pages/OnyxAdmin'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Industries = lazy(() => import('./pages/Industries'));
const Projects = lazy(() => import('./pages/Projects'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Careers = lazy(() => import('./pages/Careers'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const NotFound = lazy(() => import('./pages/NotFound'));

// TOOLS HUB (Interactive free tools section)
const ToolsHub = lazy(() => import('./pages/ToolsHub'));
const ROICalculator = lazy(() => import('./pages/tools/ROICalculator'));
const SpeedChecker = lazy(() => import('./pages/tools/SpeedChecker'));
const ProjectEstimator = lazy(() => import('./pages/tools/ProjectEstimator'));
const AICostCalculator = lazy(() => import('./pages/tools/AICostCalculator'));
const AIReadinessQuiz = lazy(() => import('./pages/tools/AIReadinessQuiz'));
const BuildVsBuyCalculator = lazy(() => import('./pages/tools/BuildVsBuyCalculator'));

// ZERO-DELAY EMPTY FALLBACK (Koi splash logo ya screen delay nahi aayega)
const InvisibleFallback = () => <div className="min-h-screen bg-[#050505]" />;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.title = "OnyxStack Labs | Enterprise Software & AI Automation Agency";
  }, []);

  // Fires a GA4 pageview every time the route changes — see analytics.js
  // for why this is necessary in a client-side-routed SPA.
  useEffect(() => {
    trackPageView(currentPath, document.title);
  }, [currentPath]);

  const navigateToNode = (path) => {
    navigate(path);
  };

  return (
    <Suspense fallback={<InvisibleFallback />}>
      <Routes>
        <Route 
          path="/onyx-control-tower" 
          element={<OnyxAdmin navigateToNode={navigateToNode} />} 
        />

        <Route 
          element={
            <MainLayout 
              currentPath={currentPath} 
              activeSection="" 
              navigateToNode={navigateToNode} 
            />
          }
        >
          {/* HOME PAGE IS RENDERED INSTANTLY WITHOUT SUSPENSE DELAY */}
          <Route 
            index 
            element={<Home currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/about" 
            element={<About currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/services" 
            element={<Services currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/portfolio" 
            element={<Portfolio currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/contact" 
            element={<Contact currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/industries" 
            element={<Industries currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/projects" 
            element={<Projects currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/pricing" 
            element={<Pricing currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/blog" 
            element={<Blog currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />

          <Route 
            path="/blog/:slug" 
            element={<BlogArticle currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />

          <Route 
            path="/careers" 
            element={<Careers currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />

          {/* TOOLS HUB ROUTES */}
          <Route 
            path="/tools" 
            element={<ToolsHub currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/roi-calculator" 
            element={<ROICalculator currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/speed-checker" 
            element={<SpeedChecker currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/project-estimator" 
            element={<ProjectEstimator currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/ai-cost-calculator" 
            element={<AICostCalculator currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/ai-readiness-quiz" 
            element={<AIReadinessQuiz currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/tools/build-vs-buy-calculator" 
            element={<BuildVsBuyCalculator currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />

          <Route 
            path="/cookies-policy" 
            element={<CookiesPolicy currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/privacy-policy" 
            element={<PrivacyPolicy currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/terms-conditions" 
            element={<TermsConditions currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="/thank-you" 
            element={<ThankYou currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

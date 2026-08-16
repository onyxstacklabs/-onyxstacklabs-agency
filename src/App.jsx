// src/App.jsx
import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// LAYOUT SYSTEM IMPORT 
import MainLayout from './Layouts/MainLayout.jsx';

// ANALYTICS
import { trackPageView } from './utils/analytics';

// DIRECT HOME IMPORT
import Home from './pages/Home';

// LAZY LOADED SECONDARY PAGES
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

// TOOLS HUB
const ToolsHub = lazy(() => import('./pages/ToolsHub'));
const ROICalculator = lazy(() => import('./pages/tools/ROICalculator'));
const SpeedChecker = lazy(() => import('./pages/tools/SpeedChecker'));
const ProjectEstimator = lazy(() => import('./pages/tools/ProjectEstimator'));
const AICostCalculator = lazy(() => import('./pages/tools/AICostCalculator'));
const AIReadinessQuiz = lazy(() => import('./pages/tools/AIReadinessQuiz'));
const BuildVsBuyCalculator = lazy(() => import('./pages/tools/BuildVsBuyCalculator'));
const AIWebsiteAuditPage = lazy(() => import('./pages/AIWebsiteAudit').then(module => ({ default: module.AIWebsiteAuditPage })));

const InvisibleFallback = () => <div className="min-h-screen bg-[#050505]" />;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // TRAILING SLASH NORMALIZATION (SEO & Redirect Fix)
  // Strips trailing slashes from routes (e.g., /pricing/ -> /pricing) to prevent GSC redirect loops
  if (currentPath.length > 1 && currentPath.endsWith('/')) {
    const cleanPath = currentPath.slice(0, -1);
    return <Navigate to={{ ...location, pathname: cleanPath }} replace />;
  }

  useEffect(() => {
    // Scroll reset on route change
    window.scrollTo(0, 0);

    // Defer analytics tracking slightly so lazy components & useSEO finish updating document.title
    const analyticsTimer = setTimeout(() => {
      trackPageView(currentPath, document.title);
    }, 50);

    return () => clearTimeout(analyticsTimer);
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

        {/* MAIN LAYOUT WRAPPER FOR STANDARD PAGES */}
        <Route 
          element={
            <MainLayout 
              currentPath={currentPath} 
              activeSection="" 
              navigateToNode={navigateToNode} 
            />
          }
        >
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
            path="/tools/ai-website-audit" 
            element={<AIWebsiteAuditPage currentPath={currentPath} navigateToNode={navigateToNode} />} 
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
            element={<NotFound currentPath={currentPath} navigateToNode={navigateToNode} />} 
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

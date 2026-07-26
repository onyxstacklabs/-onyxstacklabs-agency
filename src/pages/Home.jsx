import React, { useState, useEffect, lazy, Suspense } from 'react';

// LIVE DATA CORE IMPORTS
import { transmitLeadToFirebase } from '../config/firebase';
import { siteConfig } from '../config/siteConfig';

// IMMEDIATE CRITICAL ABOVE-THE-FOLD IMPORTS
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Stats from '../components/Stats';

// LAZY-LOADED BELOW-THE-FOLD COMPONENTS FOR LIGHTHOUSE OPTIMIZATION
const BrandShowcase = lazy(() => import('../components/BrandShowcase'));
const Services = lazy(() => import('../components/Services'));
const FeaturedProjects = lazy(() => import('../components/FeaturedProjects'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const Process = lazy(() => import('../components/Process'));
const TechStack = lazy(() => import('../components/TechStack'));
const CTA = lazy(() => import('../components/CTA'));
const ContactForm = lazy(() => import('../components/ContactForm'));

// LIGHTWEIGHT ZERO-CLS SKELETON PLACEHOLDER
const SectionFallback = () => (
  <div 
    className="w-full min-h-[300px] my-8 bg-[#080808]/40 rounded-2xl border border-white/[0.03] animate-pulse" 
    aria-hidden="true"
  />
);

export default function Home({ currentPath, navigateToNode }) {
  const [activeSection, setActiveSection] = useState('');

  // Monitor scroll spies safely across viewports
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['services', 'portfolio', 'why-choose-us', 'process', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  // Lead Generation State Architecture
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    details: '',
    budget: '$500 - $1,000'
  });
  
  const [submissionState, setSubmissionState] = useState('IDLE'); 
  const [errors, setErrors] = useState({});

  const valueProps = [
    { title: "Fast Delivery", desc: "No bloated timelines. We deploy hyper-optimized MVP configurations and custom software quickly without taking shortcut measures on code health." },
    { title: "Modern UI", desc: "Interfaces polished for premium engagement. Your applications will naturally match the world-class design languages of Vercel, Stripe, and Linear." },
    { title: "Scalable Architecture", desc: "Built safely using flexible relational clusters inside Google Cloud Firebase to handle sudden market expansions and concurrent customer loads." },
    { title: "Dedicated Support", desc: "We act as your technical engineering partners, maintaining code iterations, regular visual design updates, and structural balance verification." },
    { title: "AI Solutions", desc: "Next-generation deep intelligence vectors embedded natively to transform regular applications into context-aware systems." },
    { title: "Enterprise Security", desc: "Defensive code-structuring strategies keeping access tokens, pipeline sync logs, and dynamic web payloads tightly contained." }
  ];

  const deliveryProcess = [
    { step: "01", label: "Discovery", desc: "Deep diving into your commercial business workflow parameters, identifying major operational friction points." },
    { step: "02", label: "Planning", desc: "Mapping explicit technical blueprints, chosen tech stack components, and predictable deployment milestones." },
    { step: "03", label: "Design", desc: "Crafting beautiful high-fidelity software visual aesthetics prioritizing breathing room and clean scannability." },
    { step: "04", label: "Development", desc: "Writing optimized frontend React components and secure backend architecture rules under continuous testing." },
    { step: "05", label: "Testing", desc: "Comprehensive structural verification loops ensuring zero broken navigation gates or payload drops." },
    { step: "06", label: "Deployment", desc: "Launching your custom system safely to live cloud infrastructures like Vercel with absolute domain mapping." }
  ];

  const techStackBadges = [
    "React", "Vite", "Firebase", "Tailwind CSS", "Gemini AI", "JavaScript (ES6+)", "HTML5 / CSS3", "Responsive Strategy", "API Architecture", "Cloud Firestore", "Git Versioning", "Vercel Cloud"
  ];

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.companyName.trim()) tempErrors.companyName = "Company name is required to initialize.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please input a valid email address.";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Phone verification contact is required.";
    if (!formData.details.trim()) tempErrors.details = "Please share some basic project requirements.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const triggerDiscordNotification = async (payload) => {
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1524387978846142494/O6FRnbl8XQmgBuMlB4P3HubPI9oUJ-Thcv4SoAEiQ9lCiDBCAeB9MxdVybF1QHkNEWqa";
    
    const discordPayload = {
      username: "OnyxStack Control Tower",
      embeds: [
        {
          title: "🛑 NEW TRANSMISSION DETECTED: INCOMING LEAD",
          color: 62206, 
          fields: [
            { name: "🏢 Company Name", value: `**${payload.companyName}**`, inline: true },
            { name: "📧 Client Email", value: payload.email, inline: true },
            { name: "📱 Contact Number", value: payload.phone, inline: true },
            { name: "💰 Allocation Target", value: `\`${payload.budget}\``, inline: true },
            { name: "🔬 Scope Anchor Details", value: payload.details }
          ],
          footer: { text: "OnyxStack Labs • Infrastructure Automation Engine" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
      });
    } catch (error) {
      console.error("Discord transmission dropped:", error);
    }
  };

  const handleLeadFormTransmission = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Validation Failed. Check required input nodes.");
      return;
    }

    setSubmissionState('SUBMITTING');
    const response = await transmitLeadToFirebase(formData);

    if (response.success) {
      await triggerDiscordNotification(formData);
      alert(`Verification Success!\nCompany: ${formData.companyName}\nSync Node Token: ${response.nodeRef}`);
      setSubmissionState('SUCCESS');
      setFormData({
        companyName: '',
        email: '',
        phone: '',
        details: '',
        budget: '$500 - $1,000'
      });
      setErrors({});
    } else {
      alert(`Fatal Transmission Interrupt: ${response.error}`);
      setSubmissionState('IDLE');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black scroll-smooth">
      
      {/* Backdrop Ambient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[1500px] right-0 w-[500px] h-[500px] bg-[#2563EB]/[0.03] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[600px] left-0 w-[600px] h-[600px] bg-[#06B6D4]/[0.02] blur-[200px] pointer-events-none" />

      {/* CORE FRAMEWORK ORDER MATRIX - ABOVE THE FOLD (IMMEDIATE) */}
      <Hero />
      
      <Clients />
      
      <Stats />
      
      {/* BELOW THE FOLD SECTIONS (DYNAMICALLY LOADED VIA REACT.LAZY + SUSPENSE) */}
      <Suspense fallback={<SectionFallback />}>
        <BrandShowcase />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Services
          currentPath={currentPath}
          navigateToNode={navigateToNode}
        />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <FeaturedProjects />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Portfolio projects={siteConfig.projects} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUs valueProps={valueProps} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Process deliveryProcess={deliveryProcess} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <TechStack techStackBadges={techStackBadges} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <CTA navigateToNode={navigateToNode} />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <ContactForm 
          formData={formData}
          setFormData={setFormData}
          submissionState={submissionState}
          setSubmissionState={setSubmissionState}
          errors={errors}
          handleLeadFormTransmission={handleLeadFormTransmission}
          siteConfig={siteConfig}
        />
      </Suspense>

    </div>
  );
}

// pages/Contact.jsx
import React, { useEffect, useMemo, useState } from 'react';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { transmitLeadToFirebase } from '../config/firebase';
import { useSEO, buildFaqSchema } from '../utils/useSEO';

export default function Contact({ currentPath, navigateToNode }) {
  const [activeFaq, setActiveFaq] = useState(null);

  // Existing Contact Form State Tracking Core (Preserved Exactly)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Live engineering-desk availability indicator (signature element)
  const [now, setNow] = useState(() => new Date());

  // Synchronize layout scroll vector on component activation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tick the availability clock once a minute — cheap, real, and tied to the
  // business hours we actually promise in contactInfo below.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const deskStatus = useMemo(() => {
    const day = now.getUTCDay(); // 0 Sun ... 6 Sat
    const hour = now.getUTCHours();
    const isWeekday = day >= 1 && day <= 5;
    const isWithinHours = hour >= 8 && hour < 18;
    const online = isWeekday && isWithinHours;

    if (online) {
      return {
        online: true,
        label: 'Engineering desk is online',
        detail: 'A solutions architect is available now — replies typically land same-day.'
      };
    }

    return {
      online: false,
      label: 'Engineering desk is offline',
      detail: 'Outside working hours (08:00–18:00 UTC, Mon–Fri) — your message is queued for the next window.'
    };
  }, [now]);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Existing Input Change Handler Logic (Preserved Exactly)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Real Firebase-backed Submit Pipeline. On success, the existing inline
  // confirmation banner shows briefly, then redirects to /thank-you —
  // giving the user visible confirmation before the page transition.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const leadPayload = {
        companyName: formData.name,
        email: formData.email,
        phone: '',
        budget: formData.subject,
        details: formData.message,
        source: 'contact_page'
      };

      const response = await transmitLeadToFirebase(leadPayload);

      if (response.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);

        // Hybrid flow: let the user see the success banner briefly,
        // then move them to the dedicated Thank You page.
        setTimeout(() => {
          navigateToNode('/thank-you');
        }, 1800);
      } else {
        setSubmitError('Something went wrong sending your message. Please try again, or email us directly.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setSubmitError('Something went wrong sending your message. Please try again, or email us directly.');
      setIsSubmitting(false);
    }
  };

  // Section 2 Data: Corporate Communications Registry Matrix
  const contactInfo = {
    email: "solutions@onyxstacklabs.com",
    website: "www.onyxstacklabs.com",
    responseTime: "Under 12 Business Hours",
    businessHours: "08:00 - 18:00 UTC / Monday - Friday"
  };

  // Section 4 Data: Conversion-Optimized Brand Pillars
  const valuePillars = [
    { title: "Enterprise Development", desc: "Custom-built systems designed to replace brittle, high-maintenance stacks with fast, dependable software your team can actually extend." },
    { title: "Applied AI Integration", desc: "Practical AI features woven into your existing tools and dashboards — built to solve a real workflow problem, not to check a box." },
    { title: "Direct Engineering Access", desc: "You work with the architects and engineers building your product, not an account manager relaying messages between you and them." },
    { title: "Long-Term Ownership", desc: "We stay accountable for what we build well past launch, so your data model and architecture hold up as your product grows." }
  ];

  // Section 5 Data: Lead-Scoping Frequently Answered Queries
  const contactFaqs = [
    {
      q: "What should we prepare before a scoping call?",
      a: "Wireframes and a data model help us move faster, but they're not required. A clear picture of your goals, current pain points, and how people use your product today is enough for a productive first conversation."
    },
    {
      q: "Will you sign an NDA before reviewing our project?",
      a: "Yes. We put a mutual NDA in place before any technical discovery begins, so your product plans and internal workflows stay protected from the outset."
    },
    {
      q: "How quickly can your team start?",
      a: "Once scope and terms are confirmed, engineers are typically allocated to your project within 5 to 7 business days."
    },
    {
      q: "Do proposals include testing and handover?",
      a: "Every proposal includes automated test coverage, documentation, and a structured handover so your internal team can maintain the system confidently after launch."
    },
    {
      q: "Can we reach out about an agency partnership instead of a project?",
      a: "Yes — choose \"Partnership\" as the subject in the form below and it will route directly to our business development team."
    },
    {
      q: "How do you coordinate with distributed teams during a build?",
      a: "You get a shared project dashboard, a private developer channel for day-to-day questions, and a standing weekly check-in — so status is always visible, never something you have to chase."
    }
  ];

  // Unique per-page SEO — title, description, canonical, and FAQ schema
  // built from this page's own real contactFaqs above.
  useSEO({
    title: 'Contact Us | OnyxStack Labs - Talk to Our Engineering Team',
    description: 'Tell us about your project. A senior architect at OnyxStack Labs will review your requirements and schedule a scoping call — no sales rep, just engineers.',
    path: '/contact',
    faqSchema: buildFaqSchema(contactFaqs)
  });

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 antialiased selection:bg-[#06B6D4]/30 selection:text-white relative overflow-hidden">

      {/* BRAND AMBIENT STRUCTURAL MASK GRAPHICS (Cyan and Blue glows matching the rest of the site) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute top-[300px] left-1/4 w-[500px] h-[500px] bg-cyan-950/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-blue-950/15 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[200px] left-10 w-[400px] h-[400px] bg-cyan-950/10 blur-[140px] pointer-events-none rounded-full" />

      {/* CORE FRAMEWORK BODY CONTENT STREAM */}
      <div className="relative z-10">

        {/* SECTION 1: HERO CONTROL PANEL HEADER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12 sm:pt-36 sm:pb-16 text-center sm:text-left">
          <div className="max-w-4xl mx-auto sm:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-[#1E293B] text-[#06B6D4] text-[10px] font-mono uppercase tracking-[0.2em] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Contact &amp; Project Scoping
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1] uppercase">
              Talk to the engineers <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-cyan-300">
                who will build your product.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto sm:mx-0">
              Tell us what you're building. A senior architect — not a sales rep — will review it and schedule a scoping call to talk through architecture, timeline, and cost.
            </p>

            {/* SIGNATURE ELEMENT: LIVE ENGINEERING DESK STATUS */}
            <div
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-md pl-4 pr-5 py-2.5 mx-auto sm:mx-0 shadow-lg shadow-black/25"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {deskStatus.online && (
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06B6D4] opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${deskStatus.online ? 'bg-[#06B6D4]' : 'bg-slate-500'}`}
                />
              </span>
              <span className="text-xs sm:text-sm text-slate-300 text-left">
                <span className="font-bold text-white">{deskStatus.label}.</span>{' '}
                <span className="text-slate-400">{deskStatus.detail}</span>
              </span>
            </div>
          </div>
        </section>

        {/* DOUBLE-COLUMN CORE BLOCK: SPLITTING DATA INFRASTRUCTURE & ACTIVE CONTACT FORM */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT INTERACTION BOUNDARY: SECTION 2 & SECTION 4 COMBINED */}
          <div className="lg:col-span-5 space-y-10">

            {/* SECTION 2: CONTACT INFORMATION MATRICES */}
            <div className="p-8 rounded-2xl border border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-md space-y-6 shadow-xl shadow-black/30 relative overflow-hidden group hover:border-[#06B6D4]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-full bg-gradient-to-b from-[#06B6D4] to-[#2563EB] transition-all duration-500" />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#06B6D4] font-semibold">Reach Us Directly</h3>

              <div className="space-y-5 pt-1">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Email</span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-base text-white hover:text-[#06B6D4] transition-colors underline decoration-[#1E293B] hover:decoration-[#06B6D4]/50 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] rounded"
                  >
                    {contactInfo.email}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Website</span>
                  <span className="text-base text-slate-300 font-mono">{contactInfo.website}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#1E293B]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Typical Response</span>
                    <span className="text-sm text-white font-bold">{contactInfo.responseTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">Working Hours</span>
                    <span className="text-sm text-slate-300 font-mono">{contactInfo.businessHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: WHY CONTACT ONYXSTACK LABS PILLARS */}
            <div className="space-y-5">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 font-semibold pl-1">Why Teams Work With Us</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {valuePillars.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl border border-[#1E293B] bg-[#0F172A]/40 backdrop-blur-sm transition-all duration-300 hover:border-[#06B6D4]/30 hover:bg-[#0F172A]/60 group"
                  >
                    <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300 shrink-0" aria-hidden="true" />
                      {p.title}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed pl-3.5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT INTERACTION BOUNDARY: SECTION 3 EXTENSIBLE DATA FORM */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl border border-[#1E293B] bg-gradient-to-b from-[#0F172A]/90 to-[#0F172A]/40 shadow-2xl shadow-black/50 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/[0.03] blur-[60px] pointer-events-none rounded-full" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/30 to-transparent" />

              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">Start a project scoping request</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">Share a few details about what you're building — we'll follow up by email to schedule a call.</p>
              </div>

              {/* Form Validation Notifications UI Blocks */}
              {submitSuccess && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm leading-relaxed flex gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                >
                  <span aria-hidden="true" className="font-bold text-emerald-400">✓</span>
                  <span>Message sent. A solutions architect will reach out at the email you provided shortly.</span>
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs sm:text-sm flex gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                >
                  <span aria-hidden="true" className="font-bold text-red-400">⚠</span>
                  <span>{submitError}</span>
                </div>
              )}

              {/* EXECUTABLE FORM LAYER - BACKEND LOGIC REMEDIES UNTOUCHED RE-SKINNED DESIGN */}
              <form onSubmit={handleFormSubmit} className="space-y-6" noValidate={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Name <span className="text-[#06B6D4]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full bg-[#05070B] border border-[#1E293B] hover:border-slate-700/80 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/15 focus:border-[#06B6D4] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Work Email <span className="text-[#06B6D4]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      aria-required="true"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="j.doe@enterprise.com"
                      className="w-full bg-[#05070B] border border-[#1E293B] hover:border-slate-700/80 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/15 focus:border-[#06B6D4] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Subject <span className="text-[#06B6D4]" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    required
                    aria-required="true"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Multi-tenant platform architecture"
                    className="w-full bg-[#05070B] border border-[#1E293B] hover:border-slate-700/80 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/15 focus:border-[#06B6D4] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Project Details <span className="text-[#06B6D4]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about scale, timeline, existing systems, and any integrations you'll need..."
                    className="w-full bg-[#05070B] border border-[#1E293B] hover:border-slate-700/80 rounded-xl px-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-[#06B6D4]/15 focus:border-[#06B6D4] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A] ${
                      isSubmitting
                        ? 'bg-cyan-950 text-cyan-700 cursor-not-allowed shadow-none'
                        : 'bg-[#06B6D4] hover:bg-cyan-400 text-black shadow-[0_4px_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:scale-[0.99]'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-3.5 w-3.5 text-cyan-700" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying Transmission...
                      </span>
                    ) : (
                      'Send project details'
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-4">
                    Prefer email? Write to <a href={`mailto:${contactInfo.email}`} className="underline decoration-[#1E293B] hover:decoration-[#06B6D4]/50 hover:text-[#06B6D4] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] rounded">{contactInfo.email}</a> directly.
                  </p>
                </div>
              </form>

            </div>
          </div>

        </section>

        {/* SECTION 5: COMPREHENSIVE INGRESS & PRIVACY FAQS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-[#1E293B] mt-12">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#06B6D4] mb-3 font-semibold">Common Questions</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">Before you reach out</h2>
          </div>
          <div className="space-y-4 max-w-4xl">
            {contactFaqs.map((faq, idx) => {
              const panelId = `faq-panel-${idx}`;
              const buttonId = `faq-button-${idx}`;
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#1E293B] bg-[#0F172A]/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#06B6D4]/30"
                >
                  <h3>
                    <button
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-inset"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`text-[#06B6D4] text-xl font-mono leading-none transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45 text-red-400' : 'rotate-0'}`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-[#1E293B]/60">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: CLOSING HIGH-CONVERSION CALL TO ACTION CORE PANEL */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 border-t border-[#1E293B]">
          <div className="p-8 sm:p-14 rounded-3xl border border-[#1E293B] bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1E293B]/50 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-[#06B6D4]/20 transition-all duration-300 shadow-2xl shadow-black/50">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.02] blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent" />

            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3 uppercase">
                Not ready to write a brief yet?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                A short intro call works too — send a couple of lines through the form above and we'll take it from there.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => { window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className="bg-slate-100 hover:bg-[#06B6D4] text-[#05070B] px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070B] active:scale-[0.98]"
              >
                Back to the form
              </button>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}

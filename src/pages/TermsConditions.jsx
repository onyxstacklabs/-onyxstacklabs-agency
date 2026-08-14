import React, { useEffect, useState } from 'react';
import { useSEO } from '../utils/useSEO';

export default function TermsConditions() {
  const [activeTermSection, setActiveTermSection] = useState("introduction");

  // Unique per-page SEO — title, description, and canonical for /terms-conditions.
  useSEO({
    title: 'Terms & Conditions | OnyxStack Labs',
    description: 'Terms and Conditions governing custom software engineering, cloud architecture, and digital delivery engagements with OnyxStack Labs.',
    path: '/terms-conditions'
  });

  // Synchronize layout scroll vector on component activation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Structural Navigation Register for Terms & Conditions Mapping
  const complianceIndices = [
    { id: "introduction", label: "1.0 Introduction" },
    { id: "acceptance", label: "2.0 Acceptance of Terms" },
    { id: "services", label: "3.0 Services" },
    { id: "responsibilities", label: "4.0 Client Responsibilities" },
    { id: "scope", label: "5.0 Project Scope" },
    { id: "payments", label: "6.0 Payments & Billing" },
    { id: "intellectual", label: "7.0 Intellectual Property" },
    { id: "confidentiality", label: "8.0 Confidentiality" },
    { id: "thirdparty", label: "9.0 Third-Party Services" },
    { id: "liability", label: "10.0 Limitation of Liability" },
    { id: "warranties", label: "11.0 Disclaimer of Warranties" },
    { id: "termination", label: "12.0 Termination" },
    { id: "governing", label: "13.0 Governing Law" },
    { id: "changes", label: "14.0 Changes to These Terms" },
    { id: "contact", label: "15.0 Contact Information" }
  ];

  const handleScrollToTermNode = (id) => {
    setActiveTermSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Structural offset for sticky navigation header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased selection:bg-[#06B6D4] selection:text-black relative overflow-hidden">

      {/* BRAND AMBIENT STRUCTURAL MASK GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.04),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/[0.01] blur-[150px] pointer-events-none" />

      {/* CORE FRAMEWORK BODY CONTENT STREAM */}
      <div className="relative z-10 master-terms-compliance-scope">

        {/* SECTION 1: HERO CONTROL PANEL HEADER */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-neutral-900/60">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-[10px] font-mono uppercase tracking-widest mb-6">
              Legal Operations System // Effective Date: July 13, 2026
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
              Terms &amp; Conditions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-500">
                Corporate Governance Agreement
              </span>
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed font-sans">
              These Terms and Conditions constitute the binding operational agreement between OnyxStack Labs and its client entities, governing all custom software engineering, cloud architecture, and digital delivery engagements.
            </p>
          </div>
        </section>

        {/* DOUBLE-COLUMN TERMS FRAMEWORK ASSEMBLY */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT BOUNDARY: STICKY CONTEXTUAL JUMP-INDEX DESKTOP INDEXER */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 space-y-2 border-l border-neutral-900 pl-4">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block mb-4">Agreement Index</span>
            {complianceIndices.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollToTermNode(sec.id)}
                className={`block text-left text-xs font-mono tracking-wide py-1.5 transition-colors w-full focus:outline-none ${activeTermSection === sec.id ? 'text-[#06B6D4] font-bold border-l-2 border-[#06B6D4] -ml-[18px] pl-[16px]' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {sec.label}
              </button>
            ))}
          </aside>

          {/* RIGHT BOUNDARY: ASYMMETRIC LEGAL SPECIFICATIONS BODY */}
          <div className="lg:col-span-9 max-w-3xl space-y-16 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">

            {/* SECTION: INTRODUCTION */}
            <article id="introduction" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">1.0</span> Introduction
              </h2>
              <p>
                OnyxStack Labs ("the Company," "We," "Our," or "Us") is an enterprise software engineering agency delivering custom applications, cloud infrastructure, artificial intelligence integrations, and technical consulting services to businesses worldwide.
              </p>
              <p>
                This document sets out the terms under which We provide services to Our clients. It applies to every proposal, statement of work, and engagement initiated through Our website, contact channels, or contractual agreements.
              </p>
            </article>

            {/* SECTION: ACCEPTANCE OF TERMS */}
            <article id="acceptance" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">2.0</span> Acceptance of Terms
              </h2>
              <p>
                By accessing Our website, requesting a proposal, or engaging Our services in any capacity, you agree to be bound by these Terms and Conditions in full. If you are entering into this agreement on behalf of an organization, you confirm that you hold the authority to bind that organization to these terms.
              </p>
              <p>
                If you do not agree with any part of these terms, you must discontinue use of Our services and website immediately.
              </p>
            </article>

            {/* SECTION: SERVICES */}
            <article id="services" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">3.0</span> Services
              </h2>
              <p>
                We provide custom software development, web and mobile application engineering, ERP systems, business process automation, artificial intelligence integration, and cloud infrastructure services. The specific scope, deliverables, and timeline for each engagement are defined in a signed Statement of Work ("SOW") or equivalent written agreement.
              </p>
              <p>
                Any modification to an active SOW requires mutual written approval and may result in adjusted timelines or fees.
              </p>
            </article>

            {/* SECTION: CLIENT RESPONSIBILITIES */}
            <article id="responsibilities" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">4.0</span> Client Responsibilities
              </h2>
              <p>
                Timely project delivery depends on client cooperation. Clients agree to provide accurate requirements, necessary account access, design assets, and prompt feedback or approvals required to progress each milestone.
              </p>
              <blockquote>
                <p className="p-4 rounded-xl bg-neutral-950 border-l-2 border-amber-500/60 text-xs text-neutral-400 font-mono">
                  // Notice: The Company is not responsible for delays caused by incomplete client input, missing credentials, or delayed approvals on the client's part.
                </p>
              </blockquote>
            </article>

            {/* SECTION: PROJECT SCOPE */}
            <article id="scope" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">5.0</span> Project Scope
              </h2>
              <p>
                Each engagement is governed by the scope defined in the relevant SOW. Work requested outside that scope is treated as a change request and may require a separate estimate, revised timeline, or additional fees prior to commencement.
              </p>
              <p>
                We reserve the right to decline change requests that materially conflict with the technical architecture or timeline of an active project.
              </p>
            </article>

            {/* SECTION: PAYMENTS & BILLING */}
            <article id="payments" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">6.0</span> Payments &amp; Billing
              </h2>
              <p>
                Clients agree to compensate the Company according to the billing structure — fixed milestone, retainer, or hourly — specified in the applicable contract.
              </p>
              <ul className="space-y-3 pl-5 list-disc text-neutral-400 text-sm">
                <li><strong className="text-neutral-200">Invoicing:</strong> Invoices are due within 14 calendar days of issuance unless otherwise agreed in writing.</li>
                <li><strong className="text-neutral-200">Late Payments:</strong> Overdue balances may incur a late fee of 1.5% per month, or the maximum rate permitted under applicable law.</li>
                <li><strong className="text-neutral-200">Suspension of Work:</strong> The Company reserves the right to pause development, disable staging environments, and restrict repository access in cases of extended payment default.</li>
              </ul>
            </article>

            {/* SECTION: INTELLECTUAL PROPERTY */}
            <article id="intellectual" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">7.0</span> Intellectual Property
              </h2>
              <p>
                Upon full and final payment, ownership of all custom code, designs, and deliverables created specifically for the client's project transfers to the client.
              </p>
              <p>
                The Company retains ownership of its pre-existing tools, internal frameworks, reusable components, and proprietary methodologies used during development, and grants the client a perpetual, royalty-free license to use these elements as embedded within the delivered product.
              </p>
            </article>

            {/* SECTION: CONFIDENTIALITY */}
            <article id="confidentiality" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">8.0</span> Confidentiality
              </h2>
              <p>
                Both parties agree to keep confidential all non-public information exchanged during the engagement, including technical architecture, business plans, financial data, and proprietary strategies.
              </p>
              <p>
                Confidential information will not be disclosed to third parties except where required by law, court order, or with the prior written consent of the disclosing party.
              </p>
            </article>

            {/* SECTION: THIRD-PARTY SERVICES */}
            <article id="thirdparty" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">9.0</span> Third-Party Services
              </h2>
              <p>
                Our services may integrate with third-party platforms, including cloud hosting providers, payment processors, analytics tools, and APIs. The Company is not responsible for outages, changes in pricing, or policy changes made by these third-party providers.
              </p>
              <p>
                Clients are responsible for maintaining valid accounts and complying with the terms of service of any third-party platform used in connection with their project.
              </p>
            </article>

            {/* SECTION: LIMITATION OF LIABILITY */}
            <article id="liability" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">10.0</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, the Company shall not be liable for indirect, incidental, special, or consequential damages, including lost revenue, data loss, or business interruption arising from the use of Our services.
              </p>
              <p>
                The Company's total liability under any engagement is limited to the total amount paid by the client for the specific project giving rise to the claim.
              </p>
            </article>

            {/* SECTION: DISCLAIMER OF WARRANTIES */}
            <article id="warranties" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">11.0</span> Disclaimer of Warranties
              </h2>
              <p>
                Services and deliverables are provided on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis. The Company makes no warranty that software will be entirely free of defects, uninterrupted, or compatible with every third-party system.
              </p>
              <p>
                Any warranties beyond those expressly stated in a signed SOW are disclaimed to the fullest extent permitted by applicable law.
              </p>
            </article>

            {/* SECTION: TERMINATION */}
            <article id="termination" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">12.0</span> Termination
              </h2>
              <p>
                Either party may terminate an active engagement with 30 days' written notice if the other party materially breaches these terms and fails to remedy the breach within that period.
              </p>
              <p>
                Upon termination, the client agrees to pay for all verified work completed up to the effective termination date.
              </p>
            </article>

            {/* SECTION: GOVERNING LAW */}
            <article id="governing" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">13.0</span> Governing Law
              </h2>
              <p>
                These Terms and any related agreements are governed by and construed in accordance with the laws applicable in the Company's jurisdiction of operation, without regard to conflict-of-law principles.
              </p>
              <p>
                Any disputes arising from these terms shall be resolved through the appropriate courts or arbitration bodies with jurisdiction over the Company's place of business.
              </p>
            </article>

            {/* SECTION: CHANGES TO THESE TERMS */}
            <article id="changes" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">14.0</span> Changes to These Terms
              </h2>
              <p>
                The Company reserves the right to update these Terms and Conditions at any time. Updates take effect immediately upon publication on this page.
              </p>
              <p>
                Continued use of Our services or website following any update constitutes acceptance of the revised terms.
              </p>
            </article>

            {/* SECTION: CONTACT INFORMATION */}
            <article id="contact" className="scroll-mt-32 space-y-4">
              <h2 className="text-lg font-bold text-white font-sans flex items-center gap-3">
                <span className="font-mono text-xs text-[#06B6D4]">15.0</span> Contact Information
              </h2>
              <p>
                For questions regarding this agreement, please contact Our team directly:
              </p>
              <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/60 font-mono text-xs space-y-1.5 max-w-md">
                <div className="text-white font-bold">OnyxStack Labs</div>
                <div className="text-neutral-400">
                  Email:{' '}
                  <a href="mailto:onyxstacklabs@gmail.com" className="text-[#06B6D4] hover:underline">
                    onyxstacklabs@gmail.com
                  </a>
                </div>
                <div className="text-neutral-400">
                  Website:{' '}
                  <a href="https://onyxstacklabs.com" className="text-[#06B6D4] hover:underline">
                    onyxstacklabs.com
                  </a>
                </div>
                <div className="text-neutral-400">Headquarters: Pakistan</div>
              </div>
            </article>

          </div>

        </section>

      </div>

    </div>
  );
}

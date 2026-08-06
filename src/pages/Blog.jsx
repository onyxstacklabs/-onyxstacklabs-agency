// src/pages/Blog.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// LIVE DATA CORE IMPORTS
import { siteConfig } from '../config/siteConfig';
import { db } from '../config/firebase'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useSEO } from '../utils/useSEO';

// SELECTION CORNER FRAMER VARIANT COEFFICIENTS
const fxFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const fxStaggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const fxGridItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function Blog({ currentPath, navigateToNode }) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedStatus, setSubscribedStatus] = useState(false);

  // Unique per-page SEO for the Blog hub — canonical path "/blog".
  // No FAQ schema here since this page doesn't render an FAQ section
  // itself; individual blog posts carry their own schema separately.
  useSEO({
    title: 'Blog | Technical Engineering Insights - OnyxStack Labs',
    description: 'Technical engineering insights on AI automation, web development, and cloud architecture — written by OnyxStack Labs\' senior consultants.',
    path: '/blog'
  });

  // Helper function to cleanly extract text if document content contains raw HTML tags
  const cleanExtractText = (rawStr) => {
    if (!rawStr) return "";
    return rawStr.replace(/<\/?[^>]+(>|$)/g, " ").trim();
  };

  // Synchronize layout scroll position and connect live Firestore data stream
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, where('published', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let liveArticles = snapshot.docs.map(doc => {
        const data = doc.data();
        const rawContent = data.content || "";
        const cleanSummaryFallback = cleanExtractText(rawContent).substring(0, 160) + "...";
        
        return {
          id: doc.id,
          ...data,
          title: data.title || "Untitled Blueprint",
          summary: data.summary || cleanSummaryFallback || "No description provided for this active node.",
          category: data.category || "AI",
          author: typeof data.author === 'object' ? (data.author.name || "Senior Architect") : (data.author || "Senior Architect"),
          createdAt: data.createdAt || null
        };
      });

      // Local level sorting for newest node tracking
      liveArticles.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA; 
      });

      const featuredNode = liveArticles.find(art => art.featured) || liveArticles[0] || null;
      
      setFeaturedArticle(featuredNode);
      setArticles(liveArticles);
      setLoading(false);
    }, (error) => {
      console.error("Firestore frontend collection sync failed: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Section 3 Data: Categorization Filter Facets
  const categories = [
    "All", "AI", "Web Development", "Mobile Apps", "React", "Firebase", "UI/UX", "Business", "Case Studies"
  ];

  // Reusable Tags Array
  const popularTags = [
    "Gemini AI", "Tailwind CSS", "Serverless Edge", "NextJS", "Optimization", "Firestore", "WebSockets", "Architecture"
  ];

  // Pipeline Filter Processing Functionality
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribedStatus(true);
      setNewsletterEmail("");
    }
  };

  const handleNavigation = (slug) => {
    if (slug) {
      navigate(`/blog/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* BRAND AMBIENT STRUCTURAL LIGHTING FIELDS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),transparent_55%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 opacity-70 border-b border-neutral-900/40" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-cyan-500/[0.015] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[600px] left-0 w-[600px] h-[600px] bg-blue-600/[0.02] blur-[180px] pointer-events-none" />

      {/* COMPONENT STREAM CONTENT BODY */}
      <main className="relative z-10 scalable-content-blog-scope" id="main-content">
        
        {/* SECTION 1: HERO CONTROL TERMINAL */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-16 sm:pt-48 sm:pb-24">
          <motion.div initial="hidden" animate="visible" variants={fxFadeUp} className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Knowledge Repository Node
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] font-sans">
              Technical Engineering Insights & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-cyan-400">
                Architectural Blueprints
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10 font-sans tracking-wide">
              In-depth research documentation, interface design analysis, and performance optimization runbooks built by senior system architects.
            </p>
            
            {/* INLINE LIVE ENGINE SEARCH ACCESS BAR */}
            <div className="max-w-xl relative backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <input 
                type="text" 
                placeholder="Query database articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-5 py-4 pl-12 text-xs sm:text-sm font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </header>

        {loading ? (
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center font-mono text-sm text-neutral-500 animate-pulse">
            Querying edge database shards...
          </div>
        ) : (
          <>
            {/* SECTION 2: EDITORIAL SPOTLIGHT FEATURED ARTICLE HERO */}
            {featuredArticle && (!searchQuery || featuredArticle.title?.toLowerCase().includes(searchQuery.toLowerCase())) && (
              <section className="max-w-7xl mx-auto px-6 md:px-12 py-6">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fxFadeUp}
                  onClick={() => handleNavigation(featuredArticle.slug || featuredArticle.id)}
                  className="group p-6 sm:p-10 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900/30 cursor-pointer hover:border-neutral-700 transition-all duration-300 relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                  <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/[0.02] blur-[120px] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-square w-full rounded-xl bg-gradient-to-tr from-neutral-900 to-neutral-950 border border-neutral-800/60 flex flex-col justify-between p-6 relative group-hover:border-cyan-500/20 transition-colors duration-300 overflow-hidden">
                      {featuredArticle.coverImage && (
                        <img src={featuredArticle.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.2em] relative z-10">[ Editorial_Spotlight_Node ]</div>
                      <div className="text-cyan-400 font-mono text-4xl lg:text-5xl font-extrabold opacity-25 group-hover:opacity-60 transition-opacity duration-300 select-none relative z-10">
                        {featuredArticle.category}://
                      </div>
                    </div>
                    
                    <div className="lg:col-span-7 space-y-5">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest text-[9px] shadow-[0_0_10px_rgba(6,182,212,0.05)]">Featured Post</span>
                        <span className="text-neutral-400">
                          {featuredArticle.createdAt?.seconds ? new Date(featuredArticle.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                        </span>
                        <span className="text-neutral-700">•</span>
                        <span className="text-neutral-400 font-mono text-xs">{featuredArticle.readTime || '5 min read'}</span>
                      </div>
                      
                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200 leading-snug font-sans">
                        {featuredArticle.title}
                      </h2>
                      
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl font-sans tracking-wide">
                        {featuredArticle.summary}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-neutral-900/80">
                        <span className="text-xs font-mono text-neutral-500 tracking-wide">{featuredArticle.author}</span>
                        <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-200 font-bold uppercase tracking-wider">
                          Read Blueprint Article <span className="font-sans">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            )}

            {/* SECTION 3: CATEGORIES FACTION FILTER SELECTORS */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-neutral-900 no-scrollbar scroll-smooth">
                {categories.map((cat, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => { setSelectedCategory(cat); }}
                    className={`px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-200 focus:outline-none relative ${
                      selectedCategory === cat 
                        ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.05)]' 
                        : 'border border-transparent text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION 4: LATEST ARTICLES GRID FRAME */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-6">
              <AnimatePresence mode="wait">
                {filteredArticles.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-24 border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/20 backdrop-blur-sm">
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-[0.15em]">No corresponding articles matching search keys found.</p>
                  </motion.div>
                ) : (
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fxStaggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((art) => (
                      <motion.div 
                        key={art.id}
                        variants={fxGridItemVariant}
                        onClick={() => handleNavigation(art.slug || art.id)}
                        className="group rounded-xl border border-neutral-900/80 bg-neutral-950/40 p-5.5 cursor-pointer hover:border-neutral-700/80 hover:bg-gradient-to-b hover:from-neutral-950 hover:to-neutral-900/10 transition-all duration-300 flex flex-col justify-between min-h-[440px] shadow-md backdrop-blur-sm relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.005] blur-xl rounded-full pointer-events-none" />
                        <div>
                          <div className="aspect-[16/10] w-full rounded-lg bg-neutral-900 border border-neutral-950 flex flex-col justify-between p-4 mb-5 group-hover:border-neutral-800 transition-colors duration-300 select-none relative overflow-hidden">
                            {art.coverImage && (
                              <img src={art.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500" />
                            )}
                            <div className="text-[8px] font-mono text-neutral-600 tracking-[0.15em] relative z-10">[ Grid_Frame_Asset ]</div>
                            <div className="text-neutral-500 font-mono text-xs tracking-tight relative z-10">{art.category}://</div>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                              <span>
                                {art.createdAt?.seconds ? new Date(art.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                              </span>
                              <span className="text-neutral-700">•</span>
                              <span>{art.readTime || '5 min read'}</span>
                            </div>
                            <h3 className="text-base font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-200 leading-snug font-sans">
                              {art.title}
                            </h3>
                            <p className="text-xs text-neutral-400 leading-relaxed font-sans tracking-wide line-clamp-3">
                              {art.summary}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-neutral-900/60 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-neutral-500 tracking-wide">{art.author}</span>
                          <span className="text-cyan-400/90 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                            Read Card <span className="font-sans">→</span>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </>
        )}

        {/* SECTION 5: POPULAR TAGS SYSTEM */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="p-6 rounded-xl border border-neutral-900/60 bg-neutral-950/20 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 sm:border-r sm:border-neutral-800 sm:pr-6 whitespace-nowrap">// Filter By Token</span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 rounded-md bg-neutral-900/80 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                >
                  #{tag.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY FOLLOW OUR TECHNICAL JOURNAL LOGS */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-neutral-900/50 mt-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fxFadeUp} className="max-w-3xl mb-16">
            <p className="text-xs font-mono uppercase text-cyan-400 mb-3 tracking-[0.2em]">// Content Strategy Philosophy</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">Why Engineering Teams Bookmark Our Logs</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fxStaggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Bespoke Implementations Only", d: "We skip generic overview essays. Every article focuses directly on deployment blockers, architectural parameters, and verified benchmarks." },
              { t: "CMS-Ready Adaptability", d: "Our layout model uses fully decoupled object loops, ready to synchronize directly to Firestore document queries or GraphQL engines." },
              { t: "Production-Proven Focus", d: "Authored directly by the consultants building custom enterprise commerce cores and security identity checkpoints." }
            ].map((p, pIdx) => (
              <motion.div key={pIdx} variants={fxFadeUp} className="p-7 rounded-xl border border-neutral-900 bg-neutral-950/30 hover:border-neutral-800 transition-all duration-300 relative group shadow-sm">
                <div className="w-1 h-5 bg-cyan-400 mb-5 rounded-full transition-transform duration-300 group-hover:scale-y-110" />
                <h3 className="text-sm font-bold text-white font-sans tracking-wide mb-2.5">{p.t}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 7: NEWSLETTER SUBSCRIPTION CONSOLE ENGINE PANEL */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fxFadeUp} className="p-8 sm:p-12 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900/20 relative overflow-hidden backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)] group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/[0.02] blur-[90px] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-105" />
            <div className="max-w-2xl space-y-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">Subscribe to Our Structural Release Cycles</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide max-w-xl">
                Receive sub-second architecture breakdowns and platform integration guides directly in your container box once every two weeks. Zero marketing noise.
              </p>
              
              {subscribedStatus ? (
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs max-w-md shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  ✓ Node Connected: Email communication sequence authorized.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md pt-3">
                  <input 
                    type="email" required placeholder="Provide enterprise email..." value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#050505] border border-neutral-800 rounded-xl px-4 py-3.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200"
                  />
                  <button type="submit" className="bg-white hover:bg-cyan-400 text-black px-6 py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                    Authorize Hook
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </section>

        {/* SECTION 8: FINAL MASTER DIRECT CALL TO ACTION BLOCK */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-28 border-t border-neutral-900/50">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fxFadeUp} className="p-8 sm:p-16 rounded-3xl border border-neutral-800/80 bg-gradient-to-tr from-neutral-950 via-neutral-950 to-neutral-900/20 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] group">
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/[0.04] blur-[100px] pointer-events-none rounded-full transition-transform duration-700 group-hover:scale-110" />
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans leading-tight">
                Need Custom Core Architecture Developed For Your Platform?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans tracking-wide max-w-2xl">
                Stop copy-pasting code templates. Partner directly with senior product consultants to build custom, high-velocity digital infrastructure configurations optimized specifically for your transaction requirements.
              </p>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto relative z-10">
              <button
                onClick={() => { navigateToNode('/'); setTimeout(() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                className="w-full sm:w-auto text-center bg-white hover:bg-cyan-400 text-black px-8 py-4 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Launch Pipeline Consultation
              </button>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}

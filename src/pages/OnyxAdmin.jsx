import React, { useState, useEffect } from 'react';
// Google Gen AI SDK integration for automated content generation
import { GoogleGenAI, Type } from '@google/genai';

// Exact relative trajectory mapping targeting the real firebase module location
import { db, auth } from '../config/firebase'; 
import { collection, query, onSnapshot, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, where } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Initialize Gemini Client using standard Vite Environment Variable key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
// Current stable GA model (July 2026 release). Override via VITE_GEMINI_MODEL
// env var if Google deprecates this without needing a code redeploy.
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.6-flash';

// Unsplash Access Key for automatic, copyright-free cover image sourcing.
// Get a free key at https://unsplash.com/developers and set
// VITE_UNSPLASH_ACCESS_KEY in Vercel environment variables.
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Correctly escapes control characters (raw newlines/tabs) that appear
// INSIDE JSON string values, while leaving structural whitespace between
// JSON tokens untouched (a naive blanket-replace breaks pretty-printed JSON).
function sanitizeJsonControlChars(text) {
  let result = '';
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escapeNext) {
        result += ch;
        escapeNext = false;
        continue;
      }
      if (ch === '\\') {
        result += ch;
        escapeNext = true;
        continue;
      }
      if (ch === '"') {
        inString = false;
        result += ch;
        continue;
      }
      const code = ch.charCodeAt(0);
      if (code <= 0x1F) {
        if (ch === '\n') result += '\\n';
        else if (ch === '\r') result += '\\r';
        else if (ch === '\t') result += '\\t';
        else if (ch === '\b') result += '\\b';
        else if (ch === '\f') result += '\\f';
        else result += ' ';
        continue;
      }
      result += ch;
    } else {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
    }
  }

  return result;
}

// Fetches a copyright-free, topic-relevant cover photo from Unsplash's
// official Search API. Returns null (never throws) if the key is missing
// or the request fails, so it never blocks blog content generation.
async function fetchStockCoverImage(searchQuery) {
  if (!UNSPLASH_ACCESS_KEY || !searchQuery) return null;
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const result = data?.results?.[0];
    if (!result) return null;
    return {
      url: result.urls?.regular || result.urls?.full || null,
      photographerName: result.user?.name || null
    };
  } catch (err) {
    console.error('Unsplash cover image fetch failed:', err);
    return null;
  }
}

export default function OnyxAdmin() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase Authentication Session State Matrix
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Derived authentication flag
  const isAuthenticated = !!user;

  // Enterprise Blog CMS State Matrix
  const [currentTab, setCurrentTab] = useState('leads'); // 'leads', 'blog', or 'recruitment'
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  
  // Recruitment Pipeline Core State Matrix
  const [candidates, setCandidates] = useState([]);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [activeCandidateTab, setActiveCandidateTab] = useState('pending'); // 'pending', 'shortlisted', 'archived'
  
  // Blog Filter/Sort/Search Pipeline State
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');
  const [blogStatusFilter, setBlogStatusFilter] = useState('All');
  const [blogSortOrder, setBlogSortOrder] = useState('newest');
  const [blogPage, setBlogPage] = useState(1);
  const blogsPerPage = 5;

  // Blog Form / Editor State (Enhanced with Full SEO & Freshness Schema)
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    coverImage: '',
    coverImageAlt: '',
    category: 'React',
    tags: '',
    author: '',
    published: false,
    featured: false,
    seoTitle: '',
    seoDescription: '',
    canonicalUrl: '',
    schemaType: 'BlogPosting',
    noIndex: false,
    readTime: '1 min read',
    publishedAt: null
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Auto-generate Slug & Reading Time on Title/Content Mutations
  useEffect(() => {
    if (!isEditing) {
      const computedSlug = blogForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setBlogForm(prev => ({ ...prev, slug: computedSlug }));
    }
  }, [blogForm.title, isEditing]);

  useEffect(() => {
    const words = blogForm.content.trim() ? blogForm.content.trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 225));
    setBlogForm(prev => ({ ...prev, readTime: `${minutes} min read` }));
  }, [blogForm.content]);

  // Firebase Authentication Session Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Secure Firebase Authentication Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      setLoginPassword('');
    } catch (error) {
      console.error("Firebase authentication error: ", error);
      setAuthError('Access Denied: Invalid credentials or account not authorized.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Secure Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Real-time listener for incoming agency leads
  useEffect(() => {
    if (!isAuthenticated) return;

    const leadsRef = collection(db, 'agency_leads');
    const q = query(leadsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLeads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      fetchedLeads.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });

      setLeads(fetchedLeads);
      setLoading(false);
    }, (error) => {
      console.error("Firestore stream error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Real-time listener for Enterprise Blog CMS Matrix
  useEffect(() => {
    if (!isAuthenticated) return;

    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBlogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      fetchedBlogs.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setBlogs(fetchedBlogs);
      setBlogsLoading(false);
    }, (error) => {
      console.error("Firestore blogs stream error: ", error);
      setBlogsLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Real-time listener for incoming recruitment submissions
  useEffect(() => {
    if (!isAuthenticated) return;
    setCandidatesLoading(true);

    const recruitmentRef = collection(db, 'recruitment_pipeline');
    const q = query(
      recruitmentRef, 
      where('status', '==', activeCandidateTab)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedCandidates = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      fetchedCandidates.sort((a, b) => {
        const timeA = a.submittedAt?.seconds || 0;
        const timeB = b.submittedAt?.seconds || 0;
        return timeB - timeA;
      });

      setCandidates(fetchedCandidates);
      setCandidatesLoading(false);
    }, (error) => {
      console.error("Firestore recruitment stream error: ", error);
      setCandidatesLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, activeCandidateTab]);

  // Core Mutation Logic for updating Lead Status
  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const leadDocRef = doc(db, 'agency_leads', leadId);
      await updateDoc(leadDocRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating lead status: ", error);
      alert("Failed to update status node.");
    }
  };

  // Core Mutation Logic for candidate workflows
  const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
      const candidateDocRef = doc(db, 'recruitment_pipeline', candidateId);
      await updateDoc(candidateDocRef, { status: newStatus });
    } catch (error) {
      console.error("Error mutating candidate pipeline state: ", error);
      alert("Failed to update candidate workflow node.");
    }
  };

  // WhatsApp communication helper
  const triggerWhatsAppCommunication = (phone, companyName) => {
    const cleanPhone = phone.replace(/[^\d+]/g, ''); 
    const message = `Hello ${companyName},\n\nThis is OnyxStack Labs. We have successfully verified your parameters and initiated your active engineering funnel.\n\nLet us schedule a quick technical discovery call. Please let us know your availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
  };

  // Email communication helper
  const triggerEmailCommunication = (email, name, role) => {
    const subject = encodeURIComponent(`[OnyxStack Labs] Application Update - ${role}`);
    const body = encodeURIComponent(`Hello ${name},\n\nThank you for applying for the ${role} position at OnyxStack Labs.\n\nWe have reviewed your profile and would like to move forward to discuss your technical parameters.\n\nBest Regards,\nOnyxStack Labs Management`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
  };

  // Helper function to auto-optimize image URL parameters
  const optimizeImageUrl = (url) => {
    if (!url) return '';
    if (url.includes('images.unsplash.com') && !url.includes('auto=format')) {
      const joinChar = url.includes('?') ? '&' : '?';
      return `${url}${joinChar}auto=format&fit=crop&w=1200&q=80`;
    }
    return url;
  };

  // Background IndexNow / Sitemap notification hook
  const triggerSearchEngineNotification = async (slug) => {
    try {
      const targetUrl = `https://onyxstacklabs.com/blog/${slug}`;
      console.log(`[SEO Sync] Triggering background revalidation ping for: ${targetUrl}`);
      fetch('/api/revalidate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, url: targetUrl })
      }).catch(err => console.log('[SEO Sync Ping Silent Fallback]:', err));
    } catch (e) {
      // Non-blocking catch
    }
  };

  // Gemini AI Content Generation Handler (Enterprise-grade, humanized, SEO/GEO/AEO optimized)
  // Also auto-sources a copyright-free cover image via Unsplash and fills
  // author/alt-text so no field is left empty after generation.
  const handleGenerateAiContent = async () => {
    if (!blogForm.title.trim()) {
      alert("Please specify an Article Headline Title first to guide the AI generation.");
      return;
    }

    if (!ai) {
      alert("Gemini API key is missing. Please make sure VITE_GEMINI_API_KEY is defined in Vercel / environment variables.");
      return;
    }

    setIsAiGenerating(true);
    try {
      const prompt = `Act as a senior technical content strategist and SEO/GEO specialist writing for OnyxStack Labs, a software development agency.

Write a complete, enterprise-grade, humanized blog article about: "${blogForm.title}".
Category: ${blogForm.category}.

STRICT REQUIREMENTS:
1. HUMANIZED TONE: Write like an experienced human engineer/writer. Avoid robotic AI clichés (e.g. "In today's fast-paced world", "Delve into", "Leverage", "It's important to note", "In conclusion"). Use natural, direct, professional-but-conversational English.
2. LENGTH & DEPTH: 1200-1800 words. Cover the topic with real depth and practical insight, not generic filler.
3. STRUCTURE: Clean Markdown — an engaging intro paragraph (no heading), then multiple ## and ### subheadings, short paragraphs (2-4 sentences), bullet points where useful, and a short FAQ section near the end (3-4 Q&A pairs) written for GEO/AEO (Generative Engine Optimization / Answer Engine Optimization) — each answer should directly and completely answer the question in 1-3 sentences so AI answer engines (Google AI Overviews, ChatGPT, Gemini, Perplexity) can quote it cleanly.
4. SEO KEYWORDS: Naturally weave the primary keyword and 3-5 relevant long-tail keywords into headings and body text — no keyword stuffing.
5. INTERNAL LINKING: Include exactly 2-3 contextual internal markdown links pointing to real OnyxStack Labs pages, chosen naturally based on relevance to the topic. ONLY use these real paths, never invent new ones: https://onyxstacklabs.com/tools, https://onyxstacklabs.com/pricing, https://onyxstacklabs.com/services, https://onyxstacklabs.com/careers, https://onyxstacklabs.com/projects, https://onyxstacklabs.com/blog.
6. CREDIBILITY: Reference real, verifiable industry practices and concepts only — never fabricate statistics, case studies, or client names.
7. COVER IMAGE ALT TEXT: Write a descriptive, SEO-friendly alt text for the cover image, under 125 characters, describing the visual concept (not starting with "Image of").
8. IMAGE SEARCH QUERY: Provide a short, visual, stock-photo-friendly search phrase (2-4 words, concrete nouns, e.g. "developer coding laptop" not abstract terms) that would return a relevant photo for this article's cover image.

Write the "content" field as a single Markdown string. Use \\n for line breaks within it — do not use raw line breaks.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          // Native structured output: Gemini enforces valid JSON server-side.
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING, description: "1-2 sentence engaging summary for blog listing cards" },
              content: { type: Type.STRING, description: "Full article body in Markdown" },
              seoTitle: { type: Type.STRING, description: "SEO meta title, max 60 characters" },
              seoDescription: { type: Type.STRING, description: "SEO meta description, max 160 characters" },
              tags: { type: Type.STRING, description: "Comma-separated string of 4-6 relevant keyword tags" },
              coverImageAlt: { type: Type.STRING, description: "Descriptive SEO alt text for the cover image, under 125 characters" },
              imageSearchQuery: { type: Type.STRING, description: "Short 2-4 word stock-photo search phrase for the cover image" }
            },
            required: ["summary", "content", "seoTitle", "seoDescription", "tags", "coverImageAlt", "imageSearchQuery"]
          }
        }
      });

      const rawText = (response.text || '').replace(/```json|```/g, '').trim();

      // Safety net: escape only the control characters that sit INSIDE
      // JSON string values, leaving structural whitespace between tokens
      // (e.g. pretty-printed indentation) completely untouched.
      const sanitizedText = sanitizeJsonControlChars(rawText);

      const generatedData = JSON.parse(sanitizedText);

      // Fetch a real, copyright-free cover photo based on the AI's
      // suggested search query. Never blocks the content update below.
      const stockImage = await fetchStockCoverImage(generatedData.imageSearchQuery || blogForm.title);

      setBlogForm(prev => ({
        ...prev,
        summary: generatedData.summary || prev.summary,
        content: generatedData.content || prev.content,
        seoTitle: generatedData.seoTitle || prev.seoTitle,
        seoDescription: generatedData.seoDescription || prev.seoDescription,
        tags: generatedData.tags || prev.tags,
        coverImageAlt: generatedData.coverImageAlt || prev.coverImageAlt,
        coverImage: stockImage?.url ? optimizeImageUrl(stockImage.url) : prev.coverImage,
        author: prev.author.trim() ? prev.author : 'OnyxStack Labs Team'
      }));

      if (!UNSPLASH_ACCESS_KEY) {
        alert("AI Content & SEO Schema generated! Note: cover image was NOT auto-fetched because VITE_UNSPLASH_ACCESS_KEY is not set — please add it in Vercel env vars, or add a cover image URL manually.");
      } else if (!stockImage?.url) {
        alert("AI Content & SEO Schema generated! Couldn't find a matching stock photo — please add a cover image URL manually.");
      } else {
        alert(`AI Content, SEO Schema & cover image successfully generated!${stockImage.photographerName ? ` (Photo by ${stockImage.photographerName} on Unsplash)` : ''}`);
      }
    } catch (error) {
      console.error("Error generating content via Gemini API:", error);
      const debugMessage =
        error?.message ||
        (typeof error === 'string' ? error : JSON.stringify(error)) ||
        "Unknown error (no message returned by SDK).";
      alert("AI Generation Failed.\n\nDEBUG DETAILS:\n" + debugMessage);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Blog Action Logic Handlers
  const handleBlogFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogForm(prev => {
      let updatedValue = type === 'checkbox' ? checked : value;
      if (name === 'coverImage' && typeof updatedValue === 'string') {
        updatedValue = optimizeImageUrl(updatedValue);
      }
      return {
        ...prev,
        [name]: updatedValue
      };
    });
  };

  const resetBlogForm = () => {
    setIsEditing(false);
    setCurrentBlogId(null);
    setPreviewMode(false);
    setBlogForm({
      title: '',
      slug: '',
      summary: '',
      content: '',
      coverImage: '',
      coverImageAlt: '',
      category: 'React',
      tags: '',
      author: '',
      published: false,
      featured: false,
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      schemaType: 'BlogPosting',
      noIndex: false,
      readTime: '1 min read',
      publishedAt: null
    });
  };

  const handleSaveBlog = async (e, forcePublished = null) => {
    if (e) e.preventDefault();
    try {
      const isPublishedState = forcePublished !== null ? forcePublished : blogForm.published;
      const processedTags = typeof blogForm.tags === 'string' 
        ? blogForm.tags.split(',').map(t => t.trim()).filter(Boolean) 
        : blogForm.tags;

      const now = serverTimestamp();
      const blogPayload = {
        ...blogForm,
        coverImage: optimizeImageUrl(blogForm.coverImage),
        published: isPublishedState,
        tags: processedTags,
        updatedAt: now,
        publishedAt: isPublishedState ? (blogForm.publishedAt || now) : null
      };

      if (isEditing) {
        const blogDocRef = doc(db, 'blogs', currentBlogId);
        await updateDoc(blogDocRef, blogPayload);
        alert("Blog node updated successfully.");
      } else {
        const blogsRef = collection(db, 'blogs');
        await addDoc(blogsRef, {
          ...blogPayload,
          createdAt: now
        });
        alert("New blog document compiled and pushed to Firestore.");
      }

      if (isPublishedState) {
        triggerSearchEngineNotification(blogForm.slug);
      }

      resetBlogForm();
    } catch (error) {
      console.error("Error committing blog record: ", error);
      alert("Failed to write document parameters into database cluster.");
    }
  };

  const handleEditSelect = (blog) => {
    setIsEditing(true);
    setCurrentBlogId(blog.id);
    setPreviewMode(false);
    setBlogForm({
      title: blog.title || '',
      slug: blog.slug || '',
      summary: blog.summary || '',
      content: blog.content || '',
      coverImage: blog.coverImage || '',
      coverImageAlt: blog.coverImageAlt || '',
      category: blog.category || 'React',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      author: blog.author || '',
      published: !!blog.published,
      featured: !!blog.featured,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      canonicalUrl: blog.canonicalUrl || '',
      schemaType: blog.schemaType || 'BlogPosting',
      noIndex: !!blog.noIndex,
      readTime: blog.readTime || '1 min read',
      publishedAt: blog.publishedAt || null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("CRITICAL WARNING: Are you certain you want to purge this blog document from the system cluster permanently?")) {
      try {
        await deleteDoc(doc(db, 'blogs', blogId));
        alert("Blog document successfully purged.");
        if (currentBlogId === blogId) resetBlogForm();
      } catch (error) {
        console.error("Error purging blog document: ", error);
        alert("Purge transaction failed.");
      }
    }
  };

  // Metrics Calculations
  const totalBlogsCount = blogs.length;
  const publishedBlogsCount = blogs.filter(b => b.published).length;
  const draftBlogsCount = blogs.filter(b => !b.published).length;
  const featuredBlogsCount = blogs.filter(b => b.featured).length;

  // Pipeline Filter Processing
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          blog.summary?.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesCategory = blogCategoryFilter === 'All' || blog.category === blogCategoryFilter;
    const matchesStatus = blogStatusFilter === 'All' || 
                          (blogStatusFilter === 'Published' && blog.published) || 
                          (blogStatusFilter === 'Draft' && !blog.published) ||
                          (blogStatusFilter === 'Featured' && blog.featured);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (blogSortOrder === 'newest') return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    if (blogSortOrder === 'oldest') return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
    if (blogSortOrder === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
    return 0;
  });

  // Pagination
  const indexOfLastBlog = blogPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentPaginatedBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage) || 1;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center px-4 font-sans text-white">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
          Verifying secure session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center px-4 font-sans text-white">
        <div className="max-w-md w-full bg-[#141414] border border-[#00f2fe]/20 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#00f2fe] animate-pulse"></div>
            <h2 className="text-xl font-bold tracking-wider uppercase text-slate-200">OnyxStack Control Tower</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Admin Email</label>
              <input
                type="email"
                required
                autoComplete="username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@onyxstacklabs.com"
                className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-white placeholder-slate-600 outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter system access token..."
                className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-white placeholder-slate-600 outline-none transition-all duration-300"
              />
            </div>

            {authError && (
              <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full bg-gradient-to-r from-[#00f2fe] to-[#0575e6] hover:opacity-90 disabled:opacity-50 text-black font-semibold uppercase tracking-wider py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#00f2fe]/10"
            >
              {authSubmitting ? 'Verifying...' : 'Initialize Console'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-slate-900 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe]"></span>
            <h1 className="text-xl font-black uppercase tracking-wider text-white">OnyxStack Labs</h1>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setCurrentTab('leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                currentTab === 'leads' 
                  ? 'bg-gradient-to-r from-[#00f2fe]/10 to-transparent text-[#00f2fe] border-l-2 border-[#00f2fe]' 
                  : 'text-slate-400 hover:text-white hover:bg-[#141414]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Lead Management
            </button>

            <button
              onClick={() => setCurrentTab('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                currentTab === 'blog' 
                  ? 'bg-gradient-to-r from-[#00f2fe]/10 to-transparent text-[#00f2fe] border-l-2 border-[#00f2fe]' 
                  : 'text-slate-400 hover:text-white hover:bg-[#141414]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Blog Management
            </button>

            <button
              onClick={() => setCurrentTab('recruitment')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                currentTab === 'recruitment' 
                  ? 'bg-gradient-to-r from-[#00f2fe]/10 to-transparent text-[#00f2fe] border-l-2 border-[#00f2fe]' 
                  : 'text-slate-400 hover:text-white hover:bg-[#141414]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Recruitment Pipeline
            </button>
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-900 space-y-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-mono rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
          <div className="text-[10px] font-mono text-slate-500 text-center">
            {user?.email && <span className="block truncate mb-1 text-slate-400">{user.email}</span>}
            Operational Anchor v2.2.0<br/>
            Secure Environment Protected
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <header className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe]"></span>
              <h1 className="text-2xl font-black uppercase tracking-wider text-white">
                {currentTab === 'leads' && 'Lead Matrix Hub'}
                {currentTab === 'blog' && 'Enterprise Blog CMS Engine'}
                {currentTab === 'recruitment' && 'Recruitment Control Node'}
              </h1>
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-widest">
              {currentTab === 'leads' && 'Central Lead Matrix & Funnel Control'}
              {currentTab === 'blog' && 'Decoupled Semantic Layout and Content Pipelines'}
              {currentTab === 'recruitment' && 'Dynamic Candidate Sourcing Pipeline Tracking'}
            </p>
          </div>
          <div className="bg-[#111] border border-slate-800 rounded-lg px-4 py-2 text-xs font-mono text-slate-400">
            {currentTab === 'leads' && <>Total Nodes Cached: <span className="text-[#00f2fe] font-bold">{leads.length}</span></>}
            {currentTab === 'blog' && <>Core Collection Entries: <span className="text-[#00f2fe] font-bold">{blogs.length}</span></>}
            {currentTab === 'recruitment' && <>Visible Applications: <span className="text-[#00f2fe] font-bold">{candidates.length}</span></>}
          </div>
        </header>

        <main className="max-w-7xl mx-auto">
          
          {/* TAB 1: LEAD MANAGEMENT */}
          {currentTab === 'leads' && (
            <>
              {loading ? (
                <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">Syncing streaming channels...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 font-mono text-sm">No operational data pipelines detected in agency_leads.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {leads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className={`bg-[#121212] border rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        lead.status === 'approved' ? 'border-[#00f2fe]/30 shadow-md shadow-[#00f2fe]/5' :
                        lead.status === 'contracted' ? 'border-emerald-500/30' :
                        lead.status === 'rejected' ? 'border-red-900/40 opacity-40 hover:opacity-60' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white tracking-wide">{lead.companyName || 'Anonymous Project'}</h3>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{lead.email}</p>
                          </div>
                          <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 rounded border ${
                            lead.status === 'approved' ? 'bg-[#00f2fe]/10 text-[#00f2fe] border-[#00f2fe]/20' :
                            lead.status === 'contracted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            lead.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {lead.status?.replace('_', ' ') || 'unassigned'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-[#181818] border border-slate-900 rounded-lg p-4 mb-6 text-xs font-mono">
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Allocation Target</span>
                            <span className="text-slate-200">{lead.budget || 'Not specified'}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Scope Anchor</span>
                            <span className="text-slate-200 capitalize">{lead.details || 'General Request'}</span>
                          </div>

                          {(lead.sourceUrl || lead.blogSlug) && (
                            <div className="col-span-2 border-t border-slate-900 pt-2">
                              <span className="block text-[10px] uppercase tracking-wider text-[#00f2fe] mb-0.5">// Lead Attribution Source</span>
                              <span className="text-slate-300 text-[11px] font-mono">
                                Converted from: <strong className="text-cyan-400">{lead.blogSlug || lead.sourceUrl}</strong>
                              </span>
                            </div>
                          )}

                          <div className="col-span-2 border-t border-slate-900 pt-2 mt-1">
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Transmission Timestamp</span>
                            <span className="text-slate-400 text-[11px]">
                              {lead.timestamp?.seconds ? new Date(lead.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-900 pt-4 mt-2 flex flex-wrap gap-2 justify-between items-center">
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'approved')}
                            disabled={lead.status === 'approved'}
                            className="px-3 py-1.5 bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 text-[#00f2fe] disabled:opacity-40 disabled:hover:bg-[#00f2fe]/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'contracted')}
                            disabled={lead.status === 'contracted'}
                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Contracted
                          </button>
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'rejected')}
                            disabled={lead.status === 'rejected'}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-40 disabled:hover:bg-red-500/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Reject
                          </button>
                        </div>

                        {lead.phone && (
                          <button
                            onClick={() => triggerWhatsAppCommunication(lead.phone, lead.companyName)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-200 text-black text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center gap-1"
                          >
                            <span>Launch Loop</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: BLOG MANAGEMENT */}
          {currentTab === 'blog' && (
            <div className="space-y-10">
              
              {/* ANALYTICS PANEL */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#121212] border border-slate-900 rounded-xl p-5 shadow-sm">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Total Blogs</div>
                  <div className="text-3xl font-black text-white tracking-tight">{totalBlogsCount}</div>
                </div>
                <div className="bg-[#121212] border border-slate-900 rounded-xl p-5 shadow-sm">
                  <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1">Published Blogs</div>
                  <div className="text-3xl font-black text-emerald-400 tracking-tight">{publishedBlogsCount}</div>
                </div>
                <div className="bg-[#121212] border border-slate-900 rounded-xl p-5 shadow-sm">
                  <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-1">Draft Blogs</div>
                  <div className="text-3xl font-black text-amber-400 tracking-tight">{draftBlogsCount}</div>
                </div>
                <div className="bg-[#121212] border border-slate-900 rounded-xl p-5 shadow-sm">
                  <div className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-1">Featured Blogs</div>
                  <div className="text-3xl font-black text-cyan-400 tracking-tight">{featuredBlogsCount}</div>
                </div>
              </div>

              {/* BLOG EDITOR */}
              <div className="bg-[#121212] border border-slate-900 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b border-slate-900 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
                    <h2 className="text-base font-bold uppercase tracking-wider text-slate-200">
                      {isEditing ? 'Modify Active Blog Payload' : 'Compile New Knowledge Node'}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleGenerateAiContent}
                      disabled={isAiGenerating}
                      className="text-xs font-mono px-3 py-1.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                    >
                      {isAiGenerating ? 'Generating...' : '⚡ AI Auto-Generate Content'}
                    </button>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetBlogForm}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                      >
                        Abort Modification Loop
                      </button>
                    )}
                  </div>
                </div>

                {previewMode ? (
                  <div className="space-y-6 bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Virtual DOM Preview Node</span>
                      <button 
                        type="button" 
                        onClick={() => setPreviewMode(false)}
                        className="text-xs font-mono px-3 py-1.5 bg-[#1a1a1a] border border-slate-800 rounded text-slate-300 hover:text-white"
                      >
                        Return to Workspace Editor
                      </button>
                    </div>

                    {blogForm.coverImage ? (
                      <img 
                        src={blogForm.coverImage} 
                        alt={blogForm.coverImageAlt || "Cover Preview"} 
                        className="w-full h-64 object-cover rounded-xl border border-slate-800"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-32 bg-[#1a1a1a] rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-xs font-mono text-slate-600">
                        No Cover Image Attached
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex gap-2 text-xs font-mono text-slate-500">
                        <span className="text-[#00f2fe] font-bold">{blogForm.category}</span>
                        <span>•</span>
                        <span>{blogForm.readTime}</span>
                        <span>•</span>
                        <span>By {blogForm.author || 'Anonymous Author'}</span>
                      </div>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{blogForm.title || 'Untitled Document Template'}</h1>
                      <p className="text-slate-400 text-sm italic">{blogForm.summary || 'No summary overview assigned.'}</p>
                    </div>

                    <div className="border-t border-slate-900 pt-4 text-slate-300 text-sm italic leading-relaxed whitespace-pre-wrap font-sans">
                      {blogForm.content || 'Payload body stream is vacant.'}
                    </div>

                    <div className="bg-[#111] p-4 rounded-lg border border-slate-900 font-mono text-xs text-slate-400 space-y-1">
                      <div className="text-slate-500 uppercase text-[10px] font-bold tracking-wider mb-1">SEO Routing Header Parameters</div>
                      <div><span className="text-slate-600">Slug Endpoint:</span> /blog/{blogForm.slug}</div>
                      <div><span className="text-slate-600">Meta Title:</span> {blogForm.seoTitle || blogForm.title}</div>
                      <div><span className="text-slate-600">Canonical:</span> {blogForm.canonicalUrl || `https://onyxstacklabs.com/blog/${blogForm.slug}`}</div>
                      <div><span className="text-slate-600">Schema Type:</span> {blogForm.schemaType}</div>
                      <div><span className="text-slate-600">Robots State:</span> {blogForm.noIndex ? 'NOINDEX, NOFOLLOW' : 'INDEX, FOLLOW'}</div>
                      <div><span className="text-slate-600">Meta Tags:</span> {blogForm.tags}</div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSaveBlog(e)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left Core Parameter Stack */}
                      <div className="md:col-span-8 space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Article Headline Title</label>
                          <input
                            type="text"
                            name="title"
                            required
                            value={blogForm.title}
                            onChange={handleBlogFormChange}
                            placeholder="Orchestrating Sub-Second Inference Loops..."
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Static Slug Router Node (Auto/Manual)</label>
                            <input
                              type="text"
                              name="slug"
                              required
                              value={blogForm.slug}
                              onChange={handleBlogFormChange}
                              placeholder="gemini-cognitive-fabrics"
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Structural Category Faculty</label>
                            <select
                              name="category"
                              value={blogForm.category}
                              onChange={handleBlogFormChange}
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-all"
                            >
                              {["AI", "Web Development", "Mobile Apps", "React", "Firebase", "UI/UX", "Business", "Case Studies"].map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Editorial Executive Summary</label>
                          <textarea
                            name="summary"
                            required
                            rows="2"
                            value={blogForm.summary}
                            onChange={handleBlogFormChange}
                            placeholder="A structural analysis detailing core optimizations across layout containers..."
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                          />
                        </div>

                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <label className="block text-xs uppercase tracking-widest text-slate-400">Rich Text Content Core Payload Block</label>
                            <div className="flex flex-wrap gap-1.5 bg-black/40 border border-slate-900 rounded-lg p-1.5 text-[10px] font-mono">
                              <span className="text-slate-500 px-1 font-bold">Parser Rules:</span>
                              <span className="text-cyan-400 bg-cyan-500/5 px-1.5 py-0.5 border border-cyan-500/10 rounded">### Heading</span>
                              <span className="text-amber-400 bg-amber-500/5 px-1.5 py-0.5 border border-amber-500/10 rounded">Text Ending With :</span>
                              <span className="text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 border border-emerald-500/10 rounded">- List Item</span>
                              <span className="text-purple-400 bg-purple-500/5 px-1.5 py-0.5 border border-purple-500/10 rounded">// Code Container</span>
                            </div>
                          </div>

                          <textarea
                            name="content"
                            required
                            rows="12"
                            value={blogForm.content}
                            onChange={handleBlogFormChange}
                            placeholder="Example Output Syntax:&#10;&#10;### 1. Architectural Foundations&#10;This is a normal paragraph layout block row.&#10;&#10;Key Parameters Checklist:&#10;- Optimize structural rendering hooks&#10;- Route clean client-side nodes&#10;&#10;// Code block segment (Start line with double forward slashes)&#10;// const activeNodeCluster = await getDocs(q);"
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-xs font-sans text-white placeholder-slate-600 outline-none transition-all resize-y leading-relaxed selection:bg-cyan-500/20"
                          />
                          <div className="text-[10px] font-mono text-slate-500 mt-1 flex justify-between">
                            <span>Computed Output Pipeline: <strong className="text-cyan-400">{blogForm.readTime}</strong></span>
                            <span>Standard breaks and spaces delineate word maps.</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Meta Configuration Stack */}
                      <div className="md:col-span-4 space-y-4 bg-[#161616]/60 border border-slate-900 rounded-xl p-4">
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider border-b border-slate-900 pb-2 mb-2">// Meta Schema Fields</div>
                        
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Author Signature</label>
                          <input
                            type="text"
                            name="author"
                            required
                            value={blogForm.author}
                            onChange={handleBlogFormChange}
                            placeholder="Alex Rivers"
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Cover Image CDN Target</label>
                          <input
                            type="text"
                            name="coverImage"
                            value={blogForm.coverImage}
                            onChange={handleBlogFormChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Cover Image ALT Text (SEO)</label>
                          <input
                            type="text"
                            name="coverImageAlt"
                            value={blogForm.coverImageAlt}
                            onChange={handleBlogFormChange}
                            placeholder="Graphic illustration describing the blog title"
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Tags Indices (Comma Separated)</label>
                          <input
                            type="text"
                            name="tags"
                            value={blogForm.tags}
                            onChange={handleBlogFormChange}
                            placeholder="Gemini AI, Tailwind, Architecture"
                            className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div className="pt-2 border-t border-slate-900 space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500">// SEO Edge Overrides</label>
                            <span className="text-[10px] font-mono text-cyan-400">Realtime Validator</span>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-[10px] font-mono mb-1">
                              <span className="text-slate-400">Meta Title</span>
                              <span className={(blogForm.seoTitle || blogForm.title).length > 60 ? 'text-amber-400' : 'text-slate-500'}>
                                {(blogForm.seoTitle || blogForm.title).length}/60
                              </span>
                            </div>
                            <input
                              type="text"
                              name="seoTitle"
                              value={blogForm.seoTitle}
                              onChange={handleBlogFormChange}
                              placeholder="SEO Meta Custom Title Token"
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] font-mono mb-1">
                              <span className="text-slate-400">Meta Description</span>
                              <span className={(blogForm.seoDescription || blogForm.summary).length > 160 ? 'text-amber-400' : 'text-slate-500'}>
                                {(blogForm.seoDescription || blogForm.summary).length}/160
                              </span>
                            </div>
                            <textarea
                              name="seoDescription"
                              rows="2"
                              value={blogForm.seoDescription}
                              onChange={handleBlogFormChange}
                              placeholder="SEO Description Parameter Field Index"
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1">Canonical URL Override</label>
                            <input
                              type="text"
                              name="canonicalUrl"
                              value={blogForm.canonicalUrl}
                              onChange={handleBlogFormChange}
                              placeholder="https://onyxstacklabs.com/blog/custom-canonical"
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1">Structured Schema Markup Type</label>
                            <select
                              name="schemaType"
                              value={blogForm.schemaType}
                              onChange={handleBlogFormChange}
                              className="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-1.5 text-xs text-white outline-none transition-all"
                            >
                              <option value="BlogPosting">BlogPosting (Standard)</option>
                              <option value="TechArticle">TechArticle (Technical)</option>
                              <option value="NewsArticle">NewsArticle (Updates)</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-900 space-y-3 bg-[#111] p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Set Blog Live</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="published"
                                checked={blogForm.published}
                                onChange={handleBlogFormChange}
                                className="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Feature Headline</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="featured"
                                checked={blogForm.featured}
                                onChange={handleBlogFormChange}
                                className="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Robots NoIndex Flag</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="noIndex"
                                checked={blogForm.noIndex}
                                onChange={handleBlogFormChange}
                                className="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setPreviewMode(true)}
                        className="px-4 py-2 border border-slate-800 bg-[#161616] text-slate-300 hover:text-white rounded-lg text-xs font-mono tracking-wider transition-all"
                      >
                        Inspect Node Blueprint Preview
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveBlog(null, false)}
                          className="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-lg text-xs font-mono tracking-wider transition-all"
                        >
                          Draft State Caching
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-gradient-to-r from-[#00f2fe] to-[#0575e6] text-black font-bold uppercase text-xs tracking-widest rounded-lg transition-all shadow-md shadow-[#00f2fe]/10"
                        >
                          {isEditing ? 'Commit Node Updates' : 'Publish to Edge Registry'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* BLOG TABLE REGISTRY */}
              <div className="bg-[#121212] border border-slate-900 rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">System Document Registry</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <input
                      type="text"
                      placeholder="Search registry rows..."
                      value={blogSearch}
                      onChange={(e) => setBlogSearch(e.target.value)}
                      className="bg-[#1a1a1a] border border-slate-800 rounded px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-[#00f2fe]"
                    />
                    
                    <select
                      value={blogCategoryFilter}
                      onChange={(e) => setBlogCategoryFilter(e.target.value)}
                      className="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="All">All Categories</option>
                      {["AI", "Web Development", "Mobile Apps", "React", "Firebase", "UI/UX", "Business", "Case Studies"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <select
                      value={blogStatusFilter}
                      onChange={(e) => setBlogStatusFilter(e.target.value)}
                      className="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Published">Published Node</option>
                      <option value="Draft">Draft Staged</option>
                      <option value="Featured">Featured Cluster</option>
                    </select>

                    <select
                      value={blogSortOrder}
                      onChange={(e) => setBlogSortOrder(e.target.value)}
                      className="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="newest">Newest Sequence</option>
                      <option value="oldest">Oldest Sequence</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>

                {blogsLoading ? (
                  <div className="text-center py-10 font-mono text-xs text-slate-500 animate-pulse">Querying cloud document arrays...</div>
                ) : currentPaginatedBlogs.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl text-xs font-mono text-slate-500">
                    No documents returned under current matching parameters inside collection: blogs.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                      <div className="col-span-5">Meta Title Context Mapping</div>
                      <div className="col-span-2">Category</div>
                      <div className="col-span-2">Status Node</div>
                      <div className="col-span-3 text-right">Cluster Operations</div>
                    </div>

                    {currentPaginatedBlogs.map((blog) => (
                      <div 
                        key={blog.id}
                        className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 bg-[#161616]/70 border border-slate-900 rounded-xl p-4 transition-all hover:border-slate-800"
                      >
                        <div className="col-span-1 sm:col-span-5">
                          <div className="text-sm font-bold text-white tracking-wide truncate">{blog.title}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">/blog/{blog.slug} | By {blog.author || 'N/A'}</div>
                        </div>

                        <div className="col-span-1 sm:col-span-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                            {blog.category}
                          </span>
                        </div>

                        <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-bold border ${
                            blog.published 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {blog.published ? 'Live' : 'Draft'}
                          </span>
                          {blog.featured && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                              Star
                            </span>
                          )}
                          {blog.noIndex && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                              NoIndex
                            </span>
                          )}
                        </div>

                        <div className="col-span-1 sm:col-span-3 flex justify-end gap-1.5">
                          <button
                            onClick={() => {
                              handleEditSelect(blog);
                              setPreviewMode(true);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[10px] font-mono transition-all"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleEditSelect(blog)}
                            className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 rounded text-[10px] font-mono transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded text-[10px] font-mono transition-all"
                          >
                            Purge
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 font-mono text-xs text-slate-500">
                      <div>
                        Page {blogPage} of {totalPages} ({sortedBlogs.length} target records matched)
                      </div>
                      <div className="flex gap-1">
                        <button
                          disabled={blogPage === 1}
                          onClick={() => setBlogPage(prev => prev - 1)}
                          className="px-2.5 py-1 bg-slate-900 border border-slate-800 disabled:opacity-30 rounded hover:text-white"
                        >
                          Prev
                        </button>
                        <button
                          disabled={blogPage === totalPages}
                          onClick={() => setBlogPage(prev => prev + 1)}
                          className="px-2.5 py-1 bg-slate-900 border border-slate-800 disabled:opacity-30 rounded hover:text-white"
                        >
                          Next
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: RECRUITMENT PIPELINE */}
          {currentTab === 'recruitment' && (
            <div className="space-y-6">
              
              <div className="flex gap-2 border-b border-slate-900 pb-3">
                {['pending', 'shortlisted', 'archived'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCandidateTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
                      activeCandidateTab === tab
                        ? tab === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          tab === 'shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-[#121212] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {candidatesLoading ? (
                <div className="text-center py-20 text-slate-500 font-mono text-sm animate-pulse">Syncing recruitment streams...</div>
              ) : candidates.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-slate-500 font-mono text-sm">No applications matching "{activeCandidateTab}" state in system query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {candidates.map((candidate) => (
                    <div 
                      key={candidate.id} 
                      className={`bg-[#121212] border rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        candidate.status === 'shortlisted' ? 'border-emerald-500/30 shadow-md shadow-emerald-500/5' :
                        candidate.status === 'archived' ? 'border-red-900/40 opacity-50 hover:opacity-75' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-white tracking-wide">{candidate.name || 'Anonymous Applicant'}</h3>
                              <div className="flex gap-1 ml-2">
                                <button
                                  onClick={() => updateCandidateStatus(candidate.id, 'shortlisted')}
                                  title="Shortlist Candidate"
                                  className={`p-1 rounded transition-all ${candidate.status === 'shortlisted' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-600 hover:text-emerald-400 hover:bg-[#1a1a1a]'}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => updateCandidateStatus(candidate.id, 'archived')}
                                  title="Archive Candidate"
                                  className={`p-1 rounded transition-all ${candidate.status === 'archived' ? 'text-red-400 bg-red-500/10' : 'text-slate-600 hover:text-red-400 hover:bg-[#1a1a1a]'}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{candidate.email}</p>
                          </div>
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 rounded border bg-[#00f2fe]/10 text-[#00f2fe] border-[#00f2fe]/20">
                            {candidate.role || 'Unassigned Role'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 bg-[#181818] border border-slate-900 rounded-lg p-4 mb-4 text-xs font-mono">
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Experience & Skills</span>
                            <span className="text-slate-200 block whitespace-pre-wrap">{candidate.experience || 'Not detailed'}</span>
                          </div>
                          {candidate.portfolio && (
                            <div className="border-t border-slate-900 pt-2 mt-1">
                              <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Portfolio Node</span>
                              <a href={candidate.portfolio} target="_blank" rel="noreferrer" className="text-[#00f2fe] hover:underline break-all">
                                {candidate.portfolio}
                              </a>
                            </div>
                          )}
                          <div className="border-t border-slate-900 pt-2 mt-1">
                            <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Submission Timestamp</span>
                            <span className="text-slate-400 text-[11px]">
                              {candidate.submittedAt?.seconds ? new Date(candidate.submittedAt.seconds * 1000).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-slate-900 pt-4 mt-2">
                        <button
                          onClick={() => triggerEmailCommunication(candidate.email, candidate.name, candidate.role || 'Developer')}
                          className="px-3 py-1.5 bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-semibold rounded uppercase tracking-wider transition-all border border-[#00f2fe]/20"
                        >
                          Send Email
                        </button>
                        {candidate.phone && (
                          <button
                            onClick={() => triggerWhatsAppCommunication(candidate.phone, candidate.name)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-200 text-black text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center gap-1"
                          >
                            <span>Contact on WhatsApp</span>
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

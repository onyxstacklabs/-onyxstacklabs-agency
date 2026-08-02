Import React, { useState, useEffect } from 'react';
// Google Gen AI SDK integration for automated content generation
Import { GoogleGenAI } from '@google/genai';

// Exact relative trajectory mapping targeting the real firebase module location
Import { db, auth } from '../config/firebase'; 
Import { collection, query, onSnapshot, doc, updateDoc, addDoc, deleteDoc, serverTimestamp, where } from 'firebase/firestore';
Import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Initialize Gemini Client using standard Vite Environment Variable key
Const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
Const ai = apiKey ? New GoogleGenAI({ apiKey }) : null;
Const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';

Export default function OnyxAdmin() {
  Const [leads, setLeads] = useState([]);
  Const [loading, setLoading] = useState(true);

  // Firebase Authentication Session State Matrix
  Const [user, setUser] = useState(null);
  Const [authLoading, setAuthLoading] = useState(true);
  Const [loginEmail, setLoginEmail] = useState('');
  Const [loginPassword, setLoginPassword] = useState('');
  Const [authError, setAuthError] = useState('');
  Const [authSubmitting, setAuthSubmitting] = useState(false);

  // Derived authentication flag — kept so all existing gated effects below
  // (leads / blogs / recruitment listeners) continue to work unchanged.
  Const isAuthenticated = !!user;

  // Enterprise Blog CMS State Matrix
  Const [currentTab, setCurrentTab] = useState('leads'); // 'leads', 'blog', or 'recruitment'
  Const [blogs, setBlogs] = useState([]);
  Const [blogsLoading, setBlogsLoading] = useState(true);
  
  // Recruitment Pipeline Core State Matrix
  Const [candidates, setCandidates] = useState([]);
  Const [candidatesLoading, setCandidatesLoading] = useState(true);
  Const [activeCandidateTab, setActiveCandidateTab] = useState('pending'); // 'pending', 'shortlisted', 'archived'
  
  // Blog Filter/Sort/Search Pipeline State
  Const [blogSearch, setBlogSearch] = useState('');
  Const [blogCategoryFilter, setBlogCategoryFilter] = useState('All');
  Const [blogStatusFilter, setBlogStatusFilter] = useState('All');
  Const [blogSortOrder, setBlogSortOrder] = useState('newest');
  Const [blogPage, setBlogPage] = useState(1);
  Const blogsPerPage = 5;

  // Blog Form / Editor State (Enhanced with Full SEO & Freshness Schema)
  Const [isEditing, setIsEditing] = useState(false);
  Const [currentBlogId, setCurrentBlogId] = useState(null);
  Const [blogForm, setBlogForm] = useState({
    Title: '',
    Slug: '',
    Summary: '',
    Content: '',
    CoverImage: '',
    CoverImageAlt: '',
    Category: 'React',
    Tags: '',
    Author: '',
    Published: false,
    Featured: false,
    SeoTitle: '',
    SeoDescription: '',
    CanonicalUrl: '',
    SchemaType: 'BlogPosting',
    NoIndex: false,
    ReadTime: '1 min read',
    PublishedAt: null
  });

  Const [previewMode, setPreviewMode] = useState(false);
  Const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Auto-generate Slug & Reading Time on Title/Content Mutations
  UseEffect(() => {
    If (!isEditing) {
      Const computedSlug = blogForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      SetBlogForm(prev => ({ ...prev, slug: computedSlug }));
    }
  }, [blogForm.title, isEditing]);

  UseEffect(() => {
    Const words = blogForm.content.trim() ? BlogForm.content.trim().split(/\s+/).length : 0;
    Const minutes = Math.max(1, Math.ceil(words / 225));
    SetBlogForm(prev => ({ ...prev, readTime: `${minutes} min read` }));
  }, [blogForm.content]);

  // Firebase Authentication Session Listener — persists login across refreshes
  UseEffect(() => {
    Const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      SetUser(firebaseUser);
      SetAuthLoading(false);
    });
    Return () => unsubscribe();
  }, []);

  // Secure Firebase Authentication Login Handler
  Const handleLogin = async (e) => {
    E.preventDefault();
    SetAuthError('');
    SetAuthSubmitting(true);
    Try {
      Await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword);
      SetLoginPassword('');
    } catch (error) {
      Console.error("Firebase authentication error: ", error);
      SetAuthError('Access Denied: Invalid credentials or account not authorized.');
    } finally {
      SetAuthSubmitting(false);
    }
  };

  // Secure Logout Handler — clears session and returns user to Login Screen
  Const handleLogout = async () => {
    Try {
      Await signOut(auth);
    } catch (error) {
      Console.error("Error signing out: ", error);
    }
  };

  // Real-time listener for incoming agency leads
  UseEffect(() => {
    If (!isAuthenticated) return;

    Const leadsRef = collection(db, 'agency_leads');
    Const q = query(leadsRef);

    Const unsubscribe = onSnapshot(q, (snapshot) => {
      Const fetchedLeads = snapshot.docs.map(doc => ({
        Id: doc.id,
        ...doc.data()
      }));

      FetchedLeads.sort((a, b) => {
        Const timeA = a.timestamp?.seconds || 0;
        Const timeB = b.timestamp?.seconds || 0;
        Return timeB - timeA;
      });

      SetLeads(fetchedLeads);
      SetLoading(false);
    }, (error) => {
      Console.error("Firestore stream error: ", error);
      SetLoading(false);
    });

    Return () => unsubscribe();
  }, [isAuthenticated]);

  // Real-time listener for Enterprise Blog CMS Matrix
  UseEffect(() => {
    If (!isAuthenticated) return;

    Const blogsRef = collection(db, 'blogs');
    Const q = query(blogsRef);

    Const unsubscribe = onSnapshot(q, (snapshot) => {
      Const fetchedBlogs = snapshot.docs.map(doc => ({
        Id: doc.id,
        ...doc.data()
      }));

      FetchedBlogs.sort((a, b) => {
        Const timeA = a.createdAt?.seconds || 0;
        Const timeB = b.createdAt?.seconds || 0;
        Return timeB - timeA;
      });

      SetBlogs(fetchedBlogs);
      SetBlogsLoading(false);
    }, (error) => {
      Console.error("Firestore blogs stream error: ", error);
      SetBlogsLoading(false);
    });

    Return () => unsubscribe();
  }, [isAuthenticated]);

  // Real-time listener for incoming recruitment submissions
  UseEffect(() => {
    If (!isAuthenticated) return;
    SetCandidatesLoading(true);

    Const recruitmentRef = collection(db, 'recruitment_pipeline');
    Const q = query(
      RecruitmentRef, 
      Where('status', '==', activeCandidateTab)
    );

    Const unsubscribe = onSnapshot(q, (snapshot) => {
      Const fetchedCandidates = snapshot.docs.map(doc => ({
        Id: doc.id,
        ...doc.data()
      }));

      FetchedCandidates.sort((a, b) => {
        Const timeA = a.submittedAt?.seconds || 0;
        Const timeB = b.submittedAt?.seconds || 0;
        Return timeB - timeA;
      });

      SetCandidates(fetchedCandidates);
      SetCandidatesLoading(false);
    }, (error) => {
      Console.error("Firestore recruitment stream error: ", error);
      SetCandidatesLoading(false);
    });

    Return () => unsubscribe();
  }, [isAuthenticated, activeCandidateTab]);

  // Core Mutation Logic for updating Lead Status
  Const updateLeadStatus = async (leadId, newStatus) => {
    Try {
      Const leadDocRef = doc(db, 'agency_leads', leadId);
      Await updateDoc(leadDocRef, { status: newStatus });
    } catch (error) {
      Console.error("Error updating lead status: ", error);
      Alert("Failed to update status node.");
    }
  };

  // Core Mutation Logic for candidate workflows
  Const updateCandidateStatus = async (candidateId, newStatus) => {
    Try {
      Const candidateDocRef = doc(db, 'recruitment_pipeline', candidateId);
      Await updateDoc(candidateDocRef, { status: newStatus });
    } catch (error) {
      Console.error("Error mutating candidate pipeline state: ", error);
      Alert("Failed to update candidate workflow node.");
    }
  };

  // WhatsApp communication helper
  Const triggerWhatsAppCommunication = (phone, companyName) => {
    Const cleanPhone = phone.replace(/[^\d+]/g, ''); 
    Const message = `Hello ${companyName},\n\nThis is OnyxStack Labs. We have successfully verified your parameters and initiated your active engineering funnel.\n\nLet us schedule a quick technical discovery call. Please let us know your availability.`;
    Const encodedMessage = encodeURIComponent(message);
    Window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
  };

  // Email communication helper
  Const triggerEmailCommunication = (email, name, role) => {
    Const subject = encodeURIComponent(`[OnyxStack Labs] Application Update - ${role}`);
    Const body = encodeURIComponent(`Hello ${name},\n\nThank you for applying for the ${role} position at OnyxStack Labs.\n\nWe have reviewed your profile and would like to move forward to discuss your technical parameters.\n\nBest Regards,\nOnyxStack Labs Management`);
    Window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
  };

  // Helper function to auto-optimize image URL parameters for WebP/compression
  Const optimizeImageUrl = (url) => {
    If (!url) return '';
    If (url.includes('images.unsplash.com') && !url.includes('auto=format')) {
      Const joinChar = url.includes('?') ? '&' : '?';
      Return `${url}${joinChar}auto=format&fit=crop&w=1200&q=80`;
    }
    Return url;
  };

  // Background non-blocking IndexNow / Sitemap notification hook
  Const triggerSearchEngineNotification = async (slug) => {
    Try {
      Const targetUrl = `https://onyxstacklabs.com/blog/${slug}`;
      Console.log(`[SEO Sync] Triggering background revalidation ping for: ${targetUrl}`);
      Fetch('/api/revalidate-sitemap', {
        Method: 'POST',
        Headers: { 'Content-Type': 'application/json' },
        Body: JSON.stringify({ slug, url: targetUrl })
      }).catch(err => console.log('[SEO Sync Ping Silent Fallback]:', err));
    } catch (e) {
      // Non-blocking catch
    }
  };

  // Gemini AI Content Generation Handler
  Const handleGenerateAiContent = async () => {
    If (!blogForm.title.trim()) {
      Alert("Please specify an Article Headline Title first to guide the AI generation.");
      Return;
    }

    If (!ai) {
      Alert("Gemini API key is missing. Please make sure VITE_GEMINI_API_KEY is defined in Vercel / environment variables.");
      Return;
    }

    SetIsAiGenerating(true);
    Try {
      Const prompt = `Act as an expert technical content writer for OnyxStack Labs.
Write a comprehensive, SEO-optimized technical blog article about: "${blogForm.title}".
Category: ${blogForm.category}.

Requirements:
- Structure content using clean Markdown (e.g., ### Headings, bullet points with -, code blocks starting with //).
- Return standard JSON format with keys: "summary", "content", "seoTitle", "seoDescription", "tags".
- "seoTitle": max 60 characters.
- "seoDescription": max 160 characters.
- "tags": comma-separated string of 3-5 relevant keywords.`;

      Const response = await ai.models.generateContent({
        Model: GEMINI_MODEL,
        Contents: prompt,
        Config: {
          ResponseMimeType: "application/json"
        }
      });

      Const generatedData = JSON.parse(response.text);

      SetBlogForm(prev => ({
        ...prev,
        Summary: generatedData.summary || prev.summary,
        Content: generatedData.content || prev.content,
        SeoTitle: generatedData.seoTitle || prev.seoTitle,
        SeoDescription: generatedData.seoDescription || prev.seoDescription,
        Tags: generatedData.tags || prev.tags
      }));

      Alert("AI Content & SEO Schema successfully generated!");
    } catch (error) {
      Console.error("Error generating content via Gemini API:", error);
      Alert("Failed to generate content via AI. Check console for error details.");
    } finally {
      SetIsAiGenerating(false);
    }
  };

  // Blog Action Logic Handlers
  Const handleBlogFormChange = (e) => {
    Const { name, value, type, checked } = e.target;
    SetBlogForm(prev => {
      Let updatedValue = type === 'checkbox' ? Checked : value;
      If (name === 'coverImage' && typeof updatedValue === 'string') {
        UpdatedValue = optimizeImageUrl(updatedValue);
      }
      Return {
        ...prev,
        [name]: updatedValue
      };
    });
  };

  Const resetBlogForm = () => {
    SetIsEditing(false);
    SetCurrentBlogId(null);
    SetPreviewMode(false);
    SetBlogForm({
      Title: '',
      Slug: '',
      Summary: '',
      Content: '',
      CoverImage: '',
      CoverImageAlt: '',
      Category: 'React',
      Tags: '',
      Author: '',
      Published: false,
      Featured: false,
      SeoTitle: '',
      SeoDescription: '',
      CanonicalUrl: '',
      SchemaType: 'BlogPosting',
      NoIndex: false,
      ReadTime: '1 min read',
      PublishedAt: null
    });
  };

  // Clean Direct Save Function
  Const handleSaveBlog = async (e, forcePublished = null) => {
    If (e) e.preventDefault();
    Try {
      Const isPublishedState = forcePublished !== null ? ForcePublished : blogForm.published;
      Const processedTags = typeof blogForm.tags === 'string' 
        ? BlogForm.tags.split(',').map(t => t.trim()).filter(Boolean) 
        : blogForm.tags;

      Const now = serverTimestamp();
      Const blogPayload = {
        ...blogForm,
        CoverImage: optimizeImageUrl(blogForm.coverImage),
        Published: isPublishedState,
        Tags: processedTags,
        UpdatedAt: now,
        PublishedAt: isPublishedState ? (blogForm.publishedAt || now) : null
      };

      If (isEditing) {
        Const blogDocRef = doc(db, 'blogs', currentBlogId);
        Await updateDoc(blogDocRef, blogPayload);
        Alert("Blog node updated successfully.");
      } else {
        Const blogsRef = collection(db, 'blogs');
        Await addDoc(blogsRef, {
          ...blogPayload,
          CreatedAt: now
        });
        Alert("New blog document compiled and pushed to Firestore.");
      }

      If (isPublishedState) {
        TriggerSearchEngineNotification(blogForm.slug);
      }

      ResetBlogForm();
    } catch (error) {
      Console.error("Error committing blog record: ", error);
      Alert("Failed to write document parameters into database cluster.");
    }
  };

  Const handleEditSelect = (blog) => {
    SetIsEditing(true);
    SetCurrentBlogId(blog.id);
    SetPreviewMode(false);
    SetBlogForm({
      Title: blog.title || '',
      Slug: blog.slug || '',
      Summary: blog.summary || '',
      Content: blog.content || '',
      CoverImage: blog.coverImage || '',
      CoverImageAlt: blog.coverImageAlt || '',
      Category: blog.category || 'React',
      Tags: Array.isArray(blog.tags) ? Blog.tags.join(', ') : blog.tags || '',
      Author: blog.author || '',
      Published: !!blog.published,
      Featured: !!blog.featured,
      SeoTitle: blog.seoTitle || '',
      SeoDescription: blog.seoDescription || '',
      CanonicalUrl: blog.canonicalUrl || '',
      SchemaType: blog.schemaType || 'BlogPosting',
      NoIndex: !!blog.noIndex,
      ReadTime: blog.readTime || '1 min read',
      PublishedAt: blog.publishedAt || null
    });
    Window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  Const handleDeleteBlog = async (blogId) => {
    If (window.confirm("CRITICAL WARNING: Are you certain you want to purge this blog document from the system cluster permanently?")) {
      Try {
        Await deleteDoc(doc(db, 'blogs', blogId));
        Alert("Blog document successfully purged.");
        If (currentBlogId === blogId) resetBlogForm();
      } catch (error) {
        Console.error("Error purging blog document: ", error);
        Alert("Purge transaction failed.");
      }
    }
  };

  // Metrics Calculations
  Const totalBlogsCount = blogs.length;
  Const publishedBlogsCount = blogs.filter(b => b.published).length;
  Const draftBlogsCount = blogs.filter(b => !b.published).length;
  Const featuredBlogsCount = blogs.filter(b => b.featured).length;

  // Pipeline Filter Processing
  Const filteredBlogs = blogs.filter(blog => {
    Const matchesSearch = blog.title?.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          Blog.summary?.toLowerCase().includes(blogSearch.toLowerCase());
    Const matchesCategory = blogCategoryFilter === 'All' || blog.category === blogCategoryFilter;
    Const matchesStatus = blogStatusFilter === 'All' || 
                          (blogStatusFilter === 'Published' && blog.published) || 
                          (blogStatusFilter === 'Draft' && !blog.published) ||
                          (blogStatusFilter === 'Featured' && blog.featured);
    Return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  Const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    If (blogSortOrder === 'newest') return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    If (blogSortOrder === 'oldest') return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
    If (blogSortOrder === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
    Return 0;
  });

  // Pagination
  Const indexOfLastBlog = blogPage * blogsPerPage;
  Const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  Const currentPaginatedBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  Const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage) || 1;

  // Initial auth-state check in progress
  If (authLoading) {
    Return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center px-4 font-sans text-white">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
          Verifying secure session...
        </div>
      </div>
    );
  }

  If (!isAuthenticated) {
    Return (
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
                Type="email"
                Required
                AutoComplete="username"
                Value={loginEmail}
                OnChange={(e) => setLoginEmail(e.target.value)}
                Placeholder="admin@onyxstacklabs.com"
                ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-white placeholder-slate-600 outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Password</label>
              <input
                Type="password"
                Required
                AutoComplete="current-password"
                Value={loginPassword}
                OnChange={(e) => setLoginPassword(e.target.value)}
                Placeholder="Enter system access token..."
                ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-white placeholder-slate-600 outline-none transition-all duration-300"
              />
            </div>

            {authError && (
              <div className="text-xs font-mono text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {authError}
              </div>
            )}

            <button
              Type="submit"
              Disabled={authSubmitting}
              ClassName="w-full bg-gradient-to-r from-[#00f2fe] to-[#0575e6] hover:opacity-90 disabled:opacity-50 text-black font-semibold uppercase tracking-wider py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#00f2fe]/10"
            >
              {authSubmitting ? 'Verifying...' : 'Initialize Console'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  Return (
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
              OnClick={() => setCurrentTab('leads')}
              ClassName={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                CurrentTab === 'leads' 
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
              OnClick={() => setCurrentTab('blog')}
              ClassName={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                CurrentTab === 'blog' 
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
              OnClick={() => setCurrentTab('recruitment')}
              ClassName={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-mono rounded-lg transition-all duration-200 ${
                CurrentTab === 'recruitment' 
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
            OnClick={handleLogout}
            ClassName="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest font-mono rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
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
                      Key={lead.id} 
                      ClassName={`bg-[#121212] border rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        Lead.status === 'approved' ? 'border-[#00f2fe]/30 shadow-md shadow-[#00f2fe]/5' :
                        Lead.status === 'contracted' ? 'border-emerald-500/30' :
                        Lead.status === 'rejected' ? 'border-red-900/40 opacity-40 hover:opacity-60' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white tracking-wide">{lead.companyName || 'Anonymous Project'}</h3>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{lead.email}</p>
                          </div>
                          <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-1 rounded border ${
                            Lead.status === 'approved' ? 'bg-[#00f2fe]/10 text-[#00f2fe] border-[#00f2fe]/20' :
                            Lead.status === 'contracted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            Lead.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
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
                              {lead.timestamp?.seconds ? New Date(lead.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-900 pt-4 mt-2 flex flex-wrap gap-2 justify-between items-center">
                        <div className="flex gap-1">
                          <button
                            OnClick={() => updateLeadStatus(lead.id, 'approved')}
                            Disabled={lead.status === 'approved'}
                            ClassName="px-3 py-1.5 bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 text-[#00f2fe] disabled:opacity-40 disabled:hover:bg-[#00f2fe]/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Approve
                          </button>
                          <button
                            OnClick={() => updateLeadStatus(lead.id, 'contracted')}
                            Disabled={lead.status === 'contracted'}
                            ClassName="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Contracted
                          </button>
                          <button
                            OnClick={() => updateLeadStatus(lead.id, 'rejected')}
                            Disabled={lead.status === 'rejected'}
                            ClassName="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-40 disabled:hover:bg-red-500/10 text-xs font-semibold rounded uppercase tracking-wider transition-all"
                          >
                            Reject
                          </button>
                        </div>

                        {lead.phone && (
                          <button
                            OnClick={() => triggerWhatsAppCommunication(lead.phone, lead.companyName)}
                            ClassName="px-3 py-1.5 bg-white hover:bg-slate-200 text-black text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center gap-1"
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
                      Type="button"
                      OnClick={handleGenerateAiContent}
                      Disabled={isAiGenerating}
                      ClassName="text-xs font-mono px-3 py-1.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                    >
                      {isAiGenerating ? 'Generating...' : '⚡ AI Auto-Generate Content'}
                    </button>

                    {isEditing && (
                      <button
                        Type="button"
                        OnClick={resetBlogForm}
                        ClassName="text-xs font-mono px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
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
                        Type="button" 
                        OnClick={() => setPreviewMode(false)}
                        ClassName="text-xs font-mono px-3 py-1.5 bg-[#1a1a1a] border border-slate-800 rounded text-slate-300 hover:text-white"
                      >
                        Return to Workspace Editor
                      </button>
                    </div>

                    {blogForm.coverImage ? (
                      <img 
                        Src={blogForm.coverImage} 
                        Alt={blogForm.coverImageAlt || "Cover Preview"} 
                        ClassName="w-full h-64 object-cover rounded-xl border border-slate-800"
                        OnError={(e) => { e.target.style.display = 'none'; }}
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
                            Type="text"
                            Name="title"
                            Required
                            Value={blogForm.title}
                            OnChange={handleBlogFormChange}
                            Placeholder="Orchestrating Sub-Second Inference Loops..."
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Static Slug Router Node (Auto/Manual)</label>
                            <input
                              Type="text"
                              Name="slug"
                              Required
                              Value={blogForm.slug}
                              OnChange={handleBlogFormChange}
                              Placeholder="gemini-cognitive-fabrics"
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Structural Category Faculty</label>
                            <select
                              Name="category"
                              Value={blogForm.category}
                              OnChange={handleBlogFormChange}
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-all"
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
                            Name="summary"
                            Required
                            Rows="2"
                            Value={blogForm.summary}
                            OnChange={handleBlogFormChange}
                            Placeholder="A structural analysis detailing core optimizations across layout containers..."
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
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
                            Name="content"
                            Required
                            Rows="12"
                            Value={blogForm.content}
                            OnChange={handleBlogFormChange}
                            Placeholder="Example Output Syntax:&#10;&#10;### 1. Architectural Foundations&#10;This is a normal paragraph layout block row.&#10;&#10;Key Parameters Checklist:&#10;- Optimize structural rendering hooks&#10;- Route clean client-side nodes&#10;&#10;// Code block segment (Start line with double forward slashes)&#10;// const activeNodeCluster = await getDocs(q);"
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-3 text-xs font-sans text-white placeholder-slate-600 outline-none transition-all resize-y leading-relaxed selection:bg-cyan-500/20"
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
                            Type="text"
                            Name="author"
                            Required
                            Value={blogForm.author}
                            OnChange={handleBlogFormChange}
                            Placeholder="Alex Rivers"
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Cover Image CDN Target</label>
                          <input
                            Type="text"
                            Name="coverImage"
                            Value={blogForm.coverImage}
                            OnChange={handleBlogFormChange}
                            Placeholder="https://images.unsplash.com/..."
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Cover Image ALT Text (SEO)</label>
                          <input
                            Type="text"
                            Name="coverImageAlt"
                            Value={blogForm.coverImageAlt}
                            OnChange={handleBlogFormChange}
                            Placeholder="Graphic illustration describing the blog title"
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1.5">Tags Indices (Comma Separated)</label>
                          <input
                            Type="text"
                            Name="tags"
                            Value={blogForm.tags}
                            OnChange={handleBlogFormChange}
                            Placeholder="Gemini AI, Tailwind, Architecture"
                            ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-4 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
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
                              Type="text"
                              Name="seoTitle"
                              Value={blogForm.seoTitle}
                              OnChange={handleBlogFormChange}
                              Placeholder="SEO Meta Custom Title Token"
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all"
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
                              Name="seoDescription"
                              Rows="2"
                              Value={blogForm.seoDescription}
                              OnChange={handleBlogFormChange}
                              Placeholder="SEO Description Parameter Field Index"
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition-all resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1">Canonical URL Override</label>
                            <input
                              Type="text"
                              Name="canonicalUrl"
                              Value={blogForm.canonicalUrl}
                              OnChange={handleBlogFormChange}
                              Placeholder="https://onyxstacklabs.com/blog/custom-canonical"
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-600 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1">Structured Schema Markup Type</label>
                            <select
                              Name="schemaType"
                              Value={blogForm.schemaType}
                              OnChange={handleBlogFormChange}
                              ClassName="w-full bg-[#1a1a1a] border border-slate-800 focus:border-[#00f2fe] rounded-lg px-3 py-1.5 text-xs text-white outline-none transition-all"
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
                                Type="checkbox" 
                                Name="published"
                                Checked={blogForm.published}
                                OnChange={handleBlogFormChange}
                                ClassName="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Feature Headline</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                Type="checkbox" 
                                Name="featured"
                                Checked={blogForm.featured}
                                OnChange={handleBlogFormChange}
                                ClassName="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Robots NoIndex Flag</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                Type="checkbox" 
                                Name="noIndex"
                                Checked={blogForm.noIndex}
                                OnChange={handleBlogFormChange}
                                ClassName="sr-only peer" 
                              />
                              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-black"></div>
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        Type="button"
                        OnClick={() => setPreviewMode(true)}
                        ClassName="px-4 py-2 border border-slate-800 bg-[#161616] text-slate-300 hover:text-white rounded-lg text-xs font-mono tracking-wider transition-all"
                      >
                        Inspect Node Blueprint Preview
                      </button>

                      <div className="flex gap-2">
                        <button
                          Type="button"
                          OnClick={() => handleSaveBlog(null, false)}
                          ClassName="px-4 py-2 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-lg text-xs font-mono tracking-wider transition-all"
                        >
                          Draft State Caching
                        </button>
                        <button
                          Type="submit"
                          ClassName="px-5 py-2 bg-gradient-to-r from-[#00f2fe] to-[#0575e6] text-black font-bold uppercase text-xs tracking-widest rounded-lg transition-all shadow-md shadow-[#00f2fe]/10"
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
                      Type="text"
                      Placeholder="Search registry rows..."
                      Value={blogSearch}
                      OnChange={(e) => setBlogSearch(e.target.value)}
                      ClassName="bg-[#1a1a1a] border border-slate-800 rounded px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none focus:border-[#00f2fe]"
                    />
                    
                    <select
                      Value={blogCategoryFilter}
                      OnChange={(e) => setBlogCategoryFilter(e.target.value)}
                      ClassName="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="All">All Categories</option>
                      {["AI", "Web Development", "Mobile Apps", "React", "Firebase", "UI/UX", "Business", "Case Studies"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <select
                      Value={blogStatusFilter}
                      OnChange={(e) => setBlogStatusFilter(e.target.value)}
                      ClassName="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Published">Published Node</option>
                      <option value="Draft">Draft Staged</option>
                      <option value="Featured">Featured Cluster</option>
                    </select>

                    <select
                      Value={blogSortOrder}
                      OnChange={(e) => setBlogSortOrder(e.target.value)}
                      ClassName="bg-[#1a1a1a] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 outline-none"
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
                        Key={blog.id}
                        ClassName="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 bg-[#161616]/70 border border-slate-900 rounded-xl p-4 transition-all hover:border-slate-800"
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
                            Blog.published 
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
                            OnClick={() => {
                              HandleEditSelect(blog);
                              SetPreviewMode(true);
                            }}
                            ClassName="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[10px] font-mono transition-all"
                          >
                            Preview
                          </button>
                          <button
                            OnClick={() => handleEditSelect(blog)}
                            ClassName="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 rounded text-[10px] font-mono transition-all"
                          >
                            Edit
                          </button>
                          <button
                            OnClick={() => handleDeleteBlog(blog.id)}
                            ClassName="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded text-[10px] font-mono transition-all"
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
                          Disabled={blogPage === 1}
                          OnClick={() => setBlogPage(prev => prev - 1)}
                          ClassName="px-2.5 py-1 bg-slate-900 border border-slate-800 disabled:opacity-30 rounded hover:text-white"
                        >
                          Prev
                        </button>
                        <button
                          Disabled={blogPage === totalPages}
                          OnClick={() => setBlogPage(prev => prev + 1)}
                          ClassName="px-2.5 py-1 bg-slate-900 border border-slate-800 disabled:opacity-30 rounded hover:text-white"
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
                    Key={tab}
                    OnClick={() => setActiveCandidateTab(tab)}
                    ClassName={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 border ${
                      ActiveCandidateTab === tab
                        ? Tab === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          Tab === 'shortlisted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
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
                      Key={candidate.id} 
                      ClassName={`bg-[#121212] border rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        Candidate.status === 'shortlisted' ? 'border-emerald-500/30 shadow-md shadow-emerald-500/5' :
                        Candidate.status === 'archived' ? 'border-red-900/40 opacity-50 hover:opacity-75' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-white tracking-wide">{candidate.name || 'Anonymous Applicant'}</h3>
                              <div className="flex gap-1 ml-2">
                                <button
                                  OnClick={() => updateCandidateStatus(candidate.id, 'shortlisted')}
                                  Title="Shortlist Candidate"
                                  ClassName={`p-1 rounded transition-all ${candidate.status === 'shortlisted' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-600 hover:text-emerald-400 hover:bg-[#1a1a1a]'}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  OnClick={() => updateCandidateStatus(candidate.id, 'archived')}
                                  Title="Archive Candidate"
                                  ClassName={`p-1 rounded transition-all ${candidate.status === 'archived' ? 'text-red-400 bg-red-500/10' : 'text-slate-600 hover:text-red-400 hover:bg-[#1a1a1a]'}`}
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
                              {candidate.submittedAt?.seconds ? New Date(candidate.submittedAt.seconds * 1000).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-slate-900 pt-4 mt-2">
                        <button
                          OnClick={() => triggerEmailCommunication(candidate.email, candidate.name, candidate.role || 'Developer')}
                          ClassName="px-3 py-1.5 bg-[#00f2fe]/10 hover:bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-semibold rounded uppercase tracking-wider transition-all border border-[#00f2fe]/20"
                        >
                          Send Email
                        </button>
                        {candidate.phone && (
                          <button
                            OnClick={() => triggerWhatsAppCommunication(candidate.phone, candidate.name)}
                            ClassName="px-3 py-1.5 bg-white hover:bg-slate-200 text-black text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center gap-1"
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

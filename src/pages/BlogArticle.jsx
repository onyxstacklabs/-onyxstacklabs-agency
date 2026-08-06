// src/pages/BlogArticle.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// LIVE DATA CORE IMPORTS
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSEO } from '../utils/useSEO';

const fxFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

// Builds schema.org BlogPosting structured data from a live Firestore
// article document, so Google/AI answer engines can properly attribute
// and cite this article.
function buildArticleSchema(article, url) {
  if (!article) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seoDescription || article.summary || '',
    image: article.coverImage || 'https://onyxstacklabs.com/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: article.author || 'OnyxStack Labs Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'OnyxStack Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onyxstacklabs.com/favicon.png'
      }
    },
    ...(article.createdAt?.seconds
      ? { datePublished: new Date(article.createdAt.seconds * 1000).toISOString() }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };
}

// Parses inline Markdown within a line of text — converts **bold** to
// <strong> and [label](url) to real, crawlable <a href> links. This is
// what makes the AI-generated blog content's internal/external links
// (and any bold emphasis) actually functional and SEO-valuable on the
// live page, instead of rendering as literal bracket/asterisk text.
function parseInlineMarkdown(text) {
  const regex = /(\*\*(.+?)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // **bold** match
      parts.push(
        <strong key={`b-${key++}`} className="text-white font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // [label](url) match
      const label = match[4];
      const url = match[5];
      const isInternal = url.startsWith('/') || url.includes('onyxstacklabs.com');
      parts.push(
        <a
          key={`l-${key++}`}
          href={url}
          {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-500/40 transition-colors duration-200"
        >
          {label}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogArticle({ currentPath, navigateToNode }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unique per-article SEO — title, description, canonical, and
  // BlogPosting structured data, built from the live article once it
  // loads. Guarded internally by useSEO (it no-ops until title/description
  // are real strings), so this is safe to call before `article` is set.
  useSEO({
    title: article ? `${article.seoTitle || article.title} | OnyxStack Labs Blog` : undefined,
    description: article?.seoDescription || article?.summary || undefined,
    path: `/blog/${slug}`,
    faqSchema: article ? buildArticleSchema(article, `https://onyxstacklabs.com/blog/${slug}`) : null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, where('published', '==', true));
        const querySnapshot = await getDocs(q);
        
        let foundDoc = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.slug === slug || doc.id === slug) {
            foundDoc = { id: doc.id, ...data };
          }
        });

        if (foundDoc) {
          setArticle({
            ...foundDoc,
            title: foundDoc.title || "Untitled Blueprint",
            content: foundDoc.content || foundDoc.summary || "No blueprint architecture content provided.",
            category: foundDoc.category || "AI",
            author: typeof foundDoc.author === 'object' ? (foundDoc.author.name || "Senior Architect") : (foundDoc.author || "Senior Architect")
          });
        } else {
          navigate('/404', { replace: true });
        }
      } catch (err) {
        console.error("Failed fetching structural node logs:", err);
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug, navigate]);

  // SOCIAL SHARD DISPATCH LOGIC
  const handleShare = (platform) => {
    const articleUrl = window.location.href;
    const articleTitle = article?.title || "OnyxStack Labs Blueprint";

    if (platform === 'native') {
      if (navigator.share) {
        navigator.share({
          title: articleTitle,
          url: articleUrl,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(articleUrl);
        alert("Link copied to clipboard node!");
      }
      return;
    }

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(articleTitle + " " + articleUrl)}`;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // DYNAMIC ARCHITECTURAL CONTENT PARSER LAYER
  // Now distinguishes ## (H2) from ### (H3) headings, and runs every
  // heading/paragraph/bullet through parseInlineMarkdown() so **bold**
  // and [label](url) links actually render as real, crawlable elements
  // instead of literal Markdown syntax.
  const renderFormattedContent = (text) => {
    if (!text) return null;
    
    // Split segments by paragraphs/newlines
    const paragraphs = text.split('\n');

    return paragraphs.map((para, index) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // 1a. H3 Heading Detection (###)
      if (trimmed.startsWith('### ') || trimmed === '###') {
        const cleanHeading = trimmed.replace(/^###\s*/, '');
        return (
          <h3 key={index} className="text-lg sm:text-xl font-bold text-white tracking-tight pt-6 pb-2 font-sans border-l-2 border-cyan-500/40 pl-3 mt-4">
            {parseInlineMarkdown(cleanHeading)}
          </h3>
        );
      }

      // 1b. H2 Heading Detection (##)
      if (trimmed.startsWith('## ') || trimmed === '##') {
        const cleanHeading = trimmed.replace(/^##\s*/, '');
        return (
          <h2 key={index} className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-8 pb-3 font-sans mt-6 border-b border-neutral-900 pb-3">
            {parseInlineMarkdown(cleanHeading)}
          </h2>
        );
      }

      // 1c. Fallback heuristic heading (short line ending in ':')
      if (trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.startsWith('http')) {
        return (
          <h3 key={index} className="text-lg sm:text-xl font-bold text-white tracking-tight pt-6 pb-2 font-sans border-l-2 border-cyan-500/40 pl-3 mt-4">
            {parseInlineMarkdown(trimmed)}
          </h3>
        );
      }

      // 2. Code Block Detection
      if (trimmed.startsWith('//') && trimmed.length > 30) {
        return (
          <pre key={index} className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 font-mono text-xs text-cyan-400 overflow-x-auto my-4 leading-relaxed selection:bg-cyan-500/20">
            <code>{trimmed}</code>
          </pre>
        );
      }

      // 3. Bullet List Detection
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const cleanBullet = trimmed.substring(1).trim();
        return (
          <ul key={index} className="list-none space-y-2 pl-4 my-2">
            <li className="text-neutral-300 text-sm sm:text-base font-sans tracking-wide flex items-start gap-2.5">
              <span className="text-cyan-400 font-mono mt-1 text-xs">▪</span>
              <span>{parseInlineMarkdown(cleanBullet)}</span>
            </li>
          </ul>
        );
      }

      // 4. Default Standard Paragraph Structure
      return (
        <p key={index} className="text-neutral-300 text-sm sm:text-base leading-relaxed tracking-wide font-sans mb-5">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-neutral-500 font-mono text-sm flex items-center justify-center animate-pulse">
        Decompressing edge document node sharding data...
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 font-sans antialiased selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      
      {/* BRAND STRUCTURAL LIGHTING FIELDS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none z-0" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-24">
        <motion.article initial="hidden" animate="visible" variants={fxFadeUp}>
          
          {/* META NODE METRICS */}
          <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 mb-6">
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] uppercase font-bold tracking-widest">
              {article.category}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">
              {article.createdAt?.seconds ? new Date(article.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Active Node'}
            </span>
          </div>

          {/* MAIN DOCUMENT HEADLINE */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 leading-tight font-sans">
            {article.title}
          </h1>

          {/* COVER IMAGE NODE */}
          {article.coverImage && (
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 mb-8">
              <img src={article.coverImage} alt={article.coverImageAlt || article.title} className="w-full h-full object-cover opacity-80" />
            </div>
          )}

          {/* SOCIAL SHARE MATRIX LAYER */}
          <div className="flex flex-wrap items-center gap-2.5 my-8 pt-4 pb-5 border-b border-neutral-900/60">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider mr-1">
              Dispatch Node:
            </span>
            <button onClick={() => handleShare('linkedin')} className="px-3 py-1.5 rounded bg-neutral-950 border border-neutral-900 hover:border-cyan-500/40 text-neutral-400 hover:text-white text-[11px] font-mono transition-all duration-200">
              LinkedIn
            </button>
            <button onClick={() => handleShare('twitter')} className="px-3 py-1.5 rounded bg-neutral-950 border border-neutral-900 hover:border-cyan-500/40 text-neutral-400 hover:text-white text-[11px] font-mono transition-all duration-200">
              X_Corp
            </button>
            <button onClick={() => handleShare('whatsapp')} className="px-3 py-1.5 rounded bg-neutral-950 border border-neutral-900 hover:border-cyan-500/40 text-neutral-400 hover:text-white text-[11px] font-mono transition-all duration-200">
              WhatsApp
            </button>
            <button onClick={() => handleShare('native')} className="px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 text-cyan-400 text-[11px] font-mono transition-all duration-200 sm:ml-auto">
              Share Node →
            </button>
          </div>

          {/* AUTHOR METRIC PROFILE */}
          <div className="flex items-center gap-4 py-4 mb-10 text-xs font-mono">
            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400 font-bold font-sans">
              OA
            </div>
            <div>
              <div className="text-neutral-300 font-bold">{article.author}</div>
              <div className="text-neutral-500 text-[10px]">OnyxStack Core Engineering</div>
            </div>
          </div>

          {/* CONTENT DISPATCH RENDER CORES */}
          <div className="text-neutral-300 space-y-2">
            {renderFormattedContent(article.content)}
          </div>

          {/* PIPELINE FOOTER UTILITY NAVIGATION */}
          <div className="mt-16 pt-8 border-t border-neutral-900 flex justify-between items-center">
            <button 
              onClick={() => navigate('/blog')}
              className="text-xs font-mono text-neutral-400 hover:text-cyan-400 flex items-center gap-2 transition-colors duration-200"
            >
              ← Back to Repository Node Index
            </button>
          </div>

        </motion.article>
      </main>
    </div>
  );
}

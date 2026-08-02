import React, { useState } from 'react';
import { generateBlogDraft } from '../services/geminiBlogService';

export default function AdminAiBlogModal({ onPublishSuccess, onClose }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(null);

  // Auto-generate high-quality placeholder visual URL based on keyword
  const getImageUrl = (keyword) => 
    `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`;

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("Please enter a blog topic!");
    setLoading(true);
    try {
      const generatedDraft = await generateBlogDraft(topic);
      setDraft(generatedDraft);
    } catch (err) {
      alert("AI Generation failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    // Call your existing Firebase / Database save function here
    const finalPayload = {
      ...draft,
      featuredImage: getImageUrl(draft.featuredImageKeyword),
      status: 'published',
      createdAt: new Date().toISOString()
    };
    
    onPublishSuccess(finalPayload);
    alert("🚀 Blog successfully approved & published!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 text-white shadow-2xl">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
          <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
            ✨ OnyxAdmin AI Co-Pilot
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        {/* STEP 1: TOPIC INPUT */}
        {!draft ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Enter Blog Topic / Primary Keyword:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Why Vite + React is the best stack for micro-SaaS in 2026"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-500 font-semibold py-3 rounded-lg transition-all flex justify-center items-center gap-2"
            >
              {loading ? "Generating Humanized Blog & SEO Data..." : "⚡ Generate Draft with Gemini"}
            </button>
          </div>
        ) : (
          /* STEP 2: REVIEW & APPROVAL DRAFT EDITOR */
          <div className="space-y-5">
            <div>
              <label className="text-xs text-sky-400 font-semibold uppercase">Blog Title (Editable)</label>
              <input
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-lg font-bold text-white mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">URL Slug</label>
                <input
                  type="text"
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-300 mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Tags (comma separated)</label>
                <input
                  type="text"
                  value={draft.tags?.join(', ')}
                  onChange={(e) => setDraft({ ...draft, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-300 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Meta Description</label>
              <textarea
                value={draft.metaDescription}
                onChange={(e) => setDraft({ ...draft, metaDescription: e.target.value })}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-300 mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-sky-400 font-semibold uppercase">Content (Markdown Editor)</label>
              <textarea
                value={draft.contentMarkdown}
                onChange={(e) => setDraft({ ...draft, contentMarkdown: e.target.value })}
                rows={10}
                className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-sm font-mono text-slate-200 mt-1"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setDraft(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                🔄 Re-Generate
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-lg transition-all"
              >
                🚀 Approve & Publish Live
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

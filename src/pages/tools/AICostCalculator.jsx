import React, { useState, useMemo } from 'react';
import ToolLayout from '../../components/ToolLayout';

// Rough directional pricing bands (USD per message), representing typical
// tiers across today's LLM providers — not tied to any single vendor.
const MODEL_TIERS = [
  { id: 'budget', label: 'Budget Model', desc: 'Lightweight, fast models for simple Q&A', min: 0.002, max: 0.006 },
  { id: 'standard', label: 'Standard Model', desc: 'Balanced quality and cost for most use cases', min: 0.012, max: 0.03 },
  { id: 'premium', label: 'Premium Model', desc: 'Top-tier reasoning for complex conversations', min: 0.05, max: 0.15 }
];

const HUMAN_AGENT_MONTHLY_MIN = 800;
const HUMAN_AGENT_MONTHLY_MAX = 1500;

function formatUsd(value) {
  if (value < 1) return `$${value.toFixed(3)}`;
  return `$${Math.round(value).toLocaleString()}`;
}

export default function AICostCalculator({ currentPath, navigateToNode }) {
  const [conversations, setConversations] = useState(500);
  const [messagesPerConvo, setMessagesPerConvo] = useState(6);
  const [tierId, setTierId] = useState('standard');

  // Strips leading zeros and handles empty input cleanly so fields never show "0500"
  const handleNumberChange = (setter) => (e) => {
    const raw = e.target.value.replace(/^0+(?=\d)/, '');
    setter(raw === '' ? 0 : Number(raw));
  };

  const results = useMemo(() => {
    const tier = MODEL_TIERS.find((t) => t.id === tierId) || MODEL_TIERS[1];
    const totalMessages = conversations * messagesPerConvo;

    const monthlyMin = totalMessages * tier.min;
    const monthlyMax = totalMessages * tier.max;

    return {
      totalMessages,
      monthlyMin,
      monthlyMax,
      annualMin: monthlyMin * 12,
      annualMax: monthlyMax * 12,
      perConversationMin: messagesPerConvo * tier.min,
      perConversationMax: messagesPerConvo * tier.max
    };
  }, [conversations, messagesPerConvo, tierId]);

  const inputClass =
    "w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#06B6D4] transition-colors";
  const labelClass =
    "block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2";

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="AI Chatbot Cost Calculator"
      tagline="Estimate what it would cost to run an AI chatbot or assistant for your business each month."
    >
      <div className="space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Conversations per month</label>
            <input
              type="number"
              min="0"
              value={conversations === 0 ? '' : conversations}
              onFocus={(e) => e.target.select()}
              onChange={handleNumberChange(setConversations)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Avg. messages per conversation</label>
            <input
              type="number"
              min="0"
              value={messagesPerConvo === 0 ? '' : messagesPerConvo}
              onFocus={(e) => e.target.select()}
              onChange={handleNumberChange(setMessagesPerConvo)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Model Tier</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MODEL_TIERS.map((tier) => {
              const isActive = tierId === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setTierId(tier.id)}
                  aria-pressed={isActive}
                  className={`text-left p-4 rounded-xl border transition-colors ${
                    isActive
                      ? 'border-[#06B6D4]/50 bg-[#06B6D4]/10'
                      : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-[#06B6D4]' : 'text-neutral-200'}`}>
                    {tier.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 leading-relaxed">{tier.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Estimated Monthly Cost</div>
              <div className="text-xl font-bold text-white">
                {formatUsd(results.monthlyMin)} – {formatUsd(results.monthlyMax)}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Estimated Annual Cost</div>
              <div className="text-xl font-bold text-white">
                {formatUsd(results.annualMin)} – {formatUsd(results.annualMax)}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 text-center">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Cost per Conversation</div>
            <div className="text-sm font-semibold text-neutral-200">
              {formatUsd(results.perConversationMin)} – {formatUsd(results.perConversationMax)}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/20 text-center">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              For comparison, a human support agent typically costs {formatUsd(HUMAN_AGENT_MONTHLY_MIN)}–{formatUsd(HUMAN_AGENT_MONTHLY_MAX)}/month, handling far fewer conversations at once.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-neutral-500 text-center leading-relaxed">
          This is a directional estimate based on typical LLM pricing tiers. Actual cost depends on the specific model, context length, and provider used.
        </p>

      </div>
    </ToolLayout>
  );
}

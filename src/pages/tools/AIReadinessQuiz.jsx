import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ToolLayout from '../../components/ToolLayout';

const QUESTIONS = [
  { id: 'q1', text: 'Does your team spend significant time on repetitive manual tasks (data entry, replying to similar customer questions, generating reports)?' },
  { id: 'q2', text: 'Is your business data (customer info, orders, records) stored digitally rather than on paper?' },
  { id: 'q3', text: 'Do you already use any cloud-based software (CRM, accounting tools, project management apps)?' },
  { id: 'q4', text: 'Would faster response times to customers directly impact your sales or satisfaction?' },
  { id: 'q5', text: 'Do you have a clear, documented process for at least one core business workflow?' },
  { id: 'q6', text: 'Is your team open to adopting new tools if it saves them time?' },
  { id: 'q7', text: 'Do you have a budget set aside for improving business operations this year?' },
  { id: 'q8', text: 'Have you considered but not yet implemented any form of automation or AI in your business?' }
];

const ANSWER_OPTIONS = [
  { value: 2, label: 'Yes' },
  { value: 1, label: 'Somewhat' },
  { value: 0, label: 'No' }
];

const MAX_SCORE = QUESTIONS.length * 2;

function getBand(score) {
  const percent = (score / MAX_SCORE) * 100;
  if (percent >= 70) {
    return {
      label: 'High Readiness',
      className: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      message: 'Your business has strong foundations for AI automation. You could start seeing real time and cost savings within weeks.'
    };
  }
  if (percent >= 40) {
    return {
      label: 'Moderate Readiness',
      className: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      message: 'You have a good base to build on. A few targeted changes to your data and processes would unlock a lot of automation potential.'
    };
  }
  return {
    label: 'Early Stage',
    className: 'text-neutral-300 border-neutral-700 bg-neutral-800/40',
    message: 'AI automation may be premature right now, but the good news is there are simple first steps that set you up for it.'
  };
}

// Scrolls to the top of the viewport smoothly — used whenever the quiz
// content swaps (question list <-> results), since the new content is a
// different height and the old scroll position would otherwise land
// somewhere in the middle of the page (or past the footer).
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function AIReadinessQuiz({ currentPath, navigateToNode }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  const score = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + v, 0),
    [answers]
  );

  const band = submitted ? getBand(score) : null;

  // Dynamic share message — only meaningful once a result exists, so the
  // "Share This Tool" button in ToolLayout shares the actual score instead
  // of a generic tool description.
  const shareText = submitted
    ? `I scored ${score}/${MAX_SCORE} (${band.label}) on OnyxStack Labs' AI Readiness Score. Check yours:`
    : undefined;

  const selectAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    scrollToTop();
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted(false);
    scrollToTop();
  };

  return (
    <ToolLayout
      currentPath={currentPath}
      navigateToNode={navigateToNode}
      title="AI Readiness Score"
      tagline="Answer 8 quick questions to see how ready your business is for AI automation."
      shareText={shareText}
    >
      {!submitted ? (
        <div className="space-y-6">
          {QUESTIONS.map((q, idx) => (
            <fieldset key={q.id} className="pb-6 border-b border-neutral-800 last:border-b-0 last:pb-0">
              <legend className="text-sm text-neutral-200 leading-relaxed mb-3.5">
                <span className="text-[#06B6D4] font-mono text-xs mr-2">{idx + 1}.</span>
                {q.text}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {ANSWER_OPTIONS.map((opt) => {
                  const isActive = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectAnswer(q.id, opt.value)}
                      aria-pressed={isActive}
                      className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors ${
                        isActive
                          ? 'border-[#06B6D4]/50 bg-[#06B6D4]/10 text-[#06B6D4]'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full bg-[#06B6D4] text-black py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? 'See My Score' : `Answer All Questions (${Object.keys(answers).length}/${QUESTIONS.length})`}
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <div className={`p-8 rounded-2xl border ${band.className}`}>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-2">Your Score</div>
            <div className="text-5xl font-bold mb-3">{score} / {MAX_SCORE}</div>
            <div className="text-lg font-bold mb-3">{band.label}</div>
            <p className="text-sm leading-relaxed opacity-90 max-w-md mx-auto">{band.message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-bold border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
            >
              Retake Quiz
            </button>
            <Link
              to="/tools/ai-cost-calculator"
              className="px-6 py-3 rounded-xl text-xs font-mono uppercase tracking-widest font-bold bg-neutral-900 text-white border border-neutral-800 hover:border-[#06B6D4]/50 transition-colors"
            >
              Estimate AI Costs →
            </Link>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}

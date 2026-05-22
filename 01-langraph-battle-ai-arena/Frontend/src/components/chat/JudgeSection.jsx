import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';
import { cn } from '../../utils/cn';

const ScoreBadge = ({ score, isWinner }) => {
  return (
    <div className={cn(
      "px-3 py-1 rounded-full font-mono text-sm tracking-wider",
      isWinner 
        ? "bg-brand-accent text-brand-dark font-bold" 
        : "bg-brand-dark border border-brand-surface-hover text-brand-text/60"
    )}>
      {score}/10
    </div>
  );
};

const JudgeSection = ({ data, isStreaming }) => {
  if (!data && !isStreaming) return null;

  const score1 = data?.solution_1_score || 0;
  const score2 = data?.solution_2_score || 0;
  
  const winner = score1 > score2 ? 'Alpha' : (score2 > score1 ? 'Beta' : 'Tie');

  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mb-16"
    >
      <div className="bg-brand-surface/50 border border-brand-surface-hover rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        {/* Header / Verdict Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-brand-surface-hover/50 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-dark rounded-lg border border-brand-surface-hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text/70">
                <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-text tracking-tight">Judge Verdict</h2>
              {!isStreaming && (
                <p className="text-xs font-mono text-brand-text/50 uppercase tracking-widest mt-1">
                  {winner === 'Tie' ? 'Draw' : `Winner: Model ${winner}`}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest">Alpha</span>
              <ScoreBadge score={score1} isWinner={score1 > score2} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest">Beta</span>
              <ScoreBadge score={score2} isWinner={score2 > score1} />
            </div>
          </div>
        </div>

        {/* Detailed Reasoning */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-mono text-brand-text/40 uppercase tracking-widest mb-2">Alpha Reasoning</h4>
            <p className="text-sm leading-relaxed text-brand-text/80 whitespace-pre-wrap">
              {data?.solution_1_reasoning || (isStreaming ? "Analyzing..." : "")}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-brand-text/40 uppercase tracking-widest mb-2">Beta Reasoning</h4>
            <p className="text-sm leading-relaxed text-brand-text/80 whitespace-pre-wrap">
              {data?.solution_2_reasoning || (isStreaming ? "Analyzing..." : "")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JudgeSection;

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animations';

const EmptyState = () => {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-brand-surface-hover flex items-center justify-center mb-6 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-3 tracking-tight text-brand-text">AI Debate Arena</h1>
      <p className="text-brand-text/60 max-w-md mx-auto leading-relaxed">
        Submit a complex question or coding challenge. Two models will debate the solution, and our Judge will evaluate their performance.
      </p>
    </motion.div>
  );
};

export default EmptyState;

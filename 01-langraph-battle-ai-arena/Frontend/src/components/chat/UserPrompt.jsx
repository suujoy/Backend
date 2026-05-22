import React from 'react';
import { motion } from 'framer-motion';
import { messageEntry } from '../../utils/animations';

const UserPrompt = ({ text }) => {
  return (
    <motion.div 
      variants={messageEntry}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto my-12"
    >
      <div className="flex flex-col items-end">
        <span className="text-xs font-mono text-brand-text/40 mb-2 mr-1">You</span>
        <div className="bg-brand-surface border border-brand-surface-hover text-brand-text px-6 py-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserPrompt;

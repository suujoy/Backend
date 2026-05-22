import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../utils/animations';
import AIResponseCard from './AIResponseCard';

const DebateRow = ({ solution1, solution2, isStreaming }) => {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="h-full">
          <AIResponseCard 
            modelName="Model Alpha" 
            content={solution1 || ""} 
            isStreaming={isStreaming && !solution1}
            accentColor="orange"
          />
        </motion.div>
        
        <motion.div variants={fadeUp} className="h-full">
          <AIResponseCard 
            modelName="Model Beta" 
            content={solution2 || ""} 
            isStreaming={isStreaming && !solution2}
            accentColor="gray"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DebateRow;

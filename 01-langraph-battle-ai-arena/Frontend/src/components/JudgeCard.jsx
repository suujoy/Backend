import React from 'react';
import { Gavel } from 'lucide-react';

export default function JudgeCard({ judgeData }) {
  const winner = judgeData.solution_1_score >= judgeData.solution_2_score ? 'Solution 1' : 'Solution 2';
  
  return (
    <div className="mt-8 border-2 border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900/30 rounded-xl p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.01)] max-w-6xl mx-auto w-full relative overflow-hidden">
      
      {/* Retro scanline effect overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-200 dark:border-gray-800 pb-4">
          <div className="p-2 bg-gray-900 dark:bg-gray-100 border-2 border-gray-700 dark:border-gray-300 rounded shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <Gavel className="w-6 h-6 text-white dark:text-gray-900" />
          </div>
          <h3 className="font-mono text-xl font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100">
            Judge's Evaluation
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Solution 1 Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono">
              <span className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider text-sm">Model A Score</span>
              <span className={`text-xl font-bold px-3 py-1 border-2 rounded ${judgeData.solution_1_score >= judgeData.solution_2_score ? 'bg-orange-500 text-white border-orange-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]'}`}>
                {judgeData.solution_1_score}/10
              </span>
            </div>
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-950 p-5 rounded-lg border border-gray-200 dark:border-gray-800 font-sans shadow-sm">
              {judgeData.solution_1_reasoning}
            </div>
          </div>
          
          {/* Solution 2 Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between font-mono">
              <span className="text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider text-sm">Model B Score</span>
              <span className={`text-xl font-bold px-3 py-1 border-2 rounded ${judgeData.solution_2_score > judgeData.solution_1_score ? 'bg-orange-500 text-white border-orange-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]'}`}>
                {judgeData.solution_2_score}/10
              </span>
            </div>
            <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-950 p-5 rounded-lg border border-gray-200 dark:border-gray-800 font-sans shadow-sm">
              {judgeData.solution_2_reasoning}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

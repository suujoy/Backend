import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Sparkles, TerminalSquare } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

export default function SolutionCard({ title, content, isWinner }) {
  return (
    <div className={`flex flex-col flex-1 bg-white dark:bg-gray-900 border-2 ${isWinner ? 'border-orange-500 shadow-[8px_8px_0px_rgba(249,115,22,0.2)] dark:shadow-[8px_8px_0px_rgba(249,115,22,0.15)]' : 'border-gray-200 dark:border-gray-800 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.02)]'} rounded-xl overflow-hidden transition-all duration-300 relative`}>
      <div className={`px-6 py-4 border-b-2 ${isWinner ? 'border-orange-500/30 bg-orange-50 dark:bg-orange-950/30' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-md border-2 ${isWinner ? 'bg-orange-500 border-orange-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' : 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
            {isWinner ? <Sparkles className="w-4 h-4" /> : <TerminalSquare className="w-4 h-4" />}
          </div>
          <h3 className="font-mono text-sm font-bold tracking-wide uppercase text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        {isWinner && (
          <span className="text-xs font-mono font-bold px-3 py-1 bg-orange-500 text-white rounded border-2 border-orange-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)] rotate-2">
            WINNER
          </span>
        )}
      </div>
      <div className="p-6 prose prose-slate dark:prose-invert prose-orange max-w-none text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

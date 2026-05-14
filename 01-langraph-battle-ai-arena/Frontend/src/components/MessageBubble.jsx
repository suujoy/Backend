import React from 'react';
import { User } from 'lucide-react';

export default function MessageBubble({ message }) {
  return (
    <div className="flex gap-4 sm:gap-6 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-700 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)]">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">
          User Prompt
        </div>
        <div className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl leading-relaxed font-sans bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-[4px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.02)]">
          {message}
        </div>
      </div>
    </div>
  );
}

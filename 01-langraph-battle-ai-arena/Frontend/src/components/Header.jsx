import React from 'react';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-500 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)]">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 uppercase font-mono hidden sm:block">
          AI Battle Arena
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-sm font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-900">
          Retro Theme
        </div>
      </div>
    </header>
  );
}

import React, { useRef, useEffect } from 'react';

const ChatLayout = ({ children }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when children change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [children]);

  return (
    <div className="flex flex-col h-screen bg-brand-dark overflow-hidden">
      {/* Minimal Header */}
      <header className="flex-none p-6 border-b border-brand-surface text-center bg-brand-dark/80 backdrop-blur-sm z-20">
        <h1 className="font-mono text-sm tracking-[0.2em] text-brand-text/60 uppercase">
          AI Debate <span className="text-brand-accent">Arena</span>
        </h1>
      </header>

      {/* Scrollable Content Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="px-4 py-8 pb-48">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;

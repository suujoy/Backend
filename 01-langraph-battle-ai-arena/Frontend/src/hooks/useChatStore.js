import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ai_debate_chat_history';

/**
 * Message Schema:
 * {
 *   id: string,
 *   type: 'prompt' | 'debate',
 *   prompt: string,
 *   solution_1?: string,
 *   solution_2?: string,
 *   judge?: {
 *     solution_1_score: number,
 *     solution_2_score: number,
 *     solution_1_reasoning: string,
 *     solution_2_reasoning: string
 *   },
 *   status: 'streaming_models' | 'streaming_judge' | 'complete'
 * }
 */

export const useChatStore = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (id, updates) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    addMessage,
    updateMessage,
    clearHistory
  };
};

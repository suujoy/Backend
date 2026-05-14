import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
import SolutionCard from '../components/SolutionCard';
import JudgeCard from '../components/JudgeCard';
import './App.css';

const generateMockResponse = (prompt) => {
    return {
        message: {
            problem: prompt,
            solution_1: `Here is a response to **"${prompt}"**.\n\nHere is a simple example in JavaScript:\n\`\`\`javascript\nfunction solve(prompt) {\n  console.log("Analyzing: " + prompt);\n  return "Done!";\n}\n\`\`\`\n\nIt is concise and direct.`,
            solution_2: `This is the second solution for **"${prompt}"**.\n\nIt is more verbose and detailed. For instance, here's some python code:\n\`\`\`python\ndef evaluate_prompt(prompt):\n    print(f"Evaluating: {prompt}")\n    return True\n\`\`\`\n\nI hope this helps!`,
            judge: {
                solution_1_score: Math.floor(Math.random() * 5) + 5,
                solution_2_score: Math.floor(Math.random() * 5) + 5,
                solution_1_reasoning: "Model A is direct and to the point. It fulfills all requirements efficiently and provides a solid code snippet.",
                solution_2_reasoning: "Model B is well-detailed and offers a slightly different perspective which could be helpful depending on the user's exact needs."
            }
        }
    };
};

const initialData = {
    "message": {
        "problem": "What is the capital of india and its beauty in simple and short words?",
        "solution_1": "The capital of India is **New Delhi**.\n\nIts beauty lies in its **mix of history and modernity**—grand monuments like the **Red Fort** and **Qutub Minar**, lush gardens like **Lodhi Gardens**, and vibrant markets like **Chandni Chowk**. The city glows with culture, food, and energy! 🌟",
        "solution_2": "The capital of India is **New Delhi**, a city known for its rich history, vibrant culture, and stunning landmarks. Its beauty lies in iconic sites like the **India Gate**, **Qutub Minar**, and **Red Fort**, along with lush green spaces like **Lodhi Gardens**. The blend of modern and traditional architecture, bustling markets, and diverse cuisine makes it a captivating and dynamic city.",
        "judge": {
            "solution_1_score": 9,
            "solution_2_score": 8,
            "solution_1_reasoning": "Solution 1 correctly identifies New Delhi as the capital. It then provides a concise, simple, and engaging description of its beauty, highlighting key aspects like history, modernity, famous landmarks, and vibrant culture. It adheres well to the 'simple and short words' requirement, making it highly effective.",
            "solution_2_reasoning": "Solution 2 accurately states New Delhi as the capital and offers a detailed description of its beauty, including many important landmarks and cultural elements. While comprehensive and correct, it is slightly longer and uses slightly more elaborate phrasing than Solution 1, making it marginally less 'short and simple' in comparison."
        }
    }
};

export default function App() {
    const [history, setHistory] = useState([initialData]);
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef(null);

    const handleSubmit = (prompt) => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const newResponse = generateMockResponse(prompt);
            setHistory(prev => [...prev, newResponse]);
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isLoading]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col font-sans transition-colors duration-300 selection:bg-orange-500/30">
            <Header />

            <main className="flex-1 overflow-y-auto pb-8 scroll-smooth">
                <div className="max-w-[1700px] mx-auto w-full flex flex-col items-center">
                    {history.map((turn, idx) => (
                        <div key={idx} className="w-full border-b-4 border-gray-200 dark:border-gray-900 pb-16 pt-8 mb-8 last:border-0 relative">
                            {/* User Prompt */}
                            <MessageBubble message={turn.message.problem} />

                            {/* Solutions Container */}
                            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                    <SolutionCard
                                        title="Model A"
                                        content={turn.message.solution_1}
                                        isWinner={turn.message.judge.solution_1_score >= turn.message.judge.solution_2_score}
                                    />
                                    <SolutionCard
                                        title="Model B"
                                        content={turn.message.solution_2}
                                        isWinner={turn.message.judge.solution_2_score > turn.message.judge.solution_1_score}
                                    />
                                </div>
                            </div>

                            {/* Judge Recommendation */}
                            <div className="w-full px-4 sm:px-6">
                                <JudgeCard judgeData={turn.message.judge} />
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="w-full py-16 flex flex-col items-center justify-center gap-6 text-gray-500 dark:text-gray-400">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <div className="font-mono text-sm tracking-widest uppercase animate-pulse">Running Arena Evaluation...</div>
                        </div>
                    )}

                    <div ref={bottomRef} className="h-4" />
                </div>
            </main>

            <ChatInput onSubmit={handleSubmit} />
        </div>
    );
}
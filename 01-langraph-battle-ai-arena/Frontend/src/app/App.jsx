import React, { useState } from "react";
import ChatLayout from "../components/layout/ChatLayout";
import EmptyState from "../components/chat/EmptyState";
import UserPrompt from "../components/chat/UserPrompt";
import DebateRow from "../components/chat/DebateRow";
import JudgeSection from "../components/chat/JudgeSection";
import ChatInput from "../components/chat/ChatInput";

import { useChatStore } from "../hooks/useChatStore";
import { runDebate } from "../services/ai";

const App = () => {
    const { messages, addMessage, updateMessage } = useChatStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSend = async (text) => {
        if (isProcessing || !text.trim()) return;

        setIsProcessing(true);

        // 1. Add new message shell
        const newMsgId = Date.now().toString();
        addMessage({
            id: newMsgId,
            type: "debate",
            prompt: text,
            solution_1: "",
            solution_2: "",
            judge: null,
            status: "streaming_models",
        });

        // 2. Start mock streaming debate
        await runDebate(text, {
            onModel1Update: (content) => {
                updateMessage(newMsgId, { solution_1: content });
            },
            onModel2Update: (content) => {
                updateMessage(newMsgId, { solution_2: content });
            },
            onJudgeUpdate: (judgeData) => {
                
                updateMessage(newMsgId, {
                    status: "streaming_judge",
                    judge: judgeData,
                });
            },
            onComplete: (finalData) => {
                updateMessage(newMsgId, {
                    status: "complete",
                    ...finalData,
                });
                setIsProcessing(false);
            },
        });
    };

    return (
        <ChatLayout>
            {messages.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="flex flex-col">
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-8">
                            <UserPrompt text={msg.prompt} />

                            <DebateRow
                                solution1={msg.solution_1}
                                solution2={msg.solution_2}
                                isStreaming={msg.status === "streaming_models"}
                            />

                            {(msg.status === "streaming_judge" ||
                                msg.status === "complete") && (
                                <JudgeSection
                                    data={msg.judge}
                                    isStreaming={
                                        msg.status === "streaming_judge"
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ChatInput onSend={handleSend} disabled={isProcessing} />
        </ChatLayout>
    );
};

export default App;

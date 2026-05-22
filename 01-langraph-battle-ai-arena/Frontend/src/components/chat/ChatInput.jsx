import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "../../utils/cn";

const ChatInput = ({ onSend, disabled }) => {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    const handleInput = (e) => {
        setText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSend(text);
            setText("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-dark via-brand-dark to-transparent pt-12 z-10">
            <div className="max-w-4xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        "relative bg-brand-surface border border-brand-surface-hover rounded-2xl shadow-lg transition-all",
                        "focus-within:border-brand-accent/50 focus-within:shadow-brand-accent/5",
                    )}
                >
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Pose a question or coding challenge..."
                        disabled={disabled}
                        rows={1}
                        className="w-full max-h-[200px] py-4 pl-6 pr-14 bg-transparent border-none resize-none focus:outline-none text-brand-text placeholder-brand-text/30"
                    />
                    <button
                        type="submit"
                        disabled={disabled || !text.trim()}
                        className="absolute right-3 bottom-3 p-2 rounded-xl bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <div className="text-center mt-3 text-xs font-mono text-brand-text/30">
                    Models may produce inaccurate information.
                </div>
            </div>
        </div>
    );
};

export default ChatInput;

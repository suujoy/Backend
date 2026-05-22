import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Base style, overridden in index.css
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../utils/cn";

// Custom CodeBlock Component with Toolbar
const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const lang = match ? match[1] : "";
    const codeString = String(children).replace(/\n$/, "");

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (inline) {
        return (
            <code
                className="bg-brand-dark px-1.5 py-0.5 rounded text-brand-accent font-mono text-sm"
                {...props}
            >
                {children}
            </code>
        );
    }

    // Note: highlight.js runs on the block below via useEffect in AIResponseCard,
    // but we can also manually highlight here. Let's rely on the useEffect for simplicity.
    return (
        <div className="relative group rounded-md overflow-hidden my-4 border border-brand-surface-hover bg-brand-dark">
            <div className="flex items-center justify-between px-4 py-1.5 bg-brand-surface border-b border-brand-surface-hover">
                <span className="text-xs font-mono text-brand-text/50 uppercase">
                    {lang || "text"}
                </span>
                <button
                    onClick={handleCopy}
                    className="text-brand-text/40 hover:text-brand-text transition-colors"
                    title="Copy code"
                >
                    {copied ? (
                        <Check size={14} className="text-green-500" />
                    ) : (
                        <Copy size={14} />
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
                <code className={className} {...props}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

const AIResponseCard = ({
    modelName,
    content,
    isStreaming,
    accentColor = "brand-surface-hover",
}) => {
    const [expanded, setExpanded] = useState(true);

    // Sanitize the markdown content
    const cleanContent = DOMPurify.sanitize(content);

    // Apply Highlight.js to code blocks
    useEffect(() => {
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block);
        });
    }, [content]);

    // Determine if content is long enough to warrant collapsing
    const isLong = content.length > 500;

    return (
        <div
            className={cn(
                "flex flex-col bg-brand-surface rounded-2xl border transition-colors h-full",
                accentColor === "orange"
                    ? "border-brand-accent/50"
                    : "border-brand-surface-hover",
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-surface-hover/50">
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full",
                            accentColor === "orange"
                                ? "bg-brand-accent"
                                : "bg-brand-text/40",
                        )}
                    />
                    <h3 className="font-mono text-sm tracking-wider font-semibold text-brand-text/90">
                        {modelName}
                    </h3>
                </div>

                {isStreaming && (
                    <div className="flex items-center gap-1">
                        <span
                            className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                        />
                        <span
                            className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />
                        <span
                            className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                className={cn(
                    "p-6 flex-1 overflow-hidden transition-all duration-300",
                    !expanded && isLong ? "max-h-[200px]" : "max-h-full",
                )}
            >
                <div className="prose prose-invert prose-brand max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code: CodeBlock,
                            a: ({ node, ...props }) => (
                                <a
                                    className="text-brand-accent hover:underline"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {cleanContent ||
                            (isStreaming ? "" : "*No response provided.*")}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Footer / Expand Button */}
            {isLong && !isStreaming && (
                <div className="px-6 py-3 border-t border-brand-surface-hover/30 bg-brand-surface rounded-b-2xl">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center justify-center w-full gap-2 text-xs font-mono tracking-widest text-brand-text/40 hover:text-brand-text transition-colors uppercase"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp size={14} /> Collapse
                            </>
                        ) : (
                            <>
                                <ChevronDown size={14} /> Expand
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIResponseCard;

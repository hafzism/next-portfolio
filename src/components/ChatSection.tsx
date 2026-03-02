"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickQuestions = [
  "Who is Hafeez?",
  "What are his skills?",
  "What projects has he built?",
  "What's his experience?",
  "How can I contact him?",
];

/** Parse inline markdown: **bold**, *italic*, [link](url) — returns ReactNode array */
function parseInline(text: string, keyPrefix: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`${keyPrefix}-t${k++}`}>{text.slice(lastIndex, match.index)}</span>);
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={`${keyPrefix}-b${k++}`} className="font-semibold">{match[2]}</strong>);
    } else if (match[0].startsWith("*")) {
      parts.push(<em key={`${keyPrefix}-i${k++}`}>{match[3]}</em>);
    } else {
      const label = match[4];
      const href = match[5];
      const cls = "underline underline-offset-2 text-primary hover:opacity-80 transition-opacity font-medium";
      if (href.startsWith("/")) {
        parts.push(<Link key={`${keyPrefix}-l${k++}`} href={href} className={cls}>{label}</Link>);
      } else {
        parts.push(<a key={`${keyPrefix}-a${k++}`} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>);
      }
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={`${keyPrefix}-e${k++}`}>{text.slice(lastIndex)}</span>);
  }
  return parts;
}

/** Renders message text with full markdown: bold, italic, links, bullet lines */
const MessageContent = ({ text }: { text: string }) => {
  const lines = text.split("\n");
  return (
    <div className="space-y-0.5">
      {lines.map((line, lineIdx) => {
        const bulletMatch = line.match(/^\s*[-*]\s+(.*)/);
        if (bulletMatch) {
          return (
            <div key={lineIdx} className="flex gap-2 items-start">
              <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-current opacity-50" />
              <span>{parseInline(bulletMatch[1], lineIdx)}</span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={lineIdx} className="h-1" />;
        return <div key={lineIdx}>{parseInline(line, lineIdx)}</div>;
      })}
    </div>
  );
};

const ChatSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Slide the panel open once the first message is sent
  useEffect(() => {
    if (messages.length > 0) {
      setChatOpen(true);
      setMinimized(false);
    }
  }, [messages.length]);

  // Click outside to minimize
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        chatOpen &&
        !minimized &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(e.target as Node)
      ) {
        setMinimized(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatOpen, minimized]);

  const sendMessage = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isLoading) return;

    setError(null);

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    // Optimistically add user message + empty assistant placeholder
    const assistantMsgId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantMsgId, role: "assistant", content: "" },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      // Build the history to send (exclude the empty assistant placeholder)
      const history = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Network error — please try again.");
      }

      // Read the streaming text response chunk by chunk
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Update the assistant message in-place as chunks arrive
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      // Remove the empty assistant placeholder on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantMsgId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-8xl mx-auto mt-8 md:mt-16 opacity-0 animate-fade-in-up animation-delay-500">
      {/* Floating Chat Interface fixed at bottom */}
      <div ref={chatContainerRef} className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-8xl px-4 md:px-6 z-40">

        {/* Message History Panel — slides up when chat starts, collapses when minimized */}
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            chatOpen && !minimized ? "max-h-[55vh] opacity-100 mb-3" : "max-h-0 opacity-0 mb-0"
          )}
        >
          <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 flex flex-col max-h-[55vh]">
            {/* Panel header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground flex-1">
                Ask me anything about Hafeez
              </span>
              {/* Minimize button */}
              <button
                onClick={() => setMinimized(true)}
                className="p-1 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Minimize chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-3 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5 items-start",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary/60 text-foreground rounded-tl-sm border border-border/30"
                    )}
                  >
                    {msg.content ? (
                      <MessageContent text={msg.content} />
                    ) : (
                      // Empty assistant bubble = streaming loading dots
                      <span className="flex items-center gap-1.5 py-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Error state */}
              {error && (
                <p className="text-xs text-destructive/80 text-center py-1">
                  {error}
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Title — hidden once chat has started */}
        {!chatOpen && (
          <h2 className="hidden lg:block text-base md:text-2xl text-center text-foreground/80 dark:text-muted-foreground mb-3 opacity-90 shadow-black/50 text-shadow">
            What&apos;s on your mind?
          </h2>
        )}

        {/* Quick question bubbles — hidden once chat is open */}
        {!chatOpen && (
          <div className="hidden lg:flex flex-wrap gap-2 justify-center mb-4">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="chat-bubble shadow-lg backdrop-blur-md bg-background/80 hover:bg-background border border-border/50 text-foreground/90 dark:text-foreground"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="chat-input-container shadow-2xl shadow-black/20">
          <div className="flex items-center p-2 md:p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (minimized) setMinimized(false); }}
              onClick={() => { if (minimized) setMinimized(false); }}
              placeholder="Ask anything about Hafeez"
              disabled={isLoading}
              className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-sm md:text-base text-foreground placeholder:text-muted-foreground/90 disabled:opacity-50"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="p-2 md:p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatSection;

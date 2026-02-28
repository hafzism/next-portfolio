import { useState } from "react";
import { Send, Mic } from "lucide-react";

const quickQuestions = [
  "Who is Hafeez?",
  "What are his skills?",
  "How can I contact him?",

];

const ChatSection = () => {
  const [input, setInput] = useState("");

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="w-full max-w-8xl mx-auto mt-8 md:mt-16 opacity-0 animate-fade-in-up animation-delay-500">
      {/* Floating Chat Interface fixed at bottom */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-8xl px-4 md:px-6 z-40">

        <h2 className="hidden lg:block text-base md:text-2xl text-center text-foreground/80 dark:text-muted-foreground mb-3 opacity-90 shadow-black/50 text-shadow">
          What's on your mind?
        </h2>

        {/* Quick Questions bubbles appearing above input */}
        <div className="hidden lg:flex flex-wrap gap-2 justify-center mb-4">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="chat-bubble shadow-lg backdrop-blur-md bg-background/80 hover:bg-background border border-border/50 text-foreground/90 dark:text-foreground"
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="chat-input-container shadow-2xl shadow-black/20">
          <div className="flex items-center p-2 md:p-3 bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What would you like to know?"
              className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-sm md:text-base text-foreground placeholder:text-muted-foreground/90"
            />
            <button className="p-2 md:p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20">
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;

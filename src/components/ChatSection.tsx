import { useState } from "react";
import { Send, Mic } from "lucide-react";

const quickQuestions = [
  "Who is Hafeez?",
  "How much experience does he have?",
  "Which languages does he speak?",
  "What are his hobbies?",
  "How can I contact him?",
];

const ChatSection = () => {
  const [input, setInput] = useState("");

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 md:mt-16 opacity-0 animate-fade-in-up animation-delay-500">
      <h2 className="text-lg md:text-2xl text-center text-muted-foreground mb-4 md:mb-6">
        Ask About Hafzism
      </h2>
      
      {/* Hide quick questions on mobile and tablet */}
      <div className="hidden lg:flex flex-wrap gap-2 justify-center mb-6">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            className="chat-bubble"
            onClick={() => handleQuestionClick(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="chat-input-container">
        <div className="flex items-center p-3 md:p-4">
          <button className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mic className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to know?"
            className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-sm md:text-base text-foreground placeholder:text-muted-foreground"
          />
          <button className="p-1.5 md:p-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity">
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;

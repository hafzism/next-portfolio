const ChatBubbles = () => {
  const bubbles = [
    { color: 'bg-[#3B82F6]', isBlue: true, delay: 0 },
    { color: 'bg-[#22C55E]', isBlue: false, delay: 0.8 },
    { color: 'bg-[#3B82F6]', isBlue: true, delay: 1.6 },
    { color: 'bg-[#22C55E]', isBlue: false, delay: 2.4 },
    { color: 'bg-[#3B82F6]', isBlue: true, delay: 3.2 },
  ];

  return (
    <div className="absolute top-4 right-4 w-24 h-32 overflow-hidden">
      <div className="relative w-full h-full">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`absolute ${bubble.color} rounded-full px-2 py-1.5 flex items-center gap-0.5 animate-message-float`}
            style={{
              right: bubble.isBlue ? '0px' : '24px',
              bottom: '-30px',
              animationDelay: `${bubble.delay}s`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBubbles;

import React from 'react';

const ChatBubbles = () => {
  const bubbles = [
    { isRight: true, delay: 0 },
    { isRight: false, delay: 1.5 },
    { isRight: true, delay: 3.0 },
    { isRight: false, delay: 4.5 },
  ];

  return (
    <div className="absolute top-4 right-4 w-28 h-40 overflow-hidden pointer-events-none select-none mask-fade-top scale-125 origin-top-right">
      <div className="relative w-full h-full flex flex-col justify-end pb-2">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`
              absolute flex items-center gap-1 p-2 rounded-2xl shadow-sm
              animate-chat-cycle
              ${bubble.isRight
                ? 'right-0 bg-blue-500 rounded-tr-sm text-white'
                : 'left-0 bg-emerald-500 rounded-tl-sm text-white'}
            `}
            style={{
              width: 'fit-content',
              animationDelay: `${bubble.delay}s`,
              opacity: 0, // Starts invisible
            }}
          >
            {/* Typing Dots */}
            <div className="w-1 h-1 rounded-full bg-white/90 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-white/90 animate-pulse delay-75" />
            <div className="w-1 h-1 rounded-full bg-white/90 animate-pulse delay-150" />
          </div>
        ))}
      </div>

      <style>{`
        /* Mask to fade out messages at the top */
        .mask-fade-top {
          mask-image: linear-gradient(to bottom, transparent, black 40%);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 40%);
        }

        @keyframes chat-cycle {
          0% {
            transform: translateY(100%) scale(0.8);
            opacity: 0;
          }
          5% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          25% {
            transform: translateY(0);
            opacity: 1;
          }
          30% {
            transform: translateY(-44px); /* Slide up for next msg */
            opacity: 1;
          }
          55% {
            transform: translateY(-44px);
            opacity: 1;
          }
          60% {
            transform: translateY(-88px); /* Slide up again */
            opacity: 0.8;
          }
          85% {
            transform: translateY(-88px);
            opacity: 0.8;
          }
          90% {
            transform: translateY(-132px); /* Exit top */
            opacity: 0;
          }
          100% {
            transform: translateY(-132px);
            opacity: 0;
          }
        }

        .animate-chat-cycle {
          animation: chat-cycle 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatBubbles;
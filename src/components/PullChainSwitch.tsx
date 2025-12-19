import React, { useState, useRef, useEffect, useCallback } from "react";

interface PullChainSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

// Simple synthesized sound effect to avoid external assets
const playClickSound = (isHighPitch: boolean) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Mechanical switch sound profile
    osc.type = "triangle";
    osc.frequency.setValueAtTime(isHighPitch ? 800 : 600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Audio context prevented or not supported
  }
};

const PullChainSwitch = ({ isDark, onToggle }: PullChainSwitchProps) => {
  // Physics State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false); // The "spring back" state
  
  // Refs for logic
  const chainRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const audioLocked = useRef(false);

  // Constants
  const chainLinks = 12; // More links for fluid look
  const triggerThreshold = 80;
  const maxPull = 140;

  // Haptic feedback helper
  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // --- MOUSE & TOUCH HANDLERS ---

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setIsRecovering(false);
    startPos.current = { x: clientX, y: clientY };
    audioLocked.current = false;
  };

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - startPos.current.y;
    const deltaX = clientX - startPos.current.x;

    // Apply "Resistance" - the further you pull, the harder it gets (Logarithmic)
    const resistance = 0.5; 
    const dampening = Math.log(1 + Math.abs(deltaY) / 50) * 40; // Physics ease
    
    // Allow dragging down, but limit dragging up
    const y = deltaY > 0 ? Math.min(deltaY * resistance, maxPull) : deltaY * 0.1;
    // Allow slight horizontal swing
    const x = deltaX * 0.4;

    setPosition({ x, y });
    
    // Haptic "click" preview when crossing threshold
    if (y > triggerThreshold && !audioLocked.current) {
        triggerHaptic(5);
        audioLocked.current = true; // Prevent spamming
    } else if (y < triggerThreshold && audioLocked.current) {
        audioLocked.current = false;
    }
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setIsRecovering(true); // Triggers the CSS spring animation

    if (position.y > triggerThreshold) {
      // SUCCESSFUL PULL
      triggerHaptic([15, 50, 15]); // Strong mechanical click feel
      playClickSound(!isDark);
      onToggle();
    } else {
      // CANCELLED PULL
      triggerHaptic(5); // Light tap
    }

    // Reset position triggers the recovery animation via CSS
    setPosition({ x: 0, y: 0 });
    
    // Remove recovering state after animation finishes
    setTimeout(() => setIsRecovering(false), 1000);
  }, [isDragging, position.y, isDark, onToggle]);

  // --- EVENT LISTENERS ---

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // --- RENDER HELPERS ---

  // Calculate the physics for individual chain beads
  const getLinkStyle = (index: number) => {
    // 0 is top, 1 is bottom
    const progress = index / chainLinks;
    
    // When dragging: Straighten the line from (0,0) to cursor
    // When recovering: Use CSS swing
    
    const currentX = position.x * progress;
    const currentY = position.y * progress;

    return {
      transform: `translate(${currentX}px, ${currentY}px)`,
      transition: isDragging ? 'none' : `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
      transitionDelay: isDragging ? '0ms' : `${index * 5}ms`, // Staggered ripple effect on release
    };
  };

  return (
    <div 
      ref={chainRef}
      className="fixed top-0 right-8 md:right-16 z-50 select-none isolate"
      style={{ perspective: "1000px" }}
    >
      {/* Interaction Area (Invisible larger hit box for easier grabbing) */}
      <div 
        className="absolute -left-8 -right-8 top-0 h-96 z-10 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      />

      <div className={`flex flex-col items-center origin-top ${isRecovering ? 'animate-pendulum' : ''}`}>
        
        {/* Mount Base */}
        <div className="relative z-20">
            <div className={`w-6 h-3 rounded-b-md shadow-md ${
                isDark ? 'bg-slate-700' : 'bg-gray-200'
            }`} />
            {/* Screw head */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/20" />
        </div>

        {/* The Chain */}
        <div className="relative flex flex-col items-center -mt-0.5">
          {[...Array(chainLinks)].map((_, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center"
              style={getLinkStyle(i)}
            >
              {/* Metal Bead */}
              <div 
                className={`w-2 h-2 rounded-full relative z-10 ${
                    isDark 
                    ? 'bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800' 
                    : 'bg-gradient-to-br from-yellow-100 via-yellow-400 to-amber-700'
                }`}
                style={{
                   boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              />
              {/* Connector Pin (Tiny wire between beads) */}
              {i < chainLinks - 1 && (
                <div className={`w-0.5 h-1.5 -my-0.5 ${
                    isDark ? 'bg-slate-500' : 'bg-yellow-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* The Handle / Ornament */}
        <div 
          className="relative z-20 touch-none pointer-events-none" // Events handled by invisible wrapper
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Connector to first bead */}
          <div className={`w-0.5 h-2 mx-auto ${
             isDark ? 'bg-slate-500' : 'bg-yellow-600'
          }`} />

          {/* The Actual Grip Handle */}
          <div 
             className={`w-5 h-8 rounded-full shadow-lg flex items-center justify-center overflow-hidden relative ${
                isDark 
                  ? 'bg-gradient-to-b from-slate-600 to-slate-900 ring-1 ring-slate-500' 
                  : 'bg-gradient-to-b from-amber-700 to-amber-900 ring-1 ring-amber-600'
             }`}
          >
            {/* Wood Grain / Texture Details */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            
            {/* Shiny Highlight */}
            <div className="absolute top-1 left-2 w-2 h-3 bg-white/20 rounded-full blur-[1px]" />
            
            {/* Bottom metallic tip */}
            <div className={`absolute bottom-0 w-full h-2 ${
                isDark ? 'bg-slate-400' : 'bg-yellow-500'
            }`} />
          </div>
        </div>

      </div>

      {/* Global styles for pendulum animation */}
      <style>{`
        @keyframes pendulum {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-1.5deg); }
          75% { transform: rotate(0.5deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-pendulum {
          animation: pendulum 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PullChainSwitch;
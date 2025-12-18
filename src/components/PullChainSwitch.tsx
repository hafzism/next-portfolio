import { useState, useRef, useEffect } from "react";

interface PullChainSwitchProps {
  isDark: boolean;
  onToggle: () => void;
}

const PullChainSwitch = ({ isDark, onToggle }: PullChainSwitchProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const chainRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  const chainLinks = 8;
  const triggerThreshold = 60;
  const maxPull = 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY.current;
      const clampedDelta = Math.max(0, Math.min(deltaY, maxPull));
      setPullDistance(clampedDelta);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      
      if (pullDistance > triggerThreshold) {
        // Trigger snap animation
        setIsSnapping(true);
        setTimeout(() => {
          onToggle();
          setIsSnapping(false);
        }, 150);
      }
      
      setIsDragging(false);
      setPullDistance(0);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, pullDistance, onToggle]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaY = e.touches[0].clientY - startY.current;
      const clampedDelta = Math.max(0, Math.min(deltaY, maxPull));
      setPullDistance(clampedDelta);
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      
      if (pullDistance > triggerThreshold) {
        setIsSnapping(true);
        setTimeout(() => {
          onToggle();
          setIsSnapping(false);
        }, 150);
      }
      
      setIsDragging(false);
      setPullDistance(0);
    };

    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, pullDistance, onToggle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
  };

  // Calculate chain link positions with elasticity
  const getChainLinkStyle = (index: number) => {
    const progress = index / chainLinks;
    const stretch = pullDistance * (0.3 + progress * 0.7); // More stretch at bottom
    const wobble = isSnapping ? Math.sin(index * 1.5) * 3 : 0;
    
    return {
      transform: `translateY(${stretch + wobble}px)`,
      transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    };
  };

  return (
    <div 
      ref={chainRef}
      className="fixed top-0 right-4 md:right-8 lg:right-12 z-50 select-none"
    >
      <div className="flex flex-col items-center">
        {/* Top mount */}
        <div className="w-3 md:w-4 h-2 md:h-3 bg-muted-foreground/50 rounded-b-sm" />
        
        {/* Chain links - ball chain style */}
        {[...Array(chainLinks)].map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center"
            style={getChainLinkStyle(i)}
          >
            {/* Connector bar */}
            <div className="w-px md:w-0.5 h-1.5 md:h-2 bg-muted-foreground/40" />
            {/* Ball */}
            <div 
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-400 to-slate-600' 
                  : 'bg-gradient-to-br from-zinc-300 to-zinc-500'
              }`}
              style={{
                boxShadow: isDark 
                  ? 'inset 1px 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.3)'
                  : 'inset 1px 1px 2px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        ))}
        
        {/* Pull handle / ornament */}
        <div 
          className={`cursor-grab active:cursor-grabbing touch-none ${
            isDragging ? 'scale-105' : 'hover:scale-102'
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ 
            transform: `translateY(${pullDistance * 0.8}px) ${isSnapping ? 'scale(0.9)' : ''}`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Final connector */}
          <div className="w-px md:w-0.5 h-2 md:h-3 bg-muted-foreground/40 mx-auto" />
          
          {/* Ornament - teardrop/bulb shape */}
          <div className="relative">
            <div 
              className={`w-4 md:w-5 h-5 md:h-6 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700' 
                  : 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300'
              }`}
              style={{
                boxShadow: isDark
                  ? 'inset 2px 2px 4px rgba(255,255,255,0.1), inset -1px -1px 3px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.4)'
                  : 'inset 2px 2px 4px rgba(255,255,255,0.9), inset -1px -1px 3px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.15)'
              }}
            >
              {/* Highlight */}
              <div className="absolute top-1 left-1 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/50" />
            </div>
            
            {/* Glow effect in light mode */}
            {!isDark && (
              <div className="absolute inset-0 w-4 md:w-5 h-5 md:h-6 rounded-full bg-amber-200/40 blur-sm animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullChainSwitch;
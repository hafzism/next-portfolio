import React, { useState, useRef, useEffect, useCallback } from "react";

interface PullChainSwitchProps {
    isDark: boolean;
    onToggle: () => void;
}


const PullChainSwitch = ({ isDark, onToggle }: PullChainSwitchProps) => {
    // Physics State
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);

    const chainRef = useRef<HTMLDivElement>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const audioLocked = useRef(false);

    const [chainLinks, setChainLinks] = useState(16);

    useEffect(() => {
        const updateLinks = () => {
            if (window.innerWidth < 640) { // mobile
                setChainLinks(10);
            } else if (window.innerWidth < 1024) { // tablet
                setChainLinks(13);
            } else {
                setChainLinks(16);
            }
        };
        updateLinks();
        window.addEventListener('resize', updateLinks);
        return () => window.removeEventListener('resize', updateLinks);
    }, []);

    // Constants 
    const triggerThreshold = 50;
    const maxPull = 80;

    // Haptic feedback
    const triggerHaptic = (pattern: number | number[]) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    // --- HANDLERS ---

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        setIsRecovering(false);
        startPos.current = { x: clientX, y: clientY };
        audioLocked.current = false;
        document.body.style.userSelect = 'none';
    };

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;

        const deltaY = clientY - startPos.current.y;
        const deltaX = clientX - startPos.current.x;

        const resistance = 0.5;
        const y = deltaY > 0 ? Math.min(deltaY * resistance, maxPull) : deltaY * 0.1;

        // Allow slight horizontal swing - reduced
        const x = deltaX * 0.1;

        setPosition({ x, y });

        if (y > triggerThreshold && !audioLocked.current) {
            triggerHaptic(5);
            audioLocked.current = true;
        } else if (y < triggerThreshold && audioLocked.current) {
            audioLocked.current = false;
        }
    }, [isDragging]);

    const handleEnd = useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);
        setIsRecovering(true);
        document.body.style.userSelect = '';

        if (position.y > triggerThreshold) {
            triggerHaptic([15, 50, 15]);
            onToggle();
        } else {
            triggerHaptic(5);
        }

        setPosition({ x: 0, y: 0 });
        setTimeout(() => setIsRecovering(false), 2000);
    }, [isDragging, position.y, onToggle]);

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

    const getLinkStyle = (index: number) => {
        const progress = index / chainLinks;
        const currentX = position.x * progress;
        const currentY = position.y * progress;

        return {
            transform: `translate(${currentX}px, ${currentY}px)`,
            transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: isDragging ? '0ms' : `${index * 5}ms`,
        };
    };

    // Styles - DYNAMIC THEME
    // isDark (Dark Mode) -> Use Subtler Silver (Not too bright) from slate-400/500 range
    // !isDark (Light Mode) -> Use Dark Gunmetal for contrast
    const colors = isDark
        ? {
            // Subtler Silver / Metallic Grey - Toned down from pure white
            mount: 'bg-slate-500 border border-white/20 shadow-lg',
            bead: 'bg-slate-400 border border-white/30',
            connector: 'bg-slate-500',
            handle: 'bg-gradient-to-br from-slate-300 to-slate-500 ring-1 ring-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)]',
            beadShadow: '0 1px 2px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
            handleHighlight: 'bg-white/20'
        }
        : {
            // Dark / Gunmetal
            mount: 'bg-[hsl(30,10%,12%)] border border-white/10 shadow-lg',
            bead: 'bg-[hsl(30,10%,12%)] border border-white/20',
            connector: 'bg-stone-500',
            handle: 'bg-[hsl(30,10%,12%)] ring-1 ring-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]',
            beadShadow: '0 1px 3px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)',
            handleHighlight: 'bg-white/10'
        };

    return (
        <div
            ref={chainRef}
            className="fixed top-0 right-8 md:right-16 z-50 select-none isolate"
            style={{ perspective: "1000px" }}
        >
            {/* Hit Box */}
            <div
                className="absolute -left-8 -right-8 top-0 -bottom-4 z-10 cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            />

            <div className={`flex flex-col items-center origin-top ${isRecovering ? 'animate-pendulum' : ''}`}>

                {/* Mount Base */}
                <div className="relative z-20">
                    <div className={`w-5 h-2.5 md:w-6 md:h-3 rounded-b-md ${colors.mount}`} />
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
                            {/* Card-Colored Bead */}
                            <div
                                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full relative z-10 ${colors.bead}`}
                                style={{
                                    // Dynamic shadow based on theme
                                    boxShadow: colors.beadShadow
                                }}
                            />
                            {/* Connector Pin */}
                            {i < chainLinks - 1 && (
                                <div className={`w-px md:w-0.5 h-1.5 md:h-2 -my-0.5 md:-my-1 ${colors.connector}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* The Handle */}
                <div
                    className="relative z-20 touch-none pointer-events-none"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                >
                    {/* Connector to first bead */}
                    <div className={`w-px md:w-0.5 h-1.5 md:h-2 mx-auto -mt-0.5 md:-mt-1 ${colors.connector}`} />

                    {/* Handle */}
                    <div
                        className={`w-2.5 h-6 md:w-3.5 md:h-8 rounded-full flex items-center justify-center relative ${colors.handle}`}
                    >
                        {/* Shine highlight */}
                        <div className={`absolute top-0.5 left-0.5 w-0.5 h-2 md:top-1 md:left-1 md:w-1 md:h-3 rounded-full blur-[0.5px] ${colors.handleHighlight}`} />
                    </div>
                </div>

            </div>

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

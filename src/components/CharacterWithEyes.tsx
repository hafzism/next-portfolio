import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import characterFull from "@/assets/character-full.png";

interface CharacterWithEyesProps {
  variant: 'face' | 'laptop';
  className?: string;
}

const CharacterWithEyes = ({ variant, className = "" }: CharacterWithEyesProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== 'face') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxOffset = 2;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedX = (deltaX / (distance || 1)) * Math.min(distance / 80, 1) * maxOffset;
      const normalizedY = (deltaY / (distance || 1)) * Math.min(distance / 80, 1) * maxOffset;

      setPupilOffset({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [variant]);

  if (variant === 'face') {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        {/* Show top portion of character (face) */}
        <div className="absolute inset-0">
          <Image
            src={characterFull}
            alt="Character face"
            className="w-full h-auto absolute"
            style={{
              top: '0',
              left: '0',
              transform: 'scale(1.8)',
              transformOrigin: 'top center',
            }}
          />
        </div>

        {/* Tracking pupils overlay - positioned over the googly eyes in the image */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '28%',
            left: '42%',
            width: '30%',
            height: '20%',
          }}
        >
          {/* Left pupil */}
          <div
            className="absolute w-2 h-2 bg-gray-900 rounded-full"
            style={{
              left: `calc(25% + ${pupilOffset.x}px)`,
              top: `calc(50% + ${pupilOffset.y}px)`,
              transition: 'all 0.08s ease-out',
            }}
          />
          {/* Right pupil */}
          <div
            className="absolute w-2 h-2 bg-gray-900 rounded-full"
            style={{
              left: `calc(68% + ${pupilOffset.x}px)`,
              top: `calc(50% + ${pupilOffset.y}px)`,
              transition: 'all 0.08s ease-out',
            }}
          />
        </div>
      </div>
    );
  }

  // Laptop variant - show bottom portion
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Image
          src={characterFull}
          alt="Character with laptop"
          className="w-full h-auto absolute"
          style={{
            bottom: '0',
            left: '0',
            transform: 'scale(1.5) translateY(-15%)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>
    </div>
  );
};

export default CharacterWithEyes;

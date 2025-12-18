import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface Comet {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
}

const NightSky = ({ isVisible }: { isVisible: boolean }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    // Generate minimal stars
    const generatedStars: Star[] = [];
    for (let i = 0; i < 40; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        twinkleDelay: Math.random() * 5,
      });
    }
    setStars(generatedStars);
  }, []);

  // Occasionally spawn comets
  useEffect(() => {
    if (!isVisible) return;

    const spawnComet = () => {
      // Comet starts from top-left area and moves to bottom-right
      const isFromLeft = Math.random() > 0.3;
      const newComet: Comet = {
        id: Date.now(),
        startX: isFromLeft ? -5 : Math.random() * 40 + 10,
        startY: isFromLeft ? Math.random() * 30 + 5 : -5,
        angle: Math.random() * 15 + 30, // 30-45 degrees
        duration: Math.random() * 0.8 + 0.6, // Fast: 0.6-1.4s
      };
      
      setComets(prev => [...prev, newComet]);
      
      // Remove comet after animation
      setTimeout(() => {
        setComets(prev => prev.filter(c => c.id !== newComet.id));
      }, newComet.duration * 1000 + 200);
    };

    // Initial comet after a delay
    const initialTimeout = setTimeout(spawnComet, 2000);
    
    // Spawn comets randomly every 5-10 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnComet();
      }
    }, 5000 + Math.random() * 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.twinkleDelay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Comets - shooting stars */}
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="absolute"
          style={{
            left: `${comet.startX}%`,
            top: `${comet.startY}%`,
            transform: `rotate(${comet.angle}deg)`,
          }}
        >
          <div
            className="relative animate-shooting-star"
            style={{
              animationDuration: `${comet.duration}s`,
            }}
          >
            {/* Comet tail - long gradient trail */}
            <div 
              className="absolute top-1/2 right-full -translate-y-1/2 h-px w-20 md:w-32 bg-gradient-to-l from-white via-white/60 to-transparent"
            />
            {/* Comet head - bright dot */}
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NightSky;
import { useRef, useEffect, useState, useMemo } from "react";
import gsap from "gsap";

const ParticlesHero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{x: number, y: number, char: string, blur: number, velocity: {x: number, y: number}}[]>([]);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const FPS = 24; // Reduced FPS for better performance
  const frameDelay = 1000 / FPS;

  // Memoize text and chars to prevent unnecessary recalculations
  const { text, chars } = useMemo(() => {
    const text = "FULLSTACK DEVELOPER CODE WITH TAMA";
    return { text, chars: text.split('') };
  }, []);

  // Initialize particles only once when component mounts
  useEffect(() => {
    const isLowEnd = window.navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth < 768;
    
    // Reduce particle count even further for better performance
    const particleCount = isMobile ? 6 : isLowEnd ? 8 : Math.min(12, chars.length);
    
    const newParticles = Array(particleCount).fill(null).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: chars[i % chars.length],
      blur: Math.random() * 1.5 + 0.5, // Reduced blur range
      velocity: {
        x: (Math.random() - 0.5) * (isLowEnd || isMobile ? 0.5 : 1.2), // Slower movement
        y: (Math.random() - 0.5) * (isLowEnd || isMobile ? 0.5 : 1.2)
      }
    }));

    setParticles(newParticles);

    // Use CSS transform for better performance
    if (particlesRef.current) {
      gsap.set(".particle", {
        opacity: 0,
        scale: 0,
        willChange: "transform", // Hint browser for optimization
      });

      gsap.to(".particle", {
        opacity: 0.5,
        scale: 1,
        duration: 1,
        stagger: {
          amount: 0.8,
          from: "random"
        },
        ease: "power3.out"
      });
    }
  }, [chars]); 

  // Optimized animation frame handler
  useEffect(() => {
    let rafId: number;
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= frameDelay) {
        setParticles(prevParticles => {
          // Only update if particles are moving significantly
          const needsUpdate = prevParticles.some(p => 
            Math.abs(p.velocity.x) > 0.01 || Math.abs(p.velocity.y) > 0.01
          );
          
          if (!needsUpdate) return prevParticles;
          
          return prevParticles.map(particle => {
            let newX = particle.x + particle.velocity.x;
            let newY = particle.y + particle.velocity.y;
            
            // Simplified boundary checking with damping
            if (newX <= 0 || newX >= window.innerWidth) {
              particle.velocity.x *= -0.95; // Add damping
              newX = Math.max(0, Math.min(newX, window.innerWidth));
            }
            if (newY <= 0 || newY >= window.innerHeight) {
              particle.velocity.y *= -0.95; // Add damping
              newY = Math.max(0, Math.min(newY, window.innerHeight));
            }

            return {
              ...particle,
              x: newX,
              y: newY,
              blur: 1.5 + Math.sin(timestamp * 0.0008) // Slower blur animation
            };
          });
        });
        lastUpdateRef.current = timestamp;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []); 

  return (
    <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle absolute text-emerald-400/40 text-xl font-bold"
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%)`,
            filter: `blur(${particle.blur}px)`,
            textShadow: '0 0 8px rgba(52, 211, 153, 0.3)',
            willChange: 'transform, filter'
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
};

export default ParticlesHero;

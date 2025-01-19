import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const ParticlesHero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{x: number, y: number, char: string, blur: number, velocity: {x: number, y: number}}[]>([]);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const FPS = 30;
  const frameDelay = 1000 / FPS;

  // Initialize particles hanya sekali saat komponen mount
  useEffect(() => {
    const isLowEnd = window.navigator.hardwareConcurrency <= 4;
    const isMobile = window.innerWidth < 768;
    const text = "FULLSTACK DEVELOPER CODE WITH TAMA";
    const chars = text.split('');
    
    // Kurangi jumlah particles untuk mobile/low-end devices
    const particleCount = isMobile || isLowEnd ? 10 : chars.length;
    
    const newParticles = Array(particleCount).fill(null).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: chars[i % chars.length],
      blur: Math.random() * 2 + 1,
      velocity: {
        x: (Math.random() - 0.5) * (isLowEnd || isMobile ? 0.8 : 2),
        y: (Math.random() - 0.5) * (isLowEnd || isMobile ? 0.8 : 2)
      }
    }));

    setParticles(newParticles);

    // Initial animation
    if (particlesRef.current) {
      gsap.set(".particle", {
        opacity: 0,
        scale: 0,
      });

      gsap.to(".particle", {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: "power4.out"
      });
    }
  }, []); 

  // Handle animation frame
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= frameDelay) {
        setParticles(prevParticles => 
          prevParticles.map(particle => {
            let newX = particle.x + particle.velocity.x;
            let newY = particle.y + particle.velocity.y;
            
            // Boundary checking
            if (newX <= 0) {
              newX = 0;
              particle.velocity.x *= -1;
            } else if (newX >= window.innerWidth) {
              newX = window.innerWidth;
              particle.velocity.x *= -1;
            }
            if (newY <= 0) {
              newY = 0;
              particle.velocity.y *= -1;
            } else if (newY >= window.innerHeight) {
              newY = window.innerHeight;
              particle.velocity.y *= -1;
            }

            return {
              ...particle,
              x: newX,
              y: newY,
              blur: 2 + Math.sin(timestamp * 0.001)
            };
          })
        );
        lastUpdateRef.current = timestamp;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); 

  return (
    <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle absolute text-emerald-400/40 text-xl font-bold"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
            filter: `blur(${particle.blur}px)`,
            textShadow: '0 0 8px rgba(52, 211, 153, 0.3)'
          }}
        >
          {particle.char}
        </div>
      ))}
    </div>
  );
};

export default ParticlesHero;

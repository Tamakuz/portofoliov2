import gsap from "gsap";
import { useLayoutEffect, useRef, useCallback, useEffect } from "react";

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Hide scrollbar initially and show it after animation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 6000); // Adjust timing to match animation duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Particle animation setup
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      alpha: number;
      targetAlpha: number;
    }> = [];

    // Create particles with initial alpha of 0
    // Reduce particle count on mobile
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: 0,
        targetAlpha: Math.random() * 0.5 + 0.2
      });
    }

    // Fade in particles
    gsap.to(particles, {
      alpha: (index) => particles[index].targetAlpha,
      duration: 1,
      stagger: 0.02,
      ease: "power2.out"
    });

    let animationFrameId: number;

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wrap particles around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 243, 208, ${particle.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Adjust connection distance based on screen size
          const maxDistance = window.innerWidth < 768 ? 70 : 100;
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 243, 208, ${0.2 * (1 - distance/maxDistance) * Math.min(particle.alpha, otherParticle.alpha)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    // Initial setup
    gsap.set(".splash-screen", {
      visibility: "visible"
    });
    gsap.set(".main-content", {
      opacity: 0,
      y: 20
    });
    
    // Set initial state for both title and subtitle
    gsap.set(".char", {
      opacity: 0,
      y: 40,
      rotateX: -90
    });

    // Set initial state for decorative elements and divider
    gsap.set([".decorative-border", ".decorative-circle", ".decorative-dot"], {
      scale: 0,
      opacity: 0
    });
    gsap.set(".divider", {
      width: 0,
      opacity: 0
    });

    const tl = gsap.timeline();

    // Initialize particles first and create a promise
    const particlesPromise = new Promise<void>((resolve) => {
      initParticles();
      // Allow particles to initialize for 1 second before starting text animation
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    // Wait for particles to initialize before starting text animations
    particlesPromise.then(() => {
      tl.to(".splash-title .char", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      })
      .to(".divider", {
        width: "8rem", // w-32 = 8rem
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(".splash-subtitle .char", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .to([".decorative-border", ".decorative-circle", ".decorative-dot"], {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .to({}, { duration: 0.8 })
      .to(".splash-screen-gradient", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .to({}, { duration: 0.4 })
      .to(".splash-screen", {
        y: "-100%",
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(".main-content", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .set(".splash-screen", { display: "none" });
    });

  }, [initParticles]);

  // Helper function to split text into spans
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-zinc-900 relative overflow-hidden"
    >
      <div className="main-content">{children}</div>

      <div className="splash-screen fixed inset-0 flex flex-col items-center justify-center">
        {/* Particles Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 opacity-90 splash-screen-gradient" />

        <div className="relative z-10 text-center px-4">
          {/* Decorative elements around text */}
          <div className="decorative-border absolute -left-4 md:-left-8 -top-4 md:-top-8 w-3 md:w-4 h-3 md:h-4 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-emerald-200/40" />
          <div className="decorative-border absolute -right-4 md:-right-8 -top-4 md:-top-8 w-3 md:w-4 h-3 md:h-4 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-emerald-200/40" />
          <div className="decorative-border absolute -left-4 md:-left-8 -bottom-4 md:-bottom-8 w-3 md:w-4 h-3 md:h-4 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-emerald-200/40" />
          <div className="decorative-border absolute -right-4 md:-right-8 -bottom-4 md:-bottom-8 w-3 md:w-4 h-3 md:h-4 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-emerald-200/40" />
          
          {/* Additional decorative circles */}
          <div className="decorative-circle absolute -left-8 md:-left-12 top-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full border-2 border-emerald-200/40" />
          <div className="decorative-circle absolute -right-8 md:-right-12 top-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full border-2 border-emerald-200/40" />
          
          {/* Additional decorative dots */}
          <div className="decorative-dot absolute left-0 top-0 w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-200/40 rounded-full" />
          <div className="decorative-dot absolute right-0 top-0 w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-200/40 rounded-full" />
          <div className="decorative-dot absolute left-0 bottom-0 w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-200/40 rounded-full" />
          <div className="decorative-dot absolute right-0 bottom-0 w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-200/40 rounded-full" />
          
          <h1 className="splash-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-2 md:mb-4 text-emerald-200 tracking-wider">
            {splitText("Code With Tama")}
          </h1>
          <div className="divider h-0.5 md:h-1 bg-emerald-200/30 mx-auto mb-2 md:mb-4 rounded-full" />
          <p className="splash-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-emerald-200 tracking-widest uppercase">
            {splitText("Fullstack Developer")}
          </p>
        </div>
      </div>
    </main>
  );
};

export default SplashScreen;

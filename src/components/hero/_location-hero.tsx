import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

const LocationHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const animationComplete = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !locationRef.current || !timeRef.current || !iconRef.current || animationComplete.current) return;

    // Initial setup
    gsap.set([locationRef.current, timeRef.current], {
      opacity: 0,
      x: isMobile ? 0 : 100,
      y: isMobile ? 50 : 0,
      rotateX: -90,
      filter: "blur(10px)"
    });

    gsap.set(iconRef.current, {
      scale: 0,
      rotate: -180,
      opacity: 0
    });

    // One-time entrance animation
    const tl = gsap.timeline({
      delay: 6,
      onComplete: () => {
        animationComplete.current = true;
      }
    });

    // Icon animation
    tl.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    });

    // Text elements animation with smooth stagger
    tl.to([locationRef.current, timeRef.current], {
      opacity: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.5,
      stagger: 0.3,
      ease: "power4.out",
      transformOrigin: "right center"
    }, "-=0.8");
      
    // Single bounce animation
    tl.to([locationRef.current, timeRef.current], {
      y: -5,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1
    });

    // Single pulse animation for icon
    tl.to(
      iconRef.current,
      {
        scale: 1.1,
        duration: 0.75,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      },
      "-=2"
    );

  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className={`absolute ${
        isMobile 
          ? "bottom-[10%] left-1/2 -translate-x-1/2 items-center" 
          : "top-[25%] right-[10%] items-end"
      } flex flex-col`}
    >
      <div 
        ref={locationRef}
        className="flex items-center gap-2 text-emerald-400/80"
      >
        <svg
          ref={iconRef}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium text-xs md:text-base">
          Ngawi, Indonesia
        </span>
      </div>
      <div 
        ref={timeRef}
        className="text-gray-400/60 text-[10px] md:text-sm mt-1"
      >
        GMT+7 (Western Indonesian Time)
      </div>
    </div>
  );
}

export default LocationHero
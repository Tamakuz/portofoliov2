import JovanImage from "../../assets/jovan.png";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

const ImageWatermark = ({
  position = { bottom: "15%", left: "5%" },
}: {
  position?: {
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
  };
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });
  const animationComplete = useRef(false);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!imageRef.current || !containerRef.current || animationComplete.current) return;

    // Initial setup
    gsap.set([imageRef.current, containerRef.current], {
      scale: 0,
      opacity: 0,
      y: 100,
    });

    // Animate entrance - only once
    gsap.to([imageRef.current, containerRef.current], {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 6,
      ease: "power2.out",
      stagger: 0.2,
      onComplete: () => {
        animationComplete.current = true;
        // Start infinite rotation for image only
        gsap.to(imageRef.current, {
          rotation: "+=360",
          duration: screenSize.isMobile ? 15 : screenSize.isTablet ? 13 : 12,
          repeat: -1,
          ease: "linear",
          immediateRender: false,
        });
      }
    });
  }, [screenSize]);

  const getImageSize = () => {
    if (screenSize.isMobile) return "w-16 h-16";
    if (screenSize.isTablet) return "w-24 h-24";
    return "w-32 h-32";
  };

  const getTextSize = () => {
    if (screenSize.isMobile) return "text-sm";
    if (screenSize.isTablet) return "text-base";
    return "text-lg";
  };

  const getPosition = () => {
    if (screenSize.isMobile) {
      return {
        bottom: position.bottom,
        left: "50%",
        transform: "translateX(-50%)"
      };
    }
    return position;
  };

  return (
    <div
      ref={containerRef}
      style={getPosition()}
      className={`absolute flex items-center gap-3 md:gap-4 lg:gap-6 
        ${screenSize.isMobile ? "flex-col" : "flex-row"}
        ${screenSize.isMobile ? "p-3" : screenSize.isTablet ? "p-4" : "p-5"}
        transition-all duration-300
        ${screenSize.isMobile ? "w-max mx-auto" : ""}`}
    >
      <div
        ref={imageRef}
        className={`${getImageSize()} transition-all duration-300 hover:scale-110`}
      >
        <img 
          src={JovanImage} 
          alt="Jovan" 
          className="w-full h-full rounded-full shadow-lg" 
        />
      </div>

      <div className={`flex flex-col ${screenSize.isMobile ? "items-center text-center" : ""}`}>
        <span className={`text-emerald-400 font-medium ${screenSize.isMobile ? "text-xs" : "text-sm"}`}>
          Available for Freelance
        </span>
        <a 
          href="#contact"
          className={`text-white hover:text-emerald-400 transition-colors font-bold ${getTextSize()} 
            hover:translate-x-1 transform transition-transform duration-200 flex items-center gap-1`}
        >
          Let's Talk 
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
};

export default ImageWatermark;

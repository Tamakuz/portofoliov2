import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";

/**
 * TitleHero component displays animated text with customizable styling and positioning
 * @example
 * // Basic usage
 * <TitleHero text="Hello World" textnowrap={true} />
 * 
 * // With custom styling
 * <TitleHero 
 *   text="Custom Title"
 *   textnowrap={true}
 *   colorText="#3B82F6" // Initial color (Hex value or Tailwind class)
 *   colorHover="#34d399" // Hover color (Hex value)
 *   position={{ left: "50%", top: "30%" }}
 *   fontSize="text-7xl" // Can be Tailwind class like text-7xl or custom size like "32px"
 * />
 */

const TitleHrro = ({
  /** The text content to be displayed and animated */
  text,
  /** Whether to prevent text wrapping */
  textnowrap = true,
  /** Initial text color (Hex value or Tailwind class) */
  colorText = "text-gray-300",
  /** Hover text color (Hex value) */
  colorHover = "#34d399",
  /** Position object for absolute positioning */
  position = { left: 0, top: 0 },
  /** Font size - can be Tailwind class (text-7xl) or pixel value (32px) */
  fontSize = "text-9xl",
}: {
  text: string;
  textnowrap: boolean;
  colorText?: string;
  colorHover?: string;
  position?: {
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
  };
  fontSize?: string;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const animationComplete = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (animationComplete.current) return;

    gsap.set(".hero-char", {
      opacity: 0,
      y: 100,
    });

    gsap.to(".hero-char", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)",
      delay: 6.5,
      onComplete: () => {
        animationComplete.current = true;
      }
    });
		
    const chars = document.querySelectorAll(".hero-char");
    chars.forEach((char, index) => {
      charsRef.current[index] = char as HTMLSpanElement;
      let animation: gsap.core.Tween | null = null;

      const handleMouseEnter = () => {
        if (!isMobile) {
          if (animation) {
            animation.kill();
          }
          
          animation = gsap.to(char, {
            y: -15,
            scale: 1.1,
            color: colorHover,
            duration: 0.3,
            ease: "back.out(2)",
            transformOrigin: "center center"
          });
        }
      };

      const handleMouseLeave = () => {
        if (!isMobile) {
          if (animation) {
            animation.kill();
          }
          
          animation = gsap.to(char, {
            y: 0,
            scale: 1,
            color: "inherit",
            duration: 0.2,
            ease: "back.out(2)",
          });
        }
      };

      char.addEventListener("mouseenter", handleMouseEnter);
      char.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        char.removeEventListener("mouseenter", handleMouseEnter);
        char.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

  }, [isMobile, colorHover]);

  /**
   * Converts position value to pixel string if number is provided
   */
  const getPositionValue = (value: string | number) => {
    if (typeof value === "number") {
      return `${value}px`;
    }
    return value;
  };

  /**
   * Formats font size value to proper Tailwind class
   */
  const getFontSize = (size: string) => {
    if (size.startsWith('text-')) {
      return size;
    }
    if (size.endsWith('px')) {
      return `text-[${size}]`;
    }
    return `text-[${size}px]`;
  };

  /**
   * Formats color value to proper Tailwind class or CSS color
   */
  const getColorClass = (color: string) => {
    if (color.startsWith('text-')) {
      return color;
    }
    return `text-[${color}]`;
  };

  return (
    <h1
      ref={titleRef}
      className={`absolute ${getFontSize(fontSize)} font-extrabold ${getColorClass(colorText)} ${
        textnowrap ? "text-nowrap" : ""
      } transition-all ${isMobile ? 'left-1/2 blur-[10px]' : `left-[${getPositionValue(
        position?.left ?? 0
      )}]`} top-[${getPositionValue(
        position?.top ?? 0
      )}] -translate-x-1/2 -translate-y-1/2`}
      style={{ opacity: 1 }} // Ensure text stays visible
    >
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`hero-char inline-block ${!isMobile ? 'cursor-pointer' : ''}`}
          style={{ opacity: 1 }} // Ensure characters stay visible
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default TitleHrro;

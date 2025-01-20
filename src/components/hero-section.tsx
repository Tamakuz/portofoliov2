import fotoProfil from "../assets/profile.webp";
import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import TitleHrro from "./hero/_title-hero";
import ImageWatermark from "./hero/_image-watermark";
import ParticlesHero from "./hero/_particles-hero";
import LocationHero from "./hero/_location-hero";

const HeroSection = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    // Set initial position to center
    gsap.set(imageRef.current, {
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 0.8,
      opacity: 0
    });

    // Animate entrance from center
    gsap.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay: 6,
      ease: "power2.out",
      onComplete: () => {
        // Then animate to final position
        gsap.to(imageRef.current, {
          left: window.innerWidth < 768 ? "50%" : "80%",
          top: window.innerWidth < 768 ? "40%" : "65%",
          duration: 2,
          ease: "expo.inOut",
          delay: 0.5
        });
      }
    });

    // Animate ornaments with smoother animations
    gsap.set(".ornament-image", {
      scale: 0,
      opacity: 0,
      rotate: -180,
      transformOrigin: "center",
    });

    // Create timeline for ornaments with smoother animations
    const ornamentsTimeline = gsap.timeline({
      delay: 6.5,
      defaults: {
        duration: 2,
        ease: "elastic.out(1, 0.3)", // Smoother elastic effect
      }
    });

    // Animate each ornament with smoother transitions
    ornamentsTimeline
      .to(".ornament-image", {
        scale: 1,
        opacity: 0.8,
        rotate: 0,
        stagger: {
          each: 0.3,
          from: "random",
          ease: "power2.inOut",
        },
      })
      // Add smoother floating animation
      .to(".ornament-image", {
        y: "+=15",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random",
        }
      }, "-=1.5")
      // Add gentler rotation
      .to(".ornament-image", {
        rotate: "+=8",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random",
        }
      }, "-=2.5")
      // Add subtle scale breathing effect
      .to(".ornament-image", {
        scale: 1.05,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.4,
          from: "random",
        }
      }, "-=3");

    // Handle window resize
    const handleResize = () => {
      gsap.to(imageRef.current, {
        left: window.innerWidth < 768 ? "50%" : "80%",
        top: window.innerWidth < 768 ? "40%" : "65%",
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse follower effect
  useEffect(() => {
    if (!cursorRef.current || !sectionRef.current) return;

    const cursor = cursorRef.current;
    const section = sectionRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX - cursor.offsetWidth - 65;
      const y = e.clientY - cursor.offsetHeight - 65;

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power2.out",
      });

      // Scale effect on movement
      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.2,
        onComplete: () => {
          gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
          });
        },
      });
    };

    section.addEventListener("mousemove", onMouseMove);

    // Show cursor when mouse enters section
    section.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
      });
    });

    // Hide cursor when mouse leaves section
    section.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
      });
    });

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-screen relative bg-zinc-900 p-4 md:p-20 overflow-hidden"
    >
      {/* Particles */}
      <ParticlesHero />

      {/* Mouse follower - hidden on mobile */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed opacity-0 mix-blend-difference hidden md:block"
      >
        <div className="w-8 h-8 border-2 border-emerald-400 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
      </div>

      <TitleHrro
        text="FULLSTACK"
        textnowrap={true}
        position={{
          left: "35%",
          top: "30%",
        }}
        fontSize={window.innerWidth < 768 ? "text-6xl" : "text-9xl"}
      />
      <TitleHrro
        text="CODE WITH TAMA"
        textnowrap={true}
        position={{
          left: "45%",
          top: "45%",
        }}
        fontSize={window.innerWidth < 768 ? "text-4xl" : "text-8xl"}
      />

      <div
        ref={imageRef}
        className="bg-red-500 object-cover grayscale w-48 h-48 md:w-64 md:h-64 rounded-xl absolute"
      >
        <img
          src={fotoProfil}
          alt="Foto Profil"
          className="w-full h-full rounded-xl"
        />
        <div className="ornament-image absolute w-32 md:w-40 h-16 md:h-20 border-t-4 border-l-4 border-emerald-400 -top-4 -left-4 rounded-tl-2xl" />
        <div className="ornament-image absolute w-16 md:w-20 h-32 md:h-40 border-t-4 border-r-4 border-emerald-400 -top-4 -right-4 rounded-tr-2xl" />
        <div className="ornament-image absolute w-16 md:w-20 h-32 md:h-40 border-b-4 border-l-4 border-emerald-400 -bottom-4 -left-4 rounded-bl-2xl" />
        <div className="ornament-image absolute w-32 md:w-40 h-16 md:h-20 border-b-4 border-r-4 border-emerald-400 -bottom-4 -right-4 rounded-br-2xl" />
      </div>

      <ImageWatermark
        position={{
          bottom: window.innerWidth < 768 ? "15%" : "15%",
          left: window.innerWidth < 768 ? "5%" : "5%",
        }}
      />

      <LocationHero />
    </section>
  );
};

export default HeroSection;

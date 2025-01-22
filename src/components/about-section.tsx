import { useRef, useLayoutEffect } from "react";
import TextReveal from "./about/_text-reveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const text = "Halo, saya Tama, seorang pengembang fullstack yang memiliki fokus utama pada pengembangan front-end. Saya sangat menikmati bekerja di persimpangan antara kreativitas dan teknologi. Dengan keahlian khusus dalam menciptakan produk web yang ramah pengguna dan memiliki nilai estetika tinggi, saya telah mengembangkan berbagai proyek mulai dari website hingga aplikasi web yang kompleks. Saya selalu bersemangat dalam membangun solusi digital yang inovatif menggunakan teknologi terkini, termasuk eksplorasi saya dalam teknologi blockchain. Di luar dunia pengembangan, saya menghabiskan waktu dengan menikmati musik atau sesekali menonton film. Mari kita wujudkan ide-ide kreatif Anda menjadi produk digital yang mengesankan dan bermanfaat.";

  // Generate random positions once on component mount
  const decorativePositions = useRef({
    topRight: Array(8).fill(0).map((_, i) => ({
      top: Math.sin(i * 0.8) * 80 + 50,
      left: Math.cos(i * 0.8) * 80 + 50,
    })),
    topLeft: Array(6).fill(0).map((_, i) => ({
      top: Math.cos(i * Math.PI/3) * 40 + 40,
      left: Math.sin(i * Math.PI/3) * 40 + 40,
    })),
    bottomRight: Array(5).fill(0).map((_, i) => ({
      top: Math.cos(i * Math.PI/2.5) * (25 + i * 8),
      left: Math.sin(i * Math.PI/2.5) * (25 + i * 8),
    })),
    bottomLeft: Array(4).fill(0).map(() => ({
      top: Math.random() * 60,
      left: Math.random() * 80,
      rotation: Math.random() * 360,
    })),
  });

  useLayoutEffect(() => {
    const decorativeElements = {
      foreground: sectionRef.current?.querySelectorAll('.decorative-foreground'),
      midground: sectionRef.current?.querySelectorAll('.decorative-midground'),
      background: sectionRef.current?.querySelectorAll('.decorative-background')
    };
    
    // Background elements - slow movement
    decorativeElements.background?.forEach((element) => {
      gsap.to(element, {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        rotation: "random(-15, 15)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    });

    // Midground elements - medium movement
    decorativeElements.midground?.forEach((element) => {
      gsap.to(element, {
        y: "random(-60, 60)",
        x: "random(-60, 60)",
        zIndex: "random(1, 3)",
        rotation: "random(-20, 20)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    // Foreground elements - fast movement
    decorativeElements.foreground?.forEach((element) => {
      gsap.to(element, {
        y: "random(-80, 80)",
        x: "random(-80, 80)",
        rotation: "random(-25, 25)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    // Infinite rotation animation for header icons
    const headerIcons = sectionRef.current?.querySelectorAll('.header-icon');
    headerIcons?.forEach((icon, i) => {
      gsap.to(icon, {
        rotation: 360,
        duration: 3 + i,
        repeat: -1,
        ease: "none"
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-fit w-full bg-zinc-900 relative px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Enhanced glowing orbs with gradients - Responsive sizes */}
          <div className="decorative-midground absolute -top-20 sm:-top-30 md:-top-40 right-10 sm:right-20 md:right-40 w-[15rem] sm:w-[20rem] md:w-[25rem] h-[15rem] sm:h-[20rem] md:h-[25rem] rounded-full bg-gradient-to-br from-emerald-400/25 via-emerald-500/20 to-transparent blur-[60px] sm:blur-[80px] md:blur-[100px]" />
          <div className="decorative-midground absolute top-20 sm:top-30 md:top-40 -left-20 sm:-left-30 md:-left-40 w-[20rem] sm:w-[28rem] md:w-[35rem] h-[20rem] sm:h-[28rem] md:h-[35rem] rounded-full bg-gradient-to-tr from-emerald-400/25 via-emerald-500/20 to-transparent blur-[80px] sm:blur-[100px] md:blur-[120px]" />
          {/* <div className="decorative-midground absolute -top-10 sm:-top-15 md:-top-20 left-20 sm:left-40 md:left-60 w-[10rem] sm:w-[12rem] md:w-[15rem] h-[10rem] sm:h-[12rem] md:h-[15rem] rounded-full bg-gradient-to-bl from-emerald-300/20 via-emerald-400/15 to-transparent blur-[50px] sm:blur-[65px] md:blur-[80px]" /> */}

          {/* Decorative patterns - Hidden on smaller screens */}
          <div className="hidden md:block">
            {/* Top right pattern */}
            <div className="decorative-background absolute -right-20 top-0">
              <div className="relative w-64 h-64">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-transparent border-2 border-emerald-400/35 hover:border-emerald-300/50 transition-all duration-300 hover:scale-110"
                    style={{
                      width: i % 2 === 0 ? "40px" : "32px",
                      height: i % 2 === 0 ? "40px" : "32px",
                      borderRadius: i % 3 === 0 ? "50%" : "0",
                      clipPath: i % 3 === 1 ? "polygon(50% 0%, 100% 100%, 0% 100%)" : "none",
                      top: `${decorativePositions.current.topRight[i].top}px`,
                      left: `${decorativePositions.current.topRight[i].left}px`,
                      transform: `rotate(${45 + i * 45}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Top left pattern */}
            <div className="decorative-background absolute -left-20 top-20">
              <div className="relative w-48 h-48">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-transparent border-2 border-emerald-400/40 hover:border-emerald-300/55 transition-all duration-300 hover:scale-110"
                    style={{
                      width: "30px",
                      height: "30px",
                      clipPath: i % 2 === 0
                        ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                        : "polygon(50% 0%, 100% 100%, 0% 100%)",
                      top: `${decorativePositions.current.topLeft[i].top}px`,
                      left: `${decorativePositions.current.topLeft[i].left}px`,
                      transform: `rotate(${i * 60}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom right pattern */}
            <div className="decorative-foreground absolute -right-10 bottom-20">
              <div className="relative w-40 h-40">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-transparent border-2 border-emerald-400/45 hover:border-emerald-300/60 transition-all duration-300 hover:scale-110"
                    style={{
                      width: "35px",
                      height: "35px",
                      clipPath: i % 2 === 0
                        ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                        : "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      top: `${decorativePositions.current.bottomRight[i].top}px`,
                      left: `${decorativePositions.current.bottomRight[i].left}px`,
                      transform: `rotate(${i * 72}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header content */}
          <div className="space-y-6 sm:space-y-8 max-w-5xl">
            <div className="relative">
              <h2 className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 group">
                About <span className="text-emerald-400 inline-block transition-transform duration-300 group-hover:scale-110">Me</span>
              </h2>
              
              {/* Header decorative icons - Hidden on mobile */}
              <div className="hidden md:block">
                <div className="absolute -top-2 -left-4 header-icon transition-transform duration-300 hover:scale-125">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400/60">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" className="animate-pulse"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="absolute -top-4 -left-10 header-icon transition-transform duration-300 hover:scale-125">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400/60">
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" strokeWidth="2" className="animate-pulse"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-16 header-icon transition-transform duration-300 hover:scale-125">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400/60">
                    <path d="M12 2L4 6L4 18L12 22L20 18L20 6L12 2Z" strokeWidth="2" className="animate-pulse"/>
                  </svg>
                </div>
                <div className="absolute -top-6 right-20 header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400/40">
                    <path d="M12 2L15 6L19 7L19 11L22 14L19 17L19 21L15 22L12 18L9 22L5 21L5 17L2 14L5 11L5 7L9 6L12 2Z" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="absolute top-8 -left-16 header-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400/40">
                    <polygon points="12 2 19 21 12 17 5 21 12 2" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <TextReveal
                text={text}
                className="text-md md:text-lg text-gray-300/80"
              />

              {/* Bottom left pattern - Hidden on mobile */}
              <div className="hidden md:block decorative-foreground absolute -bottom-20 left-10">
                <div className="relative w-44 h-32">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-transparent border-2 border-emerald-400/35 hover:border-emerald-300/50 transition-all duration-300 hover:scale-110"
                      style={{
                        width: "28px",
                        height: "28px",
                        clipPath: [
                          "circle(50% at 50% 50%)",
                          "polygon(50% 0%, 100% 100%, 0% 100%)",
                          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                          "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                        ][i],
                        top: `${decorativePositions.current.bottomLeft[i].top}px`,
                        left: `${decorativePositions.current.bottomLeft[i].left}px`,
                        transform: `rotate(${decorativePositions.current.bottomLeft[i].rotation}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
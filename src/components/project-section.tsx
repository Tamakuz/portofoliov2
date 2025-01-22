import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern tech stack",
      tech: ["React", "TypeScript", "TailwindCSS", "GSAP"],
      image: "/projects/portfolio.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/portfolio",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store with payment integration",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      image: "/projects/ecommerce.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/ecommerce",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool",
      tech: ["Vue.js", "Firebase", "TailwindCSS"],
      image: "/projects/taskapp.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/taskapp",
    },
    {
      title: "Blockchain Explorer",
      description:
        "Web application for exploring blockchain transactions and data",
      tech: ["React", "Web3.js", "Node.js", "MongoDB"],
      image: "/projects/blockchain.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/blockchain",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      tech: ["Next.js", "GraphQL", "TailwindCSS", "Redis"],
      image: "/projects/dashboard.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/dashboard",
    },
    {
      title: "AI Image Generator",
      description: "Web app that generates images using AI models",
      tech: ["Vue.js", "Python", "TensorFlow", "AWS"],
      image: "/projects/ai-generator.jpg",
      liveDemo: "https://example.com",
      sourceCode: "https://github.com/example/ai-generator",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards when they enter viewport
      const projectCards =
        sectionRef.current?.querySelectorAll(".project-card");
      projectCards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const floatingElements =
        sectionRef.current?.querySelectorAll(".floating-element");
      floatingElements?.forEach((element) => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const randomDuration = 2 + Math.random() * 3;
        const randomDelay = Math.random() * -2;

        gsap.to(element, {
          x: randomX,
          y: randomY,
          rotation: 360,
          duration: randomDuration,
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: randomDelay,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-fit w-full bg-zinc-900 relative px-4 sm:px-6 md:px-8 lg:px-20 py-16"
    >
      {/* Decorative Background Elements */}
      <div className="absolute w-full h-full left-0 top-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-emerald-400/10 via-emerald-500/5 to-transparent blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-emerald-400/10 via-emerald-500/5 to-transparent blur-[140px]" />

        {/* Floating Animated Elements */}
        <div className="absolute w-full h-full left-0 top-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`floating-element absolute ${
                i % 3 === 0
                  ? "w-3 h-3 bg-emerald-400/20"
                  : i % 3 === 1
                  ? "w-4 h-4 border border-emerald-500/20"
                  : "w-2 h-2 bg-emerald-300/30"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                borderRadius: i % 2 === 0 ? "50%" : "0",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-400 mb-4">
              Featured Projects
            </h2>
            <p className="text-emerald-300/80 text-base md:text-lg max-w-2xl mx-auto">
              Showcase of my recent work and ongoing projects
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative overflow-hidden rounded-xl bg-zinc-800/40 border border-emerald-500/10 hover:border-emerald-400/30 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-200 mb-2">
                  {project.title}
                </h3>
                <p className="text-emerald-300/70 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-emerald-500/60 text-xs px-2.5 py-1 rounded-full bg-emerald-500/5 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 relative z-10">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 text-sm font-medium transition-all duration-300 cursor-pointer"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-4 rounded-lg bg-zinc-800/40 hover:bg-zinc-800/60 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 text-sm font-medium transition-all duration-300 cursor-pointer"
                  >
                    Source Code
                  </a>
                </div>
              </div>
              <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;

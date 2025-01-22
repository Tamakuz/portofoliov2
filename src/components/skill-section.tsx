import { Marquee } from './skills/marquee';

const SkillSection = () => {
  const skills = [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'TypeScript', icon: '📘', category: 'Frontend' },
    { name: 'Next.js', icon: '▲', category: 'Frontend' },
    { name: 'TailwindCSS', icon: '🎨', category: 'Frontend' },
    { name: 'Vue.js', icon: '💚', category: 'Frontend' },
    { name: 'GSAP', icon: '🎭', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'GraphQL', icon: '◈', category: 'Backend' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Backend' },
    { name: 'MongoDB', icon: '🍃', category: 'Backend' },
    { name: 'Docker', icon: '🐳', category: 'Backend' },
    { name: 'Redis', icon: '🔴', category: 'Backend' },
    { name: 'Git', icon: '📚', category: 'Tools' },
    { name: 'AWS', icon: '☁️', category: 'Tools' },
    { name: 'Firebase', icon: '🔥', category: 'Tools' },
    { name: 'Figma', icon: '🎨', category: 'Tools' },
    { name: 'Jest', icon: '🃏', category: 'Tools' },
    { name: 'WebGL', icon: '🌐', category: 'Tools' },
  ];

  return (
    <section className="h-fit bg-zinc-900 py-16">
      {/* Modern Decorative Elements */}
      <div className="absolute overflow-hidden">
        {/* Dynamic gradient mesh */}
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(16,185,129,0.12)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(16,185,129,0.12)_0%,transparent_50%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto">
        {/* Modern Section Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-2 block">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-400 mb-4">
              Skills & Expertise
            </h2>
            <p className="text-emerald-300/80 text-base md:text-lg max-w-2xl mx-auto">
              Berbagai teknologi dan alat yang saya kuasai dalam pengembangan
              web modern
            </p>
          </div>
        </div>

        {/* Modern Skills Display */}
        <div className="relative mx-auto">
          <div className="space-y-4">
            <Marquee className="py-3">
              {skills.slice(0, 6).map((skill, i) => (
                <div
                  key={i}
                  className="mx-3 group flex items-center space-x-3 bg-zinc-800/40 backdrop-blur-xl px-5 py-3 rounded-xl border border-emerald-500/10 hover:border-emerald-400/30 transition-all duration-500 hover:scale-105 hover:bg-zinc-800/60"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-500">
                    {skill.icon}
                  </span>
                  <span className="text-emerald-200 font-medium tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-emerald-500/60 text-xs px-2.5 py-1 rounded-full bg-emerald-500/5 backdrop-blur-sm">
                    {skill.category}
                  </span>
                </div>
              ))}
            </Marquee>

            <Marquee className="py-3" reverse>
              {skills.slice(0, 6).map((skill, i) => (
                <div
                  key={i}
                  className="mx-3 group flex items-center space-x-3 bg-zinc-800/40 backdrop-blur-xl px-5 py-3 rounded-xl border border-emerald-500/10 hover:border-emerald-400/30 transition-all duration-500 hover:scale-105 hover:bg-zinc-800/60"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-500">
                    {skill.icon}
                  </span>
                  <span className="text-emerald-200 font-medium tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-emerald-500/60 text-xs px-2.5 py-1 rounded-full bg-emerald-500/5 backdrop-blur-sm">
                    {skill.category}
                  </span>
                </div>
              ))}
            </Marquee>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;

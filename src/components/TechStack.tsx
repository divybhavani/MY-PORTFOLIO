import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileCode2,
  Palette,
  Code,
  Atom,
  Server,
  FileJson,
  Database,
  Table,
  GitBranch,
  Code2,
  Send,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: "Frontend",
    items: [
      {
        name: "React",
        icon: Atom,
        color: "text-cyan-400",
        bg: "bg-cyan-400",
        desc: "Complex interactive UIs",
      },
      {
        name: "Tailwind CSS",
        icon: Palette,
        color: "text-teal-400",
        bg: "bg-teal-400",
        desc: "Rapid responsive styling",
      },
      {
        name: "HTML/CSS",
        icon: FileCode2,
        color: "text-orange-500",
        bg: "bg-orange-500",
        desc: "Semantic, accessible markup",
      },
    ],
  },
  {
    title: "Backend",
    items: [
      {
        name: "Node.js",
        icon: Server,
        color: "text-green-500",
        bg: "bg-green-500",
        desc: "Scalable server logic",
      },
      {
        name: "Express",
        icon: FileJson,
        color: "text-gray-300",
        bg: "bg-gray-300",
        desc: "Robust REST APIs",
      },
    ],
  },
  {
    title: "Database",
    items: [
      {
        name: "MongoDB",
        icon: Database,
        color: "text-green-600",
        bg: "bg-green-600",
        desc: "Flexible NoSQL schemas",
      },
      {
        name: "SQL",
        icon: Table,
        color: "text-blue-400",
        bg: "bg-blue-400",
        desc: "Structured relational data",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Git",
        icon: GitBranch,
        color: "text-orange-600",
        bg: "bg-orange-600",
        desc: "Version control workflows",
      },
      {
        name: "Postman",
        icon: Send,
        color: "text-orange-500",
        bg: "bg-orange-500",
        desc: "API testing & design",
      },
      {
        name: "VS Code",
        icon: Code2,
        color: "text-blue-500",
        bg: "bg-blue-500",
        desc: "Primary development IDE",
      },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const futureStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Absolute positioning for the grid explosion animation
        gsap.set(categoriesRef.current, {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.5,
          zIndex: (i) => 10 - i,
        });

        gsap.set(categoriesRef.current[0], { opacity: 1, scale: 1 });
        gsap.set(futureStackRef.current, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
          },
        });

        // 1. Frontend moves to Top-Left
        tl.to(categoriesRef.current[0], {
          xPercent: -102,
          yPercent: -102,
          duration: 1,
        });

        // 2. Backend appears in center, then moves to Top-Right
        tl.to(categoriesRef.current[1], {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        });
        tl.to(categoriesRef.current[1], {
          xPercent: 2,
          yPercent: -102,
          duration: 1,
        });

        // 3. Database appears in center, then moves to Bottom-Left
        tl.to(categoriesRef.current[2], {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        });
        tl.to(categoriesRef.current[2], {
          xPercent: -102,
          yPercent: 2,
          duration: 1,
        });

        // 4. Tools appears in center, then moves to Bottom-Right
        tl.to(categoriesRef.current[3], {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        });
        tl.to(categoriesRef.current[3], {
          xPercent: 2,
          yPercent: 2,
          duration: 1,
        });

        // 5. Fade in Future Stack
        tl.to(
          futureStackRef.current,
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.5",
        );
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: Clear absolute positioning, use natural flex layout
        gsap.set(categoriesRef.current, {
          clearProps: "all",
        });

        gsap.set(categoriesRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
        });

        gsap.set(futureStackRef.current, { opacity: 0, y: 40 });

        // Simple staggered scroll reveal for mobile to prevent overlapping
        categoriesRef.current.forEach((card) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        });

        gsap.to(futureStackRef.current, {
          scrollTrigger: {
            trigger: futureStackRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = categoriesRef.current;
    for (const card of cards) {
      if (!card) continue;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative z-10 bg-[#0B0B0F] overflow-hidden mb-[100px] py-10"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The tools and technologies I use to build modern applications.
          </p>
        </div>

        <div
          className="relative w-full max-w-4xl mx-auto flex flex-col gap-[24px] md:block md:h-[70vh]"
          onMouseMove={handleMouseMove}
        >
          {techCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                categoriesRef.current[index] = el;
              }}
              className="w-full md:absolute md:w-[45%] glass p-6 md:p-8 rounded-3xl overflow-hidden group border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Spotlight Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 40%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                  {category.items.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 md:gap-4 p-2.5 sm:p-3 rounded-2xl bg-[#111116]/60 border border-white/5 hover:border-white/15 transition-all duration-300 group/item hover:bg-white/5"
                      >
                        <div
                          className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 relative overflow-hidden group-hover/item:border-white/20 transition-colors`}
                        >
                          <div
                            className={`absolute inset-0 opacity-10 group-hover/item:opacity-20 transition-opacity ${tech.bg}`}
                          />
                          <Icon
                            size={20}
                            className={`${tech.color} relative z-10 group-hover/item:scale-110 transition-transform`}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-gray-200 font-semibold text-sm sm:text-base group-hover/item:text-white transition-colors truncate">
                            {tech.name}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors truncate">
                            {tech.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-0 md:absolute md:bottom-[7vh] md:w-full flex justify-center z-20 md:left-0 pointer-events-none pb-12 md:pb-0">
          <div
            ref={futureStackRef}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#111116]/80 border border-[#8B5CF6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-md group hover:border-[#8B5CF6]/70 transition-colors pointer-events-auto cursor-default max-w-fit mx-auto"
          >
            <Sparkles
              size={18}
              className="text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-gray-300 text-sm md:text-base font-medium">
              <strong className="text-white">Currently exploring:</strong>{" "}
              Next.js & AI Integration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

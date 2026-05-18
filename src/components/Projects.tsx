import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Health Monitoring System',
    problem: 'Hospitals lacked a low-cost way to track patient vitals remotely.',
    solution: 'IoT sensor integration with a secure, real-time dashboard.',
    impact: 'Reduced manual check-ins by 40% and improved response times.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Portfolio Website',
    problem: 'Developers struggle to stand out with standard template resumes.',
    solution: 'A cinematic 3D web experience with interactive performance.',
    impact: 'Increased client inquiries and extended average session duration.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Student Management System',
    problem: 'Schools were losing 10+ hours a week to manual paper records.',
    solution: 'A centralized full-stack dashboard with automated reporting.',
    impact: 'Eliminated data entry errors and saved administrative time tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Business E-Commerce',
    problem: 'Local businesses needed an online storefront during expansion.',
    solution: 'Custom e-commerce platform with Stripe checkout and CMS.',
    impact: 'Generated consistent online sales within the first month of launch.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Offline Field Worker App',
    problem: 'Field workers had no reliable offline access to job manuals.',
    solution: 'Cross-platform mobile app with robust offline syncing support.',
    impact: 'Boosted daily productivity and minimized downtime by 25%.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      cardsRef.current.forEach((card, index) => {
        if (index > 0) {
          // The new card comes up from the bottom
          tl.fromTo(card, 
            { y: "100vh", opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "none" }, 
            index
          );
          
          // The previous cards scale down and move up
          for (let j = 0; j < index; j++) {
            tl.to(cardsRef.current[j], {
              scale: 1 - (index - j) * 0.05,
              y: -(index - j) * 30,
              opacity: 1 - (index - j) * 0.1,
              duration: 1,
              ease: "none"
            }, index);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 bg-[#0B0B0F]">
      <div className="h-screen flex flex-col items-center justify-center px-4 max-w-7xl mx-auto pt-20">
        <div className="text-center mb-12 flex-shrink-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto hidden sm:block">
            Showcasing real business problems, my tailored solutions, and the impact they made.
          </p>
        </div>

        <div className="relative w-full max-w-5xl h-[65vh] md:h-[55vh]">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute top-0 left-0 w-full h-full glass rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_40px_rgba(139,92,246,0.15)] border border-white/10 group bg-[#111116]"
              style={{ 
                transformOrigin: "top center",
                zIndex: index,
              }}
            >
              <div className="w-full md:w-1/2 h-[35%] md:h-full relative overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111116] via-transparent to-transparent opacity-90 md:opacity-60" />
              </div>
              
              <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 flex flex-col justify-center relative z-10 bg-[#111116]/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none flex-1 overflow-y-auto">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 group-hover:text-[#22D3EE] transition-colors leading-tight">
                  {project.title}
                </h3>
                
                <div className="space-y-3 sm:space-y-4 mb-6 md:mb-8 text-sm sm:text-base">
                  <div>
                    <span className="text-[#22D3EE] font-semibold block mb-0.5 md:mb-1 text-xs uppercase tracking-wider">The Problem</span>
                    <p className="text-gray-400 leading-snug">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-[#8B5CF6] font-semibold block mb-0.5 md:mb-1 text-xs uppercase tracking-wider">The Solution</span>
                    <p className="text-gray-400 leading-snug">{project.solution}</p>
                  </div>
                  <div>
                    <span className="text-[#10B981] font-semibold block mb-0.5 md:mb-1 text-xs uppercase tracking-wider">The Impact</span>
                    <p className="text-gray-200 font-medium leading-snug">{project.impact}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:-translate-y-0.5 w-max"
                  >
                    View Project <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

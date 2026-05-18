import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    desc: 'Understanding your needs, goals, and technical requirements.',
    color: 'text-[#22D3EE]',
    bg: 'bg-[#22D3EE]/10',
    border: 'border-[#22D3EE]/30',
  },
  {
    icon: PenTool,
    title: 'Design & Planning',
    desc: 'Creating wireframes, mockups, and the technical architecture.',
    color: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]/10',
    border: 'border-[#8B5CF6]/30',
  },
  {
    icon: Code,
    title: 'Development',
    desc: 'Building the solution with clean code and regular updates.',
    color: 'text-[#EC4899]',
    bg: 'bg-[#EC4899]/10',
    border: 'border-[#EC4899]/30',
  },
  {
    icon: Rocket,
    title: 'Delivery & Support',
    desc: 'Handing over the keys, launching, and maintaining the project.',
    color: 'text-[#10B981]',
    bg: 'bg-[#10B981]/10',
    border: 'border-[#10B981]/30',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative z-10 py-32 px-4 max-w-7xl mx-auto bg-[#0B0B0F]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
          My <span className="text-gradient">Process</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A structured workflow to ensure successful delivery, business value, and absolute transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`glass p-8 rounded-3xl border border-white/5 hover:${step.border} group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute -top-4 -right-2 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none">
                <span className="text-9xl font-black italic tracking-tighter">{index + 1}</span>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 relative z-10 shadow-inner border border-white/5`}>
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

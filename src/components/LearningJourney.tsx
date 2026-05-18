import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: '2024',
    text: 'Started learning programming and web development.',
  },
  {
    year: '2025',
    text: 'Built multiple web and IoT projects.',
  },
  {
    year: '2026',
    text: 'Working on advanced full stack development.',
  },
];

export default function LearningJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical line growing
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Animate each card and node
      cardsRef.current.forEach((card, index) => {
        const node = nodesRef.current[index];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        });

        // Node lights up
        tl.fromTo(
          node,
          { backgroundColor: '#1f2937', boxShadow: '0 0 0 rgba(34, 211, 238, 0)' },
          { backgroundColor: '#22d3ee', boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)', duration: 0.2 }
        );

        // Card slides in from right side with slight vertical motion
        tl.fromTo(
          card,
          { opacity: 0, x: 50, y: 30 },
          { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power2.out' },
          '<'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="learning-journey" ref={sectionRef} className="relative z-10 py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
          Learning <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          My path of continuous learning and growth.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[20px] md:left-[40px] top-8 bottom-8 w-1 bg-gray-800 rounded-full">
          <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-[#EC4899] origin-top" />
        </div>

        <div className="flex flex-col gap-[40px]">
          {journeyData.map((item, index) => (
            <div key={item.year} className="relative pl-12 md:pl-24">
              {/* Node */}
              <div 
                ref={(el) => { nodesRef.current[index] = el; }}
                className="absolute left-[12px] md:left-[32px] top-8 w-5 h-5 rounded-full border-4 border-[#0B0B0F] bg-gray-800 z-10"
              />

              {/* Card */}
              <div 
                ref={(el) => { cardsRef.current[index] = el; }}
                className="glass p-6 md:p-8 rounded-3xl relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#22D3EE] font-mono text-sm mb-4 border border-white/10">
                    {item.year}
                  </span>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

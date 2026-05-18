import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Projects Completed', value: 10, suffix: '+' },
  { label: 'Technologies Used', value: 10, suffix: '+' },
  { label: 'Learning Experience', value: 2, suffix: '+ Years' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, index) => {
        if (!el) return;
        
        gsap.fromTo(
          el,
          { innerHTML: 0 },
          {
            innerHTML: stats[index].value,
            duration: 2,
            ease: 'power3.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
            onUpdate: function() {
              el.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 max-w-7xl mx-auto">
      <div className="glass rounded-3xl p-10 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={stat.label} className="pt-8 md:pt-0 first:pt-0">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4 font-display flex items-center justify-center">
                <span ref={(el) => { numbersRef.current[index] = el; }}>0</span>
                <span className="text-[#8B5CF6]">{stat.suffix}</span>
              </div>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

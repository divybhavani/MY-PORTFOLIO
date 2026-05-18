import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Server, Smartphone, Database, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Frontend Development', icon: Monitor, desc: 'Creating modern responsive websites with clean UI.' },
  { title: 'Backend Development', icon: Server, desc: 'Building secure and scalable backend systems.' },
  { title: 'App Development', icon: Smartphone, desc: 'Developing high-performance mobile and web apps.' },
  { title: 'API Development', icon: Code2, desc: 'Designing fast and reliable REST APIs.' },
  { title: 'Database Design', icon: Database, desc: 'Structuring efficient and scalable databases.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${services.length * 100}%`,
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
    <section id="services" ref={sectionRef} className="relative z-10 bg-[#0B0B0F]">
      <div className="h-screen flex flex-col items-center justify-center px-4 max-w-7xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Delivering premium digital solutions tailored to your business needs.
          </p>
        </div>

        <div className="relative w-full max-w-3xl h-[50vh] md:h-[40vh]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="absolute top-0 left-0 w-full h-full glass rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(99,102,241,0.1)] border border-white/10 transition-colors hover:border-white/20"
                style={{ 
                  transformOrigin: "top center",
                  zIndex: index,
                }}
              >
                <div className="absolute inset-0 bg-gradient-accent opacity-0 hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  <Icon size={40} className="text-[#22D3EE]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

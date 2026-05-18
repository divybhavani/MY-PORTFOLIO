import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.fromTo(headlineRef.current, 
        { y: 40, opacity: 0, filter: 'blur(10px)' }, 
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
        "-=0.8"
      )
      .fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.8"
      );

      // 3D Parallax Scroll Effect
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        z: 300,
        opacity: 0,
        scale: 1.2,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" style={{ perspective: '1000px' }}>
      <div ref={contentRef} className="z-10 text-center px-4 max-w-5xl mx-auto transform-gpu">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 font-display leading-tight"
        >
          Hi, I'm Divy – <br className="hidden md:block" />
          <span className="text-gradient">Full Stack Developer</span> <br className="hidden md:block" />
          & Tech Enthusiast
        </h1>
        
        <p 
          ref={descRef}
          className="text-lg md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          I build modern, scalable web applications and digital experiences using cutting-edge technologies.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              View Projects
            </span>
          </a>
          
          <a 
            href="#contact" 
            className="group relative px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]"
          >
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500/50 hover:text-white transition-colors cursor-pointer z-20">
        <ArrowDown size={24} />
      </div>
    </section>
  );
}

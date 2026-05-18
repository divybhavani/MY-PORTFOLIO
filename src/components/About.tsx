import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0, rotationX: 20 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-32 px-4 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
      <div 
        ref={textRef}
        className="glass p-10 md:p-16 rounded-3xl text-center transform-gpu relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-accent opacity-5 pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
          I am a passionate developer focused on building modern and scalable digital solutions. 
          I enjoy turning ideas into real-world applications using modern technologies while 
          focusing on performance and user experience.
        </p>
      </div>
    </section>
  );
}

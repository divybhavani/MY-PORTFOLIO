import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    // Increased particle count for a denser starfield
    const count = 4000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
    }
    return positions;
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    
    // Parallax scroll effect for particles
    gsap.to(ref.current.position, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      y: 10,
      z: 5,
      ease: "none"
    });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slower, more majestic rotation
      ref.current.rotation.y -= delta * 0.02;
      ref.current.rotation.x -= delta * 0.01;
      
      // Subtle mouse parallax
      const targetX = (state.pointer.x * Math.PI) * 0.05;
      const targetY = (state.pointer.y * Math.PI) * 0.05;
      
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E2E8F0"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0B0B0F]">
      {/* Subtle glowing gradients - Neon blue and purple accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#6366F1]/15 blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8B5CF6]/15 blur-[150px] mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#22D3EE]/10 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}


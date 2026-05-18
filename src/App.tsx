/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import LearningJourney from './components/LearningJourney';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeCanvas from './components/ThreeCanvas';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F9FAFB] font-sans selection:bg-indigo-500/30">
      <ThreeCanvas />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <Projects />
        <TechStack />
        <LearningJourney />
        <Stats />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

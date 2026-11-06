import React, { useState, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Laboratory } from './components/Laboratory';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section on scroll
  useEffect(() => {
    if (loading) return;

    const sections = ['hero', 'about', 'laboratory', 'projects', 'journey', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 200;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 selection:bg-electric-cyan selection:text-space-950">
      {/* Branded futuristic preloader sequence */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Hardware-accelerated custom cursor */}
      <CustomCursor />

      {/* Interactive Node/Cosmic background canvas */}
      <InteractiveCanvas />

      {/* Floating dock & navigation header */}
      <Navbar activeSection={activeSection} />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Laboratory />
        <Projects />
        <Journey />
        <Achievements />
        <Contact />
      </main>

      {/* Editorial footer */}
      <Footer />
    </div>
  );
};

export default App;


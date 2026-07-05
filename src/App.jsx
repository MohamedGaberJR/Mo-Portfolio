import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import DataSection from './components/DataSection';
import SkillsGrid from './components/SkillsGrid';
import Contact from './components/Contact';
import CircuitTrace from './components/CircuitTrace';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // List of section IDs to monitor
    const sections = ['hero', 'about', 'work', 'data', 'skills', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Lights up when section enters center of viewport
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <div className="pcb-board-wrapper" style={{ position: 'relative', width: '100%' }}>
        {/* Absolute SVG Circuit Trace overlay serving as visual/scroll navigation spine */}
        <CircuitTrace activeSection={activeSection} />
        
        {/* Main Section components */}
        <Hero />
        <About />
        <Work />
        <DataSection />
        <SkillsGrid />
        <Contact />
      </div>
    </>
  );
}

export default App;

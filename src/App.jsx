import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import DataSection from './components/DataSection';
import SkillsGrid from './components/SkillsGrid';
import Contact from './components/Contact';
import CircuitTrace from './components/CircuitTrace';
import SplashScreen from './components/SplashScreen';

const SPLASH_KEY = 'portfolio-splash-seen';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem(SPLASH_KEY);
  });

  useEffect(() => {
    const sections = ['hero', 'about', 'work', 'data', 'skills', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.05,
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
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            key="splash"
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <Nav activeSection={activeSection} />
      <div className="pcb-board-wrapper" style={{ position: 'relative', width: '100%' }}>
        <CircuitTrace activeSection={activeSection} />
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

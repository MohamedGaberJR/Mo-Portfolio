import React, { useState, useEffect } from 'react';
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
import BoardTuner from './components/BoardTuner';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Reset scroll to top on page load/mount
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Global mouse coordinate tracking for interactive grid spotlight
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  const handleSplashComplete = () => {
    setShowSplash(false);
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
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
          <div className="grid-spotlight" />
          <BoardTuner />
        </>
      )}
    </>
  );
}

export default App;

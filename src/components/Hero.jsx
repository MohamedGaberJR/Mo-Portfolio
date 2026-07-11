import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ArrowDown } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [bootLog, setBootLog] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const avatarRef = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const el = avatarRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    const tiltX = -normY * 15;
    const tiltY = normX * 15;
    
    el.style.setProperty('--tilt-x', `${tiltX}deg`);
    el.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handleMouseLeave = () => {
    const el = avatarRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', `0deg`);
    el.style.setProperty('--tilt-y', `0deg`);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setBootFinished(true);
      return;
    }

    const logLines = [
      '> INITIALIZING CORE...',
      '> LOADING PORTFOLIO PROFILE: MOHAMED MOHAMED GABER',
      '> ATTACHING INTERACTIVE SIGNALS...',
      '> PCB INTERFACE READY'
    ];

    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < logLines.length) {
        setBootLog(prev => [...prev, logLines[currentLineIdx]]);
        currentLineIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootFinished(true), 300);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <header id="hero" className="hero-section">
      {/* Background SVG traces */}
      <div className="hero-bg-circuit">
        <svg width="100%" height="100%" opacity="0.04" stroke="var(--olive-signal)">
          <path d="M 0 100 H 300 L 350 150 V 300 L 400 350 H 700" fill="none" strokeWidth="2" />
          <path d="M 800 200 H 600 L 550 250 V 450 L 500 500 H 200" fill="none" strokeWidth="2" />
        </svg>
      </div>

      <div className="container hero-container">
        {/* Trace anchor starting from the top-left of the hero container on desktop, centered on mobile */}
        <div className="trace-anchor" data-id="hero" id="anchor-hero"></div>
        {!bootFinished ? (
          <div className="terminal-boot">
            <div className="terminal-header">
              <Terminal size={14} className="terminal-icon" />
              <span>syslog.boot</span>
            </div>
            <div className="terminal-body">
              {bootLog.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))}
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="hero-grid"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Left: Text and CTAs */}
            <div className="hero-main">
              <div className="hero-eyebrow-container">
                <Cpu size={14} className="hero-eyebrow-icon" />
                <span className="eyebrow">FRONTEND DEVELOPER & Data Analyst</span>
              </div>

              <h1 className="hero-title">Mohamed Mohamed Gaber</h1>

              <p className="hero-subtitle">
                Fresh BIS graduate from AAST Cairo, crafting{' '}
                <span className="highlight-signal">interactive user interfaces</span> with a
                background in <span className="highlight-copper">structural data analytics</span>.
              </p>

              <div className="hero-actions">
                <a href="#work" className="btn btn-primary">View Work</a>
                <a href="/assets/Mohamed Mohamed Gaber.pdf" download="Mohamed Mohamed Gaber.pdf" className="btn btn-secondary">Get Resume</a>
              </div>
            </div>

            {/* Right: Large circular profile image */}
            <div className="hero-profile">
              <div 
                className="hero-avatar-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Decorative orbit ring */}
                <div className="avatar-orbit-ring"></div>
                {/* Main bezel */}
                <div className="hero-avatar-bezel" ref={avatarRef}>
                  <img src="/assets/profile.jpeg" alt="Mohamed Mohamed Gaber" className="hero-avatar-img" />
                  <div className="hero-avatar-hud"></div>
                </div>
                {/* Corner contact nodes */}
                <span className="avatar-node node-top"></span>
                <span className="avatar-node node-right"></span>
                <span className="avatar-node node-bottom"></span>
                <span className="avatar-node node-left"></span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {bootFinished && (
        <motion.a
          href="#about"
          className="scroll-indicator"
          aria-label="Scroll down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ opacity: { delay: 1, duration: 0.3 } }}
        >
          <span className="scroll-text">SYSTEM LOGIC BELOW</span>
          <ArrowDown size={14} className="scroll-arrow" />
        </motion.a>
      )}
    </header>
  );
}

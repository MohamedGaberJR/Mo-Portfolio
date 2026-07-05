import React, { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Monogram logo looking like an integrated circuit */}
        <a href="#hero" className="logo-chip" aria-label="Mohamed Mohamed Gaber Home">
          <div className="chip-package">
            <span className="chip-pin pin-left-1"></span>
            <span className="chip-pin pin-left-2"></span>
            <span className="chip-pin pin-left-3"></span>
            <span className="chip-pin pin-right-1"></span>
            <span className="chip-pin pin-right-2"></span>
            <span className="chip-pin pin-right-3"></span>
            <span className="chip-led"></span>
            <div className="chip-die">MMG</div>
          </div>
        </a>

        <div className="nav-links">
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href="#work" className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}>Work</a>
          <a href="#data" className={`nav-link ${activeSection === 'data' ? 'active' : ''}`}>Data</a>
          <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        </div>

        <div className="nav-actions">
          {/* Solder-pad styled download button */}
          <a 
            href="/assets/Mohamed Mohamed Gaber.pdf" 
            download="Mohamed Mohamed Gaber.pdf" 
            className="cv-btn"
            title="Download Curriculum Vitae"
            onClick={(e) => {
              console.log('Downloading CV...');
            }}
          >
            <span className="pad-ring"></span>
            <span className="pad-solder"></span>
            <span className="cv-btn-text">CV</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

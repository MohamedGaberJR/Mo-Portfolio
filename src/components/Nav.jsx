import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Database, Cpu, Mail, User } from 'lucide-react';
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

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'work', label: 'Work', icon: Briefcase, href: '#work' },
    { id: 'data', label: 'Data', icon: Database, href: '#data' },
    { id: 'skills', label: 'Skills', icon: Cpu, href: '#skills' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <>
      {/* Top Header Bar — always visible on all devices */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Monogram logo looking like an integrated circuit */}
          <a
            href="/"
            className="logo-chip"
            aria-label="Mohamed Mohamed Gaber Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              history.replaceState(null, '', '/');
            }}
          >
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

          {/* Desktop-only inline nav links */}
          <div className="nav-links-desktop">
            {navItems.filter(i => i.id !== 'hero').map(item => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
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

      {/* Mobile-only bottom tab bar — app-style navigation */}
      <div className="mobile-tab-bar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="tab-icon" />
              <span className="tab-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}

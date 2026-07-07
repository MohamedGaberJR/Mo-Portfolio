import React, { useState, useEffect } from 'react';
import ChipLogo from './ChipLogo';
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

  /* Mobile tabs — About, Work, Data, Skills, Contact */
  const mobileTabs = [
    {
      id: 'about', label: 'About', href: '#about', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      id: 'work', label: 'Work', href: '#work', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      id: 'data', label: 'Data', href: '#data', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      id: 'skills', label: 'Skills', href: '#skills', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      )
    },
    {
      id: 'contact', label: 'Contact', href: '#contact', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
  ];

  /* Desktop nav — all sections */
  const desktopLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'data', label: 'Data', href: '#data' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Header Bar — MMG logo + CV button, always at top */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
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
            <ChipLogo />
          </a>

          {/* Desktop inline links */}
          <div className="nav-links-desktop">
            {desktopLinks.map(item => (
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
            <a
              href="/assets/Mohamed Mohamed Gaber.pdf"
              download="Mohamed Mohamed Gaber.pdf"
              className="cv-btn"
              title="Download Curriculum Vitae"
            >
              <span className="pad-ring"></span>
              <span className="pad-solder"></span>
              <span className="cv-btn-text">CV</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="mobile-tab-bar" role="navigation" aria-label="Mobile navigation">
        {mobileTabs.map(item => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`mob-tab ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="mob-tab-icon">{item.icon}</span>
              <span className="mob-tab-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}

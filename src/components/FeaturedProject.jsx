import React from 'react';
import { CheckSquare, ExternalLink, FileText, Smartphone, Star, MapPin, Calendar, Compass, Search, PlusCircle, User, Car, Wrench, Key, Shield } from 'lucide-react';
import './FeaturedProject.css';

export default function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <div className="featured-project-container">
      {/* Dynamic trace anchor for Work / CarKit */}
      <div className="trace-anchor" data-id="work" id="anchor-work"></div>

      <div className="featured-grid">
        {/* Visual Mockup — Premium iPhone-style phone frame */}
        <div className="featured-visual">
          <div className="phone-wrapper">
            {/* Ambient glow behind the phone */}
            <div className="phone-ambient-glow"></div>

            <div className="phone-mockup">
              {/* Dynamic Island */}
              <div className="phone-island">
                <span className="island-camera"></span>
              </div>

              <div className="phone-bezel">
                <div className="phone-screen">
                  {/* Status bar */}
                  <div className="screen-statusbar">
                    <span className="statusbar-time">9:41</span>
                    <div className="statusbar-icons">
                      <svg width="15" height="10" viewBox="0 0 15 10" fill="none">
                        <rect x="0" y="6" width="3" height="4" rx="0.5" fill="var(--olive-signal)" opacity="0.4" />
                        <rect x="4" y="4" width="3" height="6" rx="0.5" fill="var(--olive-signal)" opacity="0.6" />
                        <rect x="8" y="2" width="3" height="8" rx="0.5" fill="var(--olive-signal)" opacity="0.8" />
                        <rect x="12" y="0" width="3" height="10" rx="0.5" fill="var(--olive-signal)" />
                      </svg>
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                        <rect x="0.5" y="0.5" width="16" height="9" rx="2" stroke="var(--olive-signal)" strokeWidth="0.8" />
                        <rect x="17" y="3" width="2" height="4" rx="0.5" fill="var(--olive-signal)" opacity="0.4" />
                        <rect x="2" y="2" width="12" height="6" rx="1" fill="var(--olive-signal)" />
                      </svg>
                    </div>
                  </div>

                  {/* App navigation header */}
                  <div className="screen-app-header">
                    <div className="app-header-left">
                      <Smartphone size={14} className="app-icon" strokeWidth={2.5} />
                      <div className="app-title-group">
                        <span className="app-title">CarKit</span>
                        <span className="app-subtitle">EGYPT MARKET</span>
                      </div>
                    </div>
                    <div className="app-header-right">
                      <span className="app-badge">
                        <span className="badge-glow-dot" /> LIVE
                      </span>
                    </div>
                  </div>

                  {/* Screen content */}
                  <div className="screen-content">
                    {/* Search bar widget */}
                    <div className="mock-search-bar">
                      <Search size={10} className="search-icon" />
                      <span className="search-placeholder">Search cars, services...</span>
                    </div>

                    {/* Car Showcase with Cyber grid background */}
                    <div className="app-hero-banner">
                      <div className="banner-grid-overlay" />
                      <svg viewBox="0 0 200 80" className="car-svg-hero">
                        {/* Road line */}
                        <line x1="0" y1="68" x2="200" y2="68" stroke="rgba(var(--olive-signal-rgb), 0.25)" strokeWidth="1" strokeDasharray="6 3"/>
                        {/* Car body path (Pulsing glowing line) */}
                        <path d="M 30 52 Q 38 36, 56 32 L 82 32 Q 94 22, 114 24 L 145 29 Q 167 32, 175 44 L 175 56 Q 168 60, 156 60 L 45 60 Q 34 60, 30 52 Z" fill="rgba(var(--olive-signal-rgb), 0.03)" stroke="var(--olive-signal)" strokeWidth="1.5" strokeLinejoin="round" className="car-body-pulse"/>
                        {/* Front wheels */}
                        <circle cx="60" cy="56" r="10" fill="#060805" stroke="var(--olive-signal)" strokeWidth="1.2"/>
                        <circle cx="60" cy="56" r="5" fill="none" stroke="var(--olive-signal)" strokeWidth="0.6" strokeDasharray="2 2"/>
                        {/* Rear wheels */}
                        <circle cx="148" cy="56" r="10" fill="#060805" stroke="var(--olive-signal)" strokeWidth="1.2"/>
                        <circle cx="148" cy="56" r="5" fill="none" stroke="var(--olive-signal)" strokeWidth="0.6" strokeDasharray="2 2"/>
                        {/* Headlight beam */}
                        <polygon points="170,44 195,38 195,54" fill="url(#beam-gradient)" opacity="0.15" />
                        <ellipse cx="170" cy="46" rx="3" ry="2" fill="var(--olive-bright)" />
                        {/* Tail light */}
                        <ellipse cx="35" cy="48" rx="2" ry="1.5" fill="var(--crimson-accent)" />
                        
                        {/* SVG Gradients */}
                        <defs>
                          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--olive-signal)" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="banner-overlay">
                        <span className="banner-tag">FEATURED ENGINE</span>
                      </div>
                    </div>

                    {/* Quick services row */}
                    <div className="mock-services-grid">
                      <div className="service-pill">
                        <span className="service-icon"><Car size={10} /></span>
                        <span>Buy</span>
                      </div>
                      <div className="service-pill">
                        <span className="service-icon"><Wrench size={10} /></span>
                        <span>Repair</span>
                      </div>
                      <div className="service-pill">
                        <span className="service-icon"><Key size={10} /></span>
                        <span>Rent</span>
                      </div>
                      <div className="service-pill">
                        <span className="service-icon"><Shield size={10} /></span>
                        <span>Secure</span>
                      </div>
                    </div>

                    {/* Car details card (Premium glassmorphic look) */}
                    <div className="mock-listing-card">
                      <div className="listing-header">
                        <div>
                          <div className="listing-title">Hyundai Elantra AD</div>
                          <div className="listing-meta">
                            <span className="meta-pill"><MapPin size={8} /> Cairo</span>
                            <span className="meta-pill"><Calendar size={8} /> 2021</span>
                            <span className="meta-pill">85k km</span>
                          </div>
                        </div>
                        <span className="listing-status">
                          <span className="status-pulse-dot" /> Active
                        </span>
                      </div>
                      <div className="listing-price-row">
                        <span className="listing-price">EGP 920,000</span>
                        <button className="listing-fav-btn" aria-label="Favorite listing">
                          <span className="fav-heart">♥</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick stats (Glassmorphic stats with visual gauges) */}
                    <div className="mock-stats-grid">
                      <div className="stat-card">
                        <span className="stat-value">98%</span>
                        <span className="stat-name">UI Sync</span>
                        <div className="stat-progress-bar">
                          <div className="stat-progress-fill" style={{ width: '98%' }} />
                        </div>
                      </div>
                      <div className="stat-card">
                        <span className="stat-value">32+</span>
                        <span className="stat-name">Screens</span>
                        <div className="stat-indicator-ticks">
                          <span className="tick active" /><span className="tick active" /><span className="tick active" /><span className="tick" />
                        </div>
                      </div>
                      <div className="stat-card rating-card">
                        <span className="stat-value"><Star size={10} className="star-icon-inline" fill="var(--crimson-accent)" /> 4.8</span>
                        <span className="stat-name">Rating</span>
                        <div className="stat-progress-bar rating-bar">
                          <div className="stat-progress-fill rating-fill" style={{ width: '96%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Bottom tab bar (Premium styling with Lucide icons) */}
                    <div className="mock-tab-bar">
                      <div className="tab-item active">
                        <Compass size={13} />
                        <span>Discover</span>
                      </div>
                      <div className="tab-item">
                        <Search size={13} />
                        <span>Search</span>
                      </div>
                      <div className="tab-item">
                        <PlusCircle size={13} />
                        <span>List Car</span>
                      </div>
                      <div className="tab-item">
                        <User size={13} />
                        <span>Account</span>
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="home-indicator-bar">
                    <div className="home-indicator"></div>
                  </div>
                </div>
              </div>

              {/* Glass reflection */}
              <div className="phone-reflection"></div>
            </div>
          </div>
        </div>

        {/* Project details card */}
        <div className="featured-info">
          <span className="eyebrow-featured">FEATURED SYSTEM CHIP</span>
          <h3 className="project-title">{project.title}</h3>
          <h4 className="project-subtitle">{project.subtitle}</h4>

          <div className="role-badge">
            <span className="role-label">ROLE:</span>
            <span className="role-value">{project.role}</span>
          </div>

          <p className="project-description">{project.description}</p>

          <ul className="project-bullets">
            {project.bullets.map((bullet, idx) => (
              <li key={idx} className="bullet-item">
                <CheckSquare size={14} className="bullet-icon" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="tech-tags">
            {project.tech.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          <div className="project-links">
            <a
              href="https://ankle-slept-59917625.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Landing Page <ExternalLink size={14} />
            </a>
            <a
              href="/assets/Dark Mode User manual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              User Manual <FileText size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

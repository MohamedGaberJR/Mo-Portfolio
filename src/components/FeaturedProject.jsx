import React from 'react';
import { Smartphone, CheckSquare, ExternalLink, FileText } from 'lucide-react';
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
                        <rect x="0" y="6" width="3" height="4" rx="0.5" fill="var(--olive-signal)" opacity="0.4"/>
                        <rect x="4" y="4" width="3" height="6" rx="0.5" fill="var(--olive-signal)" opacity="0.6"/>
                        <rect x="8" y="2" width="3" height="8" rx="0.5" fill="var(--olive-signal)" opacity="0.8"/>
                        <rect x="12" y="0" width="3" height="10" rx="0.5" fill="var(--olive-signal)"/>
                      </svg>
                      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                        <rect x="0.5" y="0.5" width="16" height="9" rx="2" stroke="var(--olive-signal)" strokeWidth="0.8"/>
                        <rect x="17" y="3" width="2" height="4" rx="0.5" fill="var(--olive-signal)" opacity="0.4"/>
                        <rect x="2" y="2" width="12" height="6" rx="1" fill="var(--olive-signal)"/>
                      </svg>
                    </div>
                  </div>

                  {/* App navigation bar */}
                  <div className="screen-app-header">
                    <div className="app-header-left">
                      <Smartphone size={16} className="app-icon" />
                      <div className="app-title-group">
                        <span className="app-title">CarKit</span>
                        <span className="app-subtitle">Egypt Marketplace</span>
                      </div>
                    </div>
                    <div className="app-header-right">
                      <span className="app-badge">LIVE</span>
                    </div>
                  </div>

                  {/* Hero banner inside the app */}
                  <div className="screen-content">
                    <div className="app-hero-banner">
                      <svg viewBox="0 0 200 80" className="car-svg-hero">
                        {/* Road line */}
                        <line x1="0" y1="68" x2="200" y2="68" stroke="rgba(108,125,61,0.15)" strokeWidth="1" strokeDasharray="8 4"/>
                        {/* Car body */}
                        <path d="M 30 52 Q 38 38, 55 34 L 85 34 Q 100 20, 130 24 L 158 36 Q 175 42, 175 56 L 30 56 Z" fill="rgba(168, 194, 76, 0.06)" stroke="var(--olive-signal)" strokeWidth="1.2"/>
                        {/* Roof */}
                        <path d="M 82 34 L 120 34 L 112 22 H 88 Z" fill="rgba(168, 194, 76, 0.12)" stroke="var(--olive-signal)" strokeWidth="0.8"/>
                        {/* Rear window */}
                        <path d="M 58 34 L 80 34 L 82 22 H 70 Q 60 28, 58 34 Z" fill="rgba(168, 194, 76, 0.08)" stroke="var(--olive-signal)" strokeWidth="0.7"/>
                        {/* Front wheels */}
                        <circle cx="60" cy="56" r="10" fill="#080a06" stroke="var(--olive-signal)" strokeWidth="1.2"/>
                        <circle cx="60" cy="56" r="5" fill="none" stroke="var(--olive-signal)" strokeWidth="0.6" strokeDasharray="2 2"/>
                        {/* Rear wheels */}
                        <circle cx="148" cy="56" r="10" fill="#080a06" stroke="var(--olive-signal)" strokeWidth="1.2"/>
                        <circle cx="148" cy="56" r="5" fill="none" stroke="var(--olive-signal)" strokeWidth="0.6" strokeDasharray="2 2"/>
                        {/* Headlight */}
                        <ellipse cx="170" cy="46" rx="3" ry="2" fill="var(--olive-signal)" opacity="0.7"/>
                        {/* Tail light */}
                        <ellipse cx="35" cy="48" rx="2" ry="1.5" fill="var(--copper-accent)" opacity="0.6"/>
                        {/* Reflection line */}
                        <path d="M 45 44 H 165" stroke="rgba(168,194,76,0.08)" strokeWidth="0.5"/>
                      </svg>
                      <div className="banner-overlay">
                        <span className="banner-tag">FEATURED LISTING</span>
                      </div>
                    </div>

                    {/* Car details card */}
                    <div className="mock-listing-card">
                      <div className="listing-header">
                        <div>
                          <div className="listing-title">Hyundai Elantra AD</div>
                          <div className="listing-meta">Cairo · 85,000 km · 2021</div>
                        </div>
                        <span className="listing-status">● Active</span>
                      </div>
                      <div className="listing-price-row">
                        <span className="listing-price">EGP 920,000</span>
                        <span className="listing-save">♡</span>
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="mock-stats-grid">
                      <div className="stat-card">
                        <span className="stat-value">98%</span>
                        <span className="stat-name">UI Sync</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-value">32+</span>
                        <span className="stat-name">Screens</span>
                      </div>
                      <div className="stat-card accent">
                        <span className="stat-value">4.8★</span>
                        <span className="stat-name">Rating</span>
                      </div>
                    </div>

                    {/* Bottom tab bar */}
                    <div className="mock-tab-bar">
                      <div className="tab-item active">
                        <div className="tab-dot"></div>
                        <span>Home</span>
                      </div>
                      <div className="tab-item">
                        <div className="tab-dot"></div>
                        <span>Search</span>
                      </div>
                      <div className="tab-item">
                        <div className="tab-dot"></div>
                        <span>Sell</span>
                      </div>
                      <div className="tab-item">
                        <div className="tab-dot"></div>
                        <span>Profile</span>
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

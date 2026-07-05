import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        {/* Dynamic trace anchor for aligning scroll spline */}
        <div className="trace-anchor" data-id="about" id="anchor-about"></div>

        <div className="about-grid">
          {/* Left Column: Bio text */}
          <div className="about-bio">
            <span className="eyebrow">01 // PROFILE</span>
            <h2 className="section-title">About Me</h2>
            <p className="bio-paragraph">
              I am a fresh graduate in <strong>Business Information Systems (BIS)</strong> from the Arab Academy for Science, Technology and Maritime Transport (AAST Cairo).
              My education has uniquely positioned me at the intersection of business intelligence, interface development, and systems engineering.
            </p>
            <p className="bio-paragraph">
              I specialize in bridging the gap between design and functionality. On one hand, I build responsive, component-driven frontend interfaces
              using <strong>React</strong> and <strong>React Native</strong>. On the other, I possess a rigorous foundation in database analytics and visualization, allowing me
              to translate complex system data models into clean, interactive user journeys.
            </p>
          </div>

          {/* Right Column: Technical Spec Sheet */}
          <div className="about-specs">
            <div className="spec-card">
              <div className="spec-card-header">
                <span className="spec-model">DEVICE MODEL: MG-GRAD-2026</span>
                <span className="spec-status">STATUS: CALIBRATED</span>
              </div>
              <div className="spec-card-body">
                <div className="spec-row">
                  <span className="spec-label">DEGREE</span>
                  <span className="spec-value">B.Sc. Business Information Systems (AAST Cairo)</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">GPA SCORE</span>
                  <span className="spec-value highlight-gpa">3.89 / 4.00 (Excellent with Honor)</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">CORES</span>
                  <span className="spec-value">React Native · JavaScript · SQL · Power BI</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">ORIGIN PORT</span>
                  <span className="spec-value">Cairo, Egypt</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">ARCHITECTURE</span>
                  <span className="spec-value">Dual-Thread (Frontend + Data Analysis)</span>
                </div>
              </div>
              <div className="spec-card-footer">
                <span className="spec-silkscreen">© 2026 GABER BOARD Rev 1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Mail, Terminal, ArrowUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Contact.css';

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="contact-section">
      <div className="container contact-container">

        <ScrollReveal className="contact-panel">
          <span className="eyebrow">05 // SHUTDOWN TERMINAL</span>
          <h2 className="section-title contact-title">Get In Touch</h2>
          <p className="contact-intro">
            Whether you want to discuss a Frontend role, review my database design analysis, or speak about a potential project, feel free to ping my registry.
          </p>

          <div className="contact-links-grid">
            <a href="mailto:mohammadgaber06@gmail.com" className="contact-link-card">
              <Mail className="contact-icon" size={24} />
              <div className="contact-link-info">
                <span className="contact-label">EMAIL REGISTER</span>
                <span className="contact-value">mohammadgaber06@gmail.com</span>
              </div>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <div className="contact-link-info">
                <span className="contact-label">LINKEDIN LINK</span>
                <span className="contact-value">linkedin.com/in/mohamed-gaber</span>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="contact-icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <div className="contact-link-info">
                <span className="contact-label">GITHUB PORT</span>
                <span className="contact-value">github.com/mohamed-gaber</span>
              </div>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="footer-terminal terminal-panel">
            <div className="terminal-panel-header">
              <Terminal size={12} className="terminal-icon" />
              <span>syslog.shutdown</span>
            </div>
            <div className="terminal-panel-body">
              <div className="terminal-log-row">&gt; connection_close --recruiter-session</div>
              <div className="terminal-log-row">&gt; saving state... OK</div>
              <div className="terminal-log-row">&gt; system offline. thank you for visiting.</div>
              <div className="terminal-log-row-prompt">&gt; <span className="cursor-blink">_</span></div>
            </div>
          </div>
        </ScrollReveal>

        <div className="footer-meta">
          <div className="meta-left">
            <span>© {currentYear} MOHAMED MOHAMED GABER. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="meta-right">
            <a href="#hero" className="back-to-top-btn" aria-label="Scroll to top of page">
              <span>BACK TO TOP</span>
              <ArrowUp size={12} />
            </a>
          </div>
        </div>

        <div className="trace-anchor" data-id="contact" id="anchor-contact"></div>
      </div>
    </footer>
  );
}

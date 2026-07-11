import React, { useState, useEffect } from 'react';
import './BoardTuner.css';

export default function BoardTuner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState('olive');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [traceOpacity, setTraceOpacity] = useState(15);

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-copper', 'theme-cobalt');
    if (theme === 'copper') root.classList.add('theme-copper');
    if (theme === 'cobalt') root.classList.add('theme-cobalt');
  }, [theme]);



  // Update trace opacity CSS custom property
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--trace-opacity', traceOpacity / 100);
  }, [traceOpacity]);

  // Synthesize mechanical keyboard clicking sound using Web Audio API
  const playClickSound = (type = 'click') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        // Soft mechanical switch pre-travel tick
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.03);
      } else {
        // Snappy mechanical click (Cherry MX Blue sound)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.warn('Audio Context blocked or not supported by browser:', e);
    }
  };

  // Attach sound event listeners globally when enabled
  useEffect(() => {
    if (!soundEnabled) return;

    // Use event delegation for hover ticks
    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, .btn, .mob-tab, .logo-chip, .cv-btn, .opacity-range-slider');
      if (interactive) {
        playClickSound('hover');
      }
    };

    // Use event delegation for SNAP clicks
    const handleClick = (e) => {
      const interactive = e.target.closest('a, button, .btn, .mob-tab, .logo-chip, .cv-btn, .opacity-range-slider');
      if (interactive) {
        playClickSound('click');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [soundEnabled]);

  return (
    <div className={`board-tuner ${isExpanded ? 'board-tuner--expanded' : 'board-tuner--collapsed'}`}>
      {isExpanded ? (
        <div className="tuner-panel pcb-corners">
          <span className="pcb-corner pcb-corner-tl" aria-hidden="true" />
          <span className="pcb-corner pcb-corner-tr" aria-hidden="true" />
          <span className="pcb-corner pcb-corner-bl" aria-hidden="true" />
          <span className="pcb-corner pcb-corner-br" aria-hidden="true" />

          <div className="tuner-header">
            <span className="tuner-title">PCB BOARD CUSTOMIZER</span>
            <button
              className="tuner-close-btn"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse customizer"
            >
              [X]
            </button>
          </div>

          <div className="tuner-body">
            {/* Theme / Jumper Color Select */}
            <div className="tuner-section">
              <span className="tuner-label">COLOR JUMPER SELECT</span>
              <div className="color-selectors">
                <button
                  className={`color-btn color-btn--olive ${theme === 'olive' ? 'active' : ''}`}
                  onClick={() => setTheme('olive')}
                  title="Default Olive Green"
                >
                  <span className="color-preview preview-olive" />
                  OLIVE
                </button>
                <button
                  className={`color-btn color-btn--copper ${theme === 'copper' ? 'active' : ''}`}
                  onClick={() => setTheme('copper')}
                  title="Copper Orange"
                >
                  <span className="color-preview preview-copper" />
                  COPPER
                </button>
                <button
                  className={`color-btn color-btn--cobalt ${theme === 'cobalt' ? 'active' : ''}`}
                  onClick={() => setTheme('cobalt')}
                  title="Cobalt Blue"
                >
                  <span className="color-preview preview-cobalt" />
                  COBALT
                </button>
              </div>
            </div>

            <div className="tuner-divider" />

            {/* Trace Path Opacity Slider */}
            <div className="tuner-section">
              <span className="tuner-label">TRACE PATH VOLTAGE</span>
              <div className="opacity-slider-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={traceOpacity}
                  onChange={(e) => setTraceOpacity(Number(e.target.value))}
                  className="opacity-range-slider"
                />
                <span className="opacity-percentage-value">{traceOpacity}%</span>
              </div>
            </div>

            <div className="tuner-divider" />

            {/* Audio Signals */}
            <div className="tuner-section">
              <span className="tuner-label">AUDIO SIGNAL DRIVER</span>
              <button
                className={`audio-btn ${soundEnabled ? 'active' : ''}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                <span className="led-indicator" />
                {soundEnabled ? 'MECHANICAL CLICKS: ON' : 'MECHANICAL CLICKS: OFF'}
              </button>
            </div>
          </div>

          <div className="tuner-footer">
            <span className="tuner-status-led active" />
            <span className="tuner-footer-text">CONFIG PANEL READY</span>
          </div>
        </div>
      ) : (
        <button
          className="tuner-collapsed-dial"
          onClick={() => setIsExpanded(true)}
          title="Open board configurator"
          aria-label="Open board configurator"
        >
          <div className="dial-container">
            <div className="dial-gear-ring" />
            <div className="dial-glow-ring" />
            <div className="dial-core">
              <span className="dial-label">CONFIG</span>
            </div>
            <span className="dial-led" />
          </div>
        </button>
      )}
    </div>
  );
}

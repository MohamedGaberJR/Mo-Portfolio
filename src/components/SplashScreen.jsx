import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './SplashScreen.css';

const SPLASH_KEY = 'portfolio-splash-seen';

const nodePositions = [
  { id: 'top', x: 160, y: 74 },
  { id: 'right', x: 250, y: 160 },
  { id: 'bottom', x: 160, y: 246 },
  { id: 'left', x: 70, y: 160 },
];

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('trace');
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const finish = () => {
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem(SPLASH_KEY, 'true');
    window.setTimeout(() => onComplete?.(), 220);
  };

  useEffect(() => {
    const handleSkip = () => {
      sessionStorage.setItem(SPLASH_KEY, 'true');
      onComplete?.();
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('pointerdown', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('pointerdown', handleSkip);
    };
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => finish(), 300);
      return () => window.clearTimeout(timer);
    }

    const timers = [
      window.setTimeout(() => setProgress(24), 260),
      window.setTimeout(() => setProgress(54), 760),
      window.setTimeout(() => setPhase('nodes'), 820),
      window.setTimeout(() => setProgress(82), 1220),
      window.setTimeout(() => setPhase('log'), 1500),
      window.setTimeout(() => setProgress(100), 1820),
      window.setTimeout(() => finish(), 2900),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [prefersReducedMotion, isExiting]);

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="splash-backdrop" />
      <div className="splash-grid" />

      <div className="splash-panel" aria-label="Boot sequence">
        <div className="splash-content">
          <div className="splash-viewport">
            <svg className="splash-svg" viewBox="0 0 320 320" role="img" aria-label="Circuit trace boot sequence">
            <motion.circle
              cx="160"
              cy="160"
              r="72"
              className="splash-halo"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === 'trace' ? 0.35 : 0.82, scale: phase === 'trace' ? 0.95 : 1.05 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />

            <motion.circle
              cx="160"
              cy="160"
              r="92"
              className="splash-ring"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: phase === 'trace' ? 0.15 : 0.3, scale: phase === 'trace' ? 0.98 : 1.08 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            <motion.path
              d="M160 160 L128 128 L88 88"
              className="splash-trace"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />

            <motion.path
              d="M160 160 L192 128 L232 88"
              className="splash-trace"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
            />

            <motion.path
              d="M160 160 L128 192 L88 232"
              className="splash-trace"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
            />

            <motion.path
              d="M160 160 L192 192 L232 232"
              className="splash-trace"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.28 }}
            />

            {nodePositions.map((node, index) => {
              const isActive = phase !== 'trace' || index < 2;
              return (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r="7" className="splash-pad" />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? 10 : 6}
                    className={`splash-node ${isActive ? 'active' : ''}`}
                    initial={{ scale: 0.4, opacity: 0.35 }}
                    animate={{ scale: isActive ? 1 : 0.7, opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.25, delay: index * 0.06 }}
                  />
                </g>
              );
            })}

            <motion.g
              className="splash-logo-wrap"
              initial={{ scale: 0.84, opacity: 0 }}
              animate={{ scale: phase === 'trace' ? 0.92 : 1, opacity: phase === 'trace' ? 0.65 : 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <rect x="112" y="112" width="96" height="96" rx="20" className="splash-logo-chip" />
              <motion.path
                d="M142 142 L178 178 M178 142 L142 178"
                className="splash-logo-cross"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: phase === 'trace' ? 0.85 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
              <motion.rect
                x="116"
                y="116"
                width="88"
                height="88"
                rx="18"
                className="splash-logo-core"
                animate={{ opacity: phase === 'trace' ? 0.55 : 0.95, scale: phase === 'trace' ? 0.98 : 1.01 }}
                transition={{ duration: 0.25 }}
              />
              <text
                x="160"
                y="160"
                textAnchor="middle"
                dominantBaseline="middle"
                className="splash-logo-text"
              >
                MMG
              </text>
            </motion.g>
          </svg>
        </div>

          <div className="splash-bar" aria-hidden="true">
            <div className="splash-bar-track">
              <motion.div
                className="splash-bar-fill"
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="splash-status">
            <motion.p
              className="splash-line"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === 'log' ? 1 : 0.38, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              &gt; initializing board...
            </motion.p>
            <motion.p
              className="splash-line active"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === 'log' ? 1 : 0.32, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              &gt; profile loaded: M. GABER
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

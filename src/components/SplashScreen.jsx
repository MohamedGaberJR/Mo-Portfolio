import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ChipLogo from './ChipLogo';
import './SplashScreen.css';

const SPLASH_KEY = 'portfolio-splash-seen';

const CENTER = 160;
const nodes = [
  { id: 'top', x: CENTER, y: 68 },
  { id: 'right', x: 252, y: CENTER },
  { id: 'bottom', x: CENTER, y: 252 },
  { id: 'left', x: 68, y: CENTER },
];

const traces = nodes.map((node) => ({
  id: node.id,
  d: `M ${CENTER} ${CENTER} L ${node.x} ${node.y}`,
}));

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('trace');
  const [activeNodes, setActiveNodes] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const finish = () => {
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem(SPLASH_KEY, 'true');
  };

  useEffect(() => {
    const handleSkip = () => finish();

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('pointerdown', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('pointerdown', handleSkip);
    };
  }, [isExiting]);

  useEffect(() => {
    if (isExiting) return;

    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => finish(), 300);
      return () => window.clearTimeout(timer);
    }

    const timers = [
      window.setTimeout(() => setActiveNodes(1), 180),
      window.setTimeout(() => setActiveNodes(2), 360),
      window.setTimeout(() => setActiveNodes(3), 540),
      window.setTimeout(() => setActiveNodes(4), 700),
      window.setTimeout(() => setProgress(35), 280),
      window.setTimeout(() => setProgress(58), 800),
      window.setTimeout(() => setPhase('logo'), 800),
      window.setTimeout(() => setProgress(78), 1200),
      window.setTimeout(() => setPhase('log'), 1400),
      window.setTimeout(() => setProgress(100), 1900),
      window.setTimeout(() => finish(), 2200),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [prefersReducedMotion, isExiting]);

  const showLogo = phase !== 'trace';
  const showLog = phase === 'log';

  return (
    <motion.div
      className="splash-screen"
      role="dialog"
      aria-label="Boot sequence"
      aria-busy={!isExiting}
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.985 : 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => {
        if (isExiting) onComplete?.();
      }}
    >
      <div className="splash-stage">
        <svg className="splash-svg" viewBox="0 0 320 320" aria-hidden="true">
          {traces.map((trace, index) => (
            <motion.path
              key={trace.id}
              d={trace.d}
              className="splash-trace"
              initial={{ pathLength: 0, opacity: 0.25 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.72,
                ease: 'easeOut',
                delay: index * 0.08,
              }}
            />
          ))}

          {nodes.map((node, index) => {
            const isActive = index < activeNodes;
            return (
              <g key={node.id} className={`splash-node-group ${isActive ? 'active' : ''}`}>
                <circle cx={node.x} cy={node.y} r="10" className="splash-node-ring" />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  className="splash-node-core"
                  initial={{ scale: 0.6, opacity: 0.4 }}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                />
              </g>
            );
          })}
        </svg>

        <motion.div
          className="splash-logo"
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{
            scale: showLogo ? 1 : 0.88,
            opacity: showLogo ? 1 : 0.35,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChipLogo size="large" ledActive={showLogo} />
        </motion.div>
      </div>

      {!prefersReducedMotion && (
        <div className="splash-bar" aria-hidden="true">
          <div className="splash-bar-track">
            <motion.div
              className="splash-bar-fill"
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {!prefersReducedMotion && (
        <div className="splash-status" aria-live="polite">
          <motion.p
            className="splash-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLog ? [0, 0.35, 0.15, 0.7, 0.5, 1] : 0 }}
            transition={{ duration: 0.45, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }}
          >
            &gt; initializing board...
          </motion.p>
          <motion.p
            className="splash-line active"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLog ? [0, 0.2, 0.1, 0.55, 0.85, 1] : 0 }}
            transition={{ duration: 0.5, delay: 0.12, times: [0, 0.15, 0.3, 0.5, 0.75, 1] }}
          >
            &gt; profile loaded: M. GABER
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

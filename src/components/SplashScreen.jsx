import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ChipLogo from './ChipLogo';
import './SplashScreen.css';

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
  const [logs, setLogs] = useState([]);
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const fontSize = 11;
    const columns = Math.floor(width / 22);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const chars = [
      '0', '1', 'X', 'Y', 'A', 'F', 'FF', '00', '1A', 'C4', 
      'E8', 'D2', '7F', '3C', '0x', 'INIT', 'BOOT', 'CPU', 'REG'
    ];

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 3, 2, 0.08)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px var(--font-mono)`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        if (Math.random() > 0.985) {
          ctx.fillStyle = '#8ca63a';
        } else {
          ctx.fillStyle = 'rgba(91, 107, 44, 0.18)';
        }

        const x = i * 22;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.8 + Math.random() * 0.4;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isExiting || prefersReducedMotion) return;

    const logPool = [
      "SYS: INITIALIZING GABER-BOARD [REV 1.0]...",
      "MEM: DRAM MODULE DETECTED // 16GB OK",
      "CORE: ALL SYSTEMS NORMAL // ROM BOOT SUCCESS",
      "BUS: CALIBRATING INTER-CHIP TRACES...",
      "IO: MOUNTING HARDWARE INTERFACES...",
      "NET: STACK MOUNTED // SSL ACTIVE ON PORT 443",
      "SYS: BOOT SEQUENCE FINISHED SUCCESSFULLY",
      "USER: PROFILE LOADED - MOHAMED M. GABER"
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logPool.length) {
        setLogs((prev) => [...prev, logPool[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [isExiting, prefersReducedMotion]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const finish = () => {
    if (isExiting) return;
    setIsExiting(true);
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
      <div className="splash-ambient" aria-hidden="true" />
      <div className="splash-grid" aria-hidden="true" />
      <div className="splash-scanlines" aria-hidden="true" />
      <canvas ref={canvasRef} className="splash-canvas" />

      <div className="splash-boot-panel pcb-corners">
        <span className="pcb-corner pcb-corner-tl" aria-hidden="true" />
        <span className="pcb-corner pcb-corner-tr" aria-hidden="true" />
        <span className="pcb-corner pcb-corner-bl" aria-hidden="true" />
        <span className="pcb-corner pcb-corner-br" aria-hidden="true" />

        <div className="splash-panel-header">
          <span className="splash-panel-id">GABER-BOARD // BOOT</span>
          <span className={`splash-panel-led ${showLogo ? 'active' : ''}`} />
        </div>

        <div className="splash-stage">
          <svg className="splash-svg" viewBox="0 0 320 320" aria-hidden="true">
            <circle cx={CENTER} cy={CENTER} r="88" className="splash-footprint" />
            <circle cx={CENTER} cy={CENTER} r="56" className="splash-footprint-inner" />

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
                  {isActive && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="14"
                      className="splash-node-pulse"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  )}
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
            <div className="splash-logo-glow" aria-hidden="true" />
            <ChipLogo size="large" ledActive={showLogo} />
          </motion.div>
        </div>

        {!prefersReducedMotion && (
          <div className="splash-bar" aria-hidden="true">
            <span className="splash-bar-label">PWR</span>
            <div className="splash-bar-track">
              <motion.div
                className="splash-bar-fill"
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              />
            </div>
            <span className="splash-bar-value">{progress}%</span>
          </div>
        )}

        {!prefersReducedMotion && (
          <div className="splash-status" ref={logContainerRef} aria-live="polite">
            {logs.map((log, i) => (
              <p
                key={i}
                className={`splash-line ${i === logs.length - 1 ? 'active' : ''}`}
              >
                &gt; {log}
              </p>
            ))}
          </div>
        )}
      </div>

      {!prefersReducedMotion && (
        <p className="splash-skip-hint" aria-hidden="true">click or press any key to skip</p>
      )}
    </motion.div>
  );
}

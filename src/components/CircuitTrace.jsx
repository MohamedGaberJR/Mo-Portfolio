import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './CircuitTrace.css';

function NodeCircle({ pt, idx, smoothProgress, threshold }) {
  const isCopperSection = pt.id === 'data';
  const isFeatured = idx === 2; // CarKit featured chip node is larger

  // We want a steep step transition around the threshold
  const inputRange = [threshold - 0.015, threshold];

  // We animate a single factor: activeOpacity from 0 to 1
  const activeOpacity = useTransform(smoothProgress, inputRange, [0, 1], { clamp: true });
  const scale = useTransform(smoothProgress, inputRange, [1, 1.05], { clamp: true });

  return (
    <motion.g 
      className={`node-group ${isCopperSection ? 'copper' : ''}`}
      style={{ scale }}
    >
      {/* 1. Inactive State Base */}
      <circle
        cx={pt.x}
        cy={pt.y}
        r={isFeatured ? 14 : 10}
        className="node-ring inactive"
      />
      <circle
        cx={pt.x}
        cy={pt.y}
        r={isFeatured ? 8 : 5}
        className="node-core inactive"
      />

      {/* 2. Active State Overlay (fades in) */}
      <motion.g style={{ opacity: activeOpacity }}>
        {/* Outer halo blur glow */}
        <circle
          cx={pt.x}
          cy={pt.y}
          r={isFeatured ? 18 : 14}
          className="node-glow"
          pointerEvents="none"
          style={{ filter: 'blur(3px)' }}
        />
        {/* Active solder joint */}
        <circle
          cx={pt.x}
          cy={pt.y}
          r={isFeatured ? 14 : 10}
          className="node-ring active"
        />
        {/* Active solder core */}
        <circle
          cx={pt.x}
          cy={pt.y}
          r={isFeatured ? 8 : 5}
          className="node-core active"
        />
      </motion.g>
    </motion.g>
  );
}

export default function CircuitTrace({ activeSection }) {
  const [points, setPoints] = useState([]);
  const [pathD, setPathD] = useState('');
  const [pointProgresses, setPointProgresses] = useState([]);
  const containerRef = useRef(null);

  // Track native scroll progress of the viewport
  const { scrollYProgress } = useScroll();

  // Scale the progress so it reaches 100% (1.0) slightly before the absolute bottom of the page (at 95% scroll)
  const scaledProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  // Smooth out the scroll progress mapping with silky spring settings
  const smoothProgress = useSpring(scaledProgress, {
    damping: 30,
    stiffness: 80,
    restDelta: 0.001
  });

  const calculatePoints = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const anchors = document.querySelectorAll('.trace-anchor');
    const newPoints = [];

    anchors.forEach((anchor) => {
      const rect = anchor.getBoundingClientRect();
      const id = anchor.getAttribute('data-id');

      // Calculate coordinates relative to the CircuitTrace container
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      newPoints.push({ id, x, y });
    });

    // Sort by y position to ensure top-down flow
    newPoints.sort((a, b) => a.y - b.y);
    setPoints(newPoints);
  };

  // Run calculation on load, resize, and scroll to ensure alignment
  useEffect(() => {
    // Initial delay to let DOM render and fonts load
    const timer = setTimeout(() => {
      calculatePoints();
    }, 500);

    window.addEventListener('resize', calculatePoints);

    // Create a ResizeObserver for the body to catch layout shifts
    const observer = new ResizeObserver(() => {
      calculatePoints();
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePoints);
      observer.disconnect();
    };
  }, []);

  // Construct the SVG path string using 45-degree chamfers
  useEffect(() => {
    if (points.length === 0) return;

    let pathStr = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      if (Math.abs(dx) < 8) {
        // Straight vertical line
        pathStr += ` L ${p2.x} ${p2.y}`;
      } else {
        // 45-degree chamfered PCB routing
        // Calculate the maximum space we can spend on 45-degree angles
        const maxOffset = Math.abs(dx);
        const verticalSegment = dy - maxOffset;

        if (verticalSegment > 0) {
          // We go straight down, turn at 45 degrees, then straight down to target
          const vOffset1 = p1.y + verticalSegment / 2;
          const vOffset2 = vOffset1 + maxOffset;

          pathStr += ` L ${p1.x} ${vOffset1} L ${p2.x} ${vOffset2} L ${p2.x} ${p2.y}`;
        } else {
          // Direct diagonal if vertical space is constrained
          pathStr += ` L ${p2.x} ${p2.y}`;
        }
      }
    }

    setPathD(pathStr);
  }, [points]);

  // Calculate cumulative path distances to map each node to its exact trigger ratio
  useEffect(() => {
    if (points.length < 2) return;

    const segmentLengths = [];
    let totalLength = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;

      let len = 0;
      if (Math.abs(dx) < 8) {
        len = dy;
      } else {
        const maxOffset = Math.abs(dx);
        const verticalSegment = dy - maxOffset;

        if (verticalSegment > 0) {
          len = verticalSegment + maxOffset * Math.sqrt(2);
        } else {
          len = Math.sqrt(dx * dx + dy * dy);
        }
      }
      segmentLengths.push(len);
      totalLength += len;
    }

    const progresses = [0];
    let currentLength = 0;
    for (let i = 0; i < segmentLengths.length; i++) {
      currentLength += segmentLengths[i];
      progresses.push(totalLength > 0 ? currentLength / totalLength : 0);
    }

    setPointProgresses(progresses);
  }, [points]);

  return (
    <div className="circuit-trace-container" ref={containerRef}>
      <svg className="circuit-trace-svg" width="100%" height="100%">
        {points.length > 1 && pathD && (
          <>
            {/* Background inactive trace */}
            <path
              d={pathD}
              className="trace-line-bg"
              fill="none"
            />

            {/* Foreground animated scroll-active trace */}
            <motion.path
              d={pathD}
              className="trace-line-active"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />
          </>
        )}

        {/* Nodes / Solder Pads */}
        {points.map((pt, idx) => (
          <NodeCircle
            key={pt.id}
            pt={pt}
            idx={idx}
            smoothProgress={smoothProgress}
            threshold={pointProgresses[idx] || 0}
          />
        ))}
      </svg>
    </div>
  );
}

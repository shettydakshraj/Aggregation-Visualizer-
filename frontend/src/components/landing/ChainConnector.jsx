import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ChainConnector.module.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ChainConnector
 * Renders an SVG path that "draws itself" as the scroll progresses through the learning chain.
 * Positioned absolutely behind the chain nodes.
 */
export default function ChainConnector({ nodeCount, activeNode }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path || reducedMotion) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current.closest('section'),
          start: 'top top',
          end: '+=300%',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  // Build a smooth zig-zag SVG path through 4 node positions
  // Nodes are at 25%, 50%, 75%, 100% of the track height
  // Left nodes at ~30% x, right nodes at ~70% x
  const NODE_POSITIONS = [
    { cx: 30, cy: 12.5 },  // Node 1 — left
    { cx: 70, cy: 37.5 },  // Node 2 — right
    { cx: 30, cy: 62.5 },  // Node 3 — left
    { cx: 70, cy: 87.5 },  // Node 4 — right
  ];

  // Build a cubic bezier path connecting all nodes
  const pathD = NODE_POSITIONS.reduce((acc, pos, i) => {
    if (i === 0) return `M ${pos.cx} ${pos.cy}`;
    const prev = NODE_POSITIONS[i - 1];
    const cpX1 = prev.cx;
    const cpY1 = (prev.cy + pos.cy) / 2;
    const cpX2 = pos.cx;
    const cpY2 = (prev.cy + pos.cy) / 2;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pos.cx} ${pos.cy}`;
  }, '');

  return (
    <svg
      ref={svgRef}
      className={styles.svg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Track (grey background line) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />

      {/* Animated progress line */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#connector-gradient)"
        strokeWidth="0.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={reducedMotion ? styles.pathReduced : ''}
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#4F7FFF" stopOpacity="0.9" />
          <stop offset="33%"  stopColor="#C8A96E" stopOpacity="0.9" />
          <stop offset="66%"  stopColor="#7FCC8A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF7F8A" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Node dots */}
      {NODE_POSITIONS.map((pos, i) => (
        <g key={i}>
          <circle
            cx={pos.cx}
            cy={pos.cy}
            r="0.8"
            fill={activeNode && i + 1 <= activeNode ? 'white' : 'rgba(255,255,255,0.2)'}
            style={{ transition: 'fill 0.5s ease' }}
          />
        </g>
      ))}
    </svg>
  );
}

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChainNode from './ChainNode';
import ChainConnector from './ChainConnector';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './LearningChain.module.css';

gsap.registerPlugin(ScrollTrigger);

export const CHAIN_NODES = [
  {
    id: 1,
    slug: 'group-by',
    label: 'GROUP BY',
    tagline: 'Aggregate rows into groups',
    description:
      'The foundation of SQL aggregation. Learn how databases collapse rows sharing a common value into a single summary row.',
    color: '#4F7FFF',
    icon: 'Σ',
    side: 'left',
  },
  {
    id: 2,
    slug: 'rollup',
    label: 'ROLLUP',
    tagline: 'Hierarchical subtotals',
    description:
      'Go beyond GROUP BY. ROLLUP generates subtotals at each level of a hierarchy, producing a natural drill-down summary.',
    color: '#C8A96E',
    icon: '▲',
    side: 'right',
  },
  {
    id: 3,
    slug: 'cube',
    label: 'CUBE',
    tagline: 'Multi-dimensional analysis',
    description:
      'The ultimate aggregation tool. CUBE computes subtotals for every possible combination of dimensions — like a pivot table on steroids.',
    color: '#7FCC8A',
    icon: '⬡',
    side: 'left',
  },
  {
    id: 4,
    slug: 'playground',
    label: 'Playground',
    tagline: 'Write and run SQL live',
    description:
      'Put your knowledge to the test. Query a real in-browser database, experiment freely, and see instant results.',
    color: '#FF7F8A',
    icon: '▶',
    side: 'right',
  },
];

export default function LearningChain() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // Show all nodes immediately without scroll animation
      CHAIN_NODES.forEach(n => setActiveNode(n.id));
      return;
    }

    const ctx = gsap.context(() => {
      // Pin the section while the chain animates
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Section title
      tl.fromTo(
        `.${styles.sectionTitle}`,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15 },
        0
      );

      // Nodes — each activates at 15% intervals
      CHAIN_NODES.forEach((node, i) => {
        const nodeEl = document.getElementById(`chain-node-${node.id}`);
        const start = 0.15 + i * 0.2;

        tl.fromTo(
          nodeEl,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.18,
            onStart: () => setActiveNode(node.id),
          },
          start
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="learning-chain"
      className={styles.section}
      aria-label="Learning path"
    >
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <p className={`label ${styles.sectionLabel}`}>Your learning path</p>
          <h2 className={`display-lg ${styles.sectionTitle}`}>
            A journey through<br />
            <em>aggregation</em>
          </h2>
        </div>

        {/* Chain track */}
        <div ref={trackRef} className={styles.track}>
          {/* SVG connector that runs behind all nodes */}
          <ChainConnector nodeCount={CHAIN_NODES.length} activeNode={activeNode} />

          {/* Nodes in zigzag layout */}
          {CHAIN_NODES.map((node, i) => (
            <ChainNode
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode !== null && node.id <= activeNode}
              isCurrent={activeNode === node.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

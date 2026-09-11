import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './GroupByHero.module.css';

export default function GroupByHero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const navPillsRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 },
        '-=0.3'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        navPillsRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={containerRef} className={styles.hero} aria-label="GROUP BY Hero">
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>SQL Foundation · Clause 01</span>
        </div>

        <h1 ref={titleRef} className={styles.title}>
          <span className={styles.titleMono}>GROUP BY</span>
        </h1>

        <p ref={descRef} className={styles.subtitle}>
          Transform raw records into aggregated intelligence. Organize matching rows into discrete categories 
          and compute unified summaries across entire datasets.
        </p>

        <nav ref={navPillsRef} className={styles.pillsNav} aria-label="Page Sections">
          <button onClick={() => scrollToSection('concept-section')} className={styles.pill}>
            <span className={styles.pillIcon}>01</span>
            <span>Core Concept</span>
          </button>
          <button onClick={() => scrollToSection('video-section')} className={styles.pill}>
            <span className={styles.pillIcon}>02</span>
            <span>Video Lesson</span>
          </button>
          <button onClick={() => scrollToSection('viz-section')} className={styles.pill}>
            <span className={styles.pillIcon}>03</span>
            <span>3D Demonstration</span>
          </button>
          <button onClick={() => scrollToSection('playground-section')} className={styles.pill}>
            <span className={styles.pillIcon}>04</span>
            <span>SQL Playground</span>
          </button>
          <button onClick={() => scrollToSection('summary-section')} className={styles.pill}>
            <span className={styles.pillIcon}>05</span>
            <span>Key Takeaways</span>
          </button>
        </nav>
      </div>

      <div className={styles.gridLines} aria-hidden="true" />
    </header>
  );
}

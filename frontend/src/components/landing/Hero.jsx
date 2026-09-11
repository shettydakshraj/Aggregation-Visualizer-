import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const labelsRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Heading words reveal (clip-path + translateY)
      const words = headingRef.current?.querySelectorAll('[data-word]');
      if (words?.length) {
        tl.fromTo(
          words,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.12 },
          0.2
        );
      }

      // 2. Subtext fade in
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.9
      );

      // 3. CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.2
      );

      // 4. Floating micro-labels
      const labelEls = labelsRef.current?.querySelectorAll('[data-label]');
      if (labelEls?.length) {
        tl.fromTo(
          labelEls,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          1.4
        );

        // Continuous float animation after entrance
        tl.add(() => {
          labelEls.forEach((el, i) => {
            gsap.to(el, {
              y: '-=10',
              duration: 2.5 + i * 0.4,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              delay: i * 0.3,
            });
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleScrollDown = () => {
    document.getElementById('learning-chain')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Hero">
      {/* SVG Grid Background — architectural database schema feel */}
      <HeroGrid />

      {/* Floating SQL micro-labels */}
      <div ref={labelsRef} className={styles.floatingLabels} aria-hidden="true">
        {[
          { text: 'GROUP BY',  top: '22%', left: '6%',  delay: 0,    rot: '-3deg' },
          { text: 'ROLLUP',    top: '18%', right: '8%', delay: 0.2,  rot: '2deg'  },
          { text: 'CUBE',      top: '68%', left: '5%',  delay: 0.4,  rot: '4deg'  },
          { text: 'SELECT ∑',  top: '72%', right: '6%', delay: 0.6,  rot: '-2deg' },
        ].map(({ text, top, left, right, delay, rot }) => (
          <span
            key={text}
            data-label
            className={styles.floatingLabel}
            style={{ top, left, right, '--float-rot': rot, '--float-delay': `${delay}s` }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <p className={`label ${styles.eyebrow}`}>Database Aggregation · Visual Learning</p>

        <h1 className={styles.heading} ref={headingRef}>
          <span className={styles.wordWrap}>
            <span data-word className={styles.word}>SQL</span>
          </span>
          <span className={styles.wordWrap}>
            <span data-word className={`${styles.word} ${styles.wordItalic}`}>Visualizer</span>
          </span>
        </h1>

        <p ref={subRef} className={`body-lg ${styles.sub}`}>
          Understand GROUP BY, ROLLUP &amp; CUBE<br />
          through interactive 3D demos and a live SQL playground.
        </p>

        <button ref={ctaRef} className={styles.cta} onClick={handleScrollDown} id="hero-cta">
          <span className={styles.ctaText}>Begin the Journey</span>
          <svg className={styles.ctaArrow} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scroll progress hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}

/* ---- SVG Grid Background ---- */
function HeroGrid() {
  return (
    <svg
      className={styles.grid}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
        {/* Radial mask so grid fades toward edges */}
        <radialGradient id="grid-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="100%" height="100%" fill="url(#grid-fade)" />
        </mask>
      </defs>
      {/* Grid fill */}
      <rect width="100%" height="100%" fill="url(#grid-pattern)" mask="url(#grid-mask)" />
      {/* Subtle horizontal accent lines at key positions */}
      <line x1="0%" y1="33%" x2="100%" y2="33%" stroke="rgba(79,127,255,0.06)" strokeWidth="0.75" />
      <line x1="0%" y1="66%" x2="100%" y2="66%" stroke="rgba(79,127,255,0.06)" strokeWidth="0.75" />
      {/* Vertical accent */}
      <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(200,169,110,0.04)" strokeWidth="0.75" />
    </svg>
  );
}

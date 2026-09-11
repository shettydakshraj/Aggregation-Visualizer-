import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './PageTransition.module.css';

/**
 * PageTransition
 * Wraps page content with a smooth fade + slight Y translate on route changes.
 * Inspired by the purposeful, clean transitions of ERA Residence (Barba.js style).
 */
export default function PageTransition({ children }) {
  const wrapperRef = useRef(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !wrapperRef.current) return;

    // Entrance animation on each route change
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all',
      }
    );
  }, [location.pathname, reducedMotion]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {children}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollTrigger
 * Convenience wrapper that registers a GSAP ScrollTrigger and cleans up on unmount.
 *
 * @param {Function} factory  — function that receives { gsap, ScrollTrigger } and returns a GSAP tween or timeline
 * @param {Array}    deps     — dependency array (like useEffect)
 */
export function useScrollTrigger(factory, deps = []) {
  const tweenRef = useRef(null);

  useEffect(() => {
    tweenRef.current = factory({ gsap, ScrollTrigger });

    return () => {
      if (tweenRef.current) {
        if (Array.isArray(tweenRef.current)) {
          tweenRef.current.forEach(t => t?.kill?.());
        } else {
          tweenRef.current.kill?.();
        }
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return tweenRef;
}

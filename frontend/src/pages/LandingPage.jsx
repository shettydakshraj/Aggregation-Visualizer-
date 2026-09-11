import { useEffect } from 'react';
import Hero from '../components/landing/Hero';
import LearningChain from '../components/landing/LearningChain';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  useEffect(() => {
    document.title = 'SQL Aggregation Visualizer — Learn GROUP BY, ROLLUP & CUBE';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      <Hero />
      <LearningChain />
      <SiteFooter />
    </main>
  );
}

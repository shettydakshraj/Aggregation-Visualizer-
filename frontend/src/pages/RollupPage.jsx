import { useEffect } from 'react';
import RollupHero from '../components/rollup/RollupHero';
import RollupConcept from '../components/rollup/RollupConcept';
import RollupVideo from '../components/rollup/RollupVideo';
import Rollup3DVisualizer from '../components/rollup/Rollup3DVisualizer';
import RollupPlayground from '../components/rollup/RollupPlayground';
import RollupSummary from '../components/rollup/RollupSummary';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './RollupPage.module.css';

export default function RollupPage() {
  useEffect(() => {
    document.title = 'ROLLUP — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      {/* 1. Hero */}
      <RollupHero />

      {/* 2. Hierarchical Concept */}
      <RollupConcept />

      {/* 3. Guided Video Masterclass */}
      <RollupVideo />

      {/* 4. 3D Spatial Demonstration */}
      <Rollup3DVisualizer />

      {/* 5. Live SQL ROLLUP Playground */}
      <RollupPlayground />

      {/* 6. Summary & Navigation */}
      <RollupSummary />

      <SiteFooter />
    </main>
  );
}

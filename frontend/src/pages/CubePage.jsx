import { useEffect } from 'react';
import CubeHero from '../components/cube/CubeHero';
import CubeConcept from '../components/cube/CubeConcept';
import CubeVideo from '../components/cube/CubeVideo';
import Cube3DVisualizer from '../components/cube/Cube3DVisualizer';
import CubePlayground from '../components/cube/CubePlayground';
import CubeSummary from '../components/cube/CubeSummary';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './CubePage.module.css';

export default function CubePage() {
  useEffect(() => {
    document.title = 'CUBE — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      {/* 1. Hero */}
      <CubeHero />

      {/* 2. Dimensional Concept */}
      <CubeConcept />

      {/* 3. Guided Video Masterclass */}
      <CubeVideo />

      {/* 4. 3D OLAP Cube Visualizer */}
      <Cube3DVisualizer />

      {/* 5. Live SQL CUBE Studio */}
      <CubePlayground />

      {/* 6. Summary & Navigation */}
      <CubeSummary />

      <SiteFooter />
    </main>
  );
}

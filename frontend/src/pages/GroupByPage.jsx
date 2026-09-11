import { useEffect } from 'react';
import GroupByHero from '../components/groupby/GroupByHero';
import ConceptExplanation from '../components/groupby/ConceptExplanation';
import YouTubeLesson from '../components/groupby/YouTubeLesson';
import GroupBy3DVisualizer from '../components/groupby/GroupBy3DVisualizer';
import SqlPlayground from '../components/groupby/SqlPlayground';
import GroupBySummary from '../components/groupby/GroupBySummary';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './GroupByPage.module.css';

export default function GroupByPage() {
  useEffect(() => {
    document.title = 'GROUP BY — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      {/* 1. Hero */}
      <GroupByHero />

      {/* 2. Concept Explanation */}
      <ConceptExplanation />

      {/* 3. YouTube Guided Lesson */}
      <YouTubeLesson />

      {/* 4. 3D Spatial Demonstration */}
      <GroupBy3DVisualizer />

      {/* 5. Live In-Browser SQL Playground */}
      <SqlPlayground />

      {/* 6. Synthesis & Next Chapter */}
      <GroupBySummary />

      <SiteFooter />
    </main>
  );
}

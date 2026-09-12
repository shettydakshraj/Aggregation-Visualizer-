import { useEffect, useState } from 'react';
import ConceptCard from '../components/learn/ConceptCard';
import VideoEmbed from '../components/learn/VideoEmbed';
import ReferencesList from '../components/learn/ReferencesList';
import SiteFooter from '../components/layout/SiteFooter';
import { CONCEPTS_DATA, EDUCATIONAL_VIDEOS, REFERENCES_DATA } from '../data/learnData';
import styles from './LearnPage.module.css';

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState('all');

  useEffect(() => {
    document.title = 'Learn — SQL Aggregation Visualizer Curriculum';
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.page}>
      {/* Hero Header */}
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="label">Curriculum & Masterclasses</span>
            <h1 className={styles.heroTitle}>
              Mastering Advanced <span className={styles.gradientText}>SQL Aggregation</span>
            </h1>
            <p className={styles.heroDesc}>
              A comprehensive academic guide to relational data grouping, hierarchical rollups, and
              multidimensional OLAP data cubes — illustrated with practical civil construction management examples.
            </p>

            {/* Quick Filter Navigation */}
            <div className={styles.quickNav}>
              <button
                onClick={() => scrollToSection('group-by-section')}
                className={`${styles.navPill} ${activeSection === 'group-by-section' ? styles.navPillActive : ''}`}
              >
                01 · GROUP BY
              </button>
              <button
                onClick={() => scrollToSection('rollup-section')}
                className={`${styles.navPill} ${activeSection === 'rollup-section' ? styles.navPillActive : ''}`}
              >
                02 · ROLLUP
              </button>
              <button
                onClick={() => scrollToSection('cube-section')}
                className={`${styles.navPill} ${activeSection === 'cube-section' ? styles.navPillActive : ''}`}
              >
                03 · CUBE
              </button>
              <button
                onClick={() => scrollToSection('references-section')}
                className={`${styles.navPill} ${activeSection === 'references-section' ? styles.navPillActive : ''}`}
              >
                04 · References
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.main}>
        <div className="container">
          {/* TOPIC 1: GROUP BY */}
          <section id="group-by-section" className={styles.topicSection} aria-label="GROUP BY Topic">
            <div className={styles.sectionHeader}>
              <span className={styles.stepNum}>Topic 01</span>
              <h2 className={styles.topicHeading}>Relational Grouping & Bucketing</h2>
            </div>
            <ConceptCard
              concept={CONCEPTS_DATA.groupBy}
              badge="Fundamental Operator"
              colorIndex={1}
            />
            <div className={styles.videoWrapper}>
              <div className={styles.videoSectionTitle}>
                <span className={styles.videoSub}>Guided Masterclass</span>
                <h3>Educational Video: GROUP BY &amp; HAVING Essentials</h3>
              </div>
              <VideoEmbed
                video={EDUCATIONAL_VIDEOS.groupBy}
                topicLabel="GROUP BY"
              />
            </div>
          </section>

          {/* TOPIC 2: ROLLUP */}
          <section id="rollup-section" className={styles.topicSection} aria-label="ROLLUP Topic">
            <div className={styles.sectionHeader}>
              <span className={styles.stepNum}>Topic 02</span>
              <h2 className={styles.topicHeading}>Hierarchical Progressive Subtotals</h2>
            </div>
            <ConceptCard
              concept={CONCEPTS_DATA.rollup}
              badge="Hierarchical Extension"
              colorIndex={2}
            />
            <div className={styles.videoWrapper}>
              <div className={styles.videoSectionTitle}>
                <span className={styles.videoSub}>Guided Masterclass</span>
                <h3>Educational Video: Demystifying ROLLUP Subtotals</h3>
              </div>
              <VideoEmbed
                video={EDUCATIONAL_VIDEOS.rollup}
                topicLabel="ROLLUP"
              />
            </div>
          </section>

          {/* TOPIC 3: CUBE */}
          <section id="cube-section" className={styles.topicSection} aria-label="CUBE Topic">
            <div className={styles.sectionHeader}>
              <span className={styles.stepNum}>Topic 03</span>
              <h2 className={styles.topicHeading}>Multidimensional Cross-Tabulation (OLAP)</h2>
            </div>
            <ConceptCard
              concept={CONCEPTS_DATA.cube}
              badge="Dimensional Power Set"
              colorIndex={3}
            />
            <div className={styles.videoWrapper}>
              <div className={styles.videoSectionTitle}>
                <span className={styles.videoSub}>Guided Masterclass</span>
                <h3>Educational Video: Multidimensional SQL CUBE</h3>
              </div>
              <VideoEmbed
                video={EDUCATIONAL_VIDEOS.cube}
                topicLabel="CUBE"
              />
            </div>
          </section>

          {/* REFERENCES SECTION */}
          <div id="references-section" className={styles.referencesWrapper}>
            <ReferencesList references={REFERENCES_DATA} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

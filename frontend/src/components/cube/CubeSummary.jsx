import { Link } from 'react-router-dom';
import styles from './CubeSummary.module.css';

export default function CubeSummary() {
  const takeaways = [
    {
      title: 'Exponential Complexity Hazard (2ⁿ)',
      desc: 'Each added column doubles the grouping sets: 2 columns yield 4 sets, 5 columns yield 32 sets, and 10 columns yield 1,024 sets. Keep CUBE dimensions focused.',
    },
    {
      title: 'CUBE vs ROLLUP Decision Rule',
      desc: 'Use ROLLUP for natural hierarchies (Year → Month → Day). Use CUBE for cross-sectional dimensions with no inherent hierarchy (Customer Type × Location × Material).',
    },
    {
      title: 'Cross-Dimensional Insight (The Hallmark)',
      desc: 'CUBE is the only clause capable of computing (NULL, Dimension_B) subtotals without forcing you to write tedious manual UNION queries.',
    },
    {
      title: 'The Foundation of OLAP Data Cubes',
      desc: 'Modern analytical engines pre-compute CUBE aggregates to power sub-second executive dashboards, dynamic pivot tables, and BI slice-and-dice tools.',
    },
  ];

  return (
    <section id="summary-section" className={styles.section} aria-label="Key Takeaways and Final Playground">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 05 · Complete Synthesis</p>
          <h2 className="display-lg">Key Architectural Takeaways</h2>
          <p className="body-lg">
            Essential principles when orchestrating high-dimensional cross-tabulations in modern SQL engines.
          </p>
        </div>

        {/* 4 Cards */}
        <div className={styles.takeawayGrid}>
          {takeaways.map((item, idx) => (
            <div key={idx} className={styles.takeawayCard}>
              <div className={styles.cardIndex}>0{idx + 1}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Final Chapter Card (Playground) */}
        <div className={styles.nextChapterBox}>
          <div className={styles.nextContent}>
            <span className={styles.nextBadge}>Mastery Stage · The Sandbox</span>
            <h3 className={styles.nextTitle}>The Freeform SQL Playground</h3>
            <p className={styles.nextDesc}>
              Now that you've mastered <strong>GROUP BY</strong>, <strong>ROLLUP</strong>, and <strong>CUBE</strong>, 
              put your knowledge to the test. Write unrestricted queries against custom schemas in our full analytical laboratory.
            </p>
            <div className={styles.nextPills}>
              <span className={styles.pill}>Custom SQL Queries</span>
              <span className={styles.pill}>Real-time Schema Editor</span>
              <span className={styles.pill}>Export Results</span>
            </div>
          </div>

          <Link to="/playground" className={styles.nextBtn}>
            <span>Open Playground</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import styles from './RollupSummary.module.css';

export default function RollupSummary() {
  const takeaways = [
    {
      title: 'Column Order Dictates Hierarchy',
      desc: 'ROLLUP(A, B) generates (A,B), (A,NULL), (NULL,NULL). ROLLUP(B, A) produces (B,A), (B,NULL), (NULL,NULL). The first column forms the primary subtotal partition.',
    },
    {
      title: 'Generates N + 1 Grouping Sets',
      desc: 'For N columns provided to ROLLUP, the query creates exactly N + 1 grouping combinations, stripping one column from right to left at each step.',
    },
    {
      title: 'Use GROUPING() to Label Subtotals',
      desc: 'Since rolled-up rows yield NULL values, use CASE WHEN GROUPING(col) = 1 THEN "Subtotal" ELSE col END to avoid confusing real NULLs with generated subtotals.',
    },
    {
      title: 'Massive I/O Performance Advantage',
      desc: 'Generates detail and subtotal rows in a single physical storage scan, replacing what would otherwise take multiple UNION ALL queries and disk sweeps.',
    },
  ];

  return (
    <section id="summary-section" className={styles.section} aria-label="Key Takeaways and Next Chapter">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 05 · Synthesis &amp; The Next Dimension</p>
          <h2 className="display-lg">Key Architectural Takeaways</h2>
          <p className="body-lg">
            Essential principles when calculating multi-level subtotals in enterprise SQL analytics.
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

        {/* Next Chapter Card (CUBE) */}
        <div className={styles.nextChapterBox}>
          <div className={styles.nextContent}>
            <span className={styles.nextBadge}>Next Chapter · Clause 03</span>
            <h3 className={styles.nextTitle}>CUBE — Multi-Dimensional Combinations</h3>
            <p className={styles.nextDesc}>
              ROLLUP only aggregates along a single hierarchical path. But what if you need subtotals across 
              <strong> all possible combinations</strong> of columns? Discover the full $2^N$ power of CUBE.
            </p>
            <div className={styles.nextPills}>
              <span className={styles.pill}>Cross-Dimensional Analysis</span>
              <span className={styles.pill}>2^N Grouping Sets</span>
              <span className={styles.pill}>OLAP Hypercubes</span>
            </div>
          </div>

          <Link to="/cube" className={styles.nextBtn}>
            <span>Enter CUBE</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

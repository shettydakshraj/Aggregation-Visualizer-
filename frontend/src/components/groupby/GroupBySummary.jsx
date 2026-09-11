import { Link } from 'react-router-dom';
import styles from './GroupBySummary.module.css';

export default function GroupBySummary() {
  const takeaways = [
    {
      title: 'Every Non-Aggregated Column Must Be Grouped',
      desc: 'If a column is selected without an aggregate function like SUM() or MAX(), it MUST appear in the GROUP BY clause to prevent non-deterministic ambiguity.',
    },
    {
      title: 'NULL Values Group Together',
      desc: 'All rows possessing NULL in the grouping column are consolidated into a single distinct group bucket.',
    },
    {
      title: 'WHERE Filters Before, HAVING Filters After',
      desc: 'WHERE operates on individual raw rows before grouping occurs. HAVING filters aggregated group metrics after calculation.',
    },
    {
      title: 'Index Columns for Grouping Performance',
      desc: 'Creating B-Tree composite indexes on grouping columns avoids expensive in-memory sort or hash spill operations.',
    },
  ];

  return (
    <section id="summary-section" className={styles.section} aria-label="Key Takeaways and Next Chapter">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 05 · Synthesis &amp; Next Stage</p>
          <h2 className="display-lg">Key Architectural Takeaways</h2>
          <p className="body-lg">
            Remember these principles when designing production queries and data pipelines.
          </p>
        </div>

        {/* 4 Core Rules */}
        <div className={styles.takeawayGrid}>
          {takeaways.map((item, idx) => (
            <div key={idx} className={styles.takeawayCard}>
              <div className={styles.cardIndex}>0{idx + 1}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Next Chapter Card (ROLLUP) */}
        <div className={styles.nextChapterBox}>
          <div className={styles.nextContent}>
            <span className={styles.nextBadge}>Next Chapter in the Aggregation Series</span>
            <h3 className={styles.nextTitle}>ROLLUP — Hierarchical Subtotals</h3>
            <p className={styles.nextDesc}>
              GROUP BY produces flat summaries. But what if you need subtotals across multiple hierarchical levels 
              plus a grand total in a single query pass? Discover ROLLUP next.
            </p>
            <div className={styles.nextPills}>
              <span className={styles.pill}>Hierarchical Aggregates</span>
              <span className={styles.pill}>Super-Aggregate Rows</span>
              <span className={styles.pill}>Grand Totals</span>
            </div>
          </div>

          <Link to="/rollup" className={styles.nextBtn}>
            <span>Explore ROLLUP</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9.75 4.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useMemo } from 'react';
import styles from './PlaygroundInsights.module.css';

export default function PlaygroundInsights({ query = '', rowCount = 0 }) {
  const analysis = useMemo(() => {
    const q = query.toUpperCase();
    const features = [];
    const insights = [];

    const hasGroupBy = q.includes('GROUP BY');
    const hasRollup = q.includes('ROLLUP');
    const hasCube = q.includes('CUBE');
    const hasHaving = q.includes('HAVING');
    const hasJoin = q.includes('JOIN');
    const hasCase = q.includes('CASE') && q.includes('WHEN');

    if (hasCube) {
      features.push('CUBE (2^N)');
      insights.push({
        title: 'CUBE Aggregation Active',
        text: 'Generates all 2^N possible cross-dimensional combinations. Any NULL dimensions indicate multi-axis subtotal rollups.'
      });
    } else if (hasRollup) {
      features.push('ROLLUP (N+1)');
      insights.push({
        title: 'Hierarchical ROLLUP Ladder',
        text: 'Creates an N+1 tiered subtotal hierarchy from left to right, concluding in a single overarching Grand Total row.'
      });
    } else if (hasGroupBy) {
      features.push('Standard GROUP BY');
      insights.push({
        title: 'Partition Collapsing',
        text: 'Identical key combinations are collapsed into single summary rows, computing aggregate scalar functions like SUM, COUNT, and AVG.'
      });
    }

    if (hasHaving) {
      features.push('HAVING Filter');
      insights.push({
        title: 'Post-Aggregation Filtering',
        text: 'The HAVING clause filters aggregated bucket results after GROUP BY is computed, filtering out groups that do not meet your threshold.'
      });
    }

    if (hasJoin) {
      features.push('Relational JOIN');
      insights.push({
        title: 'Multi-Table Synthesis',
        text: 'Cross-table relational keys join project developments with materials or workforce allocations before computing metric aggregations.'
      });
    }

    if (hasCase) {
      features.push('Conditional Aggregations');
      insights.push({
        title: 'Dynamic Pivot & Categorization',
        text: 'CASE WHEN expressions conditionally bucket data inline, creating dynamic pivot matrices within single aggregate queries.'
      });
    }

    if (!features.length) {
      features.push('Freeform ANSI SQL');
      insights.push({
        title: 'Direct Query Execution',
        text: 'Executing relational SQL query against in-memory AlaSQL relational engine.'
      });
    }

    return { features, insights };
  }, [query]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleArea}>
        <h3 className={styles.heading}>
          <span className={styles.headingIcon}>⚡</span>
          <span>Query Analysis &amp; Educational Insights</span>
        </h3>

        <div className={styles.activeFeatures}>
          {analysis.features.map((f) => (
            <span key={f} className={styles.featureBadge}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.insightsGrid}>
        {analysis.insights.map((ins, i) => (
          <div key={i} className={styles.insightCard}>
            <span className={styles.cardHead}>{ins.title}</span>
            <p className={styles.cardText}>{ins.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

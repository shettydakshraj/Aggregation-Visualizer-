import { useState } from 'react';
import styles from './ConceptExplanation.module.css';

export default function ConceptExplanation() {
  const [activeTab, setActiveTab] = useState('model');

  return (
    <section id="concept-section" className={styles.section} aria-label="Concept Explanation">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 01 · Theoretical Foundation</p>
          <h2 className="display-lg">The Architecture of a Group</h2>
          <p className="body-lg">
            In standard relational tables, every row is an individual entity. The SQL <code>GROUP BY</code> clause collapses 
            rows that share the same key value into a single summary record.
          </p>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabBar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'model' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('model')}
          >
            01 · The Mental Model
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'syntax' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('syntax')}
          >
            02 · Syntax Anatomy
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'example' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('example')}
          >
            03 · Construction Example
          </button>
        </div>

        {/* Tab 1: Mental Model */}
        {activeTab === 'model' && (
          <div className={styles.cardGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>Partitioning</h3>
              <p className={styles.stepDesc}>
                The database scans table rows and buckets records with matching grouping columns into isolated buckets.
              </p>
              <div className={styles.stepVisual}>
                <span className={styles.chip} style={{ borderColor: 'var(--node-1)' }}>North District</span>
                <span className={styles.chip} style={{ borderColor: 'var(--node-1)' }}>North District</span>
                <span className={styles.chip} style={{ borderColor: 'var(--node-2)' }}>Coastal Bay</span>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>Aggregating</h3>
              <p className={styles.stepDesc}>
                An aggregate function (e.g. <code>SUM</code>, <code>AVG</code>, <code>COUNT</code>) collapses all values inside each bucket into one numerical metric.
              </p>
              <div className={styles.stepVisual}>
                <span className={styles.aggMath}>₹450k + ₹180k = <strong>₹630k</strong></span>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>Projecting</h3>
              <p className={styles.stepDesc}>
                The query outputs exactly one row per distinct group key with its computed scalar aggregation result.
              </p>
              <div className={styles.stepVisual}>
                <div className={styles.resultBadge}>
                  <span>North District</span>
                  <strong>₹630,000</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Syntax Anatomy */}
        {activeTab === 'syntax' && (
          <div className={styles.syntaxBox}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeTitle}>SQL Standard ISO/IEC 9075:2016</span>
            </div>
            <pre className={styles.codeBlock}>
              <code>
                <span className={styles.keyword}>SELECT</span>{' '}
                <span className={styles.col}>location</span>,{' '}
                <span className={styles.fn}>SUM</span>(<span className={styles.col}>cost</span>) <span className={styles.keyword}>AS</span> total_cost{'\n'}
                <span className={styles.keyword}>FROM</span>{' '}
                <span className={styles.col}>construction_projects</span>{'\n'}
                <span className={styles.keyword}>WHERE</span>{' '}
                <span className={styles.col}>status</span> = <span className={styles.str}>'Active'</span>{'\n'}
                <span className={styles.keywordAccent}>GROUP BY</span>{' '}
                <span className={styles.colAccent}>location</span>;
              </code>
            </pre>

            <div className={styles.calloutGrid}>
              <div className={styles.calloutItem}>
                <h4 className={styles.calloutTitle}>The Golden Rule</h4>
                <p>Every column in the <code>SELECT</code> clause must either appear in the <code>GROUP BY</code> clause or be wrapped in an aggregate function.</p>
              </div>
              <div className={styles.calloutItem}>
                <h4 className={styles.calloutTitle}>Execution Order</h4>
                <p>SQL processes <code>FROM</code> &rarr; <code>WHERE</code> &rarr; <code>GROUP BY</code> &rarr; <code>HAVING</code> &rarr; <code>SELECT</code> &rarr; <code>ORDER BY</code>.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Construction Example */}
        {activeTab === 'example' && (
          <div className={styles.exampleWrapper}>
            <div className={styles.exampleHeader}>
              <div>
                <h3 className={styles.exampleTitle}>Infrastructure Project Accounting</h3>
                <p className={styles.exampleSubtitle}>Suppose we have construction logs across 3 metropolitan development zones:</p>
              </div>
              <span className={styles.badgeBlue}>Real-World Dataset</span>
            </div>

            <div className={styles.tableComparison}>
              <div className={styles.tablePanel}>
                <div className={styles.tableLabel}>Raw Unaggregated Records (8 Rows)</div>
                <div className={styles.tableScroll}>
                  <table className={styles.demoTable}>
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Material</th>
                        <th>Location</th>
                        <th>Cost (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Metro Rail</td><td>Steel</td><td className={styles.tagBlue}>North District</td><td>₹450,000</td></tr>
                      <tr><td>Metro Rail</td><td>Concrete</td><td className={styles.tagBlue}>North District</td><td>₹320,000</td></tr>
                      <tr><td>Harbour Bridge</td><td>Steel</td><td className={styles.tagAmber}>Coastal Bay</td><td>₹850,000</td></tr>
                      <tr><td>Harbour Bridge</td><td>Timber</td><td className={styles.tagAmber}>Coastal Bay</td><td>₹120,000</td></tr>
                      <tr><td>Sky Tower</td><td>Concrete</td><td className={styles.tagGreen}>Downtown Metro</td><td>₹650,000</td></tr>
                      <tr><td>Sky Tower</td><td>Glass</td><td className={styles.tagGreen}>Downtown Metro</td><td>₹290,000</td></tr>
                      <tr><td>Solar Park</td><td>Steel</td><td className={styles.tagBlue}>North District</td><td>₹180,000</td></tr>
                      <tr><td>Coastal Highway</td><td>Concrete</td><td className={styles.tagAmber}>Coastal Bay</td><td>₹510,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.arrowDivider}>
                <span>GROUP BY location</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className={styles.tablePanel}>
                <div className={styles.tableLabel}>Aggregated Output (3 Summary Rows)</div>
                <div className={styles.tableScroll}>
                  <table className={styles.demoTable}>
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>Total Cost (SUM)</th>
                        <th>Projects (COUNT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.summaryRow}>
                        <td className={styles.tagBlue}>North District</td>
                        <td className={styles.costVal}>₹950,000</td>
                        <td>3 items</td>
                      </tr>
                      <tr className={styles.summaryRow}>
                        <td className={styles.tagAmber}>Coastal Bay</td>
                        <td className={styles.costVal}>₹1,480,000</td>
                        <td>3 items</td>
                      </tr>
                      <tr className={styles.summaryRow}>
                        <td className={styles.tagGreen}>Downtown Metro</td>
                        <td className={styles.costVal}>₹940,000</td>
                        <td>2 items</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

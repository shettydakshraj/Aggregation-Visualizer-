import { useState } from 'react';
import styles from './CubeConcept.module.css';

export default function CubeConcept() {
  const [activeTab, setActiveTab] = useState('power');

  return (
    <section id="concept-section" className={styles.section} aria-label="CUBE Concept">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 01 · Dimensional Theory</p>
          <h2 className="display-lg">The 2ⁿ Combinatorial Power</h2>
          <p className="body-lg">
            Where <code>ROLLUP</code> only travels one hierarchical route down to the root, <code>CUBE</code> computes 
            the complete power set of grouping sets—generating cross-dimensional subtotals across every axis.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'power' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('power')}
          >
            01 · The 2ⁿ Combinations
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'matrix' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            02 · CUBE vs ROLLUP Matrix
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'olap' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('olap')}
          >
            03 · OLAP Hypercubes
          </button>
        </div>

        {/* Tab 1: The 2^N Power */}
        {activeTab === 'power' && (
          <div className={styles.setsGrid}>
            <div className={styles.setCard}>
              <div className={styles.setBadge} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
                Set 1 of 4 · Full Detail
              </div>
              <h3 className={styles.setTitle}>(location, material)</h3>
              <p className={styles.setDesc}>Base combinations identical to standard GROUP BY. Both dimensions maintain discrete values.</p>
              <div className={styles.setVal}>
                <span>North District + Steel</span>
                <strong>₹630,000</strong>
              </div>
            </div>

            <div className={styles.setCard}>
              <div className={styles.setBadge} style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                Set 2 of 4 · Location Subtotals
              </div>
              <h3 className={styles.setTitle}>(location, NULL)</h3>
              <p className={styles.setDesc}>Material dimension collapsed. Produces total expenditure per metropolitan location.</p>
              <div className={styles.setVal} style={{ color: 'var(--accent)' }}>
                <span>Total North District</span>
                <strong>₹950,000</strong>
              </div>
            </div>

            <div className={styles.setCard} style={{ borderColor: 'rgba(127, 204, 138, 0.4)' }}>
              <div className={styles.setBadge} style={{ background: 'rgba(127, 204, 138, 0.12)', color: 'var(--accent-green)' }}>
                Set 3 of 4 · Material Subtotals (CUBE Only!)
              </div>
              <h3 className={styles.setTitle}>(NULL, material)</h3>
              <p className={styles.setDesc}>Location collapsed. Calculates total expenditure per material type across the entire city (ROLLUP misses this!).</p>
              <div className={styles.setVal} style={{ color: 'var(--accent-green)' }}>
                <span>Total Steel Worldwide</span>
                <strong>₹1,480,000</strong>
              </div>
            </div>

            <div className={styles.setCard}>
              <div className={styles.setBadge} style={{ background: 'var(--accent-warm-dim)', color: 'var(--accent-warm)' }}>
                Set 4 of 4 · Grand Total
              </div>
              <h3 className={styles.setTitle}>(NULL, NULL)</h3>
              <p className={styles.setDesc}>All dimensions collapsed into the single master grand total covering all projects and zones.</p>
              <div className={styles.setVal} style={{ color: 'var(--accent-warm)' }}>
                <span>Global Construction Budget</span>
                <strong>₹3,370,000</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: CUBE vs ROLLUP Matrix */}
        {activeTab === 'matrix' && (
          <div className={styles.matrixWrapper}>
            <div className={styles.matrixHeader}>
              <h3 className={styles.matrixTitle}>Direct Operational Comparison</h3>
              <span className={styles.badgeGreen}>2 Dimensions: (Location, Material)</span>
            </div>

            <div className={styles.tableScroll}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th>Grouping Set</th>
                    <th>Plain GROUP BY</th>
                    <th>ROLLUP (loc, mat)</th>
                    <th>CUBE (loc, mat)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>(location, material)</code></td>
                    <td className={styles.check}>✓ Computed</td>
                    <td className={styles.check}>✓ Computed</td>
                    <td className={styles.checkGreen}>✓ Computed</td>
                  </tr>
                  <tr>
                    <td><code>(location, NULL)</code></td>
                    <td className={styles.cross}>✗ Skipped</td>
                    <td className={styles.check}>✓ Computed</td>
                    <td className={styles.checkGreen}>✓ Computed</td>
                  </tr>
                  <tr className={styles.highlightRow}>
                    <td><code>(NULL, material)</code></td>
                    <td className={styles.cross}>✗ Skipped</td>
                    <td className={styles.cross}>✗ Skipped (Hierarchy limitation)</td>
                    <td className={styles.checkGreen}>★ COMPUTED (Cross-Dimensional)</td>
                  </tr>
                  <tr>
                    <td><code>(NULL, NULL)</code></td>
                    <td className={styles.cross}>✗ Skipped</td>
                    <td className={styles.check}>✓ Computed</td>
                    <td className={styles.checkGreen}>✓ Computed</td>
                  </tr>
                  <tr className={styles.totalRow}>
                    <td><strong>Total Sets Produced</strong></td>
                    <td><strong>1 Set</strong></td>
                    <td><strong>3 Sets (N + 1)</strong></td>
                    <td className={styles.totalGreen}><strong>4 Sets (2ⁿ)</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: OLAP Hypercubes */}
        {activeTab === 'olap' && (
          <div className={styles.olapBox}>
            <div className={styles.olapGrid}>
              <div className={styles.olapContent}>
                <h3 className={styles.olapTitle}>The Engine of Business Intelligence</h3>
                <p className={styles.olapDesc}>
                  In relational data warehouses (Snowflake, BigQuery, PostgreSQL, Teradata), <code>CUBE</code> powers 
                  OLAP (Online Analytical Processing) multi-dimensional views. It enables instantaneous "slice and dice" 
                  reporting across any dimension without re-scanning terabytes of transaction facts.
                </p>
                <div className={styles.cubeStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>2ⁿ</span>
                    <span className={styles.statLabel}>Subtotal Permutations</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>1</span>
                    <span className={styles.statLabel}>Physical Disk Scan</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNum}>360°</span>
                    <span className={styles.statLabel}>Cross-Tab Visibility</span>
                  </div>
                </div>
              </div>

              <div className={styles.syntaxCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.syntaxTag}>cube_syntax.sql</span>
                </div>
                <pre className={styles.codeSnippet}>
                  <code>
                    <span className={styles.kw}>SELECT</span> location, material,{'\n'}
                    {'  '}<span className={styles.fn}>SUM</span>(cost) <span className={styles.kw}>AS</span> budget,{'\n'}
                    {'  '}<span className={styles.fn}>GROUPING</span>(location) <span className={styles.kw}>AS</span> loc_rollup,{'\n'}
                    {'  '}<span className={styles.fn}>GROUPING</span>(material) <span className={styles.kw}>AS</span> mat_rollup{'\n'}
                    <span className={styles.kw}>FROM</span> construction_projects{'\n'}
                    <span className={styles.kwAccent}>GROUP BY CUBE</span>(location, material);
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

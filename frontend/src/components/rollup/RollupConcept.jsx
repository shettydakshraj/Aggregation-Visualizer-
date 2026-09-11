import { useState } from 'react';
import styles from './RollupConcept.module.css';

export default function RollupConcept() {
  const [activeTab, setActiveTab] = useState('ladder');
  const [orderSwap, setOrderSwap] = useState(false);

  return (
    <section id="concept-section" className={styles.section} aria-label="Hierarchical Concept">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 01 · Conceptual Architecture</p>
          <h2 className="display-lg">The N + 1 Subtotal Ladder</h2>
          <p className="body-lg">
            While basic <code>GROUP BY</code> only aggregates at a single flat granularity, <code>ROLLUP</code> produces 
            hierarchical subtotals from right to left, finishing with an overarching Grand Total.
          </p>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabBar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ladder' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('ladder')}
          >
            01 · The Subtotal Ladder
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'syntax' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('syntax')}
          >
            02 · Syntax &amp; GROUPING()
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'order' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('order')}
          >
            03 · Why Order Matters
          </button>
        </div>

        {/* Tab 1: The Subtotal Ladder */}
        {activeTab === 'ladder' && (
          <div className={styles.ladderGrid}>
            <div className={styles.tierCard} style={{ borderColor: 'rgba(200, 169, 110, 0.4)' }}>
              <div className={styles.tierBadge} style={{ background: 'var(--accent-warm-dim)', color: 'var(--accent-warm)' }}>
                Tier 3 · Apex Level
              </div>
              <h3 className={styles.tierTitle}>() &rarr; Grand Total</h3>
              <p className={styles.tierDesc}>
                All grouping columns are collapsed to <code>NULL</code>. Accumulates every record across the entire table.
              </p>
              <div className={styles.tierResult} style={{ color: 'var(--accent-warm)' }}>
                <span>Global Project Budget</span>
                <strong>₹3,370,000</strong>
              </div>
            </div>

            <div className={styles.tierCard} style={{ borderColor: 'rgba(79, 127, 255, 0.35)' }}>
              <div className={styles.tierBadge} style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                Tier 2 · Intermediate Subtotals
              </div>
              <h3 className={styles.tierTitle}>(location, NULL) &rarr; Subtotals</h3>
              <p className={styles.tierDesc}>
                The rightmost column (<code>material</code>) is collapsed to <code>NULL</code>. Yields subtotal expenditure per metropolitan zone.
              </p>
              <div className={styles.tierResult} style={{ color: 'var(--accent)' }}>
                <span>North District Subtotal</span>
                <strong>₹950,000</strong>
              </div>
            </div>

            <div className={styles.tierCard} style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className={styles.tierBadge} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
                Tier 1 · Detail Rows
              </div>
              <h3 className={styles.tierTitle}>(location, material) &rarr; Base</h3>
              <p className={styles.tierDesc}>
                Full granularity matching standard <code>GROUP BY</code>. Both location and material preserve discrete values.
              </p>
              <div className={styles.tierResult}>
                <span>North District + Steel</span>
                <strong>₹630,000</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Syntax & GROUPING() */}
        {activeTab === 'syntax' && (
          <div className={styles.syntaxBox}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeTitle}>ANSI SQL:1999 ROLLUP Clause</span>
            </div>
            <pre className={styles.codeBlock}>
              <code>
                <span className={styles.keyword}>SELECT</span>{'\n'}
                {'  '}<span className={styles.col}>location</span>,{'\n'}
                {'  '}<span className={styles.col}>material</span>,{'\n'}
                {'  '}<span className={styles.fn}>SUM</span>(<span className={styles.col}>cost</span>) <span className={styles.keyword}>AS</span> total_cost,{'\n'}
                {'  '}<span className={styles.fnAccent}>GROUPING</span>(<span className={styles.col}>material</span>) <span className={styles.keyword}>AS</span> is_location_subtotal,{'\n'}
                {'  '}<span className={styles.fnAccent}>GROUPING</span>(<span className={styles.col}>location</span>) <span className={styles.keyword}>AS</span> is_grand_total{'\n'}
                <span className={styles.keyword}>FROM</span> <span className={styles.col}>construction_projects</span>{'\n'}
                <span className={styles.keywordAccent}>GROUP BY ROLLUP</span> (<span className={styles.colAccent}>location</span>, <span className={styles.colAccent}>material</span>);
              </code>
            </pre>

            <div className={styles.calloutGrid}>
              <div className={styles.calloutItem}>
                <h4 className={styles.calloutTitle}>The GROUPING() Function</h4>
                <p>Returns <code>1</code> if a column was replaced with <code>NULL</code> because of a subtotal rollup, and <code>0</code> if the row is regular data. Essential for dynamic labels!</p>
              </div>
              <div className={styles.calloutItem}>
                <h4 className={styles.calloutTitle}>Why not multiple UNION ALLs?</h4>
                <p><code>UNION ALL</code> requires scanning the physical table 3 separate times. <code>ROLLUP</code> scans the table only ONCE in memory, multiplying throughput.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order Matters */}
        {activeTab === 'order' && (
          <div className={styles.orderWrapper}>
            <div className={styles.orderHeader}>
              <div>
                <h3 className={styles.orderTitle}>Hierarchy Dictates Subtotals</h3>
                <p className={styles.orderSubtitle}>
                  Unlike commutative math, <code>ROLLUP(A, B)</code> produces fundamentally different subtotals than <code>ROLLUP(B, A)</code>.
                </p>
              </div>
              <button 
                className={styles.swapBtn}
                onClick={() => setOrderSwap(s => !s)}
              >
                ⇄ Switch Hierarchy Order
              </button>
            </div>

            <div className={styles.orderComparison}>
              <div className={`${styles.orderCard} ${!orderSwap ? styles.orderCardActive : ''}`}>
                <div className={styles.orderBadge}>Hierarchy 1: Geography First</div>
                <code className={styles.codeSnippet}>GROUP BY ROLLUP (location, material)</code>
                <ul className={styles.setList}>
                  <li>✓ <code>(location, material)</code>: Cost per material in each location</li>
                  <li>✓ <code>(location, NULL)</code>: <strong>Location Subtotals</strong> (e.g. Total North District)</li>
                  <li>✓ <code>(NULL, NULL)</code>: Grand Total</li>
                </ul>
              </div>

              <div className={`${styles.orderCard} ${orderSwap ? styles.orderCardActive : ''}`}>
                <div className={styles.orderBadge}>Hierarchy 2: Material First</div>
                <code className={styles.codeSnippet}>GROUP BY ROLLUP (material, location)</code>
                <ul className={styles.setList}>
                  <li>✓ <code>(material, location)</code>: Cost per location for each material</li>
                  <li>✓ <code>(material, NULL)</code>: <strong>Material Subtotals</strong> (e.g. Total Steel across all zones)</li>
                  <li>✓ <code>(NULL, NULL)</code>: Grand Total</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

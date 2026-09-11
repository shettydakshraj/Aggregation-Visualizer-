import styles from './PlaygroundHero.module.css';

export default function PlaygroundHero({ templates = [], activeTemplateId, onSelectTemplate }) {
  return (
    <header className={styles.hero}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeText}>Phase 5 · Interactive Laboratory</span>
        </div>

        <h1 className={styles.title}>
          SQL <span className={styles.titleMono}>Playground</span>
        </h1>

        <p className={styles.subtitle}>
          Execute ANSI SQL queries against an in-browser relational engine. Experiment freely with
          GROUP BY, ROLLUP, CUBE, HAVING, and multi-table joins on Indian infrastructure datasets.
        </p>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span>Database:</span>
            <span className={styles.statNum}>AlaSQL v4 (In-Browser)</span>
          </div>
          <span className={styles.statDot} />
          <div className={styles.statItem}>
            <span>Tables:</span>
            <span className={styles.statNum}>3 Relational Sets</span>
          </div>
          <span className={styles.statDot} />
          <div className={styles.statItem}>
            <span>Currency:</span>
            <span className={styles.statNum}>Indian Rupees (₹)</span>
          </div>
        </div>

        <div className={styles.templateGroup}>
          <span className={styles.templateLabel}>Instant Query Presets:</span>
          <div className={styles.templatePills}>
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                className={`${styles.pill} ${activeTemplateId === tpl.id ? styles.pillActive : ''}`}
                onClick={() => onSelectTemplate(tpl)}
              >
                <span>{tpl.title}</span>
                <span className={styles.pillTag}>{tpl.badge}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

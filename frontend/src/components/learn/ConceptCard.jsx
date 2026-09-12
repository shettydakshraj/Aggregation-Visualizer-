import { useState } from 'react';
import styles from './ConceptCard.module.css';

export default function ConceptCard({ concept, badge, colorIndex = 1 }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(concept.syntax);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleCols = concept.constructionExample.sampleTable.length > 0
    ? Object.keys(concept.constructionExample.sampleTable[0])
    : [];

  return (
    <article className={`${styles.card} ${styles[`accent_${colorIndex}`]}`}>
      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.badge}>{badge}</span>
          <span className={styles.subtitle}>{concept.subtitle}</span>
        </div>
        <h3 className={styles.title}>{concept.title}</h3>
      </header>

      {/* Definition & Purpose */}
      <div className={styles.conceptBody}>
        <div className={styles.block}>
          <h4 className={styles.blockLabel}>Formal Definition</h4>
          <p className={styles.text}>{concept.definition}</p>
        </div>

        <div className={styles.block}>
          <h4 className={styles.blockLabel}>Core Purpose</h4>
          <p className={styles.text}>{concept.purpose}</p>
        </div>
      </div>

      {/* Syntax Box */}
      <div className={styles.codeSection}>
        <div className={styles.codeHeader}>
          <span className={styles.codeLabel}>SQL Syntax Specification</span>
          <button
            onClick={handleCopy}
            className={styles.copyBtn}
            aria-label="Copy SQL syntax to clipboard"
          >
            {copied ? '✓ Copied' : 'Copy Syntax'}
          </button>
        </div>
        <pre className={styles.codePre}>
          <code>{concept.syntax}</code>
        </pre>
      </div>

      {/* Construction Management Example */}
      <div className={styles.exampleSection}>
        <div className={styles.exampleHeader}>
          <span className={styles.exampleBadge}>Civil Engineering Scenario</span>
          <h4 className={styles.exampleTitle}>{concept.constructionExample.scenario}</h4>
          <p className={styles.exampleDesc}>{concept.constructionExample.description}</p>
        </div>

        {/* Responsive Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {sampleCols.map((col) => (
                  <th key={col}>
                    {col
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/_/g, ' ')
                      .toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {concept.constructionExample.sampleTable.map((row, rIdx) => {
                const isSubtotal = Object.values(row).some(
                  v => String(v).includes('Subtotal') || String(v).includes('Grand Total')
                );
                return (
                  <tr key={rIdx} className={isSubtotal ? styles.highlightRow : ''}>
                    {sampleCols.map((col) => (
                      <td key={col}>{String(row[col])}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.outputExplanation}>
          <span className={styles.explainIcon}>💡</span>
          <p>
            <strong>Output Analysis:</strong> {concept.constructionExample.outputExplanation}
          </p>
        </div>
      </div>

      {/* Comparative Differences */}
      <div className={styles.diffSection}>
        <h4 className={styles.diffTitle}>Key Architectural Distinctions</h4>
        <ul className={styles.diffList}>
          {concept.keyDifferences.map((item, idx) => (
            <li key={idx} className={styles.diffItem}>
              <span className={styles.checkBullet}>→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

import { useState } from 'react';
import styles from './PlaygroundEditor.module.css';

export default function PlaygroundEditor({
  query,
  onChangeQuery,
  onRun,
  onReset,
  latency,
  rowCount,
  error
}) {
  const [copied, setCopied] = useState(false);

  // Split query by newline for line numbers
  const lines = query.split('\n');
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
    }
  };

  const handleFormat = () => {
    // Basic formatting: ensure SQL keywords are capitalized and spaced
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'JOIN', 'LEFT JOIN',
      'RIGHT JOIN', 'INNER JOIN', 'ON', 'AS', 'AND', 'OR', 'ASC', 'DESC', 'ROLLUP',
      'CUBE', 'SUM', 'COUNT', 'AVG', 'MIN', 'MAX', 'COALESCE', 'CASE', 'WHEN', 'THEN',
      'ELSE', 'END', 'BETWEEN', 'LIKE'
    ];
    let formatted = query;
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, kw);
    });
    onChangeQuery(formatted);
  };

  return (
    <div className={styles.editorCard}>
      <div className={styles.editorHeader}>
        <div className={styles.fileIndicator}>
          <div className={styles.trafficLights} aria-hidden="true">
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
          <span className={styles.fileName}>query_workspace.sql</span>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.toolBtn} onClick={handleFormat} title="Capitalize & format keywords">
            <span>✨ Format</span>
          </button>
          <button type="button" className={styles.toolBtn} onClick={handleCopy} title="Copy SQL to clipboard">
            <span>{copied ? '✓ Copied!' : '📋 Copy'}</span>
          </button>
          <button type="button" className={styles.toolBtn} onClick={onReset} title="Reset to original query">
            <span>↺ Reset</span>
          </button>
        </div>
      </div>

      <div className={styles.editorMain}>
        <div className={styles.lineNumbers} aria-hidden="true">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>
        <textarea
          className={styles.textarea}
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          rows={Math.max(10, lines.length + 2)}
          placeholder="Write ANSI SQL query here..."
        />
      </div>

      <div className={styles.editorFooter}>
        <div className={styles.footerLeft}>
          <button type="button" className={styles.runBtn} onClick={onRun} id="btn-run-sql">
            <span>▶ Execute Query</span>
          </button>
          <span className={styles.keyHint}>Ctrl + Enter</span>
        </div>

        <div className={styles.statusArea}>
          {latency !== null && (
            <span className={styles.latencyBadge}>⚡ {latency.toFixed(1)}ms</span>
          )}
          {rowCount !== null && !error && (
            <span className={styles.rowCountBadge}>✓ {rowCount} rows</span>
          )}
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon}>⚠</span>
          <div>
            <strong>SQL Execution Error:</strong>
            <div>{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}

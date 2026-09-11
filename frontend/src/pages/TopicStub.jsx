import { useNavigate } from 'react-router-dom';
import styles from './TopicStub.module.css';

/**
 * Shared stub layout for topic pages (Group By, Rollup, Cube, Playground).
 * Phase 2 will replace these with full implementations.
 */
export default function TopicStub({ title, color, icon, description }) {
  const navigate = useNavigate();

  return (
    <main className={styles.page} style={{ '--topic-color': color }}>
      <div className={styles.content}>
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="Go back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M14 8H2M7 3L2 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <div className={styles.icon} aria-hidden="true">{icon}</div>
        <h1 className={`display-lg ${styles.title}`}>{title}</h1>
        <p className={`body-lg ${styles.desc}`}>{description}</p>

        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className="label">Coming in Phase 2</span>
        </div>
      </div>

      {/* Decorative background */}
      <div className={styles.bg} aria-hidden="true" />
    </main>
  );
}

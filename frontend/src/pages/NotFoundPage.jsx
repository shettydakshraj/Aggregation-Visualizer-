import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const QUICK_LINKS = [
  { label: 'GROUP BY', to: '/group-by' },
  { label: 'ROLLUP', to: '/rollup' },
  { label: 'CUBE', to: '/cube' },
  { label: 'Playground', to: '/playground' },
];

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page Not Found · SQL Visualizer';
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />

      <p className={styles.errorCode}>404</p>

      <h1 className={styles.title}>Query Returned No Rows</h1>
      <p className={styles.desc}>
        The page you're looking for doesn't exist — much like a{' '}
        <code>SELECT</code> against an empty table. Let's get you back to the
        main learning path.
      </p>

      <div className={styles.actions}>
        <Link to="/" className={styles.primaryBtn}>
          <span>↩ Back to Home</span>
        </Link>
        <Link to="/playground" className={styles.secondaryBtn}>
          <span>▶ Open Playground</span>
        </Link>
      </div>

      <div className={styles.quickLinks}>
        <span className={styles.quickLabel}>Jump to a chapter</span>
        {QUICK_LINKS.map(({ label, to }) => (
          <Link key={to} to={to} className={styles.quickLink}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

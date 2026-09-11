import { Link } from 'react-router-dom';
import styles from './SiteFooter.module.css';

const TOPICS = [
  { label: 'GROUP BY', to: '/group-by', badge: 'Phase 2', color: '#4F7FFF' },
  { label: 'ROLLUP',   to: '/rollup',   badge: 'Phase 3', color: '#C8A96E' },
  { label: 'CUBE',     to: '/cube',     badge: 'Phase 4', color: '#7FCC8A' },
  { label: 'Playground', to: '/playground', badge: 'Phase 5', color: '#FF7F8A' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span>SQL</span>
              <span className={styles.logoDelta}>∇</span>
            </Link>
            <p className={styles.brandDesc}>
              An interactive, cinematic platform for learning SQL aggregation —
              GROUP BY, ROLLUP, CUBE, and beyond — through 3D visualizations and
              a live in-browser SQL laboratory.
            </p>
            <div className={styles.techPills}>
              <span className={styles.techPill}>React 19</span>
              <span className={styles.techPill}>Three.js</span>
              <span className={styles.techPill}>AlaSQL</span>
              <span className={styles.techPill}>GSAP</span>
              <span className={styles.techPill}>Vite</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className={styles.navCol} aria-label="Footer navigation">
            <span className={styles.colLabel}>Chapters</span>
            <Link to="/" className={styles.footerLink}>
              <span>Landing — Learning Path</span>
            </Link>
            {TOPICS.map(({ label, to, badge }) => (
              <Link key={to} to={to} className={styles.footerLink}>
                <span>{label}</span>
                <span className={styles.linkBadge}>{badge}</span>
              </Link>
            ))}
          </nav>

          {/* Project Info */}
          <div className={styles.infoCol}>
            <span className={styles.colLabel}>Project Info</span>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Subject</span>
              <span className={styles.infoValue}>Database Management Systems (DBMS)</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Institution</span>
              <span className={styles.infoValue}>VIT — Semester 3</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>SQL Engine</span>
              <span className={styles.infoValue}>AlaSQL v4 (In-Browser, Zero Setup)</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Currency</span>
              <span className={styles.infoValue}>Indian Rupees (₹)</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © {year} SQL Aggregation Visualizer · DBMS Project
          </p>
          <p className={styles.madeWith}>
            Built with <span className={styles.heart}>♥</span> for DBMS
          </p>
        </div>
      </div>
    </footer>
  );
}

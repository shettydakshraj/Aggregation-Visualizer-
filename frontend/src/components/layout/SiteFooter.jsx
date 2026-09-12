import { Link } from 'react-router-dom';
import styles from './SiteFooter.module.css';

const TOPICS = [
  { label: 'GROUP BY', to: '/group-by', badge: '1D Buckets', color: '#4F7FFF' },
  { label: 'ROLLUP',   to: '/rollup',   badge: 'Hierarchy',  color: '#C8A96E' },
  { label: 'CUBE',     to: '/cube',     badge: 'OLAP Hypercube', color: '#7FCC8A' },
  { label: 'Playground', to: '/playground', badge: 'Live SQL', color: '#FF7F8A' },
];

const ACADEMIC_LINKS = [
  { label: 'Learn Curriculum', to: '/learn' },
  { label: 'User Manual (Help)', to: '/help' },
  { label: 'Developed By Team', to: '/developed-by' },
  { label: 'Download Report', to: '/download' },
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
          <nav className={styles.navCol} aria-label="Footer topics navigation">
            <span className={styles.colLabel}>Core Chapters</span>
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

          {/* Academic Modules */}
          <nav className={styles.navCol} aria-label="Footer academic modules">
            <span className={styles.colLabel}>Academic Modules</span>
            {ACADEMIC_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className={styles.footerLink}>
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Project Info */}
          <div className={styles.infoCol}>
            <span className={styles.colLabel}>Project Supervision</span>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Guided By</span>
              <span className={styles.infoValue}>Dr. Swaminathan A (Assistant Professor)</span>
            </div>
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
              <span className={styles.infoValue}>AlaSQL (In-Browser Execution)</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © {year} SQL Aggregation Visualizer · DBMS Academic Project
          </p>
          <p className={styles.madeWith}>
            Guided by Dr. Swaminathan A &middot; VIT
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DownloadModal from '../download/DownloadModal';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'GROUP BY',     to: '/group-by' },
  { label: 'ROLLUP',       to: '/rollup' },
  { label: 'CUBE',         to: '/cube' },
  { label: 'Playground',   to: '/playground' },
  { label: 'Learn',        to: '/learn' },
  { label: 'Help',         to: '/help' },
  { label: 'Developed By', to: '/developed-by' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sql_visualizer_theme') || 'dark';
  });
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sql_visualizer_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="SQL Visualizer home">
            <span className={styles.logoMark}>SQL</span>
            <span className={styles.logoDelta}>∇</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`${styles.link} ${location.pathname === to ? styles.linkActive : ''}`}
                >
                  {/* Slot-swap on hover — two stacked spans */}
                  <span className={styles.linkText} aria-hidden="true">{label}</span>
                  <span className={styles.linkTextHover}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Action controls: Download, Theme Toggle & Hamburger */}
          <div className={styles.navActions}>
            {/* Prominent Download Button */}
            <Link
              to="/download"
              className={`${styles.downloadBtn} ${location.pathname === '/download' ? styles.downloadBtnActive : ''}`}
              title="Download academic evaluation report"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download</span>
            </Link>

            {/* Quick Export Popup Trigger */}
            <button
              onClick={() => setDownloadModalOpen(true)}
              className={styles.quickExportBtn}
              aria-label="Open quick export dialog"
              title="Quick Export (PDF / Word / Text)"
            >
              ⚡
            </button>

            {/* Day / Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                /* Sun Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Moon Icon */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className={styles.hamburger}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
          <ul role="list" className={styles.drawerLinks}>
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={styles.drawerLink}>{label}</Link>
              </li>
            ))}
            <li>
              <Link to="/download" className={styles.drawerLinkSpecial}>Download Report ↗</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Global Quick Export Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </>
  );
}

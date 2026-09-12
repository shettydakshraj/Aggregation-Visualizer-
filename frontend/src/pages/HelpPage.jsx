import { useState, useEffect } from 'react';
import SiteFooter from '../components/layout/SiteFooter';
import { HELP_STEPS } from '../data/helpManualData';
import styles from './HelpPage.module.css';

export default function HelpPage() {
  const [activeStepId, setActiveStepId] = useState(HELP_STEPS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Help & User Manual — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  const filteredSteps = HELP_STEPS.filter((step) => {
    const q = searchQuery.toLowerCase();
    return (
      step.title.toLowerCase().includes(q) ||
      step.summary.toLowerCase().includes(q) ||
      step.details.some(d => d.toLowerCase().includes(q))
    );
  });

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="label">Step-by-Step Guidance</span>
            <h1 className={styles.heroTitle}>
              User Manual &amp; <span className={styles.gradientText}>System Guide</span>
            </h1>
            <p className={styles.heroDesc}>
              A comprehensive walk-through designed for students and researchers. Learn how to navigate
              topics, provide custom queries, inspect internal engine processing, and download academic reports.
            </p>

            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search user manual (e.g., 'inputs', 'Day/Night', 'subtotal', 'download')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search user manual"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearBtn}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.manualLayout}>
            {/* Table of Contents Sticky Sidebar */}
            <aside className={styles.tocSidebar} aria-label="Manual Table of Contents">
              <div className={styles.tocHeader}>
                <span className={styles.tocTitle}>Table of Contents</span>
                <span className={styles.tocCount}>{filteredSteps.length} / 9 Steps</span>
              </div>

              <nav className={styles.tocList}>
                {HELP_STEPS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveStepId(item.id);
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`${styles.tocItem} ${activeStepId === item.id ? styles.tocItemActive : ''}`}
                  >
                    <span className={styles.tocStepNum}>0{item.step}</span>
                    <span className={styles.tocLabel}>{item.title}</span>
                  </button>
                ))}
              </nav>

              <div className={styles.quickCard}>
                <div className={styles.quickCardIcon}>💡</div>
                <div className={styles.quickCardText}>
                  <strong>Need to test queries?</strong> Visit the live Playground to run interactive SQL statements.
                </div>
              </div>
            </aside>

            {/* Steps Content Stream */}
            <div className={styles.stepsStream}>
              {filteredSteps.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No help topics matched your search "{searchQuery}".</p>
                  <button onClick={() => setSearchQuery('')} className={styles.resetBtn}>
                    Reset Search Filter
                  </button>
                </div>
              ) : (
                filteredSteps.map((step) => (
                  <section
                    key={step.id}
                    id={step.id}
                    className={styles.stepSection}
                    aria-label={`Step ${step.step}: ${step.title}`}
                  >
                    <div className={styles.stepBadgeRow}>
                      <span className={styles.stepNumberBadge}>Step {step.step} of 9</span>
                      <span className={styles.stepDomainBadge}>{step.badge}</span>
                    </div>

                    <h2 className={styles.stepHeading}>{step.title}</h2>
                    <p className={styles.stepSummary}>{step.summary}</p>

                    <div className={styles.detailsList}>
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className={styles.detailCard}>
                          <span className={styles.detailBullet}>✓</span>
                          <span className={styles.detailText}>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {step.tip && (
                      <div className={styles.proTipBox}>
                        <span className={styles.tipIcon}>⚡</span>
                        <div className={styles.tipContent}>
                          <strong>Pro Tip:</strong> {step.tip}
                        </div>
                      </div>
                    )}
                  </section>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

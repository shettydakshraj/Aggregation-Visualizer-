import styles from './YouTubeLesson.module.css';

export default function YouTubeLesson() {
  const timestamps = [
    { time: '00:00', title: 'Why GROUP BY is Necessary in Real-World DBs' },
    { time: '02:15', title: 'Collapsing Rows & Duplicate Key Resolution' },
    { time: '05:40', title: 'Aggregating with SUM, AVG, and COUNT' },
    { time: '08:30', title: 'The HAVING Clause vs WHERE filtering' },
    { time: '11:15', title: 'Common Traps: Non-aggregated columns in SELECT' },
  ];

  return (
    <section id="video-section" className={styles.section} aria-label="Video Lesson">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 02 · Guided Visual Lesson</p>
          <h2 className="display-lg">Mastering GROUP BY in 12 Minutes</h2>
          <p className="body-lg">
            Watch this curated breakdown of row partitioning, aggregate execution, and real production SQL patterns.
          </p>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.playerWrapper}>
            <iframe
              className={styles.iframe}
              src="https://www.youtube-nocookie.com/embed/VQf0V6Wwbf4?rel=0"
              title="GROUP BY and HAVING Clause in SQL — Neso Academy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.metaSidebar}>
            <div className={styles.channelInfo}>
              <div className={styles.avatar}>SQL</div>
              <div>
                <h3 className={styles.videoTitle}>GROUP BY &amp; HAVING Essentials</h3>
                <span className={styles.authorName}>Neso Academy · Verified Academic Curriculum</span>
              </div>
            </div>

            <p className={styles.summaryText}>
              Learn how the database engine interprets your grouping keys, sorts row partitions in memory, and maps 
              aggregate mathematical accumulators to compute instant summary totals.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <a
                href="https://www.youtube.com/watch?v=VQf0V6Wwbf4"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--accent)',
                  textDecoration: 'none'
                }}
              >
                Watch on YouTube ↗
              </a>
            </div>

            <div className={styles.timestampsHeader}>
              <span className={styles.tsBadge}>Key Chapter Milestones</span>
            </div>

            <ul className={styles.timestampList}>
              {timestamps.map((item, idx) => (
                <li key={idx} className={styles.timestampItem}>
                  <span className={styles.timeTag}>{item.time}</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

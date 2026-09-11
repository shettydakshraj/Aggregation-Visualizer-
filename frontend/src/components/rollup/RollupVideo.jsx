import styles from './RollupVideo.module.css';

export default function RollupVideo() {
  const milestones = [
    { time: '00:00', title: 'Why Flat GROUP BY Fails at Reporting Subtotals' },
    { time: '02:45', title: 'The ROLLUP Mechanism & Progressive Level Truncation' },
    { time: '06:10', title: 'Super-Aggregate Rows & The NULL Identification Trap' },
    { time: '09:20', title: 'Using GROUPING() and GROUPING_ID() Functions' },
    { time: '13:00', title: 'Comparing Query Cost: 1 Table Scan vs Multiple UNIONs' },
  ];

  return (
    <section id="video-section" className={styles.section} aria-label="Video Lesson">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 02 · Guided Visual Masterclass</p>
          <h2 className="display-lg">Demystifying ROLLUP Subtotals</h2>
          <p className="body-lg">
            A comprehensive visual breakdown of multi-level hierarchical grouping sets and the GROUPING() mask.
          </p>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.playerWrapper}>
            <iframe
              className={styles.iframe}
              src="https://www.youtube-nocookie.com/embed/3243y8GgH1A?rel=0&modestbranding=1"
              title="SQL ROLLUP and CUBE Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.metaSidebar}>
            <div className={styles.channelInfo}>
              <div className={styles.avatar}>Σ▲</div>
              <div>
                <h3 className={styles.videoTitle}>ROLLUP &amp; Hierarchy Architecture</h3>
                <span className={styles.authorName}>Curated Curriculum Video</span>
              </div>
            </div>

            <p className={styles.summaryText}>
              Watch how the query optimizer evaluates super-aggregate grouping sets, handles NULL values generated 
              by subtotal rollups, and calculates grand totals in a single table scan.
            </p>

            <div className={styles.timestampsHeader}>
              <span className={styles.tsBadge}>Curriculum Milestones</span>
            </div>

            <ul className={styles.timestampList}>
              {milestones.map((item, idx) => (
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

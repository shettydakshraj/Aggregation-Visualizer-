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
              src="https://www.youtube-nocookie.com/embed/9rTz2puvgjg?rel=0&modestbranding=1"
              title="SQL GROUP BY and HAVING Clause Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.metaSidebar}>
            <div className={styles.channelInfo}>
              <div className={styles.avatar}>SQL</div>
              <div>
                <h3 className={styles.videoTitle}>GROUP BY &amp; HAVING Essentials</h3>
                <span className={styles.authorName}>Curated Curriculum Video</span>
              </div>
            </div>

            <p className={styles.summaryText}>
              Learn how the database engine interprets your grouping keys, sorts row partitions in memory, and maps 
              aggregate mathematical accumulators to compute instant summary totals.
            </p>

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

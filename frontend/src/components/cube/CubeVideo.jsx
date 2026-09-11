import styles from './CubeVideo.module.css';

export default function CubeVideo() {
  const milestones = [
    { time: '00:00', title: 'The Problem with Single-Hierarchy Rollups' },
    { time: '03:15', title: 'Mathematical Power Sets: Calculating 2ⁿ Grouping Sets' },
    { time: '06:40', title: 'Cross-Dimensional Slicing & Material-Only Subtotals' },
    { time: '10:25', title: 'Syntax: CUBE vs GROUPING SETS Equivalence' },
    { time: '14:10', title: 'Data Warehouse Best Practices: Avoiding 2ⁿ Performance Explosions' },
  ];

  return (
    <section id="video-section" className={styles.section} aria-label="Video Lesson">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 02 · Guided Visual Masterclass</p>
          <h2 className="display-lg">The Complete Guide to SQL CUBE</h2>
          <p className="body-lg">
            Master the mathematical formulation of multidimensional grouping sets and learn how enterprise 
            analytics engines optimize cross-tabulated queries.
          </p>
        </div>

        <div className={styles.videoCard}>
          <div className={styles.playerWrapper}>
            <iframe
              className={styles.iframe}
              src="https://www.youtube-nocookie.com/embed/3243y8GgH1A?rel=0&start=360&modestbranding=1"
              title="SQL CUBE and Multidimensional Aggregation Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.metaSidebar}>
            <div className={styles.channelInfo}>
              <div className={styles.avatar}>⬡³</div>
              <div>
                <h3 className={styles.videoTitle}>CUBE &amp; OLAP Hypercubes</h3>
                <span className={styles.authorName}>Curated Curriculum Video</span>
              </div>
            </div>

            <p className={styles.summaryText}>
              Discover how CUBE traverses orthogonal dimensions to generate cross-sectional subtotals 
              without requiring separate queries or complex joins.
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

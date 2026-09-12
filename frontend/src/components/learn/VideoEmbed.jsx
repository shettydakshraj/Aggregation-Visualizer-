import { useState } from 'react';
import styles from './VideoEmbed.module.css';

export default function VideoEmbed({ video, topicLabel }) {
  const [loadError, setLoadError] = useState(false);

  if (!video || !video.verified) {
    return (
      <div className={styles.placeholderContainer}>
        <div className={styles.placeholderContent}>
          <span className={styles.placeholderIcon}>📹</span>
          <h4 className={styles.placeholderTitle}>Verified Educational Video</h4>
          <p className={styles.placeholderText}>
            Verified educational video will be added by the project team for {topicLabel}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoCard}>
      <div className={styles.playerContainer}>
        <div className={styles.aspectRatioWrapper}>
          {!loadError ? (
            <iframe
              className={styles.iframe}
              src={video.embedUrl}
              title={`${video.title} — ${video.channel}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onError={() => setLoadError(true)}
            />
          ) : (
            <div className={styles.fallbackBox}>
              <p>Unable to load embedded video player in this environment.</p>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackBtn}
              >
                Watch on YouTube ↗
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={styles.videoMeta}>
        <div className={styles.headerRow}>
          <div className={styles.channelBadge}>
            <span className={styles.verifiedDot}>●</span>
            <span>{video.channel}</span>
          </div>
          <span className={styles.durationTag}>Curated {video.duration || 'Tutorial'}</span>
        </div>

        <h4 className={styles.videoTitle}>{video.title}</h4>

        <p className={styles.relevanceText}>
          <span className={styles.relevanceLabel}>Academic Relevance:</span> {video.relevance}
        </p>

        <div className={styles.actions}>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeLink}
          >
            Watch on YouTube ↗
          </a>
        </div>
      </div>
    </div>
  );
}

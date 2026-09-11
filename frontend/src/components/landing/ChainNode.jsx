import { useNavigate } from 'react-router-dom';
import styles from './ChainNode.module.css';

export default function ChainNode({ node, index, isActive, isCurrent }) {
  const navigate = useNavigate();
  const isLeft = node.side === 'left';

  return (
    <div
      id={`chain-node-${node.id}`}
      className={`${styles.row} ${isLeft ? styles.rowLeft : styles.rowRight}`}
      style={{ '--node-color': node.color }}
    >
      {/* Spacer for zigzag */}
      <div className={styles.spacer} />

      {/* Node circle + connector dots */}
      <div className={styles.nodeCol}>
        {/* Pulse ring when active */}
        {isCurrent && (
          <span className={styles.pulseRing} aria-hidden="true" />
        )}

        <button
          className={`${styles.node} ${isActive ? styles.nodeActive : ''} ${isCurrent ? styles.nodeCurrent : ''}`}
          onClick={() => navigate(`/${node.slug}`)}
          aria-label={`Open ${node.label} chapter`}
        >
          <span className={styles.nodeIcon} aria-hidden="true">{node.icon}</span>
          <span className={styles.nodeNumber} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </button>
      </div>

      {/* Card */}
      <div className={`${styles.card} ${isActive ? styles.cardActive : ''}`}>
        <div className={styles.cardInner}>
          <p className={`label ${styles.cardTagline}`}>{node.tagline}</p>
          <h3 className={styles.cardTitle}>{node.label}</h3>
          <p className={styles.cardDesc}>{node.description}</p>

          <button
            className={styles.cardCta}
            onClick={() => navigate(`/${node.slug}`)}
            id={`node-cta-${node.slug}`}
          >
            <span>Open Chapter</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Decorative accent line */}
        <div
          className={styles.cardAccent}
          style={{ background: `linear-gradient(90deg, ${node.color}, transparent)` }}
        />
      </div>
    </div>
  );
}

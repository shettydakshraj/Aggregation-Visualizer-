import styles from './Quiz.module.css';

export default function QuizNavigator({
  questions,
  currentIndex,
  answers,
  onJumpToQuestion,
  onOpenSubmitModal
}) {
  const total = questions.length;
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;
  const unansweredCount = total - answeredCount;
  const progressPercent = total > 0 ? (answeredCount / total) * 100 : 0;

  return (
    <aside className={styles.sidebarCard}>
      {/* Progress Track */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>Progress</span>
          <span>{answeredCount} of {total} answered</span>
        </div>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Answered & Unanswered Metric Boxes */}
      <div className={styles.statusRow}>
        <div className={styles.statusItem}>
          <span className={`${styles.statusNum} ${styles.statusNumAnswered}`}>
            {answeredCount}
          </span>
          <span className={styles.statusLabel}>Answered</span>
        </div>
        <div className={styles.statusItem}>
          <span className={`${styles.statusNum} ${styles.statusNumUnanswered}`}>
            {unansweredCount}
          </span>
          <span className={styles.statusLabel}>Unanswered</span>
        </div>
      </div>

      {/* Question Navigator Grid */}
      <div className={styles.paletteSection}>
        <div className={styles.paletteTitle}>Question Navigator</div>
        <div className={styles.paletteGrid} role="navigation" aria-label="Question grid">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
            const isCurrent = idx === currentIndex;

            let btnClass = styles.paletteBtn;
            if (isAnswered) btnClass += ` ${styles.paletteAnswered}`;
            if (isCurrent) btnClass += ` ${styles.paletteCurrent}`;

            return (
              <button
                key={q.id || idx}
                type="button"
                className={btnClass}
                onClick={() => onJumpToQuestion(idx)}
                aria-label={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                title={`Question ${idx + 1} (${isAnswered ? 'Answered' : 'Unanswered'})`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigator Legend */}
      <div className={styles.legendRow}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotCurrent}`} />
          <span>Current</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotAnswered}`} />
          <span>Answered</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotUnanswered}`} />
          <span>Unanswered</span>
        </div>
      </div>

      {/* Quick Finish Button in Sidebar */}
      <div className={styles.sidebarAction}>
        <button
          type="button"
          className={styles.sidebarFinishBtn}
          onClick={onOpenSubmitModal}
        >
          Submit Exam Early →
        </button>
      </div>
    </aside>
  );
}

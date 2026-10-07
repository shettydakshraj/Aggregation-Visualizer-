import styles from './Quiz.module.css';

export default function QuizSubmitModal({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  onCancel,
  onConfirm
}) {
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalCard}>
        <div className={styles.modalIcon} aria-hidden="true">
          📋
        </div>
        <h3 id="modal-title" className={styles.modalTitle}>
          Submit Quiz?
        </h3>
        <p className={styles.modalDesc}>
          Are you sure you want to finish and submit your exam? Once submitted, your score will be calculated and answers revealed.
        </p>

        {/* Answer status recap */}
        <div className={styles.modalStatsGrid}>
          <div className={styles.modalStatBox}>
            <span className={`${styles.modalStatNum} ${styles.statusNumAnswered}`}>
              {answeredCount}
            </span>
            <span className={styles.modalStatLabel}>Answered</span>
          </div>
          <div className={styles.modalStatBox}>
            <span className={`${styles.modalStatNum} ${styles.statusNumUnanswered}`}>
              {unansweredCount}
            </span>
            <span className={styles.modalStatLabel}>Unanswered</span>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.modalCancelBtn}
            onClick={onCancel}
          >
            Continue Test
          </button>
          <button
            type="button"
            className={styles.modalConfirmBtn}
            onClick={onConfirm}
          >
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
}

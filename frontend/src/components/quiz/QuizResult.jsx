import { formatTime } from './quizUtils';
import {
  downloadQuizPdf,
  downloadQuizDocx,
  downloadQuizTxt
} from '../../services/quizExportService';
import styles from './Quiz.module.css';

export default function QuizResult({
  resultData,
  config,
  dateString,
  autoSubmitted,
  onPrint,
  onRetake,
  onChangeSettings
}) {
  const {
    total,
    attempted,
    unanswered,
    correct,
    incorrect,
    score,
    percentage,
    timeUsedSeconds,
    timeRemainingSeconds,
    topicBreakdown,
    difficultyBreakdown
  } = resultData;

  return (
    <div className={styles.resultCard}>
      {/* Auto Submission Alert if timeout occurred */}
      {autoSubmitted && (
        <div className={styles.autoSubmitNotice} role="alert">
          <span>⏰</span>
          <span>
            <strong>Time is up.</strong> Your quiz has been submitted automatically.
          </span>
        </div>
      )}

      {/* Result Card Header */}
      <div className={styles.resultHeader}>
        <div>
          <h2 className={styles.resultTitle}>Examination Result</h2>
          <div className={styles.resultMetaInfo}>
            Academic Evaluation Summary · SQL Aggregation Visualizer
          </div>
        </div>
        <div className={styles.configCountBadge}>
          <span>🎓</span>
          <span>Score: {score} / {total} ({percentage}%)</span>
        </div>
      </div>

      {/* KPI Metric Scorecards */}
      <div className={styles.kpiGrid}>
        <div className={`${styles.kpiBox} ${styles.kpiBoxScore}`}>
          <span className={styles.kpiNum}>{score} / {total}</span>
          <span className={styles.kpiLabel}>Final Score</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={styles.kpiNum}>{percentage}%</span>
          <span className={styles.kpiLabel}>Percentage</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={`${styles.kpiNum} ${styles.kpiNumGreen}`}>{correct}</span>
          <span className={styles.kpiLabel}>Correct</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={`${styles.kpiNum} ${styles.kpiNumRed}`}>{incorrect}</span>
          <span className={styles.kpiLabel}>Incorrect</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={styles.kpiNum}>{unanswered}</span>
          <span className={styles.kpiLabel}>Unanswered</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={styles.kpiNum}>{attempted}</span>
          <span className={styles.kpiLabel}>Attempted</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={styles.kpiNum}>{formatTime(timeUsedSeconds)}</span>
          <span className={styles.kpiLabel}>Time Used</span>
        </div>

        <div className={styles.kpiBox}>
          <span className={styles.kpiNum}>{formatTime(timeRemainingSeconds)}</span>
          <span className={styles.kpiLabel}>Time Remaining</span>
        </div>
      </div>

      {/* Performance by Topic (Dynamic) */}
      <div className={styles.breakdownSection}>
        <div className={styles.breakdownTitle}>
          <span>📊</span>
          <span>Performance by Syllabus Topic</span>
        </div>
        <div className={styles.breakdownGrid}>
          {topicBreakdown.map((t) => {
            const percent = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
            return (
              <div key={t.topic} className={styles.breakdownCard}>
                <div className={styles.breakdownCardHeader}>
                  <span className={styles.breakdownCategory}>{t.topic}</span>
                  <span className={styles.breakdownScore}>
                    {t.correct} / {t.total} Correct
                  </span>
                </div>
                <div className={styles.breakdownBarTrack}>
                  <div
                    className={styles.breakdownBarFill}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className={styles.breakdownPercent}>
                  Accuracy: {t.attempted > 0 ? `${t.accuracy}%` : 'N/A'} (Score: {percent}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance by Difficulty (Dynamic) */}
      <div className={styles.breakdownSection}>
        <div className={styles.breakdownTitle}>
          <span>⚡</span>
          <span>Performance by Difficulty</span>
        </div>
        <div className={styles.breakdownGrid}>
          {difficultyBreakdown.map((d) => {
            const percent = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
            return (
              <div key={d.difficulty} className={styles.breakdownCard}>
                <div className={styles.breakdownCardHeader}>
                  <span className={styles.breakdownCategory}>{d.difficulty}</span>
                  <span className={styles.breakdownScore}>
                    {d.correct} / {d.total} Correct
                  </span>
                </div>
                <div className={styles.breakdownBarTrack}>
                  <div
                    className={styles.breakdownBarFill}
                    style={{
                      width: `${percent}%`,
                      background:
                        d.difficulty === 'Easy'
                          ? 'var(--accent-green)'
                          : d.difficulty === 'Medium'
                          ? 'var(--accent-warm)'
                          : 'var(--accent-red)'
                    }}
                  />
                </div>
                <div className={styles.breakdownPercent}>
                  {percent}% achieved
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Action Buttons */}
      <div className={styles.resultActions}>
        {config && (
          <>
            <button
              type="button"
              className={styles.printBtn}
              onClick={() => downloadQuizPdf(config, resultData, dateString)}
              title="Download official PDF report"
            >
              <span>📄</span>
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              className={styles.printBtn}
              onClick={() => downloadQuizDocx(config, resultData, dateString)}
              title="Download Microsoft Word (.docx) document"
            >
              <span>📝</span>
              <span>Download DOCX</span>
            </button>

            <button
              type="button"
              className={styles.printBtn}
              onClick={() => downloadQuizTxt(config, resultData, dateString)}
              title="Download Plain Text (.txt) report"
            >
              <span>📋</span>
              <span>Download TXT</span>
            </button>
          </>
        )}

        <button
          type="button"
          className={styles.printBtn}
          onClick={onPrint}
        >
          <span>🖨️</span>
          <span>Print Result</span>
        </button>

        <button
          type="button"
          className={styles.retakeBtn}
          onClick={onRetake}
        >
          <span>↺</span>
          <span>Retake Quiz</span>
        </button>

        <button
          type="button"
          className={styles.settingsBtn}
          onClick={onChangeSettings}
        >
          <span>⚙</span>
          <span>Change Quiz Settings</span>
        </button>
      </div>
    </div>
  );
}

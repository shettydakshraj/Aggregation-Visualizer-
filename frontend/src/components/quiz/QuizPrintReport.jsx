import { formatTime } from './quizUtils';
import styles from './Quiz.module.css';

export default function QuizPrintReport({
  config,
  resultData,
  dateString
}) {
  if (!resultData) return null;

  const {
    total,
    attempted,
    unanswered,
    correct,
    incorrect,
    score,
    percentage,
    timeUsedSeconds,
    topicBreakdown,
    difficultyBreakdown,
    questionReviews
  } = resultData;

  const summaryTopics = config.selectedTopics.includes('All Topics')
    ? 'All Topics (Full Syllabus)'
    : config.selectedTopics.join(', ');

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className={styles.printOnlyContainer} aria-hidden="true">
      {/* Official Header */}
      <div className={styles.printHeader}>
        <div className={styles.printInstitution}>
          VIT — School of Computer Science &amp; Engineering
        </div>
        <div className={styles.printTitle}>
          SQL AGGREGATION QUIZ · EXAMINATION REPORT
        </div>
        <div className={styles.printSubtitle}>
          Course: Database Management Systems (DBMS) · Interactive Visualizer Evaluation
        </div>
      </div>

      {/* Quiz Configuration Metadata */}
      <table className={styles.printMetaTable}>
        <tbody>
          <tr>
            <td><strong>Date &amp; Time:</strong> {dateString}</td>
            <td><strong>Syllabus Topics:</strong> {summaryTopics}</td>
          </tr>
          <tr>
            <td><strong>Difficulty Level:</strong> {config.difficulty}</td>
            <td><strong>Question Source:</strong> {config.source}</td>
          </tr>
          <tr>
            <td><strong>Total Questions:</strong> {total}</td>
            <td><strong>Time Limit:</strong> {config.timePreset || config.customMinutes || 30} minutes</td>
          </tr>
        </tbody>
      </table>

      {/* Overall Results Table */}
      <div className={styles.printSectionTitle}>1. Overall Evaluation Summary</div>
      <table className={styles.printSummaryTable}>
        <thead>
          <tr>
            <th>Score</th>
            <th>Percentage</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Unanswered</th>
            <th>Time Spent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{score} / {total}</strong></td>
            <td><strong>{percentage}%</strong></td>
            <td>{attempted}</td>
            <td>{correct}</td>
            <td>{incorrect}</td>
            <td>{unanswered}</td>
            <td>{formatTime(timeUsedSeconds)}</td>
          </tr>
        </tbody>
      </table>

      {/* Syllabus Topic Performance */}
      <div className={styles.printSectionTitle}>2. Topic-Wise Performance Breakdown</div>
      <table className={styles.printSummaryTable}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Questions</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Score %</th>
            <th>Accuracy %</th>
          </tr>
        </thead>
        <tbody>
          {topicBreakdown.map((t) => (
            <tr key={t.topic}>
              <td><strong>{t.topic}</strong></td>
              <td>{t.total}</td>
              <td>{t.attempted}</td>
              <td>{t.correct}</td>
              <td>{t.scorePercentage}%</td>
              <td>{t.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Difficulty Breakdown */}
      <div className={styles.printSectionTitle}>3. Difficulty-Wise Performance</div>
      <table className={styles.printSummaryTable}>
        <thead>
          <tr>
            <th>Difficulty</th>
            <th>Total Questions</th>
            <th>Attempted</th>
            <th>Correct</th>
            <th>Score %</th>
          </tr>
        </thead>
        <tbody>
          {difficultyBreakdown.map((d) => (
            <tr key={d.difficulty}>
              <td><strong>{d.difficulty}</strong></td>
              <td>{d.total}</td>
              <td>{d.attempted}</td>
              <td>{d.correct}</td>
              <td>{d.scorePercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detailed Question Review */}
      <div className={styles.printSectionTitle}>4. Detailed Question Review</div>
      {questionReviews.map((r) => {
        const {
          index,
          question,
          selectedOption,
          isAnswered,
          isCorrect,
          correctAnswer,
          options,
          explanation,
          solution
        } = r;

        const studentAnsText = isAnswered
          ? `${optionLetters[selectedOption]}. ${options[selectedOption]}`
          : 'None (Unanswered)';

        const correctAnsText = `${optionLetters[correctAnswer]}. ${options[correctAnswer]}`;

        return (
          <div key={index} className={styles.printQuestionItem}>
            <div className={styles.printQHeader}>
              <span>Question {index + 1} ({question.topic} · {question.difficulty})</span>
              <span>{isCorrect ? '[ CORRECT: +1 ]' : isAnswered ? '[ INCORRECT: 0 ]' : '[ UNANSWERED: 0 ]'}</span>
            </div>

            <div className={styles.printQText}>{question.question}</div>

            {question.sql && (
              <pre style={{ fontSize: '8.5pt', background: '#F0F0F0', padding: '6px', margin: '4px 0' }}>
                <code>{question.sql}</code>
              </pre>
            )}

            <div className={styles.printOptionsList}>
              {options.map((opt, optIdx) => (
                <div key={optIdx}>
                  <strong>{optionLetters[optIdx]}.</strong> {opt}
                </div>
              ))}
            </div>

            <div className={styles.printOutcome}>
              <div><strong>Your Answer:</strong> {studentAnsText}</div>
              <div><strong>Correct Answer:</strong> {correctAnsText}</div>
            </div>

            {explanation && (
              <div className={styles.printExplanation}>
                <strong>Explanation:</strong> {explanation}
              </div>
            )}

            {solution && (
              <div className={styles.printExplanation}>
                <strong>Step-by-Step Solution:</strong> {solution}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

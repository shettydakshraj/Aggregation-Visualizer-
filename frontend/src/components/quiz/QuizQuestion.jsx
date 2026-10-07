import { useState } from 'react';
import styles from './Quiz.module.css';
import { formatQuestionSource } from '../../utils/questionSource';

export default function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectOption,
  onPrev,
  onNext,
  onFinish
}) {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!question) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className={styles.questionCard}>
      {/* Question Metadata Header */}
      <div className={styles.questionMetaHeader}>
        <div className={styles.badgeGroup}>
          <span className={styles.topicBadge}>{question.topic}</span>
          <span
            className={`${styles.diffBadge} ${
              question.difficulty === 'Easy'
                ? styles.diffEasy
                : question.difficulty === 'Medium'
                ? styles.diffMedium
                : styles.diffHard
            }`}
          >
            {question.difficulty}
          </span>
          <span className={styles.typeBadge}>{question.type}</span>
        </div>

        {formatQuestionSource(question) && (
          <div className={styles.sourceText}>
            {formatQuestionSource(question)}
          </div>
        )}
      </div>

      {/* Question Body */}
      <div className={styles.questionBody}>
        <div className={styles.questionText}>
          {question.question}
        </div>

        {/* Optional Data Table Rendering */}
        {question.table && (
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {question.table.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {question.table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cell === null ? 'NULL' : String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Optional SQL Query Code Block */}
        {question.sql && (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>SQL QUERY</span>
              <button
                type="button"
                className={styles.copyCodeBtn}
                onClick={() => handleCopyCode(question.sql)}
              >
                {copiedCode ? '✓ Copied' : '📋 Copy SQL'}
              </button>
            </div>
            <pre className={styles.codeContent}>
              <code>{question.sql}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Options List (Strictly NO answers/explanations revealed during test) */}
      <div className={styles.optionsList} role="radiogroup" aria-label="Answer options">
        {question.options.map((optionText, optIdx) => {
          const isSelected = selectedAnswer === optIdx;
          return (
            <button
              key={optIdx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
              onClick={() => onSelectOption(optIdx)}
            >
              <span className={styles.optionRadio} aria-hidden="true">
                <span className={styles.radioCircle}>
                  {isSelected && <span className={styles.radioDot} />}
                </span>
              </span>
              <span className={styles.optionKey}>{optionLetters[optIdx]}</span>
              <span className={styles.optionText}>{optionText}</span>
            </button>
          );
        })}
      </div>

      {/* Action / Navigation Bar */}
      <div className={styles.actionArea}>
        <div className={styles.selectionStatusText}>
          {selectedAnswer !== undefined && selectedAnswer !== null
            ? `Selected: Option ${optionLetters[selectedAnswer]}`
            : 'Select an option to answer'}
        </div>

        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.prevBtn}
            onClick={onPrev}
            disabled={isFirst}
          >
            ← Previous
          </button>

          {!isLast ? (
            <button
              type="button"
              className={styles.saveNextBtn}
              onClick={onNext}
            >
              <span>Save & Next</span>
              <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.finishBtn}
              onClick={onFinish}
            >
              <span>Finish Test</span>
              <span>✓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import styles from './Quiz.module.css';
import { formatQuestionSource } from '../../utils/questionSource';

export default function QuizReview({ reviews }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unanswered'

  if (!reviews || reviews.length === 0) return null;

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'correct') return r.isCorrect;
    if (activeFilter === 'incorrect') return r.isIncorrect;
    if (activeFilter === 'unanswered') return !r.isAnswered;
    return true;
  });

  const correctCount = reviews.filter((r) => r.isCorrect).length;
  const incorrectCount = reviews.filter((r) => r.isIncorrect).length;
  const unansweredCount = reviews.filter((r) => !r.isAnswered).length;

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className={styles.reviewSection}>
      {/* Review Section Header & Filters */}
      <div className={styles.reviewSectionHeader}>
        <div>
          <h3 className={styles.reviewTitle}>Detailed Question Review</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Review your answers, correct solutions, and conceptual explanations.
          </span>
        </div>

        <div className={styles.reviewFilterTabs}>
          <button
            type="button"
            className={`${styles.reviewTabBtn} ${activeFilter === 'all' ? styles.reviewTabBtnActive : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({reviews.length})
          </button>
          <button
            type="button"
            className={`${styles.reviewTabBtn} ${activeFilter === 'correct' ? styles.reviewTabBtnActive : ''}`}
            onClick={() => setActiveFilter('correct')}
          >
            Correct ({correctCount})
          </button>
          <button
            type="button"
            className={`${styles.reviewTabBtn} ${activeFilter === 'incorrect' ? styles.reviewTabBtnActive : ''}`}
            onClick={() => setActiveFilter('incorrect')}
          >
            Incorrect ({incorrectCount})
          </button>
          <button
            type="button"
            className={`${styles.reviewTabBtn} ${activeFilter === 'unanswered' ? styles.reviewTabBtnActive : ''}`}
            onClick={() => setActiveFilter('unanswered')}
          >
            Unanswered ({unansweredCount})
          </button>
        </div>
      </div>

      {/* Questions Review List */}
      <div className={styles.reviewList}>
        {filteredReviews.map((r) => {
          const {
            index,
            question,
            selectedOption,
            isAnswered,
            isCorrect,
            isIncorrect,
            correctAnswer,
            options,
            explanation,
            solution
          } = r;

          let cardClass = styles.reviewCard;
          if (isCorrect) cardClass += ` ${styles.reviewCardCorrect}`;
          else if (isIncorrect) cardClass += ` ${styles.reviewCardIncorrect}`;
          else cardClass += ` ${styles.reviewCardUnanswered}`;

          return (
            <div key={question.id || index} className={cardClass}>
              {/* Question Card Top Row */}
              <div className={styles.reviewCardTop}>
                <div className={styles.reviewMeta}>
                  <span className={styles.reviewQNum}>Question {index + 1}</span>
                  <span className={styles.topicBadge}>{question.topic}</span>
                  <span className={styles.typeBadge}>{question.difficulty}</span>
                  {formatQuestionSource(question) && (
                    <span className={styles.sourceText}>
                      {formatQuestionSource(question)}
                    </span>
                  )}
                </div>

                <div>
                  {isCorrect && (
                    <span className={`${styles.reviewOutcomeBadge} ${styles.outcomeCorrect}`}>
                      ✓ Correct (+1)
                    </span>
                  )}
                  {isIncorrect && (
                    <span className={`${styles.reviewOutcomeBadge} ${styles.outcomeIncorrect}`}>
                      ✗ Incorrect (0)
                    </span>
                  )}
                  {!isAnswered && (
                    <span className={`${styles.reviewOutcomeBadge} ${styles.outcomeUnanswered}`}>
                      ○ Unanswered (0)
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className={styles.reviewQuestionText}>
                {question.question}
              </div>

              {/* Table if present */}
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

              {/* SQL if present */}
              {question.sql && (
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span>SQL QUERY</span>
                  </div>
                  <pre className={styles.codeContent}>
                    <code>{question.sql}</code>
                  </pre>
                </div>
              )}

              {/* Options Evaluation List */}
              <div className={styles.reviewOptions}>
                {options.map((optText, optIdx) => {
                  const isUserSelection = selectedOption === optIdx;
                  const isTheCorrectAnswer = correctAnswer === optIdx;

                  let optRowClass = styles.reviewOptionRow;
                  if (isUserSelection && isTheCorrectAnswer) {
                    optRowClass += ` ${styles.reviewOptionUserAndCorrect}`;
                  } else if (isTheCorrectAnswer) {
                    optRowClass += ` ${styles.reviewOptionIsCorrect}`;
                  } else if (isUserSelection) {
                    optRowClass += ` ${styles.reviewOptionIsUser}`;
                  }

                  return (
                    <div key={optIdx} className={optRowClass}>
                      <div className={styles.reviewOptionText}>
                        <strong style={{ marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                          {optionLetters[optIdx]}.
                        </strong>
                        <span>{optText}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                        {isUserSelection && isTheCorrectAnswer && (
                          <span className={`${styles.reviewOptionTag} ${styles.tagBothAns}`}>
                            ✓ Your Answer (Correct)
                          </span>
                        )}
                        {isUserSelection && !isTheCorrectAnswer && (
                          <span className={`${styles.reviewOptionTag} ${styles.tagStudentAns}`}>
                            ✗ Your Answer
                          </span>
                        )}
                        {!isUserSelection && isTheCorrectAnswer && (
                          <span className={`${styles.reviewOptionTag} ${styles.tagCorrectAns}`}>
                            ✓ Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Full Solution */}
              <div className={styles.reviewDetailsBox}>
                {explanation && (
                  <div>
                    <div className={styles.reviewSubhead}>Explanation</div>
                    <p className={styles.reviewExplanationText}>{explanation}</p>
                  </div>
                )}

                {solution && (
                  <div>
                    <div className={styles.reviewSubhead}>Step-by-Step Solution</div>
                    <div className={styles.reviewSolutionSteps}>{solution}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from 'react';
import {
  PRACTICE_QUESTIONS,
  PRACTICE_TOPICS,
  DIFFICULTY_LEVELS,
  QUESTION_TYPES,
  QUESTION_SOURCES
} from '../data/practiceQuestions';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './PracticePage.module.css';
import { formatQuestionSource } from '../utils/questionSource';

const QUESTION_COUNT_OPTIONS = ['5', '10', '20', '30', '50', 'All Available'];

export default function PracticePage() {
  // Screen state: 'config' | 'session' | 'finish'
  const [screen, setScreen] = useState('config');

  // Filter configuration
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCount, setSelectedCount] = useState('10');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [randomize, setRandomize] = useState(true);

  // Active session state
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: { selectedOption, isChecked, isCorrect } }
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    document.title = 'Practice — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  // Filter candidate pool
  const filteredPool = useMemo(() => {
    return PRACTICE_QUESTIONS.filter((q) => {
      // Topic filter
      if (selectedTopic !== 'All Topics') {
        if (selectedTopic === 'SQL Aggregation') {
          if (q.topic !== 'SQL Aggregation' && q.topic !== 'Aggregate Functions') {
            return false;
          }
        } else if (q.topic !== selectedTopic) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Question Type filter
      if (selectedType !== 'All' && q.type !== selectedType) {
        return false;
      }

      // Source filter
      if (selectedSource !== 'All') {
        if (selectedSource === 'GATE' && q.source !== 'GATE') return false;
        if (selectedSource === 'University / Academic' && q.source !== 'University / Academic') return false;
        if (selectedSource === 'Practice' && !q.source.includes('Practice')) return false;
        if (selectedSource === 'Original' && !q.source.includes('Original')) return false;
      }

      return true;
    });
  }, [selectedTopic, selectedDifficulty, selectedType, selectedSource]);

  // Start a new practice session
  const handleStartPractice = () => {
    let pool = [...filteredPool];
    if (pool.length === 0) return;

    if (randomize) {
      // Fisher-Yates shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }

    const count = selectedCount === 'All Available' ? pool.length : parseInt(selectedCount, 10);
    const selected = pool.slice(0, Math.min(count, pool.length));

    setSessionQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setScreen('session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = sessionQuestions[currentIndex] || null;
  const currentAnswerState = currentQ ? userAnswers[currentQ.id] : null;

  // Handle option selection
  const handleSelectOption = (idx) => {
    if (!currentQ || currentAnswerState?.isChecked) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: idx,
        autoEvaluated: false,
        isCorrect: undefined
      }
    }));
  };

  // Helper to evaluate currently selected answer upon leaving question without checking
  const evaluateCurrentBeforeLeave = () => {
    if (
      currentQ &&
      currentAnswerState?.selectedOption !== undefined &&
      !currentAnswerState?.isChecked &&
      !currentAnswerState?.autoEvaluated
    ) {
      const isCorrect = currentAnswerState.selectedOption === currentQ.correctAnswer;
      setUserAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          autoEvaluated: true,
          isCorrect
        }
      }));
    }
  };

  // Check answer for current question
  const handleCheckAnswer = () => {
    if (!currentQ || currentAnswerState?.selectedOption === undefined || currentAnswerState?.isChecked) {
      return;
    }
    const isCorrect = currentAnswerState.selectedOption === currentQ.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isChecked: true,
        autoEvaluated: false,
        isCorrect
      }
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    evaluateCurrentBeforeLeave();
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } else {
      setScreen('finish');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    evaluateCurrentBeforeLeave();
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleJumpToQuestion = (idx) => {
    evaluateCurrentBeforeLeave();
    setCurrentIndex(idx);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Copy SQL snippet
  const handleCopySql = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Session Statistics
  const stats = useMemo(() => {
    const answeredKeys = Object.keys(userAnswers);
    let correctCount = 0;
    let incorrectCount = 0;

    answeredKeys.forEach((k) => {
      const a = userAnswers[k];
      if (a?.isChecked || a?.autoEvaluated) {
        if (a.isCorrect) correctCount++;
        else incorrectCount++;
      }
    });

    const totalAnswered = correctCount + incorrectCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    return { correctCount, incorrectCount, totalAnswered, accuracy };
  }, [userAnswers]);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTagline}>Interactive Practice Arena</span>
            <h1 className={styles.heroTitle}>
              Practice <span className={styles.gradientText}>SQL Aggregation</span>
            </h1>
            <p className={styles.heroDesc}>
              Test your understanding of GROUP BY, ROLLUP, CUBE, and SQL aggregation through concept, query, and exam-style questions.
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.main}>
        <div className="container">
          {/* 1. CONFIGURATION SCREEN */}
          {screen === 'config' && (
            <div className={styles.configCard}>
              <div className={styles.configCardHeader}>
                <h2 className={styles.configCardTitle}>Configure Practice Session</h2>
              </div>

              {/* Topic Filter */}
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Topic</label>
                <div className={styles.pillsRow}>
                  {PRACTICE_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`${styles.filterPill} ${selectedTopic === topic ? styles.filterPillActive : ''}`}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Difficulty</label>
                <div className={styles.pillsRow}>
                  {DIFFICULTY_LEVELS.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      className={`${styles.filterPill} ${selectedDifficulty === diff ? styles.filterPillActive : ''}`}
                      onClick={() => setSelectedDifficulty(diff)}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Number of Questions</label>
                <div className={styles.pillsRow}>
                  {QUESTION_COUNT_OPTIONS.map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      className={`${styles.filterPill} ${selectedCount === cnt ? styles.filterPillActive : ''}`}
                      onClick={() => setSelectedCount(cnt)}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Type Filter */}
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Question Type</label>
                <div className={styles.pillsRow}>
                  {QUESTION_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.filterPill} ${selectedType === type ? styles.filterPillActive : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source Filter */}
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Source</label>
                <div className={styles.pillsRow}>
                  {QUESTION_SOURCES.map((src) => (
                    <button
                      key={src}
                      type="button"
                      className={`${styles.filterPill} ${selectedSource === src ? styles.filterPillActive : ''}`}
                      onClick={() => setSelectedSource(src)}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              </div>

              {/* Randomize Toggle */}
              <div className={styles.toggleRow}>
                <input
                  type="checkbox"
                  id="chk-randomize"
                  checked={randomize}
                  onChange={(e) => setRandomize(e.target.checked)}
                  className={styles.toggleCheckbox}
                />
                <label htmlFor="chk-randomize" className={styles.toggleLabel}>
                  <strong>Randomize Questions</strong> — Shuffle questions randomly instead of default catalog order
                </label>
              </div>

              {/* Start Button */}
              <div className={styles.configFooter}>
                <div />
                <button
                  type="button"
                  className={styles.startBtn}
                  onClick={handleStartPractice}
                  disabled={filteredPool.length === 0}
                >
                  <span>Start Practice</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. PRACTICE QUESTION SCREEN */}
          {screen === 'session' && currentQ && (
            <div className={styles.sessionGrid}>
              {/* Left Column: Question & Interaction */}
              <div className={styles.questionCard}>
                {/* Metadata Header */}
                <div className={styles.questionMetaHeader}>
                  <div className={styles.badgeGroup}>
                    <span className={styles.topicBadge}>{currentQ.topic}</span>
                    <span
                      className={`${styles.diffBadge} ${
                        currentQ.difficulty === 'Easy'
                          ? styles.diffEasy
                          : currentQ.difficulty === 'Medium'
                          ? styles.diffMedium
                          : styles.diffHard
                      }`}
                    >
                      {currentQ.difficulty}
                    </span>
                    <span className={styles.typeBadge}>{currentQ.type}</span>
                  </div>

                  {formatQuestionSource(currentQ) && (
                    <div className={styles.sourceText}>
                      {formatQuestionSource(currentQ)}
                    </div>
                  )}
                </div>

                {/* Question Body */}
                <div className={styles.questionBody}>
                  <h3 className={styles.questionText}>{currentQ.question}</h3>

                  {/* Render Table if present */}
                  {currentQ.table && (
                    <div className={styles.tableWrapper}>
                      <table className={styles.dataTable}>
                        <thead>
                          <tr>
                            {currentQ.table.headers.map((h) => (
                              <th key={h}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentQ.table.rows.map((row, rIdx) => (
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

                  {/* Render SQL code block if present */}
                  {currentQ.sql && (
                    <div className={styles.codeBlock}>
                      <div className={styles.codeHeader}>
                        <span>SQL QUERY</span>
                        <button
                          type="button"
                          className={styles.copyCodeBtn}
                          onClick={() => handleCopySql(currentQ.sql)}
                        >
                          {copiedCode ? '✓ Copied' : '📋 Copy'}
                        </button>
                      </div>
                      <pre className={styles.codeContent}>
                        <code>{currentQ.sql}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className={styles.optionsList}>
                  {currentQ.options.map((optText, optIdx) => {
                    const isSelected = currentAnswerState?.selectedOption === optIdx;
                    const isChecked = currentAnswerState?.isChecked;
                    const isAutoEvaluated = currentAnswerState?.autoEvaluated;

                    let optClass = styles.optionCard;
                    let showDot = false;

                    if (isChecked) {
                      // Explicit Check Answer: reveal correct answer and highlight error if user selected it
                      if (optIdx === currentQ.correctAnswer) {
                        optClass += ` ${styles.optionCorrect}`;
                        showDot = true;
                      } else if (isSelected) {
                        optClass += ` ${styles.optionIncorrect}`;
                        showDot = true;
                      }
                    } else if (isAutoEvaluated) {
                      // Leaving without checking: ONLY mark the selected answer: GREEN if correct, RED if incorrect
                      if (isSelected) {
                        optClass += currentAnswerState.isCorrect ? ` ${styles.optionCorrect}` : ` ${styles.optionIncorrect}`;
                        showDot = true;
                      }
                    } else if (isSelected) {
                      // Selected but not yet evaluated: clearly show selected state!
                      optClass += ` ${styles.optionSelected}`;
                      showDot = true;
                    }

                    const letters = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={optClass}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isChecked}
                      >
                        <span className={styles.optionRadio} aria-hidden="true">
                          <span className={styles.radioCircle}>
                            {showDot && <span className={styles.radioDot} />}
                          </span>
                        </span>
                        <span className={styles.optionKey}>{letters[optIdx]}</span>
                        <span className={styles.optionText}>{optText}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Area: Check Answer & Navigation */}
                <div className={styles.actionArea}>
                  <div>
                    {!currentAnswerState?.isChecked ? (
                      <button
                        type="button"
                        className={styles.checkBtn}
                        onClick={handleCheckAnswer}
                        disabled={currentAnswerState?.selectedOption === undefined}
                      >
                        Check Answer
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: currentAnswerState.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                        {currentAnswerState.isCorrect ? '✓ Correct Answer' : '✗ Incorrect Answer'}
                      </span>
                    )}
                  </div>

                  <div className={styles.navButtons}>
                    <button
                      type="button"
                      className={styles.prevBtn}
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      className={styles.nextBtn}
                      onClick={handleNext}
                    >
                      {currentIndex === sessionQuestions.length - 1 ? 'Finish Practice →' : 'Next Question →'}
                    </button>
                  </div>
                </div>

                {/* Answer Reveal (Shown after Check Answer) */}
                {currentAnswerState?.isChecked && (
                  <div className={styles.answerReveal}>
                    <div
                      className={`${styles.revealHeader} ${
                        currentAnswerState.isCorrect
                          ? styles.revealHeaderCorrect
                          : styles.revealHeaderIncorrect
                      }`}
                    >
                      <span>{currentAnswerState.isCorrect ? '✓ Evaluation: Correct!' : '✗ Evaluation: Incorrect'}</span>
                      <span>Q{currentIndex + 1} of {sessionQuestions.length}</span>
                    </div>

                    <div className={styles.revealBody}>
                      <div className={styles.correctAnswerRow}>
                        <span className={styles.sectionHead}>Correct Option:</span>
                        <span className={styles.correctPill}>
                          {['A', 'B', 'C', 'D'][currentQ.correctAnswer]}. {currentQ.options[currentQ.correctAnswer]}
                        </span>
                      </div>

                      <div>
                        <div className={styles.sectionHead}>Explanation</div>
                        <p className={styles.explanationText}>{currentQ.explanation}</p>
                      </div>

                      <div className={styles.solutionBox}>
                        <div className={styles.sectionHead}>Step-by-Step Solution</div>
                        <div className={styles.solutionSteps}>{currentQ.solution}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Sidebar Stats & Question Palette */}
              <aside className={styles.sidebarCard}>
                <div>
                  <div className={styles.progressHeader}>
                    <span>Progress</span>
                    <span>Question {currentIndex + 1} of {sessionQuestions.length}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Session Statistics */}
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={`${styles.statVal} ${styles.statValCorrect}`}>{stats.correctCount}</span>
                    <span className={styles.statLabel}>Correct</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={`${styles.statVal} ${styles.statValIncorrect}`}>{stats.incorrectCount}</span>
                    <span className={styles.statLabel}>Incorrect</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={`${styles.statVal} ${styles.statValAccuracy}`}>{stats.accuracy}%</span>
                    <span className={styles.statLabel}>Accuracy</span>
                  </div>
                </div>

                {/* Question Palette */}
                <div className={styles.paletteSection}>
                  <div className={styles.paletteTitle}>Question Palette</div>
                  <div className={styles.paletteGrid}>
                    {sessionQuestions.map((q, idx) => {
                      const ans = userAnswers[q.id];
                      let btnClass = styles.paletteBtn;
                      if (idx === currentIndex) btnClass += ` ${styles.paletteCurrent}`;
                      else if (ans?.isChecked || ans?.autoEvaluated) {
                        btnClass += ans.isCorrect ? ` ${styles.paletteCorrect}` : ` ${styles.paletteIncorrect}`;
                      } else if (ans?.selectedOption !== undefined) {
                        btnClass += ` ${styles.paletteAnswered}`;
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          className={btnClass}
                          onClick={() => handleJumpToQuestion(idx)}
                          title={`Question ${idx + 1}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Session Controls */}
                <div>
                  <button
                    type="button"
                    className={styles.changeFilterBtn}
                    onClick={() => {
                      if (window.confirm('Leave current practice session and return to filters?')) {
                        setScreen('config');
                      }
                    }}
                  >
                    ↺ Change Filters / Restart
                  </button>
                </div>
              </aside>
            </div>
          )}

          {/* 3. FINISH SCREEN */}
          {screen === 'finish' && (
            <div className={styles.finishCard}>
              <span className={styles.finishIcon}>🎓</span>
              <h2 className={styles.finishTitle}>Practice Complete</h2>
              <p className={styles.finishDesc}>
                You have completed your practice session across {sessionQuestions.length} SQL aggregation questions.
              </p>

              <div className={styles.finishStatsGrid}>
                <div className={styles.finishStatBox}>
                  <span className={styles.finishStatNum}>{sessionQuestions.length}</span>
                  <span className={styles.finishStatLabel}>Questions</span>
                </div>
                <div className={styles.finishStatBox}>
                  <span className={`${styles.finishStatNum} ${styles.statValCorrect}`}>{stats.correctCount}</span>
                  <span className={styles.finishStatLabel}>Correct</span>
                </div>
                <div className={styles.finishStatBox}>
                  <span className={`${styles.finishStatNum} ${styles.statValIncorrect}`}>{stats.incorrectCount}</span>
                  <span className={styles.finishStatLabel}>Incorrect</span>
                </div>
                <div className={styles.finishStatBox}>
                  <span className={`${styles.finishStatNum} ${styles.statValAccuracy}`}>{stats.accuracy}%</span>
                  <span className={styles.finishStatLabel}>Accuracy</span>
                </div>
              </div>

              <div className={styles.finishActions}>
                <button
                  type="button"
                  className={styles.restartBtn}
                  onClick={handleStartPractice}
                >
                  ↺ Practice Again
                </button>
                <button
                  type="button"
                  className={styles.modifyFilterBtn}
                  onClick={() => setScreen('config')}
                >
                  ⚙ Change Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

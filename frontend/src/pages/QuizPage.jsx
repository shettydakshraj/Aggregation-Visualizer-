import { useState, useEffect, useRef, useCallback } from 'react';
import SiteFooter from '../components/layout/SiteFooter';
import QuizSetup from '../components/quiz/QuizSetup';
import QuizQuestion from '../components/quiz/QuizQuestion';
import QuizNavigator from '../components/quiz/QuizNavigator';
import QuizSubmitModal from '../components/quiz/QuizSubmitModal';
import QuizResult from '../components/quiz/QuizResult';
import QuizReview from '../components/quiz/QuizReview';
import QuizPrintReport from '../components/quiz/QuizPrintReport';
import {
  prepareQuizQuestions,
  evaluateQuizResults,
  formatTime
} from '../components/quiz/quizUtils';
import styles from '../components/quiz/Quiz.module.css';

const DEFAULT_CONFIG = {
  selectedTopics: ['All Topics'],
  difficulty: 'Mixed',
  count: 20,
  timePreset: 30, // in minutes
  customMinutes: '30',
  source: 'All Sources',
  randomizeQuestions: true,
  shuffleOptions: true
};

export default function QuizPage() {
  // Screen state: 'config' | 'test' | 'result'
  const [screen, setScreen] = useState('config');

  // Quiz Configuration State
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  // Active Quiz Session State
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }

  // Timer State
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [timeAllocated, setTimeAllocated] = useState(0); // in seconds
  const timerRef = useRef(null);

  // Submission State
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [testDateString, setTestDateString] = useState('');

  // Page title and scroll on mount
  useEffect(() => {
    document.title = 'SQL Aggregation Quiz — Academic Test Arena';
    window.scrollTo(0, 0);
  }, []);

  // Prevent accidental tab closing / reload during active examination
  useEffect(() => {
    if (screen !== 'test') return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [screen]);

  // Update configuration fields
  const handleConfigChange = (delta) => {
    setConfig((prev) => ({ ...prev, ...delta }));
  };

  // Finalize Submission logic (both manual and automatic timeout)
  const handleFinalSubmission = useCallback(
    (reason = 'user') => {
      // Clear countdown timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setSubmitModalOpen(false);
      setAutoSubmitted(reason === 'timeout');

      // Calculate score & breakdown metrics
      const evaluated = evaluateQuizResults({
        questions: sessionQuestions,
        answers,
        timeAllocatedSeconds: timeAllocated,
        timeRemainingSeconds: timeRemaining
      });

      setResultData(evaluated);
      setTestDateString(new Date().toLocaleString());
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [sessionQuestions, answers, timeAllocated, timeRemaining]
  );

  // Timer interval countdown
  useEffect(() => {
    if (screen !== 'test') {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          // Time expired: auto-submit without modal prompt
          handleFinalSubmission('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [screen, handleFinalSubmission]);

  // Start Quiz handler
  const handleStartQuiz = () => {
    const questions = prepareQuizQuestions({
      selectedTopics: config.selectedTopics,
      difficulty: config.difficulty,
      source: config.source,
      count: config.count,
      randomizeQuestions: config.randomizeQuestions,
      shuffleOptions: config.shuffleOptions
    });

    if (questions.length === 0) {
      alert('No questions match the selected criteria. Please broaden your filters.');
      return;
    }

    const durationMinutes =
      config.timePreset === null
        ? parseInt(config.customMinutes, 10) || 30
        : config.timePreset;
    const durationSeconds = Math.max(60, durationMinutes * 60);

    setSessionQuestions(questions);
    setCurrentIndex(0);
    setAnswers({});
    setTimeAllocated(durationSeconds);
    setTimeRemaining(durationSeconds);
    setAutoSubmitted(false);
    setResultData(null);
    setSubmitModalOpen(false);
    setScreen('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Option selection (instant persistent state update, NO answers revealed)
  const handleSelectOption = (optIdx) => {
    const currentQ = sessionQuestions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  // Previous Question button
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Save & Next button
  const handleNextQuestion = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Reached the end, open submit confirmation modal
      setSubmitModalOpen(true);
    }
  };

  // Direct Jump via Navigator (Non-sequential access)
  const handleJumpToQuestion = (idx) => {
    if (idx >= 0 && idx < sessionQuestions.length) {
      setCurrentIndex(idx);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Retake Quiz (Fresh session with same config; re-randomizes if enabled)
  const handleRetake = () => {
    handleStartQuiz();
  };

  // Change Settings (Returns to config screen)
  const handleChangeSettings = () => {
    setScreen('config');
    setResultData(null);
    setSessionQuestions([]);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Print Result action
  const handlePrint = () => {
    window.print();
  };

  // Stats calculation for confirmation modal
  const totalQuestions = sessionQuestions.length;
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Timer urgency style
  const isUrgent = timeRemaining <= 300 && timeRemaining > 60; // < 5 mins
  const isCritical = timeRemaining <= 60; // < 1 min

  const currentQ = sessionQuestions[currentIndex] || null;
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  return (
    <div className={styles.page}>
      {/* Hero Banner (Only shown in Config and Result screens) */}
      {screen !== 'test' && (
        <header className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.heroTagline}>
                Academic Examination Arena
              </span>
              <h1 className={styles.heroTitle}>
                SQL Aggregation <span className={styles.gradientText}>Quiz</span>
              </h1>
              <p className={styles.heroDesc}>
                Configure your test, attempt the questions, and evaluate your understanding of SQL aggregation.
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Main Workspace */}
      <main className={styles.main}>
        <div className="container">
          {/* ============================================================
              1. QUIZ CONFIGURATION SCREEN
              ============================================================ */}
          {screen === 'config' && (
            <QuizSetup
              config={config}
              onChangeConfig={handleConfigChange}
              onStartQuiz={handleStartQuiz}
            />
          )}

          {/* ============================================================
              2. ACTIVE TEST ENVIRONMENT
              ============================================================ */}
          {screen === 'test' && currentQ && (
            <div>
              {/* Test Top Bar: Title, Progress Indicator, Countdown Timer, Early Submit */}
              <div className={styles.testTopBar}>
                <div className={styles.testTitleGroup}>
                  <h2 className={styles.testHeaderTitle}>SQL Aggregation Quiz</h2>
                  <span className={styles.testQuestionIndicator}>
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                </div>

                <div className={styles.testHeaderActions}>
                  <div
                    className={`${styles.timerBadge} ${
                      isCritical ? styles.timerCritical : isUrgent ? styles.timerUrgent : ''
                    }`}
                    aria-label={`Time remaining: ${formatTime(timeRemaining)}`}
                  >
                    <span>⏱</span>
                    <span>{formatTime(timeRemaining)}</span>
                  </div>

                  <button
                    type="button"
                    className={styles.topSubmitBtn}
                    onClick={() => setSubmitModalOpen(true)}
                  >
                    Finish Test
                  </button>
                </div>
              </div>

              {/* 2-Column Responsive Layout: Question Area + Sidebar Navigator */}
              <div className={styles.testGrid}>
                {/* Left: Question Area */}
                <QuizQuestion
                  question={currentQ}
                  currentIndex={currentIndex}
                  totalQuestions={totalQuestions}
                  selectedAnswer={currentAnswer}
                  onSelectOption={handleSelectOption}
                  onPrev={handlePrevQuestion}
                  onNext={handleNextQuestion}
                  onFinish={() => setSubmitModalOpen(true)}
                />

                {/* Right: Sidebar Progress & Question Navigator */}
                <QuizNavigator
                  questions={sessionQuestions}
                  currentIndex={currentIndex}
                  answers={answers}
                  onJumpToQuestion={handleJumpToQuestion}
                  onOpenSubmitModal={() => setSubmitModalOpen(true)}
                />
              </div>

              {/* Confirmation Modal before Final Submission */}
              <QuizSubmitModal
                isOpen={submitModalOpen}
                totalQuestions={totalQuestions}
                answeredCount={answeredCount}
                unansweredCount={unansweredCount}
                onCancel={() => setSubmitModalOpen(false)}
                onConfirm={() => handleFinalSubmission('user')}
              />
            </div>
          )}

          {/* ============================================================
              3. QUIZ RESULT SCREEN & DETAILED REVIEW
              ============================================================ */}
          {screen === 'result' && resultData && (
            <div>
              <QuizResult
                resultData={resultData}
                config={config}
                dateString={testDateString}
                autoSubmitted={autoSubmitted}
                onPrint={handlePrint}
                onRetake={handleRetake}
                onChangeSettings={handleChangeSettings}
              />

              <QuizReview reviews={resultData.questionReviews} />

              {/* Academic Print Report Component (Only rendered when printing) */}
              <QuizPrintReport
                config={config}
                resultData={resultData}
                dateString={testDateString}
              />
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

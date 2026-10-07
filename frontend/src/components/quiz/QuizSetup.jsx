import { useMemo } from 'react';
import {
  QUIZ_TOPICS,
  QUIZ_DIFFICULTIES,
  QUIZ_QUESTION_COUNTS,
  QUIZ_TIME_PRESETS,
  QUIZ_SOURCES,
  filterQuizPool
} from './quizUtils';
import styles from './Quiz.module.css';

export default function QuizSetup({
  config,
  onChangeConfig,
  onStartQuiz
}) {
  const {
    selectedTopics,
    difficulty,
    count,
    timePreset,
    customMinutes,
    source,
    randomizeQuestions,
    shuffleOptions
  } = config;

  // Calculate available matching question count in real time
  const matchingPool = useMemo(() => {
    return filterQuizPool({
      selectedTopics,
      difficulty,
      source
    });
  }, [selectedTopics, difficulty, source]);

  // Handle topic toggling with multiple selection support
  const handleToggleTopic = (topic) => {
    if (topic === 'All Topics') {
      onChangeConfig({ selectedTopics: ['All Topics'] });
      return;
    }

    let nextTopics = selectedTopics.includes('All Topics')
      ? []
      : [...selectedTopics];

    if (nextTopics.includes(topic)) {
      nextTopics = nextTopics.filter((t) => t !== topic);
      // If none selected, fallback to All Topics
      if (nextTopics.length === 0) {
        nextTopics = ['All Topics'];
      }
    } else {
      nextTopics.push(topic);
      // If user selected all specific topics, convert to All Topics
      const specificTopics = QUIZ_TOPICS.filter((t) => t !== 'All Topics');
      if (nextTopics.length === specificTopics.length) {
        nextTopics = ['All Topics'];
      }
    }

    onChangeConfig({ selectedTopics: nextTopics });
  };

  const isTopicSelected = (topic) => {
    if (topic === 'All Topics') {
      return selectedTopics.includes('All Topics');
    }
    return selectedTopics.includes('All Topics') || selectedTopics.includes(topic);
  };

  // Compute effective duration in minutes
  const effectiveMinutes = timePreset === null ? parseInt(customMinutes, 10) || 30 : timePreset;

  // Format topics string for summary
  const summaryTopics = selectedTopics.includes('All Topics')
    ? 'All Topics (Full Syllabus)'
    : selectedTopics.join(', ');

  // Effective question count capped to available pool
  const effectiveCount = Math.min(count, matchingPool.length);

  return (
    <div className={styles.configCard}>
      <div className={styles.configCardHeader}>
        <h2 className={styles.configCardTitle}>Examination Setup</h2>
        <div className={styles.configCountBadge}>
          <span>📚</span>
          <span>{matchingPool.length} Questions Available</span>
        </div>
      </div>

      {/* 1. SYLLABUS / TOPICS */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabelRow}>
          <label className={styles.filterLabel}>1. Syllabus / Topic Selection</label>
          <span className={styles.filterSubtext}>Select one or multiple topics</span>
        </div>
        <div className={styles.pillsRow}>
          {QUIZ_TOPICS.map((topic) => {
            const active = isTopicSelected(topic);
            return (
              <button
                key={topic}
                type="button"
                className={`${styles.filterPill} ${active ? styles.filterPillActive : ''}`}
                onClick={() => handleToggleTopic(topic)}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DIFFICULTY */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabelRow}>
          <label className={styles.filterLabel}>2. Difficulty Level</label>
          <span className={styles.filterSubtext}>Controls question complexity</span>
        </div>
        <div className={styles.pillsRow}>
          {QUIZ_DIFFICULTIES.map((d) => (
            <button
              key={d}
              type="button"
              className={`${styles.filterPill} ${difficulty === d ? styles.filterPillActive : ''}`}
              onClick={() => onChangeConfig({ difficulty: d })}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 3. NUMBER OF QUESTIONS */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabelRow}>
          <label className={styles.filterLabel}>3. Number of Questions</label>
          <span className={styles.filterSubtext}>
            Selected: {effectiveCount} question{effectiveCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className={styles.pillsRow}>
          {QUIZ_QUESTION_COUNTS.map((cnt) => (
            <button
              key={cnt}
              type="button"
              className={`${styles.filterPill} ${count === cnt ? styles.filterPillActive : ''}`}
              onClick={() => onChangeConfig({ count: cnt })}
            >
              {cnt} Questions
            </button>
          ))}
        </div>
      </div>

      {/* 4. TIME LIMIT */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabelRow}>
          <label className={styles.filterLabel}>4. Time Limit</label>
          <span className={styles.filterSubtext}>Timer counts down during exam</span>
        </div>
        <div className={styles.pillsRow}>
          {QUIZ_TIME_PRESETS.map((preset) => {
            const active = timePreset === preset.minutes;
            return (
              <button
                key={preset.label}
                type="button"
                className={`${styles.filterPill} ${active ? styles.filterPillActive : ''}`}
                onClick={() => onChangeConfig({ timePreset: preset.minutes })}
              >
                {preset.label}
              </button>
            );
          })}

          {/* Custom Time Input */}
          {timePreset === null && (
            <div className={styles.customTimeWrapper}>
              <input
                type="number"
                min="1"
                max="180"
                value={customMinutes}
                onChange={(e) => onChangeConfig({ customMinutes: e.target.value })}
                className={styles.customTimeInput}
                placeholder="Mins"
                aria-label="Custom minutes"
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>minutes</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. QUESTION SOURCE */}
      <div className={styles.filterSection}>
        <div className={styles.filterLabelRow}>
          <label className={styles.filterLabel}>5. Question Source</label>
          <span className={styles.filterSubtext}>Verified curriculum provenance</span>
        </div>
        <div className={styles.pillsRow}>
          {QUIZ_SOURCES.map((src) => (
            <button
              key={src}
              type="button"
              className={`${styles.filterPill} ${source === src ? styles.filterPillActive : ''}`}
              onClick={() => onChangeConfig({ source: src })}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* 6. RANDOMIZATION & OPTIONS SHUFFLE */}
      <div className={styles.togglesGrid}>
        <label className={styles.toggleLabelCard}>
          <input
            type="checkbox"
            checked={randomizeQuestions}
            onChange={(e) => onChangeConfig({ randomizeQuestions: e.target.checked })}
            className={styles.toggleCheckbox}
          />
          <div>
            <div className={styles.toggleTitle}>Randomize Questions</div>
            <div className={styles.toggleDesc}>
              Draw randomly from the candidate pool and shuffle question presentation order.
            </div>
          </div>
        </label>

        <label className={styles.toggleLabelCard}>
          <input
            type="checkbox"
            checked={shuffleOptions}
            onChange={(e) => onChangeConfig({ shuffleOptions: e.target.checked })}
            className={styles.toggleCheckbox}
          />
          <div>
            <div className={styles.toggleTitle}>Shuffle Options</div>
            <div className={styles.toggleDesc}>
              Randomize answer choices (A, B, C, D) while strictly maintaining correct answer mapping.
            </div>
          </div>
        </label>
      </div>

      {/* QUIZ SUMMARY CARD */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryTitle}>Quiz Summary</div>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryKey}>TOPICS</span>
            <span className={styles.summaryVal}>{summaryTopics}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryKey}>DIFFICULTY</span>
            <span className={styles.summaryVal}>{difficulty}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryKey}>QUESTIONS</span>
            <span className={styles.summaryVal}>
              {effectiveCount} {effectiveCount < count ? `(All available)` : ''}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryKey}>TIME LIMIT</span>
            <span className={styles.summaryVal}>{effectiveMinutes} minutes</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryKey}>RANDOMIZED</span>
            <span className={styles.summaryVal}>{randomizeQuestions ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className={styles.configFooter}>
        <span className={styles.configNotice}>
          Ready to begin? Click <strong>Start Quiz</strong> to launch the timer and begin your test.
        </span>
        <button
          type="button"
          className={styles.startBtn}
          onClick={onStartQuiz}
          disabled={matchingPool.length === 0}
        >
          <span>Start Quiz</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

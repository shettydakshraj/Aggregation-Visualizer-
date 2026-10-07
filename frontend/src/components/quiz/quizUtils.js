// Utility functions for SQL Aggregation Quiz session management,
// question candidate pool filtering, balanced sampling, option shuffling, and scoring.
import { QUIZ_QUESTIONS } from '../../data/quizQuestions.js';

export const QUIZ_TOPICS = [
  'All Topics',
  'GROUP BY',
  'Aggregate Functions',
  'HAVING',
  'ROLLUP',
  'CUBE',
  'SQL Query Interpretation',
  'Mixed Aggregation'
];

export const QUIZ_DIFFICULTIES = [
  'Easy',
  'Medium',
  'Hard',
  'Mixed'
];

export const QUIZ_QUESTION_COUNTS = [5, 10, 15, 20, 25, 30];

export const QUIZ_TIME_PRESETS = [
  { label: '5 minutes', minutes: 5 },
  { label: '10 minutes', minutes: 10 },
  { label: '15 minutes', minutes: 15 },
  { label: '20 minutes', minutes: 20 },
  { label: '30 minutes', minutes: 30 },
  { label: '45 minutes', minutes: 45 },
  { label: '60 minutes', minutes: 60 },
  { label: 'Custom', minutes: null }
];

export const QUIZ_SOURCES = [
  'All Sources',
  'GATE',
  'University / Academic',
  'Exam Style',
  'Original Practice'
];

/**
 * Checks whether a question matches a selected topic.
 */
export function matchesTopic(q, topic) {
  if (topic === 'All Topics') return true;
  if (topic === 'GROUP BY') return q.topic === 'GROUP BY';
  if (topic === 'Aggregate Functions') return q.topic === 'Aggregate Functions';
  if (topic === 'HAVING') return q.topic === 'HAVING';
  if (topic === 'ROLLUP') return q.topic === 'ROLLUP';
  if (topic === 'CUBE') return q.topic === 'CUBE';
  if (topic === 'SQL Query Interpretation') {
    return q.type === 'Query Output' || (Array.isArray(q.tags) && q.tags.includes('query-output'));
  }
  if (topic === 'Mixed Aggregation') {
    return q.topic === 'Mixed' || (Array.isArray(q.tags) && q.tags.includes('mixed'));
  }
  return false;
}

/**
 * Checks whether a question matches the selected difficulty.
 */
export function matchesDifficulty(q, difficulty) {
  if (difficulty === 'Mixed' || difficulty === 'All') return true;
  return q.difficulty === difficulty;
}

/**
 * Checks whether a question matches the selected source filter.
 */
export function matchesSource(q, source) {
  if (source === 'All Sources' || source === 'All') return true;
  if (source === 'GATE') return q.source === 'GATE';
  if (source === 'University / Academic') return q.source === 'University / Academic';
  if (source === 'Exam Style') return q.type === 'Exam Style' || (typeof q.source === 'string' && q.source.includes('Exam'));
  if (source === 'Original Practice') {
    return q.source === 'Original Practice' || q.source === 'Practice' || q.source === 'Original';
  }
  return false;
}

/**
 * Filters the master PRACTICE_QUESTIONS bank according to active criteria.
 */
export function filterQuizPool({
  selectedTopics = ['All Topics'],
  difficulty = 'Mixed',
  source = 'All Sources'
}) {
  return QUIZ_QUESTIONS.filter((q) => {
    // Topic filtering: if 'All Topics' is selected, include all; otherwise match any selected topic
    const topicMatch = selectedTopics.includes('All Topics')
      ? true
      : selectedTopics.some((t) => matchesTopic(q, t));

    if (!topicMatch) return false;
    if (!matchesDifficulty(q, difficulty)) return false;
    if (!matchesSource(q, source)) return false;

    return true;
  });
}

/**
 * Fisher-Yates array shuffle.
 */
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Builds the prepared session question array:
 * handles pool filtering, balanced sampling for "Mixed" difficulty,
 * question count capping, question randomization, and option shuffling.
 */
export function prepareQuizQuestions({
  selectedTopics,
  difficulty,
  source,
  count,
  randomizeQuestions = true,
  shuffleOptions = true
}) {
  const pool = filterQuizPool({ selectedTopics, difficulty, source });
  if (pool.length === 0) return [];

  let chosenPool = [];

  // When 'Mixed' difficulty is selected, aim for a balanced distribution among available difficulties
  if (difficulty === 'Mixed' && pool.length >= count) {
    const easy = pool.filter(q => q.difficulty === 'Easy');
    const med = pool.filter(q => q.difficulty === 'Medium');
    const hard = pool.filter(q => q.difficulty === 'Hard');

    if (easy.length > 0 && med.length > 0 && hard.length > 0) {
      // Calculate target distribution: ~35% Easy, ~45% Medium, ~20% Hard
      const hardTarget = Math.max(1, Math.round(count * 0.25));
      const easyTarget = Math.max(1, Math.round(count * 0.35));
      const medTarget = Math.max(1, count - hardTarget - easyTarget);

      const sampledEasy = randomizeQuestions ? shuffleArray(easy).slice(0, easyTarget) : easy.slice(0, easyTarget);
      const sampledMed = randomizeQuestions ? shuffleArray(med).slice(0, medTarget) : med.slice(0, medTarget);
      const sampledHard = randomizeQuestions ? shuffleArray(hard).slice(0, hardTarget) : hard.slice(0, hardTarget);

      chosenPool = [...sampledEasy, ...sampledMed, ...sampledHard];

      // If still under count due to sub-pool size limits, fill from remaining
      if (chosenPool.length < count) {
        const remaining = pool.filter(q => !chosenPool.some(c => c.id === q.id));
        const needed = count - chosenPool.length;
        const extra = (randomizeQuestions ? shuffleArray(remaining) : remaining).slice(0, needed);
        chosenPool.push(...extra);
      }
    } else {
      chosenPool = pool;
    }
  } else {
    chosenPool = pool;
  }

  // Question-level shuffling or sequential slice
  let selected = randomizeQuestions ? shuffleArray(chosenPool) : [...chosenPool];
  const targetCount = Math.min(count, selected.length);
  selected = selected.slice(0, targetCount);

  // Further shuffle final selected set to interleave difficulties if mixed
  if (randomizeQuestions) {
    selected = shuffleArray(selected);
  }

  // Shuffle options if requested, ensuring correctAnswer index stays 100% accurate
  return selected.map((q) => {
    if (!shuffleOptions || !Array.isArray(q.options) || q.options.length <= 1) {
      return {
        ...q,
        options: [...q.options]
      };
    }

    const indexedOptions = q.options.map((optText, origIndex) => ({
      optText,
      origIndex
    }));

    const shuffledIndexed = shuffleArray(indexedOptions);
    const newOptions = shuffledIndexed.map(item => item.optText);
    const newCorrectAnswer = shuffledIndexed.findIndex(item => item.origIndex === q.correctAnswer);

    return {
      ...q,
      options: newOptions,
      correctAnswer: newCorrectAnswer,
      originalOptions: q.options,
      originalCorrectAnswer: q.correctAnswer
    };
  });
}

/**
 * Formats time in seconds as MM:SS
 */
export function formatTime(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return '00:00';
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Evaluates the quiz submission and returns rich metrics.
 */
export function evaluateQuizResults({
  questions,
  answers,
  timeAllocatedSeconds,
  timeRemainingSeconds
}) {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  const topicMap = {};
  const difficultyMap = {
    Easy: { total: 0, correct: 0, attempted: 0 },
    Medium: { total: 0, correct: 0, attempted: 0 },
    Hard: { total: 0, correct: 0, attempted: 0 }
  };

  const questionReviews = questions.map((q, index) => {
    const topicKey = q.topic || 'General';
    if (!topicMap[topicKey]) {
      topicMap[topicKey] = { topic: topicKey, total: 0, correct: 0, attempted: 0 };
    }
    topicMap[topicKey].total += 1;

    if (difficultyMap[q.difficulty]) {
      difficultyMap[q.difficulty].total += 1;
    }

    const selectedOption = answers[q.id];
    const isAnswered = selectedOption !== undefined && selectedOption !== null;
    const isCorrect = isAnswered && selectedOption === q.correctAnswer;
    const isIncorrect = isAnswered && !isCorrect;

    if (!isAnswered) {
      unanswered += 1;
    } else if (isCorrect) {
      correct += 1;
      topicMap[topicKey].correct += 1;
      topicMap[topicKey].attempted += 1;
      if (difficultyMap[q.difficulty]) {
        difficultyMap[q.difficulty].correct += 1;
        difficultyMap[q.difficulty].attempted += 1;
      }
    } else {
      incorrect += 1;
      topicMap[topicKey].attempted += 1;
      if (difficultyMap[q.difficulty]) {
        difficultyMap[q.difficulty].attempted += 1;
      }
    }

    return {
      index,
      question: q,
      selectedOption,
      isAnswered,
      isCorrect,
      isIncorrect,
      correctAnswer: q.correctAnswer,
      options: q.options,
      explanation: q.explanation,
      solution: q.solution
    };
  });

  const total = questions.length;
  const attempted = correct + incorrect;
  const score = correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeUsedSeconds = Math.max(0, timeAllocatedSeconds - timeRemainingSeconds);

  const topicBreakdown = Object.values(topicMap).map(item => ({
    ...item,
    accuracy: item.attempted > 0 ? Math.round((item.correct / item.attempted) * 100) : 0,
    scorePercentage: item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0
  }));

  const difficultyBreakdown = Object.entries(difficultyMap)
    .filter(([_, data]) => data.total > 0)
    .map(([diff, data]) => ({
      difficulty: diff,
      ...data,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
      scorePercentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    }));

  return {
    total,
    attempted,
    unanswered,
    correct,
    incorrect,
    score,
    percentage,
    timeAllocatedSeconds,
    timeRemainingSeconds,
    timeUsedSeconds,
    topicBreakdown,
    difficultyBreakdown,
    questionReviews
  };
}

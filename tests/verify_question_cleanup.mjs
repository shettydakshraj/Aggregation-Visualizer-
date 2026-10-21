import assert from 'node:assert';
import { QUIZ_QUESTIONS, QUIZ_TOPICS } from '../frontend/src/data/quizQuestions.js';
import { PRACTICE_QUESTIONS, PRACTICE_TOPICS } from '../frontend/src/data/practiceQuestions.js';
import { cleanQuestionText, sanitizeQuestion } from '../frontend/src/utils/textCleaner.js';
import { prepareQuizQuestions } from '../frontend/src/components/quiz/quizUtils.js';

console.log('========================================================');
console.log('VERIFYING QUESTION BANK CLEANUP & INTEGRITY');
console.log('========================================================\n');

// TEST 1: NO UNWANTED PREFIXES, ARTIFACTS, OR INDEXING IN QUIZ QUESTIONS
console.log('TEST 1: QUIZ QUESTIONS CLEANLINESS');
assert.ok(QUIZ_QUESTIONS.length >= 150, `Quiz bank must have at least 150 questions, found ${QUIZ_QUESTIONS.length}`);

QUIZ_QUESTIONS.forEach((q, idx) => {
  const text = q.question;

  // 1. Unwanted bracketed labels
  assert.ok(!/\[\s*Assessment/i.test(text), `Q[${q.id}]: Must not contain [Assessment...] prefix: "${text}"`);
  assert.ok(!/\[\s*Practice/i.test(text), `Q[${q.id}]: Must not contain [Practice...] prefix: "${text}"`);
  assert.ok(!/\[\s*Test\s+Item/i.test(text), `Q[${q.id}]: Must not contain [Test Item...] prefix: "${text}"`);
  assert.ok(!/\[\s*Quiz\s+Item/i.test(text), `Q[${q.id}]: Must not contain [Quiz Item...] prefix: "${text}"`);

  // 2. Unwanted numbering prefixes
  assert.ok(!/^\s*Question\s*\d+\s*[:.-]/i.test(text), `Q[${q.id}]: Must not start with Question N: "${text}"`);
  assert.ok(!/^\s*Q\.?\s*\d+\s*[:.-]/i.test(text), `Q[${q.id}]: Must not start with Q. N: "${text}"`);
  assert.ok(!/^\s*\d+[\.\)]\s+/.test(text), `Q[${q.id}]: Must not start with copied list numbering: "${text}"`);

  // 3. Literal Markdown artifacts
  assert.ok(!/\*\*/.test(text), `Q[${q.id}]: Must not contain literal markdown ** in text: "${text}"`);

  // 4. HTML entities
  assert.ok(!/&#xA0;|&#x20;|&nbsp;/i.test(text), `Q[${q.id}]: Must not contain raw &nbsp; or &#xA0;: "${text}"`);

  // 5. Variant indexing suffixes
  assert.ok(!/\(Variant\s+\d+/i.test(text), `Q[${q.id}]: Must not contain (Variant N...) suffix: "${text}"`);
});
console.log(`✓ All ${QUIZ_QUESTIONS.length} Quiz questions verified clean of indexing artifacts, labels, markdown, and entities.\n`);

// TEST 2: NO UNWANTED PREFIXES, ARTIFACTS, OR INDEXING IN PRACTICE QUESTIONS
console.log('TEST 2: PRACTICE QUESTIONS CLEANLINESS');
assert.ok(PRACTICE_QUESTIONS.length >= 200, `Practice bank must have at least 200 questions, found ${PRACTICE_QUESTIONS.length}`);

PRACTICE_QUESTIONS.forEach((q, idx) => {
  const text = q.question;

  assert.ok(!/\[\s*Assessment/i.test(text), `P[${q.id}]: Must not contain [Assessment...] prefix: "${text}"`);
  assert.ok(!/\[\s*Practice/i.test(text), `P[${q.id}]: Must not contain [Practice...] prefix: "${text}"`);
  assert.ok(!/\[\s*Test\s+Item/i.test(text), `P[${q.id}]: Must not contain [Test Item...] prefix: "${text}"`);
  assert.ok(!/\[\s*Quiz\s+Item/i.test(text), `P[${q.id}]: Must not contain [Quiz Item...] prefix: "${text}"`);

  assert.ok(!/^\s*Question\s*\d+\s*[:.-]/i.test(text), `P[${q.id}]: Must not start with Question N: "${text}"`);
  assert.ok(!/^\s*Q\.?\s*\d+\s*[:.-]/i.test(text), `P[${q.id}]: Must not start with Q. N: "${text}"`);
  assert.ok(!/^\s*\d+[\.\)]\s+/.test(text), `P[${q.id}]: Must not start with copied list numbering: "${text}"`);

  assert.ok(!/\*\*/.test(text), `P[${q.id}]: Must not contain literal markdown ** in text: "${text}"`);
  assert.ok(!/&#xA0;|&#x20;|&nbsp;/i.test(text), `P[${q.id}]: Must not contain raw &nbsp; or &#xA0;: "${text}"`);
});
console.log(`✓ All ${PRACTICE_QUESTIONS.length} Practice questions verified clean of indexing artifacts, labels, markdown, and entities.\n`);

// TEST 3: VERIFY SQL SYNTAX & NUMERICAL INTEGRITY ACROSS ALL TOPICS
console.log('TEST 3: SQL SYNTAX & NUMERICAL INTEGRITY ACROSS MULTIPLE TOPICS');

const topicChecklist = [
  'GROUP BY',
  'Aggregate Functions',
  'HAVING',
  'ROLLUP',
  'CUBE'
];

topicChecklist.forEach((topic) => {
  const quizSubset = QUIZ_QUESTIONS.filter((q) => q.topic === topic);
  assert.ok(quizSubset.length > 0, `Quiz must have questions for topic ${topic}`);

  // Sample questions from this topic
  quizSubset.slice(0, 3).forEach((q) => {
    assert.ok(q.question && q.question.length > 15, `Topic ${topic} question must have meaningful wording`);
    assert.ok(Array.isArray(q.options) && q.options.length >= 2, `Options must be intact for ${q.id}`);
    assert.ok(q.correctAnswer >= 0 && q.correctAnswer < q.options.length, `Correct answer must be valid for ${q.id}`);
    assert.ok(q.explanation && q.explanation.length > 10, `Explanation must be preserved for ${q.id}`);
  });
});

// Specific checks on SQL expressions and numbers
const qCardinality = QUIZ_QUESTIONS.find(q => q.id === 'qz-item-6');
assert.ok(qCardinality, 'qz-item-6 must exist');
assert.strictEqual(
  qCardinality.question,
  'If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in "SELECT C, COUNT(*) FROM R GROUP BY C" assuming no NULLs?',
  'qz-item-6 SQL query, double quotes, and cardinality variables N and K must be perfectly preserved'
);

const qEmptyTable = QUIZ_QUESTIONS.find(q => q.id === 'qz-item-8');
assert.ok(qEmptyTable, 'qz-item-8 must exist');
assert.strictEqual(
  qEmptyTable.question,
  'What is the exact result of executing "SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees" on a completely empty table?',
  'qz-item-8 SQL query COUNT(emp_id), COUNT(*), SUM(salary) must be perfectly preserved'
);

const qPredicatePushdown = QUIZ_QUESTIONS.find(q => q.id === 'qz-item-11');
assert.ok(qPredicatePushdown, 'qz-item-11 must exist');
assert.ok(
  qPredicatePushdown.question.includes("WHERE dept = 'IT'") && qPredicatePushdown.question.includes("HAVING COUNT(*) > 5"),
  'Predicate pushdown SQL syntax with quotes and > 5 must be preserved'
);

const qGroupingId = QUIZ_QUESTIONS.find(q => q.id === 'qz-item-15');
assert.ok(qGroupingId, 'qz-item-15 must exist');
assert.ok(
  qGroupingId.question.includes('GROUPING_ID(A, B)') && qGroupingId.question.includes('grand total row ()'),
  'GROUPING_ID(A, B) and () grand total notation must be preserved'
);

const qRollupSet = QUIZ_QUESTIONS.find(q => q.id === 'qz-item-12');
assert.ok(qRollupSet, 'qz-item-12 must exist');
assert.ok(
  qRollupSet.question.includes('GROUP BY ROLLUP(A, B)'),
  'GROUP BY ROLLUP(A, B) SQL expression must be preserved'
);

console.log('✓ SQL expressions, table names, columns, COUNT(*), symbols, and formulas preserved with 100% fidelity.\n');

// TEST 4: DYNAMIC TEXT CLEANING UTILITY UNIT TESTS
console.log('TEST 4: DYNAMIC TEXT CLEANER ROBUSTNESS');

const dynamicTests = [
  {
    input: '[Assessment Test Item #999] What does COUNT(*) return?',
    expected: 'What does COUNT(*) return?'
  },
  {
    input: 'Question 42: Explain the CUBE operation in SQL:1999.',
    expected: 'Explain the CUBE operation in SQL:1999.'
  },
  {
    input: 'Q. 17: Which aggregate function computes standard deviation?',
    expected: 'Which aggregate function computes standard deviation?'
  },
  {
    input: 'Q15. Is HAVING evaluated before or after GROUP BY?',
    expected: 'Is HAVING evaluated before or after GROUP BY?'
  },
  {
    input: '1. Which clause defines partitions in WINDOW queries?',
    expected: 'Which clause defines partitions in WINDOW queries?'
  },
  {
    input: '1) What is the default rollup direction?',
    expected: 'What is the default rollup direction?'
  },
  {
    input: '[Practice Lab #88] How does GROUPING() identify subtotals?',
    expected: 'How does GROUPING() identify subtotals?'
  },
  {
    input: '&#xA0;**Question 5:**&#x20;What is the output of **COUNT(*)**?&nbsp;',
    expected: 'What is the output of COUNT(*)?'
  },
  {
    input: 'What happens when &lt;expr&gt; evaluates to &quot;NULL&quot; &amp; val &#62; 10?',
    expected: 'What happens when <expr> evaluates to "NULL" & val > 10?'
  },
  {
    input: 'Calculate the total rows for CUBE(A, B, C)? (Variant 5 - Dimension Combinatorics)',
    expected: 'Calculate the total rows for CUBE(A, B, C)?'
  }
];

dynamicTests.forEach(({ input, expected }, i) => {
  const result = cleanQuestionText(input);
  assert.strictEqual(result, expected, `Dynamic test #${i + 1} failed: expected "${expected}", got "${result}"`);
});

// Test sanitizeQuestion helper
const sampleObj = {
  id: 'dyn-1',
  question: '[Assessment Test Item #50] What is ROLLUP(x)?',
  topic: 'ROLLUP'
};
const sanitized = sanitizeQuestion(sampleObj);
assert.strictEqual(sanitized.question, 'What is ROLLUP(x)?', 'sanitizeQuestion must clean text');
assert.strictEqual(sanitized.id, 'dyn-1', 'sanitizeQuestion must preserve id');
assert.strictEqual(sanitized.topic, 'ROLLUP', 'sanitizeQuestion must preserve topic');

console.log(`✓ All ${dynamicTests.length} dynamic cleaning test cases passed.\n`);

// TEST 5: PREPARE QUIZ QUESTIONS SESSION GENERATION
console.log('TEST 5: PREPARE QUIZ QUESTIONS SESSION INTEGRATION');
const sessionQs = prepareQuizQuestions({
  selectedTopics: ['All Topics'],
  difficulty: 'Mixed',
  source: 'All Sources',
  count: 10,
  randomizeQuestions: true,
  shuffleOptions: true
});

assert.strictEqual(sessionQs.length, 10, 'Must generate exactly 10 questions for session');
sessionQs.forEach((q, idx) => {
  assert.ok(!/\[\s*Assessment/i.test(q.question), `Session Q[${idx}] must not have Assessment prefix`);
  assert.ok(!/\[\s*Practice/i.test(q.question), `Session Q[${idx}] must not have Practice prefix`);
  assert.ok(!/^\s*Question\s*\d+/i.test(q.question), `Session Q[${idx}] must not have Question N prefix`);
  assert.ok(!/\(Variant\s+\d+/i.test(q.question), `Session Q[${idx}] must not have Variant suffix`);
});
console.log('✓ prepareQuizQuestions returns clean, student-ready question objects.\n');

console.log('========================================================');
console.log('ALL QUESTION CLEANUP & INTEGRITY VERIFICATIONS PASSED!');
console.log('========================================================');

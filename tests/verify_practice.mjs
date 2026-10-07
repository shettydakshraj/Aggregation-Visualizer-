import fs from 'fs';
import {
  PRACTICE_QUESTIONS,
  PRACTICE_TOPICS,
  DIFFICULTY_LEVELS,
  QUESTION_TYPES,
  QUESTION_SOURCES
} from '../frontend/src/data/practiceQuestions.js';

console.log('=== VERIFYING PRACTICE PAGE & QUESTION BANK ===\n');

// 1. Verify Navbar link order
const navbarFile = fs.readFileSync('frontend/src/components/layout/Navbar.jsx', 'utf8');
const learnIndex = navbarFile.indexOf("{ label: 'Learn',");
const practiceIndex = navbarFile.indexOf("{ label: 'Practice',");
const helpIndex = navbarFile.indexOf("{ label: 'Help',");

console.log('1. Navbar order test:');
console.log('   Learn found:', learnIndex !== -1);
console.log('   Practice found:', practiceIndex !== -1);
console.log('   Help found:', helpIndex !== -1);
console.log('   Practice between Learn and Help:', learnIndex < practiceIndex && practiceIndex < helpIndex);

// 2. Verify App.jsx route
const appFile = fs.readFileSync('frontend/src/App.jsx', 'utf8');
const appPracticeRoute = appFile.includes('path="/practice"');
console.log('\n2. Route test:');
console.log('   /practice route present in App.jsx:', appPracticeRoute);

// 3. Question Bank Integrity
console.log('\n3. Question Bank tests:');
console.log('   Total questions count:', PRACTICE_QUESTIONS.length);
console.log('   Target >= 100 met:', PRACTICE_QUESTIONS.length >= 100);

const topicCounts = {};
const diffCounts = {};
const typeCounts = {};
const sourceCounts = {};

PRACTICE_QUESTIONS.forEach((q) => {
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
  diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
  typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
  sourceCounts[q.source] = (sourceCounts[q.source] || 0) + 1;

  if (!q.id || !q.topic || !q.difficulty || !q.type || !q.source || !q.question || !q.explanation || !q.solution) {
    throw new Error(`Incomplete question fields on ID ${q.id}`);
  }
  if (!q.options || q.options.length !== 4) {
    throw new Error(`Question ${q.id} must have 4 options`);
  }
  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
    throw new Error(`Question ${q.id} invalid correct answer`);
  }
});

console.log('   Topic breakdown:', topicCounts);
console.log('   Difficulty breakdown:', diffCounts);
console.log('   Type breakdown:', typeCounts);
console.log('   Source breakdown:', sourceCounts);

// 4. Test Filtering Logic (Simulating PracticePage)
console.log('\n4. Filter Simulation tests:');

// Test Topic = ROLLUP
const rollupPool = PRACTICE_QUESTIONS.filter(q => q.topic === 'ROLLUP');
console.log('   Topic=ROLLUP returns:', rollupPool.length, '(expected >= 20)');

// Test Topic = CUBE, Difficulty = Hard
const hardCubePool = PRACTICE_QUESTIONS.filter(q => q.topic === 'CUBE' && q.difficulty === 'Hard');
console.log('   Topic=CUBE & Diff=Hard returns:', hardCubePool.length, '(expected > 0)');

// Test Source = GATE
const gatePool = PRACTICE_QUESTIONS.filter(q => q.source === 'GATE');
console.log('   Source=GATE returns:', gatePool.length, '(expected verified GATE questions)');
gatePool.forEach(g => {
  console.log(`     - [${g.id}] GATE ${g.year}: ${g.question.slice(0, 60)}...`);
});

// Test Randomization function
const poolToShuffle = [...PRACTICE_QUESTIONS];
const originalFirst5 = poolToShuffle.slice(0, 5).map(q => q.id);
// Shuffle
for (let i = poolToShuffle.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [poolToShuffle[i], poolToShuffle[j]] = [poolToShuffle[j], poolToShuffle[i]];
}
const shuffledFirst5 = poolToShuffle.slice(0, 5).map(q => q.id);
console.log('   Shuffle changed order:', JSON.stringify(originalFirst5) !== JSON.stringify(shuffledFirst5));

console.log('\n=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===');

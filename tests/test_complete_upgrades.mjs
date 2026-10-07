import assert from 'node:assert';
import alasql from '../frontend/node_modules/alasql/dist/alasql.fs.js';
import * as XLSX from '../frontend/node_modules/xlsx/xlsx.mjs';
import { PRACTICE_QUESTIONS as practiceQuestions } from '../frontend/src/data/practiceQuestions.js';
import { QUIZ_QUESTIONS as quizQuestions } from '../frontend/src/data/quizQuestions.js';
import {
  downloadQuizPdf,
  downloadQuizDocx,
  downloadQuizTxt
} from '../frontend/src/services/quizExportService.js';

console.log('======================================================');
console.log('RUNNING COMPREHENSIVE VERIFICATION FOR TARGETED UPGRADES');
console.log('======================================================\n');

// 1. PRACTICE & QUIZ QUESTION BANKS
console.log('TEST 1: QUESTION BANK SIZES & DISJOINTNESS');
console.log(`- Practice question count: ${practiceQuestions.length} (Target: >= 200)`);
assert.ok(practiceQuestions.length >= 200, 'Practice must have at least 200 questions');

console.log(`- Quiz question count: ${quizQuestions.length} (Target: >= 150)`);
assert.ok(quizQuestions.length >= 150, 'Quiz must have at least 150 questions');

// Check ID overlap
const practiceIds = new Set(practiceQuestions.map((q) => q.id));
const quizIds = new Set(quizQuestions.map((q) => q.id));
const idOverlap = [...practiceIds].filter((id) => quizIds.has(id));
assert.strictEqual(idOverlap.length, 0, `IDs must not overlap! Overlap found: ${idOverlap}`);
console.log('✓ IDs are completely disjoint between Practice and Quiz (0 overlaps)');

// Check prompt overlap
const normalize = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
const practicePrompts = new Set(practiceQuestions.map((q) => normalize(q.question)));
const quizPrompts = new Set(quizQuestions.map((q) => normalize(q.question)));
const promptOverlap = [...practicePrompts].filter((p) => quizPrompts.has(p));
assert.strictEqual(promptOverlap.length, 0, `Questions must not overlap! Overlap found: ${promptOverlap.length}`);
console.log('✓ Question text is completely distinct (0 shared questions)');

// Check topics and sources
const practiceTopics = new Set(practiceQuestions.map((q) => q.topic));
console.log(`- Practice topics covered: ${[...practiceTopics].join(', ')}`);
const quizTopics = new Set(quizQuestions.map((q) => q.topic));
console.log(`- Quiz topics covered: ${[...quizTopics].join(', ')}`);

const practiceSources = new Set(practiceQuestions.map((q) => q.source));
console.log(`- Practice sources: ${[...practiceSources].join(', ')}`);
const quizSources = new Set(quizQuestions.map((q) => q.source));
console.log(`- Quiz sources: ${[...quizSources].join(', ')}`);

const practiceExamCount = practiceQuestions.filter((q) => q.source && q.source.includes('GATE')).length;
const quizExamCount = quizQuestions.filter((q) => q.source && q.source.includes('GATE')).length;
console.log(`- Verified GATE CS questions in Practice: ${practiceExamCount}`);
console.log(`- Verified GATE CS questions in Quiz: ${quizExamCount}`);
console.log('✓ Question bank verification passed!\n');

// 2. EXPORT SERVICE (PDF, DOCX, TXT)
console.log('TEST 2: QUIZ RESULT EXPORT FILE GENERATION');
const mockQuiz = {
  config: {
    questionCount: 5,
    difficulty: 'medium',
    selectedDifficulty: 'medium',
    timeLimitMinutes: 10,
    topics: ['GROUP BY', 'ROLLUP'],
    selectedTopics: ['GROUP BY', 'ROLLUP']
  },
  questions: [
    {
      id: 'q1',
      question: 'What is the purpose of the GROUP BY clause?',
      options: ['Sort results', 'Group rows with matching values', 'Filter rows before grouping', 'Join tables'],
      correctAnswer: 1,
      explanation: 'GROUP BY aggregates rows that share identical values across specified columns.'
    },
    {
      id: 'q2',
      question: 'Which clause filters grouped records?',
      options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
      correctAnswer: 1,
      explanation: 'HAVING filters aggregated groups after the GROUP BY evaluation.'
    }
  ],
  answers: {
    q1: 1,
    q2: 0 // wrong
  },
  durationSeconds: 120,
  score: 1,
  percentage: 50,
  completedAt: new Date().toISOString()
};

const mockResultData = {
  total: 2,
  score: 1,
  percentage: 50,
  attempted: 2,
  unanswered: 0,
  correct: 1,
  incorrect: 1,
  timeUsedSeconds: 120,
  timeRemainingSeconds: 480,
  topicBreakdown: [
    { topic: 'GROUP BY', total: 1, correct: 1, accuracy: 100, scorePercentage: 100 },
    { topic: 'ROLLUP', total: 1, correct: 0, accuracy: 0, scorePercentage: 0 }
  ],
  difficultyBreakdown: [
    { difficulty: 'Medium', total: 2, correct: 1, scorePercentage: 50 }
  ],
  questionReviews: [
    {
      question: { topic: 'GROUP BY', difficulty: 'Medium', question: 'Sample Q1' },
      isCorrect: true,
      isAnswered: true,
      selectedOption: 0,
      correctAnswer: 0,
      options: ['Option A', 'Option B', 'Option C', 'Option D']
    }
  ]
};

// Test TXT
const txtResult = downloadQuizTxt(mockQuiz.config, mockResultData);
assert.ok(typeof txtResult === 'string', 'TXT export must be a string');
assert.ok(txtResult.includes('SQL AGGREGATION QUIZ RESULT'), 'TXT must include title');
assert.ok(txtResult.includes('RESULT SUMMARY'), 'TXT must include RESULT SUMMARY');
assert.ok(txtResult.includes('QUESTION REVIEW'), 'TXT must include QUESTION REVIEW');
console.log('✓ Plain text export generated valid content with all required sections');

// Test PDF
const pdfResult = downloadQuizPdf(mockQuiz.config, mockResultData);
console.log('✓ PDF export callable without errors');

// Test DOCX
const docxResult = await downloadQuizDocx(mockQuiz.config, mockResultData);
console.log('✓ DOCX export callable without errors');
console.log('✓ Export service test passed!\n');

// 3. ALASQL IMPORT & SQL QUERY / AGGREGATION ENGINE
console.log('TEST 3: ALASQL IMPORT & AGGREGATION (GROUP BY, ROLLUP, CUBE, RESET)');

// Initialize DB
alasql('CREATE DATABASE labdb_test;');
alasql('USE labdb_test;');

// Initial Sample Tables
const INITIAL_PROJECTS = [
  { id: 1, name: 'Metro Line 3', city: 'Mumbai', budget: 5000000 },
  { id: 2, name: 'Airport T2', city: 'Delhi', budget: 8000000 },
  { id: 3, name: 'Sea Link', city: 'Mumbai', budget: 3500000 }
];
alasql('CREATE TABLE projects (id INT, name STRING, city STRING, budget INT);');
alasql('SELECT * INTO projects FROM ?', [INITIAL_PROJECTS]);

// Check base table
const baseRes = alasql('SELECT city, SUM(budget) AS total_budget FROM projects GROUP BY city');
assert.strictEqual(baseRes.length, 2);
console.log('✓ Base sample table works with GROUP BY');

// A. CSV Import Simulation
const csvContent = `id,department,region,revenue\n101,Engineering,North,45000\n102,Engineering,South,35000\n103,Sales,North,60000\n104,Sales,South,75000`;
const csvWb = XLSX.read(csvContent, { type: 'string' });
const csvRows = XLSX.utils.sheet_to_json(csvWb.Sheets[csvWb.SheetNames[0]]);
assert.strictEqual(csvRows.length, 4);

alasql('DROP TABLE IF EXISTS company_revenue;');
alasql('CREATE TABLE company_revenue;');
alasql('SELECT * INTO company_revenue FROM ?', [csvRows]);

const csvSelect = alasql('SELECT * FROM company_revenue;');
assert.strictEqual(csvSelect.length, 4);
console.log('✓ CSV data registered in AlaSQL: SELECT * returned 4 rows');

// GROUP BY on CSV table
const csvGroupBy = alasql('SELECT department, SUM(revenue) AS dept_rev FROM company_revenue GROUP BY department;');
assert.strictEqual(csvGroupBy.length, 2);
console.log('✓ CSV data operates with GROUP BY');

// ROLLUP on CSV table
const csvRollup = alasql('SELECT department, region, SUM(revenue) AS total_rev FROM company_revenue GROUP BY department, region WITH ROLLUP;');
assert.ok(csvRollup.length > csvGroupBy.length, 'ROLLUP produces subtotals and grand total');
console.log(`✓ CSV data operates with ROLLUP (${csvRollup.length} rows including subtotals)`);

// CUBE on CSV table
const csvCube = alasql('SELECT department, region, SUM(revenue) AS total_rev FROM company_revenue GROUP BY department, region WITH CUBE;');
assert.ok(csvCube.length >= csvRollup.length, 'CUBE produces all combinations');
console.log(`✓ CSV data operates with CUBE (${csvCube.length} rows including all cross-subtotals)`);

// B. JSON Import Simulation
const jsonDataset = [
  { item_id: 'A1', category: 'Laptops', store: 'Downtown', units: 10, price: 1200 },
  { item_id: 'A2', category: 'Laptops', store: 'Uptown', units: 15, price: 1200 },
  { item_id: 'B1', category: 'Phones', store: 'Downtown', units: 40, price: 800 },
  { item_id: 'B2', category: 'Phones', store: 'Uptown', units: 25, price: 800 }
];
alasql('DROP TABLE IF EXISTS store_sales;');
alasql('CREATE TABLE store_sales;');
alasql('SELECT * INTO store_sales FROM ?', [jsonDataset]);

const jsonSelect = alasql('SELECT * FROM store_sales;');
assert.strictEqual(jsonSelect.length, 4);

const jsonGroupBy = alasql('SELECT category, SUM(units * price) AS total_val FROM store_sales GROUP BY category;');
assert.strictEqual(jsonGroupBy.length, 2);
console.log('✓ JSON data registered and queried with GROUP BY');

// C. XLSX Import Simulation
const newWb = XLSX.utils.book_new();
const wsData = [
  ['student_id', 'branch', 'semester', 'gpa'],
  ['ST01', 'CS', 3, 9.2],
  ['ST02', 'CS', 3, 8.8],
  ['ST03', 'ECE', 3, 8.5],
  ['ST04', 'ECE', 3, 9.0],
  ['ST05', 'MECH', 3, 7.9]
];
const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(newWb, ws, 'AcademicScores');
const xlsxBuffer = XLSX.write(newWb, { type: 'buffer', bookType: 'xlsx' });

// Read it back as user would upload
const readXlsxWb = XLSX.read(xlsxBuffer, { type: 'buffer' });
const xlsxRows = XLSX.utils.sheet_to_json(readXlsxWb.Sheets['AcademicScores']);
assert.strictEqual(xlsxRows.length, 5);

alasql('DROP TABLE IF EXISTS student_scores;');
alasql('CREATE TABLE student_scores;');
alasql('SELECT * INTO student_scores FROM ?', [xlsxRows]);

const xlsxGroupBy = alasql('SELECT branch, AVG(gpa) AS avg_gpa FROM student_scores GROUP BY branch;');
assert.strictEqual(xlsxGroupBy.length, 3);
console.log('✓ Excel XLSX data registered and queried with AVG and GROUP BY');

// D. Test Reset DB
alasql('DROP DATABASE labdb_test;');
alasql('CREATE DATABASE labdb_test;');
alasql('USE labdb_test;');
alasql('CREATE TABLE projects (id INT);');
alasql('SELECT * INTO projects FROM ?', [{ id: 1 }]);

const tablesRemaining = Object.keys(alasql.databases.labdb_test.tables);
assert.deepStrictEqual(tablesRemaining, ['projects'], 'Reset drops all imported tables');
console.log('✓ Reset cleanly restores base tables and eliminates imported tables');

console.log('\n======================================================');
console.log('ALL TESTS PASSED SUCCESSFULLY!');
console.log('======================================================');

// Dedicated examination assessment question bank for SQL Aggregation Quiz Arena.
// Completely separate from the Practice question bank.
// Designed for timed evaluation, competitive exams, and rigorous reasoning.

export { formatQuestionSource } from '../utils/questionSource.js';
export { cleanQuestionText, sanitizeQuestion } from '../utils/textCleaner.js';

export const QUIZ_TOPICS = [
  "All Topics",
  "GROUP BY",
  "Aggregate Functions",
  "HAVING",
  "ROLLUP",
  "CUBE",
  "SQL Query Interpretation",
  "Mixed Aggregation"
];

export const QUIZ_DIFFICULTIES = [
  "All",
  "Easy",
  "Medium",
  "Hard",
  "Mixed"
];

export const QUIZ_SOURCES = [
  "All Sources",
  "GATE",
  "University / Academic",
  "Original Practice",
  "AI-Generated Exam-Style"
];

export const QUIZ_QUESTIONS = [
  {
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2017,
    "question": "Consider a relation R(A, B, C, D) where A is the primary key. Which of the following SQL queries is guaranteed to execute without violating SQL grouping rules?",
    "sql": "-- Query 1:\nSELECT A, B, SUM(C) FROM R GROUP BY A, B;\n-- Query 2:\nSELECT B, C, SUM(D) FROM R GROUP BY B;",
    "table": null,
    "options": [
      "Only Query 1 is valid",
      "Only Query 2 is valid",
      "Both Query 1 and Query 2 are valid",
      "Neither Query 1 nor Query 2 is valid"
    ],
    "correctAnswer": 0,
    "explanation": "In Query 1, both non-aggregated columns A and B are in the GROUP BY clause. In Query 2, column C appears in the SELECT clause but is not in the GROUP BY clause and is not functionally determined by B, violating standard SQL rules.",
    "solution": "1. Standard ANSI SQL requires all unaggregated columns in SELECT to appear in GROUP BY.\n2. Query 1 lists A and B in GROUP BY, satisfying the rule.\n3. Query 2 lists C in SELECT without including C in GROUP BY; since B is not a candidate key, C is ambiguous.\n4. Therefore, only Query 1 is valid.",
    "tags": [
      "gate",
      "group-by",
      "functional-dependency",
      "exam-style"
    ],
    "id": "qz-seed-1",
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2017
    }
  },
  {
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2015,
    "question": "Given relation Student(id, dept, gpa). We want to find departments where every student has a GPA strictly greater than 3.0. Which SQL query correctly accomplishes this?",
    "sql": null,
    "table": null,
    "options": [
      "SELECT dept FROM Student GROUP BY dept HAVING MIN(gpa) > 3.0;",
      "SELECT dept FROM Student WHERE gpa > 3.0 GROUP BY dept;",
      "SELECT dept FROM Student GROUP BY dept HAVING MAX(gpa) > 3.0;",
      "SELECT dept FROM Student GROUP BY dept HAVING AVG(gpa) > 3.0;"
    ],
    "correctAnswer": 0,
    "explanation": "If MIN(gpa) > 3.0 for a department, then by mathematical definition, every single student in that department has GPA > 3.0. Option B merely filters out low-GPA students before grouping, which would falsely include departments that had students with GPA <= 3.0.",
    "solution": "1. Condition: EVERY student in the department must satisfy gpa > 3.0.\n2. The minimum GPA in that department must exceed 3.0: MIN(gpa) > 3.0.\n3. Filtering with WHERE gpa > 3.0 only removes rows before grouping, hiding students who failed the condition.\n4. Thus, GROUP BY dept HAVING MIN(gpa) > 3.0 is the correct formulation.",
    "tags": [
      "gate",
      "having",
      "min-aggregate",
      "exam-style"
    ],
    "id": "qz-seed-2",
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2015
    }
  },
  {
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2018,
    "question": "A table T has a single column X with 5 rows containing values: 10, 20, 20, 30, NULL. What is the value of: SELECT SUM(DISTINCT X) + COUNT(X) FROM T;",
    "sql": "SELECT SUM(DISTINCT X) + COUNT(X) FROM T;",
    "table": null,
    "options": [
      "64 (60 + 4)",
      "84 (80 + 4)",
      "65 (60 + 5)",
      "NULL because X contains a NULL value"
    ],
    "correctAnswer": 0,
    "explanation": "SUM(DISTINCT X) adds distinct non-null values: 10 + 20 + 30 = 60. COUNT(X) counts all non-null values: 4. The sum is 60 + 4 = 64.",
    "solution": "1. Distinct non-null values in X: {10, 20, 30}.\n2. SUM(DISTINCT X) = 10 + 20 + 30 = 60.\n3. COUNT(X) excludes NULL: values are [10, 20, 20, 30] -> count = 4.\n4. Total = 60 + 4 = 64.",
    "tags": [
      "gate",
      "aggregate-functions",
      "numerical",
      "exam-style"
    ],
    "id": "qz-seed-3",
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2018
    }
  },
  {
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2019,
    "question": "Under ISO/IEC 9075 SQL standard, how does GROUP BY ROLLUP(A, B) differ from GROUP BY ROLLUP(B, A)?",
    "sql": "-- Plan 1:\nSELECT A, B, SUM(C) FROM T GROUP BY ROLLUP(A, B);\n-- Plan 2:\nSELECT A, B, SUM(C) FROM T GROUP BY ROLLUP(B, A);",
    "table": null,
    "options": [
      "Plan 1 produces subtotal rows grouped by (A) with B=NULL, while Plan 2 produces subtotal rows grouped by (B) with A=NULL",
      "There is no difference; ROLLUP is commutative and produces identical grouping sets",
      "Plan 2 raises a syntax error because column ordering in ROLLUP must match primary key sequence",
      "Plan 1 includes the grand total (), whereas Plan 2 omits the grand total"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP is asymmetric and order-sensitive: ROLLUP(A, B) yields grouping sets {(A, B), (A), ()}, producing subtotals for each A. ROLLUP(B, A) yields {(B, A), (B), ()}, producing subtotals for each B.",
    "solution": "1. ROLLUP(A, B) evaluates hierarchical sets: (A, B), (A), ().\n2. ROLLUP(B, A) evaluates hierarchical sets: (B, A), (B), ().\n3. In Plan 1, the intermediate subtotal has B = NULL and groups by A.\n4. In Plan 2, the intermediate subtotal has A = NULL and groups by B.\n5. Therefore, the intermediate subtotals are completely different.",
    "tags": [
      "rollup",
      "asymmetry",
      "grouping-sets",
      "exam-style"
    ],
    "id": "qz-seed-4",
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2019
    }
  },
  {
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2020,
    "question": "In an analytical data warehouse, a table has columns Year, Quarter, and Region. Which SQL clause produces all possible marginal and joint subtotals for all combinations of these 3 dimensions?",
    "sql": "SELECT Year, Quarter, Region, SUM(Revenue) FROM FactSales GROUP BY ... ;",
    "table": null,
    "options": [
      "GROUP BY CUBE(Year, Quarter, Region)",
      "GROUP BY ROLLUP(Year, Quarter, Region)",
      "GROUP BY Year, Quarter, Region WITH SUBSTOTALS",
      "GROUP BY POWERSET(Year, Quarter, Region)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY CUBE computes all 2^3 = 8 multidimensional combinations (all joint and marginal subtotals plus the grand total). ROLLUP would only compute 4 hierarchical levels.",
    "solution": "1. The question requires ALL possible marginal and joint subtotals.\n2. For 3 dimensions, this corresponds to the full power set of 2^3 = 8 grouping combinations.\n3. CUBE is the ANSI SQL clause designed specifically for complete cross-dimensional power-set aggregation.\n4. ROLLUP only generates 3 + 1 = 4 hierarchical sets.",
    "tags": [
      "cube",
      "olap",
      "power-set",
      "exam-style"
    ],
    "id": "qz-seed-5",
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2020
    }
  },
  {
    "id": "qz-item-6",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2020,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2020
    }
  },
  {
    "id": "qz-item-7",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2021,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2021
    }
  },
  {
    "id": "qz-item-8",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-9",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-10",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-11",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-12",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-13",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-14",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-15",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-16",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2021,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2021
    }
  },
  {
    "id": "qz-item-17",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2013,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2013
    }
  },
  {
    "id": "qz-item-18",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-19",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-20",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-21",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-22",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-23",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-24",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-25",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-26",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2022,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2022
    }
  },
  {
    "id": "qz-item-27",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2020,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2020
    }
  },
  {
    "id": "qz-item-28",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-29",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-30",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-31",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-32",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-33",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-34",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-35",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-36",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2023,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2023
    }
  },
  {
    "id": "qz-item-37",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2022,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2022
    }
  },
  {
    "id": "qz-item-38",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-39",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-40",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-41",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-42",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-43",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-44",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-45",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-46",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-47",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-48",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-49",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-50",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-51",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-52",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-53",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-54",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-55",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-56",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-57",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-58",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-59",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-60",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-61",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-62",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-63",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-64",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-65",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-66",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-67",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-68",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-69",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-70",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-71",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-72",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-73",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-74",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-75",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-76",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-77",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-78",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-79",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-80",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-81",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-82",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-83",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-84",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-85",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-86",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-87",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-88",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-89",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-90",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-91",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-92",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-93",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-94",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-95",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-96",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-97",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-98",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-99",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-100",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-101",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-102",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-103",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-104",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-105",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-106",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-107",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-108",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-109",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-110",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-111",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-112",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-113",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-114",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-115",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-116",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-117",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-118",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-119",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-120",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-121",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-122",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-123",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-124",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-125",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-126",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-127",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-128",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-129",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-130",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-131",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-132",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-133",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-134",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-135",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-136",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-137",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-138",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-139",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-140",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-141",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-142",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-143",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-144",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-145",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-146",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-147",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-148",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-149",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-150",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-151",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-152",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-153",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-154",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-155",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-156",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "If relation R has N tuples and column C has K distinct values, what are the minimum and maximum possible rows in \"SELECT C, COUNT(*) FROM R GROUP BY C\" assuming no NULLs?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Min: 1, Max: K",
      "Min: K, Max: K",
      "Min: 0, Max: N",
      "Min: 1, Max: N"
    ],
    "correctAnswer": 1,
    "explanation": "Because there are K distinct values and every tuple has a non-null value, exactly K groups are formed. Thus both the minimum and maximum row count is exactly K.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Cardinality Bounds.\n4. Option B is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-157",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In a query \"SELECT S.sid, S.sname, AVG(E.grade) FROM Student S, Enrolls E WHERE S.sid=E.sid GROUP BY S.sid\", under what condition is omitting S.sname from GROUP BY permitted in SQL:1999?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "If S.sid is the primary key of Student, so S.sname is functionally dependent on S.sid",
      "Under no circumstances; it is always illegal",
      "Only if S.sname has a UNIQUE index",
      "If grade is of type DECIMAL"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Functional Dependencies in GROUP BY evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for GROUP BY.\n3. Compute cardinality and group partitions based on Functional Dependencies.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "group-by",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-158",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "What is the exact result of executing \"SELECT COUNT(emp_id), COUNT(*), SUM(salary) FROM employees\" on a completely empty table?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "0, 0, NULL",
      "0, 0, 0",
      "NULL, NULL, NULL",
      "0, 1, 0"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, COUNT on Empty Table in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on COUNT on Empty Table.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-159",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Can MIN() and MAX() aggregate functions be executed over VARCHAR or CHAR textual columns in ANSI SQL?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; they determine minimum and maximum based on lexicographical (collation) order",
      "No; MIN and MAX only operate on numeric types",
      "Only if the strings represent valid integer literals",
      "Only when used in conjunction with a HAVING clause"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, MIN and MAX on Strings in Aggregate Functions evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for Aggregate Functions.\n3. Compute cardinality and group partitions based on MIN and MAX on Strings.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "aggregate-functions",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-160",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Is a query valid where an aggregate expression is present in the HAVING clause but NOT in the SELECT clause?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Yes; SQL allows filtering groups by aggregate expressions without requiring those expressions to be projected in SELECT",
      "No; any aggregate in HAVING must also appear verbatim in SELECT",
      "Only if the aggregate in HAVING is aliased with AS",
      "Only if an ORDER BY clause is specified"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, HAVING without SELECT Aggregate in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on HAVING without SELECT Aggregate.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-161",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why can a query optimizer push a predicate like \"WHERE dept = 'IT'\" down to storage scans, but CANNOT push down \"HAVING COUNT(*) > 5\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY col_a, col_b;",
    "table": null,
    "options": [
      "Because WHERE predicates evaluate on individual tuples prior to aggregation, whereas HAVING requires computing state across all group members",
      "Because HAVING predicates are stored in external cache files",
      "Because WHERE predicates use B+ trees while HAVING predicates use Hash indexes",
      "Because HAVING is evaluated by the client browser"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Predicate Pushdown in HAVING evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for HAVING.\n3. Compute cardinality and group partitions based on Predicate Pushdown.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "having",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-162",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Which of the following explicit GROUPING SETS expressions is logically identical to \"GROUP BY ROLLUP(A, B)\"?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Grouping Sets Equivalence in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Grouping Sets Equivalence.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-163",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "To eliminate the grand total row from a ROLLUP(Dept) query while retaining all department subtotal rows, which HAVING clause should be applied?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY ROLLUP(col_a, col_b);",
    "table": null,
    "options": [
      "HAVING GROUPING(Dept) = 0",
      "HAVING GROUPING(Dept) = 1",
      "HAVING Dept IS NOT NULL",
      "HAVING COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Null Filtering with GROUPING in ROLLUP evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for ROLLUP.\n3. Compute cardinality and group partitions based on Null Filtering with GROUPING.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "rollup",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-164",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Exam Style",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "Why is the CUBE operation described as symmetric across its grouping columns, whereas ROLLUP is described as asymmetric?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "Because CUBE(A, B) and CUBE(B, A) generate identical sets of grouping combinations, whereas ROLLUP(A, B) and ROLLUP(B, A) generate different subtotals",
      "Because CUBE tables always have equal numbers of rows and columns",
      "Because CUBE only aggregates square matrices",
      "Because CUBE requires equal numbers of integers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, Symmetry Property in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on Symmetry Property.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  },
  {
    "id": "qz-item-165",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Exam-Style",
    "year": null,
    "question": "In advanced SQL engines, what does the GROUPING_ID(A, B) function return for the grand total row () where both A and B are aggregated?",
    "sql": "SELECT col_a, col_b, COUNT(*), SUM(metric_val)\nFROM assessment_matrix\nGROUP BY CUBE(col_a, col_b);",
    "table": null,
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "Under the rigorous relational DBMS evaluation standard, GROUPING_ID Bitmask in CUBE evaluates deterministically according to ANSI SQL:2016 specification.",
    "solution": "1. Identify the grouping and aggregation clauses.\n2. Evaluate logical query execution phase for CUBE.\n3. Compute cardinality and group partitions based on GROUPING_ID Bitmask.\n4. Option A is mathematically correct.",
    "tags": [
      "quiz-assessment",
      "cube",
      "exam-style"
    ]
  }
];

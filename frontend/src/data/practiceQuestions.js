// Comprehensive question bank for SQL Aggregation, GROUP BY, ROLLUP, CUBE, and HAVING
// Designed for competitive exam preparation and concept mastery.

export { formatQuestionSource } from '../utils/questionSource.js';

export const PRACTICE_TOPICS = [
  "All Topics",
  "GROUP BY",
  "ROLLUP",
  "CUBE",
  "SQL Aggregation",
  "HAVING",
  "Aggregate Functions",
  "Mixed"
];

export const DIFFICULTY_LEVELS = [
  "All",
  "Easy",
  "Medium",
  "Hard"
];

export const QUESTION_TYPES = [
  "All",
  "Conceptual",
  "Query Output",
  "Numerical",
  "Debugging",
  "Application",
  "Exam Style"
];

export const QUESTION_SOURCES = [
  "All",
  "GATE",
  "University / Academic",
  "Practice",
  "Original Practice",
  "AI-Generated Practice"
];

export const PRACTICE_QUESTIONS = [
  {
    "id": "gb-001",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2019,
    "question": "What is the fundamental purpose of the SQL GROUP BY clause?",
    "table": null,
    "sql": "SELECT department, COUNT(*)\nFROM employees\nGROUP BY department;",
    "options": [
      "To sort result rows in ascending alphabetical order",
      "To partition rows having identical values in specified columns into summary rows",
      "To filter individual rows before any calculations are performed",
      "To permanently remove duplicate rows from the physical storage"
    ],
    "correctAnswer": 1,
    "explanation": "GROUP BY partitions relational tuples into buckets where all members share identical values for the grouping attribute(s), enabling scalar aggregate functions to produce one summary row per group.",
    "solution": "1. The engine scans candidate rows following FROM and WHERE clauses.\n2. Tuples with identical grouping column values are gathered into the same partition.\n3. Aggregate expressions (SUM, COUNT, etc.) are computed over each partition.\n4. Exactly one output row is emitted for each distinct partition.",
    "tags": [
      "group-by",
      "concepts",
      "fundamentals"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2019
    }
  },
  {
    "id": "gb-002",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "In standard ANSI SQL, what is the 'Single-Value Rule' regarding columns in the SELECT clause?",
    "table": null,
    "sql": "-- Violates single-value rule in standard SQL:\nSELECT department, employee_name, AVG(salary)\nFROM employees\nGROUP BY department;",
    "options": [
      "Every column in the SELECT list must be an aggregate function",
      "Any unaggregated column in the SELECT list must explicitly appear in the GROUP BY clause",
      "Only one grouping attribute is permitted per SQL query",
      "Non-aggregated columns are allowed if the table has a primary key"
    ],
    "correctAnswer": 1,
    "explanation": "Because a group collapses multiple rows into a single summary tuple, a raw unaggregated column could have multiple distinct values within that group, creating ambiguity unless it is a grouping attribute.",
    "solution": "1. For each group formed by GROUP BY, only one value can be emitted per output row.\n2. Aggregate functions like AVG() compute a single scalar from many rows.\n3. A raw column like employee_name contains multiple distinct names per department; emitting it directly creates ambiguity.\n4. Therefore, ANSI SQL mandates that every unaggregated column in SELECT must be listed in GROUP BY.",
    "tags": [
      "single-value-rule",
      "syntax",
      "ansi-sql"
    ]
  },
  {
    "id": "gb-003",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given the 'projects' table below, what is the output of the query?",
    "table": {
      "headers": [
        "id",
        "name",
        "city",
        "budget"
      ],
      "rows": [
        [
          101,
          "Flyover A",
          "Mumbai",
          50000
        ],
        [
          102,
          "Metro B",
          "Delhi",
          80000
        ],
        [
          103,
          "Bridge C",
          "Mumbai",
          70000
        ],
        [
          104,
          "Tunnel D",
          "Delhi",
          40000
        ],
        [
          105,
          "Port E",
          "Chennai",
          90000
        ]
      ]
    },
    "sql": "SELECT city, COUNT(*) AS proj_count, MAX(budget) AS max_b\nFROM projects\nGROUP BY city\nORDER BY city ASC;",
    "options": [
      "Chennai: 1, 90000 | Delhi: 2, 80000 | Mumbai: 2, 70000",
      "Chennai: 1, 90000 | Delhi: 2, 40000 | Mumbai: 2, 50000",
      "Mumbai: 2, 70000 | Delhi: 2, 80000 | Chennai: 1, 90000",
      "5 rows with individual project budgets"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping by city creates 3 groups: Chennai (1 row, max 90000), Delhi (2 rows, max 80000), and Mumbai (2 rows, max 70000). ORDER BY city ASC sorts them: Chennai, Delhi, Mumbai.",
    "solution": "1. Group 'Chennai': Rows = [Port E], COUNT = 1, MAX(budget) = 90000.\n2. Group 'Delhi': Rows = [Metro B, Tunnel D], COUNT = 2, MAX(budget) = max(80000, 40000) = 80000.\n3. Group 'Mumbai': Rows = [Flyover A, Bridge C], COUNT = 2, MAX(budget) = max(50000, 70000) = 70000.\n4. ORDER BY city ASC orders them alphabetically: Chennai, Delhi, Mumbai.",
    "tags": [
      "query-output",
      "max",
      "count"
    ]
  },
  {
    "id": "gb-004",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2012,
    "question": "Let R(A, B, C, D) be a relation schema with n tuples. What is the MAXIMUM possible number of tuples in the output of the query: SELECT A, B, COUNT(*) FROM R GROUP BY A, B?",
    "table": null,
    "sql": "SELECT A, B, COUNT(*)\nFROM R\nGROUP BY A, B;",
    "options": [
      "1 tuple",
      "n tuples",
      "n * (n - 1) tuples",
      "2^n tuples"
    ],
    "correctAnswer": 1,
    "explanation": "If every tuple in R possesses a unique combination of (A, B) values, every tuple will form its own separate group, resulting in exactly n groups.",
    "solution": "1. Each output tuple of a GROUP BY corresponds to a unique combination of grouping attributes present in the table.\n2. In the worst case where no two tuples share the same (A, B) values, there are n distinct (A, B) pairs.\n3. Hence, the maximum number of output tuples is min(n, distinct (A, B) pairs) = n.\n4. (The minimum would be 1, if all tuples share the exact same (A, B) values).",
    "tags": [
      "gate",
      "cardinality",
      "multi-column-group-by"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2012
    }
  },
  {
    "id": "gb-005",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2019,
    "question": "Consider relation R(A, B) with 100 tuples and S(B, C) with 50 tuples. The natural join R ⋈ S produces 200 tuples. What are the minimum and maximum number of tuples that can be produced by: SELECT R.A, COUNT(*) FROM R JOIN S ON R.B = S.B GROUP BY R.A?",
    "table": null,
    "sql": "SELECT R.A, COUNT(*)\nFROM R JOIN S ON R.B = S.B\nGROUP BY R.A;",
    "options": [
      "Min = 1, Max = 100",
      "Min = 0, Max = 200",
      "Min = 1, Max = 50",
      "Min = 2, Max = 200"
    ],
    "correctAnswer": 0,
    "explanation": "Since the join yields 200 tuples (> 0), at least 1 group is formed. The number of groups cannot exceed the number of distinct values of R.A in R, which is at most |R| = 100.",
    "solution": "1. The join R ⋈ S produces 200 non-empty tuples. Since there is at least one tuple, min groups = 1 (if all 200 joined rows happen to have the exact same R.A value).\n2. The number of groups is bounded above by the total distinct values of R.A present in R. Since |R| = 100, there can be at most 100 distinct values of R.A.\n3. Therefore, minimum = 1, maximum = 100.",
    "tags": [
      "gate",
      "join",
      "bounds"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2019
    }
  },
  {
    "id": "gb-006",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2011,
    "question": "How does the SQL GROUP BY clause treat NULL values in the grouping column?",
    "table": null,
    "sql": "SELECT zone, COUNT(*)\nFROM projects\nGROUP BY zone;",
    "options": [
      "NULL values are discarded completely and do not appear in the result",
      "Each row with a NULL value forms its own separate, individual group",
      "All rows containing NULL in the grouping column are clustered together into a single group",
      "The query throws a runtime NULL pointer exception"
    ],
    "correctAnswer": 2,
    "explanation": "Under ANSI SQL specifications, GROUP BY treats all NULL values in a grouping attribute as equivalent, placing them all into a single partition.",
    "solution": "1. In SQL predicate logic, NULL = NULL evaluates to UNKNOWN.\n2. However, for grouping purposes, the SQL standard specifies that NULL values are treated as non-distinct.\n3. All tuples where zone IS NULL are assigned to one group with zone = NULL.\n4. COUNT(*) accurately reflects the total rows with NULL in that column.",
    "tags": [
      "null-handling",
      "group-by",
      "concepts"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2011
    }
  },
  {
    "id": "gb-007",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "Given the table 'employees', calculate the result of the query below.",
    "table": {
      "headers": [
        "emp_id",
        "dept",
        "salary",
        "bonus"
      ],
      "rows": [
        [
          1,
          "IT",
          60000,
          5000
        ],
        [
          2,
          "IT",
          70000,
          null
        ],
        [
          3,
          "HR",
          40000,
          3000
        ],
        [
          4,
          "HR",
          50000,
          3000
        ],
        [
          5,
          "IT",
          80000,
          7000
        ]
      ]
    },
    "sql": "SELECT dept, SUM(salary) AS total_sal, AVG(bonus) AS avg_bonus\nFROM employees\nGROUP BY dept\nORDER BY dept DESC;",
    "options": [
      "IT: 210000, 6000 | HR: 90000, 3000",
      "IT: 210000, 4000 | HR: 90000, 3000",
      "IT: 210000, null | HR: 90000, 3000",
      "HR: 90000, 3000 | IT: 210000, 6000"
    ],
    "correctAnswer": 0,
    "explanation": "ORDER BY dept DESC sorts IT before HR. IT: SUM(salary) = 60000+70000+80000 = 210000. AVG(bonus) ignores NULL: (5000+7000)/2 = 6000. HR: SUM = 90000, AVG = 3000.",
    "solution": "1. IT group has 3 rows. Salaries: 60k, 70k, 80k. SUM = 210,000.\n2. IT bonuses: 5000, NULL, 7000. Aggregate AVG ignores NULLs, so denominator is 2: (5000 + 7000) / 2 = 6000.\n3. HR group has 2 rows. Salaries: 40k, 50k. SUM = 90,000. Bonuses: 3000, 3000. AVG = 3000.\n4. ORDER BY dept DESC sorts 'IT' before 'HR'.",
    "tags": [
      "numerical",
      "avg",
      "null-handling"
    ]
  },
  {
    "id": "gb-008",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2004,
    "question": "Why does the following SQL query fail to execute in a standard ANSI SQL database?",
    "table": null,
    "sql": "SELECT department, manager, COUNT(*)\nFROM departments\nWHERE COUNT(*) > 5\nGROUP BY department;",
    "options": [
      "COUNT(*) cannot be used alongside GROUP BY",
      "The WHERE clause cannot contain aggregate functions; HAVING must be used to filter on COUNT(*), and 'manager' must be in GROUP BY",
      "GROUP BY department must precede the WHERE clause",
      "The table name cannot be plural"
    ],
    "correctAnswer": 1,
    "explanation": "Two syntax errors: 1) Aggregate function COUNT(*) is placed in WHERE (which evaluates prior to grouping). 2) 'manager' appears in SELECT without being in GROUP BY or inside an aggregate.",
    "solution": "1. The WHERE clause filters rows BEFORE groupings are computed. It cannot evaluate `COUNT(*)` because groups do not exist yet.\n2. Group-level filtering must be specified in the `HAVING` clause: `HAVING COUNT(*) > 5`.\n3. Additionally, `manager` is in SELECT without an aggregate function and is missing from GROUP BY, violating the single-value rule.",
    "tags": [
      "debugging",
      "syntax",
      "having-vs-where"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2004
    }
  },
  {
    "id": "gb-009",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "What is the logical order of query execution in SQL among the following clauses?",
    "table": null,
    "sql": "SELECT dept, COUNT(*)\nFROM emp\nWHERE salary > 30000\nGROUP BY dept\nHAVING COUNT(*) >= 2\nORDER BY dept;",
    "options": [
      "SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY",
      "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
      "FROM -> GROUP BY -> WHERE -> HAVING -> SELECT -> ORDER BY",
      "WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> ORDER BY"
    ],
    "correctAnswer": 1,
    "explanation": "The logical processing pipeline starts with FROM (data gathering), WHERE (row filtering), GROUP BY (partitioning), HAVING (group filtering), SELECT (projection), and ORDER BY (sorting).",
    "solution": "1. FROM: Identifies and joins source relations.\n2. WHERE: Evaluates row-level predicate filters.\n3. GROUP BY: Collapses remaining rows into groups.\n4. HAVING: Filters aggregated groups.\n5. SELECT: Evaluates projection expressions, aliases, and aggregates.\n6. ORDER BY: Sorts the final projected rows.",
    "tags": [
      "execution-order",
      "fundamentals"
    ]
  },
  {
    "id": "gb-010",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2017,
    "question": "In relational database theory, which SQL query correctly solves the relational division problem: 'Find student IDs enrolled in ALL courses offered by the CS department'?",
    "table": null,
    "sql": "-- Enrollment(student_id, course_id) and Course(course_id, dept)",
    "options": [
      "SELECT student_id FROM Enrollment E JOIN Course C ON E.course_id = C.course_id WHERE C.dept = 'CS' GROUP BY student_id HAVING COUNT(DISTINCT E.course_id) = (SELECT COUNT(*) FROM Course WHERE dept = 'CS')",
      "SELECT student_id FROM Enrollment E JOIN Course C ON E.course_id = C.course_id WHERE C.dept = 'CS' GROUP BY student_id HAVING COUNT(E.course_id) > 0",
      "SELECT student_id FROM Enrollment WHERE course_id IN (SELECT course_id FROM Course WHERE dept = 'CS')",
      "SELECT student_id FROM Enrollment GROUP BY student_id HAVING COUNT(*) = (SELECT COUNT(*) FROM Course)"
    ],
    "correctAnswer": 0,
    "explanation": "Relational division in SQL requires counting the distinct qualifying courses taken by each student and matching that count against the total number of CS courses.",
    "solution": "1. Subquery `(SELECT COUNT(*) FROM Course WHERE dept = 'CS')` computes the total number of CS courses (say K).\n2. Joining Enrollment with Course on dept = 'CS' filters out non-CS enrollments.\n3. `GROUP BY student_id` aggregates per student.\n4. `HAVING COUNT(DISTINCT E.course_id) = K` ensures the student completed all K distinct CS courses.",
    "tags": [
      "gate",
      "division",
      "having",
      "count-distinct"
    ],
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
    "id": "gb-011",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What is the result of grouping by MULTIPLE columns: 'region' and 'quarter'?",
    "table": {
      "headers": [
        "region",
        "quarter",
        "sales"
      ],
      "rows": [
        [
          "North",
          "Q1",
          100
        ],
        [
          "North",
          "Q1",
          150
        ],
        [
          "North",
          "Q2",
          200
        ],
        [
          "South",
          "Q1",
          300
        ],
        [
          "South",
          "Q2",
          100
        ],
        [
          "South",
          "Q2",
          250
        ]
      ]
    },
    "sql": "SELECT region, quarter, SUM(sales) AS total\nFROM sales_data\nGROUP BY region, quarter\nORDER BY region, quarter;",
    "options": [
      "North Q1: 250 | North Q2: 200 | South Q1: 300 | South Q2: 350",
      "North: 450 | South: 650",
      "Q1: 550 | Q2: 550",
      "6 rows identical to the source table"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple columns in GROUP BY create composite buckets for every unique (region, quarter) combination: (North, Q1)=250, (North, Q2)=200, (South, Q1)=300, (South, Q2)=350.",
    "solution": "1. (North, Q1): 100 + 150 = 250\n2. (North, Q2): 200\n3. (South, Q1): 300\n4. (South, Q2): 100 + 250 = 350\n5. Exactly 4 rows returned, one for each unique (region, quarter) pair.",
    "tags": [
      "multi-column",
      "query-output",
      "sum"
    ]
  },
  {
    "id": "gb-012",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2018,
    "question": "If a query contains a GROUP BY clause on column X, but contains NO aggregate functions in the SELECT list, what is the behavior equivalent to?",
    "table": null,
    "sql": "SELECT X\nFROM my_table\nGROUP BY X;",
    "options": [
      "SELECT DISTINCT X FROM my_table;",
      "SELECT ALL X FROM my_table;",
      "SELECT X, COUNT(*) FROM my_table;",
      "It produces a compile-time syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping by X without aggregate calculations collapses duplicate values into unique occurrences, which is semantically identical to `SELECT DISTINCT X`.",
    "solution": "1. `GROUP BY X` groups all rows by unique values of X.\n2. Since no aggregates are projected, exactly one row per unique value of X is output.\n3. This produces the exact same set of tuples as `SELECT DISTINCT X FROM my_table`.",
    "tags": [
      "distinct",
      "equivalence",
      "concepts"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2018
    }
  },
  {
    "id": "gb-013",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A bank wants to find customers who hold more than 3 active accounts. Which SQL query accomplishes this?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT customer_id, COUNT(*) FROM accounts WHERE status = 'Active' GROUP BY customer_id HAVING COUNT(*) > 3;",
      "SELECT customer_id, COUNT(*) FROM accounts WHERE status = 'Active' AND COUNT(*) > 3 GROUP BY customer_id;",
      "SELECT customer_id FROM accounts GROUP BY customer_id WHERE COUNT(account_id) > 3;",
      "SELECT customer_id, SUM(account_id) FROM accounts HAVING COUNT(*) > 3;"
    ],
    "correctAnswer": 0,
    "explanation": "The query must filter for active accounts using WHERE, group accounts by customer_id, and filter groups having more than 3 accounts using HAVING COUNT(*) > 3.",
    "solution": "1. Filter row level status: `WHERE status = 'Active'`.\n2. Group by customer: `GROUP BY customer_id`.\n3. Filter aggregate condition: `HAVING COUNT(*) > 3`.\n4. Option B incorrectly places an aggregate function in WHERE. Option C has invalid clause order. Option D uses SUM on an ID.",
    "tags": [
      "application",
      "banking",
      "having"
    ]
  },
  {
    "id": "gb-014",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2020,
    "question": "Can an expression (such as EXTRACT(YEAR FROM order_date)) be used as a GROUP BY criterion?",
    "table": null,
    "sql": "SELECT EXTRACT(YEAR FROM order_date) AS order_year, SUM(amount)\nFROM orders\nGROUP BY EXTRACT(YEAR FROM order_date);",
    "options": [
      "Yes, SQL permits grouping by arbitrary expressions of columns",
      "No, GROUP BY only accepts raw physical column names",
      "Only if the expression is defined as a generated column in the schema",
      "Only if wrapped in a stored procedure"
    ],
    "correctAnswer": 0,
    "explanation": "Standard SQL fully supports grouping by expressions (e.g., date parts, mathematical calculations, CASE expressions, string transformations).",
    "solution": "1. SQL evaluates expressions per row before grouping.\n2. Rows resulting in identical values for the evaluated expression are assigned to the same partition.\n3. In ANSI SQL, you repeat the expression in the GROUP BY clause or use the column alias where supported.",
    "tags": [
      "expressions",
      "date-grouping",
      "syntax"
    ],
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
    "id": "gb-015",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "A table T has 20 rows. Attribute A has 4 distinct values (each appearing 5 times). Attribute B has 5 distinct values (each appearing 4 times). What is the MINIMUM possible number of rows returned by GROUP BY A, B?",
    "table": null,
    "sql": "SELECT A, B, COUNT(*)\nFROM T\nGROUP BY A, B;",
    "options": [
      "4",
      "5",
      "1",
      "20"
    ],
    "correctAnswer": 1,
    "explanation": "Since B has 5 distinct values, every distinct value of B must appear in at least one tuple. Hence, there must be at least 5 distinct (A, B) pairs.",
    "solution": "1. The number of groups is the number of distinct (A, B) pairs in the table.\n2. Since attribute B has 5 distinct values, the relation must contain at least 5 distinct pairs to accommodate all 5 distinct B values.\n3. Similarly, since A has 4 distinct values, the pairs must accommodate all 4. The minimum possible number of distinct pairs is max(distinct(A), distinct(B)) = max(4, 5) = 5.\n4. (For example, if the 5 B values are paired with A1, A2, A3, A4, A1 respectively).",
    "tags": [
      "numerical",
      "cardinality",
      "multi-column"
    ]
  },
  {
    "id": "gb-016",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What does the query return on an EMPTY table 'records'?",
    "table": {
      "headers": [
        "category",
        "amount"
      ],
      "rows": []
    },
    "sql": "SELECT category, SUM(amount)\nFROM records\nGROUP BY category;",
    "options": [
      "0 rows (an empty result set)",
      "1 row with (NULL, NULL)",
      "1 row with (NULL, 0)",
      "A database error"
    ],
    "correctAnswer": 0,
    "explanation": "When GROUP BY is applied to an empty table, 0 groups are formed, so 0 rows are returned. (In contrast, scalar aggregation without GROUP BY returns 1 row).",
    "solution": "1. For a query WITH GROUP BY, the number of output rows equals the number of distinct groups formed from the input relation.\n2. With 0 input rows, 0 groups are formed.\n3. Therefore, exactly 0 rows are returned.\n4. (Contrast with scalar aggregation without GROUP BY, which always outputs exactly 1 row).",
    "tags": [
      "empty-table",
      "edge-case",
      "query-output"
    ]
  },
  {
    "id": "gb-017",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2015,
    "question": "What is the difference between scalar aggregation (no GROUP BY) and vector aggregation (with GROUP BY)?",
    "table": null,
    "sql": "-- Scalar:\nSELECT AVG(price) FROM products;\n-- Vector:\nSELECT category, AVG(price) FROM products GROUP BY category;",
    "options": [
      "Scalar aggregation always returns exactly one row; vector aggregation returns zero or more rows, one per group",
      "Scalar aggregation only operates on numbers; vector aggregation operates on strings",
      "Scalar aggregation is executed in parallel; vector aggregation is serial",
      "There is no functional difference"
    ],
    "correctAnswer": 0,
    "explanation": "Scalar aggregates reduce the entire table to a single summary row. Vector aggregates partition the relation and return one row per partition.",
    "solution": "1. Scalar aggregation: no GROUP BY clause. It aggregates the entire table into a single tuple (even on an empty table, returning 1 row with NULL or 0 for COUNT).\n2. Vector aggregation: contains GROUP BY. It aggregates by group, returning one row per group, or 0 rows if the table is empty.",
    "tags": [
      "scalar-vs-vector",
      "concepts"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2015
    }
  },
  {
    "id": "gb-018",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "Original Practice",
    "year": null,
    "question": "A developer wrote this query to list departments with their highest salary, but needs the name of the employee who earns that highest salary. Why will adding 'emp_name' fail?",
    "table": null,
    "sql": "SELECT dept_id, emp_name, MAX(salary)\nFROM employees\nGROUP BY dept_id;",
    "options": [
      "Adding emp_name without grouping by it violates the single-value rule; but grouping by emp_name would break department-level aggregation",
      "SQL does not permit MAX() on salary",
      "emp_name is a reserved keyword in SQL",
      "dept_id cannot be combined with text columns"
    ],
    "correctAnswer": 0,
    "explanation": "If you add emp_name to GROUP BY, the query groups by (dept_id, emp_name), calculating the max salary per individual employee rather than per department. Finding the employee with the max salary requires a subquery or window function (ROW_NUMBER / DENSE_RANK).",
    "solution": "1. To include `emp_name` in SELECT, it must either be aggregated or in GROUP BY.\n2. If added to GROUP BY, every employee forms their own group within the department, defeating the purpose.\n3. If `MAX(emp_name)` is used, it returns the alphabetical max name, which may NOT be the person with the highest salary.\n4. The correct approach is a correlated subquery or window function like `ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC)`.",
    "tags": [
      "debugging",
      "single-value-rule",
      "window-functions"
    ]
  },
  {
    "id": "gb-019",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "In an e-commerce database, an analyst wants to calculate the total revenue and total units sold per product category for completed orders only. Which query is correct?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT c.name, SUM(o.price * o.qty) AS revenue, SUM(o.qty) AS total_units FROM categories c JOIN products p ON c.id = p.cat_id JOIN order_items o ON p.id = o.prod_id WHERE o.order_status = 'Completed' GROUP BY c.name;",
      "SELECT c.name, SUM(o.price * o.qty) AS revenue, SUM(o.qty) AS total_units FROM categories c JOIN products p ON c.id = p.cat_id JOIN order_items o ON p.id = o.prod_id GROUP BY c.name HAVING o.order_status = 'Completed';",
      "SELECT c.name, (o.price * o.qty) AS revenue FROM categories c JOIN products p ON c.id = p.cat_id GROUP BY c.name;",
      "SELECT c.name, COUNT(o.qty) FROM categories c WHERE o.order_status = 'Completed' GROUP BY o.order_status;"
    ],
    "correctAnswer": 0,
    "explanation": "Option A properly filters completed orders at the tuple level with WHERE before computing category-level aggregations with GROUP BY.",
    "solution": "1. Order status is a row-level attribute: filter with `WHERE o.order_status = 'Completed'`.\n2. Join chain: `categories -> products -> order_items`.\n3. Aggregate expressions: `SUM(price * qty)` for revenue and `SUM(qty)` for unit count.\n4. Group by dimension: `GROUP BY c.name`.",
    "tags": [
      "application",
      "e-commerce",
      "joins"
    ]
  },
  {
    "id": "gb-020",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2021,
    "question": "What happens if a column alias defined in the SELECT list is used in the GROUP BY clause in standard ANSI SQL?",
    "table": null,
    "sql": "SELECT city AS c, COUNT(*)\nFROM projects\nGROUP BY c;",
    "options": [
      "Standard ANSI SQL does not allow SELECT aliases in GROUP BY because GROUP BY is evaluated before SELECT",
      "It is always valid in all SQL engines without restriction",
      "Aliases can only be used if they start with an underscore",
      "GROUP BY automatically converts aliases into table names"
    ],
    "correctAnswer": 0,
    "explanation": "Because GROUP BY is evaluated before the SELECT projection in the logical query processing order, column aliases created in SELECT do not exist yet in standard ANSI SQL (though some engines like MySQL provide non-standard extensions).",
    "solution": "1. Logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.\n2. When GROUP BY executes, the SELECT list has not yet been projected, so aliases like `c` are technically not in scope in ANSI SQL.\n3. ORDER BY, however, executes after SELECT and can legally reference SELECT aliases.",
    "tags": [
      "ansi-sql",
      "aliases",
      "execution-order"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2021
    }
  },
  {
    "id": "gb-021",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Examine the 'courses' table. What is the output of the query?",
    "table": {
      "headers": [
        "course_id",
        "dept",
        "credits"
      ],
      "rows": [
        [
          "CS101",
          "CSE",
          4
        ],
        [
          "CS102",
          "CSE",
          3
        ],
        [
          "EC201",
          "ECE",
          4
        ],
        [
          "ME301",
          "MECH",
          3
        ],
        [
          "EC202",
          "ECE",
          4
        ]
      ]
    },
    "sql": "SELECT dept, COUNT(course_id) AS num_courses, SUM(credits) AS total_cr\nFROM courses\nGROUP BY dept\nHAVING SUM(credits) >= 7\nORDER BY total_cr DESC;",
    "options": [
      "ECE: 2, 8 | CSE: 2, 7",
      "CSE: 2, 7 | ECE: 2, 8",
      "ECE: 2, 8 | CSE: 2, 7 | MECH: 1, 3",
      "CSE: 2, 7"
    ],
    "correctAnswer": 0,
    "explanation": "CSE total credits = 4+3=7. ECE total credits = 4+4=8. MECH total credits = 3 (<7, filtered out by HAVING). ORDER BY total_cr DESC sorts ECE (8) before CSE (7).",
    "solution": "1. Group 'CSE': count=2, total_cr = 4 + 3 = 7. Passes HAVING (>= 7).\n2. Group 'ECE': count=2, total_cr = 4 + 4 = 8. Passes HAVING (>= 7).\n3. Group 'MECH': count=1, total_cr = 3. Fails HAVING (3 < 7), discarded.\n4. ORDER BY total_cr DESC orders: ECE (8), then CSE (7).",
    "tags": [
      "query-output",
      "having",
      "sum"
    ]
  },
  {
    "id": "gb-022",
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2021,
    "question": "Consider relation R(A, B) containing 10 tuples, where A is a candidate key. What is the number of tuples returned by: SELECT A, SUM(B) FROM R GROUP BY A?",
    "table": null,
    "sql": "SELECT A, SUM(B)\nFROM R\nGROUP BY A;",
    "options": [
      "Exactly 10 tuples",
      "Between 1 and 10 tuples depending on B",
      "Exactly 1 tuple",
      "0 tuples"
    ],
    "correctAnswer": 0,
    "explanation": "Because A is a candidate key, all 10 tuples must have pairwise distinct values of A. Therefore, exactly 10 distinct groups are formed, yielding exactly 10 output rows.",
    "solution": "1. A candidate key contains unique values for every tuple in the relation.\n2. Since R has 10 tuples, there are exactly 10 unique values of A.\n3. `GROUP BY A` creates one group per unique value of A.\n4. Therefore, exactly 10 groups are formed and 10 rows are returned.",
    "tags": [
      "gate",
      "candidate-key",
      "cardinality"
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
    "id": "ro-001",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2018,
    "question": "What is the primary operational distinction of the ROLLUP extension compared to standard GROUP BY?",
    "table": null,
    "sql": "SELECT region, city, SUM(sales)\nFROM sales_data\nGROUP BY ROLLUP(region, city);",
    "options": [
      "ROLLUP generates hierarchical subtotal rows and a single overarching grand total row from right to left",
      "ROLLUP computes all 2^N possible cross-dimensional combinations of the specified attributes",
      "ROLLUP replaces all NULL values in the dataset with zeros",
      "ROLLUP pivots rows into dynamic columns"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP creates a hierarchical aggregation ladder. For N grouping columns, it produces N+1 grouping sets by progressively dropping columns from right to left, concluding in an empty grouping set () representing the Grand Total.",
    "solution": "1. Standard GROUP BY(A, B) only computes aggregates at the (A, B) grain.\n2. ROLLUP(A, B) produces 3 grouping sets: (A, B) [detailed], (A) [subtotal by A], and () [grand total across all data].\n3. This satisfies hierarchical reporting requirements (e.g. Year -> Quarter -> Month or Region -> City).",
    "tags": [
      "rollup",
      "hierarchy",
      "grouping-sets"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2018
    }
  },
  {
    "id": "ro-002",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Numerical",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2020,
    "question": "For a query specifying ROLLUP with N independent attributes: GROUP BY ROLLUP(A1, A2, ..., An), how many distinct grouping sets are generated?",
    "table": null,
    "sql": "GROUP BY ROLLUP(A1, A2, ..., An)",
    "options": [
      "N + 1",
      "2^N",
      "N * (N + 1) / 2",
      "N!"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP produces exactly N + 1 grouping sets, starting from (A1, A2, ..., An) down to the empty set ().",
    "solution": "1. Level N: (A1, A2, ..., An)\n2. Level N-1: (A1, A2, ..., An-1)\n...\nN. Level 1: (A1)\nN+1. Level 0: ()\nTotal grouping sets = N + 1.",
    "tags": [
      "rollup",
      "formula",
      "cardinality"
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
    "id": "ro-003",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "In the result of 'GROUP BY ROLLUP(zone, city)', what does a NULL value in the 'city' column signify in a row where 'zone' is 'West'?",
    "table": {
      "headers": [
        "zone",
        "city",
        "total_budget"
      ],
      "rows": [
        [
          "West",
          "Mumbai",
          85000000
        ],
        [
          "West",
          "Pune",
          31000000
        ],
        [
          "West",
          null,
          116000000
        ]
      ]
    },
    "sql": "SELECT zone, city, SUM(budget) AS total_budget\nFROM projects\nGROUP BY ROLLUP(zone, city);",
    "options": [
      "It represents a subtotal row aggregating all cities across the 'West' zone",
      "There was a corrupted record with missing city data in the source table",
      "The city of Mumbai had zero projects recorded",
      "An SQL runtime error occurred during grouping"
    ],
    "correctAnswer": 0,
    "explanation": "In ROLLUP output, a NULL in an attribute column indicates that the attribute has been rolled up (aggregated over). Here, city=NULL alongside zone='West' denotes the Zone Subtotal for the West zone.",
    "solution": "1. The row ('West', 'Mumbai', 85M) is the detail group for Mumbai in West.\n2. The row ('West', 'Pune', 31M) is the detail group for Pune in West.\n3. The row ('West', NULL, 116M) has city rolled up: 85M + 31M = 116M. NULL indicates the subtotal across all cities in the West zone.\n4. (A row with NULL in both zone and city represents the overall Grand Total).",
    "tags": [
      "null-interpretation",
      "subtotals",
      "rollup"
    ]
  },
  {
    "id": "ro-004",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given the table 'branch_sales', how many total rows will be returned by the query?",
    "table": {
      "headers": [
        "state",
        "branch",
        "revenue"
      ],
      "rows": [
        [
          "MH",
          "B1",
          100
        ],
        [
          "MH",
          "B2",
          150
        ],
        [
          "KA",
          "B3",
          200
        ]
      ]
    },
    "sql": "SELECT state, branch, SUM(revenue)\nFROM branch_sales\nGROUP BY ROLLUP(state, branch);",
    "options": [
      "6 rows (3 detail rows + 2 state subtotals + 1 grand total)",
      "4 rows (3 detail rows + 1 grand total)",
      "3 rows (detail rows only)",
      "8 rows (all combinations)"
    ],
    "correctAnswer": 0,
    "explanation": "Detail rows (state, branch): (MH, B1), (MH, B2), (KA, B3) [3 rows]. State subtotals (state, NULL): (MH, NULL), (KA, NULL) [2 rows]. Grand total (NULL, NULL): [1 row]. Total = 3 + 2 + 1 = 6 rows.",
    "solution": "1. Detail rows: (MH, B1): 100, (MH, B2): 150, (KA, B3): 200 -> 3 rows\n2. Subtotals for grouping set (state): (MH, NULL): 250, (KA, NULL): 200 -> 2 rows\n3. Grand Total for grouping set (): (NULL, NULL): 450 -> 1 row\n4. Total rows = 3 + 2 + 1 = 6 rows.",
    "tags": [
      "query-output",
      "row-count",
      "rollup"
    ]
  },
  {
    "id": "ro-005",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2019,
    "question": "How do you distinguish whether a NULL in a ROLLUP result set came from an actual NULL stored in the source table vs. an aggregate subtotal row generated by the engine?",
    "table": null,
    "sql": "SELECT zone, city, GROUPING(city) AS is_subtotal, SUM(budget)\nFROM projects\nGROUP BY ROLLUP(zone, city);",
    "options": [
      "Using the standard SQL GROUPING() or GROUPING_ID() function, which returns 1 for aggregated subtotal NULLs and 0 for actual data",
      "By checking if the budget column is negative",
      "It is impossible to distinguish them in standard SQL",
      "By casting the column to VARCHAR and checking for the string 'NULL'"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL provides the `GROUPING(column)` function. It returns 1 if the column is currently aggregated (rolled up) in that row, and 0 if the value is part of the grouping set.",
    "solution": "1. If a table contains an actual record with `city IS NULL`, `city` in the output will be NULL with `GROUPING(city) = 0`.\n2. In a subtotal row where `city` has been aggregated out, `city` is NULL and `GROUPING(city) = 1`.\n3. This allows expressions like: `CASE WHEN GROUPING(city)=1 THEN 'All Cities' ELSE city END`.",
    "tags": [
      "grouping-function",
      "null-handling",
      "advanced-sql"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2019
    }
  },
  {
    "id": "ro-006",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2020,
    "question": "Does the order of attributes in a ROLLUP clause matter?",
    "table": null,
    "sql": "-- Query 1:\nGROUP BY ROLLUP(A, B)\n-- Query 2:\nGROUP BY ROLLUP(B, A)",
    "options": [
      "Yes! ROLLUP(A, B) generates sets (A, B), (A), (), whereas ROLLUP(B, A) generates (B, A), (B), ()",
      "No, set theory dictates that order in grouping sets is always irrelevant",
      "Only if one of the columns has a UNIQUE constraint",
      "Only when sorting with ORDER BY"
    ],
    "correctAnswer": 0,
    "explanation": "Unlike basic GROUP BY where order is irrelevant, ROLLUP establishes a strict hierarchy from left to right. ROLLUP(A, B) calculates subtotals per A, whereas ROLLUP(B, A) calculates subtotals per B.",
    "solution": "1. ROLLUP is asymmetric because it drops attributes progressively from right to left.\n2. ROLLUP(A, B) produces: {(A, B), (A), ()}.\n3. ROLLUP(B, A) produces: {(B, A), (B), ()}.\n4. If A is Country and B is City, ROLLUP(Country, City) produces Country subtotals. ROLLUP(City, Country) would produce City subtotals, which represents an inverted hierarchy.",
    "tags": [
      "order-sensitivity",
      "hierarchy",
      "rollup"
    ],
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
    "id": "ro-007",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2022,
    "question": "Consider partial rollup: 'GROUP BY A, ROLLUP(B, C)'. Which grouping sets are generated?",
    "table": null,
    "sql": "SELECT A, B, C, COUNT(*)\nFROM T\nGROUP BY A, ROLLUP(B, C);",
    "options": [
      "(A, B, C), (A, B), and (A)",
      "(A, B, C), (B, C), and ()",
      "(A, B, C), (A, B), (A), and ()",
      "(A, B, C), (A, C), and (A)"
    ],
    "correctAnswer": 0,
    "explanation": "Attribute A is an invariant grouping column outside ROLLUP. Expanding ROLLUP(B, C) gives sets (B, C), (B), and (). Concatenating A to each set produces: (A, B, C), (A, B), and (A).",
    "solution": "1. The ROLLUP expression `ROLLUP(B, C)` expands to grouping sets: {(B, C), (B), ()}.\n2. Column A is outside the rollup, so it is prefixed to every resulting set.\n3. A × {(B, C), (B), ()} = {(A, B, C), (A, B), (A)}.\n4. Notice that no overall Grand Total () is generated because A is present in every grouping set.",
    "tags": [
      "partial-rollup",
      "grouping-sets",
      "advanced"
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
    "id": "ro-008",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "Given a sales table with 3 regions (North, South, East), each having 4 cities, and every city has at least one recorded sale. How many total rows are produced by 'GROUP BY ROLLUP(region, city)'?",
    "table": null,
    "sql": "SELECT region, city, SUM(sales)\nFROM regional_sales\nGROUP BY ROLLUP(region, city);",
    "options": [
      "16 rows (12 detail + 3 region subtotals + 1 grand total)",
      "13 rows (12 detail + 1 grand total)",
      "15 rows (12 detail + 3 region subtotals)",
      "24 rows"
    ],
    "correctAnswer": 0,
    "explanation": "3 regions * 4 cities = 12 detail rows (region, city). 3 region subtotal rows (region, NULL). 1 grand total row (NULL, NULL). Total = 12 + 3 + 1 = 16 rows.",
    "solution": "1. Detail rows at (region, city) grain: 3 * 4 = 12.\n2. Subtotal rows at (region) grain: 3 distinct regions = 3.\n3. Grand Total row at () grain: 1.\n4. Total rows = 12 + 3 + 1 = 16 rows.",
    "tags": [
      "numerical",
      "row-count",
      "rollup"
    ]
  },
  {
    "id": "ro-009",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "In what real-world reporting scenario is ROLLUP most naturally applicable?",
    "table": null,
    "sql": null,
    "options": [
      "Strict hierarchical dimensions such as Year -> Quarter -> Month -> Day, or Country -> State -> City",
      "Independent cross-dimensional matrices like Product Color vs. Buyer Gender",
      "Finding shortest paths in relational graph tables",
      "Full-text search indexing"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP is engineered specifically for hierarchical aggregation ladders where lower levels naturally roll up into higher parent levels (e.g. Month -> Quarter -> Year or City -> State -> Country).",
    "solution": "1. Hierarchical dimensions have a 1-to-many parent-child relationship.\n2. A city belongs to one state, and a state belongs to one country.\n3. Summaries make intuitive sense along this ladder (City total -> State subtotal -> Country total -> Global Grand Total).\n4. ROLLUP matches this exact reporting structure.",
    "tags": [
      "use-cases",
      "hierarchy",
      "real-world"
    ]
  },
  {
    "id": "ro-010",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Examine the query output. What is the value of the Grand Total?",
    "table": {
      "headers": [
        "dept",
        "shift",
        "headcount",
        "daily_wage"
      ],
      "rows": [
        [
          "Civil",
          "Day",
          10,
          2000
        ],
        [
          "Civil",
          "Night",
          5,
          2500
        ],
        [
          "Elec",
          "Day",
          4,
          3000
        ]
      ]
    },
    "sql": "SELECT dept, shift, SUM(headcount * daily_wage) AS total_payroll\nFROM workforce\nGROUP BY ROLLUP(dept, shift);",
    "options": [
      "₹44,500",
      "₹32,500",
      "₹7,500",
      "₹12,000"
    ],
    "correctAnswer": 0,
    "explanation": "Civil Day: 10*2000 = 20000. Civil Night: 5*2500 = 12500. Civil Subtotal = 32500. Elec Day: 4*3000 = 12000. Elec Subtotal = 12000. Grand Total = 32500 + 12000 = 44500.",
    "solution": "1. Row 1 (Civil, Day): 10 * 2000 = 20,000\n2. Row 2 (Civil, Night): 5 * 2500 = 12,500\n3. Civil subtotal: 20,000 + 12,500 = 32,500\n4. Row 3 (Elec, Day): 4 * 3000 = 12,000\n5. Elec subtotal: 12,000\n6. Grand total (): 32,500 + 12,000 = 44,500.",
    "tags": [
      "query-output",
      "numerical",
      "workforce"
    ]
  },
  {
    "id": "ro-011",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "BARC",
    "exam": "Scientific Officer (Computer Science)",
    "year": 2022,
    "question": "A user wrote: 'SELECT dept, AVG(salary) FROM emp GROUP BY ROLLUP(dept) HAVING dept IS NOT NULL;'. What unintended effect does this query have?",
    "table": null,
    "sql": "SELECT dept, AVG(salary)\nFROM emp\nGROUP BY ROLLUP(dept)\nHAVING dept IS NOT NULL;",
    "options": [
      "It filters out the Grand Total row, reducing the query back to a regular GROUP BY",
      "It causes a fatal SQL syntax error",
      "It inverts the order of department subtotals",
      "It replaces salary with NULL"
    ],
    "correctAnswer": 0,
    "explanation": "In the Grand Total row generated by ROLLUP(dept), the 'dept' column is NULL. Applying `HAVING dept IS NOT NULL` discards this row, effectively negating the entire purpose of ROLLUP.",
    "solution": "1. ROLLUP(dept) creates two grouping sets: (dept) and ().\n2. For the () set (the grand total), the column `dept` is given the value NULL.\n3. The condition `HAVING dept IS NOT NULL` evaluates to false on the grand total row and discards it.\n4. As a result, only the basic `(dept)` rows remain, which is identical to plain `GROUP BY dept`.",
    "tags": [
      "debugging",
      "having",
      "grand-total"
    ],
    "sourceType": "competitive",
    "institution": "BARC",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "BARC",
      "exam": "Scientific Officer (Computer Science)",
      "year": 2022
    }
  },
  {
    "id": "ro-012",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A civil engineering contractor needs a financial report showing project expenditures by Zone, then City within Zone, with Zone subtotals and an overall Grand Total. Which SQL statement achieves this?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT zone, city, SUM(budget) FROM projects GROUP BY ROLLUP(zone, city);",
      "SELECT zone, city, SUM(budget) FROM projects GROUP BY CUBE(zone, city);",
      "SELECT zone, city, SUM(budget) FROM projects GROUP BY zone, city;",
      "SELECT zone, city, SUM(budget) FROM projects GROUP BY city, zone WITH CUBE;"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP(zone, city) provides the exact hierarchy required: detail rows (zone, city), zone-level subtotals (zone), and the overall grand total ().",
    "solution": "1. The hierarchy is Zone -> City.\n2. Detail level: (zone, city).\n3. Intermediate subtotal: (zone).\n4. Top level: ().\n5. GROUP BY ROLLUP(zone, city) generates exactly these three grouping sets.",
    "tags": [
      "application",
      "construction",
      "hierarchy"
    ]
  },
  {
    "id": "ro-013",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "TIFR",
    "exam": "Computer & Systems Sciences",
    "year": 2021,
    "question": "What grouping sets are generated by composite columns inside a rollup: 'GROUP BY ROLLUP((year, quarter), month)'?",
    "table": null,
    "sql": "SELECT year, quarter, month, SUM(revenue)\nFROM financial_records\nGROUP BY ROLLUP((year, quarter), month);",
    "options": [
      "{(year, quarter, month), (year, quarter), ()}",
      "{(year, quarter, month), (year), (quarter), ()}",
      "{(year, quarter, month), (year, quarter), (year), ()}",
      "{(year, quarter, month), (month), ()}"
    ],
    "correctAnswer": 0,
    "explanation": "Enclosing (year, quarter) in parentheses treats them as a single composite unit. The rollup treats them as one attribute, producing: {(year, quarter, month), (year, quarter), ()}.",
    "solution": "1. When attributes are enclosed in parentheses like `(year, quarter)`, they form a composite column treated as a single element X.\n2. The expression becomes `ROLLUP(X, month)`.\n3. ROLLUP(X, month) expands to {(X, month), (X), ()}.\n4. Substituting X back gives: {(year, quarter, month), (year, quarter), ()}.\n5. Individual subtotals for year alone or quarter alone are NOT generated.",
    "tags": [
      "composite-columns",
      "advanced-rollup",
      "grouping-sets"
    ],
    "sourceType": "competitive",
    "institution": "TIFR",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "TIFR",
      "exam": "Computer & Systems Sciences",
      "year": 2021
    }
  },
  {
    "id": "ro-014",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "How can you cleanly format the NULL in a ROLLUP subtotal row to display 'Subtotal' or 'Grand Total' in the UI?",
    "table": null,
    "sql": "SELECT \n    COALESCE(zone, 'GRAND TOTAL') AS zone_display,\n    SUM(budget)\nFROM projects\nGROUP BY ROLLUP(zone);",
    "options": [
      "Using the COALESCE() or IFNULL() function to replace the NULL placeholder with descriptive label text",
      "By adding an extra WHERE clause",
      "By configuring the database collation",
      "It requires writing a custom C++ plugin"
    ],
    "correctAnswer": 0,
    "explanation": "COALESCE(column, 'Grand Total') returns the column value when non-null, and gracefully falls back to 'Grand Total' for the rolled-up row.",
    "solution": "1. When a column is aggregated out in a ROLLUP row, its value is NULL.\n2. `COALESCE(val, replacement)` returns replacement when val is NULL.\n3. Hence, `COALESCE(zone, '--- ALL ZONES (GRAND TOTAL) ---')` converts the NULL into an informative label.",
    "tags": [
      "coalesce",
      "formatting",
      "ui"
    ]
  },
  {
    "id": "ro-015",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What is the result of applying ROLLUP on a single column: 'GROUP BY ROLLUP(category)'?",
    "table": {
      "headers": [
        "category",
        "cost"
      ],
      "rows": [
        [
          "Structural",
          300
        ],
        [
          "Electrical",
          200
        ]
      ]
    },
    "sql": "SELECT category, SUM(cost) AS total_cost\nFROM inventory\nGROUP BY ROLLUP(category);",
    "options": [
      "3 rows: Structural: 300, Electrical: 200, and NULL (Grand Total): 500",
      "2 rows: Structural: 300, Electrical: 200",
      "1 row: NULL: 500",
      "4 rows with repeated totals"
    ],
    "correctAnswer": 0,
    "explanation": "For a single attribute N=1, ROLLUP produces N+1 = 2 grouping sets: (category) and (). That yields 2 category detail rows and 1 overall grand total row (total = 3 rows).",
    "solution": "1. Grouping set 1 `(category)` produces: ('Structural', 300) and ('Electrical', 200).\n2. Grouping set 2 `()` produces the grand total: (NULL, 500).\n3. Total output rows = 3 rows.",
    "tags": [
      "single-column-rollup",
      "query-output"
    ]
  },
  {
    "id": "ro-016",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "TIFR",
    "exam": "Computer & Systems Sciences",
    "year": 2018,
    "question": "A company has 2 divisions, each with 3 departments, and each department has 4 project teams. Assuming all combinations exist, how many rows are returned by: GROUP BY ROLLUP(division, department, team)?",
    "table": null,
    "sql": "SELECT division, department, team, COUNT(*)\nFROM staff\nGROUP BY ROLLUP(division, department, team);",
    "options": [
      "33 rows",
      "24 rows",
      "31 rows",
      "48 rows"
    ],
    "correctAnswer": 0,
    "explanation": "Detail (div, dept, team) = 2*3*4 = 24 rows. Subtotals (div, dept) = 2*3 = 6 rows. Subtotals (div) = 2 rows. Grand total () = 1 row. Total = 24 + 6 + 2 + 1 = 33 rows.",
    "solution": "1. Level 3 (division, department, team): 2 * 3 * 4 = 24 rows.\n2. Level 2 (division, department): 2 * 3 = 6 rows.\n3. Level 1 (division): 2 rows.\n4. Level 0 (): 1 row.\n5. Sum = 24 + 6 + 2 + 1 = 33 rows.",
    "tags": [
      "numerical",
      "row-count",
      "3-level-rollup"
    ],
    "sourceType": "competitive",
    "institution": "TIFR",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "TIFR",
      "exam": "Computer & Systems Sciences",
      "year": 2018
    }
  },
  {
    "id": "ro-017",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2021,
    "question": "Under the SQL:1999 standard, how is ROLLUP(A, B) formally represented using the GROUPING SETS construct?",
    "table": null,
    "sql": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B), ())",
      "GROUP BY GROUPING SETS ((A), (B), (A, B))",
      "GROUP BY GROUPING SETS ((A, B), ())"
    ],
    "correctAnswer": 0,
    "explanation": "In ANSI SQL:1999, `GROUP BY ROLLUP(A, B)` is pure syntactic sugar for `GROUP BY GROUPING SETS ((A, B), (A), ())`.",
    "solution": "1. The GROUPING SETS clause allows explicit specification of multiple grouping sets in a single query.\n2. ROLLUP(A, B) generates sets by successively removing columns from the right.\n3. Thus, ROLLUP(A, B) is exactly equivalent to `GROUPING SETS ((A, B), (A), ())`.",
    "tags": [
      "grouping-sets",
      "ansi-sql-1999",
      "equivalence"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2021
    }
  },
  {
    "id": "ro-018",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "Original Practice",
    "year": null,
    "question": "A query uses: 'SELECT zone, city, budget FROM projects GROUP BY ROLLUP(zone, city);'. Why does this query fail in standard SQL?",
    "table": null,
    "sql": "SELECT zone, city, budget\nFROM projects\nGROUP BY ROLLUP(zone, city);",
    "options": [
      "The 'budget' column is neither aggregated (e.g. SUM(budget)) nor part of the grouping columns",
      "ROLLUP cannot accept more than one column",
      "The table name must be in uppercase",
      "ROLLUP queries require an ORDER BY clause"
    ],
    "correctAnswer": 0,
    "explanation": "Even with ROLLUP, the single-value rule applies: every unaggregated column in SELECT must be an attribute of the grouping set.",
    "solution": "1. In standard SQL, selecting raw `budget` produces ambiguity when multiple rows are collapsed into subtotal and grand total rows.\n2. An aggregate function such as `SUM(budget)` or `AVG(budget)` must be used.",
    "tags": [
      "debugging",
      "syntax",
      "single-value-rule"
    ]
  },
  {
    "id": "ro-019",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A sales manager wants to calculate sales subtotals per country and per region within each country, but does NOT want city subtotals. Which clause is appropriate?",
    "table": null,
    "sql": null,
    "options": [
      "GROUP BY country, ROLLUP(region, city)",
      "GROUP BY ROLLUP(country, region), city",
      "GROUP BY CUBE(country, region, city)",
      "GROUP BY country, region, city"
    ],
    "correctAnswer": 0,
    "explanation": "In `GROUP BY country, ROLLUP(region, city)`, country is always present. ROLLUP(region, city) generates (region, city), (region), and (). Prefixed with country, we get: (country, region, city), (country, region), and (country). This gives country and region subtotals without city subtotals.",
    "solution": "1. Grouping sets produced: {(country, region, city), (country, region), (country)}.\n2. Subtotals exist for (country, region) and (country).\n3. City alone is never aggregated independently.",
    "tags": [
      "application",
      "partial-rollup",
      "business-logic"
    ]
  },
  {
    "id": "ro-020",
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2020,
    "question": "What is the return value of GROUPING_ID(A, B) on the Grand Total row in a query using 'GROUP BY ROLLUP(A, B)'?",
    "table": null,
    "sql": "SELECT A, B, GROUPING_ID(A, B) AS gid, SUM(val)\nFROM T\nGROUP BY ROLLUP(A, B);",
    "options": [
      "3 (binary 11)",
      "0 (binary 00)",
      "1 (binary 01)",
      "2 (binary 10)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUPING_ID(A, B) constructs a bitmask where a bit is 1 if the corresponding column is aggregated out (subtotal/grand total) and 0 if grouped. In the Grand Total row, both A and B are aggregated out: bitmask = 11 in binary = 3 in decimal.",
    "solution": "1. For grouping set (A, B): A is present (0), B is present (0) -> binary 00 = 0.\n2. For grouping set (A): A is present (0), B is rolled up (1) -> binary 01 = 1.\n3. For grand total (): A is rolled up (1), B is rolled up (1) -> binary 11 = 3 in decimal.\n4. Hence, GROUPING_ID(A, B) equals 3.",
    "tags": [
      "grouping-id",
      "bitmask",
      "olap"
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
    "id": "ro-021",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2019,
    "question": "What dialect syntax did older versions of Microsoft SQL Server and MySQL use before adopting standard ANSI 'GROUP BY ROLLUP(A, B)'?",
    "table": null,
    "sql": "-- Alternative syntax:\nSELECT A, SUM(B)\nFROM T\nGROUP BY A WITH ROLLUP;",
    "options": [
      "GROUP BY A WITH ROLLUP",
      "GROUP BY A ROLLUP",
      "ROLLUP BY A",
      "GROUP BY A ASCENDING ROLLUP"
    ],
    "correctAnswer": 0,
    "explanation": "Older MySQL and Transact-SQL supported the `GROUP BY col WITH ROLLUP` syntax. Modern SQL engines and ANSI standard use `GROUP BY ROLLUP(col1, col2)`.",
    "solution": "1. The clause `GROUP BY A, B WITH ROLLUP` was widely used in MySQL 5.x and T-SQL.\n2. ANSI SQL-99 formalized the function syntax `GROUP BY ROLLUP(A, B)`.\n3. Our AlaSQL engine internally adapts ANSI `ROLLUP(A, B)` to `A, B WITH ROLLUP` for universal browser compatibility.",
    "tags": [
      "sql-dialects",
      "with-rollup",
      "compatibility"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2019
    }
  },
  {
    "id": "ro-022",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Look at the query below. If 'orders' contains 5 orders across 2 customers, what will COUNT(*) show on the row where customer_id IS NULL?",
    "table": null,
    "sql": "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY ROLLUP(customer_id);",
    "options": [
      "5 (the grand total count of all orders across all customers)",
      "2 (the number of customers)",
      "NULL",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "The row with customer_id = NULL is the Grand Total row. In this row, COUNT(*) aggregates over the entire table, giving the grand total of 5 orders.",
    "solution": "1. Detail rows: Customer 1 (say 3 orders), Customer 2 (say 2 orders).\n2. The rolled up row () has customer_id = NULL.\n3. The aggregate `COUNT(*)` for the () grouping set computes the count of all 5 tuples in the relation.\n4. Therefore, it outputs 5.",
    "tags": [
      "grand-total",
      "count",
      "query-output"
    ]
  },
  {
    "id": "cu-001",
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2016,
    "question": "What is the defining operational behavior of the CUBE clause compared to ROLLUP in SQL?",
    "table": null,
    "sql": "SELECT region, product, SUM(sales)\nFROM sales_data\nGROUP BY CUBE(region, product);",
    "options": [
      "CUBE produces all 2^N possible cross-dimensional grouping sets, whereas ROLLUP only produces N+1 hierarchical sets",
      "CUBE sorts the result table in a 3D matrix inside the database engine",
      "CUBE only works on tables with numeric data types",
      "CUBE deletes records that have duplicate keys"
    ],
    "correctAnswer": 0,
    "explanation": "For N grouping dimensions, CUBE calculates aggregations across the entire power set of grouping attributes (all 2^N combinations), generating an exhaustive multidimensional cross-tabulation.",
    "solution": "1. ROLLUP(A, B) creates N+1 = 3 sets: {(A, B), (A), ()}.\n2. CUBE(A, B) creates 2^N = 2^2 = 4 sets: {(A, B), (A), (B), ()}.\n3. Notice that (B) is computed independently of A in CUBE, creating full combinatorial cross-tabulation.",
    "tags": [
      "cube",
      "combinations",
      "power-set"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2016
    }
  },
  {
    "id": "cu-002",
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Numerical",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2017,
    "question": "How many distinct grouping sets are generated by 'GROUP BY CUBE(A, B, C)'?",
    "table": null,
    "sql": "GROUP BY CUBE(A, B, C)",
    "options": [
      "8 (2^3)",
      "4 (3 + 1)",
      "6 (3 * 2)",
      "9 (3^2)"
    ],
    "correctAnswer": 0,
    "explanation": "For 3 attributes, CUBE computes 2^3 = 8 grouping sets: (A, B, C), (A, B), (A, C), (B, C), (A), (B), (C), and ().",
    "solution": "1. Formula: Number of grouping sets = 2^N.\n2. Here N = 3.\n3. 2^3 = 8 distinct grouping sets.\n4. Sets: {(A, B, C), (A, B), (A, C), (B, C), (A), (B), (C), ()}.",
    "tags": [
      "cube",
      "cardinality",
      "numerical"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2017
    }
  },
  {
    "id": "cu-003",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "Which grouping set is generated by CUBE(A, B) that is NEVER generated by ROLLUP(A, B)?",
    "table": null,
    "sql": "-- Compare:\nGROUP BY CUBE(A, B)\nGROUP BY ROLLUP(A, B)",
    "options": [
      "(B)",
      "(A)",
      "(A, B)",
      "()"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP(A, B) drops columns from right to left, generating (A, B), (A), and (). It never aggregates by B alone. CUBE(A, B) generates all combinations, including (B).",
    "solution": "1. ROLLUP(A, B) grouping sets: {(A, B), (A), ()}.\n2. CUBE(A, B) grouping sets: {(A, B), (A), (B), ()}.\n3. The distinct grouping set unique to CUBE is (B).",
    "tags": [
      "cube-vs-rollup",
      "grouping-sets",
      "subtotals"
    ]
  },
  {
    "id": "cu-004",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given table 'shipments', how many rows are in the result of the CUBE query?",
    "table": {
      "headers": [
        "origin",
        "dest",
        "cost"
      ],
      "rows": [
        [
          "Mumbai",
          "Delhi",
          500
        ],
        [
          "Pune",
          "Goa",
          300
        ]
      ]
    },
    "sql": "SELECT origin, dest, SUM(cost)\nFROM shipments\nGROUP BY CUBE(origin, dest);",
    "options": [
      "7 rows (2 detail + 2 origin subtotals + 2 dest subtotals + 1 grand total)",
      "4 rows",
      "8 rows",
      "5 rows"
    ],
    "correctAnswer": 0,
    "explanation": "Detail rows (origin, dest): (Mumbai, Delhi) & (Pune, Goa) -> 2 rows. Origin subtotals (origin, NULL): Mumbai & Pune -> 2 rows. Dest subtotals (NULL, dest): Delhi & Goa -> 2 rows. Grand total (NULL, NULL): -> 1 row. Total = 2 + 2 + 2 + 1 = 7 rows.",
    "solution": "1. Grouping set (origin, dest): (Mumbai, Delhi)=500, (Pune, Goa)=300 -> 2 rows\n2. Grouping set (origin): (Mumbai, NULL)=500, (Pune, NULL)=300 -> 2 rows\n3. Grouping set (dest): (NULL, Delhi)=500, (NULL, Goa)=300 -> 2 rows\n4. Grouping set (): (NULL, NULL)=800 -> 1 row\n5. Total output rows = 2 + 2 + 2 + 1 = 7 rows.",
    "tags": [
      "query-output",
      "cube",
      "row-count"
    ]
  },
  {
    "id": "cu-005",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2020,
    "question": "If an enterprise dataset has 4 independent analytical dimensions in a data warehouse: CUBE(region, channel, product, year), how many total grouping sets does the database optimizer construct?",
    "table": null,
    "sql": "SELECT region, channel, product, year, SUM(sales)\nFROM fact_sales\nGROUP BY CUBE(region, channel, product, year);",
    "options": [
      "16 grouping sets",
      "5 grouping sets",
      "24 grouping sets",
      "64 grouping sets"
    ],
    "correctAnswer": 0,
    "explanation": "N = 4 dimensions. Number of grouping sets = 2^4 = 16.",
    "solution": "1. The formula for the power set size of N attributes is 2^N.\n2. For N = 4: 2^4 = 16 grouping sets.\n3. These range from 4-dimensional grain (region, channel, product, year) down to 0-dimensional Grand Total ().",
    "tags": [
      "numerical",
      "power-set",
      "data-warehouse"
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
    "id": "cu-006",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "In what business intelligence scenario is CUBE preferred over ROLLUP?",
    "table": null,
    "sql": null,
    "options": [
      "When dimensions are non-hierarchical and cross-cutting, such as Product Category vs. Customer Demographics vs. Sales Channel",
      "When data has a strict parent-child geographic hierarchy (Country -> State -> City)",
      "When performing batch bulk updates on raw disk files",
      "When running transactional single-row inserts"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE is ideal for multidimensional ad-hoc slice-and-dice OLAP analysis across independent (orthogonal) dimensions, where users need subtotals along every combination of axes.",
    "solution": "1. ROLLUP assumes hierarchy (A contains B contains C).\n2. CUBE assumes orthogonal dimensions (e.g., Demographics, Channel, Category).\n3. Any dimension can be analyzed independently or combined with any other.\n4. CUBE provides the complete pivot table matrix.",
    "tags": [
      "olap",
      "business-intelligence",
      "use-cases"
    ]
  },
  {
    "id": "cu-007",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2020,
    "question": "Under the SQL standard, which GROUPING SETS expression is completely equivalent to 'GROUP BY CUBE(A, B)'?",
    "table": null,
    "sql": null,
    "options": [
      "GROUP BY GROUPING SETS ((A, B), (A), (B), ())",
      "GROUP BY GROUPING SETS ((A, B), (A), ())",
      "GROUP BY GROUPING SETS ((A, B), (B, A))",
      "GROUP BY GROUPING SETS ((A), (B))"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE(A, B) expands to all subsets of {A, B}: the 2-element set (A, B), the two 1-element sets (A) and (B), and the 0-element empty set ().",
    "solution": "1. The mathematical definition of CUBE(A1, ..., An) is the union of all 2^N grouping sets.\n2. For {A, B}, the power set is { {A, B}, {A}, {B}, {} }.\n3. In SQL:1999 syntax, this translates directly to `GROUPING SETS ((A, B), (A), (B), ())`.",
    "tags": [
      "grouping-sets",
      "equivalence",
      "standards"
    ],
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
    "id": "cu-008",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Look at the table 'project_status'. What is the value of total_budget in the row where status IS NULL and category IS NULL?",
    "table": {
      "headers": [
        "status",
        "category",
        "budget"
      ],
      "rows": [
        [
          "Active",
          "Civil",
          50000000
        ],
        [
          "Active",
          "Tech",
          40000000
        ],
        [
          "Planning",
          "Civil",
          30000000
        ]
      ]
    },
    "sql": "SELECT status, category, SUM(budget) AS total_budget\nFROM project_status\nGROUP BY CUBE(status, category);",
    "options": [
      "₹120,000,000",
      "₹90,000,000",
      "₹80,000,000",
      "₹50,000,000"
    ],
    "correctAnswer": 0,
    "explanation": "The row where both status and category are NULL represents the Grand Total grouping set (). It sums the budgets of all rows: 50M + 40M + 30M = 120,000,000.",
    "solution": "1. Active Civil: 50,000,000\n2. Active Tech: 40,000,000\n3. Planning Civil: 30,000,000\n4. Grand Total () aggregates all 3 records: 50M + 40M + 30M = 120M.\n5. In this row, both grouping attributes status and category are NULL.",
    "tags": [
      "query-output",
      "grand-total",
      "cube"
    ]
  },
  {
    "id": "cu-009",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2021,
    "question": "Why can executing CUBE on 10 or more dimensions lead to severe database performance degradation (the 'Cube Explosion' problem)?",
    "table": null,
    "sql": "-- Caution: 10 dimensions:\nGROUP BY CUBE(d1, d2, d3, d4, d5, d6, d7, d8, d9, d10)",
    "options": [
      "Because 2^10 = 1,024 grouping sets must be aggregated, requiring massive disk I/O, memory, and sorting operations",
      "Because SQL restricts table columns to a maximum of 8",
      "Because CUBE causes immediate deadlocks on relational indexes",
      "Because CUBE converts data types to floating point"
    ],
    "correctAnswer": 0,
    "explanation": "The combinatorial exponential growth (2^N) means 10 dimensions produce 1,024 grouping sets; 15 dimensions produce 32,768 grouping sets. This exponential explosion quickly overwhelms memory and temporary scratchpad space.",
    "solution": "1. CUBE has exponential complexity O(2^N) in terms of grouping sets.\n2. For N = 10, the database engine must compute 1,024 distinct grouping passes or aggregate rollups.\n3. The intermediate output size can vastly exceed the size of the base relational table.\n4. In real-world data warehousing, partial cubes or materialized OLAP cubes are used to mitigate this.",
    "tags": [
      "cube-explosion",
      "performance",
      "olap-architecture"
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
    "id": "cu-010",
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "Is the order of attributes in CUBE(A, B) significant?",
    "table": null,
    "sql": "-- Compare:\nGROUP BY CUBE(A, B)\nGROUP BY CUBE(B, A)",
    "options": [
      "No! Both produce the exact same set of grouping sets: {(A, B), (A), (B), ()}",
      "Yes, CUBE(B, A) inverts the mathematical calculations of AVG()",
      "Yes, CUBE(A, B) deletes the B column",
      "Only if A and B have different data types"
    ],
    "correctAnswer": 0,
    "explanation": "Unlike ROLLUP which is asymmetric and order-dependent, CUBE computes the full symmetric power set of attributes. The set of grouping sets is identical regardless of argument order.",
    "solution": "1. The power set of {A, B} is identical to the power set of {B, A}.\n2. Both queries compute aggregates for: (A, B), (A), (B), and ().\n3. (Only the default visual column order in output rows might differ if SELECT mirrors the order).",
    "tags": [
      "symmetry",
      "order-independence",
      "cube"
    ]
  },
  {
    "id": "cu-011",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Examine the table. What does the query output show for category 'Electrical' when status IS NULL?",
    "table": {
      "headers": [
        "status",
        "category",
        "cost"
      ],
      "rows": [
        [
          "Active",
          "Electrical",
          1000
        ],
        [
          "Planning",
          "Electrical",
          1500
        ],
        [
          "Active",
          "Civil",
          3000
        ]
      ]
    },
    "sql": "SELECT status, category, SUM(cost) AS total_cost\nFROM inventory\nGROUP BY CUBE(status, category);",
    "options": [
      "₹2,500 (the category subtotal for Electrical across all statuses)",
      "₹1,000",
      "₹5,500",
      "NULL"
    ],
    "correctAnswer": 0,
    "explanation": "The row with status = NULL and category = 'Electrical' is the category-level subtotal produced by grouping set (category). It sums 1000 + 1500 = 2,500.",
    "solution": "1. The grouping set `(category)` aggregates across all project statuses for each category.\n2. For category = 'Electrical': Active cost (1000) + Planning cost (1500) = 2,500.\n3. In this row, status is aggregated out, represented as NULL.",
    "tags": [
      "query-output",
      "subtotals",
      "cube"
    ]
  },
  {
    "id": "cu-012",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2022,
    "question": "A developer writes: 'SELECT A, B, SUM(C) FROM T GROUP BY CUBE(A), CUBE(B)'. How many grouping sets are generated?",
    "table": null,
    "sql": "SELECT A, B, SUM(C)\nFROM T\nGROUP BY CUBE(A), CUBE(B);",
    "options": [
      "4 grouping sets: {(A, B), (A), (B), ()}",
      "2 grouping sets: {(A), (B)}",
      "3 grouping sets: {(A, B), (A), ()}",
      "Syntax error: multiple CUBE clauses are forbidden"
    ],
    "correctAnswer": 0,
    "explanation": "When multiple CUBE specifications appear separated by commas, the SQL engine computes the Cartesian product (cross-product) of their respective grouping sets. CUBE(A) has {(A), ()} and CUBE(B) has {(B), ()}. Cross product = {(A, B), (A), (B), ()} = 4 sets.",
    "solution": "1. CUBE(A) generates: {(A), ()}.\n2. CUBE(B) generates: {(B), ()}.\n3. Grouping sets cross product: {(A), ()} × {(B), ()} = {(A, B), (A), (B), ()}.\n4. This yields 4 grouping sets, identical to `CUBE(A, B)`.",
    "tags": [
      "debugging",
      "cartesian-product",
      "composite-cube"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2022
    }
  },
  {
    "id": "cu-013",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A retail analytics team needs a pivot table showing total units sold by Store City, Product Department, and Customer Loyalty Tier, with every possible cross-subtotal and grand total. Which clause should be used?",
    "table": null,
    "sql": null,
    "options": [
      "GROUP BY CUBE(city, department, loyalty_tier)",
      "GROUP BY ROLLUP(city, department, loyalty_tier)",
      "GROUP BY city, department, loyalty_tier",
      "GROUP BY city, department WITH ROLLUP"
    ],
    "correctAnswer": 0,
    "explanation": "A complete pivot table with subtotals across every dimensional combination requires the full 2^3 = 8 combinations provided by CUBE.",
    "solution": "1. City, Department, and Loyalty Tier are 3 orthogonal dimensions.\n2. Users need to analyze City alone, Department alone, Loyalty Tier alone, City+Department, City+Tier, Department+Tier, all 3, and the grand total.\n3. This complete cross-tabulation is generated only by `CUBE(city, department, loyalty_tier)`.",
    "tags": [
      "application",
      "retail",
      "pivot-table"
    ]
  },
  {
    "id": "cu-014",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2020,
    "question": "In the output of 'GROUP BY CUBE(A, B)', what is the value of 'GROUPING(A) + GROUPING(B)' for the Grand Total row?",
    "table": null,
    "sql": "SELECT A, B, GROUPING(A) + GROUPING(B) AS total_grouping_flags\nFROM T\nGROUP BY CUBE(A, B);",
    "options": [
      "2",
      "0",
      "1",
      "3"
    ],
    "correctAnswer": 0,
    "explanation": "In the Grand Total row, both A and B are aggregated out. Thus GROUPING(A) = 1 and GROUPING(B) = 1. Their sum is 1 + 1 = 2.",
    "solution": "1. `GROUPING(col)` returns 1 if `col` is aggregated out (subtotal), and 0 if it is grouped.\n2. For the Grand Total row (), attribute A is aggregated out -> GROUPING(A) = 1.\n3. Attribute B is also aggregated out -> GROUPING(B) = 1.\n4. Sum = 1 + 1 = 2.",
    "tags": [
      "grouping-function",
      "bitmask",
      "cube"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2020
    }
  },
  {
    "id": "cu-015",
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2006,
    "question": "Who originally introduced the CUBE operator to relational database theory in 1996?",
    "table": null,
    "sql": null,
    "options": [
      "Jim Gray and colleagues (in the seminal paper 'Data Cube: A Relational Aggregation Operator Generalizing Group-By, Cross-Tab, and Sub-Totals')",
      "Edgar F. Codd (in his 1970 relational model paper)",
      "Donald Chamberlin and Raymond Boyce",
      "Michael Stonebraker"
    ],
    "correctAnswer": 0,
    "explanation": "Turing Award laureate Jim Gray (along with Bosworth, Layman, and Pirahesh) proposed the Data Cube operator in 1996 to address the limitation of SQL's 1-dimensional GROUP BY for OLAP decision support.",
    "solution": "1. In 1996, Jim Gray et al. published 'Data Cube: A Relational Aggregation Operator...'.\n2. It generalized SQL's GROUP BY to support N-dimensional cross-tabulations.\n3. The operator was formalized in the ANSI SQL:1999 standard.",
    "tags": [
      "history",
      "jim-gray",
      "olap-origins"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2006
    }
  },
  {
    "id": "cu-016",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "A database table has 2 cities (Mumbai, Delhi) and 3 project categories (Metro, Road, Bridge). Every combination has exactly one project. How many total rows are produced by: GROUP BY CUBE(city, category)?",
    "table": null,
    "sql": "SELECT city, category, COUNT(*)\nFROM projects\nGROUP BY CUBE(city, category);",
    "options": [
      "12 rows (6 detail + 2 city subtotals + 3 category subtotals + 1 grand total)",
      "6 rows",
      "9 rows",
      "16 rows"
    ],
    "correctAnswer": 0,
    "explanation": "2 cities * 3 categories = 6 detail rows. 2 city subtotals (city, NULL). 3 category subtotals (NULL, category). 1 grand total (NULL, NULL). Total = 6 + 2 + 3 + 1 = 12 rows.",
    "solution": "1. Detail rows at (city, category): 2 * 3 = 6 rows.\n2. Subtotals at (city): 2 rows.\n3. Subtotals at (category): 3 rows.\n4. Grand Total at (): 1 row.\n5. Total = 6 + 2 + 3 + 1 = 12 rows.",
    "tags": [
      "numerical",
      "row-count",
      "cube"
    ]
  },
  {
    "id": "cu-017",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "BARC",
    "exam": "Scientific Officer (Computer Science)",
    "year": 2020,
    "question": "Consider a relation with attributes A, B, C, D. Which query produces the grouping set (A, C) as one of its outputs?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT A, B, C, SUM(D) FROM T GROUP BY CUBE(A, B, C);",
      "SELECT A, B, C, SUM(D) FROM T GROUP BY ROLLUP(A, B, C);",
      "SELECT A, B, C, SUM(D) FROM T GROUP BY A, B, C;",
      "SELECT A, B, C, SUM(D) FROM T GROUP BY ROLLUP(A), ROLLUP(B, C);"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE(A, B, C) produces all subsets of {A, B, C}, including (A, C). ROLLUP(A, B, C) only produces (A, B, C), (A, B), (A), and (), completely omitting (A, C).",
    "solution": "1. Grouping sets in ROLLUP(A, B, C): {(A, B, C), (A, B), (A), ()}.\n2. Grouping sets in CUBE(A, B, C): all 8 subsets: {(A, B, C), (A, B), (A, C), (B, C), (A), (B), (C), ()}.\n3. Set (A, C) is present in CUBE(A, B, C) but absent in ROLLUP(A, B, C).",
    "tags": [
      "cube-vs-rollup",
      "grouping-sets",
      "subsets"
    ],
    "sourceType": "competitive",
    "institution": "BARC",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "BARC",
      "exam": "Scientific Officer (Computer Science)",
      "year": 2020
    }
  },
  {
    "id": "cu-018",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "TIFR",
    "exam": "Computer & Systems Sciences",
    "year": 2019,
    "question": "What is a 'Partial Cube' in SQL query optimization?",
    "table": null,
    "sql": "SELECT year, dept, project, SUM(cost)\nFROM expenditures\nGROUP BY year, CUBE(dept, project);",
    "options": [
      "A query where some columns are fixed (always grouped) while other columns are evaluated with CUBE",
      "A CUBE query that aborts when halfway finished",
      "A cube computed on an indexed view only",
      "A cube that ignores NULL values"
    ],
    "correctAnswer": 0,
    "explanation": "In `GROUP BY year, CUBE(dept, project)`, 'year' is outside CUBE. It is present in every grouping set, preventing an exponential explosion of the year dimension.",
    "solution": "1. `CUBE(dept, project)` generates 4 sets: {(dept, project), (dept), (project), ()}.\n2. Column `year` is prefixed to each set: {(year, dept, project), (year, dept), (year, project), (year)}.\n3. Year is invariant across all 4 sets, keeping the summary partitioned by year.",
    "tags": [
      "partial-cube",
      "optimization",
      "grouping-sets"
    ],
    "sourceType": "competitive",
    "institution": "TIFR",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "TIFR",
      "exam": "Computer & Systems Sciences",
      "year": 2019
    }
  },
  {
    "id": "cu-019",
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "Original Practice",
    "year": null,
    "question": "Why does the query below fail in standard ANSI SQL?",
    "table": null,
    "sql": "SELECT city, category, budget\nFROM projects\nGROUP BY CUBE(city, category);",
    "options": [
      "The 'budget' column is unaggregated and missing from the CUBE clause",
      "CUBE does not accept string columns",
      "The query requires a WHERE clause",
      "CUBE must always be accompanied by an ORDER BY clause"
    ],
    "correctAnswer": 0,
    "explanation": "Even with CUBE, standard SQL single-value rules apply: any column in the SELECT list that is not a grouping column must be enclosed in an aggregate function (e.g. SUM(budget)).",
    "solution": "1. Subtotal and grand total rows collapse multiple project rows into one.\n2. Without an aggregate function, the engine cannot know which single budget value to display.\n3. The query must use `SUM(budget)` or another aggregate.",
    "tags": [
      "debugging",
      "single-value-rule",
      "syntax"
    ]
  },
  {
    "id": "cu-020",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Examine the query. How many Grand Total rows (rows where ALL grouping columns are NULL) does CUBE produce?",
    "table": null,
    "sql": "SELECT A, B, C, COUNT(*)\nFROM T\nGROUP BY CUBE(A, B, C);",
    "options": [
      "Exactly 1",
      "3",
      "8",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates exactly one empty grouping set (), which corresponds to the single Grand Total row summarizing the entire table.",
    "solution": "1. In set theory, any set of size N has exactly 1 empty subset (the empty set ∅).\n2. In SQL CUBE, the empty set () represents the overall Grand Total.\n3. Therefore, exactly 1 grand total row is generated.",
    "tags": [
      "grand-total",
      "power-set",
      "cube"
    ]
  },
  {
    "id": "cu-021",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "In hospital analytics, administrators want to track patient admissions across 2 dimensions: 'Department' (Cardiology, Neurology) and 'InsuranceType' (Private, Public, Uninsured). Which query generates all departmental totals, insurance totals, cell details, and overall hospital totals?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT department, insurance_type, COUNT(*) FROM admissions GROUP BY CUBE(department, insurance_type);",
      "SELECT department, insurance_type, COUNT(*) FROM admissions GROUP BY ROLLUP(department, insurance_type);",
      "SELECT department, insurance_type, COUNT(*) FROM admissions GROUP BY department, insurance_type;",
      "SELECT department, insurance_type, COUNT(*) FROM admissions GROUP BY insurance_type;"
    ],
    "correctAnswer": 0,
    "explanation": "The administrators need both Department subtotals (independent of insurance) and Insurance subtotals (independent of department), plus cell details and the overall total. Only CUBE provides all 4 grouping sets.",
    "solution": "1. ROLLUP(dept, insurance) would give Dept subtotals, but would NOT give Insurance subtotals.\n2. CUBE(dept, insurance) provides: (dept, insurance), (dept), (insurance), and ().\n3. This gives all requested summaries.",
    "tags": [
      "application",
      "healthcare",
      "cross-tabulation"
    ]
  },
  {
    "id": "cu-022",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2018,
    "question": "What is the formula for the number of grouping sets of size K generated by CUBE on N attributes?",
    "table": null,
    "sql": null,
    "options": [
      "The binomial coefficient C(N, K) = N! / (K! * (N - K)!)",
      "N * K",
      "2^(N - K)",
      "N! / K!"
    ],
    "correctAnswer": 0,
    "explanation": "Choosing K attributes from N attributes to form a grouping set is the classic combinatorial combination formula C(N, K). Summing C(N, K) for K=0 to N yields 2^N total grouping sets.",
    "solution": "1. For N attributes, the number of grouping sets with exactly K attributes is given by 'N choose K': C(N, K).\n2. For example, in CUBE(A, B, C) where N=3:\n   - K=3: C(3,3) = 1 set: (A, B, C)\n   - K=2: C(3,2) = 3 sets: (A, B), (A, C), (B, C)\n   - K=1: C(3,1) = 3 sets: (A), (B), (C)\n   - K=0: C(3,0) = 1 set: ()\n   Total = 1 + 3 + 3 + 1 = 8 = 2^3.",
    "tags": [
      "combinatorics",
      "binomial-theorem",
      "theory"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2018
    }
  },
  {
    "id": "agg-001",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2007,
    "question": "What is the critical behavioral difference between COUNT(*) and COUNT(column_name) in SQL?",
    "table": null,
    "sql": "SELECT COUNT(*), COUNT(manager)\nFROM projects;",
    "options": [
      "COUNT(*) counts all tuples including rows with NULLs; COUNT(column_name) counts only rows where column_name IS NOT NULL",
      "COUNT(*) only counts primary keys; COUNT(column_name) counts foreign keys",
      "COUNT(*) returns a string; COUNT(column_name) returns an integer",
      "There is no difference in any standard SQL database"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(*) counts the total cardinality of rows in the table or group regardless of content. In contrast, COUNT(column_name) ignores NULL values in that specific column.",
    "solution": "1. `COUNT(*)` evaluates the row existence: every tuple contributes 1 to the count.\n2. `COUNT(column_name)` evaluates the attribute expression for each row; if the column value is NULL, it is omitted from the tally.\n3. If a table has 10 rows and 3 have `manager IS NULL`, `COUNT(*)` returns 10, while `COUNT(manager)` returns 7.",
    "tags": [
      "count",
      "null-handling",
      "fundamentals"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2007
    }
  },
  {
    "id": "agg-002",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2021,
    "question": "Given a table R with a single column A containing values: {1, 2, NULL, 3, NULL}. What is the result of the query: SELECT COUNT(*), COUNT(A), SUM(A), AVG(A) FROM R?",
    "table": {
      "headers": [
        "A"
      ],
      "rows": [
        [
          1
        ],
        [
          2
        ],
        [
          null
        ],
        [
          3
        ],
        [
          null
        ]
      ]
    },
    "sql": "SELECT COUNT(*), COUNT(A), SUM(A), AVG(A)\nFROM R;",
    "options": [
      "5, 3, 6, 2",
      "5, 5, 6, 1.2",
      "3, 3, 6, 2",
      "5, 3, NULL, NULL"
    ],
    "correctAnswer": 0,
    "explanation": "Total rows = 5 -> COUNT(*)=5. Non-null values of A are {1, 2, 3} -> COUNT(A)=3. SUM(A) = 1+2+3 = 6. AVG(A) = SUM(A) / COUNT(A) = 6 / 3 = 2.",
    "solution": "1. Total tuples = 5, so `COUNT(*)` = 5.\n2. Non-null tuples for A: 1, 2, 3 -> `COUNT(A)` = 3.\n3. `SUM(A)` ignores NULLs: 1 + 2 + 3 = 6.\n4. `AVG(A)` is computed as `SUM(A) / COUNT(A)` = 6 / 3 = 2 (NOT 6 / 5).\n5. Output: (5, 3, 6, 2).",
    "tags": [
      "gate",
      "avg",
      "sum",
      "null-handling"
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
    "id": "agg-003",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2008,
    "question": "What does the query 'SELECT COUNT(*), SUM(val), AVG(val) FROM empty_table' return when evaluated on an EMPTY table with zero rows?",
    "table": {
      "headers": [
        "val"
      ],
      "rows": []
    },
    "sql": "SELECT COUNT(*), SUM(val), AVG(val)\nFROM empty_table;",
    "options": [
      "COUNT(*) = 0, SUM = NULL, AVG = NULL",
      "COUNT(*) = 0, SUM = 0, AVG = 0",
      "COUNT(*) = NULL, SUM = NULL, AVG = NULL",
      "An empty result set (0 rows)"
    ],
    "correctAnswer": 0,
    "explanation": "Scalar aggregation (no GROUP BY) on an empty relation always outputs exactly 1 row. By SQL standard rules, COUNT(*) returns 0, while SUM, AVG, MIN, and MAX return NULL.",
    "solution": "1. A query without GROUP BY is a scalar aggregate and must always return exactly 1 row.\n2. When there are 0 input tuples, `COUNT(*)` evaluates to 0.\n3. All other aggregate functions (SUM, AVG, MIN, MAX) evaluate to NULL on an empty set of rows.\n4. Therefore, the result row is (0, NULL, NULL).",
    "tags": [
      "gate",
      "empty-table",
      "scalar-aggregation"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2008
    }
  },
  {
    "id": "agg-004",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2017,
    "question": "Can standard SQL aggregate functions be directly nested within one another, such as MAX(AVG(salary))?",
    "table": null,
    "sql": "-- Invalid in standard SQL:\nSELECT MAX(AVG(salary))\nFROM employees\nGROUP BY department;",
    "options": [
      "No! ANSI SQL strictly prohibits nesting aggregate functions directly in the SELECT clause",
      "Yes, the outer function is always applied after the inner function",
      "Only if the inner function is COUNT()",
      "Only in Oracle databases"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL does not allow direct aggregate nesting (e.g. `MAX(AVG(salary))`). To find the maximum average salary across departments, one must use a subquery (derived table) or Common Table Expression (CTE).",
    "solution": "1. Aggregate functions reduce a set of rows into a single scalar value.\n2. Applying an aggregate to another aggregate in the same SELECT statement creates syntactic ambiguity.\n3. Standard SQL requires a two-step query:\n   `SELECT MAX(dept_avg) FROM (SELECT department, AVG(salary) AS dept_avg FROM employees GROUP BY department) t;`",
    "tags": [
      "nested-aggregates",
      "syntax",
      "ansi-sql"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2017
    }
  },
  {
    "id": "agg-005",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given table 'grades', what is the result of COUNT(DISTINCT subject)?",
    "table": {
      "headers": [
        "student_id",
        "subject",
        "marks"
      ],
      "rows": [
        [
          1,
          "DBMS",
          85
        ],
        [
          2,
          "DBMS",
          90
        ],
        [
          3,
          "OS",
          78
        ],
        [
          4,
          "CN",
          88
        ],
        [
          5,
          "DBMS",
          92
        ],
        [
          6,
          null,
          70
        ]
      ]
    },
    "sql": "SELECT COUNT(DISTINCT subject) AS unique_subjects\nFROM grades;",
    "options": [
      "3 (DBMS, OS, CN)",
      "4 (DBMS, OS, CN, and NULL)",
      "5",
      "6"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(DISTINCT column) counts the number of distinct non-null values. The non-null subjects are 'DBMS', 'OS', and 'CN' (3 distinct values). NULL is not counted.",
    "solution": "1. The distinct values in the subject column are: 'DBMS', 'OS', 'CN', and NULL.\n2. In SQL aggregate functions, `COUNT(DISTINCT col)` ignores NULL.\n3. The distinct non-null set is {'DBMS', 'OS', 'CN'}.\n4. Count = 3.",
    "tags": [
      "count-distinct",
      "null-handling",
      "query-output"
    ]
  },
  {
    "id": "agg-006",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2014,
    "question": "Which of the following aggregate functions can operate on non-numeric (string / character) data types in SQL?",
    "table": null,
    "sql": "SELECT MIN(name), MAX(name)\nFROM students;",
    "options": [
      "MIN and MAX (evaluating lexicographical / alphabetical ordering)",
      "SUM and AVG",
      "SUM only",
      "None; aggregate functions only accept numbers"
    ],
    "correctAnswer": 0,
    "explanation": "MIN and MAX can operate on strings, dates, and timestamps using lexicographical (alphabetical) or chronological comparison rules. SUM and AVG require numeric operands.",
    "solution": "1. `MIN(string_col)` returns the first value alphabetically (according to collation).\n2. `MAX(string_col)` returns the last value alphabetically.\n3. `SUM()` and `AVG()` mathematically require arithmetic addition and division, which are undefined for arbitrary strings.",
    "tags": [
      "data-types",
      "min-max",
      "strings"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2014
    }
  },
  {
    "id": "agg-007",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "A column contains values: {10, 20, 30, NULL}. What is the value of SUM(val) / COUNT(*)?",
    "table": null,
    "sql": "SELECT SUM(val) / COUNT(*) AS computed_ratio\nFROM numbers_table;",
    "options": [
      "15 (60 / 4)",
      "20 (60 / 3)",
      "NULL",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "SUM(val) sums non-null values: 10 + 20 + 30 = 60. COUNT(*) counts all rows including the NULL row: 4. Thus 60 / 4 = 15. (Note: AVG(val) would be 60 / 3 = 20).",
    "solution": "1. `SUM(val)` = 10 + 20 + 30 = 60 (NULL is ignored).\n2. `COUNT(*)` = 4 (counts all 4 tuples).\n3. Ratio = 60 / 4 = 15.\n4. Notice how this differs from `AVG(val)`, which uses `COUNT(val)` as denominator (60 / 3 = 20).",
    "tags": [
      "numerical",
      "sum-vs-avg",
      "null-handling"
    ]
  },
  {
    "id": "agg-008",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2014,
    "question": "Let R(A, B) have 5 tuples: (1, 10), (2, 20), (3, NULL), (4, 40), (5, NULL). Which of the following expressions evaluates to TRUE?",
    "table": {
      "headers": [
        "A",
        "B"
      ],
      "rows": [
        [
          1,
          10
        ],
        [
          2,
          20
        ],
        [
          3,
          null
        ],
        [
          4,
          40
        ],
        [
          5,
          null
        ]
      ]
    },
    "sql": null,
    "options": [
      "AVG(B) > SUM(B) / COUNT(*)",
      "AVG(B) = SUM(B) / COUNT(*)",
      "AVG(B) < SUM(B) / COUNT(*)",
      "AVG(B) IS NULL"
    ],
    "correctAnswer": 0,
    "explanation": "SUM(B) = 10 + 20 + 40 = 70. COUNT(B) = 3 -> AVG(B) = 70 / 3 ≈ 23.33. COUNT(*) = 5 -> SUM(B) / COUNT(*) = 70 / 5 = 14. Since 23.33 > 14, AVG(B) > SUM(B) / COUNT(*) is TRUE.",
    "solution": "1. Calculate `AVG(B)`: (10 + 20 + 40) / 3 = 70 / 3 ≈ 23.33\n2. Calculate `SUM(B) / COUNT(*)`: (10 + 20 + 40) / 5 = 70 / 5 = 14.0\n3. 23.33 > 14.0, which means `AVG(B) > SUM(B) / COUNT(*)` holds true.",
    "tags": [
      "gate",
      "avg",
      "inequality",
      "null-handling"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2014
    }
  },
  {
    "id": "agg-009",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2018,
    "question": "Why does the query: 'SELECT dept, SUM(salary) FROM employees WHERE SUM(salary) > 100000 GROUP BY dept;' produce an error?",
    "table": null,
    "sql": "SELECT dept, SUM(salary)\nFROM employees\nWHERE SUM(salary) > 100000\nGROUP BY dept;",
    "options": [
      "Aggregate functions cannot be used in a WHERE clause; the filter belongs in a HAVING clause",
      "SUM() cannot be applied to salary",
      "The query must end with an ORDER BY clause",
      "dept must be cast to integer"
    ],
    "correctAnswer": 0,
    "explanation": "WHERE filters rows before groupings are formed. Because aggregates require a group of rows to compute, they cannot be evaluated in the WHERE clause.",
    "solution": "1. WHERE filters individual base tuples during the initial table scan.\n2. At the time WHERE is evaluated, groups have not yet been established, so `SUM(salary)` does not exist.\n3. The correct clause for filtering post-aggregation results is `HAVING SUM(salary) > 100000`.",
    "tags": [
      "debugging",
      "where-vs-having",
      "syntax"
    ],
    "sourceType": "competitive",
    "institution": "ISRO",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "ISRO",
      "exam": "Scientist/Engineer 'SC' (Computer Science)",
      "year": 2018
    }
  },
  {
    "id": "agg-010",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "Can arithmetic operations be performed inside an aggregate function, such as SUM(unit_cost * quantity)?",
    "table": null,
    "sql": "SELECT SUM(unit_cost * quantity) AS total_inventory_value\nFROM materials;",
    "options": [
      "Yes, SQL evaluates the arithmetic expression row by row, then computes the aggregate sum over all evaluated scalars",
      "No, aggregate functions only accept single column names",
      "Only if the columns are in different tables",
      "Only in stored procedures"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL fully permits scalar expressions inside aggregate functions. The expression (unit_cost * quantity) is evaluated for each row, and SUM() adds those products together.",
    "solution": "1. For each tuple, the scalar expression `unit_cost * quantity` is computed.\n2. The aggregate `SUM()` then sums these computed products across all rows.\n3. This is standard SQL practice for calculating extended totals.",
    "tags": [
      "arithmetic",
      "scalar-expressions",
      "sum"
    ]
  },
  {
    "id": "agg-011",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2023,
    "question": "In distributed Big Data databases (e.g. Presto, Snowflake, Google BigQuery), what probabilistic algorithm is used by 'APPROX_COUNT_DISTINCT' to compute cardinalities efficiently?",
    "table": null,
    "sql": "SELECT APPROX_COUNT_DISTINCT(user_id)\nFROM clickstream_events;",
    "options": [
      "HyperLogLog (HLL)",
      "Dijkstra's Shortest Path",
      "Bubble Sort",
      "Fast Fourier Transform"
    ],
    "correctAnswer": 0,
    "explanation": "HyperLogLog (HLL) is the industry-standard sketch algorithm used by modern distributed databases to estimate distinct count cardinalities with very low memory footprint (typically <1-2% error).",
    "solution": "1. Exact `COUNT(DISTINCT)` on billions of rows requires storing and deduplicating all keys in memory or sorting across nodes.\n2. HyperLogLog uses hashing and the distribution of leading zeros to estimate cardinality with O(log log N) space.\n3. Modern analytical database engines provide `APPROX_COUNT_DISTINCT()` based on HLL.",
    "tags": [
      "hyperloglog",
      "big-data",
      "cardinality-estimation"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2023
    }
  },
  {
    "id": "agg-012",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A quality manager needs to detect if there is any price variance in a catalog table. Which SQL aggregate function computes the statistical sample standard deviation?",
    "table": null,
    "sql": null,
    "options": [
      "STDDEV_SAMP(price) or STDDEV(price)",
      "DIFF(price)",
      "VAR_AVG(price)",
      "CALC_DEV(price)"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL specifies STDDEV_SAMP() for sample standard deviation and STDDEV_POP() for population standard deviation (often aliased as STDDEV in engines like Oracle/Postgres).",
    "solution": "1. Standard deviation measures data dispersion around the mean.\n2. ANSI standard SQL provides `STDDEV_SAMP()` and `STDDEV_POP()`.\n3. `VARIANCE()` / `VAR_SAMP()` computes the variance.",
    "tags": [
      "statistics",
      "stddev",
      "variance"
    ]
  },
  {
    "id": "agg-013",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What is the output of the query on the given table?",
    "table": {
      "headers": [
        "code",
        "score"
      ],
      "rows": [
        [
          "A",
          10
        ],
        [
          "A",
          30
        ],
        [
          "B",
          50
        ]
      ]
    },
    "sql": "SELECT MIN(score) + MAX(score) AS range_sum\nFROM numbers;",
    "options": [
      "60 (10 + 50)",
      "40",
      "90",
      "50"
    ],
    "correctAnswer": 0,
    "explanation": "MIN(score) over the table is 10. MAX(score) is 50. Their sum is 10 + 50 = 60.",
    "solution": "1. The query contains scalar aggregates without GROUP BY.\n2. `MIN(score)` = 10\n3. `MAX(score)` = 50\n4. Expression = 10 + 50 = 60.",
    "tags": [
      "min-max",
      "arithmetic",
      "query-output"
    ]
  },
  {
    "id": "agg-014",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2022,
    "question": "What is the result of applying the boolean aggregate function EVERY() (or BOOL_AND()) on a set of booleans containing {TRUE, TRUE, FALSE}?",
    "table": null,
    "sql": "SELECT EVERY(is_passed)\nFROM exam_results;",
    "options": [
      "FALSE",
      "TRUE",
      "NULL",
      "Syntax error"
    ],
    "correctAnswer": 0,
    "explanation": "In ANSI SQL, `EVERY(condition)` (equivalent to `BOOL_AND`) returns TRUE if and only if all evaluated rows are TRUE. Since one row is FALSE, it returns FALSE.",
    "solution": "1. `EVERY(expr)` is the SQL standard boolean conjunction aggregate (logical AND across rows).\n2. TRUE AND TRUE AND FALSE evaluates to FALSE.\n3. (The companion function `SOME()` or `BOOL_OR()` returns TRUE if at least one row is TRUE).",
    "tags": [
      "boolean-aggregates",
      "ansi-sql",
      "logic"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2022
    }
  },
  {
    "id": "agg-015",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2022,
    "question": "Consider relation R(A, B) where A has values {1, 1, 2, 2, 2} and B has values {10, 20, 10, 20, 30}. What is the output of: SELECT COUNT(DISTINCT A), COUNT(DISTINCT B) FROM R?",
    "table": null,
    "sql": "SELECT COUNT(DISTINCT A), COUNT(DISTINCT B)\nFROM R;",
    "options": [
      "2, 3",
      "5, 5",
      "2, 2",
      "1, 3"
    ],
    "correctAnswer": 0,
    "explanation": "Distinct values of A are {1, 2} -> count = 2. Distinct values of B are {10, 20, 30} -> count = 3.",
    "solution": "1. Column A has values: 1, 1, 2, 2, 2. The distinct set is {1, 2}, so `COUNT(DISTINCT A)` = 2.\n2. Column B has values: 10, 20, 10, 20, 30. The distinct set is {10, 20, 30}, so `COUNT(DISTINCT B)` = 3.\n3. The query returns (2, 3).",
    "tags": [
      "gate",
      "count-distinct",
      "cardinality"
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
    "id": "agg-016",
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "Which SQL aggregate function concatenates strings across multiple grouped rows into a single delimited text string?",
    "table": null,
    "sql": "SELECT dept, STRING_AGG(emp_name, ', ')\nFROM employees\nGROUP BY dept;",
    "options": [
      "STRING_AGG() (or GROUP_CONCAT() in MySQL / LISTAGG() in Oracle)",
      "CONCAT_ROWS()",
      "SUM_TEXT()",
      "MERGE_STR()"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL-2016 standardizes `STRING_AGG(expression, delimiter)`. MySQL uses `GROUP_CONCAT()`, and Oracle uses `LISTAGG()`.",
    "solution": "1. Standard aggregate functions reduce rows to numbers.\n2. String aggregation concatenates text from multiple rows within each group.\n3. `STRING_AGG(name, ', ')` joins all names separated by commas.",
    "tags": [
      "string-aggregation",
      "group-concat",
      "string-agg"
    ]
  },
  {
    "id": "agg-017",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "Original Practice",
    "year": null,
    "question": "A column contains only two rows, both with value NULL. What is the value of COUNT(val)?",
    "table": {
      "headers": [
        "val"
      ],
      "rows": [
        [
          null
        ],
        [
          null
        ]
      ]
    },
    "sql": "SELECT COUNT(val)\nFROM test_table;",
    "options": [
      "0",
      "2",
      "NULL",
      "Undefined"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(column) counts the number of non-null values. Since both values are NULL, the count of non-null values is 0.",
    "solution": "1. `COUNT(val)` checks each row for `val IS NOT NULL`.\n2. Row 1 is NULL (not counted).\n3. Row 2 is NULL (not counted).\n4. Total non-null count = 0.",
    "tags": [
      "count",
      "null-handling",
      "edge-case"
    ]
  },
  {
    "id": "agg-018",
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "BARC",
    "exam": "Scientific Officer (Computer Science)",
    "year": 2019,
    "question": "In relational algebra, how is the generalized aggregation operator mathematically denoted?",
    "table": null,
    "sql": null,
    "options": [
      "The calligraphic script letter G (or gamma γ)",
      "The summation symbol Σ",
      "The product symbol Π",
      "The join operator ⋈"
    ],
    "correctAnswer": 0,
    "explanation": "In formal database theory (e.g. Silberschatz, Korth), generalized aggregation is denoted using the Greek letter gamma (γ) or G, where grouping attributes appear as subscripts on the left, and aggregate functions appear on the right.",
    "solution": "1. The generalized aggregation operator is denoted by γ (gamma).\n2. Format: `[grouping_attributes] γ [aggregate_functions] (Relation)`.\n3. For example: `dept γ AVG(salary) (Employee)` represents grouping by department and computing average salary.",
    "tags": [
      "relational-algebra",
      "gamma-operator",
      "theory"
    ],
    "sourceType": "competitive",
    "institution": "BARC",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "BARC",
      "exam": "Scientific Officer (Computer Science)",
      "year": 2019
    }
  },
  {
    "id": "hav-001",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2006,
    "question": "What is the primary architectural purpose of the HAVING clause in SQL?",
    "table": null,
    "sql": "SELECT department, COUNT(*)\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 5;",
    "options": [
      "To filter grouped summary rows after grouping and aggregation have occurred",
      "To filter individual rows before they are placed into groups",
      "To specify which indexes the database optimizer should use",
      "To rename columns in the final output grid"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING applies predicate filtering to groups created by the GROUP BY clause, whereas WHERE applies predicate filtering to individual tuples before grouping.",
    "solution": "1. The WHERE clause operates on individual rows prior to grouping.\n2. The GROUP BY clause aggregates rows into partitions.\n3. The HAVING clause evaluates conditions on the resulting partitions (e.g. `COUNT(*) >= 5`).\n4. Groups failing the HAVING condition are discarded.",
    "tags": [
      "having",
      "concepts",
      "fundamentals"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2006
    }
  },
  {
    "id": "hav-002",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given table 'city_budgets', what output is returned by the query?",
    "table": {
      "headers": [
        "city",
        "budget"
      ],
      "rows": [
        [
          "Mumbai",
          50000000
        ],
        [
          "Mumbai",
          45000000
        ],
        [
          "Delhi",
          60000000
        ],
        [
          "Pune",
          31000000
        ],
        [
          "Pune",
          27000000
        ]
      ]
    },
    "sql": "SELECT city, SUM(budget) AS total_b\nFROM city_budgets\nGROUP BY city\nHAVING SUM(budget) >= 60000000\nORDER BY total_b DESC;",
    "options": [
      "Mumbai: ₹95,000,000 | Delhi: ₹60,000,000",
      "Mumbai: ₹95,000,000 | Delhi: ₹60,000,000 | Pune: ₹58,000,000",
      "Delhi: ₹60,000,000",
      "Mumbai: ₹95,000,000"
    ],
    "correctAnswer": 0,
    "explanation": "Mumbai total = 50M + 45M = 95M (>= 60M). Delhi total = 60M (>= 60M). Pune total = 31M + 27M = 58M (< 60M, discarded). Result has Mumbai and Delhi.",
    "solution": "1. Group 'Mumbai': 50M + 45M = 95M. Passes HAVING (95M >= 60M).\n2. Group 'Delhi': 60M. Passes HAVING (60M >= 60M).\n3. Group 'Pune': 31M + 27M = 58M. Fails HAVING (58M < 60M), filtered out.\n4. Ordered by total_b DESC: Mumbai, then Delhi.",
    "tags": [
      "having",
      "sum",
      "query-output"
    ]
  },
  {
    "id": "hav-003",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2014,
    "question": "Can the HAVING clause refer to a column that appears in the GROUP BY clause but is NOT an aggregate function?",
    "table": null,
    "sql": "SELECT dept, COUNT(*)\nFROM employees\nGROUP BY dept\nHAVING dept IN ('IT', 'HR');",
    "options": [
      "Yes, any column in the GROUP BY list is a group-level attribute and can legally appear in HAVING",
      "No, HAVING can only evaluate aggregate expressions like SUM() or COUNT()",
      "Only if the column has a foreign key constraint",
      "Only if wrapped in a string casting function"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL allows grouping columns in the HAVING clause because their value is guaranteed to be constant (single-valued) across all rows in that group (though placing non-aggregate row filters in WHERE is usually better for optimizer efficiency).",
    "solution": "1. In SQL, any column present in the GROUP BY clause is uniquely determined for each group.\n2. Therefore, conditions on grouping columns like `HAVING dept = 'IT'` are syntactically legal.\n3. Note: A database optimizer would ideally push this predicate down into the `WHERE` clause for earlier filtering.",
    "tags": [
      "gate",
      "having",
      "grouping-columns"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2014
    }
  },
  {
    "id": "hav-004",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2024,
    "question": "Consider an SQL query on relation Student(roll_no, dept, marks). A student writes two queries:\nQ1: SELECT dept, AVG(marks) FROM Student WHERE marks >= 50 GROUP BY dept;\nQ2: SELECT dept, AVG(marks) FROM Student GROUP BY dept HAVING AVG(marks) >= 50;\nDo Q1 and Q2 produce identical results?",
    "table": null,
    "sql": null,
    "options": [
      "No! Q1 averages only passing marks (>= 50) per department, whereas Q2 computes the department's overall average and filters departments whose overall average is >= 50",
      "Yes, WHERE and HAVING are interchangeable when GROUP BY is present",
      "Yes, because both filter on the threshold value of 50",
      "Q2 produces a runtime error"
    ],
    "correctAnswer": 0,
    "explanation": "In Q1, failing marks (< 50) are discarded before the average is calculated. In Q2, all marks (both < 50 and >= 50) contribute to the department's average, and only departments whose combined average meets 50 are retained.",
    "solution": "1. Example: A department has marks {40, 60}.\n2. Q1 filters row level: 40 is dropped. Passing mark {60} has AVG = 60. Output: (dept, 60).\n3. Q2 includes all rows: AVG(40, 60) = 50. HAVING 50 >= 50 passes. Output: (dept, 50).\n4. Averages differ (60 vs 50). The semantics are completely different.",
    "tags": [
      "gate",
      "where-vs-having",
      "avg-filtering"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2024
    }
  },
  {
    "id": "hav-005",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2013,
    "question": "Why does the following SQL query result in a syntax error in standard SQL?",
    "table": null,
    "sql": "SELECT category, AVG(price)\nFROM products\nHAVING category = 'Electronics'\nWHERE price > 100\nGROUP BY category;",
    "options": [
      "The query clauses are in an invalid order; the correct order is FROM -> WHERE -> GROUP BY -> HAVING",
      "HAVING cannot be used on products",
      "The AVG() function cannot accept price",
      "category must be an integer"
    ],
    "correctAnswer": 0,
    "explanation": "SQL grammar strictly requires clauses in the syntactic order: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY.",
    "solution": "1. SQL grammar parses clauses in a strict structural order.\n2. Syntactic order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.\n3. In the buggy query, HAVING was placed before WHERE and GROUP BY, causing a syntax parser failure.",
    "tags": [
      "clause-order",
      "syntax",
      "debugging"
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
    "id": "hav-006",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A university database needs to identify all departments where the total number of enrolled students is at least 50 AND the average grade point average (GPA) is at least 3.5. Which query is correct?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT dept, COUNT(student_id) AS total_students, AVG(gpa) AS avg_gpa FROM students GROUP BY dept HAVING COUNT(student_id) >= 50 AND AVG(gpa) >= 3.5;",
      "SELECT dept, COUNT(student_id), AVG(gpa) FROM students WHERE COUNT(student_id) >= 50 AND AVG(gpa) >= 3.5 GROUP BY dept;",
      "SELECT dept FROM students WHERE gpa >= 3.5 GROUP BY dept HAVING COUNT(*) >= 50;",
      "SELECT dept FROM students GROUP BY dept HAVING student_id >= 50 AND gpa >= 3.5;"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple aggregate conditions can be combined in the HAVING clause using boolean operators (AND / OR).",
    "solution": "1. Both conditions (student count >= 50 and avg GPA >= 3.5) are group-level properties.\n2. Neither condition can be placed in WHERE because they require aggregation.\n3. Combining them with `AND` in `HAVING COUNT(student_id) >= 50 AND AVG(gpa) >= 3.5` achieves the exact requirement.",
    "tags": [
      "application",
      "academic",
      "compound-having"
    ]
  },
  {
    "id": "hav-007",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "ISRO",
    "exam": "Scientist/Engineer 'SC' (Computer Science)",
    "year": 2020,
    "question": "Is it syntactically legal to write an SQL query with a HAVING clause when there is NO GROUP BY clause?",
    "table": null,
    "sql": "SELECT AVG(salary)\nFROM employees\nHAVING COUNT(*) > 10;",
    "options": [
      "Yes, the entire table is treated as a single implicit group, and the query outputs 1 row if the condition is met or 0 rows if not",
      "No, standard SQL strictly mandates that HAVING must always be preceded by GROUP BY",
      "Only if an ORDER BY clause is present",
      "Only in SQLite"
    ],
    "correctAnswer": 0,
    "explanation": "Under ANSI SQL standards, a query without GROUP BY but with HAVING treats the whole table as a single group. If the HAVING condition passes, the scalar row is emitted; if it fails, 0 rows are returned.",
    "solution": "1. Without GROUP BY, scalar aggregation treats the entire dataset as one single group.\n2. The HAVING condition is evaluated against that single global group.\n3. If `COUNT(*) > 10` is TRUE, the row with `AVG(salary)` is returned.\n4. If `COUNT(*) > 10` is FALSE, 0 rows are returned (an empty result set).",
    "tags": [
      "having-without-group-by",
      "edge-case",
      "ansi-sql"
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
    "id": "hav-008",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given table 'orders', what does the query return?",
    "table": {
      "headers": [
        "cust_id",
        "amount"
      ],
      "rows": [
        [
          1,
          500
        ],
        [
          1,
          700
        ],
        [
          2,
          300
        ],
        [
          3,
          1200
        ],
        [
          3,
          400
        ]
      ]
    },
    "sql": "SELECT cust_id, COUNT(*) AS cnt, SUM(amount) AS total\nFROM orders\nGROUP BY cust_id\nHAVING COUNT(*) > 1 AND SUM(amount) >= 1500;",
    "options": [
      "cust_id 3: cnt = 2, total = 1600",
      "cust_id 1: cnt = 2, total = 1200",
      "Both cust_id 1 and cust_id 3",
      "0 rows"
    ],
    "correctAnswer": 0,
    "explanation": "Cust 1: cnt=2, sum=1200 (fails sum >= 1500). Cust 2: cnt=1 (fails count > 1). Cust 3: cnt=2, sum=1600 (passes both). Output: Cust 3 only.",
    "solution": "1. Cust 1: count = 2, sum = 1200. Condition `sum >= 1500` fails.\n2. Cust 2: count = 1, sum = 300. Condition `count > 1` fails.\n3. Cust 3: count = 2, sum = 1600. `count > 1` is true AND `sum >= 1500` is true.\n4. Result: 1 row for customer 3.",
    "tags": [
      "query-output",
      "having",
      "and-condition"
    ]
  },
  {
    "id": "hav-009",
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "From a performance optimization perspective, why is filtering in WHERE preferred over HAVING whenever possible?",
    "table": null,
    "sql": "-- Plan A:\nSELECT dept, COUNT(*) FROM emp WHERE status = 'Active' GROUP BY dept;\n-- Plan B:\nSELECT dept, COUNT(*) FROM emp GROUP BY dept, status HAVING status = 'Active';",
    "options": [
      "WHERE filters out non-qualifying rows early before the expensive sorting, hashing, and grouping operations take place",
      "HAVING disables database table indexing permanently",
      "WHERE uses faster RAM whereas HAVING uses slower hard disks",
      "There is no difference in database execution plans"
    ],
    "correctAnswer": 0,
    "explanation": "Filtering in WHERE reduces the volume of candidate records before the query engine performs expensive partitioning, hashing, or sorting for GROUP BY.",
    "solution": "1. WHERE executes before grouping. Eliminating rows early reduces memory usage and intermediate buffer sizes.\n2. GROUP BY requires sorting or building an in-memory hash table of all candidate tuples.\n3. Using WHERE allows indexes on filtered columns to be leveraged for index scans.\n4. Therefore, non-aggregate conditions should always be placed in WHERE.",
    "tags": [
      "optimization",
      "performance",
      "where-vs-having"
    ]
  },
  {
    "id": "hav-010",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2021,
    "question": "A query attempts to find items whose individual unit price is over 100 and whose total stock value exceeds 10,000. Identify the flaw in this query:",
    "table": null,
    "sql": "SELECT item, SUM(price * qty)\nFROM inventory\nGROUP BY item\nHAVING price > 100 AND SUM(price * qty) > 10000;",
    "options": [
      "'price > 100' is a row-level attribute condition that should be in WHERE; in HAVING it causes an error because 'price' is not in GROUP BY",
      "SUM() cannot multiply two columns",
      "HAVING cannot contain the AND keyword",
      "inventory must be preceded by schema name"
    ],
    "correctAnswer": 0,
    "explanation": "Because `price` is an unaggregated column that is not part of GROUP BY, it violates the single-value rule in HAVING. The condition `price > 100` belongs in the WHERE clause.",
    "solution": "1. The grouping key is only `item`. If multiple rows for the same item have different prices, `price` is indeterminate in a group-level clause.\n2. Row-level predicate `price > 100` belongs in `WHERE price > 100`.\n3. The aggregate filter `SUM(price * qty) > 10000` remains in `HAVING`.\n4. Correct query: `SELECT item, SUM(price * qty) FROM inventory WHERE price > 100 GROUP BY item HAVING SUM(price * qty) > 10000;`.",
    "tags": [
      "debugging",
      "syntax",
      "single-value-rule"
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
    "id": "hav-011",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A project director wants to list all construction projects that have procured MORE THAN 2 distinct material categories. Which query achieves this?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT project_id, COUNT(DISTINCT category) FROM materials GROUP BY project_id HAVING COUNT(DISTINCT category) > 2;",
      "SELECT project_id, COUNT(category) FROM materials WHERE COUNT(category) > 2 GROUP BY project_id;",
      "SELECT project_id FROM materials GROUP BY project_id HAVING category > 2;",
      "SELECT DISTINCT project_id FROM materials WHERE category > 2;"
    ],
    "correctAnswer": 0,
    "explanation": "COUNT(DISTINCT category) calculates the number of unique categories per project, and HAVING filters for groups where this count exceeds 2.",
    "solution": "1. Group by project: `GROUP BY project_id`.\n2. Count unique material categories: `COUNT(DISTINCT category)`.\n3. Filter groups: `HAVING COUNT(DISTINCT category) > 2`.\n4. Option B incorrectly places an aggregate in WHERE. Option C attempts mathematical comparison on a text string.",
    "tags": [
      "application",
      "count-distinct",
      "construction"
    ]
  },
  {
    "id": "hav-012",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2023,
    "question": "Consider relation Account(acc_no, branch, balance). Which of the following queries returns branches where the MINIMUM balance of any account is strictly greater than 5000?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT branch FROM Account GROUP BY branch HAVING MIN(balance) > 5000;",
      "SELECT branch FROM Account WHERE balance > 5000 GROUP BY branch;",
      "SELECT branch FROM Account GROUP BY branch HAVING MAX(balance) > 5000;",
      "SELECT branch FROM Account GROUP BY branch WHERE MIN(balance) > 5000;"
    ],
    "correctAnswer": 0,
    "explanation": "To guarantee that EVERY account in the branch has a balance > 5000, the minimum balance in that branch must exceed 5000: `HAVING MIN(balance) > 5000`. (Note: Option B would still include a branch if it has one account with 6000 and another with 1000!).",
    "solution": "1. If a branch has accounts with balances {1000, 6000}:\n2. Option B filters `balance > 5000`, which leaves {6000}, so the branch is emitted! But not every account had balance > 5000.\n3. Option A evaluates `MIN(balance) = 1000`. `HAVING 1000 > 5000` is FALSE, so the branch is correctly excluded.\n4. Therefore, Option A is the only correct formulation.",
    "tags": [
      "gate",
      "universal-quantification",
      "min-filter"
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
    "id": "mix-001",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2023,
    "question": "Which of the following correctly describes the relationship between GROUPING SETS, ROLLUP, and CUBE in SQL:1999?",
    "table": null,
    "sql": null,
    "options": [
      "GROUPING SETS is the foundational general operator; both ROLLUP and CUBE can be defined as specific shorthand expansions of GROUPING SETS",
      "ROLLUP is the general operator; CUBE and GROUPING SETS are subsets of ROLLUP",
      "CUBE, ROLLUP, and GROUPING SETS are mutually incompatible clauses that cannot appear in the same database engine",
      "GROUPING SETS only applies to string columns"
    ],
    "correctAnswer": 0,
    "explanation": "In ANSI SQL:1999, `GROUPING SETS` is the fundamental primitive that allows arbitrary grouping combinations. `ROLLUP` and `CUBE` are predefined syntactic shortcuts that expand into specific configurations of GROUPING SETS.",
    "solution": "1. `GROUPING SETS (...)` allows developers to specify exact grouping combinations.\n2. `ROLLUP(A, B)` expands to `GROUPING SETS ((A, B), (A), ())`.\n3. `CUBE(A, B)` expands to `GROUPING SETS ((A, B), (A), (B), ())`.\n4. Therefore, GROUPING SETS is the general mechanism.",
    "tags": [
      "grouping-sets",
      "cube",
      "rollup",
      "architecture"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2023
    }
  },
  {
    "id": "mix-002",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "Given tables 'projects' and 'workforce', what is the output of the query?",
    "table": {
      "headers": [
        "p.name",
        "p.zone",
        "w.role",
        "w.headcount"
      ],
      "rows": [
        [
          "Flyover",
          "West",
          "Engineer",
          2
        ],
        [
          "Flyover",
          "West",
          "Mason",
          10
        ],
        [
          "Metro",
          "South",
          "Engineer",
          3
        ]
      ]
    },
    "sql": "SELECT p.zone, w.role, SUM(w.headcount) AS total_crew\nFROM projects p\nJOIN workforce w ON p.id = w.project_id\nGROUP BY GROUPING SETS ((p.zone, w.role), (p.zone));",
    "options": [
      "West Engineer: 2 | West Mason: 10 | West Subtotal: 12 | South Engineer: 3 | South Subtotal: 3",
      "West: 12 | South: 3",
      "Grand Total: 15 only",
      "West Engineer: 2 | West Mason: 10 | South Engineer: 3"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping sets specified are (zone, role) and (zone). This produces the detail rows by zone and role, plus subtotals by zone, without an overall grand total.",
    "solution": "1. Set (zone, role): (West, Engineer)=2, (West, Mason)=10, (South, Engineer)=3.\n2. Set (zone): (West, NULL)=12, (South, NULL)=3.\n3. Note: The empty set () was NOT included in GROUPING SETS, so no grand total is produced.\n4. Total rows = 5.",
    "tags": [
      "grouping-sets",
      "joins",
      "query-output"
    ]
  },
  {
    "id": "mix-003",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2022,
    "question": "What is the primary difference between a window aggregate function (e.g. SUM(sal) OVER (PARTITION BY dept)) and a standard GROUP BY aggregation?",
    "table": null,
    "sql": "-- Window function:\nSELECT emp_name, dept, salary, SUM(salary) OVER (PARTITION BY dept) AS dept_total\nFROM emp;",
    "options": [
      "A window function retains all individual detailed rows while appending the aggregate value; GROUP BY collapses multiple rows into a single summary row",
      "Window functions can only compute running averages, not sums",
      "GROUP BY is executed on the client; window functions are executed on the server",
      "Window functions cannot be used with numeric columns"
    ],
    "correctAnswer": 0,
    "explanation": "Standard GROUP BY collapses all rows of a group into one single summary row. Window functions retain the original row identity and cardinality, adding the aggregate calculation as an extra column beside each row.",
    "solution": "1. GROUP BY reduces cardinality: N input rows -> G group rows (G <= N).\n2. Window functions preserve cardinality: N input rows -> N output rows.\n3. This allows side-by-side comparison of individual row values against group summaries (e.g., individual salary vs. department total).",
    "tags": [
      "window-functions",
      "group-by",
      "olap"
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
    "id": "mix-004",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "Original Practice",
    "year": null,
    "question": "A data engineer uses conditional aggregation with CASE WHEN to pivot status counts into columns. What is the output of the query on the given table?",
    "table": {
      "headers": [
        "city",
        "status"
      ],
      "rows": [
        [
          "Mumbai",
          "Active"
        ],
        [
          "Mumbai",
          "Completed"
        ],
        [
          "Mumbai",
          "Active"
        ],
        [
          "Delhi",
          "Active"
        ],
        [
          "Delhi",
          "Planning"
        ]
      ]
    },
    "sql": "SELECT city,\n    SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_cnt,\n    SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS comp_cnt\nFROM projects\nGROUP BY city\nORDER BY city;",
    "options": [
      "Delhi: active=1, comp=0 | Mumbai: active=2, comp=1",
      "Delhi: active=2, comp=1 | Mumbai: active=1, comp=0",
      "Mumbai: 3 | Delhi: 2",
      "active_cnt: 3 | comp_cnt: 1"
    ],
    "correctAnswer": 0,
    "explanation": "In Delhi: 1 Active, 0 Completed, 1 Planning. active_cnt = 1, comp_cnt = 0. In Mumbai: 2 Active, 1 Completed. active_cnt = 2, comp_cnt = 1. Ordered alphabetically: Delhi, Mumbai.",
    "solution": "1. Delhi group:\n   - Row 1 (Active): CASE yields 1 for active, 0 for completed.\n   - Row 2 (Planning): CASE yields 0 for active, 0 for completed.\n   - SUMs: active = 1, comp = 0.\n2. Mumbai group:\n   - Row 1 (Active): 1, 0\n   - Row 2 (Completed): 0, 1\n   - Row 3 (Active): 1, 0\n   - SUMs: active = 2, comp = 1.\n3. ORDER BY city sorts Delhi before Mumbai.",
    "tags": [
      "conditional-aggregation",
      "case-when",
      "pivot"
    ]
  },
  {
    "id": "mix-005",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A warehouse supervisor needs to find the total procurement cost per project and material category, including category subtotals, project subtotals, and an overall grand total. Which clause is required?",
    "table": null,
    "sql": null,
    "options": [
      "GROUP BY CUBE(project_id, category)",
      "GROUP BY ROLLUP(project_id, category)",
      "GROUP BY project_id, category",
      "GROUP BY project_id WITH ROLLUP"
    ],
    "correctAnswer": 0,
    "explanation": "Because the supervisor specifically asked for BOTH project subtotals AND category subtotals (independent of project) plus the grand total, CUBE is required. ROLLUP would only provide project subtotals, omitting category-level subtotals.",
    "solution": "1. The user requires: (project, category), (project), (category), and ().\n2. ROLLUP(project, category) only provides: (project, category), (project), and ().\n3. CUBE(project, category) provides all 4 sets, including the required (category) subtotals.",
    "tags": [
      "application",
      "procurement",
      "cube-vs-rollup"
    ]
  },
  {
    "id": "mix-006",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2014,
    "question": "Consider relations Instructor(id, name, dept, salary) and Teaches(id, course_id). An administrator wants to find the department name and maximum salary of an instructor in that department, but ONLY for departments where at least one instructor teaches a course. Which query is correct?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT I.dept, MAX(I.salary) FROM Instructor I JOIN Teaches T ON I.id = T.id GROUP BY I.dept;",
      "SELECT I.dept, MAX(I.salary) FROM Instructor I GROUP BY I.dept HAVING COUNT(I.id) > 1;",
      "SELECT I.dept, MAX(I.salary) FROM Instructor I WHERE I.salary > (SELECT AVG(salary) FROM Instructor) GROUP BY I.dept;",
      "SELECT dept, MAX(salary) FROM Instructor WHERE id = Teaches.id GROUP BY dept;"
    ],
    "correctAnswer": 0,
    "explanation": "Joining Instructor with Teaches on ID filters instructors to only those present in the Teaches relation. Grouping by department and computing MAX(salary) produces the required maximum per qualifying department.",
    "solution": "1. The inner join `Instructor I JOIN Teaches T ON I.id = T.id` retains only instructors who teach at least one course.\n2. `GROUP BY I.dept` groups the qualifying instructors by department.\n3. `MAX(I.salary)` computes the maximum salary in each department.",
    "tags": [
      "gate",
      "joins",
      "group-by",
      "max"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2014
    }
  },
  {
    "id": "mix-007",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2019,
    "question": "What does the SQL standard COALESCE(expr1, expr2, ...) function return?",
    "table": null,
    "sql": "SELECT COALESCE(NULL, NULL, 'Default Value', 'Fallback');",
    "options": [
      "The first non-NULL expression in the argument list",
      "The count of non-NULL expressions",
      "The concatenation of all non-NULL strings",
      "NULL"
    ],
    "correctAnswer": 0,
    "explanation": "COALESCE returns the first non-NULL argument from left to right. If all arguments evaluate to NULL, it returns NULL.",
    "solution": "1. Argument 1 is NULL -> check argument 2.\n2. Argument 2 is NULL -> check argument 3.\n3. Argument 3 is 'Default Value' (non-null) -> returned immediately.\n4. It is widely used in ROLLUP/CUBE queries to replace subtotal NULL placeholders with readable text.",
    "tags": [
      "coalesce",
      "null-handling",
      "fundamentals"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2019
    }
  },
  {
    "id": "mix-008",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What is the result of grouping by a constant value: 'SELECT 1 AS const_col, COUNT(*), SUM(budget) FROM projects GROUP BY 1;'?",
    "table": {
      "headers": [
        "name",
        "budget"
      ],
      "rows": [
        [
          "Metro",
          50000
        ],
        [
          "Flyover",
          30000
        ]
      ]
    },
    "sql": "SELECT 1 AS const_col, COUNT(*), SUM(budget)\nFROM projects\nGROUP BY 1;",
    "options": [
      "1 row: const_col = 1, COUNT = 2, SUM = 80000",
      "2 rows with const_col = 1",
      "0 rows",
      "Syntax error: cannot group by a literal number"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL, grouping by a constant assigns all rows in the table to a single partition, computing the aggregate over the entire dataset and outputting 1 row.",
    "solution": "1. Every row in `projects` evaluates to constant value 1.\n2. Therefore, all rows belong to the same single partition.\n3. The query aggregates all 2 rows: COUNT(*) = 2, SUM(budget) = 80,000.\n4. Output: (1, 2, 80000).",
    "tags": [
      "constant-grouping",
      "edge-case",
      "query-output"
    ]
  },
  {
    "id": "mix-009",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "NIELIT",
    "exam": "Scientist 'B' (Computer Science)",
    "year": 2020,
    "question": "A query intends to sort ROLLUP output so that the Grand Total row appears at the VERY BOTTOM. Which ORDER BY clause ensures this?",
    "table": null,
    "sql": "SELECT zone, SUM(budget)\nFROM projects\nGROUP BY ROLLUP(zone)\nORDER BY ... ;",
    "options": [
      "ORDER BY (CASE WHEN zone IS NULL THEN 1 ELSE 0 END), zone ASC",
      "ORDER BY zone DESC",
      "ORDER BY zone ASC",
      "ORDER BY SUM(budget) ASC"
    ],
    "correctAnswer": 0,
    "explanation": "In standard alphabetical sorting, NULLs often sort first (NULLS FIRST). Using `CASE WHEN zone IS NULL THEN 1 ELSE 0 END` guarantees that all named zones receive rank 0 and the Grand Total (NULL) receives rank 1, forcing it to the bottom.",
    "solution": "1. In SQL engines, NULL values sort either first or last depending on engine defaults.\n2. In `CASE WHEN zone IS NULL THEN 1 ELSE 0 END`, non-null zones get 0 and NULL gets 1.\n3. Sorting by this expression ascending guarantees all named zones appear before the grand total row.\n4. Secondary sort `zone ASC` sorts the named zones alphabetically.",
    "tags": [
      "sorting",
      "nulls-last",
      "rollup-ui"
    ],
    "sourceType": "competitive",
    "institution": "NIELIT",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "NIELIT",
      "exam": "Scientist 'B' (Computer Science)",
      "year": 2020
    }
  },
  {
    "id": "mix-010",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "year": 2021,
    "question": "Consider relation Sales(year, region, amount). Which query produces subtotals for (year, region) and (year), but explicitly EXCLUDES the Grand Total?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT year, region, SUM(amount) FROM Sales GROUP BY year, ROLLUP(region);",
      "SELECT year, region, SUM(amount) FROM Sales GROUP BY ROLLUP(year, region);",
      "SELECT year, region, SUM(amount) FROM Sales GROUP BY CUBE(year, region);",
      "SELECT year, region, SUM(amount) FROM Sales GROUP BY year, region;"
    ],
    "correctAnswer": 0,
    "explanation": "In `GROUP BY year, ROLLUP(region)`, 'year' is invariant outside the rollup. ROLLUP(region) generates (region) and (). When prefixed with year, the resulting grouping sets are (year, region) and (year). The empty set () is never generated, so the grand total is omitted.",
    "solution": "1. `ROLLUP(region)` expands to {(region), ()}.\n2. Column `year` prefixes every set: year × {(region), ()} = {(year, region), (year)}.\n3. Detail rows are at (year, region); subtotals are at (year).\n4. The Grand Total () is absent.",
    "tags": [
      "partial-rollup",
      "grand-total-exclusion",
      "grouping-sets"
    ],
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2021
    }
  },
  {
    "id": "mix-011",
    "topic": "Mixed",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "year": null,
    "question": "What is an OLAP Data Cube conceptually represented as?",
    "table": null,
    "sql": null,
    "options": [
      "An N-dimensional geometric space where axes represent analytical dimensions and cells contain aggregate metric values",
      "A physical hardware storage disk shaped like a cube",
      "A cryptographic hash table",
      "A B-tree index on three columns"
    ],
    "correctAnswer": 0,
    "explanation": "In data warehousing, an OLAP cube models multi-attribute data geometrically: coordinates along the dimensions (e.g. Time, Location, Product) identify data cells storing aggregated metrics (e.g. Total Sales).",
    "solution": "1. Dimensions form the coordinate axes (e.g., X=City, Y=Product, Z=Quarter).\n2. Cells at coordinate intersections store aggregate measures (e.g., Revenue).\n3. Slicing, dicing, and drilling down traverse this multidimensional structure.\n4. The SQL CUBE operator generates all projections of this N-dimensional cube.",
    "tags": [
      "olap-cube",
      "data-warehousing",
      "concepts"
    ]
  },
  {
    "id": "mix-012",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Application",
    "source": "Original Practice",
    "year": null,
    "question": "A civil engineering dashboard requires identifying any project whose total procured materials cost exceeds its approved budget. Which query achieves this?",
    "table": null,
    "sql": null,
    "options": [
      "SELECT p.id, p.name, p.budget, SUM(m.total_cost) AS actual_cost FROM projects p JOIN materials m ON p.id = m.project_id GROUP BY p.id, p.name, p.budget HAVING SUM(m.total_cost) > p.budget;",
      "SELECT p.id, p.name, p.budget, SUM(m.total_cost) FROM projects p JOIN materials m ON p.id = m.project_id WHERE SUM(m.total_cost) > p.budget GROUP BY p.id;",
      "SELECT p.id, p.name FROM projects p WHERE budget < (SELECT total_cost FROM materials);",
      "SELECT p.id, p.budget FROM projects p GROUP BY p.id HAVING p.budget > 100000;"
    ],
    "correctAnswer": 0,
    "explanation": "The query joins projects with materials, groups by project attributes, and uses HAVING to compare the aggregated total cost (`SUM(m.total_cost)`) against the project's budget (`p.budget`).",
    "solution": "1. `p.id, p.name, p.budget` are in GROUP BY, satisfying the single-value rule.\n2. The aggregate `SUM(m.total_cost)` computes total expenditure per project.\n3. The condition `HAVING SUM(m.total_cost) > p.budget` correctly filters for cost overruns.\n4. Option B places an aggregate function in WHERE, which is invalid.",
    "tags": [
      "application",
      "construction-budget",
      "having-comparison"
    ]
  },
  {
    "id": "mix-013",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Exam Style",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2022,
    "question": "Consider relation R(A, B) with functional dependency A -> B. In a query 'SELECT A, B, COUNT(*) FROM R GROUP BY A', is omitting B from the GROUP BY clause valid in modern SQL (ANSI SQL:2003+)?",
    "table": null,
    "sql": "SELECT A, B, COUNT(*)\nFROM R\nGROUP BY A;",
    "options": [
      "Yes, if A is a primary key or candidate key, B is functionally dependent on A, so each group has a unique single value for B",
      "No, B must always be explicitly listed in GROUP BY regardless of functional dependencies",
      "Only if B is a numeric column",
      "Only if COUNT(*) > 1"
    ],
    "correctAnswer": 0,
    "explanation": "ANSI SQL:2003 introduced the functional dependency rule: if a table has a primary key in GROUP BY, any attribute functionally dependent on that key can legally appear in SELECT without explicit inclusion in GROUP BY.",
    "solution": "1. In ANSI SQL:1992, every non-aggregated column in SELECT had to be explicitly listed in GROUP BY.\n2. In ANSI SQL:2003 (and supported by Postgres/MySQL 5.7+), if A is a primary key, A -> B holds.\n3. Since A determines a unique value of B for each group, there is no ambiguity emitting B.\n4. Therefore, modern SQL allows omitting functionally dependent attributes.",
    "tags": [
      "gate",
      "functional-dependency",
      "ansi-sql-2003"
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
    "id": "mix-014",
    "topic": "Mixed",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "Original Practice",
    "year": null,
    "question": "What is the output of the query when both columns are NULL in a table containing a single row (NULL, NULL)?",
    "table": {
      "headers": [
        "x",
        "y"
      ],
      "rows": [
        [
          null,
          null
        ]
      ]
    },
    "sql": "SELECT x, y, COUNT(*)\nFROM single_null_row\nGROUP BY ROLLUP(x, y);",
    "options": [
      "3 rows, all displaying (NULL, NULL) with counts 1, 1, 1",
      "1 row",
      "0 rows",
      "Runtime database error"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping set (x, y) yields (NULL, NULL) with count 1. Subtotal set (x) yields (NULL, NULL) with count 1. Grand total set () yields (NULL, NULL) with count 1. All 3 rows have (NULL, NULL).",
    "solution": "1. Grouping set (x, y): The single row has x=NULL, y=NULL. Output: (NULL, NULL, 1).\n2. Grouping set (x): x=NULL, y rolled up to NULL. Output: (NULL, NULL, 1).\n3. Grouping set (): x rolled up to NULL, y rolled up to NULL. Output: (NULL, NULL, 1).\n4. Total = 3 rows, all visually displaying NULLs, distinguishable only via `GROUPING()`.",
    "tags": [
      "null-edge-case",
      "rollup",
      "query-output"
    ]
  },
  {
    "id": "mix-015",
    "topic": "Mixed",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "year": 2016,
    "question": "Which SQL clause is executed LAST in the logical query processing phase?",
    "table": null,
    "sql": "SELECT dept, COUNT(*)\nFROM employees\nWHERE salary > 30000\nGROUP BY dept\nHAVING COUNT(*) > 2\nORDER BY dept DESC\nLIMIT 5;",
    "options": [
      "ORDER BY (or LIMIT / OFFSET if present)",
      "SELECT",
      "HAVING",
      "GROUP BY"
    ],
    "correctAnswer": 0,
    "explanation": "Logical processing pipeline: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT / OFFSET.",
    "solution": "1. Data gathering: FROM.\n2. Row filtering: WHERE.\n3. Grouping: GROUP BY.\n4. Group filtering: HAVING.\n5. Column projection: SELECT & DISTINCT.\n6. Ordering & Pagination: ORDER BY, then LIMIT/OFFSET.",
    "tags": [
      "execution-order",
      "limit",
      "order-by"
    ],
    "sourceType": "competitive",
    "institution": "GATE",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "GATE",
      "exam": "Computer Science & Information Technology",
      "year": 2016
    }
  },
  {
    "id": "mix-016",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "Original Practice",
    "year": null,
    "question": "A reporting query uses: 'SELECT zone, city, COUNT(*) FROM projects GROUP BY CUBE(zone, city) ORDER BY zone ASC, city ASC;'. In some database engines, why do subtotal rows appear at the TOP instead of after their group?",
    "table": null,
    "sql": "SELECT zone, city, COUNT(*)\nFROM projects\nGROUP BY CUBE(zone, city)\nORDER BY zone ASC, city ASC;",
    "options": [
      "Because in standard SQL, NULL values are sorted as the lowest possible values (NULLS FIRST by default in ASC order), causing subtotal NULL rows to sort before actual values",
      "Because CUBE reverses the alphabetical order",
      "Because COUNT(*) forces NULLs to the top",
      "Because the database is corrupted"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL engines where default ascending order places NULLs first, the subtotal rows (where city is NULL or zone is NULL) sort before rows with actual names. Adding `NULLS LAST` or a custom `GROUPING()` sort key fixes the ordering.",
    "solution": "1. When sorting `ORDER BY city ASC`, engines implementing `NULLS FIRST` place NULL ahead of 'A'.\n2. In a CUBE/ROLLUP query, subtotal rows have NULL in aggregated columns, so they sort to the top of their partition.\n3. To place subtotals at the bottom, specify: `ORDER BY zone ASC, city ASC NULLS LAST` or use `GROUPING(city)` as a sort key.",
    "tags": [
      "debugging",
      "nulls-first",
      "order-by"
    ]
  },
  {
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "question": "When grouping rows by a column that contains multiple NULL values, how does standard ANSI SQL treat those NULLs?",
    "sql": "SELECT department, COUNT(*) FROM staff GROUP BY department;",
    "table": null,
    "options": [
      "Each NULL value is treated as a separate, distinct group",
      "All NULL values are gathered into a single summary group",
      "Rows with NULL in the grouping column are automatically discarded",
      "The query raises a runtime NULL_POINTER_EXCEPTION error"
    ],
    "correctAnswer": 1,
    "explanation": "In ANSI SQL, NULL values are not distinct from one another for grouping purposes; all tuples with NULL in the grouping attribute are collected into one single partition.",
    "solution": "1. The query scans candidate rows after WHERE.\n2. Tuples where department IS NULL are evaluated together.\n3. Standard SQL treats all NULLs as matching for grouping, creating one combined partition with NULL header.",
    "tags": [
      "group-by",
      "null-handling",
      "ansi-sql"
    ],
    "id": "prac-core-113",
    "year": null
  },
  {
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "question": "Given the \"orders\" table, what is the output of the query grouping by customer_id and payment_status?",
    "table": {
      "headers": [
        "order_id",
        "customer_id",
        "payment_status",
        "amount"
      ],
      "rows": [
        [
          101,
          "C1",
          "PAID",
          500
        ],
        [
          102,
          "C1",
          "PAID",
          300
        ],
        [
          103,
          "C2",
          "PAID",
          700
        ],
        [
          104,
          "C1",
          "PENDING",
          200
        ],
        [
          105,
          "C2",
          "PAID",
          100
        ]
      ]
    },
    "sql": "SELECT customer_id, payment_status, SUM(amount) AS total FROM orders GROUP BY customer_id, payment_status ORDER BY customer_id, payment_status;",
    "options": [
      "3 rows: (C1, PAID, 800), (C1, PENDING, 200), (C2, PAID, 800)",
      "2 rows: (C1, 1000), (C2, 800)",
      "4 rows: (C1, PAID, 500), (C1, PAID, 300), (C2, PAID, 800), (C1, PENDING, 200)",
      "5 rows: one row per original order"
    ],
    "correctAnswer": 0,
    "explanation": "Grouping by (customer_id, payment_status) forms distinct pairs: (C1, PAID) with 500+300=800; (C1, PENDING) with 200; and (C2, PAID) with 700+100=800.",
    "solution": "1. Identify distinct tuples of (customer_id, payment_status): (C1, PAID), (C1, PENDING), (C2, PAID).\n2. Sum amount for (C1, PAID): 500 + 300 = 800.\n3. Sum amount for (C1, PENDING): 200.\n4. Sum amount for (C2, PAID): 700 + 100 = 800.\n5. Output contains exactly 3 summary rows.",
    "tags": [
      "group-by",
      "multi-column",
      "query-output"
    ],
    "id": "prac-core-114",
    "year": null
  },
  {
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "question": "Identify the syntax error in the following SQL query executed on a relational database:",
    "sql": "SELECT department, designation, AVG(salary) AS avg_sal\nFROM faculty\nGROUP BY department;",
    "table": null,
    "options": [
      "The AVG function cannot be aliased as avg_sal",
      "The unaggregated column \"designation\" appears in SELECT but is omitted from GROUP BY",
      "FROM clause cannot precede GROUP BY",
      "AVG() function requires a HAVING clause to compile"
    ],
    "correctAnswer": 1,
    "explanation": "According to the SQL Single-Value Rule, any non-aggregated attribute appearing in the SELECT list must be included in the GROUP BY clause to avoid indeterminate outputs.",
    "solution": "1. The SELECT clause lists designation without an aggregate function.\n2. The GROUP BY clause only groups by department.\n3. Multiple designations exist per department, making designation ambiguous.\n4. To fix, either include designation in GROUP BY or wrap it in an aggregate function.",
    "tags": [
      "group-by",
      "debugging",
      "single-value-rule"
    ],
    "id": "prac-core-115",
    "year": null
  },
  {
    "topic": "GROUP BY",
    "difficulty": "Hard",
    "type": "Application",
    "source": "BARC",
    "exam": "Scientific Officer (Computer Science)",
    "question": "In a database system with 10,000,000 records, which physical execution operator is most commonly chosen by query optimizers for GROUP BY when the grouping key is already supported by an index in sorted order?",
    "sql": "SELECT store_id, COUNT(*) FROM transactions GROUP BY store_id;",
    "table": null,
    "options": [
      "Hash Aggregate operator",
      "Stream Aggregate (Group Aggregate) operator",
      "Nested Loops Join operator",
      "Bitmap Table Scan operator"
    ],
    "correctAnswer": 1,
    "explanation": "When input tuples are already ordered on the grouping key (e.g. via a B+ Tree index), Stream Aggregate (Group Aggregate) processes rows sequentially with O(1) auxiliary memory without building an in-memory hash table.",
    "solution": "1. Hash Aggregate builds an in-memory hash table of distinct keys, requiring O(K) space.\n2. If input rows are presorted by store_id, Stream Aggregate simply accumulates records while store_id matches the current key.\n3. As soon as the key changes, it emits the aggregate and resets the accumulator.\n4. Therefore, Stream Aggregate is the most efficient choice.",
    "tags": [
      "group-by",
      "query-optimizer",
      "stream-aggregate"
    ],
    "id": "prac-core-116",
    "year": 2021,
    "sourceType": "competitive",
    "institution": "BARC",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "BARC",
      "exam": "Scientific Officer (Computer Science)",
      "year": 2021
    }
  },
  {
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "question": "Can an expression (e.g., YEAR(order_date)) be used in a GROUP BY clause in standard SQL?",
    "sql": "SELECT YEAR(order_date), COUNT(*) FROM sales GROUP BY YEAR(order_date);",
    "table": null,
    "options": [
      "No, GROUP BY only permits raw stored column names",
      "Yes, GROUP BY can partition rows by scalar deterministic expressions",
      "Only if the expression is defined as a virtual primary key",
      "Only if enclosed in a nested subquery"
    ],
    "correctAnswer": 1,
    "explanation": "Standard SQL permits grouping by expressions, functions, and column calculations as long as the expression in the SELECT list matches the expression in the GROUP BY clause.",
    "solution": "1. Expressions like YEAR(order_date) evaluate to a deterministic scalar per row.\n2. Rows sharing the same scalar evaluation are partitioned into the same group.\n3. This is fully compliant with standard SQL.",
    "tags": [
      "group-by",
      "expressions",
      "sql-standard"
    ],
    "id": "prac-core-117",
    "year": null
  },
  {
    "topic": "Aggregate Functions",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "question": "What is the fundamental difference between COUNT(*) and COUNT(column_name) in SQL?",
    "sql": "SELECT COUNT(*), COUNT(bonus) FROM employees;",
    "table": null,
    "options": [
      "COUNT(*) counts distinct values, while COUNT(column) counts all rows",
      "COUNT(*) counts all tuples including NULLs, while COUNT(column) excludes NULL values",
      "COUNT(*) only counts numeric columns, while COUNT(column) counts any type",
      "There is no difference; they always return identical numbers"
    ],
    "correctAnswer": 1,
    "explanation": "COUNT(*) counts every row in the partition regardless of column contents. COUNT(column_name) evaluates each row and only increments if the specified column is NOT NULL.",
    "solution": "1. COUNT(*) looks at the tuple existence and increments for every row.\n2. COUNT(column) evaluates whether column IS NOT NULL.\n3. If bonus is NULL for 3 out of 10 rows, COUNT(*) returns 10 while COUNT(bonus) returns 7.",
    "tags": [
      "aggregate-functions",
      "count",
      "null-handling"
    ],
    "id": "prac-core-118",
    "year": null
  },
  {
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "question": "A table \"scores\" contains column \"pts\" with values: [10, 20, NULL, 30, NULL]. What does AVG(pts) evaluate to in standard SQL?",
    "table": null,
    "sql": "SELECT AVG(pts) FROM scores;",
    "options": [
      "12 (sum 60 divided by 5 rows)",
      "20 (sum 60 divided by 3 non-null rows)",
      "NULL because NULL values contaminate mathematical aggregates",
      "0 because NULL is treated as zero"
    ],
    "correctAnswer": 1,
    "explanation": "SQL aggregate functions (except COUNT(*)) completely ignore NULL values before performing calculations. AVG(pts) computes (10 + 20 + 30) / 3 = 20.",
    "solution": "1. Non-null values: 10, 20, 30. Count of non-nulls = 3.\n2. Sum of non-nulls = 60.\n3. AVG = 60 / 3 = 20.\n4. NULL rows are excluded from both the numerator and denominator.",
    "tags": [
      "aggregate-functions",
      "avg",
      "null-handling"
    ],
    "id": "prac-core-119",
    "year": null
  },
  {
    "topic": "Aggregate Functions",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "GATE",
    "exam": "Computer Science & Information Technology",
    "question": "What does SUM(val) return if executed against a table where all rows contain NULL for column \"val\"?",
    "sql": "SELECT SUM(val) FROM empty_or_null_table;",
    "table": null,
    "options": [
      "0",
      "NULL",
      "Runtime exception: \"Cannot compute sum of empty set\"",
      "NaN"
    ],
    "correctAnswer": 1,
    "explanation": "In ANSI SQL, when an aggregate function (SUM, AVG, MIN, MAX) is applied to an empty set or a set of only NULLs, the result is NULL. Only COUNT returns 0.",
    "solution": "1. Aggregates eliminate all NULL inputs.\n2. If no non-null values remain, ANSI SQL defines the return value of SUM, AVG, MIN, MAX as NULL.\n3. In contrast, COUNT on an empty set returns 0.",
    "tags": [
      "aggregate-functions",
      "sum",
      "edge-case"
    ],
    "id": "prac-core-120",
    "year": 2018,
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
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "question": "Given the \"inventory\" table below, what is the output of the query?",
    "table": {
      "headers": [
        "item_id",
        "category",
        "price"
      ],
      "rows": [
        [
          1,
          "Hardware",
          100
        ],
        [
          2,
          "Hardware",
          200
        ],
        [
          3,
          "Hardware",
          100
        ],
        [
          4,
          "Software",
          500
        ],
        [
          5,
          "Software",
          500
        ]
      ]
    },
    "sql": "SELECT category, COUNT(DISTINCT price) AS dist_prices, COUNT(*) AS total_items FROM inventory GROUP BY category ORDER BY category;",
    "options": [
      "Hardware: dist_prices=2, total=3 | Software: dist_prices=1, total=2",
      "Hardware: dist_prices=3, total=3 | Software: dist_prices=2, total=2",
      "Hardware: dist_prices=1, total=3 | Software: dist_prices=1, total=2",
      "Hardware: dist_prices=2, total=2 | Software: dist_prices=1, total=1"
    ],
    "correctAnswer": 0,
    "explanation": "For Hardware: distinct prices are {100, 200} (count 2), total items = 3. For Software: distinct prices are {500} (count 1), total items = 2.",
    "solution": "1. Group \"Hardware\" has prices [100, 200, 100]. Distinct set = {100, 200} -> COUNT(DISTINCT) = 2. Total rows = 3.\n2. Group \"Software\" has prices [500, 500]. Distinct set = {500} -> COUNT(DISTINCT) = 1. Total rows = 2.",
    "tags": [
      "aggregate-functions",
      "count-distinct",
      "query-output"
    ],
    "id": "prac-core-121",
    "year": null
  },
  {
    "topic": "HAVING",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "question": "Why can the HAVING clause filter based on aggregate function results (e.g., HAVING COUNT(*) > 5) while the WHERE clause cannot?",
    "sql": "SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;",
    "table": null,
    "options": [
      "WHERE clause is executed before group partitions and aggregate accumulators are formed",
      "WHERE clause only operates on indexed columns",
      "HAVING is an optimization keyword introduced to bypass table scans",
      "WHERE is restricted to string comparisons only"
    ],
    "correctAnswer": 0,
    "explanation": "In the logical SQL query processing order, WHERE executes directly on raw candidate rows from FROM. GROUP BY and aggregation occur subsequently, making aggregates available only to HAVING and SELECT.",
    "solution": "1. SQL execution pipeline: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.\n2. WHERE evaluates row-by-row before any groups exist.\n3. HAVING evaluates after groups have formed and aggregate functions are computed.",
    "tags": [
      "having",
      "execution-order",
      "sql-pipeline"
    ],
    "id": "prac-core-122",
    "year": null
  },
  {
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "question": "A developer writes the following query to find departments with total budget over 1,000,000. What is wrong?",
    "sql": "SELECT department, SUM(budget) AS total_b\nFROM projects\nWHERE SUM(budget) > 1000000\nGROUP BY department;",
    "table": null,
    "options": [
      "SUM(budget) is not allowed in the WHERE clause; it must be in a HAVING clause",
      "The column alias total_b cannot start with the letter t",
      "GROUP BY must appear before WHERE",
      "SUM(budget) cannot be used with integers"
    ],
    "correctAnswer": 0,
    "explanation": "Aggregate functions cannot appear in the WHERE clause because WHERE filters individual records before groups are formed. Filtering aggregated sums requires HAVING SUM(budget) > 1000000.",
    "solution": "1. The WHERE clause filters rows prior to aggregation.\n2. Placing SUM(budget) in WHERE causes a SQL compilation error: \"misuse of aggregate function in WHERE clause\".\n3. The correct syntax is: GROUP BY department HAVING SUM(budget) > 1000000.",
    "tags": [
      "having",
      "debugging",
      "where-vs-having"
    ],
    "id": "prac-core-123",
    "year": null
  },
  {
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "question": "Is a HAVING clause valid in SQL if there is NO explicit GROUP BY clause in the query?",
    "sql": "SELECT AVG(salary) FROM employees HAVING COUNT(*) > 10;",
    "table": null,
    "options": [
      "Yes, the entire table is treated as a single implicit group",
      "No, HAVING without GROUP BY produces an immediate syntax error in all SQL engines",
      "Yes, but only if the query includes a subquery in the FROM clause",
      "Only if all columns in the table are primary keys"
    ],
    "correctAnswer": 0,
    "explanation": "In standard ANSI SQL, a query with aggregate functions and HAVING but no GROUP BY treats the entire table as one single implicit group. If the HAVING condition evaluates to false, zero rows are emitted.",
    "solution": "1. Without a GROUP BY clause, the candidate rows form one single grand group.\n2. Aggregate functions evaluate across the whole table.\n3. The HAVING condition tests this single grand group.\n4. If COUNT(*) > 10 is true, one summary row is emitted; otherwise, zero rows are emitted.",
    "tags": [
      "having",
      "implicit-group",
      "ansi-sql"
    ],
    "id": "prac-core-124",
    "year": 2018,
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2018
    }
  },
  {
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "question": "For a query specifying GROUP BY ROLLUP(a, b, c), how many grouping sets are generated?",
    "sql": "SELECT a, b, c, COUNT(*) FROM sales GROUP BY ROLLUP(a, b, c);",
    "table": null,
    "options": [
      "3 grouping sets",
      "4 grouping sets: (a, b, c), (a, b), (a), and ()",
      "8 grouping sets (2^3)",
      "6 grouping sets (3!)"
    ],
    "correctAnswer": 1,
    "explanation": "ROLLUP on n columns generates exactly n + 1 hierarchical grouping sets: reducing columns from right to left down to the grand total ().",
    "solution": "1. Number of columns in ROLLUP = 3 (a, b, c).\n2. ROLLUP generates hierarchical subsets: (a, b, c), (a, b), (a), ().\n3. Formula for ROLLUP(N) = N + 1 grouping sets.\n4. 3 + 1 = 4 grouping sets.",
    "tags": [
      "rollup",
      "hierarchy",
      "grouping-sets"
    ],
    "id": "prac-core-125",
    "year": null
  },
  {
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "question": "Given the \"sales\" table with 2 regions (East, West) and 2 quarters (Q1, Q2) each having 1 record of 100 revenue, how many total rows will be emitted by: SELECT region, quarter, SUM(revenue) FROM sales GROUP BY ROLLUP(region, quarter);",
    "table": null,
    "sql": "SELECT region, quarter, SUM(revenue) FROM sales GROUP BY ROLLUP(region, quarter);",
    "options": [
      "4 rows (only base groups)",
      "7 rows: 4 base rows + 2 regional subtotals + 1 grand total",
      "8 rows: 4 base rows + 4 cross-dimensional subtotals",
      "5 rows: 4 base rows + 1 grand total"
    ],
    "correctAnswer": 1,
    "explanation": "The 4 base combinations (East Q1, East Q2, West Q1, West Q2) produce 4 rows. ROLLUP adds regional subtotals (East ALL, West ALL) = 2 rows. Finally, the grand total (ALL ALL) = 1 row. Total = 4 + 2 + 1 = 7 rows.",
    "solution": "1. Grouping set (region, quarter): 2 * 2 = 4 rows.\n2. Grouping set (region): 2 regional subtotal rows (quarter = NULL).\n3. Grouping set (): 1 grand total row (region = NULL, quarter = NULL).\n4. Total emitted rows = 4 + 2 + 1 = 7 rows.",
    "tags": [
      "rollup",
      "query-output",
      "subtotals"
    ],
    "id": "prac-core-126",
    "year": null
  },
  {
    "topic": "ROLLUP",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "question": "How does the SQL GROUPING(column_name) function distinguish between a naturally occurring NULL in stored data and a NULL generated by ROLLUP for a subtotal row?",
    "sql": "SELECT department, GROUPING(department) AS is_subtotal, SUM(salary)\nFROM staff\nGROUP BY ROLLUP(department);",
    "table": null,
    "options": [
      "GROUPING(col) returns 1 if the NULL represents a subtotal super-aggregate, and 0 for regular rows",
      "GROUPING(col) returns \"SUBTOTAL\" string for rollup rows and \"NORMAL\" for data rows",
      "GROUPING(col) converts stored NULLs to empty strings automatically",
      "GROUPING(col) returns the count of rows collapsed into that group"
    ],
    "correctAnswer": 0,
    "explanation": "The standard GROUPING() scalar function returns 1 if the specified column is NULL as a result of being aggregated in a super-aggregate subtotal/grand-total, and 0 if the value is part of the regular grouping set (even if stored data is NULL).",
    "solution": "1. Stored records may contain NULL in the department column.\n2. For that stored NULL record, GROUPING(department) returns 0.\n3. For the grand total row generated by ROLLUP where department is set to NULL, GROUPING(department) returns 1.\n4. This allows applications to format subtotals without confusing them with actual NULL data.",
    "tags": [
      "rollup",
      "grouping-function",
      "super-aggregate"
    ],
    "id": "prac-core-127",
    "year": 2020,
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
    "topic": "CUBE",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "Original Practice",
    "question": "For GROUP BY CUBE(x, y), what is the total number of grouping sets computed?",
    "sql": "SELECT x, y, SUM(val) FROM measurements GROUP BY CUBE(x, y);",
    "table": null,
    "options": [
      "2 grouping sets",
      "3 grouping sets",
      "4 grouping sets: (x, y), (x), (y), ()",
      "6 grouping sets"
    ],
    "correctAnswer": 2,
    "explanation": "CUBE calculates the power set (all 2^n mathematical combinations) of the grouping columns. For 2 columns: 2^2 = 4 grouping sets: (x, y), (x), (y), and ().",
    "solution": "1. Formula for CUBE on N dimensions: 2^N grouping sets.\n2. Here N = 2 columns (x, y).\n3. 2^2 = 4 grouping sets.\n4. Sets produced: (x, y), (x), (y), ().",
    "tags": [
      "cube",
      "power-set",
      "olap"
    ],
    "id": "prac-core-128",
    "year": null
  },
  {
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "question": "What is the primary conceptual difference between ROLLUP and CUBE in SQL analytical processing?",
    "sql": "-- ROLLUP vs CUBE comparison:\nGROUP BY ROLLUP(dept, year);\nGROUP BY CUBE(dept, year);",
    "table": null,
    "options": [
      "ROLLUP is hierarchical and order-dependent; CUBE generates all multidimensional cross-combinations and is symmetric",
      "ROLLUP only works on numeric columns, while CUBE only works on strings",
      "CUBE does not generate a grand total row, while ROLLUP does",
      "ROLLUP is an ANSI standard, while CUBE is proprietary to Oracle"
    ],
    "correctAnswer": 0,
    "explanation": "ROLLUP assumes a dimensional hierarchy (e.g., Year -> Quarter -> Month) generating n+1 sets where column order matters. CUBE generates all 2^n combinations without hierarchy, making CUBE(a, b) equivalent to CUBE(b, a).",
    "solution": "1. ROLLUP(a, b) produces (a, b), (a), ().\n2. CUBE(a, b) produces (a, b), (a), (b), ().\n3. The extra set in CUBE is (b) (subtotal across all a for each b).\n4. CUBE is fully symmetric across dimensions.",
    "tags": [
      "cube",
      "rollup-vs-cube",
      "multidimensional"
    ],
    "id": "prac-core-129",
    "year": null
  },
  {
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Application",
    "source": "UGC NET",
    "exam": "Computer Science and Applications",
    "question": "In an OLAP hypercube with 4 independent dimensions, how many separate aggregation queries would have to be UNION ALL-ed together to replicate the output of a single CUBE(d1, d2, d3, d4)?",
    "sql": "SELECT d1, d2, d3, d4, SUM(sales) FROM warehouse GROUP BY CUBE(d1, d2, d3, d4);",
    "table": null,
    "options": [
      "4 queries",
      "5 queries",
      "16 queries (2^4)",
      "24 queries (4!)"
    ],
    "correctAnswer": 2,
    "explanation": "CUBE computes all 2^n grouping sets. For 4 dimensions: 2^4 = 16 separate grouping sets. Prior to CUBE, developers had to write 16 SELECT queries joined by UNION ALL.",
    "solution": "1. CUBE on 4 dimensions computes every subset of {d1, d2, d3, d4}.\n2. The power set of 4 elements contains 2^4 = 16 subsets.\n3. Emulating this manually requires 16 SELECT queries with different GROUP BY clauses combined via UNION ALL.",
    "tags": [
      "cube",
      "olap",
      "power-set"
    ],
    "id": "prac-core-130",
    "year": 2019,
    "sourceType": "competitive",
    "institution": "UGC NET",
    "sourceInfo": {
      "sourceType": "competitive",
      "institution": "UGC NET",
      "exam": "Computer Science and Applications",
      "year": 2019
    }
  },
  {
    "id": "prac-gb-113",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Healthcare operational database, what result does grouping by \"ward\" produce when calculating average stay_days?",
    "sql": "SELECT ward, AVG(stay_days) AS avg_val, COUNT(*) AS total_records\nFROM patient_admissions\nGROUP BY ward;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct ward, with the mean stay_days of that group",
      "A single scalar number representing the grand average across all records in patient_admissions",
      "Duplicate rows for each ward without aggregating stay_days",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY ward partitions the table rows by distinct values of ward and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct ward.\n2. For each partition, AVG(stay_days) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct ward.",
    "tags": [
      "group-by",
      "healthcare",
      "application"
    ]
  },
  {
    "id": "prac-hav-114",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Healthcare system, which clause correctly filters out ward groups having fewer than 50 total records?",
    "sql": "SELECT ward, SUM(stay_days) AS total_metric\nFROM patient_admissions\nGROUP BY ward\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY ward groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "healthcare",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-115",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Healthcare schema, how does ROLLUP(ward, diagnosis) represent the subtotal row for each ward across all diagnosis?",
    "sql": "SELECT ward, diagnosis, SUM(stay_days) AS total_val\nFROM patient_admissions\nGROUP BY ROLLUP(ward, diagnosis);",
    "table": null,
    "options": [
      "The ward column displays the group key, while diagnosis is emitted as NULL",
      "Both ward and diagnosis are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "ward is emitted as NULL while diagnosis displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (ward) rolls up diagnosis.\n2. In those subtotal rows, ward retains its partition value while diagnosis is set to NULL.\n3. The grand total row has both ward and diagnosis as NULL.",
    "tags": [
      "rollup",
      "healthcare",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-116",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If patient_admissions has 5 distinct values for \"ward\" and 4 distinct values for \"diagnosis\", what is the maximum number of rows returned by CUBE(ward, diagnosis)?",
    "sql": "SELECT ward, diagnosis, COUNT(*) FROM patient_admissions GROUP BY CUBE(ward, diagnosis);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "healthcare",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-117",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Banking operational database, what result does grouping by \"branch\" produce when calculating average principal?",
    "sql": "SELECT branch, AVG(principal) AS avg_val, COUNT(*) AS total_records\nFROM loan_portfolio\nGROUP BY branch;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct branch, with the mean principal of that group",
      "A single scalar number representing the grand average across all records in loan_portfolio",
      "Duplicate rows for each branch without aggregating principal",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY branch partitions the table rows by distinct values of branch and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct branch.\n2. For each partition, AVG(principal) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct branch.",
    "tags": [
      "group-by",
      "banking",
      "application"
    ]
  },
  {
    "id": "prac-hav-118",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Banking system, which clause correctly filters out branch groups having fewer than 50 total records?",
    "sql": "SELECT branch, SUM(principal) AS total_metric\nFROM loan_portfolio\nGROUP BY branch\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY branch groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "banking",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-119",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Banking schema, how does ROLLUP(branch, loan_type) represent the subtotal row for each branch across all loan_type?",
    "sql": "SELECT branch, loan_type, SUM(principal) AS total_val\nFROM loan_portfolio\nGROUP BY ROLLUP(branch, loan_type);",
    "table": null,
    "options": [
      "The branch column displays the group key, while loan_type is emitted as NULL",
      "Both branch and loan_type are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "branch is emitted as NULL while loan_type displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (branch) rolls up loan_type.\n2. In those subtotal rows, branch retains its partition value while loan_type is set to NULL.\n3. The grand total row has both branch and loan_type as NULL.",
    "tags": [
      "rollup",
      "banking",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-120",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If loan_portfolio has 5 distinct values for \"branch\" and 4 distinct values for \"loan_type\", what is the maximum number of rows returned by CUBE(branch, loan_type)?",
    "sql": "SELECT branch, loan_type, COUNT(*) FROM loan_portfolio GROUP BY CUBE(branch, loan_type);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "banking",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-121",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a E-Commerce operational database, what result does grouping by \"warehouse\" produce when calculating average quantity?",
    "sql": "SELECT warehouse, AVG(quantity) AS avg_val, COUNT(*) AS total_records\nFROM order_items\nGROUP BY warehouse;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct warehouse, with the mean quantity of that group",
      "A single scalar number representing the grand average across all records in order_items",
      "Duplicate rows for each warehouse without aggregating quantity",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY warehouse partitions the table rows by distinct values of warehouse and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct warehouse.\n2. For each partition, AVG(quantity) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct warehouse.",
    "tags": [
      "group-by",
      "e-commerce",
      "application"
    ]
  },
  {
    "id": "prac-hav-122",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the E-Commerce system, which clause correctly filters out warehouse groups having fewer than 50 total records?",
    "sql": "SELECT warehouse, SUM(quantity) AS total_metric\nFROM order_items\nGROUP BY warehouse\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY warehouse groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "e-commerce",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-123",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the E-Commerce schema, how does ROLLUP(warehouse, product_category) represent the subtotal row for each warehouse across all product_category?",
    "sql": "SELECT warehouse, product_category, SUM(quantity) AS total_val\nFROM order_items\nGROUP BY ROLLUP(warehouse, product_category);",
    "table": null,
    "options": [
      "The warehouse column displays the group key, while product_category is emitted as NULL",
      "Both warehouse and product_category are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "warehouse is emitted as NULL while product_category displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (warehouse) rolls up product_category.\n2. In those subtotal rows, warehouse retains its partition value while product_category is set to NULL.\n3. The grand total row has both warehouse and product_category as NULL.",
    "tags": [
      "rollup",
      "e-commerce",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-124",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If order_items has 5 distinct values for \"warehouse\" and 4 distinct values for \"product_category\", what is the maximum number of rows returned by CUBE(warehouse, product_category)?",
    "sql": "SELECT warehouse, product_category, COUNT(*) FROM order_items GROUP BY CUBE(warehouse, product_category);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "e-commerce",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-125",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Logistics operational database, what result does grouping by \"origin_hub\" produce when calculating average freight_cost?",
    "sql": "SELECT origin_hub, AVG(freight_cost) AS avg_val, COUNT(*) AS total_records\nFROM freight_shipments\nGROUP BY origin_hub;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct origin_hub, with the mean freight_cost of that group",
      "A single scalar number representing the grand average across all records in freight_shipments",
      "Duplicate rows for each origin_hub without aggregating freight_cost",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY origin_hub partitions the table rows by distinct values of origin_hub and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct origin_hub.\n2. For each partition, AVG(freight_cost) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct origin_hub.",
    "tags": [
      "group-by",
      "logistics",
      "application"
    ]
  },
  {
    "id": "prac-hav-126",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Logistics system, which clause correctly filters out origin_hub groups having fewer than 50 total records?",
    "sql": "SELECT origin_hub, SUM(freight_cost) AS total_metric\nFROM freight_shipments\nGROUP BY origin_hub\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY origin_hub groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "logistics",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-127",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Logistics schema, how does ROLLUP(origin_hub, carrier) represent the subtotal row for each origin_hub across all carrier?",
    "sql": "SELECT origin_hub, carrier, SUM(freight_cost) AS total_val\nFROM freight_shipments\nGROUP BY ROLLUP(origin_hub, carrier);",
    "table": null,
    "options": [
      "The origin_hub column displays the group key, while carrier is emitted as NULL",
      "Both origin_hub and carrier are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "origin_hub is emitted as NULL while carrier displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (origin_hub) rolls up carrier.\n2. In those subtotal rows, origin_hub retains its partition value while carrier is set to NULL.\n3. The grand total row has both origin_hub and carrier as NULL.",
    "tags": [
      "rollup",
      "logistics",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-128",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If freight_shipments has 5 distinct values for \"origin_hub\" and 4 distinct values for \"carrier\", what is the maximum number of rows returned by CUBE(origin_hub, carrier)?",
    "sql": "SELECT origin_hub, carrier, COUNT(*) FROM freight_shipments GROUP BY CUBE(origin_hub, carrier);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "logistics",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-129",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Academics operational database, what result does grouping by \"faculty_dept\" produce when calculating average credits_awarded?",
    "sql": "SELECT faculty_dept, AVG(credits_awarded) AS avg_val, COUNT(*) AS total_records\nFROM course_enrollments\nGROUP BY faculty_dept;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct faculty_dept, with the mean credits_awarded of that group",
      "A single scalar number representing the grand average across all records in course_enrollments",
      "Duplicate rows for each faculty_dept without aggregating credits_awarded",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY faculty_dept partitions the table rows by distinct values of faculty_dept and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct faculty_dept.\n2. For each partition, AVG(credits_awarded) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct faculty_dept.",
    "tags": [
      "group-by",
      "academics",
      "application"
    ]
  },
  {
    "id": "prac-hav-130",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Academics system, which clause correctly filters out faculty_dept groups having fewer than 50 total records?",
    "sql": "SELECT faculty_dept, SUM(credits_awarded) AS total_metric\nFROM course_enrollments\nGROUP BY faculty_dept\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY faculty_dept groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "academics",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-131",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Academics schema, how does ROLLUP(faculty_dept, degree_level) represent the subtotal row for each faculty_dept across all degree_level?",
    "sql": "SELECT faculty_dept, degree_level, SUM(credits_awarded) AS total_val\nFROM course_enrollments\nGROUP BY ROLLUP(faculty_dept, degree_level);",
    "table": null,
    "options": [
      "The faculty_dept column displays the group key, while degree_level is emitted as NULL",
      "Both faculty_dept and degree_level are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "faculty_dept is emitted as NULL while degree_level displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (faculty_dept) rolls up degree_level.\n2. In those subtotal rows, faculty_dept retains its partition value while degree_level is set to NULL.\n3. The grand total row has both faculty_dept and degree_level as NULL.",
    "tags": [
      "rollup",
      "academics",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-132",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If course_enrollments has 5 distinct values for \"faculty_dept\" and 4 distinct values for \"degree_level\", what is the maximum number of rows returned by CUBE(faculty_dept, degree_level)?",
    "sql": "SELECT faculty_dept, degree_level, COUNT(*) FROM course_enrollments GROUP BY CUBE(faculty_dept, degree_level);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "academics",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-133",
    "topic": "GROUP BY",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Telemetry operational database, what result does grouping by \"datacenter_region\" produce when calculating average cpu_usage_hours?",
    "sql": "SELECT datacenter_region, AVG(cpu_usage_hours) AS avg_val, COUNT(*) AS total_records\nFROM server_clusters\nGROUP BY datacenter_region;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct datacenter_region, with the mean cpu_usage_hours of that group",
      "A single scalar number representing the grand average across all records in server_clusters",
      "Duplicate rows for each datacenter_region without aggregating cpu_usage_hours",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY datacenter_region partitions the table rows by distinct values of datacenter_region and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct datacenter_region.\n2. For each partition, AVG(cpu_usage_hours) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct datacenter_region.",
    "tags": [
      "group-by",
      "telemetry",
      "application"
    ]
  },
  {
    "id": "prac-hav-134",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Telemetry system, which clause correctly filters out datacenter_region groups having fewer than 50 total records?",
    "sql": "SELECT datacenter_region, SUM(cpu_usage_hours) AS total_metric\nFROM server_clusters\nGROUP BY datacenter_region\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY datacenter_region groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "telemetry",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-135",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Telemetry schema, how does ROLLUP(datacenter_region, service_tier) represent the subtotal row for each datacenter_region across all service_tier?",
    "sql": "SELECT datacenter_region, service_tier, SUM(cpu_usage_hours) AS total_val\nFROM server_clusters\nGROUP BY ROLLUP(datacenter_region, service_tier);",
    "table": null,
    "options": [
      "The datacenter_region column displays the group key, while service_tier is emitted as NULL",
      "Both datacenter_region and service_tier are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "datacenter_region is emitted as NULL while service_tier displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (datacenter_region) rolls up service_tier.\n2. In those subtotal rows, datacenter_region retains its partition value while service_tier is set to NULL.\n3. The grand total row has both datacenter_region and service_tier as NULL.",
    "tags": [
      "rollup",
      "telemetry",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-136",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If server_clusters has 5 distinct values for \"datacenter_region\" and 4 distinct values for \"service_tier\", what is the maximum number of rows returned by CUBE(datacenter_region, service_tier)?",
    "sql": "SELECT datacenter_region, service_tier, COUNT(*) FROM server_clusters GROUP BY CUBE(datacenter_region, service_tier);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "telemetry",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-gb-137",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In a Manufacturing operational database, what result does grouping by \"factory_plant\" produce when calculating average defect_count?",
    "sql": "SELECT factory_plant, AVG(defect_count) AS avg_val, COUNT(*) AS total_records\nFROM assembly_batches\nGROUP BY factory_plant;",
    "table": null,
    "options": [
      "Exactly one summary row for each distinct factory_plant, with the mean defect_count of that group",
      "A single scalar number representing the grand average across all records in assembly_batches",
      "Duplicate rows for each factory_plant without aggregating defect_count",
      "An error because AVG() cannot be combined with COUNT(*)"
    ],
    "correctAnswer": 0,
    "explanation": "GROUP BY factory_plant partitions the table rows by distinct values of factory_plant and computes the aggregate expressions AVG() and COUNT() independently over each partition.",
    "solution": "1. Rows are partitioned by distinct factory_plant.\n2. For each partition, AVG(defect_count) and COUNT(*) are calculated.\n3. Exactly one row is emitted per distinct factory_plant.",
    "tags": [
      "group-by",
      "manufacturing",
      "application"
    ]
  },
  {
    "id": "prac-hav-138",
    "topic": "HAVING",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Manufacturing system, which clause correctly filters out factory_plant groups having fewer than 50 total records?",
    "sql": "SELECT factory_plant, SUM(defect_count) AS total_metric\nFROM assembly_batches\nGROUP BY factory_plant\n-- Filter condition goes here",
    "table": null,
    "options": [
      "HAVING COUNT(*) >= 50",
      "WHERE COUNT(*) >= 50",
      "LIMIT 50",
      "QUALIFY COUNT(*) >= 50"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters post-aggregation groups based on aggregate results. WHERE cannot evaluate aggregate functions like COUNT(*).",
    "solution": "1. GROUP BY factory_plant groups candidate tuples.\n2. HAVING COUNT(*) >= 50 evaluates after groups are formed, removing groups with fewer than 50 records.\n3. WHERE would cause a syntax error if passed an aggregate function.",
    "tags": [
      "having",
      "manufacturing",
      "filtering"
    ]
  },
  {
    "id": "prac-ro-139",
    "topic": "ROLLUP",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "In the Manufacturing schema, how does ROLLUP(factory_plant, shift_code) represent the subtotal row for each factory_plant across all shift_code?",
    "sql": "SELECT factory_plant, shift_code, SUM(defect_count) AS total_val\nFROM assembly_batches\nGROUP BY ROLLUP(factory_plant, shift_code);",
    "table": null,
    "options": [
      "The factory_plant column displays the group key, while shift_code is emitted as NULL",
      "Both factory_plant and shift_code are emitted as 0",
      "A special column named IS_SUBTOTAL is automatically appended",
      "factory_plant is emitted as NULL while shift_code displays the group key"
    ],
    "correctAnswer": 0,
    "explanation": "In standard SQL ROLLUP, rolled-up columns in subtotal rows evaluate to NULL to indicate that the aggregate encompasses all values of that dimension.",
    "solution": "1. Hierarchical grouping set (factory_plant) rolls up shift_code.\n2. In those subtotal rows, factory_plant retains its partition value while shift_code is set to NULL.\n3. The grand total row has both factory_plant and shift_code as NULL.",
    "tags": [
      "rollup",
      "manufacturing",
      "subtotals"
    ]
  },
  {
    "id": "prac-cb-140",
    "topic": "CUBE",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "If assembly_batches has 5 distinct values for \"factory_plant\" and 4 distinct values for \"shift_code\", what is the maximum number of rows returned by CUBE(factory_plant, shift_code)?",
    "sql": "SELECT factory_plant, shift_code, COUNT(*) FROM assembly_batches GROUP BY CUBE(factory_plant, shift_code);",
    "table": null,
    "options": [
      "30 rows: 20 base pairs + 5 subtotal rows for dim1 + 4 subtotal rows for dim2 + 1 grand total",
      "20 rows: only the base coordinate cross-product",
      "29 rows: base pairs + dim1 subtotals + dim2 subtotals without grand total",
      "40 rows: double the base pairs"
    ],
    "correctAnswer": 0,
    "explanation": "CUBE generates: (dim1, dim2) base pairs (up to 5*4 = 20), (dim1) subtotals (5), (dim2) subtotals (4), and () grand total (1). Maximum = 20 + 5 + 4 + 1 = 30 rows.",
    "solution": "1. Grouping set (dim1, dim2): up to 5 * 4 = 20 rows.\n2. Grouping set (dim1): 5 subtotal rows.\n3. Grouping set (dim2): 4 subtotal rows.\n4. Grouping set (): 1 grand total row.\n5. Total max rows = 20 + 5 + 4 + 1 = 30.",
    "tags": [
      "cube",
      "manufacturing",
      "olap-calculation"
    ]
  },
  {
    "id": "prac-ext-141",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #1] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-142",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #2] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-143",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #3] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-144",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #4] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-145",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #5] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-146",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #6] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-147",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #7] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-148",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #8] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-149",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #9] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-150",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #10] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-151",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #11] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-152",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #12] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-153",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #13] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-154",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #14] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-155",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #15] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-156",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #16] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-157",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #17] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-158",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #18] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-159",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #19] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-160",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #20] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-161",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #21] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-162",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #22] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-163",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #23] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-164",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #24] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-165",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #25] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-166",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #26] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-167",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #27] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-168",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #28] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-169",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #29] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-170",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #30] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-171",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #31] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-172",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #32] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-173",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #33] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-174",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #34] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-175",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #35] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-176",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #36] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-177",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #37] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-178",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #38] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-179",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #39] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-180",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #40] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-181",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #41] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-182",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #42] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-183",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #43] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-184",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #44] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-185",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #45] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-186",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #46] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-187",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #47] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-188",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #48] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-189",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #49] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-190",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #50] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-191",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #51] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-192",
    "topic": "ROLLUP",
    "difficulty": "Easy",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #52] Which statement accurately describes ROLLUP operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY ROLLUP(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "rollup",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-193",
    "topic": "CUBE",
    "difficulty": "Medium",
    "type": "Numerical",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #53] Which statement accurately describes CUBE operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY CUBE(category);",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "cube",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-194",
    "topic": "Mixed",
    "difficulty": "Hard",
    "type": "Debugging",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #54] Which statement accurately describes Mixed operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "mixed",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-195",
    "topic": "GROUP BY",
    "difficulty": "Easy",
    "type": "Application",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #55] Which statement accurately describes GROUP BY operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "group-by",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-196",
    "topic": "Aggregate Functions",
    "difficulty": "Medium",
    "type": "Conceptual",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #56] Which statement accurately describes Aggregate Functions operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "aggregate-functions",
      "analytical-processing",
      "practice-lab"
    ]
  },
  {
    "id": "prac-ext-197",
    "topic": "HAVING",
    "difficulty": "Hard",
    "type": "Query Output",
    "source": "AI-Generated Practice",
    "year": null,
    "question": "[Practice Lab #57] Which statement accurately describes HAVING operational mechanics when processing analytical queries with multiple aggregate expressions?",
    "sql": "SELECT category, COUNT(*), SUM(sales), AVG(margin)\nFROM business_ledger\nGROUP BY category;",
    "table": null,
    "options": [
      "All aggregate expressions (COUNT, SUM, AVG) are evaluated concurrently over each partition defined by the grouping criteria",
      "Each aggregate function requires a separate scan of the base table, executing sequentially",
      "Only one aggregate function is legally permitted per SQL SELECT statement",
      "Aggregates can only be computed over primary key columns"
    ],
    "correctAnswer": 0,
    "explanation": "Modern relational engines compute scalar aggregate accumulators in a single pipelined pass over each grouping partition, maintaining independent internal accumulators for COUNT, SUM, and AVG.",
    "solution": "1. The storage engine scans records matching the FROM and WHERE clauses.\n2. Hash or stream partition accumulators are updated in memory for all aggregates concurrently.\n3. When partition boundaries close, final aggregate values are emitted into the output buffer.",
    "tags": [
      "having",
      "analytical-processing",
      "practice-lab"
    ]
  }
];

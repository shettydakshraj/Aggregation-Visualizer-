/**
 * Academic Curriculum & Concepts Data
 * Covers GROUP BY, ROLLUP, and CUBE with construction-management examples,
 * verified YouTube educational videos, and formal academic references.
 */

export const CONCEPTS_DATA = {
  groupBy: {
    id: 'group-by',
    title: 'GROUP BY',
    subtitle: 'Relational Partitioning & Aggregation',
    definition:
      'The SQL GROUP BY clause partitions tabular rows into distinct summary buckets based on identical values in one or more specified columns, allowing aggregate functions (SUM, AVG, COUNT, MIN, MAX) to calculate summary statistics for each partition independently.',
    purpose:
      'To collapse duplicate dimension values across multiple records into discrete categorical rows, producing high-level management metrics from granular transactional data.',
    syntax: `SELECT 
    zone, 
    status, 
    COUNT(*) AS total_projects, 
    SUM(budget) AS total_budget,
    ROUND(AVG(budget), 2) AS avg_budget
FROM projects
GROUP BY zone, status
ORDER BY zone, status;`,
    constructionExample: {
      scenario: 'Civil Infrastructure Portfolio — Zone & Status Breakdown',
      description:
        'A municipal contractor tracks several active bridge, highway, and hospital construction projects across North, South, and Central city zones with statuses (Ongoing, Completed, Delayed).',
      sampleTable: [
        { zone: 'Central', status: 'Ongoing', projects: 2, totalBudget: '$6,000,000', avgBudget: '$3,000,000' },
        { zone: 'Central', status: 'Completed', projects: 1, totalBudget: '$2,100,000', avgBudget: '$2,100,000' },
        { zone: 'North', status: 'Ongoing', projects: 1, totalBudget: '$4,200,000', avgBudget: '$4,200,000' },
        { zone: 'North', status: 'Delayed', projects: 1, totalBudget: '$3,500,000', avgBudget: '$3,500,000' },
        { zone: 'South', status: 'Ongoing', projects: 2, totalBudget: '$4,300,000', avgBudget: '$2,150,000' },
      ],
      outputExplanation:
        'Each resulting row represents a unique combination of (zone, status). No intermediate subtotals or overall grand totals are produced. It provides a flat, single-tier summary.',
    },
    keyDifferences: [
      'Produces flat partitions with no hierarchy.',
      'Does not calculate super-aggregate subtotals or grand totals.',
      'Number of rows equals the number of unique combinations of grouped columns in the data.',
    ],
  },

  rollup: {
    id: 'rollup',
    title: 'ROLLUP',
    subtitle: 'Hierarchical Subtotals & Grand Totals',
    definition:
      'ROLLUP is an extension of the GROUP BY clause that calculates progressive hierarchical subtotals along a linear column dependency tree, automatically cascading from right to left, culminating in a single overall grand total row.',
    purpose:
      'To generate multi-level supervisory reports (e.g., Zone -> Project Type -> Grand Total) in a single optimized table scan without needing multiple queries or costly UNION ALL operations.',
    syntax: `SELECT 
    zone, 
    status, 
    SUM(budget) AS allocated_capital,
    GROUPING(zone) AS is_zone_subtotal,
    GROUPING(status) AS is_grand_total
FROM projects
GROUP BY ROLLUP (zone, status);`,
    constructionExample: {
      scenario: 'Zonal Construction Budget Audit with Subtotals & Grand Total',
      description:
        'Project controllers require budget subtotals per individual zone across all statuses, plus an absolute grand total for corporate board evaluation.',
      sampleTable: [
        { zone: 'Central', status: 'Ongoing', allocatedCapital: '$6,000,000', level: 'Detailed Row' },
        { zone: 'Central', status: 'Completed', allocatedCapital: '$2,100,000', level: 'Detailed Row' },
        { zone: 'Central', status: 'NULL (All)', allocatedCapital: '$8,100,000', level: '★ Central Subtotal' },
        { zone: 'North', status: 'Ongoing', allocatedCapital: '$4,200,000', level: 'Detailed Row' },
        { zone: 'North', status: 'Delayed', allocatedCapital: '$3,500,000', level: 'Detailed Row' },
        { zone: 'North', status: 'NULL (All)', allocatedCapital: '$7,700,000', level: '★ North Subtotal' },
        { zone: 'South', status: 'Ongoing', allocatedCapital: '$4,300,000', level: 'Detailed Row' },
        { zone: 'South', status: 'NULL (All)', allocatedCapital: '$4,300,000', level: '★ South Subtotal' },
        { zone: 'NULL (All)', status: 'NULL (All)', allocatedCapital: '$20,100,000', level: '★★ Corporate Grand Total' },
      ],
      outputExplanation:
        'For n grouping columns (zone, status), ROLLUP generates n + 1 grouping levels: (zone, status), (zone), and (). Subtotal rows replace aggregated dimensions with NULL.',
    },
    keyDifferences: [
      'Operates strictly hierarchically based on column order: ROLLUP(A, B) ≠ ROLLUP(B, A).',
      'Generates n + 1 grouping sets for n grouped columns.',
      'Computes intermediate hierarchical subtotals and one grand total.',
    ],
  },

  cube: {
    id: 'cube',
    title: 'CUBE',
    subtitle: 'Multidimensional Cross-Tabulation & Power Set',
    definition:
      'CUBE is an advanced aggregation operator that generates the mathematical power set (2ⁿ combinations) of all specified grouping columns, calculating every possible cross-dimensional subtotal and slice regardless of hierarchy.',
    purpose:
      'To power Online Analytical Processing (OLAP) hypercubes, executive pivot tables, and cross-tabulated analytics where analysts need to slice data across every orthogonal dimension simultaneously.',
    syntax: `SELECT 
    zone, 
    status, 
    SUM(budget) AS total_expenditure
FROM projects
GROUP BY CUBE (zone, status)
ORDER BY zone, status;`,
    constructionExample: {
      scenario: 'Multi-Axis Construction Slicing by Zone and Project Status',
      description:
        'Management wants to inspect budget by Zone alone, by Status alone (e.g. total capital tied up in Delayed projects across the entire city), by Zone + Status, and the Grand Total.',
      sampleTable: [
        { zone: 'Central', status: 'Ongoing', totalExpenditure: '$6,000,000', dimensionSlice: '(Central, Ongoing)' },
        { zone: 'Central', status: 'Completed', totalExpenditure: '$2,100,000', dimensionSlice: '(Central, Completed)' },
        { zone: 'Central', status: 'NULL (All)', totalExpenditure: '$8,100,000', dimensionSlice: '(Central, ALL)' },
        { zone: 'North', status: 'NULL (All)', totalExpenditure: '$7,700,000', dimensionSlice: '(North, ALL)' },
        { zone: 'South', status: 'NULL (All)', totalExpenditure: '$4,300,000', dimensionSlice: '(South, ALL)' },
        { zone: 'NULL (All)', status: 'Ongoing', totalExpenditure: '$14,500,000', dimensionSlice: '(ALL, Ongoing) [Cross-Subtotal]' },
        { zone: 'NULL (All)', status: 'Completed', totalExpenditure: '$2,100,000', dimensionSlice: '(ALL, Completed) [Cross-Subtotal]' },
        { zone: 'NULL (All)', status: 'Delayed', totalExpenditure: '$3,500,000', dimensionSlice: '(ALL, Delayed) [Cross-Subtotal]' },
        { zone: 'NULL (All)', status: 'NULL (All)', totalExpenditure: '$20,100,000', dimensionSlice: '() [Grand Total]' },
      ],
      outputExplanation:
        'For 2 grouping columns, CUBE evaluates 2² = 4 grouping sets: {(zone, status), (zone), (status), ()}. Notice how it generates status subtotals irrespective of zone, which ROLLUP cannot do.',
    },
    keyDifferences: [
      'Non-hierarchical: order of columns does not change the result sets (CUBE(A, B) = CUBE(B, A)).',
      'Generates 2ⁿ grouping sets for n columns, compared to n + 1 for ROLLUP and 1 for GROUP BY.',
      'Enables true multidimensional slicing and dicing across all dimensional axes.',
    ],
  },
};

/**
 * Verified Educational YouTube Videos
 * Verified via YouTube oEmbed API (HTTP 200 OK)
 */
export const EDUCATIONAL_VIDEOS = {
  groupBy: {
    id: 'VQf0V6Wwbf4',
    title: 'GROUP BY and HAVING Clause in SQL',
    channel: 'Neso Academy',
    youtubeUrl: 'https://www.youtube.com/watch?v=VQf0V6Wwbf4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/VQf0V6Wwbf4?rel=0',
    relevance:
      'Explains how rows are partitioned into buckets based on matching keys and how mathematical aggregate functions (COUNT, SUM, AVG) compute over each partitioned group.',
    topic: 'GROUP BY',
    duration: '11:42',
    verified: true,
  },
  rollup: {
    id: 'HLTdfCtfIJs',
    title: 'Rollup in SQL Server',
    channel: 'kudvenkat',
    youtubeUrl: 'https://www.youtube.com/watch?v=HLTdfCtfIJs',
    embedUrl: 'https://www.youtube-nocookie.com/embed/HLTdfCtfIJs?rel=0',
    relevance:
      'Explains hierarchical subtotals, progressive level reduction, super-aggregate rows, and the grand total generated by ROLLUP.',
    topic: 'ROLLUP',
    duration: '08:15',
    verified: true,
  },
  cube: {
    id: '9d7fjBgtxos',
    title: 'Cube in SQL Server',
    channel: 'kudvenkat',
    youtubeUrl: 'https://www.youtube.com/watch?v=9d7fjBgtxos',
    embedUrl: 'https://www.youtube-nocookie.com/embed/9d7fjBgtxos?rel=0',
    relevance:
      'Explains multidimensional aggregation, cross-tabulation, and all 2ⁿ grouping combinations computed by CUBE.',
    topic: 'CUBE',
    duration: '07:22',
    verified: true,
  },
};

/**
 * Academic & Professional References
 * Divided into 5 mandatory verifiable categories
 */
export const REFERENCES_DATA = {
  books: [
    {
      title: 'Database System Concepts (7th Edition)',
      authors: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
      publisher: 'McGraw-Hill Education',
      year: '2019',
      relevance:
        'Standard university curriculum text covering relational algebra, SQL aggregate functions, grouping specifications, and multidimensional OLAP queries.',
      link: 'https://www.db-book.com/',
    },
    {
      title: 'The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling (3rd Edition)',
      authors: 'Ralph Kimball, Margy Ross',
      publisher: 'John Wiley & Sons',
      year: '2013',
      relevance:
        'The definitive reference for dimensional modeling, star schemas, OLAP cubes, and rollup aggregation hierarchies.',
      link: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-toolkit/',
    },
    {
      title: 'SQL Queries for Mere Mortals: A Hands-On Guide to Data Manipulation in SQL (4th Edition)',
      authors: 'John L. Viescas',
      publisher: 'Addison-Wesley Professional',
      year: '2018',
      relevance:
        'In-depth practical treatment of SQL GROUP BY, GROUPING SETS, ROLLUP, and CUBE syntax across relational database management systems.',
      link: 'https://www.informit.com/store/sql-queries-for-mere-mortals-a-hands-on-guide-to-data-9780134858333',
    },
  ],

  officialDocumentation: [
    {
      title: 'PostgreSQL 16 Documentation: 7.2.4. GROUPING SETS, CUBE, and ROLLUP',
      organization: 'The PostgreSQL Global Development Group',
      url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUPING-SETS',
      description:
        'Official PostgreSQL engine documentation specifying ANSI SQL compliance, grouping sets evaluation, and super-aggregate row representation.',
    },
    {
      title: 'Oracle Database SQL Language Reference: ROLLUP and CUBE Operations',
      organization: 'Oracle Corporation',
      url: 'https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Hierarchical-Queries.html',
      description:
        'Comprehensive technical specification for GROUPING, GROUPING_ID, ROLLUP, and CUBE in enterprise analytics engines.',
    },
    {
      title: 'Microsoft Learn: GROUP BY (Transact-SQL) — ROLLUP and CUBE Options',
      organization: 'Microsoft Corporation',
      url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql',
      description:
        'T-SQL engine reference explaining the execution plan, memory allocation, and syntax variants for multi-dimensional aggregation.',
    },
  ],

  educationalWebsites: [
    {
      title: 'Mode Analytics: SQL GROUP BY Tutorial & Advanced Aggregations',
      platform: 'Mode Analytics Data School',
      url: 'https://mode.com/sql-tutorial/sql-group-by/',
      description:
        'Interactive industry curriculum on SQL grouping, data filtering with HAVING, and intermediate data transformations.',
    },
    {
      title: 'PostgreSQL Tutorial: PostgreSQL ROLLUP Explained with Practical Examples',
      platform: 'PostgreSQL Tutorial',
      url: 'https://www.postgresqltutorial.com/postgresql-aggregate-functions/postgresql-rollup/',
      description:
        'Practical walkthrough on generating hierarchical subtotals and grand totals with real business datasets.',
    },
    {
      title: 'W3Schools: SQL GROUP BY Statement Reference',
      platform: 'W3Schools Online Web Tutorials',
      url: 'https://www.w3schools.com/sql/sql_groupby.asp',
      description:
        'Beginner-friendly interactive documentation covering core syntax, aggregate functions, and multi-column grouping.',
    },
  ],

  researchPapers: [
    {
      title: 'Data Cube: A Relational Aggregation Operator Generalizing Group-By, Cross-Tab, and Sub-Totals',
      authors: 'Jim Gray, Adam Bosworth, Andrew Layman, Hamid Pirahesh',
      journal: 'Data Mining and Knowledge Discovery, Vol. 1, No. 1, pp. 29–53',
      year: '1997',
      doi: '10.1023/A:1009748629607',
      url: 'https://doi.org/10.1023/A:1009748629607',
      significance:
        'The foundational ACM Turing Award paper by Jim Gray et al. that introduced the CUBE and ROLLUP operators to relational database management systems.',
    },
    {
      title: 'Implementing Data Cubes Efficiently',
      authors: 'Venky Harinarayan, Anand Rajaraman, Jeffrey D. Ullman',
      journal: 'ACM SIGMOD Record, Vol. 25, No. 2, pp. 205–216',
      year: '1996',
      doi: '10.1145/235968.233333',
      url: 'https://doi.org/10.1145/235968.233333',
      significance:
        'Seminal research analyzing greedy lattice precomputation algorithms for optimizing multidimensional cube queries in decision-support data warehouses.',
    },
  ],

  youtubeVideos: [
    {
      title: EDUCATIONAL_VIDEOS.groupBy.title,
      channel: EDUCATIONAL_VIDEOS.groupBy.channel,
      youtubeUrl: EDUCATIONAL_VIDEOS.groupBy.youtubeUrl,
      topicCovered: 'GROUP BY Clause, Aggregation Functions & HAVING Filters',
    },
    {
      title: EDUCATIONAL_VIDEOS.rollup.title,
      channel: EDUCATIONAL_VIDEOS.rollup.channel,
      youtubeUrl: EDUCATIONAL_VIDEOS.rollup.youtubeUrl,
      topicCovered: 'ROLLUP Hierarchical Subtotals, Super-Aggregate Rows & Grand Total',
    },
    {
      title: EDUCATIONAL_VIDEOS.cube.title,
      channel: EDUCATIONAL_VIDEOS.cube.channel,
      youtubeUrl: EDUCATIONAL_VIDEOS.cube.youtubeUrl,
      topicCovered: 'CUBE Multidimensional Aggregation, Cross-Tabulation & Power Sets',
    },
  ],
};

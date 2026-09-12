/**
 * Help User Manual Data
 * Covers all 9 required academic onboarding steps in beginner-friendly,
 * actionable explanations with interactive details.
 */

export const HELP_STEPS = [
  {
    step: 1,
    id: 'overview',
    title: 'What the Website Does',
    badge: 'Foundation',
    summary:
      'The DBMS Aggregation Visualizer is an interactive educational platform designed to make advanced SQL aggregation operators intuitive through 3D spatial models, interactive query playgrounds, and step-by-step visual breakdowns.',
    details: [
      'Visualizes how the database engine transforms raw multi-row datasets into grouped summary statistics.',
      'Bridges the gap between abstract SQL syntax (GROUP BY, ROLLUP, CUBE) and physical geometric partitions (1D buckets, 2D hierarchical trees, and 3D OLAP hypercubes).',
      'Provides a live in-browser SQL playground powered by real in-memory query evaluation so you can test queries without installing a database server.',
    ],
    tip: 'Start by exploring the visual pages in sequence: GROUP BY -> ROLLUP -> CUBE -> Playground.',
  },
  {
    step: 2,
    id: 'navigation',
    title: 'How to Navigate Between Topics',
    badge: 'Routing',
    summary:
      'Seamlessly traverse through conceptual chapters and interactive tools using top navigation links, chapter breadcrumbs, and sequential next-step cards.',
    details: [
      'Top Navigation Bar: Click GROUP BY, ROLLUP, or CUBE to jump directly to dedicated topic visualizers.',
      'Learn Section: Visit the Learn tab for a unified academic curriculum, verified video masterclasses, and literature citations.',
      'Playground: Jump to the Playground tab to write custom SQL queries and test real datasets.',
      'Next Topic Footers: At the bottom of each topic page, click the "Next Chapter" card to advance naturally through the learning curriculum.',
    ],
    tip: 'Clicking the "SQL ∇" logo at the top left returns you to the home cinematic showcase at any time.',
  },
  {
    step: 3,
    id: 'available-inputs',
    title: 'What Inputs Are Available',
    badge: 'Data & Queries',
    summary:
      'The platform provides a construction-management database sandbox comprising three relational tables, along with multiple pre-built query templates and custom query inputs.',
    details: [
      'Projects Table: Tracks infrastructure jobs (id, name, city, zone, budget, status, manager).',
      'Materials Table: Tracks physical building inventories (id, project_id, item, category, quantity, unit_cost, total_cost).',
      'Workforce Table: Tracks labor site deployments (id, project_id, role, headcount, daily_wage, shift).',
      'Query Templates: Ready-to-run queries demonstrating 1-column grouping, 2-column hierarchical rollups, multi-dimensional cube slices, and cost audits.',
      'Custom SQL Input: A live code editor where you can write custom SELECT statements with aggregate functions (SUM, AVG, COUNT, MIN, MAX).',
    ],
    tip: 'Use the schema viewer on the right side of the Playground to inspect column types and sample rows before writing queries.',
  },
  {
    step: 4,
    id: 'providing-inputs',
    title: 'How to Provide Inputs',
    badge: 'Editor',
    summary:
      'Providing inputs is intuitive: you can either click ready-made template chips or type directly into the interactive code editor.',
    details: [
      'Method A — Pre-Configured Templates: In the Playground or topic pages, click any template pill (e.g., "Zonal Budget Subtotals"). The SQL editor and data views will immediately update.',
      'Method B — Direct SQL Editing: Click inside the dark-mode code editor. You can type or paste standard SQL queries.',
      'Supported SQL Syntax: SELECT, FROM, WHERE, GROUP BY, ROLLUP, CUBE, HAVING, ORDER BY.',
      'Syntax Assistance: The editor highlights keywords, functions, strings, and operators to prevent typos.',
    ],
    tip: 'Pressing Ctrl + Enter (or Cmd + Enter on Mac) inside the editor runs the query instantly without clicking the button.',
  },
  {
    step: 5,
    id: 'controls-and-buttons',
    title: 'What Each Button and Control Does',
    badge: 'UI Controls',
    summary:
      'Every button has a dedicated purpose with visual feedback and accessible shortcuts.',
    details: [
      '▶ Run Query (or Execute): Compiles and runs the current SQL query against the in-memory engine, recalculating rows and latency.',
      '↺ Reset Query: Restores the query editor back to the default template state if you make an error.',
      '⎘ Copy SQL: Copies the current query code directly to your operating system clipboard.',
      'View Mode Toggles (3D / Table / Lattice): Switches the visualizer between spatial 3D block view and flat relational grid.',
      'Download Button: Opens the academic report generator to export your work as PDF, DOC, or TXT.',
      'Day/Night Mode Toggle (Sun/Moon): Instantly switches between daylight light-mode and cinematic dark-mode.',
    ],
    tip: 'In 3D viewports, click and drag with your mouse to rotate the camera; use the scroll wheel to zoom in and out.',
  },
  {
    step: 6,
    id: 'sql-processing',
    title: 'How SQL Processing Takes Place',
    badge: 'Engine Internals',
    summary:
      'Understanding what happens behind the scenes when you click Run Query.',
    details: [
      'Step 1 — Lexical Analysis & Tokenization: The engine parses your query string into SQL tokens and detects grouping columns.',
      'Step 2 — Partitioning: Rows are indexed into in-memory hash buckets according to distinct values in the GROUP BY columns.',
      'Step 3 — Mathematical Accumulation: Aggregate functions (SUM, COUNT, etc.) compute values for each distinct bucket.',
      'Step 4 — Hierarchical Subtotal Pass (ROLLUP): For ROLLUP queries, the engine performs additional grouping passes, replacing right-to-left columns with NULL to calculate subtotal rows.',
      'Step 5 — Power Set Generation (CUBE): For CUBE queries, 2ⁿ grouping sets are calculated representing all cross-dimensional combinations.',
      'Step 6 — Result Compilation & Metrics: Results are sorted, the execution latency timer is recorded, and the UI tables and 3D visualizers update synchronously.',
    ],
    tip: 'Notice how the latency badge displays query execution time in milliseconds (typically 1 to 5 ms).',
  },
  {
    step: 7,
    id: 'interpreting-output',
    title: 'How to Interpret the Output',
    badge: 'Data Analysis',
    summary:
      'Reading and understanding the generated result tables, NULL values, and visual indicators.',
    details: [
      'Standard Rows: Regular grouped rows show values in all grouping columns with the computed metrics.',
      'NULL in Super-Aggregate Rows: When viewing ROLLUP or CUBE results, a NULL in a grouping column does NOT mean missing data; it indicates a subtotal across all values of that column.',
      'Grand Total Row: A row where all grouping dimensions show NULL represents the grand total across the entire dataset.',
      'Insight Badges: The system flags whether rows are base combinations, intermediate subtotals, or grand totals.',
      'Row Count & Latency: The header bar displays the exact number of rows returned and the engine elapsed time in milliseconds.',
    ],
    tip: 'Look for the distinct row styling — super-aggregate and grand total rows are highlighted with accent borders.',
  },
  {
    step: 8,
    id: 'download-feature',
    title: 'How to Use the Download Feature',
    badge: 'Exporting',
    summary:
      'Export comprehensive academic reports containing your inputs, processing steps, intermediate results, and final output in PDF, Document, or Text format.',
    details: [
      'Accessing Download: Click the "Download" button in the top navigation bar or the "Export Report" button on the Playground page.',
      'Report Content: Every report includes (1) Project & User Inputs, (2) SQL Engine Processing Steps, (3) Intermediate Grouping Sets, (4) Formatted Result Tables, and (5) ASCII / SVG Aggregation Figures.',
      'Option 1 — PDF: Opens a print-optimized clean academic report ready to save as PDF or print directly.',
      'Option 2 — Document (.doc): Downloads an editable document compatible with Microsoft Word and Google Docs.',
      'Option 3 — Text (.txt): Downloads a clean monospaced plain-text report with ASCII tables for code repositories or terminal review.',
    ],
    tip: 'Run your query first in the Playground to include your custom query and live results directly inside the downloaded report.',
  },
  {
    step: 9,
    id: 'theme-toggle',
    title: 'How to Switch Between Day and Night Modes',
    badge: 'Accessibility',
    summary:
      'Easily adapt the visual interface to match your lighting conditions, presentation screens, or personal preference.',
    details: [
      'Locate the Toggle: Find the Sun/Moon icon on the right side of the top navigation bar.',
      'Click to Toggle: Clicking the icon instantly switches between Day Mode (clean, high-contrast light theme) and Night Mode (cinematic dark theme).',
      'Memory Persistence: Your theme choice is automatically saved to your browser local storage and remembered across page reloads.',
      'Contrast Audit: All tables, code blocks, 3D visualizers, and text typography are calibrated to maintain strict WCAG AAA readability in both modes.',
    ],
    tip: 'For classroom projector presentations, Day Mode is often preferred for high-ambient-light readability.',
  },
];

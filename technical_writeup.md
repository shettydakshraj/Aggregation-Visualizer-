# DBMS Aggregation Visualizer — Complete Technical Write-Up

> A clear, chronological, beginner-friendly explanation of every file, page, and feature
> in the project. Written so that someone new to React can follow along.

---

## 1. Project Overview

### What the website does

The **DBMS Aggregation Visualizer** is an **interactive educational website** built for a Database Management Systems (DBMS) course at Vellore Institute of Technology (VIT). Its purpose is to teach students three related SQL concepts through visual demonstrations, live in-browser query execution, and downloadable academic reports:

| SQL Operator | What It Does |
|---|---|
| `GROUP BY` | Groups rows with the same value in a column and lets you aggregate them (count, sum, average) |
| `GROUP BY … WITH ROLLUP` | Same as GROUP BY, but also adds **subtotal rows** (one per unique group value) and a **grand total row** |
| `GROUP BY … WITH CUBE` | Like ROLLUP but generates **every possible combination** of grouping: `2^n` grouping sets for `n` columns |

The project uses a **civil construction dataset** (infrastructure projects, materials, costs, locations) as the running example throughout all pages.

### Tech Stack (in plain English)

| Layer | Technology | Role |
|---|---|---|
| Language | JavaScript (JSX) | All application logic |
| Framework | React 19 + Vite | Component-based UI with hot-reload dev server |
| Routing | React Router v6 | Maps URL paths to page components |
| SQL Engine | **AlaSQL** (npm) | Runs SQL queries entirely in the browser — no backend needed |
| Styling | CSS Modules | Scoped per-component styles |
| Build tool | Vite | Bundles and serves the app |

The website has **no server** and **no database on a server**. All SQL runs in the user's browser using AlaSQL, and all data is defined in JavaScript arrays inside the source files.

---

## 2. File and Folder Structure

```
frontend/
└── src/
    ├── main.jsx                    ← App entry point (mounts React into index.html)
    ├── App.jsx                     ← Top-level router, Navbar, animated page transitions
    │
    ├── pages/                      ← One file per URL route
    │   ├── LandingPage.jsx         ← Home page (/)
    │   ├── GroupByPage.jsx         ← /group-by
    │   ├── RollupPage.jsx          ← /rollup
    │   ├── CubePage.jsx            ← /cube
    │   ├── PlaygroundPage.jsx      ← /playground
    │   ├── LearnPage.jsx           ← /learn
    │   ├── HelpPage.jsx            ← /help
    │   ├── DevelopedByPage.jsx     ← /developed-by
    │   ├── DownloadPage.jsx        ← /download
    │   └── NotFoundPage.jsx        ← /* (any unmatched URL)
    │
    ├── components/                 ← Reusable building blocks, grouped by feature
    │   ├── layout/
    │   │   ├── Navbar.jsx          ← Fixed top navigation bar (all pages)
    │   │   ├── SiteFooter.jsx      ← Footer (all pages)
    │   │   └── PageTransition.jsx  ← Animated fade between pages
    │   ├── landing/
    │   │   ├── Hero.jsx            ← Large animated hero section on home page
    │   │   └── LearningChain.jsx   ← Cards linking to GROUP BY, ROLLUP, CUBE
    │   ├── groupby/
    │   │   ├── GroupByHero.jsx     ← Hero banner for /group-by
    │   │   ├── ConceptExplanation.jsx
    │   │   ├── YouTubeLesson.jsx   ← Embedded YouTube video
    │   │   ├── GroupBy3DVisualizer.jsx ← Animated partition visualization
    │   │   ├── SqlPlayground.jsx   ← Live SQL editor + editable data table (GROUP BY)
    │   │   └── GroupBySummary.jsx  ← Summary + navigation to next topic
    │   ├── rollup/
    │   │   ├── RollupPlayground.jsx ← Live SQL editor + editable data table (ROLLUP)
    │   │   └── ...
    │   ├── cube/
    │   │   ├── CubePlayground.jsx  ← Live SQL editor + editable data table (CUBE)
    │   │   └── ...
    │   ├── playground/
    │   │   ├── PlaygroundEditor.jsx ← Multi-template SQL editor
    │   │   ├── SchemaViewer.jsx    ← Displays the 3-table schema
    │   │   ├── ResultGrid.jsx      ← Shows query results
    │   │   ├── PlaygroundInsights.jsx
    │   │   └── playgroundData.js   ← 3-table dataset + query templates
    │   ├── learn/
    │   │   ├── ConceptCard.jsx
    │   │   ├── VideoEmbed.jsx
    │   │   └── ReferencesList.jsx
    │   └── download/
    │       └── DownloadModal.jsx   ← Quick export popup (lightning button in navbar)
    │
    ├── data/                       ← Static data files
    │   ├── teamData.js             ← Faculty advisor + student team info + photo imports
    │   ├── learnData.js            ← Concept definitions + video URLs + references
    │   └── helpManualData.js       ← 9-step user manual entries
    │
    └── services/
        └── reportGenerator.js      ← Generates PDF, .doc, and .txt report files
```

---

## 3. How the App Starts (Entry Point)

### `main.jsx`

```jsx
// Mounts the React app into the <div id="root"> in index.html
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

This is the very first file that runs. It takes the `App` component and puts it into the HTML page.

### `App.jsx` — Routing

```jsx
<BrowserRouter>
  <Navbar />         {/* Always visible at the top */}
  <AnimatedRoutes /> {/* Swaps between pages based on the URL */}
</BrowserRouter>
```

`App.jsx` does two things:
1. Renders the **Navbar** permanently at the top of every page.
2. Renders the correct **page component** based on the current URL path.

The route table:

| URL Path | Component Rendered |
|---|---|
| `/` | `LandingPage` |
| `/group-by` | `GroupByPage` |
| `/rollup` | `RollupPage` |
| `/cube` | `CubePage` |
| `/playground` | `PlaygroundPage` |
| `/learn` | `LearnPage` |
| `/help` | `HelpPage` |
| `/developed-by` | `DevelopedByPage` |
| `/download` | `DownloadPage` |
| anything else | `NotFoundPage` |

Every time the user clicks a link, React Router updates the URL and swaps the page component. `PageTransition` wraps the swap in a CSS animation so it feels smooth.

---

## 4. The Navbar (`Navbar.jsx`)

The Navbar is a **fixed header** that stays at the top while you scroll. It contains:

- **Logo** (`SQL∇`) — links back to the home page `/`
- **Navigation links** — GROUP BY, ROLLUP, CUBE, Playground, Learn, Help, Developed By
- **Download button** — a rectangular button linking to `/download`
- **Quick Export button (⚡)** — opens a popup modal to instantly download a report without visiting the Download page
- **Day/Night toggle** — switches between dark and light themes

**How the theme toggle works:**
```js
// The current theme is stored in localStorage so it persists on page refresh
localStorage.getItem('sql_visualizer_theme') || 'dark'

// When toggled, it writes a data-theme attribute onto the <html> element
document.documentElement.setAttribute('data-theme', theme);
```
All CSS color variables read from `data-theme="dark"` or `data-theme="light"` to switch the entire color scheme instantly.

**On mobile:** a hamburger icon appears, and clicking it opens a sliding drawer with all the links.

---

## 5. The Home Page (`LandingPage.jsx` → `/`)

The home page renders two components:

1. **`Hero`** — A large full-screen animated introduction with the site's title and a call-to-action button.
2. **`LearningChain`** — Cards linking to the three topic pages: GROUP BY → ROLLUP → CUBE, showing the intended learning progression.

---

## 6. The GROUP BY Page (`GroupByPage.jsx` → `/group-by`)

Six sections in vertical order:

```
1. GroupByHero           → Full-width banner
2. ConceptExplanation    → Text: what GROUP BY is, syntax, rules
3. YouTubeLesson         → Embedded YouTube educational video
4. GroupBy3DVisualizer   → Animated 3D-style visual showing data partitioned into buckets
5. SqlPlayground         → Live in-browser SQL editor (the main interactive feature)
6. GroupBySummary        → Key takeaways + "Next: ROLLUP" button
```

### How `SqlPlayground.jsx` works (GROUP BY)

**Step 1 — Initial Data**
The component defines 8 rows of construction data as a JavaScript array (`DEFAULT_DATA`), stored in React state called `data`.

**Step 2 — SQL Query Builder (Visual Mode)**
Three dropdowns let the user choose: GROUP BY column, aggregate function, aggregate column.

A `useEffect` hook auto-generates the SQL string whenever a dropdown changes:
```sql
SELECT location, COUNT(*) AS total_projects, SUM(cost) AS sum_cost
FROM ?
GROUP BY location
ORDER BY location ASC
```
The `?` is AlaSQL's placeholder for a JavaScript array passed at runtime.

**Step 3 — Manual SQL Mode**
Typing directly in the textarea switches mode to `manual` — dropdowns stop auto-generating and the user has full SQL control.

**Step 4 — Execution**
```js
const res = alasql(sqlQuery, [data]);
// data = 8-row JS array, res = aggregated result rows
```
AlaSQL runs entirely in the browser and returns result objects.

**Step 5 — Display**
Results are stored in `queryResult` state and rendered as a table.

**Step 6 — Execution Trace**
Bullet points below the table explain what the engine did (generated by `generateExplanation()`).

**Step 7 — Editable Source Data (Data Tab)**
The "Source Data" tab shows the 8 rows as editable inputs. Three handlers manage edits:
- `handleCellEdit(rowId, colName, value)` — updates a single cell
- `handleAddRow()` — appends a new blank row  
- `handleDeleteRow(id)` — removes a row by ID

Because `data` is React state, any change immediately triggers the `useEffect` that re-runs the query. **The result table updates automatically as you edit data.**

---

## 7. The ROLLUP Page (`RollupPage.jsx` → `/rollup`)

Identical structure to GroupByPage. Six sections ending with `RollupPlayground`.

### How `RollupPlayground.jsx` works

Very similar to SqlPlayground, with one key difference: **ROLLUP produces extra rows** (subtotals + grand total) that need visual distinction.

**ROLLUP simulation fallback:**
AlaSQL sometimes fails to parse `WITH ROLLUP`. When that happens, `runRollupSimulation()` takes over:
1. Iterates all rows, building: detail pairs, subtotals per `col1`, running grand total
2. Outputs rows in order: detail → subtotals → grand total

**Row classification:**
```js
const getRowType = (row) => {
  if (col1 == null && col2 == null) return 'grand';
  if (col1 != null && col2 == null) return 'subtotal';
  return 'detail';
}
```
CSS Module classes color each row type differently (`rowGrand`, `rowSubtotal`, `rowDetail`).

**Editable data tab** — same edit/add/delete pattern. ROLLUP re-executes automatically when data changes.

---

## 8. The CUBE Page (`CubePage.jsx` → `/cube`)

Same structure as ROLLUP but demonstrates `GROUP BY CUBE`.

| | GROUP BY ROLLUP(a, b) | GROUP BY CUBE(a, b) |
|---|---|---|
| Grouping sets | (a,b), (a), () | (a,b), (a,NULL), (NULL,b), (NULL,NULL) |
| Extra rows | a-subtotals + Grand | a-subtotals + b-subtotals + Grand |
| Total sets | n+1 | 2^n |

### How `CubePlayground.jsx` works

`runCubeSimulation()` builds four maps:
1. `detailMap` — all (col1, col2) pairs
2. `c1SubMap` — subtotals by col1 only (col2 = NULL)
3. `c2SubMap` — subtotals by col2 only (col1 = NULL) ← **CUBE-exclusive**
4. Grand total (both NULL)

The ★ symbol marks CUBE-exclusive cross-subtotals in the legend and row badges.

**Editable data tab** — same pattern. Previously broken (`const [data] = useState(...)` prevented editing — now fixed with `const [data, setData] = useState(...)`).

---

## 9. The Playground Page (`PlaygroundPage.jsx` → `/playground`)

The **advanced free-form SQL lab** using a 3-table relational schema:

| Table | Columns | Description |
|---|---|---|
| `projects` | id, name, city, zone, budget, status, manager | Infrastructure project records |
| `materials` | id, project_id, item, category, quantity, unit_cost, total_cost | Material items per project |
| `workforce` | id, project_id, role, headcount, daily_wage, shift | Worker roles per project |

**Data flow:**

**Step 1 — `initDb()` — AlaSQL named database setup**
```js
alasql('CREATE DATABASE labdb;');
alasql('USE labdb;');
alasql('CREATE TABLE projects (...);');
alasql('SELECT * INTO projects FROM ?', [INITIAL_PROJECTS]);
// ... same for materials and workforce
```
Re-initialized every query run to ensure clean state.

**Step 2 — Template Selection**
`PlaygroundHero` shows preset query buttons (e.g., "GROUP BY Zone", "ROLLUP by Status"). Clicking a template sets the query and immediately runs it.

**Step 3 — Execution with fallback**
```js
try {
  res = alasql(cleanedSql);
} catch {
  // Translate ANSI ROLLUP(a,b) → a, b WITH ROLLUP for AlaSQL
  adaptedSql = sql.replace(/GROUP BY ROLLUP\(([^)]+)\)/, 'GROUP BY $1 WITH ROLLUP');
  res = alasql(adaptedSql);
}
```

**Step 4 — Results + Insights + Schema Viewer**
`ResultGrid`, `PlaygroundInsights`, and `SchemaViewer` all render from the shared state.

---

## 10. The Learn Page (`LearnPage.jsx` → `/learn`)

A structured **curriculum page** with four sections:
- **01 · GROUP BY** — Concept card + YouTube video
- **02 · ROLLUP** — Concept card + YouTube video
- **03 · CUBE** — Concept card + YouTube video
- **04 · References** — Academic references list

All content comes from `learnData.js`. Quick-nav pills use `scrollIntoView({ behavior: 'smooth' })`.

---

## 11. The Help Page (`HelpPage.jsx` → `/help`)

A **user manual** with 9 numbered steps. Two-column layout:
- **Left:** sticky table of contents with clickable step buttons
- **Right:** scrollable step cards

**Live search:**
```js
const filteredSteps = HELP_STEPS.filter(step =>
  step.title.includes(q) || step.summary.includes(q) ||
  step.details.some(d => d.includes(q))
);
```
All content from `helpManualData.js`.

---

## 12. The Developed By Page (`DevelopedByPage.jsx` → `/developed-by`)

Shows the project team. Two sections:

**Faculty Guide Card** — Photo, name, designation, department, institution from `GUIDE_INFO` in `teamData.js`.

**Student Team Grid** — Three circular profile cards from `TEAM_MEMBERS` in `teamData.js`, showing photo, name, and registration number. If a photo is missing, monogram initials are shown instead.

---

## 13. The Download Page (`DownloadPage.jsx` → `/download`)

Generates an academic report in three formats: **PDF**, **Word (.doc)**, and **Plain Text (.txt)**.

**Page layout:**
1. **Hero** — Download PDF / Doc / Text buttons
2. **Template Selector** — GROUP BY, ROLLUP, CUBE preset switchers
3. **Interactive Preview** — Live-updating report showing title, metadata, sections

Report title is **"Learn SQL Aggregation"** throughout all formats. The faculty advisor's name does **not** appear in any generated report (it remains only on the Developed By page).

**Preset switching:**
```js
const base = getDefaultReportData();
if (type === 'groupby') { /* mutate base for GROUP BY */ }
else if (type === 'cube') { /* mutate base for CUBE */ }
setReportData(base); // → preview re-renders instantly
```

---

## 14. Report Generation (`reportGenerator.js`)

A pure JavaScript service file with three export functions.

### `downloadTextFile(data)` → `.txt`
Builds a plain-text string and triggers a browser download via `Blob + URL.createObjectURL`.

### `downloadDocFile(data)` → `.doc`
Builds an HTML string with inline CSS and downloads it with MIME type `application/msword`. Word recognizes and opens it as a document.

### `openPdfPrintReport(data)` → PDF via browser print
Opens a new tab with a styled printable HTML page:
```js
const win = window.open('', '_blank');
win.document.write(`...styled HTML...`);
win.document.write(`<script>window.onload = () => window.print();</script>`);
```
The user saves via their browser's "Print → Save as PDF" feature.

**Safe currency formatting (no NaN/undefined in output):**
```js
function fmtCurrency(val) {
  const n = Number(val);
  if (!isFinite(n)) return '₹0';
  return `₹${n.toLocaleString('en-IN')}`;
}
```

---

## 15. Data Files

### `teamData.js`
- `GUIDE_INFO` — Faculty advisor photo and details
- `TEAM_MEMBERS` — 3 student objects (name, register number, photo)
- `ACADEMIC_METADATA` — Course name, institution, year

### `learnData.js`
- `CONCEPTS_DATA` — Three objects (groupBy, rollup, cube) with: definition, syntax, key points, SQL example
- `EDUCATIONAL_VIDEOS` — YouTube video IDs and titles per topic
- `REFERENCES_DATA` — Academic references with author, title, year, URL

### `helpManualData.js`
- `HELP_STEPS` — 9 step objects, each with: step number, title, summary, bullet details, Pro Tip

### `playgroundData.js` (inside `components/playground/`)
- `INITIAL_PROJECTS / MATERIALS / WORKFORCE` — Static arrays for the 3-table Playground DB
- `SCHEMA_DEFINITIONS` — Column metadata (used by SchemaViewer)
- `QUERY_TEMPLATES` — Preset SQL queries the Playground preloads

---

## 16. Key Patterns and Mechanisms

### Pattern 1 — Reactive SQL Execution

All three playground components share the same pattern:
```js
// Builder dropdowns change → update SQL string
useEffect(() => {
  setSqlQuery(buildQuery(col1, col2, aggFunc));
}, [col1, col2, aggFunc, editorMode]);

// Data or SQL changes → auto-execute query
useEffect(() => {
  if (sqlQuery) executeQuery(sqlQuery);
}, [data, sqlQuery]);
```
This creates a **reactive pipeline**: change a dropdown or edit a data cell → SQL updates → query re-executes → results update. No manual refresh required.

### Pattern 2 — AlaSQL with `?` placeholder

```js
alasql('SELECT ... FROM ? GROUP BY ...', [data]);
```
The `?` is replaced by the JavaScript array at runtime. The data never needs to be stored in a proper DB.

### Pattern 3 — CSS Modules

Every component has a `.module.css` paired file. Class names are automatically scoped to that component so they never clash globally.

### Pattern 4 — Theme System

```css
[data-theme="dark"]  { --bg-primary: #0A0F1A; --text-primary: #F1F5F9; }
[data-theme="light"] { --bg-primary: #FFFFFF;  --text-primary: #1E293B; }
```
Navbar writes `data-theme` to `<html>`. Every component adapts automatically via CSS variables.

---

## 17. Feature Status

| Feature | Status |
|---|---|
| GROUP BY playground (edit/add/delete rows, live query) | Working |
| ROLLUP playground (edit/add/delete rows, subtotals highlighted) | Working |
| CUBE playground (edit/add/delete rows, cross-subtotals highlighted) | Working |
| Advanced Playground (3-table DB, template queries, JOIN support) | Working |
| Learn page (concept cards, YouTube embeds, references) | Working |
| Help page (9-step manual, live search filter) | Working |
| Developed By page (faculty card + 3 student cards with photos) | Working |
| Download page (PDF, Word, Text report generation) | Working |
| Day/Night theme toggle (persists via localStorage) | Working |
| Mobile responsive nav with hamburger drawer | Working |

**Limitations:**
- ROLLUP/CUBE AlaSQL parsing falls back to JavaScript simulation — works transparently.
- PDF uses browser print dialog, not a library. User must select "Save as PDF" manually.
- Data edits reset on page refresh (no localStorage or backend persistence).

---

## 18. Full Data-Flow Diagram

```
User opens browser
        │
        ▼
  Vite dev server serves index.html
        │
        ▼
  React mounts App.jsx
  ├── Navbar rendered (always visible)
  └── URL determines page:
        │
        ├─── / → LandingPage → Hero + LearningChain cards
        │
        ├─── /group-by → GroupByPage
        │         └── SqlPlayground
        │               ├── data[] (8-row JS array)
        │               ├── builder dropdowns → sqlQuery string
        │               ├── user edits data → triggers useEffect
        │               ├── alasql(query, [data]) → results[]
        │               └── results[] rendered as table
        │
        ├─── /rollup → RollupPage
        │         └── RollupPlayground (same + ROLLUP simulation fallback)
        │
        ├─── /cube → CubePage
        │         └── CubePlayground (same + CUBE simulation fallback)
        │
        ├─── /playground → PlaygroundPage
        │         ├── initDb() → creates labdb in AlaSQL with 3 tables
        │         ├── template selected → query set → executeQuery()
        │         ├── alasql(sql) against labdb → results[]
        │         └── ResultGrid + SchemaViewer + PlaygroundInsights rendered
        │
        ├─── /learn → LearnPage (reads learnData.js, renders cards + videos)
        │
        ├─── /help → HelpPage (reads helpManualData.js, renders 9 steps + search)
        │
        ├─── /developed-by → DevelopedByPage (reads teamData.js, renders cards)
        │
        └─── /download → DownloadPage
                  ├── getDefaultReportData() → reportData object
                  ├── preset buttons → mutate reportData
                  ├── preview renders live
                  └── download buttons → reportGenerator.js:
                        ├── downloadTextFile()    → .txt blob download
                        ├── downloadDocFile()     → .doc HTML MIME download
                        └── openPdfPrintReport()  → new tab + browser print dialog
```

---

## 19. Glossary for Beginners

| Term | Plain English Explanation |
|---|---|
| **React** | A JavaScript library for building UIs out of small reusable pieces called components |
| **Component** | A JavaScript function that returns HTML-like JSX and manages its own state |
| **`useState`** | React hook — data that a component "remembers"; changes trigger a re-render |
| **`useEffect`** | React hook — code that runs automatically after a render, when specified variables change |
| **React Router** | Shows/hides components based on the current URL |
| **AlaSQL** | A SQL engine that runs entirely in JavaScript inside the browser |
| **CSS Modules** | CSS scoped to one component so class names never clash globally |
| **Props** | Data passed from a parent component to a child (like function arguments) |
| **JSX** | HTML-like syntax inside JavaScript — compiles to regular JS |
| **Vite** | Fast build tool and development server for modern web projects |
| **`data-theme`** | HTML attribute on `<html>` that CSS reads to switch color themes globally |
| **Blob + createObjectURL** | Browser APIs to create a downloadable file from a JavaScript string |
| **ROLLUP subtotal** | A result row where one grouping column is NULL — means "all values" in that column |
| **Grand total** | A result row where all grouping columns are NULL — total across everything |
| **CUBE cross-subtotal** | A subtotal across the second dimension that ROLLUP does not produce |

---

*Write-up prepared by Antigravity IDE based on direct source code inspection.*

import alasql from '../frontend/node_modules/alasql/dist/alasql.fs.js';
import {
  INITIAL_PROJECTS,
  INITIAL_MATERIALS,
  INITIAL_WORKFORCE,
  SCHEMA_DEFINITIONS,
  QUERY_TEMPLATES
} from '../frontend/src/components/playground/playgroundData.js';

console.log('=== VERIFYING PLAYGROUND FUNCTIONALITY ===\n');

// Split SQL text into separate statements while respecting quotes and comments
function splitSqlStatements(sqlText) {
  const statements = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sqlText.length; i++) {
    const char = sqlText[i];
    const nextChar = sqlText[i + 1];

    if (inLineComment) {
      if (char === '\n') {
        inLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === '*' && nextChar === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inSingleQuote) {
      current += char;
      if (char === "'" && nextChar === "'") {
        current += nextChar;
        i++;
      } else if (char === "'") {
        inSingleQuote = false;
      }
      continue;
    }

    if (inDoubleQuote) {
      current += char;
      if (char === '"' && nextChar === '"') {
        current += nextChar;
        i++;
      } else if (char === '"') {
        inDoubleQuote = false;
      }
      continue;
    }

    if (inBacktick) {
      current += char;
      if (char === '`') {
        inBacktick = false;
      }
      continue;
    }

    if (char === '-' && nextChar === '-') {
      inLineComment = true;
      i++;
      continue;
    }
    if (char === '/' && nextChar === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (char === "'") {
      inSingleQuote = true;
      current += char;
      continue;
    }
    if (char === '"') {
      inDoubleQuote = true;
      current += char;
      continue;
    }
    if (char === '`') {
      inBacktick = true;
      current += char;
      continue;
    }

    if (char === ';') {
      if (current.trim()) {
        statements.push(current.trim());
      }
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    statements.push(current.trim());
  }

  return statements;
}

function adaptSql(sql) {
  let s = sql;
  if (/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i.test(s)) {
    s = s.replace(/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH ROLLUP');
  } else if (/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i.test(s)) {
    s = s.replace(/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH CUBE');
  }
  s = s.replace(/\bAS\s+total\b(?!\s*['"`\]])/gi, 'AS [total]');
  return s;
}

function initDb(forceReset = false) {
  if (forceReset || !alasql.databases.labdb) {
    if (alasql.databases.labdb) {
      alasql('DROP DATABASE labdb;');
    }
    alasql('CREATE DATABASE labdb;');
    alasql('USE labdb;');

    alasql('DROP TABLE IF EXISTS projects;');
    alasql('CREATE TABLE projects (id INT, name STRING, city STRING, zone STRING, budget INT, status STRING, manager STRING);');
    alasql('SELECT * INTO projects FROM ?', [INITIAL_PROJECTS]);

    alasql('DROP TABLE IF EXISTS materials;');
    alasql('CREATE TABLE materials (id INT, project_id INT, item STRING, category STRING, quantity INT, unit_cost INT, total_cost INT);');
    alasql('SELECT * INTO materials FROM ?', [INITIAL_MATERIALS]);

    alasql('DROP TABLE IF EXISTS workforce;');
    alasql('CREATE TABLE workforce (id INT, project_id INT, role STRING, headcount INT, daily_wage INT, shift STRING);');
    alasql('SELECT * INTO workforce FROM ?', [INITIAL_WORKFORCE]);
  } else {
    alasql('USE labdb;');
  }
}

function getLiveDbState() {
  const db = alasql.databases.labdb;
  if (!db || !db.tables) return { schemas: SCHEMA_DEFINITIONS, rawData: {} };

  const tableNames = Object.keys(db.tables);
  const schemas = [];
  const rawData = {};

  for (const tName of tableNames) {
    const tableObj = db.tables[tName];
    let rows = [];
    try {
      rows = alasql(`SELECT * FROM ${tName}`);
    } catch {
      rows = tableObj?.data || [];
    }
    rawData[tName] = Array.isArray(rows) ? rows : [];

    const predefined = SCHEMA_DEFINITIONS.find(
      (s) => s.table.toLowerCase() === tName.toLowerCase()
    );

    if (predefined) {
      schemas.push(predefined);
    } else {
      let cols = [];
      if (tableObj && tableObj.columns && tableObj.columns.length > 0) {
        cols = tableObj.columns.map((c) => ({
          name: c.columnid,
          type: (c.dbtypeid || 'STRING').toUpperCase(),
          isPk: Boolean(tableObj.pk?.columns?.includes(c.columnid)),
          isFk: false,
          desc: `Column: ${c.columnid} (${(c.dbtypeid || 'STRING').toUpperCase()})`
        }));
      } else if (rows.length > 0 && typeof rows[0] === 'object' && rows[0] !== null) {
        cols = Object.keys(rows[0]).map((k) => ({
          name: k,
          type: typeof rows[0][k] === 'number' ? 'INT' : 'STRING',
          isPk: false,
          isFk: false,
          desc: `Column: ${k}`
        }));
      }

      schemas.push({
        table: tName,
        description: `User-defined table (${rawData[tName].length} ${rawData[tName].length === 1 ? 'record' : 'records'})`,
        columns: cols
      });
    }
  }

  return { schemas, rawData };
}

function executeQuery(sqlText) {
  initDb(false);
  const statements = splitSqlStatements(sqlText);
  if (statements.length === 0) return { results: [], error: null };

  let lastResult = null;
  let lastSelectResult = null;

  for (const rawStmt of statements) {
    let res;
    try {
      const adapted = adaptSql(rawStmt);
      res = alasql(adapted);
    } catch (initialErr) {
      let fallbackStmt = rawStmt;
      if (/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i.test(fallbackStmt)) {
        fallbackStmt = fallbackStmt.replace(/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH ROLLUP');
      } else if (/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i.test(fallbackStmt)) {
        fallbackStmt = fallbackStmt.replace(/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH CUBE');
      }
      fallbackStmt = fallbackStmt.replace(/\bAS\s+total\b(?!\s*['"`\]])/gi, 'AS [total]');

      if (fallbackStmt !== rawStmt) {
        res = alasql(fallbackStmt);
      } else {
        throw initialErr;
      }
    }

    lastResult = res;
    if (Array.isArray(res) && res.length > 0 && typeof res[0] === 'object' && res[0] !== null) {
      lastSelectResult = res;
    }
  }

  let finalRows = [];
  if (lastSelectResult) {
    finalRows = lastSelectResult;
  } else if (Array.isArray(lastResult)) {
    if (lastResult.length === 0) {
      finalRows = [];
    } else if (typeof lastResult[0] === 'object' && lastResult[0] !== null) {
      finalRows = lastResult;
    } else {
      finalRows = [{ result: String(lastResult) }];
    }
  } else if (lastResult !== null && lastResult !== undefined) {
    finalRows = [
      {
        status: 'Command executed successfully',
        affected_rows: typeof lastResult === 'number' ? lastResult : 1
      }
    ];
  }

  const { schemas, rawData } = getLiveDbState();
  return { results: finalRows, error: null, schemas, rawData };
}

// RUN TESTS
initDb(true);

// TEST 1
console.log('--- TEST 1: CREATE TABLE students ---');
const t1 = executeQuery(`
CREATE TABLE students (
    id INT,
    name STRING,
    age INT,
    department STRING
);
`);
const t1TableNames = t1.schemas.map((s) => s.table);
console.log('Students in table list:', t1TableNames.includes('students'));
const studentSchema = t1.schemas.find((s) => s.table === 'students');
console.log('Students columns:', studentSchema.columns.map(c => `${c.name}:${c.type}`).join(', '));

// TEST 2
console.log('\n--- TEST 2: INSERT INTO students ---');
const t2 = executeQuery(`
INSERT INTO students VALUES
(1, 'Rahul', 20, 'CSE');

INSERT INTO students VALUES
(2, 'Aman', 21, 'ECE');
`);
console.log('Students record count:', t2.rawData.students.length);
console.log('Students records match:', t2.rawData.students[0].name === 'Rahul' && t2.rawData.students[1].name === 'Aman');

// TEST 3
console.log('\n--- TEST 3: SELECT * FROM students ---');
const t3 = executeQuery('SELECT * FROM students;');
console.log('T3 returned rows count:', t3.results.length);
console.log('Row 1:', t3.results[0]);
console.log('Row 2:', t3.results[1]);

// TEST 4
console.log('\n--- TEST 4: SELECT department, COUNT(*) AS total FROM students GROUP BY department ---');
const t4 = executeQuery(`
SELECT department, COUNT(*) AS total
FROM students
GROUP BY department;
`);
console.log('T4 aggregation result:', t4.results);

// TEST 5
console.log('\n--- TEST 5: CREATE TABLE sales ---');
const t5 = executeQuery(`
CREATE TABLE sales (
    id INT,
    city STRING,
    amount INT
);
`);
console.log('Sales in table list:', t5.schemas.map((s) => s.table).includes('sales'));

// TEST 6
console.log('\n--- TEST 6: Original sample tables still work ---');
const t6Projects = executeQuery('SELECT COUNT(*) AS proj_count FROM projects;');
const t6Materials = executeQuery('SELECT COUNT(*) AS mat_count FROM materials;');
const t6Workforce = executeQuery('SELECT COUNT(*) AS wf_count FROM workforce;');
console.log('Projects count:', t6Projects.results[0].proj_count);
console.log('Materials count:', t6Materials.results[0].mat_count);
console.log('Workforce count:', t6Workforce.results[0].wf_count);

// TEST 7
console.log('\n--- TEST 7: Existing sample SQL commands work ---');
for (const tpl of QUERY_TEMPLATES) {
  try {
    const res = executeQuery(tpl.sql);
    console.log(`Template "${tpl.title}": SUCCESS (${res.results.length} rows)`);
  } catch (e) {
    console.error(`Template "${tpl.title}": FAILED:`, e.message);
  }
}

// TEST 8
console.log('\n--- TEST 8: Reset behavior ---');
initDb(true);
const t8State = getLiveDbState();
const t8Tables = t8State.schemas.map((s) => s.table);
console.log('Tables after Reset:', t8Tables);
console.log('User tables students/sales removed:', !t8Tables.includes('students') && !t8Tables.includes('sales'));
console.log('Sample tables present:', t8Tables.includes('projects') && t8Tables.includes('materials') && t8Tables.includes('workforce'));

// TEST 9: Collision test
console.log('\n--- TEST 9: Table Name Collision ---');
try {
  executeQuery('CREATE TABLE projects (id INT);');
  console.log('Collision test FAILED (should have thrown)');
} catch (e) {
  console.log('Collision error successfully caught:', e.message);
}
const projAfterCollision = executeQuery('SELECT COUNT(*) AS cnt FROM projects;');
console.log('Projects rows still intact:', projAfterCollision.results[0].cnt === 12);

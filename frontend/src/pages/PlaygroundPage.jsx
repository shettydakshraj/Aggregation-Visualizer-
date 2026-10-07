import { useState, useEffect, useCallback } from 'react';
import alasql from 'alasql';
import {
  INITIAL_PROJECTS,
  INITIAL_MATERIALS,
  INITIAL_WORKFORCE,
  SCHEMA_DEFINITIONS,
  QUERY_TEMPLATES
} from '../components/playground/playgroundData';
import PlaygroundHero from '../components/playground/PlaygroundHero';
import SchemaViewer from '../components/playground/SchemaViewer';
import PlaygroundEditor from '../components/playground/PlaygroundEditor';
import ResultGrid from '../components/playground/ResultGrid';
import PlaygroundInsights from '../components/playground/PlaygroundInsights';
import DatasetImportModal from '../components/playground/DatasetImportModal';
import SiteFooter from '../components/layout/SiteFooter';
import styles from './PlaygroundPage.module.css';

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

// Adapt SQL dialect nuances (ANSI ROLLUP/CUBE and AlaSQL reserved tokens like AS total)
function adaptSql(sql) {
  let s = sql;
  if (/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i.test(s)) {
    s = s.replace(/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH ROLLUP');
  } else if (/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i.test(s)) {
    s = s.replace(/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH CUBE');
  }
  // Keyword token conflict: 'TOTAL' is an AlaSQL aggregate keyword, bracket it as identifier
  s = s.replace(/\bAS\s+total\b(?!\s*['"`\]])/gi, 'AS [total]');
  return s;
}

export default function PlaygroundPage() {
  const [activeTemplateId, setActiveTemplateId] = useState(QUERY_TEMPLATES[0].id);
  const [query, setQuery] = useState(QUERY_TEMPLATES[0].sql);
  const [results, setResults] = useState([]);
  const [latency, setLatency] = useState(null);
  const [error, setError] = useState(null);
  const [schemas, setSchemas] = useState(SCHEMA_DEFINITIONS);
  const [rawData, setRawData] = useState({
    projects: INITIAL_PROJECTS,
    materials: INITIAL_MATERIALS,
    workforce: INITIAL_WORKFORCE
  });
  const [activeTable, setActiveTable] = useState('projects');

  useEffect(() => {
    document.title = 'Playground — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  // Initialize or reset AlaSQL database with base sample tables
  const initDb = useCallback((forceReset = false) => {
    try {
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
    } catch (e) {
      console.error('Failed to init AlaSQL labdb:', e);
    }
  }, []);

  // Extract live tables, column schemas, and actual records dynamically from AlaSQL
  const refreshDbState = useCallback(() => {
    try {
      const db = alasql.databases.labdb;
      if (!db || !db.tables) return;

      const tableNames = Object.keys(db.tables);
      const newSchemas = [];
      const newRawData = {};

      for (const tName of tableNames) {
        const tableObj = db.tables[tName];
        let rows = [];
        try {
          rows = alasql(`SELECT * FROM ${tName}`);
        } catch {
          rows = tableObj?.data || [];
        }
        newRawData[tName] = Array.isArray(rows) ? rows : [];

        const predefined = SCHEMA_DEFINITIONS.find(
          (s) => s.table.toLowerCase() === tName.toLowerCase()
        );

        if (predefined) {
          newSchemas.push(predefined);
        } else {
          // Dynamic schema detection for user-created tables
          let cols = [];
          if (tableObj && tableObj.columns && tableObj.columns.length > 0) {
            cols = tableObj.columns.map((c) => ({
              name: c.columnid,
              type: (c.dbtypeid || 'STRING').toUpperCase(),
              isPk: Boolean(tableObj.pk?.columns?.includes(c.columnid)),
              isFk: false,
              desc: `Column: ${c.columnid} (${(c.dbtypeid || 'STRING').toUpperCase()})`
            }));
          } else if (newRawData[tName].length > 0 && typeof newRawData[tName][0] === 'object' && newRawData[tName][0] !== null) {
            cols = Object.keys(newRawData[tName][0]).map((k) => ({
              name: k,
              type: typeof newRawData[tName][0][k] === 'number' ? 'INT' : 'STRING',
              isPk: false,
              isFk: false,
              desc: `Column: ${k}`
            }));
          }

          newSchemas.push({
            table: tName,
            description: `User-defined table (${newRawData[tName].length} ${newRawData[tName].length === 1 ? 'record' : 'records'})`,
            columns: cols
          });
        }
      }

      setSchemas(newSchemas);
      setRawData(newRawData);
    } catch (e) {
      console.error('Failed to refresh DB state:', e);
    }
  }, []);

  // Execute SQL query (supports single or multi-statement scripts)
  const executeQuery = useCallback(
    (sqlText) => {
      setError(null);
      const start = performance.now();

      try {
        initDb(false); // Ensure labdb is active without dropping user-created tables

        const statements = splitSqlStatements(sqlText);

        if (statements.length === 0) {
          setResults([]);
          setLatency(0);
          return;
        }

        let lastResult = null;
        let lastSelectResult = null;
        let newlyCreatedTable = null;

        for (const rawStmt of statements) {
          const createMatch = rawStmt.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([A-Za-z0-9_]+)/i);
          if (createMatch) {
            newlyCreatedTable = createMatch[1];
          }

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

        const end = performance.now();
        setLatency(end - start);

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

        setResults(finalRows);
        refreshDbState();

        if (newlyCreatedTable) {
          setActiveTable(newlyCreatedTable);
        }
      } catch (err) {
        const end = performance.now();
        setLatency(end - start);
        setError(err.message || 'Syntax error in SQL query');
        setResults([]);
        refreshDbState();
      }
    },
    [initDb, refreshDbState]
  );

  const [importModalOpen, setImportModalOpen] = useState(false);

  // Auto-run initial query on mount
  useEffect(() => {
    initDb(false);
    refreshDbState();
    executeQuery(QUERY_TEMPLATES[0].sql);
  }, [initDb, refreshDbState, executeQuery]);

  // Handle template selection
  const handleSelectTemplate = (tpl) => {
    setActiveTemplateId(tpl.id);
    setQuery(tpl.sql);
    executeQuery(tpl.sql);
  };

  // Handle reset to active template and restore clean database
  const handleReset = () => {
    initDb(true);
    const currentTpl = QUERY_TEMPLATES.find((t) => t.id === activeTemplateId) || QUERY_TEMPLATES[0];
    setQuery(currentTpl.sql);
    setError(null);
    setActiveTable('projects');
    refreshDbState();
    executeQuery(currentTpl.sql);
  };

  // Register newly imported user dataset into AlaSQL
  const handleRegisterTable = (tableName, rows) => {
    try {
      alasql('USE labdb;');
      alasql(`DROP TABLE IF EXISTS ${tableName};`);
      alasql(`CREATE TABLE ${tableName};`);
      alasql(`SELECT * INTO ${tableName} FROM ?`, [rows]);
      setActiveTable(tableName);
      const sampleQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
      setQuery(sampleQuery);
      refreshDbState();
      executeQuery(sampleQuery);
    } catch (err) {
      console.error('Failed to register table:', err);
      setError(`Failed to register table ${tableName}: ${err.message}`);
    }
  };

  return (
    <div className={styles.page}>
      <PlaygroundHero
        templates={QUERY_TEMPLATES}
        activeTemplateId={activeTemplateId}
        onSelectTemplate={handleSelectTemplate}
      />

      <main className={styles.mainSection}>
        <div className="container">
          <div className={styles.layoutGrid}>
            <PlaygroundEditor
              query={query}
              onChangeQuery={setQuery}
              onRun={() => executeQuery(query)}
              onReset={handleReset}
              onOpenImportModal={() => setImportModalOpen(true)}
              latency={latency}
              rowCount={results.length}
              error={error}
            />

            <SchemaViewer
              schemas={schemas}
              rawData={rawData}
              activeTable={activeTable}
              onSelectTable={setActiveTable}
              onOpenImportModal={() => setImportModalOpen(true)}
            />
          </div>

          <div className={styles.bottomSection}>
            <PlaygroundInsights query={query} rowCount={results.length} />
            <ResultGrid results={results} />
          </div>
        </div>
      </main>

      <DatasetImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        existingTables={schemas.map((s) => s.table)}
        onRegisterTable={handleRegisterTable}
      />

      <SiteFooter />
    </div>
  );
}

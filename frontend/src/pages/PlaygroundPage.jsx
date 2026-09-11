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
import SiteFooter from '../components/layout/SiteFooter';
import styles from './PlaygroundPage.module.css';

export default function PlaygroundPage() {
  const [activeTemplateId, setActiveTemplateId] = useState(QUERY_TEMPLATES[0].id);
  const [query, setQuery] = useState(QUERY_TEMPLATES[0].sql);
  const [results, setResults] = useState([]);
  const [latency, setLatency] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Playground — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  // Initialize AlaSQL database with tables
  const initDb = useCallback(() => {
    try {
      if (!alasql.databases.labdb) {
        alasql('CREATE DATABASE labdb;');
      }
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
    } catch (e) {
      console.error('Failed to init AlaSQL labdb:', e);
    }
  }, []);

  // Execute SQL query
  const executeQuery = useCallback(
    (sqlText) => {
      setError(null);
      const start = performance.now();

      try {
        initDb();

        // Remove comments for cleaner engine parsing
        const cleanedSql = sqlText
          .split('\n')
          .filter((line) => !line.trim().startsWith('--'))
          .join('\n')
          .trim();

        if (!cleanedSql) {
          setResults([]);
          setLatency(0);
          return;
        }

        let res;
        try {
          // Attempt 1: Direct execution
          res = alasql(cleanedSql);
        } catch (initialErr) {
          // Attempt 2: Translate ANSI ROLLUP(a, b) -> a, b WITH ROLLUP if needed
          let adaptedSql = cleanedSql;
          if (/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i.test(cleanedSql)) {
            adaptedSql = cleanedSql.replace(/GROUP\s+BY\s+ROLLUP\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH ROLLUP');
          } else if (/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i.test(cleanedSql)) {
            adaptedSql = cleanedSql.replace(/GROUP\s+BY\s+CUBE\s*\(([^)]+)\)/i, 'GROUP BY $1 WITH CUBE');
          }

          if (adaptedSql !== cleanedSql) {
            res = alasql(adaptedSql);
          } else {
            throw initialErr;
          }
        }

        const end = performance.now();
        setLatency(end - start);

        // Ensure result is array of objects
        const finalRows = Array.isArray(res) ? res : [res];
        setResults(finalRows);
      } catch (err) {
        const end = performance.now();
        setLatency(end - start);
        setError(err.message || 'Syntax error in SQL query');
        setResults([]);
      }
    },
    [initDb]
  );

  // Auto-run initial query on mount
  useEffect(() => {
    initDb();
    executeQuery(QUERY_TEMPLATES[0].sql);
  }, [initDb, executeQuery]);

  // Handle template selection
  const handleSelectTemplate = (tpl) => {
    setActiveTemplateId(tpl.id);
    setQuery(tpl.sql);
    executeQuery(tpl.sql);
  };

  // Handle reset to active template
  const handleReset = () => {
    const currentTpl = QUERY_TEMPLATES.find((t) => t.id === activeTemplateId) || QUERY_TEMPLATES[0];
    setQuery(currentTpl.sql);
    executeQuery(currentTpl.sql);
  };

  const rawData = {
    projects: INITIAL_PROJECTS,
    materials: INITIAL_MATERIALS,
    workforce: INITIAL_WORKFORCE
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
              latency={latency}
              rowCount={results.length}
              error={error}
            />

            <SchemaViewer schemas={SCHEMA_DEFINITIONS} rawData={rawData} />
          </div>

          <div className={styles.bottomSection}>
            <PlaygroundInsights query={query} rowCount={results.length} />
            <ResultGrid results={results} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

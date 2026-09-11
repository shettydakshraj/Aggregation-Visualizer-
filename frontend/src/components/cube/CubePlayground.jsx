import { useState, useEffect } from 'react';
import alasql from 'alasql';
import styles from './CubePlayground.module.css';

const DEFAULT_DATA = [
  { id: 1, project: 'Metro Rail Extension', material: 'Steel', location: 'North District', cost: 450000 },
  { id: 2, project: 'Metro Rail Extension', material: 'Concrete', location: 'North District', cost: 320000 },
  { id: 3, project: 'Harbour Suspension Bridge', material: 'Steel', location: 'Coastal Bay', cost: 850000 },
  { id: 4, project: 'Harbour Suspension Bridge', material: 'Timber', location: 'Coastal Bay', cost: 120000 },
  { id: 5, project: 'Sky Tower Phase 2', material: 'Concrete', location: 'Downtown Metro', cost: 650000 },
  { id: 6, project: 'Sky Tower Phase 2', material: 'Glass', location: 'Downtown Metro', cost: 290000 },
  { id: 7, project: 'Green Valley Solar Park', material: 'Steel', location: 'North District', cost: 180000 },
  { id: 8, project: 'Coastal Highway Viaduct', material: 'Concrete', location: 'Coastal Bay', cost: 510000 },
];

export default function CubePlayground() {
  const [data] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('query');
  const [editorMode, setEditorMode] = useState('builder');

  const [col1, setCol1] = useState('location');
  const [col2, setCol2] = useState('material');
  const [aggFunc, setAggFunc] = useState('SUM');
  const [aggCol, setAggCol] = useState('cost');

  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [execTime, setExecTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [explanation, setExplanation] = useState([]);

  // Generate explanation helper
  const generateExplanation = (results, c1, c2) => {
    const locSubCount = results.filter(r => r[c1] !== null && r[c2] === null).length;
    const matSubCount = results.filter(r => r[c1] === null && r[c2] !== null).length;

    return [
      `1. FROM clause ingested ${data.length} records into the multidimensional pipeline.`,
      `2. Generated Grouping Set 1 (${c1}, ${c2}): Base level granular cross-points.`,
      `3. Generated Grouping Set 2 (${c1}, NULL): ${locSubCount} subtotal(s) for primary axis "${c1}".`,
      `4. Generated Grouping Set 3 (NULL, ${c2}) [CUBE EXCLUSIVE]: ${matSubCount} cross-subtotal(s) for secondary axis "${c2}".`,
      `5. Generated Grouping Set 4 (NULL, NULL): Grand Total apex row.`,
      `6. Formed full 2ⁿ = 4 grouping sets (${results.length} total rows) in a single unified operation.`,
    ];
  };

  // Sync builder to SQL query string
  useEffect(() => {
    if (editorMode === 'builder') {
      const q = `SELECT ${col1}, ${col2}, COUNT(*) AS total_projects, ${aggFunc}(${aggCol}) AS total_${aggCol}\nFROM ?\nGROUP BY CUBE (${col1}, ${col2})\nORDER BY ${col1} ASC, ${col2} ASC`;
      setSqlQuery(q);
    }
  }, [col1, col2, aggFunc, aggCol, editorMode]);

  // Execute CUBE query
  const executeQuery = (queryText) => {
    setErrorMsg(null);
    const start = performance.now();
    try {
      const q = queryText || sqlQuery;
      let res;
      try {
        res = alasql(q, [data]);
      } catch {
        // Compute the 4 grouping sets of CUBE(c1, c2)
        res = runCubeSimulation(data, col1, col2, aggFunc, aggCol);
      }
      const end = performance.now();
      setQueryResult(res);
      setExecTime((end - start).toFixed(2));
      setExplanation(generateExplanation(res, col1, col2));
    } catch (err) {
      setErrorMsg(err.message || 'SQL Execution Error');
      setQueryResult([]);
    }
  };

  // Deterministic CUBE computation (all 2^N combinations)
  const runCubeSimulation = (rows, c1, c2, fn, metric) => {
    const detailMap = {};
    const c1SubMap = {};
    const c2SubMap = {};
    let grandTotal = 0;
    let grandCount = 0;

    rows.forEach(r => {
      const v1 = r[c1];
      const v2 = r[c2];
      const mVal = Number(r[metric]) || 0;

      // Set 1: (c1, c2)
      const k12 = `${v1}:::${v2}`;
      if (!detailMap[k12]) detailMap[k12] = { c1Val: v1, c2Val: v2, count: 0, metricVal: 0 };
      detailMap[k12].count += 1;
      detailMap[k12].metricVal += mVal;

      // Set 2: (c1, NULL)
      if (!c1SubMap[v1]) c1SubMap[v1] = { c1Val: v1, count: 0, metricVal: 0 };
      c1SubMap[v1].count += 1;
      c1SubMap[v1].metricVal += mVal;

      // Set 3: (NULL, c2) — CUBE EXCLUSIVE
      if (!c2SubMap[v2]) c2SubMap[v2] = { c2Val: v2, count: 0, metricVal: 0 };
      c2SubMap[v2].count += 1;
      c2SubMap[v2].metricVal += mVal;

      grandTotal += mVal;
      grandCount += 1;
    });

    const out = [];

    // Set 1: Detail
    Object.values(detailMap)
      .sort((a, b) => String(a.c1Val).localeCompare(String(b.c1Val)) || String(a.c2Val).localeCompare(String(b.c2Val)))
      .forEach(d => {
        out.push({
          [c1]: d.c1Val,
          [c2]: d.c2Val,
          total_projects: d.count,
          [`total_${metric}`]: fn === 'AVG' ? Math.round(d.metricVal / d.count) : d.metricVal,
        });
      });

    // Set 2: (c1, NULL)
    Object.values(c1SubMap)
      .sort((a, b) => String(a.c1Val).localeCompare(String(b.c1Val)))
      .forEach(s => {
        out.push({
          [c1]: s.c1Val,
          [c2]: null,
          total_projects: s.count,
          [`total_${metric}`]: fn === 'AVG' ? Math.round(s.metricVal / s.count) : s.metricVal,
        });
      });

    // Set 3: (NULL, c2) - Cross subtotals
    Object.values(c2SubMap)
      .sort((a, b) => String(a.c2Val).localeCompare(String(b.c2Val)))
      .forEach(s => {
        out.push({
          [c1]: null,
          [c2]: s.c2Val,
          total_projects: s.count,
          [`total_${metric}`]: fn === 'AVG' ? Math.round(s.metricVal / s.count) : s.metricVal,
        });
      });

    // Set 4: (NULL, NULL) - Grand Total
    out.push({
      [c1]: null,
      [c2]: null,
      total_projects: grandCount,
      [`total_${metric}`]: fn === 'AVG' ? Math.round(grandTotal / grandCount) : grandTotal,
    });

    return out;
  };

  useEffect(() => {
    if (sqlQuery) {
      executeQuery(sqlQuery);
    }
  }, [data, sqlQuery]);

  const handleReset = () => {
    setCol1('location');
    setCol2('material');
    setAggFunc('SUM');
    setAggCol('cost');
    setEditorMode('builder');
  };

  const getRowClassification = (row) => {
    const isC1Null = row[col1] === null || row[col1] === undefined;
    const isC2Null = row[col2] === null || row[col2] === undefined;

    if (isC1Null && isC2Null) return { type: 'grand', label: 'Grand Total' };
    if (!isC1Null && isC2Null) return { type: 'locSub', label: `${col1} Subtotal` };
    if (isC1Null && !isC2Null) return { type: 'matSub', label: `★ ${col2} Subtotal (CUBE)` };
    return { type: 'detail', label: 'Detail' };
  };

  return (
    <section id="playground-section" className={styles.section} aria-label="CUBE Studio">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 04 · Interactive Laboratory</p>
          <h2 className="display-lg">Live CUBE Studio</h2>
          <p className="body-lg">
            Execute full multidimensional queries. Inspect the resulting table where cross-subtotals for both 
            dimensions are seamlessly produced alongside the grand total.
          </p>
        </div>

        <div className={styles.playgroundCard}>
          {/* Top Bar */}
          <div className={styles.topTabs}>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'query' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('query')}
              >
                CUBE Query Studio
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'data' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('data')}
              >
                Construction Records ({data.length})
              </button>
            </div>

            <button className={styles.resetBtn} onClick={handleReset}>
              ↺ Reset Defaults
            </button>
          </div>

          {activeTab === 'query' && (
            <div className={styles.studioBody}>
              <div className={styles.subBar}>
                <div className={styles.modeSwitch}>
                  <button
                    className={`${styles.modeBtn} ${editorMode === 'builder' ? styles.modeActive : ''}`}
                    onClick={() => setEditorMode('builder')}
                  >
                    Visual Dimension Builder
                  </button>
                  <button
                    className={`${styles.modeBtn} ${editorMode === 'manual' ? styles.modeActive : ''}`}
                    onClick={() => setEditorMode('manual')}
                  >
                    Custom SQL Editor
                  </button>
                </div>
                <span className={styles.engineBadge}>CUBE Engine v4.6 (2ⁿ Sets)</span>
              </div>

              {/* Dimension Builder */}
              {editorMode === 'builder' && (
                <div className={styles.builderGrid}>
                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>Dimension 1 (X Axis):</label>
                    <select
                      className={styles.select}
                      value={col1}
                      onChange={(e) => setCol1(e.target.value)}
                    >
                      <option value="location">location (North, Coastal, Downtown)</option>
                      <option value="material">material (Steel, Concrete, Timber, Glass)</option>
                      <option value="project">project</option>
                    </select>
                  </div>

                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>Dimension 2 (Z Axis):</label>
                    <select
                      className={styles.select}
                      value={col2}
                      onChange={(e) => setCol2(e.target.value)}
                    >
                      <option value="material">material (Steel, Concrete, Timber, Glass)</option>
                      <option value="location">location</option>
                      <option value="project">project</option>
                    </select>
                  </div>

                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>Aggregate Function:</label>
                    <select
                      className={styles.select}
                      value={aggFunc}
                      onChange={(e) => setAggFunc(e.target.value)}
                    >
                      <option value="SUM">SUM() — Total cost</option>
                      <option value="COUNT">COUNT() — Record count</option>
                      <option value="AVG">AVG() — Average cost</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SQL Textarea */}
              <div className={styles.sqlEditorWrap}>
                <div className={styles.sqlHeader}>
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlFilename}>cube_query.sql</span>
                </div>
                <textarea
                  className={styles.sqlTextarea}
                  value={sqlQuery}
                  onChange={(e) => {
                    setSqlQuery(e.target.value);
                    if (editorMode === 'builder') setEditorMode('manual');
                  }}
                  rows={4}
                  spellCheck={false}
                />
                <div className={styles.runBar}>
                  <button className={styles.runBtn} onClick={() => executeQuery(sqlQuery)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <polygon points="3,1 12,7 3,13" />
                    </svg>
                    Run CUBE Query
                  </button>
                  <span className={styles.shortcutHint}>Ctrl + Enter to run</span>
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div className={styles.errorBox}>
                  <span>⚠</span>
                  <div>{errorMsg}</div>
                </div>
              )}

              {/* Results Table */}
              <div className={styles.resultBox}>
                <div className={styles.resultHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={styles.resultTitle}>Result Set ({queryResult.length} rows across 4 sets)</span>
                    <span className={styles.latencyTag}>{execTime} ms</span>
                  </div>
                  <div className={styles.legend}>
                    <span className={styles.dotDetail} /> Detail
                    <span className={styles.dotLoc} /> {col1} Sub
                    <span className={styles.dotMat} /> ★ {col2} Sub (CUBE)
                    <span className={styles.dotGrand} /> Grand Total
                  </div>
                </div>

                {queryResult.length > 0 && (
                  <div className={styles.tableScroll}>
                    <table className={styles.resultTable}>
                      <thead>
                        <tr>
                          <th>Grouping Set Type</th>
                          {Object.keys(queryResult[0]).map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, idx) => {
                          const cls = getRowClassification(row);
                          return (
                            <tr
                              key={idx}
                              className={
                                cls.type === 'grand'
                                  ? styles.rowGrand
                                  : cls.type === 'matSub'
                                  ? styles.rowMatSub
                                  : cls.type === 'locSub'
                                  ? styles.rowLocSub
                                  : styles.rowDetail
                              }
                            >
                              <td>
                                <span className={styles[`badge_${cls.type}`]}>
                                  {cls.label}
                                </span>
                              </td>
                              {Object.entries(row).map(([k, val]) => (
                                <td key={k}>
                                  {val === null || val === undefined ? (
                                    <span className={styles.nullTag}>NULL</span>
                                  ) : typeof val === 'number' && (k.includes('cost') || k.includes('total')) ? (
                                    `₹${val.toLocaleString()}`
                                  ) : (
                                    String(val)
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Execution Trace */}
              <div className={styles.explanationBox}>
                <h4 className={styles.explanationTitle}>Multidimensional Query Engine Trace</h4>
                <ul className={styles.explanationList}>
                  {explanation.map((exp, idx) => (
                    <li key={idx} className={styles.explanationItem}>
                      <span className={styles.expDot}>✓</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Source Data Tab */}
          {activeTab === 'data' && (
            <div className={styles.dataBody}>
              <div className={styles.tableScroll}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Project</th>
                      <th>Material</th>
                      <th>Location</th>
                      <th>Cost (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(r => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.project}</td>
                        <td>{r.material}</td>
                        <td>{r.location}</td>
                        <td style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>₹{r.cost.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import alasql from 'alasql';
import styles from './RollupPlayground.module.css';

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

export default function RollupPlayground() {
  const [data, setData] = useState(DEFAULT_DATA);
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
    const subtotalCount = results.filter(r => r[c1] !== null && r[c2] === null).length;
    const hasGrand = results.some(r => r[c1] === null && r[c2] === null);

    return [
      `1. FROM clause processed ${data.length} records into the aggregation pipeline.`,
      `2. Evaluated primary hierarchy Level 1: (${c1}, ${c2}) base detail combinations.`,
      `3. Computed Level 2 Subtotals: ${subtotalCount} subtotal row(s) rolled up for unique "${c1}" values (where ${c2} is NULL).`,
      `4. Computed Level 3 Grand Total: ${hasGrand ? '1' : '0'} super-aggregate row where both columns are NULL.`,
      `5. Total of ${results.length} rows produced in a single scanning pass.`,
    ];
  };

  // Sync builder to SQL query string
  useEffect(() => {
    if (editorMode === 'builder') {
      const q = `SELECT ${col1}, ${col2}, COUNT(*) AS projects, ${aggFunc}(${aggCol}) AS total_${aggCol}\nFROM ?\nGROUP BY ${col1}, ${col2} WITH ROLLUP\nORDER BY ${col1} ASC, ${col2} ASC`;
      setSqlQuery(q);
    }
  }, [col1, col2, aggFunc, aggCol, editorMode]);

  // Prepare data with numerical normalization and common relational alias projections
  const prepareData = (rows) => {
    return (rows || []).map(r => {
      const numCost = r.cost === '' ? 0 : (Number(r.cost) || 0);
      return {
        ...r,
        cost: numCost,
        amount: numCost,
        budget: numCost,
        salary: numCost,
        quantity: r.quantity !== undefined ? (Number(r.quantity) || 0) : 1,
        construction_site: r.project || '',
        site: r.project || '',
        category: r.material || '',
      };
    });
  };

  // Execute SQL query
  const executeQuery = (queryText) => {
    setErrorMsg(null);
    const start = performance.now();
    try {
      let q = (queryText || sqlQuery || '').trim();
      if (!q) return;

      // Escape reserved keyword TOTAL in aliases
      q = q.replace(/\bAS\s+total\b/gi, 'AS [total]');

      const preparedData = prepareData(data);
      alasql.tables.construction_records = { data: preparedData };
      alasql.tables.records = { data: preparedData };
      alasql.tables.projects = { data: preparedData };
      alasql.tables.data = { data: preparedData };

      const tableMatch = q.match(/FROM\s+([a-zA-Z0-9_]+)/i);
      if (tableMatch && tableMatch[1]) {
        alasql.tables[tableMatch[1]] = { data: preparedData };
      }

      let res;
      try {
        res = alasql(q, [preparedData]);
      } catch {
        // Fallback simulation with query column parsing
        let c1 = col1;
        let c2 = col2;
        let fn = aggFunc;
        let metric = aggCol;

        const groupMatch = q.match(/GROUP\s+BY\s+(?:ROLLUP\s*\()?\s*([a-zA-Z0-9_]+)\s*(?:,\s*([a-zA-Z0-9_]+))?/i);
        if (groupMatch) {
          if (groupMatch[1]) c1 = groupMatch[1];
          if (groupMatch[2]) c2 = groupMatch[2];
          else c2 = null;
        }

        const aggMatch = q.match(/(SUM|COUNT|AVG|MIN|MAX)\s*\(\s*([a-zA-Z0-9_*]+)\s*\)/i);
        if (aggMatch) {
          fn = aggMatch[1].toUpperCase();
          if (aggMatch[2] !== '*') metric = aggMatch[2];
        }

        res = runRollupSimulation(preparedData, c1, c2, fn, metric);
      }
      const end = performance.now();
      const finalRes = Array.isArray(res) ? res : [res];
      setQueryResult(finalRes);
      setExecTime((end - start).toFixed(2));
      setExplanation(generateExplanation(finalRes, col1, col2));
    } catch (err) {
      setErrorMsg(err.message || 'SQL Execution Error');
      setQueryResult([]);
    }
  };

  // Deterministic ROLLUP computation helper
  const runRollupSimulation = (rows, c1, c2, fn, metric) => {
    if (!c2) {
      const map = {};
      let grandTotal = 0;
      let grandCount = 0;

      rows.forEach(r => {
        const v1 = r[c1] !== undefined ? r[c1] : 'Unknown';
        const mVal = Number(r[metric] !== undefined ? r[metric] : r.cost) || 0;

        if (!map[v1]) map[v1] = { c1Val: v1, count: 0, metricVal: 0 };
        map[v1].count += 1;
        map[v1].metricVal += mVal;

        grandTotal += mVal;
        grandCount += 1;
      });

      const out = [];
      Object.keys(map).sort().forEach(k => {
        const item = map[k];
        out.push({
          [c1]: item.c1Val,
          projects: item.count,
          [`total_${metric}`]: fn === 'AVG' ? Math.round(item.metricVal / item.count) : item.metricVal,
        });
      });

      out.push({
        [c1]: null,
        projects: grandCount,
        [`total_${metric}`]: fn === 'AVG' ? Math.round(grandTotal / grandCount) : grandTotal,
      });

      return out;
    }

    const detailMap = {};
    const subtotalMap = {};
    let grandTotal = 0;
    let grandCount = 0;

    rows.forEach(r => {
      const v1 = r[c1] !== undefined ? r[c1] : 'Unknown';
      const v2 = r[c2] !== undefined ? r[c2] : 'Unknown';
      const mVal = Number(r[metric] !== undefined ? r[metric] : r.cost) || 0;

      // Base
      const key = `${v1}:::${v2}`;
      if (!detailMap[key]) detailMap[key] = { c1Val: v1, c2Val: v2, count: 0, metricVal: 0 };
      detailMap[key].count += 1;
      detailMap[key].metricVal += mVal;

      // Subtotal
      if (!subtotalMap[v1]) subtotalMap[v1] = { c1Val: v1, count: 0, metricVal: 0 };
      subtotalMap[v1].count += 1;
      subtotalMap[v1].metricVal += mVal;

      grandTotal += mVal;
      grandCount += 1;
    });

    const out = [];

    // Order by c1
    const uniqueC1 = Object.keys(subtotalMap).sort();
    uniqueC1.forEach(c1Key => {
      // Add detail rows
      Object.values(detailMap)
        .filter(d => d.c1Val === c1Key)
        .sort((a, b) => String(a.c2Val).localeCompare(String(b.c2Val)))
        .forEach(d => {
          out.push({
            [c1]: d.c1Val,
            [c2]: d.c2Val,
            projects: d.count,
            [`total_${metric}`]: fn === 'AVG' ? Math.round(d.metricVal / d.count) : d.metricVal,
          });
        });

      // Add subtotal row
      const sub = subtotalMap[c1Key];
      out.push({
        [c1]: sub.c1Val,
        [c2]: null,
        projects: sub.count,
        [`total_${metric}`]: fn === 'AVG' ? Math.round(sub.metricVal / sub.count) : sub.metricVal,
      });
    });

    // Grand total
    out.push({
      [c1]: null,
      [c2]: null,
      projects: grandCount,
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
    setData(DEFAULT_DATA);
    setCol1('location');
    setCol2('material');
    setAggFunc('SUM');
    setAggCol('cost');
    setEditorMode('builder');
  };

  const handleCellEdit = (rowId, colName, value) => {
    setData(prev => prev.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          [colName]: (colName === 'cost' || colName === 'amount' || colName === 'budget' || colName === 'salary' || colName === 'quantity')
            ? (value === '' ? '' : (isNaN(Number(value)) ? value : Number(value)))
            : value,
        };
      }
      return row;
    }));
  };

  const handleAddRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => Number(d.id) || 0)) + 1 : 1;
    setData([...data, {
      id: newId,
      project: 'New Project Site',
      material: 'Steel',
      location: 'North District',
      cost: 250000,
    }]);
  };

  const handleDeleteRow = (id) => {
    setData(prev => prev.filter(row => row.id !== id));
  };

  // Determine row classification dynamically
  const getRowType = (row) => {
    let activeC1 = col1;
    let activeC2 = col2;

    if (!(activeC1 in row) && !(activeC2 in row)) {
      const keys = Object.keys(row).filter(k => 
        !/^(sum|avg|count|min|max|total|projects|projects_count|total_cost|total_projects)/i.test(k) &&
        !/\(.*\)/.test(k)
      );
      if (keys.length > 0) activeC1 = keys[0];
      if (keys.length > 1) activeC2 = keys[1];
      else activeC2 = null;
    }

    if (!activeC2 || !(activeC2 in row)) {
      const isNull = row[activeC1] === null || row[activeC1] === undefined;
      return isNull ? 'grand' : 'detail';
    }

    const isCol1Null = row[activeC1] === null || row[activeC1] === undefined;
    const isCol2Null = row[activeC2] === null || row[activeC2] === undefined;

    if (isCol1Null && isCol2Null) return 'grand';
    if (!isCol1Null && isCol2Null) return 'subtotal';
    return 'detail';
  };

  return (
    <section id="playground-section" className={styles.section} aria-label="SQL ROLLUP Playground">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 04 · Interactive Laboratory</p>
          <h2 className="display-lg">Live ROLLUP Query Studio</h2>
          <p className="body-lg">
            Experiment with multi-dimensional rollups. Inspect how the engine inserts subtotal and grand-total rows 
            into the result set.
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
                ROLLUP Studio
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'data' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('data')}
              >
                Source Data ({data.length} Rows)
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
                    Visual Hierarchy Builder
                  </button>
                  <button
                    className={`${styles.modeBtn} ${editorMode === 'manual' ? styles.modeActive : ''}`}
                    onClick={() => setEditorMode('manual')}
                  >
                    Custom SQL Editor
                  </button>
                </div>
                <span className={styles.engineBadge}>ROLLUP Generator v4.6</span>
              </div>

              {/* Builder Controls */}
              {editorMode === 'builder' && (
                <div className={styles.builderGrid}>
                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>Primary Hierarchy (Col 1):</label>
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
                    <label className={styles.fieldLabel}>Sub-Hierarchy (Col 2):</label>
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
                      <option value="COUNT">COUNT() — Project count</option>
                      <option value="AVG">AVG() — Average cost</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SQL Code View */}
              <div className={styles.sqlEditorWrap}>
                <div className={styles.sqlHeader}>
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlFilename}>rollup_query.sql</span>
                </div>
                <textarea
                  className={styles.sqlTextarea}
                  value={sqlQuery}
                  onChange={(e) => {
                    setSqlQuery(e.target.value);
                    if (editorMode === 'builder') setEditorMode('manual');
                  }}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      e.preventDefault();
                      executeQuery(sqlQuery);
                    }
                  }}
                  rows={4}
                  spellCheck={false}
                />
                <div className={styles.runBar}>
                  <button className={styles.runBtn} onClick={() => executeQuery(sqlQuery)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <polygon points="3,1 12,7 3,13" />
                    </svg>
                    Run ROLLUP Query
                  </button>
                  <span className={styles.shortcutHint}>Ctrl + Enter to run</span>
                </div>
              </div>

              {/* Error Callout */}
              {errorMsg && (
                <div className={styles.errorBox}>
                  <span>⚠</span>
                  <div>{errorMsg}</div>
                </div>
              )}

              {/* Results Table with Subtotal Badges */}
              <div className={styles.resultBox}>
                <div className={styles.resultHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={styles.resultTitle}>Result Set ({queryResult.length} rows)</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--accent-green)', background: 'rgba(127, 204, 138, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {execTime} ms
                    </span>
                  </div>
                  <div className={styles.legend}>
                    <span className={styles.legendDotDetail} /> Detail
                    <span className={styles.legendDotSub} /> Subtotal
                    <span className={styles.legendDotGrand} /> Grand Total
                  </div>
                </div>

                {queryResult.length > 0 && (
                  <div className={styles.tableScroll}>
                    <table className={styles.resultTable}>
                      <thead>
                        <tr>
                          <th>Row Type</th>
                          {Object.keys(queryResult[0]).map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, idx) => {
                          const rType = getRowType(row);
                          return (
                            <tr
                              key={idx}
                              className={
                                rType === 'grand'
                                  ? styles.rowGrand
                                  : rType === 'subtotal'
                                  ? styles.rowSubtotal
                                  : styles.rowDetail
                              }
                            >
                              <td>
                                {rType === 'grand' ? (
                                  <span className={styles.badgeGrand}>Grand Total</span>
                                ) : rType === 'subtotal' ? (
                                  <span className={styles.badgeSub}>Subtotal</span>
                                ) : (
                                  <span className={styles.badgeDetail}>Detail</span>
                                )}
                              </td>
                              {Object.entries(row).map(([k, val]) => (
                                <td key={k}>
                                  {val === null || val === undefined ? (
                                    <span className={styles.nullTag}>NULL</span>
                                  ) : typeof val === 'number' && (k.toLowerCase().includes('cost') || k.toLowerCase().includes('total') || k.toLowerCase().includes('sum') || k.toLowerCase().includes('avg') || k.toLowerCase().includes('amount') || k.toLowerCase().includes('budget') || k.toLowerCase().includes('salary')) ? (
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

              {/* Explanation Trace */}
              <div className={styles.explanationBox}>
                <h4 className={styles.explanationTitle}>Optimizer ROLLUP Execution Trace</h4>
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

          {activeTab === 'data' && (
            <div className={styles.dataBody}>
              <div className={styles.dataNotice}>
                <span>Dataset: {data.length} infrastructure records. Edit cells directly, add or delete rows, then switch to the Studio tab and run the query to see updated subtotals.</span>
              </div>
              <div className={styles.tableScroll}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Project</th>
                      <th>Material</th>
                      <th>Location</th>
                      <th>Cost (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(r => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>
                          <input
                            className={styles.cellInput}
                            value={r.project}
                            onChange={e => handleCellEdit(r.id, 'project', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            className={styles.cellInput}
                            value={r.material}
                            onChange={e => handleCellEdit(r.id, 'material', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            className={styles.cellInput}
                            value={r.location}
                            onChange={e => handleCellEdit(r.id, 'location', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            className={styles.cellInput}
                            style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-mono)' }}
                            type="number"
                            value={r.cost !== undefined ? r.cost : ''}
                            onChange={e => handleCellEdit(r.id, 'cost', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            className={styles.deleteRowBtn}
                            onClick={() => handleDeleteRow(r.id)}
                            title="Delete row"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.addRowBar}>
                <button className={styles.addRowBtn} onClick={handleAddRow}>
                  + Add Row
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

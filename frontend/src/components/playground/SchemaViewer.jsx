import { useState } from 'react';
import styles from './SchemaViewer.module.css';

export default function SchemaViewer({
  schemas = [],
  rawData = {},
  activeTable = null,
  onSelectTable = null,
  onOpenImportModal = null
}) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [showDataPreview, setShowDataPreview] = useState(false);

  // If activeTable is provided, sync with its index; otherwise use internalActiveIndex
  const matchedIndex = activeTable
    ? schemas.findIndex((s) => s.table?.toLowerCase() === activeTable?.toLowerCase())
    : -1;
  const activeTableIndex = matchedIndex !== -1 ? matchedIndex : internalActiveIndex;
  const safeActiveIndex =
    activeTableIndex >= 0 && activeTableIndex < schemas.length ? activeTableIndex : 0;

  const currentSchema = schemas[safeActiveIndex] || schemas[0];
  const currentRecords = (currentSchema && rawData[currentSchema.table]) || [];

  const handleTabClick = (idx, tableName) => {
    setInternalActiveIndex(idx);
    if (onSelectTable) {
      onSelectTable(tableName);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.titleIcon}>◫</span>
          <h2 className={styles.title}>Schema Explorer</h2>
          <span className={styles.tableCount}>{schemas.length} Tables</span>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.tableTabs}>
            {schemas.map((s, idx) => (
              <button
                key={s.table}
                type="button"
                className={`${styles.tableTabBtn} ${safeActiveIndex === idx ? styles.tableTabActive : ''}`}
                onClick={() => handleTabClick(idx, s.table)}
              >
                {s.table}
              </button>
            ))}
          </div>

          {onOpenImportModal && (
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={onOpenImportModal}
              title="Import CSV, JSON, or Excel dataset"
            >
              <span>📥</span>
              <span>Upload Data</span>
            </button>
          )}
        </div>
      </div>

      <div className={styles.contentBody}>
        <p className={styles.tableDesc}>{currentSchema?.description}</p>

        <div className={styles.columnsGrid}>
          {currentSchema?.columns?.map((col) => (
            <div key={col.name} className={styles.colItem}>
              <div className={styles.colTop}>
                <span className={styles.colName}>{col.name}</span>
                <div className={styles.colMeta}>
                  {col.isPk && <span className={styles.badgePk}>PK</span>}
                  {col.isFk && <span className={styles.badgeFk}>FK</span>}
                  <span className={styles.colType}>{col.type}</span>
                </div>
              </div>
              <p className={styles.colDesc}>{col.desc}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.previewToggle}
          onClick={() => setShowDataPreview((v) => !v)}
        >
          <span>{showDataPreview ? '▼ Hide' : '▶ Preview'} Raw Data</span>
          <span>({currentRecords.length} records)</span>
        </button>

        {showDataPreview && (
          <div className={styles.previewScroll}>
            <table className={styles.rawTable}>
              <thead>
                <tr>
                  {currentSchema?.columns?.map((c) => (
                    <th key={c.name}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={Math.max(currentSchema?.columns?.length || 1, 1)}
                      style={{ textAlign: 'center', opacity: 0.6, padding: '1.25rem' }}
                    >
                      No records in this table yet. Use INSERT INTO to add rows.
                    </td>
                  </tr>
                ) : (
                  currentRecords.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {currentSchema?.columns?.map((c) => (
                        <td key={c.name}>
                          {typeof row[c.name] === 'number' && c.name.includes('budget')
                            ? `₹${row[c.name].toLocaleString('en-IN')}`
                            : typeof row[c.name] === 'number' && c.name.includes('cost')
                            ? `₹${row[c.name].toLocaleString('en-IN')}`
                            : typeof row[c.name] === 'number' && c.name.includes('wage')
                            ? `₹${row[c.name].toLocaleString('en-IN')}`
                            : String(row[c.name] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

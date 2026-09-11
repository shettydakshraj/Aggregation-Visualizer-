import { useState } from 'react';
import styles from './SchemaViewer.module.css';

export default function SchemaViewer({ schemas = [], rawData = {} }) {
  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [showDataPreview, setShowDataPreview] = useState(false);

  const currentSchema = schemas[activeTableIndex] || schemas[0];
  const currentRecords = rawData[currentSchema?.table] || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.titleIcon}>◫</span>
          <h2 className={styles.title}>Schema Explorer</h2>
          <span className={styles.tableCount}>{schemas.length} Tables</span>
        </div>

        <div className={styles.tableTabs}>
          {schemas.map((s, idx) => (
            <button
              key={s.table}
              type="button"
              className={`${styles.tableTabBtn} ${activeTableIndex === idx ? styles.tableTabActive : ''}`}
              onClick={() => setActiveTableIndex(idx)}
            >
              {s.table}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.contentBody}>
        <p className={styles.tableDesc}>{currentSchema?.description}</p>

        <div className={styles.columnsGrid}>
          {currentSchema?.columns.map((col) => (
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
                  {currentSchema?.columns.map((c) => (
                    <th key={c.name}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {currentSchema?.columns.map((c) => (
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

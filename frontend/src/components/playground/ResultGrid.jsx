import { useState, useMemo } from 'react';
import styles from './ResultGrid.module.css';

export default function ResultGrid({ results = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  const columns = useMemo(() => {
    if (!results || results.length === 0) return [];
    return Object.keys(results[0]);
  }, [results]);

  // Filtering & Sorting
  const processedRows = useMemo(() => {
    if (!results || results.length === 0) return [];

    let filtered = results;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val ?? '').toLowerCase().includes(q)
        )
      );
    }

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        return sortDirection === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return filtered;
  }, [results, searchTerm, sortKey, sortDirection]);

  const handleHeaderClick = (col) => {
    if (sortKey === col) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(col);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    if (!processedRows.length) return;
    const headerLine = columns.join(',');
    const rowLines = processedRows.map((row) =>
      columns
        .map((c) => {
          const val = row[c] ?? '';
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headerLine, ...rowLines].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'query_result.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to format currency numbers in ₹
  const formatCell = (colName, value) => {
    if (value === null || value === undefined) {
      return <span style={{ opacity: 0.5, fontStyle: 'italic' }}>NULL</span>;
    }
    const lowerCol = colName.toLowerCase();
    const isCurrency =
      lowerCol.includes('inr') ||
      lowerCol.includes('budget') ||
      lowerCol.includes('cost') ||
      lowerCol.includes('wage') ||
      lowerCol.includes('payroll') ||
      lowerCol.includes('spent') ||
      lowerCol.includes('investment');

    if (typeof value === 'number' && isCurrency) {
      return `₹${value.toLocaleString('en-IN')}`;
    }

    return String(value);
  };

  // Detect subtotal / grand total row
  const getRowClassification = (row) => {
    const rowStr = JSON.stringify(row).toUpperCase();
    if (rowStr.includes('GRAND TOTAL') || rowStr.includes('ALL ZONES') || (rowStr.includes('ALL') && rowStr.includes('STATUSES') && rowStr.includes('CATEGORIES'))) {
      return 'grand-total';
    }
    if (rowStr.includes('SUBTOTAL') || rowStr.includes('NULL') || rowStr.includes('ALL')) {
      return 'subtotal';
    }
    return 'normal';
  };

  if (!results || results.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <span className={styles.title}>Query Output</span>
            <span className={styles.countTag}>0 rows</span>
          </div>
        </div>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>◫</span>
          <h3 className={styles.emptyTitle}>Ready for Execution</h3>
          <p className={styles.emptyDesc}>
            Press <strong>Execute Query</strong> (or Ctrl+Enter) in the editor above to execute your SQL query and inspect the tabular output here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>Query Output</span>
          <span className={styles.countTag}>
            {processedRows.length} {processedRows.length === 1 ? 'row' : 'rows'}
          </span>
        </div>

        <div className={styles.controls}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search within results..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className={styles.exportBtn}
            onClick={handleExportCSV}
            title="Download results as CSV"
          >
            <span>📥 Export CSV</span>
          </button>
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col;
                return (
                  <th key={col} onClick={() => handleHeaderClick(col)}>
                    <div className={styles.thContent}>
                      <span>{col}</span>
                      {isSorted && (
                        <span className={styles.sortIcon}>
                          {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {processedRows.map((row, rIdx) => {
              const classification = getRowClassification(row);
              const rowClass =
                classification === 'grand-total'
                  ? styles.grandTotalRow
                  : classification === 'subtotal'
                  ? styles.subtotalRow
                  : '';

              return (
                <tr key={rIdx} className={rowClass}>
                  {columns.map((col) => (
                    <td key={col}>
                      {formatCell(col, row[col])}
                      {classification === 'grand-total' && col === columns[0] && (
                        <span className={styles.badgeGrandTotal}>GRAND TOTAL</span>
                      )}
                      {classification === 'subtotal' && col === columns[0] && (
                        <span className={styles.badgeSubtotal}>SUBTOTAL</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

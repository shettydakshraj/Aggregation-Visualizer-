import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import styles from './DatasetImportModal.module.css';

const SAMPLE_TABLE_NAMES = ['projects', 'materials', 'workforce'];

// Sanitize filename to a valid SQL identifier (lowercase, letters, numbers, underscores)
function sanitizeTableName(filename) {
  if (!filename) return 'imported_table';
  // Strip file extension
  const base = filename.replace(/\.[^/.]+$/, '');
  // Replace spaces, hyphens, and non-alphanumeric chars with underscores
  let cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '');
  // Ensure it starts with a letter
  if (!/^[a-z]/.test(cleaned)) {
    cleaned = 'tbl_' + cleaned;
  }
  return cleaned || 'imported_dataset';
}

export default function DatasetImportModal({
  isOpen,
  onClose,
  existingTables = [],
  onRegisterTable
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableName, setTableName] = useState('');
  const [previewRows, setPreviewRows] = useState([]);
  const [detectedColumns, setDetectedColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [worksheets, setWorksheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [workbookRef, setWorkbookRef] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [warningMsg, setWarningMsg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleResetDialog = () => {
    setSelectedFile(null);
    setTableName('');
    setPreviewRows([]);
    setDetectedColumns([]);
    setTotalRows(0);
    setWorksheets([]);
    setSelectedSheet('');
    setWorkbookRef(null);
    setErrorMsg(null);
    setWarningMsg(null);
  };

  const handleClose = () => {
    handleResetDialog();
    onClose();
  };

  // Parse JSON file content
  const parseJsonFile = (text) => {
    try {
      const parsed = JSON.parse(text);
      let rows = [];
      if (Array.isArray(parsed)) {
        rows = parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        // Find first array property if nested
        const arrKey = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
        if (arrKey) {
          rows = parsed[arrKey];
        } else {
          rows = [parsed];
        }
      }

      if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error('JSON file must contain an array of data objects with at least one record.');
      }

      // Infer column headers from first 100 rows
      const colSet = new Set();
      rows.slice(0, 100).forEach((r) => {
        if (typeof r === 'object' && r !== null) {
          Object.keys(r).forEach((k) => colSet.add(k));
        }
      });
      const columns = Array.from(colSet);
      if (columns.length === 0) {
        throw new Error('Could not detect any column fields in the uploaded JSON objects.');
      }

      return { rows, columns };
    } catch (err) {
      throw new Error(`Invalid JSON format: ${err.message}`);
    }
  };

  // Parse Excel / CSV using SheetJS
  const parseSpreadsheetData = (data, isBinary = true) => {
    try {
      const wb = isBinary
        ? XLSX.read(data, { type: 'array' })
        : XLSX.read(data, { type: 'string' });

      if (!wb || !wb.SheetNames || wb.SheetNames.length === 0) {
        throw new Error('Spreadsheet contains no worksheets.');
      }

      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: null });

      if (!rows || rows.length === 0) {
        throw new Error('The selected spreadsheet or worksheet contains zero data rows.');
      }

      const columns = Object.keys(rows[0] || {});
      if (columns.length === 0) {
        throw new Error('No column header row found in the uploaded file.');
      }

      return {
        rows,
        columns,
        workbook: wb,
        sheets: wb.SheetNames,
        activeSheet: sheetName
      };
    } catch (err) {
      throw new Error(`File parsing error: ${err.message}`);
    }
  };

  // Handle Sheet change for multi-sheet Excel files
  const handleSheetChange = (sheetName) => {
    if (!workbookRef) return;
    try {
      setSelectedSheet(sheetName);
      const ws = workbookRef.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: null });
      if (rows && rows.length > 0) {
        setTotalRows(rows.length);
        setPreviewRows(rows.slice(0, 5));
        setDetectedColumns(Object.keys(rows[0]));
        setErrorMsg(null);
      } else {
        setErrorMsg(`Worksheet "${sheetName}" is empty.`);
      }
    } catch (err) {
      setErrorMsg(`Failed to read sheet: ${err.message}`);
    }
  };

  // Main file change processor
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setWarningMsg(null);
    setIsProcessing(true);
    setSelectedFile(file);

    const derivedName = sanitizeTableName(file.name);
    setTableName(derivedName);

    const ext = file.name.split('.').pop()?.toLowerCase();

    try {
      if (file.size === 0) {
        throw new Error('The uploaded file is empty (0 bytes).');
      }

      if (file.size > 25 * 1024 * 1024) {
        setWarningMsg('Large file detected (>25MB). Processing may take a few seconds in your browser.');
      }

      if (ext === 'json') {
        const text = await file.text();
        const { rows, columns } = parseJsonFile(text);
        setTotalRows(rows.length);
        setPreviewRows(rows.slice(0, 5));
        setDetectedColumns(columns);
        setWorksheets([]);
        setWorkbookRef(null);
      } else if (ext === 'csv') {
        const text = await file.text();
        const { rows, columns } = parseSpreadsheetData(text, false);
        setTotalRows(rows.length);
        setPreviewRows(rows.slice(0, 5));
        setDetectedColumns(columns);
        setWorksheets([]);
        setWorkbookRef(null);
      } else if (ext === 'xlsx' || ext === 'xls') {
        const buffer = await file.arrayBuffer();
        const { rows, columns, workbook, sheets, activeSheet } = parseSpreadsheetData(buffer, true);
        setTotalRows(rows.length);
        setPreviewRows(rows.slice(0, 5));
        setDetectedColumns(columns);
        setWorkbookRef(workbook);
        setWorksheets(sheets);
        setSelectedSheet(activeSheet);
      } else {
        throw new Error(`Unsupported file type (.${ext}). Supported formats: .csv, .json, .xlsx, .xls`);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to parse uploaded dataset.');
      setPreviewRows([]);
      setDetectedColumns([]);
      setTotalRows(0);
    } finally {
      setIsProcessing(false);
    }
  };

  // Commit Import into AlaSQL
  const handleConfirmImport = async () => {
    const cleanName = sanitizeTableName(tableName);
    if (!cleanName) {
      setErrorMsg('Please specify a valid SQL table name.');
      return;
    }

    if (SAMPLE_TABLE_NAMES.includes(cleanName.toLowerCase())) {
      setErrorMsg(`Cannot overwrite system sample table "${cleanName}". Please choose a different table name (e.g., custom_${cleanName}).`);
      return;
    }

    // Check if table already exists in user database
    const alreadyExists = existingTables.some(
      (t) => t.toLowerCase() === cleanName.toLowerCase()
    );

    if (alreadyExists) {
      const confirmOverwrite = window.confirm(
        `Table "${cleanName}" already exists. Do you want to replace its records with this new dataset?`
      );
      if (!confirmOverwrite) return;
    }

    try {
      setIsProcessing(true);
      let allRows = [];

      const ext = selectedFile.name.split('.').pop()?.toLowerCase();
      if (ext === 'json') {
        const text = await selectedFile.text();
        const parsed = parseJsonFile(text);
        allRows = parsed.rows;
      } else if (ext === 'csv') {
        const text = await selectedFile.text();
        const parsed = parseSpreadsheetData(text, false);
        allRows = parsed.rows;
      } else if (ext === 'xlsx' || ext === 'xls') {
        if (workbookRef && selectedSheet) {
          const ws = workbookRef.Sheets[selectedSheet];
          allRows = XLSX.utils.sheet_to_json(ws, { defval: null });
        } else {
          const buffer = await selectedFile.arrayBuffer();
          const parsed = parseSpreadsheetData(buffer, true);
          allRows = parsed.rows;
        }
      }

      if (!allRows || allRows.length === 0) {
        throw new Error('No rows found to import.');
      }

      // Delegate registration to parent (registers in AlaSQL labdb)
      onRegisterTable(cleanName, allRows, detectedColumns);
      handleClose();
    } catch (err) {
      setErrorMsg(`Import failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerTitleArea}>
            <span className={styles.badge}>Live SQL Lab</span>
            <h3 className={styles.title}>Import Dataset into Playground</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Close dialog">
            ✕
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.desc}>
            Upload a local <strong>CSV</strong>, <strong>JSON</strong>, or <strong>Excel (.xlsx / .xls)</strong> file.
            The data will be registered client-side directly into your in-browser AlaSQL database for immediate querying with
            <code>GROUP BY</code>, <code>ROLLUP</code>, and <code>CUBE</code>.
          </p>

          {/* Upload Input Area */}
          <div className={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json,.xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <span className={styles.uploadIcon}>📁</span>
            <span className={styles.uploadPrompt}>
              {selectedFile ? (
                <>Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)</>
              ) : (
                <>Click or drag file to upload (.csv, .json, .xlsx, .xls)</>
              )}
            </span>
            <span className={styles.formatPills}>
              <span className={styles.pill}>CSV</span>
              <span className={styles.pill}>JSON</span>
              <span className={styles.pill}>Excel .xlsx</span>
              <span className={styles.pill}>Excel .xls</span>
            </span>
          </div>

          {/* Worksheet selector if Excel has multiple sheets */}
          {worksheets.length > 1 && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Worksheet:</label>
              <select
                className={styles.selectInput}
                value={selectedSheet}
                onChange={(e) => handleSheetChange(e.target.value)}
              >
                {worksheets.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Table Name configuration */}
          {totalRows > 0 && (
            <div className={styles.formGroup}>
              <label className={styles.label}>SQL Table Name:</label>
              <div className={styles.tableNameRow}>
                <input
                  type="text"
                  className={styles.textInput}
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g. sales, customer_orders"
                />
                <span className={styles.tableNameHint}>
                  Query as: <code>SELECT * FROM {sanitizeTableName(tableName)};</code>
                </span>
              </div>
            </div>
          )}

          {/* Warnings & Errors */}
          {warningMsg && <div className={styles.warningBox}>⚠️ {warningMsg}</div>}
          {errorMsg && <div className={styles.errorBox}>❌ {errorMsg}</div>}

          {/* Data Preview */}
          {previewRows.length > 0 && (
            <div className={styles.previewSection}>
              <div className={styles.previewHeader}>
                <span>Detected Schema &amp; Preview</span>
                <span className={styles.rowCountBadge}>
                  {totalRows} records · {detectedColumns.length} columns
                </span>
              </div>

              <div className={styles.previewTableScroll}>
                <table className={styles.previewTable}>
                  <thead>
                    <tr>
                      {detectedColumns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {detectedColumns.map((col) => (
                          <td key={col}>{row[col] === null || row[col] === undefined ? 'NULL' : String(row[col])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <span className={styles.previewNotice}>Showing first 5 rows preview</span>
            </div>
          )}
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.importBtn}
            onClick={handleConfirmImport}
            disabled={totalRows === 0 || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Register & Query (${totalRows} Rows)`}
          </button>
        </footer>
      </div>
    </div>
  );
}

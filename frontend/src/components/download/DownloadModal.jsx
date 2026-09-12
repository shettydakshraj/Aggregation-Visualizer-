import { useState } from 'react';
import {
  getDefaultReportData,
  downloadTextFile,
  downloadDocFile,
  openPdfPrintReport,
} from '../../services/reportGenerator';
import styles from './DownloadModal.module.css';

export default function DownloadModal({ isOpen, onClose, reportData = null }) {
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const activeData = reportData || getDefaultReportData();

  if (!isOpen) return null;

  const handlePdf = () => {
    openPdfPrintReport(activeData);
    setDownloadSuccess('PDF printable preview opened successfully.');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleDoc = () => {
    downloadDocFile(activeData, 'sql_aggregation_academic_report.doc');
    setDownloadSuccess('Word Document (.doc) downloaded successfully.');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleText = () => {
    downloadTextFile(activeData, 'sql_aggregation_academic_report.txt');
    setDownloadSuccess('Plain Text (.txt) report downloaded successfully.');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div>
            <span className={styles.badge}>Academic Export Engine</span>
            <h2 className={styles.title}>Download Evaluation Report</h2>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close dialog">
            ✕
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.lead}>
            Generate and export an official DBMS academic report containing your active user inputs,
            engine processing steps, intermediate grouping levels, output tables, and ASCII aggregation lattice figures.
          </p>

          <div className={styles.metadataCard}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Current Dataset:</span>
              <span className={styles.metaVal}>{activeData.datasetName}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Active Query:</span>
              <span className={styles.metaVal}>{activeData.queryType}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Advisor:</span>
              <span className={styles.metaVal}>{activeData.facultyAdvisor}</span>
            </div>
          </div>

          <div className={styles.sectionsList}>
            <span className={styles.sectionsHeader}>Verified Report Contents Included:</span>
            <div className={styles.checklist}>
              <div className={styles.checkItem}>✓ 1. User Inputs &amp; Scanned Records</div>
              <div className={styles.checkItem}>✓ 2. Engine Lexical &amp; Hash Partitioning Steps</div>
              <div className={styles.checkItem}>✓ 3. Intermediate Grouping Levels (L0, L1, L2)</div>
              <div className={styles.checkItem}>✓ 4. Final Aggregation Output Grid</div>
              <div className={styles.checkItem}>✓ 5. Hierarchy Lattice Figure &amp; Latency Metrics</div>
            </div>
          </div>

          {downloadSuccess && (
            <div className={styles.successAlert} role="status">
              ✓ {downloadSuccess}
            </div>
          )}

          <div className={styles.actionGrid}>
            <button onClick={handlePdf} className={`${styles.formatBtn} ${styles.pdfBtn}`}>
              <span className={styles.btnIcon}>📄</span>
              <span className={styles.btnTitle}>PDF Document</span>
              <span className={styles.btnDesc}>Print-ready formatted academic sheet</span>
            </button>

            <button onClick={handleDoc} className={`${styles.formatBtn} ${styles.docBtn}`}>
              <span className={styles.btnIcon}>📝</span>
              <span className={styles.btnTitle}>Word Document</span>
              <span className={styles.btnDesc}>Editable .doc format with formatted tables</span>
            </button>

            <button onClick={handleText} className={`${styles.formatBtn} ${styles.txtBtn}`}>
              <span className={styles.btnIcon}>📋</span>
              <span className={styles.btnTitle}>Plain Text</span>
              <span className={styles.btnDesc}>Monospaced .txt file with ASCII lattice</span>
            </button>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerNotice}>
            Prepared for academic evaluation &middot; Dr. Swaminathan A
          </span>
          <button onClick={onClose} className={styles.doneBtn}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

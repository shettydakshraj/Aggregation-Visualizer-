import { useState, useEffect } from 'react';
import SiteFooter from '../components/layout/SiteFooter';
import {
  getDefaultReportData,
  downloadTextFile,
  downloadDocFile,
  openPdfPrintReport,
} from '../services/reportGenerator';
import styles from './DownloadPage.module.css';

export default function DownloadPage() {
  const [reportData, setReportData] = useState(() => getDefaultReportData());
  const [selectedTemplate, setSelectedTemplate] = useState('rollup');
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    document.title = 'Download Academic Report — SQL Aggregation Visualizer';
    window.scrollTo(0, 0);
  }, []);

  const switchReportPreset = (type) => {
    setSelectedTemplate(type);
    const base = getDefaultReportData();
    if (type === 'groupby') {
      base.queryType = 'GROUP BY Zonal Partitioning';
      base.sqlQuery = `SELECT 
    zone, 
    status, 
    COUNT(*) AS project_count, 
    SUM(budget) AS total_capital 
FROM projects 
GROUP BY zone, status;`;
      base.intermediateResults = [
        {
          level: 'Partition Stage 0 — Granular Buckets',
          rowsCount: 5,
          summary: 'Distinct categorical rows collapsed by unique (zone, status) pairs without subtotals.',
        },
      ];
      base.finalResults = base.finalResults.filter((r) => !r.row_type.includes('Subtotal') && !r.row_type.includes('Grand'));
      base.executionMetrics.rowCount = 5;
      base.executionMetrics.latencyMs = 1.6;
    } else if (type === 'cube') {
      base.queryType = 'CUBE Multidimensional Power Set';
      base.sqlQuery = `SELECT 
    zone, 
    status, 
    COUNT(*) AS project_count, 
    SUM(budget) AS total_capital 
FROM projects 
GROUP BY zone, status WITH CUBE;`;
      base.intermediateResults = [
        { level: 'Power Set Level 0 — (zone, status)', rowsCount: 5, summary: 'Granular base coordinate intersections.' },
        { level: 'Power Set Level 1A — (zone, ALL)', rowsCount: 3, summary: 'Zonal independent subtotals.' },
        { level: 'Power Set Level 1B — (ALL, status)', rowsCount: 3, summary: 'Status cross-sectional subtotals across all zones.' },
        { level: 'Power Set Level 2 — (ALL, ALL)', rowsCount: 1, summary: 'Hypercube apex grand total.' },
      ];
      base.executionMetrics.rowCount = 12;
      base.executionMetrics.latencyMs = 3.8;
    }
    setReportData(base);
    setStatusMessage(`Loaded ${type.toUpperCase()} report preset.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePdf = () => {
    openPdfPrintReport(reportData);
    setStatusMessage('Printable PDF report opened in a new tab.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDoc = () => {
    downloadDocFile(reportData, `sql_${selectedTemplate}_report.doc`);
    setStatusMessage('Word Document (.doc) downloaded.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleText = () => {
    downloadTextFile(reportData, `sql_${selectedTemplate}_report.txt`);
    setStatusMessage('Plain Text (.txt) report downloaded.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="label">Export &amp; Academic Verification</span>
            <h1 className={styles.heroTitle}>
              Download <span className={styles.gradientText}>Evaluation Report</span>
            </h1>
            <p className={styles.heroDesc}>
              Generate complete, verified project submission documentation containing user query inputs,
              engine execution stages, intermediate grouping states, output matrices, and aggregation lattice figures.
            </p>

            <div className={styles.downloadBar}>
              <button onClick={handlePdf} className={`${styles.actionBtn} ${styles.pdfBtn}`}>
                <span className={styles.btnIcon}>📄</span>
                <span>Download PDF</span>
              </button>

              <button onClick={handleDoc} className={`${styles.actionBtn} ${styles.docBtn}`}>
                <span className={styles.btnIcon}>📝</span>
                <span>Download Document (.doc)</span>
              </button>

              <button onClick={handleText} className={`${styles.actionBtn} ${styles.txtBtn}`}>
                <span className={styles.btnIcon}>📋</span>
                <span>Download Text (.txt)</span>
              </button>
            </div>

            {statusMessage && (
              <div className={styles.statusBar} role="status">
                ✓ {statusMessage}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          {/* Preset Selector */}
          <div className={styles.presetSelector}>
            <span className={styles.presetLabel}>Select Aggregation Report Template:</span>
            <div className={styles.presetButtons}>
              <button
                onClick={() => switchReportPreset('groupby')}
                className={`${styles.presetBtn} ${selectedTemplate === 'groupby' ? styles.presetActive : ''}`}
              >
                GROUP BY (Flat)
              </button>
              <button
                onClick={() => switchReportPreset('rollup')}
                className={`${styles.presetBtn} ${selectedTemplate === 'rollup' ? styles.presetActive : ''}`}
              >
                ROLLUP (Hierarchical)
              </button>
              <button
                onClick={() => switchReportPreset('cube')}
                className={`${styles.presetBtn} ${selectedTemplate === 'cube' ? styles.presetActive : ''}`}
              >
                CUBE (Multidimensional)
              </button>
            </div>
          </div>

          {/* Interactive Document Preview */}
          <article className={styles.reportPreview} aria-label="Report Preview Sheet">
            {/* Header / Title block */}
            <div className={styles.reportHeader}>
              <div className={styles.reportHeaderLeft}>
                <div className={styles.subMeta}>Academic DBMS Project Report</div>
                <h2 className={styles.reportTitle}>{reportData.title}</h2>
                <div className={styles.institutionInfo}>
                  {reportData.institution} &middot; {reportData.course}
                </div>
              </div>

              <div className={styles.reportHeaderRight}>
                <div className={styles.advisorBox}>
                  <span className={styles.advisorLabel}>Faculty Advisor</span>
                  <span className={styles.advisorName}>{reportData.facultyAdvisor}</span>
                </div>
                <div className={styles.timestampBadge}>{reportData.timestamp}</div>
              </div>
            </div>

            {/* Section 1: User Inputs */}
            <section className={styles.reportSection}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIndex}>Section 01</span>
                <h3 className={styles.sectionHeading}>User Inputs &amp; Execution Parameters</h3>
              </div>

              <div className={styles.inputsGrid}>
                <div className={styles.inputItem}>
                  <span className={styles.inputLabel}>Target Dataset:</span>
                  <span className={styles.inputVal}>{reportData.datasetName}</span>
                </div>
                <div className={styles.inputItem}>
                  <span className={styles.inputLabel}>Grouping Columns:</span>
                  <span className={styles.inputVal}>{reportData.userInputs.groupingColumns.join(', ')}</span>
                </div>
                <div className={styles.inputItem}>
                  <span className={styles.inputLabel}>Aggregation Metrics:</span>
                  <span className={styles.inputVal}>{reportData.userInputs.aggregateFunctions.join(', ')}</span>
                </div>
                <div className={styles.inputItem}>
                  <span className={styles.inputLabel}>Input Records Scanned:</span>
                  <span className={styles.inputVal}>{reportData.userInputs.totalInputRows} rows</span>
                </div>
              </div>

              <div className={styles.sqlCodeBox}>
                <div className={styles.sqlBoxHeader}>Executed SQL Statement</div>
                <pre className={styles.sqlPre}>
                  <code>{reportData.sqlQuery}</code>
                </pre>
              </div>
            </section>

            {/* Section 2: Processing Steps */}
            <section className={styles.reportSection}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIndex}>Section 02</span>
                <h3 className={styles.sectionHeading}>Engine Processing Pipeline</h3>
              </div>

              <div className={styles.stepsGrid}>
                {reportData.processingSteps.map((step) => (
                  <div key={step.step} className={styles.stepCard}>
                    <div className={styles.stepNum}>{step.step}</div>
                    <div className={styles.stepBody}>
                      <h4 className={styles.stepTitle}>{step.name}</h4>
                      <p className={styles.stepDetail}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Intermediate Results */}
            <section className={styles.reportSection}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIndex}>Section 03</span>
                <h3 className={styles.sectionHeading}>Intermediate Results &amp; Grouping Levels</h3>
              </div>

              <div className={styles.intermediateList}>
                {reportData.intermediateResults.map((ir, idx) => (
                  <div key={idx} className={styles.intermediateItem}>
                    <div className={styles.irHeader}>
                      <span className={styles.irLevel}>{ir.level}</span>
                      <span className={styles.irCount}>{ir.rowsCount} records produced</span>
                    </div>
                    <p className={styles.irSummary}>{ir.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Final Output */}
            <section className={styles.reportSection}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIndex}>Section 04</span>
                <h3 className={styles.sectionHeading}>Final Aggregation Output Matrix</h3>
              </div>

              <div className={styles.metricsBar}>
                <div className={styles.metric}>
                  <span>Execution Latency:</span> <strong>{reportData.executionMetrics.latencyMs} ms</strong>
                </div>
                <div className={styles.metric}>
                  <span>Total Rows Emitted:</span> <strong>{reportData.executionMetrics.rowCount}</strong>
                </div>
                <div className={styles.metric}>
                  <span>Analytical Engine:</span> <strong>{reportData.executionMetrics.engine}</strong>
                </div>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Project Count</th>
                      <th style={{ textAlign: 'right' }}>Total Capital</th>
                      <th>Classification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.finalResults.map((row, rIdx) => {
                      const isGrand = row.row_type.includes('Grand');
                      const isSubtotal = row.row_type.includes('Subtotal');
                      return (
                        <tr
                          key={rIdx}
                          className={`${isGrand ? styles.grandRow : isSubtotal ? styles.subtotalRow : ''}`}
                        >
                          <td>{row.zone}</td>
                          <td>{row.status}</td>
                          <td style={{ textAlign: 'right' }}>{row.project_count}</td>
                          <td style={{ textAlign: 'right' }}>{row.total_capital}</td>
                          <td>
                            <span
                              className={`${styles.typeBadge} ${
                                isGrand ? styles.typeGrand : isSubtotal ? styles.typeSub : ''
                              }`}
                            >
                              {row.row_type}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5: Lattice Figures */}
            <section className={styles.reportSection}>
              <div className={styles.sectionTitleRow}>
                <span className={styles.sectionIndex}>Section 05</span>
                <h3 className={styles.sectionHeading}>Aggregation Lattice &amp; Structural Figure</h3>
              </div>

              <div className={styles.figureBox}>
                <pre className={styles.latticePre}>{reportData.latticeFigure}</pre>
              </div>
            </section>

            {/* Report Footer */}
            <div className={styles.previewFooter}>
              <div className={styles.footerNote}>
                Official Phase 2 Academic Submission &middot; Supervised by {reportData.facultyAdvisor}
              </div>
              <div className={styles.footerActions}>
                <button onClick={handlePdf} className={styles.inlineActionBtn}>
                  Export PDF
                </button>
                <button onClick={handleDoc} className={styles.inlineActionBtn}>
                  Export .DOC
                </button>
                <button onClick={handleText} className={styles.inlineActionBtn}>
                  Export .TXT
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

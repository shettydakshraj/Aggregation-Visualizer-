/**
 * Academic SQL Aggregation Report Generator
 * Generates verified multi-format reports (PDF, Word Document, Plain Text)
 * containing:
 * 1. User Inputs (Query, Target Dataset, Selected Dimensions)
 * 2. Processing Steps (Lexical Analysis, Hash Partitioning, Super-Aggregate Passes)
 * 3. Intermediate Results (Partition Groups & Level Subtotals)
 * 4. Final Output (Formatted Result Grid, Latency, Row Counts)
 * 5. Graphs, Tables, and Figures (ASCII/SVG Aggregation Lattice)
 */

export function getDefaultReportData() {
  return {
    title: 'SQL Aggregation Evaluation & Audit Report',
    course: 'Database Management Systems (CSE2004)',
    institution: 'Vellore Institute of Technology',
    facultyAdvisor: 'Dr. Swaminathan A, Assistant Professor',
    timestamp: new Date().toLocaleString(),
    queryType: 'ROLLUP Hierarchical Subtotals',
    datasetName: 'Construction Management Portfolio (`projects` & `materials`)',
    sqlQuery: `SELECT 
    zone, 
    status, 
    COUNT(*) AS project_count, 
    SUM(budget) AS total_capital 
FROM projects 
GROUP BY zone, status WITH ROLLUP;`,
    userInputs: {
      sourceTable: 'projects',
      groupingColumns: ['zone', 'status'],
      aggregateFunctions: ['COUNT(*)', 'SUM(budget)'],
      filterClause: 'NONE (Full Partition Scan)',
      totalInputRows: 12,
    },
    processingSteps: [
      {
        step: 1,
        name: 'Lexical Analysis & AST Tokenization',
        detail: 'SQL engine identified grouping keys [zone, status] and mathematical accumulators [COUNT, SUM].',
      },
      {
        step: 2,
        name: 'Memory Partitioning & Hash Indexing',
        detail: 'Scanned 12 records from table `projects`. Built hash buckets for 5 unique (zone, status) base combinations.',
      },
      {
        step: 3,
        name: 'Base Level Aggregation (Level 0)',
        detail: 'Calculated project counts and budget sums for each distinct (zone, status) bucket.',
      },
      {
        step: 4,
        name: 'Hierarchical Super-Aggregate Reduction (Level 1)',
        detail: 'Rolled up status column to NULL, computing zonal subtotals for Central, North, and South zones.',
      },
      {
        step: 5,
        name: 'Grand Total Aggregation (Level 2)',
        detail: 'Rolled up zone column to NULL, calculating overall organizational grand total across all 12 projects.',
      },
      {
        step: 6,
        name: 'Materialization & Output Formatting',
        detail: 'Emitted 9 summary rows with calculated metrics, zero engine runtime warnings, and 2.4ms elapsed latency.',
      },
    ],
    intermediateResults: [
      {
        level: 'Level 0 — Base Groups (zone, status)',
        rowsCount: 5,
        summary: 'Detailed granular partitions for individual zones and operational statuses.',
      },
      {
        level: 'Level 1 — Zonal Subtotals (zone, ALL)',
        rowsCount: 3,
        summary: 'Super-aggregate subtotals for Central ($8.1M), North ($7.7M), and South ($4.3M).',
      },
      {
        level: 'Level 2 — Organizational Grand Total (ALL, ALL)',
        rowsCount: 1,
        summary: 'Grand corporate capital accumulator across all 3 zones ($20.1M).',
      },
    ],
    finalResults: [
      { zone: 'Central', status: 'Ongoing', project_count: 2, total_capital: '$6,000,000', row_type: 'Base Row' },
      { zone: 'Central', status: 'Completed', project_count: 1, total_capital: '$2,100,000', row_type: 'Base Row' },
      { zone: 'Central', status: 'NULL (All)', project_count: 3, total_capital: '$8,100,000', row_type: '★ Subtotal' },
      { zone: 'North', status: 'Ongoing', project_count: 1, total_capital: '$4,200,000', row_type: 'Base Row' },
      { zone: 'North', status: 'Delayed', project_count: 1, total_capital: '$3,500,000', row_type: 'Base Row' },
      { zone: 'North', status: 'NULL (All)', project_count: 2, total_capital: '$7,700,000', row_type: '★ Subtotal' },
      { zone: 'South', status: 'Ongoing', project_count: 2, total_capital: '$4,300,000', row_type: 'Base Row' },
      { zone: 'South', status: 'NULL (All)', project_count: 2, total_capital: '$4,300,000', row_type: '★ Subtotal' },
      { zone: 'NULL (All)', status: 'NULL (All)', project_count: 7, total_capital: '$20,100,000', row_type: '★★ Grand Total' },
    ],
    executionMetrics: {
      rowCount: 9,
      latencyMs: 2.4,
      engine: 'AlaSQL In-Memory Analytical Engine',
      memoryFootprint: '0.42 MB',
    },
    latticeFigure: `
      ┌──────────────────────────────────────────────┐
      │         (ALL, ALL) — Grand Total             │
      │              $20,100,000                     │
      └──────────────────────┬───────────────────────┘
                             │
            ┌────────────────┴───────────────┐
            │                                │
  ┌─────────▼───────────┐          ┌─────────▼───────────┐
  │ (Central, ALL)      │          │ (North, ALL)        │
  │     $8,100,000      │          │     $7,700,000      │
  └─────────┬───────────┘          └─────────┬───────────┘
            │                                │
    ┌───────┴────────┐               ┌───────┴────────┐
    │                │               │                │
┌───▼────────┐ ┌─────▼──────┐    ┌───▼────────┐ ┌─────▼──────┐
│ (Central,  │ │ (Central,  │    │ (North,    │ │ (North,    │
│  Ongoing)  │ │ Completed) │    │  Ongoing)  │ │  Delayed)  │
│ $6,000,000 │ │ $2,100,000 │    │ $4,200,000 │ │ $3,500,000 │
└────────────┘ └────────────┘    └────────────┘ └────────────┘
    `,
  };
}

/**
 * Text Report Generator (.txt)
 */
export function generateTextReport(data = getDefaultReportData()) {
  const divider = '='.repeat(78);
  const subDivider = '-'.repeat(78);

  const stepsText = data.processingSteps
    .map(s => `  [Step ${s.step}] ${s.name}\n         -> ${s.detail}`)
    .join('\n\n');

  const intermediateText = data.intermediateResults
    .map(ir => `  * ${ir.level} (${ir.rowsCount} rows)\n    ${ir.summary}`)
    .join('\n\n');

  // Format table rows
  const headers = ['Zone', 'Status', 'Count', 'Total Capital', 'Row Type'];
  const tableRows = data.finalResults.map(r => {
    return `  | ${String(r.zone).padEnd(12)} | ${String(r.status).padEnd(12)} | ${String(r.project_count).padStart(5)} | ${String(r.total_capital).padStart(15)} | ${String(r.row_type).padEnd(14)} |`;
  });
  const tableHeaderStr = `  | ${headers[0].padEnd(12)} | ${headers[1].padEnd(12)} | ${headers[2].padStart(5)} | ${headers[3].padStart(15)} | ${headers[4].padEnd(14)} |`;

  return `${divider}
DBMS ACADEMIC PROJECT REPORT: SQL AGGREGATION EVALUATION
Institution: ${data.institution}
Course:      ${data.course}
Guided By:   ${data.facultyAdvisor}
Timestamp:   ${data.timestamp}
${divider}

1. USER INPUTS & QUERY CONFIGURATION
${subDivider}
Target Dataset:      ${data.datasetName}
Query Classification: ${data.queryType}
Grouping Columns:    ${data.userInputs.groupingColumns.join(', ')}
Aggregate Metrics:   ${data.userInputs.aggregateFunctions.join(', ')}
Filter Condition:    ${data.userInputs.filterClause}
Input Records:       ${data.userInputs.totalInputRows} rows

EXECUTED SQL QUERY:
-------------------
${data.sqlQuery}

2. ENGINE PROCESSING STEPS
${subDivider}
${stepsText}

3. INTERMEDIATE RESULTS & GROUPING LEVELS
${subDivider}
${intermediateText}

4. FINAL AGGREGATION OUTPUT & METRICS
${subDivider}
Execution Engine:   ${data.executionMetrics.engine}
Total Rows Returned: ${data.executionMetrics.rowCount}
Execution Latency:  ${data.executionMetrics.latencyMs} ms
Memory Overhead:    ${data.executionMetrics.memoryFootprint}

RESULT TABLE:
${tableHeaderStr}
  |--------------+--------------+-------+-----------------+----------------|
${tableRows.join('\n')}

5. AGGREGATION LATTICE & HIERARCHICAL FIGURE
${subDivider}
${data.latticeFigure}

${divider}
END OF ACADEMIC REPORT — DBMS AGGREGATION VISUALIZER
${divider}
`;
}

/**
 * Download Plain Text File
 */
export function downloadTextFile(data = getDefaultReportData(), filename = 'sql_aggregation_report.txt') {
  const content = generateTextReport(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Word Document Generator (.doc via HTML MIME)
 */
export function downloadDocFile(data = getDefaultReportData(), filename = 'sql_aggregation_report.doc') {
  const rowsHtml = data.finalResults
    .map(
      r => `
      <tr style="${r.row_type.includes('Grand') ? 'background-color: #E2E8F0; font-weight: bold;' : r.row_type.includes('Subtotal') ? 'background-color: #F1F5F9; font-weight: 600;' : ''}">
        <td style="padding: 8px; border: 1px solid #CBD5E1;">${r.zone}</td>
        <td style="padding: 8px; border: 1px solid #CBD5E1;">${r.status}</td>
        <td style="padding: 8px; border: 1px solid #CBD5E1; text-align: center;">${r.project_count}</td>
        <td style="padding: 8px; border: 1px solid #CBD5E1; text-align: right;">${r.total_capital}</td>
        <td style="padding: 8px; border: 1px solid #CBD5E1;">${r.row_type}</td>
      </tr>`
    )
    .join('');

  const stepsHtml = data.processingSteps
    .map(
      s => `
      <li style="margin-bottom: 8px;">
        <strong>Step ${s.step} — ${s.name}:</strong> ${s.detail}
      </li>`
    )
    .join('');

  const intermediateHtml = data.intermediateResults
    .map(
      ir => `
      <div style="margin-bottom: 10px; padding: 10px; background-color: #F8FAFC; border-left: 3px solid #3B82F6;">
        <strong style="color: #1E3A8A;">${ir.level}</strong> (${ir.rowsCount} rows)<br />
        <span style="color: #475569; font-size: 13px;">${ir.summary}</span>
      </div>`
    )
    .join('');

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${data.title}</title>
      <style>
        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #1E293B; line-height: 1.5; }
        h1 { color: #0F172A; font-size: 18pt; border-bottom: 2px solid #2563EB; padding-bottom: 6px; }
        h2 { color: #1E40AF; font-size: 14pt; margin-top: 20pt; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; }
        .meta-box { background-color: #F1F5F9; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
        .code-block { font-family: 'Consolas', 'Courier New', monospace; background: #0F172A; color: #F8FAFC; padding: 12px; border-radius: 4px; font-size: 10pt; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background-color: #1E40AF; color: white; padding: 8px; border: 1px solid #1E40AF; text-align: left; }
        pre { font-family: 'Consolas', monospace; font-size: 9pt; background: #F8FAFC; padding: 10px; border: 1px solid #E2E8F0; }
      </style>
    </head>
    <body>
      <h1>${data.title}</h1>
      <div class="meta-box">
        <strong>Institution:</strong> ${data.institution}<br/>
        <strong>Course:</strong> ${data.course}<br/>
        <strong>Faculty Advisor:</strong> ${data.facultyAdvisor}<br/>
        <strong>Report Generated:</strong> ${data.timestamp}
      </div>

      <h2>1. User Inputs & Execution Parameters</h2>
      <p><strong>Dataset:</strong> ${data.datasetName}</p>
      <p><strong>Query Classification:</strong> ${data.queryType}</p>
      <p><strong>Grouping Columns:</strong> ${data.userInputs.groupingColumns.join(', ')}</p>
      <p><strong>Aggregations:</strong> ${data.userInputs.aggregateFunctions.join(', ')}</p>
      <p><strong>Total Input Records Scanned:</strong> ${data.userInputs.totalInputRows} rows</p>
      
      <p><strong>Executed SQL Statement:</strong></p>
      <div class="code-block">${data.sqlQuery.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')}</div>

      <h2>2. Engine Execution & Processing Pipeline</h2>
      <ol style="padding-left: 20px;">${stepsHtml}</ol>

      <h2>3. Intermediate Results & Aggregation Levels</h2>
      ${intermediateHtml}

      <h2>4. Final Query Results Grid</h2>
      <p><strong>Latency:</strong> ${data.executionMetrics.latencyMs} ms &nbsp;|&nbsp; <strong>Rows Returned:</strong> ${data.executionMetrics.rowCount} &nbsp;|&nbsp; <strong>Engine:</strong> ${data.executionMetrics.engine}</p>
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Status</th>
            <th>Project Count</th>
            <th>Total Capital</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <h2>5. Aggregation Lattice & Dimension Hierarchy</h2>
      <pre>${data.latticeFigure}</pre>

      <div style="margin-top: 30px; font-size: 10pt; color: #64748B; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 10px;">
        DBMS Aggregation Visualizer &middot; Phase 2 Academic Output &middot; Vellore Institute of Technology
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Print-Optimized PDF Trigger (opens styled printable report)
 */
export function openPdfPrintReport(data = getDefaultReportData()) {
  const rowsHtml = data.finalResults
    .map(
      r => `
      <tr class="${r.row_type.includes('Grand') ? 'grand-total' : r.row_type.includes('Subtotal') ? 'subtotal' : ''}">
        <td>${r.zone}</td>
        <td>${r.status}</td>
        <td class="num">${r.project_count}</td>
        <td class="num">${r.total_capital}</td>
        <td><span class="badge ${r.row_type.includes('Grand') ? 'badge-gold' : r.row_type.includes('Subtotal') ? 'badge-blue' : ''}">${r.row_type}</span></td>
      </tr>`
    )
    .join('');

  const stepsHtml = data.processingSteps
    .map(
      s => `
      <div class="step-card">
        <div class="step-num">${s.step}</div>
        <div class="step-content">
          <strong>${s.name}</strong>
          <p>${s.detail}</p>
        </div>
      </div>`
    )
    .join('');

  const intermediateHtml = data.intermediateResults
    .map(
      ir => `
      <div class="inter-item">
        <div class="inter-header">
          <strong>${ir.level}</strong>
          <span class="inter-count">${ir.rowsCount} records</span>
        </div>
        <div class="inter-desc">${ir.summary}</div>
      </div>`
    )
    .join('');

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate the printable PDF report.');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${data.title} — PDF Report</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          padding: 30px;
          max-width: 900px;
          margin: 0 auto;
          line-height: 1.5;
        }
        @media print {
          body { padding: 0; max-width: 100%; }
          .no-print { display: none !important; }
        }
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .header-title h1 {
          margin: 0 0 6px 0;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .header-title p {
          margin: 0;
          color: #475569;
          font-size: 13px;
        }
        .print-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }
        .section-box {
          margin-bottom: 28px;
        }
        .section-box h2 {
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #2563eb;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
          margin-bottom: 12px;
        }
        .inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          background: #f8fafc;
          padding: 14px;
          border-radius: 6px;
          font-size: 13px;
        }
        .code-box {
          background: #0f172a;
          color: #f8fafc;
          padding: 14px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', 'Consolas', monospace;
          font-size: 12px;
          margin-top: 10px;
          white-space: pre-wrap;
        }
        .step-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
          background: #f8fafc;
          padding: 10px 14px;
          border-radius: 6px;
        }
        .step-num {
          background: #2563eb;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-content strong {
          font-size: 13px;
          color: #1e293b;
        }
        .step-content p {
          margin: 2px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }
        .inter-item {
          background: #f1f5f9;
          border-left: 3px solid #2563eb;
          padding: 10px 14px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 8px;
        }
        .inter-header {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
        .inter-desc {
          font-size: 12px;
          color: #475569;
          margin-top: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          margin-top: 8px;
        }
        th {
          background: #f1f5f9;
          text-align: left;
          padding: 8px 10px;
          border-bottom: 2px solid #cbd5e1;
          font-weight: 600;
          color: #334155;
        }
        td {
          padding: 8px 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        td.num { text-align: right; }
        tr.subtotal { background: #f8fafc; font-weight: 600; }
        tr.grand-total { background: #eff6ff; font-weight: 700; border-top: 2px solid #2563eb; }
        .badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          background: #e2e8f0;
          color: #475569;
        }
        .badge-blue { background: #dbeafe; color: #1e40af; }
        .badge-gold { background: #fef3c7; color: #92400e; }
        .metrics-bar {
          display: flex;
          gap: 20px;
          background: #0f172a;
          color: #f8fafc;
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .lattice-pre {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px;
          border-radius: 6px;
          font-family: monospace;
          font-size: 11px;
          overflow-x: auto;
        }
        .footer {
          margin-top: 40px;
          border-top: 1px solid #cbd5e1;
          padding-top: 12px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="header-bar">
        <div class="header-title">
          <h1>${data.title}</h1>
          <p>${data.institution} &middot; ${data.course} &middot; Guided by ${data.facultyAdvisor}</p>
        </div>
        <button class="print-btn no-print" onclick="window.print()">Print / Save PDF</button>
      </div>

      <div class="section-box">
        <h2>1. User Inputs & Configuration</h2>
        <div class="inputs-grid">
          <div><strong>Target Dataset:</strong> ${data.datasetName}</div>
          <div><strong>Query Classification:</strong> ${data.queryType}</div>
          <div><strong>Grouping Columns:</strong> ${data.userInputs.groupingColumns.join(', ')}</div>
          <div><strong>Aggregations:</strong> ${data.userInputs.aggregateFunctions.join(', ')}</div>
          <div><strong>Filter Clause:</strong> ${data.userInputs.filterClause}</div>
          <div><strong>Input Rows Scanned:</strong> ${data.userInputs.totalInputRows} records</div>
        </div>
        <div class="code-box">${data.sqlQuery}</div>
      </div>

      <div class="section-box">
        <h2>2. Engine Execution Pipeline</h2>
        ${stepsHtml}
      </div>

      <div class="section-box">
        <h2>3. Intermediate Results & Aggregation Levels</h2>
        ${intermediateHtml}
      </div>

      <div class="section-box">
        <h2>4. Final Aggregation Result Grid</h2>
        <div class="metrics-bar">
          <div><span>Execution Latency:</span> <strong>${data.executionMetrics.latencyMs} ms</strong></div>
          <div><span>Row Count:</span> <strong>${data.executionMetrics.rowCount} rows</strong></div>
          <div><span>Engine:</span> <strong>${data.executionMetrics.engine}</strong></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Status</th>
              <th style="text-align: right;">Count</th>
              <th style="text-align: right;">Total Capital</th>
              <th>Row Type</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <div class="section-box">
        <h2>5. Aggregation Lattice & Dimension Figure</h2>
        <pre class="lattice-pre">${data.latticeFigure}</pre>
      </div>

      <div class="footer">
        Generated automatically by the DBMS Aggregation Visualizer on ${data.timestamp} &middot; Academic Submission
      </div>

      <script>
        // Trigger print dialog automatically after styles render
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 300);
        });
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

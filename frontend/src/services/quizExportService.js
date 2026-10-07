import { jsPDF } from 'jspdf';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType
} from 'docx';
import { formatTime } from '../components/quiz/quizUtils.js';

/**
 * Helper to trigger file download in the browser
 */
function triggerBrowserDownload(blob, filename) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generate a REAL valid binary PDF using jsPDF
 */
export function downloadQuizPdf(config, resultData, dateString) {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  });

  const pageHeight = 297;
  const leftMargin = 15;
  const contentWidth = 180;
  let y = 18;

  function checkPageBreak(neededHeight = 15) {
    if (y + neededHeight > pageHeight - 15) {
      doc.addPage();
      y = 15;
    }
  }

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(29, 78, 216); // Accent blue
  doc.text('SQL AGGREGATION QUIZ RESULT', leftMargin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Academic Examination Evaluation Report · Date/Time: ${dateString || new Date().toLocaleString()}`, leftMargin, y);
  y += 7;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(leftMargin, y, leftMargin + contentWidth, y);
  y += 6;

  // Configuration Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('QUIZ CONFIGURATION', leftMargin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  const topicsStr = config.selectedTopics.includes('All Topics')
    ? 'All Topics (Full Syllabus)'
    : config.selectedTopics.join(', ');

  const configLines = [
    `Topics: ${topicsStr}`,
    `Difficulty: ${config.difficulty}  |  Question Source: ${config.source}`,
    `Total Questions: ${resultData.total}  |  Time Limit: ${config.timePreset || config.customMinutes || 30} minutes`
  ];

  configLines.forEach((line) => {
    doc.text(line, leftMargin, y);
    y += 4.5;
  });
  y += 3;

  // RESULT SUMMARY
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('RESULT SUMMARY', leftMargin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const summaryMetrics = [
    `Score: ${resultData.score} / ${resultData.total} (${resultData.percentage}%)`,
    `Attempted: ${resultData.attempted}   |   Unanswered: ${resultData.unanswered}`,
    `Correct: ${resultData.correct}   |   Incorrect: ${resultData.incorrect}`,
    `Time Used: ${formatTime(resultData.timeUsedSeconds)}   |   Time Remaining: ${formatTime(resultData.timeRemainingSeconds)}`
  ];

  summaryMetrics.forEach((m) => {
    doc.text(m, leftMargin, y);
    y += 4.5;
  });
  y += 4;

  // TOPIC PERFORMANCE
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('TOPIC PERFORMANCE', leftMargin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  resultData.topicBreakdown.forEach((tb) => {
    checkPageBreak(6);
    doc.text(`• ${tb.topic}: ${tb.correct} / ${tb.total} Correct (Accuracy: ${tb.accuracy}%, Score: ${tb.scorePercentage}%)`, leftMargin + 2, y);
    y += 4.5;
  });
  y += 3;

  // DIFFICULTY PERFORMANCE
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('DIFFICULTY PERFORMANCE', leftMargin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  resultData.difficultyBreakdown.forEach((db) => {
    checkPageBreak(6);
    doc.text(`• ${db.difficulty}: ${db.correct} / ${db.total} Correct (${db.scorePercentage}%)`, leftMargin + 2, y);
    y += 4.5;
  });
  y += 5;

  // QUESTION REVIEW
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('QUESTION REVIEW', leftMargin, y);
  y += 6;

  const letters = ['A', 'B', 'C', 'D'];

  resultData.questionReviews.forEach((r, idx) => {
    checkPageBreak(35);
    doc.setDrawColor(226, 232, 240);
    doc.line(leftMargin, y, leftMargin + contentWidth, y);
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    const outcomeLabel = r.isCorrect ? '[ CORRECT: +1 ]' : r.isAnswered ? '[ INCORRECT: 0 ]' : '[ UNANSWERED: 0 ]';
    doc.setTextColor(r.isCorrect ? 16 : r.isAnswered ? 197 : 146, r.isCorrect ? 185 : r.isAnswered ? 34 : 96, r.isCorrect ? 129 : r.isAnswered ? 51 : 12);
    doc.text(`Question ${idx + 1} (${r.question.topic} · ${r.question.difficulty})  ${outcomeLabel}`, leftMargin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);

    // Split long question prompt into multiple lines
    const qLines = doc.splitTextToSize(r.question.question, contentWidth);
    doc.text(qLines, leftMargin, y);
    y += qLines.length * 4.2;

    const studentAns = r.isAnswered ? `${letters[r.selectedOption]}. ${r.options[r.selectedOption]}` : 'None (Unanswered)';
    const correctAns = `${letters[r.correctAnswer]}. ${r.options[r.correctAnswer]}`;

    doc.setFont('helvetica', 'bold');
    doc.text(`Your Answer: `, leftMargin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(studentAns, leftMargin + 24, y);
    y += 4.5;

    doc.setFont('helvetica', 'bold');
    doc.text(`Correct Answer: `, leftMargin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(correctAns, leftMargin + 26, y);
    y += 4.5;

    if (r.explanation) {
      doc.setFont('helvetica', 'italic');
      const expLines = doc.splitTextToSize(`Explanation: ${r.explanation}`, contentWidth);
      doc.text(expLines, leftMargin, y);
      y += expLines.length * 4;
    }
    y += 3;
  });

  const blob = doc.output('blob');
  triggerBrowserDownload(blob, `sql_aggregation_quiz_result_${Date.now()}.pdf`);
  return blob;
}

/**
 * Generate a REAL valid OOXML DOCX document using docx library
 */
export async function downloadQuizDocx(config, resultData, dateString) {
  const letters = ['A', 'B', 'C', 'D'];
  const topicsStr = config.selectedTopics.includes('All Topics')
    ? 'All Topics (Full Syllabus)'
    : config.selectedTopics.join(', ');

  const children = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'SQL AGGREGATION QUIZ RESULT',
          bold: true,
          size: 32,
          color: '1D4ED8'
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Academic Examination Report · Generated: ${dateString || new Date().toLocaleString()}`,
          size: 18,
          color: '64748B'
        })
      ]
    }),
    new Paragraph({ text: '' }),

    // Configuration
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: '1. QUIZ CONFIGURATION', bold: true, size: 24, color: '0F172A' })]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Topics: ', bold: true }),
        new TextRun(topicsStr)
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Difficulty: ', bold: true }),
        new TextRun(`${config.difficulty}   |   Question Source: ${config.source}`)
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Questions: ', bold: true }),
        new TextRun(`${resultData.total}   |   Time Limit: ${config.timePreset || config.customMinutes || 30} minutes`)
      ]
    }),
    new Paragraph({ text: '' }),

    // Summary
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: '2. RESULT SUMMARY', bold: true, size: 24, color: '0F172A' })]
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Metric', bold: true })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Value', bold: true })] })] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Score')] }),
            new TableCell({ children: [new Paragraph(`${resultData.score} / ${resultData.total} (${resultData.percentage}%)`)] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Attempted')] }),
            new TableCell({ children: [new Paragraph(String(resultData.attempted))] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Unanswered')] }),
            new TableCell({ children: [new Paragraph(String(resultData.unanswered))] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Correct')] }),
            new TableCell({ children: [new Paragraph(String(resultData.correct))] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Incorrect')] }),
            new TableCell({ children: [new Paragraph(String(resultData.incorrect))] })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Time Used')] }),
            new TableCell({ children: [new Paragraph(formatTime(resultData.timeUsedSeconds))] })
          ]
        })
      ]
    }),
    new Paragraph({ text: '' }),

    // Topic Performance
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: '3. TOPIC PERFORMANCE', bold: true, size: 24, color: '0F172A' })]
    })
  ];

  resultData.topicBreakdown.forEach((tb) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `• ${tb.topic}: `, bold: true }),
          new TextRun(`${tb.correct} / ${tb.total} Correct (Accuracy: ${tb.accuracy}%, Score: ${tb.scorePercentage}%)`)
        ]
      })
    );
  });

  children.push(new Paragraph({ text: '' }));
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: '4. DIFFICULTY PERFORMANCE', bold: true, size: 24, color: '0F172A' })]
    })
  );

  resultData.difficultyBreakdown.forEach((db) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `• ${db.difficulty}: `, bold: true }),
          new TextRun(`${db.correct} / ${db.total} Correct (${db.scorePercentage}%)`)
        ]
      })
    );
  });

  children.push(new Paragraph({ text: '' }));
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: '5. QUESTION REVIEW', bold: true, size: 24, color: '0F172A' })]
    })
  );

  resultData.questionReviews.forEach((r, idx) => {
    const outcome = r.isCorrect ? 'CORRECT (+1)' : r.isAnswered ? 'INCORRECT (0)' : 'UNANSWERED (0)';
    const studentAns = r.isAnswered ? `${letters[r.selectedOption]}. ${r.options[r.selectedOption]}` : 'None (Unanswered)';
    const correctAns = `${letters[r.correctAnswer]}. ${r.options[r.correctAnswer]}`;

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Question ${idx + 1} (${r.question.topic} · ${r.question.difficulty}) — `, bold: true }),
          new TextRun({ text: outcome, bold: true, color: r.isCorrect ? '16A34A' : 'DC2626' })
        ]
      }),
      new Paragraph({ children: [new TextRun(r.question.question)] }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Your Answer: ', bold: true }),
          new TextRun(studentAns)
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Correct Answer: ', bold: true }),
          new TextRun(correctAns)
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Explanation: ', italic: true }),
          new TextRun({ text: r.explanation || 'N/A', italic: true })
        ]
      }),
      new Paragraph({ text: '' })
    );
  });

  const doc = new Document({
    sections: [{ children }]
  });

  const blob = await Packer.toBlob(doc);
  triggerBrowserDownload(blob, `sql_aggregation_quiz_result_${Date.now()}.docx`);
  return blob;
}

/**
 * Generate formatted plain text report
 */
export function downloadQuizTxt(config, resultData, dateString) {
  const letters = ['A', 'B', 'C', 'D'];
  const topicsStr = config.selectedTopics.includes('All Topics')
    ? 'All Topics (Full Syllabus)'
    : config.selectedTopics.join(', ');

  let txt = `============================================================\n`;
  txt += `           SQL AGGREGATION QUIZ RESULT\n`;
  txt += `============================================================\n`;
  txt += `Date & Time:    ${dateString || new Date().toLocaleString()}\n`;
  txt += `Syllabus:       ${topicsStr}\n`;
  txt += `Difficulty:     ${config.difficulty}\n`;
  txt += `Questions:      ${resultData.total}\n`;
  txt += `Time Limit:     ${config.timePreset || config.customMinutes || 30} minutes\n\n`;

  txt += `------------------------------------------------------------\n`;
  txt += `RESULT SUMMARY\n`;
  txt += `------------------------------------------------------------\n`;
  txt += `Score:          ${resultData.score} / ${resultData.total}\n`;
  txt += `Percentage:     ${resultData.percentage}%\n`;
  txt += `Attempted:      ${resultData.attempted}\n`;
  txt += `Unanswered:     ${resultData.unanswered}\n`;
  txt += `Correct:        ${resultData.correct}\n`;
  txt += `Incorrect:      ${resultData.incorrect}\n`;
  txt += `Time Used:      ${formatTime(resultData.timeUsedSeconds)}\n`;
  txt += `Time Remaining: ${formatTime(resultData.timeRemainingSeconds)}\n\n`;

  txt += `------------------------------------------------------------\n`;
  txt += `TOPIC PERFORMANCE\n`;
  txt += `------------------------------------------------------------\n`;
  resultData.topicBreakdown.forEach((tb) => {
    txt += `* ${tb.topic.padEnd(25)} : ${tb.correct}/${tb.total} Correct (Accuracy: ${tb.accuracy}%, Score: ${tb.scorePercentage}%)\n`;
  });
  txt += `\n`;

  txt += `------------------------------------------------------------\n`;
  txt += `DIFFICULTY PERFORMANCE\n`;
  txt += `------------------------------------------------------------\n`;
  resultData.difficultyBreakdown.forEach((db) => {
    txt += `* ${db.difficulty.padEnd(15)} : ${db.correct}/${db.total} Correct (${db.scorePercentage}%)\n`;
  });
  txt += `\n`;

  txt += `============================================================\n`;
  txt += `QUESTION REVIEW\n`;
  txt += `============================================================\n\n`;

  resultData.questionReviews.forEach((r, idx) => {
    const outcome = r.isCorrect ? 'CORRECT (+1)' : r.isAnswered ? 'INCORRECT (0)' : 'UNANSWERED (0)';
    const studentAns = r.isAnswered ? `${letters[r.selectedOption]}. ${r.options[r.selectedOption]}` : 'None (Unanswered)';
    const correctAns = `${letters[r.correctAnswer]}. ${r.options[r.correctAnswer]}`;

    txt += `Question ${idx + 1} [${r.question.topic} | ${r.question.difficulty}] -> ${outcome}\n`;
    txt += `${r.question.question}\n`;
    if (r.question.sql) {
      txt += `SQL Snippet:\n${r.question.sql}\n`;
    }
    txt += `Your Answer:    ${studentAns}\n`;
    txt += `Correct Answer: ${correctAns}\n`;
    if (r.explanation) {
      txt += `Explanation:    ${r.explanation}\n`;
    }
    if (r.solution) {
      txt += `Solution:       ${r.solution}\n`;
    }
    txt += `\n------------------------------------------------------------\n\n`;
  });

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  triggerBrowserDownload(blob, `sql_aggregation_quiz_result_${Date.now()}.txt`);
  return txt;
}

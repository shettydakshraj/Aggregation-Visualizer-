/**
 * Utility for formatting question provenance / competitive examination source metadata.
 * ONLY verified real competitive exams (GATE, ISRO, UGC NET, NIELIT, BARC, TIFR) are formatted.
 * AI-generated questions, original practice questions, and any unverified questions return null (no source displayed).
 */

export function formatQuestionSource(q) {
  if (!q) return null;

  // Retrieve source metadata either from nested sourceInfo or direct fields
  const info = q.sourceInfo || (q.sourceType && q.institution ? q : null);
  if (!info) return null;

  // Only display verified competitive examination sources
  if (info.sourceType !== 'competitive') {
    return null;
  }

  // Institution must be specified
  const inst = info.institution ? String(info.institution).trim() : '';
  if (!inst) return null;

  const parts = [inst];
  if (info.exam && String(info.exam).trim()) {
    parts.push(String(info.exam).trim());
  }
  if (info.year && String(info.year).trim()) {
    parts.push(String(info.year).trim());
  }

  return parts.length > 0 ? parts.join(', ') : null;
}

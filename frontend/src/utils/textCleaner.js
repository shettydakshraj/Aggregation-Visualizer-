/**
 * Utility for sanitizing and cleaning question text.
 * Ensures questions displayed across Quiz, Practice, reviews, and exports
 * look professional, polished, and ready for students.
 *
 * Rules:
 * 1. Remove unwanted indexing and assessment labels from question text:
 *    - [Assessment Test Item #140], [Practice Lab #1], [Quiz Item #5], etc.
 *    - Question 1:, Question 12 -, Question #3., Problem 2:
 *    - Q. 12:, Q. 12, Q12:, Q.12., Q-12:
 *    - Copied list numbering like "1. " or "1) " at the start of question text
 * 2. Decode HTML entities: &#xA0;, &#x20;, &nbsp;, &amp;, &lt;, &gt;, &quot;, &#39;, &#160;, etc.
 * 3. Remove literal Markdown artifacts such as ** or __ without affecting single * in SQL (COUNT(*), SELECT *).
 * 4. Remove internal generator variant suffixes such as (Variant 1 - Cardinality Bounds).
 * 5. Strictly preserve legitimate numbers, SQL keywords, table names, column names, formulas,
 *    mathematical symbols, and all genuine question wording.
 */

export function cleanQuestionText(text) {
  if (!text || typeof text !== 'string') return '';

  let cleaned = text;

  // 1. Decode HTML entities
  cleaned = cleaned
    .replace(/&#xA0;|&#x20;|&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // 2. Remove literal Markdown bold/italic artifacts (**text** -> text, stray **)
  // Note: single * (as in COUNT(*) or SELECT *) is untouched.
  cleaned = cleaned
    .replace(/\*\*+(.*?)\*\*+/g, '$1')
    .replace(/__+(.*?)__+/g, '$1')
    .replace(/\*\*+/g, '');

  // 3. Remove unwanted question indexing and assessment label prefixes
  // e.g., [Assessment Test Item #140], [Practice Lab #1], [Test Item #12], [Quiz Item #3]
  cleaned = cleaned.replace(/^\s*\[\s*(?:Assessment(?:\s+Test)?(?:\s+Item)?|Practice(?:\s+Lab)?|Test(?:\s+Item)?|Quiz(?:\s+Item)?|Lab(?:\s+Item)?|Item|Problem|Question)\s*#?\s*\d+[^\]]*\]\s*/i, '');

  // e.g., Question 1:, Question 12 -, Question #3., Problem 2:
  cleaned = cleaned.replace(/^\s*(?:Question|Problem|Item)\s*#?\s*\d+\s*[:.-]?\s+/i, '');

  // e.g., Q. 12:, Q.12., Q 12 -, Q12:
  cleaned = cleaned.replace(/^\s*Q(?:uestion)?\.?\s*#?\s*\d+\s*[:.-]?\s+/i, '');

  // e.g., "1. " or "1) " at the start of question text (source copied numbering)
  cleaned = cleaned.replace(/^\s*\d+[\.\)]\s+/, '');

  // 4. Remove trailing internal assessment/generator variant suffixes
  // e.g., "(Variant 1 - Cardinality Bounds)", "(Variant 12)"
  cleaned = cleaned.replace(/\s*\((?:Variant\s+\d+|Assessment\s+Item\s*#?\d+)[^)]*\)\s*$/i, '');

  // 5. Clean up normalized whitespace
  cleaned = cleaned.replace(/[\u00A0\u2000-\u200B\u202F\u205F]/g, ' ');
  cleaned = cleaned.replace(/[ \t]+/g, ' ').trim();

  return cleaned;
}

/**
 * Sanitizes a question object, producing a clean copy with cleaned question text
 * and preserving all original metadata fields.
 */
export function sanitizeQuestion(q) {
  if (!q) return q;
  return {
    ...q,
    question: cleanQuestionText(q.question)
  };
}

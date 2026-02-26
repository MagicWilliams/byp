import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
];
const ALLOWED_ATTR = { a: ['href', 'target', 'rel'], '*': ['class'] };

/**
 * Sanitize HTML from WordPress/ACF for safe rendering.
 * Strips dangerous scripts/events while preserving safe tags (p, a, br, strong, em, etc.)
 */
export function sanitizeHtml(html: string | undefined | null): string {
  if (html == null || typeof html !== 'string') return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTR,
  });
}

/**
 * Decode HTML entities (e.g. &#8211; → –, &amp; → &) to plain text.
 * Use for captions and other WordPress content that may contain entities.
 */
export function decodeHtmlEntities(str: string | undefined | null): string {
  if (str == null || typeof str !== 'string') return '';
  return str
    .replace(/&#(\d+);/g, (_, num) =>
      String.fromCharCode(parseInt(num, 10))
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Strip all HTML tags, returning plain text. Use for headings/titles.
 */
export function stripHtml(html: string | undefined | null): string {
  if (html == null || typeof html !== 'string') return '';
  return sanitizeHtmlLib(html, { allowedTags: [], allowedAttributes: {} });
}

/**
 * Sanitize HTML while preserving paragraph breaks.
 * - If content already has <p> or <div> tags, sanitizes as-is (use [&_p]:mb-4 for spacing).
 * - If plain text, converts \n\n to <p> blocks and \n to <br> before sanitizing.
 */
export function sanitizeHtmlWithBreaks(
  html: string | undefined | null
): string {
  if (html == null || typeof html !== 'string') return '';
  const trimmed = html.trim();
  if (!trimmed) return '';

  // Already has block-level HTML - sanitize and return
  if (/<p[\s>]|<div[\s>]/.test(trimmed)) {
    return sanitizeHtmlLib(trimmed, {
      allowedTags: ALLOWED_TAGS,
      allowedAttributes: ALLOWED_ATTR,
    });
  }

  // Plain text: treat \n\n (or \r\n\r\n) as paragraph breaks, \n as line breaks
  const paragraphs = trimmed.split(/\r?\n\r?\n+/);
  const wrapped = paragraphs
    .map((p) => {
      const withBr = p.replace(/\r?\n/g, '<br>');
      return `<p>${withBr}</p>`;
    })
    .join('');

  return sanitizeHtmlLib(wrapped, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTR,
  });
}

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML from WordPress/ACF for safe rendering.
 * Strips dangerous scripts/events while preserving safe tags (p, a, br, strong, em, etc.)
 */
export function sanitizeHtml(html: string | undefined | null): string {
  if (html == null || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}

/**
 * Strip all HTML tags, returning plain text. Use for headings/titles.
 */
export function stripHtml(html: string | undefined | null): string {
  if (html == null || typeof html !== 'string') return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
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
    return DOMPurify.sanitize(trimmed, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
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

  return DOMPurify.sanitize(wrapped, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}

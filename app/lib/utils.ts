/**
 * Convert a slug to human-readable form (hyphens → spaces).
 * Used when processing tag slugs from URLs for search queries.
 */
export function deslugify(slug: string): string {
  return slug.trim().replace(/-/g, ' ');
}

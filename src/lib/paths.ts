/**
 * Safe URL builder that prepends Astro's base URL without double slashes.
 * External URLs, mailto:, tel:, and anchors are passed through unchanged.
 */
export function baseUrl(path: string): string {
  // Pass through external and special URLs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';

  // Already includes base? Pass through
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }

  // Normalize: ensure path starts with /
  const normalized = path.startsWith('/') ? path : '/' + path;

  // Concatenate without double slash
  if (base.endsWith('/')) {
    return base + normalized.slice(1);
  }
  return base + normalized;
}

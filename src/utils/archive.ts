const HIDDEN_ARCHIVE_SLUGS = new Set(["research-methods-confidence"]);
const ARCHIVE_CATCHALL_EXCLUDED_SLUGS = new Set(["timeline", ...HIDDEN_ARCHIVE_SLUGS]);

export function includeInArchiveCatchall(slug: string): boolean {
  return !ARCHIVE_CATCHALL_EXCLUDED_SLUGS.has(slug);
}

export function includeInArchiveIndex(slug: string): boolean {
  return !HIDDEN_ARCHIVE_SLUGS.has(slug);
}

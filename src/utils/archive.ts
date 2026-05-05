const HIDDEN_ARCHIVE_SLUGS = new Set(["research-methods-confidence"]);
const ARCHIVE_CATCHALL_EXCLUDED_SLUGS = new Set(["timeline", ...HIDDEN_ARCHIVE_SLUGS]);

export function includeInArchiveCatchall(id: string): boolean {
  return !ARCHIVE_CATCHALL_EXCLUDED_SLUGS.has(id);
}

export function includeInArchiveIndex(id: string): boolean {
  return !HIDDEN_ARCHIVE_SLUGS.has(id);
}

const MARKDOWN_EXTENSION = /\.md$/;

export function toContentSlug(id: string): string {
  return id.replace(MARKDOWN_EXTENSION, '');
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

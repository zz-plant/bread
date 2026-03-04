const MARKDOWN_EXTENSION = /\.md$/;
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" });

export function toContentSlug(id: string): string {
  return id.replace(MARKDOWN_EXTENSION, "");
}

export function formatDate(date: Date): string {
  return DATE_FORMATTER.format(date);
}

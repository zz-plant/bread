const MARKDOWN_EXTENSION = /\.md$/;
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { timeZone: "UTC" });

export function toContentSlug(id: string): string {
	return id.replace(MARKDOWN_EXTENSION, "");
}

export function formatDate(date: Date): string {
	return DATE_FORMATTER.format(date);
}

const BRAND = "BREAD";
const NAMES_BRAND = /\bBREAD\b/;

// "People" means nothing in a search result or browser tab, so titles that
// don't already name BREAD get it as a suffix.
export function toDocumentTitle(title: string): string {
	return NAMES_BRAND.test(title) ? title : `${title} · ${BRAND}`;
}

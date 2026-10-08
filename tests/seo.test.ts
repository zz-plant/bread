import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isSitemapPage, redirects } from "../astro.config.mjs";
import { toDocumentTitle } from "../src/utils/content";

const read = (path: string) =>
	readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const listFiles = (dir: string): string[] =>
	readdirSync(new URL(`../${dir}`, import.meta.url), {
		withFileTypes: true,
	}).flatMap((entry) =>
		entry.isDirectory()
			? listFiles(`${dir}/${entry.name}`)
			: [`${dir}/${entry.name}`],
	);

// Source files allowed to give a page a <title> without "BREAD".
// Add one only on purpose.
const TITLE_EXEMPT = new Set<string>();

// Every title a page hands to BaseLayout or ArchiveLayout: literal `title`
// props in src/pages, plus the frontmatter titles of the collections that
// pages render with `title={....data.title}`.
const pageTitleSources = (): { file: string; title: string }[] => {
	const literal = listFiles("src/pages").flatMap((file) =>
		[
			...read(file).matchAll(
				/<(?:BaseLayout|ArchiveLayout)\s+title="([^"]+)"/g,
			),
		].map((match) => ({ file, title: match[1] })),
	);
	const frontmatter = [
		...listFiles("src/content/archive"),
		...listFiles("src/content/blog"),
	].map((file) => ({
		file,
		title: read(file).match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? "",
	}));

	return [...literal, ...frontmatter];
};

describe("SEO", () => {
	it("gives the homepage a descriptive title that fits in search results", () => {
		const title = read("src/pages/index.astro").match(/\btitle="([^"]+)"/)?.[1];

		expect(title).toBeDefined();
		expect(title).not.toBe("BREAD");
		expect(title).toContain("San Francisco");
		expect(title?.length).toBeLessThanOrEqual(60);
		expect(toDocumentTitle(title ?? "")).toBe(title);
	});

	it("adds BREAD to a title once, only when the title lacks it", () => {
		expect(toDocumentTitle("Event List")).toBe("Event List · BREAD");
		expect(toDocumentTitle("The Story of BREAD")).toBe("The Story of BREAD");
		expect(toDocumentTitle("BREAD Archive: Flyers")).toBe(
			"BREAD Archive: Flyers",
		);
	});

	it("takes page titles only from literals or collection frontmatter", () => {
		// A new kind of dynamic title would bypass the check below.
		for (const file of listFiles("src/pages")) {
			for (const match of read(file).matchAll(
				/<(?:BaseLayout|ArchiveLayout)\s+title=\{([^}]+)\}/g,
			)) {
				expect(match[1], file).toMatch(/\.data\.title$/);
			}
		}
	});

	it("names BREAD in every page title within 60 characters", () => {
		const sources = pageTitleSources();

		expect(read("src/layouts/BaseLayout.astro")).toContain(
			"<title>{toDocumentTitle(title)}</title>",
		);
		expect(sources.length).toBeGreaterThan(5);
		for (const { file, title } of sources) {
			const documentTitle = toDocumentTitle(title);
			expect(title, `${file} has no title`).not.toBe("");
			expect(documentTitle.length, documentTitle).toBeLessThanOrEqual(60);
			if (!TITLE_EXEMPT.has(file)) {
				expect(documentTitle, file).toMatch(/\bBREAD\b/);
			}
		}
	});

	it("keeps every configured redirect source out of the sitemap", () => {
		const sources = Object.keys(redirects);

		expect(sources.length).toBeGreaterThan(0);
		for (const source of sources) {
			const path = source.replace(/\/+$/, "");
			expect(isSitemapPage(`https://bread.fm${path}`)).toBe(false);
			expect(isSitemapPage(`https://bread.fm${path}/`)).toBe(false);
		}
	});

	it("keeps canonical pages in the sitemap", () => {
		for (const path of ["/", "/story/", "/archive/", "/archive/timeline/"]) {
			expect(isSitemapPage(`https://bread.fm${path}`)).toBe(true);
		}
	});

	it("defines redirects in astro.config.mjs instead of page stubs", () => {
		// In a static build, Astro.redirect() in a page emits a noindex
		// meta-refresh page that the sitemap lists and Cloudflare serves as 200.
		for (const file of listFiles("src/pages")) {
			expect(read(file), file).not.toContain("Astro.redirect(");
		}
	});
});

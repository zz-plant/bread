import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isSitemapPage, redirects } from "../astro.config.mjs";

const read = (path: string) =>
	readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("SEO", () => {
	it("gives the homepage a descriptive title that fits in search results", () => {
		const title = read("src/pages/index.astro").match(/\btitle="([^"]+)"/)?.[1];

		expect(title).toBeDefined();
		expect(title).not.toBe("BREAD");
		expect(title).toContain("San Francisco");
		expect(title?.length).toBeLessThanOrEqual(60);
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
		const listFiles = (dir: string): string[] =>
			readdirSync(new URL(`../${dir}`, import.meta.url), {
				withFileTypes: true,
			}).flatMap((entry) =>
				entry.isDirectory()
					? listFiles(`${dir}/${entry.name}`)
					: [`${dir}/${entry.name}`],
			);

		for (const file of listFiles("src/pages")) {
			expect(read(file), file).not.toContain("Astro.redirect(");
		}
	});
});

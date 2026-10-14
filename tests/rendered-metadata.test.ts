import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const html = (path: string) =>
	readFileSync(new URL(`dist/client/${path}`, root), "utf8");
const schemas = (page: string) =>
	[
		...page.matchAll(
			/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
		),
	].map((match) => JSON.parse(match[1]));

describe.skipIf(!existsSync(new URL("dist/client/index.html", root)))(
	"built metadata",
	() => {
		it("publishes the homepage website, collection and events", () => {
			const nodes = schemas(html("index.html"));
			expect(nodes.find((node) => node["@type"] === "WebSite")).toMatchObject({
				"@id": "https://bread.fm/#website",
				image: "https://bread.fm/og/home.png",
			});
			expect(
				nodes.find((node) => node["@type"] === "CollectionPage").isPartOf[
					"@id"
				],
			).toBe("https://bread.fm/#website");
			expect(
				nodes.find((node) => node["@type"] === "ItemList").itemListElement
					.length,
			).toBeGreaterThan(0);
		});

		it("publishes the timeline collection and breadcrumb", () => {
			const nodes = schemas(html("archive/timeline/index.html"));
			expect(nodes.map((node) => node["@type"])).toEqual(
				expect.arrayContaining(["CollectionPage", "BreadcrumbList"]),
			);
		});

		it.each(["flyers", "radio-shows"])(
			"publishes the %s image inventory",
			(slug) => {
				const nodes = schemas(html(`archive/${slug}/index.html`));
				expect(
					nodes.find((node) => node["@type"] === "ItemList").itemListElement
						.length,
				).toBeGreaterThan(0);
			},
		);

		it("declares the story as an article with its preview image", () => {
			const page = html("story/index.html");
			expect(page).toContain('property="og:type" content="article"');
			expect(
				schemas(page).find((node) => node["@type"] === "BlogPosting").image,
			).toBe("https://bread.fm/og/blog/the-story-of-bread.png");
		});
	},
);

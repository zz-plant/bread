import { describe, expect, it } from "vitest";
import {
	createArticleSchema,
	createCollectionPageSchema,
	createWebsiteSchema,
} from "../src/utils/structuredData";

const site = new URL("https://bread.fm/");

describe("structured data", () => {
	it("gives the website an addressable identity and an absolute preview image", () => {
		expect(createWebsiteSchema({ site, image: "/og/home.png" })).toMatchObject({
			"@id": "https://bread.fm/#website",
			image: "https://bread.fm/og/home.png",
		});
	});

	it("links a collection to the website identity", () => {
		expect(
			createCollectionPageSchema({
				site,
				pathname: "/",
				name: "BREAD",
				isPartOf: "BREAD",
			}),
		).toMatchObject({
			isPartOf: { "@id": "https://bread.fm/#website" },
		});
	});

	it("gives the story an absolute image", () => {
		expect(
			createArticleSchema({
				site,
				pathname: "/story/",
				headline: "The Story of BREAD",
				datePublished: new Date("2024-01-01"),
				image: "/og/blog/the-story-of-bread.png",
			}),
		).toMatchObject({
			image: "https://bread.fm/og/blog/the-story-of-bread.png",
		});
	});
});

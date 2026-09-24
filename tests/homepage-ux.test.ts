import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) =>
	readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("homepage UX", () => {
	it("uses one focused workspace without a redundant rail or detail deck", () => {
		const homepage = read("src/pages/index.astro");

		expect(homepage).not.toContain("<SideRail");
		expect(homepage).not.toContain('id="detailDeck"');
		expect(homepage).toContain('class="section-tabs"');
		expect(homepage.match(/role="tab"/g)).toHaveLength(3);
	});

	it("keeps event discovery controls concise", () => {
		const eventPanel = read("src/components/EventPanel.astro");

		expect(eventPanel).toContain('id="eventSearch"');
		expect(eventPanel).toContain('id="eventSort"');
		expect(eventPanel).not.toContain('id="quickFilters"');
		expect(eventPanel).not.toContain('id="yearFilters"');
		expect(eventPanel).not.toContain('id="venueFilters"');
		expect(eventPanel).not.toContain('class="share-buttons"');
		expect(eventPanel).not.toContain('class="pick-btn"');
	});

	it("shows people as content with direct links instead of detail-panel controls", () => {
		const peoplePanel = read("src/components/homepage/PeopleTab.astro");

		expect(peoplePanel).not.toContain('class="pick-btn"');
		expect(peoplePanel).not.toContain("side panel");
	});

	it("keeps every listening link inside the reachable listen panel", () => {
		const audioPanel = read("src/components/homepage/AudioTabs.astro");

		expect(audioPanel).not.toContain('id="panel-links"');
		expect(audioPanel).toContain('class="listening-links"');
	});

	it("styles the homepage as a centered reading surface with responsive tabs", () => {
		const styles = read("src/styles/home.css");

		expect(styles).toContain(".home-intro");
		expect(styles).toContain(".section-tabs");
		expect(styles).toContain(
			"grid-template-columns: repeat(3, minmax(0, 1fr))",
		);
		expect(styles).not.toContain(".nav-rail");
		expect(styles).not.toContain(".deck");
	});

	it("keeps responsive controls usable without narrow-screen overflow", () => {
		const styles = read("src/styles/home.css");

		expect(styles).toContain("min-height: 2.75rem");
		expect(styles).toContain(
			"grid-template-columns: minmax(0, 1fr) minmax(11rem, auto)",
		);
		expect(styles).toContain("grid-template-columns: auto minmax(0, 1fr)");
		expect(styles).toContain("text-wrap: pretty");
	});

	it("does not repeat global navigation in the homepage footer", () => {
		const homepage = read("src/pages/index.astro");

		expect(homepage).toContain(
			'footerNavLinks={[{ label: "Archive", href: "/archive/" }]}',
		);
		expect(homepage).not.toContain('{ label: "Home", href: "/" }');
		expect(read("src/layouts/BaseLayout.astro")).toContain(
			"{navLinks.map((link) => (",
		);
		expect(read("src/layouts/BaseLayout.astro")).toContain(
			"{footerNavLinks.map((link) => (",
		);
	});

	it("consolidates featured visual destinations into section links", () => {
		const eventPanel = read("src/components/EventPanel.astro");

		expect(eventPanel).toContain('class="featured-visual-links"');
		expect(eventPanel).not.toContain("Open related archive");
	});

	it("removes the unused legacy rail component", () => {
		expect(() => read("src/components/SideRail.astro")).toThrow();
	});

	it("does not retain deleted rail or share affordances", () => {
		const cardLink = read("src/components/CardLink.astro");
		const baseLayout = read("src/layouts/BaseLayout.astro");
		const printStyles = read("src/styles/print.css");

		expect(cardLink).not.toContain("card-link--rail");
		expect(cardLink).not.toContain("variant");
		expect(baseLayout).not.toContain("share-btn");
		expect(baseLayout).not.toContain("navigator.share");
		expect(printStyles).not.toContain("share-buttons");
	});

	it("does not repeat archive tile titles as kicker and link", () => {
		const archiveIndex = read("src/pages/archive/index.astro");

		expect(archiveIndex).not.toContain(
			'<p class="section-kicker">{page.data.title}</p>',
		);
		expect(archiveIndex).not.toContain(
			'<p class="section-kicker">{section.title}</p>',
		);
	});

	it("keeps the story page focused on its canonical narrative source", () => {
		const storyPage = read("src/pages/story/index.astro");

		expect(storyPage).not.toContain('class="what-bread-was"');
		expect(storyPage).toContain("<StoryContent />");
	});

	it("keeps the timeline chronology in one canonical page", () => {
		const timelineContent = read("src/content/archive/timeline.md");
		const timelinePage = read("src/pages/archive/timeline.astro");

		expect(timelineContent).toContain("canonical timeline presentation");
		expect(timelineContent).not.toContain("## Era 1");
		expect(timelinePage).toContain("const eras = [");
	});

	it("does not expose internal research or private-location wording", () => {
		const ledger = read("src/content/archive/event-ledger.md");
		const map = read("src/pages/archive/map.astro");
		const radio = read("src/pages/archive/radio-shows.astro");

		expect(ledger).not.toContain("address by text");
		expect(ledger).not.toContain("link coming soon");
		expect(map).not.toContain("anti-bot");
		expect(radio).not.toContain("Recovered Facebook event URLs");
	});

	it("keeps research-pipeline and placeholder wording out of visitor-facing copy", () => {
		const listFiles = (dir: string): string[] =>
			readdirSync(new URL(`../${dir}`, import.meta.url), {
				withFileTypes: true,
			}).flatMap((entry) =>
				entry.isDirectory()
					? listFiles(`${dir}/${entry.name}`)
					: [`${dir}/${entry.name}`],
			);
		const copyFiles = [
			...listFiles("src/pages"),
			...listFiles("src/components"),
			...listFiles("src/layouts"),
			...listFiles("src/content/archive").filter(
				(file) => !file.endsWith("timeline.md"),
			),
			...listFiles("src/content/blog"),
			...listFiles("src/content/events"),
			...listFiles("src/content/roster"),
			...listFiles("src/content/config"),
			"src/data/homepage.ts",
			"scripts/generate-og-images.mjs",
		];
		const bannedPhrases = [
			"(noted)",
			"pending",
			"in this pass",
			"Archive-sourced",
			"Documented chronology",
			"when you are",
			"Visual trail",
			"Keep exploring",
			"BREAD //",
			"venues-format-shifts",
			"channel-profile-directory",
			"main image folder",
		];

		for (const file of copyFiles) {
			const text = read(file);
			for (const phrase of bannedPhrases) {
				expect(text, `${file} contains "${phrase}"`).not.toContain(phrase);
			}
		}
	});
});

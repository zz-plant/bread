import { readFileSync } from "node:fs";
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
});

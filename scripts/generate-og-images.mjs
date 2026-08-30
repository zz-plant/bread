import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
	createOgSvg,
	OG_IMAGE_HEIGHT,
	OG_IMAGE_WIDTH,
} from "../src/utils/og-image-core.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(repoRoot, "public");
const archiveContentDir = join(repoRoot, "src/content/archive");
const blogContentDir = join(repoRoot, "src/content/blog");

const ARCHIVE_CATCHALL_EXCLUDED_SLUGS = new Set([
	"timeline",
	"research-methods-confidence",
]);

const readYamlFrontmatter = (filePath) => {
	const raw = readFileSync(filePath, "utf-8");
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return {};
	const body = match[1];
	const data = {};
	for (const line of body.split("\n")) {
		const colon = line.indexOf(":");
		if (colon === -1) continue;
		const key = line.slice(0, colon).trim();
		const value = line
			.slice(colon + 1)
			.trim()
			.replace(/^['"]|['"]$/g, "");
		data[key] = value;
	}
	return data;
};

const listContentFiles = (dir, extension) =>
	readdirSync(dir)
		.filter((name) => name.endsWith(extension))
		.map((name) => name.slice(0, -extension.length))
		.sort();

const renderPng = async ({ outputPath, eyebrow, title, subtitle, variant }) => {
	const svg = createOgSvg({ eyebrow, title, subtitle, variant });
	mkdirSync(dirname(outputPath), { recursive: true });
	await sharp(Buffer.from(svg))
		.resize(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT)
		.png()
		.toFile(outputPath);
	return outputPath;
};

const ogDir = join(publicDir, "og");

const archiveCatchallImages = [];
for (const slug of listContentFiles(archiveContentDir, ".md")) {
	if (ARCHIVE_CATCHALL_EXCLUDED_SLUGS.has(slug)) continue;
	const { title, description } = readYamlFrontmatter(
		join(archiveContentDir, `${slug}.md`),
	);
	archiveCatchallImages.push({
		label: `archive/${slug}.png`,
		eyebrow: "BREAD ARCHIVE",
		title: title || "BREAD Archive",
		subtitle:
			description ||
			"Timeline, venues, people, and the events that shaped BREAD.",
		variant: "archive",
	});
}

const blogImages = [];
for (const slug of listContentFiles(blogContentDir, ".md")) {
	const fm = readYamlFrontmatter(join(blogContentDir, `${slug}.md`));
	if (fm.draft === "true") continue;
	blogImages.push({
		label: `blog/${slug}.png`,
		eyebrow: "BREAD STORY",
		title: fm.title || "BREAD Story",
		subtitle: fm.description || "The story of BREAD in San Francisco.",
		variant: "story",
	});
}

const imageSpecs = [
	{
		label: "home.png",
		eyebrow: "BREAD // SAN FRANCISCO",
		title: "BREAD // Archive",
		subtitle: "Timeline, people, radio, and flyers from San Francisco.",
		variant: "home",
	},
	{
		label: "og-default.png",
		eyebrow: "BREAD // SAN FRANCISCO",
		title: "BREAD // Archive",
		subtitle: "Timeline, people, radio, and flyers from San Francisco.",
		variant: "home",
	},
	{
		label: "archive.png",
		eyebrow: "BREAD ARCHIVE",
		title: "BREAD Archive",
		subtitle: "Timeline, venues, people, and the events that shaped BREAD.",
		variant: "archive",
	},
	{
		label: "timeline.png",
		eyebrow: "BREAD ARCHIVE",
		title: "Timeline",
		subtitle: "From 2015 club nights to 2024 radio and event announcements.",
		variant: "archive",
	},
	{
		label: "archive/flyers.png",
		eyebrow: "BREAD ARCHIVE",
		title: "Flyers",
		subtitle: "Flyers, posters, and promo images from the archive.",
		variant: "archive",
	},
	{
		label: "archive/radio-shows.png",
		eyebrow: "BREAD ARCHIVE",
		title: "Radio Shows",
		subtitle: "BREAD FM radio show artwork with guests and dates.",
		variant: "archive",
	},
	{
		label: "archive/map.png",
		eyebrow: "BREAD ARCHIVE",
		title: "Venue Map",
		subtitle:
			"A mobile-friendly venue map and list for documented BREAD events.",
		variant: "archive",
	},
	...archiveCatchallImages,
	...blogImages,
];

for (const spec of imageSpecs) {
	const outputPath = join(ogDir, spec.label);
	const written = await renderPng({
		outputPath,
		eyebrow: spec.eyebrow,
		title: spec.title,
		subtitle: spec.subtitle,
		variant: spec.variant,
	});
	console.log(`Generated ${written.replace(`${publicDir}/`, "")}`);
}

console.log(`Generated ${imageSpecs.length} OG images into public/og/`);

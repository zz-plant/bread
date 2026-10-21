import { copyFileSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
	createOgSvg,
	OG_ART_LEFT,
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

// Each card shows a wall of the crew's own art beside the text, so a shared
// link looks like BREAD instead of a generic title card. Paths are public/
// originals; keep them to a few MB, since each card decodes its own.
const FLYER_WALLS = {
	home: [
		"/drive/shows/bread-x-grime-city_150213-show.jpg",
		"/drive/bread-3-flyer-final-letter.png",
		"/bread-5-jlin-planet-mu-iyer-2016-03-25-flyer.jpg",
		"/drive/posters/bread-9-v3_poster.jpg",
		"/bread-number-seven-celestial-trax-distal-2016-05-21.jpg",
		"/bread-long-bread-summer-fundraiser-2021-07-10.jpg",
	],
	archive: [
		"/drive/bread-14-v3-edit.png",
		"/toasted-trax-number-one-2016-06-29.jpg",
		"/bread-number-ten-pinch-rabit-mumdance-logos-caski-ganesa-2016-08-19.png",
		"/drive/bread-15-ig-v1-dark-b.jpg",
		"/drive/bread-no-4-v3_framed-3.jpg",
		"/bread-new-year-yxexaxr-2021-01-02.jpg",
	],
	flyers: [
		"/bread-no-3-doctor-jeep-2015-11-06.png",
		"/bread-long-weekend-special-2016-09-04.jpg",
		"/drive/tt-02-v1_poster.png",
		"/bread-13-botaz-prawns-tf1000-2017-02-24.jpg",
		"/bread-suda-kelman-duran-bread-djs-2017-09-22.png",
		"/bread-new-year-yxexaxr-2021-01-02.jpg",
	],
	timeline: [
		"/drive/shows/bread-x-grime-city_150213-show.jpg",
		"/bread-5-jlin-planet-mu-iyer-2016-03-25-flyer.jpg",
		"/drive/posters/bread-9-v3_poster.jpg",
		"/drive/bread-14-v3-edit.png",
		"/bread-new-year-yxexaxr-2021-01-02.jpg",
		"/bread-long-bread-summer-fundraiser-2021-07-10.jpg",
	],
	map: [
		"/drive/bread-3-flyer-final-letter.png",
		"/drive/posters/bread-9-v3_poster.jpg",
		"/toasted-trax-number-one-2016-06-29.jpg",
		"/bread-number-seven-celestial-trax-distal-2016-05-21.jpg",
		"/bread-long-weekend-special-2016-09-04.jpg",
		"/drive/bread-15-ig-v1-dark-b.jpg",
	],
	story: [
		"/drive/shows/bread-x-grime-city_150213-show.jpg",
		"/drive/bread2-smaller.jpg",
		"/drive/bread-3-flyer-final-letter.png",
		"/drive/bread7c-01.png",
		"/bread-number-ten-pinch-rabit-mumdance-logos-caski-ganesa-2016-08-19.png",
		"/bread-long-bread-summer-fundraiser-2021-07-10.jpg",
	],
	radio: [
		"/radio/bread-fm-shl-prawns-feb-1.jpg",
		"/radio/bread-fm-noire-prawns-may-17.png",
		"/radio/bread-fm-korma-cage-a-mar-15.jpg",
		"/radio/bread-fm-evan-bannick-botaz-may-24.png",
	],
};

const WALL_GAP = 6;

const tileCache = new Map();
const readTile = (src, width, height) => {
	const key = `${src}@${width}x${height}`;
	if (!tileCache.has(key)) {
		tileCache.set(
			key,
			sharp(join(publicDir, src))
				.resize(width, height, { fit: "cover", position: "top" })
				.toBuffer(),
		);
	}
	return tileCache.get(key);
};

// Two rows of art, flyers at 4:5 and radio cards square, bleeding off the
// right edge like posters on a wall.
const layoutWall = async (wall) => {
	const aspect = wall === "radio" ? 1 : 4 / 5;
	const rowHeight = Math.floor((OG_IMAGE_HEIGHT - WALL_GAP) / 2);
	const tileWidth = Math.round(rowHeight * aspect);
	const art = FLYER_WALLS[wall];
	const columns = Math.ceil(art.length / 2);
	const tiles = [];
	for (let index = 0; index < art.length; index++) {
		const column = Math.floor(index / 2);
		const row = index % 2;
		const left = OG_ART_LEFT + WALL_GAP + column * (tileWidth + WALL_GAP);
		if (left >= OG_IMAGE_WIDTH || column >= columns) continue;
		const width = Math.min(tileWidth, OG_IMAGE_WIDTH - left);
		const tile = await readTile(art[index], tileWidth, rowHeight);
		tiles.push({
			input:
				width === tileWidth
					? tile
					: await sharp(tile)
							.extract({ left: 0, top: 0, width, height: rowHeight })
							.toBuffer(),
			left,
			top: row * (rowHeight + WALL_GAP),
		});
	}
	return tiles;
};

const renderPng = async ({ outputPath, eyebrow, title, subtitle, wall }) => {
	const svg = createOgSvg({ eyebrow, title, subtitle });
	mkdirSync(dirname(outputPath), { recursive: true });
	await sharp({
		create: {
			width: OG_IMAGE_WIDTH,
			height: OG_IMAGE_HEIGHT,
			channels: 3,
			background: "#000000",
		},
	})
		.composite([
			...(await layoutWall(wall)),
			{ input: Buffer.from(svg), left: 0, top: 0 },
		])
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
		eyebrow: "BREAD Archive",
		title: title || "BREAD Archive",
		subtitle: description || "Events, flyers, venues, and people, 2015–2024.",
		wall: "archive",
	});
}

const blogImages = [];
for (const slug of listContentFiles(blogContentDir, ".md")) {
	const fm = readYamlFrontmatter(join(blogContentDir, `${slug}.md`));
	if (fm.draft === "true") continue;
	blogImages.push({
		label: `blog/${slug}.png`,
		eyebrow: "BREAD Story",
		title: fm.title || "BREAD Story",
		subtitle: fm.description || "The story of BREAD in San Francisco.",
		wall: "story",
	});
}

// The logo already says BREAD, so the home card's title says what it was.
const homeCard = {
	eyebrow: "San Francisco",
	title: "Club nights, streams and radio",
	subtitle: "Lineups, flyers and mixes, 2015–2024.",
	wall: "home",
};

const imageSpecs = [
	{ label: "home.png", ...homeCard },
	{ label: "og-default.png", ...homeCard },
	{
		label: "archive.png",
		eyebrow: "BREAD Archive",
		title: "The archive",
		subtitle: "Events, flyers, venues, and people, 2015–2024.",
		wall: "archive",
	},
	{
		label: "timeline.png",
		eyebrow: "BREAD Archive",
		title: "Timeline",
		subtitle: "From the first club nights in 2015 to the radio show.",
		wall: "timeline",
	},
	{
		label: "archive/flyers.png",
		eyebrow: "BREAD Archive",
		title: "Flyers",
		subtitle: "Flyers, posters, and promo art for BREAD and Toasted Trax.",
		wall: "flyers",
	},
	{
		label: "archive/radio-shows.png",
		eyebrow: "BREAD FM",
		title: "Radio shows",
		subtitle: "Cover art for BREAD FM on Radio Valencia.",
		wall: "radio",
	},
	{
		label: "archive/map.png",
		eyebrow: "BREAD Archive",
		title: "Venue map",
		subtitle: "Where BREAD events happened.",
		wall: "map",
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
		wall: spec.wall,
	});
	console.log(`Generated ${written.replace(`${publicDir}/`, "")}`);
}

console.log(`Generated ${imageSpecs.length} OG images into public/og/`);
copyFileSync(join(ogDir, "og-default.png"), join(publicDir, "og-default.png"));
console.log(
	"Copied og-default.png to public/og-default.png as legacy fallback",
);

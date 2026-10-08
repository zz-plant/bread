// Writes small AVIF, WebP, and JPEG/PNG copies of every archive image in
// public/ to public/_img/, and records them in src/data/responsive-images.json
// for ResponsiveImage.astro. The originals stay where they are: the flyer and
// radio galleries link to them, and they are the archive.
//
// Astro's own image pipeline (astro:assets) only transforms images imported
// from src/. Importing these files from public/ instead makes Vite copy each
// imported original into _astro/, and Astro deletes only the copies it
// transformed, so this script does the resizing.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const publicDir = join(repoRoot, "public");
const outputDir = join(publicDir, "_img");
const manifestPath = join(repoRoot, "src/data/responsive-images.json");
const OUTPUT_URL = "/_img/";

// The widest image slot is ~330 CSS px (see src/utils/images.ts). 640 px
// covers it on 2x screens, and covers 3x phones, where slots are ~180 px.
const WIDTHS = [320, 480, 640];
const ENCODERS = {
	avif: (image) => image.avif({ quality: 55, effort: 4 }),
	webp: (image) => image.webp({ quality: 78, effort: 4 }),
	jpg: (image) => image.jpeg({ quality: 78, mozjpeg: true }),
	png: (image) => image.png({ palette: true, quality: 90, effort: 7 }),
};
// Bump when the encoder settings change, so old files are not reused.
const SETTINGS_VERSION = `1:${WIDTHS.join(",")}`;

// og/ holds generated social cards; _img/ is this script's output.
const SKIPPED_DIRECTORIES = new Set(["og", "_img"]);
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

const listSourceImages = async (directory) => {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			if (!SKIPPED_DIRECTORIES.has(entry.name))
				files.push(...(await listSourceImages(path)));
		} else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
			files.push(path);
		}
	}
	return files;
};

const toSlug = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const toSrcset = (files) =>
	files.map((file) => `${OUTPUT_URL}${file.name} ${file.width}w`).join(", ");

const readPreviousManifest = () => {
	if (!existsSync(manifestPath)) return {};
	try {
		return JSON.parse(readFileSync(manifestPath, "utf-8"));
	} catch {
		return {};
	}
};

const outputFilesOf = (entry) =>
	[entry.avif, entry.webp, entry.fallback.srcset]
		.filter(Boolean)
		.flatMap((srcset) =>
			srcset
				.split(", ")
				.map((candidate) => candidate.split(" ")[0].slice(OUTPUT_URL.length)),
		);

const toPublicPath = (sourcePath) =>
	`/${relative(publicDir, sourcePath).split(sep).join("/")}`;

const generateEntry = async (sourcePath, baseName, hash) => {
	// Decode and shrink once; every variant is cut from this buffer.
	// Embedded ICC profiles (including CMYK) are converted to sRGB.
	const { data, info } = await sharp(sourcePath, { limitInputPixels: false })
		.rotate()
		.resize({ width: Math.max(...WIDTHS), withoutEnlargement: true })
		.toColourspace("srgb")
		.raw({ depth: "uchar" })
		.toBuffer({ resolveWithObject: true });
	const raw = {
		raw: { width: info.width, height: info.height, channels: info.channels },
	};
	const { isOpaque } = await sharp(data, raw).stats();
	const fallbackFormat = isOpaque ? "jpg" : "png";

	const widths = WIDTHS.filter((width) => width < info.width);
	widths.push(info.width);

	const variants = { avif: [], webp: [], [fallbackFormat]: [] };
	for (const width of widths) {
		for (const format of Object.keys(variants)) {
			let image = sharp(data, raw);
			if (width !== info.width) image = image.resize({ width });
			if (format === "jpg") image = image.removeAlpha();
			const name = `${baseName}-${width}.${format}`;
			const result = await ENCODERS[format](image).toFile(
				join(outputDir, name),
			);
			variants[format].push({
				name,
				width: result.width,
				height: result.height,
				size: result.size,
			});
		}
	}

	// AVIF loses to WebP on a few grainy scans; browsers take the first
	// source they support, so list AVIF only where it is smaller.
	const totalSize = (files) => files.reduce((sum, file) => sum + file.size, 0);
	const keepAvif = totalSize(variants.avif) < totalSize(variants.webp);
	if (!keepAvif) {
		await Promise.all(
			variants.avif.map((file) => rm(join(outputDir, file.name))),
		);
	}

	const largest = variants.webp.at(-1);
	return {
		hash,
		width: largest.width,
		height: largest.height,
		...(keepAvif && { avif: toSrcset(variants.avif) }),
		webp: toSrcset(variants.webp),
		fallback: {
			type: fallbackFormat === "jpg" ? "image/jpeg" : "image/png",
			src: `${OUTPUT_URL}${variants[fallbackFormat].at(-1).name}`,
			srcset: toSrcset(variants[fallbackFormat]),
		},
	};
};

const runPool = async (items, limit, worker) => {
	const results = [];
	let next = 0;
	const runners = Array.from(
		{ length: Math.min(limit, items.length) },
		async () => {
			while (next < items.length) {
				const index = next++;
				results[index] = await worker(items[index]);
			}
		},
	);
	await Promise.all(runners);
	return results;
};

const started = performance.now();
sharp.cache(false);
await mkdir(outputDir, { recursive: true });

const previousManifest = readPreviousManifest();
const existingOutputs = new Set(await readdir(outputDir));
const sources = (await listSourceImages(publicDir)).sort();
// Identical copies in different folders share one set of files.
const generated = new Map();
let reused = 0;

const results = await runPool(
	sources,
	Math.max(1, availableParallelism()),
	async (sourcePath) => {
		const publicPath = toPublicPath(sourcePath);
		const hash = createHash("sha256")
			.update(SETTINGS_VERSION)
			.update(await readFile(sourcePath))
			.digest("hex")
			.slice(0, 10);
		const previous = previousManifest[publicPath];
		if (
			previous?.hash === hash &&
			outputFilesOf(previous).every((file) => existingOutputs.has(file))
		) {
			reused++;
			return { publicPath, entry: previous };
		}
		const baseName = `${toSlug(
			publicPath
				.split("/")
				.pop()
				.replace(/\.[^.]+$/, ""),
		)}-${hash}`;
		if (!generated.has(baseName))
			generated.set(baseName, generateEntry(sourcePath, baseName, hash));
		return { publicPath, entry: await generated.get(baseName) };
	},
);

const manifest = Object.fromEntries(
	results.map(({ publicPath, entry }) => [publicPath, entry]),
);

// Drop files left over from originals that changed or were removed.
const keep = new Set(Object.values(manifest).flatMap(outputFilesOf));
for (const file of await readdir(outputDir)) {
	if (!keep.has(file)) await rm(join(outputDir, file));
}

await writeFile(
	manifestPath,
	`${JSON.stringify(manifest, null, "\t")}\n`,
	"utf-8",
);
console.log(
	`Generated responsive images for ${results.length} originals (${reused} reused) in ${((performance.now() - started) / 1000).toFixed(1)}s`,
);

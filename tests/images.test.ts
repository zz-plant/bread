import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

// A page may embed an original from public/ only if it is this small.
// Anything larger goes through ResponsiveImage, which serves resized copies.
const RAW_IMAGE_LIMIT_BYTES = 200 * 1024;

const root = new URL("../", import.meta.url);
const publicDir = new URL("public/", root);
const distDir = new URL("dist/client/", root);

const listFiles = (dir: URL): URL[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory()
			? listFiles(new URL(`${entry.name}/`, dir))
			: [new URL(entry.name, dir)],
	);

const relativePath = (file: URL) => file.pathname.slice(root.pathname.length);

// Generated at build time: resized copies (_img) and social cards (og).
const GENERATED_PREFIXES = ["/_img/", "/og/"];

// Size of the public/ original at a root-relative URL path, if it is one.
const rawOriginalSize = (urlPath: string): number | undefined => {
	const path = decodeURI(urlPath.split(/[?#]/)[0]);
	if (!path.startsWith("/") || path.startsWith("//")) return undefined;
	if (GENERATED_PREFIXES.some((prefix) => path.startsWith(prefix)))
		return undefined;
	const file = new URL(`.${path}`, publicDir);
	return existsSync(file) && statSync(file).isFile()
		? statSync(file).size
		: undefined;
};

const describeOversized = (urls: string[], where: string) =>
	urls
		.map((url) => ({ url, size: rawOriginalSize(url) }))
		.filter(({ size }) => size !== undefined && size > RAW_IMAGE_LIMIT_BYTES)
		.map(
			({ url, size }) =>
				`${where}: ${url} (${Math.round((size ?? 0) / 1024)} KB)`,
		);

// Every URL a tag's src/srcset attributes point at.
const embeddedUrls = (tag: string): string[] => {
	const urls: string[] = [];
	for (const [, name, value] of tag.matchAll(/\s(src|srcset)="([^"]*)"/g)) {
		if (name === "src") urls.push(value);
		else
			urls.push(...value.split(",").map((part) => part.trim().split(/\s+/)[0]));
	}
	return urls.filter(Boolean);
};

describe("images", () => {
	it("routes every <img> in src/ through ResponsiveImage or keeps it small", () => {
		const problems: string[] = [];
		const sourceFiles = listFiles(new URL("src/", root)).filter(
			(file) =>
				/\.(astro|md|mdx)$/.test(file.pathname) &&
				!file.pathname.endsWith("/components/ResponsiveImage.astro"),
		);

		for (const file of sourceFiles) {
			const where = relativePath(file);
			const text = readFileSync(file, "utf8");
			for (const [tag] of text.matchAll(/<img\b[^>]*>/g)) {
				if (/\ssrc=\{/.test(tag)) {
					problems.push(
						`${where}: <img> with a computed src; use ResponsiveImage`,
					);
				}
				problems.push(...describeOversized(embeddedUrls(tag), where));
			}
			const markdownImages = [...text.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(
				(match) => match[1],
			);
			problems.push(...describeOversized(markdownImages, where));
		}

		expect(problems).toEqual([]);
	});

	describe.skipIf(!existsSync(new URL("index.html", distDir)))(
		"built pages (run `npm run build` first)",
		() => {
			it("embed no public/ original over the size limit", () => {
				const pages = listFiles(distDir).filter((file) =>
					file.pathname.endsWith(".html"),
				);
				const problems = pages.flatMap((page) => {
					const html = readFileSync(page, "utf8");
					const tags = html.match(/<(?:img|source)\b[^>]*>/g) ?? [];
					return describeOversized(
						tags.flatMap(embeddedUrls),
						page.pathname.slice(distDir.pathname.length - 1),
					);
				});

				expect(pages.length).toBeGreaterThan(0);
				expect(problems).toEqual([]);
			});

			it("serves the home and story galleries as AVIF/WebP with sizes", () => {
				for (const page of ["index.html", "story/index.html"]) {
					const html = readFileSync(new URL(page, distDir), "utf8");
					const pictures = html.match(/<picture\b[\s\S]*?<\/picture>/g) ?? [];

					expect(pictures.length, page).toBeGreaterThan(0);
					for (const picture of pictures) {
						expect(picture).toMatch(
							/<source type="image\/(avif|webp)" srcset="[^"]+" sizes="[^"]+"/,
						);
						expect(picture).toMatch(/<img [^>]*width="\d+" height="\d+"/);
					}
				}
			});
		},
	);
});

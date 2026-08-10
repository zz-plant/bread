import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { extname } from "path";
import { fileURLToPath } from "url";

// ── Shared helpers ──────────────────────────────────────────────────────────

const supportedImageExtensions = new Set([
	".jpg",
	".jpeg",
	".png",
	".webp",
	".gif",
	".avif",
]);
const extensionPriority = {
	".webp": 5,
	".jpg": 4,
	".jpeg": 4,
	".png": 3,
	".avif": 2,
	".gif": 1,
};

const monthDirectory = {
	jan: { index: 1, label: "January" },
	january: { index: 1, label: "January" },
	feb: { index: 2, label: "February" },
	february: { index: 2, label: "February" },
	mar: { index: 3, label: "March" },
	march: { index: 3, label: "March" },
	apr: { index: 4, label: "April" },
	april: { index: 4, label: "April" },
	may: { index: 5, label: "May" },
	jun: { index: 6, label: "June" },
	june: { index: 6, label: "June" },
	jul: { index: 7, label: "July" },
	july: { index: 7, label: "July" },
	aug: { index: 8, label: "August" },
	august: { index: 8, label: "August" },
	sep: { index: 9, label: "September" },
	sept: { index: 9, label: "September" },
	september: { index: 9, label: "September" },
	oct: { index: 10, label: "October" },
	october: { index: 10, label: "October" },
	nov: { index: 11, label: "November" },
	november: { index: 11, label: "November" },
	dec: { index: 12, label: "December" },
	december: { index: 12, label: "December" },
};

const tokenOverrides = {
	dj: "DJ",
	djs: "DJs",
	tf1000: "TF1000",
	shl: "SHL",
	fb: "FB",
	ig: "IG",
	bw: "B/W",
	yxexaxr: "YXEXAXR",
};

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const srcDataDir = fileURLToPath(new URL("../src/data/", import.meta.url));

const toTitleToken = (token) => {
	const normalized = token.toLowerCase();
	if (tokenOverrides[normalized]) return tokenOverrides[normalized];
	if (/^\d+$/.test(token)) return token;
	if (token.length === 1) return token.toUpperCase();
	return token[0].toUpperCase() + token.slice(1).toLowerCase();
};

const toTitle = (tokens) =>
	tokens
		.filter(Boolean)
		.map((t) => toTitleToken(t))
		.join(" ");

const toPersonLabel = (rawSlug) =>
	rawSlug
		.split("-")
		.filter(Boolean)
		.map((token) => toTitleToken(token))
		.join(" ");

// ── Abstract syntax markers for JSON serialization ─────────────────────────
// We need to serialize undefined values explicitly to preserve optional fields
// in the JSON output, so Astro can destructure them safely.

// ── Flyer data generation ───────────────────────────────────────────────────

const assetTypeDirectory = {
	flyer: "Flyer",
	poster: "Poster",
	instagram: "Instagram",
	story: "Story",
};

const walkImageDirectory = (directory, imagePathPrefix, source, recursive) => {
	const output = [];
	const entries = readdirSync(directory, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory()) {
			if (!recursive) continue;
			const nestedDirectory = `${directory}${entry.name}/`;
			const nestedPrefix = `${imagePathPrefix}${entry.name}/`;
			output.push(
				...walkImageDirectory(nestedDirectory, nestedPrefix, source, recursive),
			);
			continue;
		}

		if (!entry.isFile()) continue;
		if (entry.name === "_import-manifest.json") continue;

		const extension = extname(entry.name).toLowerCase();
		if (!supportedImageExtensions.has(extension)) continue;

		output.push({
			filename: entry.name,
			imagePath: `${imagePathPrefix}${entry.name}`,
			source,
		});
	}

	return output;
};

const parseDateFromTail = (tokens) => {
	if (tokens.length >= 3) {
		const yearToken = tokens[tokens.length - 3];
		const monthToken = tokens[tokens.length - 2];
		const dayToken = tokens[tokens.length - 1];

		const year = Number.parseInt(yearToken, 10);
		const month = Number.parseInt(monthToken, 10);
		const day = Number.parseInt(dayToken, 10);

		if (
			/^\d{4}$/.test(yearToken) &&
			/^\d{1,2}$/.test(monthToken) &&
			/^\d{1,2}$/.test(dayToken) &&
			!Number.isNaN(year) &&
			!Number.isNaN(month) &&
			!Number.isNaN(day) &&
			month >= 1 &&
			month <= 12 &&
			day >= 1 &&
			day <= 31
		) {
			const date = new Date(Date.UTC(year, month - 1, day));
			const label = date.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
				timeZone: "UTC",
			});

			return {
				label,
				sortValue: year * 10000 + month * 100 + day,
				consumedTokens: 3,
				hasYear: true,
			};
		}
	}

	if (tokens.length >= 2) {
		const monthToken = tokens[tokens.length - 2].toLowerCase();
		const dayToken = tokens[tokens.length - 1];
		const month = monthDirectory[monthToken];
		const day = Number.parseInt(dayToken, 10);

		if (month && !Number.isNaN(day) && day >= 1 && day <= 31) {
			return {
				label: `${month.label} ${day}`,
				sortValue: month.index * 100 + day,
				consumedTokens: 2,
				hasYear: false,
			};
		}
	}

	return undefined;
};

const parseCompactDate = (basename) => {
	const match = basename.match(/(?:^|[^0-9])(\d{2})(\d{2})(\d{2})(?:[^0-9]|$)/);
	if (!match) return undefined;

	const yearShort = Number.parseInt(match[1], 10);
	const month = Number.parseInt(match[2], 10);
	const day = Number.parseInt(match[3], 10);
	if (Number.isNaN(yearShort) || Number.isNaN(month) || Number.isNaN(day))
		return undefined;
	if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;

	const year = 2000 + yearShort;
	const date = new Date(Date.UTC(year, month - 1, day));
	const label = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});

	return {
		label,
		sortValue: year * 10000 + month * 100 + day,
		consumedTokens: 0,
		hasYear: true,
	};
};

const parseIsoDate = (basename) => {
	const match = basename.match(/(20\d{2})[-_](\d{1,2})[-_](\d{1,2})/);
	if (!match) return undefined;

	const year = Number.parseInt(match[1], 10);
	const month = Number.parseInt(match[2], 10);
	const day = Number.parseInt(match[3], 10);
	if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))
		return undefined;
	if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;

	const date = new Date(Date.UTC(year, month - 1, day));
	const label = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	});

	return {
		label,
		sortValue: year * 10000 + month * 100 + day,
		consumedTokens: 0,
		hasYear: true,
	};
};

const getPreferredFlyerFiles = () => {
	const driveDirectoryPath = `${publicDir}drive/`;
	const driveDirectoryAvailable = existsSync(driveDirectoryPath);
	const candidates = [
		...walkImageDirectory(publicDir, "/", "Main site folder", false),
		...(driveDirectoryAvailable
			? walkImageDirectory(
					driveDirectoryPath,
					"/drive/",
					"Imported archive",
					true,
				)
			: []),
	];
	const preferredBySlug = new Map();

	for (const candidate of candidates) {
		const extension = extname(candidate.filename).toLowerCase();
		const basename = candidate.filename
			.slice(0, -extension.length)
			.toLowerCase();
		const isTopLevelFlyer =
			candidate.source === "Main site folder" &&
			(basename.startsWith("bread-") || basename.startsWith("toasted-trax-"));
		const isDriveFlyer = candidate.source === "Imported archive";
		if (!isTopLevelFlyer && !isDriveFlyer) continue;

		const current = preferredBySlug.get(basename);
		if (!current) {
			preferredBySlug.set(basename, candidate);
			continue;
		}

		const nextScore = extensionPriority[extension] ?? 0;
		const currentExtension = extname(current.filename).toLowerCase();
		const currentScore = extensionPriority[currentExtension] ?? 0;
		const nextSourceScore = candidate.source === "Main site folder" ? 2 : 1;
		const currentSourceScore = current.source === "Main site folder" ? 2 : 1;
		if (
			nextScore > currentScore ||
			(nextScore === currentScore && nextSourceScore > currentSourceScore)
		) {
			preferredBySlug.set(basename, candidate);
		}
	}

	return [...preferredBySlug.values()].sort((left, right) =>
		left.filename.localeCompare(right.filename),
	);
};

const parseFlyerAsset = (file) => {
	const { filename } = file;
	const extension = extname(filename).toLowerCase();
	const basename = filename.slice(0, -extension.length);
	const normalized = basename.toLowerCase();
	const normalizedForTokens = normalized
		.replace(/[()]/g, "")
		.replace(/[.\s_]+/g, "-");

	const series =
		normalizedForTokens.startsWith("toasted-trax-") ||
		normalizedForTokens.startsWith("toastedtrax-")
			? "Toasted Trax"
			: normalizedForTokens.startsWith("bread")
				? "BREAD"
				: file.source === "Imported archive"
					? "Drive archive"
					: "Archive";

	const body = normalizedForTokens
		.replace(/^bread[-_]*/, "")
		.replace(/^toasted[-_]*trax[-_]*/, "")
		.replace(/^drive[-_]*/, "");
	let tokens = body.split("-").filter(Boolean);
	if (tokens.length === 0) return undefined;

	let assetType = "Image";
	if (tokens.some((token) => token === "story")) {
		assetType = "Story";
	} else if (tokens.some((token) => token === "ig" || token === "instagram")) {
		assetType = "Instagram";
	} else if (tokens.some((token) => token === "fb" || token === "facebook")) {
		assetType = "Facebook";
	} else if (tokens.some((token) => token === "poster")) {
		assetType = "Poster";
	} else if (tokens.some((token) => token === "flyer" || token === "flier")) {
		assetType = "Flyer";
	} else {
		const tailToken = tokens[tokens.length - 1];
		if (assetTypeDirectory[tailToken]) {
			assetType = assetTypeDirectory[tailToken];
			tokens = tokens.slice(0, -1);
		}
	}

	const parsedDate =
		parseDateFromTail(tokens) ??
		parseIsoDate(normalizedForTokens) ??
		parseCompactDate(normalizedForTokens);
	if (parsedDate) tokens = tokens.slice(0, -parsedDate.consumedTokens);

	const eventCore = toTitle(tokens);
	const title = eventCore ? `${series} ${eventCore}` : series;

	return {
		filename,
		imagePath: file.imagePath,
		title,
		series,
		source: file.source,
		dateLabel: parsedDate?.label,
		hasYear: parsedDate?.hasYear ?? false,
		dateSort: parsedDate?.sortValue ?? 0,
		assetType,
	};
};

// ── Radio show data generation ─────────────────────────────────────────────

const getPreferredImageBySlug = () => {
	const radioDirectory = `${publicDir}radio/`;
	const files = readdirSync(radioDirectory, { withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => entry.name);
	const preferredBySlug = new Map();

	for (const filename of files) {
		const extension = extname(filename).toLowerCase();
		if (!supportedImageExtensions.has(extension)) continue;
		const slug = filename.slice(0, -extension.length).toLowerCase();
		if (!slug || slug === "null") continue;
		const current = preferredBySlug.get(slug);
		if (!current) {
			preferredBySlug.set(slug, filename);
			continue;
		}
		const currentExtension = extname(current).toLowerCase();
		const nextScore = extensionPriority[extension] ?? 0;
		const currentScore = extensionPriority[currentExtension] ?? 0;
		if (nextScore > currentScore) preferredBySlug.set(slug, filename);
	}
	return [...preferredBySlug.values()].sort((left, right) =>
		left.localeCompare(right),
	);
};

const parseRadioShow = (filename) => {
	const extension = extname(filename).toLowerCase();
	const basename = filename.slice(0, -extension.length);
	if (!basename.startsWith("bread-fm-")) return undefined;
	const detailSlug = basename.replace(/^bread-fm-/, "");
	const parts = detailSlug.split("-").filter(Boolean);
	if (parts.length < 3) return undefined;
	const dayToken = parts[parts.length - 1];
	const monthToken = parts[parts.length - 2].toLowerCase();
	const month = monthDirectory[monthToken];
	const day = Number.parseInt(dayToken, 10);
	if (!month || Number.isNaN(day) || day < 1 || day > 31) return undefined;
	const guestSlug = parts.slice(0, -2).join("-");
	if (!guestSlug) return undefined;
	return {
		filename,
		imagePath: `/radio/${filename}`,
		guests: toPersonLabel(guestSlug),
		dateLabel: `${month.label} ${day}`,
		sortKey: month.index * 100 + day,
	};
};

// ── Generate and write ─────────────────────────────────────────────────────

mkdirSync(srcDataDir, { recursive: true });

const flyerAssets = getPreferredFlyerFiles()
	.map((file) => parseFlyerAsset(file))
	.filter((asset) => Boolean(asset))
	.sort((left, right) => {
		if (left.hasYear !== right.hasYear) return left.hasYear ? -1 : 1;
		if (left.dateSort !== right.dateSort) return right.dateSort - left.dateSort;
		return left.title.localeCompare(right.title);
	});

const flyersData = {
	flyerAssets,
	datedAssetCount: flyerAssets.filter((a) => Boolean(a.dateLabel)).length,
	seriesCount: new Set(flyerAssets.map((a) => a.series)).size,
	importedAssetCount: flyerAssets.filter((a) => a.source === "Imported archive")
		.length,
	topLevelAssetCount: flyerAssets.filter((a) => a.source === "Main site folder")
		.length,
};

writeFileSync(
	`${srcDataDir}flyers.json`,
	JSON.stringify(flyersData, null, 2),
	"utf-8",
);
console.log(
	`Generated flyers.json with ${flyersData.flyerAssets.length} assets`,
);

const radioShows = getPreferredImageBySlug()
	.map((filename) => parseRadioShow(filename))
	.filter((show) => Boolean(show))
	.sort(
		(left, right) =>
			right.sortKey - left.sortKey || left.guests.localeCompare(right.guests),
	);

const radioShowsData = {
	radioShows,
	uniqueGuestCount: new Set(radioShows.map((s) => s.guests)).size,
	monthCount: new Set(radioShows.map((s) => s.dateLabel.split(" ")[0])).size,
};

writeFileSync(
	`${srcDataDir}radio-shows.json`,
	JSON.stringify(radioShowsData, null, 2),
	"utf-8",
);
console.log(
	`Generated radio-shows.json with ${radioShowsData.radioShows.length} shows`,
);

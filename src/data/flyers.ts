import { existsSync, readdirSync } from "fs";
import { extname } from "path";
import { fileURLToPath } from "url";

export interface ParsedFlyerAsset {
	filename: string;
	imagePath: string;
	title: string;
	series: string;
	source: string;
	dateLabel?: string;
	hasYear: boolean;
	dateSort: number;
	assetType: string;
}

interface FlyerFileCandidate {
	filename: string;
	imagePath: string;
	source: "Main site folder" | "Imported archive";
}

const supportedImageExtensions = new Set([
	".jpg",
	".jpeg",
	".png",
	".webp",
	".gif",
	".avif",
]);
const extensionPriority: Record<string, number> = {
	".webp": 5,
	".jpg": 4,
	".jpeg": 4,
	".png": 3,
	".avif": 2,
	".gif": 1,
};

const monthDirectory: Record<string, { index: number; label: string }> = {
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

const assetTypeDirectory: Record<string, string> = {
	flyer: "Flyer",
	poster: "Poster",
	instagram: "Instagram",
	story: "Story",
};

const tokenOverrides: Record<string, string> = {
	dj: "DJ",
	djs: "DJs",
	tf1000: "TF1000",
	shl: "SHL",
	fb: "FB",
	ig: "IG",
	bw: "B/W",
	yxexaxr: "YXEXAXR",
};

const toTitleToken = (token: string): string => {
	const normalized = token.toLowerCase();
	if (tokenOverrides[normalized]) return tokenOverrides[normalized];
	if (/^\d+$/.test(token)) return token;
	if (token.length === 1) return token.toUpperCase();
	return token[0].toUpperCase() + token.slice(1).toLowerCase();
};

const toTitle = (tokens: string[]): string =>
	tokens
		.filter(Boolean)
		.map((token) => toTitleToken(token))
		.join(" ");

const walkImageDirectory = (
	directory: string,
	imagePathPrefix: string,
	source: FlyerFileCandidate["source"],
	recursive: boolean,
): FlyerFileCandidate[] => {
	const output: FlyerFileCandidate[] = [];
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

interface ParsedDateResult {
	label: string;
	sortValue: number;
	consumedTokens: number;
	hasYear: boolean;
}

const parseDateFromTail = (tokens: string[]): ParsedDateResult | undefined => {
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

const parseCompactDate = (basename: string): ParsedDateResult | undefined => {
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

const parseIsoDate = (basename: string): ParsedDateResult | undefined => {
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

const getPreferredFlyerFiles = (): FlyerFileCandidate[] => {
	const publicDirectory = fileURLToPath(
		new URL("../../public/", import.meta.url),
	);
	const driveDirectoryPath = fileURLToPath(
		new URL("../../public/drive/", import.meta.url),
	);
	const driveDirectoryAvailable = existsSync(driveDirectoryPath);
	const candidates = [
		...walkImageDirectory(publicDirectory, "/", "Main site folder", false),
		...(driveDirectoryAvailable
			? walkImageDirectory(
					driveDirectoryPath,
					"/drive/",
					"Imported archive",
					true,
				)
			: []),
	];
	const preferredBySlug = new Map<string, FlyerFileCandidate>();

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

const parseFlyerAsset = (
	file: FlyerFileCandidate,
): ParsedFlyerAsset | undefined => {
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

export const flyerAssets = getPreferredFlyerFiles()
	.map((file) => parseFlyerAsset(file))
	.filter((asset): asset is ParsedFlyerAsset => Boolean(asset))
	.sort((left, right) => {
		if (left.hasYear !== right.hasYear) return left.hasYear ? -1 : 1;
		if (left.dateSort !== right.dateSort) return right.dateSort - left.dateSort;
		return left.title.localeCompare(right.title);
	});

export const datedAssetCount = flyerAssets.filter((asset) =>
	Boolean(asset.dateLabel),
).length;
export const seriesCount = new Set(flyerAssets.map((asset) => asset.series))
	.size;
export const importedAssetCount = flyerAssets.filter(
	(asset) => asset.source === "Imported archive",
).length;
export const topLevelAssetCount = flyerAssets.filter(
	(asset) => asset.source === "Main site folder",
).length;

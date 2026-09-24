const WIDTH = 1200;
const HEIGHT = 630;

export const OG_IMAGE_WIDTH = WIDTH;
export const OG_IMAGE_HEIGHT = HEIGHT;

const ACCENT_COLOR = "#ff5a1f";

const OgVariant = {
	home: "home",
	archive: "archive",
	story: "story",
};

// Mirrors the site's tokens in src/styles/global.css so cards match the pages.
const siteColors = {
	bg: "#080808",
	panel: "#0d0d0d",
	stroke: "#262626",
	title: "#ededed",
	body: "#c8c8c8",
	muted: "#a3a3a3",
	accent: ACCENT_COLOR,
};

const palette = {
	home: siteColors,
	archive: siteColors,
	story: siteColors,
};

const escapeXml = (value) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

const normalize = (value) => value.replace(/\s+/g, " ").trim();

const wrapLines = (text, maxLength, maxLines) => {
	const clean = normalize(text);
	if (!clean) return [""];

	const lines = [];
	let line = "";

	for (const word of clean.split(" ")) {
		const next = line ? `${line} ${word}` : word;

		if (next.length > maxLength && line) {
			lines.push(line);
			line = word;
		} else {
			line = next;
		}
	}

	if (line) lines.push(line);
	if (lines.length <= maxLines) return lines;

	const kept = lines.slice(0, maxLines);
	kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s.,;:!?-]+$/g, "")}…`;
	return kept;
};

export const createOgSvg = ({ eyebrow, title, subtitle, variant = "home" }) => {
	const colors = palette[variant];
	const safeEyebrow = escapeXml(normalize(eyebrow).toUpperCase());
	const titleLines = wrapLines(title, 24, 3);
	const subtitleLines = wrapLines(subtitle, 56, 2);

	const titleFontSize = titleLines.length > 2 ? 58 : 68;
	const titleLineHeight = titleLines.length > 2 ? 70 : 78;

	const titleMarkup = titleLines
		.map((line, index) => {
			const y = 228 + index * titleLineHeight;
			return `<text x="112" y="${y}" fill="${colors.title}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="${titleFontSize}" font-weight="700" letter-spacing="-0.9">${escapeXml(line)}</text>`;
		})
		.join("");

	const subtitleTop = 228 + (titleLines.length - 1) * titleLineHeight + 80;
	const subtitleMarkup = subtitleLines
		.map((line, index) => {
			const y = subtitleTop + index * 36;
			return `<text x="112" y="${y}" fill="${colors.body}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="450">${escapeXml(line)}</text>`;
		})
		.join("");

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(normalize(title))} — BREAD.fm</title>
  <desc id="desc">${escapeXml(normalize(subtitle))}</desc>

  <rect width="1200" height="630" fill="${colors.bg}" />
  <rect x="56" y="56" width="1088" height="518" rx="8" fill="${colors.panel}" stroke="${colors.stroke}" stroke-width="1.5" />

  <line x1="112" y1="104" x2="1096" y2="104" stroke="${colors.stroke}" stroke-width="1" />
  <text x="112" y="92" fill="${colors.accent}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="19" font-weight="700" letter-spacing="1.8">${safeEyebrow}</text>
  <text x="1096" y="92" text-anchor="end" fill="${colors.muted}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="19">bread.fm</text>

  ${titleMarkup}
  ${subtitleMarkup}

  <line x1="112" y1="506" x2="1096" y2="506" stroke="${colors.stroke}" stroke-width="1" />
  <text x="112" y="544" fill="${colors.muted}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="21" letter-spacing="0.8">BREAD · SAN FRANCISCO · 2015–2024</text>
</svg>`;
};

export const svgResponse = (svg) =>
	new Response(svg, {
		headers: {
			"Content-Type": "image/svg+xml; charset=utf-8",
			"Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
		},
	});

export const OG_VARIANT = OgVariant;

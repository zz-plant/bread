import { BREAD_LOCKUP } from "./bread-logo.mjs";

const WIDTH = 1200;
const HEIGHT = 630;

export const OG_IMAGE_WIDTH = WIDTH;
export const OG_IMAGE_HEIGHT = HEIGHT;

// The card is a black panel on the left; the flyer wall fills the rest.
export const OG_ART_LEFT = 560;

const colors = {
	bg: "#000000",
	title: "#ffffff",
	body: "#c4c4c4",
	muted: "#8f8f8f",
	rule: "#2e2e2e",
};

const FONT =
	"Archivo, Inter, 'Helvetica Neue', Helvetica, Arial, 'DejaVu Sans', sans-serif";

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
	if (!clean) return [];

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

// An SVG card with a transparent right side, laid over the flyer wall by
// scripts/generate-og-images.mjs. Logo, title and subtitle sit on black,
// the way the flyers set a lineup over their art.
export const createOgSvg = ({ eyebrow, title, subtitle }) => {
	const x = 64;
	const textWidth = OG_ART_LEFT - x - 48;

	const logoHeight = 50;
	const logoScale = logoHeight / BREAD_LOCKUP.height;

	const longTitle = normalize(title).length > 26;
	const titleSize = longTitle ? 54 : 68;
	const titleLines = wrapLines(
		title,
		Math.floor(textWidth / (titleSize * 0.56)),
		3,
	);
	const titleLeading = Math.round(titleSize * 1.02);
	const subtitleLines = wrapLines(subtitle, 34, 3);

	// Bottom-align the text block above the footer, like a flyer's info block.
	const footerY = HEIGHT - 60;
	const blockBottom = footerY - 44;
	const subtitleTop = blockBottom - (subtitleLines.length - 1) * 34;
	const titleBottom = subtitleLines.length ? subtitleTop - 52 : blockBottom;
	const titleTop = titleBottom - (titleLines.length - 1) * titleLeading;
	const eyebrowY = Math.round(titleTop - titleSize * 0.82 - 22);

	const titleMarkup = titleLines
		.map(
			(line, index) =>
				`<text x="${x}" y="${titleTop + index * titleLeading}" fill="${colors.title}" font-family="${FONT}" font-size="${titleSize}" font-weight="800" letter-spacing="-1.2">${escapeXml(line)}</text>`,
		)
		.join("");

	const subtitleMarkup = subtitleLines
		.map(
			(line, index) =>
				`<text x="${x}" y="${subtitleTop + index * 34}" fill="${colors.body}" font-family="${FONT}" font-size="26" font-weight="500">${escapeXml(line)}</text>`,
		)
		.join("");

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(normalize(title))} — BREAD</title>
  <desc id="desc">${escapeXml(normalize(subtitle))}</desc>

  <rect width="${OG_ART_LEFT}" height="${HEIGHT}" fill="${colors.bg}" />
  <path transform="translate(${x} 60) scale(${logoScale.toFixed(4)})" fill="${colors.title}" fill-rule="evenodd" d="${BREAD_LOCKUP.d}" />

  <text x="${x}" y="${eyebrowY}" fill="${colors.muted}" font-family="${FONT}" font-size="19" font-weight="700" letter-spacing="2.4">${escapeXml(normalize(eyebrow).toUpperCase())}</text>
  ${titleMarkup}
  ${subtitleMarkup}

  <line x1="${x}" y1="${footerY - 6}" x2="${OG_ART_LEFT - 48}" y2="${footerY - 6}" stroke="${colors.rule}" stroke-width="2" />
  <text x="${x}" y="${footerY + 30}" fill="${colors.muted}" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="1.6">SAN FRANCISCO · 2015–2024</text>
  <text x="${OG_ART_LEFT - 48}" y="${footerY + 30}" text-anchor="end" fill="${colors.title}" font-family="${FONT}" font-size="20" font-weight="700">bread.fm</text>
</svg>`;
};

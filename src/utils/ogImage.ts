const WIDTH = 1200;
const HEIGHT = 630;

export const OG_IMAGE_WIDTH = WIDTH;
export const OG_IMAGE_HEIGHT = HEIGHT;

type OgVariant = "home" | "archive" | "story";

interface OgImageConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant?: OgVariant;
}

interface Palette {
  bg: string;
  panel: string;
  stroke: string;
  title: string;
  body: string;
  muted: string;
  accent: string;
}

const palette: Record<OgVariant, Palette> = {
   home: {
     bg: "#f8fafc",
     panel: "#ffffff",
     stroke: "#e2e8f0",
     title: "#0f172a",
     body: "#334155",
     muted: "#64748b",
     accent: "#ff5a1f",
   },
   archive: {
     bg: "#020617",
     panel: "#0b1220",
     stroke: "#1f2937",
     title: "#f8fafc",
     body: "#cbd5e1",
     muted: "#94a3b8",
     accent: "#ea580c",
   },
   story: {
     bg: "#020617",
     panel: "#0b1220",
     stroke: "#1f2937",
     title: "#f8fafc",
     body: "#cbd5e1",
     muted: "#94a3b8",
     accent: "#ea580c",
   },
};

const routeContext: Record<OgVariant, string> = {
  home: "Home overview",
  archive: "Archive records",
  story: "Story history",
};

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const normalize = (value: string): string => value.replace(/\s+/g, " ").trim();

const wrapLines = (
  text: string,
  maxLength: number,
  maxLines: number,
): string[] => {
  const clean = normalize(text);
  if (!clean) return [""];

  const words = clean.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;

    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = next;
    }
  }

  if (lines.length < maxLines && line) lines.push(line);

  if (lines.length === maxLines && lines.join(" ").length < clean.length) {
    lines[maxLines - 1] =
      `${lines[maxLines - 1].replace(/[\s.,;:!?-]+$/g, "")}…`;
  }

  return lines.slice(0, maxLines);
};

export const createOgSvg = ({
  eyebrow,
  title,
  subtitle,
  variant = "home",
}: OgImageConfig): string => {
  const colors = palette[variant];
  const safeEyebrow = escapeXml(normalize(eyebrow).toUpperCase());
  const titleLines = wrapLines(title, 24, 3);
  const subtitleLines = wrapLines(subtitle, 56, 2);

  const titleFontSize = titleLines.length > 2 ? 58 : 68;
  const titleLineHeight = titleLines.length > 2 ? 70 : 78;

  const titleMarkup = titleLines
    .map((line, index) => {
      const y = 248 + index * titleLineHeight;
      return `<text x="112" y="${y}" fill="${colors.title}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="${titleFontSize}" font-weight="700" letter-spacing="-0.9">${escapeXml(line)}</text>`;
    })
    .join("");

  const subtitleMarkup = subtitleLines
    .map((line, index) => {
      const y = 496 + index * 34;
      return `<text x="112" y="${y}" fill="${colors.body}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="450">${escapeXml(line)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(normalize(title))} — BREAD.fm</title>
  <desc id="desc">${escapeXml(normalize(subtitle))}</desc>

  <rect width="1200" height="630" fill="${colors.bg}" />
  <rect x="56" y="56" width="1088" height="518" rx="16" fill="${colors.panel}" stroke="${colors.stroke}" stroke-width="1.5" />

  <line x1="112" y1="104" x2="1096" y2="104" stroke="${colors.stroke}" stroke-width="1" />
  <text x="112" y="92" fill="${colors.accent}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="19" font-weight="700" letter-spacing="1.8">${safeEyebrow}</text>
  <text x="1096" y="92" text-anchor="end" fill="${colors.muted}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="19">${routeContext[variant]}</text>

  ${titleMarkup}
  ${subtitleMarkup}

  <line x1="112" y1="550" x2="1096" y2="550" stroke="${colors.stroke}" stroke-width="1" />
  <text x="112" y="590" fill="${colors.muted}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="21" letter-spacing="0.8">BREAD • SAN FRANCISCO</text>
</svg>`;
};

export const svgResponse = (svg: string): Response =>
  new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });

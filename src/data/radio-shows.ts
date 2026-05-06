import { readdirSync } from 'fs';
import { extname } from 'path';
import { fileURLToPath } from 'url';

interface ParsedRadioShow {
  filename: string;
  imagePath: string;
  guests: string;
  dateLabel: string;
  sortKey: number;
}

const supportedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const extensionPriority: Record<string, number> = {
  '.webp': 5,
  '.jpg': 4,
  '.jpeg': 4,
  '.png': 3,
  '.avif': 2,
  '.gif': 1
};

const monthDirectory: Record<string, { index: number; label: string }> = {
  jan: { index: 1, label: 'January' },
  january: { index: 1, label: 'January' },
  feb: { index: 2, label: 'February' },
  february: { index: 2, label: 'February' },
  mar: { index: 3, label: 'March' },
  march: { index: 3, label: 'March' },
  apr: { index: 4, label: 'April' },
  april: { index: 4, label: 'April' },
  may: { index: 5, label: 'May' },
  jun: { index: 6, label: 'June' },
  june: { index: 6, label: 'June' },
  jul: { index: 7, label: 'July' },
  july: { index: 7, label: 'July' },
  aug: { index: 8, label: 'August' },
  august: { index: 8, label: 'August' },
  sep: { index: 9, label: 'September' },
  sept: { index: 9, label: 'September' },
  september: { index: 9, label: 'September' },
  oct: { index: 10, label: 'October' },
  october: { index: 10, label: 'October' },
  nov: { index: 11, label: 'November' },
  november: { index: 11, label: 'November' },
  dec: { index: 12, label: 'December' },
  december: { index: 12, label: 'December' }
};

const tokenOverrides: Record<string, string> = {
  dj: 'DJ',
  djs: 'DJs',
  tf1000: 'TF1000',
  shl: 'SHL'
};

const toTitleToken = (token: string): string => {
  const normalized = token.toLowerCase();
  if (tokenOverrides[normalized]) return tokenOverrides[normalized];
  if (/^\d+$/.test(token)) return token;
  if (token.length === 1) return token.toUpperCase();
  return token[0].toUpperCase() + token.slice(1).toLowerCase();
};

const toPersonLabel = (rawSlug: string): string =>
  rawSlug
    .split('-')
    .filter(Boolean)
    .map((token) => toTitleToken(token))
    .join(' ');

const getPreferredImageBySlug = (): string[] => {
  const radioDirectory = fileURLToPath(new URL('../../public/radio/', import.meta.url));
  const files = readdirSync(radioDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
  const preferredBySlug = new Map<string, string>();

  for (const filename of files) {
    const extension = extname(filename).toLowerCase();
    if (!supportedImageExtensions.has(extension)) continue;
    const slug = filename.slice(0, -extension.length).toLowerCase();
    if (!slug || slug === 'null') continue;
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
  return [...preferredBySlug.values()].sort((left, right) => left.localeCompare(right));
};

const parseRadioShow = (filename: string): ParsedRadioShow | undefined => {
  const extension = extname(filename).toLowerCase();
  const basename = filename.slice(0, -extension.length);
  if (!basename.startsWith('bread-fm-')) return undefined;
  const detailSlug = basename.replace(/^bread-fm-/, '');
  const parts = detailSlug.split('-').filter(Boolean);
  if (parts.length < 3) return undefined;
  const dayToken = parts[parts.length - 1];
  const monthToken = parts[parts.length - 2].toLowerCase();
  const month = monthDirectory[monthToken];
  const day = Number.parseInt(dayToken, 10);
  if (!month || Number.isNaN(day) || day < 1 || day > 31) return undefined;
  const guestSlug = parts.slice(0, -2).join('-');
  if (!guestSlug) return undefined;
  return {
    filename,
    imagePath: `/radio/${filename}`,
    guests: toPersonLabel(guestSlug),
    dateLabel: `${month.label} ${day}`,
    sortKey: month.index * 100 + day
  };
};

export const radioShows = getPreferredImageBySlug()
  .map((filename) => parseRadioShow(filename))
  .filter((show): show is ParsedRadioShow => Boolean(show))
  .sort((left, right) => right.sortKey - left.sortKey || left.guests.localeCompare(right.guests));

export const uniqueGuestCount = new Set(radioShows.map((show) => show.guests)).size;
export const monthCount = new Set(radioShows.map((show) => show.dateLabel.split(' ')[0])).size;

// `sizes` values for ResponsiveImage, measured against the CSS that lays the
// images out. If those grids change, re-measure and update these.

// .gallery in global.css (flyers, radio shows, story): two columns up to
// ~735px, then 13.5rem-minimum auto-fill columns inside the 72rem page.
export const GALLERY_IMAGE_SIZES =
	"(max-width: 735px) 45vw, (max-width: 990px) 30vw, (max-width: 1216px) 23vw, 17rem";

// .featured-visual-grid in home.css: an 11rem-wide swipe strip up to 700px,
// then four columns inside the 72rem page.
export const FEATURED_IMAGE_SIZES =
	"(max-width: 700px) 11rem, (max-width: 1216px) 23vw, 17.25rem";

export interface ResponsiveImageEntry {
	hash: string;
	width: number;
	height: number;
	avif?: string;
	webp: string;
	fallback: { type: string; src: string; srcset: string };
}

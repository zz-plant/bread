// `sizes` values for ResponsiveImage, measured against the CSS that lays the
// images out. If those grids change, re-measure and update these.

// .gallery in global.css (flyers, radio shows, story): two columns up to
// ~735px, then 13.5rem-minimum auto-fill columns inside the 72rem page.
export const GALLERY_IMAGE_SIZES =
	"(max-width: 735px) 45vw, (max-width: 990px) 30vw, (max-width: 1216px) 23vw, 17rem";

// .featured-visual-grid in home.css: a 9.5rem-wide swipe strip up to 700px,
// then six columns inside the 72rem page.
export const FEATURED_IMAGE_SIZES =
	"(max-width: 700px) 9.5rem, (max-width: 1216px) 15vw, 11.25rem";

// .event-flyer in home.css: the thumbnail beside each event row.
export const EVENT_FLYER_SIZES = "(max-width: 700px) 3.5rem, 5rem";

export interface ResponsiveImageEntry {
	hash: string;
	width: number;
	height: number;
	avif?: string;
	webp: string;
	fallback: { type: string; src: string; srcset: string };
}

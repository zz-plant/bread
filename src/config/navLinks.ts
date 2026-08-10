// src/config/navLinks.ts - Central Source of Truth for site navigation links

/**
 * Defines all canonical global navigation structures for bread.fm site.
 * This single source must be maintained for consistency across the entire site.
 */

interface NavLink {
	title: string;
	href: string;
	// Optional: Check if target is a collection/category root path
}

/** Primary navigation links (used in headers). */
export const PRIMARY_NAV_LINKS: NavLink[] = [
	{ title: "Home", href: "/" },
	{ title: "Archive", href: "/archive/" },
	{ title: "Story", href: "/story/" },
];

/** Footer navigation links (less critical, often includes metadata). */
export const FOOTER_NAV_LINKS: NavLink[] = [
	{ title: "About", href: "/about/" },
];

/** Links for auxiliary sections or related features (e.g., events, roster) */
export const AUXILIARY_NAV_LINKS: NavLink[] = [
	{ title: "Events", href: "/events/" },
	{ title: "Roster", href: "/roster/" },
];

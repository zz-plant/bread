import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Legacy URLs. The Cloudflare adapter writes these to `_redirects`, which
// Workers static assets serves as HTTP 301s.
export const redirects = {
	"/blog/the-story-of-bread": "/story/",
	"/archive/narrative-history": "/story/",
};

const withoutTrailingSlash = (pathname) => pathname.replace(/\/+$/, "") || "/";
const redirectSources = new Set(
	Object.keys(redirects).map(withoutTrailingSlash),
);

// A sitemap lists only canonical URLs. Astro leaves config redirects out of
// its built-page list today; this filter keeps them out if that changes.
export const isSitemapPage = (page) =>
	!redirectSources.has(withoutTrailingSlash(new URL(page).pathname));

export default defineConfig({
	site: "https://bread.fm",
	redirects,
	integrations: [sitemap({ filter: isSitemapPage }), mdx()],
	adapter: cloudflare(),
	vite: {
		ssr: {
			noExternal: [],
			external: ["fs", "path", "url"],
		},
	},
});

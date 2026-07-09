import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";

const pwa = VitePWA({
	registerType: "autoUpdate",
	includeAssets: ["favicon.svg"],
	manifest: {
		name: "BREAD Archive",
		short_name: "BREAD",
		description: "BREAD history, flyers, radio, and event archive.",
		theme_color: "#0a0a0a",
		background_color: "#0a0a0a",
		display: "standalone",
		start_url: "/",
		scope: "/",
		icons: [
			{
				src: "/favicon.svg",
				sizes: "any",
				type: "image/svg+xml",
				purpose: "any maskable",
			},
		],
	},
	workbox: {
		navigateFallback: "/",
		globPatterns: ["**/*.{css,js,html,svg,png,jpg,jpeg,webp,woff2}"],
		runtimeCaching: [
			{
				urlPattern: ({ request }) => request.destination === "image",
				handler: "CacheFirst",
				options: {
					cacheName: "bread-images",
					expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
				},
			},
		],
	},
});

export default defineConfig({
	site: "https://bread.fm",
	integrations: [sitemap(), cloudflare(), mdx()],
	adapter: cloudflare(),
	vite: {
		plugins: [pwa],
		ssr: {
			noExternal: [],
			external: ["fs", "path", "url"],
		},
	},
});

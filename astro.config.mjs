import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://bread.fm",
	integrations: [sitemap(), cloudflare(), mdx()],
	adapter: cloudflare(),
	vite: {
		ssr: {
			noExternal: [],
			external: ["fs", "path", "url"],
		},
	},
});

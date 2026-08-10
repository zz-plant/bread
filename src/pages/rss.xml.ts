import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { toContentSlug } from "../utils/content";

export async function GET(context: { site: URL }) {
	const posts = await getCollection(
		"blog",
		({ data }: { data: { draft: boolean } }) => !data.draft,
	);

	// Only the story post remains; it redirects to /story/
	const storyPost = posts.find(
		(post: { id: string }) => toContentSlug(post.id) === "the-story-of-bread",
	);
	const items = storyPost
		? [
				{
					title: storyPost.data.title,
					description: storyPost.data.description,
					pubDate: storyPost.data.date,
					link: "/story/",
				},
			]
		: [];

	return rss({
		title: "BREAD Story",
		description: "The canonical history of BREAD.",
		site: context.site,
		items,
		customData: `<language>en-us</language>`,
	});
}

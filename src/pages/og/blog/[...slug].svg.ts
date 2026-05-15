import { getCollection } from "astro:content";
import { createOgSvg, svgResponse } from "../../../utils/ogImage";
import { toContentSlug } from "../../../utils/content";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: toContentSlug(post.id) },
    props: {
      title: post.data.title,
      description: post.data.description,
    },
  }));
}

export function GET({
  props,
}: {
  props: { title: string; description: string };
}) {
  return svgResponse(
    createOgSvg({
      eyebrow: "BREAD STORY",
      title: props.title,
      subtitle: props.description,
      variant: "story",
    }),
  );
}

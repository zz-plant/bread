import { getCollection } from "astro:content";
import { createOgSvg, svgResponse } from "../../../utils/ogImage";
import { toContentSlug } from "../../../utils/content";

export async function getStaticPaths() {
  const hiddenSlugs = new Set(["timeline", "research-methods-confidence"]);
  const pages = (await getCollection("archive")).filter(
    (page) => !hiddenSlugs.has(page.slug),
  );

  return pages.map((page) => ({
    params: { slug: toContentSlug(page.id) },
    props: {
      title: page.data.title,
      description: page.data.description,
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
      eyebrow: "BREAD ARCHIVE",
      title: props.title,
      subtitle: props.description,
      variant: "archive",
    }),
  );
}

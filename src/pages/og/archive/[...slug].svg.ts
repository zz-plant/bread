import { getCollection } from "astro:content";
import { createOgSvg, svgResponse } from "../../../utils/ogImage";
import { toContentSlug } from "../../../utils/content";
import { includeInArchiveCatchall } from "../../../utils/archive";

export async function getStaticPaths() {
  const pages = (await getCollection("archive")).filter((page) =>
    includeInArchiveCatchall(page.slug),
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

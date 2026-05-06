import { getCollection } from "astro:content";
import { createOgSvg, svgResponse } from "../../utils/ogImage";
import { toContentSlug } from "../../utils/content";
import { includeInArchiveCatchall } from "../../utils/archive";

export async function getStaticPaths() {
  const paths = [];

  // Add homepage path - for catch-all routes, we need to provide a slug param
  // For homepage, we'll use an empty string or special indicator
  paths.push({ params: { slug: "" }, props: { type: "home" } });

  // Archive pages
  const archivePages = (await getCollection("archive")).filter((page) =>
    includeInArchiveCatchall(page.id),
  );
  paths.push(
    ...archivePages.map((page) => ({
      params: { slug: toContentSlug(page.id) },
      props: { type: "archive", title: page.data.title, description: page.data.description },
    }))
  );

  return paths;
}

export function GET({ props }: { props: { type: string; title?: string; description?: string } }) {
  // Determine variant and content based on route
  let variant: "home" | "archive" | "story" = "home";
  let title = "";
  let description = "";
  let eyebrow = "";

  if (props.type === "home") {
    variant = "home";
    eyebrow = "BREAD // SAN FRANCISCO";
    title = "BREAD // Archive";
    description = "Timeline, people, radio, and flyers from San Francisco.";
  } else if (props.type === "archive") {
    variant = "archive";
    eyebrow = "BREAD ARCHIVE";
    title = props.title ?? "BREAD Archive";
    description = props.description ?? "Timeline, venues, people, and the events that shaped BREAD.";
  }

  return svgResponse(
    createOgSvg({
      eyebrow,
      title,
      subtitle: description,
      variant,
    }),
  );
}
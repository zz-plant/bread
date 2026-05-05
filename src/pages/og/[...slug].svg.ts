import { getCollection } from "astro:content";
import { createOgSvg, svgResponse } from "../../utils/ogImage";
import { toContentSlug } from "../../utils/content";
import { includeInArchiveCatchall } from "../../utils/archive";

export async function getStaticPaths() {
  // Home page
  const paths = [{ params: {}, props: { type: "home" } }];

  // Archive pages
  const archivePages = (await getCollection("archive")).filter((page) =>
    includeInArchiveCatchall(page.slug),
  );
  paths.push(
    ...archivePages.map((page) => ({
      params: { slug: toContentSlug(page.id) },
      props: { type: "archive", title: page.data.title, description: page.data.description },
    }))
  );

  // Blog posts
  const blogPosts = await getCollection("blog", ({ data }) => !data.draft);
  paths.push(
    ...blogPosts.map((post) => ({
      params: { slug: toContentSlug(post.id) },
      props: { type: "blog", title: post.data.title, description: post.data.description },
    }))
  );

  return paths;
}

export function GET({ params, props }: { params: { slug?: string }; props: { type: string; title?: string; description?: string } }) {
  // Determine variant and content based on route
  let variant: "home" | "archive" | "story" = "home";
  let title = "";
  let description = "";
  let eyebrow = "";
  let routeContext = "";

  if (props.type === "home") {
    variant = "home";
    eyebrow = "BREAD // SAN FRANCISCO";
    title = "BREAD // Archive";
    description = "Timeline, people, radio, and flyers from San Francisco.";
    routeContext = "Home overview";
  } else if (props.type === "archive") {
    variant = "archive";
    eyebrow = "BREAD ARCHIVE";
    title = props.title ?? "BREAD Archive";
    description = props.description ?? "Timeline, venues, people, and the events that shaped BREAD.";
    routeContext = "Archive records";
  } else if (props.type === "blog") {
    variant = "story";
    eyebrow = "BREAD STORY";
    title = props.title ?? "";
    description = props.description ?? "";
    routeContext = "Story history";
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
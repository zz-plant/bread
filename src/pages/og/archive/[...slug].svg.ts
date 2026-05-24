import { getCollection } from "astro:content";
import { includeInArchiveCatchall } from "../../../utils/archive";
import { toContentSlug } from "../../../utils/content";
import { createOgSvg, svgResponse } from "../../../utils/ogImage";

export async function getStaticPaths() {
	const pages = (await getCollection("archive")).filter((page) =>
		includeInArchiveCatchall(page.id),
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

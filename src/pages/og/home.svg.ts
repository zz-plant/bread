import { createOgSvg, svgResponse } from "../../utils/ogImage";

export function GET() {
	return svgResponse(
		createOgSvg({
			eyebrow: "BREAD // SAN FRANCISCO",
			title: "BREAD // Archive",
			subtitle: "Timeline, people, radio, and flyers from San Francisco.",
			variant: "home",
		}),
	);
}

import { createOgSvg, svgResponse } from "../../utils/ogImage";

export function GET() {
  return svgResponse(
    createOgSvg({
      eyebrow: "BREAD ARCHIVE",
      title: "BREAD Archive",
      subtitle: "Timeline, venues, people, and the events that shaped BREAD.",
      variant: "archive",
    }),
  );
}

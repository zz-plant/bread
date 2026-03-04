import { createOgSvg, svgResponse } from "../../utils/ogImage";

export function GET() {
  return svgResponse(
    createOgSvg({
      eyebrow: "BREAD ARCHIVE",
      title: "Timeline",
      subtitle: "From 2015 club nights to 2024 radio and event announcements.",
      variant: "archive",
    }),
  );
}

import { createOgSvg, svgResponse } from '../../utils/ogImage';

export function GET() {
  return svgResponse(
    createOgSvg({
      eyebrow: 'BREAD ARCHIVE',
      title: 'BREAD Archive',
      subtitle: 'Overview of eras, venues, people, and source-backed records.',
      variant: 'archive'
    })
  );
}

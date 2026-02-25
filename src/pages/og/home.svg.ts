import { createOgSvg, svgResponse } from '../../utils/ogImage';

export function GET() {
  return svgResponse(
    createOgSvg({
      eyebrow: 'BREAD // SAN FRANCISCO',
      title: 'BREAD // Archive',
      subtitle: 'Timeline, people, radio, and long-memory records from San Francisco.',
      variant: 'home'
    })
  );
}

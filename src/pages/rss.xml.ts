import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toContentSlug } from '../utils/content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  return rss({
    title: 'BREAD Journal',
    description: 'Posts, reflections, and updates around the BREAD archive.',
    site: context.site,
    items: posts.map((post) => {
      const slug = toContentSlug(post.id);
      const href = slug === 'the-story-of-bread' ? '/story/' : `/blog/${slug}/`;
      
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: href,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}

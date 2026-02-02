import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { parseDate } from '../util/date';

export async function GET(context: any) {
  const blog = await getCollection('blog');

  const posts = blog
    .filter((post: any) => !post.data.draft)
    .sort((a: any, b: any) => b.id.localeCompare(a.id))
    .map((post: any) => {
      const date = post.data.published || parseDate(post.id);
      const title = typeof post.data.title === 'string'
        ? post.data.title
        : post.data.title?.en || post.data.title?.es || post.id;

      return {
        title,
        pubDate: date ? new Date(date) : new Date(),
        link: `/en/blog/${post.id.replace('.md', '')}/`,
      };
    });

  return rss({
    title: 'A. Matías Quezada',
    description: 'My digital garden - notes on things I do',
    site: context.site || 'https://amatiasq.com',
    items: posts,
    customData: `<language>en</language>`,
  });
}

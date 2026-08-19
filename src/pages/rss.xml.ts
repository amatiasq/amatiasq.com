import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { translate } from '../i18n';
import { parseDate } from '../util/date';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');

  // English only: the feed declares `<language>en</language>` and links to /en/.
  const posts = blog
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.id.localeCompare(a.id))
    .map((post) => {
      const date = post.data.published || parseDate(post.id);

      return {
        title: translate(post.data.title, 'en'),
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

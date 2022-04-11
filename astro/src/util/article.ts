import { MarkdownInstance } from 'astro';
import { TranslatableString } from '../components/atoms/Translate';
import { DEFAULT_LANGUAGE } from '../constants';

export interface ArticleFrontmatter {
  date: string;
  title: TranslatableString;
}

type ArticleFile = MarkdownInstance<ArticleFrontmatter>;

export type Article = ReturnType<typeof parseArticle>;

const pad = (value: number) => value.toString().padStart(2, '0');

export function parseArticle(article: ArticleFile, urlPrefix = '') {
  const { frontmatter } = article;
  const date = new Date(frontmatter.date);
  const year = date.getFullYear().toString();
  const month = pad(date.getMonth() + 1);
  // const day = pad(date.getDate());

  const title = typeof frontmatter.title === 'object' ? frontmatter.title[DEFAULT_LANGUAGE] : frontmatter.title;
  const slug = title.replace(/\W+/g, '-').toLowerCase();

  return {
    ...frontmatter,
    // x: article.file,
    date,
    url: `${urlPrefix}/${year}/${month}/${slug}`,
    urlParams: { year, month, slug },
  };
}

export function cleanAndSort(articles: ArticleFile[], urlPrefix = '') {
  return articles.map(x => parseArticle(x, urlPrefix)).sort((a, b) => Number(b.date) - Number(a.date));
}

export function getTopArticles(articles: ArticleFile[], urlPrefix = '', max = 5) {
  return cleanAndSort(articles, urlPrefix).slice(0, max);
}

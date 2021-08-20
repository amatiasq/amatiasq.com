import { TranslatableString } from '../components/atoms/Translate';
import { DEFAULT_LANGUAGE } from '../constants';

interface RawArticle {
  date: string;
  title: TranslatableString;
}

export type Article = ReturnType<typeof parseArticle>;

export function parseArticle(article: RawArticle, urlPrefix = '') {
  const date = new Date(article.date);
  const year = date.getFullYear();
  const month = padLeft(date.getMonth() + 1);
  const day = padLeft(date.getDate());

  const title = typeof article.title === 'object' ? article.title[DEFAULT_LANGUAGE] : article.title;
  const slug = title.replace(/\W+/g, '-').toLowerCase();

  return {
    ...article,
    date,
    url: `${urlPrefix}/${year}/${month}/${day}/${slug}`,
    urlParams: { year, month, day, slug },
  };
}

export function cleanAndSort(articles: RawArticle[], urlPrefix = '') {
  return articles.map(x => parseArticle(x, urlPrefix)).sort((a, b) => Number(b.date) - Number(a.date));
}

export function getTopArticles(articles: RawArticle[], urlPrefix = '', max = 5) {
  return cleanAndSort(articles, urlPrefix).slice(0, max);
}

function padLeft(value: number) {
  return value < 10 ? `0${value}` : value;
}

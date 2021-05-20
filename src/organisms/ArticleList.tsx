import './ArticleList.scss';

import React from 'react';

import { Link } from '@reach/router';

import { Section } from '../atoms/Section';
import { TranslatableString } from '../atoms/Translatable';
import { Article } from '../molecules/Article';

export interface ArticleListProps<T extends Article> {
  items: T[];
  viewAllLink: string;
  header: TranslatableString;
  getLink: (article: T) => string;
  getDate: (article: T) => string;
  getTitle: (article: T) => string | JSX.Element;
}

export function ArticleList<T extends Article>({
  items,
  viewAllLink,
  header,
  getLink,
  getDate,
  getTitle,
}: ArticleListProps<T>) {
  return (
    <Section title={header} viewAllLink={viewAllLink}>
      <ul>
        {items.map(x => (
          <li key={x.key}>
            <Link to={getLink(x)}>
              <time>{getDate(x)}</time>
              <h3>{getTitle(x)}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

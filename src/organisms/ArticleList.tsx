import './ArticleList.scss';

import React from 'react';

import { Link } from '@reach/router';

import { Moment } from '../atoms/Moment';
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
    <Section className="article-list" title={header} viewAllLink={viewAllLink}>
      <ul className="articles">
        {items.map(x => (
          <li key={x.key}>
            <Link className="article" to={getLink(x)}>
              <Moment month={getDate(x)} />
              <h3>{getTitle(x)}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

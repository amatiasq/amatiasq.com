import './Section.scss';

import React, { PropsWithChildren } from 'react';

import { Link } from '@reach/router';

import { Translatable, TranslatableString } from './Translatable';

export interface SectionProps {
  className?: string;
  title: TranslatableString;
  viewAllLink: string;
}

export function Section({ className, title, viewAllLink, children }: PropsWithChildren<SectionProps>) {
  return (
    <section className={className}>
      <h2>
        <Translatable value={title} />
        {viewAllLink ? (
          <Link to={viewAllLink} className="view-more-button">
            <Translatable value={{ en: 'View all', es: 'Ver todo' }} />
          </Link>
        ) : null}
      </h2>

      {children}
    </section>
  );
}

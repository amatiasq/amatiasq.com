import React from 'react';

import { Project, ProjectView } from '../molecules/Project';

export interface TalksProps {
  talks: Project[];
}

export function Talks({ talks }: TalksProps) {
  return (
    <section className="talks">
      {talks.map(x => (
        <ProjectView {...x} />
      ))}
    </section>
  );
}

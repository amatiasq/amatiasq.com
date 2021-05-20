import React from 'react';

import { Translatable } from '../atoms/Translatable';
import { JobPosition } from '../molecules/JobPosition';
import { ArticleList } from './ArticleList';

export interface ProfessionalExperiencesProps {
  jobPositions: JobPosition[];
}

export function ProfessionalExperiences({ jobPositions }: ProfessionalExperiencesProps) {
  return (
    <ArticleList
      items={jobPositions}
      viewAllLink="/resume"
      header={{ en: 'Job History', es: 'Historial Laboral' }}
      getLink={x => `/resume#${x.key}`}
      getDate={x => x.from}
      getTitle={x => (
        <>
          <Translatable value={x.role} /> <Translatable en="at" es="en" /> <Translatable value={x.org} />
        </>
      )}
    />
  );
}

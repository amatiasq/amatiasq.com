import React from 'react';
import { useRouteData } from 'react-static';

import { Experiments, ExperimentsProps } from '../chunks/Experiments';
import { Navigation } from '../chunks/Navigation';
import {
  ProfessionalExperiences,
  ProfessionalExperiencesProps
} from '../chunks/ProfessionalExperience';
import { Projects, ProjectsProps } from '../chunks/Projects';
import { Talks, TalksProps } from '../chunks/Talks';

export type IndexProps = ExperimentsProps & ProjectsProps & ProfessionalExperiencesProps & TalksProps;

export default function Index() {
  const props = useRouteData<IndexProps>();

  return (
    <>
      <Navigation />
      <div className="container">
        <ProfessionalExperiences jobPositions={props.jobPositions} />
        <Projects projects={props.projects} />
        <Talks talks={props.talks} />
        <Experiments experiments={props.experiments} />
      </div>
    </>
  );
}

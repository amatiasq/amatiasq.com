import { Experiments, ExperimentsProps } from './src/chunks/Experiments.tsx';
import { Header } from './src/chunks/Header.tsx';
import { Navigation } from './src/chunks/Navigation.tsx';
import {
  ProfessionalExperiences,
  ProfessionalExperiencesProps
} from './src/chunks/ProfessionalExperience.tsx';
import { Projects, ProjectsProps } from './src/chunks/Projects.tsx';
import { Talks, TalksProps } from './src/chunks/Talks.tsx';
import { loadAllMds, loadMd } from './src/data.ts';

// export const config = { amp: true };

export async function getStaticProps(): Promise<{ props: IndexProps }> {
  return {
    props: {
      jobPositions: [],
      projects: await Promise.all([
        loadMd('projects/better-gist'),
        loadMd('projects/lulas'),
        loadMd('projects/mud'),
        loadMd('projects/genara'),
      ]),
      talks: await loadAllMds('talks'),
      experiments: await loadAllMds('experiments'),
    },
  };
}

export type IndexProps = ExperimentsProps & ProjectsProps & ProfessionalExperiencesProps & TalksProps;

export default function Index(props: IndexProps) {
  return (
    <>
      <Navigation />
      <Header />
      <div className="container">
        <ProfessionalExperiences jobPositions={props.jobPositions} />
        <Projects projects={props.projects} />
        <Talks talks={props.talks} />
        <Experiments experiments={props.experiments} />
      </div>
    </>
  );
}

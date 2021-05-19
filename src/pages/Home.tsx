import * as React from 'react';

import { Navigation } from '../chunks/Navigation';

const experiments = require('../data/experiments.codegen');
const jobHistory = require('../data/jobHistory.codegen');
// const projects = require('../data/projects.codegen');
const talks = require('../data/talks.codegen');

const projects = [
  require('../data/projects/2021-better-gist.md'),
  require('../data/projects/lulas.md'),
  require('../data/projects/mud.md'),
  require('../data/projects/genara.md'),
];

export type IndexProps = {};

export default function Index(props: IndexProps) {
  return (
    <p>
      <Navigation />
      {/*
      <IndexHeader />
      <IndexHeader />
      <div className="container">
        <ProfessionalExperiences jobPositions={props.jobPositions} />
        <Projects projects={props.projects} />
        <Talks talks={props.talks} />
        <Experiments experiments={props.experiments} />
      </div>
      */}
    </p>
  );
}

// import * as React from 'react';
// import cat from '../assets/cat.jpg';

// export const route = '/';

// const Page: React.FC = () => (
//   <>
//     <h1>Home Page</h1>
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, cum, mollitia assumenda laborum magnam rem animi
//       sequi consectetur a dolore quo unde vel corrupti minima commodi. Dignissimos fuga atque beatae.
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, cum, mollitia assumenda laborum magnam rem animi
//       sequi consectetur a dolore quo unde vel corrupti minima commodi. Dignissimos fuga atque beatae.
//     </p>
//     <img src={cat} alt="Funny Cat" width={256} />
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, cum, mollitia assumenda laborum magnam rem animi
//       sequi consectetur a dolore quo unde vel corrupti minima commodi. Dignissimos fuga atque beatae.
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, cum, mollitia assumenda laborum magnam rem animi
//       sequi consectetur a dolore quo unde vel corrupti minima commodi. Dignissimos fuga atque beatae.
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, cum, mollitia assumenda laborum magnam rem animi
//       sequi consectetur a dolore quo unde vel corrupti minima commodi. Dignissimos fuga atque beatae.
//     </p>
//   </>
// );

// export default Page;

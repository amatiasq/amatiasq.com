import './app.scss';

import React from 'react';
import { addPrefetchExcludes, Root, Routes } from 'react-static';

import { Router } from '@reach/router';

import Dynamic from './templates/Dynamic';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Router>
          <Dynamic path="dynamic" />
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
}

export default App;

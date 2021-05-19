import './app.scss';

import Dynamic from 'containers/Dynamic';
import React from 'react';
import { addPrefetchExcludes, Root, Routes } from 'react-static';

import { Router } from '@reach/router';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

function App() {
  return (
    <Root>
      <div className="content">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default App;

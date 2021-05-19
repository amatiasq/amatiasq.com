import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout';

const pages = require('./build/pages.codegen');
const [notFound] = pages.filter(m => m.route === '/not-found');
const standardPages = pages.filter(m => m !== notFound);

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        {standardPages.map(page => (
          <Route key={page.route} path={page.route} exact component={page.content} />
        ))}
        {notFound && <Route component={notFound.content} />}
      </Switch>
    </Layout>
  </BrowserRouter>
);

hydrate(<App />, document.querySelector('#app'));

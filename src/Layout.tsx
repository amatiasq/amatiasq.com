import * as React from 'react';

// import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return <React.Suspense fallback={<b>Loading ...</b>}>{children}</React.Suspense>;
}

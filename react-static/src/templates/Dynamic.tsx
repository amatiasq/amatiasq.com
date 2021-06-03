import React from 'react';

export default function Dynamic({ path }: { path: string }) {
  return <div>This is a dynamic page! It will not be statically exported, but is available at runtime {path}</div>;
}

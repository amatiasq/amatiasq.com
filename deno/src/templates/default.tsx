import React from 'react';
import { AmqDocument } from '../components/AmqDocument.tsx';
import { Translatable, Lang } from '../components/Lang.tsx';

export default ({ content }: { content: Translatable }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);

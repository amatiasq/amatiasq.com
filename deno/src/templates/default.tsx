import React from 'react';
import { Translatable, Lang } from '../atoms/Lang.tsx';
import { AmqDocument } from './AmqDocument.tsx';

export default ({ content }: { content: Translatable }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);

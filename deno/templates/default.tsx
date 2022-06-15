import React, { PropsWithChildren } from 'react';
import { AmqDocument } from '../components/AmqDocument.tsx';
import { AmqText, Lang } from '../components/Lang.tsx';

export default ({ content }: { content: AmqText }) => (
  <AmqDocument title="potato">
    <Lang tr={content} />
  </AmqDocument>
);

import React from 'react';
import { AmqDocument } from '../../components/AmqDocument.tsx';
import { Translatable, Lang } from '../../components/Lang.tsx';
import { Tag } from '../../components/Tag.tsx';

interface CareerProps {
  labels: Translatable[];
  content: Translatable;
}

export default ({ labels, content }: CareerProps) => (
  <AmqDocument title="potato">
    {labels.map(x => (
      <Tag>{x}</Tag>
    ))}

    <Lang tr={content} />
  </AmqDocument>
);

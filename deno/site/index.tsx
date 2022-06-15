import React from 'react';

import { AmqDocument } from '../components/AmqDocument.tsx';
import { AmqHeader } from '../components/AmqHeader.tsx';

export default (props: any) => {
  return (
    <AmqDocument title="A. Matías Quezada" {...props}>
      <AmqHeader />
    </AmqDocument>
  );
};

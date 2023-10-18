import React from 'react';
import { css } from '../../generate/mod.ts';
import { cssSpace } from '../../theme.ts';

export interface CollapsableProps {
  children: React.ReactNode;
  collapsedText?: string;
  expandedText?: string;
  open?: boolean;
}

export function Collapsable({
  children,
  collapsedText = 'Show more',
  expandedText = 'Show less',
  open = false,
}: CollapsableProps) {
  const detailsStyles = css`
    summary::after {
      display: block;
      margin-top: ${cssSpace.lg};
    }

    &:not([open]) summary::after {
      content: '${collapsedText.replace(/'/g, "\\'")}';
    }

    &[open] summary::after {
      content: '${expandedText.replace(/'/g, "\\'")}';
    }
  `;

  return (
    <details className={detailsStyles} open={open}>
      {children}
    </details>
  );
}

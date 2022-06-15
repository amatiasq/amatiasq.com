import React, { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { flush, cache } from '@emotion/css';

// HACK: this is necessary for emotion to work
(globalThis as any).document = undefined;

export function render<P>(Page: FunctionComponent<P>, props: P) {
  const html = renderToStaticMarkup(<Page {...props} />);
  const css = Object.values(cache.inserted);
  const htmlWithStyles = html.replace('STYLES_PLACEHOLDER', css.join('\n'));

  flush();

  return `<!DOCTYPE html>${htmlWithStyles}`;
}

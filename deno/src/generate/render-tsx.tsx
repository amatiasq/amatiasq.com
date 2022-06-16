import { flush, cache } from '@emotion/css';
import { extname } from 'path';
import React, { FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LangProvider } from '../components/Lang.tsx';
import { PageProps } from './PageProps.ts';

// HACK: this is necessary for emotion to work
(globalThis as any).document = undefined;

export function isTsx(file: string) {
  const extension = extname(file);
  return extension === '.ts' || extension === '.tsx';
}

export async function renderTsx<P extends PageProps>(file: string, props: P) {
  const mod = await import(file);
  const Page = validateModule(file, mod);

  const html = renderToStaticMarkup(
    <LangProvider value={props.lang}>
      <Page {...props} />
    </LangProvider>,
  ).replace(/<script><\/script>/g, '');

  const css = Object.values(cache.inserted);
  const htmlWithStyles = html.replace('STYLES_PLACEHOLDER', css.join('\n'));

  flush();

  return `<!DOCTYPE html>${htmlWithStyles}`;
}

// deno-lint-ignore no-explicit-any
function validateModule<T extends { default: FunctionComponent<any> }>(file: string, module: T) {
  const Page = module.default;

  if (!Page) {
    throw new Error(`Page ${file} doesn't have default export!`);
  }

  if (typeof Page !== 'function') {
    throw new Error(`Page ${file} doesn't export a function component`);
  }

  return Page;
}

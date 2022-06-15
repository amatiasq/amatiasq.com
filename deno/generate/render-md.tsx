import { extname } from 'path';

export function isMd(file: string) {
  const extension = extname(file);
  return extension === '.md';
}

export async function renderMd<P>(file: string, props: P) {
  // renderTsx()
  return file;
}

import { dirname } from 'path';
import { getFilesRecursively } from './getFilesRecursively.ts';
import { getDestFile } from './getDestFile.ts';
import { isMd, renderMd } from './render-md.tsx';
import { isTsx, renderTsx } from './render-tsx.tsx';

const { fromRoot, relative } = path();
const source = fromRoot('./site');
const target = fromRoot('./dist');

try {
  await Deno.remove(target, { recursive: true });
  // deno-lint-ignore no-empty
} catch {}

for (const file of await getFilesRecursively(source)) {
  const dest = getDestFile(source, target, file);
  console.log(`Generating ${relative(file)} -> ${relative(dest)}`);

  let html: string;

  if (isTsx(file)) {
    html = await renderTsx(file, {});
  } else if (isMd(file)) {
    html = await renderMd(file, {});
  } else {
    throw new Error(`Unkown handler for ${relative(file)}`);
  }

  await Deno.mkdir(dirname(dest), { recursive: true });
  await Deno.writeTextFile(dest, html);
}

console.log('Done');

// HELPERS

function path() {
  const root = new URL('..', import.meta.url);
  const fromRoot = (path: string) => new URL(path, root).pathname;
  const relative = (path: string) => `./${path.replace(root.pathname, '')}`;
  return { fromRoot, relative };
}

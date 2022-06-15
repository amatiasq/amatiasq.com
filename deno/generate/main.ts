import { dirname } from 'path';
import { getFilesRecursively } from './getFilesRecursively.ts';
import { getDestFile } from './getDestFile.ts';
import { render } from './render.tsx';

const root = new URL('..', import.meta.url);
const fromRoot = (path: string) => new URL(path, root).pathname;
const relative = (path: string) => `./${path.replace(root.pathname, '')}`;

const source = fromRoot('./site');
const target = fromRoot('./dist');

try {
  await Deno.remove(target, { recursive: true });
  // deno-lint-ignore no-empty
} catch {}

for (const file of await getFilesRecursively(source)) {
  const dest = getDestFile(source, target, file);
  console.log(`Generating ${relative(file)} -> ${relative(dest)}`);

  const mod = await import(file);
  const Page = mod.default;

  if (!Page) {
    throw new Error(`Page ${file} doesn't have default export!`);
  }

  if (typeof Page !== 'function') {
    throw new Error(`Page ${file} doesn't export a function component`);
  }

  const html = render(Page, {});

  await Deno.mkdir(dirname(dest), { recursive: true });
  await Deno.writeTextFile(dest, html);
}

console.log('Done');

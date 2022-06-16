import { dirname } from 'path';
import { getFilesRecursively } from './getFilesRecursively.ts';
import { getDestFile } from './getDestFile.ts';
import { isMd, renderMd } from './render-md.tsx';
import { isTsx, renderTsx } from './render-tsx.tsx';
import { Language } from '../components/Lang.tsx';
// import { emptyDirectory } from './emptyDirectory.ts';

const { fromRoot, relative } = path();
const source = fromRoot('./src/site');
const target = fromRoot('./dist');

const [sources] = await Promise.all([
  // multiline
  getFilesRecursively(source),
  // emptyDirectory(target),
]);

await Promise.all([
  // multiline
  generate(sources, 'en', '/en'),
  generate(sources, 'es', '/es'),
  generate(sources, 'en'),
]);

console.log('Done');

// EXECUTION END

async function generate(sources: string[], lang: Language, path = '') {
  const props = { lang };

  for (const file of sources) {
    if (file.endsWith('/_template.tsx')) {
      continue;
    }

    const dist = getDestFile(source, `${target}${path}`, file);

    console.log(`Generating ${relative(file)} -> ${relative(dist)}`);

    let html: string;

    if (isTsx(file)) {
      html = await renderTsx(file, props);
    } else if (isMd(file)) {
      html = await renderMd(file, props);
    } else {
      throw new Error(`Unkown handler for ${relative(file)}`);
    }

    await Deno.mkdir(dirname(dist), { recursive: true });
    await Deno.writeTextFile(dist, html);
  }
}

// HELPERS

function path() {
  const root = new URL('../..', import.meta.url);
  const fromRoot = (path: string) => new URL(path, root).pathname;
  const relative = (path: string) => `./${path.replace(root.pathname, '')}`;
  return { fromRoot, relative };
}

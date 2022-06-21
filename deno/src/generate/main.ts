import { dirname } from 'std/path/mod.ts';
import { isMd, renderMd } from './render-md.tsx';
import { isTsx, renderTsx } from './render-tsx.tsx';
import { Language } from '../atoms/Lang.tsx';
import { getPageDestinationOnDisk, getPagePath, getPagesFromDisk, SitePage } from './pages.ts';
// import { emptyDirectory } from './emptyDirectory.ts';

const [sources] = await Promise.all([
  // multiline
  getPagesFromDisk(),
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

async function generate(sources: SitePage[], lang: Language, path = '') {
  const props = { lang };

  for (const file of sources) {
    if (file.endsWith('/_template.tsx')) {
      continue;
    }

    const dist = getPageDestinationOnDisk(file, path);

    // console.log(`Generating ${relative(file)} -> ${relative(dist)}`);

    let html: string;

    if (isTsx(file)) {
      html = await renderTsx(file, props);
    } else if (isMd(file)) {
      html = await renderMd(file, props);
    } else {
      throw new Error(`Unkown handler for ${getPagePath(file)}`);
    }

    await Deno.mkdir(dirname(dist), { recursive: true });
    await Deno.writeTextFile(dist, html);
  }
}

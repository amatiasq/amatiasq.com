import { React, renderToStaticMarkup, basename, dirname, extname } from './deps.ts';

const source = './site';
const target = './dist';

try {
  await Deno.remove(target, { recursive: true });
} catch {}

for (const file of await getFilesRecursively(source)) {
  console.log(`Found ${file}`);

  const mod = await import(file);
  const Page = mod.default;

  if (!Page) {
    throw new Error(`Page ${file} doesn't have default export!`);
  }

  if (typeof Page !== 'function') {
    throw new Error(`Page ${file} doesn't export a function component`);
  }

  const content = renderToStaticMarkup(React.createElement(Page, {}));
  const html = `<!DOCTYPE html>${content}`;

  const dest = getDestFile(file);

  console.log(`- creating ${dest}`);
  await Deno.mkdir(dirname(dest), { recursive: true });
  await Deno.writeTextFile(dest, html);
}

console.log('Done');

// HELPERS

function getDestFile(file: string) {
  const extension = extname(file);
  const filename = basename(file);
  const isIndex = filename.replace(extension, '') === 'index';

  return file.replace(source, target).replace(extension, isIndex ? '.html' : '/index.html');
}

async function getFilesRecursively(currentPath: string) {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${currentPath}/${dirEntry.name}`;
    names.push(entryPath);

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)));
    }
  }

  return names;
}

import { existsSync } from 'fs';
import { mkdir, readFile, unlink, writeFile } from 'fs/promises';

const CACHE_DIR = './cache/web-components/';
const DOM_STUB = `
    class HTMLElement {};
    const customElements = {define() {}};
`;

export async function importWebComponent(url: string) {
  const cachePath = `${CACHE_DIR}/${url.replace(/\//g, '_')}`;

  if (existsSync(cachePath)) {
    try {
      const source = await readFile(cachePath, 'utf-8');
      return await evaluateComponent(source);
    } catch (e) {
      await unlink(cachePath);
    }
  }

  const source = await fetchComponentSource(url);
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, source, 'utf-8');
  return evaluateComponent(source);
}

async function fetchComponentSource(url: string) {
  const request = await fetch(url);
  return request.text();
}

async function evaluateComponent(source: string) {
  const viteValidSource = `${DOM_STUB}\n${source}`;
  const module = await import(
    `data:text/javascript;base64,${btoa(viteValidSource)}`
  );
  return { ...module, source };
}

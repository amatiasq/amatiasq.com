import { Marked } from 'markdown';
import { dirname, extname } from 'path';
import { parse } from 'std/encoding/yaml.ts';
import { PageProps } from './PageProps.ts';
import { renderTsx } from './render-tsx.tsx';

const templatesDir = '../templates';

export function isMd(file: string) {
  const extension = extname(file);
  return extension === '.md';
}

export async function renderMd<P extends PageProps>(file: string, props: P) {
  const content = await Deno.readTextFile(file);

  const [head, ...body] = content
    .split(/---/g)
    .filter(Boolean)
    .map(x => x.trim());

  const data = parse(head) as Record<string, unknown>;

  let template = `${templatesDir}/default.tsx`;

  if (data.template) {
    template = `${templatesDir}/${data.template}`;
  } else {
    const folderTemplate = `${dirname(file)}/_template.tsx`;

    try {
      const stat = await Deno.stat(folderTemplate);

      if (stat.isFile) {
        template = folderTemplate;
      }
      // deno-lint-ignore no-empty
    } catch {}
  }

  const templateRelative = new URL(template, import.meta.url).pathname;

  return renderTsx(templateRelative, {
    ...props,
    ...data,
    content: body.map(x => Marked.parse(x).content),
  });
}

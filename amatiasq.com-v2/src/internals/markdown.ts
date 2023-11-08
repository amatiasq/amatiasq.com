import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export async function readMarkdown<T>(file: string) {
  const fileContent = await readFile(file, 'utf-8');
  const references = getMarkdownReferences(fileContent);
  const [head, ...parts] = fileContent
    .split(/^---$/gm)
    .filter(Boolean)
    .map((x) => x.trim());

  const data = parse(head!) as Record<string, unknown>;
  const body = parts.map((x) => `${x}\n\n${references}`);

  return {
    data: data as T,
    content: body,
    extract: body.map(getExtract).map((x) => `${x}\n\n${references}`),
    references: references,
  };
}

function getExtract(content: string) {
  const TOKEN = '<!-- end extract -->';

  if (content.includes(TOKEN)) {
    return content.split(TOKEN)[0]!;
  }

  const lines = content.split('\n\n').filter((x) => !/^(#|>)/.test(x));
  // const firstParagraph = lines.findIndex((x) => x && );
  return lines.slice(0, 3).join('\n\n');
}

// Markdown references

const uniq = <T>(arr: T[]) => Array.from(new Set(arr));
const MD_REFERENCE = /^\[\d+\]: .*$/gm;

export function getMarkdownReferences(markdown: string) {
  const matches = markdown.matchAll(MD_REFERENCE);
  const references = Array.from(matches).map((x) => x[0]);
  return uniq(references).join('\n');
}

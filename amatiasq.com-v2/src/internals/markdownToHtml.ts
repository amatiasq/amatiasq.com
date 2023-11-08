import dart from 'highlight.js/lib/languages/dart';
import dns from 'highlight.js/lib/languages/dns';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import fsharp from 'highlight.js/lib/languages/fsharp';
import gcode from 'highlight.js/lib/languages/gcode';
import gherkin from 'highlight.js/lib/languages/gherkin';
import glsl from 'highlight.js/lib/languages/glsl';
import latex from 'highlight.js/lib/languages/latex';
import nginx from 'highlight.js/lib/languages/nginx';
import openscad from 'highlight.js/lib/languages/openscad';
import scala from 'highlight.js/lib/languages/scala';
import { common as commonLanguages } from 'lowlight';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const processor = await unified()
  // Remark parses Markdown to an AST (includes markdown transform)
  .use(remarkParse)
  // Remark then transforms the AST to a new rehype AST
  .use(remarkRehype)
  // Syntax highlighting
  .use(rehypeHighlight, {
    // prefix: 'lang-',
    languages: {
      ...commonLanguages,
      dart,
      dns,
      dockerfile,
      fsharp,
      gcode,
      gherkin,
      glsl,
      latex,
      nginx,
      openscad,
      scala,
    },
    aliases: { bash: 'shell' },
  })
  // rehype-stringify transforms the rehype AST to a string of HTML
  .use(rehypeStringify);

export function markdownToHtml(md: string) {
  // Typescript thinks `value` is not a property of `file: Root`
  // it is
  const file = processor.processSync(md);
  return (file?.value as string) ?? '';
}

import { createHighlighter } from 'shiki';

export const codeTheme = 'github-dark';

const languages = [
  'javascript',
  'typescript',
  'html',
  'css',
  'json',
  'bash',
  'shell',
  'c',
  'cpp',
  'csharp',
  'python',
  'rust',
  'go',
  'java',
  'text',
  'plaintext',
];

/**
 * One instance for the whole build: loading these grammars costs about a second
 * and `<Markdown>` renders once per page per language.
 */
export const highlighterReady = createHighlighter({
  themes: [codeTheme],
  langs: languages,
});

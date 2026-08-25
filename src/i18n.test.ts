import { expect, test } from 'bun:test';
import { languages, localizeBody, splitByLanguage } from './i18n';

// The bug this file exists for: link reference definitions are written once at
// the end of a markdown file, but the body is split into one block per
// language, so every language but the last one lost them and rendered
// `[text][1]` as literal text on the page.

const body = (...blocks: string[]) => blocks.join('\n---\n');

test('splits a body into one block per language', () => {
  const blocks = splitByLanguage(body('English.', 'Español.'));

  expect(blocks).toHaveLength(languages.length);
  expect(blocks[0]).toContain('English.');
  expect(blocks[0]).not.toContain('Español.');
  expect(blocks[1]).toContain('Español.');
  expect(blocks[1]).not.toContain('English.');
});

test('a body with no link definitions is left untouched', () => {
  const content = body('English.', 'Español.');
  expect(splitByLanguage(content)).toEqual(content.split('---'));
});

test('every block keeps the link definitions, not just the last one', () => {
  const blocks = splitByLanguage(
    body(
      'See [the talk][1].\n',
      '\nMira [la charla][1].\n\n[1]: https://youtu.be/x\n'
    )
  );

  for (const block of blocks) {
    expect(block).toContain('[1]: https://youtu.be/x');
  }
});

test('definitions are appended once, not duplicated in the block that had them', () => {
  const blocks = splitByLanguage(
    body('[a][1]\n', '\n[b][1]\n\n[1]: https://example.com/\n')
  );

  for (const block of blocks) {
    expect(block.match(/^\[1\]: /gm)).toHaveLength(1);
  }
});

test('carries every definition, in order, including titles and named refs', () => {
  const definitions = [
    "[1]: https://example.com/a 'A title (with parens)'",
    '[2]: https://example.com/b',
    '[named]: https://example.com/c "Quoted"',
  ];

  const blocks = splitByLanguage(
    body('[a][1] [b][2] [c][named]\n', `\nes\n\n${definitions.join('\n')}\n`)
  );

  for (const block of blocks) {
    expect(block).toEndWith(`${definitions.join('\n')}\n`);
  }
});

// A definition-looking line inside a fenced code block is content, not a
// definition. Moving it would corrupt the sample the reader is meant to see.
test('leaves indented and fenced look-alikes alone', () => {
  const [block] = splitByLanguage('```\n    [1]: not-a-definition\n```\n');
  expect(block).toContain('    [1]: not-a-definition');
});

test('localizeBody reads back what splitByLanguage writes', () => {
  const blocks = splitByLanguage(
    body('English [x][1].\n', '\nEspañol [x][1].\n\n[1]: https://example.com/\n')
  );

  expect(localizeBody(blocks, 'en')).toContain('English');
  expect(localizeBody(blocks, 'es')).toContain('Español');

  for (const lang of languages) {
    expect(localizeBody(blocks, lang)).toContain('[1]: https://example.com/');
  }
});

test('a single-language body still resolves for every language', () => {
  const blocks = splitByLanguage('Only [one][1] block.\n\n[1]: https://e.com/\n');

  for (const lang of languages) {
    expect(localizeBody(blocks, lang)).toContain('[1]: https://e.com/');
  }
});

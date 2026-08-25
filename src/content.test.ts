import { expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { languages, localizeBody, splitByLanguage } from './i18n';

// Guards the real corpus, not a fixture: a reference that resolves in Spanish
// and not in English is a page that ships `[Specification Builder][1]` as
// literal text, and nothing else in the build says a word about it.

const CONTENT_DIR = join(import.meta.dir, '..', 'content');

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
const FENCED_CODE = /^```[\s\S]*?^```/gm;
const INLINE_CODE = /`[^`\n]*`/g;
/** `[text][ref]` and the collapsed `[text][]`, images included. */
const REFERENCE_USE = /\[([^\]]*)\]\[([^\]]*)\]/g;

function markdownFiles() {
  return readdirSync(CONTENT_DIR, { recursive: true })
    .map(String)
    .filter((x) => x.endsWith('.md'))
    .sort();
}

/** Code samples are content: a `[1]: …` line inside one defines nothing. */
function prose(markdown: string) {
  return markdown.replace(FENCED_CODE, '').replace(INLINE_CODE, '');
}

function referencesUsedIn(markdown: string) {
  const uses = [...prose(markdown).matchAll(REFERENCE_USE)];
  // A collapsed `[text][]` is defined by its own text.
  return uses.map(([, text, ref]) => (ref || text).trim().toLowerCase());
}

function isDefinedIn(markdown: string, ref: string) {
  const escaped = ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\[${escaped}\\]:[ \\t]`, 'im').test(prose(markdown));
}

const files = markdownFiles();

test('there is content to check', () => {
  expect(files.length).toBeGreaterThan(0);
});

// Without this the suite would pass just as happily on an empty corpus, and
// the whole point is that it fails when a reference goes missing.
test('the corpus actually uses link references', () => {
  const total = files
    .map((x) => referencesUsedIn(readFileSync(join(CONTENT_DIR, x), 'utf-8')))
    .reduce((sum, refs) => sum + refs.length, 0);

  expect(total).toBeGreaterThan(0);
});

for (const file of files) {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
  const blocks = splitByLanguage(raw.replace(FRONTMATTER, ''));

  for (const lang of languages) {
    const localized = localizeBody(blocks, lang);
    const refs = referencesUsedIn(localized);

    if (!refs.length) {
      continue;
    }

    test(`${file} — every reference resolves in ${lang}`, () => {
      const missing = refs.filter((ref) => !isDefinedIn(localized, ref));
      expect(missing).toEqual([]);
    });
  }
}

import { parseFrontmatter } from '@astrojs/markdown-remark';
import { expect, test } from 'bun:test';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { schemas, type Collection } from './content.schemas';

// Guards the real corpus, like content.test.ts: an entry whose frontmatter does
// not match its collection kills the build, and the build says so in one line
// that names the file and not the field — after spending the whole build to get
// there. Here it is a second, and `amq amatiasq.com check` offers to fix it.

const CONTENT_DIR = join(import.meta.dir, '..', 'content');

const collections = Object.keys(schemas) as Collection[];

test('every collection has a folder with entries in it', () => {
  for (const collection of collections) {
    expect(readdirSync(join(CONTENT_DIR, collection)).length).toBeGreaterThan(0);
  }
});

for (const collection of collections) {
  const dir = join(CONTENT_DIR, collection);

  for (const file of readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    test(`${collection}/${file} — frontmatter matches the schema`, () => {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const result = schemas[collection].safeParse(
        parseFrontmatter(raw).frontmatter
      );

      const issues = result.success
        ? []
        : result.error.issues.map((x) => `${x.path.join('.')}: ${x.message}`);

      expect(issues).toEqual([]);
    });
  }
}

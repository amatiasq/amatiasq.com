import { defineCollection } from 'astro:content';
import { schemas } from './content.schemas';
import { splitByLanguage } from './i18n';

// collections

export const collections = {
  blog: defineCollection({
    loader: markdownLoader('content/blog'),
    schema: schemas.blog,
  }),

  career: defineCollection({
    loader: markdownLoader('content/career'),
    schema: schemas.career,
  }),

  experiments: defineCollection({
    loader: markdownLoader('content/experiments'),
    schema: schemas.experiments,
  }),

  projects: defineCollection({
    loader: markdownLoader('content/projects'),
    schema: schemas.projects,
  }),

  talks: defineCollection({
    loader: markdownLoader('content/talks'),
    schema: schemas.talks,
  }),
};

// Astro's `glob()` loader with one line changed: `store.set({ body })` splits the
// body by language. Deleting it kills multilingual markdown — see AGENTS.md.
// Its two `any`s are the price of that: Astro types `body` as a single string,
// and `addAssetImports` is missing from the public `DataStore` type upstream.

import { parseFrontmatter } from '@astrojs/markdown-remark';
import { type LoaderContext } from 'astro/loaders';
import fastGlob from 'fast-glob';
import { existsSync, promises as fs } from 'fs';
import { green } from 'kleur/colors';
import micromatch from 'micromatch';
import pLimit from 'p-limit';
import { relative, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

function markdownLoader(path: string) {
  const globOptions = { pattern: '*.md', base: path };
  const fileToIdMap = new Map();

  return {
    name: 'amq-loader',
    async load({ config, logger, watcher, parseData, store }: LoaderContext) {
      const untouchedEntries = new Set(store.keys());

      const baseDir = globOptions.base
        ? new URL(globOptions.base, config.root)
        : config.root;

      if (!baseDir.pathname.endsWith('/')) {
        baseDir.pathname = `${baseDir.pathname}/`;
      }

      const filePath = fileURLToPath(baseDir);
      const relativePath = relative(fileURLToPath(config.root), filePath);
      const exists = existsSync(baseDir);

      if (!exists) {
        logger.warn(
          `The base directory "${fileURLToPath(baseDir)}" does not exist.`
        );
      }

      const files = await fastGlob(globOptions.pattern, {
        cwd: fileURLToPath(baseDir),
      });

      if (exists && files.length === 0) {
        logger.warn(
          `No files found matching "${globOptions.pattern}" in directory "${relativePath}"`
        );
        return;
      }

      const limit = pLimit(10);

      await Promise.all(
        files.map((entry) => limit(() => syncData(entry, baseDir)))
      );

      untouchedEntries.forEach((id) => store.delete(id));

      if (!watcher) return;

      const basePath = fileURLToPath(baseDir);
      const matchesGlob = (entry: string) =>
        !entry.startsWith('../') &&
        micromatch.isMatch(entry, globOptions.pattern);

      watcher.on('add', onChange);
      watcher.on('change', onChange);

      watcher.on('unlink', async (deletedPath) => {
        const entry = posixRelative(basePath, deletedPath);

        if (!matchesGlob(entry)) {
          return;
        }

        const id = fileToIdMap.get(deletedPath);

        if (id) {
          store.delete(id);
          fileToIdMap.delete(deletedPath);
        }
      });

      async function onChange(changedPath: string) {
        const entry = posixRelative(basePath, changedPath);
        if (!matchesGlob(entry)) {
          return;
        }

        const baseUrl = pathToFileURL(basePath);
        const oldId = fileToIdMap.get(changedPath);
        await syncData(entry, baseUrl, oldId);
        logger.info(`Reloaded data from ${green(entry)}`);
      }

      async function syncData(entry: string, base: URL, oldId = null) {
        const fileUrl = new URL(encodeURI(entry), base);
        const contents = await fs
          .readFile(fileUrl, 'utf-8')
          .catch((err: Error) => {
            logger.error(`Error reading ${entry}: ${err.message}`);
            return;
          });

        if (!contents && contents !== '') {
          logger.warn(`No contents found for ${entry}`);
          return;
        }

        const { frontmatter, content } = parseFrontmatter(contents);
        const id = entry;

        if (oldId && oldId !== id) {
          store.delete(oldId);
        }

        untouchedEntries.delete(id);
        const existingEntry = store.get(id);
        const digest = await digestJson({ contents });
        const entryPath = fileURLToPath(fileUrl);

        if (
          existingEntry &&
          existingEntry.digest === digest &&
          existingEntry.filePath
        ) {
          if (existingEntry.deferredRender) {
            store.addModuleImport(existingEntry.filePath);
          }
          if (existingEntry.assetImports?.length) {
            (store as any).addAssetImports(
              existingEntry.assetImports,
              existingEntry.filePath
            );
          }
          fileToIdMap.set(entryPath, id);
          return;
        }

        const entryRelativePath = posixRelative(
          fileURLToPath(config.root),
          entryPath
        );
        const parsedData = await parseData({
          id,
          data: frontmatter,
          filePath: entryPath,
        });

        store.set({
          id,
          data: parsedData,
          body: splitByLanguage(content) as any,
          filePath: entryRelativePath,
          digest,
        });

        fileToIdMap.set(entryPath, id);
      }
    },
  };
}

async function digestJson(message: { contents: string }) {
  const text = JSON.stringify(message);
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function posixRelative(from: string, to: string) {
  return relative(from, to).split(sep).join('/');
}

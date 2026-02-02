import { defineCollection, z } from 'astro:content';

// shared schemas

const translatable = (type: z.ZodType) =>
  z.union([type, z.array(type), z.object({ en: type, es: type })]);

const DateSchema = z.union([z.date(), z.string().refine((v) => new Date(v))]);
const TranslatableSchema = translatable(z.string());
const TranslatableUrlSchema = translatable(z.string().url());

const ImagePreviewSchema = z.object({
  src: TranslatableSchema,
  en: z.string(),
  es: z.string(),
  center: z
    .string()
    .regex(/\d+(\.\d+)?% \d+(\.\d+)?%/)
    .optional(),
});

const IframePreviewSchema = z.union([
  z.boolean(),
  z.object({
    src: TranslatableUrlSchema.optional(),
    style: z.string(),
  }),
]);

// collection schemas

const markdownLoader = createMarkdownLoader();

const blogSchema = z.object({
  draft: z.boolean().optional(),
  published: DateSchema.optional(),
  title: TranslatableSchema,
  tags: z.array(TranslatableSchema).optional(),
});

const careerSchema = z.object({
  from: DateSchema,
  to: DateSchema.optional(),
  realFrom: DateSchema.optional(),
  realTo: DateSchema.optional(),
  org: TranslatableSchema.optional(),
  link: TranslatableUrlSchema.optional(),
  role: TranslatableSchema.optional(),
  hide: z.boolean().optional(),
  tags: z.array(TranslatableSchema).optional(),
  bullets: z.array(TranslatableSchema).optional(),
});

const projectSchema = z.object({
  title: TranslatableSchema,
  pinned: z.boolean().optional(),
  tags: z.array(TranslatableSchema).optional(),
  image: ImagePreviewSchema.optional(),
  iframe: IframePreviewSchema.optional(),

  links: z
    .object({
      live: TranslatableUrlSchema.optional(),
      github: z.string().url().optional(),
      tests: z.string().url().optional(),
      video: z.union([
        z.string().url(),
        z.array(z.string().url())]).optional(),
    })
    .optional(),
});

const talkSchema = z.object({
  title: TranslatableSchema,
  tags: z.array(TranslatableSchema).optional(),
  image: ImagePreviewSchema.optional(),
  iframe: IframePreviewSchema.optional(),

  links: z
    .object({
      slides: z.string().url().optional(),
      video: z.string().url().optional(),
    })
    .optional(),
});

// collections

export const collections = {
  blog: defineCollection({
    loader: markdownLoader('content/blog'),
    schema: blogSchema,
  }),

  career: defineCollection({
    loader: markdownLoader('content/career'),
    schema: careerSchema,
  }),

  experiments: defineCollection({
    loader: markdownLoader('content/experiments'),
    schema: projectSchema,
  }),

  projects: defineCollection({
    loader: markdownLoader('content/projects'),
    schema: projectSchema,
  }),

  talks: defineCollection({
    loader: markdownLoader('content/talks'),
    schema: talkSchema,
  }),
};

//
// below is the implementation of createMarkdownLoader
// pay no attention to it
//

import { parseFrontmatter } from '@astrojs/markdown-remark';
import { type LoaderContext } from 'astro/loaders';
import fastGlob from 'fast-glob';
import { existsSync, promises as fs } from 'fs';
import { green } from 'kleur/colors';
import micromatch from 'micromatch';
import pLimit from 'p-limit';
import { relative, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

function createMarkdownLoader() {
  return function markdownLoader(path: string) {
    const globOptions = { pattern: '*.md', base: path };
    const fileToIdMap = new Map();

    return {
      name: 'amq-loader',
      async load({
        config,
        logger,
        watcher,
        parseData,
        store,
        generateDigest,
      }: LoaderContext) {
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
          const id = `${entry}`; // generateDigest({ entry, base });

          if (oldId && oldId !== id) {
            store.delete(oldId);
          }

          untouchedEntries.delete(id);
          const existingEntry = store.get(id);
          const digest = await digestJson({ contents });
          const filePath2 = fileURLToPath(fileUrl);

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
            fileToIdMap.set(filePath2, id);
            return;
          }

          const relativePath2 = posixRelative(
            fileURLToPath(config.root),
            filePath2
          );
          const parsedData = await parseData({
            id,
            data: frontmatter,
            filePath: filePath2,
          });

          store.set({
            id,
            data: parsedData,
            body: content.split('---').filter(Boolean) as any,
            filePath: relativePath2,
            digest,
          });

          fileToIdMap.set(filePath2, id);
        }
      },
    };
  };

  async function digestJson(message: any) {
    const text = JSON.stringify(message);
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  function posixifyPath(filePath: string) {
    return filePath.split(sep).join('/');
  }

  function posixRelative(from: string, to: string) {
    return posixifyPath(relative(from, to));
  }
}

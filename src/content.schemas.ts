// Every collection's schema, kept apart from `content.config.ts` so something
// other than Astro can read them: that file imports `astro:content`, a virtual
// module that exists only inside a running Astro. `amq amatiasq.com check`
// validates every entry's frontmatter against these with plain zod, before the
// build spends a minute to say the same thing in one line.

import { z } from 'astro/zod';
import type { StringifiedDate } from './util/date';

// shared schemas

const translatable = <T extends z.ZodType>(type: T) =>
  z.union([type, z.array(type), z.object({ en: type, es: type })]);

const DateSchema = z.union([
  z.date(),
  z
    .string()
    .refine((v) => new Date(v))
    .transform((v) => v as StringifiedDate),
]);
const TranslatableSchema = translatable(z.string());

// An absolute URL, or a root-relative path for something this site hosts
// itself. The demos under `public/demos/` are ours, so `/demos/<slug>/` is the
// honest link — and the only one that works in `astro dev`.
const UrlSchema = z
  .string()
  .refine(
    (v) => v.startsWith('/') || z.url().safeParse(v).success,
    'must be an absolute URL or a root-relative path',
  );
const TranslatableUrlSchema = translatable(UrlSchema);

const ImagePreviewSchema = z.object({
  src: TranslatableSchema,
  en: z.string(),
  es: z.string(),
  // The card always needs a picture, or it falls back to a grey box. The detail
  // page does not: npm's is a screenshot of somebody else's site, and the page
  // right under it already lists the packages. `cardOnly` keeps it in the grid
  // and out of the article.
  cardOnly: z.boolean().optional(),
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
  // The company's brand colour, painting its card and bar in the timeline.
  color: z.string().optional(),
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
      github: z.url().optional(),
      tests: z.url().optional(),
      video: z.union([
        z.url(),
        z.array(z.url())]).optional(),
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
      slides: z.url().optional(),
      video: z.url().optional(),
    })
    .optional(),
});

// Keyed by the folder under `content/`, which is also the collection's name in
// `content.config.ts`: the checker walks the folders and needs no second table.
export const schemas = {
  blog: blogSchema,
  career: careerSchema,
  experiments: projectSchema,
  projects: projectSchema,
  talks: talkSchema,
};

export type Collection = keyof typeof schemas;

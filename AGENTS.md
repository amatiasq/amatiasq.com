# amatiasq.com — AGENTS.md

A. Matías Quezada's professional portfolio: his calling card. Static Astro on
Bun; what it is and how it deploys, in [`README.md`](README.md).

## Glossary

- **Collection** — each folder in `content/`: `blog`, `career`, `projects`,
  `talks`, `experiments`. There's a page per public project and per
  experiment, updated in the same change that touches the project: it's
  user-facing and a stale entry misinforms.
- **Translatable** — any text on the site: a `string`, a positional
  `[en, es]` or an `{ en, es }`. The URL decides the language, and `tr()` —from
  `useTranslations(Astro.url)`, or the `<Tr>` component— is the only thing that
  resolves it. Spanish and English; maybe Catalan some day.
- **Per-language body** — each markdown body is split by `---` into one block
  per language, positional like the `Translatable` array. Link definitions
  (`[1]: …`) are written once at the end of the file and `splitByLanguage`
  hands them to every block: without that they only resolve in the last
  language and the rest paint `[text][1]` as plain text. `src/content.test.ts`
  covers it, over the real files.
- **Demos** — `public/demos/`, served as they are. Old archived code that
  often can't be rebuilt anymore: don't lint or update it. That's why
  `public/` is outside `tsconfig.json`.

## Invariants

- **The custom loader in `content.config.ts` is what makes multilingual
  markdown possible**, and Astro's official `glob()` can't replace it: the body
  can only be split per language by calling `store.set({ body })`, and that's
  only possible inside a loader. It looks like a needless copy of the official
  one; it isn't.
- **Collection schemas live in `src/content.schemas.ts`**, not in
  `content.config.ts`: that file imports `astro:content`, which only exists
  inside Astro, and `amq amatiasq.com check` needs them to say which
  frontmatter is broken —and offer to fill it— before paying for a build.
- **Job dates are sacred**: they're real and aren't touched. If the timeline
  display needs adjusting, it's done with separate fields.
- **This is serious: subtle animations, never flashy**, and **text animations
  are for text**, not for boxes or containers. Visual consistency across the
  site and minimal generated HTML: not one extra wrapper. CSS before client JS.

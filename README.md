# amatiasq.com

A. Matías Quezada's professional portfolio. Astro `output: 'static'` on Bun:
`bun install` and `bun run dev` (scripts are in `package.json`, maintenance
commands in `amq/`, each with its `--help`).

## Deploy

`amq amatiasq.com deploy` builds `dist/` **locally** and uploads it to the
VPS's shared nginx, along with `infra/www/`. **No `git push` needed**: what
ships is the working tree, and the commit it came from is at
<https://amatiasq.com/version.txt>, with a `-dirty` suffix if the tree was
dirty.

The domain doesn't serve only the site: it also carries about fifteen routes
of its own with years of history behind them (`/book/limites`, `/plot`, `/js`,
`/install`, CV redirects…), and the loose files those alias are `infra/www/`.
The routing lives in the shared nginx's config and ships in the same `deploy`.

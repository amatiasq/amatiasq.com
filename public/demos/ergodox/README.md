# ergodox — build recipe

Prebuilt output of [`amatiasq/ergodox-layout-manager`](https://github.com/amatiasq/ergodox-layout-manager)
at commit `95fbca4`, committed here because the source is a 2016 Angular
2.0.0-rc.6 + webpack 1 + TypeScript 1.8 project that cannot be built by anything
on a modern machine without the steps below.

It was moved off `repos.amatiasq.com`, where it had been **broken**: only
`index.html` was ever deployed, so `dist/*.js` 404'd and the page sat on
"Loading…" forever. This is the first working copy since.

The app is self-contained — `save()`/`load()` use `localStorage`. The `firebase`
dependency in `package.json` is never imported, which is lucky, because that
Firebase project has since been deactivated.

## Rebuilding

```sh
git clone git@github.com:amatiasq/ergodox-layout-manager && cd ergodox-layout-manager
git checkout 95fbca4
```

Then, before building:

1. `webpack.config.js`: `output.publicPath` `'/dist/'` → `'dist/'`, or a lazily
   loaded chunk resolves against the site root instead of `/demos/ergodox/`.
2. `tsconfig.json`: add `"noLib": true`.
3. Add `typings/index.d.ts` (TS 1.8 has no `lib` option, and the `typings`
   registry the `postinstall` hook wants no longer answers):

   ```ts
   /// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
   declare var require: {
     (path: string): any;
     ensure(paths: string[], cb: (require: any) => void): void;
   };
   declare var process: any;
   declare var module: any;
   ```

   `lib.es6.d.ts` supplies the `Promise`/`Map`/`Set` globals Angular's `.d.ts`
   files reference; `noLib` makes it replace the default lib rather than collide
   with it. Without this the build fails with a wall of `TS2304: Cannot find
   name 'require'` and `Cannot find global type` errors.

Build in Docker — the toolchain predates arm64 Node, and npm 3's flat-ish tree
is part of why it resolves at all:

```sh
docker run --rm --platform linux/amd64 -v "$PWD":/app -w /app node:6 \
  sh -c "npm install --ignore-scripts && ./node_modules/.bin/webpack"
```

`--ignore-scripts` skips the dead `typings install` postinstall. The build takes
~2.5 minutes under emulation and emits `dist/{app,polyfills,vendor}.js`, which is
exactly what `index.html` loads. Copy those three plus `index.html` here; the
`.map` files are 3.6 MB and are dropped (along with their `sourceMappingURL`
comments).

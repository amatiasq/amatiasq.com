# ergodox — build recipe

Prebuilt output of [`amatiasq/ergodox-layout-manager`](https://github.com/amatiasq/ergodox-layout-manager)
at commit `95fbca4`, committed here because the source is a 2016 Angular
2.0.0-rc.6 + webpack 1 + TypeScript 1.8 project that no modern machine can build
without the steps below.

Self-contained: `save()`/`load()` use `localStorage`, and the `firebase`
dependency in `package.json` is never imported — which is lucky, because that
Firebase project is deactivated.

## Rebuilding

Check out `95fbca4`, then, before building:

1. `webpack.config.js`: `output.publicPath` `'/dist/'` → `'dist/'`, or a lazily
   loaded chunk resolves against the site root instead of `/demos/ergodox/`.
2. `tsconfig.json`: add `"noLib": true`.
3. Add `typings/index.d.ts` — TS 1.8 has no `lib` option and the `typings`
   registry its `postinstall` wants is gone. Without it the build dies in
   `TS2304: Cannot find name 'require'` and missing global types:

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
   reference; `noLib` makes it replace the default lib instead of colliding.

Build in Docker: the toolchain predates arm64 Node, and npm 3's flat-ish tree is
part of why it resolves at all.

```sh
docker run --rm --platform linux/amd64 -v "$PWD":/app -w /app node:6 \
  sh -c "npm install --ignore-scripts && ./node_modules/.bin/webpack"
```

`--ignore-scripts` skips the dead `typings install`. ~2.5 min under emulation;
emits `dist/{app,polyfills,vendor}.js`, exactly what `index.html` loads. Copy
those three plus `index.html` here, dropping the 3.6 MB `.map` files and their
`sourceMappingURL` comments.

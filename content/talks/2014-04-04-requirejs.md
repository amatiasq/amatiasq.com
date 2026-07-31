---
title:
  en: Modularize your Javascript
  es: Modulariza tu Javascript

links:
  slides: https://slides.amatiasq.com/requirejs/

image:
  src: requirejs.png
  en: RequireJS logo is a target with an arrow below
  es: El logo de RequireJS es una diana con una flecha debajo

tags:
  - Javascript
  - RequireJS

iframe:
  src: 'https://slides.amatiasq.com/requirejs/'
  style: |
    margin: 1rem 0 0;
    height: calc(calc(var(--available-width) * 0.563) + 36px);
---

This is a talk I gave at a Betabeers Barcelona event about how to use [RequireJS and it's CommonJS compatibility][1]:

```js
define(function (require, exports, module) {
  var foo = require('./foo');

  return { bar: 1 };
});
```

Sadly I chose a [niche presentation micro-framework][2] which at some point I forgot how to run and couldn't invest the time to re-learn it. This wouldn't have happened if I had documented it, or at least taken notes about how to use it — lesson learned.

The deck has since been re-authored from its original source into [Slidev](https://sli.dev), speaker notes and all, and runs again at [slides.amatiasq.com/requirejs](https://slides.amatiasq.com/requirejs/).

---

Esta es una charla que di en un evento de Betabeers Barcelona sobre cómo usar [RequireJS en compatibilidad con CommonJS][1]:

```js
// foo.js
define(function (require, exports, module) {
  return { bar: 1 };
});
```

```js
// main.js
define(function (require, exports, module) {
  var foo = require('./foo');

  return { quz: foo.bar };
});
```

Por desgracia elegí un [micro-framework de presentaciones][2] que en algún momento olvidé cómo usar y no pude invertir el tiempo en volver a aprenderlo. Esto no habría pasado si lo hubiese documentado, o al menos hubiese tomado notas sobre cómo usarlo — lección aprendida.

Desde entonces las diapositivas se han vuelto a escribir a partir de su fuente original en [Slidev](https://sli.dev), con notas del ponente incluidas, y funcionan de nuevo en [slides.amatiasq.com/requirejs](https://slides.amatiasq.com/requirejs/).

[1]: https://requirejs.org/docs/commonjs.html
[2]: https://github.com/bespokejs/bespoke
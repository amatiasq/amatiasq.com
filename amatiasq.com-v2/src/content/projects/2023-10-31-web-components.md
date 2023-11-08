---
title: Web Components

links:
  github: https://github.com/amatiasq/components/

image:
  src: web-components.png
  center: 49% 76%
  en: Demo and documentation for the Hambuerger Button Web Component
  es: Documentación y demostración del Web Component Hamburguer Button

labels:
  - Bun
  - Typescript
  - Web Components

pinned: true
---

A repository to store and deploy my web components. In order to create them easily I built [a simple transpiler][1] in Bun.

This is how a web component, in this example `src/sample-component.html`, is defined:

```html
<template>
  <div>Hello world!</div>
</template>

<script>
  export class SampleComponent extends HTMLElement {
    // this property declaration...
    #shadowRoot;

    // ... and the constructor calling super()
    // are required for this to work
    constructor() {
      super();
    }
  }
</script>

<style>
  div {
    color: var(--my-color);
  }
</style>

<docs>
  # Sample Component Some markdown documentation - Neat - Clean - Simple
</docs>

<test>
  <sample-component style="--my-color: blue"></sample-component>
  <h3>This is plain HTML</h3>
  <sample-component style="--my-color: red"></sample-component>
</test>
```

Which whill generate `out/sample-component.js` (below) and [`out/sample-component.html`][2] for documentation and manual testing.

```js
export const template = `
  <div>Hello world!</div>

  <style>
    div {
      color: var(--my-color);
    }
  </style>
`;

export class SampleComponent extends HTMLElement {
  #shadowRoot;

  constructor() {
    super();

    // Automatically inserted
    // if this fails ensure #shadowRoot is defined in the class
    this.#shadowRoot = this.attachShadow({ mode: 'open' });
    this.#shadowRoot.innerHTML = template;
  }
}

// Automatically generated from file name
customElements.define('sample-component', SampleComponent);
```

The `script`, `template`, `style`, `docs` and `test` elements are optional and can be defined in any order.

If the `script` tag is present it should contain a class called as the file (converted from `snake-case` to `PascalCase`) in order for the component to work.
It should declare a `#shadowRoot` property that will be used to save the shadow DOM and the call to `super()` is used to inject the shadow DOM instantiation.

## Future

The idea behind this is that someday, when `<template shadowrootmode="open">` is supported by browsers (or maybe today with a polyfill) a Server Side Rendering (SSR) or Static Site Generation (SSG) tool could import the `const template` export and serve pre-filled components' insides.

```html
<sample-component>
  <!-- this could be inserted by Vite, Astro, Next.js... -->
  <template shadowrootmode="open">
    <div>Hello world!</div>

    <style>
      div {
        color: var(--my-color);
      }
    </style>
  </template>
</sample-component>
```

That would make the component immediately visible, even for users with disabled Javascript.
If the user has Javascript enabled the component will just be hydrated as soon as it's code is executed.

To know more about this approach check [this video][3] by Thomas Allmer.

[1]: https://github.com/amatiasq/components/blob/main/scripts/convert-to-js.ts
[2]: https://components.amatiasq.com/sample-component.html
[3]: https://www.youtube.com/watch?v=V2yjXFPYjVA

# Plan — Deuda técnica de amatiasq.com

**Status:** ⬜ sin empezar; hallazgos verificados el 2026-08-07.
**Blocker:** ninguno. Nada de aquí está roto de cara al visitante, así que nada
urge; el i18n roto es lo único que produce salida incorrecta.

**Hay dos sistemas de i18n y el segundo está roto.** `internals/i18n.ts` guarda
el idioma en un `let` de módulo que nadie inicializa —`setLanguage()` no se llama
en ninguna parte—, así que siempre vale `'en'`. Lo usa sólo `Image.astro`, de modo
que un `src` o `alt` traducible sale en inglés también en `/es/`. Se arregla
usando `useTranslations(Astro.url)` como todo lo demás; entonces
`internals/i18n.ts` se queda sin usuarios y se borra entero.

El resto, por orden de lo que devuelve:

- **Shiki se recrea en cada `<Markdown>`**: `createHighlighter` con 15 lenguajes
  corre una vez por render, decenas por build. Un módulo con la instancia y la
  lista de lenguajes, y `Markdown` la pide.
- **La CI sólo typechequea**: en un sitio estático el build *es* el test, y un
  import de asset roto pasa el `astro check`.
- **La localización del body está copiada en las cinco páginas `[slug]`**: una
  regla sin nombre repetida cinco veces, `localizeBody(body, lang)` en `i18n.ts`.
- **44 `any`**, el grueso en `CareerTimeline` y `ContentCards`, que reciben
  `any[]` pudiendo recibir el `CollectionEntry<…>` que Astro ya genera.
- **Los colores de marca viven dentro de `CareerTimeline`**: el color de una
  empresa es dato del trabajo, va al frontmatter de `content/career/`.
- Los avisos que ya da `astro check`: `frameborder` deprecado (×3) y un `tr` sin
  usar en la página de etiquetas. Son ruido que tapará al que sí importe.

**Lo que no hay que hacer**: borrar el loader propio (es lo único que permite el
markdown multilingüe), meter un framework de cliente o cambiar el i18n por URL
—simple y correcto—, y tocar el CSS de `Layout.astro`: es grande porque es la
hoja de estilos del sitio, y está ordenada.

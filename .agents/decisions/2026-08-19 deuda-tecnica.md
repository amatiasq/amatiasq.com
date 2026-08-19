# 2026-08-19 — la deuda técnica de amatiasq.com

**Review:** ⚠️ pendiente — dos cambios visibles: los `alt` de `/es/` pasan a
estar en español y la tarjeta de Katch cambia de color. Míralos con
`amq amatiasq.com local`.

Los siete puntos del plan, hechos. Lo que merece quedar escrito:

## Había dos sistemas de i18n y el segundo nunca funcionó

`internals/i18n.ts` guardaba el idioma en un `let` de módulo y nadie llamaba a
`setLanguage()`, así que `t()` siempre resolvía a inglés. Su único usuario era
`Image.astro`, de modo que el `alt` de cada imagen salía en inglés también en
`/es/`. Ahora usa `useTranslations(Astro.url)` y el módulo está borrado: **el
idioma lo decide la URL y no hay otro sitio donde pueda vivir**.

La partición del cuerpo por idioma estaba copiada en las cinco páginas `[slug]`
y es ahora `localizeBody(body, lang)` en `i18n.ts`.

## Shiki se creaba una vez por página

`createHighlighter` con 15 gramáticas corría dentro de `<Markdown>`. Vive en
`util/highlighter.ts`, que crea la instancia al importarse: el build baja de ~5s
a ~2s con el mismo `dist/`.

## El build es el test

`astro check` lee tipos y no resuelve un solo import de asset, así que una
imagen renombrada pasaba el check y moría en el deploy. `amq amatiasq.com check`
construye, y el workflow ya delegaba en él.

## El color de marca es dato del trabajo

Vivía en un mapa dentro de `CareerTimeline` que emparejaba **por subcadena**
contra el nombre de la empresa, y por eso fallaba en silencio: la clave era
`Catch` y la empresa se llama `Katch`, así que su tarjeta se pintaba con un hash
del nombre. Ahora está en el frontmatter de `content/career/` y Katch recibe el
`#9333EA` que le tocaba.

Un trabajo sin `color` pinta con `var(--border)`, no con un hash: **gris pide el
dato que falta, un color inventado lo esconde.** Se cayeron por el camino los
colores de `Visual` y `ThoughtWorks`, que eran `hide: true` sin `org` y por lo
tanto nunca se dibujaron.

## Sobreviven dos `any` de 44

Los dos en el loader propio y los dos obligados: Astro tipa `body` como un único
string —y partirlo por idioma es justo la línea que hace multilingüe este sitio—
y `addAssetImports` no aparece en el tipo público de `DataStore`. Están anotados
en el comentario del loader. `astro check` queda a cero avisos.

## Trampa: `amq <proj> check` desde un worktree

El dispatcher hace `cd` a `$MONOREPO/<proyecto>`, o sea al checkout principal:
un `amq amatiasq.com check` lanzado desde un worktree comprueba el árbol de
otro. Aquí se corrió `bash amq/amq-amatiasq.com-check` a pelo. Es el bug ya
registrado en
[`amq-cd-sigue-al-script.md`](../../../.agents/plans/amq-cd-sigue-al-script.md);
no se ha tocado nada para esquivarlo desde este proyecto.

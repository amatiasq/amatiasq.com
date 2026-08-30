# 2026-08-19 — la deuda técnica de amatiasq.com

**Los siete puntos del plan, hechos.** Lo que conviene no volver a tropezar:

- Había un segundo i18n (`internals/i18n.ts`) que **nunca funcionó** —guardaba
  el idioma en un `let` y nadie llamaba a `setLanguage()`—, y por él el `alt` de
  cada imagen salía en inglés también en `/es/`. Borrado.
- `createHighlighter` con 15 gramáticas corría una vez por página; creado al
  importar `util/highlighter.ts`, el build baja de ~5 s a ~2 s.
- **`astro check` no resuelve un solo import de asset**: una imagen renombrada
  pasaba el check y moría en el deploy, y por eso `amq <proj> check` construye.
- El color de marca emparejaba **por subcadena** con el nombre de la empresa, y
  la clave decía `Catch` donde la empresa es `Katch`. Ahora va en el frontmatter
  (`#9333EA`) y un trabajo sin `color` pinta `var(--border)`: **gris pide el
  dato que falta, un color inventado lo esconde.**
- Aquí el check se corrió a pelo, porque `amq <proj> check` hacía `cd` al
  checkout principal; arreglado el 2026-08-21 ([`amq-cd-sigue-al-script.md`](../../../.agents/decisions/2026-08-21%20amq-cd-sigue-al-script.md)).

# Plan: subir `amatiasq.com` de Astro 5 a Astro 7

**Estado**: propuesta, sin empezar (2026-08-04).
**Esfuerzo**: M · **Riesgo**: medio (dos majors seguidos, sitio en producción).
**Urgencia real: baja** — ver §1 antes de priorizarlo.

## 1. Por qué existe este plan, y por qué NO es urgente

Dependabot marca 8 alertas contra `amatiasq.com/package.json`, dos de ellas
`high`:

- **Host header SSRF en el fetch de la página de error prerenderizada** — requiere
  un servidor Astro que atienda peticiones.
- **XSS reflejado vía nombre de slot sin escapar** — requiere que el nombre del
  slot venga de entrada del atacante.

`astro.config.mjs` declara `output: 'static'`: el sitio se prerenderiza entero y
se sirve como ficheros estáticos, sin runtime de Astro en producción. No hay
Host header que envenenar, y los dos únicos slots con nombre del proyecto son
literales escritos a mano. **Ninguna de las dos es explotable aquí.** El resto
son `medium`/`low` del mismo perfil.

Es decir: esto se hace por estar al día y por dejar de ver ruido en el panel de
seguridad, no porque el sitio esté expuesto. Si hay algo más valioso en la cola,
va antes.

## 2. Situación de partida

- `astro@^5.1.7` instalado; última publicada `7.1.6`. Son **dos majors**.
- Node local v24.18.1; Astro 7 pide `node >= 22.12.0`. Sin problema.
- Deps que se mueven con Astro: `@astrojs/rss@^4.0.15`, `@astrojs/check@^0.9.9`.
- Del resto (`marked`, `shiki`, `micromatch`, `open-props`) solo hay que vigilar
  `shiki`, que Astro usa internamente para el resaltado de código.
- No hay integraciones de terceros en `astro.config.mjs` — la superficie de
  ruptura es pequeña. Lo que sí se usa y hay que verificar en cada guía de
  migración: `i18n` con `prefixDefaultLocale: false`, `trailingSlash: 'always'`,
  `scopedStyleStrategy: 'where'`, `compressHTML: false`, y el alias `@` de Vite.

## 3. Procedimiento

Un major por vez, verificando entre medias. No saltar directo a 7.

1. Rama aparte. `amatiasq.com` está en producción y se despliega desde `main`.
2. **5 → 6**: leer la guía de migración oficial de Astro v6 y ejecutar
   `npx @astrojs/upgrade` (actualiza `astro` y las integraciones `@astrojs/*` de
   forma coherente). Aplicar los cambios que marque la guía.
3. Verificar: `bunx astro check` (ya hay comando: `amq amatiasq.com check`) +
   `bun run build` + `bun run preview`, y revisar a ojo home, un post, el RSS y
   una ruta en el idioma no-por-defecto (el `i18n` es lo más frágil del config).
4. Commit. **5 → 6 y 6 → 7 en commits separados**, para poder bisecar si algo se
   rompe en el sitio semanas después.
5. **6 → 7**: repetir 2-4 con la guía de v7.
6. Comparar el `dist/` resultante con el de antes de empezar (`diff -r`): en un
   sitio estático, el output ES el producto. Cambios esperados en hashes de
   assets y detalles del HTML; cambios en texto visible o en rutas, no.

## 4. Criterios de aceptación

- `astro check` limpio (hoy lo está).
- `bun run build` sin errores ni warnings nuevos.
- Todas las rutas que existían siguen existiendo con la misma URL — ojo con
  `trailingSlash: 'always'`, un cambio ahí rompe enlaces externos y SEO.
- El feed RSS valida y mantiene los mismos `guid`.
- El resaltado de código sigue funcionando (shiki).
- Las 8 alertas de Dependabot contra `amatiasq.com` desaparecen.

## 5. Notas

- Si la guía de v6 o v7 exige tocar la estructura de contenido (content
  collections), parar y reevaluar: eso deja de ser un bump y pasa a ser una
  refactorización, y merece su propia decisión.
- Al terminar, archivar en `amatiasq.com/.agents/decisions/{fecha} astro-7.md`
  y borrar la fila de `.agents/plans/INDEX.md`.

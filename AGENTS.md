# amatiasq.com — AGENTS.md

El portfolio profesional de A. Matías Quezada: su carta de presentación. Astro
estático sobre Bun; qué es y cómo se despliega, en [`README.md`](README.md). Las
reglas generales están en el [`AGENTS.md`](../AGENTS.md) raíz —*minimal
everything*, CSS antes que JS de cliente—; aquí sólo va lo propio.

## Glosario

- **Colección** — cada carpeta de `content/`: `blog`, `career`, `projects`,
  `talks`, `experiments`. Hay una página por proyecto público y por experimento,
  y el raíz obliga a actualizarla en el mismo cambio que toca el proyecto: es
  user-facing y una entrada obsoleta desinforma.
- **Translatable** — cualquier texto del sitio: un `string`, un `[en, es]`
  posicional o un `{ en, es }`. El idioma lo decide la URL, y `tr()` —de
  `useTranslations(Astro.url)`, o el componente `<Tr>`— es lo único que lo
  resuelve. Español e inglés; quizá catalán algún día.
- **Body por idioma** — el cuerpo de cada markdown se parte por `---` en un
  bloque por idioma, posicional como el array de `Translatable`.
- **Demos** — `public/demos/`, servidos tal cual. Código antiguo archivado, que
  a menudo ya no se puede reconstruir: no lo lintes ni lo actualices. Por eso
  `public/` está fuera de `tsconfig.json`.

## Invariantes

- **El loader propio de `content.config.ts` es lo que hace posible el markdown
  multilingüe**, y no se puede sustituir por el `glob()` oficial de Astro: el
  body sólo se puede partir por idioma llamando a `store.set({ body })`, y eso
  únicamente se puede hacer dentro de un loader. Parece copia gratuita del
  oficial; no lo es.
- **Las fechas de los trabajos son sagradas**: son reales y no se tocan. Si hay
  que ajustar la visualización del timeline, se hace con campos aparte.
- **Esto es serio: animaciones sutiles, nunca llamativas**, y **las animaciones
  de texto son para texto**, no para cajas ni contenedores. Consistencia visual
  en todo el sitio y HTML generado mínimo: ni un wrapper de más.

Historia: [`.agents/decisions/`](.agents/decisions). Deuda conocida y todavía sin
tocar: [`.agents/summary/`](.agents/summary).

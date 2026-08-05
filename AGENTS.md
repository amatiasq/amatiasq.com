# amatiasq.com — AGENTS.md

El portfolio profesional de A. Matías Quezada: su carta de presentación. Astro.
Las reglas generales están en el [`AGENTS.md`](../AGENTS.md) raíz —
*minimal everything*, CSS antes que JS de cliente— y aquí sólo va lo propio.

## Contenido

Una página por proyecto público en `content/projects/` y por experimento en
`content/experiments/`. El raíz obliga a actualizar la página en el mismo cambio
que modifica el proyecto: es user-facing y una entrada obsoleta desinforma.

Los demos viven en `public/demos/`, servidos tal cual. Son código antiguo
archivado: no los lintes ni los actualices.

## Diseño

- Esto es profesional y serio: animaciones sutiles, no llamativas.
- **Las animaciones de texto son para texto**, no para cajas ni contenedores.
- Consistencia visual en toda la página.
- El HTML generado, mínimo: nada de wrappers ni contenedores de más.

## Internacionalización

Español e inglés (quizá catalán en el futuro). Todo texto traducible pasa por el
componente `<Tr>`.

## Timeline de carrera

`src/components/organisms/CareerTimeline.astro` tiene la escala:

```javascript
const PIXELS_PER_YEAR = 60; // distancia entre años
```

**Las fechas de los trabajos son sagradas**: son reales y no se tocan. Si hay que
ajustar la visualización, usa campos aparte.

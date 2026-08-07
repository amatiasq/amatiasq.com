# amatiasq.com

Portfolio profesional de A. Matías Quezada. Astro `output: 'static'` sobre Bun:
`bun install` y `bun run dev` (los scripts están en `package.json`, los comandos
de mantenimiento en `amq/`, cada uno con su `--help`).

## Despliegue

`amq amatiasq.com deploy` construye `dist/` **en local** y lo sube al nginx del
VPS que ya sirve el dominio, junto con `infra/`. **No hace falta `git push`**: lo
que se despliega es el árbol de trabajo, y el commit que salió queda en
<https://amatiasq.com/version.txt> con sufijo `-dirty` si el árbol estaba sucio.

`infra/nginx.conf` no sirve sólo el sitio: lleva además una quincena de rutas
propias con años de historia detrás (`/book/limites`, `/plot`, `/js`,
`/install`, redirecciones de CV…). Se despliega con él.

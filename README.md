# amatiasq.com

Portfolio profesional de A. Matías Quezada. Astro con `output: 'static'`, sobre
Bun.

## Desarrollo

```sh
bun install
bun run dev       # http://localhost:4321
bun run build
bun run preview
```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `amq amatiasq.com check` | Lo mismo que CI: instala y pasa `astro check` |
| `amq amatiasq.com deploy` | Construye y publica en producción |

## Despliegue

`amq amatiasq.com deploy` construye `dist/` aquí y lo sube al nginx del VPS que
ya sirve el dominio (`vps/docker/com_amatiasq/www/site/`), sube `infra/` y
recarga nginx. **No hace falta `git push`**: lo que se despliega es el árbol de
trabajo. El commit desplegado queda en <https://amatiasq.com/version.txt>, con
sufijo `-dirty` si el árbol no estaba limpio.

`infra/nginx.conf` es la configuración de ese nginx: sirve el sitio en `/` y
tiene además una quincena de rutas propias (`/book/limites`, `/plot`, `/js`,
`/install`, redirecciones de CV…). Se despliega con el sitio.

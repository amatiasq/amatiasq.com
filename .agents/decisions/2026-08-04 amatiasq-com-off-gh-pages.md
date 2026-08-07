# `amatiasq.com` sale de GitHub Pages

En producción, sin revisar por un humano. Commits `16da57d`, `3b4e6be`,
`e62d87b`.

`amq amatiasq.com deploy` construye `dist/` en local y lo rsyncea a
`vps/docker/com_amatiasq/www/site/` —dentro del `./www:/www:ro` que el
contenedor ya montaba—, sube `infra/` y recarga nginx. Cero saltos por GitHub.

Lo que costó un rato del `location /`:

- **`index index.html` y nada de `try_files`**: es lo que hace el 301 de
  `/en/blog` a `/en/blog/`. Con `try_files $uri $uri/` la página se sirve sin la
  barra, y el build enlaza con ella (`trailingSlash: 'always'`).
- **`absolute_redirect off`**: nginx-proxy termina el TLS, así que este server
  sólo ve http y redirigía a `http://`.
- **`error_page 403 =404`**: un directorio sin `index.html` (`/demos/`) es una
  URL que nadie construyó, no un permiso denegado.
- **El rsync del sitio lleva `--delete`**, al revés que `amq deploy-infra`: todo
  lo que hay ahí es generado. Sin eso, las tres carpetas de etiqueta que renombró
  Astro 7 seguirían respondiendo 200 para siempre.
- **`dist/version.txt`** lleva el commit desplegado (`-dirty` si el árbol estaba
  sucio). Antes la trazabilidad la daba Pages, que construía de un commit
  conocido; `dist/` está gitignorado.

## El bug que se llevó por delante dos deploys

`amq deploy-infra` usaba `rsync -az`. rsync escribe un temporal y lo renombra,
así que el fichero nuevo estrena inodo — y compose monta ficheros sueltos **por
inodo**: el contenedor siguió leyendo el viejo, ya sin nombre pero vivo gracias
al propio montaje. Traicionero, porque el deploy termina bien y `nginx -t` valida
el fichero que nadie lee. `--inplace` (`e62d87b`) lo evita para todos los
proyectos. **No cura un montaje ya roto**: hubo que recrear el contenedor, y al
hacerlo pasó a llamarse `amq-amatiasq`, que es lo que dice el `compose.yml` desde
la migración a `{project}/infra/`. El miedo a dos contenedores con el mismo
`VIRTUAL_HOST` haciendo round-robin (como le pasó a `meme`) no se materializó:
el viejo llevaba etiquetas de compose, así que `docker compose down` lo eliminó
antes de crear el nuevo.

## Pendiente

- **Desactivar Pages** en `amatiasq/amatiasq.com` desde la web de GitHub: el
  workflow ya no existe, pero el sitio sigue en pie y ya no lo mira nadie.
- **`/meme/<name>` está roto** —y lo estaba antes—: su `location` hace
  `root /www/memes`, carpeta que no existe en el servidor desde que los memes
  tienen servicio propio. Alguien tiene que decidir si se borra o se arregla.
- Renombrar la carpeta del servidor `com_amatiasq` → `amatiasq.com`.

# `amatiasq.com` sale de GitHub Pages

**Estado**: hecho y **en producción**, sin revisar por un humano. Commits
`16da57d` (deploy + nginx), `3b4e6be` (apagar Pages), `e62d87b` (arreglo en
`amq deploy-infra`).

Ejecuta `.agents/plan/deploy-without-push.md`.

## Qué corre ahora

`amq amatiasq.com deploy` construye `dist/` en local, lo rsyncea a
`vps/docker/com_amatiasq/www/site/` (dentro del volumen `./www:/www:ro` que el
contenedor ya montaba), sube `infra/` y recarga nginx. Cero saltos por GitHub.

`location /` sirve desde disco. Detalles que costaron un rato:

- **`index index.html` y nada de `try_files`**: es lo que hace el 301 de
  `/en/blog` a `/en/blog/`. Con `try_files $uri $uri/` la página se sirve pero
  sin la barra, y el build enlaza con ella (`trailingSlash: 'always'`).
- **`absolute_redirect off`**: nginx-proxy termina el TLS, así que este server
  solo ve http y redirigía a `http://`.
- **`error_page 403 =404`**: un directorio sin `index.html` (p.ej. `/demos/`) es
  una URL que nadie construyó, no un permiso denegado.
- **El rsync del sitio lleva `--delete`**, al revés que `amq deploy-infra`. Todo
  lo que hay ahí es generado; sin eso, las tres carpetas de etiqueta que
  renombró la subida a Astro 7 seguirían respondiendo 200 para siempre.
- **`dist/version.txt`** lleva el commit desplegado (con sufijo `-dirty` si el
  árbol no estaba limpio). `dist/` está en `.gitignore`; antes lo garantizaba
  Pages, que construía desde un commit conocido. Resuelve el punto de
  trazabilidad que el plan dejaba abierto en su §6.

## El bug que se llevó por delante dos deploys

`amq deploy-infra` usaba `rsync -az`. rsync escribe un temporal y lo renombra,
así que el fichero nuevo estrena inodo — y compose monta ficheros sueltos **por
inodo**. El contenedor siguió leyendo el fichero viejo, sin nombre ya pero vivo
gracias al propio montaje.

El resultado es especialmente traicionero: el deploy termina bien, `nginx -t`
valida... el fichero que nadie está leyendo, y producción se queda igual.
`--inplace` (commit `e62d87b`) lo evita para todos los proyectos, no solo este.

**No cura un montaje ya roto**: hubo que recrear el contenedor una vez. Al
hacerlo con `amq vps pull-and-restart com_amatiasq` el contenedor pasó de
llamarse `com_amatiasq` a `amq-amatiasq`, que es lo que dice el `compose.yml` de
este repo desde la migración a `{project}/infra/` y que el servidor nunca había
aplicado.

**Eso toca el punto que el plan §6 dejaba fuera a propósito** (el miedo a dos
contenedores con el mismo `VIRTUAL_HOST` haciendo round-robin, como le pasó a
`meme`). No ocurrió, y no podía: el contenedor viejo llevaba las etiquetas
`com.docker.compose.project=amq_com_amatiasq` / `service=nginx`, así que
`docker compose down` lo eliminó antes de crear el nuevo. Comprobado después:
un solo contenedor. Lo que sigue pendiente de §6 es el resto del renombrado —
la carpeta del servidor sigue siendo `com_amatiasq`.

## Verificación en producción

La prueba de aceptación del plan, que llevaba días commiteada y sin desplegar:

```
$ curl -sI https://amatiasq.com/plot | grep -i content-
content-type: video/mp4
content-length: 2735265        (antes: image/gif, 29506767)
```

Y además: cero cabeceras `x-github-*`; `/version.txt` devuelve el commit;
`/`, `/en/`, `/es/`, `/rss.xml`, una entrada de blog, una de carrera y un
proyecto en 200; `/en/blog` → 301 a `/en/blog/` con `Location` relativa;
`/demos/glib/test/`, `/demos/ergodox/`, `/demos/pathfinding/`,
`/demos/chameleon/` vivos — con lo que cae el punto 1 de
`../../.agents/plans/retire-vps-repos.md`; las rutas propias del nginx
(`/book/limites`, `/js`, `/install`, `/cv-en`, `/template`, `/s`, `/glib`)
intactas; `/nope` da 404; los assets de `/_astro/` con `immutable`; `amq.im` y
`www.amatiasq.com` también sirven.

## Pendiente

- **Desactivar Pages en `amatiasq/amatiasq.com`** desde la web de GitHub. El
  workflow que publicaba ya no existe, así que el contenido se queda congelado,
  pero el sitio de Pages sigue en pie y ya no lo mira nadie.
- **`/meme/<name>` está roto en producción**, y lo estaba antes de esto: el
  `location` hace `root /www/memes` y esa carpeta no existe en el servidor. Los
  memes viven en su propio servicio desde hace meses. No se toca aquí porque no
  es de este plan, pero alguien debería decidir si esa ruta se borra o se
  arregla.
- Renombrar la carpeta del servidor `com_amatiasq` → `amatiasq.com` (plan §6).

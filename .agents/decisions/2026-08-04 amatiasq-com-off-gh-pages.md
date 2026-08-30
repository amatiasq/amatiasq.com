# 2026-08-04 — `amatiasq.com` sale de GitHub Pages

**`amq amatiasq.com deploy` construye `dist/` en local, lo rsyncea al VPS y
recarga nginx**: cero saltos por GitHub. Commits `16da57d`, `3b4e6be`, `e62d87b`.

- **`rsync -az` deja el contenedor leyendo el fichero viejo**: rsync renombra un
  temporal y el fichero estrena inodo, y compose monta ficheros sueltos por
  inodo. El deploy termina bien y `nginx -t` valida lo que nadie lee. Lo evita
  `--inplace`; un montaje ya roto sólo se cura recreando el contenedor.
- `location /` lleva `index index.html` y **nada de `try_files`** —es lo que
  hace el 301 a `/en/blog/`, y el build enlaza con barra—, `absolute_redirect
  off` (nginx-proxy termina el TLS y este server sólo ve http) y
  `error_page 403 =404`. El rsync del sitio va con `--delete`: todo lo que hay
  ahí es generado.
- Pendiente: desactivar Pages en GitHub; `/meme/<name>` hace `root /www/memes`,
  carpeta que ya no existe en el servidor.

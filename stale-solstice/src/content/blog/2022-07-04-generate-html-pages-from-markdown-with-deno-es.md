---
---

He estado trabajando en una versión nueva de este sitio con una idea clara:

- Quiero escribir el contenido en Markdown
- Quiero que sea el sitio más rápido que ha habido (negociable)
- Bilingüe (N-lingüe de hecho)

Después de unos meses de trabajo me encontré tomando la misma presunción no escrita que recientemente comenté a mi amiga @Shakira, quién me ayudó con este hermoso diseño 🙌

> Voy a animar la cabecera de alguna forma sólo con CSS, no hay lugar para Javascript en el sitio del tipo del Javascript. Ese es el mensaje 🤣

Eso es todo.

El post puede terminar aquí.

Pero tengo más que escribir:

Eso significa...

- Páginas con HTML / CSS plano
- CSS / JS embebido directamente en el HTML
- solo el CSS / JS necesario se incluye

Y... necesito probar [Deno][1], parece genial, suena genial y sabes que encontrarás problemas cuando empieces a usarlo pero cuáles podrán ser?

Aquí está el camino para generar páginas HTML desde TSX con Deno:

- Tienes [Deno][2] instalado
- Crea un archivo `.tsx`
- importar `React` de `https://esm.sh/react`
- importar `{ renderToStaticMarkup }` de `https://esm.sh/react-dom/server`;
- esto:

```ts
// Las versiones se incluyen por importantes razones! 🥲
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// Este es nuestro único componente
function MyComponent() {
  return <p>Ésta es mi página!<p>
}

// renderToStaticMarkup hace la magia
const html = renderToStaticMarkup(<MyComponent />);

// enviar el HTML resultante a la salida del programa
console.log(html);
```

"Pero Matías! quiero que esto se pueda leer de / escribir a disco! no desde el mismo código!"

```ts
// main.tsx
import React from 'https://esm.sh/react@18.2.0';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// leemos los argumentos
const [input, output] = Deno.args;

// input/output pueden ser relativos al directorio de trabajo del usuario
const cwd = `file://${Deno.cwd()}/`;

const input_fullpath = new URL(input, cwd).pathname;
const output_fullpath = new URL(output, cwd).pathname;

// Importar el archivo .tsx que contiene la página
const inputModule = await import(input_fullpath);
const Page = inputModule.default;

const html = renderToStaticMarkup(<Page randomProp="yay" />);

// Escribimos el HTML generado a disco
await Deno.writeTextFile(output_fullpath, html);
```

```ts
// MyPage.tsx
import React from 'https://esm.sh/react@18.2.0'

export default () => <p>Ésta es mi página!<p>
```

```bash
deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-net=https://esm.sh \
  ./main.tsx \
  ./MyPage.tsx ./MyPage.html
```

Permisos explicados:

- `--allow-read=.` Deno permite que el script lea la carpeta en la que estamos: `.`
- `--allow-write=.` lo mismo que arriba, solo se necesita acceso a `input`/`output` pero `.` es suficiente la mayoría de las veces
- `--allow-net=https://esm.sh` requiere acceso a esm.sh para descargar las dependencias: `react` and `react-dom`
- `./main.tsx` esto no es un permiso, es el nombre del archivo que creamos allá arriba!
- `./MyPage.tsx ./MyPage.html` estos son los argumentos que se pasarán como `input` y `ouput`, es que no estabas prestando atención!?

Ok pero podemos hacerlo mejor, no queremos pasar archivo por archivo, queremos darle una carpeta y que genere la misma estructura, si tan solo tuvieramos un...

```ts
// Leer archivos recursivamente
export async function getFilesRecursively(currentPath: string) {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${root}/${dirEntry.name}`;

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)).sort());
    } else {
      names.push(entryPath);
    }
  }

  return names;
}
```

Estoy seguro que algo así es parte de `esm.sh/std` por algún lado...

Ahora vamos a actualizar el `main.tsx` que creamos arriba:

```ts
// main.tsx
import React from 'https://esm.sh/react@18.2.0';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// Importamos una función para obtener el nombre del directorio de un archivo
import { dirname } from 'https://deno.land/std@0.143.0/path/mod.ts';

const [input, output] = Deno.args;

// función auxiliar, hay algo en deno.land/std como esto?
const relativeToCwd = (target: string) =>
  new URL(target, `file://${Deno.cwd()}/`);

const input_dir = relativeToCwd(input);
const output_dir = relativeToCwd(output);

for (const file of await getFilesRecursively(input_dir)) {
  // Importar el archivo .tsx que contiene la página
  const inputModule = await import(file);
  const Page = inputModule.default;

  const html = renderToStaticMarkup(<Page randomProp="yay" />);

  // ./input/mydir/myfile.tsx
  // se convierte en
  // ./output/mydir/myfile.html
  const destination = file
    .replace(input_dir, output_dir)
    .replace(/.tsx$/, '.html');

  // Esto crea todas las carpetas necesarias
  // Además si la carpeta ya existe no lanza error :)
  await Deno.mkdir(dirname(destination), { recursive: true });

  // Escribir el HTML generado a disco
  await Deno.writeTextFile(destination, html);
}
```

A veces encontrás necesario borrar la carpeta de salida antes de empezar a escribir en ella... hice esto que no es hermoso pero hace el trabajo 🤷‍♀️

```ts
try {
  // Esta función tira un error incluso con `{ recursive: true }` lo cuál tiene sentido
  await Deno.remove(output, { recursive: true });
} catch {}
```

A partir de aquí puedes empezar a crear tu sitio con JS sabiendo que nada de JS se ejecutará en el navegador

```ts
// input/index.tsx
import React from 'https://esm.sh/react@18.2.0'

// CSS puesto en una variable porque las llaves { } confundirían al JSX de React
const styles = `
  .body { margin: 0 }
`

export default () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mi sitio web!</title>
      <style>{styles}</style>
    </head>
    <body>
      <p>Este es mi índice!<p>
    </body>
  </html>
)
```

```bash
deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-net=https://esm.sh \
  ./main.tsx \
  ./input ./output
```

Y generaría un archivo como este:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi sitio web!</title>
    <style>
      .body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <p>Este es mi índice!</p>
    <p></p>
  </body>
</html>
```

"Pero Matías, has dado tantas vueltas para tener una forma ligeramente más compleja de escribir HTML?"

Si, exacto, gracias por darte cuenta. Ahora tenemos componentes y podemos crear componentes como la mirda y ya que importamos los archivos con `import()` todas las dependencias serán manejadas apropiadamente por Deno! No solo eso, un entorno Javascript signifca que podemos hacer todo tipo de lógica como procesado de Markdown antes de generar la página pero eso es otra historia.

Otras cosas que aprendí sobre la marcha y me encantaría escribir al respecto:

- Import maps (con o sin barra? AMBOS! y con versión completa!)
  - `/deps/some-dependency.ts` porqué aún lo encuentro útil
  - El infierno del archivo `lock.json` de Deno (y porqué existe)

[1]: https://deno.land/
[2]: https://deno.land/#installation

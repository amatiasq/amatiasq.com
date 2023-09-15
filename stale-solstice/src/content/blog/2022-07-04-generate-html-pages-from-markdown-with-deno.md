---
published: 2022-07-04
title:
  en: Generate HTML pages from TSX with Deno
  es: Generar páginas HTML desde TSX con Deno
---

I've been working on a new version of this site with a clear idea:

- I want content to be Markdown
- I want it to be the fastest site ever (negotiable)
- Bilingual (N-lingual in fact)

And after some months of work I found myself taking the same unspoken assuption that I recently wrote for my friend @Shakira who helped me with this beautiful design 🙌

> I will animate the header somehow but with CSS only, no room for JS in the site of JS guy. That's the message 🤣

That's it.

The post can end here.

But I have more to write:

That means...

- plain HTML / CSS pages
- CSS / JS embeded directly into HTML
- only necessary CSS / JS is included

And... I need to try [Deno][1], it looks amazing, it sounds amazing and you know you'll find issues when you start using it but what may those be?

Here's the trip to generate HTML pages from TSX with Deno:

- You have [Deno][2] installed
- Create .tsx file
- import `React` from `https://esm.sh/react`
- import `{ renderToStaticMarkup }` from `https://esm.sh/react-dom/server`;
- this:

```ts
// Versions included for important reasons! 🥲
import React from 'https://esm.sh/react@18.2.0'
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// This is our only component
function MyComponent() {
  return <p>This is my page!<p>
}

// renderToStaticMarkup does the magic
const html = renderToStaticMarkup(<MyComponent />);

// send the resulting HTML to the program output
console.log(html);
```

"But Matias! want this to read from / written to the disk! not from the code itself!"

```tsx
// main.tsx
import React from 'https://esm.sh/react@18.2.0';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// we read arguments
const [input, output] = Deno.args;

// input/output may be relative to current working directory
const cwd = `file://${Deno.cwd()}/`;

const input_fullpath = new URL(input, cwd).pathname;
const output_fullpath = new URL(output, cwd).pathname;

// Import .tsx file containing the page
const inputModule = await import(input_fullpath);
const Page = inputModule.default;

const html = renderToStaticMarkup(<Page randomProp="yay" />);

// Write generated HTML to disk
await Deno.writeTextFile(output_fullpath, html);
```

```tsx
// MyPage.tsx
import React from 'https://esm.sh/react@18.2.0'

export default () => <p>This is my page!<p>
```

```bash
deno run \
  --allow-read=. \
  --allow-write=. \
  --allow-net=https://esm.sh \
  ./main.tsx \
  ./MyPage.tsx ./MyPage.html
```

Permissions explained:

- `--allow-read=.` Deno allows the script to read the folder I'm currenly at: `.`
- `--allow-write=.` same as above, it only needs input/output access each but `.` is enough most of the time
- `--allow-net=https://esm.sh` requires access to esm.sh to download dependencies: `react` and `react-dom`
- `./main.tsx` that's not a permission, that's the name of the file we created above!
- `./MyPage.tsx ./MyPage.html` those are the arguments to be passed to `input` and `ouput`, wheren't you paying attention!?

Ok but we can make this better, we don't want to pass file by file, we want to give it a folder and for it to generate another one with same structure, if only we had a...

```ts
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

I'm sure that's part of `esm.sh/std` somewhere...

Now let's update the `main.tsx` we created above:

```tsx
// main.tsx
import React from 'https://esm.sh/react@18.2.0';
import { renderToStaticMarkup } from 'https://esm.sh/react-dom@18.2.0/server';

// Import function to get the name of the directory of a file
import { dirname } from 'https://deno.land/std@0.143.0/path/mod.ts';

const [input, output] = Deno.args;

// quick helper function is there something in the deno.land/std like this?
const relativeToCwd = (target: string) =>
  new URL(target, `file://${Deno.cwd()}/`);

const input_dir = relativeToCwd(input);
const output_dir = relativeToCwd(output);

for (const file of await getFilesRecursively(input_dir)) {
  // Import .tsx file containing the page
  const inputModule = await import(file);
  const Page = inputModule.default;

  const html = renderToStaticMarkup(<Page randomProp="yay" />);

  // ./input/mydir/myfile.tsx becomes
  // ./output/mydir/myfile.html
  const destination = file
    .replace(input_dir, output_dir)
    .replace(/.tsx$/, '.html');

  // This creates all folders required
  // Also if the folder is already there it doesn't throw an exception :)
  await Deno.mkdir(dirname(destination), { recursive: true });

  // Write generated HTML to disk
  await Deno.writeTextFile(destination, html);
}
```

At times you may find it useful to remove the output directory before you start writing to it... I do this which is not beautiful but does the job 🤷‍♀️

```ts
try {
  // This fuction does throw an error even with `{ recursive: true }` which kind of makes sense
  await Deno.remove(output, { recursive: true });
  // deno-lint-ignore no-empty
} catch {}
```

From this you can start creating your site with JS knowing no JS will be executed in the browser.

```tsx
// input/index.tsx
import React from 'https://esm.sh/react@18.2.0'

// css set aside in a variable because { } would mess with React's JSX
const styles = `
  .body { margin: 0 }
`

export default () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My website!</title>
      <style>{styles}</style>
    </head>
    <body>
      <p>This is my index!<p>
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

And that would generate a file like this:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My website!</title>
    <style>
      .body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <p>This is my index!</p>
    <p></p>
  </body>
</html>
```

"But Matias, you went through all that husle to get a slightly more complex way of writing HTML?"

Yes, that's exactly it, thanks for noticing. Now we have components and can componentise the sht out of those pages and since we're actually importing the files through `import()` all dependencies would be properly managed by Deno! Not just that, a Javascript environment means we can do all sort of things like processing Markdown before the generation of the page, but that's another story.

Other things that I learned along the way and would love to write about:

- Import maps (with our without slash? BOTH! and with full versions!)
  - `/deps/some-dependency.ts` why I still found them useful
  - The hell of Deno's `lock.json` file (and why it exists)

[1]: https://deno.land/
[2]: https://deno.land/#installation

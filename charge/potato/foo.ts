import { js } from './lib/esm.ts';

try {
  const { files } = await Deno.emit('./example/page.tsx', {
    bundle: 'module',
  });

  for (const [fileName, text] of Object.entries(files)) {
    console.log(`emitted ${fileName} with a length of ${text.length}`);
  }

  const content = files['deno:///bundle.js'];
  const module = await js`${content}`;
  console.log(module.default());
} catch (e) {
  // something went wrong, inspect `e` to determine
}

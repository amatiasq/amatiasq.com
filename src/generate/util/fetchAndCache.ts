import { basename } from 'https://deno.land/std@0.149.0/path/win32.ts';
import { cacheDir } from '../config.ts';

const [canReadCache, canWriteCache] = await Promise.all([
  Deno.permissions.request({
    name: 'read',
    path: cacheDir.toString(),
  }),
  Deno.permissions.request({
    name: 'write',
    path: cacheDir.toString(),
  }),
]);

if (canWriteCache.state === 'granted') {
  await Deno.mkdir(cacheDir.toString(), { recursive: true });
}

export function fetchAndCache(files: string[]) {
  return Promise.all(
    files.map((x) => {
      const cache = cacheDir.resolve(basename(x)).toString();
      const request = fetch(x).then((response) => response.text());

      if (canReadCache.state === 'granted') {
        request.catch((error) =>
          Deno.readTextFile(cache).catch(() => {
            throw error;
          })
        );
      }

      if (canWriteCache.state === 'granted') {
        request.then((content) => {
          Deno.writeTextFile(cache, content)
            .catch((reason) =>
              console.error(`Can't save ${cache}:\n\t${reason}`)
            )
            .then(() => console.log(`Cached ${cache}`));
        });
      }

      return request;
    })
  );
}

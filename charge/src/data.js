import { resolve } from 'path';
import { readFileSync } from 'fs';

export default function load(dataPath) {
  const path = resolve('./data/', dataPath);
  console.log({ path });
  return readFileSync(path).toString('utf-8');
}

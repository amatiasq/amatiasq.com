import { readFile } from 'fs/promises';

const pkg = new URL('../../package.json', import.meta.url).pathname;

export const { basePath } = JSON.parse(await readFile(pkg, 'utf8'));

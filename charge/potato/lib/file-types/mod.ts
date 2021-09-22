import { WorkdirFile } from '../Workdir.ts';

export async function js(file: WorkdirFile) {
  return import(file.path);
}

import { Workdir, WorkdirFile } from '../Workdir.ts';

export async function js(file: WorkdirFile, disk: Workdir) {
  const mod = await disk.import(file);
  return mod.default();
}

// export async function (file: WorkdirFile, disk: Workdir) {
// }

export { js as ts, js as jsx, js as tsx };

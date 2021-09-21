import { Logger } from './Logger.ts';
import { Options } from './Options.ts';
import { Workdir, WorkdirFile } from './Workdir.ts';

const processors: Record<string, (content: string, file: WorkdirFile) => Promise<string>> = {
  js(content: string, file: WorkdirFile) {
    return Promise.resolve('potato');
  },
};

export const build = (log: Logger, options: Options = {}) => async (disk: Workdir) => {
  await Promise.all(disk.list().map(buildFile));

  log.info('🟢 Done');

  async function buildFile(file: WorkdirFile) {
    console.log({ POLLA: file.ext });
    const processor = processors[file.ext];
    const content = await disk.read(file);
    const result = processor ? await processor(content, file) : content;
    await disk.write(file.path, result);
  }
};

import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom'

import * as processors from './file-types/mod.ts';
import { Logger } from './Logger.ts';
import { Options } from './Options.ts';
import { Workdir, WorkdirFile } from './Workdir.ts';

type Processor = (file: WorkdirFile, disk: Workdir) => Promise<string>;
type AvailableProcessors = Record<string, Processor | null>;

export const build = (log: Logger, options: Options = {}) => async (disk: Workdir) => {
  await Promise.all(disk.list().map(buildFile));

  log.info('🟢 Done');

  async function buildFile(file: WorkdirFile) {
    const process = (processors as AvailableProcessors)[file.ext];
    const path = process ? file.removeExtension() : file.path;
    const content = await (process ? process(file, disk) : disk.read(file));

    if (React.isValidElement(content)) console.log(`CONTENT IS FUNCTION`);

    await disk.write(path, content);
  }
};

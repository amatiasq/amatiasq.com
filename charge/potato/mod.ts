import { parse } from 'https://deno.land/std/flags/mod.ts';

import { build } from './lib/build.ts';
import { Logger } from './lib/Logger.ts';
import { Options } from './lib/Options.ts';
import { Workdir } from './lib/Workdir.ts';

const {
  _: [command, source, target],
  ...options
} = parse(Deno.args) as Options & { _: string[] };

switch (command) {
  case 'build':
    await buildCommand();
    break;
  case 'serve':
    serve(source, options);
    break;
  default:
    help();
}

function buildCommand() {
  const logger = new Logger(['🛠']);
  const disk = new Workdir(source, target);
  return build(logger, options)(disk);
}

function serve(source: string, options: Options) {
  console.log('serve', source, options);
}

function help() {
  console.log(`
  Usage
    ❯ charge serve <source directory>
    ❯ charge build <source directory> <target directory>
  `);
}

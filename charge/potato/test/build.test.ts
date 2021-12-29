import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { build } from '../lib/build.ts';
import { Logger, LogLevel } from '../lib/Logger.ts';
import { MockedFs, MockedWorkdir } from './WorkdirMock.ts';

test('Build should copy unknown files', { foo: 'bar' });
test('Build should copy html files', { 'index.html': 'bar' });
test('Build should execute .js files', { 'index.html.js': 'export default () => "bar"' }, { 'index.html': 'bar' });
test(
  'Build should execute .ts files',
  { 'index.html.ts': 'export default (x?: any) => "bar"' },
  { 'index.html': 'bar' },
);
test(
  'Build should execute .tsx files',
  { 'index.html.tsx': 'import React from "https://esm.sh/react"; export default (x?: any) => <>bar</>' },
  { 'index.html': 'bar' },
);

function test(name: string, input: MockedFs, output: MockedFs = input) {
  Deno.test(name, async () => {
    const log = new Logger([], LogLevel.NONE);
    const disk = new MockedWorkdir(input);

    await build(log)(disk);

    assertEquals(disk.output, output);
  });
}

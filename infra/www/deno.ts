export const json = (url: string, options: RequestInit) =>
  fetch(url, options).then((x) => x.json());

export function log(...args: unknown[]) {
  console.log(
    `[${new Date().toISOString().replace(/T/, ' ').replace(/Z$/, '')}]`,
    ...args
  );
}

// Run subprocesses

export const $ = Object.assign(run('.'),{
  cwd: run,
});

async function run(cwd: string, ...command: (string | number)[]) {
  const cmd = command.join(' ');
  const [bin, ...args] = cmd.split(/\s+/g);
  const c = new Deno.Command(bin, { args });
  const { code, stdout, stderr } = await c.output();
  return {
    code,
    stdout: new TextDecoder().decode(stdout)
  };
}

export const json = (url: string, options: RequestInit) =>
  fetch(url, options).then(x => x.json())

export async function $(...command: (string | number)[]) {
  command = command.join(' ');
  const [bin, ...args] = command.split(/\s+/g);
  const c = new Deno.Command(bin, { args });
  const { code, stdout, stderr } = await c.output();
  return new TextDecoder().decode(stdout);
}

export function log(...args: unknown[]) {
  console.log(
    `[${new Date().toISOString().replace(/T/, ' ').replace(/Z$/, '')}]`,
    ...args
  );
}



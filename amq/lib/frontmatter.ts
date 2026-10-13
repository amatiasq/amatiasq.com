/**
 * The body of `amq amatiasq.com check`'s frontmatter step — its help lives in
 * the command, this is only the part too long to be a wrapper. Every entry
 * under `content/` is validated against its collection's schema
 * (`src/content.schemas.ts`, the same one the build uses) and, on a terminal,
 * each offender comes with an offer to have the LLM write what is missing.
 *
 * Without a terminal it lists and fails, which is what CI and any unattended
 * caller get: a question nobody can answer is a hang.
 */

import { parseFrontmatter } from '@astrojs/markdown-remark';
import { z } from 'astro/zod';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { schemas, type Collection } from '../../src/content.schemas';

const CONTENT = join(import.meta.dir, '..', '..', 'content');

// El mismo modelo que jarvis: su `TEXT_MODEL`, que por defecto es gpt-4o
// (`jarvis/src/connectors/openai/api.ts`). Allí sale por OpenRouter porque la
// misma cuenta paga voz e imagen; aquí sólo hay texto y la clave que hay en
// `amq/.env` es de OpenAI, así que la llamada va directa a su API.
const MODEL = process.env.TEXT_MODEL ?? 'gpt-4o';
const API_URL =
  process.env.TEXT_API_URL ?? 'https://api.openai.com/v1/chat/completions';

/** El cuerpo entero cabe de sobra; el tope es para no pagar un post kilométrico. */
const MAX_BODY = 12000;

const FENCE = /^```[a-z]*\n([\s\S]*?)\n```\s*$/;

type Entry = {
  collection: Collection;
  id: string;
  path: string;
  raw: string;
};

function entries(): Entry[] {
  const collections = Object.keys(schemas) as Collection[];

  return collections.flatMap((collection) => {
    const dir = join(CONTENT, collection);

    if (!existsSync(dir)) {
      return [];
    }

    return readdirSync(dir)
      .filter((x) => x.endsWith('.md'))
      .sort()
      .map((id) => {
        const path = join(dir, id);
        return { collection, id, path, raw: readFileSync(path, 'utf-8') };
      });
  });
}

function frontmatterOf(raw: string) {
  return parseFrontmatter(raw).frontmatter as Record<string, unknown>;
}

/**
 * What is wrong with one entry, in one line each; empty means the build will
 * take it. An unreadable YAML is a single complaint: zod never sees it.
 */
function problems(entry: Entry): string[] {
  let data: Record<string, unknown>;

  try {
    data = frontmatterOf(entry.raw);
  } catch (error) {
    const message = (error as Error).message.split('\n')[0];
    return [`el YAML no se puede leer: ${message}`];
  }

  const result = schemas[entry.collection].safeParse(data);

  if (result.success) {
    return [];
  }

  return result.error.issues.map((issue) => {
    const path = issue.path.join('.') || '(raíz)';
    // A union — every translatable field is one — only ever says "Invalid
    // input", which for an absent field is the least useful thing it could say.
    const absent =
      issue.path.length === 1 && data[String(issue.path[0])] === undefined;
    return absent ? `${path}: falta` : `${path}: ${issue.message}`;
  });
}

const indent = (text: string) =>
  text
    .trimEnd()
    .split('\n')
    .map((x) => `    ${x}`)
    .join('\n');

/** The raw frontmatter block of a file, `---` markers stripped. */
function frontmatterText(raw: string): string {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return match ? match[1]! : '';
}

/**
 * Three entries of the same collection to copy the shape from. The schema says
 * `{en, es}` is legal; only the corpus says a tag that is a brand name stays a
 * bare string. Newest first, because that is the shape in use.
 */
function examples(collection: Collection, exclude: string): string[] {
  return entries()
    .filter((x) => x.collection === collection && x.id !== exclude)
    .filter((x) => problems(x).length === 0)
    .reverse()
    .slice(0, 3)
    .map((x) => `# ${x.id}\n${frontmatterText(x.raw)}`);
}

function schemaOf(collection: Collection): string {
  const json = z.toJSONSchema(schemas[collection], {
    io: 'input',
    unrepresentable: 'any',
  });
  return JSON.stringify(json, null, 2);
}

const SYSTEM = `Escribes el frontmatter YAML de una entrada de amatiasq.com, un sitio bilingüe inglés/español.

- Contestas sólo el YAML: sin las rayas \`---\`, sin bloque de código y sin una palabra de explicación.
- \`title\` lleva \`en\` y \`es\`, y es lo único obligatorio. Sale del texto, no del nombre del fichero: ése es un slug y a menudo no dice de qué va.
- \`tags\` sólo si salen claros del texto. Cada etiqueta es un string cuando no se traduce (\`JavaScript\`) o un \`{en, es}\` cuando sí.
- Ni \`draft\` ni \`published\`: la fecha sale del nombre del fichero y quien despliega quiere publicar.
- Ningún campo que el esquema no pida y el texto no sostenga.

El cuerpo viene partido por \`---\` en un bloque por idioma, inglés primero. Si sólo hay un bloque el post está escrito en un idioma, y aun así lleva los dos títulos.`;

function userPrompt(entry: Entry, body: string): string {
  const current = frontmatterText(entry.raw).trim();

  return [
    `Esquema de la colección \`${entry.collection}\` (JSON Schema):`,
    schemaOf(entry.collection),
    '',
    'Frontmatter de las entradas que ya existen, para copiarles el formato:',
    examples(entry.collection, entry.id).join('\n\n'),
    '',
    `Frontmatter actual: ${current || '(vacío)'}`,
    '',
    'Cuerpo:',
    body.slice(0, MAX_BODY),
  ].join('\n');
}

async function askModel(messages: { role: string; content: string }[]) {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    throw new Error(
      'falta OPENAI_API_KEY: va en mono/amq/.env, y su valor en el item 3x4467dhuecigodpxr46gufbsi de 1Password'
    );
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  // A bare `fetch` is happy with a 401 and the caller reads `undefined` off the
  // body, which is how a wrong key turns into "el modelo no contestó nada".
  if (!response.ok) {
    throw new Error(
      `${MODEL} contestó ${response.status}: ${(await response.text()).slice(0, 300)}`
    );
  }

  const json = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = json.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error(`${MODEL} no contestó nada`);
  }

  const fenced = content.match(FENCE);
  return fenced ? fenced[1]! : content;
}

/** The file with its frontmatter block replaced, body untouched. */
function withFrontmatter(raw: string, yaml: string): string {
  const body = parseFrontmatter(raw).content.replace(/^\r?\n+/, '');
  return `---\n${yaml.trim()}\n---\n\n${body}`;
}

/**
 * Asks the model, and asks again with the complaints when what came back does
 * not validate either. Two tries: a third costs the same and fails the same.
 */
async function fill(entry: Entry): Promise<string> {
  const body = parseFrontmatter(entry.raw).content;
  const messages = [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userPrompt(entry, body) },
  ];

  for (let attempt = 0; attempt < 2; attempt++) {
    const yaml = await askModel(messages);
    const candidate = { ...entry, raw: withFrontmatter(entry.raw, yaml) };
    const wrong = problems(candidate);

    if (!wrong.length) {
      return candidate.raw;
    }

    messages.push({ role: 'assistant', content: yaml });
    messages.push({
      role: 'user',
      content: `Eso no valida:\n${wrong.map((x) => `- ${x}`).join('\n')}\nEscribe el YAML otra vez, entero.`,
    });
  }

  throw new Error('lo que escribió el modelo tampoco valida');
}

async function ask(question: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${question} [s/N] `);
  rl.close();
  return /^(s|si|sí|y|yes)$/i.test(answer.trim());
}

async function main() {
  const all = entries();
  const broken = all
    .map((entry) => ({ entry, wrong: problems(entry) }))
    .filter((x) => x.wrong.length > 0);

  if (!broken.length) {
    console.log(`    ${all.length} entradas, ninguna con el frontmatter roto`);
    return 0;
  }

  // stdin decides: the question is the only thing here that needs a person.
  const interactive = Boolean(process.stdin.isTTY);
  let pending = 0;

  for (const { entry, wrong } of broken) {
    console.log(`\n  content/${entry.collection}/${entry.id}`);
    wrong.forEach((x) => console.log(`    ${x}`));

    if (!interactive) {
      pending++;
      continue;
    }

    if (!(await ask(`  ¿Se lo pido a ${MODEL}?`))) {
      pending++;
      continue;
    }

    try {
      const filled = await fill(entry);
      writeFileSync(entry.path, filled);
      console.log(indent(frontmatterText(filled)));
      console.log(
        '    escrito. Sin `draft: true`: quien despliega publica; para no publicarlo todavía, a mano.'
      );
    } catch (error) {
      console.log(`    no se pudo: ${(error as Error).message}`);
      pending++;
    }
  }

  if (pending) {
    console.log(
      `\n  ${pending} sin arreglar${interactive ? '' : '; sin terminal no se pregunta, córrelo a mano'}`
    );
    return 1;
  }

  return 0;
}

process.exit(await main());

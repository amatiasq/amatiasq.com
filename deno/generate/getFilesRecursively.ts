export async function getFilesRecursively(currentPath: string) {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${currentPath}/${dirEntry.name}`;
    names.push(entryPath);

    if (dirEntry.isDirectory) {
      names.push(...(await getFilesRecursively(entryPath)));
    }
  }

  return names;
}

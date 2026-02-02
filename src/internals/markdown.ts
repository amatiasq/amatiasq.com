/**
 * Extracts markdown references (links and images) from markdown content.
 * References are typically at the bottom of markdown files in the format:
 * [ref]: url "title"
 */
export function getMarkdownReferences(content: string): string {
  const referenceRegex = /^\s*\[([^\]]+)\]:\s*(.+)$/gm;
  const matches = content.match(referenceRegex);
  return matches ? matches.join('\n') : '';
}

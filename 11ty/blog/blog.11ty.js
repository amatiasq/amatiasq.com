const { readdir, readFile } = require('fs/promises');

module.exports = async () => {
  const files = await readdir(__dirname__);

  const posts = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(`${__dirname__}/${file}`, 'utf-8');

      return {
        content,
        slug: file.replace('.md', ''),
      };
    })
  );

  return `
    <ul>
        ${posts
      .map(
        (post) => `
                <li>
                    <a href="/blog/${post.slug}">${post.slug}</a>
                </li>
            `
      )
      .join('')}
    </ul>
  `;
};

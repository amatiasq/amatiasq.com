const markdownItContainer = require('markdown-it-container');

module.exports = (_, { markdown }) => {
  const containers = {
    header: ['<header class="block"><div class="container">', '</div></header>'],
    section: ['<section><div class="container">', '</div></section>'],
  };

  markdown.use(markdownItContainer, 'container');

  for (const [name, [open, close]] of Object.entries(containers)) {
    markdown.use(markdownItContainer, name, { render: (tokens, idx) => (tokens[idx].nesting === 1 ? open : close) });
  }
};

const shortDate = {
  // year: '2-digit',
  day: '2-digit',
  month: 'short',
};

const locales = {
  en: 'en-EN',
  es: 'es-ES',
};

module.exports = function setShortcodes(eleventyConfig, { lang }) {
  const shortcodes = {
    shortdate: date => `<time>${date.toLocaleDateString(locales[lang], shortDate)}</time>`,
    year: date => (date ? `<time>${date.getFullYear()}</time>` : ''),
  };

  for (const [name, shortcode] of Object.entries(shortcodes)) {
    eleventyConfig.addShortcode(name, shortcode);
  }
};

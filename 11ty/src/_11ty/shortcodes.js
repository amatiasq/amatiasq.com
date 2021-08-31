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
  eleventyConfig.addShortcode('shortdate', date => `<time>${date.toLocaleDateString(locales[lang], shortDate)}</time>`);
};

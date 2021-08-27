const shortDate = {
  // year: '2-digit',
  day: '2-digit',
  month: 'short',
};

const locales = {
  en: 'en-EN',
  es: 'es-ES',
};

exports.handler = lang => date => `<time>${date.toLocaleDateString(locales[lang], shortDate)}</time>`;

import React from 'react';

export type Language = 'en' | 'es';

export type TranslatableString = string | Record<Language, string>;

type TranslatableKeys = Record<Language, string>;
type TranslatableValue = { value: TranslatableString };

export type TranslatableProps = (TranslatableKeys | TranslatableValue) & {
  render?: (value: string) => JSX.Element;
};

// const css = /*css*/ `
//   .display-en [lang='es'] {
//     display: none;
//   }

//   .display-es [lang='en'] {
//     display: none;
//   }
// `;

// const js = /*js*/ `
//   $('[data-toggle-lang]').addEventListener('click', () => {
//     const cl = document.body.classList

//     if (cl.contains('display-en')) {
//       cl.remove('display-en');
//       cl.add('display-es');
//     } else {
//       cl.remove('display-es');
//       cl.add('display-en');
//     }
//   });
// `;

export function getKeyFrom(value: TranslatableString) {
  return typeof value === 'string' ? value : value.en;
}

export function Translatable(props: TranslatableProps) {
  if (!hasValue(props) && !('en' in props) && !('es' in props)) {
    throw new Error(`Value is required you motherfucker: ${JSON.stringify(props)}`);
  }

  const value = hasValue(props) ? props.value : { en: props.en, es: props.es };
  const { render } = props;
  const renderSomething = render || (x => <span>{x}</span>);

  if (typeof value === 'string') {
    return render ? render(value) : <>{value}</>;
  }

  const items = Object.entries(value).map(([lang, text]) => create(text, lang as Language));
  return <>{items}</>;

  function create(text: string, lang: Language): JSX.Element {
    const element = renderSomething(text);
    const key = element.key ? `${element.key}-${lang}` : lang;
    return { ...element, props: { ...element.props, lang }, key };
  }
}

function hasValue(props: TranslatableProps): props is TranslatableValue {
  return 'value' in props;
}

export type Language = 'en' | 'es';
type TranslatableString = string | Record<Language, string>;

export type TranslateProps = { lang: Language } & (Record<Language, string> | { value: TranslatableString });

export default function Translate(props: TranslateProps) {
  const { lang } = props;
  const value = 'value' in props ? props.value : props;
  const text = typeof value === 'string' ? value : value[lang];
  return text || 'SOMETHING WENT WRONG HERE';
}

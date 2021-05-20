import { TranslatableString } from '../atoms/Translatable';

export interface Article {
  key: string;
  title: string;
  content: TranslatableString;
}

// export function Article({ key, category, children }: PropsWithChildren<Article>) {
//   return (
//     <>
//       <h1>{category}</h1>
//       <article>{children}</article>
//     </>
//   );
// }

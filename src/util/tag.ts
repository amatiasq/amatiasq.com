import { translate, type Translatable } from '@/i18n';

/**
 * The URL slug of a tag. The English form is the tag's identity, so a
 * translated tag lands on the same page. `#`, `%` and `?` are dropped: they
 * cannot survive a path segment, so `C#` and `Lighthouse 100%` had no
 * reachable page anyway.
 */
export function tagToKey(tag: Translatable): string {
  return translate(tag, 'en')
    .toLowerCase()
    .replace(/[#%?]/g, '')
    .trim();
}

import { translate, type Translatable } from '@/i18n';

/**
 * The URL slug of a tag. The English form is the tag's identity, so a tag
 * translated to Spanish still lands on the same page.
 *
 * `#`, `%` and `?` are dropped: they cannot survive a path segment (`#` starts
 * a fragment, a lone `%` is invalid percent-encoding) so `C#` and
 * `Lighthouse 100%` had no reachable page.
 */
export function tagToKey(tag: Translatable): string {
  return translate(tag, 'en')
    .toLowerCase()
    .replace(/[#%?]/g, '')
    .trim();
}

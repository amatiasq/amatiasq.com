import {
    getCollection,
    getEntries,
    type CollectionEntry,
    type ContentEntryMap,
    type DataEntryMap
} from 'astro:content';

function isSufixed(slug: string) {
    return slug.endsWith('-en') || slug.endsWith('-es');
}

function getSufixes(slug: string) {
    return [ `${slug}-en`, `${slug}-es` ] as const;
}

function merge<C extends keyof AnyEntryMap>(
    entry: CollectionEntry<C>,
    ...[en, es]: (CollectionEntry<C> | null | undefined)[]
) {
    return Object.assign({}, entry, {
        en: en ?? entry,
        es: es ?? entry,
        key: entry.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '')
    });
}

type AnyEntryMap = ContentEntryMap & DataEntryMap;
type AllValuesOf<T> = T extends any ? T[keyof T] : never;
type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<ContentEntryMap[C]>['slug'];

export function entryUrl<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(collection: C, entry: E) {
    return `/${collection}/${entry.slug.replace(/^\d{4}-\d{2}-\d{2}-/, '')}`;
}

export function readEntryBySlug<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C>,
>(
    collection: C,
    entrySlug: E
): E extends ValidContentEntrySlug<C>
    ? Promise<CollectionEntry<C>>
    : Promise<CollectionEntry<C> | undefined> {
    return readEntry(collection, entrySlug);
}

// export function readDataEntryById<
//     C extends keyof DataEntryMap,
//     E extends keyof DataEntryMap[C]
// >(
//     collection: C,
//     entryId: E
// ): E extends keyof DataEntryMap[C]
//     ? Promise<DataEntryMap[C][E]>
//     : Promise<CollectionEntry<C> | undefined>{
//     return readEntry(collection, entryId);
// }

export function readCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => entry is E
): Promise<E[]>;
export async function readCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => unknown
): Promise<CollectionEntry<C>[]> {
    const entries = await getCollection(collection, filter);
    const result = [] as CollectionEntry<C>[];

    for (const entry of entries) {
        if (isSufixed(entry.slug)) continue;
        const sufixes = getSufixes(entry.slug);
        const langs = sufixes.map(slug => entries.find(x => x.slug === slug))
        result.push(merge(entry, ...langs));
    }

    return result;
}

export async function readEntry<
    C extends keyof ContentEntryMap,
    E extends ValidContentEntrySlug<C>,
>(collection: C, slug: E) {
    const [entry, ...langs] = await getEntries([
        { collection, slug },
        ...getSufixes(slug).map(x => ({ collection, slug: x as E }))
    ]);

    if (!entry)
        throw new Error(`Entry ${slug} not found in collection ${collection}`);

    return merge(entry, ...langs);
}

export async function readDataEntry<
    C extends keyof DataEntryMap,
    E extends keyof DataEntryMap[C],
>(collection: C, id: E) {
    if (typeof id != 'string')
        throw new Error(`No id provided for collection ${collection}`);

    const [entry, ...langs] = await getEntries([
        { collection, id },
        ...getSufixes(id).map(x => ({ collection, id: x as E }))
    ]);

    if (!entry)
        throw new Error(`Entry ${id} not found in collection ${collection}`);

    return merge(entry, ...langs);
}


/** Resolve an array of entry references from the same collection */
export async function readEntries<C extends keyof ContentEntryMap>(
    entries: { collection: C; slug: ValidContentEntrySlug<C>; }[]
) {
    const found = await getEntries(entries);
    const result = [] as CollectionEntry<C>[];

    for (const entry of found) {
        if  (isSufixed(entry.slug)) continue;
        const sufixes = getSufixes(entry.slug);
        const langs = sufixes.map(slug => found.find(x => x.slug === slug))
        result.push(merge(entry, ...langs));
    }

    return result;
}

// export async function readDataEntries<C extends keyof DataEntryMap>(
//     entries: { collection: C; id: keyof DataEntryMap[C]; }[]
// ) {
//     const found = await getEntries(entries);
//     const result = [] as CollectionEntry<C>[];

//     for (const entry of found) {
//         if  (isSufixed(entry.id)) continue;
//         const sufixes = getSufixes(entry.id);
//         const langs = sufixes.map(id => found.find(x => x.id === id))
//         result.push(merge(entry, ...langs));
//     }

//     return result;
// }

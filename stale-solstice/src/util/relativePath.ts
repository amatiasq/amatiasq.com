export function relativePath(from: URL, to: URL | string) {
    const toUrl = typeof to === 'string' ? new URL(to, from) : to;

    // 1. Decompose the URLs
    const fromParts = getPath(from.pathname)
    const toParts = getPath(toUrl.pathname);

    // 2. Find common base
    let commonLength = 0;
    for (let i = 0; i < fromParts.length && i < toParts.length; i++) {
        if (fromParts[i] !== toParts[i]) {
            break;
        }
        commonLength++;
    }

    // 3. Calculate relative path to common base
    const relativePathToBase = [];
    for (let i = commonLength; i < fromParts.length - 1; i++) {
        relativePathToBase.push('..');
    }

    // 4. Calculate path from common base to destination URL
    const pathFromBaseToDestination = toParts.slice(commonLength);

    // 5. Combine paths
    return [
        ...relativePathToBase,
        ...pathFromBaseToDestination
    ].join('/');
}

// // Example:
// const fromURL = 'https://example.com/a/b/c/d.html';
// const toURL = 'https://example.com/a/b/x/y.html';
// console.log(getRelativePath(fromURL, toURL));  // ../../x/y.html

function getPath(path: string) {
    const slashed = path.endsWith('/') ? path : `${path}/`;
    return slashed.split('/');
}

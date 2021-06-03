// const $ = selector => document.querySelector(selector);
// const $$ = selector => Array.from(document.querySelectorAll(selector));

export function runtimeOnly(handler: ($: typeof dollar) => any) {
  if (typeof document !== 'undefined') {
    handler(dollar);
  }
}

function dollar<T = any>(selector: string, operator: (x: HTMLElement) => T) {
  return Array.from(document.querySelectorAll(selector)).map(operator);
}

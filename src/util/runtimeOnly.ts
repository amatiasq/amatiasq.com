// const $ = selector => document.querySelector(selector);
// const $$ = selector => Array.from(document.querySelectorAll(selector));

function params<T = any>(selector: string, operator: (x: HTMLElement) => T) {
  return Array.from(document.querySelectorAll(selector)).map(operator);
}

export function runtimeOnly(handler: (arg: typeof params) => any) {
  if (typeof document !== 'undefined') {
    handler(params);
  }
}

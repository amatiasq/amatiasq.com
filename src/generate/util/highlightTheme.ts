export function highlightTheme() {
  return `
    .shj-inline{margin:0;padding:2px 5px;display:inline-block;border-radius:5px}
    [class*=shj-lang-]::selection,
    [class*=shj-lang-] ::selection{background:#bdf5}
    [class*=shj-lang-]>div{display:flex;overflow:auto}
    [class*=shj-lang-]>div :last-child{flex:1;outline:none}
    .shj-syn-cmnt{font-style:italic}
    .shj-syn-err,
    .shj-syn-kwd{color:#e16}
    .shj-syn-num,
    .shj-syn-class{color:#f60}
    .shj-numbers,
    .shj-syn-cmnt{color:#999}
    .shj-syn-insert,
    .shj-syn-str{color:#7d8}
    .shj-syn-bool{color:#3bf}
    .shj-syn-type,
    .shj-syn-oper{color:#5af}
    .shj-syn-section,
    .shj-syn-func{color:#84f}
    .shj-syn-deleted,
    .shj-syn-var{color:#f44}
    .shj-oneline{padding:12px 10px}
    .shj-lang-http.shj-oneline .shj-syn-kwd{background:#25f;color:#fff;padding:5px 7px;border-radius:5px}
    .shj-multiline.shj-mode-header{padding:20px}
    .shj-multiline.shj-mode-header:before{content:attr(data-lang);color:#58f;display:block;padding:10px 20px;background:#58f3;border-radius:5px;margin-bottom:20px}
    [class*=shj-lang-]:before{color:#6f9aff}
    .shj-syn-deleted,
    .shj-syn-err,
    .shj-syn-var{color:#e06c75}
    .shj-syn-section,
    .shj-syn-oper,
    .shj-syn-kwd{color:#c678dd}
    .shj-syn-class{color:#e5c07b}
    .shj-numbers,
    .shj-syn-cmnt{color:#76839a}
    .shj-syn-insert{color:#98c379}
    .shj-syn-type{color:#56b6c2}
    .shj-syn-num,
    .shj-syn-bool{color:#d19a66}
    .shj-syn-str,
    .shj-syn-func{color:#61afef}
  `;
}

/*
.shj-numbers{padding-left:5px;counter-reset:line}
.shj-numbers div{padding-right:5px}
.shj-numbers div:before{color:#999;display:block;content:counter(line);opacity:.5;text-align:right;margin-right:5px;counter-increment:line}
*/

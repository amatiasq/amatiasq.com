---
title: A. Matías Quezada
layout: layouts/base.njk
---

# {{ title }}

## Blog

{{#each collections.post }}
- {{{ shortdate data.date }}} [{{data.title}}]({{this.url}})
{{/each}}

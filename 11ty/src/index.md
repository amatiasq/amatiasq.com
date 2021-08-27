---
title: A. Matías Quezada
---

<amq-nav />

<amq-header>

</amq-header>


<section class="container">

  # {{ title }}

  ## Blog

  {{#each collections.post }}
  - {{{ shortdate data.date }}} [{{data.title}}]({{this.url}})
  {{/each}}

</section>

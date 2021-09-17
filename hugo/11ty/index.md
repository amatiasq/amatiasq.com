---
title: A. Matías Quezada
layout: base
---

::: header
# {{ title }}

I'm a software engineer. I'm fucking god so you better adore me. ADORE ME!
:::


::: section
## Latest blog posts

{% for post in collections.posts | limit(5) %}
- {% shortdate post.data.date %} [{{post.data.title}}]({{post.url}})
{% endfor %}
:::


::: section
## Latest projects

{% for project in collections.projects | limit(5) %}
- {% year project.data.date %} [{{project.data.name | tr }}]({{project.url}})
{% endfor %}
:::
---
title: A. Matías Quezada
layout: base
---

<header>

# {{ title }}

I'm a software engineer. I'm fucking god so you better adore me. ADORE ME!
</header>

## Blog

{% for post in collections.posts | limit(5) %}
- {% shortdate post.data.date %} [{{post.data.title}}]({{post.url}})
{% endfor %}

## Projects

{% for project in collections.projects | limit(5) %}
- [{{project.data.name | tr }}]({{project.url}})
{% endfor %}

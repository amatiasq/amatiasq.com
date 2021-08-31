---
title: A. Matías Quezada
layout: layouts/base.njk
---

# {{ title }}

## Blog

{% for post in collections.post | reverse %}
- {% shortdate post.data.date %} [{{post.data.title}}]({{post.url}})
{% endfor %}

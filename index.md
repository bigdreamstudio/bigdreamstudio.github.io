---
layout: default
title: 谱梦工作室的博客
tagline:
---
{% include JB/setup %}

##47 Blog Posts:
<ul class="posts">
  {% for post in site.posts limit 25 %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
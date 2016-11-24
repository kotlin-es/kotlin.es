---
layout: page
title: Artículos
permalink: /articles/
---

<div class="home">
  {% assign myposts = site.posts | where_exp:"post","post.category == 'articulos'" %}
  {% include posts.html posts=myposts %}
</div>

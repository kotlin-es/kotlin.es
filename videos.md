---
layout: page
title: Vídeos
permalink: /videos/
---

<div class="home">
  {% assign myposts = site.posts | where_exp:"post","post.category == 'videos'" %}
  {% include posts.html posts=myposts %}
</div>

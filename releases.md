---
layout: page
title: Releases
permalink: /releases/
---

<div class="home">
  {% assign myposts = site.posts | where_exp:"post","post.category == 'releases'" %}
  {% include posts.html posts=myposts %}
</div>

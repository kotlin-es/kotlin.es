---
layout: post
title:  "Delegados en kotlin"
category: articulos
tags: iterando
author: soywiz
edit: /_posts/articles/2016-02-29-delegados.markdown
permalink: /2016/02/2016-02-29-delegados/
---

Kotlin soporta la creación de delegados.
Habilitando el patrón de diseño [Delegation](https://es.wikipedia.org/wiki/Delegation_(patr%C3%B3n_de_dise%C3%B1o))

Soporta delegación de clases y de métodos.

## Delegación de clases:

La delegación de clases es similar a los mixins, pero más sencilla.

Cuando implementamos una interfaz, necesitamos declarar todos los métodos
de la interfaz en nuestra clase.
Una delegación manual pasaría por implementar la interfaz y llamar a los métodos
de la instance sobre la que queremos delegar.

{% highlight kotlin %}
interface I {
  fun a():Int
  fun b(c:String):Unit
}

class Test : I {
  fun c()
}
{% endhighlight %}

La delegación de clases permite evitar hacer llamadas manuales al delegado
y así poder tener algo parecido a herencia múltiple, pero sin sus problemas.

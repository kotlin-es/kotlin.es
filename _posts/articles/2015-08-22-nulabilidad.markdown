---
layout: post
title:  "Nulabilidad en #kotlin y #java"
date:   2015-08-22 00:00:00 +0100
category: articles
categories: nulabilidad
tags: nulabilidad
author: soywiz
permalink: "/2015/08/nulabilidad-en-kotlin-y-en-java/"
---

Hoy vamos a hablar sobre la nulabilidad en Kotlin.

* TOC
{:toc}

# Un poco de historia:
Como sabemos, tradicionalmente en los lenguajes de programación los tipos de valor no son nullables, mientras que los tipos de referencia sí lo son. Los tipos por referencia, generalmente objetos, tienen su contenido en una zona de memoria y cuando tenemos ese objeto en la pila o lo pasamos a otra función, con lo que estamos trabajando es con una referencia, con un puntero.

Al final un puntero acaba siendo un número que hace referencia a una posición en la memoria.

Y la referencia nula (o puntero a la posición 0) originalmente no tenía ningún significado en especial. Al principio se aprovechaba toda la memoria que era poco y no había memoria virtual ni traducciones de direcciones ni nada de eso.

![Violación de acceso](/images/access-violation.jpg "Violación de acceso")

Al final generalmente cuando algo había ido mal, acabábamos con punteros que hacían referencia a posiciones inválidas o que no queríamos, que muchas veces eran valores bajos que hacían referencia a partes bajas de la memoria. Por ejemplo si hacíamos un “malloc” que fallaba, esto devolvía NULL, un puntero a la posición 0, y si luego accedíamos en un campo, igual estábamos accediendo a la posición de memoria 96 por ejemplo. Lo cual era bastante peliagudo. Pero con arquitecturas sistemas operativos más modernos, esto empezó a suponer violaciones de acceso y no reinicios del ordenador, bucles infinitos o crashes legendarios. La aplicación petaba y la podíamos volver a arrancar.

# Nulabilidad en Java:

Una parte bastante importante de las excepciones en runtime de Java se produce por null pointer exceptions. Siempre dependiendo del tipo de proyecto, por supuesto. En un IDE o un compilador por ejemplo la cantidad de nulls que pueden haber es abrumadora. El usuario va haciendo programas incompletos y las estructuras internas, los ASTs que maneja el IDE pueden tener partes nulas en muchísimos lugares. Y gran parte del código acaba siendo para la gestión de nulos.

Los tíos de JetBrains, para no volverse gilipollas, metieron dos anotaciones soportadas en sus IDEs: [@Nullable y @NotNull](https://www.jetbrains.com/idea/help/nullable-and-notnull-annotations.html).

Esto permite **anotar valores de retorno, argumentos y campos como que aceptan nulos o no aceptan nulos**. Y con ello logran hacer un análisis estático que nos ayuda a llegar a runtime con menos de estos errores.

![Ejemplo not-null 1](/images/not-null-example1.jpg "Ejemplo not-null 1")

![Ejemplo not-null 2](/images/not-null-example2.png "Ejemplo not-null 2")

Todo esto son **warnings** y no son errores de compilación, pero intelliJ genera código que hace aserciones en runtime y que **lanza excepciones cuanto antes** si no se cumple alguno de los contratos que hemos anotado.

En relación a esto los de JetBrains desarrollaron [KAnnotator](https://github.com/JetBrains/kannotator), un proyecto que permite el análisis de librerías Java a nivel de bytecode **para determinar si una función acepta o si devuelve nulos** automágicamente (basándose en la comprobación y el seteo de nulos dentro de ese código).

# Nulabilidad en Kotlin

En Kotlin, la gestión de nulabilidad está a otro nivel. Siendo una parte intrínseca del lenguaje. Como ocurre en otros lenguajes modernos como Swift.

Básicamente ningún tipo, bien sea un tipo referencia o valor, se puede nulificar a nivel de lenguaje por defecto. Y esto está forzado no en tiempo de edición, sino en tiempo de compilación como errores.

# Llamar a métodos o acceder a campos con tipos nulables (!! y ?. y ?[])

Intentar acceder de forma normal a un miembro de un objeto de un tipo nulable es un error y no se permite.

![Ejemplo not-null 3](/images/not-null-example3.png "Ejemplo not-null 3")

 En estos casos tenemos varias opciones:
 Utilizar el operador de acceso con propagación de nulos ?. como sugiere el IDE y que tiene un quick-fix.

{% highlight kotlin %}
this.getName()?.endsWith(".$ext")}
{% endhighlight %}

El tipo de la expresión es Boolean?, es decir que si endsWith devuelve un Boolean, al utilizar el operador ?. hace que pueda ser nulo también. Devolverá true o false si el nombre terminar por la extensión puesta o nulo si el nombre del archivo es nulo. Pero en ningún caso lanzará una NullPointerException.

También podemos utilizar el shortcut de casteo a tipo no nulo !! que es un operador unario colocado a la derecha.

{% highlight kotlin %}
this.getName()!!.endsWith(".$ext")
{% endhighlight %}

Ahí estamos aseverando que this.getName() devuelve una cadena y no va a ser null esa cadena, y sí producirá una excepción en el caso de que no lo sea. Y el resultado de la expresión es un Boolean no nulable.

La otra opción es hacer uso del smart cast. Cuando hacemos una comprobación de un valor inmutable (val) sobre su nulidad, bien sea en una cláusula de guarda o en una rama de ifs o de whens, el compilador hace un smart cast de ese tipo que era nulable a no nulable. Por ejemplo:

{% highlight kotlin %}
val name = this.getName()
if (name == null) return false
name.endsWith(".$ext")
{% endhighlight %}

Ahí se ha producido un smart cast después de la cláusula de guarda indicando que name es con total certeza no nulo. Y tanto el compilador como el IDE lo saben y después del id, name está casteado a String. Eso sí, antes de la cláusula de guarda, el tipo name era String?.

# Operador de Elvis (Elvis operator ?:)

En el caso de tener una expresión que pueda ser nula por propagación, podemos establecer un valor para cuando sea nula. De forma que el ejemplo de antes podría quedar así:

{% highlight kotlin %}
this.getName()?.endsWith(".$ext") ?: false
{% endhighlight %}

Para entender esta expresión, vamos a desglosarla (tipo y valor):

{% highlight kotlin %}
// De tipo String? (el nombre o null)
this.getName() 

// De tipo Bool? (si el nombre no era null, si termina por la extensión, si no, null)
this.getName()?.endsWith(".$ext")

// De tipo Bool (en el caso que la expresión anterior fuese null, se utilizará false como valor por defecto)
this.getName()?.endsWith(".$ext") ?: false
{% endhighlight %}

# Delegates.notNull() y lazy

Para solucionar algunos problemas relacionados con la nulabilidad y/o mantener la inmutabilidad, tenemos dos delegados bastante interesantes: lazy y notNull()

Hay determinados momentos en los que no podemos darle un valor inicial a una variable en su declaración, porque tiene dependencias que se resuelven o inicializan a posteriori. En dichos casos podemos utilizar el delegado lazy y mantener la inmutabilidad utilizando un campo val.

## lazy

{% highlight kotlin %}
class Test(val library: Library) {
   var a:Element? = null

   fun postInitialize(info: LibraryInfo) {
       library.initialize(info)
       a = info.myelement
   }
}
{% endhighlight %}

->

{% highlight kotlin %}
class Test(val library: Library) {
   val a:Element by lazy { info.myelement }

   fun postInitialize(info: LibraryInfo) {
       library.initialize(info)
   }
}
{% endhighlight %}

En otras ocasiones, no tenemos acceso a las dependencias y no podemos utilizar lazy, pero podemos evitar la gestión de los nulls utilizando Delegates.notNull(), que lanzará una excepción si se intenta acceder al campo antes de setearlo.

## Delegates.notNull()

{% highlight kotlin %}
class Test {
   var a:Int? = null

   fun postInitialize(value:Int) {
       this.a = value * 2
   }
}
{% endhighlight %}

->

{% highlight kotlin %}
class Test {
   var a:Int by Delegates.notNull()

   fun postInitialize(value:Int) {
       this.a = value * 2
   }
}
{% endhighlight %}

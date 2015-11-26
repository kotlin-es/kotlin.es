---
layout: post
title:  "Hello World - Android"
date:   2015-11-26 08:00:00 +0100
category: articulos
tags: kata, codingdojo, fizzbuzz 
author: vicboma1
icon: /images/icons/xxxx/xxxx.png
edit: /_posts/articles/2015-xx-xx-kata-fizzbuzz.markdown
permalink: /2015/11/kata-fizzbuzz/
---

***** BORRADOR

Hoy en día muchas empresas de desarrollo de software suelen hacer filtros para la captación de nuevo personal a través de la ingeniería
social que internet les brinda. Un candidato que llega a una oficina para hacer una entrevista de trabajo, normalmente ya está
analizado por parte de la empresa/persona que lo va a entrevistar.

Algunas veces pueden probarte técnicamente para verificar tus conocimientos reales. En otras buscan que seas tú mismo el que diga
que carencias tienes y, con bastante probalidad, se suelen hacer pequeñas katas o pruebas técnicas para saber si el candidato es la
persona que dice ser en su carta de presentación. Un algoritmo con sentencias fáciles puede ser el que filtre la primera toma de contacto, luego
puede llegar la prueba de recursión. Más adelante una prueba de árboles binarios y finalmente una prueba de optimización donde se tiene
que refactorizar un algoritmo optimizando tiempos de ejecución con "clean code" suelen ser las pruebas más comunes. Hoy solo nos vamos a fijar en la primera fase. 

Rosetta code es un sitio de crestomatía de programación. Presenta diversidad de soluciones para algorimos descritos en multitud de lenguajes.

El problema conocido como "FizzBuzz" es uno de los algoritmos más utilizados para pruebas en caliente en entrevistas de trabajo.
Es una manera de cribar, de forma ágil, a programadores que no tienen el nivel para el puesto de trabajo.

Desde Kotlin.es vamos a darte unos pequeños consejos y valores para que puedas afrontar esta prueba sin problemas.

El enunciado es el siguiente:

```
Se solicita imprimir los números enteros del 1 al 100, con las siguientes condiciones:

Si el número es divisible exactamente entre 3, en vez de imprimir el número, imprimir la palabra Fizz.
Si el número es divisible exactamente entre 5, en vez de imprimir el número, imprimir la palabra Buzz.
Si el número es divisible exactamente entre 3 y 5, en vez de imprimir el número, imprimir la palabra FizzBuzz.
```

Lo primero que tenemos que hacer es un análisis semántico para extraer la máxima información posible. Saber qué nos piden es algo fundamental para llegar a la solución.
(Pensar que no tenemos mucho tiempo).
En la primera lectura se debe de extraer qué vamos a necesitar. Un bucle que controle el flow de nuestro método debe de ir
desde 1 a 100 y debe de contener 2 ó 3 sentencias. 

pseudocódigo
```kotlin

fun fizzbuzz() : Unit {
   for(1..100).forEach {
      
      1 if( ... ) { ..... }
      2 if( ... ) { ..... }
      3 if( ... ) { ..... }
      
   }
}


```

En la segunda lectura debemos de hacer incapié en las sentencias del método. Cómo plasmar estas sentencias con la sintaxis del lenguaje elegido es algo
muy importante que debemos saber. Un buen programador debe de tener recursos, habilidades para llegar a un punto de diferentes formas.
Aquí tenemos que tener claro si la mejor elección van a ser sentencias if/else, utilizar un switch/when para cribar casos, la utilización de patrones iteradores...

pseudocódigo
```kotlin

fun entryMap(it: Int): String {
      1 if( ... ) { ..... }
      2 if( ... ) { ..... }
      3 if( ... ) { ..... }
}

fun fizzbuzz() : Unit {
   for(1..100).forEach {
      entryMap(it)
   }
}

```

Nuestro algoritmo está cogiendo flow y sin querer estamos haciendo "clean code". Por último debemos de plasmar las condiciones que hacen mención a "FizzBuzz".

```kotlin
Si el número es divisible exactamente entre 3, en vez de imprimir el número, imprimir la palabra Fizz.

if(it % 3  == 0 ) ->  "Fizz"
```

```kotlin
Si el número es divisible exactamente entre 5, en vez de imprimir el número, imprimir la palabra Buzz.

if(it % 5  == 0 ) ->  "Buzz"
```

```kotlin
Si el número es divisible exactamente entre 3 y 5, en vez de imprimir el número, imprimir la palabra FizzBuzz.

Aquí no hago nada. Si no anido las sentencias if con un if/else ya lo tengo!
```

```kotin
Se solicita imprimir los números enteros del 1 al 100, con las siguientes condiciones:

if( (it % 5 != 0) && (it % 3 != 0) ) ->  it
```

Añadiendo estas condiciones en pseudocódigo tendríamos el siguiente algoritmo:

pseudocodigo
```kotlin
fun entryMap(it: Int): String {
      if(it % 3  == 0 ) ->  "Fizz"
      if(it % 5  == 0 ) ->  "Buzz"
      if( (it % 5 != 0) && (it % 3 != 0) ) ->  it
}

fun fizzbuzz() : Unit {
   for(1..100).forEach {
      entryMap(it)
   }
}
```

Si os fijais el orden de las sentencias es muy importante. La primera condición del algoritmo la hemos puesto la última...
Tenemos el 90% de nuestro algoritmo hecho y realmente pasaríamos la prueba perfectamente.... Pero podemos mejorarlo porque
ahí hay algún que otro "smell". Las sentencias "if" parece que podrían dar lugar a otro estamento más preciso y óptimo.
Una sentencia "when" nos permitiría obtener más velocidad y estructurar mejor el código.

pseudocódigo
```kotlin
fun entryMap(it: Int): String {
      return when {
         is ( (it % 5 = 0) && (it % 3 = 0) ) ->  "FizzBuzz"
         is (it % 3  == 0 ) ->  "Fizz"
         is (it % 5  == 0 ) ->  "Buzz"
         else -> it
    }
}

fun fizzbuzz() : Unit {
   for(1..100).forEach {
      entryMap(it)
   }
}
```

Gracias a kotlin podemos usar técnicas de refactoring como "Single-expression functions" que nos permiten omitir el dato devuelto
e inferir el tipo por una expresion a la derecha.

pseudocódigo
```kotlin
fun entryMap(it: Int) = when {
         is ( (it % 5 = 0) && (it % 3 = 0) ) ->  "FizzBuzz"
         is (it % 3  == 0 ) ->  "Fizz"
         is (it % 5  == 0 ) ->  "Buzz"
         else -> it
    }
}

fun fizzbuzz() : Unit {
   for(1..100).forEach {
      println(entryMap(it))
   }
}
```

Aún podríamos limpiar más el código quitando los datos númericos y de tipo string hardcodeados a pelo en el código.
De todos modos, este pseudocódigo sirve como guía para medir tus conocimientos con kotlin.

A continuación te muestro una versión que he hecho mediante TDD. Se basa en el ejemplo que he mostrado. Kotlin nos brinda muchas técnicas de definición de funciones y he añadido una "Extension function" a mi solución.

![](https://github.com/kotlin-es/kotlin-katas/blob/master/fizzBuzz/src/main/resources/fizzBuzz.png)

Las soluciones a este algoritmo "FizzBuzz" son muchisimas y muy diversas. Esta solución tal vez no es la mejor pero nos puede ayudar a utilizar muchas de las técnicas que Kotlin nos ofrece. Es expresiva y se lee con facilidad.

Si quieres ver la solución final de este algoritmo entra en el repositorio oficial de kotlin.es a través de github mediante esta url: https://github.com/kotlin-es/kotlin-katas

En este otro repositorio hay algunas versiones incrementales para llegar a la misma solución: https://github.com/vicboma1/Kata-FizzBuzz

Si crees que este algoritmo es muy avanzado para tu nivel, puedes revisar estos respositorios:
* Getting Started Kotlin - https://github.com/vicboma1/GettingStartedKotlin
* Kotlin Koans - https://github.com/vicboma1/Kotlin-Koans

Aquí podras encontrar multitud de ejercicios para elevar tu nivel. 

El resumen de esta entrada ha sido presentar a Kotlin como un lenguaje muy expresivo y menos verboso que Java.
Permite relucir buenas prácticas de programación.

Desde Kotlin.es te invitamos a que midas tu conocimiento a través de la shell online: http://try.kotlinlang.org/

## Referencias:
* Rosseta Code - http://rosettacode.org
* Fizz Buzz - https://en.wikipedia.org/wiki/Fizz_buzz
* Rosseta FizzBuzz - http://rosettacode.org/wiki/FizzBuzz
* CodingDojo - http://codingdojo.org
* Getting Started Kotlin - https://github.com/vicboma1/GettingStartedKotlin
* Kotlin Koans - https://github.com/vicboma1/Kotlin-Koans
* Kotlin online - http://try.kotlinlang.org/
* Facebook - https://www.facebook.com/kotlin.es/


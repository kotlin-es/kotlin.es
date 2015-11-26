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

Algunas veces pueden probarte técnicamente para verificar tus conocimientos reales. En otras buscan que seas tu mismo el que diga
que carencias tienes y, con bastante probalidad, se suelen hacer pequeñas katas o pruebas técnicas para saber si el candidato es la
persona que dice ser en su carta de presentación. Un algoritmo con sentencias fáciles puede que sea el que filtre la primera toma de contacto, luego
puede llegar la prueba de recursión. Más adelante alguna prueba de árboles binarios y finalmente la prueba de optimización de tiempos donde se tiene
que refactorizar un algoritmo optimizando tiempos de ejecucion con "clean code". Hoy solo nos vamos a fijar en la primera fase. 

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
En la primera lecura se debe de extraer que vamos a necesitar un bucle que controle el flow de nuestro método. Éste debe de ir
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

``` kotlin
Si el número es divisible exactamente entre 5, en vez de imprimir el número, imprimir la palabra Buzz.

if(it % 5  == 0 ) ->  "Buzz"
```

```kotlin
Si el número es divisible exactamente entre 3 y 5, en vez de imprimir el número, imprimir la palabra FizzBuzz.

*Aquí no hago nada. Si no anido las sentencias if con un if/else ya lo tengo!
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

A continuación te muestro una versión que he hecho yo mediante TDD. Se basa en el ejemplo que he mostrado y como kotlin nos brinda muchas
técnicas de definición de funciones he añadido una "Extension function" a mi solución.



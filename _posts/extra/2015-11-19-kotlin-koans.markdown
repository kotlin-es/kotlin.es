---
layout: post
title:  "Kotlin Koans - Repositorio de ejercicios oficiales"
date:   2015-11-19 08:00:00 +0100
category: extra
tags:
author: vicboma1
permalink: /2015/11/kotlin-koans/
---

Con esta nueva publicación, se quiere acercar un poco más la sintaxis de Kotlin a todos aquellos desarrolladores que están empezando o que necesitan más ejercicios para su práctica diaria.

Si navegamos a la página oficial de Kotlinlang.com tenemos la posibilidad de testear el lenguaje online a través de un editor interactivo que posee además una consola. Si visualizamos la parte izquierda de la web podemos ver como el segundo apartado recibe el nombre de Kotlin Koans.

![Koans](/images/kotlinkoans/01.png)

Dicho apartado no es más que una serie de ejercicios para ayudar a familiarizarnos con la sintaxis de Kotlin. Cada ejercicio ha sido creado como una prueba de test en su defecto, y su finalidad consiste en hacer pasar el test para validar los conocimientos adquiridos tras la descripción de la práctica realizada.

A continuación se muestra un poco la iteración de los ejercicios.

La primera temática recibe el nombre de Introducción y abarca los conceptos más primarios de Kotlin. Tests tales como "Hola Mundo",  "Lambdas", "Smart carts" y "Conversiones SAM" nos harán madurar con el lenguaje.

Luego pasamos a la temática de las Colecciones. Dicho punto hace hincapié en la utilización de los métodos de extensión que nos ofrece Kotlin a la hora de utilizar listas, arrays y listas enlazadas. El dominio en que promueve estos ejercicios es un escenario donde un cliente efectúa compras, hay una lista de resultados...

![Koans](/images/kotlinkoans/02.png)

Estos apartados harán que domines métodos de extensión como "flatMap", "sort", "sum","fold", "filter" y la posibilidad de componer tareas compuestas entre otras.

El tercer apartado es el de las Convenciones. Un gran momento para aprender hacer overrides de clases de las cuales extendemos o implementamos comportamientos como es el caso de "Comparable<T>", "Range<T>", "Iterable<T>"...

La cuarta temática es el de las Propiedades. Si eres programador de .Net este apartado lo realizaras sin dificultades. Los ejercicios muestran como declarar getters y setters en nuestras clases así como declaraciones perezosas (lazy).

Para finalizar, la última temática recibe el nombre de Builders. Kotlin en este apartado nos enseña a implementar un patrón de construcción a nivel de StringBuilders, Ints y de tipo genérico. Al final de este apartado tenemos un pequeño ejemplo para construir un Html mediante builders personalizados ya definidos.

Como añadido a esta último apartado se visualiza una sección llamada Generics. Simplemente tenemos un solo ejercicio. Es bastante completo y permite asentar los conceptos claramente de como tipar nuestros argumentos en una función.

Todos estos ejercicios online tienen una ventaja y es que se puede pulsar un pequeño botón donde se visualiza la respuesta a nuestro problema en todos los ejercicios.

Por otro lado, se puede abrir una sesión con un cliente de Facebook, Github, Twiter, Google+ o JetBrains para almacenar en la nube todos los test resueltos.
La anécdota de los ejercicios online es que tiene una especie de aviso cuando pasamos de nivel cada 8 ò 9 ejercicios con una ventana que felicita al usuario.

![Koans](/images/kotlinkoans/03.png)


La manera ideal de iterar estos ejercicios oficiales de Kotlin si deseas hacerlo bien es la siguiente:

Trabajar en local clonando el repositorio oficial de github. Éste no posee las respuestas y tienes más ayuda que en la versión online (el auto completado de IntelliJ ayuda mucho en ciertos tests). Posee más ejercicios y todos los ficheros son manipulables.

Url : [https://github.com/jetbrains/workshop-jb](https://github.com/jetbrains/workshop-jb){:target="_blank"}

Una vez visualizado todos los test en verde del repositorio anterior, lanzarnos a la versión online para medir nuestro nivel adquirido en los ejercicios en local. Ir aceptando test y visualizar las felicitaciones de Kotlin según avancemos por los ejercicios. .

Url : [http://try.kotlinlang.org/#/Kotlin%20Koans/Introduction/Hello,%20world!/Task.kt](http://try.kotlinlang.org/#/Kotlin%20Koans/Introduction/Hello,%20world!/Task.kt){:target="_blank"}


Para finalizar esta entrada, desde kotlin.es te facilitamos un repositorio propio tanto con las versiones de web y del repositorio de Jetbrains solucionado.

Es ideal para aquellas personas que quieran repasar rápidamente los ejercicios sin hacerlos. También hemos añadido Maven en el proyecto para atar las dependencias. Las soluciones de este repositorio en gran parte son diferentes a las que muestra la página web. Perfecto si quieres abarcar los problemas desde posturas diferentes.

Url : [https://github.com/vicboma1/Kotlin-Koans](https://github.com/vicboma1/Kotlin-Koans){:target="_blank"}

A continuación te dejamos los indices del repositorio:


###Introduction [13/42] Koans
* [Hello World!](https://github.com/vicboma1/Kotlin-Koans#hello-world){:target="_blank"}
* [Java to Kotlin conversion](https://github.com/vicboma1/Kotlin-Koans#java-to-kotlin-conversion){:target="_blank"}
* [Named arguments](https://github.com/vicboma1/Kotlin-Koans#named-arguments){:target="_blank"}
* [Default arguments](https://github.com/vicboma1/Kotlin-Koans#default-arguments){:target="_blank"}
* [Lambdas](https://github.com/vicboma1/Kotlin-Koans#lambdas){:target="_blank"}
* [Strings](https://github.com/vicboma1/Kotlin-Koans#strings){:target="_blank"}
* [Data classes](https://github.com/vicboma1/Kotlin-Koans#data-classes){:target="_blank"}
* [Nullable types](https://github.com/vicboma1/Kotlin-Koans#nullable-types){:target="_blank"}
* [Smart casts](https://github.com/vicboma1/Kotlin-Koans#smart-casts){:target="_blank"}    <--- Nivel 1
* [Extension functions](https://github.com/vicboma1/Kotlin-Koans#extension-functions){:target="_blank"}
* [Object expressions](https://github.com/vicboma1/Kotlin-Koans#object-expressions){:target="_blank"}
* [SAM conversions](https://github.com/vicboma1/Kotlin-Koans#sam-conversions){:target="_blank"}
* [Extensions on collections](https://github.com/vicboma1/Kotlin-Koans#extensions-on-collections){:target="_blank"}

###Collections [25/42] Koans
* [Introduction](https://github.com/vicboma1/Kotlin-Koans#introduction){:target="_blank"}
* [Filter map](https://github.com/vicboma1/Kotlin-Koans#filter-map){:target="_blank"}
* [All, Any, Count, FirstOrNull](https://github.com/vicboma1/Kotlin-Koans#all,any,count,firstornull){:target="_blank"}  <--- Nivel 2
* [FlatMap](https://github.com/vicboma1/Kotlin-Koans#flatmap){:target="_blank"}
* [Max min](https://github.com/vicboma1/Kotlin-Koans#maxmin){:target="_blank"}
* [Sort](https://github.com/vicboma1/Kotlin-Koans#sort){:target="_blank"}
* [Sum](https://github.com/vicboma1/Kotlin-Koans#sum){:target="_blank"}
* [Group by](https://github.com/vicboma1/Kotlin-Koans#group-by){:target="_blank"}
* [Partition](https://github.com/vicboma1/Kotlin-Koans#partition){:target="_blank"}
* [Fold](https://github.com/vicboma1/Kotlin-Koans#fold){:target="_blank"}
* [Compound tasks](https://github.com/vicboma1/Kotlin-Koans#compoundtasks){:target="_blank"} <--- Nivel 3
* [Get used to new style](https://github.com/vicboma1/Kotlin-Koans#getusedtonewstyle){:target="_blank"}

###Conventions [32/42] Koans
* [Comparison](https://github.com/vicboma1/Kotlin-Koans#comparison){:target="_blank"}
* [In range](https://github.com/vicboma1/Kotlin-Koans#in-range){:target="_blank"}
* [Range to](https://github.com/vicboma1/Kotlin-Koans#range-to){:target="_blank"}
* [For loop](https://github.com/vicboma1/Kotlin-Koans#for-loop){:target="_blank"}
* [Operators overloading](https://github.com/vicboma1/Kotlin-Koans#operators-overloading){:target="_blank"}
* [Multi assignment](https://github.com/vicboma1/Kotlin-Koans#multi-assignment){:target="_blank"}
* [Invoke](https://github.com/vicboma1/Kotlin-Koans#invoke){:target="_blank"} <--- Nivel 4

###Properties [36/42] Koans
* [Properties](https://github.com/vicboma1/Kotlin-Koans#properties){:target="_blank"}
* [Lazy property](https://github.com/vicboma1/Kotlin-Koans#lazy-property){:target="_blank"}
* [Delegates examples](https://github.com/vicboma1/Kotlin-Koans#delgates-examples){:target="_blank"}
* [Delegates how it works](https://github.com/vicboma1/Kotlin-Koans#delegates-how-it-works){:target="_blank"}

###Builders [41/42] Koans
* [Extension function literals](https://github.com/vicboma1/Kotlin-Koans#extension-function-literals){:target="_blank"}
* [String and map builders](https://github.com/vicboma1/Kotlin-Koans#string-and-map-builders){:target="_blank"}
* [The function with](https://github.com/vicboma1/Kotlin-Koans#the-function-with){:target="_blank"}
* [Html builders](https://github.com/vicboma1/Kotlin-Koans#html-builders){:target="_blank"}
* [Builders how it works](https://github.com/vicboma1/Kotlin-Koans#builders-how-it-works){:target="_blank"}

### Generic [42/42] Koans
* [Generic functions](https://github.com/vicboma1/Kotlin-Koans#generic-functions){:target="_blank"}  <--- Nivel 5


Se os recuerda a todos aquellos que programáis habitualmente en C/C++, Java, Scala, .Net o que queráis iniciar una nueva aventura con Kotlin, revisar esta entrada Repositorio Getting Started. Aquí se encuentran unas temáticas bastante fáciles a base de guía rápida.

## Referencias :

* Facebook,  [https://www.facebook.com/kotlin.es](https://www.facebook.com/kotlin.es){:target="_blank"} 
* Kotlin, [https://kotlinlang.orgs](https://kotlinlang.org){:target="_blank"}   
* Repositorio Getting Started,  [http://kotlin.es/2015/10/repositorio-con-ejemplos-de-kotlin/](http://kotlin.es/2015/10/repositorio-con-ejemplos-de-kotlin/){:target="_blank"}
* Shell online,  [http://try.kotlinlang.org/#/Kotlin%20Koans/Introduction/Hello,%20world!/Task.kt](http://try.kotlinlang.org/#/Kotlin%20Koans/Introduction/Hello,%20world!/Task.kt){:target="_blank"} 
* Repositorio GitHub Online Kotlin Koans,  [https://github.com/jetbrains/workshop-jb](https://github.com/jetbrains/workshop-jb){:target="_blank"}
* Repositorio GitHub Kotlin Koans resueltos, [https://github.com/vicboma1/Kotlin-Koans](https://github.com/vicboma1/Kotlin-Koans){:target="_blank"}
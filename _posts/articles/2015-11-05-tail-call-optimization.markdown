---
layout: post
title:  "Tail Call Optimization"
date:   2015-11-05 08:00:00 +0100
category: articulos
tags: recursive, tail, call, optimization
author: vicboma1
icon: /images/icons/tailcall.jpg
permalink: /2015/11/tail-call-optimization/
---

 
<span style="font-weight: 400;"> Abstract </span>
<p style="text-align: justify;"><i><span style="font-weight: 400;">Se sabe que muchos de los lenguajes de programación orientados a objetos cada vez se están viendo más influenciados por la programación funcional. Hoy en día es normal ver como dos paradigmas de programación, la orientado a objetos y la funcional, conviven en un mismo lenguaje. Con la llegada de las expresiones lambda, streams y las interfaces funcionales en Java 8, el lenguaje dio un vuelco considerablemente bueno. Tener construcciones de código comunes más expresivas, mucho más claras y legibles era algo realidad. A día de hoy Java aún tiene limitaciones que podemos suplir con Kotlin.</span></i></p>
&nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 

### Introducción

<p style="text-align: justify;"><span style="font-weight: 400;">Muchos lenguajes funcionales tienen una característica que permite mejorar el rendimiento y los requisitos de pila y de memoria de las llamadas. Estas optimizaciones no requieren de data-flow analysis para ser efectivas y permiten ahorrar instrucciones, espacio en la pila y solventar las operaciones en la caché. Podemos decir que esta optimización recibe el nombre de Tail Call Optimization (TCO) y permite al compilador obtener un rendimiento muy bueno respecto a la recursión clásica. Dicho de otro modo, son transformaciones que se aplican a las llamadas y evitan la asignación de valores en la pila. Como bien sabemos, en un escenario con recursión clásica, todas las llamadas a la pila acaban recogiendo información, de ahí que el proceso reciba el nombre de recurrente.

Lenguajes funcionales tales como Scheme, Haskell y Fortress usan notablemente estas optimizaciones a nivel del compilador. Kotlin posee dicha característica desde la Milestones M6.2 con la versión 0.6.1673. Actualmente librerías como FunKTionale hacen uso de estas optimizaciones.</span></p>

 

### Definición de uso

<p style="text-align: justify;"><span style="font-weight: 400;">Para hacer efectiva esta opción del compilador tenemos que tener en cuenta un apunte muy importante y es que dicha optimización está desactivada por defecto. Para poder utilizarla se debe poner una anotación específica delante de la keyword fun que define el método. Según el comunicado que se dio en la release M6.2, los desarrolladores dicen que esta opción no es lanzada automáticamente por el compilador por temas de debugging y seguridad.

En las primeras versiones disponibles la anotación específica era: </span></p>

            tailRecursive fun foo() { … }

<p style="text-align: justify;"><span style="font-weight: 400;">Si lo probamos en IntelliI IDEA veremos como el autocompletado de esta opción no aparece. Actualmente se usa la keyword tailRec y se declara de la siguiente forma como especifica el apartado de funciones de primer orden de la referencia de Kotlinlang.org.</span></p>

            tailRec fun foo() { … }

<p style="text-align: justify;"><span style="font-weight: 400;">Una vez se pone esta palabra clave reservada delante del keyword fun, el compilador activa la optimización y evita hacer llamadas al método de manera recursiva transformándolo en menos saltos internos dentro de una misma función. El funcionamiento de la pila sigue siendo el mismo, solo cuando le llega la llamada en posición tailcall, reutiliza el frame actual y evita crear uno nuevo en la pila. Esto le permite tener un número menor de saltos.</span></p>

![stack](/images/tailCallOptimization/01.png)

<p style="text-align: justify;"><span style="font-weight: 400;">TCO simplemente procesa el cálculo y salta a la siguiente instrucción de llamada con el cálculo hecho en vez de esperar a que lo reciba una vez se vacíe la pila. El compilador sustituye la operación call por un goto y delega la llamada al método con el valor conocido. Se intuye, pues, que el compilador con esta opción activada evita hacer el pop del puntero y del valor al no esperar el resultado al vaciarse la pila. Nuestro programa evita hacer un número considerable de llamadas si hablamos de órdenes de magnitud altas en el proceso del algoritmo.

Para dar más visibilidad al proceso TCO se va a mostrar una función básica recursiva con la optimización tailcall aplicada. Una forma fácil de hacer esto es con la utilización de un decompilador para obtener información de bajo nivel de abstracción.</span></p>

![función recursiva1](/images/tailCallOptimization/02.png)

<p style="text-align: justify;"><span style="font-weight: 400;">De esta forma se consigue hacer llamadas recursivas sin necesidad de hacer llamadas en absoluto. Al tratarse de un return que se llama a sí mismo, no es necesario tener los valores después para generar la salida. Un detalle muy importante es el siguiente ejemplo:</span></p>

![función recursiva2](/images/tailCallOptimization/03.png)

<p style="text-align: justify;"><span style="font-weight: 400;">Esta llamada ya no se podría procesar mediante tailcall position. El valor rodeado con una circunferencia verde hace que ya no se pueda devolver el resultado in situ sino que tendría que ser procesado y ya no se podría realizar la optimización.</span></p>

![Decompile class](/images/tailCallOptimization/04.png)

<p style="text-align: justify;"><span style="font-weight: 400;">Se observa en la clase decompilada como el método recursivo TestTail sigue teniendo la misma estructura que la original mientras que la llamada al método Test se ha sustituido por la estructura optimizada.</span></p>

 

### Caso práctico

<p style="text-align: justify;"><span style="font-weight: 400;">Para visualizar gráficamente estos resultados, se van a exponer varios ejemplos como casos de uso utilizando la función factorial y fibonacci.
Utilizando la función Factorial(n), se definen los siguientes algoritmos con sus respectivas gráficas.</span></p>

![Recursive Factorial](/images/tailCallOptimization/05.png)

![Recursive TailCall](/images/tailCallOptimization/06.png)

Factorial, n = 5

![Factorial](/images/tailCallOptimization/07.png)

Factorial, n = 65

![Factorial](/images/tailCallOptimization/08.png)


Video : [Factorial Plot](https://www.youtube.com/watch?v=XPxvFv3fjl8&feature=youtu.be){:target="_blank"}
 
 

<p style="text-align: justify;"><span style="font-weight: 400;">Utilizando la función Fibonacci(n), se definen los siguientes algoritmos con sus respectivas gráficas.</span></p>

![recursive](/images/tailCallOptimization/09.png)

![funtional](/images/tailCallOptimization/10.png)


Fibonacci, n = 21

![Fibonacci](/images/tailCallOptimization/11.png)

Fibonacci, n = 43

![Fibonacci](/images/tailCallOptimization/12.png)

Video: [Fibonacci Plot](https://www.youtube.com/watch?v=Xszz2NrJ6Ug){:target="_blank"}
 

### Conclusiones

<p style="text-align: justify;"><span style="font-weight: 400;"> El TCO de kotlin permite afrontar grandes algoritmos recursivos de una manera segura. Mejora considerablemente el rendimiento en algunos casos donde la recursividad clásica llena la pila y la caché de valores pudiendo hacer posibles desbordamientos. Utilizar esta optimización libera al programa en tiempo de ejecución de cálculos intermedios innecesarios. Su uso no es recomendado si no sabes cuándo se debe de utilizar. 
En estos dos repositorios : </span></p> 

* [https://github.com/CodeNinjaResearch/tailCallFibonacci](https://github.com/CodeNinjaResearch/tailCallFibonacci){:target="_blank"} 
* [https://github.com/CodeNinjaResearch/tailCallFactorial](https://github.com/CodeNinjaResearch/tailCallFactorial){:target="_blank"} 

<p style="text-align: justify;"><span style="font-weight: 400;"> se puede obtener el código fuente y los Tests de la información expuesta en el artículo a parte de muchos otras comparativas. También se incluye una clase Main que permite visualizar y realizar Plots. Ambos repositorios integran el proyecto en Intellij IDEA con Maven 4.0.0 Centralizado y su integración continua correspondiente.</span></p>
 

### Trabajos futuros

<p style="text-align: justify;"><span style="font-weight: 400;">Integrar de manera gradual Kotlin en la parte backend de mis proyectos puesto que Java8 tiene bastante carencias. Emular el procesador z80 con Kotlin y afrontar la recursividad en lo máximo de lo posible con el TCO para arañar algunos nanosegundos al core del emulador de la gameboy que estoy desarrollando.

Kotlin solventa problemas de Safety que Java no controla y permite un paradigma funcional más potente que Java8 con clousures, inlining, declaration-site variance y type projections. Migrar de Java a Kotlin en la parte backend debe de ser algo obligado para afrontar con garantías un cambio tecnológico en la evolución de nuestras aplicaciones.</span></p>
 

### Agradecimientos

* A Carlos Ballesteros por el apoyo en la redacción del artículo.
* A las personas que han tomado parte de su tiempo en leer esta crónica.

 

### Referencias:

* The Original ‘Lambda Papers’ by Guy Steele and Gerald Sussman, [http://library.readscheme.org/page1.html](http://library.readscheme.org/page1.html){:target="_blank"}
* Steven S.Munchnick (2000). Advanced Compiler Design implementation, Procedure Optimizations, 15, 461 – 470.
* Suceción de Fibonacci, [https://es.wikipedia.org/wiki/Sucesión_de_Fibonacci](https://es.wikipedia.org/wiki/Sucesión_de_Fibonacci){:target="_blank"} 
* John Hudson Tiner (200). Exploring the World of Mathematics: From Ancient Record Keeping to the Latest  Advances in Computers. New Leaf Publishing Group. ISBN 9781614581550.
* Tail Recursive Annotation,[https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/tail-recursive/](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/tail-recursive/){:target="_blank"}  
* Tail Recursion Elimination, [ http://www.program-transformation.org/Transform/TailRecursionElimination]( http://www.program-transformation.org/Transform/TailRecursionElimination){:target="_blank"}
* Tail call, [https://en.wikipedia.org/wiki/Tail_call]https://en.wikipedia.org/wiki/Tail_call){:target="_blank"} 
* What is difference between tail calls and tail recursion ?, [http://stackoverflow.com/questions/12045299/what-is-difference-between-tail-calls-and-tail-recursion](http://stackoverflow.com/questions/12045299/what-is-difference-between-tail-calls-and-tail-recursion){:target="_blank"} 
* Assembly Language:   Function Calls, Jennifer Rexford [http://www.cs.princeton.edu/courses/archive/spr11/cos217/lectures/15AssemblyFunctions.pdf](http://www.cs.princeton.edu/courses/archive/spr11/cos217/lectures/15AssemblyFunctions.pdf){:target="_blank"} 
* Tail Call Optimization and Java, Eric Bruno, April 15, 2014, [http://www.drdobbs.com/jvm/tail-call-optimjavaization-and-/240167044](http://www.drdobbs.com/jvm/tail-call-optimjavaization-and-/240167044){:target="_blank"} 
* Tail call Optimization, [http://tratt.net/laurie/blog/entries/tail_call_optimization](http://tratt.net/laurie/blog/entries/tail_call_optimization){:target="_blank"} 
* Tail calls in the VM,[https://blogs.oracle.com/jrose/entry/tail_calls_in_the_vm](https://blogs.oracle.com/jrose/entry/tail_calls_in_the_vm){:target="_blank"}  
* Introduce Tail Call in Kotin,[http://blog.jetbrains.com/kotlin/2013/12/m6-2-available/](http://blog.jetbrains.com/kotlin/2013/12/m6-2-available/){:target="_blank"}  
* [Refactored to/from TailRecursion] – November 10, 2006 – [ http://c2.com/cgi/wiki?TailCallOptimization](http://c2.com/cgi/wiki?TailCallOptimization){:target="_blank"}
* Pattern Matching, [http://kenbarclay.blogspot.com.es/2014/04/kotlin-pattern-matching.html](http://kenbarclay.blogspot.com.es/2014/04/kotlin-pattern-matching.html){:target="_blank"} 
* FunKTionale – Mario Arias, [https://github.com/MarioAriasC/funKTionale](https://github.com/MarioAriasC/funKTionale){:target="_blank"} 
* Ejemplos de decompiladores, [http://jd.benow.ca/](http://jd.benow.ca/){:target="_blank"} 
* Stack (abstract data type), [https://en.wikipedia.org/wiki/Stack_(abstract_data_type)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)){:target="_blank"} 
* GameBoy Emulator, Victor Bolinches, October 2014 – Actual, [https://github.com/vicboma1/emulators/tree/master/gameboyclassic](https://github.com/vicboma1/emulators/tree/master/gameboyclassic){:target="_blank"} 

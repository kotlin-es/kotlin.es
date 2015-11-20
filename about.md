---
layout: page
title: Sobre Kotlin
permalink: /sobre-kotlin/
---

Kotlin es un lenguaje de programación fuertemente tipado desarrollado por JetBrains (los creadores de IntelliJ IDEA).

Ha sido fuertemente **influenciado por lenguajes como Scala o C#**.

**Targetea a la JVM** (máquina virtual de Java 6) **y a Javascript** de forma nativa.

# Ejemplos de Kotlin:

{% highlight kotlin %}
package hello
 
fun main(args: Array<String>) {
   println("Hello World!")
}
{% endhighlight %}

Ecosistema de Kotlin:

Es **100% interoperable con Java** y permite proyectos mixtos mezclando código Java con código Kotlin. Como targetea a Java 6, **es compatible con Android**. **Con iOS** utilizando RoboVM. Utilizando GWT se puede también mezclar código Java con Kotlin para targetear a **Javascript**. Y con código Kotlin puro se puede targetear a Javascript directamente sin GWT. Es probable que con IKVM se pueda targetear a .NET, incluyendo **Windows 10 y Windows Phone y Unity**.

# Carencias:
Tiene muchas menos características que Scala, pero es **mucho más familiar**, y ha sido diseñado para poder tener un **tooling excelente** acompañado con **mejores tiempos de compilación que Scala**. De hecho uno de los motivos que les llevó a desarrollar en Kotlin es porque los tiempos de compilación de Scala eran inaceptables para ellos.

A diferencia de Swift y por targetear a la JVM funciona con GC en vez de con ARC. Con sus ventajas y desventajas.

No tiene aliasing de tipos, casteos implícitos, ni duck typing.

# Casos de uso:
Kotlin es ideal para desarrollos basados en JVM y para hacer aplicaciones de Android.

Kotlin es un lenguaje moderno y una buena elección en general.

Si te funciona bien Scala no ofrece muchos motivos.

Si estás en Java u otros lenguajes de pasada generación, el salto es enorme y la productividad aumentará un montón. Además es ameno de escribir y de trabajar con él.

# Características del lenguaje y bondades:
Es muy conciso.

Los ; son opcionales.

Como en Swift, hay ***null-safety* gratuita a nivel de lenguaje**. Por defecto ningún tipo es nullable. Y tiene herramientas para trabajar con tipos *nulables*.

{% highlight kotlin %}
var a:String = ""
a = null; // No se permite
var b:String? = ""
b = null; // Permitido
{% endhighlight %}

**Todo son expresiones**, incluyendo los ifs y por ello el operador ternario no existe.

{% highlight kotlin %}
fun clamp(v:Int, min:Int, max:Int) = if (v < min) min else if (v > max) max else v
{% endhighlight %}

Tiene ***smart casts* basados en las ramas de código** como TypeScript, en *ifs* y en *when* (el equivalente a *match* y *switch* de otros lenguajes):

{% highlight kotlin %}
fun mymethod(a:Any) {
  if (a is String) {
    println(a.toUpperCase()) // Podemos poner toUpperCase directamente porque se sabe que a es de tipo cadena
  }
}
{% endhighlight %}

**Interpolación de cadenas** avanzada (no solo de variables como en php): *string interpolation*:

{% highlight kotlin %}
fun hello(name:String) = "Hello $name"
fun returnDoublesAsString(items:Iterable<Int>) = "Sum is ${ items.map { it * 2 }.join(", ") }"
{% endhighlight %}

Admite funciones sueltas a nivel de paquete.

Como en Scala tiene clases object que acaban siendo singleton y que admiten herencia en vez de métodos estáticos. Utiliza companion object para hacer clases con mezcla de elementos estáticos y de instancia.

{% highlight kotlin %}
class Test {
  companion object { fun staticMethod() { } }
  val instanceConst = 10
}
{% endhighlight %}

Permite crear value objects en una sola línea y la omisión de las llaves { } cuando no hace falta:

{% highlight kotlin %}
data class MyClass(val a:Int, val b:Int, val c:Int)
{% endhighlight %}

Admite funciones de una línea sin return utilizando = en vez de llaves { }, permitiendo en este caso omitir el tipo de retorno.


{% highlight kotlin %}
fun sum(a:Int, b:Int) = a + b
{% endhighlight %}

No hay distinción entre tipos primitivos y clases. Los lenguajes modernos suelen unificar este tipo de cosas. La primera consecuencia directa de esto es que incluso los tipos primitivos empiezan por mayúscula por convención: Byte, Char, Int, Long, Float, Double, Boolean.

Utiliza declaraciones muy parecidas a Scala de tres letras: var, val y fun. Var para declaraciones mutables, Val para declaraciones inmutables y Fun para funciones.


{% highlight kotlin %}
var mutable = 1
val immutable = 2
fun myfunc() { }
{% endhighlight %}

Admite tipos y funciones anónimas e internas.

Admite varios traits por archivo. Puedes incluir varias clases, y funciones libres en un solo archivo.

Los argumentos son inmutables, evitando que se puedan hacer cierto tipo de guarrerías.

{% highlight kotlin %}
fun plusOne(a:Int) {
    a++ // ¡No!
    return a
}
{% endhighlight %}

A diferencia de Scala, tiene getters y setters reales y son DRY como en C#, aunque aún más porque permite en mayor medida la elisión de tipos. En lenguajes como ActionScript/TypeScript/Javascript necesitas repetir el nombre dos veces, y en el caso de HaXe, en algunos casos hasta tres veces con sintaxis muy bizarras. Así que es algo que se agradece bastante.

{% highlight kotlin %}
private var myValue:Int = 1
val immutableDouble:Int get() = myValue * 2
var double:Int
  get() = myValue * 2
  set(value) { myValue = value / 2 }
{% endhighlight %}

Tiene métodos de extensión libres y se importan individualmente, el IDE se encarga del importado y funciona bastante bien, reduciendo el coste en el lado del compilador.

En Kotlin no se puede hacer que los métodos de extensión puedan cumplir una interfaz/protocolo como sí pasa en Swift.

Hay lo equivalente a Linq de .NET de base en Kotlin con los Iterables de Java. Aunque no son lazy como en .NET, pero es viable su desarrollo.

{% highlight kotlin %}
fun Int.double() = this * 2
val v1 = 10
val v2 = v1.double()
{% endhighlight %}

Conclusión:

Kotlin es un lenguaje que sin ser perfecto, está muy bien y es mucho mejor que otras opciones más antiguas. Por ejemplo Groovy es muy poco familiar para programadores java y no es fuertemente tipado, y Scala tampoco es familiar y tiene tiempos de compilación elevados y una codebase compleja puede ser muy difícil de entender. Java directamente no lo meto en la lista porque es ultra verboso.

La versión 1.0 está planeada para después de verano. Posiblemente para cuando Swift se haga Open Source también.

Mis experiencias con Swift ha sido que aunque es muy rápido y ARC llama bastante, (porque al final el que crea que el programador no debe preocuparse de la memoria vive en happy world). El tooling de Swift está en pañales. Kotlin ya tiene un tooling muy maduro y todo el apoyo de JetBrains e intelliJ.

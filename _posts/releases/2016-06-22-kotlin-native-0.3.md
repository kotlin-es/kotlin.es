---
layout: post
title: "Kotlin/Native v0.3"
category: releases
tags: releases
author: soywiz
original: https://blog.jetbrains.com/kotlin/2017/06/kotlinnative-v0-3-is-out/
icon: /images/native/KotlinNative.png
---

Nos complace anunciar la liberación de Kotlin/Native v0.3.
¡Con esta versión vamos a nuevos lugares! A partir de la v0.3 Windows tanto como host de compilación, como host de ejecución, y dispositivos Android como *target* de ejecución con actividades nativas. De tal forma, un `'Hello World'` con el API de Windows, es algo tan sencillo como esto:

{% highlight kotlin %}
fun main(args: Array<String>) {
  MessageBoxW(null, "Привет!","标题", MB_YESNOCANCEL or MB_ICONQUESTION)
}
{% endhighlight %}

Y el proceso de eventos de las [actividades nativas de Android](https://github.com/JetBrains/kotlin-native/tree/master/samples/androidNativeActivity/src/main/kotlin):

{% highlight kotlin %}
if (AInputQueue_getEvent(queue, event.ptr) < 0) {
  logError("Failure reading input event")
  return
}
if (AInputEvent_getType(event.value) == AINPUT_EVENT_TYPE_MOTION) {
  when (AKeyEvent_getAction(event.value) and AMOTION_EVENT_ACTION_MASK) {
    AMOTION_EVENT_ACTION_DOWN -> {
      animating = false
      currentPoint = getEventPoint(event.value, 0)
      startTime = getEventTime(event.value)
      startPoint = currentPoint
    }
    AMOTION_EVENT_ACTION_UP -> {
      val endPoint = getEventPoint(event.value, 0)
      val endTime = getEventTime(event.value)
      ....
   }
   AMOTION_EVENT_ACTION_MOVE -> {
      val numberOfPointers = AMotionEvent_getPointerCount(event.value).toInt()
      for (i in 0 until numberOfPointers)
         move(getEventPoint(event.value, i))
   }
}
AInputQueue_finishEvent(queue, event.value, 1)
{% endhighlight %}

### Depuración:

Con esta versión soportamos depuración a nivel de código fuente (únicamente paso a paso). Por ejemplo, probad:

{% highlight kotlin %}
$ bin/konanc string0.kt  -g -o string0
$ lldb ./string0.kexe
(lldb) target create "string0.kexe"
Current executable set to 'string0.kexe' (x86_64).
(lldb) b string0.kt:1
Breakpoint 1: where = string0.kexe'kfun:main(kotlin.Array<kotlin.String>) + 4 at string0.kt:1, address = 0x0000000100001344
(lldb) r
Process 12288 launched: '/Users/jetbrains/kotlin/kotlin-native-release/kotlin-native/string0.kexe' (x86_64)
Process 12288 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100001344 string0.kexe'kfun:main(kotlin.Array<kotlin.String>) at string0.kt:1
-> 1       fun main(args: Array<String>) {
   2           val str = "hello"
   3           println(str.equals("HElLo", true))
   4           val strI18n = "Привет"
   5           println(strI18n.equals("прИВет", true))
   6           println(strI18n.toUpperCase())
   7           println(strI18n.toLowerCase())
(lldb) s
Process 12288 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100001354 string0.kexe'kfun:main(kotlin.Array<kotlin.String>) at string0.kt:3
   1       fun main(args: Array<String>) {
   2           val str = "hello"
-> 3           println(str.equals("HElLo", true))
   4           val strI18n = "Привет"
   5           println(strI18n.equals("прИВет", true))
   6           println(strI18n.toUpperCase())
   7           println(strI18n.toLowerCase())
{% endhighlight %}

### Librerías:

Y por último, pero no por ello menos importante,
hemos introducido un formato de librería nuevo, llamado
***.klib***, cuyo propósito es ser el formato de distribución
por defecto, de las librerías de Kotlin/Native. Las librerías nativas y frameworks pueden interoperar fácilmente usando ***.klib*** y usarse con el compilador de Kotlin/Native especificando el switch de la línea de comandos **-library library**  o con la opción del plugin de Gradle ***library***.
La herramienta de interoperabilidad ya produce archivos ***.klib*** por defecto. Para más detalles sobre este formato de librería, por favor, [mirad aquí](https://github.com/JetBrains/kotlin-native/blob/master/LIBRARIES.md).

### Los bits:

Los binarios se pueden descargar desde las siguientes direcciones:

* [x86-64 Linux](http://download.jetbrains.com/kotlin/native/kotlin-native-linux-0.3.tar.gz)
* [x86-64 MacOS](http://download.jetbrains.com/kotlin/native/kotlin-native-macos-0.3.tar.gz)
* [x86-64 Windows](http://download.jetbrains.com/kotlin/native/kotlin-native-windows-0.3.zip)

Cualquier bug o problema que encontréis se puede reportar
en el [bug tracker de Kotlin](http://kotl.in/issue).
